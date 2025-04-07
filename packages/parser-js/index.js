import fs from "fs";
import { parse, print, types } from "recast";
import { randomUUID } from "crypto";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const b = types.builders;

export default function parseJS(filePath, config) {
  const code = fs.readFileSync(filePath, "utf-8");
  let changed = false;

  const ast = parse(code, {
    parser: require("recast/parsers/babel-ts"),
  });

  types.visit(ast, {
    visitJSXOpeningElement(path) {
      const tag = path.node.name.name;
      const tagsToExclude = config.excludeTags || [];

      if (tagsToExclude.includes(tag)) return false;

      const attributeName = config.attributeName;

      const hasId = path.node.attributes.some(
        (attr) => attr.name?.name === attributeName
      );

      if (!hasId) {
        const idValue = `${config.prefix}${randomUUID()}`;
        path.node.attributes.push(
          b.jsxAttribute(
            b.jsxIdentifier(attributeName),
            b.stringLiteral(idValue)
          )
        );
        changed = true;
      }

      return false;
    },
  });

  if (changed) {
    const output = print(ast).code;
    fs.writeFileSync(filePath, output);
  }

  return changed;
}
