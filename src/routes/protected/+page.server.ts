import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    const email = cookies.get('userEmail');
    const username = cookies.get('username');

    if (!email || !username) {
        throw redirect(302, '/login');
    }

    return {
        user: {
            email,
            username
        }
    };
}; 