<template>
  <div :class="`bottom-parent ${parentClass}`">
    <div
      class="mic-button"
      @click="toggleRec"
      ref="micBtn"
      :style="`transform: ${scale}`"
    >
      <div
        class="spinner-border"
        role="status"
        v-if="recorderStore.state === 'processing'"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="material-icons" v-else> mic </span>
    </div>
  </div>
</template>
<script>
import recorderStore from "@/stores/recorder.store";
const ipcRenderer = window.require("electron").ipcRenderer;

export default {
  setup() {
    return {
      recorderStore,
    };
  },

  computed: {
    parentClass() {
      switch (recorderStore.state) {
        case "recording":
          return "voicing";
        case "processing":
          return "processing";
        case "unready":
          return "unready";
        default:
          return "";
      }
    },

    scale() {
      return recorderStore.btnScale;
    },
  },

  async mounted() {
    // Load saved model
    await this.rai.loadExamples();
    // Listen for mention
    await this.rai.listen(() => {
      ipcRenderer.postMessage("showWindow");
      recorderStore.startRecording();
    });
  },

  async created() {
    // Fetch microphone
    await recorderStore.fetchMicrophone();
    // Init recorder
    recorderStore.initRecorder();
  },

  methods: {
    toggleRec() {
      if (recorderStore.state === "recording") {
        recorderStore.stopRecording();
      } else if (recorderStore.state === null) {
        recorderStore.startRecording();
      }
    },
  },
};
</script>
