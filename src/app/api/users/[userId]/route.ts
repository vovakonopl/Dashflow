import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { DB_USER_INCLUDED_COLUMNS, TUser } from '@/lib/types/user';

export async function GET(_: NextRequest, params: Promise<{ userId: string }>) {
  const { userId } = await params;
  const user: TUser | undefined = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: DB_USER_INCLUDED_COLUMNS,
  });

  if (!user) {
    return new NextResponse('User is not found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
