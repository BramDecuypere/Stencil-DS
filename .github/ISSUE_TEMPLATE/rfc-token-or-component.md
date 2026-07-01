---
name: 'RFC: New token or component'
about: Propose a new design token or component before building it
title: 'RFC: '
labels: rfc
assignees: ''
---

<!--
Tokens and components become public API the moment they ship. This template
exists so new ones get reviewed as a proposal, not discovered as a surprise
in a PR diff. See CONTRIBUTING.md for the full contribution flow.
-->

## What is this?

<!-- One or two sentences. Is this a new primitive/semantic token, a new
     component, or a new variant/prop on an existing component? -->

## Figma source

<!-- Link the specific Figma node(s) this traces to (see CLAUDE.md for the
     file). If a value can't be resolved yet, say so explicitly here rather
     than guessing — it'll be tracked as a TODO, not invented. -->

## Proposed API

<!-- For a token: the primitive + semantic role name(s) and which theme(s)
     they apply to.
     For a component: props/types/defaults, slots, events, parts — see
     button.tsx / text-input.tsx for the shape this usually takes. -->

## Why does this need to exist?

<!-- What's the use case? Does something close already exist that this
     could extend instead (a new prop value vs. a whole new component)? -->

## Token discipline / accessibility check

<!-- For a component: how does it stay token-discipline compliant (semantic
     tokens only, no raw hex/rgb/hsl) and meet the CLAUDE.md accessibility
     baseline (focus-visible, ARIA, ~44px touch target, read-only ≠
     disabled, never color-only state)? -->

## Breaking?

<!-- New tokens/components/props are additive (not breaking). If this
     proposes renaming/removing an existing token or prop, see
     docs/DEPRECATION.md — it needs a deprecation cycle, not a silent
     removal. -->
