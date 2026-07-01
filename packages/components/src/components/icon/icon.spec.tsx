import { newSpecPage } from '@stencil/core/testing';
import { NemoIcon } from './icon';

describe('nemo-icon', () => {
  it('renders an svg with the requested viewBox and inherits currentColor', async () => {
    const page = await newSpecPage({
      components: [NemoIcon],
      html: `<nemo-icon name="search"></nemo-icon>`,
    });
    const svg = page.root!.shadowRoot!.querySelector('svg')!;
    expect(svg).not.toBeNull();
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg.getAttribute('stroke')).toBe('currentColor');
  });

  it('is decorative (aria-hidden) by default', async () => {
    const page = await newSpecPage({
      components: [NemoIcon],
      html: `<nemo-icon name="search"></nemo-icon>`,
    });
    const svg = page.root!.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.hasAttribute('role')).toBe(false);
  });

  it('becomes an accessible image when a label is provided', async () => {
    const page = await newSpecPage({
      components: [NemoIcon],
      html: `<nemo-icon name="alert-circle" label="Warning"></nemo-icon>`,
    });
    const svg = page.root!.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Warning');
    expect(svg.hasAttribute('aria-hidden')).toBe(false);
  });

  it('respects a custom size', async () => {
    const page = await newSpecPage({
      components: [NemoIcon],
      html: `<nemo-icon name="search" size="32"></nemo-icon>`,
    });
    const svg = page.root!.shadowRoot!.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
  });

  it('warns and renders an empty svg for an unknown icon name', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const page = await newSpecPage({
      components: [NemoIcon],
      html: `<nemo-icon name="does-not-exist"></nemo-icon>`,
    });
    expect(warn).toHaveBeenCalled();
    const svg = page.root!.shadowRoot!.querySelector('svg')!;
    expect(svg.innerHTML).toBe('');
    warn.mockRestore();
  });
});
