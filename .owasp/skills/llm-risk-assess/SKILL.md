---
name: llm-risk-assess
description: "LLM application assessment against OWASP Top 10 for LLM Applications 2025. Comprehensive risk assessment for applications using large language models."
author: OWASP
---

# LLM Risk Assessment

Assess LLM applications against OWASP LLM Top 10 2025.

## When to Use

Say: "Assess LLM risks for this app"

## What It Does

- Assesses LLM application against all Top 10 categories
- Identifies prompt injection vulnerabilities
- Evaluates data handling risks
- Reviews model access controls

## OWASP References

- OWASP Top 10 for LLM Applications 2025
  - LLM01: Prompt Injection
  - LLM02: Insecure Output Handling
  - LLM03: Training Data Poisoning
  - LLM04: Model Denial of Service
  - LLM05: Supply-Chain Vulnerabilities
  - LLM06: Sensitive Information Disclosure
  - LLM07: Insecure Plugin Design
  - LLM08: Excessive Agency
  - LLM09: Overreliance
  - LLM10: Model Theft

## Output Format

- Risk category (LLM01-LLM10)
- Risk level
- Attack scenario
- Evidence from application
- Mitigation recommendations
