---
name: securability-engineering-review
description: "Assess code securability with 0-10 SSEM scoring using OWASP FIASSE v1.0.4 framework. Evaluates maintainability, trustworthiness, reliability, and transparency."
author: OWASP
---

# Securability Engineering Review

Assess code securability (0-10 SSEM scoring).

## When to Use

Say: "Assess the securability of this code"

## What It Does

- Scores code on 0-10 SSEM scale
- Evaluates four securability dimensions
- Identifies areas for improvement
- Provides actionable recommendations

## OWASP References

- OWASP FIASSE v1.0.4
- SSEM (Secure Software Engineering Metrics)

## Scoring Dimensions

- **Maintainability** (0-10): How easy is the code to update securely?
- **Trustworthiness** (0-10): Does the code behave predictably?
- **Reliability** (0-10): How well does it handle failures?
- **Transparency** (0-10): Is the logic clear and auditable?

## Output Format

- Overall SSEM score (0-10)
- Per-dimension scores
- Strengths identified
- Areas for improvement
- Specific recommendations
