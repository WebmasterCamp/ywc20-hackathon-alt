import type { RequestHandler } from '@sveltejs/kit';
import * as schema from '../../../db/schema';
import { db } from '../../../db/postgres';


export const GET: RequestHandler = async ({  }) => {
    const locations = await db.query.stargazing.findMany();
	return new Response(JSON.stringify(locations), { status: 200 });
};