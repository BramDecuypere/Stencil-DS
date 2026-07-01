import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { nemoColor, type NemoColorRole } from '@nemo/tokens';

/**
 * Foundations / Colors — a swatch per semantic role, showing the role name, its
 * CSS variable, and the live-resolved value. Visual proof the generated token
 * pipeline is wired (and that dark mode flips via the toolbar theme toggle).
 */
const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

const GROUPS: { title: string; match: (role: string) => boolean }[] = [
  { title: 'Primary', match: (r) => r.includes('primary') },
  { title: 'Secondary', match: (r) => r.includes('secondary') },
  { title: 'Tertiary', match: (r) => r.includes('tertiary') },
  {
    title: 'Surface',
    match: (r) =>
      r.includes('surface') || r.startsWith('inverse-') || r === 'shadow' || r === 'scrim',
  },
  { title: 'Outline', match: (r) => r.startsWith('outline') },
  {
    title: 'Status',
    match: (r) => /(^|-)(error|info|warn|success)/.test(r),
  },
];

const roles = Object.keys(nemoColor) as NemoColorRole[];

// Shared probe to resolve a CSS variable to its computed value at render time.
let probe: HTMLSpanElement | undefined;
function resolve(varName: string): string {
  if (typeof document === 'undefined') return '';
  if (!probe) {
    probe = document.createElement('span');
    probe.style.display = 'none';
    document.body.appendChild(probe);
  }
  probe.style.color = `var(${varName})`;
  const rgb = getComputedStyle(probe).color;
  const m = rgb.match(/\d+/g);
  if (!m) return rgb;
  return (
    '#' +
    m
      .slice(0, 3)
      .map((n) => Number(n).toString(16).padStart(2, '0'))
      .join('')
  );
}

const Swatch = (role: NemoColorRole) => {
  const varName = `--nemo-color-${role}`;
  return (
    <div
      style={{
        border: '1px solid var(--nemo-color-outline-variant)',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: '11px',
      }}
    >
      <div style={{ height: '56px', background: `var(${varName})` }} />
      <div
        style={{
          padding: '8px',
          background: 'var(--nemo-color-surface)',
          color: 'var(--nemo-color-on-surface)',
        }}
      >
        <div style={{ fontWeight: '600' }}>{role}</div>
        <div style={{ opacity: '0.7' }}>{varName}</div>
        <div ref={(el) => el && (el.textContent = resolve(varName))} />
      </div>
    </div>
  );
};

export const Roles: Story = {
  render: () => (
    <div style={{ padding: '24px', background: 'var(--nemo-color-surface)', minHeight: '100vh' }}>
      {GROUPS.map((g) => {
        const items = roles.filter((r) => g.match(r));
        if (!items.length) return null;
        return (
          <section style={{ marginBottom: '32px' }}>
            <h3
              style={{ fontFamily: 'system-ui, sans-serif', color: 'var(--nemo-color-on-surface)' }}
            >
              {g.title}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px',
              }}
            >
              {items.map((r) => Swatch(r))}
            </div>
          </section>
        );
      })}
    </div>
  ),
};
