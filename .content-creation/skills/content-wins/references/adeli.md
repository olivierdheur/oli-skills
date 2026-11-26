# Adeli tool map for content-wins

[Adeli](https://tryadeli.com) is one API and MCP for Instagram, Facebook, TikTok, YouTube, LinkedIn, X and more. Below are the Adeli MCP tools this skill uses (or the matching REST endpoints under `https://app.tryadeli.com/api/v1`), and the per-post numbers each returns. Checked against Adeli's docs, November 2026. For anything not covered here, read Adeli's docs (`https://www.tryadeli.com/docs/llms.txt`, or the `adeli://docs/llms.txt` resource in the MCP) rather than guessing.

All of these are reads. This skill never calls a tool that creates, publishes, sends, replies, deletes, updates or disconnects anything, and never calls an ads tool.

## Finding the accounts

| Step | MCP tool | REST | Notes |
|---|---|---|---|
| Profiles | `list_profiles` | `GET /profiles` | One profile per brand or client. The default comes first. |
| Accounts | `list_accounts` | `GET /accounts` | Filter by `profileId` or `platform`. Every other call takes an `accountId` from here. |

A response with `status: "partial"` still carries the accounts or posts that loaded; `errors` names the ones that failed.

## Listing posts

`list_posts` (`GET /posts`), with `accountId` (or `profileId`, optionally `platform`). Newest first. Each post has:

- `id`, `providerId` (the platform's own post ID, used by the insights tools), `platform`, `accountId`
- `caption`: the post text. For YouTube it's the video title; for X, the post text.
- `media[]`: `type`, `url`, `thumbnailUrl`. Use `type` to tell video, image and carousel apart.
- `permalink`, `publishedAt`
- `engagement`: `likes`, `comments`, `shares`, `views`, `reach`, filled per platform as below.
- `status`: `published` or `scheduled`. Skip scheduled posts; they have no stats yet.

How far back it goes:

| Platform | Listed by `list_posts` | `engagement` filled |
|---|---|---|
| Instagram | yes | `likes`, `comments` |
| Facebook | yes | `likes`, `comments` |
| TikTok | yes, up to the 60 most recent | `likes`, `comments`, `shares`, `views`, `reach` |
| YouTube | yes, up to the 50 most recent videos | `likes`, `comments`, `views` |
| X | only when asked for by `platform` or `accountId`; the 10 most recent; X bills each read, so ask first | `likes`, `comments` (replies), `shares` (reposts), `views` (impressions) |
| Bluesky | yes, the 10 most recent top-level posts | `likes`, `comments`, `shares` (reposts) |
| LinkedIn | no: use `get_linkedin_post_insights` | see below |

## Per-post insights

| Platform | MCP tool | REST | Takes | Returns per post |
|---|---|---|---|---|
| TikTok | `get_tiktok_video_insights` | `GET /analytics/tiktok/video-insights` | `accountId`, `videoIds` (up to 20 `providerId`s, comma-separated; omit for the most recent) | `viewCount`, `reach`, `likeCount`, `commentCount`, `shareCount`, `favoriteCount` (saves), `durationSeconds`, `mediaType` (`VIDEO` or `PHOTO`), `caption`, `shareUrl`, and `insights`: `newFollowers`, `profileViews`, `averageTimeWatchedSeconds`, `fullVideoWatchedRate`, `retention`, `impressionSources` |
| YouTube | `get_youtube_video_insights` | `GET /analytics/youtube/video-insights` | `accountId`, `videoIds` (up to 50; omit for the 20 newest), `startDate` and `endDate` (both or neither; `endDate` before today) | `views`, `minutesWatched`, `averageViewDurationSeconds`, `averageViewPercentage`, `likes`, `comments`, `shares`, `subscribersGained` |
| LinkedIn | `get_linkedin_post_insights` | `GET /analytics/linkedin/post-insights` | `accountId`, `postUrns` (up to 5; omit for recent posts) | `postUrn`, `permalink`, `title`, `publishedAt`, `hasImage`, `impressions`, `reactions`, `comments`, and for Pages only `clicks` and `shares` |
| Instagram | none per post | | | Use the `list_posts` likes and comments. |
| Facebook | none per post | | | Use the `list_posts` likes and comments. |

Platform quirks that matter here:
- **TikTok:** a barely watched post can have `null` reach and watch metrics. TikTok stops updating a post's numbers 365 days after it's published. Needs the connection's video insights permission; without it the call returns `connection_expired`.
- **YouTube:** analytics lag two to three days. To get lifetime numbers for a video, set `startDate` on or before its publish date and `endDate` to a few days ago.
- **LinkedIn:** LinkedIn doesn't let Adeli list a personal profile's posts, so a personal profile's stats cover only posts published through Adeli. Other posts return `post_not_found`; use manual mode for those. A Page's recent posts include ones made directly on LinkedIn. Numbers come from a snapshot refreshed every few hours.

## Mapping to the winner file's `stats`

The template's keys are `views`, `saves`, `shares`, `follows`. Fill what the platform reports and leave the rest blank.

| Key | TikTok | YouTube | LinkedIn | X | Instagram, Facebook |
|---|---|---|---|---|---|
| `views` | `viewCount` | `views` | blank (add `impressions`) | blank (add `impressions` from `views`) | blank |
| `saves` | `favoriteCount` | blank | blank | blank | blank |
| `shares` | `shareCount` | `shares` | `shares` (Pages only) | `shares` (reposts) | blank |
| `follows` | `insights.newFollowers` | `subscribersGained` | blank | blank | blank |

If the winner was picked on a metric outside the four (likes, comments, reactions, impressions), add it as an extra key after them, for example `stats: { views: , saves: , shares: , follows: , comments: 312 }`. If the user pasted numbers from the app's own insights (Instagram saves, say), use them and say in "Why it won" where they came from.

## Not used for picking winners

These return account-level totals, not per-post numbers. They can add context to the patterns summary but never decide a winner: `get_instagram_insights` (28-day views, reach, interactions, accounts engaged), `get_facebook_page_metrics`, `get_tiktok_analytics`, `get_tiktok_account_insights`, `get_youtube_channel_insights` (includes the channel's top 10 videos), `get_linkedin_account_insights`.
