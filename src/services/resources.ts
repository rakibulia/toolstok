import { eq } from "drizzle-orm";

import { db } from "@/db";
import { resources } from "@/db/schema";
import { indexResourceSearch } from "@/services/resource-search";
import {
  createResourceSchema,
  type CreateResourceInput,
} from "@/validation/resource";

export async function createResource(
  input: CreateResourceInput,
) {
  const validated = createResourceSchema.parse(input);

  const existing = await db
    .select({
      id: resources.id,
    })
    .from(resources)
    .where(eq(resources.slug, validated.slug))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("A resource with this slug already exists.");
  }

  const [resource] = await db
    .insert(resources)
    .values({
      type: validated.type,
      organizationId: validated.organizationId,
      name: validated.name,
      slug: validated.slug,
      tagline: validated.tagline,
      description: validated.description,
      websiteUrl: validated.websiteUrl,
      documentationUrl: validated.documentationUrl,
      repositoryUrl: validated.repositoryUrl,
      logoUrl: validated.logoUrl,
      pricingModel: validated.pricingModel,
      sourceModel: validated.sourceModel,
      license: validated.license,
      status: "draft",
    })
    .returning();

  if (!resource) {
    throw new Error("Failed to create resource.");
  }

  await indexResourceSearch(resource);

  return resource;
}