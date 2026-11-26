---
name: short-form-video-caption
description: Writes the caption under a short-form video on Instagram Reels, TikTok or YouTube Shorts (title + description), from a finished script or a description of the video. The caption adds what the video didn't say instead of repeating it, opens on the CTA, and ends on a plain-text keyword line for search, with no hashtags. Use when the user asks to "write a caption", "IG caption", "Instagram caption", "TikTok caption", "Reels caption", "caption for this reel", "caption for this video", "Shorts title and description", or has an approved script from short-form-video-script and needs the caption.
---

# Short-Form Video Caption

Produces one ready-to-paste caption for one short-form video, plus a version per platform when the user posts to more than one. It starts from a finished script (usually from `short-form-video-script`) or a description of the video, and shows the caption for the user to pick from and approve. It does not write hooks (`short-form-video-hook`) or the script (`short-form-video-script`), and it does not post anything (`content-publish`).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/short-form-video/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: voice, banned words, the pillars, the user's CTA keyword and follow line, the credentials they're happy to use, any accounts they've approved for tagging, and any account-topic keywords they want on every post.
- `persona.md`: the one reader. The caption is written to the same person as the video.
- Winners: read the **Caption** section of each one. Their caption shape outranks the archetypes below; the augment rule (Step 3) still applies.
- `references/starter-examples.md`: the caption archetypes, with worked examples. Read it before drafting.
- `references/platforms.md`: open it when the user names a platform or posts to more than one.

## Step 2: Get the source

The caption needs to know exactly what the video says. In order of preference:

1. **The finished script**, ideally the approved output of `short-form-video-script`, with its type (TUTORIAL or AUTHORITY), anchor and CTA.
2. **The transcript** of the filmed video, if it drifted from the script.
3. **A description of the video**: what's said, what's shown, the CTA, and anything being sent (guide, prompt, checklist).

Also collect anything **beyond** the script: research notes, lines cut from earlier drafts, the full post or lead magnet the CTA points to. That's where the caption's new detail comes from.

Ask for whatever is missing before drafting: the script or a description, the platforms, and whether there's something to send (and the keyword). If the user hands over several scripts, write one caption per video and show them one after another.

## Step 3: The job: augment the video, never restate it

The person reading the caption has usually just watched the video. A caption that copies, paraphrases or summarizes the script gives them nothing, so they don't save it. The caption is the **second layer**: it hands over something the video didn't.

**The test:** a viewer who watched the whole video reads the caption and learns at least one new thing per beat.

For each caption beat, pick one of these moves:
- **Go deeper.** The detail the video cut for time: the exact prompt or setting, the real number, the step that took longest, the gotcha that broke it the first time.
- **Next move.** What to do after the video: the follow-on step, the edge case ("if you're on the free plan, do X instead"), the version for a different reader.
- **Behind the scenes.** The honest part: what didn't work, what the user would change, what it actually cost in time.
- **Tease.** Point at what's in the lead magnet or full post without giving it away ("the checklist has the fourth rule I cut from the video"). Pairs with the comment-keyword CTA.

**Write the layer plan first** (working notes, shown to the user with the draft):

```
The video says: [the script's beats, one line each]
The caption adds: [one line per caption beat, tagged go-deeper / next-move / behind-the-scenes / tease]
```

If a "caption adds" line could be checked off by someone who only watched the video, it isn't a layer. Replace it before drafting.

**Where new detail comes from:** the source material first, then general, checkable how-to knowledge about the tools in the video. Never invent a number, a result, a client or a personal experience. If the source holds nothing beyond the script, lean on next-move and tease rather than making up depth, or ask the user for the detail.

## Step 4: Pick the archetype

Every caption runs this skeleton. The CTA is **first**, not last.

```
[1] CTA line
[2] Setup line (+ a demystify line if the topic needs one)
[3] The body
[4] Closer (optional)
[5] Keyword line
```

| Archetype | Use when | Body length |
| - | - | - |
| **Authority Rules** | AUTHORITY script: borrowed authority, a contrarian take, "the N rules from [source]" | ~60–100 words |
| **Build Stack** | TUTORIAL script shaped as tools + steps: "I built X in Y hours" | ~150–200 words |
| **Numbered Roster** | TUTORIAL script shaped as a system with named parts: "the N things that run my X" | ~200–300 words |

When the video is none of these (a story, a single realization), keep blocks 1, 2 and 5 and write 3–5 short prose lines for block 3.

**Bias short.** Length is earned by the number of genuinely distinct items, never by elaborating on the ones you have. Authority Rules is the default when the value fits in three lines. Line break between every beat, no paragraph blocks.

## Step 5: Write the caption

### [1] CTA, first line

Platforms cut the caption off after a short preview, so line 1 is the only text guaranteed to be seen. It goes to the CTA on purpose: the video's job is the hook, the caption's job is conversion.

- **Something to send** (a guide, prompt, checklist, full post): the comment-keyword CTA, using the keyword from `creator-ikigai.md` (or the one the user names for this post). If the user's DM tool only reaches followers, add a follow-gate parenthetical: `Comment "[KEYWORD]" and I'll send you the full checklist! (make sure you're following so I can message you!)`. It turns a commenter into a follower by naming a constraint instead of asking for the follow.
- **A second, higher-intent offer** may get its own line right under it ("Or "[KEYWORD2]" to join [offer] :)"). Only when a real second offer exists; never invent one.
- **Nothing to send:** the user's follow line from `creator-ikigai.md`, word for word. If there isn't one, ask.
- **The script names its own CTA:** that one wins.

Check the user's setup before promising an automatic DM; see `references/platforms.md`.

### [2] Setup line

One sentence that frames the caption and carries a **credibility qualifier**: the constraint that makes the result impressive ("in about two hours", "with no developer", "as a two-person company"). The qualifier must be the user's own, from the context. Never borrow another creator's.

- Real numbers, real tools, real names. If the video has no concrete result, name the concrete problem instead.
- **Don't reuse the video's hook.** The viewer just heard it. Frame from a new angle: the result after the video ends, the constraint the video didn't mention, or the question it leaves open.
- **Demystify line** when the topic leads with a phrase that could intimidate ("AI agents", "MCP", "automations"): one plain-English sentence. "Each one is just an AI agent with a schedule and access to my email and calendar."

### [3] The body

Every form carries the augment layer, not the script's list read back. If the video already named the tools, steps or rules, each item adds the layer under it (the setting, the prompt, the gotcha, the "do this first").

- **Build Stack:** one emoji bullet per tool, thematically matched (🎨 design, ✍️ writing, 💻 building, 🚀 shipping). Each line names the tool and **what it did**. Then a numbered process block (`1️⃣`–`5️⃣`), one action per step, concrete enough to follow without the video.
- **Numbered Roster:** plain numerals, each item opening with a short named label and a period ("Chief of staff."). The labels do the teaching. Then the same beat every time: **cadence → what it does → the human detail** ("I read it before I get out of bed."). The human detail stops it reading like a feature list.
- **Authority Rules:** plain numerals, **one line per item, imperative voice.** If the video already stated the rules, each line is the *how-to-apply* for a rule instead. Terse on purpose.

**Emoji:** sparing. Only as bullet markers, as a 🏷️ label on the keyword line, or as one accent closing a CTA line. Never inside a sentence. Numbered Roster and Authority Rules use none.

### [4] Closer: one line, optional

Skip it on Authority Rules; the last item ends the caption. Otherwise pick the one the video earned:
- **Ownership:** what AI or the tool did versus what the user still owned. Pre-empts "so the tool did it for you".
- **Start here:** name the single easiest item and why. Removes "this is too much".
- **Payoff:** the line from the move to what it buys the reader (time, money, focus), in the user's words.

A destination line ("Full guide at [URL]") can follow when there's a real place to send people. Never invent a URL.

### [5] Keyword line

**No hashtags** (unless `creator-ikigai.md` says the user wants them). One plain-text line, comma-separated: this is what platform search and AI answer engines read. A 🏷️ prefix is optional; use it on long list captions, drop it on short ones. No handles here; they live inline in the body.

Escalate through four groups, in order:
1. **Proper nouns** people search by brand: tools, companies, people named in the video.
2. **Concept keywords**: the topic in the words the reader uses.
3. **How-to phrases**: "how to build a website with AI".
4. **Literal questions**, typed the way someone asks an answer engine: "how do i set up an AI agent". **At least two.** Question marks and casing are casual; don't tidy them.

If `creator-ikigai.md` lists account-topic keywords for every post, add them after group 2, spelled exactly, never twice.

**Relevance rule:** every video-specific keyword must be true to the video. Never stuff in a tool that isn't in it; off-topic keywords show the post to the wrong people and read as spam.

### Naming tools, companies and people

Write the **plain name** of every company or tool the video mentions; search reads the name. Add an `@handle` **only for accounts the user has explicitly approved** for tagging, in this conversation or in their context. A tool mentioned in the script is not permission to tag it: a tag reads as an endorsement, and a wrong handle notifies a stranger.

- Approved: name + handle, both, inline where the tool does its job ("ChatGPT @chatgpt turned my outline into page copy").
- Not approved: plain name only. No placeholder (`@???`, `[handle]`), no guessed handle. The caption must paste as-is.
- List every unapproved name under **Handles to confirm** in the output, so the user can approve a tag or leave it.

### Voice pass

Before showing anything, reread the prose lines (blocks 1, 2, 4 and the descriptive half of each list item) in the user's voice from `creator-ikigai.md`. Cut AI filler and hype, the "it's not just X, it's Y" pattern and elliptical setups. No em dashes. It should read like a smart friend who figured something out, not a brand account. Leave the keyword line and casual punctuation (`:)`, a single ⚡, lowercase openers) alone; they're the tell that a human wrote it.

## Step 6: Overlap audit

Put the draft next to the script, line by line. Rewrite or cut any caption line that:
- shares 5+ consecutive words with the script,
- makes the same claim as a script line in different words, or
- lists the same tools, steps or rules in the same order with nothing added under each.

The setup line and the CTA count too; the keyword line is exempt. Run it again after rewriting. The caption ships only when it comes back clean.

## Step 7: Per-platform versions

Write for the platform the user names. If they post to more than one, give one block per platform, using `references/platforms.md`:
- **Instagram:** the caption as written.
- **TikTok:** same body and keyword line. Swap the CTA for the link in bio if automatic DMs aren't set up there. Keep under 2,200 characters if the user posts through a scheduling tool.
- **YouTube Shorts:** a **title** (100 characters max, the topic's search words up front, a second visual hook for the video) and a **description** (the caption body plus the keyword line). Links there aren't clickable, so swap a "comment for the link" CTA for "the full walkthrough is on my channel" or a related long video.

## Quality check

Before showing anything, verify:
- Layer plan written; overlap audit clean; every caption beat adds something the video didn't say.
- The CTA is line 1 and matches the source: comment keyword (from the context) when there's something to send, the user's follow line when there isn't.
- The setup line has a specific number, artifact or timeframe, a qualifier that is the user's own, and doesn't reuse the hook.
- Archetype matches the script type; length matches the archetype; line break between every beat.
- No invented numbers, results, anecdotes or URLs. Anything missing is a `[placeholder]` with a question.
- Keyword line: no hashtags, no handles, proper nouns → concepts → how-to → 2+ literal questions, every keyword true to the video.
- Handles only for accounts the user approved; every other name is plain text and listed under Handles to confirm.
- Emoji only as bullets, the 🏷️ label or one CTA accent. No em dashes; voice and banned words match `creator-ikigai.md`.
- Every platform version is within its limits in `references/platforms.md`.

## Output format

```
Type: [TUTORIAL | AUTHORITY | other] · Archetype: [Authority Rules | Build Stack | Numbered Roster | prose]
Platforms: [Instagram, TikTok, YouTube Shorts]

LAYER PLAN
The video says: …
The caption adds: …

SETUP LINE OPTIONS (pick one)
A. [option]
B. [option]
C. [option, optional]

CAPTION: INSTAGRAM (using option A)
[the caption, ready to paste]

CAPTION: TIKTOK          ← only if posting there
YOUTUBE SHORTS: TITLE + DESCRIPTION   ← only if posting there

Handles to confirm: [names mentioned without an approved handle, or "none"]
```

The 2–3 setup-line options differ by angle (result, constraint, open question), not by wording. The CTA stays fixed unless the user has no keyword or follow line yet.

## Step 8: Approval gate

Stop and ask the user to pick a setup line, approve or edit the caption, and approve or skip each tag under Handles to confirm. Apply their edits exactly; don't re-polish lines they changed. Once approved, offer the next step: `content-publish` to post or schedule it.

If no script or video description was given, ask for it before doing anything else.

## Related skills

- `short-form-video-hook`: generates the hook options the video opens on.
- `short-form-video-script`: writes the script this caption starts from.
- `content-planning`: places the video on the calendar.
- `content-publish`: posts or schedules the video with this caption.
- `content-setup`: builds the `content/` folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
