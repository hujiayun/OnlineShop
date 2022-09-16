import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/signin",
    name: "Sign in / Sign up",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/forget",
    name: "Forget Password",
    component: () => import("../views/Forget.vue"),
  },
  {
    path: "/reset",
    name: "Reset Password",
    component: () => import("../views/Reset.vue"),
  },
  {
    path: "/confirmation",
    name: "Email Sent Confirmation",
    component: () => import("../views/Confirmation.vue"),
  },
  {
    path: "/verify",
    name: "Email Verify",
    component: () => import("../views/Verify.vue"),
    meta: {
      keepAlive: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
