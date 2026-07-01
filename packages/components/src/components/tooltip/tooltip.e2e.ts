import { newE2EPage } from '@stencil/core/testing';

describe('nemo-tooltip (e2e)', () => {
  it('reveals the content panel on keyboard focus of the built-in icon trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(`<nemo-tooltip content="Helpful hint"></nemo-tooltip>`);
    const trigger = await page.find('nemo-tooltip >>> .icon-trigger');
    await trigger.focus();
    await page.waitForChanges();
    const content = await page.find('nemo-tooltip >>> .content');
    const opacity = await content.getComputedStyle();
    expect(opacity.opacity).toBe('1');
  });

  it('hides the content panel when focus leaves the trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<nemo-tooltip content="Helpful hint"></nemo-tooltip><button id="away">away</button>`,
    );
    const trigger = await page.find('nemo-tooltip >>> .icon-trigger');
    await trigger.focus();
    await page.waitForChanges();
    await page.$eval('#away', (el: Element) => (el as HTMLElement).focus());
    await page.waitForChanges();
    const content = await page.find('nemo-tooltip >>> .content');
    const style = await content.getComputedStyle();
    expect(style.opacity).toBe('0');
  });
});
