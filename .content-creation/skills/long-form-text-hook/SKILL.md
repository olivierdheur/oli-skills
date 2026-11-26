---
name: long-form-text-hook
description: Generates 10 opening-line options for a long-form text post on LinkedIn or a long X post. Every hook is a full sentence (or two or three), carries credibility or a contrarian claim inside the hook itself, and states the takeaway the post will deliver. Use when the user asks for LinkedIn hooks, X post hooks, opening lines, post starters, or wants to brainstorm how to open a long post. Triggers include "LinkedIn hooks", "hooks for a LinkedIn post", "opening line for my X post", "how should I open this post", "brainstorm hooks".
---

# Long-Form Text Hook

Generates 10 hook options for one topic, for a LinkedIn post or a long X post. The hook is the part a reader sees before the "see more" fold, so its job is to earn the click with proof and a clear promise. This skill writes hooks only. Once the user picks one, `long-form-text-post` writes the full post. For short posts (a single tweet, a Threads post), use `short-form-text-post`.

**Optimize for:** dwell time, saves and follows, over reactions.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/long-form-text/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

## Step 2: Gather what's missing

Read `references/platforms.md` for where the fold sits on each platform.

Then ask the user only what you need to write strong hooks. Build the questions around this topic; skip anything the topic or the context files already answer. If your environment has a structured question tool (for example AskUserQuestion), use it.

Probe only when relevant:
- **Platform.** LinkedIn, X, or both? The fold sits in a different place on each.
- **Numbers or results.** If the topic implies the user has data: how many, what result, over what timeframe?
- **The takeaway.** What will the reader walk away with? A hook can't promise what the post won't deliver, so this one is usually worth asking.
- **The tension.** If there's no clear contrarian or surprising angle yet: what do most people in the user's space get wrong about this?
- **Personal proof.** Did the user actually do this? What happened, in numbers?

No generic questions. Every question should make the hooks better.

## Step 3: Write 10 hooks

### What a hook must do

A cold reader has never heard of the user. The hook is the only thing they see before deciding to click "see more", so it has three jobs:

1. **Carry credibility, or a claim worth arguing with.** Every hook holds hard proof (a real number, a credential, a concrete outcome from the context files) or a genuinely contrarian claim. A pure story opener with neither reads as a stranger complaining. Credibility goes inside the hook itself, never deferred to a later line.
2. **State the takeaway it promises.** The reader should know what they'll get by clicking: the checklist, the numbers, the rule, the steps. This promise is a contract that `long-form-text-post` has to deliver. If the post can't deliver it, change the hook.
3. **Pass the "what is this about?" test.** The topic is clear before the fold. If a reader has to click to find out what the post is about, most have already scrolled past.

### How it must read

- **Full sentences.** One long sentence, or two to three real sentences with natural rhythm. Never a headline chopped into short lines to hit a character count. Never a fragment ending in a colon to bait the click. Earn the click with proof and personality, not a withheld payoff.
- **Numbers and outputs over feelings.** "We cut our close from 12 days to 3" beats "Month-end close used to stress me out."
- **The user's voice.** Tone, personality, humor and banned words come from `creator-ikigai.md`. Don't impose a voice of your own.
- **Written for the narrow audience** in `persona.md`, not "anyone interested in business." If the hook could open any creator's post, it's too generic.
- **Definitive language.** "Has changed" beats "is changing." Passive framing sounds like watching from the sidelines.

### Philosophy

Default to reader-focused: the hook is about the reader or a tension they feel, fear or secretly think. Use authority when it serves the reader, when the proof makes them think "this person knows something I need." Authority is a tool for the reader's benefit, not self-promotion.

### Techniques

Every hook uses one technique. Use no technique more than twice across the 10. Templates and illustrative examples for each are in `references/starter-examples.md`.

**Reader-focused (default)**
1. **Contradiction.** Say something that sounds wrong; the reader clicks to find out why.
2. **Stolen Thought.** Say what the reader secretly thinks but won't say out loud.
3. **Direct Accusation.** Call out a specific behavior the reader is guilty of.
4. **Absurd Reframe.** Make something mundane dramatic, with a number that proves it.
5. **The Uncomfortable List.** Tease a list of specific frustrations a narrow group shares.
6. **Old Way vs New Way.** Contrast how it used to be done with how it's done now; the user narrates the shift. A company or product is a character in the story, never the subject.

**Story-driven** (each still needs proof or a contrarian claim inside the hook)

7. **Buried Lede.** A mundane setup, then the real story, with its number, in the next sentence.
8. **Contrarian Reset.** "If I had to start over, I wouldn't [the expected first step]."
9. **Shame-to-Strength Flip.** Admit a past embarrassment the post will reframe as the right call.
10. **Public Reversal.** Admit being wrong about a strong take you held.
11. **PSA Norm-Breaker.** Announce a decision that breaks a norm in the user's space.

**Authority-earned** (when proof serves the reader)

12. **Authority Flex.** "I did [X]", where the constraint or result is the lesson.
13. **Specific Number + Unexpected Context.** A number creates intrigue; the context surprises.
14. **Insider Confession.** A non-obvious truth only someone in the arena would know.
15. **Credible Broker.** "I asked [N] people about [Y]"; the research is the hook.
16. **Unlikely Source.** An unexpected person or situation taught the lesson.

**Situational**

17. **Process Metaphor.** Frame a professional process as something familiar (dating, a diet, a renovation), with numbers.
18. **Ranked Decisions.** Rank a personal decision next to a professional one.

### Rules for the set of 10

- Every hook uses a technique from the list; no technique more than twice.
- Every hook is contrarian or numbers-driven, with credibility inside the hook.
- At least 5 are reader-focused or story-driven.
- At least 3 contain a specific number (from the context files or the user's answers, never invented).
- At least 2 pass the 10% test: strong enough that about 10% of the audience would strongly disagree. You want "finally someone said it" from one camp and pushback from another. Mild takes get scrolled past.
- Every hook states the takeaway it promises.
- No emoji openers, no hashtags, no generic "I did a thing and it changed everything" hooks, no AI-sounding phrasing.
- If winners exist, lean into the patterns that performed best.

## Quality check

Before showing anything, check every hook:

- Full sentences with natural rhythm; no chopped two-line headline, no character-count target, no colon-bait fragment
- Carries a real number, credential or outcome, or a contrarian claim a cold reader can't ignore
- States the takeaway the post will deliver
- The topic is clear from the hook alone
- Creates an open loop: an unanswered question, a contradiction, or a bold claim
- Strong enough that some people would disagree
- The important part lands before the fold on the chosen platform (`references/platforms.md`)
- Ties to one of the user's pillars in `creator-ikigai.md` where it can
- Sounds like the user, per `creator-ikigai.md`, and uses none of their banned words
- Every number and credential traces back to the context files or the user's answers

Rewrite any hook that fails before scoring.

## Step 4: Score shareability

Score every hook on how likely the reader described in `persona.md` is to share it: repost it, send it to a colleague, or comment "this is so me" so their network sees it. On LinkedIn and X, engaging is a public act. People amplify what says something about who they are, what a specific peer needs to read, and what names a tension they feel but haven't put into words.

Score each hook 1–5 across three lenses:
1. **Identity.** Does amplifying this signal who the reader wants to be seen as (from `persona.md`)? Would they attach their name to it in a professional feed?
2. **Send-to-a-friend.** Is there a specific person they'd DM or tag with "this is us"?
3. **Relatability.** Do they see their exact self in it, naming a symptom they already feel?

Scale:
- **5:** reposts or tags a friend without thinking.
- **4:** strong; reacts and likely reshares.
- **3:** borderline; relates but might scroll.
- **2:** useful, but about the information, not about them.
- **1:** generic; could be any creator's hook.

Give each hook a score and a one-line reason. Any hook at 3 or below gets a `→ Make it shareable:` line with one concrete fix: sharpen the identity marker, name the peer-to-peer feeling, or make the tension more specific.

## Step 5: Present and let the user pick

Output format:

```
Topic: [restated topic]
Platform: [LinkedIn / X / both]
Pillar: [which of the user's pillars this maps to]

1. (Technique) [hook]
   Promises: [the takeaway the post must deliver]
   Shareability: X/5 — [one-line reason]
   → Make it shareable: [fix]   (only if X ≤ 3)
2. ...
...
10. ...

Strongest: [2–3 hook numbers and why, calling out the top shareability scores]
```

**Approval gate.** Stop here. The user picks a hook, edits one, or asks for another round. Don't write the post until they've chosen.

## Step 6: Hand off

When the user picks a hook, offer to run `long-form-text-post` with the chosen hook and its promised takeaway. The promise travels with the hook: the post's payload has to deliver exactly it.

Don't log the chosen hook anywhere. Winners are filed by `content-wins` after the post goes live, with real performance attached.

## Arguments

The user gives the topic as $ARGUMENTS. If there's no topic, ask for one, or suggest `content-ideas` if they don't have one yet.

## Related skills

- `long-form-text-post`: writes the full post from the chosen hook.
- `short-form-text-post`: for a single tweet or a short post instead.
- `newsletter-post`: when the idea needs more room than a feed post.
- `content-ideas`: when the user has no topic yet.
- `content-planning`: to place the post on the calendar.
- `content-setup`: builds the context folder this skill reads.

After posting, run `content-wins` so winners feed back into `content/winners/long-form-text/`.
