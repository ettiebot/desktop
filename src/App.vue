<template>
  <WelcomeView v-if="window.view === 'welcome'" />
  <ChatView v-if="window.view === 'chat'" />
</template>

<script>
import windowStore from "./stores/window.store";
import WelcomeView from "./views/WelcomeView.vue";
import ChatView from "./views/ChatView.vue";
import configStore from "./stores/config.store";

export default {
  components: { WelcomeView, ChatView },
  setup() {
    return {
      window: windowStore,
    };
  },
  created() {
    configStore.fetchConfig();
    configStore.$ = this.$;
    if (configStore.config?.language)
      this.$i18n.locale = configStore.config?.language;
    if (!configStore.config?.token) windowStore.changeView({ view: "welcome" });
    else windowStore.changeView({ view: "chat" });
  },
};
</script>

<style lang="scss" scoped></style>
