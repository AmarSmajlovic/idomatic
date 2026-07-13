# Idomatic

## Project Summary
**Idomatic** represents a robust monorepo built to parse, process, and scaffold environments. Primarily focused on code generation/template workflows with DOM/AST manipulation suites.

## Architecture & Tech Stack
The workspace contains distinct functional blocks:

- **@idomatic/create** (`CLI / Scaffold Tool`): Uses `prompts` to generate new templates or scaffold components seamlessly.
- **@idomatic/parser-html** (`HTML Manipulation`): Powered by `cheerio` for server-side DOM traversing and HTML restructuring.
- **@idomatic/parser-js** (`AST Engine`): Uses `recast` to parse JavaScript syntactically into Abstract Syntax Trees, mutate them, and rewrite outputs—paving the way for fully custom build rules, macros, or migrations.
- **website-idomatic** (`Documentation / Landing`): A Next.js project backed by `nextra` and `nextra-theme-docs`. It showcases documentation and renders interactive code examples using prism syntax highlighting (`prism-react-renderer`) and robust UI layouts using TailwindCSS.

**System Design**:
The monorepo enforces high reusability. A common SDK pattern (`@idomatic/core`, `parser-js`, `parser-html`) is shipped across tools and CLI helpers. It's essentially an abstract language compiler or macro toolkit, supplemented by a front-facing docs site.
