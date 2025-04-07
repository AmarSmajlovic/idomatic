import { globby } from "globby";
import { processFile } from "./core.js";
import getUserConfig from "./readConfig.js";

export default async function runInitScan(isDry = false) {
  const config = getUserConfig();

  const patterns = config.includeExtensions.map((ext) => `**/*.${ext}`);
  const files = await globby(patterns, {
    gitignore: true,
    ignore: config.excludeFiles.map((dir) => `${dir}/**`),
  });

  console.log(
    `📂 Found ${files.length} files. ${
      isDry ? "Dry scanning..." : "Scanning..."
    }`
  );

  for (const file of files) {
    try {
      const updated = await processFile(file, config, isDry);
      if (updated) {
        console.log(
          `${isDry ? "[Dry Run] Would update" : "✅ Updated"}: ${file}`
        );
      }
    } catch (e) {
      console.warn(`❌ Error in: ${file}`, e);
    }
  }

  console.log("🎉 Init scan complete!");
}
