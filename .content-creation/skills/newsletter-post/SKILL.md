---
name: newsletter-post
description: Leads the user from an idea or voice notes to a finished newsletter article for Substack or X Articles, through collaborative brainstorming, a confirmed seven-question editorial questionnaire, a chosen progression, an approved outline, and a reviewed 1,000–1,500-word draft. Use when the user says "write a newsletter", "Substack post", "newsletter issue", "write an essay", "X Article", "long-form post for Substack", or hands over notes and wants them turned into an article. For formatting finished prose only, use newsletter-format.
---

# Newsletter Post (Substack, X Articles)

This skill writes one newsletter article with the user, not for them. It runs brainstorm and interview → confirm the questionnaire → choose the progression → approve the outline → draft → review → hand off to formatting → targeted revisions. The agent helps develop the thinking; the user confirms what the article actually means before any structure or prose is settled. Don't rush discovery to hit a time target. This skill does not format finished prose for publishing (use `newsletter-format`), cut an article into short posts (use `short-form-text-from-newsletter`) or write short posts from scratch (use `short-form-text-post`).

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/newsletter/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**For this skill specifically:**
- Read the story bank, if the user has one, before proposing any anecdote.
- If the user has published issues saved in their context folder, read the 1–2 most relevant finished ones (prefer the final version over drafts). The user's own writing outranks every external example.
- Voice, tone, banned words and punctuation rules come from `creator-ikigai.md`. This skill supplies method only.
- Check `references/platforms.md` for whether the piece is headed to Substack, X Articles or both.

## Step 2: Brainstorm together and confirm the point

Read `references/outline-and-review.md`. For craft calibration, use only writing the user supplies: their own newsletter winners, plus any essays they admire that they list in their context folder or paste now. Learn the craft moves from those, never the words. Don't bring in outside essays the user didn't provide.

**Interview in short rounds**, normally 2–3 questions at a time. Respond to what the user actually says: point out an interesting connection, offer a possible interpretation or counterpoint, and invite the user to sharpen or reject it. Don't just collect answers until you can impose a structure, and don't make the user do all the editorial thinking. Follow unfinished thoughts before opening new ones. There's no fixed number of rounds.

**Fill in the seven-question questionnaire yourself** from the interview (questions in `references/outline-and-review.md`). For each answer show:
- the proposed answer,
- the user's words or experiences that support it,
- its status: directly stated, proposed interpretation, or open.

A fact being stated doesn't mean the user chose it as the thesis. Preserve the user's own language when it captures the idea. Leave unsupported answers open, including the turning point if there isn't one. When several takeaways compete, show them instead of silently picking one.

**Confirmation gate.** Ask the user to confirm or correct the completed questionnaire, then stop. Do not write progression options, headings, an outline or prose until the user confirms the editorial meaning. More interview answers, or approval of the broad topic, are not confirmation. When the user changes one answer, update it and anything that depends on it without reopening settled facts.

## Step 3: Choose the progression, then approve the outline

**Progression first.** After confirmation, propose 2–3 genuinely different progressions when real alternatives exist. Each is a few connected sentences: where the reader starts, how the thought develops, where they arrive. Recommend one and explain the trade-off. Don't disguise headings as a progression or offer cosmetic variations of the same sequence. If only one progression makes sense, say why and propose it alone.

**Gate:** get the user's pick or adjustment before writing detailed headings.

**Then the outline.** Show: the agreed main takeaway, the opening, each section's substance and evidence, transitions, the practical reader value, the ending, and any gaps that must be filled. Use as many sections as the material needs. There is no compulsory three-point structure, dramatic turning point or quota of takeaways. A useful distinction, question, decision, experiment or worked example can be the practical value; agree on which during the questionnaire.

Plan a short **"Here's what we cover"** roadmap after the opening setup and tension, before the main body. It's a reader convenience, not a structure: it lists the sections the article actually has. Drop it only if the user's context or the user says so.

Target 1,000–1,500 words of body copy, leaning shorter, unless the user's context sets a different length. Don't generate titles or subtitles yet.

**Gate:** get explicit approval of the outline before drafting. Honor approvals already given. Combine or skip stages only when the user explicitly asks, never because you assume agreement. Save the confirmed questionnaire and chosen progression alongside the draft so later passes can't silently change the argument.

## Step 4: Write the article

- **Length:** 1,000–1,500 words of body (excluding title, footer and publishing notes), leaning shorter.
- **Opening:** sharp within the first 1–3 sentences, with room for the personal story to develop. A cold reader doesn't know the user, so credibility (a real number, credential, outcome) or a genuinely contrarian claim belongs in the opening itself, not three paragraphs later.
- **Thesis:** established naturally, following the confirmed questionnaire and approved progression.
- **Roadmap:** include **Here's what we cover** after the opening story, setup and tension, before the substantive sections. Use short bullets that name each section or tease its payoff, in the same order and with the same promises as the article. This roadmap is body copy owned by this skill, not something the formatter invents. Include it in reflective essays as well as tutorials.
- **Reader:** write to the audience described in `persona.md`.
- **Texture:** the user's specific observations, conversational rhythm, humor and real receipts from the context files. Let personal texture and reasoning earn the practical value; don't append generic advice to fill a quota. Keep the nuance, uncertainty and unresolved experiences the user chose to keep.
- **Voice:** follow `creator-ikigai.md` for vocabulary, banned words and punctuation. Avoid forced vocabulary, borrowed catchphrases and generic AI enthusiasm.
- **Optional, not required:** recap bullets and an engagement question at the end. Don't repeat actions already delivered or weaken a strong ending with a compulsory prompt.
- **Out of scope here:** title options, footer, CTA templates and images. If the user supplied images, keep them where they are.

## Step 5: Review, save, then format

**Review.** Apply the review checklist in `references/outline-and-review.md` to the complete draft. Fix problems within the agreed outline before showing anything. Flag only unresolved evidence gaps or decisions the user must make; don't hand over a long scorecard. Never fabricate a fact to finish a draft.

**Save.** Keep one authoritative, editable body (for example `draft.md`) in an issue folder inside the user's content context, or wherever the user's context says drafts live. Keep the confirmed questionnaire and progression with it. Never overwrite a final version without being asked. Titles and editorial notes stay outside the copy-ready body.

**Format.** If the `newsletter-format` skill is installed, run it now as part of this workflow, without asking, so the first draft the user sees is already formatted. It owns title and subtitle options, button markers, CTA suggestions, links and footers. If it isn't installed, deliver the clean body in Markdown plus 2–3 title and subtitle options, and say that `newsletter-format` can handle the publishing layer.

## Step 6: Targeted revisions and handoff

- Take the user's consolidated feedback or direct edits to the authoritative draft. Change the requested passages and anything that depends on them. Keep the user's wording and untouched sections.
- Don't reopen the approved outline or rewrite the whole article unless the user asks, or a real contradiction needs discussing.
- After substantive edits, resync **Here's what we cover** with the revised sections and their order. Keep the user's own roadmap wording where it still fits and explain any change.
- Recheck affected claims, takeaways and length, then rerun formatting if it was used. Reuse existing title options unless asked or the changed article makes them inaccurate. Avoid duplicate footers, markers or links on repeat passes.
- Return the clean article plus short unresolved notes, if any. Writing and formatting are not permission to publish.

## Hard guardrails

- No invented experiences, proof, numbers, dialogue or causal claims. Verify external factual claims with sources, and keep interpretation separate from evidence.
- Never publish anything the user's context marks as private (exact finances, client names, family details and so on). Use only the public phrasing the context allows.
- Check fit with the themes in `creator-ikigai.md` without forcing every theme into every piece. Show the concrete connection the article earns.
- Formatting must preserve the body's wording and order. Substantive changes happen here, before the handoff.

## Quality check

Before showing any draft, verify:

- [ ] The questionnaire was confirmed, a progression was picked, and the outline was approved, each by the user, before the next stage started (unless the user explicitly asked to skip one)
- [ ] The draft says what the confirmed answers say; no interpretation turned into a fact, universal claim or new thesis
- [ ] Each section develops the thought instead of grouping notes under labels
- [ ] Opening is sharp in the first 1–3 sentences and carries its credibility
- [ ] **Here's what we cover** sits after the setup and matches the real sections and order
- [ ] Practical value is concrete and earned, with no quota of tips
- [ ] Every story, number and credential comes from the user's context or the user; gaps are `[placeholder]`
- [ ] Passes the voice, banned-word and punctuation rules in `creator-ikigai.md`
- [ ] Body is roughly 1,000–1,500 words (or the length the user's context sets)
- [ ] Fits the destination platform's constraints (`references/platforms.md`)

## Related skills

- `newsletter-format`: titles, subtitles, buttons, links and footer for a finished body.
- `short-form-text-from-newsletter`: cut the published article into X, Notes and Threads posts.
- `short-form-text-post`: a single short post from a raw idea.
- `long-form-text-post`: long text posts for social feeds.
- `content-ideas`: find the next topic.
- `content-planning`: place the issue on the calendar.
- `content-publish`: publish or schedule it.
- `content-setup`: build the content context folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
