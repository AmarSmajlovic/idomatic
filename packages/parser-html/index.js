import fs from "fs";
import path from "path";
import { templateRegex } from "./consts/index.js";
import { processHtmlContent, processVueTemplate } from "./utils/index.js";

/**
 * Parses an HTML/Vue file and updates its content with unique IDs.
 *
 * @param {string} filePath - The path to the file.
 * @param {object} config - The configuration object.
 * @param {boolean} dry - If true, does not write changes back to disk.
 * @returns {boolean} - Returns true if changes were made.
 */

export default async function parseHTML(filePath, config, dry = false) {
  const ext = path.extname(filePath).toLowerCase();
  const originalContent = fs.readFileSync(filePath, "utf-8");
  let updatedContent = originalContent;

  if (ext === ".vue") {
    const match = originalContent.match(templateRegex);
    if (match) {
      const newTemplate = processVueTemplate(match[1], config);
      updatedContent = originalContent.replace(
        templateRegex,
        `<template>${newTemplate}</template>`
      );
    }
  } else if (ext === ".html" || ext === ".ng.html") {
    updatedContent = processHtmlContent(originalContent, config);
  }

  if (updatedContent !== originalContent) {
    if (!dry) {
      fs.writeFileSync(filePath, updatedContent);
    }
    return true;
  }
  return false;
}
