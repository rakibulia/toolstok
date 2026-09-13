import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const { refreshResourceLogo } =
    await import("@/services/logo-service");

  const resourceId =
    "c063e3c0-945a-409b-9a71-fddd9712d4bc";

  const result =
    await refreshResourceLogo(resourceId);

  console.log("Logo refresh completed.");
  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});