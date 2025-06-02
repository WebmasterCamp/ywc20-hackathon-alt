import type { RequestHandler } from '@sveltejs/kit';
import * as schema from '../../../../drizzle/schema';
import { db } from '../../../db/postgres';


export const GET: RequestHandler = async ({  }) => {
    const locations = await db.query.hotel.findMany();
	return new Response(JSON.stringify(locations), { status: 200 });
};