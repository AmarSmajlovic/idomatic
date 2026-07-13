import MagicString from "magic-string";
import { createIdFactory } from "../idGen.js";

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

const TAG_REGEX = /<([a-zA-Z][^\s/>]*)([^>]*?)(\/?)>/g;

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getAttrValue(attributesStr, attrName) {
  const re = new RegExp(
    `${escapeRegExp(attrName)}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    "i"
  );
  const match = attributesStr.match(re);
  if (!match) return "";
  return match[1] ?? match[2] ?? "";
}

function describe(attributesStr) {
  for (const name of DESCRIPTIVE_ATTRS) {
    const value = getAttrValue(attributesStr, name);
    if (value) return value;
  }
  return "";
}

function collectExistingIds(content, attributeName) {
  const ids = [];
  const re = new RegExp(
    `\\s${escapeRegExp(attributeName)}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    "gi"
  );
  let match;
  while ((match = re.exec(content)) !== null) {
    const value = match[1] ?? match[2];
    if (value) ids.push(value);
  }
  return ids;
}

/**
 * Inserts semantic, unique ids into every eligible tag of an HTML-like string
 * while preserving the original formatting.
 *
 * @param {string} content - HTML or Vue template markup.
 * @param {object} config - The configuration object.
 * @param {string} config.attributeName - The attribute name to add.
 * @param {string} [config.prefix] - The prefix for generated ids.
 * @param {string[]} [config.excludeTags] - Tag names to skip.
 * @returns {string} - The updated markup.
 */
function processTemplate(content, config) {
  const { attributeName, excludeTags = [] } = config;
  const ms = new MagicString(content);
  const makeId = createIdFactory(config, collectExistingIds(content, attributeName));

  const idRegex = new RegExp(`\\s${escapeRegExp(attributeName)}\\s*=`);

  let match;
  while ((match = TAG_REGEX.exec(content)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    const attributesStr = match[2];
    const selfClosing = match[3] || "";

    if (excludeTags.includes(tagName)) continue;
    if (idRegex.test(attributesStr)) continue;

    const idValue = makeId([tagName, describe(attributesStr)]);
    const insertPosition =
      match.index + fullMatch.length - (selfClosing.length + 1);
    ms.appendLeft(insertPosition, ` ${attributeName}="${idValue}"`);
  }

  TAG_REGEX.lastIndex = 0;
  return ms.toString();
}

export function processVueTemplate(templateContent, config) {
  return processTemplate(templateContent, config);
}

export function processHtmlContent(htmlContent, config) {
  return processTemplate(htmlContent, config);
}
