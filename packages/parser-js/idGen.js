import { randomUUID } from "crypto";

/**
 * Id generation with a configurable strategy.
 *
 * - "semantic" (default): derive a human-readable slug from the element's tag,
 *   descriptive attributes and text content, then guarantee uniqueness by
 *   suffixing `-2`, `-3`, ... only on collision.
 * - "random": use `${prefix}${randomUUID()}`.
 *
 * Either way the factory is seeded with ids already present in the file, so
 * re-runs are idempotent: a new element never steals or duplicates an existing id.
 */

const MAX_SLUG_LENGTH = 40;

export function slugify(str, maxLen = MAX_SLUG_LENGTH) {
  if (!str) return "";
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLen)
    .replace(/-+$/g, "");
}

/**
 * @param {object} config - iDomatic config (uses `prefix` and `idStrategy`).
 * @param {Iterable<string>} existing - ids already present in the file.
 * @returns {(parts: string[]) => string} - returns a unique id per call.
 */
export function createIdFactory(config, existing = []) {
  const prefix = config.prefix || "";
  const random = config.idStrategy === "random";
  const taken = new Set(existing);

  return function makeId(parts) {
    if (random) {
      let candidate = `${prefix}${randomUUID()}`;
      while (taken.has(candidate)) candidate = `${prefix}${randomUUID()}`;
      taken.add(candidate);
      return candidate;
    }

    const slug =
      slugify(parts.map((p) => slugify(p)).filter(Boolean).join("-")) || "el";

    let candidate = `${prefix}${slug}`;
    let n = 2;
    while (taken.has(candidate)) {
      candidate = `${prefix}${slug}-${n++}`;
    }
    taken.add(candidate);
    return candidate;
  };
}
