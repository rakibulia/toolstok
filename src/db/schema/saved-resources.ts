import {
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { users } from "./users";

export const savedResources = pgTable(
  "saved_resources",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("saved_resources_user_resource_unique").on(
      table.userId,
      table.resourceId,
    ),
    index("saved_resources_user_id_idx").on(table.userId),
    index("saved_resources_resource_id_idx").on(table.resourceId),
    index("saved_resources_created_at_idx").on(table.createdAt),
  ],
);