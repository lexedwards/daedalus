import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'bun:test';

test('release manifest and both plugin manifests agree on the current version', async () => {
  const [release, pkg, plugin] = await Promise.all([
    '../.release-please-manifest.json', '../package.json', '../plugin.json',
  ].map(async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'))));

  assert.match(release['.'], /^\d+\.\d+\.\d+$/);
  assert.equal(pkg.version, release['.']);
  assert.equal(plugin.version, release['.']);
});
