# Comfy-Org upstream discovery policy

## Canonical upstream namespace

Treat **https://github.com/Comfy-Org** as the canonical discovery root for official ComfyUI upstream repositories.

Every current public repository owned by `Comfy-Org` is eligible upstream evidence. The repository list in `sources.json` is deliberately **not** an exhaustive allowlist. It is a curated routing index for repositories that are commonly useful.

A newly created or newly relevant `Comfy-Org` repository may be used immediately after its ownership, status, purpose, and relevance are verified. The skill pack does not need to be updated first.

## Important distinction: official provenance is not universal authority

Being under `Comfy-Org` establishes official upstream provenance. It does **not** mean every repository is equally authoritative for every question.

Choose the source that owns the behavior:

- runtime behavior -> target/live ComfyUI and the relevant `ComfyUI` source;
- frontend behavior -> `ComfyUI_frontend` and any current frontend dependency that actually owns the behavior;
- documented public contract -> current/version-matched `docs` plus implementation;
- proposals -> `rfcs`, clearly treated as proposals until shipped;
- examples/templates -> evidence of usage, not schema authority;
- Manager/Registry behavior -> their current implementation/docs;
- SDK behavior -> the matching SDK plus its server/API contract;
- dependency isolation -> `pyisolate` when the target actually uses or is considering that mechanism;
- specialized tooling -> the current official repository that owns that tool.

The live target or version-matched source can outrank newer upstream code for compatibility work.

## Do not bulk-load the organization

The whole organization is the search universe, not the prompt context.

Do not clone, read, or inject every repository into context. Discover and load only the repositories needed for the current task.

## Organization-wide discovery procedure

When the curated source map does not clearly answer the question, or when a task may involve a newer official component:

1. Search/list current repositories owned by `Comfy-Org`.
2. Search names and descriptions for the concept involved.
3. Inspect repository metadata: default branch, archived status, fork/mirror status where visible, and recent activity.
4. Read the repository README or top-level documentation to establish its purpose.
5. Search its source for the exact behavior/symbol/error involved.
6. Check whether `ComfyUI`, `ComfyUI_frontend`, docs, or another primary repo actually depends on or links to it.
7. Classify the repository before treating it as evidence: implementation, documentation, proposal, example, test/QA, tooling, historical/mirror, or experimental/specialized.
8. Prefer active primary implementations over archived predecessors, mirrors, snapshots, or examples.
9. Record the repository/path and commit/version when the distinction matters.

## Repository status rules

### Active primary repository

May be authoritative for the domain it owns, subject to compatibility target and source-conflict policy.

### Archived repository

Historical evidence only unless the task explicitly targets that archived version/project.

### Mirror, previous-generation, snapshot, or migration repository

Use to investigate history, migration, or compatibility. Do not let it silently override the current primary implementation.

### RFC/proposal repository

Use to understand intended or proposed direction. Verify implementation and tests before claiming the feature has shipped.

### Examples/templates/education repository

Use for patterns and representative workflows. Validate against the actual current schema/runtime.

### Specialized official project

Use when the task intersects that project's purpose, then verify its integration point with the relevant core/frontend/runtime target.

## What to search for by task

| Task or question | Search direction |
|---|---|
| execution, scheduling, model loading, tensors, built-in nodes, server routes | `ComfyUI` first, then org-wide search for a delegated subsystem |
| editor, canvas, widgets, extension hooks, browser UI | `ComfyUI_frontend` first; inspect current org-owned frontend dependencies when the source points to them |
| graph engine behavior | frontend source first, then the current org-owned graph library actually imported/used by the target |
| custom-node API/schema | `docs` + target/current `ComfyUI`; use extension templates for structure |
| custom-node dependency conflicts or isolation | `pyisolate` plus target integration code and packaging/runtime docs |
| workflow JSON or API graph | live node catalog + `docs`; templates/examples only as patterns |
| workflow galleries/templates/subgraphs | `workflow_templates`, `example_workflows`, `workflows`, `Subgraph-Blueprints`, plus any newly discovered official workflow repo |
| REST/WebSocket/client integration | core server/docs plus the matching SDK/proxy/MCP repository |
| Python/TypeScript/Swift client | matching official SDK, then server contract |
| CLI behavior | `comfy-cli` and current CLI docs/help |
| Manager, Registry, publishing | `ComfyUI-Manager`, `registry-backend`, `comfy-cli`, docs, current scaffolds |
| tests, compatibility, QA | current test framework/QA/CI repositories plus target project tests |
| performance, kernels, quantization, model tooling | `ComfyUI` integration point first, then search the org for the active specialized performance/model repo |
| desktop application behavior | discover the current active desktop repo in `Comfy-Org`; do not assume an older archived desktop repo is current |
| agent skills/MCP/coding helpers | discover current `Comfy-Org` skills/agent/MCP repositories; treat them as tooling, not runtime API authority |
| planned standards or breaking changes | `rfcs` plus source/tests to determine shipped state |

## If a new official repository appears

Its absence from `sources.json` must never be interpreted as "not official" or "do not use". Verify that the owner is `Comfy-Org`, inspect its purpose and status, and use it if it is the most relevant current source.

Add it to the curated registry later only when its role is stable and commonly useful enough to improve routing. During ordinary work, do not mutate the registry. If the user explicitly requests pack self-maintenance, activate `comfyui-self-maintenance`, compare against `upstream-snapshot.json`, and verify durable changes. Normal maintenance can update the machine routing/snapshot state. If the durable change needs broader skill knowledge, the maintenance skill must present the four explicit report/self-modify choices before any broader local edit.
