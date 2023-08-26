
export const useStore = defineStore("index", {
  state: () => ({
    modal: {
      setting: false,
    },
  }),
  getters: {
    getModal: (state) => {
      return Object.values(state.modal).find((item) => {
        return item;
      });
    }
  },
  actions: {
    closeAll() {
      const { $emitter } = useNuxtApp();
      $emitter.emit("closeNav");

      Object.keys(this.modal).forEach((key) => {
        this.modal[key] = false;
      });
    },
  }
});
