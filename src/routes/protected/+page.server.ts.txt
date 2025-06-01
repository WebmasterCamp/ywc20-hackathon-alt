import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { lucia } from '$lib/auth/auth';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.session;
    console.log(session);
    if (!session) {
        throw redirect(302, '/login');
    }

    const user = await locals.user;
    console.log(user);
    if (!user) {
        throw redirect(302, '/login');
    }

    return {
        user: {
            username: user.username,
            email: user.email
        }
    };
};
