import TypeProduct from "../../Types/TypeProduct/TypeProduct";
import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeCatalogComponent = {
  filteredProductsList: TypeProduct[];
  productsList: TypeProduct[];
  colorsElementsList: Partial<HTMLElement>[];
  store: Store<"Store", TypeStore>;
};

export default TypeCatalogComponent;
