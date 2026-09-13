import type { userRoleEnum } from "@/db/schema";

export type UserRole = (typeof userRoleEnum.enumValues)[number];

export function hasRole(
  currentRole: UserRole,
  requiredRole: UserRole,
) {
  const roleHierarchy: Record<UserRole, number> = {
    user: 1,
    moderator: 2,
    admin: 3,
  };

  return (
    roleHierarchy[currentRole] >=
    roleHierarchy[requiredRole]
  );
}

export function requireRole(
  currentRole: UserRole,
  requiredRole: UserRole,
) {
  if (!hasRole(currentRole, requiredRole)) {
    throw new Error("Insufficient permissions.");
  }
}