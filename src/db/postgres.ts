// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from '../../drizzle/schema';



// There are multiple ways to initialize the client
// Go to one of these pages to find your implementation:
// postgreSQL: https://orm.drizzle.team/docs/get-started-postgresql
// MySQL: https://orm.drizzle.team/docs/get-started-mysql
// SQLite: https://orm.drizzle.team/docs/get-started-sqlite
// The following is an example for supabase:

const client = postgres(env.DATABASE_URL, {
  ssl: false
});

export const db = drizzle(client, { schema });