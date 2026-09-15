import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { resources } from "./resources";

export const resourceSearch = pgTable(
  "resource_search",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    searchText: text("search_text").notNull(),

    keywords: text("keywords"),

    metadata: jsonb("metadata"),

    indexedAt: timestamp("indexed_at", {
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
    uniqueIndex("resource_search_resource_unique").on(
      table.resourceId,
    ),

    index("resource_search_resource_idx").on(table.resourceId),

    index("resource_search_indexed_at_idx").on(table.indexedAt),

    index("resource_search_search_text_fts_idx").using(
      "gin",
      sql`to_tsvector('english', ${table.searchText})`,
    ),
  ],
);