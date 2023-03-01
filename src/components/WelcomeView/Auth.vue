<template>
  <div class="d-flex flex-column align-items-center">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>
    <div v-if="stage === 0">
      <div class="mb-2">
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="createKey"
        >
          Создать новый ключ
        </button>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(2)"
        >
          Импортировать ключ
        </button>
      </div>
    </div>
    <div v-if="stage === 1">
      <div class="mb-3">
        <div class="alert alert-danger" role="alert">
          Скопируй ключ в надёжное место
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
          Далее
        </button>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(0)"
        >
          Назад
        </button>
      </div>
    </div>
    <div v-if="stage === 2">
      <div class="mb-3">
        <div class="alert alert-danger" role="alert">
          Введи ключ в поле ниже
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
          Далее
        </button>
        <button
          type="button"
          class="btn btn-light"
          style="width: 100%"
          @click="changeStage(0)"
        >
          Назад
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
    };
  },
  methods: {
    changeStage(i) {
      this.mnemonic = "";
      this.stage = i;
    },

    copyMnemonic() {
      this.$refs.mnemonicInput.select();
      // nw.Clipboard.get().set({ data: this.mnemonic, type: "text" });
    },

    createKey() {
      this.changeStage(1);
      this.mnemonic = bip39.generateMnemonic();
      welcomeViewStore.authToken = bip39
        .mnemonicToSeedSync(this.mnemonic)
        .toString("hex");
    },

    importKey() {
      const mnemonic = this.$refs.mnemonicInputImport.value;
      if (!bip39.validateMnemonic(mnemonic)) {
        alert("Неверный ключ");
      } else {
        welcomeViewStore.authToken = bip39
          .mnemonicToSeedSync(mnemonic)
          .toString("hex");
        this.finishAuth(false);
      }
    },

    finishAuth(isNew) {
      if (isNew) welcomeViewStore.state = "settings";
      else welcomeViewStore.state = "whatCanIdo";
    },
  },
};
</script>
