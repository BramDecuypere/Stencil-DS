# Phase 2 — Components: Button + Text Input

**Goal:** `nemo-button` and `nemo-text-input` implemented to the Figma spec, styled **only** with generated semantic tokens (`var(--nemo-color-…)`), fully accessible.

**Prerequisites:** Phase 1. **Reads:** `CLAUDE.md`. Pull exact paddings, radii, sizes, typography, and per-state/per-variant colors from Figma.

---

## `nemo-button` (Figma node `4-31`)

Figma encodes **Type** = `Primary | Secondary | Tertiary | Small button | Icon`, a **Loading** variant, and **States** = `Default | Hover | Focused | Pressed | Disabled`. Reconcile into a clean orthogonal API (hover/focus/pressed are CSS, not props):

| Prop        | Type                                     | Default     | Notes                                                         |
| ----------- | ---------------------------------------- | ----------- | ------------------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual emphasis                                               |
| `size`      | `'medium' \| 'small'`                    | `'medium'`  | medium ≈ 37px tall, small ≈ 25px tall (confirm in Figma)      |
| `iconOnly`  | `boolean`                                | `false`     | 32×32 icon-only button                                        |
| `loading`   | `boolean`                                | `false`     | Spinner; preserves width; `aria-busy="true"`; non-interactive |
| `disabled`  | `boolean`                                | `false`     | Reflected to host + native button                             |
| `type`      | `'button' \| 'submit' \| 'reset'`        | `'button'`  |                                                               |
| `fullWidth` | `boolean`                                | `false`     |                                                               |

- **Slots:** default = label; `leading-icon`, `trailing-icon` named slots. Per Figma guidance, **never two icons** (not two leading, two trailing, or icon-only + leading) — enforce or document.
- **States via CSS:** `:hover`, `:focus-visible` (visible ring — required), `:active` (pressed), disabled treatment. Map each variant/state to its Figma role token (primary → `--nemo-color-primary`/`--nemo-color-on-primary`; tertiary is the low-emphasis text-like treatment; etc.).
- **Events:** emit `nemoClick` (or document reliance on native bubbling — pick one).
- **A11y:** icon-only requires an accessible name (`aria-label` prop or required slotted text); keyboard-activatable; min touch target.

## `nemo-text-input` (Figma node `4-33`)

Figma properties: **State** = `Default | Hover | Active | Filled | Disabled | Read only | Error | Warning`, plus boolean axes **Icon**, **Tooltip**, **Expandable**.

| Prop                | Type                             | Default  | Notes                                                     |
| ------------------- | -------------------------------- | -------- | --------------------------------------------------------- |
| `label`             | `string`                         | —        | Real label, not placeholder-as-label                      |
| `value`             | `string`                         | `''`     | Two-way via events                                        |
| `placeholder`       | `string`                         | —        |                                                           |
| `helperText`        | `string`                         | —        | Below field, linked via `aria-describedby`                |
| `validationState`   | `'none' \| 'error' \| 'warning'` | `'none'` | Drives error/warning visuals                              |
| `validationMessage` | `string`                         | —        | Shown for error/warning                                   |
| `disabled`          | `boolean`                        | `false`  |                                                           |
| `readonly`          | `boolean`                        | `false`  | Accessible read-only — still focusable/announced          |
| `required`          | `boolean`                        | `false`  | Marked clearly; never color-only                          |
| `icon`              | `string`                         | —        | Leading/trailing icon (Figma `Icon=True`)                 |
| `tooltip`           | `string`                         | —        | Contextual help (Figma `Tooltip=True`)                    |
| `expandable`        | `boolean`                        | `false`  | Renders multi-line `<textarea>` (Figma `Expandable=True`) |
| `name` / `inputId`  | `string`                         | —        | Form + label association                                  |

- **State mapping:** `Default/Hover/Active/Filled` are runtime/CSS (`:hover`, `:focus-within`, populated value); `Disabled/Read only/Error/Warning` are props.
- **Read-only ≠ disabled** — implement as its own focusable, announced state.
- **A11y:** associated `<label>`; `aria-describedby` for helper/validation; `aria-invalid` on error; `aria-required` when required; ~44px target; clicking label focuses field.
- **Events:** `nemoInput` (each keystroke) and `nemoChange` (on commit), payload `{ value }`.
- **Layout:** keep width-flexible so a consuming grid can pair related inputs (name+surname, postcode+city).

## Definition of done

- [ ] Both components use only `var(--nemo-color-…)` tokens — no raw hex, no primitive references.
- [ ] Button: all 3 variants, both sizes, icon-only, loading, disabled, leading/trailing slots, visible focus, correct per-state colors from Figma.
- [ ] Text input: all states incl. accessible read-only, icon/tooltip/expandable, required, error/warning with correct ARIA.
- [ ] Per-component `readme.md` generated; no TS errors; tags prefixed `nemo-`.
