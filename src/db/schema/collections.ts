import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { users } from "./users";

export const collections = pgTable(
  "collections",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),

    isPublic: boolean("is_public").notNull().default(true),
    isFeatured: boolean("is_featured").notNull().default(false),

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
    uniqueIndex("collections_slug_unique").on(table.slug),
    index("collections_user_id_idx").on(table.userId),
    index("collections_public_idx").on(table.isPublic),
    index("collections_featured_idx").on(table.isFeatured),
    index("collections_created_at_idx").on(table.createdAt),
  ],
);

export const collectionResources = pgTable(
  "collection_resources",
  {
    collectionId: uuid("collection_id")
      .notNull()
      .references(() => collections.id, {
        onDelete: "cascade",
      }),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    position: integer("position").notNull().default(0),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("collection_resources_unique").on(
      table.collectionId,
      table.resourceId,
    ),
    index("collection_resources_collection_idx").on(
      table.collectionId,
    ),
    index("collection_resources_resource_idx").on(
      table.resourceId,
    ),
    index("collection_resources_position_idx").on(
      table.collectionId,
      table.position,
    ),
  ],
);