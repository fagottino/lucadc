export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-12";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const studioProjectId = projectId || "demo-project";
export const studioDataset = dataset || "production";
export const useCdn = true;

export const isSanityConfigured = Boolean(projectId && dataset);
