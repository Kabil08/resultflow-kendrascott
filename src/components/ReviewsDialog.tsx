import { Star, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { userReviews } from "../data/mockData";
import { Button } from "./ui/button";

interface ReviewsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
}

export function ReviewsDialog({
  isOpen,
  onClose,
  onBackToCart,
}: ReviewsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-ks-cream p-0">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 hover:bg-transparent"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-ks-dark">
                What our customers say
              </h2>
              <p className="text-base text-ks-dark/60">
                See how our AI has helped others find their perfect pieces
              </p>
            </div>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {userReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-white rounded-lg border border-ks-border"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-ks-dark">
                        {review.userName}
                      </h3>
                      <div className="flex items-center">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-ks-gold text-ks-gold"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-ks-dark/60 mt-1">
                      {review.comment}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-ks-dark/40">
                        {review.productName}
                      </span>
                      <span className="text-xs text-ks-dark/40">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 mt-4">
          <Button
            className="w-full bg-[#FDB022] hover:bg-[#FDB022]/90 text-ks-dark h-12 rounded-lg text-base font-medium"
            onClick={onBackToCart}
          >
            Back to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
