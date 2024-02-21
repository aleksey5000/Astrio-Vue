<template>
  <header class="mainPageHeader">
    <div>
      <img src="./data/images/logo.png" alt="logo" />
    </div>
    <div class="basket">
      <div class="count_in_basket" v-if="store.basket.length > 0">
        {{ getCount() }}
      </div>
      <router-link to="/basket">
        <button>
          <basket />
        </button>
      </router-link>
    </div>
  </header>
  <div class="container">
    <brands-component />
    <catalog-component />
  </div>
</template>

<script lang="ts">
import "./App.scss";
import Basket from "./data/images/basket.vue";
import BrandsComponent from "./components/BrandsComponent/BrandsComponent.vue";
import CatalogComponent from "./components/CatalogComponent/CatalogComponent.vue";
import useStore from "./store/Store";

export default {
  components: {
    Basket,
    BrandsComponent,
    CatalogComponent,
  },
  data() {
    return {
      store: useStore(),
    };
  },
  methods: {
    getCount() {
      return this.store.basket.reduce((sum, item) => sum + item.count, 0);
    },
  },
};
</script>

<style>
.mainPageHeader {
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding-inline: 20px;
  margin-bottom: 30px;
  align-items: center;
  background: -webkit-linear-gradient(
    left,
    rgba(225, 0, 255, 0.288) 0%,
    rgba(255, 255, 255, 0) 90%
  );
}
.container {
  border-top: 1px solid lightgray;
  margin-inline: 20px;
  display: flex;
  position: relative;
}
.basket {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.count_in_basket {
  height: 15px;
  background-color: red;
  text-align: center;
  font-size: 10px;
  color: white;
  padding: 3px 5px;
  border-radius: 7.5px;
}
.basket svg {
  width: 40px;
  height: 40px;
}
</style>
