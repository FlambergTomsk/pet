<template>
  <div class="empty">
    <div class="empty__content">
      <div class="empty__header">
        <WeatherSettings class="empty__setting"/>
      </div>
      <div class="empty__main">
        {{ $t('common.no_data') }}
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="less">
.empty {
  width: 250px;
  background: @blue_gradient;
  padding: 40px;
  border-radius: 40px;
  color: @white;
  &__header {
    display: flex;
    align-items: center;
  }
  &__setting {
    margin-left: auto;
  }
  &__main{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 400;
    min-height: 373px;
  }

}

</style>