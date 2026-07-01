# Phase 3 — Storybook + Testing

**Goal:** Storybook documenting tokens and both components, with automated **behavior**, **accessibility**, and **visual-regression** testing.

**Prerequisites:** Phase 2. **Reads:** `CLAUDE.md`.

---

## Storybook (official Stencil plugin)

Use `@stencil/storybook-plugin`. Install Storybook 8, optionally migrate to 9 (`npx storybook@latest upgrade`):

```bash
npm install --save-dev \
  storybook@8 @storybook/addon-essentials@8 @storybook/addon-links@8 @storybook/addon-interactions@8 \
  @stencil/core@latest @stencil/storybook-plugin
npm install -D typescript vite-plugin-live-reload
```

- **`.storybook/main.ts`** → `framework: { name: '@stencil/storybook-plugin' }`, `stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)']`, addons links/essentials/interactions.
- **`.storybook/preview.tsx`** → register components + manifest so prop/event/slot/CSS-var tables auto-generate:
  ```ts
  import { defineCustomElements } from '../loader/index.js';
  import { setCustomElementsManifest } from '@stencil/storybook-plugin';
  import customElements from '../custom-elements.json';
  defineCustomElements();
  setCustomElementsManifest(customElements);
  ```
- **`.storybook/preview-head.html`** → inject the generated token stylesheet (`src/global/tokens.css`) so every story renders with Nemo tokens. Add a dark-mode toggle (background/global) that flips `[data-theme="dark"]`.
- Script: `"storybook": "storybook dev -p 6006 --no-open"`. Build Stencil first (or `stencil build --watch` in parallel) so `loader/` + `custom-elements.json` exist.

## Stories (co-located: `src/components/<name>/<name>.stories.tsx`)

- **`Foundations/Colors`** — swatches for every semantic role token (grouped Primary/Secondary/Tertiary/Surface/Outline/Status), each showing role name, CSS variable, and resolved hex. Visual proof the token pipeline is wired.
- **`Components/Button`** — `Meta`/`StoryObj` from `@stencil/storybook-plugin` with `argTypes` for every prop. Stories: `Primary`, `Secondary`, `Tertiary`, `Small`, `IconOnly`, `Loading`, `Disabled`, `WithLeadingIcon`, `WithTrailingIcon`, plus a `States` matrix (default/hover/focus/pressed/disabled).
- **`Components/TextInput`** — stories: `Default`, `Filled`, `WithIcon`, `WithTooltip`, `Expandable`, `ReadOnly`, `Disabled`, `Error`, `Warning`, `Required`, `Paired`.

## Testing — three layers

**1. Component behavior — Stencil's native test tooling.** Stencil ships Jest-based **spec** tests and Puppeteer-based **e2e** tests (`stencil test --spec --e2e`). Use these for logic and rendered behavior: button click/disabled/loading, input value/change events, validation state, expandable → textarea, read-only focusability. This is the most reliable behavior layer for a Stencil project.

**2. Accessibility — Storybook a11y addon.** Add **`@storybook/addon-a11y`** (axe-core). Every story is scanned against WCAG; the panel groups violations and deep-links to the offending node. Given the Nemo a11y requirements, treat new a11y violations as build-blocking in CI (Phase 5).

**3. Visual regression — Chromatic.** Add **`@chromatic-com/storybook`**. It snapshots every story, baselines them, and flags unintended visual diffs per PR (and offers cloud accessibility regression). This is the safety net that catches "a token tweak shifted 40 components."

> **Optional — Storybook Vitest addon:** Storybook 9 can run interaction tests via `@storybook/addon-vitest` (real-browser, Playwright Chromium), which superseded the old test-runner. It requires a **Vite-powered** Storybook framework — **confirm `@stencil/storybook-plugin` is Vite-based before adopting it.** If it isn't, keep layer 1 (Stencil spec/e2e) for behavior and use play functions + the a11y addon + Chromatic for the rest. Either path is fine; don't block on the Vitest addon.

## Definition of done

- [ ] Storybook runs on :6006 with auto-generated prop/event/slot/CSS-var tables and a working dark-mode toggle.
- [ ] Colors foundations story + all listed button and text-input stories render.
- [ ] Stencil spec/e2e tests cover the key behaviors above and pass.
- [ ] a11y addon reports zero violations on all component stories.
- [ ] Chromatic project connected; baseline build captured.
