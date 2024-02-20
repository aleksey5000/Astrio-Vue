import { defineStore } from "pinia";
import TypeStore from "./TypeStore";

const useStore = defineStore("Store", {
  state(): TypeStore {
    return {
      brands: [],
      statesOfConfigurableCards: [],
      basket: [],
    };
  },
});

export default useStore;
