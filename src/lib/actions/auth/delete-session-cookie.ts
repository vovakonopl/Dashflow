'use server';

import { deleteSession } from '@/lib/server/session';

export async function deleteSessionCookie() {
  return deleteSession();
}
