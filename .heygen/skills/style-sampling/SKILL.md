# Style Sampling

> Make a new episode in a proven video style - Collage, Finance, Science, 3D Brand, True Crime

Create new episodes using five proven YouTube-style templates. The result looks like it belongs in that series.

## When to Use

- "An episode of..."
- "In the style of..."
- "Sample this style"
- "用这个风格做一集"

**For copying ONE specific video**: use `/reverse-any-video` instead.

## Available Styles

| Template | Slug | Makes | User Brings |
|----------|------|-------|-------------|
| **Collage Explainer** | `collage-explainer` | English explainer on American policy/history | Voice |
| **Finance Explainer** | `finance-explainer` | 中文主持人讲透国家/商品/机构 | Voice + face |
| **Animated Science** | `animated-science-explainer` | English drawn science explainer | Voice |
| **3D Brand** | `3d-brand-explainer` | English brand/design breakdown in 3D world | Voice |
| **3D True Crime** | `3d-true-crime` | English crime reconstruction in dark 3D | Voice |

## Requirements

- HyperFrames Pro subscription
- Signed in: `npx hyperframes auth status`

## Workflow

### 1. Pick Template

If topic fits only one, proceed. Otherwise show the five and let user pick.

**Style not in the five?** Offer two routes:
- Rebuild one video frame-by-frame (`/reverse-any-video`)
- New film taking that style's grammar (`/hyperframes` + `references/look.md`)

### 2. Auth Check

```bash
npx hyperframes auth status
```

| Status | Action |
|--------|--------|
| Not signed in | Ask to run `!npx hyperframes auth login` |
| Free plan | Ask to run `!npx hyperframes billing subscribe --feature templates` |
| Pro | Proceed |

### 3. Pull Template

```bash
npx hyperframes templates pull <slug>
```

Always pull before using - verifies files against HeyGen's verified copies.

### 4. Make Episode

Follow `references/remix.md` and the template's `series/<name>/REMIX.md`.

**Two stops for user approval:**
1. Storyboard
2. Draft

## Credits

- Use kit tools as REMIX.md specifies
- Don't volunteer prices or estimates
- Credit limit in `.hyperframes/credit-limit.json`
- If step won't fit, ask before dropping

## What Makes a Good Episode

A good episode is one the series' viewers would take for the next upload:
- Same structure, pacing, look
- Same graphics and sound treatment
- New topic, user's voice
- User's face (if series has presenter)

**Never use a creator's:**
- Face
- Voice
- Footage
- Logo
- Show name

## Credits to Original Creators

- Vox (Collage Explainer)
- 小Lin说 (Finance Explainer)
- Kurzgesagt (Animated Science)
- Fern (3D Brand, 3D True Crime)
