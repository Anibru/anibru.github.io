import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md"
  }),

  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    technologies: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().int()
  })
});

export const collections = {
  projects
};