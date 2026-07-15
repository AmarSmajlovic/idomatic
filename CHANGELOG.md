# Changelog

All notable changes to idomatic. This project follows [semantic versioning](https://semver.org).

## 1.3.0 — 2026-07-16

Fixes that make a clean install actually work. Every previously published version of `@idomatic/create` required [Bun](https://bun.sh) to be installed globally, which broke the only documented setup path for anyone without it.

**Packages:** `@idomatic/core@1.3.0`, `@idomatic/create@1.2.1`, `@idomatic/parser-js@1.1.1`, `@idomatic/parser-html@1.1.1`

### Fixed

- **`npm init @idomatic` failed with `env: bun: No such file or directory`.** The `@idomatic/create` bin declared a `bun` shebang; it now runs on Node like every other package. Setup works on a stock Node install.
- **`idomatic scan` crashed with `Cannot read properties of undefined` when no `.idomatic.config.json` was present.** `getUserConfig()` logged "Using default config" but returned nothing. It now returns the default config, and merges it with a user config so a partial `.idomatic.config.json` no longer crashes the scan.
- The default config was never shipped — `const/` was missing from the published `files` whitelist.
- Setup pointed users at `npx idomatic --init-scan`, which is not a real command and exited with "Unsupported command". It now prints `npx idomatic scan --dry`.
- A missing parser dumped a raw stack trace. It now names the package to install.

### Changed

- **`idomatic scan` with no flag no longer writes.** It previously rewrote every matching file in the project, while the README documented it as printing usage. Applying changes now requires an explicit `--write`. Scripts relying on bare `scan` to write must be updated.

### Added

- `repository`, `homepage` and `bugs` metadata on all four packages, and a real `description` for `@idomatic/core` and `@idomatic/create`.

## 1.2.0 — 2026-07-12

Semantic ids, a configurable id strategy, and a full docs/site refresh.

**Packages:** `@idomatic/core@1.2.0`, `@idomatic/create@1.2.0`, `@idomatic/parser-js@1.1.0`, `@idomatic/parser-html@1.1.0`

### Added

- **Semantic id generation** — ids are derived from an element's context (`aria-label`, `name`, `placeholder`, `alt`, text content, or tag), e.g. `button-submit-login` instead of a random hash.
- **`idStrategy` config option** — `"semantic"` (default) for readable ids, or `"random"` for `${prefix}${uuid}`.
- Automated test coverage (Vitest) across both parsers.

### Changed

- Ids are now **idempotent** — re-running never renames or duplicates an existing id (the generator is seeded with ids already present in the file), so diffs stay clean and it's safe to run in CI.
- Default `prefix` is now empty (`""`) for cleaner ids out of the box.

### Fixed

- Declared `@babel/parser` as a dependency of `@idomatic/parser-js`. A fresh install could previously resolve an incompatible major version and crash on the first scan.
- Fixed a broken internal import in the core default config.

## Earlier releases

For versions before 1.2.0, see the [GitHub releases](https://github.com/AmarSmajlovic/idomatic/releases) and the commit history.
