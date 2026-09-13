import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const { db } = await import("@/db");
  const { resources } = await import("@/db/schema");

  const result = await db
    .select({
      id: resources.id,
      name: resources.name,
      slug: resources.slug,
      websiteUrl: resources.websiteUrl,
      logoUrl: resources.logoUrl,
      logoStoragePath: resources.logoStoragePath,
      logoSource: resources.logoSource,
    })
    .from(resources);

  console.table(result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});