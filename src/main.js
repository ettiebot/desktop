import { createApp } from "vue";
import * as VueI18n from "vue-i18n";

import applyPrototypes from "@/helpers/applyPrototypes.js";

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

import App from "@/App.vue";
import messages from "./lang";

Sentry.init({
  dsn: "https://4a6f5358cb0f4f529be34cd6e8553e93@o4504762585710592.ingest.sentry.io/4504762587217920",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const i18n = VueI18n.createI18n({
  locale: localStorage.getItem("locale"), // set locale
  fallbackLocale: "en", // set fallback locale
  messages: messages, // set locale messages
});

const app = createApp(App);
applyPrototypes(app.config.globalProperties);
app.use(i18n);
app.mount("#app");
