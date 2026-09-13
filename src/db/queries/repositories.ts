import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { repositories } from "@/db/schema";

export async function getRepositories() {
  return db
    .select()
    .from(repositories)
    .orderBy(desc(repositories.stars));
}

export async function getRepositoriesByResourceId(
  resourceId: string,
) {
  return db
    .select()
    .from(repositories)
    .where(eq(repositories.resourceId, resourceId))
    .orderBy(desc(repositories.stars));
}

export async function getRepositoriesByOrganizationId(
  organizationId: string,
) {
  return db
    .select()
    .from(repositories)
    .where(eq(repositories.organizationId, organizationId))
    .orderBy(desc(repositories.stars));
}

export async function getRepositoryById(id: string) {
  const result = await db
    .select()
    .from(repositories)
    .where(eq(repositories.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function getRepositoryByUrl(url: string) {
  const result = await db
    .select()
    .from(repositories)
    .where(eq(repositories.url, url))
    .limit(1);

  return result[0] ?? null;
}