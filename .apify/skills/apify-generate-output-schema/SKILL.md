---
name: apify-generate-output-schema
description: Deprecated. Output schema generation moved to the apify-actor-development skill; prefer that skill whenever it is available.
metadata:
  deprecated: "true"
---

# Deprecated: use apify-actor-development

This skill is deprecated and will be removed in a future release. Generating and updating Actor output schemas (`dataset_schema.json`, `output_schema.json`, `key_value_store_schema.json`) is now part of the `apify-actor-development` skill.

- If the `apify-actor-development` skill is available, load it and follow its `references/output-schemas.md`.
- If it is not available, tell the user this skill is deprecated and help them install `apify-actor-development` from `https://github.com/apify/agent-skills`.

## Resources

- GitHub: https://github.com/apify/agent-skills
