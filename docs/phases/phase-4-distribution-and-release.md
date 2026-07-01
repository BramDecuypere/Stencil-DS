# Phase 4 — Distribution + Release

**Goal:** Ship the library to web/React/Vue/Angular consumers as typed packages, versioned and published with Changesets.

**Prerequisites:** Phase 2 (Phase 3 recommended). **Reads:** `CLAUDE.md`.

---

## 1. Framework wrappers (Stencil output targets)

A vanilla custom-element library isn't enough for a premium DS — framework consumers need typed wrappers with real props/events. Use Stencil's **official output targets**, not hand-rolled wrappers:

- `@stencil/react-output-target` → `<NemoButton>` etc. with typed props and proper event handling (confirm current React version support in its docs).
- `@stencil/vue-output-target`
- `@stencil/angular-output-target`

Configure each in `stencil.config.ts` to emit a wrapper package (separate package dir in a monorepo, or a generated subpath). Decide and document the distribution shape:

- **Single package** `@nemo/components` (core web components) + sibling packages `@nemo/react`, `@nemo/vue`, `@nemo/angular`, and `@nemo/tokens` (the generated CSS/TS from Phase 1), **or**
- a monorepo (pnpm/npm workspaces) housing all of the above. Prefer the monorepo for a system you'll keep extending.

## 2. Package outputs & metadata

Per publishable package, set correctly:

- `main`, `module`, `types`, and `exports` map (don't reintroduce the `exports` array that conflicts with Storybook — scope it to the published build).
- `sideEffects` set so bundlers tree-shake; ship `dist/`, `dist/custom-elements/`, `loader/`, and `custom-elements.json`.
- `@nemo/tokens` exports the generated `tokens.css` and typed `tokens.ts`.
- Peer deps declared for the framework wrappers (react/vue/angular).

## 3. Versioning & publishing — Changesets

- Add **`@changesets/cli`** (`npx changeset init`). Every change ships with a changeset declaring semver impact. A **token rename or prop removal is a breaking (major) change** — call it out.
- Generated `CHANGELOG.md` per package.
- `npm publish` with **provenance** from CI (Phase 5), public access if open, or to your private registry.
- Keep the framework wrapper versions in lockstep with the core package.

## Definition of done

- [ ] React, Vue, and Angular wrapper packages generated from the output targets, exporting typed components.
- [ ] `@nemo/tokens` publishes the generated CSS + typed TS.
- [ ] Each package's `exports`/`types`/`sideEffects` are correct; a smoke-test import works in a throwaway React (and one other framework) app.
- [ ] Changesets initialized; a sample changeset produces correct version bumps + changelogs.
- [ ] `npm publish` works (dry-run is acceptable for verification).
