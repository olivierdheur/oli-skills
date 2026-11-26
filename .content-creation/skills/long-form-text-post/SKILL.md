---
name: long-form-text-post
description: Writes a full long-form text post (250–400 words) for LinkedIn or a long X post, built to be saved. Every post hands the reader one portable, reusable thing they can act on (a framework, playbook, checklist, prompt, benchmark numbers, decision rule or teardown), with the user's story as proof, not the point. Use when the user asks for a LinkedIn post, a long X post, a post draft, or has picked a hook from long-form-text-hook and wants the full post. Triggers include "write a LinkedIn post", "draft a post about", "turn this into a LinkedIn post", "long X post", "write the post for this hook".
---

# Long-Form Text Post

Writes one complete post of 250–400 words for LinkedIn or a long X post, ready to paste. The bar is the save, not the read: a post that gets read and forgotten has failed. Every post ships one portable thing the reader keeps, and the user's story or result is the proof that makes it believable. This skill doesn't write hooks; it uses one chosen through `long-form-text-hook`. For a single tweet or a short post, use `short-form-text-post`. For something that needs 1,000+ words, use `newsletter-post`.

**Optimize for:** saves, dwell time and follows, over reactions.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/long-form-text/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

Also read `references/platforms.md` for length, fold and formatting on each platform.

## Step 2: Get the hook

- If the user already has a hook, use it.
- If not, run `long-form-text-hook` first and wait for the user to pick one. Don't write hooks inline here.
- The hook arrives with a **promise**: the takeaway it told the reader they'd get. That promise is a contract. The payload you build must deliver exactly it. If the post can't, change the hook, not the promise.
- Confirm the platform: LinkedIn, X, or both.

## Step 3: Decide the payload

### Every post is a save

The test isn't "was this interesting." It's: **would the reader in `persona.md` save this so they can come back and use it?**

A story or an announcement on its own never clears that bar. Nobody bookmarks news about someone else's life; people bookmark what they intend to use. So every post carries a **value payload**: one portable, reusable thing the reader could act on tomorrow without the user in the room. The story, milestone or launch is the vehicle that makes the payload credible. It is never the whole post.

### What counts as a payload

Pick exactly one:

- **A named framework.** 3–5 parts, in order, with a name the reader can repeat. ("The 3-question kill test I run on every product bet.")
- **A numbered playbook.** The literal steps in sequence, specific enough to follow without a follow-up question.
- **A checklist or filter.** What to check, what disqualifies, what to do about it.
- **A prompt or workflow.** The actual prompt text, or the actual chain of tools and handoffs, not a description of one.
- **Real numbers as benchmarks.** Costs, hours, rates or timelines the reader can measure their own against.
- **A decision rule.** "If X, do Y. If not, don't." The reader leaves knowing how to decide, not just how the user decided.
- **A teardown.** A real before and after with the reasoning visible, so the reader can run the same diagnosis on their own.

### What doesn't count

- A lesson without the mechanism ("be consistent", "start before you're ready")
- A story with a moral bolted to the end
- An announcement, milestone, launch, recap or year-in-review
- An opinion the reader agrees with but can't do anything with
- A list of tools with no criteria for choosing between them

**The save test:** could the reader screenshot one section of this post, with none of the surrounding context, and still find it useful three weeks from now? If not, the payload isn't real yet.

### The story still matters, it just isn't the point

The user's specifics (results, numbers, credentials, hard-won experience from the context files) make the payload trustworthy. Use them as proof attached to the payload.

- Weak: "Here's what running my bakery taught me about pricing." The story is the post.
- Strong: "I raised prices 30% and lost only 2 regulars. Here's the 3-step script I used to tell customers." The story is the proof; the script is the save.

### One payload per post

Don't stack three frameworks to make a post feel valuable. One thing delivered completely beats three things gestured at. Depth gets saved; breadth gets skimmed.

**If the topic has no payload yet, ask the user what it should be before going further.** Don't invent one from thin air; it needs the user's real experience behind it.

## Step 4: Offer 5 content flows

Before writing the full post, present 5 short outlines. Each one:

- **Names its payload.** An option isn't an option until you can say what the reader keeps.
- Describes the arc in 2–3 bullets: what the hook sets up, how the payload is delivered, the payoff.
- Varies the payload type, not just the tone: a framework, a playbook, a teardown, benchmark numbers, a decision rule. Five flavors of "personal story with a lesson" is not five options.
- Uses a structure from `references/starter-examples.md` (or the user's winners) where it fits naturally. Don't force one.

At least one option should consider **Old Way vs New Way** where it fits: name how it used to be done, name what changed, reveal the new playbook, and let the user narrate the shift. A company or product is a character in the story, never the subject. The new playbook is the payload, so spell out its steps instead of announcing that things changed.

Output format:

```
CONTENT FLOW OPTIONS (pick one, or combine elements):

1. [Short label] — Saves: [the one portable thing]
   - [how the post flows]
   - [how the payload is delivered]
   - [payoff]
2. ...
5. ...
```

**Approval gate.** Stop. The user picks a flow, combines elements, or redirects. Don't write the post until they do.

## Step 5: Write the full post

The shape is always **hook → setup → payload → takeaway → CTA.** The payload is the biggest section. If the setup is longer than the payload, the post is a story wearing a costume; cut the setup.

### Setup (short)
- 2–4 lines at most. Just enough context and proof to make the payload credible.
- This is where the story, number or credential lives, as evidence rather than the main event.
- The reader already clicked "see more". Don't spend that click on backstory.

### Payload (the bulk)
- Deliver the framework, steps, checklist, prompt, numbers or rule in full: named parts, in order, specific enough to act on without a follow-up question.
- Make it screenshot-able: short labeled lines or a simple dash list, one idea per line.
- Every part is concrete. If a step could have been written by someone who has never done it, replace it with what the user actually did.
- Use the user's real numbers and examples from the context files. Mark anything missing as `[placeholder]`.

### Voice and stance (throughout)
- Short paragraphs, 1–3 sentences each, with space between big ideas.
- Voice, tone, personality, signature phrases and banned words all come from `creator-ikigai.md`. Don't impose a voice of your own.
- Tie the post to one of the user's pillars, and to their point of view in `pov.md`.
- Definitive language: "has changed", not "is changing". Take a clear stance.
- Social proof must be outcome-based, not compliment-based. "Took the workshop, built X, got promoted in 2 months" is proof. "Your content is amazing" is not. If quoting someone, dig for the specific outcome first.

### Takeaway (near the end)
- Use a `TAKEAWAY:` line: the payload compressed into one sentence the reader can repeat.

### CTA (final line)
The post ends on the CTA. Nothing follows it.
- A plain line pointing at the destination: "I wrote the full breakdown here: [link]". Unless `creator-ikigai.md` says otherwise, no gated "comment X to get Y" CTAs and no signature outro.
- One link at most in the body. A second link goes in the first comment.
- No company tags by default; they pull readers off the post.
- A "save this" nudge is fine when the post has earned it.

### Formatting (copy-paste ready)
- Plain text only. No markdown: no bold, italics, headers, `**` or `##`.
- Lists use simple dashes (`-`) or numbers.
- Blank lines between paragraphs.
- No emojis unless the user asks or `creator-ikigai.md` says they use them.
- Platform-specific limits and folds are in `references/platforms.md`.

## Step 6: Score the post

### Save score

Score how likely the reader in `persona.md` is to save the post: bookmark it to come back and use it. This is the strictest test and the one this skill optimizes for.

Three lenses:
1. **Portability.** Can they use the payload without the user and without the story around it? Would one screenshot still make sense on its own?
2. **Specificity.** Concrete enough to act on tomorrow: real steps, real numbers, real prompt text?
3. **Durability.** Still useful in three weeks, or news that expires once read?

Scale: 5 = saves it and opens it again · 4 = saves it, might not revisit · 3 = useful in the moment, no reason to keep · 2 = interesting, nothing to keep · 1 = a story or announcement with no payload.

**A post scoring 3 or below doesn't ship.** Add a `→ Make it saveable:` line naming the missing payload (the framework it needs, the steps it gestures at, the numbers it withholds), rebuild the post around it, and score again. Never present a 3-or-below post as finished.

### Shareability score

Score how likely the same reader is to share it: repost, send it to a colleague, or comment "this is so me". On LinkedIn and X, engaging is public, so people amplify what says something about who they are, what a peer needs to read, and what names a tension they feel.

Three lenses:
1. **Identity.** Does amplifying it signal who the reader wants to be seen as (per `persona.md`)?
2. **Send-to-a-friend.** Is there a specific person they'd tag or DM with "this is us"?
3. **Relatability.** Do they see their exact self in it?

Scale: 5 = reposts without thinking · 4 = likely reshares · 3 = relates, might scroll · 2 = about the info, not about them · 1 = generic.

If it scores 3 or below, add a `→ Make it shareable:` line with one concrete fix and apply it before finalizing.

## Quality check

Before showing the post, check every item.

**The save (hard gates: a fail means rewrite, not tweak)**
- Exactly one payload, of a type listed in Step 3
- Delivered in full: named parts, in order, actionable without a follow-up question
- Passes the save test: one section screenshotted alone is still useful in three weeks
- The payload is the biggest section; the setup is shorter
- Not an announcement, milestone, recap, or story with a moral bolted on
- Delivers exactly the takeaway the hook promised
- Save score is 4 or 5

**The rest**
- Ties to one of the user's pillars and reinforces their point of view
- Real numbers and examples, all traceable to the context files or the user's answers; gaps marked `[placeholder]`
- Sounds like the user per `creator-ikigai.md`, with none of their banned words or patterns
- Written for the narrow audience in `persona.md`. If any generic business creator could have written it, it's too broad.
- 250–400 words, within the platform limits in `references/platforms.md`
- Ends on the CTA: no outro after it, no gated CTA, no company tags, one link at most in the body
- Plain text, no markdown formatting
- Consistent with the patterns in the user's winners, if they have any

## Step 7: Present for review

Output format:

```
[Full post text, ready to paste]

---
Platform: [LinkedIn / X / both]
Word count: [X]
Pillar: [the user's pillar, or say it doesn't map neatly]
Saves: [the one portable thing the reader keeps]
Save score: X/5 — [one-line reason]
Shareability: X/5 — [one-line reason]
→ Make it shareable: [fix]   (only if ≤ 3)
Placeholders to fill: [list, or "none"]
```

If the user posts on both platforms, give one version per platform only where they need to differ (see `references/platforms.md`); otherwise one version with a note.

Then share these posting tips so the user can decide before publishing:

- **One link in the body, at most.** A second link goes in the first comment. Two links split attention.
- **Where the link points matters.** If the goal is capturing emails (a report, a template, a tool), send people to a page with an email capture, not a general blog or newsletter archive.
- **Skip company tags.** Tag an individual only if they'll genuinely engage, and only if the user wants to.
- **Give the payload a second life in the comments.** If there's a longer version of the framework, checklist or prompt, drop it in the first comment and say so in the post.

**Approval gate.** The user reviews and edits. Revise until they approve. The user is the author; don't publish or schedule anything yourself.

## Arguments

The user gives the topic as $ARGUMENTS, optionally with a chosen hook. If there's no topic, ask what they want to write about.

## Related skills

- `long-form-text-hook`: generates the hook this skill starts from.
- `short-form-text-post`: for a single tweet or a short post.
- `newsletter-post`: when the payload needs 1,000+ words.
- `content-ideas`: when the user doesn't have a topic yet.
- `content-planning`: to place the post on the calendar.
- `content-publish`: to schedule or publish the approved post.
- `content-setup`: builds the context folder this skill reads.

After posting, run `content-wins` so winners feed back into `content/winners/long-form-text/`.
