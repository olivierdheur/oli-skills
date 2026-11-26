# Adeli: setup, tool map and platform rules

[Adeli](https://tryadeli.com) is one API and MCP for a user's Instagram, Facebook, TikTok, YouTube, LinkedIn, X and Bluesky accounts. This file covers only what `content-publish` needs. Adeli's own docs win on any conflict: start at `https://www.tryadeli.com/docs/llms.txt` (every docs page also has a `.md` version). Tool names and fields below are from the Adeli MCP server and docs as of November 2026.

## Connecting

- **Setup lives at tryadeli.com.** Adeli's docs describe asking the agent to "Set up Adeli from tryadeli.com/agents"; the agent then asks for the user's API key and connects itself. Point the user there instead of walking through it.
- **API keys** are created by the user in the Adeli dashboard (Settings → API keys). The secret is shown once. Never ask the user to paste it into chat if their agent can read it from the environment, and never print it or write it to a file.
- **REST:** every endpoint is under `/api/v1`, with `Authorization: Bearer <key>`. Adeli's examples use `ADELI_API_KEY` for the key and `ADELI_URL` for the base URL.

## Model

Organization → profiles (one per brand or client) → connected accounts. Profile-specific tools don't default to a profile: pass `profileId`, or an `accountId` (which names its own profile). One key can cover several brands or clients, so always ask which profile and which accounts.

## Tool map

| Job | MCP tool | REST |
|---|---|---|
| List profiles | `list_profiles` | `GET /api/v1/profiles` |
| List connected accounts | `list_accounts` (filter by `profileId`, `platform`) | see docs |
| TikTok posting options | `get_tiktok_creator_info` | see docs |
| Stage local media | none in the MCP tool list; REST only | `POST /api/v1/media/uploads` |
| Publish / schedule / draft to one or more accounts | `create_publication` | `POST /api/v1/publications` |
| Post to one account directly | `create_post` | `POST /api/v1/posts` |
| Check a publication | `get_publication` | the publication's `statusUrl` |
| List scheduled or drafts | `list_publications` (`status: scheduled` or `draft`) | see docs |
| Reschedule or replace | `update_publication` | see docs |
| Publish a scheduled post or draft now | `publish_publication` | see docs |
| Cancel a scheduled post or delete a draft | `cancel_publication` | see docs |
| Re-run failed targets | `retry_publication` | see docs |
| Platform publish status | `get_instagram_post_status`, `get_tiktok_post_status`, `get_youtube_post_status`, `get_facebook_post_status` | see docs |
| X spend this month | `get_x_usage` | see docs |

"See docs" means Adeli's docs have the endpoint; look it up there rather than guessing the path.

Tools that act on the user's real accounts (`create_publication`, `create_post`, `publish_publication`, `update_publication`, `cancel_publication`, `retry_publication`) each need the user's explicit yes to exactly what will happen. This skill never calls Adeli's comment, message, delete, disconnect or ads tools.

## create_publication in short

- `publication.platforms`: 1–20 targets, each `{ platform, accountId, kind?, content?, media?, options? }`. `kind` is one of `image`, `carousel`, `video`, `reel`, `story`.
- `publication.content` and `publication.media` are shared; a target's own `content` or `media` replaces them. Media items are `{ upload_id }` (staged) or `{ url }` (public HTTPS).
- `options` holds that platform's `create_post` fields other than the text and media: TikTok `privacy_level`, `music_usage_confirmed`, `disable_comment`, `disable_duet`, `disable_stitch`, `brand_content_toggle`, `brand_organic_toggle`, `is_aigc`, `post_mode`; YouTube `title`, `privacy_status`, `made_for_kids`, `tags`; Instagram `shareToFeed`, `collaborators`, `isAiGenerated`; and so on. Every target is validated as `create_post` would validate it, so the `create_post` schema is the reference for field names and limits.
- `scheduledFor`: ISO 8601 with a UTC offset, one minute to 365 days ahead; Adeli publishes within about a minute of it. `timeZone`: the user's IANA zone, kept only to show the time back. `draft: true` saves without publishing (not combined with `scheduledFor`).
- `idempotencyKey`: repeating a key with the same body returns the original publication and posts nothing new; the same key with a different body is refused.
- Publication statuses: `scheduled`, `draft`, `queued`, `processing`, `published`, `partial`, `failed`, `canceled`. Each target has its own `status`, `result` and `error`.
- `retry_publication` re-runs only failed targets, with their original inputs. A target that may already be live (`outcome_unknown`) is never retried.

## Media

- **Public URL:** pass `{ url }`. Easiest when the file is already hosted.
- **Local file through the REST API:** `POST /api/v1/media/uploads` with `profileId`, `platform` (or `platforms` for a file shared across several), and `files` (each with `clientId`, `purpose: post_media`, `contentType`, `size`, `filename`). Each returned upload has an `uploadId`, a signed `url` and `headers`. PUT the raw bytes to the `url` with those headers unchanged (never send the API key there). The URLs expire after ten minutes. Then reference `{ upload_id }` in the publication. A shared upload must fit the strictest platform it's declared for. Mismatched or expired media returns `422 invalid_media`.
- **Local file, MCP only:** `create_post` also accepts base64 for most formats. Large videos are better staged or passed by URL; if neither is possible, ask the user to host the file or set up the API key.

## Piece-to-format table

| Piece | Instagram | Facebook | TikTok | YouTube | LinkedIn | X / Bluesky |
|---|---|---|---|---|---|---|
| Short video + caption | Reel | Reel or video | video | video with title | video | post with the video |
| Text post | (needs an image) | (needs an image) | n/a | n/a | text post | post or thread |
| Newsletter link post | (needs an image) | (needs an image) | n/a | n/a | text post with link | post with link |
| Carousel slides + caption | carousel | multi-image post | photos | n/a | multi-image post, or the slides as one PDF document | up to 4 images |

## Platform rules from the Adeli schema

The schema rejects anything over these limits. For how to write within them, see the writing skills' `references/platforms.md`.

- **Instagram:** caption up to 2,200 characters. Carousel 2–10 items, images and videos mixed. Up to 3 collaborators. Hashtags go in the caption. Stories expire after 24 hours and may have no permalink. Staged media returns a job: poll `get_instagram_post_status`.
- **Facebook:** message up to 2,200 characters. Multi-image posts take 2–10 images. Reels and videos publish asynchronously: poll `get_facebook_post_status`.
- **TikTok:** call `get_tiktok_creator_info` first (allowed privacy levels, interaction settings, max video length). Description up to 4,000 characters in the schema; stay under 2,200 for scheduled posts, as `short-form-video-caption` advises. Videos must be public (`PUBLIC_TO_EVERYONE` or omitted); photos can use any level creator info allows. `post_mode: MEDIA_UPLOAD` sends a draft to the creator's TikTok inbox instead. Photos: 1–35. `music_usage_confirmed: true` is required. Poll `get_tiktok_post_status`; terminal statuses are `PUBLISH_COMPLETE`, `SEND_TO_USER_INBOX` and `FAILED`.
- **YouTube:** `title` (up to 100 characters), `privacy_status`, `made_for_kids` and the video are required. `publish_at` on a direct post schedules a private video to go public. Until Adeli passes YouTube's API audit, every upload stays private and the result says `privacyRestricted`. Poll `get_youtube_post_status` with the videoId.
- **LinkedIn:** text goes in `commentary`. At most one of: one image, 2–20 staged images, one staged MP4 video, or one staged PDF document shown as swipeable slides. Posts as the connected personal profile or organization Page. A new post can take a minute to show.
- **X:** 280 characters on standard accounts; a link counts as 23. Media: up to 4 images, or 1 GIF, or 1 video. `thread` is a list of replies. Every post is billed at X's price (more with a link), passed through at cost; a thread that fails part-way returns the posts that went live.
- **Bluesky:** 300 characters; links, mentions and hashtags become links. Up to 4 images with alt text, or one MP4 video. `thread` like X. Free to post.
