# Freshness policy

## Principle

Freshness is relative to the compatibility target.

"Newest available" is correct only for current-upstream work. A three-month-old pinned checkout can be the freshest correct source for a project targeting that commit.

## Current-upstream work

Before making a material claim about current ComfyUI behavior:

- inspect the current default branch or current official docs;
- capture the commit/version when practical;
- check whether recent changes affected the relevant surface;
- use current tests/examples only after confirming they match the same implementation generation.

## Local/pinned work

- inspect `git rev-parse HEAD`, branch/tag, remotes, and dependency metadata;
- do not silently fetch/reset/update the user's checkout;
- if matching docs are not available locally, use version-matched history/tags when possible;
- use current upstream only to explain a difference or propose an upgrade.

## Live server work

A live node catalog is a snapshot of what is loaded **now**. It can differ from disk because:

- the server has not been restarted after code changes;
- import failures prevented a custom node from loading;
- a different Python environment or checkout launched the server;
- frontend/backend versions differ;
- multiple ComfyUI installations exist.

When results are surprising, compare the running process/environment with the source path before concluding the code is wrong.

## Cached information

Do not maintain a bundled static catalog of third-party nodes as authoritative workflow data. Cache can accelerate discovery, but live validation must decide compatibility whenever the target is reachable.

## Claims

Use language that matches evidence:

- **verified on target**: tested/inspected on the actual target;
- **verified against source**: confirmed in a named source/commit but not run;
- **current upstream**: checked against current official upstream;
- **provisional**: plausible but a validation gate could not be completed.
