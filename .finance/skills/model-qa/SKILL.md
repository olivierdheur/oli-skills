---
name: model-qa
description: QA financial models for formula errors, hardcodes, date logic, sign conventions, circularity, balance-sheet integrity, scenario switches, units, currencies, and presentation quality.
version: 0.1.0
---

# Model QA

Use this skill when reviewing a spreadsheet or model logic.

## Workflow

1. Identify model purpose, tabs, outputs, and scenario controls.
2. Check formulas, hardcodes, signs, dates, units, currencies, links, and
   circularity.
3. Verify accounting relationships and sensitivity toggles.
4. Produce an issue log by severity.

## Output

Return `Model map`, `Issue log`, `Formula checks`, `Scenario checks`, and
`Fix priority`.

