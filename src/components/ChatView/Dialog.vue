<template>
  <div :class="`chat-panel ${parentClass}`" ref="chatPanel">
    <div v-for="(item, key) in history" :key="key">
      <div class="row no-gutters" v-if="item.query">
        <div class="col-md-3">
          <div class="chat-bubble chat-bubble--left">
            {{ item.query }}
          </div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-3 offset-md-9">
          <div class="chat-bubble chat-bubble--right">
            {{ item.text }}
          </div>
          <div v-if="item.youChatSerpResults" class="searches">
            <button
              v-for="(s, k) in item.youChatSerpResults"
              :key="k"
              @click="openExternal(s.url)"
            >
              {{ s.name.slice(0, 7) + "..." }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import recorderStore from "@/stores/recorder.store";
import serverStore from "@/stores/server.store";

export default {
  computed: {
    parentClass() {
      switch (recorderStore.state) {
        case "recording":
          return "voicing";
        case "processing":
          return "processing";
        default:
          return "";
      }
    },

    history() {
      return serverStore.data.history;
    },
  },

  methods: {
    openExternal(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
