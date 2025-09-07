import { like } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { users } from '@/drizzle/schema';
import { lower } from '@/drizzle/utils';
import {
  USERS_COUNT,
  USERS_MAX_LIMIT,
  USERS_SEARCH_PARAMS_KEYS,
} from '@/lib/constants/users-search-params';
import { db } from '@/lib/db';
import { DB_USER_SELECTED_COLUMNS } from '@/lib/types/tables/user';

const searchParamsSchema = z.object({
  [USERS_SEARCH_PARAMS_KEYS.input]: z.string(),
  [USERS_SEARCH_PARAMS_KEYS.limit]: z.coerce
    .number()
    .min(1)
    .max(USERS_MAX_LIMIT)
    .optional(),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const validationResult = searchParamsSchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  if (!validationResult.success) {
    return new NextResponse('Invalid search params', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }

  const search: string = validationResult.data[USERS_SEARCH_PARAMS_KEYS.input];
  const limit: number =
    validationResult.data[USERS_SEARCH_PARAMS_KEYS.limit] || USERS_COUNT;

  try {
    const usersList = await db
      .select(DB_USER_SELECTED_COLUMNS)
      .from(users)
      .where(like(lower(users.email), `%${search.toLowerCase()}%`))
      .limit(limit);

    return new NextResponse(JSON.stringify(usersList), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new NextResponse('Error occurred on the server', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }
}
