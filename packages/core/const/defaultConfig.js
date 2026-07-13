import excludeFiles from "./ignoredFiles.js";

const defaultConfig = {
  attributeName: "id",
  // "semantic" -> readable ids (button-submit); "random" -> ${prefix}${uuid}
  idStrategy: "semantic",
  prefix: "",
  excludeTags: [], //html,head,script...
  includeExtensions: ["js", "jsx", "ts", "tsx"],
  excludeFiles: excludeFiles,
};

export default defaultConfig;
