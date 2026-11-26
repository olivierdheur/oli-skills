---
name: code-review-security
description: "Security code review mapped to OWASP Top 10 and ASVS. Systematically tests every vulnerability class, produces findings with CWE mappings, OpenCRE cross-references, evidence snippets, and specific remediation code."
author: OWASP
---

# Security Code Review

Systematic security code review mapped to OWASP Top 10 and ASVS.

## When to Use

Say: "Review this code for security issues"

## What It Does

- Performs systematic security code review
- Maps findings to OWASP Top 10 categories
- Cross-references with ASVS requirements
- Produces structured findings with:
  - CWE mappings
  - OpenCRE cross-references
  - Evidence snippets
  - Specific remediation code

## OWASP References

- OWASP Top 10
- OWASP ASVS (Application Security Verification Standard)

## Output Format

Each finding includes:
- Severity (CRITICAL, HIGH, MEDIUM, LOW)
- CWE identifier
- OpenCRE link
- Location in code
- Impact assessment
- Evidence snippet
- Remediation with code example
- Confidence level
