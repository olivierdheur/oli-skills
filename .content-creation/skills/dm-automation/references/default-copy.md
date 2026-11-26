# Default copy: suggestions for the first run

These are the suggestions shown on the first run. The user's own copy is saved in `<content folder>/dm-automation.md` and always wins over this file.

Placeholders: `{guide}` (the guide's name), `{handle}` and `{topic}` (optional). There's no keyword placeholder, because some automations trigger on any comment and have no keyword. LedaChat can't insert the commenter's name, so there's no name placeholder.

Limits: buttons 20 characters, public replies 300 characters, DMs 640 characters.

## 1. Public reply under the comment (comments only; one picked at random)

- `Sent! Check your DMs 📩`
- `Just sent you the {guide} 💌`
- `It's in your DMs!`

Three or more variants look less like a bot to Instagram and to the people reading.

## 2. Opening DM (sent right after the comment)

- **Comment version:** `Hey! Thanks for commenting 🙌 Tap below and I'll send you the {guide}.`
- **Story version:** `Hey! Thanks for replying 🙌 Tap below and I'll send you the {guide}.`
- **Button:** `Send it`

Instagram allows only this one message until the person taps, so the button is what opens up the rest of the flow.

## 3. Follow check (comments only)

- **Message:** `Quick thing: the {guide} is for my followers. Follow @{handle}, then tap below and it's yours.`
- **Button:** `I followed`
- **If they still don't follow:** `I don't see the follow yet. Follow @{handle} and tap again 🙏`

## 4. Email capture

- **Message:** `Great! Drop your email.`
- **If the reply has no email:** `Hmm, that doesn't look like an email. Mind trying again?`

If the user plans to send these people a newsletter or other emails, suggest adding a line that says so, so people know what they're signing up for.

## 5. Final DM (has the link button)

- **Message:** `Here's the {guide} 👇 Enjoy, and tell me what you think!`
- **Button:** `Get the guide`

Keep the button label generic. Most guide names are longer than 20 characters.
