import {
  Balance,
  Convertation,
  Nft,
  Server,
  User,
  WithdrawsItem,
} from "@/types";
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
          import.meta.env.VITE_CRYPT_KEY,
        );
        const password = bytesPassword.toString(CryptoJS.enc.Utf8);

        const credentials = `${userData.email}:${password}`;
        const encodedCredentials = btoa(credentials);

        headers.set("Authorization", `Basic ${encodedCredentials}`);
        return headers;
      }
    },
  }),

  tagTypes: ["convertations", "coins"],
  endpoints: ({ query, mutation }) => ({
    getMe: query<User, { email: string; password: string | number }>({
      query(params) {
        const credentials = `${params.email}:${params.password}`;

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

    getWithdraws: query<WithdrawsItem[], null>({
      query() {
        return {
          url: "me/withdraws",
          method: "GET",
        };
      },
    }),

    getConvertations: query<Convertation[], null>({
      query() {
        return {
          url: "me/convertations",
          method: "GET",
        };
      },

      providesTags: ["convertations"],
    }),

    getMyServers: query<Server[], null>({
      query() {
        return {
          url: "me/servers",
          method: "GET",
        };
      },
    }),

    setCoinsPositions: mutation<
      { success: boolean },
      { id: number; hide?: boolean }[]
    >({
      query(body) {
        return {
          url: "me/coins",
          method: "PUT",
          body,
        };
      },
    }),

    getCoinsPositions: query<{ id: number; hide?: boolean }[], null>({
      query() {
        return {
          url: "me/coins",
          method: "GET",
        };
      },
    }),

    getInvest: query<any, null>({
      query() {
        return {
          url: "invest",
          method: "GET",
        };
      },
    }),

    getNft: query<Nft[], null>({
      query() {
        return {
          url: "me/nft",
          method: "GET",
        };
      },
    }),

    withdrawNft: mutation<any, { nft_id: number }>({
      query(body) {
        return {
          url: "me/nft",
          method: "PUT",
          body,
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
  useGetConvertationsQuery,
  useGetMyServersQuery,
  useSetCoinsPositionsMutation,
  useGetCoinsPositionsQuery,
  useGetInvestQuery,
  useGetNftQuery,
  useWithdrawNftMutation,
} = userApi;
