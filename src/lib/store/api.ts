import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  USERS_COUNT,
  USERS_SEARCH_PARAMS_KEYS,
} from '@/lib/constants/users-search-params';
import { TUser } from '@/lib/types/user';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getProfile: builder.query<TUser | null, void>({ query: () => 'profile' }),

    getUsersByEmail: builder.query({
      query: (search: string, limit: number = USERS_COUNT) => {
        const searchParams = new URLSearchParams({
          [USERS_SEARCH_PARAMS_KEYS.input]: search,
          [USERS_SEARCH_PARAMS_KEYS.limit]: limit.toString(),
        });

        return `users?${searchParams}`;
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetUsersByEmailQuery } = api;
