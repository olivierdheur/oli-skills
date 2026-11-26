---
name: apify-fix-git-connection
description: Repair an Apify Actor's broken Git connection - pushes to GitHub that no longer start a build, builds that fail to clone the repository, or a GitHub integration rejected as invalid or expired (for example after Apify API tokens were revoked). Use when a Git-sourced Actor stopped deploying from its repository.
---

# Fix an Actor's Git connection

A Git-sourced Actor deploys through two links, and each one breaks on its own:

- **Clone**: Apify reads the repository when it builds.
- **Trigger**: a push to the repository starts that build.

Diagnose both links, repair the broken ones, then prove the chain with one push.

## 1. Find the Git version

```bash
apify api GET '/v2/actors/<username>~<actor-name>'
apify api GET '/v2/actors/<username>~<actor-name>/builds?desc=true&limit=5'
```

In `versions`, take the entry with `sourceType: "GIT_REPO"` and note its `versionNumber`, `gitRepoUrl` and `buildTag`.

## 2. Diagnose the clone link

Read the log of the newest build:

```bash
apify api GET '/v2/actor-builds/<buildId>/log'
```

| Log line | Clone link |
|----------|------------|
| `Cloned commit ID: <sha>` | Works |
| `Could not read from remote repository` | Broken |

## 3. Diagnose the trigger link

```bash
gh api repos/<owner>/<repo>/hooks --jq '.[] | {id, active, events, host: (.config.url | split("/")[2])}'
```

An Apify webhook has host `console-backend.apify.com` or `api.apify.com`.

## 4. Repair the clone link

For private repositories:
1. Set Git URL to `git@github.com:<owner>/<repo>.git`
2. Add the deployment key from Apify Console to GitHub

## 5. Repair the trigger link

```bash
apify api PUT '/v2/actors/<username>~<actor-name>/versions/<versionNumber>/build-on-push' -d '{"providerId":"github-app","enabled":true}'
```

## 6. Prove with one push

```bash
git commit --allow-empty -m "Trigger build to test the build webhook"
git push
```

## Resources

- GitHub: https://github.com/apify/agent-skills
