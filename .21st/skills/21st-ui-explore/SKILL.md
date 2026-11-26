# 21st UI Explore

> Explore multiple meaningfully different UI directions with project context and 21st inspiration

Create real design choices without abandoning the project's visual identity. Use when the user wants options, variants, or is unsure how something should look.

## When to Use

- "Show me three directions"
- "Explore alternatives"
- "What could this page look like?"
- "Generate variants"

**For implementation:** Use `21st-ui-build` when direction is already selected.

## Workflow

### 1. Read Design Context

```bash
cat .21st/design.json

# If missing
21st init --design-context
```

### 2. Search for References

```bash
21st search "<interface and product context>" --context auto
```

### 3. Define Three Directions

Each direction must differ on **at least two meaningful axes**:
- Hierarchy
- Information density
- Navigation model
- Content emphasis
- Interaction pattern
- Composition

**Color-only variants don't count.**

### 4. Keep Fixed Constraints

Shared across all directions:
- Real stack and tokens
- Brand assets
- Required content
- Accessibility
- Responsive behavior

### 5. Create Previews

Check AI access:
```bash
21st usage
```

**If AI enabled:**
```bash
21st generate "<goal plus fixed constraints>" --context auto --variants 3
```

**If AI not enabled:**
Implement previews with your own agent using `21st search` and `21st get`.

### 6. Present Options

For each direction provide:

| Field | Description |
|-------|-------------|
| **Name** | Short, descriptive |
| **Core idea** | What effect on user |
| **References** | 21st/project sources used |
| **Consistency** | What stays same as project |
| **Differences** | 2+ meaningful variations |
| **Risks** | Accessibility or responsive concerns |
| **Best fit** | When this direction works best |

### 7. Recommend

- Recommend one direction with concrete tradeoffs
- Let user choose
- After selection, remove abandoned variants

### 8. Record Decision

```bash
# Update .21st/design.json with selected direction
```

## Rules

- **Don't generate random style mutations** - every difference must support a product or usability hypothesis
- **Don't suggest more than user asked for** - 3 directions is usually enough
- **Don't sacrifice fundamentals** - accessibility, performance, semantics must be preserved in all directions
