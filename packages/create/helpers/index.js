const defaultConfigs = {
  js: {
    attributeName: "id",
    prefix: "auto-id-",
    excludeTags: ["html", "head", "script"],
    includeExtensions: ["js", "jsx", "ts", "tsx"],
    excludeFiles: [],
  },
  html: {
    attributeName: "id",
    prefix: "auto-id-",
    excludeTags: ["html", "head", "script"],
    includeExtensions: ["html", "vue"],
    excludeFiles: [],
  },
};

export default defaultConfigs;
