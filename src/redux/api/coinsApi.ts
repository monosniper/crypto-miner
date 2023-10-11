import { Coin } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinsApi = createApi({
  reducerPath: "coinsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/coins`,
  }),
  endpoints: ({ query }) => ({
    getCoins: query<Coin[], null>({
      query() {
        return {
          url: "",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCoinsQuery } = coinsApi;
