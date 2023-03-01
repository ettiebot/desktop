import soundsStore from "@/stores/sounds.store";
const loudness = window.require("loudness");
const ipcRenderer = window.require("electron").ipcRenderer;

const searchUrls = {
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  yandex: "https://yandex.com/search/?text=",
};

const findTriggerPlatforms = {
  instagram: "instagram.com",
  youtube: "youtube.com",
  vimeo: "vimeo.com",
  twitter: "twitter.com",
  facebook: "facebook.com",
  reddit: "reddit.com",
  pinterest: "pinterest.com",
  tiktok: "tiktok.com",
  twitch: "twitch.com",
  github: "github.com",
  linkedin: "linkedin.com",
};

const siteUrls = {
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
  soundcloud: "https://soundcloud.com/",
  netflix: "https://www.netflix.com/",
  vimeo: "https://vimeo.com/",
  twitter: "https://twitter.com/",
  facebook: "https://www.facebook.com/",
  reddit: "https://www.reddit.com/",
  pinterest: "https://www.pinterest.com/",
  tiktok: "https://www.tiktok.com/",
  twitch: "https://www.twitch.tv/",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  spotify: "https://open.spotify.com/",
  googleMaps: "https://www.google.com/maps/",
  yandexMaps: "https://yandex.com/maps/",
  googleTranslate: "https://translate.google.com/",
  yandexTranslate: "https://translate.yandex.com/",
  googleDrive: "https://drive.google.com/",
  telegram: "https://web.telegram.org/",
};

export async function executeSoundCmd(act, opts) {
  const volAction = opts["sound-volume-action"].stringValue?.trim();
  const percentString = opts.percentage.stringValue.trim();

  if (act === "volume") {
    soundsStore.play("respond.ok");

    // Volume at ..%
    if (percentString) {
      const percent = Number(percentString.match(/\d/g).join(""));
      if (percent > 0) {
        await loudness.setMuted(false);
        await loudness.setVolume(percent);
      } else if (percent === 0) {
        await loudness.setMuted(true);
      }
    } else {
      console.log(volAction);
      switch (volAction) {
        case "on":
          await loudness.setMuted(false);
          break;
        case "off":
          await loudness.setMuted(true);
          break;
        case "up":
          await loudness.setMuted(false);
          await loudness.setVolume((await loudness.getVolume()) + 20);
          break;
        case "down":
          await loudness.setMuted(false);
          await loudness.setVolume((await loudness.getVolume()) - 20);
          break;
        case "max":
          await loudness.setMuted(false);
          await loudness.setVolume(100);
          break;
      }
    }
  }
}

export async function executeShutdownPCCmd() {
  soundsStore.play("respond.ok");
  setTimeout(() => ipcRenderer.postMessage("pcPower", "shutdown"), 3000);
}

export async function executeRestartPCCmd() {
  soundsStore.play("respond.ok");
  setTimeout(() => ipcRenderer.postMessage("pcPower", "reboot"), 3000);
}

export async function executeOpenBrowserPCCmd(act) {
  if (act === "open_browser") {
    soundsStore.play("respond.ok");
    window.open("https://www.you.com", "_blank");
  }
}

export async function executeLockPCCmd() {
  soundsStore.play("respond.ok");

  // TODO
}

export async function executeFindInSearchCmd(text, opts) {
  soundsStore.play("respond.ok");

  const searchEngine = opts["search-engine"].stringValue?.trim();
  const searchUrl =
    (searchUrls[searchEngine] || searchUrls.google) + encodeURIComponent(text);
  window.open(searchUrl, "_blank");
}

// TODO: Find a package solution
// export async function executeWindowManageCmd(windowName, opts) {
//   const action = opts["window-manage-action"].stringValue?.trim();
//   soundsStore.play("respond.ok");

//   const windows = windowManager.getWindows();
//   const window = windows.find((w) => w.path.includes(windowName));
//   console.log(window, action, windowName);

//   if (window) {
//     if (action === "minimize") window.minimize();
//     else if (action === "maximize") window.maximize();
//     else if (action === "show") window.show();
//     else if (action === "hide") window.hide();
//     // else if (action === "close") window.close();
//   }

//   console.log(window, windowName, opts);
// }

export async function executeFindTriggerCmd(payload, opts) {
  const platform = opts["find-trigger-platform"].stringValue?.trim();
  let url;

  soundsStore.play("respond.ok");

  if (platform)
    url = payload.youChatSerpResults?.find((r) =>
      r.url.includes(findTriggerPlatforms[platform.toLowerCase()])
    )?.url;
  else url = payload.youChatSerpResults?.[0]?.url;
  if (url) window.open(url, "_blank");
}

export async function executeOpenSiteCmd(payload, opts) {
  const siteName = opts["open-site"].stringValue?.trim();
  const siteUrl = siteUrls[siteName?.toLowerCase()];
  soundsStore.play("respond.ok");
  if (siteUrl) window.open(siteUrl, "_blank");
}
