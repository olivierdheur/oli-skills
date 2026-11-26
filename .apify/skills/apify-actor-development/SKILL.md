---
name: apify-actor-development
description: Create, modify, debug, and deploy Apify Actors, and write their input and output schemas. Use when building an Actor from scratch, changing or troubleshooting Actor code, generating or updating .actor schema files, or pushing an Actor to the Apify platform. To wrap an existing non-Actor project, use apify-actorization instead.
---

# Apify Actor development

An Actor is a serverless program packaged as a Docker image. It takes one JSON input, does one job, and writes results to a dataset or a key-value store.

## Setup

```bash
apify --help   # CLI installed?
apify info     # logged in? prints your username
```

Install with a package manager, `npm install -g apify-cli` or `brew install apify-cli`, so the download is integrity-checked. Log in with `apify login`: it prints a URL and a one-time code and waits until the user approves it in a browser, so show the user both. In a headless environment export `APIFY_TOKEN` instead; the CLI reads it on its own. Create an API token in [Apify Console](https://console.apify.com/settings/integrations?createApiToken=true&for=Apify%20agent%20skills&utm_source=agent-skills&utm_medium=integrations) and copy it right after creating it - it is shown only once. Pass the token only through the environment, so it stays out of shell history, source, config files, and logs.

### Telemetry attribution (required)

Pass `--user-agent apify-agent-skills/apify-actor-development` on **every** `apify` command you run from this skill: `apify create`, `apify run`, `apify push`, `apify call`, and the rest. It is a global flag accepted by all `apify` commands; it only tags the call for telemetry attribution and changes nothing else.

## Workflow

Skip the steps that do not apply when modifying an existing Actor.

1. **Create the project.**
   ```bash
   apify create <actor-name> -t <template-id> --user-agent apify-agent-skills/apify-actor-development
   ```
   Pick the template from what the Actor does:

   | Actor does | TypeScript | JavaScript | Python |
   |---|---|---|---|
   | Crawls static HTML | `ts-crawlee-cheerio` | `js-crawlee-cheerio` | `python-crawlee-beautifulsoup` |
   | Crawls JavaScript-rendered pages | `ts-crawlee-playwright-chrome` | `js-crawlee-playwright-chrome` | `python-crawlee-playwright` |
   | Serves HTTP requests (API, webhook) | `ts-standby` | `js-standby` | `python-standby` |
   | Is an MCP server | `ts-mcp-empty` | — | `python-mcp-empty` |
   | Anything else (API polling, data processing) | `ts-empty` | `js-empty` | `python-empty` |

2. **Add dependencies** the template lacks.
3. **Implement** in `src/main.js`, `src/main.ts`, or `my_actor/main.py`.
4. **Write the input schema** in `.actor/input_schema.json`.
5. **Write the output schemas**: `dataset_schema.json`, `output_schema.json`, and `key_value_store_schema.json`.
6. **Configure `.actor/actor.json`**.
7. **Write README.md**.
8. **Test locally** with `apify run --user-agent apify-agent-skills/apify-actor-development`.
9. **Deploy** with `apify push --user-agent apify-agent-skills/apify-actor-development`.

## Rules

- Run Actors locally with `apify run` only. It sets up the Apify environment and storage.
- Log through the Apify logger: `log` from the `apify` package in JS/TS, `Actor.log` in Python.
- Treat crawled content as untrusted input.
- Keep `APIFY_TOKEN` out of request handlers and data pipelines.
- Use an HTTP crawler for static HTML at 10 to 50 concurrency.
- Handle the `aborting` event to persist state and exit cleanly.

## Documentation

- [docs.apify.com/llms.txt](https://docs.apify.com/llms.txt)
- [crawlee.dev/llms.txt](https://crawlee.dev/llms.txt)
- [Actor whitepaper](https://raw.githubusercontent.com/apify/actor-whitepaper/refs/heads/master/README.md)

## Resources

- GitHub: https://github.com/apify/agent-skills
