# Platform notes: Substack vs. X Articles

Short on purpose. Checked against official help docs, November 2026. Platforms change these often.

## Quick comparison

| | Substack | X Articles |
|---|---|---|
| What it is | A newsletter post: published on the web and emailed to subscribers | A long-form post that lives on X, shown as a card in the feed |
| Who can publish | Anyone with a Substack publication | Paid X subscribers only (Premium and Premium+, plus business and organization accounts) |
| Delivery | Email inbox plus the Substack app and web | X feed only; no email |
| Length | No practical limit; Gmail clips emails over about 102KB behind "View entire message" | Long posts supported; X doesn't publish a limit |
| Formatting | Headings, bold/italic, lists, quotes, images, embeds, buttons, footnotes, paywall | Headings, bold/italic, strikethrough, lists, images, video, GIFs, embedded posts, links |
| Discovery | Subscribers, Notes, recommendations, search | Feed impressions driven by the card's title and cover image |
| Monetization | Paid subscriptions, paywall inside a post | Creator Subscriptions (subscriber-only Articles) and X's creator revenue program, for eligible accounts |

## Substack

- **The first lines do double duty.** They appear in the email preview and the web preview, so the opening must hook on its own.
- **Title and subtitle** show in the inbox, the app and social cards. `newsletter-format` writes these after the body is settled.
- **Buttons and paywall** are native Substack blocks. A Markdown draft can only mark where they go; the user inserts the real blocks in the editor.
- **Roadmap ("Here's what we cover")** works well here because readers skim in email.
- Cross-promote with Notes after publishing (`short-form-text-from-newsletter`).

## X Articles

- **The card is the hook.** In the feed, readers see the title and cover image before anything else, so the title carries the claim and the credibility.
- **No inbox.** Readers arrive from the feed mid-scroll, so the opening paragraph has to earn attention even faster than on Substack.
- **Plain structure travels best.** Short sections with clear headings; skip Substack-specific elements (subscribe buttons, paywall markers, footnotes).
- **Repurposing a Substack issue:** remove email-only lines ("in this week's issue", "reply to this email"), subscribe buttons and the footer. Keep the body, roadmap and headings. Add a post that shares the Article with its own hook.
- Links back to the user's newsletter are fine at the end; check the user's preference in their context files.

## Publishing to both

Write the body once. Format the Substack version with `newsletter-format`, then strip the Substack-only elements for X. Keep the wording identical in the body so both versions stay in sync when the user revises.
