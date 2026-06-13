(function () {
  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  function assetPath(folder, file) {
    return encodeURI("public/assets/catalog/" + folder + "/" + file);
  }

  function cleanProductName(fileName) {
    return String(fileName)
      .replace(/\.[^.]+$/, "")
      .replace(/\bw:o\b/gi, "without arm")
      .replace(/\bw arm\b/gi, "with arm")
      .replace(/\s+-\s+/g, " ")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function uniqueValues(values) {
    var map = {};
    return values.filter(function (value) {
      if (!value || map[value]) {
        return false;
      }
      map[value] = true;
      return true;
    });
  }

  function getMaterialTags(material) {
    var text = String(material || "").toLowerCase();
    var tags = [];

    if (/(rattan|wicker|weave|cane|\bpe\b)/.test(text)) {
      tags.push("rattan", "wicker");
    }

    if (/(wood|teak|acacia)/.test(text)) {
      tags.push("wood");
    }

    if (/(metal|aluminium|aluminum|steel|iron)/.test(text)) {
      tags.push("metal");
    }

    if (/(fabric|upholstery|cushion)/.test(text)) {
      tags.push("fabric");
    }

    return uniqueValues(tags);
  }

  function buildGalleryImages(folder, files, index) {
    if (!files || !files.length) {
      return [];
    }

    return uniqueValues(
      [files[index], files[(index + 1) % files.length], files[(index + 2) % files.length]].map(function (file) {
        return assetPath(folder, file);
      })
    );
  }

  function heroAsset(fileName) {
    return "assets/images/hero/" + fileName;
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  }

  function buildWhatsAppLink(phone, productName) {
    var message = productName
      ? "I am interested in " + productName + ". Please share pricing, lead time and catalogue details."
      : "Hello, I would like to know more about the SUN SEATINGS collection.";
    return "https://wa.me/" + String(phone).replace(/\D/g, "") + "?text=" + encodeURIComponent(message);
  }

  function buildPhoneLink(phone) {
    return "tel:" + String(phone).replace(/\s+/g, "");
  }

  function buildEmailLink(email, productName) {
    var subject = productName
      ? "SUN SEATINGS enquiry for " + productName
      : "SUN SEATINGS product enquiry";
    var body = productName
      ? "Hello,\n\nI am interested in " + productName + ". Please share pricing, availability and catalogue details.\n"
      : "Hello,\n\nPlease share pricing and catalogue details for your collection.\n";
    return "mailto:" + String(email || "").trim() + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function categoryUrl(slug) {
    return "category.html?slug=" + encodeURIComponent(slug);
  }

  function productUrl(product) {
    return (
      "product.html?category=" +
      encodeURIComponent(product.categorySlug) +
      "&slug=" +
      encodeURIComponent(product.slug)
    );
  }

  function blogPostUrl(slug) {
    return encodeURIComponent(slug) + ".html";
  }

  function catalogPdfUrl() {
    return "https://drive.google.com/file/d/11VAEtUBjSpEOAe-WHDQUFFHlr0bzqm0R/view?usp=sharing";
  }

  var siteConfig = {
    name: "SUN SEATINGS",
    tagline: "Exclusive Outdoor Furniture",
    description:
      "Luxury outdoor furniture catalog for modern homes, hospitality projects and premium terraces across India.",
    phone: "+91 70295 19022",
    whatsappNumber: "917029519022",
    email: "bluekiteindustries@gmail.com",
    instagramUrl: "https://www.instagram.com/sunseatings",
    facebookUrl: "https://www.facebook.com/profile.php?id=61580987248000",
    catalogPdf: catalogPdfUrl(),
    loaderLogo: assetPath("LOGO", "SUN SEATINGS Loader.png"),
    address: "PCM Tower, Sevoke Road, Siliguri 734001",
    supportHours: "Mon-Sat - 10:00 AM to 8:00 PM"
  };

  var categoryBlueprints = [
    {
      name: "Rope Collection",
      slug: "rope-collection",
      folder: "Rope",
      bannerImage: assetPath("Rope", "L-Shaped Rope Woven Outdoor Sofa Set (Beige & Cream).png"),

      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Modern Aesthetic",
      order: 1,
      heroStat: "Tactile rope weaving"
    },
    {
      name: "Coffee Sets",
      slug: "coffee-sets",
      folder: "Coffee Sets",
      bannerImage: assetPath("Coffee Sets", "Ivan.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Luxury Pick",
      order: 2,
      heroStat: "Best for balconies"
    },
    {
      name: "Dining Sets",
      slug: "dining-sets",
      folder: "Dining Sets",
      bannerImage: assetPath("Dining Sets", "WW-44 (4 chair + 1 table).png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Family Favorite",
      order: 3,
      heroStat: "Resort-ready finishes"
    },
    {
      name: "Hanging Swings",
      slug: "swings",
      folder: "Swings",
      bannerImage: assetPath("Swings", "Saturn.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Statement Design",
      cardImageFit: "contain",
      cardImageScale: 1,
      order: 4,
      heroStat: "Designer silhouettes"
    },
    {
      name: "Loungers",
      slug: "loungers",
      folder: "Loungers",
      bannerImage: assetPath("Loungers", "Zen.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Poolside Ready",
      order: 5,
      heroStat: "UV-ready cushions"
    },
    {
      name: "Sunbeds",
      slug: "sunbeds",
      folder: "Sunbeds",
      bannerImage: assetPath("Sunbeds", "Glade.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Resort Standard",
      order: 6,
      heroStat: "Hospitality grade"
    },
    {
      name: "Umbrellas",
      slug: "umbrellas",
      folder: "Umbrella",
      bannerImage: assetPath("Umbrella", "WW- U1 (Beige).png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Shade Essential",
      order: 7,
      heroStat: "Wind-stable build"
    },
    {
      name: "Bar Sets",
      slug: "bar-sets",
      folder: "Bar Sets",
      bannerImage: assetPath("Bar Sets", "Martini.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Entertainer Edit",
      cardImageFit: "contain",
      cardImageScale: 1,
      order: 8,
      heroStat: "Commercial friendly"
    },
    {
      name: "Outdoor Sofa",
      slug: "outdoor-sofa",
      folder: "Sofa Sets",
      bannerImage: assetPath("Sofa Sets", "Haven.png"),
      accentFrom: "#fffdf9",
      accentTo: "#f6efe6",
      badge: "Top Seller",
      cardImageFit: "contain",
      cardImageScale: 1,
      order: 9,
      heroStat: "48-hour quote turnaround"
    }
  ];

  var productFiles = {
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
    ],
    "rope-collection": [
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
    ]
  };

  var categoryCopy = {
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
    },
    "rope-collection": {
      material: "High-tenacity polyester rope with charcoal aluminium frame",
      highlights: ["Hand-woven rope detail", "UV-resistant fibers", "Contemporary architectural look"],
      leadTime: "8-15 business days",
      warranty: "3 year structural warranty"
    }
  };

  // --- SIMPLE PRICE LIST (Change prices here) ---
  var PRODUCT_PRICES = {
    // Outdoor Sofas
    "Haven": 89000,
    "Vista": 90000,
    "Meadow": 110000,
    "Horizon": 84000,
    "Cascade": 57000,
    "Alipine": 100000,
    "Solstice": 47000,
    "Breeze": 48000,
    "Ember": 70000,
    "Enden": 160000,
    "Skyline": 90000,
    "Summit": 84000,

    // Coffee Sets
    "Ivan": 30000,
    "WW-09 (2 chair + 1 table)": 16400,
    "Qube": 30000,
    "WW-05 (2 chair + 1 table)": 14800,
    "WW-08 (2 Chair + 1 table)": 14800,
    "Wave": 30000,
    "Cairo": 24800,
    "WW-43 (2 chair + 1 table)": 22000,
    "Nest": 23000,
    "WW-12 ( 2 Chair + 1 table)": 12000,
    "WW-12 (2 Chair +1 table)": 11600,
    "Egg": 24000,

    // Dining Sets
    "WW-44 (4 chair + 1 table)": 36000,
    "WW-69 (4 chair + 1 table)": 40000,
    "WW-57 (4 chair + 1 table)": 40000,
    "WW-08B (4 chair + 1 table)": 24000,
    "WW-50 (4 chair + 1 table)": 40000,
    "WW-26 with arm (4 chair + 1 table)": 31000,
    "WW-43 (4 chair + 1 table)": 36000,
    "WW-26 without arm (4 chair + 1 table)": 31000,
    "WW-08 (4 chair + 1 table)": 24000,
    "WW-12 (4 chair + 1 table)r": 19000,
    "WW-12 (4 chair + 1 table)s": 19300,
    "WW-63 (4 chair + 1 table)": 37000,
    "WW-43 (6 chair + 1 table)r": 60000,
    "WW-26 (6 chair + 1 table)": 54000,
    "WW-43 (6 chair + 1 table)s": 60000,
    "WW-43 Net (6 chair + 1 table)": 76000,
    "WW-09 (4 chair + 1 table)": 26600,
    "WW-15 (4 chair + 1 table)": 36000,

    // Swings
    "Spoon": 15000,
    "Celestial -01": 24000,
    "Spider": 14000,
    "Celestial -02": 24000,
    "Sway": 18000,
    "Double Seater-01": 40000,
    "Double Seater-02": 44000,
    "Vortex": 15000,
    "Knight": 20000,
    "Avocado": 15600,
    "Melody": 15600,
    "Glide": 15000,
    "Spider HR": 14400,
    "Saturn": 20000,

    // Loungers
    "Bean": 22000,
    "Melt": 19000,
    "Fuse": 40000,
    "Curve": 19000,
    "Zen": 24000,
    "Plush": 29000,

    // Sunbeds
    "Glade": 46000,
    "Oasis": 40000,
    "Echo": 30000,
    "Bloom": 40000,

    // Umbrellas
    "WW- U3 (Green)": 15400,
    "WW- U1 (Beige)": 15800,
    "WW- U1 (Maroon)": 158000,
    "WW- U2 (Green)": 22000,

    // Bar Sets
    "Riveria": 66000,
    "Brew-02": 30000,
    "Brew-01": 30000,
    "Bubble": 32000,
    "Martini": 24000,
    "Noble": 29000,
    "Pacific": 40000,
    "Bistro": 32000,
    "Serving Cart-01": 15400,
    "Autumn": 38000,
    "Vatican": 20000,
    "Canvas": 23000,
    // Rope Collection
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
    "5-SEATER OUTDOOR ALL-WEATHER ROPE SOFA SET": 195000,
  };

  var categories = categoryBlueprints.map(function (category, index) {
    return {
      id: "category_" + String(index + 1),
      origin: "seed",
      name: category.name,
      slug: category.slug,
      folder: category.folder,
      bannerImage: category.bannerImage,
      accentFrom: category.accentFrom,
      accentTo: category.accentTo,
      badge: category.badge,
      order: category.order || index + 1,
      cardImageFit: category.cardImageFit || "cover",
      cardImageScale: category.cardImageScale || 1,
      heroStat: category.heroStat || "Premium furniture"
    };
  });

  var categoryMap = {};
  categories.forEach(function (category) {
    categoryMap[category.slug] = category;
  });

  var products = [];
  Object.keys(productFiles).forEach(function (categorySlug) {
    var category = categoryMap[categorySlug];
    var copy = categoryCopy[categorySlug];

    if (!category || !copy) {
      return;
    }

    productFiles[categorySlug].forEach(function (fileName, index) {
      var displayName = cleanProductName(fileName);

      // LOOKUP PRICE FROM THE SIMPLE LIST
      // Fallback logic if a new name is added but not in the price list
      var price = PRODUCT_PRICES[displayName] || 0;

      var originalPrice = Math.round(price * 1.22);
      var discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
      var rating = Number((4.3 + (index % 5) * 0.12).toFixed(1));
      var reviewCount = 24 + index * 9;
      var seatingCapacity;

      if (categorySlug === "dining-sets") {
        seatingCapacity = index > 11 ? "6 seater" : "4 seater";
      } else if (categorySlug === "outdoor-sofa") {
        seatingCapacity = ["4 seater", "5 seater", "6 seater"][index % 3];
      } else if (categorySlug === "coffee-sets") {
        seatingCapacity = "2 seater";
      } else if (categorySlug === "bar-sets") {
        seatingCapacity = ["2 seater", "4 seater"][index % 2];
      } else if (categorySlug === "umbrellas") {
        seatingCapacity = "Shade unit";
      } else {
        seatingCapacity = "1 seater";
      }

      var availability = index % 7 === 0 ? "Limited Stock" : index % 5 === 0 ? "Preorder" : "In Stock";
      var primaryImage = assetPath(category.folder, fileName);
      var productSlug = slugify(displayName) || category.slug + "-" + String(index + 1);
      var sku = "WW-" + category.slug.slice(0, 3).toUpperCase() + "-" + String(index + 1).padStart(3, "0");

      products.push({
        id: "product_" + category.slug + "_" + String(index + 1),
        origin: "seed",
        name: displayName,
        slug: productSlug,
        sku: sku,
        categoryId: category.id,
        categorySlug: category.slug,
        categoryName: category.name,
        tagline: displayName + " \u2013 " + category.name + " Collection",
        description:
          displayName +
          " is part of the " +
          category.name +
          " collection by SUN SEATINGS, built to bring hotel-style comfort to private homes, terraces, gardens and hospitality lounges.",
        marketingCopy:
          displayName +
          " combines refined silhouette, weather-ready materials and an easy-luxury finish so your outdoor space feels intentional, polished and ready to host.",
        price: price,
        originalPrice: originalPrice,
        discountPercentage: discountPercentage,
        rating: rating,
        reviewCount: reviewCount,
        material: copy.material,
        materialTags: getMaterialTags(copy.material),
        seatingCapacity: seatingCapacity,
        availability: availability,
        featured: index < 4 || (categorySlug === "swings" && index < 6),
        badge: index % 6 === 0 ? "Trending" : index % 4 === 0 ? "Best Seller" : discountPercentage > 16 ? "Deal" : "New Launch",
        images: buildGalleryImages(category.folder, productFiles[categorySlug], index),
        primaryImage: primaryImage,
        highlights: copy.highlights.slice(),
        specifications: [
          { label: "Material", value: copy.material },
          { label: "Seating Capacity", value: seatingCapacity },
          { label: "Warranty", value: copy.warranty },
          { label: "Lead Time", value: copy.leadTime },
          { label: "Finish", value: "UV-stable, handwoven outdoor finish" }
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
        seoTitle: displayName + " | " + category.name + " by SUN SEATINGS",
        seoDescription:
          displayName +
          " from the " +
          category.name +
          " collection. Explore dimensions, highlights, project-ready pricing and quotation support from SUN SEATINGS."
      });
    });
  });

  var heroSlides = [
    {
      id: "hero_1",
      eyebrow: "Quiet Luxury Living in Siliguri, West Bengal",
      title: "Designer outdoor furniture in Siliguri, West Bengal.",
      subtitle:
        "Explore refined sofas, lounge furniture and statement pieces presented at our Siliguri showroom, with enquiry-first buying made simple.",
      image: heroAsset("premium-living-4.png"),
      ctaPrimary: { label: "Explore Collection", href: "shop.html" },
      ctaSecondary: { label: "Request Quote", href: "contact.html" },
      badges: ["Full-screen showroom look", "Pan India delivery", "Quotation in 24 hrs"],
      highlights: [
        "Warm neutral styling that feels premium from the first glance",
        "Made for villas, penthouses, lounges and design-forward homes",
        "Move from inspiration to quote without cart or checkout friction"
      ],
      stats: [
        { value: "120+", label: "signature designs" },
        { value: "24 hrs", label: "quote response target" },
        { value: "3 yrs", label: "coverage support" }
      ],
      spotlightLabel: "Living room signature",
      spotlightTitle: "Soft-tone statement sofa",
      spotlightCopy: "Balanced proportions, tactile upholstery and a calm architectural mood.",
      spotlightHref: productUrl({ categorySlug: "outdoor-sofa", slug: "haven" }),
      offerBadge: "Curated hero edit",
      trustLine: "Made for refined homes, villas, penthouses and hospitality interiors."
    },
    {
      id: "hero_2",
      eyebrow: "Modern Interior Story in Siliguri",
      title: "Furniture styled like a premium editorial spread, ready for your West Bengal home.",
      subtitle:
        "A cleaner catalog experience for buyers who want strong visuals, clear details and fast support on WhatsApp, call or quotation.",
      image: heroAsset("premium-living-1.avif"),
      ctaPrimary: { label: "Shop by Category", href: "categories.html" },
      ctaSecondary: { label: "Get Catalog PDF", href: catalogPdfUrl() },
      badges: ["Editorial styling", "Premium browsing", "Fast lead capture"],
      highlights: [
        "Full-size scenes that help products feel aspirational and premium",
        "A luxury look that still keeps ecommerce clarity and conversion cues",
        "Easy for homeowners, architects and hospitality buyers to shortlist"
      ],
      stats: [
        { value: "300+", label: "catalog pieces" },
        { value: "28", label: "states served" },
        { value: "1 click", label: "whatsapp connect" }
      ],
      spotlightLabel: "Interior-focused visual",
      spotlightTitle: "Soft modern seating story",
      spotlightCopy: "A premium composition built around texture, calm light and sculpted form.",
      spotlightHref: productUrl({ categorySlug: "dining-sets", slug: "ww-44-4-chair-1-table" }),
      offerBadge: "Premium styling",
      trustLine: "Built to feel high-end, clean and conversion-ready across desktop and mobile."
    },
    {
      id: "hero_3",
      eyebrow: "Architectural Comfort for North Bengal",
      title: "Spaces that feel layered, tactile and quietly luxurious across Siliguri and West Bengal.",
      subtitle:
        "From sofa statements to dining and lounge pieces, discover a catalog crafted to look more like a luxury brand campaign than a generic grid.",
      image: heroAsset("premium-living-2.avif"),
      ctaPrimary: { label: "Browse Best Sellers", href: "shop.html?sort=popular" },
      ctaSecondary: { label: "Talk to Expert", href: "contact.html" },
      badges: ["Architect-ready", "Luxury textures", "Premium presentation"],
      highlights: [
        "Designed to help every hero image land with more atmosphere and depth",
        "Useful for projects where the first impression needs to feel elevated",
        "Perfect for premium homes, studios, showrooms and design consultations"
      ],
      stats: [
        { value: "4.8/5", label: "average ratings" },
        { value: "60%", label: "seasonal savings" },
        { value: "100K+", label: "happy buyers" }
      ],
      spotlightLabel: "Comfort-led moodboard",
      spotlightTitle: "Layered living composition",
      spotlightCopy: "A showroom-style frame that helps the catalog feel richer and more cinematic.",
      spotlightHref: "shop.html?sort=featured",
      offerBadge: "Luxury look",
      trustLine: "Built for stronger first impressions, richer storytelling and faster enquiries."
    },
    {
      id: "hero_4",
      eyebrow: "Curated Catalogue Experience in Siliguri",
      title: "Siliguri's premium outdoor furniture collection moving like a luxury storefront.",
      subtitle:
        "The hero now side-slides automatically, holds focus on full-size imagery and keeps quotation, WhatsApp and catalog access close to the first interaction.",
      image: heroAsset("premium-living-3.avif"),
      ctaPrimary: { label: "View All Products", href: "shop.html" },
      ctaSecondary: { label: "Open WhatsApp", href: buildWhatsAppLink(siteConfig.whatsappNumber) },
      badges: ["Auto side slider", "Full-size imagery", "Luxury-first UI"],
      highlights: [
        "Clean motion every 2.3 seconds for a polished banner experience",
        "Large-format imagery that gives the site a high-end campaign feel",
        "Direct conversion paths without interrupting the visual storytelling"
      ],
      stats: [
        { value: "2.3 sec", label: "auto slide timing" },
        { value: "Full size", label: "hero imagery" },
        { value: "90+", label: "premium ui score" }
      ],
      spotlightLabel: "Hero experience",
      spotlightTitle: "Side-sliding luxury banner",
      spotlightCopy: "Designed to feel immersive first, while staying sharp, readable and sales-focused.",
      spotlightHref: "shop.html",
      offerBadge: "New hero",
      trustLine: "A premium landing experience with bigger imagery and smoother rhythm."
    }
  ];

  var trustPoints = [
    {
      id: "trust_1",
      title: "Premium quality",
      description: "Hand-finished outdoor collections with hotel-style detailing.",
      stat: "300+ designs"
    },
    {
      id: "trust_2",
      title: "100K+ customers",
      description: "Trusted by homeowners, cafes, villas and hospitality teams.",
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

  var testimonials = [
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

  var instagramShots = [
    { id: "insta_1", caption: "Terrace-ready hosting corners", image: assetPath("Coffee Sets", "Wave.png") },
    { id: "insta_2", caption: "Modern outdoor dining", image: assetPath("Dining Sets", "WW-50 (4 chair + 1 table).png") },
    { id: "insta_3", caption: "Statement swing zones", image: assetPath("Swings", "Knight.png") },
    { id: "insta_4", caption: "Poolside calm", image: assetPath("Loungers", "Zen.png") },
    { id: "insta_5", caption: "Shade-led outdoor dining", image: assetPath("Umbrella", "WW- U1 (Beige).png") },
    { id: "insta_6", caption: "Luxury seating stories", image: assetPath("Sofa Sets", "Skyline.png") }
  ];

  var seedBanners = [
    {
      id: "banner_1",
      origin: "seed",
      title: "Summer Sale - Up to 60% OFF",
      subtitle: "Luxury outdoor living, priced for faster decisions.",
      image: assetPath("Sofa Sets", "Vista.png"),
      ctaLabel: "Shop Featured",
      ctaHref: "shop.html?sort=featured",
      active: true
    },
    {
      id: "banner_2",
      origin: "seed",
      title: "Talk to our furniture expert",
      subtitle: "Get project pricing, finish support and fast quotation guidance.",
      image: assetPath("Swings", "Melody.png"),
      ctaLabel: "Request Quote",
      ctaHref: "contact.html",
      active: true
    }
  ];

  var blogPosts = [
    {
      id: "blog_2",
      origin: "seed",
      title: "Designing Outdoor Spaces in Siliguri: All-Weather Furniture Guide for North Bengal & Sikkim",
      slug: "outdoor-furniture-design-guide-siliguri-north-bengal",
      excerpt: "An expert guide to designing climate-resilient balconies, terraces, and commercial resort spaces in Siliguri, Darjeeling, and Gangtok using premium all-weather outdoor furniture.",
      body: "Siliguri, the gateway to North Bengal and Sikkim, is experiencing an architectural and lifestyle renaissance. From premium residential projects along Sevoke Road and Matigara to luxury tea tourism resorts in Darjeeling and boutique hotels in Gangtok, the emphasis on outdoor living has never been stronger.\n\nHowever, North Bengal’s unique geographical position at the foothills of the Himalayas presents a challenging climate. The region is known for its intense monsoons with heavy rainfall, prolonged high humidity, warm summer sun, and damp, misty winters in the hills. Standard indoor furniture or cheap plastic alternatives quickly deteriorate under these conditions. Designing an outdoor space that stays pristine year after year requires a careful balance of aesthetic luxury and material science.\n\nWhen choosing outdoor furniture for Siliguri or neighboring hill areas like Kalimpong and Sikkim, three climatic factors must be addressed:\n1. Torrential Rainfall: North Bengal receives some of the highest rainfall in India. Water pooling, wood rot, and metal rust are constant threats.\n2. High Humidity: The sub-tropical humidity of the plains promotes mold and mildew growth on low-quality fibers and cushions.\n3. High UV Index: The intense summer sun in the plains and high-altitude UV rays in Gangtok and Darjeeling can cause color fading and material embrittlement.\n\nTo build a beautiful terrace or commercial garden that withstands the elements, material selection is critical:\n• High-Tenacity Rope: Hand-woven rope furniture uses UV-stabilized, high-density polyester or polyolefin fibers. The open-weave design allows air to flow through, which helps the furniture dry rapidly after a sudden monsoon shower and prevents mold accumulation.\n• Rust-Resistant Aluminium: Powder-coated aluminium is the ultimate framing material. Unlike iron, it will not rust when exposed to moisture. It is also lightweight (essential for transport to hilly terrains) and does not absorb heat under direct sunlight.\n• All-Weather PE Rattan: High-density polyethylene (HDPE) synthetic wicker is highly superior to natural rattan. It does not split, fade, or absorb moisture, making it ideal for the humid climate of Sevoke Road.\n• Quick-Dry Foam & Water-Repellent Fabrics: Standard foam acts like a sponge, trapping water and causing mildew. Premium outdoor furniture utilizes quick-dry polyurethane foam with open cells that allow water to drain through almost instantly, wrapped in solution-dyed, UV-resistant outdoor fabrics.\n\nDifferent outdoor spaces call for distinct layout strategies in North Bengal:\n• Cozy Hill Station Balconies (Darjeeling & Sikkim): Hilly balconies are often compact but offer breathtaking views. A high-comfort hanging swing (like our Knight or Saturn models) or a compact 2-seater coffee set allows you to enjoy the misty morning tea without cluttering the space.\n• Spacious Terraces & Patios (Siliguri Residential): For modern duplexes in Uttarayon or luxury apartments off Sevoke Road, a modular L-shaped rope sofa set creates an inviting focal point for family gatherings and evening hosting.\n• Commercial Hospitality (Resorts & Tea Estates): Resorts and cafes require heavy-duty, low-maintenance luxury. Stackable dining sets, poolside loungers, and wind-stable garden umbrellas ensure guests remain comfortable while the operations team spends minimal time on maintenance.\n\nWhile premium outdoor furniture is engineered to live outdoors year-round, simple habits can significantly extend its lifespan:\n• Use Protective Covers: During the peak monsoon season (June to September) when the furniture is unused for extended periods, high-quality waterproof covers will protect it from dust, heavy rainfall, and organic debris.\n• Ensure Proper Drainage: Position your outdoor pieces where water doesn't pool around the legs.\n• Routine Cleaning: Wash down the frames and weaves occasionally with a gentle spray of clean water and mild soap to clear dust, pollen, or tea-garden mist residue.\n\nReady to transform your balcony, garden, or resort patio in North Bengal? Visit the Sun Seatings Showroom at PCM Tower, Sevoke Road, Siliguri 734001 to experience our collections firsthand, or connect with our team on WhatsApp to request a custom catalog and project quotation.",
      featuredImage: assetPath("Rope", "All Weather Patio Rope Sofa Set with Glass Top Coffee Table.png"),
      tags: ["Outdoor Living", "Siliguri Guide", "Material Science"],
      publishedAt: "2026-06-06T12:00:00.000Z",
      seoTitle: "Designing Outdoor Spaces in Siliguri: All-Weather Furniture Guide",
      seoDescription: "An expert guide to designing climate-resilient balconies, terraces, and commercial resort spaces in Siliguri, Darjeeling, and Gangtok using premium all-weather outdoor furniture."
    },
    {
      id: "blog_5",
      origin: "seed",
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

  var popularSearches = [
    "4 seater dining set",
    "hanging wicker swing",
    "outdoor sofa set",
    "poolside lounger",
    "garden umbrella"
  ];

  var localFaqs = [
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

  window.WW_DATA = {
    siteConfig: siteConfig,
    categories: categories,
    products: products,
    heroSlides: heroSlides,
    trustPoints: trustPoints,
    testimonials: testimonials,
    instagramShots: instagramShots,
    banners: seedBanners,
    blogPosts: blogPosts,
    popularSearches: popularSearches,
    localFaqs: localFaqs,
    slugify: slugify,
    assetPath: assetPath,
    cleanProductName: cleanProductName,
    getMaterialTags: getMaterialTags,
    formatCurrency: formatCurrency,
    formatDate: formatDate,
    buildWhatsAppLink: buildWhatsAppLink,
    buildPhoneLink: buildPhoneLink,
    buildEmailLink: buildEmailLink,
    catalogPdfUrl: catalogPdfUrl,
    categoryUrl: categoryUrl,
    productUrl: productUrl,
    blogPostUrl: blogPostUrl
  };
})();