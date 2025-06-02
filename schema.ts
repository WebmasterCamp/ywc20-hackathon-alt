// src/lib/db/schema.ts
import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  uniqueIndex,
  varchar,
  real,
  primaryKey,
} from "drizzle-orm/pg-core";

// --- User ---
export const users = pgTable("User", {
  id: serial("id").primaryKey(),
  Firstname: text("Firstname").notNull(),
  Lastname: text("Lastname").notNull(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  hashedpass: text("hashedpass").notNull(),
  description: text("description"),
  isbanned: boolean("isbanned").notNull().default(false),
},
(table) => ({
  usernameIndex: uniqueIndex("username_idx").on(table.username),
  emailIndex: uniqueIndex("email_idx").on(table.email),
}));

// --- Category ---
export const categories = pgTable("Category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  app_read: boolean("app_read").notNull().default(false),
  app_write: boolean("app_write").notNull().default(false),
  creationdate: timestamp("creationdate").defaultNow().notNull(),
  isdisable: boolean("isdisable").notNull().default(false),
  ishidden: boolean("ishidden").notNull().default(false),
  totaltopics: integer("totaltopics").notNull().default(0),
  createby: integer("createby").notNull(),
}, (table) => ({
  nameIndex: uniqueIndex("name_idx").on(table.name),
}));

// --- Post ---
export const posts = pgTable("Post", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createby: integer("createby").notNull(),
  creation_date: timestamp("creation_date").defaultNow().notNull(),
  last_edited: timestamp("last_edited").notNull(),
  app_read: boolean("app_read").notNull().default(false),
  app_write: boolean("app_write").notNull().default(false),
  isdisable: boolean("isdisable").notNull().default(false),
  ishidden: boolean("ishidden").notNull().default(false),
  maplocation: text("maplocation"),
  categoryId: integer("categoryId").notNull(),
});

// --- Review ---
export const reviews = pgTable("Review", {
  id: serial("id").primaryKey(),
  userid: integer("userid").notNull(),
  topicid: integer("topicid").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

// --- Log ---
export const logs = pgTable("Log", {
  id: serial("id").primaryKey(),
  action: text("action").notNull(),
  who: integer("who").notNull(),
  ondate: timestamp("ondate").defaultNow().notNull(),
});

// --- Session ---
export const sessions = pgTable("Session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: integer("userId").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

// --- Key ---
export const keys = pgTable("Key", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: integer("userId").notNull(),
  hashedPassword: text("hashedPassword"),
});

// --- Stargazing ---
export const stargazing = pgTable("Stargazing", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  lat: real("lat").notNull(),
  long: real("long").notNull(),
});
