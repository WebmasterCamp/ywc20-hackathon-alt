import { lucia } from '../../../../lib/auth/auth';
import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const POST: RequestHandler = async ({ locals, cookies }) => {
	const session = await locals.session;
	if (!session) {
		throw redirect(302, '/')
	}

	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
    // await prisma.session.delete({
    //     where: {
    //         id: session.id
    //     }
    // })


	throw redirect(302, '/')
}