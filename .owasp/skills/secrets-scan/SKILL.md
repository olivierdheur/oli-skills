---
name: secrets-scan
description: "Detect hardcoded credentials and API keys. Scans codebase for hardcoded secrets, API keys, tokens, and other sensitive credentials."
author: OWASP
---

# Secrets Scan

Detect hardcoded credentials and API keys.

## When to Use

Say: "Scan for hardcoded secrets"

## What It Does

- Scans codebase for hardcoded credentials
- Detects API keys, tokens, passwords
- Identifies sensitive configuration values
- Checks for exposed secrets in git history

## OWASP References

- CWE-798: Use of Hard-coded Credentials
- A02:2021 - Cryptographic Failures

## Tools Used

- TruffleHog
- gitleaks
- detect-secrets

## Output Format

- Secret type detected
- File location and line number
- Confidence level
- Remediation steps (rotation, vault usage)
