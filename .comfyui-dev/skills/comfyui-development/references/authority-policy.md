# Authority and conflict-resolution policy

Use this policy when two sources disagree.

## 0. Official upstream discovery namespace

`Comfy-Org` is the canonical upstream GitHub namespace. A current public repository owned by `Comfy-Org` is an official upstream source even when it is not listed in this skill pack's curated registry.

Official ownership establishes provenance, not universal precedence. Select the repository that owns the behavior and account for its status:

- active primary implementation can be authoritative for its domain;
- archived, mirror, previous-generation, or snapshot repositories are historical unless explicitly targeted;
- RFCs are proposals until implementation is verified;
- examples/templates demonstrate patterns but do not override runtime/schema contracts;
- specialized tools are authoritative for their own tool behavior, not automatically for ComfyUI core behavior.

When unsure which official repository owns a behavior, use `upstream-discovery.md` and search the organization before falling back to model memory or third-party sources.


## 0.1 Dynamic routing state

Read `sources.json` before choosing a current upstream source when it contains a matching route. Route entries may carry maintenance state:

- no `status` or `status: active` -> normal current routing candidate;
- `status: experimental` -> useful only with explicit evidence that the target depends on it;
- `status: historical` or `status: archived` -> historical/compatibility evidence, not current authority;
- `status: superseded` -> for current-upstream work, follow `superseded_by`; keep the old repository only for pinned/historical targets that actually need it.

A `specialist` value is a routing hint to an existing skill, not proof that the repository owns every behavior in that skill domain.

The upstream snapshot is change-detection state only. It never outranks the target runtime, version-matched source, official implementation, or docs.

## 1. Runtime compatibility questions

Question shape: "Will this run on this ComfyUI installation?", "What inputs does my installed node expose?", "Which model choices are available here?"

Authority order:

1. the actual running target and its live introspection;
2. the exact installed source/commit for that target;
3. version-matched official docs;
4. version-matched upstream project docs/source for installed custom nodes;
5. current upstream docs/source as migration context only;
6. examples and community discussion.

Do not "correct" an older but intentionally pinned installation to current upstream behavior unless the task is to upgrade it.

## 2. Current public ComfyUI behavior

Question shape: "How should a new custom node be written today?", "What is the current workflow schema?"

Authority order:

1. current official docs for the public contract;
2. corresponding current official implementation source;
3. official tests/scaffolds/examples that exercise the behavior;
4. RFCs for context only when the behavior is not yet shipped;
5. community sources.

If docs and source disagree, investigate version/commit timing instead of arbitrarily selecting one.

## 3. Internal implementation questions

Question shape: "Where is execution scheduling implemented?", "What function handles this route?"

The relevant version of `Comfy-Org/ComfyUI` or `Comfy-Org/ComfyUI_frontend` is primary. Documentation can guide discovery but implementation source answers internal-code questions.

## 4. Proposed behavior

RFCs describe proposals. They are not proof that a feature is implemented, enabled, stable, or available in the target.

Before implementing from an RFC, search core/frontend source and tests for the proposal's actual shipped state.

## 5. Examples

Official templates and examples are evidence that a pattern has been used. They do not override:

- the live node catalog;
- the current workflow schema;
- the target source implementation;
- a newer documented contract.

## 6. Search-result snippets

Never treat a code-search snippet as enough context for implementation. Open/read the containing file and relevant neighboring definitions.

## 7. Model memory

Model memory is the lowest-priority source for volatile ComfyUI details. Use it to generate search terms, not to skip verification.
