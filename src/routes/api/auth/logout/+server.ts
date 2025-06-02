import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
    // Clear the cookies
    cookies.delete('userEmail', { path: '/' });
    cookies.delete('username', { path: '/' });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}; 