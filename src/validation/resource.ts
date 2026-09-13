import { z } from "zod";

export const resourceSlugSchema = z
  .string()
  .min(1)
  .max(160)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain only lowercase letters, numbers, and hyphens.",
  );

export const resourceUrlSchema = z
  .string()
  .url()
  .max(2048);

export const createResourceSchema = z.object({
  type: z.enum([
    "tool",
    "model",
    "agent",
    "mcp_server",
    "skill",
    "workflow",
    "automation",
    "dataset",
    "sdk",
    "api",
    "framework",
    "infrastructure",
    "hardware",
    "robotics",
    "other",
  ]),

  name: z
    .string()
    .trim()
    .min(1)
    .max(200),

  slug: resourceSlugSchema,

  tagline: z
    .string()
    .trim()
    .max(300)
    .optional(),

  description: z
    .string()
    .trim()
    .max(10000)
    .optional(),

  websiteUrl: resourceUrlSchema.optional(),

  documentationUrl: resourceUrlSchema.optional(),

  repositoryUrl: resourceUrlSchema.optional(),

  logoUrl: resourceUrlSchema.optional(),

  pricingModel: z
    .enum([
      "free",
      "freemium",
      "paid",
      "open_source",
      "contact",
      "unknown",
    ])
    .default("unknown"),

  sourceModel: z
    .enum([
      "open_source",
      "source_available",
      "open_weight",
      "proprietary",
      "unknown",
    ])
    .default("unknown"),

  license: z
    .string()
    .trim()
    .max(200)
    .optional(),

  organizationId: z
    .uuid()
    .optional(),
});

export type CreateResourceInput = z.infer<
  typeof createResourceSchema
>;