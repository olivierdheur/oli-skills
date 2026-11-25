# Agent Instructions

## Skills System (512+ skills available)

This workspace contains 512+ specialized skills. **Do not load skills by default** — only load what's needed for the current task to save tokens.

### Quick Commands

```bash
# Search for skills
./scripts/skill search <query>

# Show a specific skill
./scripts/skill show <name>

# List skills by source
./scripts/skill list marketing

# See skill packs
./scripts/skill packs
```

### Skill Sources

| Source | Path | Focus |
|--------|------|-------|
| Emil | `.agents/skills/` | Animation, design, UI polish |
| ECC | `.cursor/skills/` | Developer tools, security |
| Superpowers | `.superpowers/skills/` | Planning, TDD, debugging |
| Marketing | `.marketing/skills/` | CRO, SEO, copywriting |
| Vercel | `.vercel-skills/skills/` | React, Next.js, deploy |
| Claude SEO | `.claude-seo/skills/` | Technical SEO, AI search |
| Agency | `.agency/skills/` | Full agency team |

### How to Load a Skill

1. Identify the task domain
2. Search: `./scripts/skill search <domain>`
3. Read the SKILL.md file when needed
4. Apply the skill's guidance
5. Don't carry skills to unrelated tasks

### Common Task → Skill Mapping

| Task | Load These Skills |
|------|-------------------|
| Build React component | `.vercel-skills/skills/react-best-practices/SKILL.md` |
| Add animation | `.agents/skills/animate/SKILL.md` |
| Optimize landing page | `.marketing/skills/cro/SKILL.md` |
| Write marketing copy | `.marketing/skills/copywriting/SKILL.md` |
| Plan a feature | `.superpowers/skills/brainstorming/SKILL.md`, `.superpowers/skills/writing-plans/SKILL.md` |
| Code review | `.superpowers/skills/requesting-code-review/SKILL.md` |
| Debug systematically | `.superpowers/skills/systematic-debugging/SKILL.md` |
| SEO audit | `.claude-seo/skills/seo-audit/SKILL.md` |
| Schema markup | `.claude-seo/skills/seo-schema/SKILL.md` |

### Browse All Skills

Visit: https://skills-browser-odheur-gmailcoms-projects.vercel.app

Or check: `SKILLS-INDEX.md` for a compact reference.
