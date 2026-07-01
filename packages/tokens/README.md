# @nemo/tokens

Generated design tokens for the Nemo Design System: semantic color roles as CSS custom properties and a typed TS map. Source of truth is `tokens/` (DTCG primitive + semantic JSON), compiled via [Style Dictionary](https://styledictionary.com).

## Build

```bash
npm run build -w @nemo/tokens
```

Emits `dist/tokens.css`, `dist/tokens.js`, `dist/tokens.d.ts` from `tokens/primitive/**` + `tokens/semantic/<theme>/**`.

## Usage

```css
@import '@nemo/tokens/tokens.css';
```

```ts
import { nemoColor, type NemoColorRole } from '@nemo/tokens';

nemoColor.primary; // 'var(--nemo-color-primary)'
```

`@nemo/components` consumes `dist/tokens.css` directly as its Stencil `globalStyle`, so every consumer of the components package already gets the light-theme variables compiled in. Import this package directly when you need the dark-theme stylesheet, the typed role map, or tokens outside of a Stencil/web-component context.
