import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      // Posts are all "projects"; open source entries are a separate collection.
      category: z.enum(["projects"]).default("projects"),
      // Project duration (`YYYY-MM`). Shown instead of the date in previews;
      // omit `end` for an ongoing project.
      period: z
        .object({ start: z.coerce.date(), end: z.coerce.date().optional() })
        .optional(),
      // Company the project was done at; shown next to `period`.
      company: z.string().optional(),
      // Main picture of the project (an image URL), used in the portfolio PDF.
      // Falls back to `ogImage` when omitted.
      mainImage: z.string().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

// One JSON file per repository. Only `repo` is required: the name, description
// and star count are fetched from GitHub at build time. `title` optionally
// overrides the repository name.
const openSource = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/open-source" }),
  schema: z.object({
    repo: z.url(),
    title: z.string().optional(),
    // Shown on the card and listed on the tag pages, next to posts. Use the same
    // names as post tags so a tag page groups both.
    tags: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, openSource, pages };
