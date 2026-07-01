# Phase 5 — Quality Gates + CI/CD

**Goal:** Automated guardrails so the system stays consistent as it grows, and a pipeline that validates tokens → build → test → visual → release on every change.

**Prerequisites:** Phases 1–4 in place. **Reads:** `CLAUDE.md`.

---

## 1. Linting & formatting

- **ESLint** with **`@stencil/eslint-plugin`** (+ `@typescript-eslint`) for component/TS rules.
- **Stylelint** for component CSS/SCSS.
- **Prettier** for formatting; wire all three so they don't fight.

## 2. Token-discipline guard (the high-value rule)

Enforce the `CLAUDE.md` rule that **components reference only semantic tokens, never raw colors or primitives**:

- A Stylelint rule (e.g. `declaration-property-value-disallowed-list` / a regex check) that **fails on raw `#hex`, `rgb()`, `hsl()`, or `--nemo-palette-*` (primitive) usage inside `src/components/**` styles.** Only `var(--nemo-color-*)` semantic tokens are allowed.
- Optionally a check that every referenced `--nemo-color-*` exists in the generated token set (no typos / orphan references).

## 3. Commit hygiene

- **commitlint** + **Conventional Commits** (feeds Changesets/semver).
- **Husky** + **lint-staged**: pre-commit runs lint/format on staged files; commit-msg runs commitlint.

## 4. CI/CD (GitHub Actions)

A pipeline roughly:

1. **Validate** — install; lint (ESLint + Stylelint incl. token guard); typecheck; validate the DTCG token JSON (schema + no missing `$type`, no orphan/duplicate tokens).
2. **Build** — `tokens:build` → `stencil build` → framework wrappers. Fail on build errors.
3. **Test** — Stencil spec + e2e; Storybook a11y (fail on new violations); coverage.
4. **Visual** — Chromatic build; surface the diff/preview link on the PR.
5. **Release** (on merge to main) — Changesets versions + publishes changed packages to npm (with provenance), opens update PRs in consuming repos if you use Renovate.

Deploy Storybook (static build) to a hosted URL per PR or on main so designers/QA review components and the live token diff.

## Definition of done

- [ ] `npm run lint` covers ESLint + Stylelint + Prettier and passes clean.
- [ ] The token-discipline rule **fails** when a raw hex or primitive token is introduced into a component style (verify with a deliberate violation, then revert).
- [ ] commitlint + Husky + lint-staged active; a non-conventional commit is rejected.
- [ ] GitHub Actions runs validate → build → test → visual on PRs, and release on merge; a sample PR shows a Chromatic diff and an a11y result.
