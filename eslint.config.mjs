// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

// ESLint 9 flat config for the Nemo Design System monorepo.
//
// Scope: hand-written TypeScript/TSX across all workspaces. Generated
// artifacts (Stencil's dist/loader/www, custom-elements.json, and the
// generated framework-wrapper files) are "built, not hand-edited" per
// CLAUDE.md and are ignored below rather than linted.
import tseslint from 'typescript-eslint';
import stencil from '@stencil/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/loader/**',
      '**/www/**',
      '**/.stencil/**',
      '**/storybook-static/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/custom-elements.json',
      // Generated framework wrappers (Phase 4 output targets) — never hand-edited.
      'packages/react/src/components/stencil-generated/**',
      'packages/vue/lib/components.ts',
      'packages/angular/src/lib/stencil-generated/**',
      // Generated per-component docs.
      'packages/components/src/components/**/readme.md',
      // Generated token artifacts (Phase 1).
      'packages/tokens/src/tokens.css',
      'packages/tokens/src/tokens.ts',
    ],
  }, // Baseline TypeScript rules for every hand-written .ts/.tsx file.
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // CLAUDE.md: "TypeScript (strict; no `any` in public APIs)".
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }, // Stencil-specific rules — only the actual @Component definitions in
  // @nemo/components use Stencil decorators (Prop/State/Method/Event/etc.).
  {
    ...stencil.configs.flat.recommended,
    files: ['packages/components/src/components/**/*.tsx'],
    rules: {
      ...stencil.configs.flat.recommended.rules,
      // CLAUDE.md: "Custom element tags are prefixed `nemo-`. Never put
      // 'stencil' in a tag name."
      'stencil/required-prefix': ['error', 'nemo'],
    },
  }, // Prettier last: turns off stylistic ESLint rules that would otherwise
  // conflict with Prettier's own formatting (Phase 5 §1).
  prettierConfig,
  storybook.configs['flat/recommended'],
);
