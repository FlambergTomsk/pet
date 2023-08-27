<template>
  <li
    class="accordion__item"
    :class="[
      {
        'accordion__item--active': visible,
      },
    ]"
    ref="refEl"
  >
    <header class="accordion__header" role="heading">
      <!-- Header slots -->

      <div class="accordion__header-btn" @click="toggle">
        <slot name="custom_header"></slot>

        <h4 v-if="!$slots.custom_header" class="accordion__title">
          <slot name="title"></slot>
        </h4>

        <div class="accordion__icon">
          <div class="accordion__plus"></div>
        </div>
      </div>
    </header>

    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
    >
      <div
        class="accordion__slide"
        v-show="visible"
        :aria-hidden="visible ? 'false' : 'true'"
        @click="toggle"
      >
        <div class="accordion__content">
          <!-- Content slot -->
          <slot></slot>
        </div>
      </div>
    </transition>
  </li>
</template>

<script setup>
const accordion = inject("accordion");
const refEl = ref(null);

let index = ref(null);
let isActive = ref(false);

let visible = computed(() => index.value == accordion.active || isActive.value);
index.value = accordion.count++;

function open() {
  isActive.value = true;
  accordion.active = index.value;
}

function close() {
  isActive.value = false;
  accordion.active = null;
}

function toggle() {
  if (visible.value) {
    close();
  } else {
    open();
  }
}

//hooks
function beforeEnter(el) {
  el.style.height = 0;
}

function enter(el) {
  el.style.height = el.scrollHeight + "px";
}

function afterEnter(el) {
  el.style.height = "";
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + "px";
  nextTick(() => {
    el.style.height = 0;
  });
}

defineExpose({
  refEl: refEl,
  open: open,
});
</script>
