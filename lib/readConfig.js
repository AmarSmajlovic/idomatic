import fs from "fs";
import path from "path";
import defaultConfigs from "./defaultConfigs.js";

const defaultFallback = defaultConfigs.react;

export default function getUserConfig() {
  const configFilePath = path.join(process.cwd(), ".idomaticsrc.json");

  if (fs.existsSync(configFilePath)) {
    try {
      const configContent = fs.readFileSync(configFilePath, "utf-8");
      const userConfig = JSON.parse(configContent);
      return userConfig;
    } catch (err) {
      console.error(
        "Error reading the .idomaticsrc.json file. Using default config."
      );
      return defaultFallback;
    }
  } else {
    console.warn("No .idomaticsrc.json file found. Using default config.");
    return defaultFallback;
  }
}
