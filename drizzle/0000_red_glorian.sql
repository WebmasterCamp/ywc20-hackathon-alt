CREATE TABLE "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"app_read" boolean DEFAULT false NOT NULL,
	"app_write" boolean DEFAULT false NOT NULL,
	"creationdate" timestamp DEFAULT now() NOT NULL,
	"isdisable" boolean DEFAULT false NOT NULL,
	"ishidden" boolean DEFAULT false NOT NULL,
	"totaltopics" integer DEFAULT 0 NOT NULL,
	"createby" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"hashedPassword" text
);
--> statement-breakpoint
CREATE TABLE "Log" (
	"id" serial PRIMARY KEY NOT NULL,
	"action" text NOT NULL,
	"who" integer NOT NULL,
	"ondate" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createby" integer NOT NULL,
	"creation_date" timestamp DEFAULT now() NOT NULL,
	"last_edited" timestamp NOT NULL,
	"app_read" boolean DEFAULT false NOT NULL,
	"app_write" boolean DEFAULT false NOT NULL,
	"isdisable" boolean DEFAULT false NOT NULL,
	"ishidden" boolean DEFAULT false NOT NULL,
	"maplocation" text,
	"categoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Review" (
	"id" serial PRIMARY KEY NOT NULL,
	"userid" integer NOT NULL,
	"topicid" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Stargazing" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"lat" real NOT NULL,
	"long" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"Firstname" text NOT NULL,
	"Lastname" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"hashedpass" text NOT NULL,
	"description" text,
	"isbanned" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "name_idx" ON "Category" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "User" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "User" USING btree ("email");