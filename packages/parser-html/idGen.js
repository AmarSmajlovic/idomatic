/**
 * Semantic, deterministic id generation for HTML/Vue templates.
 *
 * Derives a human-readable slug from the tag and its descriptive attributes,
 * then guarantees uniqueness by suffixing `-2`, `-3`, ... only on collision.
 * Seeding the factory with ids already present in the file makes re-runs
 * idempotent: a new element never duplicates an id that already exists.
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
 * @param {object} config - iDomatic config (uses `prefix`).
 * @param {Iterable<string>} existing - ids already present in the file.
 * @returns {(parts: string[]) => string} - returns a unique id per call.
 */
export function createIdFactory(config, existing = []) {
  const prefix = config.prefix || "";
  const taken = new Set(existing);

  return function makeId(parts) {
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
