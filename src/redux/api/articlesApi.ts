import { News } from "@/types/newsTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/articles`,
  }),

  tagTypes: ["articles"],
  endpoints: ({ query }) => ({
    getArticles: query<News[], null>({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },

      providesTags: ["articles"],
    }),
  }),
});

export const { useGetArticlesQuery } = articlesApi;
