import excludeFiles from "./ignoredFiles.js";

const defaultConfig = {
  attributeName: "data-testid",
  prefix: "",
  excludeTags: [], //html,head,script...
  includeExtensions: ["js", "jsx", "ts", "tsx"],
  excludeFiles: excludeFiles,
};

export default defaultConfig;
