export interface CustomizationOption {
  id: string;
  name: string;
  type: "stone" | "metal" | "size" | "length" | "finish";
  value: string;
  image?: string;
  price_adjustment: number;
}

export interface ColorOption {
  id: string;
  name: string;
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

export interface SizeOption {
  id: string;
  name: string;
  value: string;
  description?: string;
}

export interface SizeGuideImage {
  url: string;
  alt: string;
}

export interface SizeCustomizationState {
  selectedSize: SizeOption | null;
  showSizeGuide: boolean;
}

export const DEFAULT_SIZE_OPTIONS: SizeOption[] = [
  {
    id: "size-1",
    name: '15" - 17"',
    value: "15-17",
    description: "Standard length for choker or high necklace",
  },
  {
    id: "size-2",
    name: '17" - 20"',
    value: "17-20",
    description: "Classic length, sits at collarbone",
  },
];

export const SIZE_GUIDE_IMAGE: SizeGuideImage = {
  url: "https://res.cloudinary.com/dbtapyfau/image/upload/v1758987711/Screenshot_2025-09-27_at_9.11.23_PM_o7zcya.png",
  alt: "Necklace Size Guide",
};
