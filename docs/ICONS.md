# Icon pipeline notes

Phase 6 adds `nemo-icon`, a single tokenized icon component, plus the build pipeline that feeds
it. Unlike colors (Phase 1), the Nemo Figma file has **no icon component library** to resolve
values from (checked: the "Figma Materials" and "Stickers" pages contain profile/status assets,
not an icon set) — so this icon set is hand-authored rather than extracted, and should be treated
as a starting set to extend, not a Figma-traced spec.

## Pipeline

```
packages/components/icons/*.svg          — source SVGs (hand-authored, one file per icon)
        │  npm run icons:build (SVGO, scripts/build-icons.mjs)
        ▼
packages/components/src/components/icon/icons.generated.ts   — generated, gitignored
        │  imported by
        ▼
packages/components/src/components/icon/icon.tsx             — <nemo-icon name="...">
```

`npm run icons:build` runs automatically before `stencil build`/`stencil test` (see
`package.json`), the same way `tokens:build` does.

## Conventions for source SVGs (`icons/`)

- File name = icon name, lowercase kebab-case (e.g. `arrow-right.svg`) — enforced by
  `scripts/build-icons.mjs`.
- `viewBox="0 0 24 24"`, no `fill`/`stroke` baked into inner shapes — `nemo-icon` owns
  `fill="none" stroke="currentColor" stroke-width="2"` on its wrapper `<svg>`, so every icon
  automatically follows token discipline (no hex, ever) and inherits its context's color.
- Outline style (feather-icons-like), 2px stroke, round caps/joins, for visual consistency across
  the set.

## Current set

`arrow-right`, `search`, `mail`, `eye`, `eye-off`, `close`, `check`, `chevron-down`,
`alert-circle`, `alert-triangle` — covering the use cases named in the Text Input and Button Figma
documentation frames (e.g. password show/hide toggle, search fields, form validation icons).

## Adding an icon

1. Add `icons/<name>.svg` (see conventions above).
2. `npm run icons:build -w @nemo/components` (or just `npm run build`) to regenerate the registry.
3. Use it: `<nemo-icon name="<name>" />`, or `<nemo-icon slot="leading-icon" name="<name>" />`
   inside `nemo-button` / `nemo-text-input`.
4. Add it to the `Components/Icon` → `AllIcons` Storybook story's expectations (it picks up new
   entries automatically from the generated registry, nothing to hand-edit there).

No changeset/version bump is needed for adding an icon (additive, non-breaking). Renaming or
removing one **is** breaking for anyone using it directly by name — see `docs/DEPRECATION.md`.
