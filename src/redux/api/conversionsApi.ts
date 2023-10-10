import { Conversion } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

export const conversionsApi = createApi({
  reducerPath: "conversionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API!}/convertations`,
  }),

  tagTypes: ["conversions"],
  endpoints: ({ query }) => ({
    getConversions: query<Conversion[], null>({
      query() {
        const userData = JSON.parse(
          localStorage.getItem("mainUserData") || "{}",
        );

        const bytesPassword = CryptoJS.AES.decrypt(
          userData.password,
          import.meta.env.VITE_CRYPT_KEY,
        );
        const password = bytesPassword.toString(CryptoJS.enc.Utf8);

        const credentials = `${userData.email}:${password}`;
        const encodedCredentials = btoa(credentials);

        return {
          url: "",
          method: "GET",

          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        };
      },

      providesTags: ["conversions"],
    }),
  }),
});

export const { useGetConversionsQuery } = conversionsApi;
