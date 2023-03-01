<template>
  <div class="d-flex flex-column align-items-center">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>
    <div v-if="stage === 0" style="min-width: 200px">
      <div class="mb-2">
        <select class="form-select" v-model="welcomeViewStore.language">
          <option value="" selected>Выбери язык</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="ua">Українська</option>
        </select>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(1)"
        >
          Далее
        </button>
      </div>
    </div>
    <div v-if="stage === 1" style="min-width: 100px; max-width: 400px">
      <h4 style="text-align: center">Выбери микрофон</h4>
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
          @click="changeStage(2)"
        >
          Далее
        </button>
      </div>
    </div>
    <div v-if="stage === 2" style="min-width: 200px">
      <div class="mb-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            v-model="welcomeViewStore.useTranslate"
          />
          <label class="form-check-label"> Использовать переводчик </label>
        </div>
        <div class="form-text">
          <span>Чтобы я могла понимать тебя лучше</span>
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
          <label class="form-check-label"> Использовать историю </label>
        </div>
        <div class="form-text">
          <span>Чтобы я знала, о чём мы говорили ранее</span>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="finishSettings"
        >
          Далее
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import welcomeViewStore from "@/stores/welcomeView.store";
import hardwareStore from "@/stores/hardware.store";

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
      if (this.stage === 2) {
        hardwareStore.setMicDevice(this.micDevice);
      }
    },
  },

  methods: {
    changeStage(stage) {
      if (!welcomeViewStore.language || welcomeViewStore.language === "")
        return;
      this.stage = stage;
      console.log(hardwareStore.micDevice);
    },

    finishSettings() {
      welcomeViewStore.state = "whatCanIdo";
    },
  },
};
</script>
