# Phase 6 — Docs, Icons & Governance

**Goal:** Turn the library into something teams can adopt without asking questions — usage docs straight from Figma, a real icon system, and a contribution/deprecation process.

**Prerequisites:** Phases 2–3. **Reads:** `CLAUDE.md`.

---

## 1. Usage documentation (Storybook MDX)

The Figma file already contains rich written guidance — **pull it in rather than reinventing it.** The Button and Text Input nodes have documentation frames covering purpose, when-to-use, do/don't, placement, label writing, and accessibility checklists.

- Add an **MDX docs page per component** (alongside the auto-generated prop tables) with: purpose, variant/state guidance, **Do / Don't** examples, label/content writing rules, and the accessibility checklist from the Figma docs.
- Add **Foundations** MDX: how the token tiers work, theming/modes, and the rule that consumers theme via semantic tokens.
- Keep `custom-elements.json`-driven API tables as the canonical prop reference (no hand-maintained duplicates).

> A separate designer-facing portal (zeroheight / Supernova) is optional. Storybook Docs is usually enough for an engineering-led system; add a portal only if non-engineers need a curated reading experience.

## 2. Icon pipeline

Both components consume icons via slots — give them a real source:

- Store source SVGs in `icons/`; optimize with **SVGO**.
- Generate either a **`nemo-icon` web component** (sprite or per-icon, with `name` prop and accessible-name handling) or per-icon assets, via a build script. Keep icons tokenized (`currentColor` / size tokens) so they inherit button/input theming.
- Wire `nemo-icon` into the button `leading-icon`/`trailing-icon` slots and the input `icon` slot; document usage.

## 3. Governance

Lightweight process so the system scales past one team:

- **CONTRIBUTING.md** — how to propose/add a token or component, the DTCG + token-tier rules, the Definition-of-done bar, how Changesets/commits work.
- **Deprecation policy** — use DTCG `$deprecated` for tokens and `@deprecated` JSDoc on props; deprecate-then-remove across a major, never silent removal.
- **CODEOWNERS** for the token source and component dirs.
- A short **RFC/issue template** for new tokens/components so additions are reviewed, not ad hoc.

## Definition of done

- [ ] Each component has an MDX docs page with purpose, do/don't, content rules, and a11y checklist sourced from Figma — plus the auto-generated API table.
- [ ] Foundations docs explain tokens, theming, and the semantic-only consumption rule.
- [ ] Icons are optimized and available as `nemo-icon` (or equivalent), wired into button/input, themed via `currentColor`/tokens.
- [ ] CONTRIBUTING.md, deprecation policy, CODEOWNERS, and an RFC/issue template exist.
