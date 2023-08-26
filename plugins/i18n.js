import { createI18n } from "vue-i18n";
import appConfig from "@/app-config.ts";

const { LOCALE } = appConfig;


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: LOCALE,
  warnHtmlMessage: false
});

const t = i18n.global.t;

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n);

  return {
    provide: {
      i18n: i18n,
      t: t
    }
  };
});

export { i18n, t };
