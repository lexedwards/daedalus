#!/usr/bin/env bun
// Extract the user's own requests and skill loads from local agent session history.
// Usage: bun session-history.mjs [--opencode-db PATH] [--claude-projects DIR] [--out FILE]
import { Database } from 'bun:sqlite';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SKILL_TOOLS = new Set(['skill', 'Skill', 'mcp__opencode__skill']);

export class UnsupportedHistory extends Error {}

export function ownText(text) {
  const stripped = text
    .replace(/<pasted_content\b[\s\S]*?<\/pasted_content>/g, ' ')
    .replace(/```[\s\S]*?(?:```|(?![\s\S]))/g, ' ')
    .replace(/^>.*$/gm, ' ');
  return {
    text: stripped.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim(),
    pasted: stripped.length !== text.length,
  };
}

function json(value) {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function columns(db, table) {
  return new Set(db.query(`pragma table_info(${table})`).all().map((row) => row.name));
}

function requireColumns(db, table, required) {
  const present = columns(db, table);
  const missing = required.filter((name) => !present.has(name));
  if (missing.length) throw new UnsupportedHistory(`OpenCode table ${table} lacks columns: ${missing.join(', ')}`);
}

function addRequest(session, raw, explicit = []) {
  const { text, pasted } = ownText(raw ?? '');
  if (!text && !explicit.length) return;
  session.requests.push({ index: session.requests.length, opening: session.requests.length === 0, text, pasted, explicit });
}

function addLoad(session, skill) {
  if (!skill) return;
  session.loads.push({ skill, afterRequest: session.requests.length - 1 });
}

function addToolLoad(session, block) {
  if (block?.type === 'tool' && SKILL_TOOLS.has(block.name)) addLoad(session, block.state?.input?.id ?? block.state?.input?.name);
}

function readOpenCodeV2(db) {
  requireColumns(db, 'session_v2', ['id', 'parent_id', 'model', 'time_created']);
  requireColumns(db, 'session_message', ['id', 'session_id', 'type', 'seq', 'data']);
  requireColumns(db, 'session_part', ['message_id', 'session_id', 'ordinal', 'type', 'data']);
  const sessions = new Map();
  for (const row of db.query('select id, model, time_created from session_v2 where parent_id is null').all()) {
    const model = json(row.model);
    sessions.set(row.id, {
      id: row.id, source: 'opencode', started: new Date(row.time_created).toISOString(),
      models: new Set(model?.id ? [model.id] : []), requests: [], loads: [],
    });
  }
  const events = db.query(`
    select m.session_id, m.seq, m.type as message_type, m.data as message, p.ordinal, p.type as part_type, p.data as part
    from session_message m left join session_part p on p.message_id = m.id
    where m.type in ('user', 'assistant')
    order by m.session_id, m.seq, p.ordinal`).all();
  const seen = new Set();
  const native = new Set();
  for (const row of events) {
    const session = sessions.get(row.session_id);
    if (!session) continue;
    const key = `${row.session_id}:${row.seq}`;
    if (row.message_type === 'user' && !seen.has(key)) {
      seen.add(key);
      const data = json(row.message) ?? {};
      if (typeof data.text !== 'string') throw new UnsupportedHistory('OpenCode user message has no text field');
      addRequest(session, data.text, (data.skills ?? []).map((skill) => skill.id ?? skill.name).filter(Boolean));
    }
    if (row.message_type === 'assistant') {
      if (!seen.has(key)) {
        seen.add(key);
        const message = json(row.message) ?? {};
        if (message.model?.id) session.models.add(message.model.id);
        // Older assistant messages keep their content inline; newer ones store it as parts.
        for (const block of message.content ?? []) addToolLoad(session, block);
      }
      const part = row.part ? json(row.part) : undefined;
      if (part?.native?.sessionID) native.add(part.native.sessionID);
      if (row.part_type === 'tool') addToolLoad(session, part);
    }
  }
  return { sessions: [...sessions.values()], native };
}

function readOpenCodeV1(db) {
  requireColumns(db, 'session', ['id', 'parent_id', 'time_created']);
  requireColumns(db, 'message', ['id', 'session_id', 'time_created', 'data']);
  requireColumns(db, 'part', ['id', 'message_id', 'session_id', 'time_created', 'data']);
  const sessions = new Map();
  for (const row of db.query('select id, time_created from session where parent_id is null').all()) {
    sessions.set(row.id, {
      id: row.id, source: 'opencode-v1', started: new Date(row.time_created).toISOString(),
      models: new Set(), requests: [], loads: [],
    });
  }
  const rows = db.query(`
    select m.session_id, m.id as message_id, m.data as message, p.data as part
    from message m left join part p on p.message_id = m.id
    order by m.session_id, m.time_created, m.id, p.time_created, p.id`).all();
  let current;
  for (const row of rows) {
    const session = sessions.get(row.session_id);
    if (!session) continue;
    const message = json(row.message) ?? {};
    const part = row.part ? json(row.part) : undefined;
    if (message.role === 'user') {
      if (current?.id !== row.message_id) {
        current = { id: row.message_id, text: [] };
        session.pending = current;
      }
      if (part?.type === 'text' && !part.synthetic && typeof part.text === 'string') current.text.push(part.text);
      continue;
    }
    if (session.pending) {
      addRequest(session, session.pending.text.join('\n'));
      session.pending = undefined;
    }
    if (message.role === 'assistant') {
      if (message.modelID) session.models.add(message.modelID);
      if (part?.type === 'tool' && SKILL_TOOLS.has(part.tool)) addLoad(session, part.state?.input?.name ?? part.state?.input?.id);
    }
  }
  for (const session of sessions.values()) {
    if (session.pending) addRequest(session, session.pending.text.join('\n'));
    delete session.pending;
  }
  return [...sessions.values()];
}

export function readOpenCode(file) {
  const db = new Database(file, { readonly: true });
  try {
    const tables = new Set(db.query("select name from sqlite_master where type = 'table'").all().map((row) => row.name));
    const hasV2 = ['session_v2', 'session_message', 'session_part'].every((name) => tables.has(name));
    const hasV1 = ['session', 'message', 'part'].every((name) => tables.has(name));
    if (!hasV2 && !hasV1) throw new UnsupportedHistory(`${file} has no supported OpenCode session tables`);
    const v2 = hasV2 ? readOpenCodeV2(db) : { sessions: [], native: new Set() };
    const v1 = hasV1 ? readOpenCodeV1(db) : [];
    return { sessions: [...v2.sessions, ...v1], native: v2.native };
  } finally {
    db.close();
  }
}

function claudeText(content) {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.filter((block) => block?.type === 'text').map((block) => block.text).join('\n');
}

export function readClaudeProjects(directory, skip = new Set()) {
  const files = readdirSync(directory, { recursive: true }).map(String).filter((file) => file.endsWith('.jsonl'));
  const sessions = [];
  for (const file of files) {
    const id = path.basename(file, '.jsonl');
    if (skip.has(id) || file.includes(`${path.sep}subagents${path.sep}`)) continue;
    const session = { id, source: 'claude-code', started: undefined, models: new Set(), requests: [], loads: [] };
    for (const line of readFileSync(path.join(directory, file), 'utf8').split('\n')) {
      const entry = line ? json(line) : undefined;
      if (!entry || entry.isSidechain) continue;
      session.started ??= entry.timestamp;
      if (entry.type === 'user' && !entry.toolUseResult && entry.message?.role === 'user') {
        const text = claudeText(entry.message.content);
        const command = /<command-name>\/?([\w:-]+)<\/command-name>/.exec(text);
        if (command) addRequest(session, '', [command[1]]);
        else if (!/^\s*<(local-command|command-|system-reminder)/.test(text)) addRequest(session, text);
      }
      if (entry.type === 'assistant') {
        if (entry.message?.model) session.models.add(entry.message.model);
        for (const block of entry.message?.content ?? []) {
          if (block?.type === 'tool_use' && SKILL_TOOLS.has(block.name)) addLoad(session, block.input?.skill ?? block.input?.id ?? block.input?.name);
        }
      }
    }
    if (session.requests.length) sessions.push(session);
  }
  return sessions;
}

export function summarize(sessions) {
  const models = {};
  for (const session of sessions) {
    for (const model of session.models.size ? session.models : ['unknown']) {
      const entry = models[model] ??= { sessions: 0, requests: 0, sessionsWithModelLoads: 0, modelLoads: {}, explicitLoads: {} };
      entry.sessions += 1;
      entry.requests += session.requests.length;
      if (session.loads.length) entry.sessionsWithModelLoads += 1;
      for (const { skill } of session.loads) entry.modelLoads[skill] = (entry.modelLoads[skill] ?? 0) + 1;
      for (const request of session.requests) {
        for (const skill of request.explicit) entry.explicitLoads[skill] = (entry.explicitLoads[skill] ?? 0) + 1;
      }
    }
  }
  return { sessions: sessions.length, models };
}

export function collect({ opencodeDb, claudeProjects }) {
  const haveOpenCode = opencodeDb && existsSync(opencodeDb);
  const haveClaude = claudeProjects && existsSync(claudeProjects) && statSync(claudeProjects).isDirectory();
  if (!haveOpenCode && !haveClaude) throw new UnsupportedHistory('No session history found at the given paths');
  const opencode = haveOpenCode ? readOpenCode(opencodeDb) : { sessions: [], native: new Set() };
  const claude = haveClaude ? readClaudeProjects(claudeProjects, opencode.native) : [];
  const sessions = [...opencode.sessions, ...claude].filter((session) => session.requests.length);
  return {
    sources: { opencodeDb: haveOpenCode ? opencodeDb : null, claudeProjects: haveClaude ? claudeProjects : null },
    summary: summarize(sessions),
    sessions: sessions.map((session) => ({ ...session, models: [...session.models] })),
  };
}

function parseArgs(argv) {
  const options = {
    opencodeDb: path.join(os.homedir(), '.local/share/opencode/opencode.db'),
    claudeProjects: path.join(os.homedir(), '.claude/projects'),
    out: undefined,
  };
  const names = { '--opencode-db': 'opencodeDb', '--claude-projects': 'claudeProjects', '--out': 'out' };
  for (let index = 0; index < argv.length; index += 2) {
    const name = names[argv[index]];
    if (!name || argv[index + 1] === undefined) throw new UnsupportedHistory(`Unknown or incomplete option: ${argv[index]}`);
    options[name] = argv[index + 1];
  }
  return options;
}

if (import.meta.main) {
  try {
    const options = parseArgs(process.argv.slice(2));
    const output = JSON.stringify(collect(options), null, 2);
    if (options.out) writeFileSync(options.out, `${output}\n`);
    else process.stdout.write(`${output}\n`);
  } catch (error) {
    if (!(error instanceof UnsupportedHistory)) throw error;
    process.stderr.write(`session-history: ${error.message}\n`);
    process.exit(2);
  }
}
