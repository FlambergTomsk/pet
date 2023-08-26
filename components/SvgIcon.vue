<template>
  <component
    v-if="iconPath"
    class="svg-icon"
    :is="iconPath"
    :width="width"
    :height="height"
  />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
});

const iconPath = shallowRef(null);

const calcPath = () => {
  iconPath.value = props.name
    ? defineAsyncComponent(() => import(`@/assets/svg-icons/${props.name}.svg`))
    : null;
};

watch(
  () => props.name,
  () => {
    calcPath();
  },
  { immediate: true }
);
</script>
