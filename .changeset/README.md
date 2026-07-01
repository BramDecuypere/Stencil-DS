# Changesets

This directory is managed by [Changesets](https://github.com/changesets/changesets).

`@nemo/components`, `@nemo/tokens`, `@nemo/react`, `@nemo/vue`, and `@nemo/angular` are **linked** (see `config.json`) — they always release together at the same version, since the framework wrappers and the tokens package are generated from / built against the core component package.

## Workflow

```bash
# 1. After making a change, describe it (interactive prompt: packages + bump type + summary)
npx changeset

# 2. When ready to release, apply the version bumps + changelogs
npx changeset version

# 3. Build everything and publish
npm run build && npx changeset publish
```

A **token rename or prop removal is a breaking (major) change** — see CLAUDE.md.

Read the [documentation](https://github.com/changesets/changesets/tree/main/docs) for more information on what you can do with Changesets.
