import { Plugin } from '@opencode/plugin';
import { readSkills } from './skills.mjs';
import { readAgents } from './agents.mjs';

export default Plugin.define({
  id: 'agentic',
  async setup(ctx) {
    const [skills, agents] = await Promise.all([readSkills(), readAgents()]);
    await ctx.skill.transform((editor) => {
      for (const skill of skills) {
        if (!editor.get(skill.id)) editor.add(skill);
      }
    });
    await ctx.agent.transform((editor) => {
      for (const agent of agents) {
        if (!editor.get(agent.id)) editor.update(agent.id, (draft) => Object.assign(draft, agent));
      }
    });
  },
});
