import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUser } from '@/lib/types/user';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getProfile: builder.query<TUser | null, void>({ query: () => 'profile' }),
  }),
});

export const { useGetProfileQuery } = api;
