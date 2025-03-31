#!/usr/bin/env node
import runInitScan from "../lib/scan.js";
import runInitScanDry from "../lib/scanDry.js";

const args = process.argv.slice(2);

if (args[0] === "scan" && args[1] === "--dry") {
  await runInitScanDry();
} else if (args[0] === "scan") {
  await runInitScan();
} else {
  console.log("Unsupported command. Please use 'scan' or 'scan --dry'.");
}
