import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  collectionResources,
  collections,
  resources,
} from "@/db/schema";

export async function getPublicCollections() {
  return db
    .select()
    .from(collections)
    .where(eq(collections.isPublic, true))
    .orderBy(desc(collections.createdAt));
}

export async function getFeaturedCollections() {
  return db
    .select()
    .from(collections)
    .where(eq(collections.isFeatured, true))
    .orderBy(desc(collections.createdAt));
}

export async function getCollectionBySlug(slug: string) {
  const result = await db
    .select()
    .from(collections)
    .where(eq(collections.slug, slug))
    .limit(1);

  const collection = result[0];

  if (!collection || !collection.isPublic) {
    return null;
  }

  return collection;
}

export async function getCollectionsByUserId(userId: string) {
  return db
    .select()
    .from(collections)
    .where(eq(collections.userId, userId))
    .orderBy(desc(collections.createdAt));
}

export async function getCollectionResources(
  collectionId: string,
) {
  return db
    .select({
      resource: resources,
      position: collectionResources.position,
    })
    .from(collectionResources)
    .innerJoin(
      resources,
      eq(collectionResources.resourceId, resources.id),
    )
    .where(eq(collectionResources.collectionId, collectionId))
    .orderBy(asc(collectionResources.position));
}