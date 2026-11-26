---
name: apify-integration-development
description: Design and build an official Apify integration for a company's product - workflow-automation apps (Zapier/n8n-style), AI agent plugins (coding-agent skills+MCP bundles or OpenClaw/Hermes-style harnesses), AI framework packages (LangChain/LlamaIndex-style), or direct application clients via apify-client. Use when planning, creating, or reviewing an integration that exposes Apify Actors, runs, datasets, or key-value stores inside another product.
---

# Apify Integration Development

Design and build an **official Apify integration** for a company's product, with minimal help from Apify.

## Integration Shapes

| Product shape | Examples |
|---|---|
| Workflow automation platform | Zapier, n8n, Make, Pipedream, Activepieces |
| AI agent plugin (coding agent or harness) | Cursor, Claude Code, Codex, GitHub Copilot |
| AI framework package | LangChain, LlamaIndex, Haystack, Vercel AI SDK |
| Application integration (direct client) | Backend services calling Actors via `apify-client` |

## Cross-cutting Design Rules

### Vocabulary mirroring
Model the integration's resources on Apify's domain (Actor / Run / Dataset / KV Store / Task).

### Asynchronous run flow
Actors can run for seconds to hours. Use the asynchronous flow:

```
POST /v2/actors/{actorId}/runs            -> start, return runId
GET  /v2/actor-runs/{runId}               -> poll until terminal status
GET  /v2/datasets/{datasetId}/items       -> fetch results on SUCCEEDED
```

### Cost is first-class
Every path that starts a run must expose a cost control (`maxTotalChargeUsd`, `maxItems`).

### Attribution headers
Stamp on every request: `x-apify-integration-platform: <your-platform>`

### Authentication
- Browser/consumer-facing: OAuth2 with PKCE
- Headless/server/CI: API token as `Authorization: Bearer <APIFY_TOKEN>`

## Minimal API surface

| Purpose | Method + path |
|---|---|
| Start an Actor run | `POST /v2/actors/{actorId}/runs` |
| Start a Task run | `POST /v2/actor-tasks/{taskId}/runs` |
| Poll a run | `GET /v2/actor-runs/{runId}` |
| Dataset items | `GET /v2/datasets/{datasetId}/items` |
| KV record | `GET /v2/key-value-stores/{storeId}/records/{key}` |
| Webhook CRUD | `POST/GET/DELETE /v2/webhooks` |
| Web Fetch (Server Actor) | `POST https://web-fetch.apify.actor/` |

## Anti-patterns to avoid

1. Retrying `POST /runs` on network error - duplicates billed runs
2. Unbounded `while (true)` polling
3. Putting cost caps inside Actor input instead of options
4. Dumping full datasets into LLM context without size caps

## Resources

- REST reference: https://docs.apify.com/api/v2
- OpenAPI spec: https://apify.com/openapi.json
- Contact: integrations@apify.com
- GitHub: https://github.com/apify/agent-skills
