import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,
  }),
  endpoints: ({ query }) => ({
    getMe: query<User, { username: string; password: string | number }>({
      query(params) {
        const credentials = `${params.username}:${params.password}`;

        return {
          url: "me",
          method: "GET",
          params,
          headers: {
            Authorization: `Basic ${btoa(credentials)}`,
          },
        };
      },
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = userApi;
