---
name: finance-analyst
description: Financial analyst workflow for market research, company analysis, valuation review, model QA, fintech product analysis, quant strategy notes, portfolio risk memos, and investor-ready briefs. Use when the user needs structured financial reasoning. Not investment, tax, accounting, or legal advice.
version: 0.1.0
---

# Finance Analyst

Use this skill for structured financial analysis and memo writing.

## Boundary

This skill provides analysis support, not personalized investment, tax,
accounting, legal, or fiduciary advice. Verify current prices, filings, rates,
and regulations from primary sources before making decisions.

## Workflow

1. Define the decision: investment, product, credit, pricing, treasury, risk,
   forecast, market scan, or model QA.
2. Identify source hierarchy: filings, audited statements, official data,
   exchange data, company materials, reputable market data, then commentary.
3. Build the analytical frame: revenue drivers, cost structure, unit economics,
   liquidity, leverage, valuation, sensitivity, downside case, catalysts.
4. Check the model: formulas, signs, circularity, hardcodes, dates, units,
   currencies, scenario toggles, and balance-sheet integrity.
5. Separate observed facts from assumptions and opinions.
6. Write the memo with thesis, evidence, valuation/risk, counterarguments, and
   monitoring indicators.

## Output format

Return:

1. `Analyst brief:` concise answer and context.
2. `Key drivers:` assumptions and evidence.
3. `Model or data checks:` if applicable.
4. `Risks and counterarguments:`
5. `Next diligence:` exact source or analysis needed.

