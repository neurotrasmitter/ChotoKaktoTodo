import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "work",
    component: () => import("../components/TodoBoard"),
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../components/TodoBoard"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("../components/TodoBoard"),
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/NotFound"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
