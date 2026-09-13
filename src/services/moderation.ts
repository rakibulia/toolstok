import { eq } from "drizzle-orm";

import { db } from "@/db";
import {
  contributions,
  resourceHistory,
  resources,
  reviews,
  users,
} from "@/db/schema";
import { requireRole } from "@/lib/auth/authorization";

async function requireModerator(userId: string) {
  const result = await db
    .select({
      role: users.role,
      isActive: users.isActive,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = result[0];

  if (!user || !user.isActive) {
    throw new Error("User is not authorized.");
  }

  requireRole(user.role, "moderator");

  return user;
}

export async function approveContribution(
  contributionId: string,
  moderatorId: string,
  note?: string,
) {
  await requireModerator(moderatorId);

  const result = await db
    .select()
    .from(contributions)
    .where(eq(contributions.id, contributionId))
    .limit(1);

  const contribution = result[0];

  if (!contribution) {
    throw new Error("Contribution not found.");
  }

  if (contribution.status !== "pending") {
    throw new Error("Contribution is no longer pending.");
  }

  const [updatedContribution] = await db
    .update(contributions)
    .set({
      status: "approved",
      moderatorId,
      moderatorNote: note,
      resolvedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(contributions.id, contributionId))
    .returning();

  return updatedContribution;
}

export async function rejectContribution(
  contributionId: string,
  moderatorId: string,
  note?: string,
) {
  await requireModerator(moderatorId);

  const result = await db
    .select()
    .from(contributions)
    .where(eq(contributions.id, contributionId))
    .limit(1);

  const contribution = result[0];

  if (!contribution) {
    throw new Error("Contribution not found.");
  }

  if (contribution.status !== "pending") {
    throw new Error("Contribution is no longer pending.");
  }

  const [updatedContribution] = await db
    .update(contributions)
    .set({
      status: "rejected",
      moderatorId,
      moderatorNote: note,
      resolvedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(contributions.id, contributionId))
    .returning();

  return updatedContribution;
}

export async function publishResource(
  resourceId: string,
  moderatorId: string,
  summary?: string,
) {
  await requireModerator(moderatorId);

  const result = await db
    .select()
    .from(resources)
    .where(eq(resources.id, resourceId))
    .limit(1);

  const resource = result[0];

  if (!resource) {
    throw new Error("Resource not found.");
  }

  const [updatedResource] = await db
    .update(resources)
    .set({
      status: "published",
      updatedAt: new Date(),
    })
    .where(eq(resources.id, resourceId))
    .returning();

  await db.insert(resourceHistory).values({
    resourceId,
    userId: moderatorId,
    changeType: "published",
    summary: summary ?? "Resource published by moderator.",
  });

  return updatedResource;
}

export async function publishReview(
  reviewId: string,
  moderatorId: string,
  note?: string,
) {
  await requireModerator(moderatorId);

  const result = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  const review = result[0];

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.status !== "pending") {
    throw new Error("Review is no longer pending.");
  }

  const [updatedReview] = await db
    .update(reviews)
    .set({
      status: "published",
      moderatorId,
      moderatorNote: note,
      updatedAt: new Date(),
    })
    .where(eq(reviews.id, reviewId))
    .returning();

  return updatedReview;
}

export async function rejectReview(
  reviewId: string,
  moderatorId: string,
  note?: string,
) {
  await requireModerator(moderatorId);

  const result = await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, reviewId))
    .limit(1);

  const review = result[0];

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.status !== "pending") {
    throw new Error("Review is no longer pending.");
  }

  const [updatedReview] = await db
    .update(reviews)
    .set({
      status: "rejected",
      moderatorId,
      moderatorNote: note,
      updatedAt: new Date(),
    })
    .where(eq(reviews.id, reviewId))
    .returning();

  return updatedReview;
}