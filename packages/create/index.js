#!/usr/bin/env bun
import prompts from "prompts";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import initConfig from "./lib/initConfig.js";

console.log("✨ Welcome to idomatic setup!");

const framework = await initConfig();
console.log(framework);

const res = await prompts([
  {
    type: "toggle",
    name: "installParsers",
    message: "Install the correct parser for your project?",
    initial: true,
    active: "yes",
    inactive: "no",
  },
]);

// Detect package manager
const agent = process.env.npm_config_user_agent || "";
let pkg = "npm";
if (agent.includes("yarn")) pkg = "yarn";
else if (agent.includes("bun")) pkg = "bun";

// Install parser if opted-in
if (res.installParsers) {
  const parser =
    framework === "js" ? "@idomatic/parser-js" : "@idomatic/parser-html";
  const installParserCmd = {
    npm: `npm install ${parser} --save-dev`,
    yarn: `yarn add ${parser} --dev`,
    bun: `bun add -d ${parser}`,
  }[pkg];

  console.log(`📦 Installing ${parser} with ${pkg}...`);
  execSync(installParserCmd, { stdio: "inherit" });
}

// Install core package (always install it)
const installCoreCmd = {
  npm: `npm install @idomatic/core --save-dev`,
  yarn: `yarn add @idomatic/core --dev`,
  bun: `bun add -d @idomatic/core`,
}[pkg];

console.log(`📦 Installing @idomatic/core with ${pkg}...`);
execSync(installCoreCmd, { stdio: "inherit" });

console.log("🎉 You're ready to run: npx idomatic --init-scan");
