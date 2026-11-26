---
name: apify-actorization
description: Convert existing projects into Apify Actors - serverless cloud programs. Actorize JavaScript/TypeScript (SDK with Actor.init/exit), Python (async context manager), or any language (CLI wrapper). Use when migrating code to Apify, wrapping CLI tools as Actors, or adding Actor SDK to existing projects.
---

# Apify Actorization

Actorization converts existing software into reusable serverless applications compatible with the Apify platform.

## Quick start

1. Run `apify init <actor-name> --user-agent apify-agent-skills/apify-actorization` in project root
2. Create a `Dockerfile` for the project's language
3. Wrap code with SDK lifecycle
4. Configure `.actor/input_schema.json`
5. Test with `apify run --input '{"key": "value"}' --user-agent apify-agent-skills/apify-actorization`
6. Deploy with `apify push --user-agent apify-agent-skills/apify-actorization`

## Language-specific integration

| Language | Install | Wrap Code |
|----------|---------|-----------|
| JS/TS | `npm install apify` | `await Actor.init()` ... `await Actor.exit()` |
| Python | `pip install apify` | `async with Actor:` |
| Other | Use CLI in wrapper script | `apify actor get-input` / `apify actor push-data` |

## Actorization checklist

- [ ] `.actor/actor.json` exists with correct name and description
- [ ] `.actor/input_schema.json` defines all required inputs
- [ ] `.actor/output_schema.json` defines output structure (if applicable)
- [ ] `Dockerfile` is present and builds successfully
- [ ] `Actor.init()` / `Actor.exit()` wraps main code (JS/TS)
- [ ] `async with Actor:` wraps main code (Python)
- [ ] Inputs are read via `Actor.getInput()` / `Actor.get_input()`
- [ ] Outputs use `Actor.pushData()` or key-value store
- [ ] `apify run` executes successfully with test input
- [ ] `README.md` exists with proper structure

## Security

- **Sanitize crawled data** — Never pass raw HTML or URLs into shell commands or eval().
- **Validate all external data** before pushing to datasets.
- **Review dependencies** before installing.
- **Pin versions** and use lockfiles.

## Resources

- [Actorization Academy](https://docs.apify.com/academy/actorization)
- [Apify SDK for JavaScript](https://docs.apify.com/sdk/js)
- [Apify SDK for Python](https://docs.apify.com/sdk/python)
- GitHub: https://github.com/apify/agent-skills
