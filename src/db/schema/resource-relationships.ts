import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { resources } from "./resources";

export const resourceRelationshipTypeEnum = pgEnum(
  "resource_relationship_type",
  [
    "alternative",
    "similar",
    "replacement",
    "integration",
    "depends_on",
    "built_with",
    "fork_of",
    "successor",
    "related",
  ],
);

export const resourceRelationships = pgTable(
  "resource_relationships",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceResourceId: uuid("source_resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    targetResourceId: uuid("target_resource_id")
      .notNull()
      .references(() => resources.id, {
        onDelete: "cascade",
      }),

    relationshipType: resourceRelationshipTypeEnum(
      "relationship_type",
    ).notNull(),

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
    uniqueIndex("resource_relationships_unique").on(
      table.sourceResourceId,
      table.targetResourceId,
      table.relationshipType,
    ),
    index("resource_relationships_source_idx").on(
      table.sourceResourceId,
    ),
    index("resource_relationships_target_idx").on(
      table.targetResourceId,
    ),
    index("resource_relationships_type_idx").on(
      table.relationshipType,
    ),
  ],
);