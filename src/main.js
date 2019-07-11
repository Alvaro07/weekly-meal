import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import filters from "./filters";
import firebase from "firebase";
import "./registerServiceWorker";
import { library } from "./utils/icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);

var firebaseConfig = {
  apiKey: "AIzaSyACZLcOM9y301oCOlYD_F14FRRLUzF2U2w",
  authDomain: "weekly-menu-vue.firebaseapp.com",
  databaseURL: "https://weekly-menu-vue.firebaseio.com",
  projectId: "weekly-menu-vue",
  storageBucket: "",
  messagingSenderId: "962317874675",
  appId: "1:962317874675:web:9748fc14ec9ebeab"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();


firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
