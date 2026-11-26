---
name: security-guidance
description: "Auto-triggered ASVS guidance for security-sensitive code. Provides proactive security guidance while writing code that handles authentication, authorization, cryptography, etc."
author: OWASP
---

# Security Guidance

Auto-triggered ASVS guidance for security-sensitive code.

## When to Use

Automatically triggered when writing security-sensitive code.

## What It Does

- Monitors code being written
- Triggers for security-sensitive patterns
- Provides ASVS-based guidance
- Suggests secure implementation patterns

## OWASP References

- OWASP ASVS v5.0

## Trigger Patterns

- Authentication code
- Authorization checks
- Cryptographic operations
- Input validation
- Session management
- Database queries
- File operations
- API calls

## Output

- Relevant ASVS requirement
- Secure coding pattern
- Example implementation
- Common pitfalls to avoid
