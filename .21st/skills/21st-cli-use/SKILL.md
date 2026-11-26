# 21st CLI Use

> Search, install, and pull code from 21st.dev - 10,000+ React/shadcn components, themes, templates

The command-line interface for the 21st.dev catalog. Search first, install what fits, and only hand-write UI when nothing matches.

## Install

```bash
npx skills add 21st-dev/skill
# Or globally:
npx @21st-dev/cli skills install --global
```

## Auth

```bash
# Option 1: Interactive login (saves to ~/.config/21st/auth.json)
npx @21st-dev/cli login

# Option 2: API key (for CI)
export TWENTYFIRST_TOKEN=21st_sk_...
# Get key at: https://21st.dev/mcp
```

```bash
21st whoami    # Check signed-in account
21st usage     # Check tier/quota and AI status
21st logout    # Clear saved login
```

## Search

**Always search before hand-writing a component.**

```bash
# Search everything
21st search "pricing table" --limit 10

# Filter by type
21st search button --type c           # components only
21st search dark --type theme         # themes only
21st search starter --type template   # templates only

# More filters
21st search hero --tag landing --author shadcn --free
21st search --mine --liked            # your own / bookmarked
21st search "card" --json             # machine output
```

## Logo Search

```bash
21st logo discord              # Search brand + UI SVG logos
21st logo "next js" --limit 5 --json
```

Free and unmetered. Uses svgl.app library.

## Pull Code

```bash
# Print component code + demo (by ID from search)
21st get 143 [--json]

# Print theme CSS (by theme ID)
21st theme <id> [--json]
```

## Install

```bash
# Install to current project (shadcn under the hood)
21st add <user>/<slug>         # e.g. 21st add shadcn/button
21st add @<team>/<slug>        # from team library

# Just print the shadcn command
21st add shadcn/button --print
```

Writes to `components/ui/<name>.tsx` and installs npm deps.

## Bookmarks & Teams

```bash
21st bookmarks [--type component|theme|template]
21st bookmark <id> --type <kind> [--remove]
21st lists                      # your bookmark lists
21st list <listId>

21st teams                      # your teams
21st team <teamId>              # team's libraries
21st team-components <teamId> [--library <id>]
```

## MCP Config

```bash
21st init --client cursor|claude|codex|vscode|devin [--write]
```

## Metering

- **Free**: Search, previews, theme CSS
- **Quota**: Component code retrieval (daily limit)
- **Builder**: Unlimited retrieval
- **AI**: Requires separate AI access (check `21st usage`)

## Related Skills

- `21st-ai` - Generate UI with AI
- `21st-registry` - Publish your own components
- `21st-design-sync` - Publish project's design as theme
