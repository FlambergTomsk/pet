<template>
  <div class="weather-blog">
    <h2>
      {{ $t("common.subitile") }}
    </h2>

    <Accordion class="weather-blog__accordion">
      <AccordionItem v-for="item in blog" :item="item" :key="item.id">
        <template #title>{{ item.title }}</template>
        {{ item.text }}
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup>
const { $t } = useNuxtApp();

const blog = computed(() => [
  { id: 1, title: $t("blog.stek_title"), text: $t("blog.stek_text") },
  {
    id: 2,
    title: $t("blog.validation_title"),
    text: $t("blog.validation_text"),
  },
  {
    id: 3,
    title: $t("blog.localization_title"),
    text: $t("blog.localization_text"),
  },
  { id: 4, title: $t("blog.api_title"), text: $t("blog.api_text") },
  { id: 5, title: $t("blog.save_title"), text: $t("blog.save_text") },
  { id: 6, title: $t("blog.css_title"), text: $t("blog.css_text") },
]);
</script>

