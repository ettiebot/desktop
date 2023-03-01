<template>
  <div>
    <Dialog />
    <Recorder />
  </div>
</template>
<script>
import Dialog from "@/components/ChatView/Dialog.vue";
import Recorder from "@/components/ChatView/Recorder.vue";
import soundsStore from "@/stores/sounds.store";
import serverStore from "@/stores/server.store";

export default {
  setup() {
    return {};
  },
  async created() {
    await soundsStore.load();
    await serverStore.init();
  },
  components: { Recorder, Dialog },
};
</script>
<style lang="scss">
@import "../assets/styles/scss/chat/index.scss";
</style>
