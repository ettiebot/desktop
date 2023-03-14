<template>
  <div class="d-flex flex-column align-items-center">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>
    <div v-if="stage === 0" style="min-width: 100px; max-width: 400px">
      <h4 style="text-align: center">{{ $t("settings.chooseMic") }}</h4>
      <div
        class="mb-2"
        v-for="device in hardwareStore.micDevices"
        :key="device.deviceId"
      >
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="micDeviceId"
            :value="device.deviceId"
            v-model="micDevice"
            id="micDeviceInput"
          />
          <label class="form-check-label" for="micDeviceInput">
            {{ device.label }}
          </label>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(1)"
          :disabled="!micDevice"
        >
          {{ $t("btns.next") }}
        </button>
      </div>
    </div>
    <div v-if="stage === 1" style="min-width: 200px">
      <div class="mb-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="welcomeViewStore.useTranslate"
          />
          <label class="form-check-label">
            {{ $t("settings.useTranslate") }}
          </label>
        </div>
        <div class="form-text">
          <span>{{ $t("settings.useTranslateExpl") }}</span>
        </div>
      </div>
      <div class="mb-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="welcomeViewStore.useHistory"
          />
          <label class="form-check-label">
            {{ $t("settings.useHistory") }}
          </label>
        </div>
        <div class="form-text">
          <span>{{ $t("settings.useHistoryExpl") }}</span>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="finishSettings"
        >
          {{ $t("btns.next") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import welcomeViewStore from "@/stores/welcomeView.store";
import hardwareStore from "@/stores/hardware.store";
import serverStore from "@/stores/server.store";

export default {
  data() {
    return {
      stage: 0,
      welcomeViewStore,
      hardwareStore,
      micDevice: null,
    };
  },

  async created() {
    await hardwareStore.fetchDevices();
  },

  watch: {
    stage() {
      if (this.stage === 1) {
        hardwareStore.setMicDevice(this.micDevice);
      }
    },
  },

  methods: {
    changeStage(stage) {
      this.stage = stage;
    },

    async finishSettings() {
      await serverStore.api.post(
        "/memorize",
        {
          lang: welcomeViewStore.language,
          useHistory: welcomeViewStore.useHistory,
          useTranslate: welcomeViewStore.useTranslate,
        },
        {
          headers: {
            "x-token": welcomeViewStore.authToken,
          },
        }
      );

      welcomeViewStore.state = "whatCanIdo";
    },
  },
};
</script>
