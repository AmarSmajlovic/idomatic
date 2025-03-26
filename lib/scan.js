import { globby } from "globby";
import path from "path";
import addIdsToFile from "../lib/addId.js";

async function runInitScan(config) {
  const patterns = config.extensions.map((ext) => `src/**/*.${ext}`);
  const files = await globby(patterns);

  console.log(`📂 Found ${files.length} files. Scanning...`);

  for (const file of files) {
    try {
      addIdsToFile(path.resolve(file), config);
      console.log(`✅ Updated: ${file}`);
    } catch (e) {
      console.warn(`❌ Error in: ${file}`);
      console.log(e);
    }
  }

  console.log("🎉 Init scan complete!");
}

export default runInitScan;
