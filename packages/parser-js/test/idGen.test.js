import { describe, it, expect } from "vitest";
import { slugify, createIdFactory } from "../idGen.js";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Sign In")).toBe("sign-in");
  });

  it("collapses non-alphanumeric runs and trims", () => {
    expect(slugify("  Email address!! ")).toBe("email-address");
    expect(slugify("Forgot password?")).toBe("forgot-password");
  });

  it("returns empty string for empty/undefined input", () => {
    expect(slugify("")).toBe("");
    expect(slugify(undefined)).toBe("");
  });

  it("caps length without a trailing hyphen", () => {
    const out = slugify("a".repeat(100));
    expect(out.length).toBeLessThanOrEqual(40);
    expect(out.endsWith("-")).toBe(false);
  });
});

describe("createIdFactory", () => {
  it("builds a slug from parts", () => {
    const makeId = createIdFactory({ prefix: "" });
    expect(makeId(["button", "Submit login"])).toBe("button-submit-login");
  });

  it("applies prefix", () => {
    const makeId = createIdFactory({ prefix: "qa-" });
    expect(makeId(["input", "email"])).toBe("qa-input-email");
  });

  it("suffixes only on collision", () => {
    const makeId = createIdFactory({ prefix: "" });
    expect(makeId(["div"])).toBe("div");
    expect(makeId(["div"])).toBe("div-2");
    expect(makeId(["div"])).toBe("div-3");
  });

  it("never collides with seeded existing ids", () => {
    const makeId = createIdFactory({ prefix: "" }, ["button-submit"]);
    expect(makeId(["button", "submit"])).toBe("button-submit-2");
  });

  it("falls back to 'el' when no usable parts", () => {
    const makeId = createIdFactory({ prefix: "" });
    expect(makeId([""])).toBe("el");
  });

  it("produces uuid-based ids under the random strategy", () => {
    const makeId = createIdFactory({ prefix: "auto-id-", idStrategy: "random" });
    const id = makeId(["button", "submit"]);
    expect(id).toMatch(
      /^auto-id-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it("random ids are unique across calls", () => {
    const makeId = createIdFactory({ prefix: "", idStrategy: "random" });
    const a = makeId(["div"]);
    const b = makeId(["div"]);
    expect(a).not.toBe(b);
  });
});
