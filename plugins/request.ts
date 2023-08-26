//@ts-nocheck
import { useToast } from "vue-toastification/dist/index.mjs";

type options = {
  url?: string;
  path?: string;
  body?: {} | string;
  params?: {};
  config?: {};
  msg?: string;
  status?: number | string;
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      request: (options: options) => {
        if (!options || typeof options !== "object") return;

        const { $getUrl, $t } = useNuxtApp();

        const url: string =
          options.url || $getUrl(options.path, options.params);
        if (!url) return;

        const headers = options.headers;

        const toast = useToast();

        const config = {
          method: options.method || "GET",
          body: options.body,
          headers: headers || {},
        };

        const status: number | string = options.status || 200;

        const showError = (msg?: string): void => {
          toast.error(msg || $t("common.something_went_wrong"));
        };

        const showSuccess = (msg: string): void => {
          if (msg) toast.success(msg);
        };
        return $fetch
          .raw(url, config)
          .then((response: any) => {
            if (response && response.status === status) {
              if (options.msg) showSuccess(options.msg);
              return response._data || true;
            } else {
              showError();
            }
          })
          .catch((error) => {
            console.log("[error]", error);
            if (error?.status == 504) {
              showError($t("common.timeout_exceeded"));
              return;
            }

            if (!error.response || !error.response.data) {
              showError();
              return;
            }

            const errorsObj =
              error.response.data.errors ||
              error.response.data.error ||
              error.response.data.message ||
              error.response.data;

            if (!errorsObj) {
              showError();
            } else if (typeof errorsObj === "string") {
              showError(errorsObj);
            } else if (Array.isArray(errorsObj)) {
              showError(errorsObj[0]);
            } else if (typeof errorsObj === "object") {
              const errorKeys = Object.keys(errorsObj);
              let firstError = errorKeys[0] && errorsObj[errorKeys[0]];
              if (Array.isArray(firstError)) firstError = firstError[0];
              showError(firstError);
            } else {
              showError();
            }
          });
      },
    },
  };
});
