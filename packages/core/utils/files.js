const normalizeExcludeFiles = (input) => {
  if (
    !input ||
    input === "" ||
    (Array.isArray(input) && input.every((i) => i === ""))
  ) {
    return null;
  }

  const arr = Array.isArray(input)
    ? input
    : typeof input === "string"
    ? [input]
    : [];

  return arr
    .map((pattern) => {
      if (typeof pattern !== "string" || pattern.trim() === "") return null;
      if (pattern.includes("*")) return pattern;
      return `${pattern.replace(/\/+$/, "")}/**`;
    })
    .filter(Boolean);
};

export default normalizeExcludeFiles;
