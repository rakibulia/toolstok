import dotenv from "dotenv";

import { seedCategories } from "./seed/categories";
import { seedTags } from "./seed/tags";
import { seedResources } from "./seed/resources";
import {
  resourceCategoryAssignments,
  resourceTagAssignments,
} from "./seed/relationships";

dotenv.config({
  path: ".env.local",
});

async function seed() {
  const { db } = await import("@/db");
  const {
    categories,
    resources,
    resourceCategories,
    resourceTags,
    tags,
  } = await import("@/db/schema");
  const { refreshResourceLogo } =
    await import("@/services/logo-service");

  console.log("Starting ToolsTok seed...");

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------

  const categoryRows: (typeof categories.$inferSelect)[] = [];

  for (const category of seedCategories) {
    const result = await db
      .insert(categories)
      .values(category)
      .onConflictDoUpdate({
        target: categories.slug,
        set: {
          name: category.name,
          description: category.description,
          parentId: category.parentId,
          sortOrder: category.sortOrder,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (result[0]) {
      categoryRows.push(result[0]);
    }
  }

  // ---------------------------------------------------------------------------
  // Tags
  // ---------------------------------------------------------------------------

  const tagRows: (typeof tags.$inferSelect)[] = [];

  for (const tagName of seedTags) {
    const result = await db
      .insert(tags)
      .values({
        name: tagName,
        slug: tagName,
      })
      .onConflictDoUpdate({
        target: tags.slug,
        set: {
          name: tagName,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (result[0]) {
      tagRows.push(result[0]);
    }
  }

  // ---------------------------------------------------------------------------
  // Resources
  // ---------------------------------------------------------------------------

  const insertedResources: (typeof resources.$inferSelect)[] = [];

  for (const resource of seedResources) {
    const result = await db
      .insert(resources)
      .values({
        ...resource,
        status: "published" as const,
      })
      .onConflictDoUpdate({
        target: resources.slug,
        set: {
          type: resource.type,
          name: resource.name,
          tagline: resource.tagline,
          description: resource.description,
          websiteUrl: resource.websiteUrl,
          repositoryUrl: "repositoryUrl" in resource
            ? resource.repositoryUrl
            : undefined,
          pricingModel: resource.pricingModel,
          sourceModel: resource.sourceModel,
          isVerified: resource.isVerified,
          status: "published" as const,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (!result[0]) {
      continue;
    }

    const savedResource = result[0];

    insertedResources.push(savedResource);

    if (
      savedResource.websiteUrl &&
      !savedResource.logoStoragePath
    ) {
      console.log(
        `Resolving logo: ${savedResource.name}...`,
      );

      try {
        const logoResult =
          await refreshResourceLogo(savedResource.id);

        if (logoResult.logoStoragePath) {
          console.log(
            `Logo stored: ${savedResource.name} -> ${logoResult.logoStoragePath}`,
          );
        } else {
          console.log(
            `Logo unavailable: ${savedResource.name}`,
          );
        }
      } catch (error) {
        console.error(
          `Logo refresh failed for ${savedResource.name}:`,
          error,
        );
      }
    } else if (savedResource.logoStoragePath) {
      console.log(
        `Logo preserved: ${savedResource.name} -> ${savedResource.logoStoragePath}`,
      );
    }
  }

  console.log(
    `Processed categories: ${categoryRows.length}`,
  );

  console.log(
    `Processed tags: ${tagRows.length}`,
  );

  console.log(
    `Processed resources: ${insertedResources.length}`,
  );

  // ---------------------------------------------------------------------------
  // Maps
  // ---------------------------------------------------------------------------

  const categoryMap = new Map(
    categoryRows.map((category) => [
      category.slug,
      category,
    ]),
  );

  const tagMap = new Map(
    tagRows.map((tag) => [
      tag.slug,
      tag,
    ]),
  );

  const resourceMap = new Map(
    insertedResources.map((resource) => [
      resource.slug,
      resource,
    ]),
  );

  // ---------------------------------------------------------------------------
  // Resource -> Category relationships
  // ---------------------------------------------------------------------------

  const categoryAssignments =
    resourceCategoryAssignments
      .map(([resourceSlug, categorySlug]) => {
        const resource =
          resourceMap.get(resourceSlug);

        const category =
          categoryMap.get(categorySlug);

        if (!resource || !category) {
          return null;
        }

        return {
          resourceId: resource.id,
          categoryId: category.id,
        };
      })
      .filter(
        (
          value,
        ): value is {
          resourceId: string;
          categoryId: string;
        } => value !== null,
      );

  if (categoryAssignments.length > 0) {
    await db
      .insert(resourceCategories)
      .values(categoryAssignments)
      .onConflictDoNothing();
  }

  // ---------------------------------------------------------------------------
  // Resource -> Tag relationships
  // ---------------------------------------------------------------------------

  const tagAssignments =
    resourceTagAssignments.flatMap(
      ([resourceSlug, resourceTags]) => {
        const resource =
          resourceMap.get(resourceSlug);

        if (!resource) {
          return [];
        }

        return resourceTags
          .map((tagSlug) => {
            const tag =
              tagMap.get(tagSlug);

            if (!tag) {
              return null;
            }

            return {
              resourceId: resource.id,
              tagId: tag.id,
            };
          })
          .filter(
            (
              value,
            ): value is {
              resourceId: string;
              tagId: string;
            } => value !== null,
          );
      },
    );

  if (tagAssignments.length > 0) {
    await db
      .insert(resourceTags)
      .values(tagAssignments)
      .onConflictDoNothing();
  }

  console.log("Resource relationships created.");
  console.log("ToolsTok seed completed successfully.");
}

seed().catch((error) => {
  console.error("ToolsTok seed failed.");
  console.error(error);
  process.exitCode = 1;
});

