import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { organizations } from "./organizations";

export const resourceTypeEnum = pgEnum("resource_type", [
  "tool",
  "model",
  "agent",
  "mcp_server",
  "skill",
  "workflow",
  "automation",
  "dataset",
  "sdk",
  "api",
  "framework",
  "infrastructure",
  "hardware",
  "robotics",
  "other",
]);

export const resourceStatusEnum = pgEnum("resource_status", [
  "draft",
  "pending_review",
  "published",
  "archived",
  "rejected",
]);

export const pricingModelEnum = pgEnum("pricing_model", [
  "free",
  "freemium",
  "paid",
  "open_source",
  "contact",
  "unknown",
]);

export const sourceModelEnum = pgEnum("source_model", [
  "open_source",
  "source_available",
  "open_weight",
  "proprietary",
  "unknown",
]);

export const resources = pgTable(
  "resources",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    type: resourceTypeEnum("type").notNull(),

    organizationId: uuid("organization_id").references(
      () => organizations.id,
      {
        onDelete: "set null",
      },
    ),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    tagline: text("tagline"),
    description: text("description"),

    websiteUrl: text("website_url"),
    documentationUrl: text("documentation_url"),
    repositoryUrl: text("repository_url"),

    logoUrl: text("logo_url"),

    pricingModel: pricingModelEnum("pricing_model")
      .notNull()
      .default("unknown"),

    sourceModel: sourceModelEnum("source_model")
      .notNull()
      .default("unknown"),

    license: text("license"),

    status: resourceStatusEnum("status")
      .notNull()
      .default("draft"),

    isVerified: boolean("is_verified")
      .notNull()
      .default(false),

    verifiedAt: timestamp("verified_at", {
      withTimezone: true,
    }),

    metadata: jsonb("metadata"),

    viewCount: integer("view_count")
      .notNull()
      .default(0),

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
    uniqueIndex("resources_slug_unique").on(table.slug),
    index("resources_type_idx").on(table.type),
    index("resources_status_idx").on(table.status),
    index("resources_pricing_model_idx").on(table.pricingModel),
    index("resources_source_model_idx").on(table.sourceModel),
    index("resources_verified_idx").on(table.isVerified),
    index("resources_created_at_idx").on(table.createdAt),
    index("resources_organization_id_idx").on(table.organizationId),
  ],
);