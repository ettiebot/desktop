import { reactive } from "vue";
import soundsStore from "./sounds.store";
import serverStore from "./server.store";
import hardwareStore from "./hardware.store";

export default reactive({
  state: "unready",

  stream: null,
  recorder: null,
  speechEvents: null,

  btnScale: "scale(1)",

  speechDetectConfig: {
    threshold: -83,
    sendVoiceTimeout: 500,
  },

  visualizerConfig: {
    fftSize: 512,
    minDecibels: -127,
    maxDecibels: 0,
    smoothTime: 0.4,
    timerFreq: 50,
  },

  recorderConfig: {
    type: "audio",
    mimeType: "audio/webm;codec=opus",
    recorderType: window.MediaStreamRecorder,
    desiredSampRate: 48000,
    numberOfAudioChannels: 1,
    audioBitsPerSecond: 48000,
  },

  async fetchMicrophone() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        deviceId: {
          ...(hardwareStore.micDevice
            ? {
                deviceId: {
                  exact: hardwareStore.micDevice,
                },
              }
            : {}),
          echoCancellation: true,
        },
      },
    });
  },

  initRecorder() {
    hardwareStore.fetchFromConfig();
    this.recorder = window.RecordRTC(this.stream, this.recorderConfig);
  },

  initSpeechEvents() {
    const self = this;
    let stopped_speaking_timeout;

    this.speechEvents = window.hark(this.stream, {
      threshold: this.speechDetectConfig.threshold,
    });

    this.speechEvents.on("speaking", function () {
      if (self.recorder.getBlob()) return;
      console.log("speaking");
      clearTimeout(stopped_speaking_timeout);
    });

    this.speechEvents.on("stopped_speaking", function () {
      if (self.recorder.getBlob()) return;
      console.log("stopped_speaking");
      stopped_speaking_timeout = setTimeout(function () {
        self.recorder.stopRecording(self.onStopRecording.bind(self));
      }, self.speechDetectConfig.sendVoiceTimeout);
    });
  },

  initVisualizer() {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(this.stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = this.visualizerConfig.fftSize;
    analyser.minDecibels = this.visualizerConfig.minDecibels;
    analyser.maxDecibels = this.visualizerConfig.maxDecibels;
    analyser.smoothingTimeConstant = this.visualizerConfig.smoothTime;
    audioSource.connect(analyser);
    this.volumeCallback(analyser);
  },

  volumeCallback(analyser) {
    const volumes = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(volumes);
    let volumeSum = 0;
    for (const volume of volumes) volumeSum += volume;
    const averageVolume = volumeSum / volumes.length;
    let scale = 0.9 + (averageVolume * 100) / 127 / 100;

    if (scale < 0.9) {
      scale = 0.9;
    } else if (scale > 1.18) {
      scale = 1.18;
    }

    this.btnScale = `scale(${scale})`;
    if (this.state === "recording")
      setTimeout(
        () => this.volumeCallback(analyser),
        this.visualizerConfig.timerFreq
      );
    else this.btnScale = `scale(1)`;
  },

  async startRecording() {
    if (this.state === "unready" || this.state !== null) return;

    if (soundsStore.extPlaying) soundsStore.extPlaying.stop();
    soundsStore.play("rec.start");
    this.state = "recording";
    this.initVisualizer();
    this.initSpeechEvents();
    this.recorder.startRecording();
  },

  async stopRecording() {
    if (serverStore.state === "unready" || this.state === null) return;

    this.speechEvents.stop();
    this.recorder.stopRecording(this.onStopRecording.bind(this));
  },

  async onStopRecording() {
    const blob = this.recorder.getBlob();
    soundsStore.play("rec.stop");
    const buffer = await new Response(blob).arrayBuffer();
    if (buffer.byteLength > 6000) {
      this.state = "processing";
      await serverStore.sendVoice(buffer);
    } else {
      this.state = null;
    }
  },
});
