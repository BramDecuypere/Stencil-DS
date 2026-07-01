import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export type NemoValidationState = 'none' | 'error' | 'warning';

let nextId = 0;

/**
 * Nemo text input. Implements the Figma text-field (node 4-33): a notched-outline
 * field with a persistent label, helper text, and error/warning validation.
 *
 * Runtime/CSS states (Default/Hover/Active/Filled) are handled with `:hover` /
 * `:focus-within` / a populated value. Disabled, Read only, Error and Warning are props.
 * **Read-only is a distinct, focusable, announced state — never implemented as disabled.**
 *
 * Colors reference the semantic token tier only (`--nemo-color-*`).
 *
 * @slot leading-icon - Optional icon before the input.
 * @slot icon - Optional trailing icon/affordance (Figma `Icon=True`).
 * @part field - The bordered field container.
 * @part input - The native input/textarea.
 * @part label - The field label.
 * @part helper - The helper text.
 * @part validation - The error/warning message block.
 */
@Component({
  tag: 'nemo-text-input',
  styleUrl: 'text-input.css',
  shadow: true,
})
export class NemoTextInput {
  @Element() host!: HTMLElement;

  /** Visible, associated label (never use placeholder as the label). */
  @Prop() label!: string;

  /** Current value (two-way via `nemoInput`/`nemoChange`). */
  @Prop({ mutable: true, reflect: false }) value = '';

  /** Placeholder shown when empty. */
  @Prop() placeholder?: string;

  /** Helper text below the field, linked via `aria-describedby`. */
  @Prop() helperText?: string;

  /** Validation state driving error/warning visuals + ARIA. */
  @Prop({ reflect: true }) validationState: NemoValidationState = 'none';

  /** Message shown for the error/warning state. */
  @Prop() validationMessage?: string;

  /** Disabled (non-focusable, non-editable). Use sparingly — prefer read-only for display. */
  @Prop({ reflect: true }) disabled = false;

  /** Read-only: focusable and announced, but not editable. */
  @Prop({ reflect: true }) readonly = false;

  /** Marks the field required (asterisk + `aria-required`; never color alone). */
  @Prop({ reflect: true }) required = false;

  /** Render a multi-line `<textarea>` (Figma `Expandable=True`). */
  @Prop({ reflect: true }) expandable = false;

  /** Contextual help shown as a tooltip affordance next to the label (Figma `Tooltip=True`). */
  @Prop() tooltip?: string;

  /** `name` for form submission. */
  @Prop() name?: string;

  /** Explicit id for the control (auto-generated if omitted) to associate the label. */
  @Prop() inputId?: string;

  /** Emitted on every keystroke. */
  @Event() nemoInput!: EventEmitter<{ value: string }>;

  /** Emitted when the value is committed (native change). */
  @Event() nemoChange!: EventEmitter<{ value: string }>;

  private controlId = '';
  private helperId = '';
  private messageId = '';
  private hasLeadingIcon = false;
  private hasTrailingIcon = false;

  componentWillLoad() {
    this.controlId = this.inputId || `nemo-text-input-${nextId++}`;
    this.helperId = `${this.controlId}-helper`;
    this.messageId = `${this.controlId}-message`;
    this.hasLeadingIcon = !!this.host.querySelector('[slot="leading-icon"]');
    this.hasTrailingIcon = !!this.host.querySelector('[slot="icon"]');
  }

  private onInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.nemoInput.emit({ value: this.value });
  };

  private onChange = (ev: Event) => {
    const target = ev.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.nemoChange.emit({ value: this.value });
  };

  private get describedBy(): string | undefined {
    const ids: string[] = [];
    if (this.helperText) ids.push(this.helperId);
    if (this.validationState !== 'none' && this.validationMessage) ids.push(this.messageId);
    return ids.length ? ids.join(' ') : undefined;
  }

  render() {
    const isError = this.validationState === 'error';
    const isWarning = this.validationState === 'warning';
    const showMessage = (isError || isWarning) && !!this.validationMessage;

    const commonProps = {
      id: this.controlId,
      name: this.name,
      class: 'input',
      part: 'input',
      value: this.value,
      placeholder: this.placeholder,
      disabled: this.disabled,
      readOnly: this.readonly,
      required: this.required,
      'aria-invalid': isError ? 'true' : undefined,
      'aria-required': this.required ? 'true' : undefined,
      'aria-describedby': this.describedBy,
      onInput: this.onInput,
      onChange: this.onChange,
    } as const;

    return (
      <Host>
        <div class="field-wrap">
          <label class="label" part="label" htmlFor={this.controlId}>
            <span class="label-text">{this.label}</span>
            {this.required && (
              <span class="required" aria-hidden="true">
                *
              </span>
            )}
            {this.tooltip && (
              <button class="tooltip" type="button" aria-label={this.tooltip} title={this.tooltip}>
                ?
              </button>
            )}
          </label>

          <div class="field" part="field">
            {this.hasLeadingIcon && (
              <span class="icon leading">
                <slot name="leading-icon" />
              </span>
            )}
            {this.expandable ? (
              <textarea {...commonProps} rows={3} />
            ) : (
              <input {...commonProps} type="text" />
            )}
            {this.hasTrailingIcon && (
              <span class="icon trailing">
                <slot name="icon" />
              </span>
            )}
          </div>
        </div>

        {this.helperText && !showMessage && (
          <p class="helper" part="helper" id={this.helperId}>
            {this.helperText}
          </p>
        )}

        {showMessage && (
          <div
            class="validation"
            part="validation"
            id={this.messageId}
            role={isError ? 'alert' : 'status'}
          >
            <span class="status-icon" aria-hidden="true">
              {isError ? '⚠' : 'ⓘ'}
            </span>
            <span class="validation-text">{this.validationMessage}</span>
          </div>
        )}
      </Host>
    );
  }
}
