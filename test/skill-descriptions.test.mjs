import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';

const skillsDirectory = fileURLToPath(new URL('../skills/', import.meta.url));

async function frontmatters() {
  const entries = await readdir(skillsDirectory, { withFileTypes: true });
  return Promise.all(entries.filter((entry) => entry.isDirectory()).map(async ({ name }) => {
    const text = await readFile(path.join(skillsDirectory, name, 'SKILL.md'), 'utf8');
    const block = /^---\n([\s\S]*?)\n---\n/.exec(text)?.[1] ?? '';
    const lines = block.split('\n');
    const index = lines.findIndex((line) => line.startsWith('description:'));
    return {
      name,
      raw: index >= 0 ? lines[index] : undefined,
      continued: index >= 0 && /^\s+\S/.test(lines[index + 1] ?? ''),
      explicitOnly: /^disable-model-invocation:\s*true\s*$/m.test(block),
    };
  }));
}

test('every skill description has the selection shape for its invocation mode', async () => {
  const skills = await frontmatters();
  assert.ok(skills.length > 0);
  for (const { name, raw, continued, explicitOnly } of skills) {
    assert.ok(raw, `${name}: missing description`);
    assert.ok(!continued, `${name}: description must be a single line`);
    assert.equal(raw, raw.trimEnd(), `${name}: trailing whitespace`);
    const description = raw.slice('description:'.length).trim();
    assert.ok(description.length > 0 && description.length <= 1024, `${name}: description must be 1-1024 characters`);
    assert.doesNotMatch(description, /\bPair with\b/, `${name}: keep handoffs in the body, not "Pair with" routing`);
    const statesExplicitOnly = /\b(only when the user explicitly|explicit-only)\b/i.test(description);
    if (statesExplicitOnly) assert.ok(explicitOnly, `${name}: explicit-only text needs disable-model-invocation: true`);
    if (name.startsWith('principle-')) {
      assert.match(description, /^Apply (when|before)\b/, `${name}: principles start with "Apply when" or "Apply before"`);
    } else if (!explicitOnly) {
      assert.match(description, /^Use (when|before|for)\b/, `${name}: model-invoked skills lead with a trigger clause`);
    }
  }
});
