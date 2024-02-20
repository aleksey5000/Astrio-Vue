import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./router/router";

createApp(App)
  .use({
    install: (app) => {
      app.use(router);
      app.use(createPinia());
    },
  })
  .mount("#app");

//createPinia(),router
