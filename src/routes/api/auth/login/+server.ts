import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const thaiEmailRegex = /[a-zA-Z\u0E00-\u0E7F]+@[a-zA-Z\u0E00-\u0E7F]/;

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    // Thai email validation
    if (!email || !thaiEmailRegex.test(email)) {
        return json({ 
            success: false,
            error: 'Please enter a valid Thai email address (example@domain.ไทย)'
        }, { status: 400 });
    }

    // Extract username from email (everything before @)
    const username = email.split('@')[0];

    // For demo purposes, we'll accept any login with valid Thai email
    if (email && password) {
        return json({ 
            success: true,
            email: email,
            username: username
        });
    }

    return json({ 
        success: false,
        error: 'Invalid credentials'
    }, { status: 401 });
}; 