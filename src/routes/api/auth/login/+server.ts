import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  // Mockup login - accept any email and password
  // Set cookies
  cookies.set('userEmail', email, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  cookies.set('username', email.split('@')[0], { // Use part before @ as username
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  return new Response(JSON.stringify({ 
    success: true,
    email: email,
    username: email.split('@')[0]
  }), { status: 200 });
}; 