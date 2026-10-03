import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'yaml';

const skillsDirectory = fileURLToPath(new URL('../../skills/', import.meta.url));

// Keep the released inventory deliberate.
export const skillIDs = [
  'career-materials',
  'code-crafting',
  'create-skill',
  'decision-capture',
  'defuddle',
  'harness-configuration',
  'humanizer',
  'ideation',
  'implementation-planning',
  'issue-commits',
  'llm-wiki',
  'requirements-capture',
  'show-me',
  'technical-writing',
];

export async function readSkills(directory = skillsDirectory, ids = skillIDs) {
  return Promise.all(ids.map(async (id) => {
    const file = path.resolve(directory, id, 'SKILL.md');
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

      const disabled = fields['disable-model-invocation'];
      const override = fields.metadata?.['opencode/autoinvoke'];
      if (disabled !== undefined && typeof disabled !== 'boolean') {
        throw new Error('disable-model-invocation must be a boolean');
      }
      if (override !== undefined && typeof override !== 'boolean') {
        throw new Error('metadata.opencode/autoinvoke must be a boolean');
      }

      return {
        id,
        name: fields.name,
        description: fields.description.trim(),
        autoinvoke: override ?? !disabled,
        path: file,
        content: source.slice(match[0].length),
      };
    } catch (cause) {
      throw new Error(`Cannot load bundled skill ${id} (${file}): ${cause.message}`, { cause });
    }
  }));
}
