import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const isRenderStatic = process.env.RENDER_STATIC_EXPORT === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Demo-Faerie-introduce";
const assetPrefix = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  ...(isGitHubPages || isRenderStatic
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  ...(isGitHubPages ? { assetPrefix } : {}),
};

export default nextConfig;
