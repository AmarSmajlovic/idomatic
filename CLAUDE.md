# Idomatic — Claude Code Rules

## Project Overview

Idomatic is a CLI tool that automatically injects `id` (or `data-testid`) attributes into HTML/JSX/TSX elements to improve test automation. It is a monorepo with independent packages.

## Monorepo Structure

```
packages/
  core/         — Main CLI, entry point is bin/index.js
  parser-js/    — JSX/TSX parser using recast + Babel
  parser-html/  — HTML/Vue/Angular parser using magic-string
  create/       — Interactive setup CLI (npm init @idomatic)
local-test/     — Manual test files (jsx, tsx, html, vue, ng.html)
docs/           — DEVELOPMENT-ROADMAP.md, TESTING-PLAN.md, CONTRIBUTING.md
website/        — Next.js 15 + Nextra docs site
```

## Stack

- **Runtime:** Node.js 18+, ES Modules (`"type": "module"`)
- **JS/TS parsing:** `recast` with Babel TypeScript parser
- **HTML/Vue parsing:** `magic-string` (regex-based, not AST)
- **File discovery:** `globby` with `.gitignore` support
- **Interactive prompts:** `prompts`
- **Tests (planned):** Vitest
- **Website:** Next.js 15, Nextra, Tailwind CSS 4, React 19

## Current Priorities (do these in order)

1. Fix unique ID generation bug — IDs increment instead of being unique per run (see `packages/core/BUGS.MD`)
2. Semantic ID generation — replace UUID suffix with context-aware names derived from element type, text content, aria-label, or component name
3. Add `--verbose` and `--stats` CLI flags to `packages/core`
4. Setup Vitest + basic test coverage across packages
5. CI/CD pipeline (GitHub Actions)

## Coding Rules

- Always use ES Modules (`import`/`export`), never `require()`
- Use `const` over `let`; never use `var`
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Do not add unnecessary abstractions — keep parsers simple and focused
- Do not add error handling for cases that cannot realistically happen
- Do not add JSDoc comments to code you did not change

## Testing

- Manual tests go in `local-test/` — run `npx idomatic scan --dry` from there
- Automated tests will use Vitest once set up
- Target 80% coverage on parser logic
- Always test both `--dry` and `--write` modes after changes to parsers

## What to Avoid

- Do not touch the `website/` directory unless explicitly asked — it is a separate concern
- Do not add Svelte/Angular inline support until core improvements are done
- Do not use UUIDs as the default ID format — the goal is semantic, human-readable IDs
- Do not publish packages without bumping the version in `package.json`

## Local Dev Workflow

```bash
cd local-test
npx idomatic scan --dry    # preview changes
npx idomatic scan --write  # apply changes
```

To link packages locally for development:
```bash
cd packages/core && npm link
cd packages/parser-js && npm link
cd packages/parser-html && npm link
```
