import { createClient } from "next-sanity";

import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  useCdn,
} from "@/lib/sanity/env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: "published",
      stega: false,
    })
  : null;
