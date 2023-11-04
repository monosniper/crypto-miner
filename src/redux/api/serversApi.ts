import { Server } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js";

export const serversApi = createApi({
  reducerPath: "serversApi",
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

  tagTypes: ["convertations"],
  endpoints: ({ query }) => ({
    getAllServers: query<Server[], null>({
      query() {
        return {
          url: "servers",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllServersQuery } = serversApi;
