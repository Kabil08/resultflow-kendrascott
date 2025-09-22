import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import type {
  CustomizationOption,
  ProductCustomization,
  CustomizedProduct,
} from "../types/customization";
import type { Product } from "../data/mockData";

interface CustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  customization: ProductCustomization;
  onCustomizationComplete: (customizedProduct: CustomizedProduct) => void;
}

export function CustomizationDialog({
  isOpen,
  onClose,
  product,
  customization,
  onCustomizationComplete,
}: CustomizationDialogProps) {
  const [step, setStep] = useState<"stone" | "metal" | "size" | "review">(
    "stone"
  );
  const [selectedOptions, setSelectedOptions] = useState(
    customization.default_options
  );

  const calculateFinalPrice = () => {
    let finalPrice = product.price;

    Object.entries(selectedOptions).forEach(([type, value]) => {
      const options =
        customization.available_options[
          (type + "s") as keyof typeof customization.available_options
        ];
      const selectedOption = options?.find((opt) => opt.value === value);
      if (selectedOption) {
        finalPrice += selectedOption.price_adjustment;
      }
    });

    return finalPrice;
  };

  const handleOptionSelect = (type: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Move to next step
    if (type === "stone" && customization.available_options.metals) {
      setStep("metal");
    } else if (type === "metal" && customization.available_options.sizes) {
      setStep("size");
    } else {
      setStep("review");
    }
  };

  const handleComplete = () => {
    onCustomizationComplete({
      product_id: product.id,
      selected_options: selectedOptions,
      base_price: product.price,
      final_price: calculateFinalPrice(),
    });
    onClose();
  };

  const renderOptionList = (options: CustomizationOption[]) => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {options.map((option) => (
        <div
          key={option.id}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedOptions[option.type] === option.value
              ? "border-ks-gold bg-ks-beige"
              : "border-ks-border hover:border-ks-gold"
          }`}
          onClick={() => handleOptionSelect(option.type, option.value)}
        >
          {option.image && (
            <div className="w-full h-32 mb-3 rounded-md overflow-hidden">
              <img
                src={option.image}
                alt={option.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-ks-dark">{option.name}</h3>
              {option.price_adjustment !== 0 && (
                <p className="text-sm text-ks-dark/60">
                  {option.price_adjustment > 0 ? "+" : ""}$
                  {option.price_adjustment.toFixed(2)}
                </p>
              )}
            </div>
            {selectedOptions[option.type] === option.value && (
              <Check className="h-5 w-5 text-ks-gold" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case "stone":
        return (
          customization.available_options.stones && (
            <div>
              <h2 className="text-lg font-medium text-ks-dark mb-2">
                Choose Your Stone
              </h2>
              <p className="text-sm text-ks-dark/60 mb-4">
                Select a stone that speaks to your style
              </p>
              {renderOptionList(customization.available_options.stones)}
            </div>
          )
        );
      case "metal":
        return (
          customization.available_options.metals && (
            <div>
              <h2 className="text-lg font-medium text-ks-dark mb-2">
                Select Metal Type
              </h2>
              <p className="text-sm text-ks-dark/60 mb-4">
                Choose a metal to complement your stone
              </p>
              {renderOptionList(customization.available_options.metals)}
            </div>
          )
        );
      case "size":
        return (
          customization.available_options.sizes && (
            <div>
              <h2 className="text-lg font-medium text-ks-dark mb-2">
                Choose Your Size
              </h2>
              <p className="text-sm text-ks-dark/60 mb-4">
                Select the perfect size for you
              </p>
              {renderOptionList(customization.available_options.sizes)}
            </div>
          )
        );
      case "review":
        return (
          <div>
            <h2 className="text-lg font-medium text-ks-dark mb-4">
              Review Your Customization
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-ks-beige rounded-lg">
                <h3 className="font-medium text-ks-dark mb-2">
                  {product.name}
                </h3>
                <div className="space-y-2 text-sm text-ks-dark/60">
                  {Object.entries(selectedOptions).map(([type, value]) => {
                    const options =
                      customization.available_options[
                        (type +
                          "s") as keyof typeof customization.available_options
                      ];
                    const selected = options?.find(
                      (opt) => opt.value === value
                    );
                    return (
                      selected && (
                        <div key={type} className="flex items-center gap-2">
                          <span className="capitalize">{type}:</span>
                          <span className="font-medium text-ks-dark">
                            {selected.name}
                          </span>
                        </div>
                      )
                    );
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-ks-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ks-dark/60">Base Price:</span>
                    <span className="font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-ks-dark/60">
                      Customization:
                    </span>
                    <span className="font-medium">
                      ${(calculateFinalPrice() - product.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-ks-border">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium text-lg">
                      ${calculateFinalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
                onClick={handleComplete}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-ks-dark flex items-center gap-2">
            <span>Color Bar™ Customization</span>
            <ChevronRight className="h-5 w-5" />
            <span className="text-ks-gold">{product.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">{renderStep()}</div>
      </DialogContent>
    </Dialog>
  );
}
