import TypeBrand from "../../Types/TypeBrand";
import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeBrandsComponent = {
  isBrandButtonVisible: boolean;
  brands_list: TypeBrand[];
  store: Store<"Store", TypeStore>;
};

export default TypeBrandsComponent;
