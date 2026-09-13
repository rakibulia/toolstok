import { z } from "zod";

export const contributionTypeSchema = z.enum([
  "submission",
  "edit_suggestion",
  "report",
]);

export const createContributionSchema = z.object({
  type: contributionTypeSchema,

  resourceId: z
    .uuid()
    .optional(),

  title: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional(),

  description: z
    .string()
    .trim()
    .max(5000)
    .optional(),

  payload: z
    .record(z.string(), z.unknown())
    .optional(),
});

export type CreateContributionInput = z.infer<
  typeof createContributionSchema
>;