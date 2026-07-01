import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export type NemoButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type NemoButtonSize = 'medium' | 'small';
export type NemoButtonType = 'button' | 'submit' | 'reset';

/**
 * Nemo button. Maps the Figma `Type` (Primary/Secondary/Tertiary/Small/Icon) and
 * `State` (Default/Hover/Disabled) onto a clean orthogonal API: variant + size are
 * props; hover/focus/pressed are CSS states.
 *
 * Styling references the **semantic** color tier only (`--nemo-color-*`). Spacing,
 * radius, typography and elevation use the resolved Figma values directly until those
 * foundations get their own token tiers (future, additive).
 *
 * @slot - The button label (default slot).
 * @slot leading-icon - Icon before the label (or the glyph for an icon-only button).
 * @slot trailing-icon - Icon after the label.
 * @part button - The internal native button element.
 * @part label - The label wrapper.
 * @part spinner - The loading spinner.
 */
@Component({
  tag: 'nemo-button',
  styleUrl: 'button.css',
  shadow: true,
})
export class NemoButton {
  @Element() host!: HTMLElement;

  /** Visual emphasis. */
  @Prop({ reflect: true }) variant: NemoButtonVariant = 'primary';

  /** Size. `medium` ≈ 37px tall, `small` ≈ 25px tall (per Figma). */
  @Prop({ reflect: true }) size: NemoButtonSize = 'medium';

  /** Icon-only button (32×32). Requires `accessibleLabel` for an accessible name. */
  @Prop({ reflect: true }) iconOnly = false;

  /** Loading: shows a spinner, preserves width, sets `aria-busy`, and is non-interactive. */
  @Prop({ reflect: true }) loading = false;

  /** Disabled. Reflected to the host and the native button. */
  @Prop({ reflect: true }) disabled = false;

  /** Native button type. */
  @Prop() type: NemoButtonType = 'button';

  /** Stretch to the full width of the container. */
  @Prop({ reflect: true }) fullWidth = false;

  /** Accessible name — used as `aria-label`, required for icon-only buttons. */
  @Prop() accessibleLabel?: string;

  /** Emitted on activation (not emitted while disabled or loading). */
  @Event() nemoClick!: EventEmitter<MouseEvent>;

  private hasLeadingIcon = false;
  private hasTrailingIcon = false;

  componentWillLoad() {
    this.hasLeadingIcon = !!this.host.querySelector('[slot="leading-icon"]');
    this.hasTrailingIcon = !!this.host.querySelector('[slot="trailing-icon"]');
  }

  private onClick = (ev: MouseEvent) => {
    if (this.disabled || this.loading) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.nemoClick.emit(ev);
  };

  render() {
    const inactive = this.disabled || this.loading;

    if (this.iconOnly) {
      if (!this.accessibleLabel) {
        // Accessibility guardrail: an icon-only control must have an accessible name.
        console.warn('<nemo-button icon-only> requires the "accessible-label" attribute.');
      }
      return (
        <Host>
          <button
            class="button"
            part="button"
            type={this.type}
            disabled={inactive}
            aria-label={this.accessibleLabel}
            aria-busy={this.loading ? 'true' : undefined}
            onClick={this.onClick}
          >
            {this.loading && <span class="spinner" part="spinner" aria-hidden="true" />}
            <span class="icon">
              <slot name="leading-icon">
                <slot />
              </slot>
            </span>
          </button>
        </Host>
      );
    }

    return (
      <Host>
        <button
          class="button"
          part="button"
          type={this.type}
          disabled={inactive}
          aria-busy={this.loading ? 'true' : null}
          onClick={this.onClick}
        >
          {this.loading && <span class="spinner" part="spinner" aria-hidden="true" />}
          {this.hasLeadingIcon && (
            <span class="icon">
              <slot name="leading-icon" />
            </span>
          )}
          <span class="label" part="label">
            <slot />
          </span>
          {this.hasTrailingIcon && (
            <span class="icon">
              <slot name="trailing-icon" />
            </span>
          )}
        </button>
      </Host>
    );
  }
}
