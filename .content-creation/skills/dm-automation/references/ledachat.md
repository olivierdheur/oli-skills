# LedaChat: setup, flow and field map

[LedaChat](https://ledachat.com) runs Instagram comment-to-DM and story-reply automations through Instagram's official API (via Adeli, a Meta Tech Provider), and it has an MCP server so agents can build them. Where this file and LedaChat's own docs disagree, LedaChat's docs win. Notes current as of November 2026.

## Connecting

1. **You'll need an Instagram professional account** (Business or Creator). Switching a personal account over is free, in the Instagram app.
2. **Connect Instagram:** sign in at https://app.ledachat.com and connect the account at https://app.ledachat.com/connect. LedaChat never sees your password. The hosted version doesn't need a Meta developer app or an API key.
3. **Add the MCP:** in the app, open **Connect to AI Agent** from the sidebar and copy the server URL (it ends in `/mcp`). Then:
   - **Claude Code:** `claude mcp add --transport http --scope user ledachat <your-ledachat-url>/mcp`, then run `/mcp`, pick `ledachat` and choose **Authenticate**.
   - **Claude desktop or web:** Settings → Connectors → add a custom connector with the URL, then sign in.
   - **Cursor, ChatGPT, Codex:** add the same URL as an MCP server and sign in with OAuth. The Connect to AI Agent page has a guide for each.
   - **Other clients:** use the same URL with an `Authorization: Bearer <token>` header. Tokens start with `adc_` and are made in the app. Never paste the token into chat or write it into a file.
4. **Self-hosting** (free, MIT license, on GitHub) needs your own Adeli API key. Adeli's free plan covers your own account.

If the hosted signup isn't open yet, LedaChat's homepage has a waitlist, or the user can self-host.

## Plans

- **Free:** 10 live automations at a time, with "Powered by LedaChat" after the final DM.
- **Pro ($25/mo):** unlimited automations, no branding, and DMs to people who commented before the automation went live (`message_earlier_comments`).

## The flow and its fields

| Step | Fields |
|---|---|
| Trigger | `type` (`comment_to_dm` or `story_reply`, can't be changed later), `postScope` (`specific`, `next`, `any`), `postId` or `storyId`, `match` (`keywords` or `any`), `keywords` |
| Public reply (comments only) | `commentReplyEnabled`, `commentReplies` (up to 10, 300 characters each) |
| Opening DM | `openingDmText` (640 characters), `openingDmButtonLabel` (20 characters) |
| Follow check (comments only) | `followGateEnabled`, `followGateText`, `followGateButtonLabel`, `followGateRetryText` |
| Email capture | `emailCaptureEnabled`, `emailCaptureText`, `emailCaptureRetryText` |
| Final DM | `finalDmText`, `linkButtonLabel`, `linkUrl` (https), `extraLinks` (up to 2 × `{label, url}`) |
| Name | `name` (80 characters) |

Each person gets the flow once per automation. Collected emails are saved as leads you can export in the LedaChat app.

## Tools

| Job | Tool |
|---|---|
| Account, plan, live count | `get_workspace` |
| Find a post or reel id | `list_posts` (9 per page) |
| Find a story id | `list_stories` |
| Create a draft | `create_automation` |
| Edit | `update_automation` (changes on a live automation apply right away) |
| Start | `go_live` (checks every field, and checks for keyword clashes with live automations on the same post or scope) |
| Pause / delete / copy | `pause_automation` / `delete_automation` / `duplicate_automation` |
| List / inspect | `list_automations` / `get_automation` |
| Who engaged | `list_audience` |
| DM earlier commenters (Pro) | `message_earlier_comments`: call with `send: false` to count, and with `send: true` only after the user says yes |

`go_live` and `message_earlier_comments` with `send: true` send DMs from the user's real account. Deleting an automation needs its own yes.
