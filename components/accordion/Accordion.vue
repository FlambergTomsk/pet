<template>
  <ul
    class="accordion"
  >
    <slot></slot>
  </ul>
</template>

<script setup>
//determinants
const props = defineProps({
  active: {
    type: Number
  },

});

//variables
const accordion = reactive({
  count: 0,
  active: props.active,
});
provide("accordion", accordion);

watch(
  () => accordion.active,
  (value) => {
    accordion.active = value;
  }
);
</script>

<style lang="less">
.accordion {
  list-style: none;
  margin: 0;
  padding: 0;

  &--lc-border-none {
    .accordion__item:last-child {
      border-bottom: none;
    }
  }

  &__item {
    position: relative;
    border-bottom: 1px solid @black_25;

    &--active {
      & .accordion__plus::before {
        transform: rotate(0);
        opacity: 0;
      }

      & .accordion__arrow {
        transform: scale(1, -1);
      }

      & .accordion__title {
        color: @blue_90;
      }

      & .accordion__icon {
        background-color: @blue_90;
      }
    }

    &--no-border {
      border-bottom: none;
    }

    &--arrow-icon {
      & .accordion__icon {
        width: 12px;
        height: 8px;
        // margin-top: 2px;
        background-color: transparent;

        transition: transform 0.3s;

        &::before {
          display: none;
        }
      }
    }
  }

  &__header {
    display: flex;
  }

  &__header-btn {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    cursor: pointer;

    &:hover {
      @media (hover: hover) {
        .accordion__title {
          color: @blue;
        }
      }
    }

    &:active {
      .accordion__title {
        color: @blue;
      }
    }

    &--no-active {
      cursor: default;
      pointer-events: none;

      &:hover {
        @media (hover: hover) {
          .accordion__title {
            color: inherit;
          }
        }
      }

      .accordion__icon {
        opacity: 0;
      }
    }
  }

  &__title {
    margin: 0 20px 0 0;
    font-size: 16px;
    font-weight: 700;
    color: @black;
    transition: color 0.3s;
  }

  &__icon {
    flex-shrink: 0;
    margin-left: 10px;
  }

  &__arrow {
    display: block;
    transition: transform 0.3s
  }

  &__plus {
    display: block;
    width: 16px;
    height: 2px;
    background-color: @black;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: @black;
      opacity: 1;
      transform: rotate(-90deg);
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
  }

  &__slide {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;

    &--ipa {
      flex-direction: row;
      column-gap: 20px;
      row-gap: 10px;
      flex-wrap: wrap;
    }

    &--w100 {
      width: 100%;
    }
  }

  &__info-text {
    margin: 30px 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.2;
    color: @black;
  }

  &__status {
    display: inline-block;
    margin-top: 5px;
    box-sizing: border-box;
    padding: 4px 13px;
    border-radius: 10px;

    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    line-height: 1;
    color: @white;
  }

  &__text {
    margin: 0 0 15px;
    font-size: 14px;
    line-height: 1.2;
    color: @black;
    &:only-child,
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__btn {
    align-self: flex-start;
  }

  &__table {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0px;
    }
  }

  &__content {
    padding-bottom: 30px;
    //attached
    .accordion {
      &__header-btn {
        padding: 17px 0;
      }
      &__content {
        padding-top: 10px;
        padding-bottom: 20px;
      }
    }
  }
}

//transitions
.accordion {
  &-enter-from,
  &-leave-active {
    opacity: 0;
  }
}
</style>
