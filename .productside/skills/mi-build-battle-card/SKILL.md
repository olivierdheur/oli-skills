---
name: mi-build-battle-card
description: Build a field-ready battle card from cited evidence — say this, ask this, watch out for, do not say — with every claim traced to a dated source. Use to arm sales without arming them wrongly.
license: CC-BY-NC-ND-4.0
argument-hint: "[your side, then competitor] [fused evidence]"
intent: >-
  Turn fused evidence into a card a salesperson will actually use: outcome
  language, trap questions you can evidence, honest acknowledgment of their real
  strengths, and a Do Not Say list. Exists because an assertion without a source
  and a date is an opinion wearing a badge.
type: analysis
theme: market-competitive-intelligence
stage: act
discipline: All-Source Fusion
status: active
operating-level:
  - product-team
  - initiative
audience:
  - Product Marketing Manager
  - Product Manager
  - Sales Enablement
  - Competitive Intelligence Analyst
  - Business Analyst
best-for:
  - "Arming the field with claims that survive a customer who knows the competitor"
  - "Framing a competitor's strategic push as the wedge a seller can open on"
  - "Writing trap questions you can actually back up"
  - "Giving reps a call-and-response grid for the objections they actually hear"
  - "Naming the claims a rep must not make, and why"
scenarios:
  - "Our battle cards have gone stale and nobody trusts them"
  - "A rep got corrected by a customer using our own card"
  - "We keep losing to one competitor and the field has nothing"
  - "The card is a feature matrix and reps do not open it"
evidence-required:
  - "Fused evidence or sweep outputs with sources and dates"
  - "The competitor, and which deals this card is for"
  - "Current pricing and packaging capture"
  - "[YOUR POSITION] and the own-side claims the fusion brief carried forward"
produces:
  - "A one-pager, written last, carrying nothing that is not evidenced below"
  - "Thirty-second read: the wedge, when you win, when you lose"
  - "Say this, ask this, watch out for, do not say"
  - "If they say / you say — a call-and-response grid a rep can memorize"
  - "Pricing snapshot with a capture date"
  - "Evidence appendix where every claim traces to a source"
estimated-time: "45-90 min"
group-size: "1-4"
consumes:
  - mi-fuse-all-source
  - mi-mine-voice-of-customer
  - mi-snapshot-competitors
combine-with:
  - mi-watch-competitors
  - mi-monitor-pricing-packaging
  - mi-collect-sigint
source-basis:
  - "Competitive Research on Steroids: A Category Compendium, the act layer"
  - "Battle card discipline rules, Productside market-intelligence prompts"
sources:
  - https://github.com/Productside/Productside-Market-Intelligence-Skills
  - https://www.scip.org/page/CodeofEthics
interface:
  display_name: "Battle Card From Evidence"
  short_description: "A card reps use and can defend"
  brand_color: "#00E874"
  default_prompt: "Use $mi-build-battle-card to build a field-ready card from our fused evidence: say this, ask this, watch out for, do not say, with every claim traced to a dated source in the appendix."
  allow_implicit_invocation: true
---

# Battle Card From Evidence

## Purpose

Arm the field with claims that survive a customer who knows the competitor better than the rep does.

A battle card is not a feature matrix and not a research summary. It is a small set of things to say, ask, expect, and avoid — each traceable to a dated source. **A card salespeople will not use is a document, not a card**, and the fastest way to make one unusable is to fill it with claims that get a rep corrected in front of a buyer.

This skill consumes fused evidence. Where a claim has no cited source, the honest entry is **"no evidence found"** and the claim does not go on the card. The evidence appendix is not optional decoration; it is what lets a rep answer "where did you hear that?"

## When to Use It

Use it when the field needs current, defensible ammunition against a named competitor. Use it after fusion, and after a pricing capture, so the freshest layer is actually fresh.

Do not use it when:

- **You have not fused yet.** A card built from one discipline's signals will be confidently wrong in the direction that discipline is blind.
- **You need the full competitive picture.** That is `mi-snapshot-competitors`. A card is deliberately narrow.
- **You need to know why deals are lost.** Win/loss knows; a card built to answer it from public signals will mislead the field about the thing that matters most.
- **The competitor is unknown to you.** Say so. A card that pretends to knowledge is worse than no card, because a rep will trust it.

## Input

Require:

- fused evidence, with sources and dates
- the competitor, and which deals this card is for
- `[YOUR POSITION]` and the own-side claims the fusion brief carried forward
- a current pricing and packaging capture

Anything supplied in the invocation, attachments, a fusion brief, or earlier conversation counts as context already given.

**Example invocation:** `Use $mi-build-battle-card on Northwind, Cartelane — using the fusion brief and the pricing capture in this thread. For mid-market deals where Finance runs the evaluation.`

Name your own side first. **If the fusion brief carries no own-side claims, say so before building.** The card can still be built, but every offensive line on it will be an inversion of the competitor's weaknesses, and no amount of careful writing here repairs that — this run collects nothing. Offer to fill the gap at the fusion stage instead.

## Key Concepts

**Every claim traces to a row in the evidence table** — An assertion without a source and a date is an opinion wearing a badge. The appendix is what makes the card auditable, what lets a rep answer a challenge, and what lets the next refresh know which lines are stale. A card whose claims cannot be traced cannot be maintained either, because nobody knows what to re-check.

*Violation signal:* A claim on the card has no corresponding row in the evidence appendix.

**Outcome language, not feature lists** — "Say this" carries at most four points, phrased as customer outcomes rather than capabilities. "We have field-level audit lineage" is a feature. "Your auditors accept the number without a screenshot trail" is an outcome. Reps do not lose deals on feature counts; they lose them on failing to connect to what the buyer is trying to achieve.

*Violation signal:* The "say this" section reads as a capability list with checkmarks implied.

**Never ask what you cannot evidence** — Trap questions are at most three, aimed at what the competitor's architecture or pricing genuinely cannot answer well. **A trap question you cannot back up traps your own rep**, because the buyer will relay it to the competitor and return with an answer the rep cannot handle. Every trap question needs its evidence row and its expected counter.

*Violation signal:* A trap question exists with no evidence row and no anticipated response.

**Watch out for names their real strengths, honestly** — The competitor's strongest true claims, stated plainly, each with your response. Understating them is the most common way a card fails in the field: a rep who has been told the competitor is weak everywhere is unprepared for the place they are strong, and their surprise is visible to the buyer.

*Violation signal:* The "watch out for" section contains only their weaknesses reframed, and nothing they genuinely do better.

**Do Not Say is the section that saves the deal** — Claims that are tempting, plausible, and unsupported, each with the reason it does not hold. This is not modesty or legal padding. It is the paragraph that prevents a specific, foreseeable correction in front of a customer, and it is the first section a good rep reads.

*Violation signal:* The card has a competitive-advantage section and no Do Not Say section.

**Date-stamp the card and name its decay** — The SIGINT layer — pricing, packaging, messaging — goes stale in weeks. The positioning layer goes stale in quarters. A card without a date and a decay note will be used a year later with the same confidence it earned on the day it was written, which is how a rep quotes a price that changed two quarters ago.

*Violation signal:* The card carries no capture date, or carries one date for content with different half-lives.

**A card that only knows the competitor arms nobody** — Half of every deal is why to buy you, and that half does not appear by inverting their weaknesses. "Their AI pricing is unpredictable" tells a buyer what to fear, not what to choose; "your three-year cost is knowable at signing, and here is the published schedule" tells them what they get. Structural advantages — total cost over the contract's real life, time to first production use, the platform the buyer already owns — are claims about *you*, they need evidence like any other claim, and they can only come from a fusion brief that carried own-side rows. A card whose every offensive line is the negative image of a competitor problem was built from a one-sided brief, and that is a fusion defect surfacing here rather than a writing defect.

*Violation signal:* Every point in "say this" and "why us" can be restated as "because they are bad at X."

**Sellers need a call-and-response grid, not only an opening** — "Say this" is what a rep opens with and "ask this" is what they initiate. Neither helps in the four seconds after a competitor's rep says a specific sentence, and that is the moment reps actually lose. The grid pairs the claim they will hear, verbatim, with the response, short enough to say from memory. It is the most-used surface on any card that gets used at all — and it is held to the same standard as everything else, because a response recited confidently from a card and then corrected by the buyer costs more than having no response.

*Violation signal:* A response in the grid asserts something with no row in the evidence appendix.

**The card inherits the findings, not the tradecraft** — Discipline acronyms, sweep names, and stage vocabulary belong to the runs that produced the evidence and must not reach the card. A seller who opens on "full-spectrum public-source sweep across seven disciplines" learns nothing they can say to a buyer, and skims — taking the usable part of the card with them. This is not a rule against rigor: the capture dates, the F/I/A labels, and the evidence appendix all stay, because those are what let a rep answer a challenge. What goes is the machinery. **The appendix is where the card proves itself; the front of the card is where it gets used.**

*Violation signal:* A seller-facing section contains a discipline acronym, a sweep name, or a stage name. Seller-facing means the one-pager, thirty-second read, say this, ask this, why us, watch out for, the grid, pricing, and do not say. The header block, the decay table, the evidence appendix, and the Final Step are analyst-facing and keep whatever vocabulary they need — nobody reads those to a buyer.

**The thirty-second read is a wedge, not a description** — An accurate neutral summary of a competitor reinforces their credibility, which is not what the field needs from you: buyers already believe the incumbent is real. The wedge names what they are pushing *and what that push costs this buyer* — same facts, arranged so a seller can open on them. "They are a credible platform with a strong AI story" is true and useless. "They are pushing hard into agentic AI, and the pivot is producing price changes and edition gating that a mid-market buyer feels in month one" is the same evidence doing work. This is not license to overclaim: the wedge is evidenced like every other line, and honest about what is genuinely true of them. It is a framing discipline, not a permission slip.

*Violation signal:* The thirty-second read would sit comfortably on the competitor's own website.

**The one-pager is a projection, not a summary** — Sellers use one page. The rest of the card is what makes that page defensible, and both are necessary — but the page is what travels, gets screenshotted, and gets read in a parking lot before a call. It is written **last**, from lines already on the card, and it introduces no claim that does not appear below with an evidence ref. Written first, it becomes the place where an unchecked claim enters, and it is the worst possible entry point: the most-read, least-audited surface on the document.

*Violation signal:* A line in the one-pager has no counterpart further down the card.

## Guided Context Capture

Follow [Guided Context Capture](../../reference/guided-context-capture.md).

Open with: "This is a battle card built from evidence you already hold — a one-pager, then the wedge, say this, ask this, why us, watch out for, a call-and-response grid, do not say, pricing snapshot, and an evidence appendix where every claim traces to a dated source. Forty-five to ninety minutes. Up to three setup questions. Choose **1. Guided**, **2. Context dump**, or **3. Best guess**."

In Guided mode, ask one at a time, hard cap of three:

1. `Card Setup Q1/3` — Which competitor, and which deals is this card for? A card for enterprise evaluations and one for self-serve are different cards.
2. `Card Setup Q2/3` — What are reps currently saying about them? I will check each claim and put the unsupported ones in Do Not Say, which is usually the most useful part of this run.
3. `Card Setup Q3/3` — What does their rep actually say in the room? Those lines become the call-and-response grid, which is the part reps use most. If you also know whether win/loss interviews are current, say so — if they are not, I will keep win-reason claims off the card.

**Context dump is the expected mode.** Extract evidence, build the card, and flag which existing rep claims failed the check. In **Best guess** mode, build from available evidence and mark unsupported sections "no evidence found." On silence: mid-market framing, win/loss assumed unverified. Proceed.

## What It Produces

Complete the [Battle Card](template.md):

- **one-pager** — written last, every line traceable to the card below
- thirty-second read: **the wedge**, when you win, when you lose
- **say this** — max 4, outcome language
- **ask this** — max 3 trap questions, each with evidence and an expected counter
- **why us, structurally** — max 3 own-side advantages, each with evidence
- **watch out for** — their strongest true claims, with responses
- **if they say / you say** — max 5 rows, each response carrying an evidence ref
- pricing and packaging snapshot **with a capture date**
- **do not say** — with the reason each claim fails
- **evidence appendix** — every claim, source URL, date, and label
- decay note by layer

## Workflow

1. **State web access in one line,** and state that this run consumes evidence rather than collecting it.
2. **Establish scope.** Which deals, which buyer, which segment. A card that tries to serve every deal serves none.
3. **Check what reps are already saying.** Each claim either earns an evidence row or moves to Do Not Say. This step alone usually justifies the run.
4. **Write the thirty-second read:** the wedge, when you win, when you lose. The wedge names what they are pushing and what that push costs this buyer — framing, not description. Test it: if the sentence would sit comfortably on their own website, rewrite it. When you lose is not optional — a card that never says it is fiction, and reps know it.
5. **Write "say this,"** at most four points, in outcome language, each traceable.
6. **Write "ask this,"** at most three, each with the evidence behind it and the counter you expect. Discard any question you cannot evidence.
7. **Write "why us, structurally,"** at most three, from the own-side claims the fusion brief carried. Each needs its evidence row. If the brief carried none, write the section as "no own-side evidence collected" and name the gap — do not fill it by inverting their weaknesses.
8. **Write "watch out for"** — their genuinely strongest claims, stated honestly, with your response.
9. **Build the call-and-response grid,** at most five rows. Take the claims from what the competitor actually says — their pricing page, their pitch, what reps report hearing — and write each response short enough to say from memory. Cut any row whose response has no evidence.
10. **Capture pricing and packaging verbatim with a date.**
11. **Write "do not say,"** each entry with its reason.
12. **Build the evidence appendix,** and confirm every card claim has a row — including every grid response and every "why us" line. Then date-stamp the card and name the decay by layer.
13. **Strip the tradecraft.** Read the seller-facing sections front to back and remove every discipline acronym, sweep name, and stage name. Leave the header, decay table, appendix, and Final Step alone. Keep the dates and the labels everywhere.
14. **Write the one-pager last, and place it first.** Pull the wedge, the win and lose conditions, two points from Say This, the strongest Why Us line, three grid rows, the sharpest Do Not Say, and the published floor with its date. Carry the evidence refs with them. Then check every line against the card below — anything with no counterpart is a claim that entered at the summary, and it comes out.

## Human Decision Gate

Present the card, then the appendix. Highlight:

- which rep claims failed the evidence check and moved to Do Not Say
- whether the fusion brief carried own-side claims, and what "why us" could not say without them
- any grid row cut because its response could not be evidenced
- what the one-pager had to leave out, and which three grid rows made it
- which lines decay first, and when the card needs re-running
- whether win/loss is current, and what that prevented you from claiming
- any trap question that was cut for lack of evidence

Use an Adaptive Decision Ladder: `Ship the card to the field`, `Fill the evidence gap before shipping`, `Set up the weekly SIGINT watch that keeps it fresh`, or `Other (specify)`.

## Evidence and Attribution Rules

- Label every claim **Fact**, **Inference** (chain shown), or **Assumption** (basis stated). **Assumptions do not go on the card** — they go in the appendix or nowhere.
- **Do not invent:** prices, tier names, feature availability, customer names, outage histories, review counts, or quotes. A fabricated line on a battle card is spoken to a customer by someone who trusts you, which is the worst delivery mechanism for an error in this library.
- Every claim traces to an appendix row with a URL and a date.
- Never claim a competitor lacks a capability without a documentation or pricing-page citation; absence from a marketing page is not absence from a product.
- Own-side claims are evidenced like any other. Your own marketing page is a claim; a published schedule, a documented capability, or a measured deployment is evidence.
- **Do not inherit tradecraft vocabulary.** No discipline acronyms, sweep names, or stage names appear in a seller-facing section: the one-pager, thirty-second read, say this, ask this, why us, watch out for, the grid, pricing, and do not say. The header block, decay table, evidence appendix, and Final Step are analyst-facing and exempt. Dates and F/I/A labels stay everywhere.
- Do not build claims about why deals are won or lost without current win/loss interviews.
- Stay inside the guardrails: published, filed, posted, or publicly observable only.

## Common Failure Modes

- Building the card from feature parity rather than from which customer problem each side solves
- Writing trap questions you cannot evidence
- Understating their real strengths, so the rep is surprised in the room
- Omitting Do Not Say
- Shipping without a capture date, so a stale price gets quoted
- Putting an Assumption on the card because it was persuasive
- Claiming win reasons with no win/loss behind them
- Writing one card for every deal type
- Building every offensive line as the inverse of a competitor weakness, so the card says what to fear and never what to choose
- Writing a grid response that sounds good and cannot be evidenced, which is the trap-question failure wearing different clothes
- Opening the card with the collection method, so the reader skims past the part they needed
- Writing a thirty-second read that describes the competitor accurately and reinforces their credibility, giving the seller nothing to open on
- Writing the one-pager first, so it becomes the place unchecked claims enter the most-read surface of the card
- Letting the appendix drift out of sync with the card

## Assets and Examples

- [Battle Card template](template.md)
- [Synthetic worked example](examples/worked-example.md)
- [Weak example](examples/weak-example.md)

## Final Step

```text
## Final Step

1. Ship the card to the field (Recommended)
2. Fill the named evidence gap before shipping
3. Set up the weekly SIGINT watch that keeps the pricing layer fresh
4. Run win/loss so the win-reason claims can be made at all

Reply with `1`, `2`, `3`, `4`, `1 and 3`, `Verbose Mode`, or a custom path.
```

## Sources

- [The act layer: battle card discipline rules](../../reference/frameworks.md)
- [Fusion: what feeds this card](../../reference/fusion.md)
- [Monitors: keeping the freshest layer fresh](../../reference/monitors.md)
- [Competitive research compendium and runnable prompts](https://github.com/Productside/Productside-Market-Intelligence-Skills)
- [SCIP Code of Ethics](https://www.scip.org/page/CodeofEthics)
