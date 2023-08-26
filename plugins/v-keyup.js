export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("keyup", {
    mounted: function (el, binding) {
      binding.dir.f = function (evt) {
        binding.value(evt, el);
      };
      document.addEventListener("keyup", binding.dir.f);
    },
    unmounted(el, binding) {
      document.removeEventListener("keyup", binding.dir.f);
    }
  })
})