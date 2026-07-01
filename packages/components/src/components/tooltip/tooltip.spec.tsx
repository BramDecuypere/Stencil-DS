import { newSpecPage } from '@stencil/core/testing';
import { NemoTooltip } from './tooltip';
import { NemoIcon } from '../icon/icon';

describe('nemo-tooltip', () => {
  it('renders the built-in info icon trigger when no custom trigger is slotted', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Helpful hint"></nemo-tooltip>`,
    });
    const trigger = page.root!.shadowRoot!.querySelector('.icon-trigger')!;
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-label')).toBe('More information');
  });

  it('reflects position and iconVariant to host attributes, defaulting sensibly', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Hi"></nemo-tooltip>`,
    });
    expect(page.root!.getAttribute('position')).toBe('bottom');
    expect(page.root!.getAttribute('icon-variant')).toBe('full');
  });

  it('links the built-in trigger to the content panel via aria-describedby', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Hi"></nemo-tooltip>`,
    });
    const trigger = page.root!.shadowRoot!.querySelector('.icon-trigger')!;
    const content = page.root!.shadowRoot!.querySelector('.content')!;
    expect(trigger.getAttribute('aria-describedby')).toBe(content.id);
    expect(content.getAttribute('role')).toBe('tooltip');
  });

  it('renders a slotted custom trigger instead of the built-in icon', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Hi"><button>Custom</button></nemo-tooltip>`,
    });
    expect(page.root!.shadowRoot!.querySelector('.icon-trigger')).toBeNull();
    expect(page.root!.shadowRoot!.querySelector('.trigger slot')).not.toBeNull();
  });

  it('links a custom trigger to the content panel via aria-describedby', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Hi"><button>Custom</button></nemo-tooltip>`,
    });
    const button = page.root!.querySelector('button')!;
    const content = page.root!.shadowRoot!.querySelector('.content')!;
    expect(button.getAttribute('aria-describedby')).toBe(content.id);
  });

  it('renders the tooltip text content', async () => {
    const page = await newSpecPage({
      components: [NemoTooltip, NemoIcon],
      html: `<nemo-tooltip content="Helpful hint"></nemo-tooltip>`,
    });
    expect(page.root!.shadowRoot!.querySelector('.content')!.textContent).toBe('Helpful hint');
  });
});
