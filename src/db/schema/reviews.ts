import { sql } from "drizzle-orm";

import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { users } from "./users";

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "published",
  "rejected",
  "hidden",
]);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    rating: integer("rating").notNull(),

    title: text("title"),
    body: text("body").notNull(),

    status: reviewStatusEnum("status")
      .notNull()
      .default("pending"),

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
  },
  (table) => [
    uniqueIndex("reviews_resource_user_unique").on(
      table.resourceId,
      table.userId,
    ),
    index("reviews_resource_id_idx").on(table.resourceId),
    index("reviews_user_id_idx").on(table.userId),
    index("reviews_status_idx").on(table.status),
    index("reviews_moderator_id_idx").on(table.moderatorId),
    index("reviews_created_at_idx").on(table.createdAt),
    check(
      "reviews_rating_range_check",
      sql`${table.rating} between 1 and 5`,
    ),
  ],
);