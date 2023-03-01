<template>
  <section
    class="container-fluid d-flex justify-content-center align-items-center --welcome-container"
    style="height: 100vh"
  >
    <LoadingFull v-if="wws.state === 'loading'" />
    <LogoFull v-if="wws.state === 'logo'" />
    <Auth v-if="wws.state === 'auth'" />
    <Settings v-if="wws.state === 'settings'" />
    <WhatCanIdo v-if="wws.state === 'whatCanIdo'" />
    <Train v-if="wws.state === 'train'" />
  </section>
</template>
<script>
import aiKeys from "@/consts/aiKeys.js";
import welcomeViewStore from "@/stores/welcomeView.store.js";
import { later } from "@/utils/later.js";
import configStore from "@/stores/config.store";
import LoadingFull from "@/components/Basic/LoadingFull.vue";
import LogoFull from "@/components/Basic/LogoFull.vue";
import Auth from "@/components/WelcomeView/Auth.vue";
import Settings from "@/components/WelcomeView/Settings.vue";
import WhatCanIdo from "@/components/WelcomeView/WhatCanIdo.vue";
import Train from "@/components/WelcomeView/Train.vue";

export default {
  setup() {
    return {
      wws: welcomeViewStore,
      config: configStore.config,
    };
  },
  async created() {
    if (this.config?.token) return;
    // Initialize necessary components
    await this.init().then(() => (this.wws.state = "logo"));
    // Go to auth after 2 seconds
    await later(2000).then(() => (this.wws.state = "auth"));
  },
  methods: {
    async init() {
      // Load model
      await this.rai.loadModel();
      // Delete saved trained model
      await window.speechCommands
        .deleteSavedTransferModel(aiKeys.recognitionModelName)
        .catch((e) => void e);
    },
  },
  components: { LoadingFull, LogoFull, Auth, Settings, WhatCanIdo, Train },
};
</script>
<style lang="scss">
@import "../assets/styles/scss/welcome/index.scss";
</style>
