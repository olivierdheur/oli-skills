# Search recipes

Use these patterns as procedures, not rigid commands. Adapt paths and tools to the environment.

## Establish a local target

```bash
git -C /path/to/ComfyUI rev-parse HEAD
git -C /path/to/ComfyUI branch --show-current
git -C /path/to/ComfyUI remote -v
git -C /path/to/ComfyUI status --short
```

Do not reset, pull, rebase, or checkout another branch merely to inspect it.

## Search locally first

Use `rg` or `git grep` in the target checkout when available.

```bash
rg -n "term" /path/to/ComfyUI

git -C /path/to/ComfyUI grep -n "term"
```

Useful concept searches include:

- exact class/function/route name;
- schema field name;
- node id or display name;
- frontend extension hook;
- error text;
- test name;
- config key.

Search for behavior, not only the symbol you expect. Renames are common.


## Discover across the entire official organization

The curated source map is not a whitelist. When a task may involve a new or specialized ComfyUI component, search/list repositories under `Comfy-Org` before assuming the component does not exist.

Discovery sequence:

1. list/search `Comfy-Org` repositories by concept;
2. prefer active repositories over archived predecessors;
3. read the candidate README to confirm purpose;
4. search candidate source for the exact behavior;
5. trace references/imports from the relevant primary repo where possible;
6. classify the candidate as implementation, docs, proposal, example, testing/QA, tooling, historical/mirror, or specialized subsystem.

Useful concept terms include `frontend`, `workflow`, `registry`, `sdk`, `isolate`, `extension`, `quant`, `model`, `benchmark`, `test`, `desktop`, `graph`, `mcp`, `skill`, and the exact error/symbol being investigated.

If GitHub organization discovery is unavailable, use the organization page as the starting point and inspect only repositories relevant to the task.

## Current official code search

Search the repository most likely to own the behavior. If `comfy-codesearch` is installed, it can accelerate cross-repository search. It is optional.

Do not fail the task because that CLI is absent. Fall back to local search, GitHub code search, or direct repository inspection.

## Read context

After finding a hit:

1. open the whole relevant function/class;
2. inspect imports and call sites;
3. inspect tests for the behavior;
4. inspect version guards/deprecations;
5. compare the target version with current upstream if necessary.

## Custom-node backend searches

Search current docs and source for:

- the node-definition generation used by the target;
- input/output type implementations;
- registration/entrypoint behavior;
- validation and change-detection behavior;
- UI return/preview behavior;
- comparable bundled nodes.

Do not copy a single example without checking whether it matches the target API generation.

## Frontend searches

Search `ComfyUI_frontend` for the exact extension hook or service. Prefer current typed definitions and current core extensions as examples over old blog posts.

## Workflow searches

For a requested capability:

1. inspect the live node catalog;
2. search official templates/examples for a current working pattern;
3. inspect the workflow schema;
4. build using target node definitions;
5. validate against the target.

## Error-driven search

Search exact error text first. Then trace the code that raises it. This is often more reliable than guessing from the visible symptom.
