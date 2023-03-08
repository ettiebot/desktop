import b64arb from "../utils/b64arb.utils.js";
import { reactive } from "vue";
import configStore from "./config.store";
import recorderStore from "./recorder.store";
import soundsStore from "./sounds.store";
import { executeCommand } from "@/actions/executeCmds.js";

export default reactive({
  socket: null,
  data: {
    history: [],
    user: null,
  },

  async init() {
    if (!configStore.config?.token) return;

    const serverURL = window.process.argv
      .find((a) => a.includes("server-url"))
      ?.split("=")[1];
    if (!serverURL) return;

    this.socket = new WebSocket(
      [
        serverURL,
        "?" +
          new URLSearchParams({
            uid: configStore.config.token,
            lang: configStore.config.language,
            useTranslate: configStore.config.useTranslate,
            useHistory: configStore.config.useHistory,
          }).toString(),
      ].join("/"),
      "echo-protocol"
    );

    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onDisconnection.bind(this);
    this.socket.onerror = this.onDisconnection.bind(this);
  },

  onDisconnection() {
    recorderStore.state = "unready";
  },

  handleMessage(payload) {
    const data = payload[1];
    switch (payload[0]) {
      case "auth":
        this.onAuth(data);
        break;
      case "response":
        recorderStore.state = null;
        this.onResponse(data);
        break;
      case "cmd":
        recorderStore.state = null;
        this.onCommandPayload(data);
        break;
      case "error":
        recorderStore.state = null;
        this.onError(data);
        break;
    }
  },

  async onAuth(user) {
    if (user) {
      recorderStore.state = null;
      this.data.user = user;
    }
  },

  async onResponse(res) {
    // Execute command or push result to history
    this.data.history.push(res.result);
  },

  async onBuffer(buf) {
    soundsStore.playExt(
      `data:audio/ogg;base64,${b64arb(await buf.arrayBuffer())}`
    );
  },

  onError(e) {
    switch (e) {
      case "no_results":
        this.data.history.push({
          text: configStore.$("errors.noResults"),
        });
        break;
      default:
        this.data.history.push({
          text: configStore.$("errors.unknown"),
        });
        throw new Error(e);
    }
  },

  onMessage(e) {
    if (typeof e.data === "string") {
      this.handleMessage(JSON.parse(e.data));
    } else {
      this.onBuffer(e.data);
    }
  },

  async sendVoice(voice) {
    this.socket.send(voice);
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
