import { count, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { resources } from "@/db/schema";

export async function getPublishedResources() {
  return db
    .select()
    .from(resources)
    .where(eq(resources.status, "published"))
    .orderBy(desc(resources.createdAt));
}

export async function getPublishedResourcesPaginated(
  limit: number,
  offset: number,
) {
  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(resources)
      .where(eq(resources.status, "published"))
      .orderBy(desc(resources.createdAt))
      .limit(limit)
      .offset(offset),

    db
      .select({
        count: count(),
      })
      .from(resources)
      .where(eq(resources.status, "published")),
  ]);

  return {
    data,
    total: totalResult[0]?.count ?? 0,
  };
}

export async function getPublishedResourceBySlug(slug: string) {
  const result = await db
    .select()
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  const resource = result[0];

  if (!resource || resource.status !== "published") {
    return null;
  }

  return resource;
}