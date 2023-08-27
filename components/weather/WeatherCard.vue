<template>
  <div class="weather-card">
    <div class="weather-card__content">
      <div class="weather-card__header">
        <SvgIcon name="map" width="24" height="24" class="weather-card__map" />

        <div class="weather-card__city">{{ item.city }},</div>

        <div class="weather-card__country">
          {{ item.countryCode }}
        </div>

        <WeatherSettings v-if="isFirst" class="weather-card__setting"/>
      </div>
      <div class="weather-card__main">
        <div class="weather-card__picture">
          <img
            :src="`icons/${item.weatherIcon}.svg`"
            alt="user"
            class="weather-card__type"
          />
        </div>

        <div class="weather-card__temperature">{{ item.temperature }}&degC</div>

        <span lass="weather-card-card__condition">{{ item.condition }}</span>

        <div class="weather-card__max">
          Max.: {{ item.maxTemp }}&degC Min.: {{ item.minTemp }}&degC
        </div>
        <WeatherPanel
          :humidity="item.main.humidity"
          :pressure="item.main.pressure"
          :wind="item.wind.speed"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
.weather-card {
  &__content {
    width: 250px;
    background: @blue_gradient;
    padding: 40px;
    border-radius: 40px;
    color: @white;
    @media @bw450 {
      padding: 20px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
  }

  &__city {
    margin: 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__country {
    margin-right: 10px;
  }

  &__setting {
    margin-left: auto;
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

  &__picture {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }

  &__type {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: inline-block;
  }
}
</style>
