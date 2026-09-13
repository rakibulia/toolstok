ALTER TABLE "resources" ALTER COLUMN "logo_source" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "logo_source" SET DEFAULT 'unknown'::text;--> statement-breakpoint
DROP TYPE "public"."logo_source";--> statement-breakpoint
CREATE TYPE "public"."logo_source" AS ENUM('official', 'favicon', 'google', 'hunter', 'duckduckgo', 'iconhorse', 'generated', 'unknown');--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "logo_source" SET DEFAULT 'unknown'::"public"."logo_source";--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "logo_source" SET DATA TYPE "public"."logo_source" USING "logo_source"::"public"."logo_source";