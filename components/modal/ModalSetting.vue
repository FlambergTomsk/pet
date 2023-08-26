<template>
  <teleport to="body">
    <Transition>
      <div v-if="isActive" class="modal" v-keyup="onEsc">
        <div class="modal__container modal__container--setting">
          <header class="modal__header">
            <button
              class="modal__button-close"
              type="button"
              @click="closeModal"
            >
              <SvgIcon name="cross" width="12" height="12" />
            </button>
          </header>

          <div class="modal__content">
            <div class="modal-setting">
              <h4 class="modal-setting__title">
                {{ $t("modal.setting") }}
              </h4>
              <WeatherSelect />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup>
const { $emitter, $t } = useNuxtApp();
const store = useStore();

const isActive = computed(() => {
  return store.modal.setting;
});

const showModal = () => {
  store.modal.setting = true;
};

const closeModal = () => {
  store.modal.setting = false;
};

const onEsc = (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    closeModal();
  }
};

$emitter.on("showSettingModal", showModal);
</script>

<style lang="less">
.modal-setting {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    margin: 0 0 20px 0px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 26px;

    @media @bw600 {
      font-size: 20px;
    }
  }

  &__block-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    width: 96px;
    margin-bottom: 30px;

    &--error {
      .modal-info__icon {
        color: red;
        transform: scale(1, -1);
      }

      .modal-info__spot {
        color: red;
      }
    }
  }

  &__spot {
    position: absolute;
    color: green;
  }

  &__icon {
    color: green;
  }

  &__button {
    max-width: 237px;
    width: 100%;
    @media @bw450 {
      max-width: 100%;
    }
  }
}
</style>
