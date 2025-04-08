import { existsSync } from "fs";
import { join } from "path";

export function detectPackageManagerFallback() {
  const root = process.cwd();

  if (existsSync(join(root, "bun.lockb"))) return "bun";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "package-lock.json"))) return "npm";

  return "npm";
}
