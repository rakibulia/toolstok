import {
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";
import { users } from "./users";

export const verificationTypeEnum = pgEnum("verification_type", [
  "source",
  "license",
  "repository",
  "website",
  "identity",
  "general",
]);

export const verificationResultEnum = pgEnum("verification_result", [
  "verified",
  "partially_verified",
  "unverified",
  "failed",
]);

export const verificationMethodEnum = pgEnum("verification_method", [
  "manual",
  "github",
  "automated",
  "community",
]);

export const verifications = pgTable(
  "verifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    resourceId: uuid("resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    verifierId: uuid("verifier_id").references(() => users.id, {
      onDelete: "set null",
    }),

    type: verificationTypeEnum("type").notNull(),

    result: verificationResultEnum("result").notNull(),

    method: verificationMethodEnum("method").notNull(),

    sourceUrl: text("source_url"),

    evidence: jsonb("evidence"),

    notes: text("notes"),

    verifiedAt: timestamp("verified_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    expiresAt: timestamp("expires_at", {
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
    index("verifications_resource_id_idx").on(table.resourceId),
    index("verifications_verifier_id_idx").on(table.verifierId),
    index("verifications_type_idx").on(table.type),
    index("verifications_result_idx").on(table.result),
    index("verifications_verified_at_idx").on(table.verifiedAt),
    index("verifications_expires_at_idx").on(table.expiresAt),
  ],
);