---
name: sca-audit
description: "Dependency CVE scanning with reachability analysis. Scans dependencies for known vulnerabilities with reachability assessment to determine exploitability."
author: OWASP
---

# Software Composition Analysis Audit

Dependency CVE scanning with reachability analysis.

## When to Use

Say: "Scan my dependencies for CVEs"

## What It Does

- Scans all project dependencies
- Identifies known CVEs
- Performs reachability analysis to assess exploitability
- Prioritizes findings based on actual risk

## OWASP References

- A06:2021 - Vulnerable and Outdated Components

## Tools Used

- OSV Scanner
- Trivy
- npm audit / pip audit / etc.

## Output Format

- CVE identifier
- Affected package and version
- Fixed version (if available)
- Reachability status
- Severity and CVSS score
- Recommended remediation
