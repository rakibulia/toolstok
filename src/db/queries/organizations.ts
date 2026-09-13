import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { organizations } from "@/db/schema";

export async function getOrganizations() {
  return db
    .select()
    .from(organizations)
    .orderBy(asc(organizations.name));
}

export async function getVerifiedOrganizations() {
  return db
    .select()
    .from(organizations)
    .where(eq(organizations.isVerified, true))
    .orderBy(asc(organizations.name));
}

export async function getOrganizationBySlug(slug: string) {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function getOrganizationById(id: string) {
  const result = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, id))
    .limit(1);

  return result[0] ?? null;
}