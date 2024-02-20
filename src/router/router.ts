import MainPage from "../components/MainPage/MainPage.vue";
import Basket from "../components/BasketComponent/Basket.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: MainPage,
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
