import fs from "fs";
import { parse, print, types } from "recast";
import { randomUUID } from "crypto";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const b = types.builders;

export default function parseJS(filePath, config) {
  const code = fs.readFileSync(filePath, "utf-8");

  const ast = parse(code, {
    parser: require("recast/parsers/babel-ts"),
  });

  types.visit(ast, {
    visitJSXOpeningElement(path) {
      const tag = path.node.name.name;

      if (config.skipTags.includes(tag)) return false;

      const hasId = path.node.attributes.some(
        (attr) => attr.name?.name === "id"
      );

      if (!hasId) {
        path.node.attributes.push(
          b.jsxAttribute(
            b.jsxIdentifier("id"),
            b.stringLiteral(`${config.prefix}${randomUUID()}`)
          )
        );
      }

      return false;
    },
  });

  const output = print(ast).code;

  fs.writeFileSync(filePath, output);
}
