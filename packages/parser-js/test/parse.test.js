import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";
import parseJS from "../index.js";

const config = { attributeName: "data-testid", prefix: "", excludeTags: [] };

let file;

beforeEach(() => {
  file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "idomatic-")), "c.jsx");
});

afterEach(() => {
  fs.rmSync(path.dirname(file), { recursive: true, force: true });
});

function run(code) {
  fs.writeFileSync(file, code);
  parseJS(file, config, false);
  return fs.readFileSync(file, "utf-8");
}

describe("parseJS semantic ids", () => {
  it("derives id from element text", () => {
    expect(run("const x = <button>Log in</button>;")).toContain(
      'data-testid="button-log-in"'
    );
  });

  it("prefers aria-label over text", () => {
    const out = run('const x = <button aria-label="Submit form">Go</button>;');
    expect(out).toContain('data-testid="button-submit-form"');
  });

  it("derives id from name attribute", () => {
    expect(run('const x = <input name="email" />;')).toContain(
      'data-testid="input-email"'
    );
  });

  it("dedupes identical siblings", () => {
    const out = run("const x = <div><span>a</span><span>a</span></div>;");
    expect(out).toContain('data-testid="span-a"');
    expect(out).toContain('data-testid="span-a-2"');
  });

  it("skips excluded tags", () => {
    const out = parseJSWith("const x = <script>b</script>;", {
      ...config,
      excludeTags: ["script"],
    });
    expect(out).not.toContain("data-testid");
  });

  it("leaves existing attribute untouched and avoids collision", () => {
    const out = run(
      'const x = <div><b data-testid="span-a">x</b><span>a</span></div>;'
    );
    expect(out).toContain('data-testid="span-a"');
    expect(out).toContain('data-testid="span-a-2"');
  });

  it("is idempotent across runs", () => {
    const code = "const x = <form><button>Save</button><div>x</div></form>;";
    const first = run(code);
    fs.writeFileSync(file, first);
    parseJS(file, config, false);
    expect(fs.readFileSync(file, "utf-8")).toBe(first);
  });

  it("does not write in dry mode", () => {
    const code = "const x = <button>Log in</button>;";
    fs.writeFileSync(file, code);
    parseJS(file, config, true);
    expect(fs.readFileSync(file, "utf-8")).toBe(code);
  });
});

function parseJSWith(code, cfg) {
  fs.writeFileSync(file, code);
  parseJS(file, cfg, false);
  return fs.readFileSync(file, "utf-8");
}
