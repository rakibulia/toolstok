import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const { db } = await import("@/db");
  const { resources } = await import("@/db/schema");
  const { refreshResourceLogo } =
    await import("@/services/logo-service");

  const resourceList = await db
    .select({
      id: resources.id,
      name: resources.name,
      websiteUrl: resources.websiteUrl,
      logoUrl: resources.logoUrl,
      logoStoragePath: resources.logoStoragePath,
    })
    .from(resources);

  console.log(
    `Found ${resourceList.length} resources to inspect.`,
  );

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const resource of resourceList) {
    if (!resource.websiteUrl) {
      skipped += 1;
      console.log(
        `SKIP  ${resource.name} — no website URL`,
      );
      continue;
    }

    if (resource.logoStoragePath) {
      skipped += 1;
      console.log(
        `SKIP  ${resource.name} — logo already stored`,
      );
      continue;
    }

    console.log(`MIGRATE ${resource.name}...`);

    try {
      const result = await refreshResourceLogo(
        resource.id,
      );

      if (result.logoStoragePath) {
        migrated += 1;

        console.log(
          `OK    ${resource.name} → ${result.logoStoragePath}`,
        );
      } else {
        skipped += 1;

        console.log(
          `SKIP  ${resource.name} — no logo could be resolved`,
        );
      }
    } catch (error) {
      failed += 1;

      console.error(
        `FAIL  ${resource.name}`,
        error,
      );
    }
  }

  console.log("");
  console.log("Logo migration completed.");
  console.log(`Migrated: ${migrated}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});