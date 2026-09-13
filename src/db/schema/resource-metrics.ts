import {
  bigint,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";

export const resourceMetrics = pgTable(
  "resource_metrics",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    views: bigint("views", {
      mode: "number",
    })
      .notNull()
      .default(0),

    clicks: bigint("clicks", {
      mode: "number",
    })
      .notNull()
      .default(0),

    saves: bigint("saves", {
      mode: "number",
    })
      .notNull()
      .default(0),

    reviews: bigint("reviews", {
      mode: "number",
    })
      .notNull()
      .default(0),

    averageRating: bigint("average_rating", {
      mode: "number",
    })
      .notNull()
      .default(0),

    lastViewedAt: timestamp("last_viewed_at", {
      withTimezone: true,
    }),

    lastClickedAt: timestamp("last_clicked_at", {
      withTimezone: true,
    }),

    lastActivityAt: timestamp("last_activity_at", {
      withTimezone: true,
    }),

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
    uniqueIndex("resource_metrics_resource_unique").on(
      table.resourceId,
    ),
    index("resource_metrics_views_idx").on(table.views),
    index("resource_metrics_clicks_idx").on(table.clicks),
    index("resource_metrics_saves_idx").on(table.saves),
    index("resource_metrics_last_activity_idx").on(
      table.lastActivityAt,
    ),
  ],
);