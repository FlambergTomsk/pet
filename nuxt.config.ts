import dynamicImport from "vite-plugin-dynamic-import";
import { sort } from "vite-plugin-utils/sort-plugin";
import svgLoader from "vite-svg-loader";
import * as messages from "./locales";

import appConfig from "./app-config";
const { BASE_URL, API_KEY, LOCALE, LOCALES, CITIES_URL, CITIES_KEY, IP_URL } =
  appConfig;

export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  app: {
    baseURL: "/weather/",
    buildAssetsDir: "assets",
    pageTransition: false,
    layoutTransition: false,
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width,height=device-height,initial-scale=1.0,minimum-scale=1,maximum-scale=1.0,user-scalable=no",
    },
  },
  css: ["@/styles/styles.less"],

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],

  runtimeConfig: {
    public: {
      locale: LOCALE,
      locales: LOCALES,
      base_url: BASE_URL,
      api_key: API_KEY,
      cities_url: CITIES_URL,
      cities_key: CITIES_KEY,
      ip_url: IP_URL,
    },
  },

  typescript: {
    shim: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
                @import "@/styles/variables.less";
                @import "@/styles/mixins.less";
              `,
        },
      },
    },
    plugins: [
      sort({
        plugin: dynamicImport(),
        names: ["vite:vue", "vite:vue-jsx"],
        enforce: "post",
      }),
      svgLoader(),
    ],
  },
});
