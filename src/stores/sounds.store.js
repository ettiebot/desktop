import { reactive } from "vue";
import { Howl } from "howler";

export default reactive({
  extPlaying: null,
  lib: {},
  libPaths: {
    "rec.start": "/audio/recorder/start.ogg",
    "rec.stop": "/audio/recorder/stop.ogg",
    "respond.ok": "/audio/respond/ok.opus",
    "respond.off": "/audio/respond/off.opus",
    "listen.here": "/audio/listen/im_here.opus",
    "listen.notSleeping": "/audio/listen/im_not_sleeping.opus",
    "listen.listening": "/audio/listen/listening.opus",
  },

  async load() {
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
