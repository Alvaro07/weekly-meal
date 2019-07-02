import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "./registerServiceWorker";

Vue.config.productionTip = false;

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
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
});
