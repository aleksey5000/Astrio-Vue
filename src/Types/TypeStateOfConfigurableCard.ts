type TypeStateOfConfigurableCard = {
  id: number;
  available_colors: number[];
  available_sizes: number[];
  choosen_option: {
    color_value?: number;
    color?: string;
    size_value?: number;
    size?: string;
  };
  image: string;
  sku: string;
  variant_id: number;
};

export default TypeStateOfConfigurableCard;
