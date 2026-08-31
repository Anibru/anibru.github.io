import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md"
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      summary: z.string(),
      technologies: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number().int(),

      heroImage: image().optional(),
      heroAlt: z.string().optional(),

      resources: z.array(
        z.object({
          kind: z.enum([
            "document",
            "repository",
            "publication",
            "video"
          ]),
      
          title: z.string(),
      
          description: z.string().optional(),
      
          actions: z.array(
            z.object({
              label: z.string(),
              href: z.string(),
              download: z.boolean().default(false)
            })
          ).min(1)
        })
      ).default([])
    })  
});

export const collections = {
  projects
};