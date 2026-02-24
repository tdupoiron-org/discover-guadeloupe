## Coding Guidance

- Keep diffs small and consistent with existing naming/style.
- Prefer strong typing; avoid `any` unless clearly justified.
- Reuse existing UI primitives from `src/components/ui/` before creating new components.
- Keep data and props aligned with `Site` in `src/types/site.ts`.
- Avoid duplicate logic (especially between `App` and `SiteCard`); extract helpers when needed.
- Preserve accessibility basics: semantic structure, labels, keyboard-friendly controls, and alt text.

## Product & UX Guardrails

- Prioritize a clean, travel-focused browsing experience.
- Preserve existing flows: browse sites, filter (all/visited/unvisited), toggle visited, view progress.
- Do not add major new features (auth, backend sync, complex routing) unless explicitly requested.
- Keep interactions clear and fast on both mobile and desktop.

## Collaboration Style

- Be concise and actionable.
- Include a short rationale for non-trivial recommendations.
- Prefer one clear recommendation; mention alternatives only when useful.
