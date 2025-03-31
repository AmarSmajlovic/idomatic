import { globby } from "globby";
import { processFile } from "./core.js";
import getUserConfig from "./readConfig.js";

async function runInitScan() {
  const config = getUserConfig();

  const patterns = config.includeExtensions.map((ext) => `**/*.${ext}`);
  const files = await globby(patterns, {
    gitignore: true,
    ignore: config.excludeFiles.map((dir) => `${dir}/**`),
  });

  console.log(`📂 Found ${files.length} files. Scanning...`);

  for (const file of files) {
    try {
      console.log(`[Dry Run] Would process: ${file}`);
    } catch (e) {
      console.warn(`❌ Error in: ${file}`);
    }
  }

  console.log("🎉 Init scan complete!");
}

export default runInitScan;
