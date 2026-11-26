---
name: Dread Ledger - Security Logging
description: Add security logging to applications in verified waves - 90 security events, 9 workflow prompts
---

# Dread Ledger - Security Logging for AI Agents

> "Leave the evidence. Bury the secrets."

Add security logging to existing applications in small, verified waves.

**Source**: [jmanico/dread-ledger](https://github.com/jmanico/dread-ledger) (41 stars)
**Author**: Jim Manico (OWASP, Manicode Security)

## Workflow Overview

1. **Assess** — Inventory code, controls, consumers, evidence gaps
2. **Foundation** — Safe schema, logger integration, privacy, bounded delivery
3. **Critical** — Privileged actions, sensitive operations, monitoring tampering
4. **High** — Authentication, authorization, recovery, sessions
5. **Medium** — Validation, abuse controls, uploads, workflow failures
6. **Context** — Useful lifecycle and investigation context
7. **Verify** — Adversarial tests, consumer checks, canary and rollback
8. **Repair** — Fix logs that leak data, inject records, or exhaust resources
9. **Change Review** — Review diffs for lost coverage or schema drift

## Wave Priority

Wave priority reflects **consequences of a coverage gap**, not logger level:

| Wave | Priority | Focus |
|------|----------|-------|
| 0 | Foundation | Schema, integration, privacy |
| 1 | Critical | Privileged actions, tampering |
| 2 | High | Auth, authz, sessions |
| 3 | Medium | Validation, abuse, uploads |
| 4 | Context | Lifecycle, investigation |

**Always establish foundation first**, then reorder waves for your application's risks.

## Prompts

### 00. Shared Instruction

Include with every prompt:

```text
Add security logging to this application following the Dread Ledger methodology.
Work in small, verified waves. Preserve existing functionality and avoid logging
sensitive data (passwords, tokens, PII). Use the application's existing logging
infrastructure where available. Each change must be verifiable before proceeding
to the next wave.
```

### 01. Assess

```text
Inventory this application's:
- Existing logging infrastructure and configuration
- Security-relevant code paths and controls
- Current security event coverage
- Log consumers (SIEM, monitoring, alerting)
- Evidence gaps and privacy concerns

Review all 90 security event categories. Identify which are applicable,
which are already covered, and which need implementation. Produce a
prioritized implementation plan organized by wave.
```

### 02. Foundation (Wave 0)

```text
Establish the security logging foundation:
- Define a safe, consistent event schema
- Integrate with existing logger infrastructure
- Implement privacy controls (no secrets, PII handling)
- Set up bounded delivery (rate limiting, size limits)
- Create the security event ledger for tracking coverage

Verify the foundation works correctly before proceeding.
```

### 03. Critical Gaps (Wave 1)

```text
Implement logging for critical security events:
- Privileged action execution (admin operations, config changes)
- Sensitive data operations (encryption, key usage, secrets access)
- Monitoring and audit tampering attempts
- Security control bypass attempts
- Emergency/break-glass access

Each event must include: timestamp, actor, action, target, outcome, context.
Verify each addition before proceeding.
```

### 04. High Gaps (Wave 2)

```text
Implement logging for high-priority security events:
- Authentication (login success/failure, MFA, password changes)
- Authorization (access granted/denied, permission changes)
- Session management (creation, termination, hijacking attempts)
- Account recovery (password reset, account unlock)
- Identity changes (email, phone, profile updates)

Verify each addition and check for sensitive data leakage.
```

### 05. Medium Gaps (Wave 3)

```text
Implement logging for medium-priority security events:
- Input validation failures (injection attempts, malformed data)
- Abuse controls (rate limiting, CAPTCHA triggers)
- File operations (uploads, downloads, deletions)
- Workflow failures (transaction rollbacks, state conflicts)
- Integration failures (API errors, service unavailability)

Verify coverage and ensure no duplicate events.
```

### 06. Context (Wave 4)

```text
Implement logging for investigation context:
- Application lifecycle (startup, shutdown, deployment)
- Configuration changes (feature flags, settings)
- Resource utilization (connection pools, cache, queues)
- Scheduled job execution
- Health check and monitoring events

Balance verbosity against storage and performance.
```

### 07. Verify and Roll Out

```text
Perform verification:
- Adversarial testing (can events be forged, suppressed, flooded?)
- Consumer validation (do SIEM rules and alerts work?)
- Privacy audit (no secrets or excessive PII in logs?)
- Performance testing (logging overhead acceptable?)
- Canary deployment plan
- Rollback procedure

Document verification results and any checks not completed.
```

### 08. Repair

```text
Review existing logs for security issues:
- Data leakage (passwords, tokens, PII, secrets)
- Injection vulnerabilities (log forging, CRLF injection)
- Resource exhaustion (unbounded logging, missing rate limits)
- Missing context (events without actor, timestamp, or outcome)

Fix issues while preserving legitimate logging functionality.
```

### 09. Change Review

```text
Review the diff for security logging impact:
- Lost coverage (removed events, changed paths)
- Schema drift (inconsistent field names, missing context)
- New security-relevant paths without events
- Privacy regressions (newly logged sensitive data)

Update the security event ledger with changes.
```

## 90 Security Event Categories

### Identity & Access (20 events)
- Login success/failure
- Logout
- MFA enrollment/verification/failure
- Password change/reset
- Account creation/deletion/lock/unlock
- Session creation/termination/timeout
- Permission grant/revoke
- Role assignment/removal
- API key creation/revocation
- Token refresh/revocation

### Data Operations (15 events)
- Sensitive data access
- Data export
- Data deletion
- Encryption/decryption operations
- Key rotation
- Secret access
- PII access
- Bulk data operations
- Data classification change
- Retention policy execution

### Authorization (12 events)
- Access granted/denied
- Privilege escalation attempt
- Cross-tenant access attempt
- Resource ownership change
- Sharing permission change
- Policy evaluation
- Consent grant/revoke
- Delegation
- Impersonation start/end

### Security Controls (15 events)
- Rate limit triggered
- CAPTCHA triggered
- Fraud detection alert
- Anomaly detected
- Security scan result
- Vulnerability detected
- Patch applied
- Security config change
- WAF/firewall action
- DDoS mitigation

### Audit & Compliance (10 events)
- Audit log access
- Compliance check
- Policy violation
- Data retention action
- Legal hold
- Export for discovery
- Consent record
- Privacy request (GDPR/CCPA)
- Audit trail tamper attempt

### Infrastructure (10 events)
- Service start/stop
- Deployment
- Config change
- Certificate rotation
- DNS change
- Network policy change
- Backup/restore
- Failover
- Scale event

### Integration (8 events)
- External API call
- Webhook delivery
- SSO/federation event
- Third-party data sync
- Payment processing
- Email/SMS delivery
- File transfer
- Cloud service action

## Event Schema

```json
{
  "timestamp": "2026-11-26T10:47:00Z",
  "event_type": "authentication.login.success",
  "actor": {
    "id": "user-123",
    "type": "user",
    "ip": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  },
  "action": "login",
  "target": {
    "type": "account",
    "id": "account-456"
  },
  "outcome": "success",
  "context": {
    "mfa_used": true,
    "session_id": "sess-789",
    "request_id": "req-abc"
  },
  "metadata": {
    "service": "auth-service",
    "version": "1.2.3",
    "environment": "production"
  }
}
```

## Privacy Rules

### Never Log
- Passwords (even hashed)
- API keys, tokens, secrets
- Full credit card numbers
- Social security numbers
- Raw PII without purpose

### Log Carefully
- Email addresses (may need masking)
- IP addresses (retention limits)
- User agents (can be fingerprinting)
- Request bodies (redact sensitive fields)

### Always Include
- Timestamp (UTC, ISO 8601)
- Actor identification
- Action performed
- Target affected
- Outcome (success/failure)
- Request correlation ID

## Best Practices

1. **Foundation first** — Schema and privacy before events
2. **Wave by wave** — Verify each wave before next
3. **No secrets** — Audit every new log statement
4. **Bounded delivery** — Rate limits prevent log flooding
5. **Consumer-aware** — Test SIEM rules and alerts
6. **Change tracking** — Review diffs for coverage loss
