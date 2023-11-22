import { Settings } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,
  }),

  endpoints: ({ query }) => ({
    getSettings: query<Settings, null>({
      query() {
        return {
          url: "settings",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSettingsQuery } = mainApi;
