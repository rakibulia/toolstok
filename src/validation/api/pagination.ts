import { z } from "zod";

import { paginationConfig } from "@/config/pagination";

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(paginationConfig.maxLimit)
    .default(paginationConfig.defaultLimit),
});

export type PaginationInput = z.infer<
  typeof paginationSchema
>;