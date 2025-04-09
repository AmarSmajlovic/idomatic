import MagicString from "magic-string";
import { randomUUID } from "crypto";
import { TAG_REGEX } from "../consts/index.js";

/**
 * Processes a Vue template content by inserting unique IDs while preserving formatting.
 *
 * @param {string} templateContent - The content inside the Vue <template> tag.
 * @param {object} config - The configuration object.
 * @param {string} config.attributeName - The attribute name to add (e.g. "id" or "data-id").
 * @param {string} config.prefix - The prefix for generated IDs.
 * @param {string[]} [config.excludeTags] - An array of tag names to exclude (optional).
 * @returns {string} - The updated template content.
 */
export function processVueTemplate(templateContent, config) {
  const { attributeName, prefix, excludeTags = [] } = config;
  const ms = new MagicString(templateContent);

  let match;
  while ((match = TAG_REGEX.exec(templateContent)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    const attributesStr = match[2];
    const selfClosing = match[3] || "";

    if (excludeTags.includes(tagName)) continue;

    const idRegex = new RegExp(`\\s${attributeName}\\s*=`);
    if (idRegex.test(attributesStr)) continue;

    const insertPosition =
      match.index + fullMatch.length - (selfClosing.length + 1);
    ms.appendLeft(
      insertPosition,
      ` ${attributeName}="${prefix}${randomUUID()}"`
    );
  }

  return ms.toString();
}

export function processHtmlContent(htmlContent, config) {
  const { attributeName, prefix, excludeTags = [] } = config;
  const ms = new MagicString(htmlContent);

  const tagRegex = /<([a-zA-Z][^\s/>]*)([^>]*?)(\/?)>/g;
  let match;
  while ((match = tagRegex.exec(htmlContent)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    const attributesStr = match[2];
    const selfClosing = match[3] || "";

    if (excludeTags.includes(tagName)) continue;

    const idRegex = new RegExp(`\\s${attributeName}\\s*=`);
    if (idRegex.test(attributesStr)) continue;

    const insertPosition =
      match.index + fullMatch.length - (selfClosing.length + 1);
    ms.appendLeft(
      insertPosition,
      ` ${attributeName}="${prefix}${randomUUID()}"`
    );
  }

  return ms.toString();
}
