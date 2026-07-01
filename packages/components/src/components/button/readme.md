# nemo-button



<!-- Auto Generated Below -->


## Overview

Nemo button. Maps the Figma `Type` (Primary/Secondary/Tertiary/Small/Icon) and
`State` (Default/Hover/Disabled) onto a clean orthogonal API: variant + size are
props; hover/focus/pressed are CSS states.

Styling references the **semantic** color tier only (`--nemo-color-*`). Spacing,
radius, typography and elevation use the resolved Figma values directly until those
foundations get their own token tiers (future, additive).

## Properties

| Property          | Attribute          | Description                                                                          | Type                                     | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------- | ----------- |
| `accessibleLabel` | `accessible-label` | Accessible name — used as `aria-label`, required for icon-only buttons.              | `string \| undefined`                    | `undefined` |
| `disabled`        | `disabled`         | Disabled. Reflected to the host and the native button.                               | `boolean`                                | `false`     |
| `fullWidth`       | `full-width`       | Stretch to the full width of the container.                                          | `boolean`                                | `false`     |
| `iconOnly`        | `icon-only`        | Icon-only button (32×32). Requires `accessibleLabel` for an accessible name.         | `boolean`                                | `false`     |
| `loading`         | `loading`          | Loading: shows a spinner, preserves width, sets `aria-busy`, and is non-interactive. | `boolean`                                | `false`     |
| `size`            | `size`             | Size. `medium` ≈ 37px tall, `small` ≈ 25px tall (per Figma).                         | `"medium" \| "small"`                    | `'medium'`  |
| `type`            | `type`             | Native button type.                                                                  | `"button" \| "reset" \| "submit"`        | `'button'`  |
| `variant`         | `variant`          | Visual emphasis.                                                                     | `"primary" \| "secondary" \| "tertiary"` | `'primary'` |


## Events

| Event       | Description                                                    | Type                      |
| ----------- | -------------------------------------------------------------- | ------------------------- |
| `nemoClick` | Emitted on activation (not emitted while disabled or loading). | `CustomEvent<MouseEvent>` |


## Slots

| Slot              | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
|                   | The button label (default slot).                              |
| `"leading-icon"`  | Icon before the label (or the glyph for an icon-only button). |
| `"trailing-icon"` | Icon after the label.                                         |


## Shadow Parts

| Part        | Description                         |
| ----------- | ----------------------------------- |
| `"button"`  | The internal native button element. |
| `"label"`   | The label wrapper.                  |
| `"spinner"` | The loading spinner.                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
