import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Database } from 'bun:sqlite';
import { test } from 'bun:test';
import { collect, ownText } from '../skills/create-skill/scripts/session-history.mjs';

const script = fileURLToPath(new URL('../skills/create-skill/scripts/session-history.mjs', import.meta.url));

async function withDirectory(run) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'daedalus-history-'));
  try {
    await run(directory);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

function openCodeFixture(file) {
  const db = new Database(file);
  db.run('create table session_v2 (id text, parent_id text, model text, time_created integer)');
  db.run('create table session_message (id text, session_id text, type text, seq integer, data text)');
  db.run('create table session_part (message_id text, session_id text, ordinal integer, type text, data text)');
  db.run('create table session (id text, parent_id text, time_created integer)');
  db.run('create table message (id text, session_id text, time_created integer, data text)');
  db.run('create table part (id text, message_id text, session_id text, time_created integer, data text)');
  const message = db.prepare('insert into session_message values (?, ?, ?, ?, ?)');
  const tool = (name, input) => ({ type: 'tool', name, state: { status: 'completed', input } });

  db.run('insert into session_v2 values (?, ?, ?, ?)', ['root', null, JSON.stringify({ id: 'gpt' }), 0]);
  db.run('insert into session_v2 values (?, ?, ?, ?)', ['child', 'root', JSON.stringify({ id: 'gpt' }), 0]);
  message.run('m1', 'root', 'user', 1, JSON.stringify({ text: 'why does this return null?\n```\npasted log\n```', skills: [] }));
  message.run('m2', 'root', 'synthetic', 2, JSON.stringify({ text: 'injected reminder' }));
  message.run('m3', 'root', 'assistant', 3, JSON.stringify({ model: { id: 'gpt' }, content: [tool('skill', { name: 'code-crafting' }), tool('read', {})] }));
  message.run('m4', 'root', 'user', 4, JSON.stringify({ text: '@ideation think this through', skills: [{ id: 'ideation' }] }));
  message.run('m5', 'root', 'assistant', 5, JSON.stringify({ model: { id: 'claude' }, content: [] }));
  db.run('insert into session_part values (?, ?, ?, ?, ?)', ['m5', 'root', 0, 'tool', JSON.stringify(tool('skill', { id: 'pr-delivery' }))]);
  db.run('insert into session_part values (?, ?, ?, ?, ?)', ['m5', 'root', 1, 'text', JSON.stringify({ type: 'text', native: { sessionID: 'mirrored' } })]);
  message.run('c1', 'child', 'user', 1, JSON.stringify({ text: 'subagent brief' }));

  db.run('insert into session values (?, ?, ?)', ['legacy', null, 0]);
  db.run('insert into message values (?, ?, ?, ?)', ['l1', 'legacy', 1, JSON.stringify({ role: 'user' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['p1', 'l1', 'legacy', 1, JSON.stringify({ type: 'text', text: 'plan out the release' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['p2', 'l1', 'legacy', 2, JSON.stringify({ type: 'text', text: 'skill body', synthetic: true })]);
  db.run('insert into message values (?, ?, ?, ?)', ['l2', 'legacy', 2, JSON.stringify({ role: 'assistant', modelID: 'old-gpt' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['p3', 'l2', 'legacy', 3, JSON.stringify({ type: 'tool', tool: 'skill', state: { input: { name: 'implementation-planning' } } })]);
  db.run('insert into session values (?, ?, ?)', ['legacy-b', null, 0]);
  db.run('insert into message values (?, ?, ?, ?)', ['b1', 'legacy-b', 4, JSON.stringify({ role: 'user' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['q1', 'b1', 'legacy-b', 4, JSON.stringify({ type: 'text', text: 'first follow-up' })]);
  db.run('insert into message values (?, ?, ?, ?)', ['l3', 'legacy', 5, JSON.stringify({ role: 'user' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['p4', 'l3', 'legacy', 5, JSON.stringify({ type: 'text', text: 'do it' })]);
  db.run('insert into message values (?, ?, ?, ?)', ['b2', 'legacy-b', 6, JSON.stringify({ role: 'user' })]);
  db.run('insert into part values (?, ?, ?, ?, ?)', ['q2', 'b2', 'legacy-b', 6, JSON.stringify({ type: 'text', text: 'second follow-up' })]);
  db.close();
}

async function claudeFixture(directory) {
  const project = path.join(directory, '-home-user-project');
  await mkdir(project, { recursive: true });
  const lines = (entries) => `${entries.map((entry) => JSON.stringify(entry)).join('\n')}\n`;
  await writeFile(path.join(project, 'cc-session.jsonl'), lines([
    { type: 'user', timestamp: '2026-01-01T00:00:00Z', message: { role: 'user', content: 'tidy the skill description' } },
    { type: 'assistant', message: { model: 'claude-x', content: [{ type: 'tool_use', name: 'Skill', input: { skill: 'create-skill' } }] } },
    { type: 'user', toolUseResult: {}, message: { role: 'user', content: [{ type: 'tool_result', content: 'ok' }] } },
    { type: 'user', isSidechain: true, message: { role: 'user', content: 'subagent prompt' } },
    { type: 'user', message: { role: 'user', content: '<command-name>/eval</command-name>' } },
  ]));
  await writeFile(path.join(project, 'mirrored.jsonl'), lines([
    { type: 'user', message: { role: 'user', content: 'duplicate of an OpenCode session' } },
  ]));
}

test('separates the user\'s own text from pasted material', () => {
  assert.deepEqual(ownText('fix this\n```\ntrace\n```\n> quoted\nthanks'), { text: 'fix this\n\nthanks', pasted: true });
  assert.deepEqual(ownText('<pasted_content id="x">log</pasted_content> what broke?'), { text: 'what broke?', pasted: true });
  assert.deepEqual(ownText('plain request'), { text: 'plain request', pasted: false });
  assert.deepEqual(ownText('why?\n   > indented quote'), { text: 'why?', pasted: true });
});

test('extracts requests and skill loads from every supported history format', async () => {
  await withDirectory(async (directory) => {
    const opencodeDb = path.join(directory, 'opencode.db');
    openCodeFixture(opencodeDb);
    await claudeFixture(directory);
    const result = collect({ opencodeDb, claudeProjects: directory });
    const byId = Object.fromEntries(result.sessions.map((session) => [session.id, session]));

    assert.deepEqual(Object.keys(byId).sort(), ['cc-session', 'legacy', 'legacy-b', 'root']);
    assert.deepEqual(byId.root.requests.map((request) => [request.text, request.opening, request.pasted, request.explicit]), [
      ['why does this return null?', true, true, []],
      ['@ideation think this through', false, false, ['ideation']],
    ]);
    assert.deepEqual(byId.root.loads, [
      { skill: 'code-crafting', model: 'gpt', afterRequest: 0 },
      { skill: 'pr-delivery', model: 'claude', afterRequest: 1 },
    ]);
    assert.deepEqual(byId.root.models.sort(), ['claude', 'gpt']);
    assert.deepEqual(byId.legacy.requests.map((request) => request.text), ['plan out the release', 'do it']);
    assert.deepEqual(byId.legacy.loads, [{ skill: 'implementation-planning', model: 'old-gpt', afterRequest: 0 }]);
    assert.deepEqual(byId['legacy-b'].requests.map((request) => request.text), ['first follow-up', 'second follow-up']);
    assert.deepEqual(byId['cc-session'].requests.map((request) => [request.text, request.explicit]), [
      ['tidy the skill description', []],
      ['', ['eval']],
    ]);
    assert.deepEqual(byId['cc-session'].loads, [{ skill: 'create-skill', model: 'claude-x', afterRequest: 0 }]);
    assert.equal(result.summary.models['old-gpt'].sessionsWithModelLoads, 1);
    assert.deepEqual(result.summary.models.gpt.explicitLoads, { ideation: 1 });
    assert.deepEqual(result.summary.models.gpt.modelLoads, { 'code-crafting': 1 });
    assert.deepEqual(result.summary.models.claude.modelLoads, { 'pr-delivery': 1 });
    assert.equal(result.summary.models.gpt.sessionsWithModelLoads, 1);
    assert.equal(result.summary.models.claude.sessionsWithModelLoads, 1);
  });
});

test('stops with a clear error on unsupported history instead of reporting partial data', async () => {
  await withDirectory(async (directory) => {
    const unsupported = path.join(directory, 'unsupported.db');
    const db = new Database(unsupported);
    db.run('create table session_v2 (id text)');
    db.run('create table session_message (id text)');
    db.run('create table session_part (id text)');
    db.close();
    const empty = path.join(directory, 'empty-projects');
    await mkdir(empty);
    const run = (args) => spawnSync('bun', [script, ...args], { encoding: 'utf8' });
    const fails = (args, message) => {
      const result = run(args);
      assert.equal(result.status, 2, result.stderr);
      assert.match(result.stderr, message);
      assert.equal(result.stdout, '');
    };

    fails(['--opencode-db', unsupported, '--claude-projects', empty], /session_v2 lacks columns: parent_id, model, time_created/);
    fails(['--opencode-db', path.join(directory, 'none.db'), '--claude-projects', empty], /OpenCode database not found/);
    fails(['--opencode-db', unsupported, '--claude-projects', path.join(directory, 'none')], /Claude Code projects directory not found/);
    fails(['--bogus', 'value'], /Unknown or incomplete option: --bogus/);
    fails(['--out'], /Unknown or incomplete option: --out/);
    assert.throws(() => collect({ opencodeDb: path.join(directory, 'none.db'), claudeProjects: path.join(directory, 'none') }), /No session history found/);
  });
});
