import fs from "fs";
import path from "path";

async function loadConfig() {
  const defaultConfig = {
    prefix: "auto-id-",
    skipTags: [],
    extensions: ["js", "jsx", "ts", "tsx"],
  };

  const configPath = path.join(process.cwd(), ".idsrc.json");

  if (fs.existsSync(configPath)) {
    const userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return { ...defaultConfig, ...userConfig };
  }

  return defaultConfig;
}

export default loadConfig;
