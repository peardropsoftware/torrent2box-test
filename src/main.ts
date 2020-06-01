import Vue from "vue";
import App from "./app.vue";

Vue.config.productionTip = false;
const appComponent = new App();
appComponent.$mount('#app')
