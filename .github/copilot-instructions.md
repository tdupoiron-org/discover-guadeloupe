# Copilot Instructions for discover-cologne

## Project Overview

This is a React + Vite web application for discovering sites in Cologne. The architecture is modular, with a focus on reusable UI components and mock data for rapid prototyping.

## Key Structure

- **src/components/**: Main UI components. `ListView.tsx` and `SiteCard.tsx` are central for displaying site data. The `ui/` subfolder contains atomic, reusable UI elements (e.g., `button.tsx`, `card.tsx`).
- **src/data/sites.ts**: Contains mock data for sites. Use this for development and testing; no backend integration is present.
- **src/types/site.ts**: Type definitions for site objects. Always use these types for site-related data.
- **src/hooks/use-mobile.ts**: Custom React hook for mobile detection.
- **src/lib/utils.ts**: Utility functions shared across components.
- **src/styles/theme.css**: Custom theme overrides for Tailwind.

## Developer Workflow

- **Build**: Use Vite (`vite.config.ts`). Run with `npm run dev` for local development.
- **Styling**: Tailwind CSS is configured via `tailwind.config.js` and `theme.json`. Use utility classes and extend via `theme.css`.
- **Type Safety**: All site data should conform to types in `src/types/site.ts`.
- **Error Handling**: Use `ErrorFallback.tsx` for global error boundaries.
- **No backend/API**: All data is local and static. For new data, update `src/data/sites.ts`.

## Patterns & Conventions

- **Component Structure**: Prefer function components. Co-locate styles and types when possible.
- **UI Library**: Use components from `src/components/ui/` for consistency.
- **Data Flow**: Pass site data as props; do not fetch from external sources.
- **Testing**: No test setup detected; mock data is used for manual testing.
- **File Naming**: Use kebab-case for files, PascalCase for components.

## Examples

- To add a new site, update `src/data/sites.ts` and ensure it matches `Site` type.
- To create a new UI element, add to `src/components/ui/` and import where needed.

## External Dependencies

- React, Vite, Tailwind CSS. No backend, database, or API integration.
