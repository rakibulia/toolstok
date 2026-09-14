import {
  and,
  count,
  desc,
  eq,
} from "drizzle-orm";

import { db } from "@/db";
import {
  categories,
  resourceCategories,
  resources,
} from "@/db/schema";

export type CategoryResourceSort =
  | "newest"
  | "popular"
  | "updated";

export async function getActiveCategories() {
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(
      categories.sortOrder,
      categories.name,
    );
}

function getCategoryResourceSort(
  sort: CategoryResourceSort = "newest",
) {
  switch (sort) {
    case "popular":
      return [
        desc(resources.viewCount),
        desc(resources.id),
      ];

    case "updated":
      return [
        desc(resources.updatedAt),
        desc(resources.id),
      ];

    case "newest":
    default:
      return [
        desc(resources.createdAt),
        desc(resources.id),
      ];
  }
}

export async function getPublishedResourcesByCategory(
  categoryId: string,
  limit: number,
  offset: number,
  sort: CategoryResourceSort = "newest",
) {
  const conditions = and(
    eq(resourceCategories.categoryId, categoryId),
    eq(resources.status, "published"),
  );

  const [data, totalResult] = await Promise.all([
    db
      .select({
        id: resources.id,
        type: resources.type,
        name: resources.name,
        slug: resources.slug,
        tagline: resources.tagline,
        description: resources.description,
        websiteUrl: resources.websiteUrl,
        logoUrl: resources.logoUrl,
        logoStoragePath: resources.logoStoragePath,
        pricingModel: resources.pricingModel,
        sourceModel: resources.sourceModel,
        isVerified: resources.isVerified,
        viewCount: resources.viewCount,
        createdAt: resources.createdAt,
        updatedAt: resources.updatedAt,
      })
      .from(resources)
      .innerJoin(
        resourceCategories,
        eq(
          resourceCategories.resourceId,
          resources.id,
        ),
      )
      .where(conditions)
      .orderBy(...getCategoryResourceSort(sort))
      .limit(limit)
      .offset(offset),

    db
      .select({
        count: count(),
      })
      .from(resources)
      .innerJoin(
        resourceCategories,
        eq(
          resourceCategories.resourceId,
          resources.id,
        ),
      )
      .where(conditions),
  ]);

  return {
    data,
    total: totalResult[0]?.count ?? 0,
  };
}

export async function getActiveCategoryBySlug(
  slug: string,
) {
  const result = await db
    .select()
    .from(categories)
    .where(
      and(
        eq(categories.slug, slug),
        eq(categories.isActive, true),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}
