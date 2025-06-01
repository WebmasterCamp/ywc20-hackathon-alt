import type { RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import { redirect } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';
import { generateId } from 'lucia';
import { lucia } from '../../../../lib/auth/auth';



export const POST: RequestHandler = async ({ request, cookies }) => {
  console.log(request);
  const { email, password, Firstname, Lastname, username, description } = await request.json();

  if (!password || !username) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 400 });
  }

  const hashedpass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      hashedpass,
      Firstname,
      Lastname,
      username,
      description
    }
  });
  const fetchuser = await prisma.user.findFirstOrThrow({
    where:{
      Firstname,
      Lastname,
      username
    }
  })
  const converttoint = fetchuser.id as unknown as string;
  const session = await lucia.createSession(converttoint, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(sessionCookie.name, sessionCookie.value, {
     path: ".",
     ...sessionCookie.attributes
  });
  return new Response(JSON.stringify({ message: 'Register successful' }), { status: 200 });
};