---
name: dm-automation
description: Sets up an Instagram comment-to-DM or story-reply automation through LedaChat (ledachat.com), which runs on Instagram's official API and has an MCP. Someone comments a keyword on a post or reel (or replies to a story), gets a DM, follows, leaves their email, and receives the link to the guide or resource you promised. The first run saves your default DM copy, with placeholders like {guide} and {handle}, to your content folder; after that, each automation only needs the post, the guide and the link. Use when the user says "set up a DM automation", "comment to DM", "comment GUIDE to get it", "send the link to people who comment", "story reply automation", "ManyChat this post", "dm automation", or "/dm-automation".
---

# DM Automation

Builds one Instagram comment-to-DM (or story-reply) automation in [LedaChat](https://ledachat.com) and puts it live. The defaults are a follow check and email capture, sending the guide's link in the last DM.

This skill runs with as few stops as possible. It asks only for what's missing, and it asks in one message. It pauses once, before going live, unless the user turned that off in their preferences.

**Two layers of copy:**
- **Skill defaults** in `references/default-copy.md` are suggestions. Every user gets the same ones.
- **The user's preferences** in `<content folder>/dm-automation.md` are their own copy, toggles and log. The first run creates this file. After that it wins over the skill defaults, and updating the skill never overwrites it.

## Step 1: Find the preferences file

1. **Content folder.** Check the project's CLAUDE.md or AGENTS.md for a line starting `Content context:` and use that path. Otherwise use `content/` in the current project. If neither exists, use `content/` and create it. This skill doesn't need the rest of the content context.
2. **Preferences.** Open `<content folder>/dm-automation.md`.
   - **Found:** load the defaults, toggles and log, then go to Step 2.
   - **Not found:** this is the first run. Do Step 2, then Step 3.
3. **Voice (optional).** If `creator-ikigai.md` exists, read its voice section (tone, emoji use, words you never use). Use it only for the first-run suggestions in Step 3.

## Step 2: Check that LedaChat is connected

Look for the LedaChat MCP tools in this session (`get_workspace`, `create_automation`, `go_live`, `list_posts`).

- **Found:** call `get_workspace`. Note the connected Instagram handle, the plan (free or pro) and how many automations are live. If it reports that setup isn't done (no Instagram account connected), send the user to https://app.ledachat.com/connect and stop.
- **Not found:** give the setup in `references/ledachat.md` ("Connecting"), in a few lines, then stop. Don't guess the MCP URL. It's shown on LedaChat's in-app "Connect to AI Agent" page.

Free plan: 10 live automations at a time, and LedaChat adds a "Powered by LedaChat" line after the final DM. If the account is already at 10, say so now, before collecting anything.

## Step 3: First run only — set the user's defaults

Send **one** message with every section of the flow. For each section, show the suggested default from `references/default-copy.md`, adjusted to the user's voice if you read it in Step 1. Show the placeholders as they are. Number the sections so the user can reply in one line ("all good", or "change 4 to …", or "turn off the follow check").

Include:
- The toggles: public reply (on), follow check (on), email capture (on), UTM tagging on links (on), confirm before going live (on).
- Their handle from `get_workspace`, used for `{handle}`.
- How they like keywords: one word in capitals (default), or a short phrase.

Then write `<content folder>/dm-automation.md` from `references/preferences-template.md`, with their answers. Say where you saved it, in one line. From now on, use these defaults and don't ask about them again. Change a saved default only when the user says to ("make that my default", "always use…", "change my default opening DM"). A change the user asks for one automation applies to that automation only.

## Step 4: Get the inputs for this automation

You need four things. Take what the user already said, fill in what you can, and ask for the rest in **one** message:

| Input | Notes |
|---|---|
| **What triggers it** | A specific post or reel (a link, "my latest reel", or a description of the caption), the next post they publish, any post, a specific story, or any story. Default: a specific post. |
| **The guide** | The name of the specific thing being sent, such as "Claude Code Starter Guide". It fills `{guide}`, so it needs a real name, not "the guide". |
| **The link** | The final URL people should end up at. https only. |
| **The keyword** | Optional. Suggest one from the guide's name, in the user's keyword style (for example `CLAUDE`), and use it unless they change it. Up to 20 keywords, 50 characters each. If the user wants every comment or reply to trigger it, use `match: any` with no keywords. |

Don't ask about anything the preferences file already answers.

## Step 5: Resolve the post or story

- **Post or reel:** call `list_posts` (9 per page, newest first, `page` from 0). Match on the permalink or shortcode in the user's link, on caption text, or "latest" (the first result). Look through up to 5 pages. If two posts could match, show both (date and the start of the caption) and ask which. Don't guess.
- **Story:** call `list_stories`. Stories expire 24 hours after posting, and so does a specific-story automation. Say so if the story is more than 20 hours old.
- **Next post / any post / any story:** no id needed. A post or story that has its own automation uses that one first.

## Step 6: Finalize the link

1. Check that it starts with `https://`. Then check that it loads: `curl -sIL -o /dev/null -w "%{http_code} %{url_effective}" <url>`. If it returns 4xx or 5xx, tell the user and ask for the right link. Many sites (Notion, Google) block a bare HEAD request, so if you get 403 or 405, retry once as a GET before calling the link broken.
2. If UTM tagging is on and the link has no `utm_` parameters yet, add `utm_source=instagram&utm_medium=dm&utm_campaign=<guide-slug>`. Don't add them to links that break with extra parameters (Google Drive, Calendly, file downloads). Use the plain link there and say so.
3. The final link goes on the final DM's button (`linkUrl`). If the user gives a second or third link, add it with `extraLinks` (up to 2 more buttons).

## Step 7: Fill in the copy

Start from the user's saved defaults. Replace the placeholders:

| Placeholder | Becomes |
|---|---|
| `{guide}` | The guide's name, exactly as the user gave it |
| `{handle}` | The Instagram handle, without the @ |
| `{topic}` | Optional: a few words on what the post is about, taken from the caption |

LedaChat has no field that inserts the commenter's name, so never use a first-name placeholder.

Then check the limits and fix anything over. Shorten the wording, never the guide's name in the DMs:
- Button labels: 20 characters. If `{guide}` makes a label too long, use the saved short label (for example "Get the guide").
- Public replies: 300 characters each.
- Every DM text: 640 characters.
- Automation name: 80 characters. Use `<KEYWORD> · <guide> · <post date or "next post">`.

**Story replies:** there's no public reply and no follow check (LedaChat only supports those on comments), and the opening DM uses the story version from the preferences.

## Step 8: Create, confirm once, go live

1. Call `create_automation` with every field (see the field map in `references/ledachat.md`). It saves a draft, which doesn't run yet.
2. **If "confirm before going live" is on (the default),** show one compact summary and ask "Go live?":

```
DM AUTOMATION · draft
Trigger:   comment "CLAUDE" on reel from 14 Nov ("The 3 Claude Code commands I…")
Reply:     "Sent! Check your DMs 📩" (+2 variants)
DM 1:      "Hey! Thanks for commenting 🙌 Tap below and I'll send you the Claude Code Starter Guide." [Send it]
Follow:    on · Email: on
Final DM:  "Here's the Claude Code Starter Guide 👇 …" [Get the guide] → https://…?utm_source=instagram…
```

   A yes goes live. Any edit: call `update_automation` with only the changed fields, then go live. Don't show the summary again for a small wording edit.
   **If it's off,** go live right away and show the same summary afterward.
3. Call `go_live`. If it fails, explain why in plain words and fix it. The common causes: a keyword clash with another live automation on the same post or scope, an invalid link, or the free plan limit. If it's a keyword clash, suggest a different keyword. If it's the plan limit, tell the user; don't retry.

## Step 9: Catch earlier commenters (specific posts only)

If the post is already live and has comments, call `message_earlier_comments` with `send: false`. If the count is above 0, say: "N people commented [keyword] in the last 24 hours before this went live. Send them the flow now?" Send only after a yes. If it comes back `proRequired`, tell the user it's a Pro feature, give the `upgradeUrl`, and move on.

## Step 10: Log it

Add one row to the Log table at the bottom of `<content folder>/dm-automation.md`:

`| date | keyword | trigger | guide | link | automation id | status |`

Then close with the automation id and, if there's a keyword, the line to put in the caption or on screen (for example, `Comment "CLAUDE" and I'll DM you the guide`).

## Changing an existing automation

When the user wants to change, pause, or check on one ("change the link on the CLAUDE automation", "how's the CLAUDE one doing"):
- Find it with `list_automations` or the log, then `get_automation`.
- Edit with `update_automation`. On a live automation, the change applies right away.
- Pause with `pause_automation`.
- To see who engaged, use `list_audience`.

Update the log row's status or link. These don't need the go-live confirmation, but say what changed.

## Quality check

Before going live, check:
- [ ] Every `{placeholder}` has been replaced. None is left in any field.
- [ ] `{guide}` is the specific guide's name everywhere.
- [ ] Every field is within its limit, and the link is https and loads.
- [ ] Follow check and email capture match the preferences, or what the user asked for this time.
- [ ] Story automations have no public reply and no follow check.
- [ ] A saved default changed only if the user asked for that.
