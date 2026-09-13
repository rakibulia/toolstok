import { db } from "@/db";
import { resources } from "@/db/schema";
import { createLogoStorage } from "@/lib/storage/logo-storage";
import { resolveLogo } from "@/lib/verification/logo-resolver";
import { eq } from "drizzle-orm";

const LOGO_CACHE_CONTROL = "31536000";

function getLogoExtension(
  contentType: string,
): string {
  switch (contentType) {
    case "image/png":
      return "png";
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    case "image/x-icon":
    case "image/vnd.microsoft.icon":
      return "ico";
    default:
      throw new Error(
        `Unsupported logo content type: ${contentType}`,
      );
  }
}

export async function refreshResourceLogo(
  resourceId: string,
): Promise<{
  resourceId: string;
  domain: string | null;
  logoUrl: string | null;
  logoStoragePath: string | null;
  logoSource:
    | "official"
    | "favicon"
    | "google"
    | "hunter"
    | "duckduckgo"
    | "iconhorse"
    | "generated"
    | "unknown";
}> {
  const resourceResult = await db
    .select({
      id: resources.id,
      websiteUrl: resources.websiteUrl,
      logoStoragePath: resources.logoStoragePath,
    })
    .from(resources)
    .where(eq(resources.id, resourceId))
    .limit(1);

  const resource = resourceResult[0];

  if (!resource) {
    throw new Error(
      `Resource not found: ${resourceId}`,
    );
  }

  if (!resource.websiteUrl) {
    const storage = createLogoStorage();

    if (resource.logoStoragePath) {
      await storage.remove(resource.logoStoragePath);
    }

    await db
      .update(resources)
      .set({
        domain: null,
        logoUrl: null,
        logoStoragePath: null,
        logoSource: "generated",
        logoUpdatedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(resources.id, resourceId));

    return {
      resourceId,
      domain: null,
      logoUrl: null,
      logoStoragePath: null,
      logoSource: "generated",
    };
  }

  const resolution = await resolveLogo(
    resource.websiteUrl,
  );

  if (
    !resolution ||
    !resolution.body ||
    !resolution.contentType
  ) {
    const storage = createLogoStorage();

    if (resource.logoStoragePath) {
      await storage.remove(resource.logoStoragePath);
    }

    await db
      .update(resources)
      .set({
        domain: resolution?.domain ?? null,
        logoUrl: null,
        logoStoragePath: null,
        logoSource: resolution?.source ?? "generated",
        logoUpdatedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(resources.id, resourceId));

    return {
      resourceId,
      domain: resolution?.domain ?? null,
      logoUrl: null,
      logoStoragePath: null,
      logoSource: resolution?.source ?? "generated",
    };
  }

  const extension = getLogoExtension(
    resolution.contentType,
  );

  const storagePath =
    `resources/${resourceId}/logo.${extension}`;

  const storage = createLogoStorage();

  const uploadResult = await storage.upload({
    path: storagePath,
    body: resolution.body,
    contentType: resolution.contentType,
    cacheControl: LOGO_CACHE_CONTROL,
  });

  if (
    resource.logoStoragePath &&
    resource.logoStoragePath !== storagePath
  ) {
    await storage.remove(resource.logoStoragePath);
  }

  await db
    .update(resources)
    .set({
      domain: resolution.domain,
      logoUrl: uploadResult.publicUrl,
      logoStoragePath: uploadResult.path,
      logoSource: resolution.source,
      logoUpdatedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(resources.id, resourceId));

  return {
    resourceId,
    domain: resolution.domain,
    logoUrl: uploadResult.publicUrl,
    logoStoragePath: uploadResult.path,
    logoSource: resolution.source,
  };
}