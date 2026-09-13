import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

type ProvisionUserInput = {
  authProviderId: string;
  email: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
};

export async function provisionUser(
  input: ProvisionUserInput,
) {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.authProviderId, input.authProviderId))
    .limit(1);

  if (existing[0]) {
    return existing[0];
  }

  const [user] = await db
    .insert(users)
    .values({
      authProviderId: input.authProviderId,
      email: input.email,
      username: input.username,
      displayName: input.displayName,
      avatarUrl: input.avatarUrl,
    })
    .returning();

  return user;
}