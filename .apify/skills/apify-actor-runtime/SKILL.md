---
name: apify-actor-runtime
description: Test and develop Apify Actors on a local Actor runtime instead of the Apify platform - install it via the Apify CLI, then load its version-matched skill with apify runtime skill. Use when building, running, debugging or testing an Actor locally.
---

# Local Actor runtime

The Actor runtime is a local Apify platform that runs in one container. The standard Apify CLI can point at it, so `apify push`, `apify call` and the other commands run on your machine rather than on the Apify platform. Runs are free, work offline, and by default never touch a real Apify account.

## When to use it

- You created or changed an Actor and want to run it end to end.
- You need to reproduce, debug or iterate on an Actor's behaviour without spending platform compute.
- You want to test the Actor against platform features (storages, builds, runs, events) locally.

Don't use it to host Actors. It is a development tool.

## Prerequisites

- **A container engine that is running**: Docker or Podman. Check with `docker info`.
- **Apify CLI 1.14.0 or later**:

  ```bash
  apify --version
  apify runtime --help
  ```

## Install and start

```bash
apify runtime install
apify runtime start --detach
apify runtime status
```

## Load the runtime's skill (required)

Before doing anything else with the runtime, get its skill:

```bash
apify runtime skill            # print it and read it now
apify runtime skill --install  # install it for future sessions
```

Always run `apify runtime skill` and read its whole output, even if you also run `--install`. Then follow it for the rest of the task.

## Resources

- GitHub: https://github.com/apify/agent-skills
