# Contributing to Nemo Design System

Thanks for contributing. This doc covers how to propose and add a token or component, the rules
that are non-negotiable, and how a change gets from your branch to a published package. The
standing context for any contribution — conventions, the Figma source, the accessibility
baseline, token discipline — lives in `CLAUDE.md`; read that first.

## Before you start

- **New token or component?** Open an issue with the RFC template
  (`.github/ISSUE_TEMPLATE/rfc-token-or-component.md`) first. Tokens and components are public API
  the moment they ship — a quick issue avoids building the wrong shape.
- **Bug fix or docs tweak?** Just open a PR.

## Proposing a new primitive or semantic token

1. Resolve the value from the **Nemo Design System** Figma file (see `CLAUDE.md` for the file/node
   references) — never invent or approximate a value. If it can't be resolved yet, add it as an
   explicit `TODO` in `docs/TOKENS.md` rather than guessing.
2. Add the **primitive** first (`packages/tokens/tokens/primitive/`), in DTCG format
   (`$value`/`$type` — not the legacy `value`/`type`).
3. Add the **semantic** role that aliases it (`packages/tokens/tokens/semantic/<theme>/`), using
   `{path.to.token}` alias syntax.
4. Run `npm run tokens:validate` — it checks the DTCG schema, that every semantic alias resolves
   (no orphans), and that no token path is defined twice (no duplicates). This also runs in CI.
5. `npm run build -w @nemo/tokens` to regenerate `tokens.css`/`tokens.ts`, then confirm the new
   role shows up correctly in the `Foundations/Colors` Storybook story.

**Components consume the semantic tier only.** A component reading a primitive, or a raw
hex/`rgb()`/`hsl()` literal, is a bug — Stylelint's token-discipline rule
(`.stylelintrc.json`) fails CI on this automatically for anything under
`packages/components/src/components/`.

## Proposing a new component

1. Pull the spec from the relevant Figma node (structure, variants, states, and any
   documentation frame — purpose/do-dont/a11y checklist) rather than reinventing it. See
   `docs/phases/phase-2-components.md` for how the existing two components' APIs were derived, as
   a model.
2. Co-locate everything under `packages/components/src/components/<name>/`: the `.tsx`, its
   `.css`, `.spec.tsx` (behavior) and `.e2e.ts` (rendered/interactive) tests, a `.stories.tsx`, and
   an MDX docs page (`<name>.mdx`) — purpose, variant/state guidance, Do/Don't, content rules, and
   an accessibility checklist, the same shape as `button.mdx`/`text-input.mdx`.
3. Style with **semantic tokens only** (`var(--nemo-color-*)`); use `currentColor` for anything
   (like an icon) meant to inherit its context's color instead of owning one.
4. Meet the accessibility baseline (`CLAUDE.md`): visible `:focus-visible`, correct ARIA, ~44px
   minimum touch target, read-only ≠ disabled where applicable, never signal state by color alone.
5. Tag prefix is always `nemo-` — never "stencil" in a tag name (`stencil/required-prefix` in
   `eslint.config.mjs` enforces this in CI).
6. `npm run build -w @nemo/components` to generate the component's `readme.md` and update
   `custom-elements.json` — these are generated, not hand-edited; don't duplicate the prop table
   anywhere.

## Definition of done

A change is done when:

- [ ] It builds clean (`npm run build`) and typechecks (`npm run typecheck`).
- [ ] `npm run lint` passes (ESLint, Stylelint incl. the token-discipline rule, Prettier).
- [ ] Values trace back to Figma (or are an explicit, documented `TODO`) — no invented colors,
      sizes, or copy.
- [ ] Stencil spec/e2e tests cover the new behavior (`npm test`).
- [ ] Storybook stories exist for the new states/variants, and the a11y addon reports zero
      violations (`parameters.a11y.test = 'error'` fails CI on a new violation).
- [ ] A changeset describes the change (`npx changeset`) — see below for how to pick the bump.

## Commits & changesets

- Commits follow **Conventional Commits** (`fix:`, `feat:`, `docs:`, `chore:`, …) — enforced by
  commitlint on the `commit-msg` hook. See the root `README.md` → "Commit hygiene" for the
  one-time local hook setup.
- Every user-facing change needs a changeset: `npx changeset`, describe the change, and pick the
  semver bump. **A token rename/removal or a prop removal is a breaking (major) change** — see
  `docs/DEPRECATION.md` for how to deprecate instead of breaking silently. Adding a token,
  component, or icon is additive (minor or patch).
- `@nemo/components`, `@nemo/tokens`, `@nemo/react`, `@nemo/vue`, and `@nemo/angular` are versioned
  and released **in lockstep** (see `.changeset/config.json`), so one changeset covering the
  affected packages is usually enough even if only `@nemo/components` actually changed code.

## Running things locally

See the root `README.md` for the full command list (`npm run build`, `npm run storybook`,
`npm test`, `npm run lint`, etc.) and the phased build plan in `docs/phases/` for the reasoning
behind each part of the toolchain.
