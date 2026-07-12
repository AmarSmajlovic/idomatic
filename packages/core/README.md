# @idomatic/core

**Automatically add stable, readable `id` attributes to your components — so your Playwright, Cypress and Testing Library tests stop breaking.**

[![npm](https://img.shields.io/npm/v/@idomatic/core.svg)](https://www.npmjs.com/package/@idomatic/core)
[![license](https://img.shields.io/npm/l/@idomatic/core.svg)](./LICENSE)

idomatic is a CLI that scans your React/HTML/Vue/Angular code and injects **human-readable, stable** test selectors into elements that are missing them. No more brittle CSS/XPath selectors, no more `nth-child`, no more tests that break when you reorder a `<div>`.

<!-- npm renders READMEs in isolation, so this must be an absolute URL. -->
<p align="center">
  <img src="https://raw.githubusercontent.com/AmarSmajlovic/idomatic/main/docs/demo.gif" alt="idomatic adding id attributes to a React component" width="820" />
</p>

## Why

E2E tests break because they target selectors that were never meant to be stable — classes, text, DOM position. The fix is a dedicated, stable selector on every element you test. Adding those by hand is tedious, so idomatic does it for you — and the ids it generates are readable and deterministic:

```jsx
// before
<button aria-label="Submit login">Log in</button>
<input name="email" placeholder="Email address" />

// after `npx idomatic scan --write`
<button aria-label="Submit login" id="button-submit-login">Log in</button>
<input name="email" placeholder="Email address" id="input-email" />
```

```ts
await page.locator("#button-submit-login").click();
```

> Prefer a dedicated test attribute? Set `"attributeName": "data-testid"` and idomatic emits `data-testid="button-submit-login"` instead.

## Features

- **Semantic ids** — derived from `aria-label`, `name`, `placeholder`, `alt`, text content or tag, not random UUIDs.
- **Idempotent** — re-running never renames or duplicates an existing id; diffs stay clean and it's safe in CI.
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

`.idomatic.config.json` is created during setup:

```json
{
  "attributeName": "id",
  "idStrategy": "semantic",
  "prefix": "",
  "excludeTags": ["html", "head", "script"],
  "includeExtensions": ["js", "jsx", "ts", "tsx"],
  "excludeFiles": ["node_modules", "public"]
}
```

- **`attributeName`** — the attribute to inject. Defaults to `id`; set `"data-testid"` (or `"data-test"`, …) if you prefer a dedicated test attribute.
- **`idStrategy`** — `"semantic"` (default) for readable ids like `button-submit`, or `"random"` for `${prefix}${uuid}`.
- **`prefix`** — optional namespace, e.g. `"qa-"` → `qa-button-submit`. Leave empty for clean ids.
- **`excludeTags`** — tags to skip.
- **`includeExtensions`** — for HTML/Vue/Angular this is `["html", "vue", "ng.html"]`.
- **`excludeFiles`** — directories to ignore.

## How it works

idomatic finds files matching your extensions (respecting `.gitignore`), then rewrites them through the right parser — `@idomatic/parser-js` for JS/JSX/TSX (recast + Babel AST) or `@idomatic/parser-html` for HTML/Vue/Angular (formatting-preserving). An id is added only to elements that don't already have one, using a name derived from context and made unique on collision.

> **Angular:** use `templateUrl` with a separate `.html` file. idomatic processes external templates but not inline templates defined in `.ts` files.

## Contributing

Contributions welcome — open an issue or PR on GitHub.
