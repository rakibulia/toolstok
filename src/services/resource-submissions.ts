import { eq } from "drizzle-orm";

import { db } from "@/db";
import { contributions, resources } from "@/db/schema";
import {
  createResourceSchema,
  type CreateResourceInput,
} from "@/validation/resource";

export async function submitResource(
  userId: string,
  input: CreateResourceInput,
) {
  const validated = createResourceSchema.parse(input);

  return db.transaction(async (tx) => {
    const existingResource = await tx
      .select({
        id: resources.id,
      })
      .from(resources)
      .where(eq(resources.slug, validated.slug))
      .limit(1);

    if (existingResource.length > 0) {
      throw new Error(
        "A resource with this slug already exists.",
      );
    }

    const [resource] = await tx
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
        status: "pending_review",
      })
      .returning();

    const [contribution] = await tx
      .insert(contributions)
      .values({
        type: "submission",
        status: "pending",
        userId,
        resourceId: resource.id,
        title: `New resource submission: ${resource.name}`,
        description:
          "Community-submitted resource awaiting moderation.",
        payload: validated,
      })
      .returning();

    return {
      resource,
      contribution,
    };
  });
}