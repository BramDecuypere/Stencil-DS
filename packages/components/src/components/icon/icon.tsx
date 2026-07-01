import { Component, Host, Prop, h } from '@stencil/core';
import { nemoIcons, type NemoIconName } from './icons.generated';

/**
 * Nemo icon — renders one icon from the design system's optimized set
 * (source SVGs in `packages/components/icons/`, optimized via SVGO into the
 * generated `icons.generated.ts` registry by `npm run icons:build`).
 *
 * Tokenized by design: every icon strokes in `currentColor`, so it inherits
 * whatever color its context already has (a button's label color, a text
 * input's icon color, plain text) — there is no per-icon color prop and no
 * hex anywhere in this component.
 *
 * Accessibility: an icon is treated as **decorative** by default
 * (`aria-hidden="true"`) because it almost always sits next to text or
 * inside a labelled control (e.g. `nemo-button`'s `accessible-label`). Pass
 * `label` only when the icon is the *sole* accessible content — this
 * switches it to `role="img"` + `aria-label` instead.
 *
 * @part svg - The underlying `<svg>` element.
 */
@Component({
  tag: 'nemo-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class NemoIcon {
  /** Icon name — must match a key generated from `icons/*.svg`. */
  @Prop() name!: NemoIconName;

  /** Pixel size (square). Defaults to 24, matching every source icon's viewBox. */
  @Prop() size = 24;

  /**
   * Accessible name. Omit for a decorative icon that's already described by
   * its context (the common case — e.g. inside `nemo-button`).
   */
  @Prop() label?: string;

  render() {
    const shape = nemoIcons[this.name];

    if (!shape) {
      console.warn(
        `<nemo-icon name="${this.name}"> is not a known icon. Available: ${Object.keys(nemoIcons).join(', ')}`,
      );
    }

    return (
      <Host>
        <svg
          part="svg"
          viewBox="0 0 24 24"
          width={this.size}
          height={this.size}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          role={this.label ? 'img' : undefined}
          aria-label={this.label}
          aria-hidden={this.label ? undefined : 'true'}
          innerHTML={shape ?? ''}
        />
      </Host>
    );
  }
}
