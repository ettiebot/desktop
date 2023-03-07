import b64arb from "../utils/b64arb.utils.js";
import { reactive } from "vue";
import configStore from "./config.store";
import recorderStore from "./recorder.store";
import soundsStore from "./sounds.store";
import {
  executeFindInSearchCmd,
  executeFindTriggerCmd,
  executeLockPCCmd,
  executeOpenBrowserPCCmd,
  executeOpenSiteCmd,
  executeRestartPCCmd,
  executeShutdownPCCmd,
  executeSoundCmd,
} from "@/actions/executeCmds.js";

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
      Object.assign(this.data.user, {
        user,
        history: user.history ?? [],
      });
    }
  },

  async onResponse(res) {
    // Execute command or push result to history
    if (res.cmds) this.onCommandPayload(res.cmds, res.result);
    else this.data.history.push(res.result);
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
          text: "Я не поняла, что ты сказал(-а). Попробуй ещё раз.",
        });
        break;
      default:
        this.data.history.push({
          text: "Произошла неизвестная ошибка. Попробуй ещё раз.",
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

  async onCommandPayload(res, payload = {}) {
    const { type, act, opts } = res;
    try {
      if (type === "sound") await executeSoundCmd(act, opts);
      else if (type === "shutdown-pc") await executeShutdownPCCmd();
      else if (type === "restart-pc") await executeRestartPCCmd();
      else if (type === "open-browser") await executeOpenBrowserPCCmd(act);
      else if (type === "lock-pc") await executeLockPCCmd();
      else if (type === "find-in-search")
        await executeFindInSearchCmd(act, opts);
      else if (type === "find-trigger")
        await executeFindTriggerCmd(payload, opts);
      else if (type === "open-site") await executeOpenSiteCmd(act, opts);
    } catch (e) {
      console.error(e);
    }
  },
});
