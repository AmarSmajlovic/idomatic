# idomatic

**Automatically add stable `data-testid` selectors to your components — so your Playwright, Cypress and Testing Library tests stop breaking.**

[![CI](https://github.com/AmarSmajlovic/idomatic/actions/workflows/ci.yml/badge.svg)](https://github.com/AmarSmajlovic/idomatic/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@idomatic/core.svg)](https://www.npmjs.com/package/@idomatic/core)
[![license](https://img.shields.io/npm/l/@idomatic/core.svg)](./LICENSE)

idomatic is a CLI that scans your React/HTML/Vue/Angular code and injects **human-readable, stable** test selectors into elements that are missing them. No more brittle CSS/XPath selectors, no more `nth-child`, no more tests that break when you reorder a `<div>`.

<p align="center">
  <img src="./docs/demo.gif" alt="idomatic adding data-testid selectors to a React component" width="820" />
</p>

## Why

E2E tests break because they target selectors that were never meant to be stable — classes, text, DOM position. The fix is a dedicated `data-testid` on every element you test. Adding those by hand across a codebase is tedious, so most teams don't. idomatic does it for you, and the ids it generates are **readable and deterministic**:

```jsx
// before
<button aria-label="Submit login">Log in</button>
<input name="email" placeholder="Email address" />

// after `npx idomatic scan --write`
<button aria-label="Submit login" data-testid="button-submit-login">Log in</button>
<input name="email" placeholder="Email address" data-testid="input-email" />
```

Then in your tests:

```ts
await page.getByTestId("button-submit-login").click();
```

## Features

- **Semantic ids** — derived from the element's `aria-label`, `name`, `placeholder`, `alt`, text content or tag, not random UUIDs.
- **Idempotent** — re-running never renames or duplicates an existing id, so diffs stay clean and it's safe in CI.
- **Framework-aware** — React (JS/JSX/TS/TSX) via a real AST parser; HTML, Vue and Angular templates too.
- **Dry-run first** — preview every change before touching a file.
- **Configurable** — change the attribute name, add a prefix/namespace, exclude tags or files.

## Installation

```shell
npm init @idomatic
```

This walks you through picking your framework, installs the right parser, and creates a `.idomatic.config.json` in your project root.

## Usage

```shell
npx idomatic scan --dry     # preview changes without writing
npx idomatic scan --write   # apply changes
```

Running `npx idomatic scan` with no flag prints usage.

## Configuration

`.idomatic.config.json` is created during setup. The default targets `data-testid` with no prefix:

```json
{
  "attributeName": "data-testid",
  "prefix": "",
  "excludeTags": ["html", "head", "script"],
  "includeExtensions": ["js", "jsx", "ts", "tsx"],
  "excludeFiles": ["node_modules", "public"]
}
```

- **`attributeName`** — the attribute to inject (`data-testid`, `data-test`, `id`, …).
- **`prefix`** — optional namespace, e.g. `"qa-"` → `qa-button-submit`. Leave empty for clean ids.
- **`excludeTags`** — tags to skip.
- **`includeExtensions`** — for HTML/Vue/Angular this is `["html", "vue", "ng.html"]`.
- **`excludeFiles`** — directories to ignore.

## How it works

1. **Setup** — `npm init @idomatic` picks your framework and writes the config.
2. **Scan** — idomatic finds files matching your extensions (respecting `.gitignore`).
3. **Parse** — `@idomatic/parser-js` rewrites JS/JSX/TSX through an AST (recast + Babel); `@idomatic/parser-html` rewrites HTML/Vue/Angular templates while preserving formatting.
4. **Write** — an id is added only to elements that don't already have one, using a name derived from context and made unique on collision.

> **Angular:** use `templateUrl` with a separate `.html` file. idomatic processes external templates but not inline templates defined in `.ts` files.

## Contributing

Contributions welcome — open an issue or PR. Run the parser tests with `npm test` inside `packages/parser-js` or `packages/parser-html`.
