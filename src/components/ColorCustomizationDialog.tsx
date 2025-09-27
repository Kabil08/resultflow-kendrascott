import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Product } from "../data/mockData";

interface ColorOption {
  id: string;
  name: string;
  value: string;
  image?: string;
  price_adjustment: number;
}

interface ColorCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onCustomize: (productId: string, color: ColorOption) => void;
}

const colorOptions: ColorOption[] = [
  {
    id: "color-1",
    name: "Gold",
    value: "gold",
    image:
      "https://res.cloudinary.com/dbtapyfau/image/upload/v1758946308/kendra-scott-elisa-gold-pendant-necklace-in-berry_00_default_lg_yeintp.jpg",
    price_adjustment: 0,
  },
  {
    id: "color-2",
    name: "Blue",
    value: "blue",
    image:
      "https://res.cloudinary.com/dbtapyfau/image/upload/v1758946309/655-00626_vdeqjt.jpg",
    price_adjustment: 5,
  },
  {
    id: "color-3",
    name: "Rose Gold",
    value: "rose-gold",
    image:
      "https://res.cloudinary.com/dbtapyfau/image/upload/v1758946215/kendra-scott-elisa-rose-gold-pendant-necklace-in-iridescent-drusy_00_default_lg_w51psa.jpg",
    price_adjustment: 10,
  },
];

export function ColorCustomizationDialog({
  isOpen,
  onClose,
  product,
  onCustomize,
}: ColorCustomizationDialogProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const handleConfirm = () => {
    if (selectedColor) {
      onCustomize(product.id, selectedColor);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Color</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {colorOptions.map((color) => (
            <div
              key={color.id}
              className={`cursor-pointer p-2 rounded-lg border-2 ${
                selectedColor?.id === color.id
                  ? "border-ks-gold"
                  : "border-transparent hover:border-ks-gold/50"
              }`}
              onClick={() => handleColorSelect(color)}
            >
              <div className="aspect-square rounded-md overflow-hidden mb-2">
                <img
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-ks-dark">{color.name}</p>
                {color.price_adjustment !== 0 && (
                  <p className="text-xs text-ks-dark/60">
                    {color.price_adjustment > 0 ? "+" : ""}$
                    {Math.abs(color.price_adjustment)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedColor}
            className="bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
