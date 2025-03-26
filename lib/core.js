import path from "path";
import parseJS from "./parsers/parser-js.js";
import parseHTMLAngular from "./parsers/parser-html-angular.js";

export async function processFile(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();

  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
    return await parseJS(filePath, config);
  }

  if ([".html", ".vue", ".ng.html"].includes(ext)) {
    return await parseHTMLAngular(filePath, config);
  }

  console.warn(`⛔ Skipping unsupported file: ${filePath}`);
}
