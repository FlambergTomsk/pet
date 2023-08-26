<template>
  <div class="panel">
    <div class="panel__content">
      <div class="panel__item">
        <SvgIcon
          :name="'humidity'"
          width="18"
          height="18"
          class="panel__icon"
        />
        <div class="panel__value">{{ normalizeHumidity }}%</div>
      </div>

      <div class="panel__item">
        <SvgIcon
          :name="'preassure'"
          width="18"
          height="18"
          class="panel__icon"
        />
        <div class="panel__value">
          {{ normalizePressure }}
        </div>
        mmHg
      </div>

      <div class="panel__item">
        <SvgIcon :name="'wind'" width="18" height="18" class="panel__icon" />
        <div class="panel__value">
          {{ normalizeWind }}
        </div>
        m/s
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  wind: {
    type: Number,
    default: 0,
  },
  humidity: {
    type: Number,
    default: 0,
  },
  pressure: {
    type: Number,
    default: 0,
  },
});

const normalizePressure = computed(() => {
  return Math.floor(props.pressure * 0.75);
});

const normalizeWind = computed(() => {
  return Math.floor(props.wind);
});

const normalizeHumidity = computed(() => {
  return Math.floor(props.humidity);
});
</script>

<style lang="less" scoped>
.panel {
  &__content {
    margin-top: 30px;
    border-radius: 20px;
    background: @black_50;
    box-shadow: @shadow;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @white;
    min-width: 0;
  }

  &__item {
    color: #fff;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
}
</style>
