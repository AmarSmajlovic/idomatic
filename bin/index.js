#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import runInitScan from "../lib/scan.js";

const __filename = fileURLToPath(import.meta.url);

const args = process.argv.slice(2);
const isInitScan = args.includes("--init-scan");

if (isInitScan) {
  await runInitScan();
} else {
  console.log("Only --init-scan is supported in MVP for now.");
}
