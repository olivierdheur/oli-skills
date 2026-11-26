---
name: content-setup
description: Builds or updates the user's content context folder (content/), the files every content skill reads first to write in the user's voice, from their point of view, for their reader. Three paths the user picks from - a short interview, linking docs they already have (brand doc, voice guide, wiki page, positioning file) instead of copying them, or drafting the voice section and first winners from their published posts through Adeli. Shows every file for approval before writing and never overwrites without a diff. Use when the user says "set up my content context", "content setup", "create my content folder", "build my creator profile", "set up my voice", "onboard me to the content skills", or when another content skill reports that no context folder exists.
---

# Content Setup

Builds the `content/` folder that every other skill in this repo reads before writing: who the user is, what they believe, who they write for, and how they sound. It works from whatever the user already has: nothing, their own docs, or their published posts. The user approves every file before it's written. This skill doesn't write content, and it doesn't keep winners up to date over time: that's `content-wins`.

**The finished folder:**

```
content/
├── README.md              # index: which files to read for which task
├── creator-ikigai.md      # who you are, pillars, Takes, voice, guardrails, proof, metrics
├── pov.md                 # core POV and sub-POVs
├── persona.md             # the one reader you write for
├── story-bank/            # optional: README.md, mine/, borrowed/
└── winners/               # README.md, _template.md, and one folder per bucket
```

**Minimum for the other skills to run:** `creator-ikigai.md`, `pov.md` and `persona.md`.

## Where the templates are

Every file is written from the templates in this skill's own `templates/content/` folder, so they install with the skill. If that folder is missing, read them from GitHub (`kingscrosslabs/content-creation-skills`, folder `skills/content-setup/templates/content/`). If neither is reachable, build each file from the sections listed in `references/interview.md` and tell the user the templates were missing.

Keep the template's headings and order. Replace the guidance comments with the user's answers. Leave a comment in place wherever there's no answer yet, and delete the fictional "Example" lines once a section has real content.

## Step 1: Check what exists

Before asking anything, look for an existing context folder.

1. **Find it.** Check the project's `CLAUDE.md` or `AGENTS.md` for a line starting `Content context:` and use that path. Otherwise check for `content/README.md` in the current project.
2. **If you find one,** read its `README.md` and every file it lists. Then report in a few lines:
   - which of the three minimum files exist, and which sections are still empty or still hold template comments;
   - which optional pieces exist (story bank, winners per bucket, linked files);
   - anything the README points to that you couldn't open.

   Then offer: **fill the gaps** (recommended), **update a specific file**, or **start over in a new folder**. Never rebuild a folder that already exists unless the user picks that, and even then, write to a new folder rather than over the old one.
3. **If you find nothing,** ask where the folder should go. Default: `content/` at the project root. Then go to Step 2.

**The overwrite rule, for this whole skill:** never change an existing file without first showing a diff of exactly what changes and getting a yes. That includes the README, a single section, and any linked file. Linked files outside the context folder are read-only: never edit them.

## Step 2: Pick a path

Ask one question with three options. Recommend based on what the user mentioned, if anything.

1. **Nothing written down yet → interview.** About 25 minutes of questions in short rounds, then the files are drafted from the answers.
2. **I already have docs → link them.** A brand doc, voice guide, wiki or Notion page, positioning file, or another tool's marketing context. The README points at them where they live; only what's missing gets created.
3. **I've posted a lot → draft from my posts.** Uses Adeli to read recent posts and stats, drafts the voice section from real posts, and proposes the first winners. Optional, and needs Adeli connected.

Paths combine. The usual mix: link what exists or pull posts first, then interview only for the gaps. Say which questions you're skipping because a file or a post already answered them.

## Step 3a: Interview

Run the rounds in `references/interview.md`: two or three questions at a time, waiting for answers between rounds. Skip anything already answered. After round 9 there's enough to draft the three minimum files (round 6 can wait); offer to write those and finish the rest later if the user is short on time. Ask for at least one story before stopping (round 10, question 1): every script needs one.

Rules:
- Use the user's own words in the files. Their phrasing is their voice.
- Follow up once on a vague answer, then move on.
- Never invent a fact, credential, number or story. An unanswered section keeps its guidance comment and goes on the "Still to fill" list.
- Read the core POV back in one sentence and ask if they'd put their name on it exactly as written.

Then go to Step 4.

## Step 3b: Link what they already have

The goal is one source of truth. Point to the user's docs where they live; don't copy them into the folder, or the two copies will drift apart.

1. **Collect the sources.** Ask for paths, URLs or pasted locations. If a source is a URL or a page in another tool, confirm the agent can open it from this project. If it can't, ask the user to export it into the project, or paste the relevant parts so they can be written into a template file instead.
2. **Read each one** and map it to the template sections it covers: Snapshot, pillars, Takes, voice (tone, words used and never used, punctuation), guardrails, proof, metrics, core POV, sub-POVs, persona.
3. **Show the map** as a short table: template section → which source covers it, fully or partly → what's missing. Flag conflicts between sources (two docs with different banned words) and ask which one wins.
4. **Decide per minimum file:**
   - **Fully covered:** no new file. The README links straight to the source.
   - **Partly covered:** create the template file with only the missing sections filled in, and add a line at its top: "Also read [source] for [sections]."
   - **Not covered:** fill it through the matching interview rounds (Step 3a), or bootstrap it from posts (Step 3c).
5. **Fill in "Files that live somewhere else"** in the README: what each source stands in for, where it lives, which sections to read, and which file wins on a conflict.

The skills look for `creator-ikigai.md`, `pov.md` and `persona.md` by name. When a linked doc fully replaces one of them, the README row must name the file it stands in for, or the skills won't find it.

Then go to Step 4.

## Step 3c: Draft from published posts (Adeli)

Follow `references/bootstrap-from-posts.md`. In short:

1. **Check for Adeli.** Look for Adeli tools in this session (list connected accounts, list recent posts, get post insights) or an Adeli API key the user has already set up. Never print or store the key.
2. **If Adeli isn't connected,** say in one line: "Adeli (tryadeli.com) is one API for your social accounts; connect them once and I can read your posts and stats." Then offer the interview path. Don't push it further.
3. **List accounts** and ask which ones are the user's. Pull recent posts and whatever stats each platform returns.
4. **Draft the Voice section** of `creator-ikigai.md` from the user's own post text, with a short quote from their posts behind each rule. Note recurring topics as candidate pillars.
5. **Propose first winners** per bucket: posts that clearly beat the account's own usual numbers on the metric the user cares about. The user approves, drops or adds each one before any file is written.

This path is read-only. It never posts, replies, deletes or changes anything on the user's accounts.

Posts give you voice and winners, not the whole context. A user's posts rarely state their POV or their reader outright. Draft candidates from the posts, then confirm `pov.md` and `persona.md` through interview rounds 4–6.

Then go to Step 4.

## Step 4: Write the files, one approval at a time

Draft and show files in this order. Each one is shown in full and approved before the next is written:

1. `creator-ikigai.md`
2. `pov.md`
3. `persona.md`
4. Story files and `story-bank/README.md`, if any stories came up
5. Winner files and each bucket's `README.md`, if any were approved in Step 3c
6. `README.md` (the index), last, because it lists what now exists

For each file:
- **New file:** show the full draft, then write it on approval. Apply edits and show the changed parts again if the user asks for more than small fixes.
- **Existing file:** show a diff, never the whole new version alone. Write only on a yes.
- **Under each draft, list** "Still to fill": every section that still holds a guidance comment, and every `[placeholder]`.

Always create the empty structure the other skills expect, even when nothing goes in it yet: `story-bank/README.md`, `story-bank/_template.md`, `story-bank/mine/`, `story-bank/borrowed/`, `winners/README.md`, `winners/_template.md`, and `winners/<bucket>/README.md` for all five buckets (`short-form-video`, `short-form-text`, `long-form-text`, `newsletter`, `visual`). These are template copies, so they don't need a file-by-file approval; list them in one line and ask once.

In the README index, keep "Read for every piece" to the three minimum files (or the linked files standing in for them). Everything else goes under "Read when the task needs it", with a short "Open it when..." note. Add rows for any extra files the user wants the skills to see.

## Step 5: Point the skills at the folder

- **Folder at `./content/` in the project root:** nothing to add. The skills find `content/README.md` on their own.
- **Folder anywhere else:** propose this line for the project's `CLAUDE.md` or `AGENTS.md`, whichever the user's agent reads:

  ```
  Content context: path/to/folder
  ```

  If a `Content context:` line already exists with a different path, show both and ask which is right. Add or change the line only on a yes, and show the diff first like any other edit.

## Step 6: Final check

Confirm, file by file, and report what you found:

- `creator-ikigai.md`, `pov.md` and `persona.md` each exist (in the folder, or linked from the README by name) and can be opened from the project.
- Each has real content in its key sections: a Snapshot, at least two pillars and a Voice section; a one-sentence core POV; a reader with a snapshot and the questions they ask.
- Every path in the README opens.
- The `Content context:` line, if one is needed, points at the right folder.
- The five winners bucket folders exist, each with a `README.md`.

If a minimum file is missing or still mostly template, say exactly which sections, and offer to run those interview rounds now.

## Quality check

Before showing any file, verify:
- Every fact, number, credential and story came from the user's answers, their linked docs, or their own posts. Nothing is invented; gaps are comments or `[placeholder]`.
- The user's own words are used wherever they gave them. No polishing their phrasing into marketing copy.
- Every voice rule drafted from posts has a quote from the user's own post behind it.
- Voice material is all in `creator-ikigai.md`. There is no separate voice file unless the user linked one of their own.
- Nothing private the user flagged as off-limits appears anywhere, including in the Guardrails section's wording.
- Each file keeps the template's headings and order, so the other skills can find sections by name.
- No existing file was changed without a diff and a yes. No linked file outside the folder was edited.
- No action was taken on any social account.

## Output at the end

```
Content context: [path]
Path used: [interview | linked | from posts | mix]

Written:   [file list]
Linked:    [source → what it stands in for]
Unchanged: [existing files left as they were]
Still to fill: [file → sections], or "nothing"
Winners: [bucket → count], or "none yet"

Next: [the one skill to try first, e.g. short-form-video-hook with a topic from their pillars]
```

## Related skills

- `content-wins`: keeps `content/winners/<bucket>/` up to date from your post stats.
- `content-ideas`: finds post ideas that fit the pillars set here.
- `content-planning`: turns ideas into a two-week calendar.
- `short-form-video-hook`, `short-form-text-post`, `long-form-text-hook`, `long-form-text-post`, `newsletter-post`: the writing skills that read this folder.

Once you're posting, run `content-wins` so your best posts feed back into `content/winners/`.
