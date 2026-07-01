// Conventional Commits (CLAUDE.md: "Commits follow Conventional Commits;
// releases are managed by Changesets"). Enforced by the commit-msg hook
// (see .husky/commit-msg).
export default {
  extends: ['@commitlint/config-conventional'],
};
