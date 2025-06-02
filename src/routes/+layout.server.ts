import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

export const load = async ({ cookies }: { cookies: Cookies }) => {
    const email = cookies.get('userEmail');
    const username = cookies.get('username');

    if (!email || !username) {
        return null;
    }

    return {
        user: {
            email,
            username
        }
    };
}; 