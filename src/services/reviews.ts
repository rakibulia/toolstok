import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { resources, reviews } from "@/db/schema";
import {
  createReviewSchema,
  type CreateReviewInput,
} from "@/validation/review";

export async function createReview(
  userId: string,
  input: CreateReviewInput,
) {
  const validated = createReviewSchema.parse(input);

  const resource = await db
    .select({
      id: resources.id,
      status: resources.status,
    })
    .from(resources)
    .where(eq(resources.id, validated.resourceId))
    .limit(1);

  if (!resource[0] || resource[0].status !== "published") {
    throw new Error("Resource is not available for review.");
  }

  const existingReview = await db
    .select({
      id: reviews.id,
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.resourceId, validated.resourceId),
        eq(reviews.userId, userId),
      ),
    )
    .limit(1);

  if (existingReview.length > 0) {
    throw new Error(
      "You have already reviewed this resource.",
    );
  }

  const [review] = await db
    .insert(reviews)
    .values({
      resourceId: validated.resourceId,
      userId,
      rating: validated.rating,
      title: validated.title,
      body: validated.body,
      status: "pending",
    })
    .returning();

  return review;
}