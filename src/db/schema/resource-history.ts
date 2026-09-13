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

export const resourceChangeTypeEnum = pgEnum("resource_change_type", [
  "created",
  "updated",
  "published",
  "archived",
  "restored",
  "verified",
  "unverified",
]);

export const resourceHistory = pgTable(
  "resource_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    changeType: resourceChangeTypeEnum("change_type").notNull(),

    summary: text("summary"),

    changes: jsonb("changes"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("resource_history_resource_id_idx").on(table.resourceId),
    index("resource_history_user_id_idx").on(table.userId),
    index("resource_history_change_type_idx").on(table.changeType),
    index("resource_history_created_at_idx").on(table.createdAt),
  ],
);