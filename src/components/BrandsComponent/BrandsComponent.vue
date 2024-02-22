<template>
  <button
    :data-brand-button-visible="isBrandButtonVisible"
    class="brandButton"
    @click="isBrandButtonVisible = !isBrandButtonVisible"
  >
    Brands
  </button>
  <div class="brands" :data-brand-button-visible="isBrandButtonVisible">
    <button @click="showAllBrands" class="allBrandsButton">All Brands:</button>
    <div class="brands_list">
      <button v-for="brand in brands_list" @click="chooseFilter(brand.id)">
        {{ brand.title }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import brands from "../../data/brands.json";
import TypeBrandsComponent from "./TypeBrandsComponent";
import useStore from "../../store/Store";

export default {
  data(): TypeBrandsComponent {
    return {
      isBrandButtonVisible: false,
      brands_list: brands,
      store: useStore(),
    };
  },
  methods: {
    showAllBrands() {
      delete this.store.brandFilterId;
    },
    chooseFilter(id: number) {
      this.store.brandFilterId = id;
    },
  },
  mounted() {
    this.store.brands = this.brands_list;
  },
};
</script>

<style>
.brands {
  font-size: 2em;
  z-index: 1;
}

.brands_list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.brandButton {
  position: absolute;
  background-color: lightgrey;
  transform: rotate(-90deg);
  color: grey;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-inline: 10px;
  z-index: 1;
}
.brands_list button {
  font-size: 16px;
  margin: 5px 0;
  width: 100%;
  text-align: start;
}
@media (hover: hover) {
  .brands_list button:hover {
    text-align: center;
  }
}
@media (hover: hover) {
  .brands_list button:active {
    text-align: center;
  }
}
</style>
