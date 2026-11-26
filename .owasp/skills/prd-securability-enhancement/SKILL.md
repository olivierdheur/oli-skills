---
name: prd-securability-enhancement
description: "Harden PRDs and specs with ASVS coverage and FIASSE SSEM requirements before code is written. Shift security left to the requirements phase."
author: OWASP
---

# PRD Securability Enhancement

Harden PRDs/specs with ASVS coverage and FIASSE requirements.

## When to Use

Say: "Harden this PRD" or "Map features to ASVS"

## What It Does

- Reviews product requirements documents
- Maps features to ASVS security requirements
- Adds FIASSE securability requirements
- Ensures security is designed in, not bolted on

## OWASP References

- OWASP ASVS v5.0
- OWASP FIASSE v1.0.4

## Process

1. Parse PRD/specification
2. Identify security-sensitive features
3. Map to relevant ASVS requirements
4. Add SSEM securability attributes
5. Output enhanced specification

## Output Format

- Original requirement
- Mapped ASVS requirements
- Security acceptance criteria
- SSEM attribute requirements
- Risk considerations
