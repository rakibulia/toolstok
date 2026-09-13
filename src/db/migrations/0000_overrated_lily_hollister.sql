CREATE TYPE "public"."contribution_status" AS ENUM('pending', 'approved', 'rejected', 'resolved', 'dismissed');--> statement-breakpoint
CREATE TYPE "public"."contribution_type" AS ENUM('submission', 'edit_suggestion', 'report');--> statement-breakpoint
CREATE TYPE "public"."pricing_model" AS ENUM('free', 'freemium', 'paid', 'open_source', 'contact', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."resource_status" AS ENUM('draft', 'pending_review', 'published', 'archived', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."resource_type" AS ENUM('tool', 'model', 'agent', 'mcp_server', 'skill', 'workflow', 'automation', 'dataset', 'sdk', 'api', 'framework', 'infrastructure', 'hardware', 'robotics', 'other');--> statement-breakpoint
CREATE TYPE "public"."source_model" AS ENUM('open_source', 'source_available', 'open_weight', 'proprietary', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'moderator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."review_status" AS ENUM('pending', 'published', 'rejected', 'hidden');--> statement-breakpoint
CREATE TYPE "public"."resource_change_type" AS ENUM('created', 'updated', 'published', 'archived', 'restored', 'verified', 'unverified');--> statement-breakpoint
CREATE TYPE "public"."verification_method" AS ENUM('manual', 'github', 'automated', 'community');--> statement-breakpoint
CREATE TYPE "public"."verification_result" AS ENUM('verified', 'partially_verified', 'unverified', 'failed');--> statement-breakpoint
CREATE TYPE "public"."verification_type" AS ENUM('source', 'license', 'repository', 'website', 'identity', 'general');--> statement-breakpoint
CREATE TYPE "public"."resource_relationship_type" AS ENUM('alternative', 'similar', 'replacement', 'integration', 'depends_on', 'built_with', 'fork_of', 'successor', 'related');--> statement-breakpoint
CREATE TYPE "public"."external_platform" AS ENUM('github', 'gitlab', 'huggingface', 'npm', 'pypi', 'dockerhub', 'producthunt', 'crates', 'website', 'other');--> statement-breakpoint
CREATE TABLE "collection_resources" (
	"collection_id" uuid NOT NULL,
	"resource_id" uuid NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contributions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "contribution_type" NOT NULL,
	"status" "contribution_status" DEFAULT 'pending' NOT NULL,
	"user_id" uuid NOT NULL,
	"resource_id" uuid,
	"title" text,
	"description" text,
	"payload" jsonb,
	"moderator_id" uuid,
	"moderator_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "resource_type" NOT NULL,
	"organization_id" uuid,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"tagline" text,
	"description" text,
	"website_url" text,
	"documentation_url" text,
	"repository_url" text,
	"logo_url" text,
	"pricing_model" "pricing_model" DEFAULT 'unknown' NOT NULL,
	"source_model" "source_model" DEFAULT 'unknown' NOT NULL,
	"license" text,
	"status" "resource_status" DEFAULT 'draft' NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp with time zone,
	"metadata" jsonb,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"parent_id" uuid,
	"icon" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_categories" (
	"resource_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_tags" (
	"resource_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"website_url" text,
	"logo_url" text,
	"github_url" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repositories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid,
	"organization_id" uuid,
	"platform" text NOT NULL,
	"owner" text,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"default_branch" text,
	"description" text,
	"license" text,
	"stars" integer,
	"forks" integer,
	"open_issues" integer,
	"language" text,
	"is_archived" boolean DEFAULT false NOT NULL,
	"last_synced_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_provider_id" text NOT NULL,
	"email" text NOT NULL,
	"username" text,
	"display_name" text,
	"avatar_url" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_active_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"title" text,
	"body" text NOT NULL,
	"status" "review_status" DEFAULT 'pending' NOT NULL,
	"moderator_id" uuid,
	"moderator_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_rating_range_check" CHECK ("reviews"."rating" between 1 and 5)
);
--> statement-breakpoint
CREATE TABLE "resource_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"views" bigint DEFAULT 0 NOT NULL,
	"clicks" bigint DEFAULT 0 NOT NULL,
	"saves" bigint DEFAULT 0 NOT NULL,
	"reviews" bigint DEFAULT 0 NOT NULL,
	"average_rating" bigint DEFAULT 0 NOT NULL,
	"last_viewed_at" timestamp with time zone,
	"last_clicked_at" timestamp with time zone,
	"last_activity_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"resource_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"user_id" uuid,
	"change_type" "resource_change_type" NOT NULL,
	"summary" text,
	"changes" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repository_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"stars" bigint DEFAULT 0 NOT NULL,
	"forks" bigint DEFAULT 0 NOT NULL,
	"open_issues" integer DEFAULT 0 NOT NULL,
	"watchers" bigint DEFAULT 0 NOT NULL,
	"contributors" integer DEFAULT 0 NOT NULL,
	"commits_last_30_days" integer DEFAULT 0 NOT NULL,
	"commits_last_90_days" integer DEFAULT 0 NOT NULL,
	"latest_release" text,
	"latest_release_at" timestamp with time zone,
	"last_commit_at" timestamp with time zone,
	"health_score" integer,
	"metadata" text,
	"measured_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"verifier_id" uuid,
	"type" "verification_type" NOT NULL,
	"result" "verification_result" NOT NULL,
	"method" "verification_method" NOT NULL,
	"source_url" text,
	"evidence" jsonb,
	"notes" text,
	"verified_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_search" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"search_text" text NOT NULL,
	"keywords" text,
	"metadata" jsonb,
	"indexed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_aliases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"alias" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_relationships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_resource_id" uuid NOT NULL,
	"target_resource_id" uuid NOT NULL,
	"relationship_type" "resource_relationship_type" NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resource_external_identifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resource_id" uuid NOT NULL,
	"platform" "external_platform" NOT NULL,
	"identifier" text NOT NULL,
	"url" text,
	"metadata" jsonb,
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collection_resources" ADD CONSTRAINT "collection_resources_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_resources" ADD CONSTRAINT "collection_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_moderator_id_users_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resources" ADD CONSTRAINT "resources_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_categories" ADD CONSTRAINT "resource_categories_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_categories" ADD CONSTRAINT "resource_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_tags" ADD CONSTRAINT "resource_tags_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_tags" ADD CONSTRAINT "resource_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_moderator_id_users_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_metrics" ADD CONSTRAINT "resource_metrics_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_resources" ADD CONSTRAINT "saved_resources_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_resources" ADD CONSTRAINT "saved_resources_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_history" ADD CONSTRAINT "resource_history_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_history" ADD CONSTRAINT "resource_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_metrics" ADD CONSTRAINT "repository_metrics_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_verifier_id_users_id_fk" FOREIGN KEY ("verifier_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_search" ADD CONSTRAINT "resource_search_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_aliases" ADD CONSTRAINT "resource_aliases_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_relationships" ADD CONSTRAINT "resource_relationships_source_resource_id_resources_id_fk" FOREIGN KEY ("source_resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_relationships" ADD CONSTRAINT "resource_relationships_target_resource_id_resources_id_fk" FOREIGN KEY ("target_resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resource_external_identifiers" ADD CONSTRAINT "resource_external_identifiers_resource_id_resources_id_fk" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "collection_resources_unique" ON "collection_resources" USING btree ("collection_id","resource_id");--> statement-breakpoint
CREATE INDEX "collection_resources_collection_idx" ON "collection_resources" USING btree ("collection_id");--> statement-breakpoint
CREATE INDEX "collection_resources_resource_idx" ON "collection_resources" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "collection_resources_position_idx" ON "collection_resources" USING btree ("collection_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "collections_slug_unique" ON "collections" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "collections_user_id_idx" ON "collections" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "collections_public_idx" ON "collections" USING btree ("is_public");--> statement-breakpoint
CREATE INDEX "collections_featured_idx" ON "collections" USING btree ("is_featured");--> statement-breakpoint
CREATE INDEX "collections_created_at_idx" ON "collections" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contributions_type_idx" ON "contributions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "contributions_status_idx" ON "contributions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "contributions_user_id_idx" ON "contributions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "contributions_resource_id_idx" ON "contributions" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "contributions_moderator_id_idx" ON "contributions" USING btree ("moderator_id");--> statement-breakpoint
CREATE INDEX "contributions_created_at_idx" ON "contributions" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "resources_slug_unique" ON "resources" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "resources_type_idx" ON "resources" USING btree ("type");--> statement-breakpoint
CREATE INDEX "resources_status_idx" ON "resources" USING btree ("status");--> statement-breakpoint
CREATE INDEX "resources_pricing_model_idx" ON "resources" USING btree ("pricing_model");--> statement-breakpoint
CREATE INDEX "resources_source_model_idx" ON "resources" USING btree ("source_model");--> statement-breakpoint
CREATE INDEX "resources_verified_idx" ON "resources" USING btree ("is_verified");--> statement-breakpoint
CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "resources_organization_id_idx" ON "resources" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_id_idx" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "categories_active_idx" ON "categories" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "categories_sort_order_idx" ON "categories" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_categories_unique" ON "resource_categories" USING btree ("resource_id","category_id");--> statement-breakpoint
CREATE INDEX "resource_categories_resource_idx" ON "resource_categories" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_categories_category_idx" ON "resource_categories" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_tags_unique" ON "resource_tags" USING btree ("resource_id","tag_id");--> statement-breakpoint
CREATE INDEX "resource_tags_resource_idx" ON "resource_tags" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_tags_tag_idx" ON "resource_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_unique" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tags_name_idx" ON "tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "organizations_slug_unique" ON "organizations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "organizations_name_idx" ON "organizations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "organizations_verified_idx" ON "organizations" USING btree ("is_verified");--> statement-breakpoint
CREATE UNIQUE INDEX "repositories_url_unique" ON "repositories" USING btree ("url");--> statement-breakpoint
CREATE INDEX "repositories_resource_id_idx" ON "repositories" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "repositories_organization_id_idx" ON "repositories" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "repositories_platform_idx" ON "repositories" USING btree ("platform");--> statement-breakpoint
CREATE INDEX "repositories_stars_idx" ON "repositories" USING btree ("stars");--> statement-breakpoint
CREATE INDEX "repositories_last_synced_idx" ON "repositories" USING btree ("last_synced_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_auth_provider_id_unique" ON "users" USING btree ("auth_provider_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_unique" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_active_idx" ON "users" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "users_last_active_idx" ON "users" USING btree ("last_active_at");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_resource_user_unique" ON "reviews" USING btree ("resource_id","user_id");--> statement-breakpoint
CREATE INDEX "reviews_resource_id_idx" ON "reviews" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "reviews_user_id_idx" ON "reviews" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "reviews_status_idx" ON "reviews" USING btree ("status");--> statement-breakpoint
CREATE INDEX "reviews_moderator_id_idx" ON "reviews" USING btree ("moderator_id");--> statement-breakpoint
CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_metrics_resource_unique" ON "resource_metrics" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_metrics_views_idx" ON "resource_metrics" USING btree ("views");--> statement-breakpoint
CREATE INDEX "resource_metrics_clicks_idx" ON "resource_metrics" USING btree ("clicks");--> statement-breakpoint
CREATE INDEX "resource_metrics_saves_idx" ON "resource_metrics" USING btree ("saves");--> statement-breakpoint
CREATE INDEX "resource_metrics_last_activity_idx" ON "resource_metrics" USING btree ("last_activity_at");--> statement-breakpoint
CREATE UNIQUE INDEX "saved_resources_user_resource_unique" ON "saved_resources" USING btree ("user_id","resource_id");--> statement-breakpoint
CREATE INDEX "saved_resources_user_id_idx" ON "saved_resources" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_resources_resource_id_idx" ON "saved_resources" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "saved_resources_created_at_idx" ON "saved_resources" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "resource_history_resource_id_idx" ON "resource_history" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_history_user_id_idx" ON "resource_history" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "resource_history_change_type_idx" ON "resource_history" USING btree ("change_type");--> statement-breakpoint
CREATE INDEX "resource_history_created_at_idx" ON "resource_history" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "repository_metrics_repository_id_idx" ON "repository_metrics" USING btree ("repository_id");--> statement-breakpoint
CREATE INDEX "repository_metrics_stars_idx" ON "repository_metrics" USING btree ("stars");--> statement-breakpoint
CREATE INDEX "repository_metrics_forks_idx" ON "repository_metrics" USING btree ("forks");--> statement-breakpoint
CREATE INDEX "repository_metrics_health_score_idx" ON "repository_metrics" USING btree ("health_score");--> statement-breakpoint
CREATE INDEX "repository_metrics_last_commit_idx" ON "repository_metrics" USING btree ("last_commit_at");--> statement-breakpoint
CREATE INDEX "repository_metrics_measured_at_idx" ON "repository_metrics" USING btree ("measured_at");--> statement-breakpoint
CREATE INDEX "verifications_resource_id_idx" ON "verifications" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "verifications_verifier_id_idx" ON "verifications" USING btree ("verifier_id");--> statement-breakpoint
CREATE INDEX "verifications_type_idx" ON "verifications" USING btree ("type");--> statement-breakpoint
CREATE INDEX "verifications_result_idx" ON "verifications" USING btree ("result");--> statement-breakpoint
CREATE INDEX "verifications_verified_at_idx" ON "verifications" USING btree ("verified_at");--> statement-breakpoint
CREATE INDEX "verifications_expires_at_idx" ON "verifications" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_search_resource_unique" ON "resource_search" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_search_resource_idx" ON "resource_search" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_search_indexed_at_idx" ON "resource_search" USING btree ("indexed_at");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_aliases_resource_alias_unique" ON "resource_aliases" USING btree ("resource_id","alias");--> statement-breakpoint
CREATE INDEX "resource_aliases_resource_id_idx" ON "resource_aliases" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_aliases_alias_idx" ON "resource_aliases" USING btree ("alias");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_relationships_unique" ON "resource_relationships" USING btree ("source_resource_id","target_resource_id","relationship_type");--> statement-breakpoint
CREATE INDEX "resource_relationships_source_idx" ON "resource_relationships" USING btree ("source_resource_id");--> statement-breakpoint
CREATE INDEX "resource_relationships_target_idx" ON "resource_relationships" USING btree ("target_resource_id");--> statement-breakpoint
CREATE INDEX "resource_relationships_type_idx" ON "resource_relationships" USING btree ("relationship_type");--> statement-breakpoint
CREATE UNIQUE INDEX "resource_external_identifiers_unique" ON "resource_external_identifiers" USING btree ("platform","identifier");--> statement-breakpoint
CREATE INDEX "resource_external_identifiers_resource_idx" ON "resource_external_identifiers" USING btree ("resource_id");--> statement-breakpoint
CREATE INDEX "resource_external_identifiers_platform_idx" ON "resource_external_identifiers" USING btree ("platform");--> statement-breakpoint
CREATE INDEX "resource_external_identifiers_sync_idx" ON "resource_external_identifiers" USING btree ("last_synced_at");