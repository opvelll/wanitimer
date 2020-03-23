import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./registerServiceWorker";
Vue.config.productionTip = false;

// components
import App from "./App.vue";
import router from "./router";
import store from "./store";

// aws-ampllify
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { components } from "aws-amplify-vue";
Amplify.configure(awsconfig);

// vue-momoent
const moment = require("moment");
require("moment/locale/ja");
Vue.use(require("vue-moment"), { moment });

new Vue({
  router,
  store,
  render: h => h(App),
  components: { ...components }
}).$mount("#app");
