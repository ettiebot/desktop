<template>
  <div class="d-flex flex-column align-items-center">
    <h4>Обучение</h4>
    <Transition>
      <h2 v-if="actionName">{{ actionName }}</h2>
    </Transition>
    <div class="progress" role="progressbar" v-if="trainPerc">
      <div class="progress-bar" :style="`width: ${trainPerc}%`">
        {{ trainPerc }}%
      </div>
    </div>
  </div>
</template>
<script>
import configStore from "@/stores/config.store";
import welcomeViewStore from "@/stores/welcomeView.store";
import windowStore from "@/stores/window.store";
import { later } from "@/utils/later";

const phrases = {
  hello: "Етти, привет",
  are_you_here: "Етти, ты здесь?",
  callback: "Етти, отзовись",
};

export default {
  data() {
    return {
      actionName: null,
      trainPerc: null,
      collect: null,
    };
  },
  methods: {
    async trainWord(word) {
      this.collect("_background_noise_");

      for (let i = 0; i < 5; i++) {
        this.actionName = 5 - i;
        await later(1000);
      }

      this.actionName = `Скажи: "${phrases[word]}"`;
      await this.collect(word);
    },

    async startTrain() {
      this.actionName = "Обучаюсь...";

      window.onEpochChange = (e, m) => {
        this.trainPerc = Math.round((e / m) * 100);
      };

      await this.collect("_background_noise_");
      await this.rai.train();
    },

    async finishTrain() {
      configStore.config = {
        token: welcomeViewStore.authToken,
        language: welcomeViewStore.language,
        useTranslate: welcomeViewStore.useTranslate,
        useHistory: welcomeViewStore.useHistory,
      };
      configStore.saveConfig();
      setTimeout(
        () => windowStore.changeView({ view: "chat", reload: true }),
        50
      );
    },
  },
  async mounted() {
    this.collect = this.rai.collect();
    for (let i = 0; i < 2; i++) {
      await this.trainWord("hello");
      await this.trainWord("are_you_here");
      await this.trainWord("callback");
    }
    await this.startTrain();
    setTimeout(() => this.finishTrain(), 2000);
  },
};
</script>
<style lang="scss" scoped>
p {
  color: white;
}

h2 {
  font-weight: 900;
  font-size: 4rem;
  color: white;
}

h4 {
  font-weight: 700;
  font-size: 1.5rem;
  color: #ffffffe0;
  margin: 0;
}

.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 22px;
  border-radius: 0;
  background: #00000026;
  font-size: 18px;
  .progress-bar {
    background-color: white;
    color: black;
  }
}
</style>
