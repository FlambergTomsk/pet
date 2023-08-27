<template>
  <div class="weather">
    <div class="weather__header">
      <h1 class="weather__title">
        {{ $t("common.title") }}
      </h1>
      <LocaleSwitcher class="weather__switcher" />
    </div>
    <div class="weather__wrapper">
      <section class="weather__blog">
        <WeatherBlog />
      </section>

      <div class="weather__cards">
        <WeatherCard
          v-for="(item, ind) in orderedArray"
          :item="item"
          :isFirst="ind === 0"
        />
        <WeatherEmptyState v-if="!orderedArray.length" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const { $request, $t } = useNuxtApp();
const config = useRuntimeConfig();
const store = useStoreCity();

const currentWeather = ref([]);
const orderedArray = ref([]);

const units = "metric";

const getBasicWeather = (cityName, countryCode, id, lat, lon) => {
  $request({
    method: "GET",
    url: `${config.public.base_url}/weather?lat=${lat}&lon=${lon}&lang=${locale.value}&appid=${config.public.api_key}&units=${units}`,
    msg: $t("common.weather_loaded", { cityName: cityName }),
  }).then((data) => {
    currentWeather.value.push({
      ...data,
      id: id,
      city: cityName,
      countryCode: countryCode,
      temperature: Math.floor(data.main.temp),
      condition: data.weather[0].description,
      maxTemp: Math.floor(data.main.temp_max),
      minTemp: Math.floor(data.main.temp_min),
      weatherIcon: data.weather[0].icon,
    });
  });
};

onMounted(() => {
  if (!localStorage.getItem("cities")) {
    $request({
      method: "GET",
      url: `${config.public.ip_url}?format=json`,
    }).then((data) => {
      const ip = data.ip;
      $request({
        method: "GET",
        url: `${config.public.cities_url}/network?ip=${ip}`,
        headers: {
          "Content-type": "application/json",
          Authorization: config.public.cities_key,
        },
      }).then((data) => {
        store.setCities([data.region]);
      });
    });
  }
});

watch(
  () => [store.currentCities, locale.value],
  () => {
    currentWeather.value = [];
    store.currentCities.forEach((city) => {
      getBasicWeather(
        city.name,
        city.countryCode,
        city.id,
        city.latitude,
        city.longitude
      );
    });
  },
  {
    immediate: true,
  }
);

watch(
  () => currentWeather.value,
  () => {
    orderedArray.value = [];
    store.currentCities.forEach((city) => {
      const orderedItem = currentWeather.value.find(
        (weather) => weather.id === city.id
      );
      if (orderedItem) {
        orderedArray.value.push(orderedItem);
      }
    });
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.weather {
  &__header {
    display: flex;
    justify-content: center;
    @media @bw450 {
    flex-direction: column;
    }
  }
  &__title {
    text-align: center;
    width: 100%;
    @media @bw450 {
    text-align: left;
    }
  }
  &__switcher {
    margin-left: auto;
  }

  &__blog {
    grid-area: blog;
  }

  &__cards {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    grid-area: cards;
    row-gap: 40px;
    column-gap: 20px;
    @media @bw768 {
      padding-top: 20px;
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "blog cards cards";
    column-gap: 40px;
    @media @bw768 {
      grid-template-columns: 1fr;
      grid-template-areas:
        "blog"
        "cards";
    }
  }
}
</style>
