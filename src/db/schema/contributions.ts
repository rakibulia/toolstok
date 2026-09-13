import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { users } from "./users";

export const contributionTypeEnum = pgEnum("contribution_type", [
  "submission",
  "edit_suggestion",
  "report",
]);

export const contributionStatusEnum = pgEnum("contribution_status", [
  "pending",
  "approved",
  "rejected",
  "resolved",
  "dismissed",
]);

export const contributions = pgTable(
  "contributions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    type: contributionTypeEnum("type").notNull(),

    status: contributionStatusEnum("status")
      .notNull()
      .default("pending"),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    resourceId: uuid("resource_id").references(() => resources.id, {
      onDelete: "cascade",
    }),

    title: text("title"),
    description: text("description"),

    payload: jsonb("payload"),

    moderatorId: uuid("moderator_id").references(() => users.id, {
      onDelete: "set null",
    }),

    moderatorNote: text("moderator_note"),

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

    resolvedAt: timestamp("resolved_at", {
      withTimezone: true,
    }),
  },
  (table) => [
    index("contributions_type_idx").on(table.type),
    index("contributions_status_idx").on(table.status),
    index("contributions_user_id_idx").on(table.userId),
    index("contributions_resource_id_idx").on(table.resourceId),
    index("contributions_moderator_id_idx").on(table.moderatorId),
    index("contributions_created_at_idx").on(table.createdAt),
  ],
);