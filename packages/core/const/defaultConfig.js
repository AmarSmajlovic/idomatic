import excludeFiles from "./excludeFiles.js";

const defaultConfig = {
  attributeName: "id",
  prefix: "auto-id-",
  // pattern: "[component]-[tag]-[index]",
  excludeTags: [], //html,head,script...
  includeExtensions: ["js", "jsx", "ts", "tsx"],
  excludeFiles: excludeFiles,
};

export default defaultConfig;
