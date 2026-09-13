import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const { db } = await import("@/db");
  const { resources } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db
    .select({
      id: resources.id,
      name: resources.name,
      websiteUrl: resources.websiteUrl,
      domain: resources.domain,
      logoUrl: resources.logoUrl,
      logoStoragePath: resources.logoStoragePath,
      logoSource: resources.logoSource,
      logoUpdatedAt: resources.logoUpdatedAt,
    })
    .from(resources)
    .where(eq(resources.slug, "chatgpt"))
    .limit(1);

  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});