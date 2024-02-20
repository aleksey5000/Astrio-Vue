import { Store } from "pinia";
import TypeStore from "../../store/TypeStore";

type TypeBasketComponent = {
  store: Store<"Store", TypeStore>;
};

export default TypeBasketComponent;
