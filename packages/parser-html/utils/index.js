import * as cheerio from "cheerio";
import { addIds } from "../helpers/index.js";

/**
 * Processes a Vue template content.
 * @param {string} templateContent - The content inside the Vue <template> tag.
 * @param {object} config - The configuration object.
 * @returns {string} - The updated template content.
 */
export function processVueTemplate(templateContent, config) {
  const $ = cheerio.load(templateContent, { xmlMode: true });
  // For Vue files, addIds might not need the config if handled differently;
  // adjust as needed.
  addIds($, config);
  return $.html();
}

/**
 * Processes HTML content (full document or fragment) by adding IDs.
 *
 * @param {string} htmlContent - The original HTML content.
 * @param {object} config - The configuration object.
 * @returns {string} - The updated HTML content.
 */
export function processHtmlContent(htmlContent, config) {
  // Determine if we have a full document
  const isFullDocument = htmlContent.trim().toLowerCase().startsWith("<html");

  if (isFullDocument) {
    const $ = cheerio.load(htmlContent, { xmlMode: true });
    addIds($, config);
    return $.html();
  } else {
    // Wrap the fragment to ensure Cheerio parses it properly.
    const $ = cheerio.load(`<div id="fragment">${htmlContent}</div>`, {
      xmlMode: true,
    });
    addIds($, config);
    return $("#fragment").html();
  }
}
