import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const { createLogoStorage } =
    await import("@/lib/storage/logo-storage");

  const storage = createLogoStorage();

  const currentPath =
    "resources/c063e3c0-945a-409b-9a71-fddd9712d4bc/logo.png";

  const oldPath = "resources/chatgpt/logo.png";

  const supabase = await import("@/lib/supabase/admin");
  const client = supabase.createSupabaseAdminClient();

  const { data: currentFiles, error: currentError } =
    await client.storage
      .from("tool-logos")
      .list(
        "resources/c063e3c0-945a-409b-9a71-fddd9712d4bc",
        {
          limit: 100,
        },
      );

  if (currentError) {
    throw new Error(
      `Failed to inspect current logo: ${currentError.message}`,
    );
  }

  const currentLogoExists = currentFiles?.some(
    (file) => file.name === "logo.png",
  );

  const oldFolderPath = "resources/chatgpt";

  const { data: oldFiles, error: oldError } =
    await client.storage
      .from("tool-logos")
      .list(oldFolderPath, {
        limit: 100,
      });

  if (oldError) {
    throw new Error(
      `Failed to inspect old logo: ${oldError.message}`,
    );
  }

  const oldLogoExists = oldFiles?.some(
    (file) => file.name === "logo.png",
  );

  console.log(
    `Current logo exists: ${currentLogoExists ? "YES" : "NO"}`,
  );
  console.log(
    `Current path: ${currentPath}`,
  );

  console.log(
    `Old logo exists: ${oldLogoExists ? "YES" : "NO"}`,
  );
  console.log(`Old path: ${oldPath}`);

  console.log(
    `Current public URL: ${storage.getPublicUrl(currentPath)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});