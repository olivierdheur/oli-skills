# Compatibility target policy

## Determine the target before changing code

Use the narrowest target explicitly or implicitly required by the project.

### Target installation

Choose this when the user asks to fix or build something for their existing ComfyUI.

Discover:

- checkout path if available;
- Git commit/branch/tag;
- Python environment;
- running server URL;
- live node catalog;
- relevant custom-node commits/versions;
- frontend version/source when UI behavior matters.

### Pinned target

Choose this when a repository, lockfile, CI matrix, release tag, commit, or user instruction identifies a version.

Do not replace the pin with current upstream while diagnosing compatibility.

### Project range

Choose this when an extension claims support across multiple ComfyUI versions.

Avoid relying on a feature that only exists at the newest end of the range unless guarded. Test representative boundaries when practical.

### Current upstream

Choose this for forward-looking development or explicit "latest/current/master" work.

Refresh official sources before coding.

## Custom-node API generation

Do not assume one custom-node schema generation is universally correct.

When creating a new node, inspect current official guidance and the project's compatibility policy. When editing an existing node, preserve its API generation unless migration is part of the task or the target requires change.

## Frontend compatibility

Frontend APIs and implementation can evolve independently from remembered custom-node examples. Verify hooks and types in the target/current frontend source.

## Workflow compatibility

A workflow is compatible only with the node definitions and resources available in the target environment. A workflow valid against current upstream can still fail on the user's install, and vice versa.

## Dependency changes

Do not widen, narrow, upgrade, or replace dependencies without checking project constraints and the requested scope. Explain unavoidable compatibility changes.
