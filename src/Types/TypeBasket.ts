import TypeVariant from "./TypeProduct/TypeVariant";

type TypeBasket = {
  id: number;
  title: string;
  regular_price: { currency: string; value: number };
  brand: string;
  image: string;
  count: number;
  variant?: TypeVariant;
};
export default TypeBasket;
