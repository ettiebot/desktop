import localStorageKeys from "@/consts/localStorageKeys";
import { reactive } from "vue";

export default reactive({
  micDevice: null,
  micDevices: [],

  fetchFromConfig() {
    this.micDevice = localStorage.getItem(localStorageKeys.micDevice);
  },

  async fetchDevices() {
    await navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.micDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
    });
  },

  async setMicDevice(deviceId) {
    this.micDevice = deviceId;
    localStorage.setItem(localStorageKeys.micDevice, deviceId);
  },
});
