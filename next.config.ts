import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
});

const nextConfig = withNextra({
  reactStrictMode: true,
});

export default nextConfig;
