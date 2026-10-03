import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Agent } from '@opencode/plugin';
import { parseDocument } from 'yaml';

const agentsDirectory = fileURLToPath(new URL('../../agents/', import.meta.url));

export const agentIDs = [
  'adversarial',
  'career-reviewer',
  'commit',
  'minion',
  'orchestrator',
  'reviewer',
  'visual',
  'writing-critic',
];

export async function readAgents(directory = agentsDirectory, ids = agentIDs) {
  return Promise.all(ids.map(async (id) => {
    const file = path.resolve(directory, `${id}.md`);
    try {
      const source = await readFile(file, 'utf8');
      const match = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
      if (!match) throw new Error('Missing YAML frontmatter');
      const document = parseDocument(match[1]);
      if (document.errors.length) throw document.errors[0];
      const fields = document.toJS();
      if (fields?.name !== id) throw new Error(`Frontmatter name must be ${id}`);
      if (typeof fields.description !== 'string' || !fields.description.trim()) {
        throw new Error('Description must be a non-empty string');
      }

      const agent = Agent.Info.default(id);
      agent.description = fields.description.trim();
      agent.system = source.slice(match[0].length);
      for (const key of ['mode', 'hidden', 'steps', 'color']) {
        if (fields[key] !== undefined) agent[key] = fields[key];
      }
      if (fields.permissions !== undefined) {
        if (!Array.isArray(fields.permissions)) throw new Error('Permissions must be an ordered list');
        agent.permissions.push(...fields.permissions);
      }
      if (fields.model !== undefined) {
        if (typeof fields.model !== 'string') throw new Error('Model must be provider/model[#variant]');
        const model = /^([^/]+)\/([^#]+)(?:#(.+))?$/.exec(fields.model);
        if (!model) throw new Error('Model must be provider/model[#variant]');
        agent.model = { providerID: model[1], id: model[2] };
        if (model[3]) agent.model.variant = model[3];
      }
      // Existing Markdown agents use legacy top-level generation settings.
      for (const key of ['reasoningEffort', 'textVerbosity', 'temperature']) {
        if (fields[key] !== undefined) agent.request.settings[key] = fields[key];
      }
      return Agent.Info.make(agent);
    } catch (cause) {
      throw new Error(`Cannot load bundled agent ${id} (${file}): ${cause.message}`, { cause });
    }
  }));
}
