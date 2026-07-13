import { describe, it, expect } from "vitest";
import { slugify, createIdFactory } from "../idGen.js";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Email Address")).toBe("email-address");
  });

  it("returns empty string for empty input", () => {
    expect(slugify("")).toBe("");
  });
});

describe("createIdFactory", () => {
  it("suffixes only on collision", () => {
    const makeId = createIdFactory({ prefix: "" });
    expect(makeId(["div"])).toBe("div");
    expect(makeId(["div"])).toBe("div-2");
  });

  it("never collides with seeded existing ids", () => {
    const makeId = createIdFactory({ prefix: "" }, ["input-email"]);
    expect(makeId(["input", "email"])).toBe("input-email-2");
  });
});
