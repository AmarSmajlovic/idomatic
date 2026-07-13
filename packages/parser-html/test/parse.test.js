import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";
import parseHTML from "../index.js";

const config = { attributeName: "data-testid", prefix: "", excludeTags: [] };

let dir;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "idomatic-html-"));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

async function run(name, content, cfg = config) {
  const file = path.join(dir, name);
  fs.writeFileSync(file, content);
  await parseHTML(file, cfg, false);
  return fs.readFileSync(file, "utf-8");
}

describe("parseHTML semantic ids", () => {
  it("derives id from a descriptive attribute", async () => {
    const out = await run("a.html", '<input name="email" />');
    expect(out).toContain('data-testid="input-email"');
  });

  it("uses aria-label when present", async () => {
    const out = await run("a.html", '<button aria-label="Submit">Go</button>');
    expect(out).toContain('data-testid="button-submit"');
  });

  it("dedupes identical siblings", async () => {
    const out = await run("a.html", "<div></div><div></div>");
    expect(out).toContain('data-testid="div"');
    expect(out).toContain('data-testid="div-2"');
  });

  it("skips tags that already have the attribute", async () => {
    const out = await run("a.html", '<span data-testid="keep"></span>');
    expect(out).toBe('<span data-testid="keep"></span>');
  });

  it("processes Vue template blocks", async () => {
    const out = await run(
      "a.vue",
      '<template><button aria-label="Save">x</button></template>'
    );
    expect(out).toContain('data-testid="button-save"');
  });

  it("respects excludeTags", async () => {
    const out = await run("a.html", "<script></script>", {
      ...config,
      excludeTags: ["script"],
    });
    expect(out).not.toContain("data-testid");
  });

  it("is idempotent across runs", async () => {
    const first = await run("a.html", '<input name="email" /><div></div>');
    const file = path.join(dir, "a.html");
    await parseHTML(file, config, false);
    expect(fs.readFileSync(file, "utf-8")).toBe(first);
  });
});
