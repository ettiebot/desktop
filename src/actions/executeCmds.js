import soundsStore from "@/stores/sounds.store";
const ipcRenderer = window.require("electron").ipcRenderer;

export async function executeCommand(intentName, parameters, data) {
  if (intentName === "findInApp") {
    let url;
    if (data.video) url = data.video.results[0]?.contentUrl;
    else if (data.recipes) url = data.recipes[0].url;
    soundsStore.play("respond.ok");
    if (url) window.open(url, "_blank");
  } else if (intentName === "findInSearch") {
    const url = parameters.searchUrl?.stringValue;
    soundsStore.play("respond.ok");
    if (url) window.open(url, "_blank");
  } else if (intentName === "openWebsite") {
    const url = parameters.siteURL?.stringValue;
    if (url) window.open(url, "_blank");
  } else if (intentName === "openBrowser") {
    soundsStore.play("respond.ok");
    window.open("https://you.com", "_blank");
  } else if (intentName === "pcPower") {
    const powerState = parameters.powerState?.stringValue;
    const device = parameters.device?.stringValue;

    soundsStore.play("respond.ok");

    if (device === "computer") {
      if (powerState === "off") {
        setTimeout(() => ipcRenderer.postMessage("pcPower", "shutdown"), 3000);
      } else if (powerState === "reboot") {
        setTimeout(() => ipcRenderer.postMessage("pcPower", "reboot"), 3000);
      }
    }
  } else if (intentName === "sound") {
    const action = parameters.soundAction?.stringValue;

    soundsStore.play("respond.ok");

    if (action === "up") {
      ipcRenderer.postMessage("sound", { a: "mute", p: false });
      ipcRenderer.postMessage("sound", { a: "set", p: 20 });
    } else if (action === "down") {
      ipcRenderer.postMessage("sound", { a: "mute", p: false });
      ipcRenderer.postMessage("sound", { a: "set", p: -20 });
    } else if (action === "off") {
      ipcRenderer.postMessage("sound", { a: "mute", p: true });
    } else if (action === "on") {
      ipcRenderer.postMessage("sound", { a: "mute", p: false });
    } else if (action === "at") {
      const percentage = parameters.percentage?.stringValue;
      const percent = Number(percentage.match(/\d/g).join(""));
      ipcRenderer.postMessage("sound", { a: "setTotal", p: percent });
    } else if (action === "max") {
      ipcRenderer.postMessage("sound", { a: "setTotal", p: 100 });
    }
  }
}
