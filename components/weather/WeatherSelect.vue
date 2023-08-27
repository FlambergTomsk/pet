<template>
  <form @submit="onSubmit" class="form">
    <fieldset
      class="form__clone-group"
      v-for="(field, idx) in fields"
      :key="field.key + idx"
    >
      <FieldSelect
        class="form__field form__select"
        :config="{
          name: `cities[${idx}].city.name`,
          label: $t('modal.city_choose'),
          optionLabel: 'name',
          optionValue: 'id',
          searchLength: searchLength,
          searchable: true,
          rules: {
            required: true
          }
        }"
        @change="(options) => updateField(options, idx)"
        :submitCount="submitCount"
      />

      <button
        type="button"
        @click="remove(idx)"
        class="form__delete-set"
        :disabled="fields.length === 1"
      >
        <svg-icon name="trash" width="24" height="20" />
      </button>
    </fieldset>

    <div class="form__buttons">
      <button
        v-if="fields.length < searchLength"
        type="button"
        @click="push({})"
        class="form__btn btn btn--small btn--sky"
      >
        {{ $t("buttons.add") }}
      </button>

      <button
        type="submit"
        class="form__btn btn btn--small btn--blue btn--right"
      >
        {{ $t("buttons.save") }}
      </button>
    </div>
  </form>
</template>
<script setup>
import { useForm, useFieldArray } from "vee-validate";

const storeCity = useStoreCity();
const store = useStore();

const { handleSubmit, submitCount, values, setFieldValue } = useForm({
  initialValues: {
    cities: storeCity.currentCities || [{}]
  }
});

const { fields, push, remove } = useFieldArray("cities");

const onSubmit = handleSubmit((formValues) => {
  storeCity.setCities(formValues.cities);
  store.modal.setting = false;
});
const updateField = (val, idx) => {
  setFieldValue(`cities[${idx}].city`, val);
};

watch(
  () => values,
  (val) => console.log(val),
  {
    immediate: true,
    deep: true
  }
);
const searchLength = 3;
</script>
