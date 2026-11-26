# 21st Design Sync

> Publish your project's design tokens as a shareable 21st.dev theme

Read your project's CSS variables (shadcn/Tailwind tokens) and publish them as a public theme on 21st.dev.

## Prerequisites

- API key required (not login session)
- Get at: https://21st.dev/settings/api-keys

```bash
export TWENTYFIRST_TOKEN=21st_sk_...
```

## Workflow

### 1. Find Design Tokens

Look for the file with `:root` and `.dark` CSS variable blocks:

```
app/globals.css
src/app/globals.css
src/index.css
styles/globals.css
```

You need:
- `:root { --background: ...; --foreground: ...; ... }`
- `.dark { --background: ...; --foreground: ...; ... }`

### 2. Create Theme File

Copy both blocks into a standalone file:

```css
/* project-theme.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --primary: 240 6% 10%;
  --secondary: 240 5% 96%;
  --muted: 240 5% 96%;
  --accent: 240 5% 96%;
  --destructive: 0 84% 60%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 240 6% 10%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  /* ... rest of dark tokens ... */
}
```

**Both blocks required.** If project only has light mode, generate a dark variant (invert lightness, preserve hue/chroma).

### 3. Name & Tag

- **Name**: Product/brand name (from package.json, repo, site title)
- **Tags**: `dark`, `minimal`, `vibrant`, `saas`, etc.

### 4. Publish

```bash
21st publish-theme ./project-theme.css \
  --name "Acme" \
  --tags dark,minimal \
  --api-key 21st_sk_...
```

Returns the live theme URL: `https://21st.dev/community/themes/<slug>`

## Important Notes

- **Themes are public** - confirm with user before publishing
- **Each publish creates a NEW theme** - no upsert
- **To update colors**: publish new, delete old
- **To update metadata**: `21st edit <id> --type theme --name "..." --tags ...`

## Updating vs Re-publishing

| Goal | Command |
|------|---------|
| Change name/tags | `21st edit <id> --type theme --name "..."` |
| Change colors | Publish new file, then `21st delete <old-id> --type theme --yes` |

## Standard Tokens

Keep shadcn-standard names for proper previews:
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- `--radius`
- `--chart-1` through `--chart-5`
- `--sidebar-*` tokens
