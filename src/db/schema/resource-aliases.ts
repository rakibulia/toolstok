import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";

export const resourceAliases = pgTable(
  "resource_aliases",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    alias: text("alias").notNull(),

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
  },
  (table) => [
    uniqueIndex("resource_aliases_resource_alias_unique").on(
      table.resourceId,
      table.alias,
    ),
    index("resource_aliases_resource_id_idx").on(table.resourceId),
    index("resource_aliases_alias_idx").on(table.alias),
  ],
);