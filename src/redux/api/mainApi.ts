import { Settings } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,
  }),

  endpoints: ({ query, mutation }) => ({
    getSettings: query<Settings, null>({
      query() {
        return {
          url: "settings",
          method: "GET",
        };
      },
    }),

    checkUsername: mutation<{ success: boolean }, { username: string }>({
      query(body) {
        return {
          url: "check-username",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetSettingsQuery, useCheckUsernameMutation } = mainApi;
