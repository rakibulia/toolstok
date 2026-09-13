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

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),

   parentId: uuid("parent_id"),
    icon: text("icon"),

    sortOrder: integer("sort_order").notNull().default(0),

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
  },
  (table) => [
    uniqueIndex("categories_slug_unique").on(table.slug),
    index("categories_parent_id_idx").on(table.parentId),
    index("categories_active_idx").on(table.isActive),
    index("categories_sort_order_idx").on(table.sortOrder),
  ],
);

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),

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
    uniqueIndex("tags_slug_unique").on(table.slug),
    index("tags_name_idx").on(table.name),
  ],
);

export const resourceCategories = pgTable(
  "resource_categories",
  {
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("resource_categories_unique").on(
      table.resourceId,
      table.categoryId,
    ),
    index("resource_categories_resource_idx").on(table.resourceId),
    index("resource_categories_category_idx").on(table.categoryId),
  ],
);

export const resourceTags = pgTable(
  "resource_tags",
  {
    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("resource_tags_unique").on(
      table.resourceId,
      table.tagId,
    ),
    index("resource_tags_resource_idx").on(table.resourceId),
    index("resource_tags_tag_idx").on(table.tagId),
  ],
);