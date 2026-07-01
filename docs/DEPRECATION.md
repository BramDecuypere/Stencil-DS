# Deprecation policy

Nemo is consumed by multiple apps across web/React/Vue/Angular. Removing a token or a component
prop out from under them without warning breaks builds downstream with no notice. The rule:
**deprecate, ship a major with both old and new available, then remove in a later major** — never
a silent removal in a minor/patch.

## Deprecating a token

1. Add DTCG's `$deprecated` to the token, with a short reason and — if there's a direct
   replacement — what to use instead:

   ```json
   {
     "color": {
       "primary-container": {
         "$value": "{palette.primary.90}",
         "$type": "color",
         "$deprecated": "Renamed to on-primary-fixed-variant in v3.0.0 for M3 naming consistency."
       }
     }
   }
   ```

2. Keep the token's `$value` unchanged and working — deprecation is a signal, not a break. Ship
   this as a **minor** (or patch) release; nothing downstream breaks yet.
3. `docs/TOKENS.md` gets a note under a "Deprecated" section pointing at the replacement.
4. The actual **removal** of a `$deprecated` token happens in a subsequent **major** release, with
   a changeset explicitly calling out the breaking removal.

## Deprecating a component prop

1. Add a `@deprecated` JSDoc tag on the `@Prop()`, with the same "what to use instead" guidance:

   ```ts
   /**
    * @deprecated Use `validationState`/`validationMessage` instead. Will be
    * removed in the next major.
    */
   @Prop() errorText?: string;
   ```

   This surfaces in editor tooltips and in the generated `readme.md` (Stencil's docs-readme output
   target picks up `@deprecated` automatically) — no separate doc to maintain.

2. Keep the prop functioning exactly as before. Ship as **minor** (or patch).
3. Removing the prop is a **major**, called out explicitly in its changeset (see
   `CONTRIBUTING.md` → "Commits & changesets").

## Deprecating a whole component

Same shape, scaled up: mark it in the component's top-level JSDoc (`@deprecated`, with the
replacement or migration path), keep it working for at least one full major cycle, announce the
removal timeline in the changeset that introduces the deprecation, then remove in a later major.

## What counts as breaking (recap from `CLAUDE.md`)

- A token **rename or removal** — breaking.
- A prop **removal** or a change to its accepted values that isn't backward compatible — breaking.
- Adding a token, a component, an icon, or an optional prop with a sensible default — **not**
  breaking.

## Timeline guidance

There's no fixed number of releases a deprecation must survive — use judgment based on how widely
the token/prop/component is used. As a floor: **never remove something in the same major version
where it was first marked `$deprecated`/`@deprecated`.**
