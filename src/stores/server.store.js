import b64arb from "../utils/b64arb.utils.js";
import { reactive } from "vue";
import { w3cwebsocket as WebSocketClient } from "websocket";
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
  serverUrl: "wss://api.ettie.uk/appws",
  socket: null,

  data: {
    history: [],
    user: null,
  },

  async init() {
    if (!configStore.config?.token) return;

    const params = new URLSearchParams({
      uid: configStore.config.token,
      lang: configStore.config.language,
      useTranslate: configStore.config.useTranslate,
      useHistory: configStore.config.useHistory,
    }).toString();

    this.socket = new WebSocketClient(
      `${this.serverUrl}/?${params}`,
      "echo-protocol"
    );

    this.socket.onopen = this.onConnection.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onDisconnection.bind(this);
    this.socket.onerror = this.onDisconnection.bind(this);
  },

  onConnection() {
    console.info("connected");
  },

  onDisconnection() {
    console.log("disconnected");
    recorderStore.state = "unready";

    setTimeout(() => this.init(), 3000);
  },

  onError(e) {
    console.error(e);
    recorderStore.state = null;
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
        break;
    }
  },

  onMessage(e) {
    if (typeof e.data === "string") {
      this.handleMessage(JSON.parse(e.data));
    }
  },

  handleMessage(payload) {
    const eventName = payload[0];
    const eventData = payload[1];
    switch (eventName) {
      case "auth":
        this.onAuth(eventData);
        break;
      case "voicing_payload":
        this.onVoicingPayload(eventData);
        break;
      case "cmd":
        this.onCommandPayload(eventData);
        break;
      case "error":
        this.onError(eventData);
        break;
    }
  },

  async onAuth(data) {
    this.data.user = data;
    if (this.data.user) recorderStore.state = null;
    if (data.history)
      this.data.history = data.history.map((h) => ({
        ...h,
        q: h.q.orig[0],
        a: h.a.norm[0],
      }));
  },

  async onVoicingPayload(res) {
    recorderStore.state = null;
    if (res.voice?.data)
      soundsStore.playExt(
        `data:audio/ogg;base64,${b64arb(Buffer.from(res.voice.data).buffer)}`
      );
    if (res.cmds) this.onCommandPayload(res.cmds, res.result);
    else this.data.history.push(res.result);
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
      // else if (type === "window-manage")
      //   await executeWindowManageCmd(act, opts);
      else if (type === "find-trigger")
        await executeFindTriggerCmd(payload, opts);
      else if (type === "open-site") await executeOpenSiteCmd(act, opts);
    } catch (e) {
      console.error(e);
    }
    recorderStore.state = null;
  },

  async sendVoice(voice) {
    this.socket.send(voice);
  },
});
