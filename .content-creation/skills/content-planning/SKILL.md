---
name: content-planning
description: Builds the user's next two weeks of content as a day-by-day grid across their buckets (short-form video, short-form text, long-form text, newsletter, visual), from kept ideas in content/ideas.md, drafts in progress and what's already scheduled. Hits a posting cadence and a practical/commentary mix, puts timely ideas first, sets make-by dates (film or draft days), flags overdue and idle work, and names the skill for each slot. Writes content/calendar.md only after the user approves. Does not write or publish anything. Use when the user says "plan my content", "content calendar", "plan next week", "plan the next two weeks", "schedule my content", "what should I post when", or "fill my calendar".
---

# Content Planning

Turns the user's inventory (kept ideas, half-done drafts, finished pieces) into dates. It assigns each piece a publish day and a make-by day, checks the plan against a cadence and a format mix, and says plainly where the user will run out. **The job is scheduling, not writing.** It never writes hooks, scripts or posts (each bucket's writing skill does), and it never posts or schedules on an account (`content-publish` does, once a piece is finished and approved).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read every bucket's winners index.** This skill spans all buckets, so open the `README.md` in each folder under `content/winners/`. Read the index lines only, to see which formats and topics are winning. Don't open winner files.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: the pillars (to judge which ideas are worth pulling forward), "Channels and goals" (the cadence per channel, in its "How often" column), any mix target or making day the user has written down, their timezone, and guardrails.
- `persona.md`: the tiebreak between two similar ideas is "which one would this reader save".
- Winners indexes: a format or pillar that keeps winning earns the better slots.

## Step 2: Gather the inventory

Read these, each one optional:

- **`content/ideas.md`**: rows with status `new` (and `planned` rows not yet on a date). The format is in `content-ideas`.
- **Drafts in progress the user names**: files, folders or pasted pieces. For each, note its bucket and how far along it is.
- **`content/published.md`**: the last 2–4 weeks show the real cadence and mix, and topics that just went out. Rows with status `scheduled` or `draft` are already taken slots; respect them.
- **`content/calendar.md`**: the last plan. Slots in the past that never went out are overdue; slots in the new window are kept unless the user says otherwise.

If there is no inventory at all, say so and offer `content-ideas` first. Don't build a calendar of empty slots.

## Step 3: Confirm cadence and mix

Use targets from `creator-ikigai.md` if they're there. Otherwise ask once, with this default for the user to confirm or change:

| Bucket | Default per week | Default days |
|---|---|---|
| `short-form-video` | 3 | Mon, Wed, Fri |
| `short-form-text` | 3 | Tue, Thu, Sat |
| `long-form-text` | 2 | Tue, Thu |
| `newsletter` | 1 every two weeks | Thu of week 2 |
| `visual` | 1 | Wed |

Only include buckets the user posts in. Also confirm:

- **Days off.** Default: Sunday.
- **Mix.** Default per bucket per week: 60–70% **practical**, 30–40% **commentary** (below). Check it per week, not per day.
- **Making day.** The day the user films or batches drafts. Default: none; each piece gets its own make-by date two days before it publishes.
- **Horizon.** Default: 14 days starting tomorrow. The user can change it ("next week", "three weeks", "starting Monday").

Ask the user if they want to save the confirmed cadence, mix and making day to `creator-ikigai.md` so the next run doesn't ask. Show the diff; write only on a yes.

## Step 4: Classify every item

Both axes, for every item, before anything gets a slot.

### Practical or commentary

- **Practical:** the reader leaves with something to do. Tutorials, how-tos, lists, teardowns, cheat sheets, workflows, tool walkthroughs. Signals: "how to", "I built", "N ways", a named tool as the subject.
- **Commentary:** a take, a position, a story, an argument. Signals: a named person and their claim, "why I", "don't", "actually", a contrarian frame, a personal story.

When it straddles both, judge the payoff: something they can do is practical; something they'd argue about is commentary. Carousels and infographics count as practical unless they're clearly a take.

### Timely or evergreen

**Timely beats ready.** An item is timely if its hook decays in days or weeks: a launch, a named person's recent statement, a new report, a policy change, a news cycle. `timely: yes` in `ideas.md` marks it. A timely item takes the earliest open slot in its bucket, however unfinished it is, and is flagged:

> RUSH: needs [hook / script / draft] by [make-by date] to publish [date]

Everything else is evergreen and goes in by readiness, most ready first:

`finished and approved` → `needs final edit` → `filmed or drafted` → `outlined` → `idea`

Finished pieces are the cheapest thing to ship, so they fill the nearest days unless a timely item outranks them.

## Step 5: Build the grid

Fill each bucket's days from Step 3 with the classified items.

- **Respect what's taken.** Scheduled rows in `published.md` and kept slots in `calendar.md` stay where they are.
- **Mix per day.** A day with two pieces in the same bucket is one practical plus one commentary, never two commentary. A day with one piece defaults to practical.
- **Spacing.** Don't run the same series or the same pillar in the same bucket on back-to-back days. Keep borrowed-authority pieces ("[Name] said X") to two a week, or the feed reads like a quote account.
- **Repurposing is fine.** The same idea in two buckets on the same day (a video and a LinkedIn post) is intentional, not a duplicate. Mark it.
- **Topics just published.** Don't put an idea within a week of a published post on the same topic, unless it's a planned follow-up.

### Make-by dates

Every slot with work left gets a make-by date:

- **With a making day:** the making day strictly before the publish date. Publish Wed, making day Tue → make by the Tue the day before. Publish Tue → make by the Tue a week earlier.
- **Without one:** two days before the publish date.
- **No make-by** for pieces that are finished.
- **Make-by already passed?** Move the slot later, or keep it and flag it RUSH with the real deadline.

For video, count the pieces due on each making day. If one day carries more than 8 (or a limit the user set), flag it as overloaded and propose moving the easiest pieces to the making day before, or pushing them a week.

### When the inventory runs short

Don't pad. Fill what you honestly can, leave the rest as `gap`, and name the shortfall: which bucket, practical or commentary, how many. Point to the best unused ideas in `ideas.md` by name, or suggest `content-ideas` for that bucket. A short, honest week beats a full week of filler.

## Step 6: Approval gate

Present the whole plan in one message, then stop. Write nothing before the user approves.

Lead with what needs attention, because a plan only works if the user acts on it:

```
## Needs your attention first

Overdue: planned before today, not published
- [piece] · was due Wed 11 Nov · proposing Mon 16 Nov

Finished but unscheduled
- 3 pieces are done and have no date. They're the cheapest content you have.

Blocked: dated but not ready
- [piece] · publishes Wed 18 Nov · still an idea · make by Tue 17 Nov
```

Then one table per week:

```
## Week 1 (Mon 16 – Sun 22 Nov)

| Day | Bucket | Piece | Type | Readiness | Make by | Next skill |
|---|---|---|---|---|---|---|
| Tue 17 | short-form-text | [piece] | commentary | finished | - | content-publish |
| Wed 18 | short-form-video | [idea] (2026-11-12-weekly-report-prompt) | practical | idea | Tue 17 | short-form-video-hook |
| Wed 18 | long-form-text | [idea] (same idea, repurposed) | practical | idea | Tue 17 | long-form-text-hook |
| ... | | | | | | |
| Sun 22 | off | | | | | |

Mix: short-form-video 2 practical / 1 commentary · long-form-text 1 / 1
Making load: Tue 17 Nov, 3 videos
```

Then the gaps and the changes to other files:

```
## Gaps
- long-form-text runs dry in week 2: 1 of 2 slots filled. Best unused ideas: [idea], [idea].
- No commentary in short-form-video for week 2.

## Will also change
- ideas.md: 9 rows → status planned
```

End with exactly:

> Approve, or tell me what to move, swap or drop and I'll rebuild before writing.

Accept "approve", swaps, "move X to Friday", "drop X", "no newsletter this time". Rebuild and show the plan again after any change to cadence, mix or more than a couple of slots. For a small swap, confirm the final grid in one line, then write.

## Step 7: Write the calendar

After approval only:

1. **`content/calendar.md`.** Create it from the format below if it doesn't exist. Add the new plan as a section at the top, under the header. If an older section overlaps the same dates, show which rows change and replace them only on the yes you already have. Leave past sections as they are; they're the record of what was planned.
2. **`content/ideas.md`.** Set `status` to `planned` for every idea placed. Change nothing else in the row.
3. **Verify.** Read both files back and check that every approved slot is in `calendar.md` with the right date, and every placed idea shows `planned`. Report the counts and name anything that didn't take.

### calendar.md format

```markdown
# Calendar

Two-week plans from content-planning, newest first. Edit by hand any time; keep the columns.
content-publish logs what actually went out in published.md.

## Plan: 2026-11-16 to 2026-11-29 (approved 2026-11-15)

Cadence: short-form-video 3/wk · short-form-text 3/wk · long-form-text 2/wk · newsletter 1 per 2 wks
Mix target: 60–70% practical · Making day: Tue · Days off: Sun

| date | bucket | platforms | piece | idea_id | type | timely | readiness | make_by | next_skill | status |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-18 | short-form-video | instagram, tiktok | One prompt replaced my weekly report | 2026-11-12-weekly-report-prompt | practical | no | idea | 2026-11-17 | short-form-video-hook | planned |
| 2026-11-17 | - | - | gap: long-form-text, commentary | - | commentary | - | - | - | content-ideas | gap |
```

| Column | What goes in it |
|---|---|
| `date` | Publish date, `YYYY-MM-DD` |
| `bucket` | The bucket, or `-` for a day off |
| `platforms` | From "Channels and goals" for that bucket |
| `piece` | The idea's one-line topic or the draft's title. `gap: <bucket>, <type>` for an unfilled slot |
| `idea_id` | The `id` from `ideas.md`, a draft's file path, or `-` |
| `type` | `practical` or `commentary` |
| `timely` | `yes` or `no` |
| `readiness` | `idea`, `outlined`, `drafted`, `filmed`, `needs-edit` or `finished` |
| `make_by` | Make-by date, or `-` if finished |
| `next_skill` | The skill that moves it forward (below) |
| `status` | `planned`, `gap`, `scheduled`, `published`, `moved` or `dropped`. The user updates it, or a later run does when `published.md` shows the post went out |

Escape any `|` as `\|`, and keep each cell on one line.

## Step 8: Hand off

Close with the next actions, not a summary:

```
Written: 13 slots in calendar.md · 9 ideas set to planned · verified

Next:
- 4 videos need hooks by Tue 17 Nov → short-form-video-hook
- 2 LinkedIn posts need drafts by Sat 21 Nov → long-form-text-hook
- 3 finished pieces are ready to schedule for their dates → content-publish
- long-form-text week 2 has 1 gap → content-ideas
```

Next skill per slot:

| Readiness | Bucket | Next skill |
|---|---|---|
| idea, outlined | short-form-video | `short-form-video-hook` → `short-form-video-script` → `short-form-video-caption` |
| idea, outlined | short-form-text | `short-form-text-post` |
| idea, outlined | long-form-text | `long-form-text-hook` → `long-form-text-post` |
| idea, outlined | newsletter | `newsletter-post` |
| idea, outlined | visual | `visual-carousel` |
| filmed, needs-edit | short-form-video | `short-form-video-caption` once the edit is done |
| finished and approved | any | `content-publish`, which can schedule it on Adeli for its calendar date and time |

This skill never calls `content-publish` itself. The user takes each finished piece there, and approves the exact post there.

## Quality check

Before showing the plan, verify:
- Every slot holds a real item from `ideas.md`, a named draft, or a finished piece. Empty slots say `gap`; nothing invented.
- Already scheduled posts and kept slots weren't moved.
- Timely items take the earliest slots in their bucket, flagged RUSH if unfinished; evergreen items go in by readiness.
- Each bucket hits its cadence or the shortfall is named. The mix is checked per week, and a short commentary share is said out loud.
- No day stacks two commentary pieces in one bucket; same series or pillar isn't back to back; borrowed-authority pieces are two a week at most.
- Every unfinished slot has a make-by date, and overloaded making days are flagged.
- Every slot names its next skill.
- Nothing was written to `calendar.md`, `ideas.md` or `creator-ikigai.md` without a yes, and the write was verified by reading the files back.

## Related skills

- `content-ideas`: finds and keeps the ideas this skill schedules.
- `short-form-video-hook`, `short-form-video-script`, `short-form-video-caption`, `short-form-text-post`, `long-form-text-hook`, `long-form-text-post`, `newsletter-post`: write the pieces each slot needs.
- `content-publish`: posts or schedules each finished, approved piece on its date through Adeli, and logs it in `published.md`.
- `content-setup`: builds the `content/` folder and the channels table this skill reads.

After posting, run `content-wins` so winners feed back into `content/winners/<bucket>/` and shape the next plan.
