import { reactive } from "vue";
import { Howl } from "howler";
import configStore from "./config.store";

export default reactive({
  extPlaying: null,
  lib: {},
  libPaths: {},

  async load() {
    const lang = configStore.config ? configStore.config.language : "en";
    this.libPaths = {
      "rec.start": `/audio/recorder/start.ogg`,
      "rec.stop": `/audio/recorder/stop.ogg`,
      "respond.ok": `/audio/respond/${lang}/ok.opus`,
      "respond.off": `/audio/respond/${lang}/off.opus`,
      "listen.here": `/audio/listen/${lang}/im_here.opus`,
      "listen.notSleeping": `/audio/listen/${lang}/im_not_sleeping.opus`,
      "listen.listening": `/audio/listen/${lang}/listening.opus`,
    };

    Object.keys(this.libPaths).forEach((key) => {
      const path = this.libPaths[key];

      this.lib[key] = new Howl({
        src: path,
        preload: true,
      });
    });
  },

  play(key) {
    this.lib[key].play();
  },

  playExt(path) {
    this.extPlaying = new Howl({
      src: path,
      preload: true,
    });

    this.extPlaying.play();
  },
});
