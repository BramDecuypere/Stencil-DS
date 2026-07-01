import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { NemoButton } from './button';

const meta: Meta<NemoButton> = {
  title: 'Components/Button',
  component: NemoButton,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['medium', 'small'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    iconOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    accessibleLabel: { control: 'text' },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    type: 'button',
    iconOnly: false,
    loading: false,
    disabled: false,
    fullWidth: false,
  },
  render: (props) => <nemo-button {...props}>Button</nemo-button>,
};
export default meta;

type Story = StoryObj<NemoButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    iconOnly: false,
    loading: false,
  },
};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Tertiary: Story = { args: { variant: 'tertiary' } };
export const Small: Story = { args: { variant: 'secondary', size: 'small' } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const IconOnly: Story = {
  args: { variant: 'secondary', iconOnly: true, accessibleLabel: 'Search' },
  render: (props) => (
    <nemo-button {...props}>
      <nemo-icon slot="leading-icon" name="search" />
    </nemo-button>
  ),
};

export const WithLeadingIcon: Story = {
  render: (props) => (
    <nemo-button {...props}>
      <nemo-icon slot="leading-icon" name="arrow-right" />
      Continue
    </nemo-button>
  ),
};

export const WithTrailingIcon: Story = {
  render: (props) => (
    <nemo-button {...props}>
      Continue
      <nemo-icon slot="trailing-icon" name="arrow-right" />
    </nemo-button>
  ),
};

/**
 * State matrix. Default + disabled are shown directly; hover / focus-visible /
 * pressed are CSS states — hover the buttons, Tab to them, or press to see them.
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <nemo-button variant={variant}>Default</nemo-button>
          <nemo-button variant={variant} disabled>
            Disabled
          </nemo-button>
          <nemo-button variant={variant} loading>
            Loading
          </nemo-button>
        </div>
      ))}
    </div>
  ),
};
