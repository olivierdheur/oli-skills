# Platform notes: X, Substack Notes, Threads

Short on purpose. Checked against official help docs, November 2026. Platforms change these often.

## Quick comparison

| | X | Substack Notes | Threads |
|---|---|---|---|
| Limit per post | 280 weighted characters on standard accounts | No published limit; ~300–700 characters is a common practical range | 500 characters |
| Longer option | Paid accounts can post much longer text (about 25,000 characters) but the feed truncates it behind "Show more" | Write a full post instead (`newsletter-post`) | Text attachment for longer passages (up to 10,000 characters) |
| Multi-part | Thread of replies | Not a norm; keep it one note | Thread of replies |
| Links | Count as 23 characters whatever their length | Links to Substack posts render as cards | Count toward the 500; the first link shows a preview card; max 5 links |
| Formatting | Plain text only | Bold, italics and other formatting available | Plain text only |
| Tags | Hashtags rarely help; skip unless the user uses them | None | One topic tag per post |

## X

- **Weighted counting.** Most Latin characters count 1. Each emoji counts 2. Each URL counts 23. CJK characters count 2. Line breaks count 1. When verifying with a script, add these adjustments to the raw `len()`.
- **Post 1 is everything.** Most readers see only the first post of a thread. It must make sense and earn a click on its own.
- **Norms.** Short, declarative, opinionated. Threads of 2–5 posts outperform long ones for most accounts. Creators commonly report that links in the first post get less reach than links placed in a later post or reply; X doesn't document this.
- Don't number posts ("1/") or add "🧵" unless the user wants it.

## Substack Notes

- **Audience.** Readers inside the Substack app, many of them writers. Reflective, personal and craft-focused notes travel well; pure promotion travels poorly.
- **Shape.** Usually the master as written: short paragraphs with white space. One idea per note.
- **Restacks** are the main distribution, so a quotable line helps.
- **Links.** A note that links to the user's own post shows a preview card; the note text should still deliver value on its own.

## Threads

- **Limit.** 500 characters per post, links and emoji included.
- **Tone.** A little more conversational and replies-driven than X. Questions and invitations tend to start conversations.
- **Multi-part.** Split at the same seams as X; post 1 must stand alone.
- Keep wording identical to the master wherever it fits. Don't rewrite the voice for the platform.

## Counting script

```bash
python3 -c 'import sys; t=sys.stdin.read().rstrip("\n"); print(len(t))' <<'EOF'
<segment text>
EOF
```

`len()` counts code points, so a single emoji may register as 1 or 2 depending on how it's built. For X, add 1 per emoji and replace each URL's raw length with 23. When a segment lands within a few characters of the limit, tighten it anyway.
