---
name: mobile-code-review
description: "Native Android/iOS source review against OWASP MASVS v2.1.0. Mobile application security verification covering storage, crypto, authentication, network, platform, and code quality."
author: OWASP
---

# Mobile Code Review

Native Android/iOS source code review against OWASP MASVS v2.1.0.

## When to Use

Say: "Review this mobile app for security"

## What It Does

- Reviews native Android and iOS source code
- Assesses against OWASP MASVS requirements
- Checks secure storage, authentication, networking
- Identifies platform-specific vulnerabilities

## OWASP References

- OWASP MASVS v2.1.0 (Mobile Application Security Verification Standard)
  - MASVS-STORAGE: Secure Storage
  - MASVS-CRYPTO: Cryptography
  - MASVS-AUTH: Authentication and Authorization
  - MASVS-NETWORK: Network Communication
  - MASVS-PLATFORM: Platform Interaction
  - MASVS-CODE: Code Quality
  - MASVS-RESILIENCE: Anti-Tampering

## Output Format

- MASVS category
- Requirement ID
- Finding severity
- Evidence from source
- Remediation guidance
