#!/usr/bin/env node
import runInitScan from "../lib/scan.js";

const args = process.argv.slice(2);
const isDry = args[0] === "scan" && args[1] === "--dry";

if (args[0] === "scan") {
  await runInitScan(isDry);
} else {
  console.log("❌ Unsupported command.\n👉 Use: 'scan' or 'scan --dry'");
}
