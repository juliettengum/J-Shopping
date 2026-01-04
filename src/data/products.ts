export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  bannerImage: string; // Main image for listings
  images: string[]; // All product images including banner
  rating: number;
  originalPrice: number;
  discountedPrice?: number;
  category: string;
  inStock: boolean;
  stockQuantity: number;
};

// High-quality image URLs from shadcnstudio CDN
const IMAGES = {
  clothing: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
  ],
  watches: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-6.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-5.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
  ],
  accessories: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-1.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-3.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-4.png",
  ],
  handbags: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-26.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-11.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-1.png",
  ],
  cosmetics: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-27.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-35.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-34.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
  ],
  footwear: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-category/image-28.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-12.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-32.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-33.png",
  ],
  home: [
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-12.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/order-summary/image-11.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-1.png",
    "https://cdn.shadcnstudio.com/ss-assets/blocks/ecommerce/product-list/image-2.png",
  ],
};

export const allProducts: Product[] = [
  // ==================== CLOTHES (8 products) ====================
  {
    id: 1,
    name: "Summer Dress",
    slug: "summer-dress",
    description:
      "Beautiful floral summer dress perfect for warm weather. Made with breathable fabric that keeps you cool and comfortable all day long. Features a flattering A-line silhouette and adjustable straps.",
    bannerImage: IMAGES.clothing[0],
    images: [...IMAGES.clothing],
    rating: 4.1,
    discountedPrice: 80,
    originalPrice: 129,
    category: "clothes",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: 3,
    name: "Formal Shirt",
    slug: "formal-shirt",
    description:
      "Classic formal shirt perfect for office wear and special occasions. Crafted from premium cotton with a crisp finish that maintains its shape throughout the day.",
    bannerImage: IMAGES.clothing[1],
    images: [
      IMAGES.clothing[1],
      IMAGES.clothing[0],
      IMAGES.clothing[2],
      IMAGES.clothing[3],
    ],
    rating: 4.8,
    discountedPrice: 52,
    originalPrice: 80,
    category: "clothes",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: 5,
    name: "Denim T-shirt",
    slug: "denim-t-shirt",
    description:
      "Casual denim t-shirt for everyday wear. Comfortable and stylish with a relaxed fit. Perfect for pairing with jeans or shorts.",
    bannerImage: IMAGES.clothing[2],
    images: [
      IMAGES.clothing[2],
      IMAGES.clothing[3],
      IMAGES.clothing[0],
      IMAGES.clothing[1],
    ],
    rating: 5.0,
    originalPrice: 85,
    category: "clothes",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 7,
    name: "Plain Shirt",
    slug: "plain-shirt",
    description:
      "Simple and elegant plain shirt for any occasion. Versatile design that works for both casual and semi-formal settings.",
    bannerImage: IMAGES.clothing[3],
    images: [
      IMAGES.clothing[3],
      IMAGES.clothing[2],
      IMAGES.clothing[1],
      IMAGES.clothing[0],
    ],
    rating: 4.3,
    originalPrice: 32,
    category: "clothes",
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: 9,
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    description:
      "Vibrant floral pattern dress perfect for summer outings. Lightweight fabric with a feminine silhouette that's perfect for beach days or garden parties.",
    bannerImage: IMAGES.clothing[0],
    images: [...IMAGES.clothing],
    rating: 4.2,
    discountedPrice: 75,
    originalPrice: 120,
    category: "clothes",
    inStock: true,
    stockQuantity: 18,
  },
  {
    id: 11,
    name: "Casual Striped Shirt",
    slug: "casual-striped-shirt",
    description:
      "Trendy striped shirt for casual outings and weekend wear. Features a modern slim fit and button-down collar.",
    bannerImage: IMAGES.clothing[1],
    images: [
      IMAGES.clothing[1],
      IMAGES.clothing[2],
      IMAGES.clothing[3],
      IMAGES.clothing[0],
    ],
    rating: 4.5,
    discountedPrice: 45,
    originalPrice: 70,
    category: "clothes",
    inStock: true,
    stockQuantity: 35,
  },
  {
    id: 13,
    name: "Classic Polo Shirt",
    slug: "classic-polo-shirt",
    description:
      "Timeless polo shirt design suitable for all occasions. Made from soft pique cotton with a ribbed collar and two-button placket.",
    bannerImage: IMAGES.clothing[2],
    images: [
      IMAGES.clothing[2],
      IMAGES.clothing[0],
      IMAGES.clothing[1],
      IMAGES.clothing[3],
    ],
    rating: 4.7,
    originalPrice: 65,
    category: "clothes",
    inStock: true,
    stockQuantity: 28,
  },
  {
    id: 15,
    name: "Button Down Shirt",
    slug: "button-down-shirt",
    description:
      "Classic button-down shirt with modern fit and premium fabric. Perfect for creating a polished look for any occasion.",
    bannerImage: IMAGES.clothing[3],
    images: [
      IMAGES.clothing[3],
      IMAGES.clothing[1],
      IMAGES.clothing[0],
      IMAGES.clothing[2],
    ],
    rating: 4.4,
    originalPrice: 55,
    category: "clothes",
    inStock: true,
    stockQuantity: 45,
  },

  // ==================== ELECTRONICS (6 products) ====================
  {
    id: 2,
    name: "Samsung Galaxy Watch 6 Classic",
    slug: "samsung-galaxy-watch-6-classic",
    description:
      "Premium smartwatch with advanced health tracking and fitness features. Rotating bezel for easy navigation, sleep tracking, and body composition analysis.",
    bannerImage: IMAGES.watches[0],
    images: [...IMAGES.watches],
    rating: 4.7,
    originalPrice: 129,
    category: "electronics",
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 7",
    slug: "samsung-galaxy-watch-7",
    description:
      "Latest generation smartwatch with enhanced battery life and new features. AI-powered health insights and seamless connectivity with your smartphone.",
    bannerImage: IMAGES.watches[1],
    images: [
      IMAGES.watches[1],
      IMAGES.watches[0],
      IMAGES.watches[2],
      IMAGES.watches[3],
    ],
    rating: 4.9,
    discountedPrice: 139,
    originalPrice: 229,
    category: "electronics",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: 6,
    name: "Samsung Galaxy Watch Ultra",
    slug: "samsung-galaxy-watch-ultra",
    description:
      "Ultimate smartwatch for fitness enthusiasts with rugged design. Built to withstand extreme conditions with titanium frame and sapphire crystal display.",
    bannerImage: IMAGES.watches[2],
    images: [
      IMAGES.watches[2],
      IMAGES.watches[3],
      IMAGES.watches[0],
      IMAGES.watches[1],
    ],
    rating: 4.6,
    originalPrice: 119,
    category: "electronics",
    inStock: true,
    stockQuantity: 8,
  },
  {
    id: 10,
    name: "Premium Smart Watch",
    slug: "premium-smart-watch",
    description:
      "High-end smartwatch with advanced features and elegant design. Perfect blend of style and functionality with customizable watch faces.",
    bannerImage: IMAGES.watches[0],
    images: [...IMAGES.watches],
    rating: 4.8,
    originalPrice: 199,
    category: "electronics",
    inStock: true,
    stockQuantity: 12,
  },
  {
    id: 12,
    name: "Fitness Tracker Watch",
    slug: "fitness-tracker-watch",
    description:
      "Dedicated fitness tracker with heart rate monitoring and GPS. Track your workouts, monitor your progress, and achieve your fitness goals.",
    bannerImage: IMAGES.watches[1],
    images: [
      IMAGES.watches[1],
      IMAGES.watches[2],
      IMAGES.watches[3],
      IMAGES.watches[0],
    ],
    rating: 4.6,
    discountedPrice: 120,
    originalPrice: 180,
    category: "electronics",
    inStock: true,
    stockQuantity: 22,
  },
  {
    id: 14,
    name: "Sport Performance Watch",
    slug: "sport-performance-watch",
    description:
      "Professional sports watch with advanced performance metrics. Multi-sport tracking, VO2 max estimation, and training load analysis.",
    bannerImage: IMAGES.watches[2],
    images: [
      IMAGES.watches[2],
      IMAGES.watches[0],
      IMAGES.watches[1],
      IMAGES.watches[3],
    ],
    rating: 4.9,
    originalPrice: 249,
    category: "electronics",
    inStock: true,
    stockQuantity: 6,
  },

  // ==================== HANDBAGS (4 products) ====================
  {
    id: 16,
    name: "Premium Leather Handbag",
    slug: "premium-leather-handbag",
    description:
      "Elegant leather handbag crafted with premium materials for everyday luxury. Features multiple compartments, secure zipper closure, and detachable shoulder strap.",
    bannerImage: IMAGES.handbags[0],
    images: [...IMAGES.handbags],
    rating: 4.8,
    discountedPrice: 189,
    originalPrice: 250,
    category: "handbags",
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: 17,
    name: "Designer Crossbody Bag",
    slug: "designer-crossbody-bag",
    description:
      "Stylish crossbody bag perfect for casual outings and travel. Adjustable strap, compact design with surprising capacity.",
    bannerImage: IMAGES.handbags[1],
    images: [
      IMAGES.handbags[1],
      IMAGES.handbags[0],
      IMAGES.handbags[2],
      IMAGES.handbags[3],
    ],
    rating: 4.6,
    originalPrice: 150,
    category: "handbags",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: 18,
    name: "Classic Tote Bag",
    slug: "classic-tote-bag",
    description:
      "Spacious tote bag ideal for work, shopping, and daily essentials. Durable construction with reinforced handles and interior pockets.",
    bannerImage: IMAGES.handbags[0],
    images: [
      IMAGES.handbags[0],
      IMAGES.handbags[2],
      IMAGES.handbags[1],
      IMAGES.handbags[3],
    ],
    rating: 4.5,
    discountedPrice: 95,
    originalPrice: 130,
    category: "handbags",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: 19,
    name: "Evening Clutch Purse",
    slug: "evening-clutch-purse",
    description:
      "Elegant clutch purse for special occasions and evening events. Sleek design with gold-tone hardware and optional chain strap.",
    bannerImage: IMAGES.handbags[1],
    images: [
      IMAGES.handbags[1],
      IMAGES.handbags[3],
      IMAGES.handbags[0],
      IMAGES.handbags[2],
    ],
    rating: 4.7,
    originalPrice: 85,
    category: "handbags",
    inStock: true,
    stockQuantity: 18,
  },

  // ==================== COSMETICS (4 products) ====================
  {
    id: 20,
    name: "Professional Makeup Set",
    slug: "professional-makeup-set",
    description:
      "Complete makeup kit with high-quality cosmetics for every look. Includes eyeshadow palette, lipsticks, brushes, and more in a beautiful case.",
    bannerImage: IMAGES.cosmetics[0],
    images: [...IMAGES.cosmetics],
    rating: 4.9,
    discountedPrice: 85,
    originalPrice: 120,
    category: "cosmetics",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: 21,
    name: "Luxury Skincare Bundle",
    slug: "luxury-skincare-bundle",
    description:
      "Premium skincare collection for radiant and healthy skin. Includes cleanser, toner, serum, and moisturizer with natural ingredients.",
    bannerImage: IMAGES.cosmetics[1],
    images: [
      IMAGES.cosmetics[1],
      IMAGES.cosmetics[0],
      IMAGES.cosmetics[2],
      IMAGES.cosmetics[3],
    ],
    rating: 4.8,
    originalPrice: 199,
    category: "cosmetics",
    inStock: true,
    stockQuantity: 15,
  },
  {
    id: 22,
    name: "Perfume Gift Set",
    slug: "perfume-gift-set",
    description:
      "Exclusive fragrance collection with long-lasting scents. Three signature fragrances for day, evening, and special occasions.",
    bannerImage: IMAGES.cosmetics[2],
    images: [
      IMAGES.cosmetics[2],
      IMAGES.cosmetics[3],
      IMAGES.cosmetics[0],
      IMAGES.cosmetics[1],
    ],
    rating: 4.7,
    discountedPrice: 145,
    originalPrice: 180,
    category: "cosmetics",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: 23,
    name: "Natural Beauty Kit",
    slug: "natural-beauty-kit",
    description:
      "Organic and natural beauty products for sensitive skin. Gentle formulas free from parabens, sulfates, and artificial fragrances.",
    bannerImage: IMAGES.cosmetics[3],
    images: [
      IMAGES.cosmetics[3],
      IMAGES.cosmetics[1],
      IMAGES.cosmetics[2],
      IMAGES.cosmetics[0],
    ],
    rating: 4.6,
    originalPrice: 75,
    category: "cosmetics",
    inStock: true,
    stockQuantity: 35,
  },

  // ==================== FOOTWEAR (4 products) ====================
  {
    id: 24,
    name: "Classic Sneakers",
    slug: "classic-sneakers",
    description:
      "Comfortable everyday sneakers with modern design and cushioned sole. Perfect for walking, casual outings, and light exercise.",
    bannerImage: IMAGES.footwear[0],
    images: [...IMAGES.footwear],
    rating: 4.7,
    discountedPrice: 95,
    originalPrice: 140,
    category: "footwear",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 25,
    name: "Sport Running Shoes",
    slug: "sport-running-shoes",
    description:
      "High-performance running shoes for athletes and fitness enthusiasts. Responsive cushioning, breathable mesh upper, and durable outsole.",
    bannerImage: IMAGES.footwear[1],
    images: [
      IMAGES.footwear[1],
      IMAGES.footwear[0],
      IMAGES.footwear[2],
      IMAGES.footwear[3],
    ],
    rating: 4.8,
    originalPrice: 180,
    category: "footwear",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: 26,
    name: "Casual Loafers",
    slug: "casual-loafers",
    description:
      "Stylish loafers for smart casual occasions and everyday comfort. Soft leather upper with flexible sole for all-day wear.",
    bannerImage: IMAGES.footwear[0],
    images: [
      IMAGES.footwear[0],
      IMAGES.footwear[2],
      IMAGES.footwear[1],
      IMAGES.footwear[3],
    ],
    rating: 4.5,
    discountedPrice: 110,
    originalPrice: 150,
    category: "footwear",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: 27,
    name: "Hiking Boots",
    slug: "hiking-boots",
    description:
      "Durable hiking boots with waterproof design for outdoor adventures. Ankle support, rugged traction, and breathable lining.",
    bannerImage: IMAGES.footwear[1],
    images: [
      IMAGES.footwear[1],
      IMAGES.footwear[3],
      IMAGES.footwear[0],
      IMAGES.footwear[2],
    ],
    rating: 4.9,
    originalPrice: 220,
    category: "footwear",
    inStock: true,
    stockQuantity: 15,
  },

  // ==================== WATCHES (4 products) ====================
  {
    id: 28,
    name: "Classic Analog Watch",
    slug: "classic-analog-watch",
    description:
      "Timeless analog watch with leather strap and elegant dial. Swiss quartz movement with date display and water resistance.",
    bannerImage: IMAGES.accessories[0],
    images: [...IMAGES.accessories],
    rating: 4.8,
    discountedPrice: 175,
    originalPrice: 225,
    category: "watches",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: 29,
    name: "Luxury Chronograph",
    slug: "luxury-chronograph",
    description:
      "Premium chronograph watch with stainless steel construction. Precision movement, luminous hands, and tachymeter bezel.",
    bannerImage: IMAGES.accessories[2],
    images: [
      IMAGES.accessories[2],
      IMAGES.accessories[0],
      IMAGES.accessories[1],
      IMAGES.accessories[3],
    ],
    rating: 4.9,
    originalPrice: 450,
    category: "watches",
    inStock: true,
    stockQuantity: 8,
  },
  {
    id: 30,
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    description:
      "Clean and simple design watch for modern minimalists. Ultra-thin case, mesh strap, and elegant simplicity.",
    bannerImage: IMAGES.accessories[0],
    images: [
      IMAGES.accessories[0],
      IMAGES.accessories[3],
      IMAGES.accessories[1],
      IMAGES.accessories[2],
    ],
    rating: 4.6,
    discountedPrice: 89,
    originalPrice: 120,
    category: "watches",
    inStock: true,
    stockQuantity: 35,
  },
  {
    id: 31,
    name: "Dive Watch",
    slug: "dive-watch",
    description:
      "Water-resistant dive watch with luminous hands and rotating bezel. 200m water resistance for serious divers.",
    bannerImage: IMAGES.accessories[2],
    images: [
      IMAGES.accessories[2],
      IMAGES.accessories[1],
      IMAGES.accessories[3],
      IMAGES.accessories[0],
    ],
    rating: 4.7,
    originalPrice: 299,
    category: "watches",
    inStock: true,
    stockQuantity: 12,
  },

  // ==================== BAGS & ACCESSORIES (4 products) ====================
  {
    id: 8,
    name: "Spigen Rugged Armor Pro",
    slug: "spigen-rugged-armor-pro",
    description:
      "Premium protective case with military-grade protection. Shock-absorbing TPU with carbon fiber texture and raised bezels.",
    bannerImage: IMAGES.accessories[0],
    images: [...IMAGES.accessories],
    rating: 4.5,
    discountedPrice: 199,
    originalPrice: 239,
    category: "bags-accessories",
    inStock: true,
    stockQuantity: 20,
  },
  {
    id: 32,
    name: "Travel Backpack",
    slug: "travel-backpack",
    description:
      "Spacious travel backpack with laptop compartment and USB charging port. Ergonomic design with padded straps and multiple pockets.",
    bannerImage: IMAGES.handbags[1],
    images: [
      IMAGES.handbags[1],
      IMAGES.handbags[0],
      IMAGES.accessories[0],
      IMAGES.accessories[1],
    ],
    rating: 4.7,
    originalPrice: 89,
    category: "bags-accessories",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 33,
    name: "Leather Belt",
    slug: "leather-belt",
    description:
      "Genuine leather belt with classic buckle for formal and casual wear. Full-grain leather that develops beautiful patina over time.",
    bannerImage: IMAGES.accessories[1],
    images: [
      IMAGES.accessories[1],
      IMAGES.accessories[0],
      IMAGES.accessories[2],
      IMAGES.accessories[3],
    ],
    rating: 4.6,
    discountedPrice: 35,
    originalPrice: 55,
    category: "bags-accessories",
    inStock: true,
    stockQuantity: 50,
  },
  {
    id: 34,
    name: "Sunglasses Collection",
    slug: "sunglasses-collection",
    description:
      "Stylish UV-protection sunglasses for all face shapes. Polarized lenses with durable acetate frames in multiple colors.",
    bannerImage: IMAGES.accessories[2],
    images: [
      IMAGES.accessories[2],
      IMAGES.accessories[3],
      IMAGES.accessories[0],
      IMAGES.accessories[1],
    ],
    rating: 4.4,
    originalPrice: 75,
    category: "bags-accessories",
    inStock: true,
    stockQuantity: 30,
  },

  // ==================== SPORTSWEAR (4 products) ====================
  {
    id: 35,
    name: "Performance Gym Set",
    slug: "performance-gym-set",
    description:
      "Breathable gym wear set for intense workouts and training. Moisture-wicking fabric with four-way stretch for maximum mobility.",
    bannerImage: IMAGES.clothing[0],
    images: [...IMAGES.clothing],
    rating: 4.8,
    discountedPrice: 65,
    originalPrice: 90,
    category: "sportswear",
    inStock: true,
    stockQuantity: 35,
  },
  {
    id: 36,
    name: "Yoga Leggings",
    slug: "yoga-leggings",
    description:
      "High-waisted yoga leggings with four-way stretch fabric. Squat-proof, comfortable waistband, and hidden pocket for essentials.",
    bannerImage: IMAGES.clothing[1],
    images: [
      IMAGES.clothing[1],
      IMAGES.clothing[0],
      IMAGES.clothing[2],
      IMAGES.clothing[3],
    ],
    rating: 4.7,
    originalPrice: 55,
    category: "sportswear",
    inStock: true,
    stockQuantity: 45,
  },
  {
    id: 37,
    name: "Running Tank Top",
    slug: "running-tank-top",
    description:
      "Lightweight tank top with moisture-wicking technology. Racerback design for freedom of movement and ventilated panels.",
    bannerImage: IMAGES.clothing[2],
    images: [
      IMAGES.clothing[2],
      IMAGES.clothing[3],
      IMAGES.clothing[0],
      IMAGES.clothing[1],
    ],
    rating: 4.5,
    discountedPrice: 28,
    originalPrice: 40,
    category: "sportswear",
    inStock: true,
    stockQuantity: 60,
  },
  {
    id: 38,
    name: "Training Shorts",
    slug: "training-shorts",
    description:
      "Comfortable training shorts with built-in liner and pockets. Quick-dry fabric and elastic waistband with drawcord.",
    bannerImage: IMAGES.clothing[3],
    images: [
      IMAGES.clothing[3],
      IMAGES.clothing[1],
      IMAGES.clothing[2],
      IMAGES.clothing[0],
    ],
    rating: 4.6,
    originalPrice: 45,
    category: "sportswear",
    inStock: true,
    stockQuantity: 40,
  },

  // ==================== JEWELRY (4 products) ====================
  {
    id: 39,
    name: "Diamond Pendant Necklace",
    slug: "diamond-pendant-necklace",
    description:
      "Elegant diamond pendant on sterling silver chain. Brilliant-cut diamond with delicate setting that catches the light beautifully.",
    bannerImage: IMAGES.accessories[0],
    images: [...IMAGES.accessories],
    rating: 4.9,
    discountedPrice: 299,
    originalPrice: 399,
    category: "jewelry",
    inStock: true,
    stockQuantity: 10,
  },
  {
    id: 40,
    name: "Gold Hoop Earrings",
    slug: "gold-hoop-earrings",
    description:
      "Classic 14k gold hoop earrings for everyday elegance. Lightweight design with secure click-top closure.",
    bannerImage: IMAGES.accessories[1],
    images: [
      IMAGES.accessories[1],
      IMAGES.accessories[0],
      IMAGES.accessories[2],
      IMAGES.accessories[3],
    ],
    rating: 4.7,
    originalPrice: 175,
    category: "jewelry",
    inStock: true,
    stockQuantity: 18,
  },
  {
    id: 41,
    name: "Pearl Bracelet",
    slug: "pearl-bracelet",
    description:
      "Freshwater pearl bracelet with elegant clasp closure. Lustrous pearls individually knotted on silk thread for durability.",
    bannerImage: IMAGES.accessories[2],
    images: [
      IMAGES.accessories[2],
      IMAGES.accessories[3],
      IMAGES.accessories[0],
      IMAGES.accessories[1],
    ],
    rating: 4.8,
    discountedPrice: 89,
    originalPrice: 120,
    category: "jewelry",
    inStock: true,
    stockQuantity: 22,
  },
  {
    id: 42,
    name: "Silver Ring Set",
    slug: "silver-ring-set",
    description:
      "Set of stackable sterling silver rings with gemstone accents. Mix and match styles for personalized look.",
    bannerImage: IMAGES.accessories[3],
    images: [
      IMAGES.accessories[3],
      IMAGES.accessories[1],
      IMAGES.accessories[0],
      IMAGES.accessories[2],
    ],
    rating: 4.6,
    originalPrice: 65,
    category: "jewelry",
    inStock: true,
    stockQuantity: 30,
  },

  // ==================== HOME & LIVING (4 products) ====================
  {
    id: 43,
    name: "Luxury Throw Blanket",
    slug: "luxury-throw-blanket",
    description:
      "Soft and cozy throw blanket for living room or bedroom. Premium microfiber with elegant design that adds warmth to any space.",
    bannerImage: IMAGES.home[0],
    images: [...IMAGES.home],
    rating: 4.7,
    discountedPrice: 59,
    originalPrice: 85,
    category: "home-living",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: 44,
    name: "Scented Candle Set",
    slug: "scented-candle-set",
    description:
      "Set of 3 premium scented candles with natural soy wax. Long-lasting fragrances of lavender, vanilla, and ocean breeze.",
    bannerImage: IMAGES.home[1],
    images: [IMAGES.home[1], IMAGES.home[0], IMAGES.home[2], IMAGES.home[3]],
    rating: 4.8,
    originalPrice: 45,
    category: "home-living",
    inStock: true,
    stockQuantity: 40,
  },
  {
    id: 45,
    name: "Decorative Vase",
    slug: "decorative-vase",
    description:
      "Modern ceramic vase for flowers and home decoration. Hand-crafted with unique glazed finish that complements any decor style.",
    bannerImage: IMAGES.home[2],
    images: [IMAGES.home[2], IMAGES.home[3], IMAGES.home[0], IMAGES.home[1]],
    rating: 4.5,
    discountedPrice: 38,
    originalPrice: 55,
    category: "home-living",
    inStock: true,
    stockQuantity: 30,
  },
  {
    id: 46,
    name: "Cushion Cover Set",
    slug: "cushion-cover-set",
    description:
      "Set of 4 decorative cushion covers with modern patterns. Premium cotton blend with hidden zipper for easy removal.",
    bannerImage: IMAGES.home[3],
    images: [IMAGES.home[3], IMAGES.home[1], IMAGES.home[2], IMAGES.home[0]],
    rating: 4.6,
    originalPrice: 35,
    category: "home-living",
    inStock: true,
    stockQuantity: 50,
  },
];

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return allProducts.find((product) => product.id === id);
}

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((product) => product.category === category);
}
