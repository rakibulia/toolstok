import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";
import { resources } from "./resources";

export const repositories = pgTable(
  "repositories",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id").references(() => resources.id, {
      onDelete: "cascade",
    }),

    organizationId: uuid("organization_id").references(
      () => organizations.id,
      {
        onDelete: "set null",
      },
    ),

    platform: text("platform").notNull(),
    owner: text("owner"),
    name: text("name").notNull(),

    url: text("url").notNull(),

    defaultBranch: text("default_branch"),

    description: text("description"),

    license: text("license"),

    stars: integer("stars"),
    forks: integer("forks"),
    openIssues: integer("open_issues"),

    language: text("language"),

    isArchived: boolean("is_archived").notNull().default(false),

    lastSyncedAt: timestamp("last_synced_at", {
      withTimezone: true,
    }),

    metadata: jsonb("metadata"),

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
    uniqueIndex("repositories_url_unique").on(table.url),
    index("repositories_resource_id_idx").on(table.resourceId),
    index("repositories_organization_id_idx").on(table.organizationId),
    index("repositories_platform_idx").on(table.platform),
    index("repositories_stars_idx").on(table.stars),
    index("repositories_last_synced_idx").on(table.lastSyncedAt),
  ],
);