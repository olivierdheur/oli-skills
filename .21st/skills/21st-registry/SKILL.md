# 21st Registry

> Publish components, themes, and templates to 21st.dev - manage your published work

Publish your own React components to the 21st.dev registry, manage existing items, and curate your profile page.

## Auth

```bash
# Component publishing: login OR API key
21st login
# Or: export TWENTYFIRST_TOKEN=21st_sk_...

# Theme/template: API key required
# Get at: https://21st.dev/settings/api-keys
```

## Find Existing Work

```bash
21st components                              # All your components + drafts
21st components --status draft --scope personal
21st open component:123                      # Resume editing
21st open draft:<uuid>                       # Resume draft
```

## Publish a Component

```bash
21st publish ./path/to/Component.tsx \
  --to default \
  --description "1-2 sentences: what it does and when to use it"
```

### Flags

| Flag | Purpose |
|------|---------|
| `--description "..."` | **Required**, 10+ chars |
| `--name`, `--slug` | Override auto-detected |
| `--tags a,b,c` | 1-5 tags |
| `--demo <file>` | Demo file (auto-found if not specified) |
| `--to <library>` | Target team library |
| `--visibility published\|private` | Access level |
| `--no-open` | Print URL without opening browser |

### Demo with Live Controls

Add a `settings` object + props to get a live knobs panel:

```tsx
const settings = {
  particleCount: 1000,
  speed: 0.4,
  showGrid: true,
  glowColor: "#7dd3fc",
}

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props }
  return <MyComponent count={s.particleCount} speed={s.speed} />
}
```

| Value Type | Control |
|------------|---------|
| number | slider |
| boolean | switch |
| CSS color | color picker |
| color array | palette editor |
| short string | text field |

### Before Publishing

1. Make component self-contained (all deps in package.json)
2. Use semantic tokens (`bg-primary`, `text-foreground`)
3. Review in CLI Review - check all demos, light/dark themes
4. Wait for generated cover before final publish

## Publish a Theme

```bash
21st publish-theme ./my-theme.css \
  --name "Midnight" \
  --tags dark,minimal
```

Theme CSS must have both `:root` and `.dark` blocks.

## Publish a Template

```bash
21st publish-template "SaaS Starter" \
  --site https://demo.example.com \
  --preview https://example.com/thumb.png \
  --description "..." \
  --price 49 \
  --buy-url https://...
```

## Edit & Delete

```bash
# Edit metadata
21st edit component:<id> --type component --description "..." --tags a,b
21st edit <id> --type theme --name "New Name" --visibility public

# Delete (requires --yes)
21st delete component:<id> --type component --yes
21st delete <id> --type theme --yes
```

## Catalog Submission

```bash
21st submit <slug>              # Submit for featuring
21st withdraw <slug>            # Cancel submission
21st remove-from-catalog <slug> # Remove from catalog
```

## Profile Page (Bento Board)

```bash
21st profile get [--json]           # Read current board
21st profile set --file board.json  # Replace board
21st profile set --clear            # Revert to classic
21st profile upload ./cover.png     # Upload media
```

Board block types: `component`, `library`, `social`, `note`, `hire`, `image`, `divider`
