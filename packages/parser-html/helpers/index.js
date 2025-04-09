import { randomUUID } from "crypto";

/**
 * Adds unique attributes to all elements that don't have the specified attribute.
 * It skips elements whose tag names appear in the config's excludeTags array.
 *
 * @param {CheerioStatic} $ - The Cheerio instance containing the parsed HTML.
 * @param {object} config - The configuration object.
 * @param {string} config.attributeName - The attribute name to add (for example, "data-id").
 * @param {string} config.prefix - The prefix for generated IDs.
 * @param {string[]} config.excludeTags - An array of tag names to exclude.
 */
export function addIds($, config) {
  const { attributeName, prefix, excludeTags } = config;
  $("*").each((_, el) => {
    const tag = el.name;
    if (excludeTags && excludeTags.includes(tag)) return;
    if (!$(el).attr(attributeName)) {
      $(el).attr(attributeName, `${prefix}${randomUUID()}`);
    }
  });
}
