# Contributing to siteping

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Prerequisites

- [Bun](https://bun.sh/) (latest)
- Node.js 18+
- A Chromium-based browser (for Playwright E2E tests)

## Setup

```bash
git clone https://github.com/NeosiaNexus/siteping.git
cd siteping
bun install
```

## Development Workflow

```bash
bun run dev       # start dev server
bun run check     # TypeScript type-checking
bun run test      # run unit tests (watch mode)
bun run test:run  # run unit tests once
bun run test:e2e  # run Playwright E2E tests
bun run build     # build all targets
```

Always run `check`, `test:run`, and `build` before submitting a PR.

## Architecture

The project has three separate build entry points:

| Entry point        | Target  | Description                          |
|--------------------|---------|--------------------------------------|
| `widget`           | Browser | Feedback widget (Shadow DOM, closed) |
| `adapter-prisma`   | Node    | Prisma database adapter              |
| `cli`              | Node    | CLI tool                             |

Each is built independently via tsup.

## Code Style

- **TypeScript strict mode** with `exactOptionalPropertyTypes` enabled.
- **Conventional Commits** for all commit messages: `type(scope): description`.
  - Examples: `feat(widget): add color picker`, `fix(cli): handle missing config`.
- **French UI labels** in the widget — the target audience is French-speaking freelance clients.
- Keep functions small and focused. Prefer composition over inheritance.

## Testing

- **Unit tests** — Vitest. Co-locate test files next to source (`*.test.ts`).
- **E2E tests** — Playwright. Place in the `tests/` or `e2e/` directory.
- Cover new features with unit tests. Cover user-facing flows with E2E tests when relevant.

## Releases & Versioning

Releases are **fully automated** via [Release Please](https://github.com/googleapis/release-please). You never need to manually bump versions, write changelogs, or create tags.

**How it works:**

1. Write code using [Conventional Commits](https://www.conventionalcommits.org/)
2. Push to `main` (via squash-merged PR)
3. Release Please opens a release PR with version bump + CHANGELOG
4. Merge the release PR → GitHub Release + npm publish happen automatically

**Version bumps are determined by your commit messages:**

| Commit prefix | Version bump | Example |
|--------------|-------------|---------|
| `fix(scope):` | Patch (0.2.2 → 0.2.3) | `fix(widget): prevent double submit` |
| `feat(scope):` | Minor (0.2.2 → 0.3.0) | `feat(panel): add dark mode` |
| `feat(scope)!:` | Major (0.3.0 → 1.0.0) | `feat(api)!: redesign payload format` |
| `chore:` / `docs:` / `test:` | No release | Included in next changelog |

> While the version is < 1.0.0, breaking changes bump minor instead of major.

**What you don't need to do:**
- Edit `package.json` version — Release Please does it
- Write `CHANGELOG.md` — auto-generated from commits
- Create git tags — auto-created on release
- Run `npm publish` — CI handles it

## Pull Request Guidelines

1. **One feature or fix per PR.** Keep changes focused and reviewable.
2. **Include tests** for any new behavior or bug fix.
3. **Ensure CI passes** — type-check, unit tests, and build must all succeed.
4. **Use Conventional Commits** for your PR title and individual commits.
5. **Describe what and why** in your PR description, not just what changed.

## Reporting Issues

Use the GitHub issue templates for [bug reports](.github/ISSUE_TEMPLATE/bug_report.yml) and [feature requests](.github/ISSUE_TEMPLATE/feature_request.yml).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
