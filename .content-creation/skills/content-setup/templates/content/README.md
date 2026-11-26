# Content context

Everything the content skills need to write as you, from your point of view, for your reader. Every skill opens this file first, then opens only what its task needs.

Keep this file short. It is an index, not a strategy doc.

---

## Read for every piece

| File | What's in it |
|---|---|
| `creator-ikigai.md` | Who you are, your pillars, your Takes, your voice (tone, words you use and never use, punctuation), guardrails, proof you can cite, metrics you care about |
| `pov.md` | Your core point of view and the sub-POVs under it. Every piece ladders up to it |
| `persona.md` | The one reader you write for: their situation, questions, fears and words |

These three are the minimum. A skill won't run in your voice without them.

## Read when the task needs it

| File or folder | What's in it | Open it when... |
|---|---|---|
| `story-bank/README.md` | Index of your stories (`mine/`) and stories you borrow with credit (`borrowed/`) | A piece needs an anecdote. Never invent one |
| `winners/<bucket>/README.md` | One line per post that did well, newest first | Writing in that bucket. Open the index, then the 3–5 closest winners |
| `dm-automation.md` | Your default DM automation copy, toggles and a log of every automation | Setting up a comment-to-DM automation. Written by `dm-automation` on its first run |

<!-- Add your own rows here: a research folder, a list of past newsletter issues, a lessons file. -->

**Quick picks:**
- **Hook or script:** the three "every piece" files, plus `winners/short-form-video/`. Scripts also open the story bank.
- **LinkedIn post or newsletter:** the three "every piece" files, the story bank, plus that bucket's winners.
- **Ideas or planning:** `creator-ikigai.md` (pillars and metrics) and every bucket's winners index.

---

## Files that live somewhere else

You don't have to move your existing docs into this folder. Point to them instead. A path can be relative to this folder, absolute, or a URL your agent can open.

| Stands in for | Lives at | Notes |
|---|---|---|
| <!-- e.g. voice section of creator-ikigai.md --> | <!-- e.g. ../docs/brand-voice.md --> | <!-- e.g. "Read the Tone and Banned words sections only" --> |

If a linked file covers only part of a template, keep the template file and fill in just the missing part. Say here which file wins when they disagree.

---

## If this folder is not at `./content/`

Add one line to your project's `CLAUDE.md` or `AGENTS.md` so every skill finds it:

```
Content context: path/to/this/folder
```
