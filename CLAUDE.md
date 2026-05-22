# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LCARS Guide is a Star Trek TNG episode browser with a Star Trek LCARS-styled UI. Episode data is fetched from the [TVMaze API](https://api.tvmaze.com/) (show ID 491, no API key required).

## Commands

```bash
npm install         # install dependencies
npm run dev         # Vite dev server with HMR at http://localhost:5173
npm run build       # production build into dist/
npm run preview     # preview production build locally
npm run test        # run Vitest test suite (terminal, not browser)
npm run typecheck   # run tsc --noEmit type check
```

Lint via ESLint 9 (flat config). Run with:
```bash
npm run lint        # eslint app/
```

## Architecture

**Entry point**: `index.html` at project root → `app/main.tsx` bootstraps the React app — wires up TanStack Query `<QueryClientProvider>`, React Router `<RouterProvider>`, and mounts to `#main` via `createRoot`. The default route redirects to `/seasons/4`.

**Routing**: React Router v7 using `createHashRouter` (data-router API). Route config in `app/main.tsx`:
- `AppContainer` is the layout route; it renders `<Outlet />` for child content
- `/` index route → `loader` redirects to `/seasons/4`
- `/seasons/:seasonId` → `<Episodes>` component

**Data flow**: `<Episodes>` reads `seasonId` from `useParams` and calls `useQuery` (TanStack Query v5) with key `['episodes', seasonId]`. The query function fetches all TNG episodes from TVMaze and filters to the requested season. Results are cached per season; revisiting a season is instant.

**Component structure**: `<AppContainer>` provides the LCARS chrome (top row, bottom row, left column season navigation from `app/components/LCARS/`). Page content renders via `<Outlet />` inside the center column. `<Episodes>` contains an inline `<EpisodeTable>` component that handles title filtering and column sorting with React state.

**Build**: Vite 6 + `@vitejs/plugin-react-swc` (SWC for JSX/TSX transform). CSS is imported directly in `app/main.tsx`. TypeScript is checked separately with `npm run typecheck` (`tsc --noEmit`); SWC strips types at build time without checking.

**Tests**: Vitest + React Testing Library. Test files live in `tests/`. Run with `npm run test` (outputs to terminal).

## ESLint Config

ESLint 9 flat config (`eslint.config.js`). Uses `typescript-eslint` recommended + `eslint-plugin-react` + `eslint-plugin-react-hooks`. `react/prop-types` and `react/display-name` are disabled; hooks rules are set to error/warn.
