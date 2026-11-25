# Oli's Skills Browser

A Next.js web app to browse 512+ AI agent skills, plus a CLI for efficient skill discovery and loading.

**Live**: https://skills-browser-odheur-gmailcoms-projects.vercel.app

## Skill Collections

| Collection | Skills | Focus |
|------------|--------|-------|
| **ECC** | 131 | Developer workflows, security, architecture |
| **Emil** | 15 | UI/UX, animation, design engineering |
| **Superpowers** | 15 | Planning, TDD, code review, debugging |
| **Marketing** | 52 | CRO, SEO, copywriting, analytics |
| **Vercel** | 8 | React, Next.js, deployment |
| **Claude SEO** | 29 | Technical SEO, AI search, schema |
| **Agency** | 262 | Full agency team across all domains |

## Using Skills Efficiently

### CLI Commands

```bash
# Search skills
./scripts/skill search animation

# Show a skill
./scripts/skill show animate

# List by source
./scripts/skill list marketing

# See skill packs
./scripts/skill packs
```

### In Cursor/Claude

1. **Don't load all skills** — only load what you need
2. Search: `./scripts/skill search <query>`
3. Read the specific SKILL.md file
4. Apply and move on

### Quick Reference

See `SKILLS-INDEX.md` for a compact list of all 512+ skills with descriptions.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Sources

- [emilkowalski/skills](https://github.com/emilkowalski/skills) - Emil Kowalski
- [affaan-m/ECC](https://github.com/affaan-m/ECC) - ECC Developer Skills
- [obra/superpowers](https://github.com/obra/superpowers) - Superpowers by Jesse Vincent
- [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) - Corey Haines
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) - Vercel
- [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) - Agrici Daniel
- [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) - The Agency
