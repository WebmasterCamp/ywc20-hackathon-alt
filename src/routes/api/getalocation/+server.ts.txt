import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


export const GET: RequestHandler = async ({  }) => {
	const locations = await prisma.Stargazing.findMany();
	return new Response(JSON.stringify(locations), { status: 200 });
};