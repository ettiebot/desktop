import { createApp } from "vue";

import applyPrototypes from "@/helpers/applyPrototypes.js";

import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://4a6f5358cb0f4f529be34cd6e8553e93@o4504762585710592.ingest.sentry.io/4504762587217920",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

import App from "@/App.vue";

const app = createApp(App);
applyPrototypes(app.config.globalProperties);
app.mount("#app");
