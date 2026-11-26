---
name: agent-security-audit
description: "Audit AI agent permissions, prompt injection surfaces, data exfiltration paths, and guardrails against OWASP LLM Top 10."
author: OWASP
---

# Agent Security Audit

Audit agent permissions, injection surfaces, data exfil paths.

## When to Use

Say: "Audit this agent's security"

## What It Does

- Audits agent tool permissions
- Identifies prompt injection surfaces
- Maps data exfiltration paths
- Evaluates guardrails effectiveness
- Assesses agent autonomy risks

## OWASP References

- OWASP Top 10 for LLM Applications
- OWASP Agentic Security Initiative

## Audit Areas

- **Permissions**: What can the agent access?
- **Injection**: Where can prompts be manipulated?
- **Exfiltration**: How could data leave the system?
- **Guardrails**: What controls are in place?
- **Autonomy**: What decisions can agent make alone?

## Output Format

- Risk category
- Severity assessment
- Attack vector description
- Evidence
- Mitigation recommendations
