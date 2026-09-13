import { getCurrentUser, type CurrentUser } from "./session";

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user || !user.isActive) {
    throw new Error("Authentication required.");
  }

  return user;
}