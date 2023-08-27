<template>
  <div class="weather">
    <div class="weather__content">
      <div class="weather__header">
        <SvgIcon name="map" width="24" height="24" class="weather__map" />

        <div class="weather__city">{{ item.city }},</div>

        <div class="weather__country">
          {{ item.countryCode }}
        </div>

        <button
          v-if="isFirst"
          @click="showSettingModal"
          class="weather__setting"
        >
          <SvgIcon name="gear" width="28" height="28" class="weather__gear" />
        </button>
      </div>
      <div class="weather__main">
        <SvgIcon
          v-if="item.weatherIcon"
          :name="item.weatherIcon"
          width="150"
          height="150"
          class="weather__type"
        />

        <div class="weather__temperature">{{ item.temperature }}&deg</div>

        <span lass="weather__condition">{{ item.condition }}</span>

        <div class="weather__max">
          Max.: {{ item.maxTemp }}&deg Min.: {{ item.minTemp }}&deg
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

const { $emitter } = useNuxtApp();

const showSettingModal = () => {
  $emitter.emit("showSettingModal");
};
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__country {
    margin-right: 10px;
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

  &__setting {
    width: 28px;
    height: 28px;
    animation: example 2s linear infinite;
    animation-play-state: paused;

    &:hover {
      @media (hover: hover) {
        animation-play-state: running;
      }
    }
  }

  @keyframes example {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
