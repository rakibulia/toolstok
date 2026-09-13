import {
  and,
  count,
  desc,
  eq,
  ilike,
  or,
} from "drizzle-orm";

import { db } from "@/db";
import { resources } from "@/db/schema";

export type ResourceListFilters = {
  search?: string;
  type?: (typeof resources.$inferSelect)["type"];
  pricingModel?: (typeof resources.$inferSelect)["pricingModel"];
  sourceModel?: (typeof resources.$inferSelect)["sourceModel"];
  verified?: boolean;
};

function buildPublishedResourceConditions(
  filters: ResourceListFilters = {},
) {
  const conditions = [
    eq(resources.status, "published"),
  ];

  if (filters.type) {
    conditions.push(eq(resources.type, filters.type));
  }

  if (filters.pricingModel) {
    conditions.push(
      eq(resources.pricingModel, filters.pricingModel),
    );
  }

  if (filters.sourceModel) {
    conditions.push(
      eq(resources.sourceModel, filters.sourceModel),
    );
  }

  if (typeof filters.verified === "boolean") {
    conditions.push(
      eq(resources.isVerified, filters.verified),
    );
  }

  if (filters.search?.trim()) {
    const search = `%${filters.search.trim()}%`;

    conditions.push(
      or(
        ilike(resources.name, search),
        ilike(resources.tagline, search),
        ilike(resources.description, search),
      )!,
    );
  }

  return and(...conditions);
}

export async function getPublishedResources(
  filters: ResourceListFilters = {},
) {
  return db
    .select()
    .from(resources)
    .where(buildPublishedResourceConditions(filters))
    .orderBy(desc(resources.createdAt));
}

export async function getPublishedResourcesPaginated(
  limit: number,
  offset: number,
  filters: ResourceListFilters = {},
) {
  const conditions =
    buildPublishedResourceConditions(filters);

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(resources)
      .where(conditions)
      .orderBy(desc(resources.createdAt))
      .limit(limit)
      .offset(offset),

    db
      .select({
        count: count(),
      })
      .from(resources)
      .where(conditions),
  ]);

  return {
    data,
    total: totalResult[0]?.count ?? 0,
  };
}

export async function getPublishedResourceBySlug(
  slug: string,
) {
  const result = await db
    .select()
    .from(resources)
    .where(
      and(
        eq(resources.slug, slug),
        eq(resources.status, "published"),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}