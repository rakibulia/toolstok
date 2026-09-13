import { asc, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { categories, tags } from "@/db/schema";

export async function getActiveCategories() {
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}

export async function getRootCategories() {
  return db
    .select()
    .from(categories)
    .where(isNull(categories.parentId))
    .orderBy(asc(categories.sortOrder), asc(categories.name));
}

export async function getActiveTags() {
  return db
    .select()
    .from(tags)
    .orderBy(asc(tags.name));
}

export async function getCategoryBySlug(slug: string) {
  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  const category = result[0];

  if (!category || !category.isActive) {
    return null;
  }

  return category;
}

export async function getTagBySlug(slug: string) {
  const result = await db
    .select()
    .from(tags)
    .where(eq(tags.slug, slug))
    .limit(1);

  return result[0] ?? null;
}