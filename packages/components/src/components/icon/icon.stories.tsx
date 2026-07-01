import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { NemoIcon } from './icon';
import { nemoIcons } from './icons.generated';

const ICON_NAMES = Object.keys(nemoIcons) as (keyof typeof nemoIcons)[];

const meta: Meta<NemoIcon> = {
  title: 'Components/Icon',
  component: NemoIcon,
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'number' },
    label: { control: 'text' },
  },
  args: {
    name: 'search',
    size: 24,
  },
  render: (props) => <nemo-icon {...props} />,
};
export default meta;

type Story = StoryObj<NemoIcon>;

/** Default — decorative (no accessible name), inherits `currentColor` from its parent. */
export const Default: Story = {};

/** A labelled, standalone icon (e.g. used with no visible text nearby). */
export const WithAccessibleLabel: Story = {
  args: { name: 'alert-circle', label: 'Warning' },
};

/** The full set generated from `packages/components/icons/`. */
export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: '16px',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '12px',
      }}
    >
      {ICON_NAMES.map((name) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <nemo-icon name={name} size={24} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};

/** Icons inherit color from context — no per-icon color prop. */
export const InheritsColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <span style={{ color: 'var(--nemo-color-primary)' }}>
        <nemo-icon name="check" />
      </span>
      <span style={{ color: 'var(--nemo-color-error)' }}>
        <nemo-icon name="alert-circle" />
      </span>
      <span style={{ color: 'var(--nemo-color-on-surface-variant)' }}>
        <nemo-icon name="search" />
      </span>
    </div>
  ),
};

/** Used in nemo-button's leading-icon slot — see also Components/Button. */
export const InButton: Story = {
  render: () => (
    <nemo-button variant="secondary">
      <nemo-icon slot="leading-icon" name="search" />
      Search
    </nemo-button>
  ),
};

/** Used in nemo-text-input's icon slot — see also Components/TextInput. */
export const InTextInput: Story = {
  render: () => (
    <nemo-text-input label="Email" placeholder="you@example.com">
      <nemo-icon slot="icon" name="mail" />
    </nemo-text-input>
  ),
};
