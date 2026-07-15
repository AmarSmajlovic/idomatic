#!/usr/bin/env node
import runInitScan from "../lib/scan.js";

const [command, flag] = process.argv.slice(2);

if (command === "scan" && (flag === "--dry" || flag === "--write")) {
  await runInitScan(flag === "--dry");
} else {
  console.log(
    "👉 Use: 'idomatic scan --dry' to preview, or 'idomatic scan --write' to apply."
  );
}
