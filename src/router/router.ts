import App from "../App.vue";
import Basket from "../components/BasketComponent/Basket.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/basket",
    component: Basket,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router };
