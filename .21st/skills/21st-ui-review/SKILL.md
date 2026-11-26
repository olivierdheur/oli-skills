# 21st UI Review

> Audit UI for accessibility, design consistency, responsive behavior, and interaction quality

Review existing UI against project standards and find issues with evidence. Separate deterministic defects from subjective recommendations.

## When to Use

- "Review this UI"
- "Audit this page"
- "Find design issues"
- "Check responsiveness"
- "Fix obvious UX problems"

**For building new UI:** Use `21st-ui-build` instead.

## Workflow

### 1. Read Context

```bash
cat .21st/design.json
# Read project instructions and relevant source
```

### 2. Run Deterministic Review

```bash
21st review <path>
21st review <path> --json
```

### 3. Inspect Runtime

- Check actual component composition
- Validate claims against code (don't infer from names)
- Test real states

### 4. Group Findings

| Category | Examples |
|----------|----------|
| **Deterministic defects** | Missing alt text, broken focus |
| **Design system drift** | Wrong token, duplicate primitive |
| **Accessibility defects** | No keyboard access, invisible focus |
| **Responsive risks** | Fixed widths, overflow |
| **Subjective recommendations** | Layout suggestions, visual tweaks |

### 5. Prioritize by Impact

Include exact file and line attribution for each finding.

### 6. Apply Safe Fixes

```bash
21st review <path> --fix
```

**Only for deterministic, low-ambiguity fixes.**

Never silently:
- Redesign
- Change brand identity
- Alter product behavior

### 7. Verify

- Run project tests after fixes
- Rerun review to prove resolution

## Review Priorities

### Accessibility & Interaction
- Semantic controls and accessible names
- Keyboard access and focus visibility
- Dialog/menu behavior
- Touch target size (44px minimum)
- Disabled and loading states
- Reduced-motion handling

### Content
- Image alternatives
- Meaningful labels
- Real copy (not placeholder)
- Empty/error states

### Responsive
- Overflow handling
- No fixed-width assumptions
- Mobile-first patterns

### Design System
- Project tokens vs hardcoded values
- Existing components vs duplicates
- Typography consistency
- Radius, spacing, shadows
- Icon consistency

## Output Format

1. **Lead with actionable findings** ordered by severity
2. **Keep subjective suggestions labeled** as recommendations
3. **If no issues found**, state what was inspected

```markdown
## Critical
- [a11y] Missing alt text on hero image (src/Hero.tsx:24)

## High
- [responsive] Fixed 400px width causes overflow (src/Card.tsx:12)

## Medium
- [tokens] Hardcoded #3b82f6 should be var(--primary) (src/Button.tsx:8)

## Recommendations
- Consider reducing card padding on mobile
```
