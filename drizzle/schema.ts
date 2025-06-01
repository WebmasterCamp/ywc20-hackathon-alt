import { pgTable, serial, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const testTable = pgTable("test_table", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
});
