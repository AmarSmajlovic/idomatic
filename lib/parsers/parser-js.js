import parser from "@babel/parser";
import pkgTraverse from "@babel/traverse";
const traverse = pkgTraverse.default;
import pkgGenerate from "@babel/generator";
const generate = pkgGenerate.default;
import * as t from "@babel/types";
import fs from "fs";
import { randomUUID } from "crypto";

function parseJs(filePath, config) {
  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      const tag = path.node.name.name;
      //Checking if element already has id
      const hasId = path.node.attributes.some(
        (attr) => t.isJSXAttribute(attr) && attr.name.name === "id"
      );
      if (!hasId) {
        // Generate a unique id
        const uniqueId = `${config.prefix}${randomUUID()}`;
        const idAttr = t.jsxAttribute(
          t.jsxIdentifier("id"),
          t.stringLiteral(uniqueId)
        );
        path.node.attributes.push(idAttr);
      }
    },
  });

  const output = generate(ast, {}, code);
  fs.writeFileSync(filePath, output.code);
}

export default parseJs;
