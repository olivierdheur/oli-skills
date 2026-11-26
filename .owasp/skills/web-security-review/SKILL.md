---
name: web-security-review
description: "Web app review against OWASP Top 10 (2021). Comprehensive web application security assessment covering injection, authentication, access control, and more."
author: OWASP
---

# Web Security Review

Web app review against OWASP Top 10 (2021).

## When to Use

Say: "Review this web app for OWASP Top 10"

## What It Does

- Reviews web application code for security vulnerabilities
- Checks against all OWASP Top 10 categories
- Identifies injection, XSS, CSRF vulnerabilities
- Assesses authentication and session management

## OWASP References

- OWASP Top 10 (2021)
  - A01: Broken Access Control
  - A02: Cryptographic Failures
  - A03: Injection
  - A04: Insecure Design
  - A05: Security Misconfiguration
  - A06: Vulnerable and Outdated Components
  - A07: Identification and Authentication Failures
  - A08: Software and Data Integrity Failures
  - A09: Security Logging and Monitoring Failures
  - A10: Server-Side Request Forgery

## Output Format

- Vulnerability category (A01-A10)
- Severity and impact
- Code location
- Evidence
- Remediation with code examples
