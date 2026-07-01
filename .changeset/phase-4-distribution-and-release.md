---
"@nemo/components": minor
"@nemo/tokens": minor
"@nemo/react": minor
"@nemo/vue": minor
"@nemo/angular": minor
---

Phase 4 — distribution and release.

- Restructured into an npm-workspaces monorepo (`packages/components`, `packages/tokens`, `packages/react`, `packages/vue`, `packages/angular`).
- Extracted `@nemo/tokens` as its own publishable package (generated CSS custom properties + typed TS), replacing the in-tree `src/global/tokens.*`.
- Added typed React, Vue 3, and Angular wrapper packages generated from `@nemo/components` via the official `@stencil/react-output-target`, `@stencil/vue-output-target`, and `@stencil/angular-output-target`.
- Corrected `main`/`module`/`types`/`exports`/`sideEffects`/`files` across all five packages.
- Initialized Changesets, with all five packages linked so they release in lockstep.
