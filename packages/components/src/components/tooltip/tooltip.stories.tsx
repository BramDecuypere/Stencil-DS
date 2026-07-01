import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { NemoTooltip } from './tooltip';

const meta: Meta<NemoTooltip> = {
  title: 'Components/Tooltip',
  component: NemoTooltip,
  argTypes: {
    position: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
    iconVariant: { control: 'select', options: ['full', 'outlined'] },
    content: { control: 'text' },
    accessibleLabel: { control: 'text' },
  },
  args: {
    content: 'Si la date est fictive, signalez-le en information complémentaire',
    position: 'bottom',
    iconVariant: 'full',
  },
  render: (props) => <nemo-tooltip {...props} />,
};
export default meta;

type Story = StoryObj<NemoTooltip>;

export const Bottom: Story = { args: { position: 'bottom' } };
export const Top: Story = { args: { position: 'top' } };
export const Left: Story = { args: { position: 'left' } };
export const Right: Story = { args: { position: 'right' } };
export const Outlined: Story = { args: { iconVariant: 'outlined' } };

export const WithCustomTrigger: Story = {
  args: { content: 'Continue to the next step' },
  render: (props) => (
    <nemo-tooltip {...props}>
      <nemo-button variant="secondary" size="small">
        Hover or focus me
      </nemo-button>
    </nemo-tooltip>
  ),
};

/**
 * All four positions side by side. Hover or Tab to each trigger to reveal it.
 */
export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '64px', padding: '48px', alignItems: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((position) => (
        <nemo-tooltip content={`Position: ${position}`} position={position} />
      ))}
    </div>
  ),
};
