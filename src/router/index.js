import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import About from "@/views/About.vue";
import UserDataStore from "@/store/index";
import SignIn from "@/views/SignIn";
import SignOut from "@/views/SignOut";

import * as AmplifyModules from "aws-amplify";
// amplifyインストール
import { AmplifyPlugin, AmplifyEventBus } from "aws-amplify-vue";

Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(VueRouter);

let user;

getUser().then((user, error) => {
  if (user) {
    router.push({ path: "/" }, () => {});
  }
  if (error) {
    console.error(error);
  }
});

AmplifyEventBus.$on("authState", async state => {
  console.info("state", state);
  if (state === "signedOut") {
    user = null;
    UserDataStore.commit("setUser", null);
    router.push({ path: "/signin" });
  } else if (state === "signedIn") {
    user = await getUser();
    router.push({ path: "/" });
  }
});

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
    .then(data => {
      if (data && data.signInUserSession) {
        UserDataStore.commit("setUser", data);
        return data;
      }
    })
    .catch(e => {
      console.info(e);
      UserDataStore.commit("setUser", null);
      return null;
    });
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: { requiresAuth: false }
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    meta: { requiresAuth: false }
  },
  {
    path: "/signout",
    name: "SignOut",
    component: SignOut,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    if (!user) {
      return next({
        path: "/signin",
        query: {
          redirect: to.fullPath
        }
      });
    }
    return next();
  }
  return next();
});

export default router;
