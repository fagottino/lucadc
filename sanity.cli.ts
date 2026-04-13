import { defineCliConfig } from "sanity/cli";

import { studioDataset, studioProjectId } from "@/lib/sanity/env";

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
});
