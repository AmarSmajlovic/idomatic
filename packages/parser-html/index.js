import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { randomUUID } from "crypto";

export default async function parseHTML(filePath, config) {
  const ext = path.extname(filePath).toLowerCase();
  let content = fs.readFileSync(filePath, "utf-8");
  let changed = false;

  const addIds = ($) => {
    $("*").each((_, el) => {
      const tag = el.tagName || el.name;
      if (config.excludeTags.includes(tag)) return;
      if (!$(el).attr(config.attributeName)) {
        $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
        changed = true;
      }
    });
  };

  if (ext === ".vue") {
    const templateRegex = /<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/i;
    let match = content.match(templateRegex);

    if (match) {
      const originalTemplate = match[1];
      const $ = cheerio.load(originalTemplate, { xmlMode: false });
      addIds($);
      const newTemplate = $.html();
      content = content.replace(
        templateRegex,
        `<template>${newTemplate}</template>`
      );
    } else {
      const scriptRegex = /<script[\s\S]*$/i;
      match = content.match(scriptRegex);
      let fragment, rest;
      if (match) {
        const index = match.index;
        fragment = content.substring(0, index);
        rest = content.substring(index);
      } else {
        fragment = content;
        rest = "";
      }

      const $ = cheerio.load(`<div id="fragment">${fragment}</div>`, {
        xmlMode: false,
      });
      addIds($);
      const newFragment = $("#fragment").html();
      content = newFragment + rest;
    }
  } else if (ext === ".html" || ext === ".ng.html") {
    const isFullDocument = content.trim().toLowerCase().startsWith("<html");
    if (isFullDocument) {
      const $ = cheerio.load(content, { xmlMode: false });
      addIds($);
      content = $.html();
    } else {
      const $ = cheerio.load(`<div id="fragment">${content}</div>`, {
        xmlMode: false,
      });
      addIds($);
      content = $("#fragment").html();
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }

  return changed;
}
