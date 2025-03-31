import fs from "fs";
import path from "path";

export default function getUserConfig() {
  const configFilePath = path.join(process.cwd(), ".idomatic.config.json");

  if (fs.existsSync(configFilePath)) {
    try {
      const configContent = fs.readFileSync(configFilePath, "utf-8");
      const userConfig = JSON.parse(configContent);
      return userConfig;
    } catch (err) {
      console.error(
        "Error reading the .idomatic.config.json file. Using default config."
      );
    }
  } else {
    console.warn("No .idomatic.config.json file found. Using default config.");
  }
}
