---
name: short-form-video-hook
description: Generates 10 hook options (5 on-screen text hooks + 5 spoken hooks) for a short-form talking-head video on Instagram Reels, TikTok or YouTube Shorts, in one of two script types — TUTORIAL (top of funnel, tactical how-to) or AUTHORITY (middle of funnel, borrowed authority + contrarian take). Use when the user asks for Reels hooks, TikTok hooks, Shorts hooks, short-form video hooks, video openers, "first line" ideas for a video, or wants to brainstorm how to open a video before scripting it.
---

# Short-Form Video Hook

Produces 5 visual hooks (text overlays) and 5 spoken hooks for one short-form video topic, each scored for shareability, so the user can pick the best of each. It does not write the script: once the user picks, hand off to `short-form-video-script`. It does not write the caption under the video: that's `short-form-video-caption`.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/short-form-video/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: the content pillars (every hook serves one), voice, banned words, guardrails, and any real credentials or outcomes the user is happy to put in a hook.
- `pov.md`: the beliefs. Where it fits, the hook carries one of them. Don't hook a bare tutorial with no point of view behind it; tie it to a belief, or ask the user what the take is.
- `persona.md`: the one reader every hook must speak to. The Mirror Test and the Shareability Score both run against this person.
- `references/platforms.md`: open it when the user names a platform, or plans to post the same video to more than one.

## Step 2: Check the source for the user's own hooks

Before generating anything, scan whatever the user handed over (pasted notes, a brief, a transcript, a doc) for a section of draft hooks or a draft script ("Draft Script and Hooks", "Draft Script", "Hooks", "Script Draft") and a section of research ("Raw Research", "Research", "Notes").

| What's in the source | Mode | What you do |
| - | - | - |
| The draft section contains hooks (spoken, on-screen, or unlabeled one-liners) | **USER'S HOOKS** | Carry theirs through as options (below) |
| The draft section has script prose but no hooks | **GENERATE** | Generate all hooks, drawing the angle from their draft |
| No draft, but research | **GENERATE** | Generate all hooks from the research |
| Just a topic | **GENERATE** | Generate normally |

State the mode in one line at the top of the output.

### USER'S HOOKS mode

Hooks the user already wrote outrank yours. They wrote them because they want them.

- **Preserve their wording.** Fix grammar, tense and obvious dictation slips only. Don't re-angle, tighten for punch, or swap their words for synonyms.
- **List theirs first**, in their order, tagged `(YOURS)`. An on-screen hook goes in the visual list; a spoken one goes in the spoken list. If it's unclear, put it in both: trimmed to 10 words or fewer as a visual hook, phrased to read naturally aloud as a spoken one.
- **Fill the rest** of each list with generated hooks so each list has 5. If they wrote 5 or more of one kind, keep their strongest 5 and add none.
- **Never drop one of theirs for failing a Hook Test.** Score it honestly; if it lands at 3 or below, add the `→ Make it shareable:` line as a suggestion they can ignore.
- If one of theirs would be clearly stronger with a small change, present it **as written**, then an indented `↳ Sharper:` variant underneath. Never replace theirs.

## Step 3: Classify the script type — TUTORIAL or AUTHORITY

This skill hooks exactly two kinds of talking-head video, and the hook is where the difference shows first. Classify before generating and state the type in one line. If `short-form-video-script` called this skill, it passes the type along; use it. If the user names the type ("tutorial", "authority", "top of funnel", "middle of funnel", "contrarian"), take it.

| Type | Funnel | The hook's job |
| - | - | - |
| **TUTORIAL** | Top | Promise a tactical outcome. Name the symptom the viewer already feels, and imply the fix is seconds away. |
| **AUTHORITY** | Middle | Open on **borrowed authority** (someone credible said or did a thing) carrying a contrarian edge. |

### TUTORIAL hooks

- Lead with the **symptom or the outcome**, never the tool's name or the technical concept.
- Specific and doable: the viewer can picture doing this today.
- **Credibility is allowed in the hook itself.** A cold viewer doesn't know the user, so a real number, credential or result from the context (or one the user gives you) can sit right in the hook: "I run a two-person company and this saves me six hours a week." Don't hold it back for a later beat. Never invent it; use `[placeholder]` and ask.
- Good shapes: "If you're still doing X by hand…", "I built the thing that does X in Y minutes", "Never open [tool] again without turning on these 3 settings", "You'll stop doing X once you see this".

### AUTHORITY hooks

- **Name the borrowed authority.** Not gesture at it. The credibility is external and specific.
- Pair it with the contrarian edge in the same breath. Authority alone is news; authority plus disagreement is a hook.
- **Counts as borrowed authority:**
  - A named person with standing in the user's niche: a founder or CEO, a well-known investor, a recognized researcher or operator
  - A prominent company, speaking through a launch, a public memo, an earnings call, a job posting, a policy change
  - A high-prestige institution: a named university or research lab
  - A credible media outlet: reporting from a publication people know
- **Does NOT count:** "experts say", "top investors are saying", "a study found", an unsourced statistic, a random social post, or the user's own credentials (those are welcome in a hook, but they make it a TUTORIAL or a story, not AUTHORITY).
- **Never fabricate.** Don't invent a quote or a stat, or attribute a real claim to the wrong person. If the anchor isn't verified in the source, tag the hook `(UNVERIFIED — confirm before using)` and say what needs checking.
- Good shapes: "[Named person] just said X. They're wrong about Y.", "[Company] is quietly hiring for a role that didn't exist a year ago.", "[Institution] just published X. Nobody's talking about the part that matters."

### When it fits neither: call it out, don't hook it

If the topic is a general observation, a personal update, a motivational riff, or a hot take with no external anchor and no tactic, stop and say so. Don't generate hooks around it anyway, and don't dress a thin opinion in fake authority.

```
This isn't a TUTORIAL or an AUTHORITY video yet. [one line on why.]

→ Make it a TUTORIAL: [the specific tactical angle: what would the user
  demo, and what could the viewer do after?]

→ Make it AUTHORITY: [2–3 candidate borrowed-authority anchors that would
  carry this take: named people, companies, institutions or outlets. Say
  which are verified from the source and which need confirming.]
```

Helping find the authority is part of the job. When the take is good but unanchored, name who in the space has said something adjacent and what the contrarian angle against them would be.

**Exception:** in USER'S HOOKS mode, their hooks always get presented, type gate or not. Note the mismatch in one line and carry theirs through.

## Step 4: Generate

### Two hooks per video

1. **Spoken hook**: what the user says out loud in the first ~3 seconds.
2. **Visual hook**: the text overlay on screen.

Both must create curiosity, pass the Hook Tests, and make a surprising, bold claim that stops the scroll. The visual hook does not have to mirror the spoken one: it can compress it, or amplify it from a different angle (the overlay states the surprising claim while the spoken line sets up the authority, or the reverse).

### Lead with symptoms, not expertise

Speak to how the viewer feels first; deliver the expert view inside the video.

| Expert-first (weak) | Symptoms-first (strong) |
| - | - |
| Mastering competency-based interviews using STAR | Why interviewers love you and still don't hire you |
| Color theory, undertones and contour mapping | If your makeup disappears in photos, here's the fix nobody talks about |
| 5 interventions for cognitive enhancement | Why you feel exhausted by 2pm even if you slept 8 hours |

| Strong hook | Weak hook |
| - | - |
| Opens a curiosity gap and doesn't close it | Gives too much away (no tension) |
| Works in the first sentence | Takes too long to get to the point |
| Speaks to what the viewer already feels | Self-oriented, no value to the viewer |

| Type | Weak | Strong |
| - | - | - |
| Question | How do you grow on Instagram? | How can a video be posted twice and one get 6 million more views? |
| Contrarian | Money isn't everything | Everyone's talking about FU money but no one's talking about love-you money |
| Story | So I was in the shower and this thought came to me | A lot of the smartest people I know are the ones failing on social media |
| Number | 5 ways to grow on social media | You'll blow up once you understand this one thing about human behavior |
| Negative | Why you shouldn't be inconsistent | Never post on Instagram again without turning on these 3 settings |

### Rules

**Both hooks:**
- Specific enough that ONE person (the reader in `persona.md`) sees themselves in it.
- Create curiosity so the viewer has to keep watching ("This company pays THIS job more than product managers" → they stay to learn the job).
- Lean into patterns from the user's winners, or the starter examples if there are none.

**Spoken hooks:**
- 1–3 sentences. The first sentence carries the load: it's the most captivating line in the video. The rest adds context, teases the reveal, or stacks the curiosity.
- Must sound natural said aloud: contractions, conversational rhythm.

**Visual hooks:**
- 10 words max; the sweet spot is 5–8.
- A scroller with the sound off gets the point in one glance.

**Variety across the 5 spoken hooks:**
- Mix shapes: number-led, question-led, statement-led, "how to", "if you're [specific identity]".
- At least 2 contain specific numbers.
- At least 2 open with a specific identity or situation marker ("If you're a 28-year-old…", "I'm a mom of three under five…").
- **Vary the angle, not the type.** All 10 hooks belong to the classified type. Don't mix TUTORIAL and AUTHORITY hooks in one list.
- **AUTHORITY lists:** every hook names a real external anchor. Vary which anchor and which contrarian edge where the source supports it, rather than five rewrites of one sentence.

### Hook Tests

Every hook you generate must pass all four. If one fails, rewrite it and don't present it. (This does not apply to the user's own hooks; those are always shown.)

- **Originality:** could a thousand other creators in the niche have written this exact hook? If yes, scrap it. "Healthy morning routine that changed my life" → "I'm a mom of three under five. I used to be exhausted by 10am. Here's the routine I built with 12 minutes to myself."
- **Mirror:** does the reader in `persona.md` see themselves in the first three seconds? Not "people like them". Them.
- **Curiosity:** does it make someone *need* to know what's next? Anything less, keep writing.
- **Specificity:** generic hooks blend into the scroll. "5 things I wish I knew when I started my business" → "If you're 28 and quitting your corporate job this year to go full-time on your side hustle, here are 5 things I wish I knew before I left."

## Step 5: Shareability Score

After the hooks pass the tests, score **every** hook 1–5 on how likely the reader in `persona.md` is to *share* it, not just watch it. Sharing is an identity act: people share what says something about who they are, what a specific friend needs to see, and what names a feeling they couldn't put into words.

Three lenses:
1. **Identity:** does sharing it signal who this reader wants to be seen as (take that from `persona.md`)?
2. **Send-to-a-friend:** is there a specific person they'd DM it to with "this is so us"?
3. **Relatability:** do they see their *exact* self in it, a symptom they already feel?

- **5**: shares without thinking; a specific friend comes to mind instantly.
- **4**: strong; would save and likely share.
- **3**: borderline; relates, but might nod and scroll.
- **2**: useful, but about the info, not about them.
- **1**: generic; could be any creator.

Give each hook its score and a one-line reason. **At 3 or below, add a `→ Make it shareable:` line** with one concrete fix: sharpen the identity marker, name the friend-to-friend feeling, or make the symptom more specific.

## Quality check

Before showing anything, verify:
- The type is stated at the top and every hook belongs to it. If the topic is neither type, you called it out with both routes instead of generating.
- **AUTHORITY:** each hook names a real, specific external authority (never "experts say"), nothing is fabricated, and anything unverified is tagged `(UNVERIFIED — confirm before using)`.
- **TUTORIAL:** each hook leads with the symptom or outcome, not the tool name. Any credential or number in it is real and comes from the context or the user.
- Every generated hook passes the four Hook Tests, opens a loop it doesn't close, and speaks to the reader's problem.
- Visual hooks are 10 words or fewer.
- Voice and banned words match `creator-ikigai.md`.
- In USER'S HOOKS mode, every one of theirs is present, tagged `(YOURS)`, listed first, and unchanged apart from grammar.

## Output format

Two separate lists, **visual hooks first**. They are not paired 1:1; the user picks the best of each independently. Only your strongest 5 of each; no padding.

```
Topic: [restated]
Type: [TUTORIAL (top of funnel) | AUTHORITY (middle of funnel) — anchor: [named person / company / institution / outlet]]
Pillar: [from creator-ikigai.md]
Mode: [USER'S HOOKS — n of yours carried through | GENERATE]

### Visual hooks (text overlays, 10 words max)

1. [hook] (YOURS) — Shareability: X/5 — [reason]
   ↳ Sharper: [optional, only for the user's own hooks]
2. [hook] — Shareability: X/5 — [reason]
   → Make it shareable: [fix] (only if X ≤ 3)
3. …
4. …
5. …

### Spoken hooks (1–3 sentences; the first sentence does the heavy lifting)

1. …
…
5. …
```

After both lists, note the top 1–2 spoken and top 1–2 visual hooks and why (call out the highest Shareability scores).

## Step 6: Approval gate — the user picks

Stop and ask the user to pick one visual hook and one spoken hook (or edit one, or ask for another round). Don't write the script until they pick. Once they do, offer to hand off to `short-form-video-script` with the chosen pair, the type, the anchor (for AUTHORITY), and the source material with its section headers intact.

If no topic was given, ask what the video is about before doing anything else.

## Related skills

- `short-form-video-script`: writes the full talking-head script from the chosen hooks.
- `short-form-video-caption`: writes the caption under the video.
- `content-ideas`: finds topics worth hooking.
- `content-planning`: places the video on the calendar.
- `content-publish`: posts it once approved.
- `content-setup`: builds the `content/` folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
