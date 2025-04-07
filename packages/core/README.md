IDomatic
idomatic is a CLI tool that automatically adds id attributes to your HTML/JSX/TSX components. It helps improve your testing and QA processes by ensuring that key elements always have unique, predictable identifiers.

Note: idomatic is optimized for React and HTML-based projects (including Vue and Angular). You can choose your framework during setup, and the tool will create a default configuration accordingly.

## Features

Automatic ID Injection: Scans your project files and injects id attributes into components that are missing them.

Configurable Behavior: Customize the prefix, specify file extensions, exclude certain tags, and more.

Dry Run and Write Modes: Preview changes before actually updating your files.

Framework Specific Defaults: Pre-populated configurations for React (JS/TSX) or HTML-based projects (HTML/Vue/Angular).

Easy Integration: Use with your existing build or CI/CD processes.

## Installation

To install idomatic, simply run the initializer command:

```shell
npm init @idomatic
```

This command will guide you through selecting your framework and automatically install the necessary configuration file and parser for your project. The default configuration file (e.g., .idomatic.config.json) will be created in your project's root.

## Usage

CLI Commands
After installation and configuration, you can run idomatic using the following commands:

Dry Run: Preview the changes without modifying any files.

```shell
npx idomatic scan --dry
```

Write Mode: Apply the changes to your files.

```shell
npx idomatic scan --write
```

If you run npx idomatic scan without any flags, a usage message will be shown.

Configuration File
The configuration file .idomatic.config.json is created during the setup process. Here is an example configuration for a React project:

```js
{
"attributeName": "id",
"prefix": "auto-id-",
"excludeTags": ["html", "head", "script"],
"includeExtensions": ["js", "jsx", "ts", "tsx"],
"excludeFiles": []
}
```

You can customize these values to better suit your project’s needs. For HTML/Vue/Angular projects, the includeExtensions field will be set to ["html", "vue", "ng.html"].

⚠️ Angular Users:
It is recommended to use templateUrl with a separate .html file rather than defining inline templates in .ts files.
idomatic processes external HTML templates correctly but does not support inline templates in Angular components. Using templateUrl ensures your component's HTML is picked up during scanning.

## How It Works

Setup:
Run the setup command (e.g npm init @idomatic) to choose your framework and create a configuration file.

Scanning:
The tool uses your configuration to search for files matching the specified extensions.

Dry Run: Lists the files that would be processed without modifying them.

Write Mode: Processes each file, adding id attributes where needed.

Parsing:
Depending on the file type, idomatic imports the appropriate parser (@idomatic/parser-js for JavaScript/JSX/TSX or @idomatic/parser-html for HTML-based files) to modify your code using an Abstract Syntax Tree (AST).

## Example

Imagine you have a React component without an id attribute:

```js
function Button() {
  return <button>Click me</button>;
}
```

After running idomatic in write mode, the component might be transformed to:

```js
function Button() {
  return (
    <button id="auto-id-123e4567-e89b-12d3-a456-426614174000">Click me</button>
  );
}
```

The generated id includes a prefix (from the configuration) and a unique identifier.

Contributing
Contributions are welcome! Feel free to open issues or pull requests on GitHub.
