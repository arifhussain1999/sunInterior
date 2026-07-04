import {
  Banner,
  BlogPost,
  Category,
  HeroSlide,
  InstagramShot,
  Product,
  Testimonial,
  TrustPoint,
  SiteConfig,
  Video
} from "@/lib/types";
import { assetPath, cleanProductName, slugify } from "@/lib/utils";

const CATEGORY_BLUEPRINTS: Omit<Category, "id">[] = [
  {
    name: "Rope Collection",
    slug: "rope-collection",
    folder: "Rope",
    description:
      "Premium hand-woven rope collections with modern powder-coated charcoal aluminium frames.",
    bannerImage: assetPath("Rope", "Drift Sofa.png"),
    accentFrom: "#78350F",
    accentTo: "#F59E0B",
    badge: "Modern Aesthetic",
    order: 1,
    heroStat: "Tactile rope weaving"
  },
  {
    name: "Outdoor Sofa",
    slug: "outdoor-sofa",
    folder: "Sofa Sets",
    description:
      "Signature all-weather sofa sets designed for terraces, lawns and premium outdoor lounges.",
    bannerImage: assetPath("Sofa Sets", "Haven.png"),
    accentFrom: "#2874F0",
    accentTo: "#00C6FF",
    badge: "Top Seller",
    order: 2,
    heroStat: "48-hour quote turnaround"
  },
  {
    name: "Coffee Sets",
    slug: "coffee-sets",
    folder: "Coffee Sets",
    description:
      "Compact conversation sets curated for balconies, patios and hospitality corners.",
    bannerImage: assetPath("Coffee Sets", "Ivan.png"),
    accentFrom: "#0F4C81",
    accentTo: "#38BDF8",
    badge: "Luxury Pick",
    order: 3,
    heroStat: "Best for balconies"
  },
  {
    name: "Dining Sets",
    slug: "dining-sets",
    folder: "Dining Sets",
    description:
      "Premium outdoor dining collections crafted for family gatherings and resort projects.",
    bannerImage: assetPath("Dining Sets", "WW-44 (4 chair + 1 table).png"),
    accentFrom: "#1F2937",
    accentTo: "#2874F0",
    badge: "Family Favorite",
    order: 4,
    heroStat: "Resort-ready finishes"
  },
  {
    name: "Hanging Swings",
    slug: "swings",
    folder: "Swings",
    description:
      "Statement wicker swings that create a sculptural lounge moment indoors or outdoors.",
    bannerImage: assetPath("Swings", "Saturn.png"),
    accentFrom: "#243B53",
    accentTo: "#0EA5E9",
    badge: "Statement Design",
    order: 5,
    heroStat: "Designer silhouettes"
  },
  {
    name: "Loungers",
    slug: "loungers",
    folder: "Loungers",
    description:
      "Sun-chasing loungers with plush comfort, easy maintenance and hotel-grade detailing.",
    bannerImage: assetPath("Loungers", "Zen.png"),
    accentFrom: "#14532D",
    accentTo: "#10B981",
    badge: "Poolside Ready",
    order: 6,
    heroStat: "UV-ready cushions"
  },
  {
    name: "Sunbeds",
    slug: "sunbeds",
    folder: "Sunbeds",
    description:
      "Long-form relaxation pieces designed for rooftops, poolsides and luxury staycations.",
    bannerImage: assetPath("Sunbeds", "Glade.png"),
    accentFrom: "#92400E",
    accentTo: "#F59E0B",
    badge: "Resort Standard",
    order: 7,
    heroStat: "Hospitality grade"
  },
  {
    name: "Umbrellas",
    slug: "umbrellas",
    folder: "Umbrella",
    description:
      "High coverage outdoor umbrellas built to complete shaded dining and lounge spaces.",
    bannerImage: assetPath("Umbrella", "WW- U1 (Beige).png"),
    accentFrom: "#7C2D12",
    accentTo: "#FB923C",
    badge: "Shade Essential",
    order: 8,
    heroStat: "Wind-stable build"
  },
  {
    name: "Bar Sets",
    slug: "bar-sets",
    folder: "Bar Sets",
    description:
      "Entertaining-focused bar furniture for terraces, clubhouses, rooftops and cafés.",
    bannerImage: assetPath("Bar Sets", "Martini.png"),
    accentFrom: "#312E81",
    accentTo: "#60A5FA",
    badge: "Entertainer Edit",
    order: 9,
    heroStat: "Commercial friendly"
  }
];

const PRODUCT_FILES: Record<string, string[]> = {
  "rope-collection": [
    "Dune Set.png",
    "Knotion Set.png",
    "Fern Set.png",
    "Meadow Set.png",
    "Groove Set.png",
    "Solace Set.png",
    "Arbor Set.png",
    "Marina Set.png",
    "Ibiza Set.png",
    "Capri Set.png",
    "Coast Set.png",
    "Ivy Set.png",
    "Oslo Set.png",
    "Oasis Set.png",
    "Sienna Set.png",
    "Tide Set.png",
    "Vista Set.png",
    "Breeze Set.png",
    "Drift Sofa.png",
    "Mesa Sofa.png",
    "Oslo Sofa.png",
    "Sierra Sofa.png",
    "Sahara Sofa.png",
    "Solstice Sofa.png",
    "Azure Sofa.png",
    "Vista Sofa.png",
    "Canyon Sofa.png",
    "Aura Sofa.png",
    "Outdoor Rope Patio Set with Glass Top Table (Beige & Off-White).png",
    "3-Piece Rope Patio Set Perfect for Outdoor Entertaining (Grey & White).png",
    "Outdoor Rope 3-Piece Patio Set (Beige & Off-White).png",
    "Outdoor Rope 3-Piece Patio Set (Beige).png",
    "Outdoor Rope 3-Piece Patio Set (Grey & Cream).png",
    "Outdoor 3-Piece Rope Patio Sofa Set (Grey).png",
    "2-Piece Outdoor Rope Patio Dining Chairs.png",
    "4-Piece Outdoor Rope Patio Furniture Set with Glass Top Table (Grey & Orange).png",
    "Outdoor Rope 4-Piece Sofa Set with Wooden Top Round Table.png",
    "4-Piece Outdoor Rope Sofa Set with Glass Top Table (Grey & Cream).png",
    "All Weather Patio Rope Sofa Set with Glass Top Coffee Table.png",
    "L-Shaped Rope Woven Outdoor Sofa Set (Beige & Cream).png",
    "4-Piece Outdoor Rope Sofa Set with HPL Top Coffee Table (Light Grey & Dark Grey).png",
    "Outdoor L-Shaped Conversation Sofa Set.png",
    "4-Piece Outdoor All Weather Rope Sofa Set.png"
  ],
  "outdoor-sofa": [
    "Haven.png",
    "Vista.png",
    "Meadow.png",
    "Horizon.png",
    "Cascade.png",
    "Alipine.png",
    "Solstice.png",
    "Breeze.png",
    "Ember.png",
    "Enden.png",
    "Skyline.png",
    "Summit.png"
  ],
  "coffee-sets": [
    "Ivan.png",
    "WW-09 (2 chair + 1 table).png",
    "Qube.png",
    "WW-05 (2 chair + 1 table).png",
    "WW-08 (2 Chair + 1 table).png",
    "Wave.png",
    "Cairo.png",
    "WW-43 (2 chair + 1 table).png",
    "Nest.png",
    "WW-12 ( 2 Chair + 1 table).png",
    "WW-12 (2 Chair +1 table).png",
    "Egg.png"
  ],
  "dining-sets": [
    "WW-44 (4 chair + 1 table).png",
    "WW-69 (4 chair + 1 table).png",
    "WW-57 (4 chair + 1 table).png",
    "WW-08B (4 chair + 1 table).png",
    "WW-50 (4 chair + 1 table).png",
    "WW-26 w arm (4 chair + 1 table).png",
    "WW-43 (4 chair + 1 table).png",
    "WW-26 w:o arm (4 chair + 1 table).png",
    "WW-08 (4 chair + 1 table).png",
    "WW-12 (4 chair + 1 table).png",
    "WW-12 (4 chair + 1 table)s.png",
    "WW-63 (4 chair + 1 table).png",
    "WW-43 (6 chair + 1 table)r.png",
    "WW-26 (6 chair + 1 table).png",
    "WW-43 (6 chair + 1 table)s.png",
    "WW-43 Net (6 chair + 1 table).png",
    "WW-09 (4 chair + 1 table).png",
    "WW-15 (4 chair + 1 table).png"
  ],
  swings: [
    "Spoon.png",
    "Celestial -01.png",
    "Spider.png",
    "Celestial -02.png",
    "Sway.png",
    "Double Seater-01.png",
    "Double Seater-02.png",
    "Vortex.png",
    "Knight.png",
    "Avocado.png",
    "Melody.png",
    "Glide.png",
    "Spider HR.png",
    "Saturn.png"
  ],
  loungers: ["Bean.png", "Melt.png", "Fuse.png", "Curve.png", "Zen.png", "Plush.png"],
  sunbeds: ["Glade.png", "Oasis.png", "Echo.png", "Bloom.png"],
  umbrellas: ["WW- U3 (Green).png", "WW- U1 (Beige).png", "WW - U1 (Maroon) .png", "WW- U2 (Green).png"],
  "bar-sets": [
    "Riveria.png",
    "Brew-02.png",
    "Brew-01.png",
    "Bubble.png",
    "Martini.png",
    "Noble.png",
    "Pacific.png",
    "Bistro.png",
    "Serving Cart-01.png",
    "Autumn.png",
    "Vatican.png",
    "Canvas.png"
  ]
};

const CATEGORY_COPY: Record<
  string,
  {
    material: string;
    highlights: string[];
    leadTime: string;
    warranty: string;
  }
> = {
  "rope-collection": {
    material: "High-tenacity polyester rope with charcoal aluminium frame",
    highlights: ["Hand-woven rope detail", "UV-resistant fibers", "Contemporary architectural look"],
    leadTime: "8-15 business days",
    warranty: "3 year structural warranty"
  },
  "outdoor-sofa": {
    material: "All-weather wicker with powder-coated aluminium frame",
    highlights: ["Weather resistant weave", "Deep comfort cushions", "Low-maintenance luxury"],
    leadTime: "7-14 business days",
    warranty: "3 year structural warranty"
  },
  "coffee-sets": {
    material: "Wicker weave with tempered glass tops",
    highlights: ["Balcony-sized footprint", "Premium weave texture", "Easy-clean surfaces"],
    leadTime: "5-10 business days",
    warranty: "2 year warranty"
  },
  "dining-sets": {
    material: "PE rattan weave with coated metal under-structure",
    highlights: ["Hospitality-grade finish", "Family dining comfort", "Suitable for outdoor projects"],
    leadTime: "7-16 business days",
    warranty: "3 year structural warranty"
  },
  swings: {
    material: "Designer wicker shell with cushioned seat pads",
    highlights: ["Statement silhouette", "Comfort-first seating", "Indoor-outdoor flexibility"],
    leadTime: "7-12 business days",
    warranty: "2 year warranty"
  },
  loungers: {
    material: "Sun-safe woven body with premium outdoor upholstery",
    highlights: ["Resort-inspired comfort", "Quick-dry cushions", "Modern sculpted profiles"],
    leadTime: "5-10 business days",
    warranty: "2 year warranty"
  },
  sunbeds: {
    material: "Outdoor-grade wicker with corrosion-resistant frame",
    highlights: ["Poolside built", "Relaxed recline geometry", "Fade-resistant finishing"],
    leadTime: "6-12 business days",
    warranty: "2 year warranty"
  },
  umbrellas: {
    material: "Outdoor canopy with reinforced support arm",
    highlights: ["High coverage shade", "UV-ready fabric", "Strong outdoor base support"],
    leadTime: "4-8 business days",
    warranty: "1 year warranty"
  },
  "bar-sets": {
    material: "Premium wicker shell with elevated dining frames",
    highlights: ["Entertaining-focused design", "Indoor-outdoor placement", "Commercial friendly"],
    leadTime: "6-12 business days",
    warranty: "2 year warranty"
  }
};

const PRICE_BASE: Record<string, number> = {
  "rope-collection": 24999,
  "outdoor-sofa": 52999,
  "coffee-sets": 24999,
  "dining-sets": 44999,
  swings: 21999,
  loungers: 18999,
  sunbeds: 25999,
  umbrellas: 9999,
  "bar-sets": 28999
};

const PRICE_STEP: Record<string, number> = {
  "rope-collection": 1500,
  "outdoor-sofa": 3200,
  "coffee-sets": 1800,
  "dining-sets": 2400,
  swings: 1400,
  loungers: 1200,
  sunbeds: 1600,
  umbrellas: 600,
  "bar-sets": 1900
};

export const siteConfig: SiteConfig = {
  name: "SUN SEATINGS",
  tagline: "Exclusive Outdoor Furniture",
  description:
    "Luxury outdoor furniture catalog for modern homes, hospitality projects and premium terraces across India.",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 70295 19022",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917029519022",
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "agsunny2000@gmail.com",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/sunseatings",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    "https://www.facebook.com/profile.php?id=61580987248000",
  address: process.env.NEXT_PUBLIC_SHOWROOM_ADDRESS || "PCM Tower, Sevoke Road, Siliguri 734001",
  supportHours: process.env.NEXT_PUBLIC_SUPPORT_HOURS || "Mon-Sat - 10:00 AM to 7:00 PM"
};

export const categories: Category[] = CATEGORY_BLUEPRINTS.map((category, index) => ({
  ...category,
  id: `category_${index + 1}`
}));

const categoryMap = new Map(categories.map((category) => [category.slug, category]));

const PRODUCT_PRICES: Record<string, number> = {
  "Dune Set": 24999,
  "Knotion Set": 26999,
  "Fern Set": 25999,
  "Meadow Set": 27999,
  "Groove Set": 28999,
  "Solace Set": 29999,
  "Arbor Set": 31999,
  "Marina Set": 32999,
  "Ibiza Set": 34999,
  "Capri Set": 33999,
  "Coast Set": 35999,
  "Ivy Set": 28999,
  "Oslo Set": 32999,
  "Oasis Set": 34999,
  "Sienna Set": 36999,
  "Tide Set": 45999,
  "Vista Set": 47999,
  "Breeze Set": 49999,
  "Drift Sofa": 89999,
  "Mesa Sofa": 95999,
  "Oslo Sofa": 92999,
  "Sierra Sofa": 109999,
  "Sahara Sofa": 124999,
  "Solstice Sofa": 114999,
  "Azure Sofa": 134999,
  "Vista Sofa": 119999,
  "Canyon Sofa": 144999,
  "Aura Sofa": 154999,
  "Outdoor Rope Patio Set with Glass Top Table (Beige & Off-White)": 16916,
  "3-Piece Rope Patio Set Perfect for Outdoor Entertaining (Grey & White)": 16916,
  "Outdoor Rope 3-Piece Patio Set (Beige & Off-White)": 27058,
  "Outdoor Rope 3-Piece Patio Set (Beige)": 28999,
  "Outdoor Rope 3-Piece Patio Set (Grey & Cream)": 27999,
  "Outdoor 3-Piece Rope Patio Sofa Set (Grey)": 23916,
  "2-Piece Outdoor Rope Patio Dining Chairs": 15749,
  "4-Piece Outdoor Rope Patio Furniture Set with Glass Top Table (Grey & Orange)": 55293,
  "Outdoor Rope 4-Piece Sofa Set with Wooden Top Round Table": 47058,
  "4-Piece Outdoor Rope Sofa Set with Glass Top Table (Grey & Cream)": 7587,
  "All Weather Patio Rope Sofa Set with Glass Top Coffee Table": 52499,
  "L-Shaped Rope Woven Outdoor Sofa Set (Beige & Cream)": 50399,
  "4-Piece Outdoor Rope Sofa Set with HPL Top Coffee Table (Light Grey & Dark Grey)": 83999,
  "Outdoor L-Shaped Conversation Sofa Set": 54249,
  "4-Piece Outdoor All Weather Rope Sofa Set": 38000,
  "5-SEATER OUTDOOR ALL-WEATHER ROPE SOFA SET": 195000
};

export const products: Product[] = Object.entries(PRODUCT_FILES).flatMap(([categorySlug, files]) => {
  const category = categoryMap.get(categorySlug);
  const copy = CATEGORY_COPY[categorySlug];

  if (!category || !copy) {
    return [];
  }

  return files.map((file, index) => {
    const displayName = cleanProductName(file);
    const price = PRODUCT_PRICES[displayName] || (PRICE_BASE[categorySlug] + PRICE_STEP[categorySlug] * index);
    const originalPrice = Math.round(price * 1.22);
    const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
    const rating = Number((4.3 + (index % 5) * 0.12).toFixed(1));
    const reviewCount = 24 + index * 9;
    const seatingCapacity =
      categorySlug === "dining-sets"
        ? index > 11
          ? "6 seater"
          : "4 seater"
        : categorySlug === "outdoor-sofa"
          ? ["4 seater", "5 seater", "6 seater"][index % 3]
          : categorySlug === "coffee-sets"
            ? "2 seater"
            : categorySlug === "bar-sets"
              ? ["2 seater", "4 seater"][index % 2]
              : categorySlug === "umbrellas"
                ? "Shade unit"
                : categorySlug === "rope-collection"
                  ? (() => {
                      const lowerName = displayName.toLowerCase();
                      if (lowerName.includes("3-piece") || lowerName.includes("2-piece") || lowerName.includes("dining chairs") || lowerName.includes("dune") || lowerName.includes("knotion") || lowerName.includes("fern") || lowerName.includes("meadow") || lowerName.includes("groove") || lowerName.includes("solace") || lowerName.includes("arbor") || lowerName.includes("marina") || lowerName.includes("ibiza") || lowerName.includes("capri") || lowerName.includes("coast") || lowerName.includes("ivy") || lowerName.includes("oslo set") || lowerName.includes("oasis") || lowerName.includes("sienna")) {
                        return "2 seater";
                      } else if (lowerName.includes("tide") || lowerName.includes("vista set") || lowerName.includes("breeze set") || lowerName.includes("4-piece") || lowerName.includes("patio set")) {
                        return "4 seater";
                      } else if (lowerName.includes("l-shaped") || lowerName.includes("conversation") || lowerName.includes("canyon") || lowerName.includes("aura") || lowerName.includes("5-seater")) {
                        return "5 seater";
                      } else {
                        return "5 seater";
                      }
                    })()
                  : "1 seater";

    const availability =
      index % 7 === 0 ? "Limited Stock" : index % 5 === 0 ? "Preorder" : "In Stock";

    const primaryImage = assetPath(category.folder, file);
    const titleSlug = slugify(displayName);
    const productSlug = titleSlug || `${category.slug}-${index + 1}`;
    const sku = `WW-${category.slug.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`;

    return {
      id: `product_${category.slug}_${index + 1}`,
      name: displayName,
      slug: productSlug,
      sku,
      categoryId: category.id,
      categorySlug: category.slug,
      categoryName: category.name,
      tagline: `${category.name} crafted for premium Indian outdoor living.`,
      description: `${displayName} is part of the ${category.name} collection by SUN SEATINGS, built to bring hotel-style comfort to private homes, terraces, gardens and hospitality lounges.`,
      marketingCopy: `${displayName} combines refined silhouette, weather-ready materials and an easy-luxury finish so your outdoor space feels intentional, polished and ready to host.`,
      price,
      originalPrice,
      discountPercentage,
      rating,
      reviewCount,
      material: copy.material,
      seatingCapacity,
      availability,
      featured: index < 4 || (categorySlug === "swings" && index < 6),
      badge:
        index % 6 === 0 ? "Trending" : index % 4 === 0 ? "Best Seller" : discountPercentage > 16 ? "Deal" : "New Launch",
      images: [primaryImage, primaryImage, primaryImage],
      primaryImage,
      highlights: copy.highlights,
      specifications: [
        {
          label: "Material",
          value: copy.material
        },
        {
          label: "Seating Capacity",
          value: seatingCapacity
        },
        {
          label: "Warranty",
          value: copy.warranty
        },
        {
          label: "Lead Time",
          value: copy.leadTime
        },
        {
          label: "Finish",
          value: "UV-stable, handwoven outdoor finish"
        }
      ],
      faqs: [
        {
          question: "Can this be used outdoors through the year?",
          answer:
            "Yes. The structure is intended for outdoor use, though we recommend covers during heavy rain or non-use for maximum life."
        },
        {
          question: "Do you offer Pan India delivery?",
          answer:
            "Yes. Delivery and installation support can be arranged across major Indian cities and project locations."
        },
        {
          question: "Can I request a project quotation?",
          answer:
            "Absolutely. Use the Request Quote CTA and our team will respond with pricing, lead time and bulk-order support."
        }
      ],
      onlyFewLeft: index % 4 === 0,
      isNew: index < 2,
      bestSeller: index % 3 === 0,
      deliveryEstimate: copy.leadTime,
      warranty: copy.warranty,
      seoTitle: `${displayName} | ${category.name} by SUN SEATINGS`,
      seoDescription: `${displayName} from the ${category.name} collection. Explore dimensions, highlights, project-ready pricing and quotation support from SUN SEATINGS.`
    };
  });
});

export const heroSlides: HeroSlide[] = [
  {
    id: "hero_1",
    eyebrow: "Summer Sale • Up to 60% OFF",
    title: "Luxury outdoor furniture with a premium marketplace feel.",
    subtitle:
      "Discover statement sofa sets, dining collections and designer swings that elevate terraces, lawns and hospitality spaces.",
    image: assetPath("Sofa Sets", "Haven.png"),
    ctaPrimary: {
      label: "Explore Collection",
      href: "/shop"
    },
    ctaSecondary: {
      label: "Get Catalog PDF",
      href: "/catalog"
    }
  },
  {
    id: "hero_2",
    eyebrow: "Hospitality-grade craftsmanship",
    title: "Resort-inspired dining and lounge pieces for modern Indian homes.",
    subtitle:
      "Built with all-weather materials, fast quotation support and a full-service catalogue experience for buyers and architects.",
    image: assetPath("Dining Sets", "WW-44 (4 chair + 1 table).png"),
    ctaPrimary: {
      label: "Shop by Category",
      href: "/categories"
    },
    ctaSecondary: {
      label: "Talk to Expert",
      href: "/contact"
    }
  },
  {
    id: "hero_3",
    eyebrow: "Designer silhouettes",
    title: "Signature swings and loungers that turn quiet corners into destination spaces.",
    subtitle:
      "From statement hanging chairs to poolside loungers, every collection is designed to feel elevated, comfortable and instantly share-worthy.",
    image: assetPath("Swings", "Saturn.png"),
    ctaPrimary: {
      label: "Browse Swings",
      href: "/categories/swings"
    },
    ctaSecondary: {
      label: "Request Quote",
      href: "/contact"
    }
  }
];

export const trustPoints: TrustPoint[] = [
  {
    id: "trust_1",
    title: "Premium quality",
    description: "Hand-finished outdoor collections with hotel-style detailing.",
    stat: "300+ designs"
  },
  {
    id: "trust_2",
    title: "100K+ customers",
    description: "Trusted by homeowners, cafés, villas and hospitality teams.",
    stat: "100K+ happy buyers"
  },
  {
    id: "trust_3",
    title: "Pan India delivery",
    description: "End-to-end assistance with quote, dispatch and support.",
    stat: "28 states served"
  },
  {
    id: "trust_4",
    title: "Warranty backed",
    description: "Coverage on structure and support from a responsive team.",
    stat: "Up to 3 years"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial_1",
    name: "Ritika Sharma",
    city: "Gurugram",
    quote:
      "The catalogue felt like a premium marketplace, but the quotation support was far more personal. Our terrace set arrived exactly as promised.",
    rating: 5,
    image: assetPath("Coffee Sets", "Ivan.png")
  },
  {
    id: "testimonial_2",
    name: "Aman Khanna",
    city: "Pune",
    quote:
      "We shortlisted a dining set, raised an enquiry and got finish options, dimensions and delivery guidance within a day. Smooth experience.",
    rating: 5,
    image: assetPath("Dining Sets", "WW-69 (4 chair + 1 table).png")
  },
  {
    id: "testimonial_3",
    name: "Leena Batra",
    city: "Jaipur",
    quote:
      "The swing looks stunning in our patio. The detail page answered almost everything and the team handled the rest on WhatsApp.",
    rating: 5,
    image: assetPath("Swings", "Sway.png")
  }
];

export const instagramShots: InstagramShot[] = [
  {
    id: "insta_1",
    caption: "Terrace-ready hosting corners",
    image: assetPath("Coffee Sets", "Wave.png")
  },
  {
    id: "insta_2",
    caption: "Modern outdoor dining",
    image: assetPath("Dining Sets", "WW-50 (4 chair + 1 table).png")
  },
  {
    id: "insta_3",
    caption: "Statement swing zones",
    image: assetPath("Swings", "Knight.png")
  },
  {
    id: "insta_4",
    caption: "Poolside calm",
    image: assetPath("Loungers", "Zen.png")
  },
  {
    id: "insta_5",
    caption: "Shade-led outdoor dining",
    image: assetPath("Umbrella", "WW- U1 (Beige).png")
  },
  {
    id: "insta_6",
    caption: "Luxury seating stories",
    image: assetPath("Sofa Sets", "Skyline.png")
  }
];

export const seedBanners: Banner[] = [
  {
    id: "banner_1",
    title: "Summer Sale • Up to 60% OFF",
    subtitle: "Luxury outdoor living, priced for faster decisions.",
    image: assetPath("Sofa Sets", "Vista.png"),
    ctaLabel: "Shop Featured",
    ctaHref: "/shop?sort=featured",
    active: true
  },
  {
    id: "banner_2",
    title: "Talk to our furniture expert",
    subtitle: "Get project pricing, finish support and fast quotation guidance.",
    image: assetPath("Swings", "Melody.png"),
    ctaLabel: "Request Quote",
    ctaHref: "/contact",
    active: true
  }
];

export const seedBlogPosts: BlogPost[] = [
  {
    id: "blog_1",
    title: "How to choose luxury outdoor furniture for Indian weather",
    slug: "choose-outdoor-furniture-indian-weather",
    excerpt:
      "A practical guide to selecting weather-ready wicker, cushions and finishes without compromising on style.",
    body:
      "Luxury outdoor furniture should look refined, but it also needs to withstand heat, humidity and regular use. Start with an all-weather frame, ask for UV-ready weave quality and check if cushions are designed for faster drying. For terraces and rooftops, modular sofa sets and compact coffee sets usually deliver the best layout flexibility. For hospitality projects, dining collections and loungers should balance comfort with easy maintenance. SUN SEATINGS recommends choosing by space usage first, then by finish, then by quotation lead time.",
    featuredImage: assetPath("Sofa Sets", "Cascade.png"),
    tags: ["Outdoor Furniture", "Buying Guide", "Luxury Living"],
    publishedAt: "2026-03-14T09:00:00.000Z",
    seoTitle: "How to choose luxury outdoor furniture in India | SUN SEATINGS",
    seoDescription:
      "Learn how to choose outdoor furniture for Indian weather, from wicker quality and cushions to layouts and maintenance."
  },
  {
    id: "blog_2",
    title: "Outdoor dining set ideas for terraces, lawns and cafés",
    slug: "outdoor-dining-set-ideas",
    excerpt:
      "See how to style outdoor dining collections for homes, hospitality projects and compact entertaining spaces.",
    body:
      "Outdoor dining should feel effortless. Four-seater sets work beautifully for balconies and compact terraces, while six-seater formats suit lawns and weekend hosting. Layer umbrellas for shade, choose material palettes that complement surrounding flooring and make sure table surfaces are easy to clean. For cafés and project work, stackable or low-maintenance frames are a practical win. The right dining set turns underused space into a destination for everyday living.",
    featuredImage: assetPath("Dining Sets", "WW-43 (6 chair + 1 table)s.png"),
    tags: ["Dining Sets", "Outdoor Styling", "Hospitality"],
    publishedAt: "2026-03-18T09:00:00.000Z",
    seoTitle: "Outdoor dining set ideas for terraces and cafés | SUN SEATINGS",
    seoDescription:
      "Explore layout and styling ideas for luxury outdoor dining collections across homes, lawns and commercial spaces."
  },
  {
    id: "blog_3",
    title: "Why hanging swings are the statement piece of 2026",
    slug: "hanging-swings-statement-piece-2026",
    excerpt:
      "Designer swings are reshaping outdoor corners, lounge spaces and even indoor reading nooks.",
    body:
      "Few pieces add personality as quickly as a sculptural swing. They photograph beautifully, create a defined relaxation spot and bring softness to architectural outdoor settings. When selecting one, check the base stability, the comfort of the seat cushion and the clearance needed around the frame. Neutral wicker tones keep the look versatile, while bold cushions help the swing act as a focal point.",
    featuredImage: assetPath("Swings", "Saturn.png"),
    tags: ["Swings", "Trends", "Luxury Decor"],
    publishedAt: "2026-03-22T09:00:00.000Z",
    seoTitle: "Hanging swing design trend 2026 | SUN SEATINGS",
    seoDescription:
      "Discover why hanging swings are becoming a statement piece for luxury terraces, patios and indoor-outdoor spaces."
  },
  {
    id: "blog_4",
    title: "Designing Outdoor Spaces in Siliguri: All-Weather Furniture Guide for North Bengal & Sikkim",
    slug: "outdoor-furniture-design-guide-siliguri-north-bengal",
    excerpt:
      "An expert guide to designing climate-resilient balconies, terraces, and commercial resort spaces in Siliguri, Darjeeling, and Gangtok using premium all-weather outdoor furniture.",
    body:
      "Siliguri, the gateway to North Bengal and Sikkim, is experiencing an architectural and lifestyle renaissance. From premium residential projects along Sevoke Road and Matigara to luxury tea tourism resorts in Darjeeling and boutique hotels in Gangtok, the emphasis on outdoor living has never been stronger.\n\nHowever, North Bengal’s unique geographical position at the foothills of the Himalayas presents a challenging climate. The region is known for its intense monsoons with heavy rainfall, prolonged high humidity, warm summer sun, and damp, misty winters in the hills. Standard indoor furniture or cheap plastic alternatives quickly deteriorate under these conditions. Designing an outdoor space that stays pristine year after year requires a careful balance of aesthetic luxury and material science.\n\nWhen choosing outdoor furniture for Siliguri or neighboring hill areas like Kalimpong and Sikkim, three climatic factors must be addressed:\n1. Torrential Rainfall: North Bengal receives some of the highest rainfall in India. Water pooling, wood rot, and metal rust are constant threats.\n2. High Humidity: The sub-tropical humidity of the plains promotes mold and mildew growth on low-quality fibers and cushions.\n3. High UV Index: The intense summer sun in the plains and high-altitude UV rays in Gangtok and Darjeeling can cause color fading and material embrittlement.\n\nTo build a beautiful terrace or commercial garden that withstands the elements, material selection is critical:\n• High-Tenacity Rope: Hand-woven rope furniture uses UV-stabilized, high-density polyester or polyolefin fibers. The open-weave design allows air to flow through, which helps the furniture dry rapidly after a sudden monsoon shower and prevents mold accumulation.\n• Rust-Resistant Aluminium: Powder-coated aluminium is the ultimate framing material. Unlike iron, it will not rust when exposed to moisture. It is also lightweight (essential for transport to hilly terrains) and does not absorb heat under direct sunlight.\n• All-Weather PE Rattan: High-density polyethylene (HDPE) synthetic wicker is highly superior to natural rattan. It does not split, fade, or absorb moisture, making it ideal for the humid climate of Sevoke Road.\n• Quick-Dry Foam & Water-Repellent Fabrics: Standard foam acts like a sponge, trapping water and causing mildew. Premium outdoor furniture utilizes quick-dry polyurethane foam with open cells that allow water to drain through almost instantly, wrapped in solution-dyed, UV-resistant outdoor fabrics.\n\nDifferent outdoor spaces call for distinct layout strategies in North Bengal:\n• Cozy Hill Station Balconies (Darjeeling & Sikkim): Hilly balconies are often compact but offer breathtaking views. A high-comfort hanging swing (like our Knight or Saturn models) or a compact 2-seater coffee set allows you to enjoy the misty morning tea without cluttering the space.\n• Spacious Terraces & Patios (Siliguri Residential): For modern duplexes in Uttarayon or luxury apartments off Sevoke Road, a modular L-shaped rope sofa set creates an inviting focal point for family gatherings and evening hosting.\n• Commercial Hospitality (Resorts & Tea Estates): Resorts and cafes require heavy-duty, low-maintenance luxury. Stackable dining sets, poolside loungers, and wind-stable garden umbrellas ensure guests remain comfortable while the operations team spends minimal time on maintenance.\n\nWhile premium outdoor furniture is engineered to live outdoors year-round, simple habits can significantly extend its lifespan:\n• Use Protective Covers: During the peak monsoon season (June to September) when the furniture is unused for extended periods, high-quality waterproof covers will protect it from dust, heavy rainfall, and organic debris.\n• Ensure Proper Drainage: Position your outdoor pieces where water doesn't pool around the legs.\n• Routine Cleaning: Wash down the frames and weaves occasionally with a gentle spray of clean water and mild soap to clear dust, pollen, or tea-garden mist residue.\n\nReady to transform your balcony, garden, or resort patio in North Bengal? Visit the Sun Seatings Showroom at PCM Tower, Sevoke Road, Siliguri 734001 to experience our collections firsthand, or connect with our team on WhatsApp to request a custom catalog and project quotation.",
    featuredImage: assetPath("Rope", "All Weather Patio Rope Sofa Set with Glass Top Coffee Table.png"),
    tags: ["Outdoor Living", "Siliguri Guide", "Material Science"],
    publishedAt: "2026-06-06T12:00:00.000Z",
    seoTitle: "Designing Outdoor Spaces in Siliguri: All-Weather Furniture Guide",
    seoDescription:
      "An expert guide to designing climate-resilient balconies, terraces, and commercial resort spaces in Siliguri, Darjeeling, and Gangtok using premium all-weather outdoor furniture."
  },
  {
    id: "blog_5",
    title: "Spotlight: Premium Outdoor Furniture in Siliguri, Kolkata & West Bengal",
    slug: "premium-outdoor-furniture-siliguri-kolkata-west-bengal",
    excerpt: "Discover the best luxury outdoor furniture in West Bengal. Highlighting Designer Home & Landscapes in Kolkata and Sun Seatings in Siliguri for weather-resistant designs.",
    body: "When it comes to elevating outdoor spaces in Eastern India, choosing the right furniture is critical. The climate across West Bengal—from the humid summers of Kolkata to the heavy monsoons of Siliguri and North Bengal—demands luxury furniture that is both beautiful and highly weather-resistant.\n\nSpotlight: Designer Home & Landscapes – Premium Outdoor Furniture in Kolkata\n\nLeadership and Expertise\nFounded and led by Rohit Sarda, a pioneer with over 20 years of experience in outdoor design and landscaping, Designer Home & Landscapes has become a trusted name for premium outdoor furniture in Kolkata. Their blend of design innovation, durable materials, and customer-focused solutions has set new benchmarks in the industry.\n\nWhy Choose Designer Home & Landscapes?\n• Largest Outdoor Furniture Display in East India – Explore an extensive variety of designs suitable for terraces, gardens, patios, and poolside areas.\n• Weather-Resistant Materials – Specially crafted for Kolkata’s humid and monsoon-prone climate, ensuring long-lasting performance.\n• Custom Solutions – Tailored furniture setups that balance style, comfort, and functionality for homes, hotels, and corporate spaces.\n• Trusted by Professionals – Preferred partner for hotels, clubs, and architects seeking aesthetic yet functional outdoor furniture.\n\nSun Seatings: Your Luxury Outdoor Partner in Siliguri & North Bengal\nWhile Designer Home & Landscapes delivers excellence in Kolkata, SUN SEATINGS brings premium, luxury outdoor furniture to Siliguri, North Bengal, and Sikkim. Our curated collections are specifically designed to withstand the unique climatic challenges of the Himalayan foothills and the plains of West Bengal.\n\nWhether you are designing a cozy balcony in Darjeeling, a luxury resort in Gangtok, or a sprawling terrace in Siliguri, Sun Seatings offers:\n• High-Tenacity, All-Weather Wicker: Perfect for monsoon resilience.\n• Rust-Proof Aluminum Frames: Lightweight and completely immune to the heavy North Bengal rains.\n• Pan-Bengal Delivery & Support: Seamless logistics and consultation across West Bengal.\n\nTogether, these industry benchmarks ensure that no matter where you are in West Bengal—from the capital city to the northern hills—your outdoor living spaces reflect quiet luxury, unmatched durability, and architectural elegance.",
    featuredImage: assetPath("Coffee Sets", "Wave.png"),
    tags: ["Outdoor Living", "West Bengal", "Siliguri Guide"],
    publishedAt: "2026-06-13T12:00:00.000Z",
    seoTitle: "Premium Outdoor Furniture in Siliguri, Kolkata & West Bengal",
    seoDescription: "Explore premium outdoor furniture across West Bengal. Discover Designer Home & Landscapes in Kolkata and Sun Seatings in Siliguri for luxury, weather-resistant designs."
  }
];

export const popularSearches = [
  "4 seater dining set",
  "hanging wicker swing",
  "outdoor sofa set",
  "poolside lounger",
  "garden umbrella"
];

export interface LocalFAQItem {
  question: string;
  answer: string;
}

export const localFaqs: LocalFAQItem[] = [
  {
    question: "Where is the Sun Seatings outdoor furniture showroom located in Siliguri?",
    answer: "Our premium outdoor furniture studio is located at PCM Tower, Sevoke Road, Siliguri 734001. It is the leading showroom in North Bengal for luxury garden furniture, balcony swings, and patio sofa sets. If you are searching for the best furniture store near Sevoke Road, you can visit us or call us for a direct showroom walkthrough."
  },
  {
    question: "Does Sun Seatings deliver outdoor and balcony furniture to Sikkim, Darjeeling, and other North Bengal locations?",
    answer: "Yes, we provide reliable delivery and installation services across Siliguri, Darjeeling, Kalimpong, Gangtok (Sikkim), Jalpaiguri, Cooch Behar, and all neighboring regions of North Bengal. We specialize in transporting all-weather wicker sofas, loungers, and hanging swings safely to hilly terrains and resort project sites."
  },
  {
    question: "Why is Sun Seatings the best choice for outdoor furniture in Siliguri's weather conditions?",
    answer: "Siliguri and the surrounding North Bengal/Sikkim region experience heavy monsoon rains, high humidity, and intense summer sun. Sun Seatings furniture is specifically crafted to handle these extreme weather conditions. We use high-density, UV-stabilized PE rattan, powder-coated rust-proof aluminum frames, and water-repellent, quick-dry cushion fabrics, making our patio furniture exceptionally durable and weather-resistant."
  },
  {
    question: "Can I get customized balcony or terrace furniture for my home or cafe in Siliguri?",
    answer: "Absolutely! We work closely with homeowners, hospitality developers, and interior designers in Siliguri to customize seating capacities, rope weaving patterns, fabric colors, and sizes. Whether you need a compact coffee set for a residential balcony on Sevoke Road or a large dining layout for a resort in Darjeeling, we can customize a solution for you."
  },
  {
    question: "How can I request a project quotation or catalog PDF for bulk furniture orders in Siliguri?",
    answer: "You can download our digital catalog PDF directly from the website or request a custom project quotation. For instant assistance, click the WhatsApp button to connect with our showroom manager in Siliguri, or fill out the enquiry form on our Contact Page. We typically respond with pricing, delivery timelines, and design advice within 24 hours."
  },
  {
    question: "What types of furniture products can I experience at the Siliguri showroom?",
    answer: "At our Sevoke Road showroom, you can explore a curated range of outdoor sofa sets, space-saving balcony coffee sets, all-weather dining tables, designer hanging swings, poolside loungers, and wind-stable garden umbrellas. We offer the premium 'wicker and weave' look that adds quiet luxury to private residences, hotels, and cafes."
  }
];

export const videos: Video[] = [
  {
    id: "vid_1",
    title: "Exclusive Outdoor Furniture Showcase",
    description: "Explore our premium hand-woven all-weather outdoor collection live in action.",
    category: "showroom",
    reelId: "DZHh0Xjxs6h",
    reelUrl: "https://www.instagram.com/reel/DZHh0Xjxs6h/"
  },
  {
    id: "vid_2",
    title: "Luxury Patio Styling & Setup Guide",
    description: "See how we style and set up premium outdoor dining and sofa sets for luxury terraces.",
    category: "showroom",
    reelId: "DaACqrPRfHP",
    reelUrl: "https://www.instagram.com/reel/DaACqrPRfHP/"
  },
  {
    id: "vid_3",
    title: "Luxury Outdoor Sofa Set",
    description: "Experience premium comfort with our all-weather hand-woven outdoor sofa sets.",
    category: "showroom",
    reelId: "DZrXVIERF-J",
    reelUrl: "https://www.instagram.com/reel/DZrXVIERF-J/"
  },
  {
    id: "vid_4",
    title: "Premium Patio Seating",
    description: "Styling inspiration for spacious terraces and balconies featuring custom designer chairs.",
    category: "showroom",
    reelId: "DZZWgLaRACX",
    reelUrl: "https://www.instagram.com/reel/DZZWgLaRACX/"
  },
  {
    id: "vid_5",
    title: "Outdoor Dining Configurations",
    description: "Explore our modern resort-style dining sets made from rust-resistant aluminium.",
    category: "showroom",
    reelId: "DZUsRhhBApg",
    reelUrl: "https://www.instagram.com/reel/DZUsRhhBApg/"
  },
  {
    id: "vid_6",
    title: "Hanging Swings Comfort Showcase",
    description: "Relax in our statement wicker swings designed to elevate any outdoor corner.",
    category: "showroom",
    reelId: "DYgcNSWhnCk",
    reelUrl: "https://www.instagram.com/reel/DYgcNSWhnCk/"
  },
  {
    id: "vid_7",
    title: "Wicker and Weave Craftsmanship",
    description: "A close look at the detailed weaving patterns and weather-resistant finishes of our furniture.",
    category: "showroom",
    reelId: "DYOM-c3zv3j",
    reelUrl: "https://www.instagram.com/reel/DYOM-c3zv3j/"
  },
  {
    id: "vid_8",
    title: "Poolside Loungers Setup",
    description: "Transform your pool deck or rooftop with our UV-ready and quick-dry cushions.",
    category: "showroom",
    reelId: "DXbS7JvkTyA",
    reelUrl: "https://www.instagram.com/reel/DXbS7JvkTyA/"
  },
  {
    id: "vid_9",
    title: "Luxury Balcony Styling Guide",
    description: "Compact design inspiration to create a cozy and premium balcony retreat.",
    category: "showroom",
    reelId: "DWTHD3aEQeO",
    reelUrl: "https://www.instagram.com/reel/DWTHD3aEQeO/"
  }
];


