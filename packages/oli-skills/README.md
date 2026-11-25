# oli-skills

500+ AI agent skills for Cursor — install, search, and manage skills in any project.

## Quick Start

```bash
# Initialize skills in your project
npx oli-skills init

# Or install all skills directly
npx oli-skills install
```

## Commands

| Command | Description |
|---------|-------------|
| `npx oli-skills init` | Set up skills system with Cursor rules |
| `npx oli-skills install` | Install all 500+ skills to `.skills/` |
| `npx oli-skills install <skill>` | Install specific skill(s) |
| `npx oli-skills search <query>` | Search skills by name or description |
| `npx oli-skills list` | List all available skills |
| `npx oli-skills list <source>` | List skills from a source |
| `npx oli-skills show <skill>` | Show a skill's content |
| `npx oli-skills packs` | Show curated skill packs |

## Usage in Cursor

After installing, load skills in Cursor by reading them:

```
Read .skills/agents/animate/SKILL.md
```

Or ask Cursor to use a skill:

```
Using the animate skill, add a smooth fade-in animation to this component
```

## Skill Sources

| Source | Count | Description |
|--------|-------|-------------|
| `agents` | 15 | Emil Kowalski's design & animation skills |
| `cursor` | 131 | ECC developer skills |
| `superpowers` | 15 | Workflow and SDLC skills |
| `marketing` | 53 | Marketing and growth skills |
| `vercel` | 9 | Vercel platform skills |
| `seo` | 29 | Claude SEO optimization skills |
| `agency` | 262 | Specialized agent skills |

## Curated Packs

**Frontend Development**
```bash
npx oli-skills install animate react-best-practices mobile-native break-ui
```

**Marketing & Growth**
```bash
npx oli-skills install cro copywriting seo-audit analytics ab-testing
```

**SEO**
```bash
npx oli-skills install seo-audit seo-technical seo-schema seo-geo
```

**Development Workflow**
```bash
npx oli-skills install brainstorming writing-plans test-driven-development
```

**Design Engineering**
```bash
npx oli-skills install emil-design-eng apple-design animation-vocabulary
```

## Token-Efficient Usage

Don't load all skills at once! Follow this workflow:

1. **Start with no skills loaded**
2. **Identify task domain** (animation? SEO? marketing?)
3. **Load 1-3 relevant skills** with `Read .skills/...`
4. **Complete task**, don't carry skills to unrelated work

## Project Structure

After `npx oli-skills init`:

```
your-project/
├── .skills/
│   ├── agents/
│   │   ├── animate/
│   │   ├── apple-design/
│   │   └── ...
│   ├── marketing/
│   │   ├── cro/
│   │   ├── copywriting/
│   │   └── ...
│   └── ...
├── .cursor/
│   └── rules/
│       └── skills.mdc    # Cursor rule for skill discovery
└── ...
```

## License

MIT
