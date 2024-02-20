type TypeVariant = {
  attributes: {
    code: string;
    value_index: number;
    color?: string;
    size?: string;
  }[];
  product: {
    id: number;
    sku: string;
    image: string;
  };
};

export default TypeVariant;
