<template>
  <div class="catalog">
    <h1>Catalog:</h1>
    <div class="catalog_list">
      <div class="card" v-for="product in filteredProductsList">
        <div>
          <img :src="chooseImage(product)" :alt="product.title" />
        </div>
        <div class="infoBlock">
          <div class="info">
            <h2>{{ product.title }}</h2>
            <p>{{ findBrand(product.brand) }}</p>
            <p>
              {{
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: product.regular_price.currency,
                }).format(product.regular_price.value)
              }}
            </p>
            <div v-if="product.configurable_options">
              <div
                v-if="
                  product.configurable_options &&
                  hasAttribute(product.configurable_options, 'color')
                "
                class="colors"
              >
                <div
                  class="backgroundOfColorOption"
                  v-for="color in findAttribute(
                    product.configurable_options,
                    'color',
                  )?.values"
                  :data-choosen-state="
                    setStateOfDataAttribute(
                      'color',
                      product.id,
                      color.value_index,
                    )
                  "
                >
                  <button
                    class="colorOption"
                    :style="{ backgroundColor: color.value.toString() }"
                    @click="chooseOption('color', product, color.value_index)"
                    :disabled="
                      setStateOfOption('color', product.id, color.value_index)
                    "
                  ></button>
                </div>
              </div>
              <div
                v-if="
                  product.configurable_options &&
                  hasAttribute(product.configurable_options, 'size')
                "
                class="sizes"
              >
                <button
                  class="sizeOption"
                  v-for="size in findAttribute(
                    product.configurable_options,
                    'size',
                  )?.values"
                  :disabled="
                    setStateOfOption('size', product.id, size.value_index)
                  "
                  @click="chooseOption('size', product, size.value_index)"
                  :data-choosen-state="
                    setStateOfDataAttribute(
                      'size',
                      product.id,
                      size.value_index,
                    )
                  "
                >
                  {{ size.label }}
                </button>
              </div>
            </div>
          </div>
          <div class="buttonBlock">
            <button
              class="addButton"
              @click="addProduct(product)"
              :disabled="setStateOfWarningMessage(product)"
            >
              <plus />
            </button>
            <div
              v-if="setStateOfWarningMessage(product)"
              class="warningMessage"
            >
              <div class="triangle"></div>
              <div class="message">choose option</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import products from "../../data/products.json";
import TypeCatalogComponent from "./TypeCatalogComponent";
import useStore from "../../store/Store";
import TypeStore from "../../store/TypeStore";
import TypeConfigurableOptions from "../../Types/TypeProduct/TypeConfigurableOptions";
import TypeProduct from "../../Types/TypeProduct/TypeProduct";
import TypeStateOfConfigurableCard from "../../Types/TypeStateOfConfigurableCard";
import TypeVariant from "../../Types/TypeProduct/TypeVariant";
import Plus from "../../data/images/plus.vue";

export default {
  components: {
    Plus,
  },
  data(): TypeCatalogComponent {
    return {
      filteredProductsList: products,
      productsList: products,
      store: useStore(),
      colorsElementsList: [],
    };
  },
  methods: {
    findBrand(brand_number: number): string {
      const brand = this.store.brands.find((elem) => elem.id == brand_number);
      if (brand?.title) {
        return brand.title;
      } else {
        return "Brand not found";
      }
    },

    hasAttribute(
      attributeList: TypeConfigurableOptions[],
      attribute: string,
    ): boolean {
      return !!attributeList.find((item) => item.attribute_code == attribute);
    },

    findAttribute(attributeList: TypeConfigurableOptions[], attribute: string) {
      return attributeList.find((item) => item.attribute_code == attribute);
    },

    chooseImage(product: TypeProduct) {
      if (!product.configurable_options) {
        return `../src/data${product.image}`;
      } else {
        const index = this.findIndexOfConfigurableCard(product.id);
        if (
          !this.store.statesOfConfigurableCards[index].choosen_option
            .color_value
        ) {
          return `../src/data${product.image}`;
        } else {
          return `../src/data${this.store.statesOfConfigurableCards[index].image}`;
        }
      }
    },

    findIndexOfConfigurableCard(id: number) {
      let index: number = 0;
      this.store.statesOfConfigurableCards.forEach((item, i) => {
        if (item.id == id) {
          index = i;
        }
      });
      return index;
    },

    setStateOfDataAttribute(
      attribute: "size" | "color",
      card_id: number,
      value: number,
    ) {
      const index = this.findIndexOfConfigurableCard(card_id);
      if (
        Object.keys(this.store.statesOfConfigurableCards[index].choosen_option)
          .length &&
        this.store.statesOfConfigurableCards[index].choosen_option[
          `${attribute}_value`
        ] == value
      ) {
        return true;
      } else {
        return false;
      }
    },

    setStateOfOption(option: "size" | "color", card_id: number, value: number) {
      const index = this.findIndexOfConfigurableCard(card_id);
      if (
        this.store.statesOfConfigurableCards[index][
          `available_${option}s`
        ].includes(value)
      ) {
        return false;
      } else {
        if (
          this.store.statesOfConfigurableCards[index][`available_${option}s`]
            .length == 0
        ) {
          return false;
        } else {
          return true;
        }
      }
    },

    setStateOfWarningMessage(product: TypeProduct) {
      if (!product.configurable_options) {
        return false;
      } else {
        const index = this.findIndexOfConfigurableCard(product.id);
        const choosenOptionsCount = Object.keys(
          this.store.statesOfConfigurableCards[index].choosen_option,
        ).length;
        if (choosenOptionsCount == 4) {
          return false;
        } else {
          return true;
        }
      }
    },

    findImage(
      card_index: number,
      variants: TypeVariant[] | undefined,
      value: number,
    ) {
      let image: string = "";
      variants?.forEach((item) => {
        for (let attribute of item.attributes) {
          if (attribute.value_index == value) {
            this.store.statesOfConfigurableCards[card_index].sku =
              item.product.sku;
            this.store.statesOfConfigurableCards[card_index].variant_id =
              item.product.id;
            image = item.product.image;
            break;
          }
        }
      });
      return image;
    },

    findAvailableAttribute(
      attribute: "size" | "color",
      __product: TypeProduct,
      __value_index: number,
    ) {
      const index = this.findIndexOfConfigurableCard(__product.id);
      __product.variants?.forEach((item) => {
        const neccesaryAttribute = item.attributes.find(
          (item) => item.value_index == __value_index,
        );
        if (!!neccesaryAttribute) {
          const availableAttribute = item.attributes.find(
            (item) => item.code == attribute,
          );
          if (!!availableAttribute) {
            this.store.statesOfConfigurableCards[index][
              `available_${attribute}s`
            ].push(availableAttribute.value_index);
          }
        }
      });
    },

    chooseOption(
      option: "size" | "color",
      product: TypeProduct,
      value_index: number,
    ) {
      let anotherOption: "size" | "color";
      const index = this.findIndexOfConfigurableCard(product.id);
      if (option == "size") {
        anotherOption = "color";
        this.store.statesOfConfigurableCards[index].available_colors = [];
        this.store.statesOfConfigurableCards[index].choosen_option.size_value =
          value_index;
        if (product.configurable_options) {
          this.store.statesOfConfigurableCards[index].choosen_option.size =
            this.findAttribute(
              product.configurable_options,
              option,
            )?.values.find((item) => item.value_index == value_index)?.label;
        }
      } else {
        anotherOption = "size";
        this.store.statesOfConfigurableCards[index].available_sizes = [];
        this.store.statesOfConfigurableCards[index].choosen_option.color_value =
          value_index;
        this.store.statesOfConfigurableCards[index].image = this.findImage(
          index,
          product.variants,
          value_index,
        );
        if (product.configurable_options) {
          this.store.statesOfConfigurableCards[index].choosen_option.color =
            this.findAttribute(
              product.configurable_options,
              option,
            )?.values.find((item) => item.value_index == value_index)?.label;
        }
      }
      this.findAvailableAttribute(anotherOption, product, value_index);
    },

    setVariant(product: TypeProduct): TypeVariant | undefined {
      const index = this.findIndexOfConfigurableCard(product.id);
      if (!product.variants) {
        return undefined;
      } else {
        return {
          attributes: [
            {
              code: "color",
              value_index:
                this.store.statesOfConfigurableCards[index].choosen_option
                  .color_value || -1,
              color:
                this.store.statesOfConfigurableCards[index].choosen_option
                  .color,
            },
            {
              code: "size",
              value_index:
                this.store.statesOfConfigurableCards[index].choosen_option
                  .size_value || -1,
              size: this.store.statesOfConfigurableCards[index].choosen_option
                .size,
            },
          ],
          product: {
            id: this.store.statesOfConfigurableCards[index].variant_id,
            sku: this.store.statesOfConfigurableCards[index].sku,
            image: this.store.statesOfConfigurableCards[index].image,
          },
        };
      }
    },

    addProduct(product: TypeProduct) {
      const item = {
        id: product.id,
        title: product.title,
        regular_price: product.regular_price,
        brand: this.findBrand(product.brand),
        image: this.chooseImage(product),
        count: 1,
        variant: this.setVariant(product),
      };
      let state = false;
      for (let element of this.store.basket) {
        if (element.id == item.id) {
          state = true;
          break;
        }
      }
      if (state) {
        const index = this.store.basket.findIndex(
          (element) => element.id == item.id,
        );
        if (item.variant) {
          if (
            item.variant.product.id ==
            this.store.basket[index].variant?.product.id
          ) {
            this.store.basket[index].count += 1;
          } else {
            this.store.basket.push(item);
          }
        } else {
          this.store.basket[index].count += 1;
        }
      } else {
        this.store.basket.push(item);
      }
    },
  },
  computed: {
    createStatesOfConfigurableCards() {
      return () => {
        let list: TypeStateOfConfigurableCard[] = [];
        products.forEach((item) => {
          if (item.configurable_options) {
            list.push({
              id: item.id,
              available_colors: [],
              available_sizes: [],
              choosen_option: {},
              image: item.image,
              variant_id: item.id,
              sku: item.sku,
            });
          }
        });
        return list;
      };
    },
  },
  beforeMount() {
    this.store.statesOfConfigurableCards =
      this.createStatesOfConfigurableCards();
  },
  watch: {
    store: {
      handler(storeItem: TypeStore) {
        if (storeItem.brandFilterId) {
          this.filteredProductsList = this.productsList.filter(
            (elem) => elem.brand == storeItem.brandFilterId,
          );
        } else {
          this.filteredProductsList = this.productsList;
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
.card {
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
}
.card img {
  width: 100%;
  height: 100%;
}
@media (hover: hover) {
  .card:hover {
    box-shadow: 0 0 5px black;
    padding: 10px;
  }
}
@media (hover: hover) {
  .card:active {
    box-shadow: 0 0 5px black;
    padding: 10px;
  }
}
.card h2 {
  font-size: 1.5em;
  font-weight: 800;
}
.card p {
  margin-top: 10px;
}
.card button:disabled {
  cursor: default;
  opacity: 0.25;
}
.infoBlock {
  display: flex;
  align-items: top;
  justify-content: space-between;
}
.info {
  width: 100%;
}
.info h2 {
  font-size: 1.3em;
  text-align: start;
}
.buttonBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.addButton {
  height: 30px;
  margin-bottom: 5px;
}
.colors {
  display: flex;
  align-items: top;
}
.backgroundOfColorOption {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 10px;
  margin-left: 0px;
  padding: 1px 2px;
}
.colorOption {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}
.sizes {
  display: flex;
  align-items: top;
}
.sizeOption {
  height: 20px;
  width: 30px;
  margin-right: 20px;
}
.warningMessage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.triangle {
  width: 0px;
  height: 0px;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  border-bottom: 10px solid rgba(211, 211, 211, 0.3);
}
.message {
  text-align: center;
  background-color: rgba(211, 211, 211, 0.3);
  border-radius: 7.5px;
  font-size: 0.7em;
  color: grey;
  padding: 5px;
  width: 100%;
}
</style>
