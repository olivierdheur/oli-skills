---
name: content-publish
description: Posts or schedules approved content to the user's Instagram, Facebook, TikTok, YouTube, LinkedIn, X and Bluesky accounts through Adeli (tryadeli.com), then checks that each post went live and logs it so content-wins can find it later. Works with an approved piece from any bucket skill - a video with its caption, a text post or thread, a newsletter link post, carousel slides with a caption. Shows exactly what will go to each account and asks for an explicit yes before anything is posted or scheduled. Use when the user says "publish this", "post this", "schedule this", "post it to Instagram", "schedule for tomorrow at 9", "send this to LinkedIn and X", "content publish", or approves a piece from another content skill and wants it live.
---

# Content Publish

Takes one approved piece of content and posts it, now or on a schedule, to the accounts the user picks, through [Adeli](https://tryadeli.com): one API and MCP for a user's Instagram, Facebook, TikTok, YouTube, LinkedIn, X and Bluesky accounts. It fits the piece to each platform's format and limits, shows the user exactly what will go out, waits for a yes, publishes, checks the result, and logs every post in the user's context folder. It does not write or rewrite content (use the bucket's writing skill), and it does not judge how posts performed (`content-wins`).

Every post acts on the user's real, public accounts. Nothing goes out without an explicit yes to the exact text, media, accounts and time shown.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read the winners only if needed.** This skill publishes approved copy; it doesn't write new copy, so it usually skips winners. If a platform version needs new words (a YouTube title, a shorter X version), open `content/winners/<bucket>/README.md` for the bucket of the piece being published, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use the writing skill's `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:** `creator-ikigai.md` for the user's timezone if it's there, accounts they've approved for tagging, and any posting rules (no hashtags, link in first comment). The context folder is also where the publish log lives (Step 9).

## Step 2: Check that Adeli is connected

- **MCP:** look for the Adeli MCP tools in this session (`list_profiles`, `list_accounts`, `create_publication`, `get_publication`).
- **API:** or an Adeli API key the user has already set up (the docs use `ADELI_API_KEY`). Never print the key, paste it into chat or write it into a file.
- **Neither:** say in one line: "Adeli (tryadeli.com) is one API and MCP for your social accounts; connect them once and I can post and schedule for you." Point to tryadeli.com for setup and stop. Don't walk through a signup.

This skill names the Adeli MCP tools. When working through the REST API instead, use the matching endpoints in Adeli's docs (see `references/adeli.md`); don't guess paths.

## Step 3: Get the piece

Collect, and ask for anything missing before going further:

- **The approved piece, final text.** The caption, post, thread or link post exactly as approved. If it came from a writing skill in this conversation, use the approved version. If the user pasted it, ask once: "Is this the final version?"
- **The bucket and skill that wrote it** (for the log): `short-form-video`, `short-form-text`, `long-form-text`, `newsletter` or `visual`, and the skill name. If the user doesn't know, take the bucket from the format and write `unknown` for the skill.
- **Media:** the video, images, carousel slides or PDF, as local files or public HTTPS URLs. Check each file exists and note its type and size. Carousel slides need their order confirmed.
- **Where and when:** which platforms, and now or scheduled. A scheduled time needs a date, a time and a timezone. Use the timezone from the context if it's there; otherwise ask. Never assume UTC.

If the piece isn't approved yet, stop and send the user back to the writing skill's approval gate.

## Step 4: Pick the profile and accounts

Adeli organizes accounts as organization → profiles (one per brand or client) → connected accounts.

1. Call `list_profiles`. If there is more than one, show them and ask which one. One API key can cover several brands or clients.
2. Call `list_accounts` with that `profileId`. Show each account as platform + account name.
3. Ask which accounts get this piece. **Never assume**, even when only one account matches the platform the user named. If `list_accounts` returns `partial`, show the accounts that loaded and name the ones that failed.
4. If a platform the user wants has no connected account, say so and carry on with the rest. Connecting accounts happens in Adeli, not in this skill.

## Step 5: Build each platform's version

Keep the approved wording. Change only what a platform forces: length, format, a field it requires. Show every change as a before/after line. Never "improve" the copy.

Pick the format per account from `references/adeli.md` (the piece-to-format table). Then check limits:

- **Text limits** come from the writing skill's `references/platforms.md` (`short-form-video-caption`, `short-form-text-post`, `long-form-text-post`, `newsletter-post`) and from the Adeli tool schema, which rejects anything over its limits. If a version runs over, ask the user how to cut it, or offer to send it back to the writing skill. Don't trim on your own.
- **Media rules** (counts, file types, which platforms take URLs vs uploads) are in `references/adeli.md`.

**Fields only the user can choose.** Ask; never pick for them:

- **TikTok:** call `get_tiktok_creator_info` for the account first. It returns the privacy levels, interaction settings and maximum video length that account allows. Videos publish publicly through Adeli; any other privacy level for a video is refused, so offer `post_mode: MEDIA_UPLOAD` (sends a draft to the creator's TikTok inbox) if the user wants to finish it in the app. Ask about comments, duet and stitch (only the ones creator info allows), branded or paid partnership content, and whether it's AI-generated. Every TikTok post needs `music_usage_confirmed: true`: ask the user to confirm they agree to TikTok's music usage terms for this post before setting it.
- **YouTube:** `title`, `privacy_status` (public, unlisted or private) and `made_for_kids` are required. Ask for privacy and made-for-kids. Until Adeli passes YouTube's API audit, uploads stay private; the result says so with `privacyRestricted`. Tell the user before posting.
- **X:** each post is billed at X's per-post price, and a post with a link costs more (the Adeli tool description lists current prices; `get_x_usage` shows this month's spend). Say this in the approval gate. A long piece becomes a `thread`, split at the seams `short-form-text-post` uses.
- **Instagram:** Reel or feed, `shareToFeed`, collaborators, and `isAiGenerated` if relevant. Tags only for accounts the user approved.
- **LinkedIn:** personal profile or organization Page is set by the account chosen. `mentions` only for people or Pages the user names, with their URN.

## Step 6: Approval gate

Show one block per account, exactly as it will be sent:

```
PUBLISH PLAN · [now | scheduled for Tue 18 Nov 2026, 09:00 America/New_York]
Profile: [name]

1. Instagram · [account name] · Reel
   Media: final-cut.mp4 (38 MB, 0:52) · cover at 1.0s
   Caption (1,184 / 2,200):
   [full caption, verbatim]
   Options: shareToFeed true · AI-generated: no

2. TikTok · [account name] · video · public
   Description: [verbatim]
   Comments on · Duet off · Stitch off · Branded content: no · Music terms confirmed: yes

3. X · [account name] · thread of 3 · billed per post by X
   [each post, verbatim, with weighted counts]

Changed from the approved copy: [before → after per line, or "nothing"]
```

Then ask: "Post these [N] exactly as shown? (yes / edit / drop an account)". Rules:

- Only an explicit yes counts. "Looks good" about the copy earlier is not a yes to publish.
- The yes covers exactly what was shown. Any change (text, media, account, time) means showing the plan again and asking again.
- If the user approves some accounts and not others, publish only the approved ones.
- Offer **save as draft in Adeli** as a third option when the user wants to review it in Adeli's dashboard first.

## Step 7: Publish or schedule

Use `create_publication` for every publish, one account or many. It validates each target, runs in the background, supports scheduling, and can be retried safely.

- **One publication per approved plan.** `platforms` gets one entry per account, each with `platform`, `accountId`, `kind`, and its own `content`, `media` and `options` when they differ from the shared ones.
- **Always pass an `idempotencyKey`** (for example the piece's slug plus the time of approval). If a call errors or times out, repeat it with the same key and the same body; never resend without it, or the post can go out twice.
- **Now:** no `scheduledFor`.
- **Scheduled:** set `scheduledFor` (ISO 8601 with the UTC offset, between one minute and 365 days ahead) and `timeZone` (the user's IANA zone). Read the time back in the user's timezone in the result.
- **Draft:** set `draft: true`. It goes out only when the user publishes it later.

`create_post` posts to one account directly. Use it only if a publication can't express something the user needs, and run the same approval gate first.

**Changing a scheduled post or draft:** `list_publications` (with `status: scheduled` or `draft`) finds it. `update_publication` reschedules or replaces it, `publish_publication` sends it now, `cancel_publication` cancels it (and deletes its kept media). Each one needs its own yes, with the change shown first. They fail once a publication has started.

## Step 8: Check the result

1. Poll `get_publication` until the status is `published`, `partial` or `failed` (or `scheduled` / `draft` for those). Wait a few seconds between checks; video can take minutes. The platforms keep publishing even if you stop polling, so after a few minutes of `processing`, report it as in progress and give the user the publication id to check later.
2. For each target, report the post URL or post id from its `result`. Where a target hands back a job or publish id, check it with the platform's tool: `get_instagram_post_status` (jobId), `get_tiktok_post_status` (publishId), `get_youtube_post_status` (videoId), `get_facebook_post_status` (publishId). TikTok post ids can arrive a few minutes after `PUBLISH_COMPLETE`; LinkedIn can take a minute to show a new post.
3. **Partial or failed:** show each failed target's error in plain words, and what would fix it (media too large, a field missing, an account needing reconnection in Adeli).
   - A transient failure: offer `retry_publication`, which re-runs only the failed targets with their original inputs. Ask first; each retry is a real new attempt.
   - A failure that needs a change (shorter text, different file): fix it, then show the changed target in a new approval gate and publish it as a new publication.
   - **`outcome_unknown`:** the post may already be live. Never retry or resubmit it. Ask the user to check the account and tell you whether it posted.

Never retry anything without the user's OK.

## Step 9: Log what went out

Append one row per account to `published.md` in the context folder (for example `content/published.md`). Create it from the header in `references/published-log.md` if it doesn't exist. Write rows only for `published`, `scheduled`, `draft` and `unknown` targets; failed targets aren't logged until they post.

When you later see a scheduled or unknown row has gone live (this run or a later one), update that row in place with its status, URL and post id. Don't add a second row.

`content-wins` reads this file to find the user's posts and their stats, so keep the format exact. The full format and an example are in `references/published-log.md`.

## Quality check

Before the approval gate, verify:
- Adeli is connected, and the profile and every account were chosen by the user, not assumed.
- The text for each account matches the approved piece word for word, except changes the platform forces, each shown as before/after.
- Every version is within its platform's limits; every media file exists and fits the format's rules.
- Every user-only field (TikTok privacy and interactions, music terms, YouTube privacy and made-for-kids, AI disclosure) was answered by the user.
- A scheduled time has a date, time and IANA timezone, and is read back in the user's timezone.
- X cost, YouTube privacy restriction and TikTok inbox-vs-public are stated where they apply.
- Tags and mentions only for accounts the user approved.

Before reporting done, verify each target's final status from `get_publication` (not from the create response) and that the log has one correct row per logged account.

## Output at the end

```
Published: [N] · Scheduled: [N] · Drafts: [N] · Failed: [N] · Unknown: [N]
Publication id: [id]

1. Instagram · [account] · published · [url]
2. TikTok · [account] · processing, post id pending · check again with the publication id
3. X · [account] · failed · [plain-English error] · fix: [what to do]

Logged to: [path]/published.md ([N] rows)
Next: [retry X after fixing? / run content-wins in a few days]
```

## Related skills

- `short-form-video-caption`, `short-form-text-post`, `long-form-text-post`, `newsletter-post`: write the pieces this skill publishes.
- `content-planning`: decides what goes out on which day.
- `content-setup`: builds the `content/` folder this skill reads and logs to.
- `content-wins`: reads `published.md` and pulls stats for each post.

After posting, run `content-wins` so winners feed back into `content/winners/<bucket>/`.
