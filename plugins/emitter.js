import mitt from "mitt";
const emitter = mitt();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("emitter", {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit
  });
});
