<template>
  <div class="page">
    <div class="page__content">
      <div class="ui-kit">
        <h2>Ui-kit</h2>
        <div class="ui-kit__buttons">
          <button type="button" class="ui-kit__btn btn">Button</button>
          <button type="button" class="ui-kit__btn btn" disabled>
            Button disabled
          </button>
          <button type="button" class="ui-kit__btn btn btn--outline">
            Button outline
          </button>
          <button type="button" class="ui-kit__btn btn btn--outline" disabled>
            Button outline disabled
          </button>
        </div>
        <div>
          {{ $t("header.title") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less">
.page {
  max-width: 1920px;
  margin: 0 auto;
}
.ui-kit {
  &__buttons {
    display: flex;
  }
  &__btn {
    margin-top: 20px;
    margin-right: 20px;
  }
}
</style>
