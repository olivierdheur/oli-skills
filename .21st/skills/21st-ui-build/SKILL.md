# 21st UI Build

> Build production UI using project context, existing components, and 21st inspiration

Implement pages, sections, and components while preserving your product's identity and leveraging the 21st.dev catalog.

## When to Use

- "Build this UI"
- "Implement this screen"
- "Make this page production-ready"
- "Use 21st to create the interface"

**For exploration:** Use `21st-ui-explore` when direction is undecided.
**For review only:** Use `21st-ui-review` for audits.

## Workflow

### 1. Read Design Context

```bash
# Check for existing context
cat .21st/design.json
cat .21st/DESIGN.md

# If missing, initialize
21st init --design-context
```

### 2. Inspect Target

- Read target route and closest components
- Check project instructions and existing tokens
- Treat explicit project facts as stronger than generic taste

### 3. Search First

```bash
21st search "<specific UI need>" --context auto
```

Reuse installed project primitives first. Only retrieve/install from 21st when it reduces duplication or improves result.

### 4. Generate if Needed

Check AI access first:
```bash
21st usage
# Look for "21st AI generation: enabled"
```

**If AI enabled:**
```bash
21st generate "<goal and constraints>" --context auto --variants 3
```

**If AI not enabled:**
Implement with your own agent, grounded in `21st search` and `21st get`.

### 5. Implement

- Use project's real framework (not sketch HTML)
- Apply project tokens, not arbitrary values
- Preserve established patterns

### 6. Verify

```bash
21st review <path>
# Run project's checks
```

Apply only safe, deterministic fixes automatically.

## Design Rules

| Do | Don't |
|----|-------|
| Prefer project tokens | Add new arbitrary values |
| Reuse existing components | Create parallel lookalikes |
| Preserve density, radii, typography | Change established rhythm |
| Use real product copy | Use placeholder text |
| Handle all states (loading, empty, error) | Skip edge cases |

## Avoid Unless Requested

- Decorative gradients
- Excessive cards
- Glass effects
- Huge headlines
- Animation without purpose

## Must Preserve

- Responsive behavior
- Keyboard interaction
- Visible focus states
- Semantic HTML
- Reduced motion support
- Loading/empty/error states

## Handoff

Report:
- Direction used
- Reused 21st/project components
- Files changed
- Verification performed

Record durable choices in `.21st/design.json` under `decisions`.
