import { Component, Element, Host, Prop, h } from '@stencil/core';

export type NemoTooltipPosition = 'top' | 'right' | 'bottom' | 'left';
export type NemoTooltipIconVariant = 'full' | 'outlined';

let nextId = 0;

/**
 * Nemo tooltip. Implements the Figma `Tooltip` component (node 1012-2066 /
 * component set 10978-23978): a short, non-interactive hint revealed on hover
 * or keyboard focus of a trigger, positioned to one of four sides.
 *
 * Wrap any trigger in the default slot:
 * `<nemo-tooltip content="Hint"><button>Hover me</button></nemo-tooltip>`.
 * With no slotted trigger, a built-in `info` icon is rendered instead — the
 * pattern used throughout the Figma file — styled `full` (filled) or
 * `outlined` via `iconVariant`.
 *
 * Visibility is CSS-driven (`:hover` / `:focus-within`) so mouse and keyboard
 * behave identically, per the Figma spec: tooltips must appear on keyboard
 * focus, disappear when hover/focus is removed, and never contain
 * interactive content. The trigger is linked to the tooltip text via
 * `aria-describedby` (the tooltip is a description, never the trigger's only
 * accessible name).
 *
 * Colors reference the semantic token tier only (`--nemo-color-*`). Spacing,
 * radius and typography use resolved Figma values directly until those
 * foundations get dedicated token tiers (future, additive).
 *
 * @slot - Optional custom trigger. Falls back to a built-in info icon.
 * @part trigger - The trigger wrapper (custom trigger case).
 * @part icon-trigger - The built-in icon-trigger button (no custom trigger slotted).
 * @part content - The floating tooltip content panel.
 */
@Component({
  tag: 'nemo-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class NemoTooltip {
  @Element() host!: HTMLElement;

  /** Tooltip text. Keep it brief — per Figma: 1-5 words, max 1-2 short sentences. */
  @Prop() content!: string;

  /** Which side the tooltip opens toward. */
  @Prop({ reflect: true }) position: NemoTooltipPosition = 'bottom';

  /** Style of the built-in info-icon trigger. Ignored when a custom trigger is slotted. */
  @Prop({ reflect: true }) iconVariant: NemoTooltipIconVariant = 'full';

  /**
   * Accessible name for the built-in icon trigger (icon-only control — requires
   * an accessible name per the a11y baseline). Ignored when a custom trigger is
   * slotted (that element owns its own accessible name).
   */
  @Prop() accessibleLabel = 'More information';

  private contentId = '';
  private hasCustomTrigger = false;

  componentWillLoad() {
    this.contentId = `nemo-tooltip-content-${nextId++}`;
    this.hasCustomTrigger = this.host.childElementCount > 0 || !!this.host.textContent?.trim();
  }

  componentDidLoad() {
    if (this.hasCustomTrigger) {
      // The slotted trigger owns its own accessible name — we only attach the
      // description link so assistive tech announces the tooltip content.
      this.host.firstElementChild?.setAttribute('aria-describedby', this.contentId);
    }
  }

  render() {
    return (
      <Host>
        {this.hasCustomTrigger ? (
          <span class="trigger" part="trigger">
            <slot />
          </span>
        ) : (
          <button
            class="icon-trigger"
            part="icon-trigger"
            type="button"
            aria-label={this.accessibleLabel}
            aria-describedby={this.contentId}
          >
            <nemo-icon name="info" size={16} />
          </button>
        )}
        <span class="content" part="content" id={this.contentId} role="tooltip">
          {this.content}
        </span>
      </Host>
    );
  }
}
