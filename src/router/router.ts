import MainPage from "../components/MainPage/MainPage.vue";
import Basket from "../components/BasketComponent/Basket.vue";
import { createMemoryHistory, createRouter } from "vue-router";

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
  history: createMemoryHistory(),
});

export { router };
