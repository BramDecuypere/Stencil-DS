# Nemo Design System — Build Plan

A phased set of prompts for building the **Nemo Design System** as a production-grade, multi-framework web-component library with **Stencil**, documented and tested in **Storybook**, with a generated design-token pipeline and full release/CI tooling.

## How to use these

Feed **one phase at a time** to your coding agent (e.g. Claude Code). After each phase, confirm its _Definition of done_ before moving on. The phases build on each other in order.

Keep **`CLAUDE.md` in the repo root** — it's the standing context (conventions, Figma source, accessibility baseline, token discipline) that every phase assumes. Most agents read a root `CLAUDE.md` automatically; if not, paste it alongside each phase prompt.

## Phase map

| Phase | File                                  | Goal                                                                | Depends on        |
| ----- | ------------------------------------- | ------------------------------------------------------------------- | ----------------- |
| —     | `CLAUDE.md`                           | Standing conventions + Figma source (always in context)             | —                 |
| 1     | `phase-1-scaffold-and-tokens.md`      | Scaffold Stencil + generated DTCG → Style Dictionary token pipeline | —                 |
| 2     | `phase-2-components.md`               | `nemo-button` and `nemo-text-input`, consuming generated tokens     | 1                 |
| 3     | `phase-3-storybook-and-testing.md`    | Storybook docs + interaction/a11y/visual testing                    | 2                 |
| 4     | `phase-4-distribution-and-release.md` | React/Vue/Angular wrappers, packaging, Changesets release           | 2 (3 recommended) |
| 5     | `phase-5-quality-and-ci.md`           | Linting, token-discipline guard, commit hooks, GitHub Actions       | 1–4 present       |
| 6     | `phase-6-docs-icons-governance.md`    | MDX usage docs, icon pipeline, contribution/deprecation policy      | 2–3               |

## Scope of the components

Per the original brief, the **component** scope is intentionally small for now: **color tokens + Button + Text Input**. The **tooling** scope is the full premium setup. The token architecture and packaging are built so adding more foundations (typography, spacing, elevation) and components later is additive, not a rewrite.

## Sequencing advice

If you can't do everything at once, this order delivers value fastest:

1. Phase 1 (tokens) + Phase 2 (components) — a working, token-driven library.
2. Phase 3 — a11y + visual safety net before anyone depends on it.
3. Phase 4 — the moment a second app needs to consume it.
4. Phase 5, then Phase 6 — hardening and polish.
