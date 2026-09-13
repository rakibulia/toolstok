import dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

dotenv.config({
  path: ".env.local",
});

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const client = postgres(connectionString, {
    prepare: false,
  });

  const db = drizzle(client);

  try {
    console.log("Connecting to Supabase...");
    
    await migrate(db, {
      migrationsFolder: "./src/db/migrations",
    });

    console.log("Migrations applied successfully.");
  } catch (error) {
    console.error("Migration failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Migration runner failed:");
  console.error(error);
  process.exitCode = 1;
});