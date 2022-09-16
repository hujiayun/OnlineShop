import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";
import "vue-universal-modal/dist/index.css";
import VueUniversalModal from "vue-universal-modal";

createApp(App)
  .use(router)
  .use(VueCookies)
  .use(VueUniversalModal, { teleportTarget: "#modals" })
  .mount("#app");
