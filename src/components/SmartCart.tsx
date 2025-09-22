import { useState, useEffect } from "react";
import { Minus, Plus, PartyPopper } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";
import type { Product } from "../data/mockData";
import confetti from "canvas-confetti";

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface SmartCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function SmartCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
}: SmartCartProps) {
  const isMobile = useIsMobile();
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);

  // Reset states when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setIsCheckoutComplete(false);
    }
  }, [isOpen]);

  const triggerConfetti = () => {
    // Fire multiple confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleMoveToCart = () => {
    setIsCheckoutComplete(true);
    setTimeout(triggerConfetti, 100);
  };

  const handleClose = () => {
    onClose();
  };

  const renderSuccessContent = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="animate-bounce-slow">
        <PartyPopper className="h-16 w-16 text-ks-gold" />
      </div>
      <h2 className="text-2xl font-semibold text-ks-dark">Added to cart! 🎉</h2>
      <p className="text-ks-dark/60 max-w-sm">
        Your items have been successfully added to your cart.
      </p>
      <Button
        className="mt-4 bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
        onClick={() => {
          setIsCheckoutComplete(false);
          onClose();
        }}
      >
        Close
      </Button>
    </div>
  );

  const renderHeader = () => (
    <div className="flex items-center">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-ks-dark">
            Your smart cart
          </h2>
        </div>
        <p className="text-sm text-ks-dark/60 flex items-center gap-1">
          Powered by ResultFlow.ai
        </p>
      </div>
    </div>
  );

  const renderContent = () => (
    <>
      <div className="overflow-y-auto flex-1">
        {isCheckoutComplete ? (
          renderSuccessContent()
        ) : (
          <div className="p-4 space-y-4">
            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-ks-beige rounded-lg border border-ks-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-ks-dark">{item.name}</h3>
                    <p className="text-sm text-ks-dark/60">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-ks-beige text-ks-dark"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center text-ks-dark">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-ks-beige text-ks-dark"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Talk to Expert */}
            <div className="p-4 bg-white rounded-lg border border-ks-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-ks-dark">
                    Need help with your order?
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-ks-dark hover:bg-ks-beige flex items-center gap-2"
                >
                  📞 Talk to expert
                </Button>
              </div>
            </div>

            {/* Action Button */}
            <Button
              size="lg"
              className="w-full h-12 bg-ks-gold hover:bg-ks-gold/90 text-ks-dark mt-4"
              onClick={handleMoveToCart}
            >
              Move to Cart
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={`${
          isMobile
            ? "h-[85vh] border-t rounded-t-[10px] p-0 flex flex-col bg-ks-cream"
            : "w-full md:w-[400px] p-0 border-l sm:border-l flex flex-col bg-ks-cream"
        }`}
      >
        <SheetHeader className="p-4 border-b border-ks-border bg-ks-gold relative">
          {renderHeader()}
        </SheetHeader>
        <div className="flex flex-col max-h-[80vh]">{renderContent()}</div>
      </SheetContent>
    </Sheet>
  );
}
