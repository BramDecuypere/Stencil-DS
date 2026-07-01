import { newE2EPage } from '@stencil/core/testing';

describe('nemo-button (e2e)', () => {
  it('emits nemoClick when activated', async () => {
    const page = await newE2EPage();
    await page.setContent('<nemo-button>Go</nemo-button>');
    const click = await page.spyOnEvent('nemoClick');
    const el = await page.find('nemo-button');
    await el.click();
    await page.waitForChanges();
    expect(click).toHaveReceivedEventTimes(1);
  });

  it('does not emit nemoClick when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<nemo-button disabled>Go</nemo-button>');
    const click = await page.spyOnEvent('nemoClick');
    const el = await page.find('nemo-button');
    await el.click();
    await page.waitForChanges();
    expect(click).toHaveReceivedEventTimes(0);
  });
});
