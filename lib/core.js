import path from "path";
import { pathToFileURL } from "url";
import resolveFrom from "resolve-from";

const parserMap = {
  ".js": "@idomatic/parser-js",
  ".jsx": "@idomatic/parser-js",
  ".ts": "@idomatic/parser-js",
  ".tsx": "@idomatic/parser-js",
  ".html": "@idomatic/parser-html",
  ".vue": "@idomatic/parser-html",
  ".ng.html": "@idomatic/parser-html",
};

export async function processFile(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  const parserPackage = parserMap[ext];

  if (!parserPackage) {
    console.warn(`⛔ Skipping unsupported file: ${filePath}`);
    return;
  }

  try {
    const resolvedPath = resolveFrom(process.cwd(), parserPackage);
    const resolvedURL = pathToFileURL(resolvedPath).href;
    const parser = await import(resolvedURL);
    await parser.default(filePath, config);
    console.log(`✅ Updated: ${filePath}`);
  } catch (err) {
    console.error(
      `❌ Failed to load parser "${parserPackage}" for ${filePath}`
    );
  }
}
