import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { DEFAULT_SIZE_OPTIONS, SIZE_GUIDE_IMAGE } from "../types/customization";
import type { SizeOption } from "../types/customization";

interface SizeCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSizeSelect: (size: SizeOption) => void;
}

export function SizeCustomizationDialog({
  isOpen,
  onClose,
  onSizeSelect,
}: SizeCustomizationDialogProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size);
  };

  const handleConfirm = () => {
    if (selectedSize) {
      onSizeSelect(selectedSize);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Size</DialogTitle>
        </DialogHeader>

        {!showSizeGuide ? (
          <>
            <div className="grid grid-cols-2 gap-4 py-4">
              {DEFAULT_SIZE_OPTIONS.map((size) => (
                <div
                  key={size.id}
                  className={`cursor-pointer p-4 rounded-lg border-2 ${
                    selectedSize?.id === size.id
                      ? "border-ks-gold"
                      : "border-transparent hover:border-ks-gold/50"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  <p className="text-lg font-medium text-ks-dark text-center">
                    {size.name}
                  </p>
                  {size.description && (
                    <p className="text-sm text-ks-dark/60 text-center mt-1">
                      {size.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mb-4"
              onClick={() => setShowSizeGuide(true)}
            >
              Size Guide
            </Button>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!selectedSize}
                className="bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
              >
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="py-4">
              <img
                src={SIZE_GUIDE_IMAGE.url}
                alt={SIZE_GUIDE_IMAGE.alt}
                className="w-full rounded-lg"
              />
            </div>

            <Button className="w-full" onClick={() => setShowSizeGuide(false)}>
              Back to Size Selection
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
