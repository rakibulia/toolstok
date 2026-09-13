import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { resources, savedResources } from "@/db/schema";

export async function getSavedResourcesByUserId(
  userId: string,
) {
  return db
    .select({
      resource: resources,
      savedAt: savedResources.createdAt,
    })
    .from(savedResources)
    .innerJoin(
      resources,
      eq(savedResources.resourceId, resources.id),
    )
    .where(eq(savedResources.userId, userId))
    .orderBy(desc(savedResources.createdAt));
}

export async function isResourceSaved(
  userId: string,
  resourceId: string,
) {
  const result = await db
    .select({
      id: savedResources.id,
    })
    .from(savedResources)
    .where(
      and(
        eq(savedResources.userId, userId),
        eq(savedResources.resourceId, resourceId),
      ),
    )
    .limit(1);

  return result.length > 0;
}

export async function getSavedResource(
  userId: string,
  resourceId: string,
) {
  const result = await db
    .select()
    .from(savedResources)
    .where(
      and(
        eq(savedResources.userId, userId),
        eq(savedResources.resourceId, resourceId),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}