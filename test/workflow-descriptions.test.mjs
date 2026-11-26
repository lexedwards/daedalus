import assert from 'node:assert/strict';
import { test } from 'bun:test';
import { readSkills } from '../plugins/skills.mjs';
import { readAgents } from '../plugins/agents.mjs';

const sdlcSkills = new Set([
  'code-crafting', 'create-skill', 'decision-capture', 'humanizer', 'ideation',
  'implementation-planning', 'incremental-commits', 'pr-delivery',
  'requirements-capture', 'technical-writing',
]);

test('advertises SDLC triggers and companion skills without making principles ambient', async () => {
  const [skills, agents] = await Promise.all([readSkills(), readAgents()]);
  for (const skill of skills) {
    assert.ok(skill.description.length <= 1024, skill.id);
    if (skill.id.startsWith('principle-')) {
      assert.equal(skill.autoinvoke, false, skill.id);
      continue;
    }
    if (!sdlcSkills.has(skill.id)) continue;
    assert.match(skill.description, /Use when/, skill.id);
    assert.match(skill.description, /Pair with/, skill.id);
  }
  for (const agent of agents) {
    if (agent.id === 'visual') continue;
    assert.match(agent.description, /Use when/, agent.id);
    assert.match(agent.description, /Pair with/, agent.id);
  }
  for (const id of ['eval', 'retrospective']) {
    assert.equal(skills.find((skill) => skill.id === id).autoinvoke, false, id);
  }
});
