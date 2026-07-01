import { APP_INITIALIZER, NgModule } from '@angular/core';
import { defineCustomElements } from '@nemo/components/loader';
import { DIRECTIVES } from './stencil-generated';

/**
 * Declares + exports every generated Nemo directive wrapper, and registers
 * the underlying custom elements via Stencil's lazy-loader on app init.
 *
 *   import { NemoComponentsModule } from '@nemo/angular';
 *
 *   @NgModule({ imports: [NemoComponentsModule] })
 *   export class AppModule {}
 */
@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
})
export class NemoComponentsModule {}
