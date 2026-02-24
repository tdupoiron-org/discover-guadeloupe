# UI Accessibility Auditor Skill

## Purpose
Use this skill to audit and improve accessibility in React UI codebases with minimal, behavior-preserving changes.

This skill is optimized for component-driven apps using TypeScript + Tailwind + design-system primitives, like this project.

## When to Use
- When a user asks to improve accessibility for pages, cards, forms, or navigation.
- Before shipping UI changes to catch keyboard, semantic, contrast, and label issues.
- During refactors where a11y regressions are likely.

## Inputs
- Target scope: file(s), component(s), route(s), or whole app.
- Constraints: minimal/MVP vs broader hardening.
- Optional baseline: known issues, audit output, or priority level.
- Optional report format: markdown (default) or PDF (uses `templates/accessibility-report-pdf.md`).

## Tools
- **Playwright MCP**: Use the `browser_snapshot` and `take_screenshot` tools (via the Playwright MCP) to capture page state during the audit. Screenshots provide visual evidence for findings and can be embedded in PDF reports.
  - Use `browser_snapshot` as the primary capture method for accessibility tree context.
  - Use `take_screenshot` to record the visual state of failing or ambiguous elements.
  - Save screenshots alongside the report when generating a PDF report.

## Non-Goals
- Redesigning visual identity.
- Adding unrelated features.
- Rewriting architecture when a focused patch can solve the issue.

## Required Principles
1. Preserve existing UX flows and product intent.
2. Prefer semantic HTML over ARIA when possible.
3. Keep diffs small and strongly typed.
4. Reuse existing UI primitives first.
5. Verify with keyboard-only navigation logic and lint/type checks.

## Execution Workflow
1. **Scope & Inventory**
   - Identify target components and interaction patterns.
   - Note interactive elements rendered as non-semantic tags.
   - Identify image, icon-only controls, form inputs, and dynamic status regions.

2. **Audit for High-Impact Issues**
   - Keyboard access: focusable controls, logical tab order, visible focus.
   - Semantics: headings, landmarks, button vs div, list semantics.
   - Names/labels: accessible names for buttons, inputs, checkboxes, links.
   - State communication: checked/expanded/selected states are exposed.
   - Media/text alternatives: meaningful `alt`, decorative media marked appropriately.
   - Dynamic updates: loading/progress/filter changes announced where needed.
   - **Screenshot capture**: If the app is running locally, use `browser_snapshot` (Playwright MCP) to capture the accessibility tree and `take_screenshot` to record the visual state of key issues.

3. **Implement Focused Fixes**
   - Replace clickable non-buttons with `<button>`/`<a>` as appropriate.
   - Add missing labels/`aria-label` for icon-only controls.
   - Add or correct roles/states only if semantic elements cannot be used.
   - Ensure keyboard handlers exist only where native behavior is unavailable.
   - Preserve visual style and design tokens.

4. **Validate**
   - Run project checks (`npm run lint`, `npm run build` when available).
   - Re-scan changed files for accidental regressions.
   - Confirm no unrelated behavior changes.

5. **Report**
   - Summarize issues found, fixes applied, residual risks, and next checks.
   - For a markdown report, use `templates/accessibility-report.md`.
   - For a PDF report, use `templates/accessibility-report-pdf.md`; embed any screenshots captured during the audit.
   - **PDF output location**: Save the generated PDF under `.github/skills/ui-accessibility/reports/` and name it after the audit date using the pattern `YYYY-MM-DD-accessibility-report.pdf` (e.g., `2026-02-24-accessibility-report.pdf`). Create the `reports/` directory if it does not exist. Save any accompanying screenshots in the same folder using the pattern `YYYY-MM-DD-screenshot-<N>.png`.

## Severity Model
- **P0**: Blocks core interaction for keyboard/screen reader users.
- **P1**: Significant friction or missing context in primary flows.
- **P2**: Improvement opportunities with moderate impact.
- **P3**: Nice-to-have polish.

## Preferred Fix Patterns (React)
- Click target:
  - Prefer `<button type="button">` over clickable `<div>`.
- Icon button:
  - Add descriptive `aria-label`.
- Image:
  - Informative image gets contextual `alt`; decorative image uses empty `alt`.
- Toggle/checkbox:
  - Ensure accessible name and state are programmatically exposed.
- Lists of cards:
  - Use semantic list container when cards represent a collection.

## Output Contract
Every run should provide:
- Scope covered.
- Prioritized issue list (P0-P3).
- Exact files changed.
- Validation commands run and outcomes.
- Follow-up recommendations limited to highest-value next steps.
- (PDF reports only) Embedded screenshots captured via Playwright MCP, one per significant P0/P1 finding.
- (PDF reports only) File saved as `.github/skills/ui-accessibility/reports/YYYY-MM-DD-accessibility-report.pdf`.
