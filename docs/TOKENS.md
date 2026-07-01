# Token notes — traceability & TODOs

All values are resolved from the Figma **Nemo Design System** Colors page
(`node 11167-12650`) via the Figma MCP `get_variable_defs`, read against concrete
child frames `11167-14165` / `11167-14179`. Nothing here is invented.

## How the two tiers were derived

The Figma file models its color variables as **semantic roles** (e.g.
`Primary/Primary Container`, `Surface/Outline Variant`). The tonal numbers visible in
the file (e.g. `Primary/40`, `Neutral/90`) are **text labels documenting which tone each
role maps to** — they are not separate variables.

So the primitive tier in `tokens/primitive/` was reconstructed from those documented
labels: each primitive tone carries the **real resolved hex** of the semantic role that
references it. Example: the file labels the `Primary` role swatch `Primary/40` and resolves
it to `#625d9c`, so `palette.primary.40 = #625d9c`. Every primitive value therefore traces
to a real Figma value; the semantic layer then aliases back to those primitives.

## Primitive tone coverage

Only the tones actually **referenced by a semantic role** are present (those are the only
tones with a resolvable value in the file). Tones from the broader M3 ramp that no role
references (e.g. `Primary/0/20/50/…`) are intentionally **omitted, not guessed** — per the
"do not invent" rule. Add them later only if pulled from Figma.

Resolved tones per family:

- **primary:** 10, 30, 40, 80, 90, 100
- **secondary:** 10, 30, 40, 80, 90, 100
- **tertiary:** 10, 30, 40, 80, 90, 100
- **neutral:** 0, 10, 20, 87, 90, 92, 94, 95, 96, 98, 100
- **neutral-variant:** 30, 50, 80
- **error / info / warn / success:** 30, 40, 90, 100

## Verified mappings (spec → Figma)

A couple of inventory notes from the phase brief, checked against the file:

- `outline-variant` → the brief flagged "Neutral Variant/80 — one frame references Primary/85;
  verify in Figma". The resolved value is **`#d7d5ed`** (`Surface/Outline Variant`), which the
  file also exposes as `Secondary/Grey Blue 100 = #D7D5ED`. Mapped to `neutral-variant.80`.
- `inverse-on-surface` resolves to `#f5f0f8` (`Surface/Inverse on Surface`), mapped to
  `neutral.95`.

## TODO — not yet resolved

- [ ] **Dark theme** (`tokens/semantic/dark/`). The light values were read from the frame's
      current (light) mode. Dark values must be pulled from the file's **dark variable mode**
      before `tokens.css` can emit a `[data-theme="dark"]` block. The build already supports it:
      drop the dark role files in and they're picked up automatically. Until then the build
      logs `! skipping "dark"` and emits light only.
- [x] **Brand gradient** (`secondary-gradient-start = #de2174`, `secondary-gradient-end = #eb152a`).
      Added in Phase 2 as `--nemo-color-secondary-gradient-start/-end` — the primary button fill
      uses them. Resolved from the Figma `Secondary/Secondary Gradient Start/End` variables.
- [ ] Broader primitive ramp tones (see "Primitive tone coverage") if a future component needs a
      tone no current role references.
