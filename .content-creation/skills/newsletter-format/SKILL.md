---
name: newsletter-format
description: Applies the final publishing layer to a finished newsletter draft for Substack or X Articles without rewriting it. Writes 3–5 title and subtitle options for the user to pick from, then adds headings, bold, bullets, section breaks, subscribe and share button markers, links to the user's own pages, an optional paywall marker and the footer, and checks that every word of the body survived unchanged. Use when the user says "format this newsletter", "format for Substack", "get this ready to publish", "title options", "add the buttons and footer", "make this an X Article", or when newsletter-post hands off a finished draft. For writing or revising the article itself, use newsletter-post.
---

# Newsletter Format (Substack, X Articles)

This skill formats finished prose. It does not write, outline, tighten or restructure the body. `newsletter-post` owns the interview, the draft and every substantive revision, including the **Here's what we cover** roadmap. This skill owns the publishing furniture: title and subtitle options, button markers, links, an optional paywall and the footer. If the body needs a wording change, flag it; don't make it here. It also doesn't cut the issue into short posts (use `short-form-text-from-newsletter`) or publish anything.

## Step 1: Load context

Before writing anything, load the user's content context.

1. **Find the folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project if `content/README.md` exists.
2. **Read the index.** Open `content/README.md` and read the files it lists for every piece (at minimum `creator-ikigai.md`, `pov.md` and `persona.md`). Open optional files, like the story bank, only when this task needs them.
3. **Read this bucket's winners.** Open `content/winners/newsletter/README.md`, then the 3–5 winners closest to this topic. Copy their patterns, never their words. If there are none yet, use `references/starter-examples.md`.
4. **No context folder?** Stop and offer three choices: run `content-setup` (recommended, about 25 minutes); answer three quick questions (who it's for, what you're known for, one belief you hold that most people in your space don't) and get output labeled as generic; or point to where the context lives.

Never invent facts about the user. If a draft needs a story, number or credential that isn't in the context, ask for it or leave a clearly marked `[placeholder]`.

**For this skill specifically:**
- Winners matter most for titles: look at which of the user's past titles and subtitles earned opens and shares.
- Read `references/platforms.md` to confirm whether this issue goes to Substack, X Articles or both.

## Step 2: Gather the publishing details (ask once)

The footer, buttons and links depend on details only the user knows. Look for them first in `creator-ikigai.md` (usually under Channels and goals, or a Newsletter section) and in the user's past formatted issues:

- **Newsletter name** and publication URL.
- **Subscribe line**: what a subscriber actually gets and how often. Never invent a benefit or cadence.
- **Sign-off**, if the user has one.
- **Footer contents**: what goes under every issue (for example: their offers, where else to find them, a tool list with any referral disclosure). Template in `references/footer.md`.
- **Own pages to link**: the user's site, guide library or newsletter archive, as a URL list, a sitemap or a folder of pages.
- **Link tracking**: whether they tag their own links with UTM parameters, and their convention.

Ask for whatever is missing in **one** message, then continue. Offer to save the answers to `creator-ikigai.md` under a `## Newsletter` heading so the next issue needs no questions; write to the file only if the user says yes. If the user skips a detail, leave that part out rather than filling it with a guess.

## Step 3: Read the draft and check the roadmap

Read the whole body. Note section boundaries, existing lists, existing subheads and the strongest claim sentences.

Find the **Here's what we cover** roadmap. If it's missing, or its bullets don't match the real sections and their order, don't fix it here. When called from `newsletter-post`, send it back for correction before formatting. When run on its own, leave the body as it is and flag the mismatch in the notes.

## Step 4: Format the body without rewriting it

**Allowed:** bold existing words; turn existing lists into bullets; split paragraphs at existing sentence boundaries; promote an existing sentence to a heading or blockquote (moving it, never duplicating it); add section breaks (`***`) at real boundaries; link existing phrases; place the markers and the footer.

**Forbidden:** rewriting, tightening or deleting sentences; changing punctuation or capitalization inside a sentence; adding transitions, a greeting or a roadmap; reordering arguments; inventing or renaming headings; generating, sourcing or suggesting images. Keep any images the user supplied exactly where they are.

Readability targets, never permission to rewrite:
- **Headings:** existing subheads, or existing structural sentences promoted.
- **Paragraphs:** usually 2–4 sentences. Single-sentence paragraphs are fine. Never split a sentence.
- **Bold:** sparing in prose. In lists, bold a short existing lead-in of 2–5 words. Read the bold text alone: it should work as a compressed outline of the argument.
- **Bullets:** short and parallel where the original allows. Flag a very long bullet in the notes instead of trimming it.
- **Blockquotes:** for a strong existing claim, when it helps. Not one per section.
- **Examples, prompts and code:** set apart typographically, kept verbatim.
- **Ending:** keep the user's close as written. A recap or engagement question is a writing decision, not a formatting one.

## Step 5: Link to the user's own pages

Each issue is a chance to send readers to the user's own work. Linking an existing phrase is formatting; adding "check out my guide here" is writing, so don't.

- Match the draft's topics against the user's pages from Step 2. Pick destinations that deliver exactly what the anchor phrase promises. A loose topical match is worse than no link.
- **Anchor text is the user's existing words**, ideally 2–5 words that name the topic ("the weekly review template", not "this guide" or "click here").
- Aim for 3–6 links when good ones exist. Never force one to hit a number.
- One link per paragraph at most. Never link the same URL twice; the first relevant mention wins.
- Prefer the specific page over a hub page. Use absolute URLs and the final destination, never a redirect.
- If the user tags links, apply their UTM convention to their own pages only. A common default is `?utm_source=substack&utm_medium=newsletter&utm_campaign=<issue-slug>`. Never add UTMs to affiliate, referral, booking or social profile links; they carry their own tracking and parameters can break them.
- If there's a paywall, put most links above it. Paid sections can't be crawled and get far fewer clicks.
- List every link placed in the notes, and any strong match you skipped because no existing phrase worked as an anchor. The user can add a sentence if they want it.

## Step 6: Place the markers, paywall and footer

Follow `references/markers.md`.

- **Four button markers** at real section boundaries: subscribe near the top (after the roadmap), share near 40%, subscribe or upgrade near 70%, share at the end before the footer. Never two markers next to each other. These are placeholders for the platform's native blocks, which the user inserts in the editor.
- **Suggested button lines** go in the publishing notes, not the body: one short line per marker, using the subscribe line from Step 2 and language from the article. Keep any CTA copy the user already approved.
- **Paywall:** only when the user asks for one or there is distinct paid material. Otherwise recommend keeping the issue free. If the decision is open, keep the body free and propose the cutoff in the notes.
- **Footer:** append the user's footer from Step 2 using `references/footer.md`. Check every URL loads and every perk or offer is still current; flag anything you couldn't check rather than repeating it. Keep any referral disclosure.

## Step 7: Title and subtitle options (approval gate)

Write titles only now, after the body is settled. Follow `references/titles.md`.

- Write **3–5 title + subtitle pairs** that differ by angle (number, outcome, method, contrarian claim), not by wording.
- Every number, name and timeframe comes from the draft. If the draft has no number or proof point, say so and give the strongest honest options.
- The subtitle carries a different idea from the title, never a restatement.
- For X Articles, the title also sits on the feed card, so make sure at least one option carries the claim and credibility on its own.

**Gate.** Show the options and ask the user to pick one, combine two, or write their own. Leave the title and subtitle as `[title: pick from options]` and `[subtitle]` in the formatted article until they choose. Never pick for them or apply one silently. If the user already chose a title, keep it and don't regenerate options unless asked or the article changed enough to make it inaccurate.

## Step 8: Verify the body is unchanged (required)

Compare the original body with the formatted body before delivering anything:

1. Strip the formatting from both: unwrap links but keep their anchor text, and remove heading, bold, italic, quote, list and section-break syntax.
2. Remove what this skill added: the title and subtitle, the button and paywall markers, and the footer.
3. Normalize whitespace and compare word for word. Words, punctuation, capitalization and order must match exactly. A sentence promoted to a heading or quote must appear once, not twice.

Use a short script rather than reading by eye, for example:

```bash
python3 - original.md formatted.md <<'EOF'
import re, sys, difflib
def clean(path):
    t = open(path).read()
    t = re.sub(r"\[\[[A-Z /:]+\]\]", " ", t)        # markers
    t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)   # links -> anchor text
    t = re.sub(r"^(#+|>|[-*]|\d+\.)\s+", "", t, flags=re.M)
    t = re.sub(r"\*\*\*|\*\*|__|\*", "", t)
    return t.split()
a, b = clean(sys.argv[1]), clean(sys.argv[2])
print("MATCH" if a == b else "\n".join(difflib.unified_diff(a, b, lineterm="", n=3)))
EOF
```

Cut the footer and title from the formatted copy (or compare only up to the footer) before running it. Investigate every difference. Never normalize away a wording change.

## Step 9: Deliver and save

Deliver in this order:
1. **Title and subtitle options**, numbered, each with a few words on which angle each half carries.
2. **The formatted article**, copy-ready, with the markers and one footer.
3. **Publishing notes**, only where needed: suggested button lines, the paywall proposal (teaser plus the last lines before and first lines after the cutoff, quoted from the body), the links placed, anything unverified, and any prose change the body needs.

Save the formatted article next to the authoritative draft, for example `<issue-slug>-substack.md` (and `<issue-slug>-x-article.md` if needed). Keep title options and notes out of the article file. Never overwrite a final file without being asked.

**X Articles version:** when the issue also goes to X, follow `references/platforms.md`: keep the body and headings identical, and remove subscribe and share markers, the paywall, email-only lines and the newsletter footer. Flag email-only lines ("reply to this email") instead of deleting them, since removing them is a prose change the user approves.

**Repeat passes:** after revisions, update the existing markers, links and footer instead of adding new ones. Reuse the title options unless asked or the article changed enough to make them wrong. Formatting is not permission to publish.

## Quality check

Before showing anything, verify:

- [ ] Fidelity check passed: the body's words, punctuation and order match the original exactly
- [ ] Roadmap untouched; a missing or stale one is flagged, not rewritten
- [ ] Bold text alone reads as a useful outline; no invented headings
- [ ] Four button markers at real boundaries, none adjacent; paywall only if requested or justified
- [ ] Links use the user's existing words as anchors, 3–6 when they fit, one per paragraph, no duplicates, no redirects, UTMs only on the user's own pages
- [ ] Footer comes from the user's details; every URL and perk checked or flagged; disclosure kept
- [ ] 3–5 title and subtitle pairs that differ by angle, with every claim drawn from the draft
- [ ] No title applied until the user picks one
- [ ] Nothing in the article or notes that `creator-ikigai.md` marks as private
- [ ] No editorial notes or empty "your line here" slots inside the copy-ready article

## Related skills

- `newsletter-post`: write or revise the article this skill formats.
- `short-form-text-from-newsletter`: turn the published issue into X, Notes and Threads posts.
- `short-form-text-post`: a single short post from a raw idea.
- `long-form-text-post`: long text posts for social feeds.
- `content-planning`: place the issue on the calendar.
- `content-publish`: post or schedule the link posts that share it.
- `content-setup`: build the content context folder this skill reads.

After posting, run `content-wins` so winners feed back into this bucket.
