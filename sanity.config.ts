"use client";

import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";

import { studioDataset, studioProjectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId: studioProjectId,
  dataset: studioDataset,
  title: "Luca DC Portfolio",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure }), visionTool()],
});
