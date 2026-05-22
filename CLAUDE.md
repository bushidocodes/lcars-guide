# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LCARS Guide is a Star Trek TNG episode browser with a Star Trek LCARS-styled UI. Episode data is fetched from the [OMDb API](https://www.omdbapi.com/) (IMDb title `tt0092455`).

## Commands

```bash
npm install         # install dependencies
npm run dev         # dev server with HMR at http://localhost:8080/public
npm run build       # production build into public/bundle.js
npm run test        # serves browser-based test suite at http://localhost:7777/tests/
```

Tests do **not** run in the terminal — `npm run test` starts a webpack-dev-server and the Mocha suite runs inside the browser at `http://localhost:7777/tests/`.

Lint is via ESLint (airbnb config). Run with:
```bash
npx eslint app/
```

## Architecture

**Entry point**: `app/main.jsx` bootstraps the React app — wires up Redux `<Provider>`, React-Router with `hashHistory`, and mounts to `#main`. The default route redirects to `/seasons/4`.

**Routing**: React-Router 3 with two routes:
- `/` → redirects to `/seasons/4`
- `/seasons/:seasonId` → `<Episodes>` component

**Redux store** (`app/store.js`): configured with `redux-thunk` (async actions) and `redux-logger`. State shape:
```
{
  imdbHasErrored: bool,
  imdbIsLoading: bool,
  imdb: {}  // raw OMDb season response
}
```

**Data flow**: `<Episodes>` dispatches `fetchImdbData(seasonId)` (from `app/actions/imdb.js`) on mount, which uses axios to fetch all TNG episodes from the TVMaze API (`https://api.tvmaze.com/shows/491/episodes`), filters to the requested season, transforms the TVMaze fields into the Redux state shape, and dispatches `RECEIVE_IMDB_DATA`. No API key is required.

**Component structure**: `<AppContainer>` provides the LCARS chrome (top row, bottom row, left column decorative panels from `app/components/LCARS/`). Page content renders as `{children}` inside the center column. `<Episodes>` uses the `reactable` library to render the episode table.

**Build**: Webpack 2 + Babel 6 (ES2015 + React + stage-2). CSS is loaded via webpack's `css-loader`/`style-loader` in dev and injected into the bundle in production.

## ESLint Config

Airbnb ruleset with Windows line endings (`\r\n`) enforced. `react/prop-types` and `comma-dangle` rules are disabled.
