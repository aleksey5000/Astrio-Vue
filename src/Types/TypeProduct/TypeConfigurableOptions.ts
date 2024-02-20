type TypeConfigurableOptions = {
  attribute_id: number;
  attribute_code: string;
  label: string;
  values: {
    label: string;
    value_index: number;
    value: string | number;
  }[];
};

export default TypeConfigurableOptions;
