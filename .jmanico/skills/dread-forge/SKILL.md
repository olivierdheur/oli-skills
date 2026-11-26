---
name: Dread Forge - Secure Development Workflow
description: 13 prompts for building secure software with AI coding agents - requirements to deployment
---

# Dread Forge - Secure Development Workflow

> "From rough notes to reviewed specs and working code."

13 prompts for building web applications with AI coding agents, with security built into the workflow.

**Source**: [jmanico/dread-forge](https://github.com/jmanico/dread-forge) (9 stars)
**Author**: Jim Manico (OWASP, Manicode Security)

## Overview

Dread Forge takes you from project notes to production code:

1. **Requirements** → Design → Architecture → Security Rules → Threat Model → Code → Verify

Each step creates files that later steps read, so work carries across agent sessions.

## Related Projects

Dread Forge integrates these security tools:

| Project | Used In |
|---------|---------|
| [Grim Prompter](https://github.com/jmanico/grim-prompter) | Step 08 - Threat modeling |
| [Dread Ledger](https://github.com/jmanico/dread-ledger) | Steps 05, 12 - Security logging |
| [Trim Reaper](https://github.com/jmanico/trim-reaper) | Steps 06, 13 - Dependency management |

## Setup

```bash
# Clone all four projects
git clone https://github.com/jmanico/dread-forge.git
git clone https://github.com/jmanico/grim-prompter.git
git clone https://github.com/jmanico/dread-ledger.git
git clone https://github.com/jmanico/trim-reaper.git
```

Keep these outside your application repository.

## The 13 Steps

### Phase 1: Planning

#### 01. Requirements

```text
Read my project notes below and produce a structured requirements document.

<<PROJECT_NOTES>>
(Paste your rough notes, ideas, user stories here)

Interview me about unclear requirements. Produce:
- Functional requirements (what the system does)
- Non-functional requirements (performance, scale, availability)
- Security requirements (auth, authz, data protection)
- Compliance requirements (GDPR, PCI, HIPAA if applicable)
- Out of scope items

Save to: specs/01-requirements.md
```

#### 02. Design

```text
Read specs/01-requirements.md and produce a design document.

Cover:
- User journeys and workflows
- Data model and relationships
- API contracts (inputs, outputs, errors)
- UI/UX considerations
- Integration points

Interview me about design decisions. Save to: specs/02-design.md
```

#### 03. Architecture

```text
Read specs/01-requirements.md and specs/02-design.md.
Produce an architecture document.

Cover:
- System components and responsibilities
- Technology stack choices with rationale
- Deployment architecture
- Data flow diagrams
- Infrastructure requirements
- Scalability approach

Interview me about architecture decisions. Save to: specs/03-architecture.md
```

### Phase 2: Security Planning

#### 04. Security Requirements

```text
Read all specs/*.md files. Produce security requirements.

Cover:
- Authentication requirements (methods, MFA, session management)
- Authorization model (RBAC, ABAC, permissions)
- Data classification and protection
- Input validation requirements
- Output encoding requirements
- Cryptography requirements
- Audit and logging requirements
- Security headers and transport

Reference OWASP ASVS for completeness. Save to: specs/04-security-requirements.md
```

#### 05. Security Event Planning

```text
Read all specs/*.md files and ~/dread-ledger/reference/security-events.md.

Plan security logging:
- Which of the 90 event categories apply?
- Event schema for this application
- Privacy considerations
- Log consumers and alerting needs
- Implementation waves

Save to: specs/05-security-events.md
```

#### 06. Dependency Policy

```text
Read all specs/*.md files and ~/trim-reaper/readme.md.

Produce a dependency policy:
- Approved categories of dependencies
- Evaluation criteria for new dependencies
- Security requirements for dependencies
- Update and patching policy
- License compatibility requirements

Save to: specs/06-dependency-policy.md
```

#### 07. Security Rules

```text
Read all specs/*.md files. Produce secure coding rules for this stack.

For each rule:
- What to do (secure pattern)
- What not to do (insecure pattern)
- Code examples
- Verification approach

Cover:
- Input validation
- Output encoding
- Authentication
- Session management
- Access control
- Cryptography
- Error handling
- Logging (without secrets)
- File handling
- Database access

Save to: specs/07-security-rules.md
```

### Phase 3: Threat Analysis

#### 08. Threat Model

```text
Read all specs/*.md files and ~/grim-prompter/runbook.md.

Perform threat modeling:
- Identify assets and trust boundaries
- Apply STRIDE to each component
- Document threats with evidence
- Propose mitigations
- Create verification plans

Follow Grim Prompter methodology. Save to: threat-model/
```

### Phase 4: Implementation

#### 09. GitHub Issues

```text
Read all specs/*.md files and threat-model/*.md.

Create GitHub issues for implementation:
- Break work into implementable chunks
- Include acceptance criteria
- Reference relevant specs and security rules
- Label by priority and type
- Create dependencies between issues

Use GitHub API to create issues.
```

#### 10. Implementation

```text
Read all specs/*.md files, specs/07-security-rules.md, and the assigned issue.

Implement the feature:
- Follow the security rules exactly
- Include input validation
- Include output encoding
- Include error handling
- Include security logging (per specs/05-security-events.md)
- Write tests

Reference the issue number in commits.
```

### Phase 5: Verification

#### 11. Security Testing

```text
Read specs/07-security-rules.md and the implementation.

Perform security testing:
- Input validation bypass attempts
- Authentication/authorization testing
- Injection testing (SQL, XSS, command)
- Session management testing
- Error handling testing
- Security header verification

Document findings and fixes.
```

#### 12. Logging Verification

```text
Read specs/05-security-events.md and ~/dread-ledger/prompts/07-verify-and-rollout.md.

Verify security logging:
- All planned events implemented?
- No sensitive data in logs?
- Schema consistency?
- Consumer integration working?
- Adversarial testing passed?

Document verification results.
```

#### 13. Dependency Review

```text
Read specs/06-dependency-policy.md and ~/trim-reaper/readme.md.

Review dependencies:
- Do all dependencies meet policy?
- Any unused dependencies?
- Any with known vulnerabilities?
- Any with concerning maintenance status?
- Transitive dependency audit

Document review and any removals.
```

## File Structure

```
your-project/
├── specs/
│   ├── 01-requirements.md
│   ├── 02-design.md
│   ├── 03-architecture.md
│   ├── 04-security-requirements.md
│   ├── 05-security-events.md
│   ├── 06-dependency-policy.md
│   └── 07-security-rules.md
├── threat-model/
│   ├── SYSTEM_UNDER_REVIEW.md
│   ├── report.md
│   └── *.json
└── src/
    └── (your code)
```

## Workflow Tips

1. **Sequential steps** — Each step reads previous outputs
2. **Interview mode** — Let the agent ask clarifying questions
3. **Cross-session** — Files persist across agent sessions
4. **Security integrated** — Not bolted on at the end
5. **Evidence-based** — Threat model traces to code
6. **Verifiable** — Each step has verification criteria

## When to Use

- **New projects** — Start from step 01
- **Existing projects** — Start from step 04 (security requirements)
- **Adding features** — Start from step 09 (issues) with existing specs
- **Security review** — Start from step 08 (threat model)

## Best Practices

1. **Don't skip steps** — Security comes from the process
2. **Keep specs updated** — They're living documents
3. **Review outputs** — Agent output needs human validation
4. **Version control specs** — Track changes over time
5. **Reference in code** — Link implementations to requirements
