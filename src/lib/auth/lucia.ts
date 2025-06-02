import { Lucia } from 'lucia';
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql';
import { dev } from '$app/environment';
import { db } from '../../db/postgres';

declare module 'lucia' {
  interface DatabaseUserAttributes {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    description: string | null;
    isbanned: boolean;
  }
}

const adapter = new PostgresJsAdapter(db, {
  user: 'User',
  session: 'Session',
  key: 'Key'
} satisfies { user: string; session: string; key: string });

export const auth = new Lucia(adapter, {
  sessionCookie: {
    expires: false
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      description: data.description,
      isbanned: data.isbanned
    };
  }
});

export type Auth = typeof auth; 