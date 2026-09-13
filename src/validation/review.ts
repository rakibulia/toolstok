import { z } from "zod";

export const createReviewSchema = z.object({
  resourceId: z.uuid(),

  rating: z
    .number()
    .int()
    .min(1)
    .max(5),

  title: z
    .string()
    .trim()
    .max(200)
    .optional(),

  body: z
    .string()
    .trim()
    .min(1)
    .max(5000),
});

export type CreateReviewInput = z.infer<
  typeof createReviewSchema
>;