# Platform notes: X, Substack Notes, Threads (with a link back)

Short on purpose. The facts below are the ones in `short-form-text-post/references/platforms.md`, checked against official help docs in November 2026, plus how they apply to posts that link to a newsletter. Platforms change these often.

## Quick comparison

| | X | Substack Notes | Threads |
|---|---|---|---|
| Limit per post | 280 weighted characters on standard accounts | No published limit; ~300–700 characters is a common practical range | 500 characters |
| Multi-part | Thread of replies | Not a norm; keep it one note | Thread of replies |
| Links | Count as 23 characters whatever their length | Links to Substack posts render as cards | Count toward the 500; the first link shows a preview card; max 5 links |
| Formatting | Plain text only | Bold, italics and other formatting available | Plain text only |
| Tags | Hashtags rarely help; skip unless the user uses them | None | One topic tag per post |

## Where the link goes

| Platform | Placement | Why |
|---|---|---|
| X | A new final post in the thread; a single post becomes two | Creators commonly report that links in the first post get less reach than links in a later post or reply. X doesn't document this. |
| Threads | A new final item in the thread | Keeps post 1 clean and readable on its own; the full URL counts toward that item's 500 |
| Substack Notes | The last line of the note, after a blank line | Notes aren't threaded by norm; a link to the user's own Substack post shows a preview card |

In every case the post must deliver value before the link. The link is for readers who want more.

## X

- **Weighted counting.** Most Latin characters count 1. Each emoji counts 2. Each URL counts 23, tracking tags included. CJK characters count 2. Line breaks count 1.
- **Post 1 is everything.** Most readers see only the first post of a thread. It must make sense and earn attention on its own.
- Threads of 2–5 posts outperform long ones for most accounts.
- Don't number posts ("1/") or add "🧵" unless the user wants it.

## Substack Notes

- **Audience.** Readers inside the Substack app, many of them writers. Reflective, personal and craft-focused notes travel well; pure promotion travels poorly.
- **Shape.** Short paragraphs with white space. One idea per note.
- **Restacks** are the main distribution, so a quotable line helps.

## Threads

- **Limit.** 500 characters per post, links and emoji included, so a long tracked URL eats into the link item.
- **Tone.** A little more conversational than X. Keep wording identical to the master wherever it fits.

## Counting script

```bash
python3 -c 'import sys; t=sys.stdin.read().rstrip("\n"); print(len(t))' <<'EOF'
<segment text>
EOF
```

`len()` counts code points, so a single emoji may register as 1 or 2. For X, add 1 per emoji and replace each URL's raw length with 23. For Threads and Substack Notes, count the full URL as written. When a segment lands within a few characters of the limit, tighten it anyway.
