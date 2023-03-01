import localStorageKeys from "@/consts/localStorageKeys";
import { reactive } from "vue";

export default reactive({
  config: null,

  fetchConfig() {
    const config = localStorage.getItem(localStorageKeys.config);
    this.config = config ? JSON.parse(config) : null;
  },

  saveConfig() {
    localStorage.setItem(localStorageKeys.config, JSON.stringify(this.config));
  },
});
