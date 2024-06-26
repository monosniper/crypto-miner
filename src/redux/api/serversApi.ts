import {
  ConfigurationItem,
  Log,
  Preset,
  Server,
  ServerPlan,
  ServerStatuses,
} from "@/types";
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

  tagTypes: ["convertations"],
  endpoints: ({ query, mutation }) => ({
    getAllServers: query<{ data: ServerPlan[] }, null>({
      query() {
        return {
          url: "servers",
          method: "GET",
        };
      },
    }),

    getServerById: query<{ data: Server }, { id: number }>({
      query(params) {
        return {
          url: `servers/${params.id}`,
          method: "GET",
        };
      },
    }),

    getMyServers: query<
      { data: (Preset & { status: ServerStatuses })[] },
      null
    >({
      query() {
        return {
          url: "me/servers",
          method: "GET",
        };
      },
    }),

    getMyServerById: query<
      {
        success: boolean;
        data: { status: ServerStatuses, logs: Log[] } & Preset;
        message: string;
      },
      { id: number }
    >({
      query(params) {
        return {
          url: `me/servers/${params.id}`,
          method: "GET",
        };
      },
    }),

    extendServer: mutation<
      { success: boolean; url: string },
      { server_id: number }
    >({
      query(body) {
        return {
          url: "me/servers",
          method: "PUT",
          body,
        };
      },
    }),

    getPresets: query<
      { success: boolean; data: Preset[]; message: string },
      null
    >({
      query() {
        return {
          url: "presets",
          methodL: "GET",
        };
      },
    }),

    getConfiguration: query<
      { success: boolean; data: ConfigurationItem[]; message: string },
      null
    >({
      query() {
        return {
          url: "configuration",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllServersQuery,
  useGetServerByIdQuery,
  useGetMyServersQuery,
  useGetMyServerByIdQuery,
  useExtendServerMutation,
  useGetPresetsQuery,
  useGetConfigurationQuery,
} = serversApi;
