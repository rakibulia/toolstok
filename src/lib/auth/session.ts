import { getUserByAuthProviderId } from "@/db/queries/users";
import { users } from "@/db/schema";
import { provisionUser } from "@/services/users";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CurrentUser = typeof users.$inferSelect;

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return null;
  }

  const existingUser = await getUserByAuthProviderId(user.id);

  if (existingUser) {
    return existingUser;
  }

  return provisionUser({
    authProviderId: user.id,
    email: user.email,
    username:
      typeof user.user_metadata?.username === "string"
        ? user.user_metadata.username
        : undefined,
    displayName:
      typeof user.user_metadata?.full_name === "string"
        ? user.user_metadata.full_name
        : undefined,
    avatarUrl:
      typeof user.user_metadata?.avatar_url === "string"
        ? user.user_metadata.avatar_url
        : undefined,
  });
}