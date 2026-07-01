# Phase 1 — Scaffold + Token Pipeline

**Goal:** A Stencil `component` project whose color tokens are generated from a single DTCG source via Style Dictionary into CSS variables and typed TypeScript, wired into Stencil's global styles. No hand-written color CSS.

**Prerequisites:** none. **Reads:** `CLAUDE.md`.

---

## 1. Scaffold

```bash
npm init stencil      # choose: component
cd <project> && npm install
```

After scaffolding:

- Remove the `exports` array Stencil generates in `package.json` (it triggers a Storybook warning later).
- In `stencil.config.ts`, enable output targets that produce the **lazy loader** (`dist` → `loader/`) and the **custom-elements manifest + per-component `readme.md`** (so `custom-elements.json` is generated). Verify exact config against `https://stenciljs.com/docs/storybook`.
- Set `globalStyle` in `stencil.config.ts` to the compiled token stylesheet from step 3 (e.g. `src/global/tokens.css`).

## 2. Token source (DTCG)

Author tokens as **W3C DTCG JSON** (`$value` / `$type`), the stable v1 interchange format. Structure:

- `tokens/primitive/` — raw tonal scales resolved from Figma: `primary`, `secondary`, `tertiary`, `neutral`, `neutral-variant`, `error`, `info`, `warn`, `success`, each with the tones present in the file (e.g. `0,10,20,30,40,80,85,90,92,94,96,98,100`). Pull exact hex from Figma.
- `tokens/semantic/` — the role layer, aliasing primitives. **Components consume only this layer.**
- Model **light/dark as DTCG modes**, and keep the M3 **"fixed"** roles (which stay constant across themes) distinct from container roles.

### Semantic role inventory (extracted from the Colors page — map each to its Figma tone)

**Primary:** `primary` (Primary/40), `on-primary` (Primary/100), `primary-container` (Primary/90), `on-primary-container` (Primary/30), `primary-fixed` (Primary/90), `on-primary-fixed` (Primary/10), `primary-fixed-dim` (Primary/80), `on-primary-fixed-variant` (Primary/30), `inverse-primary` (Primary/80)

**Secondary:** `secondary` (Secondary/40), `on-secondary` (Secondary/100), `secondary-container` (Secondary/90), `on-secondary-container` (Secondary/30), `secondary-fixed` (Secondary/90), `on-secondary-fixed` (Secondary/10), `secondary-fixed-dim` (Secondary/80), `on-secondary-fixed-variant` (Secondary/30)

**Tertiary:** `tertiary` (Tertiary/40), `on-tertiary` (Tertiary/100), `tertiary-container` (Tertiary/90), `on-tertiary-container` (Tertiary/30), `tertiary-fixed` (Tertiary/90), `on-tertiary-fixed` (Tertiary/10), `tertiary-fixed-dim` (Tertiary/80), `on-tertiary-fixed-variant` (Tertiary/30)

**Surface:** `surface` (Neutral/100), `surface-variant` (Neutral/90), `surface-dim` (Neutral/87), `surface-bright` (Neutral/98), `on-surface` (Neutral/10), `on-surface-variant` (Neutral Variant/30), `surface-container-lowest` (Neutral/98), `surface-container-low` (Neutral/96), `surface-container` (Neutral/94), `surface-container-high` (Neutral/92), `surface-container-highest` (Neutral/90), `inverse-surface` (Neutral/20), `inverse-on-surface` (Neutral/95)

**Outline & utility:** `outline` (Neutral Variant/50), `outline-variant` (Neutral Variant/80 — one design frame references Primary/85; verify in Figma), `scrim` (Neutral/0), `shadow` (Neutral/0)

**Status:** `error` (Error/40), `on-error` (Error/100), `error-container` (Error/90), `on-error-container` (Error/30); `info` (Info/40), `on-info` (Info/100), `info-container` (Info/90), `on-info-container` (Info/30); `warn` (Warn/40), `on-warn` (Warn/100), `warn-container` (Warn/90), `on-warn-container` (Warn/30); `success` (Success/40), `on-success` (Success/100), `success-container` (Success/90), `on-success-container` (Success/30)

## 3. Build with Style Dictionary 4

Install `style-dictionary@^4`. Configure platforms to emit:

- **CSS variables** → `src/global/tokens.css` (format `css/variables`), naming `--nemo-color-<role>`, with the dark mode under `[data-theme="dark"]`.
- **Typed TS** → `src/global/tokens.ts` (a typed export of token name → value) so components and consumers get autocomplete instead of stringly-typed `var(--…)`.
- (Optional) **SCSS** if any component styles use Sass (`@stencil/sass`).

If tokens are authored/synced through **Tokens Studio**, add `@tokens-studio/sd-transforms`: set `preprocessors: ['tokens-studio']` and `expand: { typesMap: expandTypesMap }`, and use the `tokens-studio` transform group. Otherwise use Style Dictionary's native DTCG support directly. (DTCG uses `$value`/`$type`; don't mix with the legacy `value`/`type` in one run.)

Add scripts:

```jsonc
"tokens:build": "style-dictionary build",
"build": "npm run tokens:build && stencil build"
```

The token build must run **before** `stencil build` so the generated CSS/TS exist.

## Definition of done

- [ ] `npm init stencil` `component` project builds; `loader/` + `custom-elements.json` generated.
- [ ] DTCG token source covers all primitive scales + the full semantic role inventory above, values resolved from Figma (TODOs for any unresolved).
- [ ] `npm run tokens:build` generates `tokens.css` (with light + dark) and a typed `tokens.ts`.
- [ ] `globalStyle` loads the generated CSS; a throwaway test element styled with `var(--nemo-color-primary)` renders the Figma color.
- [ ] No hand-written hex anywhere outside the primitive token source.
