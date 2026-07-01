# @nemo/react

Typed React wrappers for the Nemo Design System, generated from `@nemo/components` via [`@stencil/react-output-target`](https://stenciljs.com/docs/react).

## Build

From the repo root (order matters — generates the wrapper source first):

```bash
npm install
npm run build -w @nemo/components   # generates src/components/stencil-generated/
npm run build -w @nemo/react        # tsc -> dist/
```

## Smoke-test in a throwaway app

```bash
npm create vite@latest nemo-react-smoketest -- --template react-ts
cd nemo-react-smoketest
npm install
npm install ../../path/to/Stencil-DS/packages/react   # or: npm link @nemo/react
```

```tsx
// src/App.tsx
import { NemoButton } from '@nemo/react';

export default function App() {
  return <NemoButton variant="primary">Hello Nemo</NemoButton>;
}
```

```bash
npm run build   # confirms types resolve and the component renders/compiles
```

## Usage

```tsx
import { NemoButton, NemoTextInput } from '@nemo/react';

<NemoButton variant="primary" onNemoClick={() => console.log('clicked')}>
  Save
</NemoButton>;
```
