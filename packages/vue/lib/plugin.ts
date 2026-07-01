import type { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@nemo/components/loader';

/**
 * Registers all Nemo custom elements with the browser's Custom Elements
 * Registry. Install once at the app root:
 *
 *   import { NemoComponents } from '@nemo/vue';
 *   createApp(App).use(NemoComponents).mount('#app');
 */
export const NemoComponents: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
