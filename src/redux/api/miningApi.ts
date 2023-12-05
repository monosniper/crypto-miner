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
    getSession: query<Session, { id: number }>({
      query(params) {
        return {
          url: `/sessions/${params.id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLazyGetSessionQuery } = miningApi;
