import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
``
export default {
	out: './drizzle',
	schema: './drizzle/schema.ts',
	// @ts-ignore
	dialect: 'postgresql', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		// @ts-ignore
		host: process.env.DB_HOST!,
		user: process.env.DB_USER!,
		password: process.env.DB_PASSWORD!,
		database: process.env.DB_NAME!,
		ssl: false
	}
} satisfies Config;

