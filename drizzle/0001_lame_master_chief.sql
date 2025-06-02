CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "categories_unique_name_id" UNIQUE("id","name"),
	CONSTRAINT "categories_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "hotel" (
	"type" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"maplocation" double precision NOT NULL,
	"image" text NOT NULL,
	"provice" text NOT NULL,
	"price" real NOT NULL,
	"darkindex" real NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Post" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Category" CASCADE;--> statement-breakpoint
DROP TABLE "Post" CASCADE;--> statement-breakpoint
DROP INDEX "username_idx";--> statement-breakpoint
DROP INDEX "email_idx";--> statement-breakpoint
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_type_fk" FOREIGN KEY ("type") REFERENCES "public"."categories"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "categories_index_0" ON "categories" USING btree ("id" int4_ops,"name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "User" USING btree ("username" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "User" USING btree ("email" text_ops);