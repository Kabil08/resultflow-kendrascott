import type {
  CustomizationOption,
  ProductCustomization,
} from "../types/customization";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductRecommendation {
  title: string;
  description: string;
  discount?: number;
  savings?: number;
  products: Product[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  recommendations?: ProductRecommendation[];
}

export interface ChatSuggestion {
  text: string;
  action: string;
}

export const mockRecommendations = {
  necklaces: {
    title: "Signature Necklace Collection",
    description:
      "Our most-loved necklaces featuring signature stones and designs",
    discount: 20,
    savings: 30,
    products: [
      {
        id: "necklace-1",
        name: "Elisa Gold Pendant Necklace",
        category: "Necklaces",
        description: "A versatile pendant necklace featuring a signature stone",
        price: 75,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373437/772-00071_bxjdx9.jpg",
      },
      {
        id: "necklace-2",
        name: "Elaina Gold Multi Strand Necklace",
        category: "Necklaces",
        description: "Delicate layered chains with adjustable length",
        price: 85,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373461/Kendra-Scott-Emilie-Muti-Strand-Necklace-Iridescent-Drusy-Gold-00_sy3yf9.jpg",
      },
      {
        id: "necklace-3",
        name: "Ari Heart Gold Pendant Necklace",
        category: "Necklaces",
        description: "Heart-shaped pendant with crystal accents",
        price: 65,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373483/Kendra-Scott-Ari-Heart-Pendant-Necklace-Rose-Quartz-Gold-01_t97ccg.jpg",
      },
    ],
  },
  earrings: {
    title: "Statement Earring Collection",
    description: "Bold and elegant earrings for any occasion",
    discount: 15,
    savings: 25,
    products: [
      {
        id: "earring-1",
        name: "Lee Gold Drop Earrings",
        category: "Earrings",
        description: "Classic drop earrings with a modern twist",
        price: 65,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373504/Kendra-Scott-Lee-Earring-Gold-Iridescent-Drusy-00_cak7fh.jpg",
      },
      {
        id: "earring-2",
        name: "Madelyn Gold Hoops",
        category: "Earrings",
        description: "Timeless hoop earrings with crystal detail",
        price: 70,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373526/s-l1200_dpipnu.jpg",
      },
      {
        id: "earring-3",
        name: "Elle Gold Stud Earrings",
        category: "Earrings",
        description: "Versatile studs for everyday wear",
        price: 55,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373544/665-02378_ugglc9.jpg",
      },
    ],
  },
  bracelets: {
    title: "Bracelet Collection",
    description: "Stackable bracelets and statement cuffs",
    discount: 25,
    savings: 35,
    products: [
      {
        id: "bracelet-1",
        name: "Elaina Gold Chain Bracelet",
        category: "Bracelets",
        description: "Adjustable chain bracelet with signature stone detail",
        price: 55,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373566/kendra-scott-elaina-gold-adjustable-bracelet-in-ivory-pearl_00_default_lg_eqivc5.jpg",
      },
      {
        id: "bracelet-2",
        name: "Dira Gold Cuff",
        category: "Bracelets",
        description: "Bold cuff bracelet with crystal accents",
        price: 95,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373584/705-43991_nebi6y.jpg",
      },
      {
        id: "bracelet-3",
        name: "Macrame Friendship Bracelet",
        category: "Bracelets",
        description: "Colorful adjustable bracelet with stone charm",
        price: 45,
        image:
          "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373640/kendra-scott-threaded-elle-friendship-bracelet-gold-goldstone-burnt-orange-thread-00-lg_qktdns.jpg",
      },
    ],
  },
};

export const chatSuggestions: ChatSuggestion[] = [
  {
    text: "I'm looking for a gift",
    action: "SHOW_GIFT_OPTIONS",
  },
  {
    text: "Show me new arrivals",
    action: "SHOW_NEW_ARRIVALS",
  },
  {
    text: "What's on sale?",
    action: "SHOW_SALE_ITEMS",
  },
  {
    text: "Help me find jewelry for an occasion",
    action: "SHOW_OCCASIONS",
  },
];

export const customizationOptions: { [key: string]: CustomizationOption[] } = {
  stones: [
    {
      id: "stone-1",
      name: "Rose Quartz",
      type: "stone",
      value: "rose-quartz",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373483/stone-rose-quartz.jpg",
      price_adjustment: 0,
    },
    {
      id: "stone-2",
      name: "Iridescent Drusy",
      type: "stone",
      value: "iridescent-drusy",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373504/stone-drusy.jpg",
      price_adjustment: 10,
    },
    {
      id: "stone-3",
      name: "Mother of Pearl",
      type: "stone",
      value: "mother-of-pearl",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373526/stone-pearl.jpg",
      price_adjustment: 15,
    },
  ],
  metals: [
    {
      id: "metal-1",
      name: "Gold",
      type: "metal",
      value: "gold",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373544/metal-gold.jpg",
      price_adjustment: 0,
    },
    {
      id: "metal-2",
      name: "Rose Gold",
      type: "metal",
      value: "rose-gold",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373566/metal-rose-gold.jpg",
      price_adjustment: 5,
    },
    {
      id: "metal-3",
      name: "Silver",
      type: "metal",
      value: "silver",
      image:
        "https://res.cloudinary.com/dbtapyfau/image/upload/v1758373584/metal-silver.jpg",
      price_adjustment: -5,
    },
  ],
  sizes: [
    {
      id: "size-1",
      name: 'Small (6")',
      type: "size",
      value: "small",
      price_adjustment: 0,
    },
    {
      id: "size-2",
      name: 'Medium (7")',
      type: "size",
      value: "medium",
      price_adjustment: 0,
    },
    {
      id: "size-3",
      name: 'Large (8")',
      type: "size",
      value: "large",
      price_adjustment: 0,
    },
  ],
};

export const productCustomizations: ProductCustomization[] = [
  {
    id: "custom-necklace-1",
    product_id: "necklace-1",
    available_options: {
      stones: customizationOptions.stones,
      metals: customizationOptions.metals,
    },
    default_options: {
      stone: "rose-quartz",
      metal: "gold",
    },
  },
  {
    id: "custom-bracelet-1",
    product_id: "bracelet-1",
    available_options: {
      stones: customizationOptions.stones,
      metals: customizationOptions.metals,
      sizes: customizationOptions.sizes,
    },
    default_options: {
      stone: "mother-of-pearl",
      metal: "gold",
      size: "medium",
    },
  },
];

export const commonResponses = {
  greeting: `Hi! I'm your personal assistant. Based on your profile and preferences, here's what we have analyzed:

**🔍 Your Style Profile:**
• Classic and elegant taste
• Preference for gold-toned jewelry
• Interest in versatile pieces

**📋 Your Preferences:**
• Comfortable, everyday wear
• Layerable pieces
• Hypoallergenic materials

**✨ Special Considerations:**
• Looking for pieces that transition from day to night
• Interest in meaningful jewelry with personal significance
• Preference for adjustable pieces for perfect fit

Based on this comprehensive analysis, I've curated some perfect pieces for you:`,
  giftHelp:
    "I'd love to help you find the perfect gift! Could you tell me who you're shopping for and what's your budget range?",
  newArrivals:
    "Our latest collection features beautiful pieces inspired by the American West. Would you like to see our newest necklaces, earrings, or bracelets?",
  saleItems:
    "We have some amazing deals right now, including our special '2 for $80' promotion! Are you interested in any specific category like necklaces, earrings, or bracelets?",
  occasions:
    "We have perfect pieces for every occasion! Are you shopping for a wedding, everyday wear, or a special event?",
  notFound:
    "I'm sorry, I couldn't find exactly what you're looking for. Would you like to see some similar items or try a different search?",
  braceletSuggestion:
    "These bracelets would perfectly complement your selected pieces, creating a cohesive and personalized look:",
  customization: {
    new_user:
      "I noticed you're interested in our jewelry! Did you know you can customize many of our pieces through our Color Bar™? You can choose your favorite stones, metals, and more to create a piece that's uniquely yours. Would you like me to show you how it works?",
    returning_user:
      "Welcome back! I see you've customized pieces before. Would you like to explore our latest customizable collections or recreate a previous design?",
    stone_selection:
      "Which stone speaks to you? Each has its own unique properties and beauty:",
    metal_selection:
      "Now, let's choose the perfect metal to complement your stone. Our options include:",
    size_guide:
      "For the perfect fit, let's determine your size. Would you like to see our size guide or do you know your size?",
  },
};

export interface Review {
  id: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
}

export const userReviews: Review[] = [
  {
    id: "1",
    userName: "Sarah M.",
    userImage: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment:
      "I absolutely love the personalized recommendations! The AI helped me find the perfect necklace that matches my style perfectly.",
    productName: "Diamond Pendant Necklace",
    date: "2024-03-15",
  },
  {
    id: "2",
    userName: "Emily R.",
    userImage: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    comment:
      "The smart cart feature made it so easy to find matching pieces. I got a beautiful earring and bracelet set that goes together wonderfully!",
    productName: "Pearl Earring Set",
    date: "2024-03-10",
  },
  {
    id: "3",
    userName: "Jessica K.",
    userImage: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment:
      "The AI suggestions were spot on! Found exactly what I was looking for without spending hours browsing.",
    productName: "Gold Tennis Bracelet",
    date: "2024-03-05",
  },
];
