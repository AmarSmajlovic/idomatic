const defaultConfigs = {
  js: {
    attributeName: "id",
    prefix: "auto-id-",
    excludeTags: ["html", "head", "script"],
    includeExtensions: ["js", "jsx", "ts", "tsx"],
    excludeFiles: ["node_modules", "public"],
  },
  html: {
    attributeName: "id",
    prefix: "auto-id-",
    excludeTags: ["html", "head", "script"],
    includeExtensions: ["html", "vue"],
    excludeFiles: ["node_modules", "public"],
  },
};

export default defaultConfigs;
