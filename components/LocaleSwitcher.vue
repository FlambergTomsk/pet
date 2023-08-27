<template>
  <div class="switcher">
    <span
        class="switcher__button"
        :class="{'switcher__button_active': locale==='en'}"
        @click="changeLocale('en')">
      Eng
    </span>
    <label class="switcher__switch">
      <input type="checkbox" v-model="checkbox" @change="changeLocale">
      <span class="switcher__slider"></span>
    </label>
    <span
        class="switcher__button"
        :class="{'switcher__button_active': locale==='ru'}"
        @click="changeLocale('ru')">
      Rus
    </span>
  </div>
</template>

<script setup>

import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const checkbox = ref(locale.value === 'ru' )

const changeLocale = (event) => {
  locale.value = event.target.checked? 'ru' : 'en'
}

</script>

<style scoped lang="less">
.switcher {
  display: flex;
  align-items: center;
  font-size: 20px;
  &__button{
    color: @dark_50;
    &_active {
      color: @dark;
      font-weight: 700;
    }
  }
  &__switch {
    position: relative;
    display: inline-block;
    width: 51px;
    height: 25px;
    margin: 0 10px;
    input {
      opacity: 0;
      width: 0;
      height: 0;
      &:checked + .switcher__slider {
        &:before {
          -webkit-transform: translateX(23px);
          -ms-transform: translateX(23px);
          transform: translateX(23px);
        }
      }
      &:focus + .switcher__slider {
        box-shadow: 0 0 1px @blue;
      }
    }
  }
  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: @blue;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 25px;
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 3px;
      background-color: @white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
  }
}

</style>