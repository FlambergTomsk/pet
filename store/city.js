export const useStoreCity = defineStore("city", {
  state: () => ({
    currentCities: JSON.parse(localStorage.getItem("cities") || "[]"),
  }),
  actions: {
    setCities(data) {
      this.currentCities = [];
      data.forEach((city) => {
        this.currentCities.push({
          id: city.id,
          latitude: city.latitude,
          longitude: city.longitude,
          name: city.name,
          countryCode: city.countryCode,
        });
      });
      localStorage.setItem("cities", JSON.stringify(this.currentCities));
    },
  },
});
