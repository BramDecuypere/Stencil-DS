# @nemo/vue

Typed Vue 3 wrappers for the Nemo Design System, generated from `@nemo/components` via [`@stencil/vue-output-target`](https://stenciljs.com/docs/vue).

## Build

From the repo root (order matters — generates the wrapper source first):

```bash
npm install
npm run build -w @nemo/components   # generates lib/components.ts
npm run build -w @nemo/vue          # tsc -> dist/
```

## Smoke-test in a throwaway app

```bash
npm create vue@latest nemo-vue-smoketest
cd nemo-vue-smoketest
npm install
npm install ../../path/to/Stencil-DS/packages/vue   # or: npm link @nemo/vue
```

In `vite.config.ts`, mark custom elements so Vue doesn't try to resolve them as components:

```ts
vue({
  template: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('nemo-'),
    },
  },
});
```

```ts
// src/main.ts
import { createApp } from 'vue';
import { NemoComponents } from '@nemo/vue';
import App from './App.vue';

createApp(App).use(NemoComponents).mount('#app');
```

```vue
<!-- src/App.vue -->
<template>
  <NemoButton variant="primary">Hello Nemo</NemoButton>
</template>

<script setup lang="ts">
import { NemoButton } from '@nemo/vue';
</script>
```

```bash
npm run build   # confirms types resolve and the component renders/compiles
```
