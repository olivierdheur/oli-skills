---
name: short-form-text-from-newsletter
description: Turns one published newsletter issue (Substack, X Article or any web post) into a batch of short posts for X, Substack Notes and Threads, each linking back to the issue. Pulls the strongest standalone ideas, drafts three versions of each in the user's voice, lets the user pick or cut every idea in one review, then cuts the approved posts per platform with script-verified character counts and a tracked link, proposes a posting schedule and hands the approved posts to content-publish. Use when the user says "turn my newsletter into posts", "short posts from this issue", "repurpose my Substack into notes and tweets", "promote my newsletter on X", "notes from this article", or names a published issue and asks for X, Threads or Notes posts from it.
---

# Short-Form Text From Newsletter (X, Substack Notes, Threads)

One published issue becomes a week or two of short posts, each with a link back to the issue. This skill finds the ideas that stand on their own, drafts them, gets the user's picks in one pass, and packages the keepers for each platform. It does not write a post from a raw idea (use `short-form-text-post`), write or format the issue itself (use `newsletter-post` and `newsletter-format`), or post anything on its own (approved posts go to `content-publish`).

```
Pull issue → Extract ideas → Draft 3 versions each → GATE 1: user picks or cuts
→ Cut per platform + link → GATE 2: user approves schedule → Hand off to content-publish
```

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/short-form-text/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**For this skill specifically:**
- Voice, tone, banned words and punctuation come from `creator-ikigai.md`. This skill supplies method only.
- Platform limits and counting rules are in `references/platforms.md`. Use only those numbers.
- If `short-form-text-post` is installed, use its note types and formulas (its Steps 2–3) to draft each idea. If it isn't, use the compact version in Step 4 below.
- Check `creator-ikigai.md` for the user's link-back line, link-tracking convention, timezone and posting cadence. Ask once for anything missing (Step 2).

## Step 2: Pull the issue

Accept the issue in any of these forms: a file in the user's content folder (prefer the final formatted version over drafts), a live URL, or pasted text. If the user's context names a source of truth for drafts, that wins over local copies.

Then establish:
- **The published URL.** Posts link to the live issue. If it isn't published yet, stop and ask for the URL. Never guess a slug.
- **A campaign slug**, if the user tracks links: reuse the one the issue already uses in its own links, or slugify the title.
- **The link-back line** for each platform. Use the user's own if their context has one. Otherwise suggest one short, plain line in their voice (for example `More on this in the full issue: <URL>`) and confirm it once. One line per batch keeps the series consistent.
- **A working folder**, for example `short-posts/` next to the issue. If it already holds a batch for this issue, say so and ask whether to add posts or start over.

## Step 3: Extract ideas

Read the whole issue and list the **standalone ideas**: points that land without the article around them. Good sources:

- a personal story beat
- a named concept, distinction or framework from the issue
- a finding or number, plus what it means for the reader
- a contrarian line or a strong opinion
- a practical step or exercise the reader can try today
- a before/after or then/now contrast
- a credibility beat ("I'm not an expert, but…") that earns attention on its own

Default to **10–15 ideas** unless the user gives a number. Two ideas can share a story only if they make different points. Skip anything that only works after the article's setup.

Show the list as one line each (`3. The audit nobody runs: most gains were low-hanging fruit`) and go straight into Step 4. Don't wait for approval of the list; the user cuts ideas at Gate 1.

## Step 4: Draft three versions of each idea

For each idea, write **three meaningfully different versions**, each with a short angle label. The versions differ in angle, opening or emphasis, not just wording or length.

If `short-form-text-post` isn't installed, pick from these note types: single-punch wisdom, proof story, pattern observation, contrarian statement, problem → solution, list-based tactical, personal story, direct advice. Default to 3–5 sentences.

Rules for every draft:
- **Facts come from the issue** or the user's context. Never invent an anecdote, number or quote. If a version needs a story, check the story bank first; otherwise leave a `[placeholder]`.
- **The first line earns attention alone.** A cold reader doesn't know the user, so put credibility inside the hook (a real number, credential or outcome from the issue) or open with a genuinely contrarian claim. Write it as a full sentence; never chop it into a two-line fragment.
- **Each post delivers value on its own.** The link is extra, not the payoff. Don't write "read the issue to find out" teasers.
- Follow the user's voice, banned words and punctuation rules exactly.

Skip `short-form-text-post`'s own one-at-a-time approval stop. This skill batches every idea into one review.

Write everything to `drafts.md` in the working folder:

```
# <Issue title>: short-post drafts

Drafts for review, <YYYY-MM-DD>. Not approved.

## 1. <idea label>

### 1a: <angle>
<draft>

### 1b: <angle>
<draft>
```

## Step 5 (GATE 1): The user picks or cuts every idea

Point the user to `drafts.md` so they can edit in place, cut ideas and pick versions in one pass, or review in chat if they prefer.

- Picks look like "1a, 2c, 4b". More than one version of an idea may be kept as separate posts.
- Apply the user's edits word for word.
- Revision requests without a pick get revised and shown again.
- Silence is not approval. Don't move on until every idea is picked or cut.

Give each kept post a stable ID (the version label, like `4b`). It's used in the schedule and in link tracking.

## Step 6: Cut per platform and add the link

For each approved post, the approved text is the master. Then:

1. **Substack Note:** the master as written, plus the link-back line as its last line, after a blank line.
2. **X:** follow the cutting method in `short-form-text-post` Step 6 if installed: try a single post, tighten if slightly over, otherwise split into a thread at natural seams with a post 1 that stands alone. Then add the link-back line as a **new final post**, turning a single post into a two-post thread. Don't put the link in post 1 (see `references/platforms.md`).
3. **Threads:** the same method with the Threads limit. The link-back line goes in a **new final item**.

Keep wording identical to the master wherever it fits. If a platform version drops or rewords anything, add one line saying what changed.

**Link tracking (if the user tags links).** Use their convention. A common one:

```
<issue URL>?utm_source=<x|threads|substack>&utm_medium=social&utm_campaign=<campaign-slug>&utm_content=<post-id>
```

Use the same campaign slug as the issue's own links, so newsletter and social traffic group together. Lowercase, hyphens, no spaces. Open one finished URL to check it reaches the issue.

**Count every segment by script** (`references/platforms.md`), never by estimate. X counts any link as 23 characters; Threads counts the full URL, tracking tags included. Anything over the limit gets tightened or re-split, then recounted.

Write the final set to `posts.md` in the working folder: one section per post ID, each with its Substack Note, X and Threads blocks, character counts on every segment, and the link segment included.

## Step 7 (GATE 2): Propose the schedule

Propose a table and wait for the user's go-ahead:

| # | Post ID | Date | Time (user's timezone) | X | Threads | Substack Notes |
|---|---|---|---|---|---|---|

Defaults, unless the user's context or the user says otherwise:
- Use the cadence in the user's context. If there is none, ask how many posts a day and at what times.
- Lead with the strongest personal-story or proof post. Spread similar posts apart.
- The same post can go out at the same slot on every platform.
- A date and time always carry a timezone. Never assume UTC.

## Step 8: Hand off to publish

Nothing here posts or schedules on its own.

- Pass each approved post, its platform versions and its slot to `content-publish`, which shows the exact text per account and asks for a yes before anything goes out. Name the bucket (`short-form-text`) and this skill for its log.
- For any platform `content-publish` can't post to, deliver the copy-ready text with its slot so the user can post it themselves or with their own scheduler.
- If `content-publish` isn't installed, deliver everything copy-ready, in schedule order.

Write `schedule.md` in the working folder: one row per post with ID, date and time, platforms, the final link per platform, and its status (scheduled through `content-publish`, posted by the user, or not yet scheduled, with why). Later edits to this batch start from this file.

Report to the user: posts per platform, the first post's time, anything not scheduled, and the campaign slug to filter on in their analytics.

## Quality check

Before showing anything, verify:

- [ ] The issue is published and its URL confirmed, not guessed
- [ ] Every idea stands alone; no post depends on the article's setup to make sense
- [ ] Every fact, number and story comes from the issue or the user's context; gaps are `[placeholder]`
- [ ] Three meaningfully different versions per idea, with angle labels
- [ ] Gate 1: the user picked or cut every idea; their edits applied word for word
- [ ] Hooks carry credibility or a real contrarian claim, in full sentences
- [ ] Passes the voice, banned-word and punctuation rules in `creator-ikigai.md`
- [ ] Every segment is under its platform limit, counted by script, full tracked URL included where the platform counts it
- [ ] Link sits in a final X post, a final Threads item and the last line of the Note; never in X post 1
- [ ] One link-back line used across the batch; tracking tags consistent
- [ ] Gate 2: the user approved the schedule before anything went to `content-publish`

## Related skills

- `short-form-text-post`: a single short post from a raw idea, and the drafting formulas this skill reuses.
- `newsletter-post`: write the issue.
- `newsletter-format`: titles, buttons, links and footer for the issue.
- `long-form-text-post`: longer posts for LinkedIn and X.
- `content-planning`: fit the batch into the wider calendar.
- `content-publish`: post or schedule the approved posts.
- `content-setup`: build the content context folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
