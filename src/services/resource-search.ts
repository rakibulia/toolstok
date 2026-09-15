import { eq } from "drizzle-orm";

import { db } from "@/db";
import { resourceSearch, resources } from "@/db/schema";

function normalizeSearchPart(value: string | null | undefined): string {
  return value?.trim().replace(/\s+/g, " ") ?? "";
}

export function buildResourceSearchText(
  resource: typeof resources.$inferSelect,
): string {
  return [
    resource.name,
    resource.slug,
    resource.domain,
    resource.tagline,
    resource.description,
    resource.websiteUrl,
    resource.documentationUrl,
    resource.repositoryUrl,
    resource.license,
    resource.type,
    resource.pricingModel,
    resource.sourceModel,
  ]
    .map(normalizeSearchPart)
    .filter(Boolean)
    .join(" ");
}

export async function indexResourceSearch(
  resource: typeof resources.$inferSelect,
) {
  const searchText = buildResourceSearchText(resource);

  const [indexed] = await db
    .insert(resourceSearch)
    .values({
      resourceId: resource.id,
      searchText,
      keywords: null,
      metadata: {
        resourceType: resource.type,
        pricingModel: resource.pricingModel,
        sourceModel: resource.sourceModel,
      },
    })
    .onConflictDoUpdate({
      target: resourceSearch.resourceId,
      set: {
        searchText,
        metadata: {
          resourceType: resource.type,
          pricingModel: resource.pricingModel,
          sourceModel: resource.sourceModel,
        },
        updatedAt: new Date(),
      },
    })
    .returning();

  return indexed;
}

export async function removeResourceSearchIndex(resourceId: string) {
  await db
    .delete(resourceSearch)
    .where(eq(resourceSearch.resourceId, resourceId));
}