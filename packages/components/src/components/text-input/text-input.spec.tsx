import { newSpecPage } from '@stencil/core/testing';
import { NemoTextInput } from './text-input';

describe('nemo-text-input', () => {
  it('associates the label with the control', async () => {
    const page = await newSpecPage({
      components: [NemoTextInput],
      html: `<nemo-text-input label="Name"></nemo-text-input>`,
    });
    const label = page.root!.shadowRoot!.querySelector('label')!;
    const input = page.root!.shadowRoot!.querySelector('input')!;
    expect(input).not.toBeNull();
    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
  });

  it('marks required with aria-required and a non-color asterisk', async () => {
    const page = await newSpecPage({
      components: [NemoTextInput],
      html: `<nemo-text-input label="Name" required></nemo-text-input>`,
    });
    const input = page.root!.shadowRoot!.querySelector('input')!;
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(page.root!.shadowRoot!.querySelector('.required')!.textContent).toContain('*');
  });

  it('sets aria-invalid and aria-describedby in the error state', async () => {
    const page = await newSpecPage({
      components: [NemoTextInput],
      html: `<nemo-text-input label="Name" validation-state="error" validation-message="Bad value"></nemo-text-input>`,
    });
    const input = page.root!.shadowRoot!.querySelector('input')!;
    const msg = page.root!.shadowRoot!.querySelector('.validation')!;
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain(msg.getAttribute('id'));
    expect(msg.getAttribute('role')).toBe('alert');
  });

  it('renders a textarea when expandable', async () => {
    const page = await newSpecPage({
      components: [NemoTextInput],
      html: `<nemo-text-input label="Msg" expandable></nemo-text-input>`,
    });
    expect(page.root!.shadowRoot!.querySelector('textarea')).not.toBeNull();
    expect(page.root!.shadowRoot!.querySelector('input')).toBeNull();
  });

  it('read-only stays focusable (readonly, not disabled)', async () => {
    const page = await newSpecPage({
      components: [NemoTextInput],
      html: `<nemo-text-input label="Name" readonly value="x"></nemo-text-input>`,
    });
    const input = page.root!.shadowRoot!.querySelector('input')!;
    expect(input.readOnly).toBe(true);
    expect(input.disabled).toBe(false);
  });
});
