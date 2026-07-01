# @nemo/angular

Typed Angular wrappers for the Nemo Design System, generated from `@nemo/components` via [`@stencil/angular-output-target`](https://stenciljs.com/docs/angular), built with **ng-packagr**.

Targets Angular 19+ (`@stencil/angular-output-target@1.x`). If your app is on Angular ≤18, pin `@stencil/angular-output-target` to `^0.10.2` in `packages/components/package.json` instead and re-check the generated wrapper output.

## Build

From the repo root (order matters — generates the wrapper source first):

```bash
npm install
npm run build -w @nemo/components   # generates src/lib/stencil-generated/
npm run build -w @nemo/angular      # ng-packagr -> dist/  (the publishable unit)
```

## Smoke-test in a throwaway app

```bash
npx -p @angular/cli ng new nemo-angular-smoketest --standalone=false
cd nemo-angular-smoketest
npm install ../../path/to/Stencil-DS/packages/angular/dist   # or: npm link from dist/
```

```ts
// src/app/app.module.ts
import { NemoComponentsModule } from '@nemo/angular';

@NgModule({
  imports: [NemoComponentsModule],
})
export class AppModule {}
```

```html
<!-- src/app/app.component.html -->
<nemo-button variant="primary">Hello Nemo</nemo-button>
```

```bash
ng build   # confirms types resolve and the component compiles
```

## Publishing

ng-packagr writes a self-contained `package.json` into `dist/`. Publish **from `dist/`**, not the package root:

```bash
cd packages/angular/dist
npm publish --access public
```
