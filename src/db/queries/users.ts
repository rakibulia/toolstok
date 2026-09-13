import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUserByAuthProviderId(
  authProviderId: string,
) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.authProviderId, authProviderId))
    .limit(1);

  return result[0] ?? null;
}

export async function getUserById(userId: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result[0] ?? null;
}