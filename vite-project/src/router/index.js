import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogInView.vue"),
    },
    {
      path: "/register",
      name: "resister",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: () => import("../views/ConfirmView.vue"),
    },
    {
      path: "/post",
      name: "post",
      component: () => import("../views/PostView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: () => import("../views/AccountView.vue"),
    },
    {
      path: "/people",
      name: "people",
      component: () => import("../views/PeopleView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = authStore();
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    auth.currentUser === null
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
