CREATE TABLE IF NOT EXISTS "certificate" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"title" varchar(255),
	"issuer" varchar(255),
	"issue_date" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "language" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"name" varchar(255),
	"proficiency" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"title" varchar(255),
	"link" varchar(255),
	"description" text
);
--> statement-breakpoint
DROP TABLE "skills";--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "skill" text;--> statement-breakpoint
ALTER TABLE "personal_info" ADD COLUMN "full_name" varchar(255);--> statement-breakpoint
ALTER TABLE "personal_info" ADD COLUMN "github" varchar(255);--> statement-breakpoint
ALTER TABLE "personal_info" ADD COLUMN "linkedin" varchar(255);--> statement-breakpoint
ALTER TABLE "personal_info" ADD COLUMN "portfolio" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certificate" ADD CONSTRAINT "certificate_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "language" ADD CONSTRAINT "language_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "theme_color";--> statement-breakpoint
ALTER TABLE "personal_info" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "personal_info" DROP COLUMN IF EXISTS "last_name";