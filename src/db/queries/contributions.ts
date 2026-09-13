import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  contributions,
  resources,
  users,
} from "@/db/schema";

export async function getContributionsByUserId(
  userId: string,
) {
  return db
    .select()
    .from(contributions)
    .where(eq(contributions.userId, userId))
    .orderBy(desc(contributions.createdAt));
}

export async function getContributionsByResourceId(
  resourceId: string,
) {
  return db
    .select()
    .from(contributions)
    .where(eq(contributions.resourceId, resourceId))
    .orderBy(desc(contributions.createdAt));
}

export async function getContributionById(id: string) {
  const result = await db
    .select()
    .from(contributions)
    .where(eq(contributions.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function getPendingContributions() {
  return db
    .select({
      contribution: contributions,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
      resource: resources,
    })
    .from(contributions)
    .innerJoin(users, eq(contributions.userId, users.id))
    .leftJoin(
      resources,
      eq(contributions.resourceId, resources.id),
    )
    .where(eq(contributions.status, "pending"))
    .orderBy(asc(contributions.createdAt));
}

export async function getPendingContributionsByType(
  type: (typeof contributions.type.enumValues)[number],
) {
  return db
    .select({
      contribution: contributions,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
      resource: resources,
    })
    .from(contributions)
    .innerJoin(users, eq(contributions.userId, users.id))
    .leftJoin(
      resources,
      eq(contributions.resourceId, resources.id),
    )
    .where(
      and(
        eq(contributions.status, "pending"),
        eq(contributions.type, type),
      ),
    )
    .orderBy(asc(contributions.createdAt));
}