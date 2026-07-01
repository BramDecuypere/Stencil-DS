import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { NemoTextInput } from './text-input';

const meta: Meta<NemoTextInput> = {
  title: 'Components/TextInput',
  component: NemoTextInput,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    validationState: { control: 'select', options: ['none', 'error', 'warning'] },
    validationMessage: { control: 'text' },
    tooltip: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    expandable: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    value: '',
    placeholder: 'Placeholder',
    validationState: 'none',
    disabled: false,
    readonly: false,
    required: false,
    expandable: false,
  },
  render: (props) => <nemo-text-input {...props} />,
};
export default meta;

type Story = StoryObj<NemoTextInput>;

export const Default: Story = { args: { helperText: 'Helper text' } };
export const Filled: Story = { args: { value: 'Jane Doe' } };
export const Required: Story = {
  args: { label: 'Full name', required: true, helperText: 'As on your ID' },
};
export const Disabled: Story = { args: { disabled: true } };
export const ReadOnly: Story = { args: { value: 'Displayed, not editable', readonly: true } };
export const Expandable: Story = {
  args: { label: 'Message', expandable: true, helperText: 'Multiple lines' },
};

export const WithIcon: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
  render: (props) => (
    <nemo-text-input {...props}>
      <nemo-icon slot="icon" name="mail" />
    </nemo-text-input>
  ),
};

/** Password field with a show/hide toggle icon — a documented Icon-variant use case. */
export const PasswordToggle: Story = {
  args: { label: 'Password', placeholder: '••••••••' },
  render: (props) => (
    <nemo-text-input {...props}>
      <nemo-icon slot="icon" name="eye" label="Show password" />
    </nemo-text-input>
  ),
};

export const WithTooltip: Story = {
  args: {
    label: 'NISS',
    placeholder: '00000000000',
    tooltip: 'Numéro de sécurité sociale (11 digits)',
  },
};

export const Error: Story = {
  args: {
    label: 'Working hours',
    value: '38h',
    validationState: 'error',
    validationMessage: 'Attention: un conflit horaire a été détecté.',
  },
};

export const Warning: Story = {
  args: {
    label: 'Working hours',
    value: '36h',
    validationState: 'warning',
    validationMessage: 'This is below the usual minimum.',
  },
};

/** Paired, closely-related fields in a row (allowed exception to single-column forms). */
export const Paired: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '480px' }}>
      <nemo-text-input label="First name" placeholder="Jane" />
      <nemo-text-input label="Surname" placeholder="Doe" />
    </div>
  ),
};
