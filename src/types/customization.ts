export interface CustomizationOption {
  id: string;
  name: string;
  type: "stone" | "metal" | "size" | "length" | "finish";
  value: string;
  image?: string;
  price_adjustment: number;
}

export interface ProductCustomization {
  id: string;
  product_id: string;
  available_options: {
    stones?: CustomizationOption[];
    metals?: CustomizationOption[];
    sizes?: CustomizationOption[];
    lengths?: CustomizationOption[];
    finishes?: CustomizationOption[];
  };
  default_options: {
    stone?: string;
    metal?: string;
    size?: string;
    length?: string;
    finish?: string;
  };
}

export interface CustomizedProduct {
  product_id: string;
  selected_options: {
    stone?: string;
    metal?: string;
    size?: string;
    length?: string;
    finish?: string;
  };
  base_price: number;
  final_price: number;
}
