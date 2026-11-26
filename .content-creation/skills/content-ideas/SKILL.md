---
name: content-ideas
description: Finds post ideas in the user's own recent material (notes, meeting notes, saved links, chat exports, drafts, recent winners, and comments or DMs through Adeli if connected), scores each one against the user's pillars, point of view and reader, and sorts them by bucket (short-form video, short-form text, long-form text, newsletter, visual) with the skill that writes each one. The user picks which ideas to keep; kept ideas can be saved to content/ideas.md for content-planning. Use when the user says "content ideas", "what should I post about", "mine my week for content", "I need ideas", "find me topics", "what can I make from my notes", or has no topic for a writing skill.
---

# Content Ideas

Turns what the user already did, said and saw into post ideas, so nothing gets invented and nothing starts from a blank page. It reads only sources the user points to or has connected, filters every signal through their pillars, point of view and reader, scores what survives, and sorts it by bucket with the skill that writes it. It does not write hooks, scripts or posts (each bucket's writing skill does that), and it does not put ideas on dates (`content-planning` does).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read every bucket's winners index.** This skill spans all buckets, so open the `README.md` in each folder under `content/winners/` (short-form-video, short-form-text, long-form-text, newsletter, visual). Read the index lines only; open a winner file only when an idea extends it. Note which topics, hook shapes and formats keep winning. If a bucket has no winners yet, skip it.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: the pillars (every idea serves one), the Takes, "Channels and goals" (which buckets the user actually posts in), guardrails (topics, people and private details that stay out), and proof the user can cite.
- `pov.md`: the core POV and sub-POVs. The best ideas carry one of them.
- `persona.md`: the one reader. Every idea is judged by whether this person would stop, save or share.
- `content/ideas.md`, if it exists: ideas already kept, so you don't pitch the same one twice.
- `content/published.md`, if it exists: what already went out, so you can pitch a follow-up or a second angle instead of a repeat.

## Step 2: Agree on the sources and the window

Ask once, in one message, before reading anything:

- **Window.** Default: the last 7 days. The user can widen it ("last 30 days") or narrow it.
- **Sources.** Offer what this session can actually reach, and only those. Typical options:
  - a notes folder or journal (a folder of Markdown or text files, a voice-note transcript folder)
  - meeting notes or call transcripts the user exports or has connected
  - saved links, bookmarks or a reading list
  - chat or email exports the user drops in
  - drafts in progress
  - their own recent winners (from Step 1) and `published.md`
  - comments and DMs on their accounts, through [Adeli](https://tryadeli.com) if it is connected
- **Buckets.** Default: every bucket the user posts in, per "Channels and goals". The user can ask for one ("LinkedIn only").

Every source is optional. If the user points to nothing and nothing is connected, ask them to paste a few lines about their week (what they built, learned, argued about, got asked) and mine that.

Read only. Never move, edit, send, reply, like or delete anything in a source. Never open a source the user didn't name or approve.

**Adeli, if connected:** use read tools only: `list_profiles`, `list_accounts`, `list_posts`, `list_comments`, `list_messages`. Ask which accounts count. Never call a tool that sends, replies, publishes, deletes, updates or disconnects, or any ads tool. Treat names and handles in comments and DMs as private: an idea can use the question someone asked, never who asked it.

## Step 3: Mine signals

Go through each source and pull **signals**: specific, real moments that could carry a piece. For each one, keep the source, the date and the raw detail (a quote, a number, what happened).

| Source | Look for | Extract |
|---|---|---|
| Notes, journal, voice notes | Something the user figured out, changed their mind on, or keeps returning to | The insight and the moment it landed |
| Meeting notes, call transcripts | Questions people asked, objections, a line that reframed the conversation, a decision and its reason | The non-obvious insight, the "aha", the question behind the question |
| Work in progress (projects, tasks, drafts) | What was built or shipped, an experiment, a mistake fixed, a decision made | What was done, what was learned, why it matters to someone else |
| Saved links, reading list | Claims the user agreed or disagreed with, news in their space | The user's reaction, not the article's summary |
| Chat or email exports | Advice the user gave, a debate, a take they defended | The advice or take in their words |
| Comments and DMs | Repeated questions, confusion, pushback, requests | The question many readers share |
| Recent winners, published log | Posts that beat the usual, threads left open | A follow-up, a second angle, the same idea in another bucket |

Skip anything covered by a guardrail in `creator-ikigai.md`, anything about a person who hasn't agreed to be in content, and anything confidential (clients, money, health, deals) unless the context says it's fine to share.

## Step 4: Turn signals into ideas

For each signal, answer four questions. If the first answer is no, drop it.

1. **Would the reader in `persona.md` care?** Not "is this true" but "would they stop for it". If no, skip it.
2. **What's the angle?** Not "I did X" but "here's why X matters to you". One line.
3. **Which pillar and which belief?** Name the pillar from `creator-ikigai.md`, and the POV or sub-POV from `pov.md` it carries, if any. An idea that fits no pillar is dropped.
4. **Which bucket?** Use the fit table below. One idea can fit more than one; flag it as cross-format and say how the angle shifts.

### Bucket fit

| Bucket | Fits when | Hand-off skill |
|---|---|---|
| `short-form-video` | It can be shown or argued in under a minute: a walkthrough, a before/after, a screen share, a sharp take with one point | `short-form-video-hook` → `short-form-video-script` |
| `short-form-text` | It lands in a few lines: an observation, a quick tip, a one-line take, something you'd text a friend | `short-form-text-post` |
| `long-form-text` | It needs a story plus a lesson and gives the reader one thing to reuse: a breakdown, a lesson learned, a framework | `long-form-text-hook` → `long-form-text-post` |
| `newsletter` | It has enough depth for 1,000–1,500 words: an argument with layers, a full system, a story with a turn | `newsletter-post` |
| `visual` | It's a list, steps, a comparison or a map that reads better as slides or a diagram | `visual-carousel` |

Only use buckets the user posts in. If an idea fits a bucket they don't use, say so in one line rather than pitching it there.

### Score each idea

Score 1–3 on each, then add them up (out of 9):

| Criterion | 3 | 2 | 1 |
|---|---|---|---|
| **Reader pull** | The reader would save or share it | They'd stop and read | They'd scroll past |
| **Grounded** | A specific real moment, with a detail or number | Real but general | Mostly hypothetical |
| **POV fit** | Carries a core POV or sub-POV clearly | Fits a pillar, no belief behind it | Loose fit |

Add one point (max 9) when the idea extends something in the winners index: same topic, hook shape or format that already beat the user's usual numbers. Say which winner.

Sort by score, highest first, inside each bucket. Drop anything scoring 4 or below unless the bucket would be empty; then keep the best one and say it's thin.

## Step 5: Show the ideas

Group by bucket, in this order: short-form-video, short-form-text, long-form-text, newsletter, visual. Skip empty buckets. Aim for 3–7 ideas per bucket; fewer real ideas beat padding.

```
SOURCES: [what was read, window] · SKIPPED: [sources that failed or were declined]

## short-form-video → short-form-video-hook

1. [One-line topic]   Score 8/9 (pull 3 · grounded 3 · POV 2)
   Angle: [how to frame it for the reader]
   Pillar: [pillar] · Belief: [POV or sub-POV, or "none"]
   Draft hook: [a rough first line, to show the idea, not to use as is]
   Source: [source, date, the detail it came from]
   Cross-format: [long-form-text: angle shift in one line] (only if it fits)
   Builds on: [winner file] (only if it does)
```

After the buckets, add **Top picks**: the 3–5 strongest ideas across all buckets and why each one stands out (score, timeliness, a winner it extends, a gap in what's been published).

Then list **Gaps** in one or two lines if there are any: a pillar with no ideas, a bucket the user posts in that came up empty, a belief in `pov.md` nothing carried.

## Step 6: Approval gate: the user picks

Stop and ask: "Which ideas do you want to keep? Pick by number, edit any line, or ask for another pass on a bucket."

- Keep only what the user picks. Never save the whole list.
- Apply their edits word for word.
- If they want another pass, ask what was missing (a source, a pillar, a bucket) before running again.

## Step 7: Save kept ideas (optional)

Offer to append the kept ideas to `content/ideas.md` so `content-planning` can schedule them. Write only on a yes. If the file doesn't exist, create it with the header below.

```markdown
# Ideas

Ideas kept from content-ideas, newest first. Read by content-planning.
Edit by hand any time; keep the columns.

| added | id | idea | bucket | pillar | angle | draft_hook | source | score | timely | status |
|---|---|---|---|---|---|---|---|---|---|---|
```

| Column | What goes in it |
|---|---|
| `added` | Date kept, `YYYY-MM-DD` |
| `id` | `YYYY-MM-DD-short-slug`, unique in the file; `content-planning` links to it |
| `idea` | The one-line topic |
| `bucket` | `short-form-video`, `short-form-text`, `long-form-text`, `newsletter` or `visual`. A cross-format idea gets one row per bucket, with the same slug plus `-<bucket>` |
| `pillar` | The pillar name from `creator-ikigai.md` |
| `angle` | One line |
| `draft_hook` | The rough first line, in double quotes |
| `source` | Where it came from, short: `meeting notes 2026-11-12`, `DM question`, `notes/2026-11-10.md`. No names of private people |
| `score` | `8/9` |
| `timely` | `yes` with the reason and the date it goes stale (`yes: launch news, stale after 2026-11-29`), or `no` |
| `status` | `new` when added. `content-planning` sets `planned`; the user or a later skill sets `drafted`, `published` or `dropped` |

Rules: add new rows at the top, under the header. Escape any `|` as `\|`, and keep each cell on one line. Skip an idea whose `id` or near-identical topic is already in the file, and say so. Never change or delete existing rows, except to update `status` when the user asks.

## Step 8: Hand off

For each kept idea, name the next step: the bucket's hand-off skill from the table in Step 4, or `content-planning` to put the kept ideas on a two-week calendar. If the user wants to start one now, pass the idea, angle, draft hook and source detail to that skill.

## Quality check

Before showing the ideas, verify:
- Every idea comes from a real signal in a source the user approved, and names it. Nothing hypothetical passed off as real.
- Every idea is specific: not "post about productivity" but the exact moment, claim or result.
- Every idea names a pillar, and the belief from `pov.md` where there is one.
- Every idea is in a bucket the user posts in, with the right hand-off skill.
- Scores are honest, and the sort follows them.
- No guardrail topic, private person, client detail or commenter's identity appears.
- No idea repeats one already in `ideas.md` or `published.md` without saying it's a follow-up.
- Voice and banned words in the draft hooks match `creator-ikigai.md`.
- Nothing was written to `ideas.md` without a yes, and nothing was changed in any source.

## Related skills

- `content-planning`: turns the kept ideas in `ideas.md` into a two-week calendar.
- `short-form-video-hook`, `short-form-text-post`, `long-form-text-hook`, `newsletter-post`: write the piece once an idea is picked.
- `content-setup`: builds the `content/` folder, pillars and POV this skill scores against.
- `content-wins`: files the winners this skill builds on.

After posting, run `content-wins` so winners feed back into `content/winners/<bucket>/` and into the next round of ideas.
