import fs from "fs";
import { parse, print, types } from "recast";
import { createRequire } from "module";
import { createIdFactory } from "./idGen.js";

const require = createRequire(import.meta.url);
const b = types.builders;

// Attributes that describe an element well, in priority order.
const DESCRIPTIVE_ATTRS = [
  "aria-label",
  "name",
  "placeholder",
  "alt",
  "title",
  "label",
  "role",
  "type",
];

function getTagName(nameNode) {
  if (!nameNode) return "el";
  if (nameNode.type === "JSXIdentifier") return nameNode.name;
  if (nameNode.type === "JSXMemberExpression") {
    return nameNode.property?.name || "el";
  }
  return "el";
}

function getStringAttr(attributes, attrName) {
  const attr = attributes.find(
    (a) => a.type === "JSXAttribute" && a.name?.name === attrName
  );
  const value = attr?.value;
  if (value?.type === "StringLiteral" || value?.type === "Literal") {
    return typeof value.value === "string" ? value.value : "";
  }
  return "";
}

function getTextContent(el) {
  for (const child of el?.children || []) {
    if (child.type === "JSXText") {
      const text = child.value.trim();
      if (text) return text;
    }
  }
  return "";
}

function describe(opening, el) {
  for (const name of DESCRIPTIVE_ATTRS) {
    const value = getStringAttr(opening.attributes, name);
    if (value) return value;
  }
  return getTextContent(el);
}

/**
 * @param {string} filePath - Full path to file
 * @param {object} config - iDomatic config
 * @param {boolean} dry - Whether to skip writing to disk
 * @returns {boolean} - True if the file would be (or was) updated
 */
export default function parseJS(filePath, config, dry = false) {
  const code = fs.readFileSync(filePath, "utf-8");
  const attributeName = config.attributeName;
  const tagsToExclude = config.excludeTags || [];
  let changed = false;

  const ast = parse(code, {
    parser: require("recast/parsers/babel-ts"),
  });

  // First pass: collect ids already present so new ids never collide with them.
  const existingIds = [];
  types.visit(ast, {
    visitJSXOpeningElement(path) {
      const value = getStringAttr(path.node.attributes, attributeName);
      if (value) existingIds.push(value);
      return false;
    },
  });

  const makeId = createIdFactory(config, existingIds);

  types.visit(ast, {
    visitJSXOpeningElement(path) {
      const opening = path.node;
      const tag = getTagName(opening.name);

      if (tagsToExclude.includes(tag)) return false;

      const hasId = opening.attributes.some(
        (attr) => attr.name?.name === attributeName
      );

      if (!hasId) {
        const descriptor = describe(opening, path.parent.node);
        const idValue = makeId([tag, descriptor]);
        opening.attributes.push(
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
