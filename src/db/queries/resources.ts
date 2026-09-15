import {
  and,
  count,
  desc,
  eq,
  sql,
} from "drizzle-orm";

import { db } from "@/db";
import {
  resourceSearch,
  resources,
} from "@/db/schema";

export type ResourceListFilters = {
  search?: string;
  type?: (typeof resources.$inferSelect)["type"];
  pricingModel?: (typeof resources.$inferSelect)["pricingModel"];
  sourceModel?: (typeof resources.$inferSelect)["sourceModel"];
  verified?: boolean;
};

export type ResourceSort = "newest" | "popular" | "updated";

function normalizeSearchQuery(search: string): string {
  return search
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s_-]/gu, " ")
    .trim();
}

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

  return and(...conditions);
}

function getResourceSort(sort: ResourceSort = "newest") {
  switch (sort) {
    case "popular":
      return desc(resources.viewCount);

    case "updated":
      return desc(resources.updatedAt);

    case "newest":
    default:
      return desc(resources.createdAt);
  }
}

function getSearchQuery(search: string) {
  return sql`plainto_tsquery('english', ${search})`;
}

export async function getPublishedResources(
  filters: ResourceListFilters = {},
  sort: ResourceSort = "newest",
) {
  const search = filters.search
    ? normalizeSearchQuery(filters.search)
    : "";

  if (!search) {
    return db
      .select()
      .from(resources)
      .where(buildPublishedResourceConditions(filters))
      .orderBy(getResourceSort(sort));
  }

  const conditions = buildPublishedResourceConditions({
    ...filters,
    search: undefined,
  });

  return db
    .select({
      resource: resources,
    })
    .from(resources)
    .innerJoin(
      resourceSearch,
      eq(resourceSearch.resourceId, resources.id),
    )
    .where(
      and(
        conditions,
        sql`to_tsvector('english', ${resourceSearch.searchText}) @@ ${getSearchQuery(search)}`,
      ),
    )
    .orderBy(getResourceSort(sort))
    .then((rows) => rows.map((row) => row.resource));
}

export async function getPublishedResourcesPaginated(
  limit: number,
  offset: number,
  filters: ResourceListFilters = {},
  sort: ResourceSort = "newest",
) {
  const search = filters.search
    ? normalizeSearchQuery(filters.search)
    : "";

  if (!search) {
    const conditions =
      buildPublishedResourceConditions(filters);

    const [data, totalResult] = await Promise.all([
      db
        .select()
        .from(resources)
        .where(conditions)
        .orderBy(getResourceSort(sort))
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

  const conditions = buildPublishedResourceConditions({
    ...filters,
    search: undefined,
  });

  const searchCondition = sql`
    to_tsvector('english', ${resourceSearch.searchText})
    @@ ${getSearchQuery(search)}
  `;

  const [dataRows, totalResult] = await Promise.all([
    db
      .select({
        resource: resources,
      })
      .from(resources)
      .innerJoin(
        resourceSearch,
        eq(resourceSearch.resourceId, resources.id),
      )
      .where(and(conditions, searchCondition))
      .orderBy(getResourceSort(sort))
      .limit(limit)
      .offset(offset),

    db
      .select({
        count: count(),
      })
      .from(resources)
      .innerJoin(
        resourceSearch,
        eq(resourceSearch.resourceId, resources.id),
      )
      .where(and(conditions, searchCondition)),
  ]);

  return {
    data: dataRows.map((row) => row.resource),
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