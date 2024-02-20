import TypeBrand from "../Types/TypeBrand";
import TypeStateOfConfigurableCard from "../Types/TypeStateOfConfigurableCard";
import TypeBasket from "../Types/TypeBasket";

type TypeStore = {
  brands: TypeBrand[];
  brandFilterId?: number;
  statesOfConfigurableCards: TypeStateOfConfigurableCard[];
  basket: TypeBasket[];
};

export default TypeStore;
