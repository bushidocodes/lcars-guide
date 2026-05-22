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
```

Lint is via ESLint (airbnb config). Run with:
```bash
npx eslint app/
```

## Architecture

**Entry point**: `index.html` at project root → `app/main.jsx` bootstraps the React app — wires up Redux `<Provider>`, React Router `<HashRouter>`, and mounts to `#main` via `createRoot`. The default route redirects to `/seasons/4`.

**Routing**: React Router v6 with a layout route pattern:
- `<AppContainer>` is the layout route; it renders `<Outlet />` for child content
- `/` → redirects to `/seasons/4`
- `/seasons/:seasonId` → `<Episodes>` component

**Redux store** (`app/store.js`): configured with `redux-thunk` (async actions) and `redux-logger`. State shape:
```
{
  imdbHasErrored: bool,
  imdbIsLoading: bool,
  imdb: {}  // season data in OMDb-compatible shape
}
```

**Data flow**: `<Episodes>` uses `useParams`, `useSelector`, `useDispatch` hooks. On mount (and when `seasonId` changes), it dispatches `fetchImdbData(seasonId)` (from `app/actions/imdb.js`), which fetches all TNG episodes from TVMaze, filters to the requested season, transforms the fields into the Redux state shape, and dispatches `RECEIVE_IMDB_DATA`.

**Component structure**: `<AppContainer>` provides the LCARS chrome (top row, bottom row, left column decorative panels from `app/components/LCARS/`). Page content renders via `<Outlet />` inside the center column. `<Episodes>` contains an inline `<EpisodeTable>` component that handles title filtering and column sorting with React state.

**Build**: Vite 6 + `@vitejs/plugin-react-swc` (SWC for JSX transform, no Babel). CSS is imported directly in `app/main.jsx`.

**Tests**: Vitest + React Testing Library. Test files live in `tests/`. Run with `npm run test` (outputs to terminal).

## ESLint Config

Airbnb ruleset with Windows line endings (`\r\n`) enforced. `react/prop-types` and `comma-dangle` rules are disabled.
