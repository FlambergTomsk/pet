export const useStoreCity = defineStore("city", {
  state: () => ({
    currentCities: [],
  }),
  actions: {
    setCities(data) {
      this.currentCities = [];
      data.forEach((item) => {
        this.currentCities.push({
          city: {
            id: item.city.id,
            latitude: item.city.latitude,
            longitude: item.city.longitude,
            name: item.city.name,
            countryCode: item.city.countryCode,
          },
        });
      });
      localStorage.setItem("cities", JSON.stringify(this.currentCities));
    },
  },
});
