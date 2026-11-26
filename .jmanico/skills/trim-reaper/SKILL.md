---
name: Trim Reaper - Dependency Reduction
description: Remove unnecessary dependencies safely - library policy and 8 reduction prompts for AI coding agents
---

# Trim Reaper - Dependency Reduction for AI Agents

Remove unnecessary dependencies while preserving behavior and security.

**Source**: [jmanico/trim-reaper](https://github.com/jmanico/trim-reaper) (65 stars)
**Author**: Jim Manico (OWASP, Manicode Security)

## The Philosophy

> "Third party libraries must all die."
> Keep libraries that earn their place through correctness, security, or maintenance value.

Removing a dependency reduces supply-chain exposure, but replacing it with local code transfers maintenance responsibility to your project.

## Library Policy for AGENTS.md

Add this to your project's `AGENTS.md`:

```markdown
## Third-party libraries

- Minimize third-party dependencies to reduce ongoing updates and maintenance. Prefer the standard library, supported platform APIs, or functionality already available in the project when they meet the requirements.

- Add a library only when its benefits justify its ongoing maintenance, security, and upgrade costs. For simple, narrowly scoped functionality, consider a small local implementation when it is easier to maintain and verify.

- For security-sensitive functionality, especially cryptography, authentication, and complex parsing, use or retain established libraries or vetted platform APIs rather than hand-rolling replacements.

- Inspect the resolved transitive dependency tree before adding or upgrading a library. Prefer suitable options with fewer transitive dependencies.

- Before adding or upgrading a library, verify the exact package name and publisher against the project's own documentation or repository, and check its registry entry live. Do not trust registry metadata alone. Never select package names or versions from model memory.

- Use the latest stable, supported release compatible with the project. Scrutinize very recent releases and unexpected maintainer changes.

- Check current security advisories from official sources and relevant advisory databases. Avoid versions with known applicable vulnerabilities.

- Assess maintenance through support status, unresolved issues, security responsiveness, and compatibility with supported runtimes.
```

## 8 Reduction Prompts

### Shared Instruction (Use First)

```text
Reduce this project's dependencies while preserving behavior, error handling,
security, public API and downstream consumer compatibility, and supported runtimes.
Follow the project's contributor instructions and use its existing toolchain and
package manager. Work in small, reviewable changes and preserve unrelated work.
Establish the build and test baseline before editing; if required checks fail or
cannot run, report the blocker and stop changes.

Investigate uncertain usage rather than guessing. Verify each change; undo
your candidate changes if verification fails or cannot be completed. Do not weaken
tests or security controls to make a removal pass.

Retain specialized libraries when replacing them would introduce security, correctness,
or maintenance risk, especially cryptography, authentication, and complex parsing.
```

### 1. Remove Unused Dependencies

```text
Establish the current build and test baseline. Find and remove confirmed unused
dependencies. Check application code, dynamic loading, plugins, configuration,
scripts, tests, and build/deployment tooling. Treat scanner results as candidates to
investigate. Prune newly orphaned transitive dependencies through the package manager.
Verify the changes and report what was removed.
```

### 2. Use the Standard Library

```text
Find dependencies whose used functionality can be replaced directly by the language's
standard library or supported platform APIs. Implement those replacements, preserving
behavior, error handling, security, and runtime compatibility. Verify relevant edge cases.
Remove each dependency once all its uses have been replaced.
```

### 3. Replace Small, Simple Functionality

```text
Find dependencies used only for simple, narrowly scoped functionality that we can
maintain in a small, straightforward module. Implement replacements with focused tests
for required behavior and edge cases. Judge simplicity by correctness and maintenance
burden, not just line count. Defer replacements that reveal substantial complexity.
```

### 4. Consolidate Overlapping Libraries

```text
Identify libraries providing overlapping capabilities. Where practical, standardize on
supported APIs from a library this project already requires, then remove redundant
dependencies. Preserve behavior and avoid significant new coupling. Explain why each
retained library is the better fit for the remaining requirements.
```

### 5. Reduce Transitive Overhead

```text
Find dependencies that introduce large dependency subtrees for functionality we barely
use. Reduce that overhead using supported minimal packages, unused optional-integration
removal, or existing alternatives. Compare the resolved dependency graph before and after.
Remove transitive packages only when no retained dependency requires them.
```

### 6. Keep Dev Dependencies Out of Production

```text
Find libraries needed only for development, testing, or building. Correct their
dependency scope and exclude them from production artifacts where the deployment
process permits. Verify the production build and representative runtime flows from a
clean installation. Report scope changes separately from dependencies eliminated entirely.
```

### 7. Evaluate Larger Replacements

```text
Review remaining dependencies for replacements requiring more substantial work.
Compare implementation effort, code added, security and correctness risks,
performance, and ongoing maintenance. Implement only bounded replacements with a clear
net benefit and adequate verification. Retain libraries whose complexity or
specialized functionality makes replacement a poor tradeoff, and explain why.
```

### 8. Verify and Report

```text
Verify a clean reproducible installation, build, tests, and representative application
flows. Check that manifests, lockfiles, documentation, and any existing SBOM reflect
the final dependency graph. Summarize:
- Changes: dependency, action, rationale, replacement or local code added
- Counts: before/after direct and transitive dependencies
- Verification: exact commands, results, checks not run with reasons
- Retained dependencies: names and reasons for retention
- Remaining risks: unresolved questions, compatibility limits, follow-up work
```

## Assessment-Only Prompt

Use before making changes to get a plan:

```text
Assess this project's dependencies without modifying files or installing, removing,
or upgrading packages. Inspect manifests, lockfiles, usage, and available verification
coverage. Inventory direct dependencies and the resolved transitive tree where available.
Identify candidates for removal, consolidation, or replacement, with evidence of usage
or non-usage, expected benefits, compatibility and security risks, and proposed checks.
Identify libraries worth retaining and explain why. Return a prioritized plan for review
and wait for authorization before implementing changes.
```

## Decision Framework

### Remove When:
- No usage found in code, tests, config, or build
- Standard library provides equivalent functionality
- Simple local implementation is easier to maintain
- Overlapping with another retained library

### Retain When:
- Security-sensitive (crypto, auth, parsing)
- Complex specialized functionality
- Active maintenance with security responsiveness
- Replacement would increase risk

### Always:
- Verify before and after each change
- Preserve behavior and error handling
- Check dynamic loading and plugins
- Document retention reasons

## Example Report Format

| Dependency | Evidence | Decision | Verification |
|------------|----------|----------|--------------|
| `lodash` | Only `_.get` used | Replace with optional chaining | Tests pass, build clean |
| `bcrypt` | Password hashing | **Retain** - security-critical | N/A |
| `moment` | Date formatting | Replace with `Intl.DateTimeFormat` | Edge cases verified |
| `unused-lib` | No imports found | Remove | Dependency graph clean |

## Best Practices

1. **Baseline first** — Establish passing tests before changes
2. **Small batches** — One removal pass at a time
3. **Verify each step** — Undo if verification fails
4. **Don't weaken security** — Never remove to make tests pass
5. **Document retention** — Explain why libraries stay
