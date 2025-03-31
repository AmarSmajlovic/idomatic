import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { randomUUID } from "crypto";

export default async function parseHTML(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  let content = fs.readFileSync(filePath, "utf-8");

  if (ext === ".vue") {
    // Try to match a <template> block first.
    const templateRegex = /<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/i;
    let match = content.match(templateRegex);

    if (match) {
      // Process the content inside <template>
      const originalTemplate = match[1];
      const $ = cheerio.load(originalTemplate, { xmlMode: false });

      $("*").each((_, el) => {
        const tag = el.tagName || el.name;
        if (config.excludeTags.includes(tag)) return;
        if (!$(el).attr(config.attributeName)) {
          $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
        }
      });

      const newTemplate = $.html();
      // Replace the original <template> block with the updated version.
      content = content.replace(
        templateRegex,
        `<template>${newTemplate}</template>`
      );
    } else {
      // No <template> block found.
      // Assume that the template is the content before the first <script> tag.
      const scriptRegex = /<script[\s\S]*$/i;
      match = content.match(scriptRegex);
      let fragment, rest;
      if (match) {
        const index = match.index;
        fragment = content.substring(0, index);
        rest = content.substring(index);
      } else {
        // If there's no <script> block, treat the entire file as a fragment.
        fragment = content;
        rest = "";
      }

      // Wrap the fragment in a temporary container so we don't lose the structure.
      const $ = cheerio.load(`<div id="fragment">${fragment}</div>`, {
        xmlMode: false,
      });
      $("#fragment")
        .find("*")
        .each((_, el) => {
          const tag = el.tagName || el.name;
          if (config.excludeTags.includes(tag)) return;
          if (!$(el).attr(config.attributeName)) {
            $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
          }
        });

      const newFragment = $("#fragment").html();
      // Reassemble the file: updated fragment + the rest (e.g., <script> block).
      content = newFragment + rest;
    }
  } else if (ext === ".html" || ext === ".ng.html") {
    // For HTML files, check if it's a full document or a fragment.
    const isFullDocument = content.trim().toLowerCase().startsWith("<html");
    if (isFullDocument) {
      const $ = cheerio.load(content, { xmlMode: false });
      $("*").each((_, el) => {
        const tag = el.tagName || el.name;
        if (config.excludeTags.includes(tag)) return;
        if (!$(el).attr(config.attributeName)) {
          $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
        }
      });
      content = $.html();
    } else {
      // Treat as an HTML fragment.
      const $ = cheerio.load(`<div id="fragment">${content}</div>`, {
        xmlMode: false,
      });
      $("#fragment")
        .find("*")
        .each((_, el) => {
          const tag = el.tagName || el.name;
          if (config.excludeTags.includes(tag)) return;
          if (!$(el).attr(config.attributeName)) {
            $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
          }
        });
      content = $("#fragment").html();
    }
  }

  fs.writeFileSync(filePath, content);
}
