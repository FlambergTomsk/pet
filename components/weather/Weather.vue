<template>
  <div class="weather">
    <WeatherCard
      v-for="(item, ind) in currentWeather"
      :item="item"
      :isFirst="ind === 0"
    >
    </WeatherCard>
  </div>
</template>

<script setup>
const { $request, $t } = useNuxtApp();

const config = useRuntimeConfig();

const store = useStoreCity();

const currentWeather = ref([]);

const units = "metric";

const getBasicWeather = (cityName, countryCode, id, lat, lon) => {
  $request({
    method: "GET",
    url: `${config.public.base_url}/weather?lat=${lat}&lon=${lon}&appid=${config.public.api_key}&units=${units}`,
    msg: $t("common.weather_loaded", { cityName: cityName })
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
      weatherIcon: data.weather[0].icon
    });
  });
};

// const orderedCurrentWeather = computed(() => {
//   const orderedArray = [];
//   store.currentCities.forEach((city) => {
//     currentWeather.value.forEach((weather) => {
//       if (city.id === weather.id) {
//         orderedArray.push(weather);
//       }
//     });
//   });
//   return orderedArray
// });

onMounted(() => {
  if (!store.currentCities?.length) {
    $request({
      method: "GET",
      url: `${config.public.ip_url}?format=json`
    }).then((data) => {
      const ip = data.ip;
      $request({
        method: "GET",
        url: `${config.public.cities_url}/network?ip=${ip}`,
        headers: {
          "Content-type": "application/json",
          Authorization: config.public.cities_key
        }
      }).then((data) => {
        store.setCities([{ city: data.region }]);
      });
    });
  }
});

watch(
  () => store.currentCities,
  () => {
    currentWeather.value = [];
    if (!store.currentCities) return;
    store.currentCities.forEach((item) => {
      console.log(item);
      getBasicWeather(
        item.city.name,
        item.city.countryCode,
        item.city.id,
        item.city.latitude,
        item.city.longitude
      );
    });
  },
  {
    immediate: true
  }
);
</script>

<style lang="less" scoped>
.weather {
  &__content {
    width: 250px;
    background: @blue_gradient;
    padding: 40px;
    border-radius: 40px;
    color: @white;
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__city {
    margin: 0 12px;
  }

  &__setting {
    margin-left: auto;
    color: @white;
  }

  &__main {
    text-align: center;
    margin: 20px 0;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__temperature {
    font-size: 64px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>
