import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Neil Taggart'),
    image: z.object({
      url: z.string().optional(),
      alt: z.string().optional()
    }).optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false)
  })
});

// Research library: one YAML file per report. `url` may be an internal path
// (a report hosted under /research/...) or an external link to someone else's work.
const research = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    source: z.string().default('Adaptive Online'),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog,
  research
};
