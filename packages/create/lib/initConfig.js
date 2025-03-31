import fs from "fs";
import path from "path";
import prompts from "prompts";
import defaultConfigs from "../helpers/index.js";

async function initConfig() {
  const { framework } = await prompts([
    {
      type: "select",
      name: "framework",
      message: "Which framework are you using?",
      choices: [
        { title: "React (JS/TSX)", value: "js" },
        { title: "HTML / Vue / Angular", value: "html" },
      ],
    },
  ]);

  const config = defaultConfigs[framework];

  // Write the config to .idomaticsrc.json in the current working directory
  const configFilePath = path.join(process.cwd(), ".idomatic.config.json");
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

  console.log(`Configuration file created at ${configFilePath}`);
  return framework;
}

export default initConfig;
