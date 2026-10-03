import { Plugin } from '@opencode/plugin';
import { readSkills } from './skills.mjs';

export default Plugin.define({
  id: 'agentic',
  async setup(ctx) {
    const skills = await readSkills();
    await ctx.skill.transform((editor) => {
      for (const skill of skills) {
        if (!editor.get(skill.id)) editor.add(skill);
      }
    });
  },
});
