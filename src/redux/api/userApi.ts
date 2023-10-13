import { Balance, User, Withdrawal } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/`,

    prepareHeaders: (headers) => {
      const userData = JSON.parse(localStorage.getItem("mainUserData") || "{}");

      if (userData && userData.password) {
        const bytesPassword = CryptoJS.AES.decrypt(
          userData.password,
          import.meta.env.VITE_CRYPT_KEY
        );
        const password = bytesPassword.toString(CryptoJS.enc.Utf8);

        const credentials = `${userData.email}:${password}`;
        const encodedCredentials = btoa(credentials);

        headers.set("Authorization", `Basic ${encodedCredentials}`);
        return headers;
      }
    },
  }),
  endpoints: ({ query }) => ({
    getMe: query<User, { username: string; password: string | number }>({
      query(params) {
        const credentials = `${params.username}:${params.password}`;

        return {
          url: "me",
          method: "GET",
          headers: {
            Authorization: `Basic ${btoa(credentials)}`,
          },

          params,
        };
      },
    }),

    getWallet: query<{ balance: Balance }, null>({
      query() {
        return {
          url: "me/wallet",
          method: "GET",
        };
      },
    }),

    getWithdraws: query<Withdrawal[], null>({
      query() {
        return {
          url: "me/withdraws",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetWithdrawsQuery,
  useGetWalletQuery,
} = userApi;
