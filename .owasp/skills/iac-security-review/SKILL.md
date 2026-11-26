---
name: iac-security-review
description: "Infrastructure as Code security review for Terraform, Kubernetes, and CloudFormation against CIS benchmarks and cloud security best practices."
author: OWASP
---

# IaC Security Review

Review Terraform, Kubernetes, CloudFormation against CIS benchmarks.

## When to Use

Say: "Review this Terraform for security"

## What It Does

- Reviews Infrastructure as Code configurations
- Checks against CIS benchmarks
- Validates cloud security best practices
- Identifies misconfigurations and exposed resources

## Supported IaC

- Terraform
- Kubernetes manifests
- CloudFormation templates
- Helm charts
- Docker Compose

## References

- CIS Benchmarks (AWS, Azure, GCP, Kubernetes)
- Cloud provider security best practices

## Output Format

- Resource affected
- Misconfiguration type
- CIS benchmark reference
- Risk assessment
- Remediation with corrected configuration
