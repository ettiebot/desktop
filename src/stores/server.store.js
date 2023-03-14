import { reactive } from "vue";
import configStore from "./config.store";
import soundsStore from "./sounds.store";
import { executeCommand } from "@/actions/executeCmds.js";
import axios from "axios";
import recorderStore from "./recorder.store.js";

export default reactive({
  data: {
    history: [],
    user: null,
  },

  api: null,

  async init() {
    if (!configStore.config?.token) return;
    this.api = axios.create({
      baseURL:
        window.process.argv
          .find((a) => a.includes("server-url"))
          ?.split("=")[1] + "/api",
      headers: {
        "x-token": configStore.config.token,
      },
    });
    recorderStore.state = null;
  },

  async synthText(text) {
    const payload = { t: Buffer.from(text, "utf8").toString("base64") };

    const b64 = await this.api
      .post("/synth", payload)
      .then((res) => res.data.s);

    soundsStore.playExt(`data:audio/ogg;base64,${b64}`);
  },

  async sendVoice(voice) {
    const form = new FormData();
    form.append("file", new Blob([voice], { type: "audio/ogg" }));

    this.api
      .post("/voice", form)
      .then((res) => res.data)
      .then((res) => {
        if (res.intentName) {
          this.onCommandPayload(res);
        } else {
          this.data.history.push(res.result);
          return this.synthText(res.result.text);
        }
      })
      .then(() => (recorderStore.state = null))
      .catch((e) => {
        recorderStore.state = null;
        this.data.history.push({
          query: ":(",
          text: e.response.data?.message ?? "Unknown error",
        });
      });
  },

  async onCommandPayload(res) {
    const { intentName, parameters, data } = res;
    try {
      await executeCommand(intentName, parameters, data);
    } catch (e) {
      console.error(e);
    }
  },
});
