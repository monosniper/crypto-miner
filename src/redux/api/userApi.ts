import {
  Balance,
  Convertation,
  Nft,
  Notification,
  ReplenishmentItem,
  User,
  UserRef,
  WithdrawsBody,
  WithdrawsItem,
  OrderPostBody,
  OrderPatchBody,
  PersonalFormData,
  Order,
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

  tagTypes: ["convertations", "coins", "nfts", "ref", "orders"],
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
        };
      },
    }),

    getMeData: query<{ data: User }, null>({
      query() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        return {
          url: "me",
          method: "GET",
          headers: {
            Authorization: `Basic ${token}`,
          },
        };
      },
    }),

    updateMe: mutation<
      { data: boolean; message: string; success: boolean },
      Partial<PersonalFormData>
    >({
      query(body) {
        return {
          url: "me",
          method: "PUT",
          body,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },
    }),

    forgotPassword: mutation<{ success: boolean }, { email: string }>({
      query(body) {
        return {
          url: "forgot-password",
          method: "POST",
          body,
        };
      },
    }),

    checkPasswordCode: mutation<{ success: boolean }, { code: string }>({
      query(body) {
        return {
          url: "/check-password-code",
          method: "POST",
          body,
        };
      },
    }),

    updatePassword: mutation<
      { success: boolean },
      { password: string; code: string }
    >({
      query(body) {
        return {
          url: "update-password",
          method: "PUT",
          body,
        };
      },
    }),

    getWallet: query<{ data: { balance: Balance } }, null>({
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
          url: "coins",
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
      { success: boolean },
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

    transfer: mutation<
      { success: boolean },
      { username: string; amount: number }
    >({
      query(body) {
        return {
          url: "me/transfer",
          method: "POST",
          body,
        };
      },
    }),

    getNfts: query<{ success: boolean; data: Nft[]; message: string }, null>({
      query() {
        return {
          url: "me/nfts",
          method: "GET",
        };
      },

      providesTags: ["nfts"],
    }),

    getRef: query<
      {
        success: boolean;
        data?: UserRef;
        message: string;
      },
      null
    >({
      query() {
        return {
          url: "me/ref",
          methodL: "GET",
        };
      },

      providesTags: ["ref"],
    }),

    setOrder: mutation<Order, OrderPostBody>({
      query(body) {
        return {
          url: "me/orders",
          method: "POST",
          body,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
      },

      invalidatesTags: ["orders"],
    }),

    patchOrder: mutation<any, OrderPatchBody>({
      query(body) {
        return {
          url: `me/orders/{orders_id}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: ["orders"],
    }),

    getOrders: query<any, null>({
      query() {
        return {
          url: "me/orders/",
          method: "GET",
        };
      },

      providesTags: ["orders"],
    }),

    getOrdersById: query<any, { order_id: number }>({
      query(params) {
        return {
          url: `me/orders/${params.order_id}`,
          method: "GET",
        };
      },

      providesTags: ["orders"],
    }),

    payed: query<
      { success: boolean; data: boolean; message: string },
      { orderId: number }
    >({
      query(params) {
        return {
          url: `me/orders/payed/${params.orderId}/`,
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
  useTransferMutation,
  useForgotPasswordMutation,
  useCheckPasswordCodeMutation,
  useUpdatePasswordMutation,
  useGetMeDataQuery,
  useLazyGetMeDataQuery,
  useGetNftsQuery,
  useGetRefQuery,
  useSetOrderMutation,
  usePatchOrderMutation,
  useGetOrdersByIdQuery,
  useGetOrdersQuery,
  useUpdateMeMutation,
  useLazyPayedQuery,
} = userApi;
