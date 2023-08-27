<template>
  <main class="app">
    <NuxtPage />
    <ModalSetting />
  </main>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { locale, setLocaleMessage } = useI18n();

await import("./locales").then((messages) => {
  setLocaleMessage(locale.value, messages[locale.value]);
});

const store = useStoreCity();
store.currentCities = JSON.parse(localStorage.getItem("cities") || '[]');


useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap",
    },
  ],
});

watch(
  () => locale.value,
  async () => {
    await import("./locales").then((messages) => {
      setLocaleMessage(locale.value, messages[locale.value]);
    });
  }
);
</script>
<style lang="less" scoped>
.app {
  font-family: Roboto, sans-serif;
}
</style>
