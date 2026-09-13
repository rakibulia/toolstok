import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentAuthUser } from "./current-user";

export async function getCurrentToolsUser() {
  const authUser = await getCurrentAuthUser();

  if (!authUser) {
    return null;
  }

  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.authProviderId, authUser.id))
    .limit(1);

  const existingUser = existingUsers[0];

  if (existingUser) {
    return existingUser;
  }

  const email = authUser.email;

  if (!email) {
    throw new Error(
      "Authenticated user does not have an email address.",
    );
  }

  const insertedUsers = await db
    .insert(users)
    .values({
      authProviderId: authUser.id,
      email,
      displayName:
        authUser.user_metadata?.full_name ??
        authUser.user_metadata?.name ??
        null,
      avatarUrl:
        authUser.user_metadata?.avatar_url ??
        authUser.user_metadata?.picture ??
        null,
    })
    .returning();

  return insertedUsers[0] ?? null;
}