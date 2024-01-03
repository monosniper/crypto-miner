import {
  Balance,
  Convertation,
  Nft,
  Notification,
  ReplenishmentItem,
  User,
  WithdrawsBody,
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
    getMe: query<{ data: User }, { email: string; password: string | number }>({
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

    getWallet: query<{ data: { balance: Balance; nfts: Nft[] } }, null>({
      query() {
        return {
          url: "me/wallet",
          method: "GET",
        };
      },
    }),

    getWithdraws: query<{ data: WithdrawsItem[] }, null>({
      query() {
        return {
          url: "me/withdraws",
          method: "GET",
        };
      },
    }),

    getConvertations: query<{ data: Convertation[] }, null>({
      query() {
        return {
          url: "me/convertations",
          method: "GET",
        };
      },

      providesTags: ["convertations"],
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

    withdraws: mutation<any, WithdrawsBody>({
      query(body) {
        return {
          url: "withdraws",
          method: "POST",
          body,
        };
      },
    }),

    // getInvest: query<any, null>({
    //   query() {
    //     return {
    //       url: "invest",
    //       method: "GET",
    //     };
    //   },
    // }),

    getNotifications: query<{ data: Notification[] }, null>({
      query() {
        return {
          url: "me/notifications",
          method: "GET",
        };
      },
    }),

    replenishment: mutation<
      { success: boolean; error?: string; url?: string },
      { amount: number }
    >({
      query(body) {
        return {
          url: "me/replenishments",
          method: "POST",
          body,
        };
      },
    }),

    getReplenishment: query<{ data: ReplenishmentItem[] }, null>({
      query() {
        return {
          url: "me/replenishments",
          method: "GET",
        };
      },
    }),

    buyServer: mutation<
      { success: boolean; error?: string; url?: string },
      { server_id: number }
    >({
      query(body) {
        return {
          url: "me/servers",
          method: "POST",
          body,
        };
      },
    }),

    partnership: mutation<
      { success: boolean; error?: string; url?: string },
      { amount: number }
    >({
      query(body) {
        return {
          url: "me/donate",
          method: "POST",
          body,
        };
      },
    }),

    convertation: mutation<
      null,
      { coin_from_id: number; coin_to_id: number; amount: number }
    >({
      query(body) {
        return {
          url: "me/convertations",
          method: "POST",
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
  useSetCoinsPositionsMutation,
  useGetCoinsPositionsQuery,
  useWithdrawsMutation,
  useGetNotificationsQuery,
  useReplenishmentMutation,
  useBuyServerMutation,
  usePartnershipMutation,
  useGetReplenishmentQuery,
  useConvertationMutation,
} = userApi;
