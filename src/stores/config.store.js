import { reactive } from "vue";
const fs = window.require("fs");

const resourcesPath = window.process.argv
  .find((d) => d.includes("resources-path"))
  .split("=")[1];
const configPath = (resourcesPath || ".") + "/config.json";

export default reactive({
  config: null,
  $: null,

  fetchConfig() {
    try {
      this.config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (_) {
      //
    }
  },

  saveConfig() {
    try {
      fs.writeFileSync(configPath, JSON.stringify(this.config));
    } catch (_) {
      //
    }
  },
});
