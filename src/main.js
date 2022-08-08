import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, digits } from "vee-validate/dist/rules";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("required", {
  ...required,
  message: "The {_field_} is required",
});
extend("email", {
  ...email,
});
extend("digits", {
  ...digits,
  message: "The {_field_} must have 8 digits",
});

Vue.use(BootstrapVue);
// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
