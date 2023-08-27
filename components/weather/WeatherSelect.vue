<template>
  <form @submit="onSubmit" class="form">
    <fieldset
      class="form__clone-group"
      v-for="(field, idx) in fields"
      :key="idx"
    >
      <FieldSelect
        @getOptions="getOptions"
        class="form__field form__select"
        :config="{
          name: `cities[${idx}]`,
          label: $t('modal.city_choose'),
          optionLabel: 'name',
          optionValue: 'id',
          searchLength: searchLength,
          searchable: true,
          rules: {
            required: true,
          },
        }"
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

const { handleSubmit, submitCount } = useForm({
  initialValues: {
    cities: storeCity.currentCities,
  },
});

const { fields, push, remove } = useFieldArray("cities");

const onSubmit = handleSubmit((formValues) => {
  console.log(formValues);
  let fullWeatherInfo = {};

  // currentOptionsArray.value.forEach((el) => {
  //   if (el.id === formValues.cities[0].name) {
  //     fullWeatherInfo = el;
  //   }
  // });

  // console.log(fullWeatherInfo);

  storeCity.setCities(formValues.cities);
  store.modal.setting = false;
});

const currentOptionsArray = ref([]);

const getOptions = (array) => {
  currentOptionsArray.value = array;
};

const searchLength = 3;
</script>
