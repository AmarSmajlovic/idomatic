import path from "path";
import parseJS from "./parsers/parser-js.js";

export async function processFile(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();

  if ([".js", ".jsx", ".ts", ".tsx"].includes(ext)) {
    return await parseJS(filePath, config);
  }

  //   @TODO - Add more parsers

  console.warn(`⛔ Skipping unsupported file: ${filePath}`);
}
