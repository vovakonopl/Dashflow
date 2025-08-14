import { NextResponse } from 'next/server';
import { tryGetUser } from '@/lib/server/get-user';
import { TUser } from '@/lib/types/user';

// This route checks if the user has a valid session and returns user data or null.
export async function GET() {
  try {
    const user: TUser | null = await tryGetUser();
    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new NextResponse('User was not found in data base.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }
}
