import TypeConfigurableOptions from "./TypeConfigurableOptions";
import TypeVariant from "./TypeVariant";

type TypeProduct = {
  type: string;
  id: number;
  sku: string;
  title: string;
  regular_price: {
    currency: string;
    value: number;
  };
  image: string;
  brand: number;
  configurable_options?: TypeConfigurableOptions[];
  variants?: TypeVariant[];
};

export default TypeProduct;
