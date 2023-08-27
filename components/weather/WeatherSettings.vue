<template>
  <button
      class="setting"
      @click="showSettingModal"
  >
    <SvgIcon name="gear" width="28" height="28" class="setting__gear" />
  </button>

</template>

<script setup>

const { $emitter } = useNuxtApp();

const showSettingModal = () => {
  $emitter.emit("showSettingModal");
};

</script>

<style scoped lang="less">
.setting {
  color: @white;
  width: 28px;
  height: 28px;
  animation: rotate 2s linear infinite;
  animation-play-state: paused;

  &:hover {
    @media (hover: hover) {
      animation-play-state: running;
    }
  }
}

@keyframes rotate {
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

</style>