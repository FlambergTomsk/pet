<template>
  <div class="field" :class="{ 'field--disabled': disabled }">
    <div class="field__wrap field__wrap--tr">
      <InputSelect
        class="field__select"
        :class="{ 'field__select--has-error': errorMessage && submitCount }"
        :modelValue="value"
        :hasValue="hasValue"
        :config="config"
        @update:modelValue="onUpdate"
      />
    </div>
    <div v-if="errorMessage && submitCount" class="field__error error-msg">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const emits = defineEmits(["change"]);

const props = defineProps({
  initialValue: {
    default: undefined
  },
  config: {
    type: Object,
    default: () => ({}),
    required: true
  },
  submitCount: {
    type: Number,
    default: 0
  }
});

const config = reactive(props.config);

const name = computed(() => {
  return (typeof config.name === "string" && config.name) || undefined;
});

const rules = computed(() => {
  return (typeof config.rules === "object" && config.rules) || {};
});

const label = computed(() => {
  return (typeof config.label === "string" && config.label) || undefined;
});

const disabled = computed(() => {
  return typeof config.disabled === "boolean" && config.disabled;
});

//field
const { value, errorMessage } = useField(name.value, rules.value, {
  initialValue: props.initialValue,
  label: label.value ? `«${label.value}»` : " "
});

const onUpdate = (options) => {
  value.value = options.reduced;
  emits("change", options.value);
};

const hasValue = ref(false);

watch(
  () => value.value,
  () => {
    hasValue.value = value.value || value.value === 0 ? true : false;
  },
  { immediate: true }
);
</script>

<style src="vue-select/dist/vue-select.css"></style>
