# Official source map

This file maps questions to authoritative Comfy-Org repositories. It is a routing guide, not a snapshot of their implementation.

## Upstream discovery root

The entire [`Comfy-Org`](https://github.com/Comfy-Org) GitHub organization is the canonical upstream discovery namespace. Every current public repository owned by `Comfy-Org` is eligible official upstream evidence.

The table below is a **curated human routing guide, not an exhaustive allowlist**. Explicit self-maintenance can add machine routes to `sources.json` before this human-maintained table is updated, so `sources.json` may contain newer durable routing entries. If a relevant official repository is missing because it is new or specialized, discover it from the organization, classify its purpose/status, and use it when appropriate. Read `upstream-discovery.md` for the selection procedure.

Official ownership does not flatten authority: core implementation, frontend implementation, docs, RFCs, examples, archived repositories, and specialized tools answer different kinds of questions.

## Curated known sources

| Repository | Domain | Use it for |
|---|---|---|
| `Comfy-Org/ComfyUI` | core-runtime | Primary runtime, execution engine, server, bundled nodes, APIs and backend implementation. |
| `Comfy-Org/docs` | documentation | Primary official documentation, developer docs, schemas, server/API docs, custom-node docs and publishing docs. |
| `Comfy-Org/embedded-docs` | documentation | Help/documentation shipped for use inside ComfyUI; useful for user-facing node/help behavior. |
| `Comfy-Org/rfcs` | standards-proposals | RFCs for substantial changes to core, APIs or standards. Proposal evidence only until implemented. |
| `Comfy-Org/comfy-python-sdk` | sdk | Official Python client SDK. |
| `Comfy-Org/comfy-typescript-sdk` | sdk | Official TypeScript client SDK. |
| `Comfy-Org/comfy-swift-sdk` | sdk | Official Swift client SDK. |
| `Comfy-Org/comfy-cli` | cli | Official CLI and current CLI-bundled agent skills. Inspect version-matched help/source and `comfy_cli/skills/` when the task uses the CLI. |
| `Comfy-Org/comfy-api-proxy` | api | Official API proxy/compatibility layer for self-hosted ComfyUI. |
| `Comfy-Org/comfy-mcp` | agent-api | Official MCP integration and useful live-workflow validation/discovery patterns. |
| `Comfy-Org/ComfyUI_frontend` | frontend | Official ComfyUI frontend implementation and frontend extension APIs/patterns. |
| `Comfy-Org/litegraph.js` | frontend-history | Superseded standalone graph repository. Its official README says it was merged into `ComfyUI_frontend`; use the frontend repo for current implementation. |
| `Comfy-Org/comfy-qa-tools` | qa | Official QA environment/tooling infrastructure. |
| `Comfy-Org/custom-node-qa` | qa | Collaborative custom-node QA workflows and validation tooling. |
| `Comfy-Org/Comfy-PR` | upstream-ci | Community/upstream PR testing and integration context. |
| `Comfy-Org/cookiecutter-comfy-extension` | scaffolding | Official custom-node extension scaffold and packaging reference. |
| `Comfy-Org/pyisolate` | dependency-isolation | Official Python extension-isolation library. Use for dependency-conflict isolation, per-extension environments, RPC/process boundaries, sandboxing, and tensor sharing when relevant. |
| `Comfy-Org/comfy-codesearch-cli` | code-search | Official code-search client for ComfyUI/custom-node/community code. Optional accelerator. |
| `Comfy-Org/ComfyUI-test-framework` | testing | Official workflow-oriented ComfyUI test framework and CI runner. |
| `Comfy-Org/comfyui-benchmark` | performance | Official benchmark extension and performance measurement reference. |
| `Comfy-Org/ComfyUI_devtools` | devtools | Official developer/debugging custom-node tools. |
| `Comfy-Org/comfy-claude-prompt-library` | agent-patterns | Claude/repository-oriented agent process patterns. Use selectively; do not vendor wholesale or treat as implementation authority. |
| `Comfy-Org/ComfyUI-Manager` | distribution | Official Manager implementation for custom-node lifecycle and ecosystem integration. |
| `Comfy-Org/registry-backend` | registry | Comfy Registry and CI dashboard backend implementation. |
| `Comfy-Org/comfyci-dashboard` | ci | Continuous integration result dashboard and compatibility signal. |
| `Comfy-Org/comfy-kitchen` | performance | Kernel library used for diffusion inference/performance work. |
| `Comfy-Org/workflow_templates` | workflow-reference | Official workflow-template source and packaging pipeline. |
| `Comfy-Org/comfy-examples` | examples | Official examples, including application/API workflow examples. |
| `Comfy-Org/example_workflows` | workflow-reference | Official example workflow repository. |
| `Comfy-Org/workflows` | workflow-reference | Official-org workflow collection. Reference patterns, not schema authority. |
| `Comfy-Org/creative-campus` | workflow-reference | Education/community case-study workflows and assets. |
| `Comfy-Org/Subgraph-Blueprints` | subgraphs | Official subgraph blueprint source/reference. |
| `Comfy-Org/ComfyUI-React-Extension-Template` | frontend-scaffolding | Official React/TypeScript frontend extension template. Verify current hooks/types against `ComfyUI_frontend`. |
| `Comfy-Org/comfy-skills` | agent-tooling | Official Comfy Cloud agent plugin repository. Inspect its current README: its historical flat `skills/` area is legacy/frozen and must not be mistaken for the current CLI skill source. |
| `Comfy-Org/Comfy-Desktop` | desktop | Current official desktop application and desktop-specific installation/update behavior. |
| `Comfy-Org/comfy-model-tools` | model-tooling | Official model packaging and conversion utilities. |
| `Comfy-Org/comfy-quants` | quantization | Official offline quantization tools for ComfyUI-loadable checkpoints. |

## Selection rules

### Core/backend question

Start with `Comfy-Org/ComfyUI` and `Comfy-Org/docs`. For a pinned target, inspect the corresponding target checkout or commit rather than current `master` alone.

### Custom-node backend question

Use, in order as relevant:

1. target installation or target checkout;
2. current/version-matched custom-node docs in `Comfy-Org/docs`;
3. current/version-matched examples in `Comfy-Org/ComfyUI`;
4. `Comfy-Org/cookiecutter-comfy-extension` for current project/package structure;
5. `Comfy-Org/pyisolate` when the work involves isolated extension environments, conflicting Python dependencies, RPC/process boundaries, sandboxing, or isolated tensor transfer;
6. current tests and QA tools for acceptance behavior.

### Frontend extension question

Use `Comfy-Org/ComfyUI_frontend` plus frontend/custom-node documentation in `Comfy-Org/docs`. Use `ComfyUI-React-Extension-Template` when React/TypeScript scaffolding is relevant. Search the actual frontend source for extension hooks before using remembered signatures.

### Workflow question

Use the live target node catalog first for installed node definitions. Use `Comfy-Org/docs` for the current/version-matched workflow schema. Use `workflow_templates`, `example_workflows`, `comfy-examples`, `workflows`, `creative-campus`, and `Subgraph-Blueprints` as examples appropriate to the problem.

### API/SDK question

Choose the repository matching the client surface: Python, TypeScript, Swift, CLI, proxy, MCP, or core server. Do not merge Cloud and self-hosted API assumptions without checking which target is in use.

### Test/QA question

Use `ComfyUI-test-framework`, `comfy-qa-tools`, `custom-node-qa`, `Comfy-PR`, and the target project's own tests. Prefer the tool that actually exercises the behavior being changed.

### Registry/Manager question

Use current Registry documentation plus `registry-backend`, `ComfyUI-Manager`, `comfy-cli`, and the cookiecutter template as appropriate.

### Performance and model-tooling question

Measure first. Use core source, `comfyui-benchmark`, and `comfy-kitchen` as appropriate. For offline model conversion or quantization, inspect `comfy-model-tools` and `comfy-quants`, then verify compatibility at the target ComfyUI integration point. Do not infer a performance win solely from code shape.

### Desktop question

Use `Comfy-Desktop` for current desktop-app behavior. Treat older desktop repositories as historical unless the task explicitly targets them.

### Agent-tooling question

Read `official-agent-guidance.md`. Use the agent-related repository that actually owns the requested integration instead of copying all agent guidance into this pack.

- For `comfy-cli` tasks, inspect the installed/version-matched CLI's current skills and help; current bundled skills live with `comfy-cli` under `comfy_cli/skills/`.
- For Comfy Cloud plugin guidance, inspect the current `comfy-skills` README; do not use its legacy/frozen flat `skills/` directory as the current CLI skill source.
- Use `comfy-claude-prompt-library` selectively for process patterns only. It is not a universal dependency and is not runtime/API authority.
- For changes to a specific Comfy-Org repository, inspect its repository-local `AGENTS.md`, `CLAUDE.md`, agent skill/command directories, CONTRIBUTING guidance, and developer READMEs when present.

Do not let agent helper repositories override the target runtime, version-matched source, live node catalog, or official schema.

## Discovering additional sources

Do not wait for a current doc to link a repository. The `Comfy-Org` organization itself is the discovery root.

When the curated map does not clearly cover the task:

1. list/search current repositories owned by `Comfy-Org`;
2. search names/descriptions and then README/source for the relevant concept;
3. verify active/archived/mirror/proposal/example status;
4. determine which repository actually owns the behavior;
5. inspect the current README/source before relying on it;
6. do not let a newly discovered repository override the target runtime or version-matched primary source without evidence.

Read `upstream-discovery.md` for the full organization-wide procedure.

Third-party repositories may be useful for interoperability or examples, but label them as third-party and do not treat them as ComfyUI specification authority.
