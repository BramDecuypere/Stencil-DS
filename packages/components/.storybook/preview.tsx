// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';
import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import customElements from '../custom-elements.json';
import '@nemo/tokens/tokens.css';

/**
 * Registers all custom elements in the Storybook preview.
 */
defineCustomElements();

/**
 * Loads and registers component metadata for Storybook.
 * This enables automatic generation of props, methods, events, slots, shadow parts, and CSS variables tables.
 */
setCustomElementsManifest(customElements);

/**
 * Phase 5: a11y violations fail the build (run via `test-storybook` in CI —
 * see .github/workflows/ci.yml). CLAUDE.md's accessibility baseline is
 * non-negotiable, so every story is held to it by default.
 */
const preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
