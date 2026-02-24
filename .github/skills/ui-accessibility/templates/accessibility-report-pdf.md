---
title: "Accessibility Audit Report"
subtitle: ""
date: ""            # ISO date: YYYY-MM-DD
author: "UI Accessibility Auditor"
version: "1.0"
# Output path convention:
#   Folder : .github/skills/ui-accessibility/reports/
#   File   : YYYY-MM-DD-accessibility-report.pdf
#   Screenshots: YYYY-MM-DD-screenshot-<N>.png (same folder)
---

# Accessibility Audit Report

---

## Document Information

| Field        | Value                                                                           |
|--------------|---------------------------------------------------------------------------------|
| Target       |                                                                                 |
| Audit Date   |                                                              <!-- YYYY-MM-DD --> |
| Auditor      | UI Accessibility Auditor                                                        |
| Version      | 1.0                                                                             |
| Status       | Draft / Final                                                                   |
| Output file  | `.github/skills/ui-accessibility/reports/YYYY-MM-DD-accessibility-report.pdf`  |

---

## Executive Summary

> _One-paragraph summary of audit scope, critical findings count, and overall accessibility posture._

**Total findings:** 0 &nbsp;&nbsp; | &nbsp;&nbsp; P0 Critical: 0 &nbsp;&nbsp; | &nbsp;&nbsp; P1 High: 0 &nbsp;&nbsp; | &nbsp;&nbsp; P2 Medium: 0 &nbsp;&nbsp; | &nbsp;&nbsp; P3 Low: 0

---

## Scope

### Target
<!-- App URL, route, or component name audited -->

### Files / Components Audited
<!-- List each file or component reviewed -->
- 

### Constraints
<!-- e.g., "MVP pass — keyboard + semantics only; contrast deferred" -->

---

## Visual Evidence

> _Screenshots captured via Playwright MCP during the audit. Each screenshot is keyed to a finding in the sections below._

<!-- For each screenshot, use the format below. Remove this block if no screenshots were taken. -->

### Screenshot 1 — `<short description>`
![Screenshot 1](./<filename>.png)
_Captured at: `<URL or component>` — Finding ref: P0-1_

---

## Findings

### P0 — Critical
> Issues that block core interaction for keyboard or screen reader users.

<!-- Repeat the block below for each P0 finding. Remove section if none. -->

#### P0-1: `<Short title>`
| Field        | Detail                        |
|--------------|-------------------------------|
| Component    |                               |
| File         |                               |
| Description  |                               |
| WCAG Ref     | e.g., 4.1.2 Name, Role, Value |
| Screenshot   | Screenshot 1                  |
| Status       | Open / Fixed                  |

---

### P1 — High
> Significant friction or missing context in primary flows.

#### P1-1: `<Short title>`
| Field        | Detail |
|--------------|--------|
| Component    |        |
| File         |        |
| Description  |        |
| WCAG Ref     |        |
| Screenshot   |        |
| Status       | Open / Fixed |

---

### P2 — Medium
> Improvement opportunities with moderate impact.

#### P2-1: `<Short title>`
| Field        | Detail |
|--------------|--------|
| Component    |        |
| File         |        |
| Description  |        |
| WCAG Ref     |        |
| Status       | Open / Fixed |

---

### P3 — Low
> Nice-to-have polish.

#### P3-1: `<Short title>`
| Field        | Detail |
|--------------|--------|
| Component    |        |
| File         |        |
| Description  |        |
| WCAG Ref     |        |
| Status       | Open / Fixed |

---

## Changes Applied

| # | Category                        | File(s) Modified | Finding Ref |
|---|---------------------------------|------------------|-------------|
| 1 | Semantic element correction     |                  |             |
| 2 | Label / accessible name fix     |                  |             |
| 3 | Keyboard access fix             |                  |             |
| 4 | ARIA state / attribute fix      |                  |             |
| 5 | Alt text update                 |                  |             |
| 6 | Dynamic announcement improvement|                  |             |

---

## Validation

### Commands Run

```
npm run lint
npm run build
```

### Results

| Command         | Outcome | Notes |
|-----------------|---------|-------|
| `npm run lint`  |         |       |
| `npm run build` |         |       |

---

## Playwright MCP Captures

> _Summary of all Playwright MCP tool invocations during this audit._

| # | Tool Used          | URL / Component          | Purpose                    | File Saved          |
|---|--------------------|--------------------------|----------------------------|---------------------|
| 1 | `browser_snapshot` |                          | Accessibility tree capture |                     |
| 2 | `take_screenshot`  |                          | Visual evidence — P0-1     |                     |

---

## Risks & Deferred Items

<!-- Document any issues intentionally not fixed in this pass and rationale. -->
- 

---

## Recommended Next Steps

1. 
2. 
3. 

---

_Report generated by UI Accessibility Auditor — Discover Guadeloupe project_
