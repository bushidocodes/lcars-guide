# LCARS Guide

A Star Trek TNG episode browser with a Star Trek LCARS-styled UI. Episode data is fetched from the [TVMaze API](https://www.tvmaze.com/api) (no API key required).

**Live site:** https://bushidocodes.github.io/lcars-guide/

## Development

Requires [Node.js](https://nodejs.org/) 20 or later.

```bash
git clone https://github.com/bushidocodes/lcars-guide.git
cd lcars-guide
npm install
npm run dev       # dev server with HMR at http://localhost:5173
npm run test      # run Vitest test suite
npm run build     # production build into dist/
```

## Stack

- Vite + React + TypeScript
- React Router v7 (hash-based routing)
- TanStack Query v5 for data fetching and caching
- Vitest + React Testing Library
- GitHub Actions for CI and deployment to GitHub Pages
