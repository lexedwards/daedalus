import assert from 'node:assert/strict';
import { access, lstat, readFile, readdir, readlink, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'bun:test';
import { readSkills } from '../.opencode/plugins/skills.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));

test('root Agent Plugins manifest shares the canonical skill inventory', async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'plugin.json'), 'utf8'));
  assert.equal(manifest.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
  assert.equal(manifest.name, 'daedalus');
  assert.ok(manifest.name.length <= 64);
  assert.match(manifest.name, /^(?!.*(?:--|\.\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/);
  assert.ok(Object.keys(manifest).every((key) => ['$schema', 'name', 'version', 'description', 'repository'].includes(key)));
  for (const key of ['version', 'description', 'repository']) assert.equal(typeof manifest[key], 'string');
  const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  assert.equal(manifest.name, pkg.name);
  assert.equal(manifest.version, pkg.version);
  const directories = (await readdir(path.join(root, 'skills'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  assert.equal(directories.length, 24);
  assert.deepEqual(directories, (await readSkills()).map((skill) => skill.id).sort());
  await assert.rejects(access(path.join(root, 'skills/code-crafting-v1')), { code: 'ENOENT' });
});

test('Copilot agent symlinks resolve to canonical definitions inside the plugin root', async () => {
  const directory = path.join(root, 'com.github.copilot/agents');
  const files = (await readdir(directory)).sort();
  assert.deepEqual(files, [
    'adversarial.agent.md', 'commit.agent.md', 'minion.agent.md',
    'orchestrator.agent.md', 'reviewer.agent.md', 'visual.agent.md',
  ]);
  const pluginRoot = await realpath(root);
  for (const file of files) {
    const link = path.join(directory, file);
    const id = file.replace('.agent.md', '');
    assert.equal((await lstat(link)).isSymbolicLink(), true);
    assert.equal(await readlink(link), `../../agents/${id}.md`);
    const resolved = await realpath(link);
    assert.equal(resolved, await realpath(path.join(root, 'agents', `${id}.md`)));
    const relative = path.relative(pluginRoot, resolved);
    assert.equal(path.isAbsolute(relative) || relative === '..' || relative.startsWith(`..${path.sep}`), false);
    assert.deepEqual(await readFile(link), await readFile(resolved));
  }
});
