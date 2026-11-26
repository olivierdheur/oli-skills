# Bootstrap from published posts (Adeli)

Used by the "has published posts" path in `content-setup`. [Adeli](https://tryadeli.com) is one API and MCP for a user's social accounts. This path only reads. It never posts, replies, deletes, or changes anything on the user's accounts.

## 1. Check that Adeli is available

- **MCP:** look for Adeli tools in this session (a tool to list connected accounts, a tool to list posts, tools that get post or account insights).
- **API key:** or an Adeli API key the user has already put in their environment or project config. Never print the key, paste it into chat, or write it into any file.
- **Neither:** say in one line what Adeli is ("Adeli is one API for your social accounts, at tryadeli.com; connect them once and I can read your posts and stats") and offer the interview path instead. Don't push a signup.

Tool names differ between versions. Use whatever the session offers for: list connected accounts, list recent posts, get post insights. If the API is used directly, follow Adeli's own docs for the endpoints; don't guess them.

## 2. Pick the accounts

List the connected accounts and show them to the user: platform and account name. Ask which ones are theirs and should feed the context. Some API keys cover several brands or clients, so never assume every account belongs to the user.

## 3. Pull posts and stats

For each chosen account:

- Pull the recent posts the API returns, up to about the last 50, or the last 90 days, whichever is fewer. Say how many you got.
- For each post, keep: date, URL, format (video, image, carousel, text, article), the text (caption or post body), and the stats the platform reports.
- Stats differ by platform. Keep whatever comes back. Leave a field blank when it's missing; never estimate one.
- Video posts often return only the caption, not what was said. Say so. If the user wants the spoken hook in a winner, ask them for it or leave a `[placeholder]`.
- If some accounts fail to load, carry on with the ones that did and name the ones that failed.

## 4. Draft the voice section

Use only text the user wrote: captions, post bodies, article text. Skip reposts, quotes of other people, and posts written mostly by a brand partner.

Look for:
- **Openers:** how their first lines usually start (a question, a number, "I", a bold claim).
- **Sentence length and rhythm:** short and punchy, long and flowing, or mixed.
- **Words and phrases they repeat:** signature phrases, how they name their topic.
- **Punctuation and formatting:** emoji (which, how often), exclamation marks, dashes, line breaks, lists, hashtags, all caps.
- **What they never do:** patterns absent across every post (no emoji at all, never uses hashtags).

Write it in the shape of the Voice section in `creator-ikigai.md`. Back every rule with one short quote from their own posts, so they can see where it came from. Mark anything inferred from fewer than three posts as "tentative".

Also note the topics that come up most. They are candidate pillars to confirm in the interview.

Show the draft. The user corrects it before anything is written. A voice rule they disagree with goes, even if the posts support it: they may be trying to change how they sound.

## 5. Propose the first winners

Judge each post against the user's own account, never against outside benchmarks.

1. Group posts by account and format. A carousel and a video on the same account are not compared with each other.
2. Ask which metric matters most to them (or use "Metrics you care about" if it's already filled). If they don't know, use saves and shares first, then follows, then views.
3. In each group, find the account's usual number for that metric (the median). Propose posts that clearly beat it. Aim for 3–5 per bucket, fewer if the account is small. Skip groups with fewer than about five posts; there's no "usual" yet.
4. Sort each proposed winner into a bucket:

| Post | Bucket |
|---|---|
| Vertical video (Reels, TikTok, Shorts) | `short-form-video` |
| Short text post (single tweet, Threads, Notes) | `short-form-text` |
| Long text post (LinkedIn post, long X post) | `long-form-text` |
| Newsletter issue, X Article | `newsletter` |
| Carousel, infographic, document post | `visual` |

If a post's format is unclear, ask.

Present the list per bucket, one line each:

```
short-form-video
1. 2026-01-15 · instagram · "[first line of caption]" · 2.1k saves (usual: 400) · url
   Why it may have won: [one line, labeled as a guess]
```

The user approves, drops or adds each one. Only then write the files.

## 6. Write the approved winners

For each approved post:
- Create `winners/<bucket>/YYYY-MM-DD-<slug>.md` from `winners/_template.md`. Fill the frontmatter from the pulled data and the body from the post text.
- "Why it won" is the line the user approved. If they had no view, write "Not sure yet" rather than a confident guess.
- Add one line to `winners/<bucket>/README.md`, newest first.

From here on, `content-wins` keeps the winners folders up to date.
