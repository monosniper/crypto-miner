import { Session } from "@/types";
import { prepareHeaders } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const miningApi = createApi({
  reducerPath: "miningApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,

    prepareHeaders,
  }),
  endpoints: ({ query }) => ({
    getSession: query<Session, null>({
      query() {
        return {
          url: `/me/session`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyGetSessionQuery, useGetSessionQuery } = miningApi;
