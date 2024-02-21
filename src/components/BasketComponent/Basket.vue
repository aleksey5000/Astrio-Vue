<template>
  <header class="basketHeader">
    <div>
      <router-link to="/">
        <button>
          <home />
        </button>
      </router-link>
    </div>
    <div>
      <img src="../../data/images/logo.png" alt="logo" />
    </div>
  </header>
  <div class="basketContainer">
    <h1 class="shpppingCart">Shopping Cart</h1>
    <div class="basketBody">
      <div class="basketProductList">
        <div class="headOfTable" v-if="store.basket.length > 0">
          <div class="item">
            <h2 class="itemHead">Item</h2>
          </div>
          <div class="rightSideOfHeadOfTable">
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
            <div class="space"></div>
          </div>
        </div>
        <div v-if="store.basket.length == 0" class="emptyBasket">
          <p>No products in basket</p>
          <p>Add some ...</p>
          <router-link to="/">
            <button>
              <plus />
            </button>
          </router-link>
        </div>
        <div class="product" v-for="product in store.basket">
          <div class="item">
            <div class="image">
              <img :src="chooseImage(product)" :alt="product.brand" />
            </div>
            <div class="productInfo">
              <h2>{{ product.title }}</h2>
              <p>
                <span>{{ product.brand }}</span>
              </p>
              <p v-if="product.variant">
                Color: {{ option("color", product) }}
              </p>
              <p v-if="product.variant">Size: {{ option("size", product) }}</p>
            </div>
            <button
              class="unionForSizeLessThan768px"
              @click="deleteProduct(product)"
            >
              <union />
            </button>
          </div>
          <div class="rightSideOfHeadOfTableForSizeLessThan768px">
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
          </div>
          <div class="rightSideOfHeadOfTable">
            <h2>
              {{
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: product.regular_price.currency,
                }).format(product.regular_price.value)
              }}
            </h2>
            <div class="quantity">
              <input
                type="number"
                v-model="product.count"
                @blur="checkBellowOneCount(product)"
                @change="changeCount(product, $event)"
              />
            </div>
            <h2>
              {{
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: product.regular_price.currency,
                }).format(product.regular_price.value * product.count)
              }}
            </h2>
            <button class="union" @click="deleteProduct(product)">
              <union />
            </button>
          </div>
        </div>
      </div>
      <h1 v-if="store.basket.length > 0" class="totalPrice">
        Total:
        {{
          new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "USD",
          }).format(getTotalPrice())
        }}
      </h1>
      <div>
        <button class="bueButton" v-if="store.basket.length > 0">Bue</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Home from "../../data/images/Home.vue";
import useStore from "../../store/Store";
import TypeBasketComponent from "./TypeBasketComponent";
import TypeBasket from "../../Types/TypeBasket";
import Union from "../../data/images/Union.vue";
import Plus from "../../data/images/plus.vue";

export default {
  components: {
    Home,
    Union,
    Plus,
  },
  data(): TypeBasketComponent {
    return {
      store: useStore(),
    };
  },
  methods: {
    chooseImage(product: TypeBasket) {
      if (product.variant) {
        return `../src/data${product.variant.product.image}`;
      } else {
        return `${product.image}`;
      }
    },
    option(option: "size" | "color", product: TypeBasket) {
      if (product.variant) {
        for (let variant of product.variant.attributes) {
          if (variant.code == option) {
            return variant[`${option}`];
          }
        }
      }
    },
    deleteProduct(product: TypeBasket) {
      const index = this.store.basket.findIndex(
        (item) => item.id == product.id,
      );
      this.store.basket.splice(index, 1);
    },
    checkBellowOneCount(product: TypeBasket) {
      if (product.count < 1) {
        setTimeout(() => {
          this.deleteProduct(product);
        }, 500);
      }
    },
    getTotalPrice() {
      return this.store.basket.reduce(
        (sum, item) => sum + item.regular_price.value * item.count,
        0,
      );
    },
    changeCount(product: TypeBasket, event: any) {
      product.count = Math.abs(Number(event.target.value));
    },
  },
};
</script>

<style>
.basketHeader {
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding-inline: 20px;
  margin-bottom: 30px;
  align-items: center;
  background: -webkit-linear-gradient(
    right,
    rgba(225, 0, 255, 0.288) 0%,
    rgba(255, 255, 255, 0) 90%
  );
}
.basketHeader svg {
  height: 30px;
  width: 30px;
}
.basketContainer {
  border-top: 1px solid lightgray;
  margin-inline: 20px;
  padding-top: 10px;
}
.shpppingCart {
  font-size: 2em;
  margin-bottom: 20px;
}
.basketBody {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.basketProductList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.headOfTable {
  width: 100%;
  align-items: top;
  justify-content: space-between;
  padding: 10px;
}
.rightSideOfHeadOfTable {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rightSideOfHeadOfTable h2 {
  margin: auto;
}
.space {
  width: 50px;
}
.emptyBasket {
  margin-top: 100px;
  width: 100%;
  text-align: center;
  font-weight: 600;
}
.emptyBasket p {
  margin: 10px 0;
}
.emptyBasket svg {
  height: 30px;
  width: 30px;
}
.product {
  border-bottom: 1px solid lightgrey;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  padding: 10px;
}
h2 {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 5px;
  width: 100px;
  text-align: center;
}
.item {
  display: flex;
  align-items: top;
}
.item h2 {
  margin-inline: auto;
}

.image {
  margin-right: 30px;
}
.image img {
  width: 80px;
  height: 100%;
}
.productInfo {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.productInfo h2 {
  text-align: start;
}
.productInfo p span {
  font-size: 1.2em;
  font-weight: 600;
}
.productInfo p {
  margin-bottom: 5px;
  font-size: 0.8em;
}
.quantity {
  display: flex;
  align-items: center;
  margin: auto;
}
.quantity input {
  border: 1px solid black;
  width: 40px;
  height: 25px;
  padding: 5px 0 5px 5px;
  border-radius: 5px;
}
.quantity input::-webkit-inner-spin-button {
  height: 30px;
}
.union {
  width: 50px;
  height: 50px;
}
.union svg {
  width: 15px;
  height: 15px;
}
.bueButton {
  font-size: 1.5em;
  padding: 3px 20px;
  background-color: rgba(225, 0, 255, 0.151);
  border-radius: 15px;
}
@media (hover: hover) {
  .bueButton:hover {
    box-shadow: 0 0 5px black;
  }
}
@media (hover: hover) {
  .bueButton:active {
    box-shadow: 0 0 5px black;
  }
}
</style>
