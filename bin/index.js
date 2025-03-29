#!/usr/bin/env node
import runInitScan from "../lib/scan.js";
import runInitScanDry from "../lib/scanDry.js";

const args = process.argv.slice(2);
const isScan = args.includes("scan");
const isInitScanDry = args.includes("scan --dry");

if (isScan) {
  await runInitScan();
} else if (isInitScanDry) {
  await runInitScanDry();
} else {
  console.log("Only --init-scan is supported in MVP for now.");
}
