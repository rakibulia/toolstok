import "dotenv/config";

import { db } from "../src/db";
import { resources } from "../src/db/schema";
import { indexResourceSearch } from "../src/services/resource-search";

async function main() {
  const allResources = await db
    .select()
    .from(resources);

  console.log(`Found ${allResources.length} resources.`);

  let indexed = 0;

  for (const resource of allResources) {
    await indexResourceSearch(resource);
    indexed += 1;

    console.log(
      `Indexed ${indexed}/${allResources.length}: ${resource.name}`,
    );
  }

  console.log(
    `Search backfill complete. Indexed ${indexed} resources.`,
  );
}

main()
  .catch((error) => {
    console.error("Search backfill failed:", error);
    process.exitCode = 1;
  });