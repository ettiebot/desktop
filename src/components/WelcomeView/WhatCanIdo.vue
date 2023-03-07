<template>
  <div class="d-flex flex-column align-items-center" style="max-width: 500px">
    <div class="pb-5"><img src="@/assets/logo.svg" width="200" /></div>

    <div class="mb-2">
      <div>
        <h4>{{ $t("whatCanIdo.response.title") }}</h4>
        <p>{{ $t("whatCanIdo.response.subtitle") }}</p>
      </div>
      <div>
        <h4>{{ $t("whatCanIdo.cmd.title") }}</h4>
        <p>{{ $t("whatCanIdo.cmd.subtitle") }}</p>
      </div>
      <div>
        <h4>{{ $t("whatCanIdo.paint.title") }}</h4>
        <p>{{ $t("whatCanIdo.paint.subtitle") }}</p>
      </div>
      <div>
        <h4>{{ $t("whatCanIdo.work.title") }}</h4>
        <p>{{ $t("whatCanIdo.work.subtitle") }}</p>
      </div>
      <div>
        <h4>{{ $t("whatCanIdo.light.title") }}</h4>
        <p>{{ $t("whatCanIdo.light.subtitle") }}</p>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-light"
        style="width: 100%"
        @click="finishWhatCanIdo"
      >
        {{ $t("btns.next") }}
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
