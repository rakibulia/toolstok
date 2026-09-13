CREATE TYPE "public"."logo_source" AS ENUM('hunter', 'official', 'favicon', 'generated', 'unknown');--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "domain" text;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "logo_source" "logo_source" DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "logo_updated_at" timestamp with time zone;--> statement-breakpoint
CREATE INDEX "resources_domain_idx" ON "resources" USING btree ("domain");