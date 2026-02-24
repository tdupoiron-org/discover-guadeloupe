---
agent: 📊 UI Accessibility Auditor
---

# Run UI Accessibility Audit

Use the **UI Accessibility Auditor Agent** and execute a focused audit with minimal, behavior-preserving fixes.

## Inputs
- Target scope: `{{SCOPE}}`
- Priority: `{{PRIORITY:=P0,P1}}`
- Constraints: `{{CONSTRAINTS:=minimal diff, no feature changes}}`

## Instructions
1. Load and follow:
   - `agents/ui-accessibility-auditor/AGENT.md`
   - `skills/ui-accessibility/SKILL.md`
2. Audit only the specified scope.
3. Report findings grouped by severity (P0, P1, P2, P3).
4. Implement fixes for the requested priority levels first.
5. Keep code style and design system usage consistent with the repository.
6. Validate with:
   - `npm run lint`
   - `npm run build`
7. Return final output using:
   - `skills/ui-accessibility/templates/accessibility-report.md`

## Default Demo Scope
- `src/App.tsx`
- `src/components/SiteCard.tsx`

## Example Invocation
Run a UI accessibility audit on `src/App.tsx` and `src/components/SiteCard.tsx`, fix P0/P1 issues only, keep diff minimal, run lint/build, and return the filled accessibility report template.
