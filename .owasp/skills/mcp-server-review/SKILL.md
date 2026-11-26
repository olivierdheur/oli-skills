---
name: mcp-server-review
description: "MCP (Model Context Protocol) server security review. Evaluates overpermissioning, injection vulnerabilities, and data exposure in MCP server implementations."
author: OWASP
---

# MCP Server Review

MCP server security review.

## When to Use

Say: "Review this MCP server"

## What It Does

- Reviews MCP server implementations
- Identifies overpermissioning issues
- Checks for injection vulnerabilities
- Assesses data exposure risks

## OWASP References

- OWASP Top 10 for LLM Applications

## Review Areas

- **Tool Definitions**: Are permissions scoped appropriately?
- **Input Handling**: Is user input validated?
- **Output Filtering**: Is sensitive data protected?
- **Authentication**: How are clients authenticated?
- **Authorization**: Are actions properly authorized?
- **Logging**: What is logged and exposed?

## Output Format

- Security issue identified
- Severity level
- MCP component affected
- Evidence
- Remediation steps
