# Oli's Skills Browser

500+ AI agent skills for Cursor — browse online or install anywhere via npm.

**Web**: https://skills-browser-odheur-gmailcoms-projects.vercel.app  
**npm**: https://www.npmjs.com/package/oli-skills

## Quick Install

```bash
# Install all 514 skills in any project
npx oli-skills init
```

## Skill Collections

| Collection | Skills | Focus |
|------------|--------|-------|
| **ECC** | 131 | Developer workflows, security, architecture |
| **Emil** | 15 | UI/UX, animation, design engineering |
| **Superpowers** | 15 | Planning, TDD, code review, debugging |
| **Marketing** | 53 | CRO, SEO, copywriting, analytics |
| **Vercel** | 9 | React, Next.js, deployment |
| **Claude SEO** | 29 | Technical SEO, AI search, schema |
| **Agency** | 262 | Full agency team across all domains |

## CLI Commands

```bash
npx oli-skills init              # Install all skills to .skills/
npx oli-skills install animate   # Install specific skill
npx oli-skills search animation  # Search skills
npx oli-skills list marketing    # List by source
npx oli-skills packs             # See curated packs
npx oli-skills show cro          # Preview a skill
```

## Using in Cursor

After installing, load skills in Cursor:

```
Read .skills/agents/animate/SKILL.md
```

Or just ask:

```
Using the cro skill, review this landing page
```

## Adding New Skills

```bash
# Create a new skill
./scripts/add-skill.sh marketing my-new-skill

# Edit the generated SKILL.md
code .marketing/skills/my-new-skill/SKILL.md

# Commit and push — auto-publishes to npm!
git add . && git commit -m "Add my-new-skill" && git push
```

### Auto-Publishing

When you push changes to any skill directory, GitHub Actions automatically:
1. Builds the package with new skills
2. Bumps the patch version
3. Publishes to npm

**Required**: Add `NPM_TOKEN` to your repository secrets.

## Token-Efficient Workflow

1. **Start with no skills loaded**
2. **Identify task domain** (animation? SEO? marketing?)
3. **Load 1-3 relevant skills** with `Read .skills/...`
4. **Complete task**, don't carry skills to unrelated work

## Curated Packs

| Pack | Skills |
|------|--------|
| **Frontend** | animate, react-best-practices, mobile-native, break-ui |
| **Marketing** | cro, copywriting, seo-audit, analytics, ab-testing |
| **SEO** | seo-audit, seo-technical, seo-schema, seo-geo |
| **Workflow** | brainstorming, writing-plans, test-driven-development |
| **Design** | emil-design-eng, apple-design, animation-vocabulary |

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

## License

MIT
