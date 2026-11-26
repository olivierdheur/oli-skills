---
name: short-form-text-post
description: Writes short text posts for X, Substack Notes and Threads from a raw idea, using proven structural patterns in the user's own voice. Shows three distinct drafts first and waits for the user to pick one, then packages the approved post for each platform with script-verified character counts and threads split at natural breaks. Use when the user says "write a tweet", "X post", "thread", "Substack note", "write a note", "Threads post", "short post", or wants short-form text for any of those platforms.
---

# Short-Form Text Post (X, Substack Notes, Threads)

This skill turns a raw idea into one short text post. It writes three distinct drafts, waits for the user to pick or revise one, then packages the approved post for X, Substack Notes and Threads so the user never has to trim or split anything by hand. It does not turn an existing newsletter into posts (use `short-form-text-from-newsletter`), write long LinkedIn-style posts (use `long-form-text-post`) or write full articles (use `newsletter-post`).

The patterns are borrowed. The voice is not: it comes from the user's context files, never from this skill.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/short-form-text/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**Voice rule.** Voice, tone, banned words, punctuation rules and personality come from `creator-ikigai.md`. The formulas below supply the skeleton. If a formula and the user's voice ever conflict, the voice wins: bend or drop the formula, never the voice.

## Step 2: Pick note types

Choose note types for three distinct approaches. Two drafts may share a type, but all three must differ in angle, opening or emotional emphasis, not just wording or length.

| # | Type | What it does | Length |
|---|---|---|---|
| 1 | Single-punch wisdom | One quotable statement | 1–2 sentences |
| 2 | Proof story | Struggle → turning point → specific result → takeaway | 3–7 |
| 3 | Pattern observation | "A pattern I keep seeing…" plus examples | 3–8 |
| 4 | Contrarian statement | Challenges a common belief, then gives the better truth | 2–6 |
| 5 | Problem → solution | "You don't have X because…" → root cause → fix | 3–6 |
| 6 | Build-in-public update | What you're building, real metrics, what you learned | 3–8 |
| 7 | List-based tactical | "How to X:" plus 3–5 specific actions | 4–12 |
| 8 | Personal story | A moment, its impact, the universal lesson | 4–10 |
| 9 | Philosophical observation | A principle, why it's true, what it means for the reader | 2–5 |
| 10 | Direct advice | "Do this / stop doing that", why, and what happens | 2–5 |

If the user is unsure, recommend by goal:
- **Teaching** → list-based tactical or problem → solution
- **Authority** → pattern observation or proof story
- **Connection** → personal story or philosophical observation
- **Quick value** → single-punch wisdom or direct advice
- **Transparency** → build-in-public update
- **Positioning** → contrarian statement

## Step 3: Apply the formula

```
1. Single-punch wisdom
[One statement that stands alone]
[Optional: brief supporting thought]
Why it works: screenshot-worthy, easy to share.

2. Proof story
[Starting point: the struggle]
[Turning point: what changed]
[Result: specific numbers]
[Insight or encouragement for the reader]
Why it works: credibility through transparency.

3. Pattern observation
[Hook: "A pattern I keep seeing..."]
[Examples or a short list]
[Why it matters]
Why it works: authority through observation.

4. Contrarian statement
[Bold claim against common belief]
[Why the usual thinking is wrong]
[The better alternative]
Why it works: cognitive dissonance makes it memorable.

5. Problem → solution
["You don't have X because..."]
[Root cause]
[What to do instead]
Why it works: the "aha" of a hidden cause.

6. Build-in-public update
[What you're working on]
[Specific metrics or progress]
[Lesson or next step]
Why it works: transparency builds trust.

7. List-based tactical
[Hook: "How to X:" or "If you want Y:"]
- [Specific action 1]
- [Specific action 2]
- [Specific action 3]
[Optional: punchy closing line]
Why it works: high perceived value, scannable.

8. Personal story
[A moment or realization]
[The emotional impact or turn]
[The universal lesson]
Why it works: connection through humanizing.

9. Philosophical observation
[Core principle]
[Supporting explanation]
[What it means for the reader]
Why it works: states a worldview, attracts aligned readers.

10. Direct advice
[Imperative: "Do this" / "Stop doing that"]
[Why it matters]
[What happens if you follow or ignore it]
Why it works: removes ambiguity.
```

**The hook carries the credibility.** A cold reader doesn't know the user, so the first line earns attention on its own: a real number, a credential, an outcome, or a genuinely contrarian claim, pulled from the user's context. Don't save credibility for line three. Write the hook as a full sentence; never chop it into a two-line, ~45-character fragment just to create a line break.

**Opening moves (pick one):** bold declarative, honest admission, pattern observation, direct address ("You don't need…"), contrarian claim.

**Middle moves:** short list, timeline (before → after), contrast, stacked examples, cause → effect.

**Closing moves (pick one):** punchy restatement, actionable implication, open loop, quotable line, encouraging push.

**Weave in the user's core theme (attempt every time, force never).** `creator-ikigai.md` names what the user is known for. Try to fit it into an existing beat of the formula: the proof, the "how", the scene that shows the payoff, or a real number. Use only real examples from the context files. If it would bend the idea or read as bolted on, leave it out, and say so in the `Theme:` line.

## Step 4: Write three drafts, then stop

Write three complete drafts of the same idea, each with a short plain-language angle label ("The cost of proving yourself", "Personal reflection"). Keep the facts and core intent identical across all three. Default to 3–5 sentences each; don't pad the idea to manufacture differences.

Each draft must:
- follow its formula's structure,
- sound like the user as defined in `creator-ikigai.md`, not a generic "authentic" register,
- match the psychology and length of its note type.

**Approval gate (required).** The first response contains the three drafts only: no platform cuts, no character counts. Ask "Which version would you like to use or revise?" and end the turn.

- An explicit pick ("use version 2", "go with 3 but change the last line") is approval. Apply the requested edits.
- Revision-only feedback is not approval. Revise, show the result, and wait again.
- Silence is not approval.
- Honor an explicit request to skip the gate, or to cut a post the user already approved.

## Step 5: Format the approved master (Substack Notes)

The approved draft becomes the master and the Substack Note. Keep its approved wording; apply only the user's requested edits and paragraph formatting.

- Single-line paragraphs for emphasis, 2–3 sentence paragraphs for development, plenty of white space.
- Natural punctuation. Follow the user's punctuation rules from `creator-ikigai.md` (for example, many creators ban em dashes).
- Avoid all caps (beyond a single word of emphasis if the user's voice uses it), emoji clutter, over-formatting and corporate phrasing.

## Step 6: Cut for X

Limits and counting rules are in `references/platforms.md`.

1. **Try a single post first.** If the master fits, use it as is. If it's close (up to about 25% over), tighten: cut filler, merge lines, drop the weakest supporting sentence. Never cut the hook, the core claim or the specific number.
2. **Otherwise split into a thread** at natural seams only: between paragraphs, between list items, or at the turn from setup to payoff. Never mid-sentence.
   - Post 1 must work alone. It gets most of the impressions and has to open a curiosity gap.
   - Each later post makes one point and reads cleanly if quoted on its own.
   - The call to action goes in the last post.
   - Aim for 2–5 posts. If it needs more than 6, the idea is too long for X; tighten instead.
   - No "🧵" or "1/" numbering unless the user asks. The cut markers show the order.

## Step 7: Cut for Threads

Same method, with the Threads limit. Most notes fit in one post. When one doesn't, split at the same seams, with a post 1 that works alone. Threads tolerates a slightly more conversational tone than X, but don't rewrite the voice; keep wording identical to the master wherever it fits.

## Step 8: Verify character counts (required)

Never estimate. Count every X and Threads segment with a script before delivering, for example:

```bash
python3 -c 'import sys; t=sys.stdin.read().rstrip("\n"); print(len(t))' <<'EOF'
<segment text>
EOF
```

For X, adjust for its weighted counting (links, emoji) as described in `references/platforms.md`. Any segment over the limit gets tightened or re-split, then recounted.

## Output format

**First response: three drafts.** Show **Version 1: <angle>**, **Version 2: <angle>**, **Version 3: <angle>**, each followed by the full draft in its own copyable block. Add one `Theme:` line saying whether the user's core theme fits and where. Ask which version to use or revise, then stop.

**After approval: platform versions**, in this order, each in a copyable block:

````
**Substack Note**
```
<full master>
```

**X**: single post (213/280)
```
<post>
```
(or, for a thread:)
**X**: thread, 3 posts
✂️ Post 1 (241/280)
```
<text>
```
✂️ Post 2 (198/280)
```
<text>
```

**Threads**: single post (412/500)
```
<post>
```
````

If the X or Threads version had to drop or reword anything from the master, add one line saying what changed ("X version drops the second example to fit"). End with one `Theme:` line: where the core theme went, or "none: <why it didn't fit>".

## What to avoid

| Instead of | Write |
|---|---|
| Vague generalities ("Success takes time") | A specific timeline with numbers |
| Humble-bragging ("So grateful for this little win") | The result plus the mistake or cost behind it |
| Clickbait without payoff ("This one thing changed everything") | Name the thing and the result |
| Generic advice ("Believe in yourself") | A concrete action someone can do today |
| Corporate voice ("We're excited to announce…") | Plain words: what you built, how long you tested it, what it does |

## Quality check

Before showing anything, verify:

**Structure**
- [ ] Follows the chosen formula and matches its length
- [ ] The first line earns attention alone, with credibility inside the hook when the post needs it
- [ ] Develops logically and closes with impact

**Value**
- [ ] One clear takeaway, specific rather than vague
- [ ] Every fact, number and story comes from the user's context or the user, with gaps left as `[placeholder]`

**Voice**
- [ ] Passes the voice, banned-word and punctuation rules in `creator-ikigai.md`
- [ ] Copies patterns from winners or starter examples, never their sentences

**Approval gate**
- [ ] First response had three meaningfully different drafts and no platform cuts
- [ ] The user explicitly picked or approved the master before packaging (or explicitly asked to skip the gate)
- [ ] The master keeps the approved wording and requested edits

**Platform cuts (after approval only)**
- [ ] Every segment is under its platform limit, counted by script
- [ ] Splits fall at natural seams; post 1 stands alone; the CTA sits in the last segment
- [ ] Any wording dropped or changed from the master is called out

## Related skills

- `short-form-text-from-newsletter`: cut an existing newsletter into short posts.
- `long-form-text-post`: longer text posts.
- `newsletter-post`: expand a strong note into a full article.
- `content-ideas`: find something to write about.
- `content-planning`: schedule posts across the week.
- `content-publish`: post or schedule the approved versions.
- `content-setup`: build the content context folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
