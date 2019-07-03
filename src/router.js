import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        isAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authRequired = to.matched.some(record => record.meta.isAuth);

  if (authRequired && !user) {
    next("login");
  } else if ((to.name === "login" || to.name === "register") && user) {
    next("dashboard");
  } else {
    next();
  }
});

export default router;
