import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "user",
  "moderator",
  "admin",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    authProviderId: text("auth_provider_id").notNull(),

    email: text("email").notNull(),
    username: text("username"),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),

    role: userRoleEnum("role").notNull().default("user"),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    lastActiveAt: timestamp("last_active_at", {
      withTimezone: true,
    }),
  },
  (table) => [
    uniqueIndex("users_auth_provider_id_unique").on(
      table.authProviderId,
    ),
    uniqueIndex("users_email_unique").on(table.email),
    uniqueIndex("users_username_unique").on(table.username),
    index("users_role_idx").on(table.role),
    index("users_active_idx").on(table.isActive),
    index("users_last_active_idx").on(table.lastActiveAt),
  ],
);