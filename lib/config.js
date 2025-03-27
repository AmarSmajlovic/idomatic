import fs from "fs";
import path from "path";
import defaultConfig from "../const/defaultConfig.js";
import normalizeIgnoreFiles from "../utils/files.js";

async function loadConfig() {
  const configPath = path.join(process.cwd(), ".idsrc.json");

  if (fs.existsSync(configPath)) {
    const userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return {
      ...defaultConfig,
      ignoreFiles:
        normalizeIgnoreFiles(userConfig.ignoreFiles) ||
        defaultConfig.ignoreFiles,
    };
  }

  return defaultConfig;
}

export default loadConfig;
