import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const { createLogoStorage } =
    await import("@/lib/storage/logo-storage");

  const storage = createLogoStorage();

  const testPath = "system/test-logo.png";

  // Minimal valid 1x1 transparent PNG.
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    "base64",
  );

  const result = await storage.upload({
    path: testPath,
    body: png,
    contentType: "image/png",
    cacheControl: "60",
  });

  console.log("Upload successful.");
  console.log(`Path: ${result.path}`);
  console.log(`Public URL: ${result.publicUrl}`);

  await storage.remove(testPath);

  console.log("Delete successful.");
  console.log("Storage write/delete test completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});