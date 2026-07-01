# CLAUDE.md — Nemo Design System

Standing context for any agent working in this repo. Read this before every task. It applies to all phases.

## What this is

A **web-component design system** built with **Stencil** (component library, not an app), documented and tested in **Storybook**, distributed to web/React/Vue/Angular consumers via npm. Source of truth for design is the **Nemo Design System** Figma file.

- **Node.js 18+**, **TypeScript** (strict; no `any` in public APIs), JSX via `h` from `@stencil/core`.
- **Shadow DOM on** for every component.
- Custom element tags are prefixed **`nemo-`** (e.g. `nemo-button`). Never put "stencil" in a tag name.

## Figma source — read real values from here

You have the Figma connector. **Resolve every concrete value (hex, size, radius, spacing, typography, per-state styling) from Figma. Do not invent or approximate.** If a value can't be resolved, list it as an explicit `TODO`, don't guess.

- File: `https://www.figma.com/design/weynzQ70GHgrAHhyui3I8L/Nemo-Design-System`
- Colors: node `11167-12650`
- Button: node `4-31`
- Text input: node `4-33`

To get resolved variable/color values, the Figma node usually must be **selected in the Figma desktop app** (Dev Mode), then read via `get_variable_defs` / `get_design_context`. Metadata (structure, variant names) is readable by node id without selection.

> Note (Phase 1): `get_variable_defs` also resolves when passed a concrete **child frame** node id even without a live selection — only the _page-level_ node id fails. The Colors variables are modelled as **semantic roles** (e.g. `Primary/Primary Container`); the tonal numbers shown in the file (e.g. `Primary/40`) are documentation labels, not separate variables.

## Token discipline (non-negotiable)

Two token tiers:

- **Primitive** palette tokens — raw tonal scales (the source material).
- **Semantic** role tokens — what components reference.

**Components reference the semantic tier only — never primitives, never raw hex/rgb.** A component that reads a primitive or a literal color is a bug; dark mode and rebranding depend on this rule. There is a lint rule enforcing it (Phase 5).

## Accessibility baseline

The Nemo specs are accessibility-forward; honor it everywhere:

- Visible focus via `:focus-visible` on every interactive element.
- Correct ARIA: `aria-invalid` on errors, `aria-describedby` for helper/error text, `aria-required` for required fields, accessible names for icon-only controls.
- Minimum touch target (~44px) on interactive elements.
- **Read-only ≠ disabled** — read-only must stay focusable and announced.
- Never signal state by color alone.

## Conventions

- Co-locate everything per component: `src/components/<name>/` holds the `.tsx`, styles, generated `readme.md`, stories, and tests.
- Generated artifacts (token CSS/TS, `custom-elements.json`, framework wrappers) are **built, not hand-edited**.
- Commits follow **Conventional Commits**; releases are managed by **Changesets** (Phase 4). A token rename or prop removal is a breaking change.

## Definition-of-done philosophy

A phase is done when it builds clean, its outputs are generated (not stubbed), values trace back to Figma, and the accessibility + token-discipline rules above hold. Each phase file lists specific criteria.
