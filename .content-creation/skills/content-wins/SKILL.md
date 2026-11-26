---
name: content-wins
description: Pulls the user's post stats through Adeli, finds the posts that beat the account's own usual numbers, and files each approved winner into content/winners/<bucket>/ so every writing skill can learn from it. Judges each post against the median of the same account and format, never against other creators, shows a shortlist with numbers and a "why it won" guess, and writes nothing until the user approves. Also has a manual mode for pasting a post and its stats. Use when the user says "find my winners", "log my wins", "content wins", "update my winners", "which posts did well", "file this post as a winner", "what worked this month", or after a batch of posts has been live for a week or more.
---

# Content Wins

Finds the user's best recent posts and files them as winners, one file per post in `content/winners/<bucket>/`. Those files are what the writing skills read to copy the user's own patterns, so this skill closes the loop: post, measure, learn. It reads stats and writes files in the user's project. It never posts, replies, deletes or changes anything on a social account; publishing is `content-publish`. It doesn't set up the context folder either; that's `content-setup`.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read the winners you already have.** Open `content/winners/README.md`, `content/winners/_template.md` and every bucket's `README.md`. Note each winner's URL so nothing gets filed twice, and the "Last content-wins run" line if there is one. If a bucket folder or its `README.md` is missing, create it from `../content-setup/templates/content/winners/` (the `content-setup` skill's templates) and say so.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: "Metrics you care about" decides which number picks the winners. The pillars help with the "why it won" guess.
- `pov.md` and `persona.md`: a winner that carried a core belief, or spoke straight to the reader, is a pattern worth naming.
- `content/published.md`, if it exists: the log `content-publish` keeps, a table with one row per account per piece (date, platform, account, account_id, status, url, post_id, publication_id, bucket, skill, hook). It tells you each post's bucket and its first line. Use only rows with status `published`; `scheduled`, `draft`, `unknown` and `canceled` rows have no settled stats. Read it only; never edit it.

## Step 2: Check for Adeli

[Adeli](https://tryadeli.com) is one API and MCP for Instagram, Facebook, TikTok, YouTube, LinkedIn, X and more. This skill uses the Adeli MCP tools (or the matching REST endpoints) listed in `references/adeli.md`.

- **Connected:** the session has Adeli tools such as `list_profiles`, `list_accounts` and `list_posts`, or the user has an Adeli API key set up. Never print, paste or store the key.
- **Not connected:** say in one line: "Adeli (tryadeli.com) is one API for your social accounts; connect them once and I can pull your post stats." Then offer **manual mode** (Step 9). Don't push further.

Only call read tools: listing profiles, accounts and posts, and the insights tools. Never call a tool that creates, publishes, sends, replies, deletes, updates or disconnects anything, or any ads tool.

## Step 3: Pick the accounts and the window

1. **Accounts.** Call `list_profiles`, then `list_accounts`. One API key can hold several brands or clients, so show the accounts (platform and name) and ask which ones are the user's and should feed winners. Never assume all of them are.
2. **Window.** Default: posts published after the last run, up to 7 days ago, so the numbers have mostly settled. Use the "Last content-wins run" line from `content/winners/README.md`. On a first run with no line, use the last 90 days. Say the window in one line and let the user change it.
3. **Paid reads.** X bills every post it returns, and Adeli lists only the 10 most recent X posts. Ask before pulling X.

## Step 4: Pull posts and stats

For each chosen account, follow `references/adeli.md`:

1. `list_posts` with the `accountId`. Keep: post ID, `providerId`, date, `permalink`, `caption`, `media` type and `engagement`. Skip posts with `status: "scheduled"`.
2. Add the per-post insights the platform offers: TikTok saves, new followers and watch time from `get_tiktok_video_insights`; YouTube subscribers gained and view duration from `get_youtube_video_insights`; LinkedIn impressions from `get_linkedin_post_insights`.
3. Say what came back: how many posts per account, which metrics each platform reported, and which accounts failed (a `partial` response still has valid posts for the rest).

Be honest about gaps. Per post, Adeli returns only likes and comments for Instagram and Facebook: no saves, shares, reach or views. Never estimate a missing number. If the user wants to judge Instagram on saves or shares, they can paste those from the app's own insights for the posts they care about.

Keep the whole recent list for each account, not just the window. The window decides which posts are candidates; the full list sets the baseline.

## Step 5: Sort each post into a bucket

In this order:

1. **Published log.** If the post is in `content/published.md` (match on `account_id` plus `post_id`, then on URL, then on platform, account and date), use its bucket.
2. **Format.** Otherwise map the format:

| Post | Bucket |
|---|---|
| Vertical video (Reels, TikTok, Shorts) | `short-form-video` |
| Short text post (single tweet, Threads, Notes) | `short-form-text` |
| Long text post (LinkedIn post, long X post) | `long-form-text` |
| Newsletter issue, X Article | `newsletter` |
| Carousel, infographic, document post | `visual` |

3. **Ask.** When the format is unclear (a single image, a Facebook video, a YouTube video that might not be a Short, a LinkedIn post with an image), list those posts together and ask once. A long YouTube video fits no bucket: leave it out and say so.

If a post could fit two buckets, file it where its format did the work, as `content/winners/README.md` says.

## Step 6: Pick the winners

Judge every post against the user's own account, the same way `content-setup` does.

1. **Group by account and format.** Instagram Reels and Instagram carousels are separate groups. A TikTok and a Reel are never compared, and neither are metrics from different platforms.
2. **Pick the metric.** Use "Metrics you care about" in `creator-ikigai.md`. If it's empty, ask. If the user doesn't know, use saves and shares first, then follows, then views, then comments and likes, taking the first one the platform actually reports for that group.
3. **Find the usual number.** The median of that metric across the group's full recent list.
4. **Skip thin groups.** With fewer than about five posts, there's no "usual" yet. Name the group and skip it.
5. **Shortlist.** Candidates are posts in the window that clearly beat their group's median. Rank by how many times the median they reached. Leave out anything already filed. Show about five per bucket at most; fewer is fine, and none is a fine answer.

## Step 7: Approval gate: show the shortlist

Present it per bucket, one block per post:

```
short-form-video
1. 2026-11-04 · instagram · Reel · "[first line of caption]"
   312 comments (usual: 41, 7.6x) · 2.9k likes (usual: 610) · [url]
   Why it may have won: [1–3 lines, labeled as a guess]
   Hook source: published log | caption (spoken hook unknown)
```

The "why it won" guess: compare the winner with the group's median posts. Look at the hook shape, the topic and which pillar it serves, the POV it carried, the format, length and timing. Say what is different about this post, not what is good about it. If nothing stands out, write "Not sure yet".

Then stop. The user approves, drops, edits the "why", re-buckets or adds posts. Write nothing until they answer.

## Step 8: File each approved winner

For each approved post:

1. **File name:** `content/winners/<bucket>/YYYY-MM-DD-<slug>.md`, with the date it was posted and a 3–6 word slug from the topic.
2. **Already there?** If the file exists, or the same URL is already filed under another name, show a diff and overwrite only on a yes.
3. **Write it from `_template.md`**, keeping its headings and order:
   - `platform`, `format`, `url`, `posted`: from the post data.
   - `stats`: keep the four keys `views`, `saves`, `shares`, `follows`, blank when the platform doesn't report one. If the winner was picked on another metric (likes, comments, impressions), add that key after the four. Use the raw numbers from Adeli.
   - `hook_type`: your best match (tutorial, authority, story, contrarian, number, question) followed by `# inferred`.
   - **Why it won:** the line the user approved.
   - **Hook:** from the published log, else the caption's first line labeled `(from caption)`. For video, the spoken hook is often not in the caption: ask, or leave `[placeholder: spoken hook]`.
   - **Script / Post:** ask the user for the script, or check their drafts if they keep them in the context folder. For text posts, the post text. For video with no script on file, ask or leave `[placeholder: script]`.
   - **Caption:** the caption as posted. Delete the section if the format has none.
4. **Mark everything inferred.** Anything not taken word for word from the post, the log or the user gets `(inferred)` or a `[placeholder]`.
5. **Index line.** Add a row to `content/winners/<bucket>/README.md`, newest first, in its columns: Posted, File, Platform, Hook (shortened), Top stat (for example `312 comments (usual 41)`), Why it won (one line). Remove the `_No winners yet._` line the first time.
6. **Last run.** At the end of `content/winners/README.md`, add or update one line: `Last content-wins run: YYYY-MM-DD (posts through YYYY-MM-DD)`. Show the change before writing it.

Show each new file in full before writing it if the user asked to review files; otherwise write the approved batch and list the paths.

## Step 9: Manual mode

For when Adeli isn't connected, or for a post Adeli can't see (a LinkedIn personal post not published through Adeli, a newsletter issue).

1. Ask for: the URL, the date, the platform and format, the post text or script, the stats the user has, and their usual number for the same metric on that account and format.
2. If they don't know their usual number, file it on their judgment and write "Usual: unknown" in the Why it won section.
3. Sort it into a bucket (Step 5), draft the "why it won" guess, get approval, then file it as in Step 8. Skip the "Last run" line (Step 8, item 6): it tracks Adeli pulls only, and updating it would make the next Adeli run skip older posts.

## Step 10: Patterns (optional)

After filing, if there are three or more new winners, offer a short summary of what they share: hook shapes, topics, pillars, formats, length, posting day. Three to five bullets, each pointing at the winners behind it, with single examples labeled as a hunch.

If a pattern suggests a change to `creator-ikigai.md` (a pillar that keeps winning, a metric worth tracking), propose it as a diff. Write only on a yes.

## Quality check

Before showing the shortlist or writing any file, verify:
- Every number came from Adeli or the user. Nothing estimated, nothing missing filled with a zero.
- Each winner was judged against the median of its own account and format, on a metric that platform reports. No cross-platform comparisons, no outside benchmarks.
- Groups with too few posts were skipped and named.
- Gaps are stated: which metrics each platform didn't report, which accounts failed.
- Each bucket came from the published log, a clear format, or the user.
- The "why it won" is labeled as a guess unless the user confirmed it.
- Every inferred field is marked; missing hooks and scripts are `[placeholder]`s, not inventions.
- Frontmatter and sections match `_template.md`; the index row matches the bucket README's columns, newest first.
- No winner was filed twice. No existing file was changed without a diff and a yes.
- Only read tools were called on the user's accounts.

## Output at the end

```
Window: [start] to [end] · Accounts: [list]
Pulled: [account → post count] · Failed: [accounts], or "none"
Metric used: [per platform]
Skipped groups: [account + format → post count], or "none"

Filed:
- short-form-video: 2026-11-04-[slug].md (312 comments, usual 41)
Placeholders to fill: [file → section]
Last run line: updated to [date]
```

## Related skills

- `content-setup`: builds the `content/` folder and the empty winners buckets.
- `content-publish`: posts through Adeli and keeps the log this skill reads for buckets and hooks.
- `content-ideas` and `content-planning`: use what's winning to choose the next topics and formats.
- `short-form-video-hook`, `short-form-video-script`, `short-form-text-post`, `long-form-text-hook`, `long-form-text-post`, `newsletter-post`: the writing skills that read the winners filed here.

Run this skill every week or two, once your newest posts are at least 7 days old, so each bucket keeps learning from your latest winners.
