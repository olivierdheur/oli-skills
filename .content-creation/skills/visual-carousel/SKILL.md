---
name: visual-carousel
description: Writes the slide-by-slide text for a swipeable carousel on Instagram or LinkedIn (a cover slide with the hook, value slides, and a final CTA slide), with simple design notes for each slide and the caption or post text that goes with it. The user picks the cover hook, approves the slide outline, then approves the full slides. Use when the user asks for a carousel, an Instagram carousel, a LinkedIn carousel or document post, a swipeable post, a multi-slide post, "slides for social", or wants educational or tutorial content in slide format.
---

# Visual Carousel

Produces the text for one carousel: a cover slide that stops the scroll, 7–10 slides in total, a CTA on the last slide, a short design note for each slide, and the caption (Instagram) or post text (LinkedIn) that goes with it. The user approves three times: the cover hook, the slide outline, then the full slides. It does not design or render images; the output is text the user (or a design tool) lays out. It does not write video hooks or scripts (`short-form-video-hook`, `short-form-video-script`), and it does not post anything (`content-publish`).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/visual/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**What to take from each file:**
- `creator-ikigai.md`: the content pillars (every carousel serves one), voice, banned words, real credentials or outcomes the user is happy to show, their handle and follow line, and their comment keyword if they have one.
- `pov.md`: the beliefs. A carousel with no point of view is a listicle anyone could post; tie it to a belief, or ask the user what the take is.
- `persona.md`: the one reader. Every slide is written to this person.
- Story bank: open it only when a slide needs a personal moment. Never invent one.
- `references/platforms.md`: open it when the user names a platform or posts to both.

## Step 2: Get the topic and the source

Ask for anything missing before writing:
- **The topic**, and the pillar if the user names one.
- **The platform:** Instagram, LinkedIn, or both. Default to Instagram if they don't say.
- **The source**, if there is one: notes, a script, a newsletter issue, a post that did well. Carousels are often a second life for an idea that already worked.
- **The CTA:** something to send (a guide, checklist, template) with a comment keyword, or a follow/save/share ask.

If the user already wrote a hook, it goes first in the hook list, tagged `(YOURS)`, with grammar fixes only. If they've already picked one, skip to Step 4.

## Step 3: Cover hook options (gate 1)

The cover slide is the hook. It's text on an image, read in a glance while scrolling, so it works like a video's on-screen hook, not a spoken one.

Write **5 cover hooks**. Rules:
- **10 words max on the headline; 5–8 is the sweet spot.** An optional subline of up to 8 words can add the qualifier ("from 40 client closes").
- **Lead with the symptom or the outcome**, never the tool's name or the technical concept. "Why you're tired by 2pm" beats "5 circadian interventions".
- **Promise the swipe.** The reader should know there's a payoff inside and roughly how big it is ("7 rules", "the 3-day version", "before vs after").
- **Credibility can sit in the hook itself.** A cold reader doesn't know the user, so a real number, credential or result from the context belongs on the cover, not on slide 6. Never invent it; use `[placeholder]` and ask.
- **Mix shapes:** number-led, question-led, contrarian claim, "if you're [specific identity]", before/after. At least two with a specific number.

Every hook must pass four tests, or rewrite it:
- **Originality:** could a thousand creators in the niche have written it? Scrap it.
- **Mirror:** does the reader in `persona.md` see themselves, not "people like them"?
- **Curiosity:** does it open a gap only the slides close?
- **Specificity:** a real number, identity, situation or outcome, not a category.

Give each hook a **Save/Share score (1–5)** with a one-line reason: would this reader save it to use later, or send it to a specific friend? At 3 or below, add `→ Sharper:` with one concrete fix.

**Stop. Ask the user to pick one hook** (or edit one, or ask for another round). Don't outline until they pick.

## Step 4: Flow options and slide outline (gate 2)

Present **5 flow options** for the chosen hook. Each is a short label plus 2–3 bullets on the arc: what the cover sets up, how the value unfolds, and the payoff. Vary the structure type, not just the wording:

| Structure | Use when |
| - | - |
| **Numbered list** | N distinct tips, tools or rules. The default for "N ways to…". |
| **Step-by-step** | A process the reader follows in order. Each slide is one action. |
| **Myth vs truth** | The topic is full of bad advice. Each slide: the myth, then the fix. |
| **Before / after** | A transformation. Show the "before" honestly, then what changed, then how. |
| **Mistakes → fixes** | The reader is already doing it wrong. Each slide names a mistake and its fix. |
| **Framework** | The user has a named model with parts. One slide per part, then how to use it. |
| **Story → lesson** | One short real story (from the story bank) that earns a 3–5 point lesson. |

Use structures from the user's winners first, then `references/starter-examples.md`. Don't force a structure the topic doesn't fit.

Then mark the flow you'd pick and show its **slide outline**: one line per slide, header only, with the slide count. Example:

```
Recommended: 2. Mistakes → fixes (9 slides)
1  Cover: [chosen hook]
2  Context: [who this is for / why now]
3  Mistake 1: [header]
…
9  CTA: [CTA type]
```

**Stop. Ask the user to pick a flow and approve or edit the outline.** If they pick a different flow, show its outline before writing. Don't write full slides until the outline is approved.

## Step 5: Write the full slides (gate 3)

### Slide structure

**Slide 1: Cover.** The chosen hook as the headline, plus the optional subline. Nothing else on the slide.

**Slide 2: Context bridge (optional).** 1–2 sentences on why this matters or who it's for. It bridges the hook to the value. Skip it when the cover is self-explanatory and slide 3 can start the value.

**Value slides (usually slides 3 to 8 or 9).**
- One big statement per slide: a **header** that carries the point on its own, plus **supporting text** that adds the example, number or quick how-to.
- **10–40 words per slide**, header and supporting text together.
- **Headers do the heavy lifting.** Someone who reads only the headers should still get the value.
- Each slide makes sense on its own; people skim and skip.
- Each slide delivers a distinct, specific point. No filler, no slide that restates the one before.
- Real numbers, real tools, real examples wherever the context or source has them.

**Last slide: CTA.** One clear ask, using the user's handle and keyword from `creator-ikigai.md`:
- "Comment [KEYWORD] and I'll send you [resource]" (only if there's something real to send and a way to send it)
- "Save this for the next time you [situation]"
- "Send this to someone who [specific situation]"
- "Follow [handle] for more [topic]"

Pick one. Two asks on the last slide split the click.

### Total length

7–10 slides, cover and CTA included. Length is earned by the number of distinct points, never by stretching one point across two slides. If the outline only holds five real points, make a 7-slide carousel.

### Copy rules

- No jargon without a plain-English explanation in the same slide.
- Write like you're explaining to a smart friend, not lecturing.
- Be honest about limits and gaps; don't oversell a tool or a result.
- Voice and banned words come from `creator-ikigai.md`. Cut AI filler, hype, and the "it's not just X, it's Y" pattern.

### Design notes

Under each slide, add a one-line **Design:** note so whoever lays it out knows the intent. Keep it simple: layout, the one visual element, and what to emphasize. Examples: "Big number centered, header below", "Screenshot of the settings page, arrow on the toggle", "Two columns: myth (struck through) vs truth", "Same layout as slides 3–7 so the list reads as a set". Never describe a visual the user would have to invent data for. Keep the cover and CTA slide visually distinct from the value slides, and the value slides consistent with each other.

**Stop. Ask the user to approve or edit the full slides.** Apply their edits exactly; don't re-polish lines they changed.

## Step 6: The caption or post text

Write it only after the slides are approved, so it doesn't repeat them.

- **Instagram:** hand off to `short-form-video-caption`, passing the approved slides as the script and the CTA from the last slide. Its method fits a carousel as-is: CTA on line 1, a setup line, a body that adds what the slides didn't say, a plain-text keyword line, and an overlap audit against the slide text. One caption method, kept in one place, means a fix there improves both. If the user doesn't have that skill installed, follow the same rules inline.
- **LinkedIn:** write the post text here; it's short. Open with one or two full sentences that frame the document (the result or the tension, with credibility up front), add 2–4 lines with something the slides didn't say (the context, the "why now", what the user would do first), then one CTA. Plain text, no hashtags unless `creator-ikigai.md` says otherwise. Also give a **document title** (LinkedIn shows it with the document); make it the cover hook or a plainer version of it.

Then run the same overlap check: cut any caption line that repeats a slide header or shares 5+ consecutive words with a slide.

## Quality check

Before showing the full slides, verify:
- 7–10 slides. Slide 1 is the chosen hook. The last slide has one clear CTA.
- Every value slide has a distinct, specific point; reading only the headers still teaches something.
- Every slide is 10–40 words (the cover may be shorter).
- Real numbers, tools or examples where relevant, all from the context or the source. Anything missing is a `[placeholder]` with a question.
- Honest about limits; no hype.
- Each slide has a one-line design note.
- Voice and banned words match `creator-ikigai.md`. No em dashes.
- If winners exist, the carousel follows their patterns, not their words.
- Slide count and format fit `references/platforms.md` for every platform it's going to.

## Output format (full slides)

```
Topic: [restated] · Pillar: [from creator-ikigai.md] · Structure: [type]
Platform: [Instagram | LinkedIn | both]

SLIDE 1 (Cover)
**[Headline]**
[Subline, optional]
Design: [note]

SLIDE 2 (Context)
**[Header]**
[Supporting text]
Design: [note]

SLIDE 3
**[Header]**
[Supporting text]
Design: [note]

[…every slide…]

SLIDE N (CTA)
**[Header]**
[CTA text]
Design: [note]

---
Slides: [N] · Words per slide: [min–max]
```

## Step 7: Hand off

Once the slides and the caption or post text are approved, offer `content-publish`. Pass the approved slide text, the design notes, the caption (and the LinkedIn document title), and the platforms. Remind the user that the slides need to be designed and exported first: images for Instagram, one PDF for LinkedIn (see `references/platforms.md`). `content-publish` posts files; it doesn't make them.

If no topic was given, ask what the carousel is about before doing anything else.

## Related skills

- `short-form-video-caption`: writes the Instagram caption from the approved slides.
- `short-form-video-hook`: hook options when the same idea becomes a video.
- `long-form-text-post`: when the idea works better as a LinkedIn text post.
- `content-ideas`: finds topics worth turning into a carousel.
- `content-planning`: places the carousel on the calendar.
- `content-publish`: posts or schedules the approved carousel.
- `content-setup`: builds the `content/` folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
