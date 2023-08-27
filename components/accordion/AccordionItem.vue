<template>
  <li
    v-click-outside="{ handler: closeOutside, isActive: clickOutside }"
    class="accordion__item"
    :class="[
      {
        'accordion__item--active': isExpandable
          ? isActive
          : visible && !isEmpty,
        'accordion__item--no-border': noBorder,
        'accordion__item--arrow-icon': arrowIcon
      }
    ]"
    ref="refEl"
  >
    <header class="accordion__header" role="heading">
      <!-- Header slots -->

      <div
        class="accordion__header-btn"
        :class="{ 'accordion__header-btn--no-active': isEmpty }"
        @click="toggle"
      >
        <slot name="custom_header"></slot>

        <h4 v-if="!$slots.custom_header" class="accordion__title">
          <slot name="title"></slot>
        </h4>

        <div class="accordion__icon">
          <SvgIcon
            v-if="arrowIcon"
            name="arrow-down"
            width="12"
            height="8"
            class="accordion__arrow"
          />
          <div v-else class="accordion__plus"></div>
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
        v-show="visible && !isEmpty"
        :aria-hidden="visible && !isEmpty ? 'false' : 'true'"
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

const props = defineProps({
  isExpanded: {
    type: Boolean
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  arrowIcon: {
    type: Boolean,
    default: false
  },
  clickOutside: {
    type: Boolean,
    default: false
  },
  clickOutsideDesktop: {
    type: Boolean,
    default: true
  },
  clickOutsideMobile: {
    type: Boolean,
    default: false
  }
});

let index = ref(null);
let isExpandable = ref(false);
let isActive = ref(false);

let visible = computed(
  () =>
    index.value == accordion.active || (isExpandable.value && isActive.value)
);
index.value = accordion.count++;

isExpandable.value = accordion.isExpandable;

if (isExpandable.value && props.isExpanded) isActive.value = true;

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

function closeOutside() {
  if (
    props.clickOutsideDesktop &&
    window.matchMedia("(min-width: 1020px)").matches
  )
    close();
  if (
    props.clickOutsideMobile &&
    window.matchMedia("(max-width: 1019px)").matches
  )
    close();
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
  open: open
});
</script>
