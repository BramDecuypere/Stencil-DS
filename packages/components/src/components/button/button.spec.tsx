import { newSpecPage } from '@stencil/core/testing';
import { NemoButton } from './button';

describe('nemo-button', () => {
  it('renders a native button with the default type', async () => {
    const page = await newSpecPage({
      components: [NemoButton],
      html: `<nemo-button>Go</nemo-button>`,
    });
    const btn = page.root!.shadowRoot!.querySelector('button')!;
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('type')).toBe('button');
    expect(page.root!.getAttribute('variant')).toBe('primary');
  });

  it('reflects variant and size to host attributes', async () => {
    const page = await newSpecPage({
      components: [NemoButton],
      html: `<nemo-button variant="secondary" size="small">Go</nemo-button>`,
    });
    expect(page.root!.getAttribute('variant')).toBe('secondary');
    expect(page.root!.getAttribute('size')).toBe('small');
  });

  it('shows a spinner, sets aria-busy and disables the button while loading', async () => {
    const page = await newSpecPage({
      components: [NemoButton],
      html: `<nemo-button loading>Go</nemo-button>`,
    });
    const btn = page.root!.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.disabled).toBe(true);
    expect(page.root!.shadowRoot!.querySelector('.spinner')).not.toBeNull();
  });

  it('does not emit nemoClick when disabled', async () => {
    const page = await newSpecPage({
      components: [NemoButton],
      html: `<nemo-button disabled>Go</nemo-button>`,
    });
    const spy = jest.fn();
    page.root!.addEventListener('nemoClick', spy);
    page.root!.shadowRoot!.querySelector('button')!.click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('uses accessibleLabel as the aria-label for an icon-only button', async () => {
    const page = await newSpecPage({
      components: [NemoButton],
      html: `<nemo-button icon-only accessible-label="Search"><svg slot="leading-icon"></svg></nemo-button>`,
    });
    const btn = page.root!.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-label')).toBe('Search');
  });
});
