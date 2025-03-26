import fs from "fs";
import { load } from "cheerio";
import { randomUUID } from "crypto";

export default function parseHTML(filePath, config) {
  const html = fs.readFileSync(filePath, "utf-8");
  const $ = load(html);

  $("*").each((_, el) => {
    const tag = el.tagName;
    const $el = $(el);

    if (config.skipTags.includes(tag)) return;

    if (!$el.attr("id")) {
      $el.attr("id", `${config.prefix}${randomUUID()}`);
    }
  });

  fs.writeFileSync(filePath, $.html());
}
