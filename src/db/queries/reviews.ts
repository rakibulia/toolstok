import {
  and,
  asc,
  desc,
  eq,
  sql,
} from "drizzle-orm";

import { db } from "@/db";
import { reviews, users } from "@/db/schema";

export async function getPublishedReviewsByResourceId(
  resourceId: string,
) {
  return db
    .select({
      review: reviews,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(
      and(
        eq(reviews.resourceId, resourceId),
        eq(reviews.status, "published"),
      ),
    )
    .orderBy(desc(reviews.createdAt));
}

export async function getUserReviewForResource(
  userId: string,
  resourceId: string,
) {
  const result = await db
    .select()
    .from(reviews)
    .where(
      and(
        eq(reviews.userId, userId),
        eq(reviews.resourceId, resourceId),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}

export async function getReviewStats(resourceId: string) {
  const result = await db
    .select({
      reviewCount: sql<number>`count(*)::int`,
      averageRating: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.resourceId, resourceId),
        eq(reviews.status, "published"),
      ),
    );

  return result[0] ?? {
    reviewCount: 0,
    averageRating: 0,
  };
}

export async function getPendingReviews() {
  return db
    .select({
      review: reviews,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
      },
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.status, "pending"))
    .orderBy(asc(reviews.createdAt));
}