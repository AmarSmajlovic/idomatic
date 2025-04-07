import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { randomUUID } from "crypto";

/**
 * @param {string} filePath
 * @param {object} config
 * @param {boolean} dry
 * @returns {boolean}
 */
export default async function parseHTML(filePath, config, dry = false) {
  const ext = path.extname(filePath).toLowerCase();
  const originalContent = fs.readFileSync(filePath, "utf-8");
  let updatedContent = originalContent;

  const tagsToExclude = config.excludeTags || [];

  const addIds = ($) => {
    $("*").each((_, el) => {
      const tag = el.name;
      if (tagsToExclude.includes(tag)) return;
      if (!$(el).attr(config.attributeName)) {
        $(el).attr(config.attributeName, `${config.prefix}${randomUUID()}`);
      }
    });
  };

  if (ext === ".vue") {
    const templateRegex = /<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/i;
    const match = originalContent.match(templateRegex);

    if (match) {
      const $ = cheerio.load(match[1], { xmlMode: false });
      addIds($);
      const newTemplate = $.html();
      updatedContent = originalContent.replace(
        templateRegex,
        `<template>${newTemplate}</template>`
      );
    }
  } else if (ext === ".html" || ext === ".ng.html") {
    const isFullDocument = originalContent
      .trim()
      .toLowerCase()
      .startsWith("<html");

    if (isFullDocument) {
      const $ = cheerio.load(originalContent, { xmlMode: false });
      addIds($);
      updatedContent = $.html();
    } else {
      const $ = cheerio.load(`<div id="fragment">${originalContent}</div>`, {
        xmlMode: false,
      });
      addIds($);
      updatedContent = $("#fragment").html();
    }
  }

  if (updatedContent !== originalContent) {
    if (!dry) {
      fs.writeFileSync(filePath, updatedContent);
    }
    return true;
  }

  return false;
}
