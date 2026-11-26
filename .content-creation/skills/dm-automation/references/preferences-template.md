# DM automation preferences

The `dm-automation` skill reads this file on every run. Edit it by hand any time, or tell the agent "make that my default". Placeholders: `{guide}`, `{handle}`, `{topic}`.

## Account

- Instagram handle: {handle}
- LedaChat plan: free | pro

## Toggles

| Setting | Value |
|---|---|
| Public reply under the comment | on |
| Follow check | on |
| Email capture | on |
| UTM tagging on links | on |
| Confirm before going live | on |
| Keyword style | one word, capitals |

## Copy

### Public replies
- Sent! Check your DMs 📩
- Just sent you the {guide} 💌
- It's in your DMs!

### Opening DM
- Comment: Hey! Thanks for commenting 🙌 Tap below and I'll send you the {guide}.
- Story: Hey! Thanks for replying 🙌 Tap below and I'll send you the {guide}.
- Button: Send it

### Follow check
- Message: Quick thing: the {guide} is for my followers. Follow @{handle}, then tap below and it's yours.
- Button: I followed
- Retry: I don't see the follow yet. Follow @{handle} and tap again 🙏

### Email capture
- Message: Great! Drop your email.
- Retry: Hmm, that doesn't look like an email. Mind trying again?

### Final DM
- Message: Here's the {guide} 👇 Enjoy, and tell me what you think!
- Button: Get the guide

## Log

| Date | Keyword | Trigger | Guide | Link | Automation id | Status |
|---|---|---|---|---|---|---|
