import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { JWT_SECRET } from '$env/static/private';// use `prisma` in your application to read and write data in your DB
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { redirect } from '@sveltejs/kit';


import { generateId } from 'lucia';
import { lucia } from '../../../../lib/auth/auth';


export const POST: RequestHandler = async ({ request,cookies }) => {
  const { username, password } = await request.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.isbanned) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.hashedpass);
  if (!valid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  }
  // @ts-ignore
  const fetchuser = await prisma.user.findFirstOrThrow({
    where:{
      username,
    }
  })
  const converttoint = fetchuser.id as unknown as string;
  const session = await lucia.createSession(converttoint, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(sessionCookie.name, sessionCookie.value, {
     path: ".",
     ...sessionCookie.attributes
  });
  return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
};