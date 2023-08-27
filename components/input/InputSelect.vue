<template>
  <v-select
    class="vs"
    v-model="innerValue"
    :reduce="(option) => (typeof option === 'object' ? option : option)"
    :label="optionLabel"
    :options="options"
    :disabled="disabled"
    :placeholder="placeholder"
    :clearable="clearable"
    :searchable="searchable"
    :clearSearchOnBlur="() => clearSearchOnBlur"
    :closeOnSelect="closeOnSelect"
    :deselectFromDropdown="false"
    :selectable="
      (option) => {
        if (typeof option !== 'object') return true;
        return !option.disabled;
      }
    "
    :loading="loading"
    :class="{
      'vs--has-value': hasValue || loading,
      'vs--clearable': clearable
    }"
    @option:selected="update"
    @search="onSearch"
  >
    <template #header v-if="label">
      <span class="vs__label"> {{ label }}</span>
    </template>
    <template #open-indicator="{ attributes }">
      <button type="button" class="vs__open-indicator-btn">
        <SvgIcon v-bind="attributes" name="arrow-down" width="20" height="30" />
      </button>
    </template>

    <template #selected-option-container="{ option, deselect, multiple }">
      <div class="vs__selected">
        <div
          v-if="!hideSelectedText"
          class="vs__selected-text"
          :class="{ 'vs__selected-text--disabled': disabled }"
        >
          {{ option[optionLabel] }}
        </div>
      </div>
    </template>

    <template v-slot:no-options="{ searching }">
      <div class="vs__no-options">
        <span v-if="searching">
          {{ loading ? $t("common.searching") : $t("common.no_matches") }}
        </span>
      </div>
    </template>

    <template #option="option">
      <slot name="option" :option="option"></slot>
    </template>
  </v-select>
</template>
<script setup>
const { $request } = useNuxtApp();
const props = defineProps({
  modelValue: {
    type: [String, Number, Object]
  },
  config: {
    type: Object,
    default: () => ({}),
    required: true
  },
  hasValue: {
    type: Boolean
  }
});

const emits = defineEmits(["update:modelValue"]);

const innerValue = ref(props.modelValue);
const config = reactive(props.config);

//config options

const label = computed(() => {
  return (typeof config.label === "string" && config.label) || undefined;
});

const placeholder = computed(() => {
  return (
    (typeof config.placeholder === "string" && config.placeholder) || undefined
  );
});

const options = computed(() => {
  return Array.isArray(ajaxOptions.value)
    ? ajaxOptions.value
    : (Array.isArray(config.options) && config.options) || [];
});
const disabled = computed(() => {
  return typeof config.disabled === "boolean" && config.disabled;
});

const clearable = computed(() => {
  return typeof config.clearable === "boolean" ? config.clearable : true;
});

const hideSelectedText = computed(() => {
  return typeof config.icons === "boolean" && config.hideSelectedText;
});

const searchable = computed(() => {
  return typeof config.searchable === "boolean" ? config.searchable : true;
});

const clearSearchOnBlur = computed(() => {
  return typeof config.clearSearchOnBlur === "boolean"
    ? config.clearSearchOnBlur
    : true;
});

const closeOnSelect = computed(() => {
  return typeof config.closeOnSelect === "boolean"
    ? config.closeOnSelect
    : true;
});

const optionLabel = computed(() => {
  return (
    (typeof config.optionLabel === "string" && config.optionLabel) || "label"
  );
});

const searchLength = computed(() => {
  return typeof config.searchLength === "number" && config.searchLength;
});
//search

const loading = ref(false);
const searchTimeout = ref(false);

const onSearch = (search) => {
  clearTimeout(searchTimeout.value);

  if (search.length >= searchLength.value) {
    searchTimeout.value = setTimeout(function () {
      getOptions(search);
    }, 300);
  }
};

// methods
const configure = useRuntimeConfig();

const ajaxOptions = ref(null);

const getOptions = (search) => {
  loading.value = true;
  $request({
    url: `${configure.public.cities_url}/search-regions?searchTerm=${search}`,
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: configure.public.cities_key
    }
  }).then((data) => {
    ajaxOptions.value = Array.isArray(data) ? data : [];
    loading.value = false;
  });
};
const update = (val) => {
  emits("update:modelValue", { reduced: val.id, value: val });
};
</script>
