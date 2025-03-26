#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";
import runInitScan from "../lib/scan.js";
import loadConfig from "../lib/config.js";

// Node.js doesn't provide __dirname in ESM, so we define it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const isInitScan = args.includes("--init-scan");

const config = await loadConfig();

if (isInitScan) {
  await runInitScan(config);
} else {
  console.log("Only --init-scan is supported in MVP for now.");
}
