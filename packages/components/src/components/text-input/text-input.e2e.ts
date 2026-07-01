import { newE2EPage } from '@stencil/core/testing';

describe('nemo-text-input (e2e)', () => {
  it('emits nemoInput per keystroke and nemoChange on commit', async () => {
    const page = await newE2EPage();
    await page.setContent('<nemo-text-input label="Name"></nemo-text-input>');

    const input = await page.spyOnEvent('nemoInput');
    const change = await page.spyOnEvent('nemoChange');

    const field = await page.find('nemo-text-input >>> input');
    await field.type('Jo');
    await page.waitForChanges();
    expect(input).toHaveReceivedEventTimes(2);

    // Commit by blurring the field.
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    expect(change).toHaveReceivedEventTimes(1);

    const detail = change.lastEvent.detail as { value: string };
    expect(detail.value).toBe('Jo');
  });
});
