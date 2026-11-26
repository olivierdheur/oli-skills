---
name: short-form-video-script
description: Writes a full talking-head (direct-to-camera) script under 60 seconds for Instagram Reels, TikTok or YouTube Shorts, in one of two script types — TUTORIAL (top of funnel, tactical how-to) or AUTHORITY (middle of funnel, borrowed authority + contrarian take). Starts from a chosen hook or a raw topic, or cleans up a script the user already drafted. Use when the user asks for a Reels script, TikTok script, Shorts script, short-form video script, talking-head script, "write the video", or has picked a hook from short-form-video-hook and wants the full script.
---

# Short-Form Video Script

Produces one complete talking-head script (under a minute read aloud) with a visual hook, a spoken hook, a body written one beat per line, and a CTA. It can start from hooks the user already picked, from a raw topic or research, or from a draft the user dictated, in which case it edits rather than writes. It does not generate hooks itself (it calls `short-form-video-hook`) and it does not write the caption under the video (`short-form-video-caption`).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/short-form-video/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: the pillar this script serves (tag it), voice, banned words, guardrails (including any rules for sponsored content), the user's CTA keyword and follow line, and the credentials they're happy to use.
- `pov.md`: the belief behind the script. A TUTORIAL is the "how" inside a belief, never the whole point.
- `persona.md`: the one reader. The Shareability Score runs against this person.
- The story bank (listed in the README): open it for every script, because every script needs a real lived moment (see Personal story below). If it's empty, suggest a story as that section says.
- The **Frameworks** section of `references/starter-examples.md`: read it every time, even when the user has winners. Frameworks are method, not examples.
- `references/platforms.md`: open it when the user names a platform, wants a length other than under 60 seconds, or is posting to more than one.

## Step 2: Classify the source — DRAFT MODE or RESEARCH MODE

Scan whatever the user handed over (pasted notes, a doc, a transcript, a brief) for a draft section ("Draft Script and Hooks", "Draft Script", "Script Draft") and a research section ("Raw Research", "Research", "Notes").

| What you find | Mode |
| - | - |
| The draft section has script text in it | **DRAFT MODE**: the user already wrote it. Clean it up and fit it to the template. |
| No draft, but research | **RESEARCH MODE**: you write the script from the research. |
| Neither (a plain topic, or a hook plus a short brief) | **RESEARCH MODE** |

When the user has dictated the script they want, that draft *is* the script, not a starting point for a rewrite. State the mode in one line at the top of the output.

### DRAFT MODE: the user already wrote it

Your job is copy-editing and formatting, not writing. Make it grammatical and coherent, and fit it into the template for its type (Step 3).

**Skip Step 5 (content flow options).** They already picked the flow.

**You may:**
- Fix grammar, tense, agreement and punctuation.
- Cut dictation artifacts: "um", false starts, repeated words, trailing "you know" and "like".
- Split run-ons into short spoken sentences; merge fragments that were clearly one thought.
- Add small connective words ("so", "and", "but", "then") where a beat doesn't land.
- Move an existing sentence into the slot it belongs in (a story line into `[PERSONAL STORY]`, a setup line into `[CONTEXT]`), within the template only.
- Break the body into one idea per line.
- Turn em dashes into commas or periods so it reads aloud.

**You may not:**
- Rewrite their lines because yours are punchier.
- Swap their words, analogies or examples for ones you like better.
- Add claims, stats, tactics or takeaways they didn't write.
- Delete a point because it feels redundant, thin or off-brand.
- Change their argument, the order of their beats, or their ending.
- Force in a credibility tag, a retention tease or a signature phrase that isn't in their draft.

**Filling the template.** If a slot has no matching text in their draft, don't invent it. Insert the slot with a flagged suggestion they can accept or kill:

```
[PERSONAL STORY]: (MISSING — suggestion, confirm/correct:) [grounded proposal from the story bank or creator-ikigai.md]
```

One exception you add without flagging: `[CTA]`. If their draft has no close, add the standard CTA for its type (Step 6).

A TUTORIAL draft has no `[PERSONAL STORY]` slot to flag. Check that some lived experience sits inside a body line instead; if none does, note it in the changelog rather than inserting a block they didn't write.

**Hooks in DRAFT MODE.** If they wrote hooks, use theirs (grammar fixes only). Pass them to `short-form-video-hook` so they come back as options alongside generated ones, tagged `(YOURS)`. Never replace theirs with a generated one. If they wrote a script but no hooks, run the hook skill normally.

**Voice rules are advisory in DRAFT MODE.** The banned words in `creator-ikigai.md` and the "write for the ear" rules filter *your* writing, not theirs. If their draft breaks one, leave it and mention it in the changelog. Never silently rewrite their line to satisfy a rule.

**End DRAFT MODE output with a changelog:**

```
WHAT I CHANGED
- [one line per edit, e.g. "Split the third sentence in two so it reads aloud"]
- [anything left alone that you'd suggest changing]
```

If the changelog runs past about 6 lines, you rewrote too much. Go back and restore their wording.

### RESEARCH MODE

The normal generative path. Steps 4–6 run as written and every rule in this file applies to your writing. Use everything in a research section: facts, quotes, links, stats, observations. Treat it as raw material, not prose to preserve: paraphrase into the user's spoken voice rather than reading the research aloud. Seed the hooks from it too.

## Step 3: Classify the script type — TUTORIAL or AUTHORITY

This skill writes exactly two kinds of talking-head script. Classify before writing a line and state the type at the top. If the user names it ("tutorial", "authority", "top of funnel", "middle of funnel", "contrarian"), take it. If the hook skill already classified it, use that.

| Type | Funnel | What it is |
| - | - | - |
| **TUTORIAL** | Top | Tactical how-to: a step-by-step guide, or a walkthrough of how the user actually uses something they built or found. The viewer can go do it right after watching. |
| **AUTHORITY** | Middle | Borrowed authority plus a contrarian take. Opens on something a credible outside source said, published or did, presents it, then turns it with the user's own opinion. |

The two types handle the story differently:

| | TUTORIAL | AUTHORITY |
| - | - | - |
| Standalone `[PERSONAL STORY]` slot | No | Yes, required |
| Where the lived experience goes | Woven into a body line as they teach | Its own beat, as the reason they get to disagree |

**Credibility lives in the hook, in both types.** A cold viewer doesn't know the user. If the user has a real number, credential or result that makes the viewer stay, it belongs in the spoken or visual hook, not in a self-introduction a few seconds later. There is no separate intro slot. If the chosen hook carries no credibility and the context has a relevant credential, offer a `↳ Sharper:` hook that includes it; don't add an intro beat.

### TUTORIAL

**Weave the story into the teaching.** The lived experience rides inside the steps, never in its own block. One clause or one sentence:
- Attached to a step: "I built this because I was doing it by hand every Monday."
- Attached to a failure: "The first version broke on me three times before I got the prompt right."
- Attached to the stakes: "This is the workflow that lets me [real outcome from the context]."

**TUTORIAL body rules (on top of the general body rules):**
- Every step is doable after watching. Name the actual tool, the actual place to click, the actual prompt shape.
- Show the real thing, not the concept of it. If the user built it, say what it does and what it replaced.
- Numbered steps stay grouped as one sequence.
- No borrowed authority needed. The proof is that it works.

### AUTHORITY

**The personal story is required,** and it's what makes the take the user's rather than commentary. Place it as the *reason they're entitled to disagree*, not a bolted-on anecdote: "I [did the exact thing they're describing] and it didn't work the way they say" does more than any credential.

**The authority must be real, external and borrowed.** Only these count:
- A named person with standing in the user's niche: a founder or CEO, a well-known investor, a recognized researcher or operator
- A prominent company, speaking through a launch, a public memo, an earnings call, a job posting, a policy change
- A high-prestige institution: a named university or research lab
- A credible media outlet: reporting from a publication people know

**Does not count:** "top investors are saying", "experts agree", "a study found", an unsourced statistic, a random social post, or the user's own credentials. If that's all there is, it isn't an AUTHORITY script yet.

**Never fabricate the authority.** No invented quote, stat or study, and no real claim attributed to the wrong person. If the source is in the research, use it and cite it as written. If it isn't, say so and offer to find it; don't write around a placeholder that reads as real.

**AUTHORITY structure:**
1. **Hook**: the borrowed authority and the contrarian edge together.
2. **What they said**: one or two lines, specific and accurate.
3. **The turn**: the user's take. Where they agree, where they don't, what everyone's reading wrong.
4. **Why they get to say it**: the personal story, as the reason they know.
5. **What to do about it**: the practical consequence for the viewer, so it isn't only an opinion.
6. **CTA**.

### When it fits neither: call it out, don't write it

If the topic is a general observation, a personal update, a motivational riff, a hot take with no external anchor, or "what I think about X" with no tactic and no source, stop and say so. Don't produce a script anyway, and don't stretch a thin tutorial or fake an authority to fit.

```
This isn't a TUTORIAL or an AUTHORITY script yet. [one line on why.]

→ Make it a TUTORIAL: [the specific tactical angle: what would the user
  demo, step by step, and what could the viewer do after?]

→ Make it AUTHORITY: [2–3 candidate borrowed-authority anchors that would
  carry this take: named people, companies, institutions or outlets whose
  public statement or action the argument could hang off. Say which are
  verified from the source and which need confirming.]
```

Helping find the authority is part of the job. When the take is good but unanchored, name who in the space has said something adjacent and the contrarian angle against them. Tag anything you can't verify `(UNVERIFIED — confirm before using)` and offer to search.

**Exception:** in DRAFT MODE, if the user dictated a script that fits neither type, still clean up and format it. They outrank the gate. Say so in one line above the changelog: `Note: this doesn't fit TUTORIAL or AUTHORITY — [why], [nearest fix].`

## Step 4: Hooks — approval gate

Every script needs both a spoken hook and a visual hook (text overlay).

- If the user already picked both, use them.
- If not, run `short-form-video-hook` with the topic, the type, and the source with its section headers intact (so any hooks the user wrote come back tagged `(YOURS)`). Don't write hooks inside this skill.
- **Wait for the user to pick** one visual and one spoken hook before going on.

## Step 5: Content flow options — approval gate (RESEARCH MODE only)

Skip this entirely in DRAFT MODE.

Before writing the full script, present **3 content flow options**: short outlines of how the script could run.

- Each one describes the arc in 2–3 bullets: what the hook sets up, how the body approaches it, the payoff.
- **Stay inside the classified type.** All three are TUTORIAL options or all three are AUTHORITY options. (If the topic genuinely supports both, say so in one line and let the user pick the type first.)
- Vary the angle, tone or structure. Use a framework from `references/starter-examples.md` where it fits naturally; don't force one.
- **AUTHORITY options** each name the anchor they'd open on and the contrarian edge against it.
- Short enough to scan and pick.

```
CONTENT FLOW OPTIONS (pick one, or combine elements):

1. **[Short label]** — [2–3 bullets]
2. **[Short label]** — [2–3 bullets]
3. **[Short label]** — [2–3 bullets]
```

**Wait for the user to pick or give direction** before writing the script.

## Step 6: Write the full script

In DRAFT MODE, everything below is the template the user's draft gets fitted into, not a license to rewrite their lines. Where their draft covers a slot, their version wins. Where it doesn't, flag the gap.

### Hook → Value → Rehook

| | Strong | Weak |
| - | - | - |
| **Hook** | Curiosity in 1–2 seconds; opens a loop | Takes too long to get to the point |
| **Value** | Education or relatability with a real takeaway | Vague or thin |
| **Rehook** | Pulls the viewer back in throughout | No structure; attention drops mid-video |

### Context (right after the hook)

- One sentence on why this matters or why the user is talking about it. It bridges the hook to the content.
- Skip it if it's redundant. Never use it to introduce the user; credibility already lives in the hook.

### Personal story: required in both types, placed differently

A script is never pure fact, information or tactics. Every script carries a short, real moment from the user's life. That's what makes people follow the person, not just save the information. A script with no lived experience fails the quality check.

- **AUTHORITY:** its own `[PERSONAL STORY]` beat, one to three sentences, usually right after the turn (sometimes just before it as setup), reading as the reason they get to disagree.
- **TUTORIAL:** no slot; a clause or sentence inside a body line (why they built it, what broke the first time, what it replaced). If no body line carries any lived experience, go add it where it belongs.

Rules for the story:
- **Real, not invented.** Pull it from the story bank first (match the topic against what each story proves), then from `creator-ikigai.md`.
- **Not cheesy.** No inspirational-poster moments, no "and that's when I realized…", no forced vulnerability. A specific, slightly mundane true detail beats a grand epiphany.
- **Earns the point.** It sets up or illustrates the exact thing the body teaches. A story bolted onto an unrelated point is worse than none.
- **Short and spoken.** One to three sentences.
- **If you don't have the story, suggest one; never fabricate.** Propose a plausible story grounded in what the context says about the user, clearly flagged `(SUGGESTION — confirm/correct:)`. If they confirm it, offer to add it to their story bank.

### Body

- **No self-introduction.** Don't stack background on the user here.
- **Credibility tags only where they strengthen a specific point.** If no real credential from the context fits this exact point, leave it out. Shape: "I [relevant real thing], so I know how hard [this specific point] is."
- **Optional watch-through tease.** If the video shows a prompt, workflow or complex setup, you may drop a short line early so people stay ("Stick around, I'll show you how at the end."). Don't force it, and never use it to announce a reveal. TUTORIAL only: AUTHORITY scripts have no asset to send.
- **One line = one beat.** Each body line is a self-contained beat, about 10 seconds aloud (roughly two short lines of text), so the user can film, cut and put on-screen text against it. If a line carries a setup and a payoff, split it. Keep numbered steps grouped as one sequence.
- **Define, then example.** When explaining a concept, give a plain one-line definition, then a concrete example right away.
- **Don't label items mechanically.** No "Reason one", "Takeaway two". Announce the count once ("here are three"), then "First… Second… Third…".
- **Real numbers and examples,** not generic advice, taken from the context, the user or a source they gave. Any other fact (a fee, a rate, a stat, a rule of thumb) gets `(UNVERIFIED — confirm before using)`. Never fill one in from memory.
- **No verbatim source.** Never echo pasted material line for line, and never copy another creator's wording. Paraphrase and reorder into the user's spoken voice.
- Apply the framework picked in Step 5, if any.
- **Under 60 seconds read aloud,** about 150 spoken words. Shorter is better. For a longer target, check `references/platforms.md`.

### CTA (end of video)

Short, about 2–4 seconds, and it depends on the type. Write it fresh so it names the actual topic. Never mix the two.

**TUTORIAL: comment keyword + conversation prompt.** The user's CTA keyword comes from `creator-ikigai.md`; if there isn't one, ask (or use `[KEYWORD]`). Keep the keyword the same every time so the audience learns it. Shapes:
- "Comment [KEYWORD] for my guide, and tell me what you'd use this for."
- "Comment [KEYWORD] for the prompt, and tell me what kind of [thing the script built] you'll make."

**AUTHORITY: invite disagreement, then the follow line.** No keyword, no asset. Vary the question to fit the take; the follow line comes from `creator-ikigai.md`. This is the one CTA allowed to run two short lines. Shapes:
- "Do you agree? Tell me in the comments. [Follow line]."
- "Am I wrong about this? Let me know below. [Follow line]."

If the body teased something, the CTA closes that exact loop.

### Write for the ear

The script is spoken, not read. Voice, tone and banned words come from `creator-ikigai.md`. On top of that, for any spoken script:
- Contractions and short sentences, like talking to a friend.
- **No em dashes.** Replace them with commas or periods.
- **No written-style parentheticals or mini-headers** ("Why it matters:"). Fold the information into the spoken line.
- **No meta-narration or reveal-announcing** ("here's the twist", "now the reveal", "read that again"). Just say the thing. The optional watch-through tease is the one exception.
- **No hype filler** or empty intensifiers.
- No jargon, no corporate-speak, no repeated or redundant phrases.

Before output, do a final read-aloud pass: anything that sounds written, robotic or like AI filler gets rewritten in the user's voice (advisory only in DRAFT MODE: flag, don't apply).

## Step 7: Shareability Score

Score the finished script 1–5 on how likely the reader in `persona.md` is to *share* it (repost it, DM it to a friend), not just watch it.

1. **Identity:** does sharing it signal who this reader wants to be seen as?
2. **Send-to-a-friend:** is there a specific person they'd DM it to?
3. **Relatability:** do they see their exact self in it? (The personal story is a big lever here.)

**5** shares without thinking · **4** strong, likely shares · **3** borderline, relates but might scroll · **2** useful but about the info, not them · **1** generic.

Give the score and a one-line reason. At 3 or below, add a `→ Make it shareable:` line with one concrete fix: sharpen the identity marker, strengthen the story, name the friend-to-friend feeling, or make the symptom more specific.

## Quality check

Before showing the script, verify:
- It's a TUTORIAL or an AUTHORITY script and the type is stated at the top. If neither, you called it out and didn't write it (DRAFT MODE excepted).
- **TUTORIAL:** no standalone `[PERSONAL STORY]` slot, and lived experience is woven into at least one body line. Every step is doable.
- **AUTHORITY:** opens on a real named external authority (never "experts say"), nothing about it is fabricated, and the personal story is present and reads as the reason the user gets to disagree.
- No intro or self-introduction slot; any credibility is in the hook or tied to a specific body point, and all of it is real.
- Each body line is one beat, about 10 seconds aloud. Real numbers and examples.
- A real, non-cheesy personal story ties to the topic, or a grounded suggestion is clearly flagged.
- Under 60 seconds read aloud (or the length the user asked for).
- CTA matches the type: TUTORIAL closes on the keyword plus a conversation prompt naming what the script built; AUTHORITY asks whether they agree and closes on the follow line.
- No em dashes, no meta-narration, no hype filler; voice and banned words match `creator-ikigai.md`.
- Consistent with the patterns in the user's winners (or the starter examples).

**DRAFT MODE also:**
- Their wording, examples, argument and beat order are intact.
- Nothing invented; every empty slot is flagged `(MISSING — suggestion, confirm/correct:)`.
- Their hooks are used as-is (grammar only).
- Step 5 was skipped.
- If the draft fits neither type, the one-line `Note:` is above the changelog.
- The `WHAT I CHANGED` changelog is present and about 6 lines or fewer.

## Output format

Put the VISUAL HOOK above the SPOKEN HOOK, so the spoken line is easy to copy into a teleprompter. Use the template for the type; they aren't interchangeable.

### TUTORIAL template

```
Type: TUTORIAL (top of funnel)
Pillar: [from creator-ikigai.md]
Mode: [DRAFT MODE — edited your draft | RESEARCH MODE — written from research]

[VISUAL HOOK]: [text overlay, 10 words max]
[SPOKEN HOOK]: [1–3 sentences; the first is the punch; carries the credibility if any]

[CONTEXT]: [1 sentence bridging the hook to the first step; skip if redundant]

[BODY]:
- [one beat per line; lived experience woven into a line, not its own slot]
- [numbered steps grouped as one sequence]
- [optional early tease if a prompt or workflow is involved]

[CTA]: [Comment KEYWORD for …, and tell me <what they'd use or build with this>]
```

### AUTHORITY template

```
Type: AUTHORITY (middle of funnel) — anchor: [named person / company / institution / outlet]
Pillar: [from creator-ikigai.md]
Mode: [DRAFT MODE — edited your draft | RESEARCH MODE — written from research]

[VISUAL HOOK]: [text overlay, 10 words max, carries the authority and the edge]
[SPOKEN HOOK]: [opens on the borrowed authority]

[WHAT THEY SAID]: [1–2 sentences, specific and accurate, cited as in the source. If unverified: "(UNVERIFIED — confirm before using:)"]

[THE TURN]: [the user's contrarian take]

[PERSONAL STORY]: [1–3 spoken sentences, the reason they get to disagree. If unknown: "(SUGGESTION — confirm/correct:)" + a grounded proposal]

[BODY]:
- [the rest of the argument, one beat per line, ending on what the viewer should do]

[CTA]: [<Do you agree? / a variant that fits> Tell me in the comments. <follow line>]
```

Then, for both:

```
Estimated duration: [X seconds]
Shareability: X/5 — [one-line reason]
→ Make it shareable: [fix] (only if X ≤ 3)

WHAT I CHANGED (DRAFT MODE only, about 6 lines max)
- …
```

## Step 8: Review — approval gate

Hand the script to the user to review and edit. Apply their edits exactly; don't re-polish lines they changed. When they approve it, offer the next step: `short-form-video-caption` for the caption, then `content-planning` or `content-publish`.

If no topic was given, ask what the video is about before doing anything else.

## Related skills

- `short-form-video-hook`: generates the hook options this script starts from.
- `short-form-video-caption`: writes the caption under the finished video.
- `content-ideas`: finds topics worth scripting.
- `content-planning`: places the video on the calendar.
- `content-publish`: posts it once approved.
- `content-setup`: builds the `content/` folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
