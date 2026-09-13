import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";

export const externalPlatformEnum = pgEnum("external_platform", [
  "github",
  "gitlab",
  "huggingface",
  "npm",
  "pypi",
  "dockerhub",
  "producthunt",
  "crates",
  "website",
  "other",
]);

export const resourceExternalIdentifiers = pgTable(
  "resource_external_identifiers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    platform: externalPlatformEnum("platform").notNull(),

    identifier: text("identifier").notNull(),

    url: text("url"),

    metadata: jsonb("metadata"),

    lastSyncedAt: timestamp("last_synced_at", {
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
    uniqueIndex("resource_external_identifiers_unique").on(
      table.platform,
      table.identifier,
    ),
    index("resource_external_identifiers_resource_idx").on(
      table.resourceId,
    ),
    index("resource_external_identifiers_platform_idx").on(
      table.platform,
    ),
    index("resource_external_identifiers_sync_idx").on(
      table.lastSyncedAt,
    ),
  ],
);