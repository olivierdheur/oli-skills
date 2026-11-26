# Official agent skills and prompt guidance

Comfy-Org publishes agent-facing skills, plugins, prompts, and repository-local instructions. They are useful current guidance, but they are not a second copy of the ComfyUI runtime specification and should not be vendored into this pack by default.

## Do not vendor upstream agent guidance

Do not copy Comfy-Org skill files or prompt libraries into this package merely to make them available offline.

Reasons:

- they are versioned with their owning upstream project and can change independently;
- copying them creates stale duplicate instructions;
- some are tied to a particular CLI, cloud product, repository, or agent harness;
- prompt/process guidance must not override the target runtime, version-matched source, official schema, or live node catalog.

Use them on demand from the target installation or current upstream source.

## `Comfy-Org/comfy-cli`

The current `comfy-cli` repository ships its own agent skills under `comfy_cli/skills/`. When the task actually uses `comfy-cli`, inspect the current installed/source skill set and current CLI help before relying on command names or behavior.

Useful categories currently include general Comfy CLI/workflow operation, custom-node development, debugging, build/deploy, relay, and related reference skills. Treat the current list as discoverable data, not a permanent list in this pack.

When available, prefer the CLI's own skill discovery surface (for example its current `skills` commands) or inspect `comfy_cli/skills/` in the version-matched source.

These skills are **supplementary operational guidance**. For runtime contracts, node APIs, workflow schemas, or Registry contracts, still verify the corresponding target source/docs/live schema.

## `Comfy-Org/comfy-skills`

Inspect the repository README before using its contents. Its current repository documents a canonical Comfy Cloud plugin while its old flat `skills/` command files are legacy/frozen for a deprecated installer.

Do not copy or route new development through a legacy/frozen skill directory merely because it is named `skills/`.

## `Comfy-Org/comfy-claude-prompt-library`

Use this repository selectively for agent-process patterns when the task benefits from them. It is Claude/repository oriented and can contain assumptions about local tools, memory systems, paths, or development process.

Do not install or import it wholesale into this universal pack. Do not treat its prompts as ComfyUI implementation authority.

## Repository-local agent instructions

When contributing to a specific Comfy-Org repository, inspect that repository's current local guidance before changing code. Depending on the repo, that can include:

- `AGENTS.md`;
- `CLAUDE.md`;
- `.claude/skills/` or `.claude/commands/`;
- `.cursor/skills/` or other repository-local agent rules;
- `CONTRIBUTING.md`, developer READMEs, and test/build instructions.

Repository-local guidance owns **process for that repository**. It does not override a version-matched runtime/API contract unless the repository itself owns that contract.

## Specialist routing

Use current official agent guidance only when it matches the task:

- custom-node work: current `comfy-cli` custom-node guidance can supplement `comfyui-custom-node-backend`;
- workflow creation/CLI execution: current general `comfy-cli` guidance can supplement `comfyui-workflows`;
- failed CLI jobs: current CLI debugging guidance can supplement `comfyui-workflow-validation` or the owning specialist;
- Registry/package work: current CLI custom-node/publishing guidance can supplement `comfyui-packaging-and-registry`;
- build/deploy platform work: current CLI build/deploy guidance can supplement packaging/API skills as appropriate;
- upstream contributions: repository-local agent instructions supplement `comfyui-upstream-development`.

## Authority rule

Agent instructions answer "how should this agent/tool/repository perform the work?"

They do not automatically answer "what does this ComfyUI version implement?"

For implementation truth, continue to follow the authority and compatibility policies in this pack.
