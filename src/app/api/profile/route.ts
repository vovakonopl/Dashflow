import { NextResponse } from 'next/server';
import { getUser } from '@/lib/server/get-user';

export async function GET() {
  const user = await getUser();

  return new NextResponse(JSON.stringify(user), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
