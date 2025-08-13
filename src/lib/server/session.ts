import 'server-only'; // Ensure this file is only used on the server side

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_CONFIG } from '@/lib/constants/session-cookie-config';
import { TSessionPayload } from '@/lib/types/session-payload';

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: TSessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_COOKIE_CONFIG.duration / 1000) // Convert milliseconds to seconds
    .sign(key);
}

export async function decrypt(
  session: string,
): Promise<TSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });

    return payload as TSessionPayload;
  } catch {
    return null;
  }
}

// Create a new session and set the cookie
export async function createSession(
  userPayload: Omit<TSessionPayload, 'expires'>,
): Promise<void> {
  const expires = new Date(Date.now() + SESSION_COOKIE_CONFIG.duration);
  const session = await encrypt({ ...userPayload, expires });

  const cookiesList = await cookies();
  cookiesList.set(SESSION_COOKIE_CONFIG.name, session, {
    ...SESSION_COOKIE_CONFIG.options,
    expires,
  });
}

// Verify the session and redirect to sign-in page if not valid
export async function verifySession(): Promise<
  Omit<TSessionPayload, 'expires'>
> {
  const cookiesList = await cookies();
  const sessionCookie = cookiesList.get(SESSION_COOKIE_CONFIG.name)?.value;
  if (!sessionCookie) {
    redirect('/sign-in');
  }

  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const { expires, ...userPayload } = session;
  return userPayload;
}

// Delete the session cookie and redirect to home page
export async function deleteSession(): Promise<void> {
  const cookiesList = await cookies();
  cookiesList.delete(SESSION_COOKIE_CONFIG.name);

  redirect('/');
}

// Return the session if it exists, otherwise return null
export async function getSession(): Promise<Omit<
  TSessionPayload,
  'expires'
> | null> {
  const cookiesList = await cookies();
  const sessionCookie = cookiesList.get(SESSION_COOKIE_CONFIG.name)?.value;
  if (!sessionCookie) {
    return null;
  }

  const session = await decrypt(sessionCookie);
  if (!session?.userId) {
    return null;
  }

  const { expires, ...userPayload } = session;
  return userPayload;
}
