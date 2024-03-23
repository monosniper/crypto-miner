import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,
  }),

  tagTypes: ["articles"],
  endpoints: ({ mutation }) => ({
    orders: mutation<any, { type: "server" | "balance"; type_id?: number }>({
      query(body) {
        return {
          url: "orders",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useOrdersMutation } = paymentApi;
