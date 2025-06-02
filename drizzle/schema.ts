import { pgTable, varchar, integer, text, serial, timestamp, real, uniqueIndex, boolean, index, unique, foreignKey, doublePrecision } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const key = pgTable("Key", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	userId: integer().notNull(),
	hashedPassword: text(),
});

export const log = pgTable("Log", {
	id: serial().primaryKey().notNull(),
	action: text().notNull(),
	who: integer().notNull(),
	ondate: timestamp({ mode: 'string' }).defaultNow().notNull(),
});

export const review = pgTable("Review", {
	id: serial().primaryKey().notNull(),
	userid: integer().notNull(),
	topicid: integer().notNull(),
	title: text().notNull(),
	description: text().notNull(),
});

export const session = pgTable("Session", {
	id: varchar({ length: 255 }).primaryKey().notNull(),
	userId: integer().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
});

export const stargazing = pgTable("Stargazing", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	lat: real().notNull(),
	long: real().notNull(),
});

export const user = pgTable("User", {
	id: serial().primaryKey().notNull(),
	firstname: text("Firstname").notNull(),
	lastname: text("Lastname").notNull(),
	username: text().notNull(),
	email: text().notNull(),
	hashedpass: text().notNull(),
	description: text(),
	isbanned: boolean().default(false).notNull(),
}, (table) => [
	uniqueIndex("email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
}, (table) => [
	index("categories_index_0").using("btree", table.id.asc().nullsLast().op("int4_ops"), table.name.asc().nullsLast().op("text_ops")),
	unique("categories_unique_name_id").on(table.id, table.name),
	unique("categories_name_key").on(table.name),
]);

export const hotel = pgTable("hotel", {
	type: text().notNull(),
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	maplocation: doublePrecision().notNull(),
	image: text().notNull(),
	provice: text().notNull(),
	price: real().notNull(),
	darkindex: real().notNull(),
	host: text().notNull(),
	remaining: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.type],
			foreignColumns: [categories.name],
			name: "hotel_type_fk"
		}),
]);

