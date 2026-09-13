import { z } from "zod";

export const resourceListFiltersSchema = z.object({
  search: z
    .string()
    .trim()
    .max(200)
    .optional(),

  type: z
    .enum([
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
    ])
    .optional(),

  pricingModel: z
    .enum([
      "free",
      "freemium",
      "paid",
      "open_source",
      "contact",
      "unknown",
    ])
    .optional(),

  sourceModel: z
    .enum([
      "open_source",
      "source_available",
      "open_weight",
      "proprietary",
      "unknown",
    ])
    .optional(),

  verified: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

export type ResourceListFiltersInput = z.infer<
  typeof resourceListFiltersSchema
>;