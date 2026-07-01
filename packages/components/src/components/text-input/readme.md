# nemo-text-input



<!-- Auto Generated Below -->


## Overview

Nemo text input. Implements the Figma text-field (node 4-33): a notched-outline
field with a persistent label, helper text, and error/warning validation.

Runtime/CSS states (Default/Hover/Active/Filled) are handled with `:hover` /
`:focus-within` / a populated value. Disabled, Read only, Error and Warning are props.
**Read-only is a distinct, focusable, announced state — never implemented as disabled.**

Colors reference the semantic token tier only (`--nemo-color-*`).

## Properties

| Property             | Attribute            | Description                                                                             | Type                             | Default     |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `disabled`           | `disabled`           | Disabled (non-focusable, non-editable). Use sparingly — prefer read-only for display.   | `boolean`                        | `false`     |
| `expandable`         | `expandable`         | Render a multi-line `<textarea>` (Figma `Expandable=True`).                             | `boolean`                        | `false`     |
| `helperText`         | `helper-text`        | Helper text below the field, linked via `aria-describedby`.                             | `string \| undefined`            | `undefined` |
| `inputId`            | `input-id`           | Explicit id for the control (auto-generated if omitted) to associate the label.         | `string \| undefined`            | `undefined` |
| `label` _(required)_ | `label`              | Visible, associated label (never use placeholder as the label).                         | `string`                         | `undefined` |
| `name`               | `name`               | `name` for form submission.                                                             | `string \| undefined`            | `undefined` |
| `placeholder`        | `placeholder`        | Placeholder shown when empty.                                                           | `string \| undefined`            | `undefined` |
| `readonly`           | `readonly`           | Read-only: focusable and announced, but not editable.                                   | `boolean`                        | `false`     |
| `required`           | `required`           | Marks the field required (asterisk + `aria-required`; never color alone).               | `boolean`                        | `false`     |
| `tooltip`            | `tooltip`            | Contextual help shown as a tooltip affordance next to the label (Figma `Tooltip=True`). | `string \| undefined`            | `undefined` |
| `validationMessage`  | `validation-message` | Message shown for the error/warning state.                                              | `string \| undefined`            | `undefined` |
| `validationState`    | `validation-state`   | Validation state driving error/warning visuals + ARIA.                                  | `"error" \| "none" \| "warning"` | `'none'`    |
| `value`              | `value`              | Current value (two-way via `nemoInput`/`nemoChange`).                                   | `string`                         | `''`        |


## Events

| Event        | Description                                          | Type                              |
| ------------ | ---------------------------------------------------- | --------------------------------- |
| `nemoChange` | Emitted when the value is committed (native change). | `CustomEvent<{ value: string; }>` |
| `nemoInput`  | Emitted on every keystroke.                          | `CustomEvent<{ value: string; }>` |


## Slots

| Slot             | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `"icon"`         | Optional trailing icon/affordance (Figma `Icon=True`). |
| `"leading-icon"` | Optional icon before the input.                        |


## Shadow Parts

| Part           | Description                      |
| -------------- | -------------------------------- |
| `"field"`      | The bordered field container.    |
| `"helper"`     | The helper text.                 |
| `"input"`      | The native input/textarea.       |
| `"label"`      | The field label.                 |
| `"validation"` | The error/warning message block. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
