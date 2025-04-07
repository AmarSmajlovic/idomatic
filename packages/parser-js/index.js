import fs from "fs";
import { parse, print, types } from "recast";
import { randomUUID } from "crypto";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const b = types.builders;

/**
 * @param {string} filePath - Full path to file
 * @param {object} config - iDomatic config
 * @param {boolean} dry - Whether to skip writing to disk
 * @returns {boolean} - True if the file would be (or was) updated
 */
export default function parseJS(filePath, config, dry = false) {
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

  if (changed && !dry) {
    const output = print(ast).code;
    fs.writeFileSync(filePath, output);
  }

  return changed;
}
