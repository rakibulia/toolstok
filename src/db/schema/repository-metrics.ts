import {
  bigint,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { repositories } from "./repositories";

export const repositoryMetrics = pgTable(
  "repository_metrics",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull()
      .references(() => repositories.id, {
        onDelete: "cascade",
      }),

    stars: bigint("stars", {
      mode: "number",
    })
      .notNull()
      .default(0),

    forks: bigint("forks", {
      mode: "number",
    })
      .notNull()
      .default(0),

    openIssues: integer("open_issues").notNull().default(0),

    watchers: bigint("watchers", {
      mode: "number",
    })
      .notNull()
      .default(0),

    contributors: integer("contributors").notNull().default(0),

    commitsLast30Days: integer("commits_last_30_days")
      .notNull()
      .default(0),

    commitsLast90Days: integer("commits_last_90_days")
      .notNull()
      .default(0),

    latestRelease: text("latest_release"),

    latestReleaseAt: timestamp("latest_release_at", {
      withTimezone: true,
    }),

    lastCommitAt: timestamp("last_commit_at", {
      withTimezone: true,
    }),

    healthScore: integer("health_score"),

    metadata: text("metadata"),

    measuredAt: timestamp("measured_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

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
    index("repository_metrics_repository_id_idx").on(
      table.repositoryId,
    ),
    index("repository_metrics_stars_idx").on(table.stars),
    index("repository_metrics_forks_idx").on(table.forks),
    index("repository_metrics_health_score_idx").on(
      table.healthScore,
    ),
    index("repository_metrics_last_commit_idx").on(
      table.lastCommitAt,
    ),
    index("repository_metrics_measured_at_idx").on(
      table.measuredAt,
    ),
  ],
);