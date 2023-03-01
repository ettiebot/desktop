<template>
  <div class="d-flex flex-column align-items-center" style="max-width: 500px">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>

    <div class="mb-2">
      <div>
        <h4>Я могу ответить на любой вопрос</h4>
        <p>Спроси меня о чем угодно, и я дам тебе ответ.</p>
      </div>
      <div>
        <h4>Я выполню команду</h4>
        <p>Я могу выполнить команду, о которой ты меня попросишь.</p>
      </div>
      <div>
        <h4>Я нарисую картину</h4>
        <p>Попроси меня нарисовать что-нибудь, и я с радостью это сделаю.</p>
      </div>
      <div>
        <h4>Я выполню за тебя работу</h4>
        <p>Я могу написать за тебя эссе или сделать домашнее задание.</p>
      </div>
      <div>
        <h4>Я выключу свет</h4>
        <p>
          Я умею работать с устройствами умного дома от Xiaomi, Yeelight,
          Philips, Bosch, Apple Home и др.
        </p>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-light"
        style="width: 100%"
        @click="finishWhatCanIdo"
      >
        Далее
      </button>
    </div>
  </div>
</template>
<script>
import welcomeViewStore from "@/stores/welcomeView.store";

export default {
  methods: {
    finishWhatCanIdo() {
      welcomeViewStore.state = "train";
    },
  },
};
</script>
