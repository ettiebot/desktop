<template>
  <div class="d-flex flex-column align-items-center">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>
    <div v-if="stage === 0" style="min-width: 200px">
      <div class="mb-2">
        <select class="form-select" v-model="language">
          <option value="" selected>{{ $t("settings.chooseLang") }}</option>
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
          {{ $t("btns.next") }}
        </button>
      </div>
    </div>
    <div v-if="stage === 1">
      <div class="mb-2">
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="createKey"
        >
          {{ $t("auth.newKey") }}
        </button>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(3)"
        >
          {{ $t("auth.importKey") }}
        </button>
      </div>
    </div>
    <div v-if="stage === 2">
      <div class="mb-3">
        <div class="alert alert-danger" role="alert">
          {{ $t("auth.plsCopyKey") }}
        </div>
      </div>
      <div class="mb-2">
        <input
          ref="mnemonicInput"
          class="form-control cursor"
          type="text"
          v-model="mnemonic"
          @click="copyMnemonic"
          readonly
        />
      </div>
      <div class="mb-2 d-flex">
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%; margin-right: 7px"
          @click="finishAuth(true)"
        >
          {{ $t("btns.next") }}
        </button>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(1)"
        >
          {{ $t("btns.back") }}
        </button>
      </div>
    </div>
    <div v-if="stage === 3">
      <div class="mb-3">
        <div class="alert alert-danger" role="alert">
          {{ $t("auth.enterKeyBelow") }}
        </div>
      </div>
      <div class="mb-2">
        <input
          ref="mnemonicInputImport"
          class="form-control"
          type="text"
          v-model="mnemonic"
        />
      </div>
      <div class="mb-2 d-flex">
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%; margin-right: 7px"
          @click="importKey"
        >
          {{ $t("btns.next") }}
        </button>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(1)"
        >
          {{ $t("btns.back") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import * as bip39 from "bip39";
import configStore from "@/stores/config.store";
import welcomeViewStore from "@/stores/welcomeView.store";

export default {
  data() {
    return {
      config: configStore.config,
      stage: 0,
      mnemonic: "",
      language: "",
    };
  },
  watch: {
    language(l) {
      this.$i18n.locale = l;
    },
  },
  methods: {
    changeStage(i) {
      if (!this.language || this.language === "") return;
      this.mnemonic = "";
      this.stage = i;
    },

    copyMnemonic() {
      this.$refs.mnemonicInput.select();
      const { clipboard } = this.require("electron");
      clipboard.writeText(this.mnemonic);
    },

    createKey() {
      this.changeStage(2);
      this.mnemonic = bip39.generateMnemonic();
      welcomeViewStore.authToken = bip39
        .mnemonicToSeedSync(this.mnemonic)
        .toString("hex");
    },

    importKey() {
      const mnemonic = this.$refs.mnemonicInputImport.value;
      if (!bip39.validateMnemonic(mnemonic)) {
        alert(this.$t("errors.invalidKey"));
      } else {
        welcomeViewStore.authToken = bip39
          .mnemonicToSeedSync(mnemonic)
          .toString("hex");
        this.finishAuth(false);
      }
    },

    finishAuth(isNew) {
      welcomeViewStore.language = this.language;
      if (isNew) welcomeViewStore.state = "settings";
      else welcomeViewStore.state = "whatCanIdo";
    },
  },
};
</script>
