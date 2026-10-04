import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'bun:test';
import { Agent } from '@opencode/plugin';
import plugin from '../plugins/daedalus.mjs';
import { readSkills } from '../plugins/skills.mjs';
import { readAgents } from '../plugins/agents.mjs';

function agentContext(registered = new Map()) {
  return {
    async transform(callback) {
      const editor = {
        get: (id) => registered.get(id),
        update(id, update) {
          const agent = registered.get(id) ?? Agent.Info.default(id);
          update(agent);
          registered.set(id, Agent.Info.make(agent));
        },
      };
      callback(editor);
      callback(editor);
    },
  };
}

test('registers bundled agents with prompts, models, settings, and ordered permissions', async () => {
  const registered = new Map();
  await plugin.setup({
    skill: { async transform() {} },
    agent: agentContext(registered),
  });
  assert.deepEqual([...registered.keys()].sort(), [
    'adversarial', 'commit', 'minion', 'orchestrator', 'reviewer', 'visual',
  ]);
  const reviewer = registered.get('reviewer');
  assert.match(reviewer.system, /# Independent Coding Reviewer/);
  assert.deepEqual(reviewer.model, { providerID: 'openai', id: 'gpt-6-luna' });
  assert.equal(reviewer.request.settings.reasoningEffort, 'max');
  assert.equal(reviewer.request.settings.textVerbosity, 'low');
  assert.equal(reviewer.steps, 14);
  assert.equal(reviewer.mode, 'subagent');
  assert.deepEqual(reviewer.permissions[Agent.Info.default('reviewer').permissions.length], {
    action: '*', resource: '*', effect: 'deny',
  });
  assert.ok(reviewer.permissions.some((rule) => rule.action === 'shell' && rule.resource === 'git diff*'));
  assert.equal(registered.get('commit').hidden, true);
  assert.equal(registered.get('visual').request.settings.temperature, 0.1);
  assert.equal(registered.get('orchestrator').mode, 'primary');
  assert.equal(registered.get('orchestrator').model, undefined);
  assert.ok(registered.get('orchestrator').permissions.length > 0);
});

test('preserves existing agents on registration and transform replay', async () => {
  const existing = { ...Agent.Info.default('reviewer'), system: 'Project-specific reviewer' };
  const registered = new Map([[existing.id, existing]]);
  await plugin.setup({ skill: { async transform() {} }, agent: agentContext(registered) });
  assert.equal(registered.get('reviewer'), existing);
  assert.equal(registered.size, 6);
});

test('loads agent model variants and rejects invalid metadata with the source path', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'daedalus-agent-'));
  try {
    const file = path.join(directory, 'example.md');
    await writeFile(file, '---\nname: example\ndescription: Example\nmodel: openai/reasoner#high\n---\n# Example\n');
    const [agent] = await readAgents(directory, ['example']);
    assert.deepEqual(agent.model, { providerID: 'openai', id: 'reasoner', variant: 'high' });
    assert.equal(agent.system, '# Example\n');
    for (const metadata of [
      'name: wrong\ndescription: Example',
      'name: example\ndescription: [broken',
      'name: example\ndescription: Example\nmode: invalid',
      'name: example\ndescription: Example\nmodel: invalid',
      'name: example\ndescription: Example\nhidden: "true"',
      'name: example\ndescription: Example\nsteps: 0',
      'name: example\ndescription: Example\npermissions: allow',
      'name: example\ndescription: Example\npermissions:\n  - action: edit\n    resource: "*"\n    effect: invalid',
    ]) {
      await writeFile(file, `---\n${metadata}\n---\n# Example\n`);
      await assert.rejects(() => readAgents(directory, ['example']), /Cannot load bundled agent example .*example\.md/);
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

async function fixture(frontmatter, run) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'daedalus-skill-'));
  try {
    await mkdir(path.join(directory, 'example'));
    await writeFile(path.join(directory, 'example', 'SKILL.md'), frontmatter);
    await run(() => readSkills(directory, ['example']));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('registers the current skill bundle with accessible reference files', async () => {
  const registered = new Map();
  await plugin.setup({
    agent: agentContext(),
    skill: {
      async transform(callback) {
        callback({ get: (id) => registered.get(id), add: (skill) => registered.set(skill.id, skill) });
      },
    },
  });
  assert.equal(registered.size, 24);
  assert.equal(registered.get('eval').autoinvoke, false);
  const principles = [...registered.values()].filter((skill) => skill.id.startsWith('principle-'));
  assert.equal(principles.length, 9);
  for (const principle of principles) assert.equal(principle.autoinvoke, false);
  assert.equal(registered.has('code-crafting-v1'), false);
  const skill = registered.get('harness-configuration');
  assert.match(skill.content, /^\s*# Harness Configuration/);
  assert.equal(skill.autoinvoke, true);
  assert.equal(path.isAbsolute(skill.path), true);
  assert.match(await readFile(path.join(path.dirname(skill.path), 'references/opencode-v2.md'), 'utf8'), /# OpenCode V2/);
});

test('preserves an existing skill and remains duplicate-free on transform replay', async () => {
  const existing = { id: 'code-crafting', content: 'Project-specific instructions' };
  const registered = new Map([[existing.id, existing]]);
  await plugin.setup({
    agent: agentContext(),
    skill: {
      async transform(callback) {
        const editor = { get: (id) => registered.get(id), add: (skill) => registered.set(skill.id, skill) };
        callback(editor);
        callback(editor);
      },
    },
  });
  assert.equal(registered.get('code-crafting'), existing);
  assert.equal(registered.size, 24);
});

test('supports multiline YAML and preserves the Markdown body', async () => {
  await fixture('---\r\nname: example\r\ndescription: >-\r\n  First line\r\n  second line\r\n---\r\n# Example\r\n', async (load) => {
    const [skill] = await load();
    assert.equal(skill.description, 'First line second line');
    assert.equal(skill.content, '# Example\r\n');
  });
});

test('honors automatic-invocation suppression and OpenCode metadata precedence', async () => {
  for (const [controls, expected] of [
    ['disable-model-invocation: true', false],
    ['metadata:\n  opencode/autoinvoke: false', false],
    ['disable-model-invocation: true\nmetadata:\n  opencode/autoinvoke: true', true],
  ]) {
    await fixture(`---\nname: example\ndescription: Example\n${controls}\n---\n# Example\n`, async (load) => {
      assert.equal((await load())[0].autoinvoke, expected);
    });
  }
});

test('rejects malformed bundled definitions with the skill path in the error', async () => {
  for (const frontmatter of [
    '# No frontmatter',
    'name: different\ndescription: Example',
    'name: example\ndescription: ""',
    'name: example\ndescription: [invalid',
    'name: example\nname: duplicate\ndescription: Example',
    'name: example\ndescription: Example\ndisable-model-invocation: "true"',
    'name: example\ndescription: Example\nmetadata:\n  opencode/autoinvoke: "false"',
  ]) {
    await fixture(`---\n${frontmatter}\n---\n# Example\n`, async (load) => {
      await assert.rejects(load, /Cannot load bundled skill example .*SKILL\.md/);
    });
  }
});
