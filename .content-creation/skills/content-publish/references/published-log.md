# The publish log: `published.md`

One file in the user's context folder (`content/published.md`, or `published.md` inside the folder named by `Content context:`). `content-publish` appends to it; `content-wins` reads it to find each post and pull its stats. It's a plain Markdown table so the user can read and edit it too.

## Header (create the file with this if it doesn't exist)

```markdown
# Published

Every post that went out through content-publish, one row per account, oldest first.
Written by content-publish. Read by content-wins. Edit by hand if a row is wrong; keep the columns.

| date | platform | account | account_id | status | url | post_id | publication_id | bucket | skill | hook |
|---|---|---|---|---|---|---|---|---|---|---|
```

## Columns

| Column | What goes in it |
|---|---|
| `date` | When it went live, or the scheduled time, as ISO 8601 with the offset in the user's timezone: `2026-11-18T09:00-05:00` |
| `platform` | `instagram`, `facebook`, `tiktok`, `youtube`, `linkedin`, `x` or `bluesky` |
| `account` | The account name as `list_accounts` shows it |
| `account_id` | The Adeli `accountId` |
| `status` | `published`, `scheduled`, `draft`, `canceled` or `unknown` (Adeli reported `outcome_unknown`; the user must check) |
| `url` | The post's public URL, or `-` until there is one |
| `post_id` | The platform's post id from the target's result, or `-` until there is one |
| `publication_id` | The Adeli publication id |
| `bucket` | `short-form-video`, `short-form-text`, `long-form-text`, `newsletter` or `visual` |
| `skill` | The skill that wrote the piece, such as `short-form-video-caption`, or `unknown` |
| `hook` | The first line of the post or caption, on one line, in double quotes, cut at 100 characters with `…`. For video, the spoken hook if the user gave it, else the caption's first line |

## Rules

- One row per account per piece. A piece sent to three accounts gets three rows with the same `publication_id`.
- Append at the bottom. Never reorder or delete rows.
- Escape any `|` in the hook as `\|`. Replace line breaks with a space.
- When a `scheduled`, `draft` or `unknown` row goes live, update that row in place (status, date, url, post_id). Don't add a second row. If a scheduled post is canceled, set its status to `canceled`.
- Failed targets aren't logged until they post.

## Example

```markdown
| date | platform | account | account_id | status | url | post_id | publication_id | bucket | skill | hook |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-18T09:00-05:00 | instagram | yourbrand | 3f2c…-a1 | published | https://www.instagram.com/reel/… | 1789… | 9b1e…-04 | short-form-video | short-form-video-caption | "I replaced my weekly report with one prompt. Here's the prompt." |
| 2026-11-18T09:00-05:00 | tiktok | yourbrand | 77d0…-9c | scheduled | - | - | 9b1e…-04 | short-form-video | short-form-video-caption | "I replaced my weekly report with one prompt. Here's the prompt." |
```
