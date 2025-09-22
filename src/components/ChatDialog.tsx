import { useState } from "react";
import { X, Send, Bot, User, Check, Headphones } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { useIsMobile } from "../hooks/use-mobile";
import { mockRecommendations, commonResponses } from "../data/mockData";
import type { Message, Product, ProductRecommendation } from "../data/mockData";
import { SmartCart, type CartItem } from "./SmartCart";
import Markdown from "markdown-to-jsx";

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: commonResponses.greeting,
      recommendations: [
        mockRecommendations.necklaces,
        mockRecommendations.earrings,
      ],
    },
    {
      role: "assistant",
      content: commonResponses.braceletSuggestion,
      recommendations: [mockRecommendations.bracelets],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showSmartCart, setShowSmartCart] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(input.trim());
      const assistantMessage: Message = {
        role: "assistant",
        content: response.content,
        recommendations: response.recommendations,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleSelectAllProducts = (products: Product[]) => {
    const allSelected = products.every(
      (product) => selectedProducts[product.id]
    );
    const newSelectedProducts = { ...selectedProducts };

    products.forEach((product) => {
      newSelectedProducts[product.id] = !allSelected;
    });

    setSelectedProducts(newSelectedProducts);
  };

  const handleAddSelectedToCart = (products: Product[]) => {
    const selectedProductIds = Object.entries(selectedProducts)
      .filter((entry) => entry[1])
      .map((entry) => entry[0]);

    const productsToAdd = products.filter((product) =>
      selectedProductIds.includes(product.id)
    );

    if (productsToAdd.length === 0) {
      return;
    }

    setCartItems((prev) => {
      const newItems = [...prev];
      productsToAdd.forEach((product) => {
        const existingItem = newItems.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          newItems.push({ ...product, quantity: 1 });
        }
      });
      return newItems;
    });

    setShowSmartCart(true);
    setSelectedProducts({});
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getAIResponse = (
    userMessage: string
  ): { content: string; recommendations?: ProductRecommendation[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Jewelry Categories
    if (lowerMessage.includes("necklace") || lowerMessage.includes("pendant")) {
      return {
        content:
          "We have a beautiful selection of necklaces! Our bestselling Elisa Pendant Necklace comes in various stones and metals. Here are some options:",
        recommendations: [mockRecommendations.necklaces],
      };
    }

    if (lowerMessage.includes("earring")) {
      return {
        content:
          "Our earring collection includes studs, drops, and statement pieces. The Lee Drop Earrings are particularly popular. Here are some options:",
        recommendations: [mockRecommendations.earrings],
      };
    }

    if (lowerMessage.includes("bracelet")) {
      return {
        content:
          "From delicate chains to statement cuffs, we have bracelets for every style. The Elaina Bracelet is one of our most versatile pieces. Here are some options:",
        recommendations: [mockRecommendations.bracelets],
      };
    }

    // Price and Deals
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("deal")
    ) {
      return {
        content: commonResponses.saleItems,
        recommendations: [
          mockRecommendations.necklaces,
          mockRecommendations.earrings,
          mockRecommendations.bracelets,
        ],
      };
    }

    // Default response
    return {
      content:
        "I can help you find the perfect piece! Here are some of our most popular collections:",
      recommendations: [
        mockRecommendations.necklaces,
        mockRecommendations.earrings,
        mockRecommendations.bracelets,
      ],
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const renderRecommendation = (recommendation: ProductRecommendation) => {
    const allSelected = recommendation.products.every(
      (product) => selectedProducts[product.id]
    );

    return (
      <div className="mt-2 p-4 bg-white rounded-lg border border-ks-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-ks-dark flex items-center gap-2">
            {recommendation.title}
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-sm border-ks-gold text-ks-dark hover:bg-ks-beige"
            onClick={() => handleSelectAllProducts(recommendation.products)}
          >
            {allSelected ? "Deselect All" : "Select All"}
          </Button>
        </div>
        <p className="text-sm text-ks-dark/60 mt-1">
          {recommendation.description}
        </p>
        <div className="mt-2 space-y-4">
          {recommendation.products.map((product) => (
            <div key={product.id} className="flex items-center gap-4">
              <div
                className="w-6 h-6 rounded border border-ks-border flex items-center justify-center cursor-pointer hover:bg-ks-beige"
                onClick={() => handleSelectProduct(product.id)}
              >
                {selectedProducts[product.id] && (
                  <Check className="h-4 w-4 text-ks-gold" />
                )}
              </div>
              <div className="w-20 h-20 bg-ks-beige rounded-lg overflow-hidden shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ks-dark">{product.name}</p>
                </div>
                <p className="text-sm text-ks-dark/60">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {recommendation.discount && (
          <p className="mt-4 text-sm text-green-600">
            Save {recommendation.discount}% ($
            {recommendation.savings?.toFixed(2)})
          </p>
        )}
        <Button
          size="sm"
          className="mt-4 w-full bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
          onClick={() => handleAddSelectedToCart(recommendation.products)}
          disabled={
            !recommendation.products.some(
              (product) => selectedProducts[product.id]
            )
          }
        >
          Add Selected to Cart
        </Button>
      </div>
    );
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side={isMobile ? "bottom" : "right"}
          className={`${
            isMobile
              ? "h-[85vh] border-t rounded-t-[10px] p-0 flex flex-col bg-ks-cream"
              : "w-full md:w-[400px] p-0 border-l sm:border-l flex flex-col bg-ks-cream"
          }`}
        >
          <SheetHeader className="p-4 border-b border-ks-border bg-ks-gold sticky top-0 z-50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <SheetTitle className="text-xl font-semibold text-ks-dark">
                    Assistant
                  </SheetTitle>
                  <SheetDescription className="text-sm text-ks-dark/80">
                    How can I help you today?
                  </SheetDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 text-ks-dark hover:text-ks-dark/80 hover:bg-ks-beige"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message, i) => (
                <div key={i}>
                  <div
                    className={`flex items-start gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user"
                          ? "bg-ks-gold text-ks-dark"
                          : "bg-ks-beige border border-ks-border"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5 text-ks-dark" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-ks-gold text-ks-dark"
                          : "bg-white border border-ks-border"
                      }`}
                    >
                      <div className="markdown">
                        <Markdown
                          options={{
                            forceBlock: true,
                            overrides: {
                              p: {
                                component: "p",
                                props: {
                                  className: "whitespace-pre-wrap text-current",
                                },
                              },
                              strong: {
                                component: "strong",
                                props: {
                                  className: "font-semibold text-current",
                                },
                              },
                              ul: {
                                component: "ul",
                                props: {
                                  className: "list-disc list-inside space-y-1",
                                },
                              },
                            },
                          }}
                        >
                          {message.content}
                        </Markdown>
                      </div>
                    </div>
                  </div>
                  {message.recommendations?.map((recommendation, index) => (
                    <div key={index} className="ml-11 mt-2">
                      {renderRecommendation(recommendation)}
                    </div>
                  ))}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-ks-dark/60">
                  <Bot className="h-5 w-5" />
                  <span>Typing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-ks-border bg-white sticky bottom-0 flex-shrink-0 mt-auto">
            <div className="flex items-center justify-center mb-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-ks-dark hover:bg-ks-beige flex items-center gap-2"
              >
                <Headphones className="h-4 w-4" />
                Talk to an expert
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-ks-border focus-visible:ring-ks-gold"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="bg-ks-gold hover:bg-ks-gold/90 text-ks-dark"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <SmartCart
        isOpen={showSmartCart}
        onClose={() => setShowSmartCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}
