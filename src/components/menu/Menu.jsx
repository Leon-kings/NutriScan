// Menu.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  QrCodeScanner as QRIcon,
  ShoppingCart as CartIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  HealthAndSafety as HealthIcon,
  SmartToy as AIIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Fastfood as FoodIcon,
  Liquor as DrinkIcon,
  Favorite as FavoriteIcon,
  WarningAmber as WarningAmberIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon,
  RestaurantMenu as MenuIcon,
} from "@mui/icons-material";

// PRIVATE API FUNCTION - DO NOT EXPOSE OR LOG
const fetchUserDiagnosis = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const privateDiagnosisData = {
    hasDiagnosis: true,
    conditions: [
      {
        id: "diabetes",
        name: "Type 2 Diabetes",
        severity: "high",
        restriction: "sugar",
        message: "High sugar items can spike blood glucose levels",
      },
      {
        id: "hypertension",
        name: "Hypertension",
        severity: "high",
        restriction: "sodium",
        message: "High sodium may increase blood pressure",
      },
      {
        id: "celiac",
        name: "Celiac Disease",
        severity: "high",
        restriction: "gluten",
        message: "Gluten causes intestinal damage and inflammation",
      },
    ],
    allergies: [
      {
        id: "peanut",
        name: "Peanut Allergy",
        severity: "high",
        message: "May cause anaphylaxis",
      },
      {
        id: "shellfish",
        name: "Shellfish Allergy",
        severity: "high",
        message: "May cause severe allergic reaction",
      },
    ],
  };

  const demoMode = window.location.search.includes("demo=healthy")
    ? "healthy"
    : window.location.search.includes("demo=none")
      ? "none"
      : "default";

  if (demoMode === "healthy") {
    return { hasDiagnosis: true, conditions: [], allergies: [] };
  }
  if (demoMode === "none") {
    return { hasDiagnosis: false, conditions: [], allergies: [] };
  }

  return privateDiagnosisData;
};

const isItemRestricted = (item, diagnosis) => {
  if (!diagnosis || !diagnosis.hasDiagnosis) return false;

  const allRestrictions = [
    ...(diagnosis.conditions || []),
    ...(diagnosis.allergies || []),
  ];

  for (const restriction of allRestrictions) {
    if (restriction.restriction === "sugar" && item.highSugar) return true;
    if (restriction.restriction === "sodium" && item.highSodium) return true;
    if (restriction.restriction === "gluten" && item.containsGluten)
      return true;

    if (
      restriction.id === "peanut" &&
      item.ingredients?.some(
        (i) => i.includes("peanut") || i.includes("peanut oil"),
      )
    )
      return true;
    if (
      restriction.id === "shellfish" &&
      item.ingredients?.some(
        (i) =>
          i.includes("shrimp") ||
          i.includes("lobster") ||
          i.includes("crab") ||
          i.includes("prawn"),
      )
    )
      return true;
    if (
      restriction.id === "egg" &&
      item.ingredients?.some((i) => i.includes("egg"))
    )
      return true;
    if (
      restriction.id === "soy" &&
      item.ingredients?.some((i) => i.includes("soy") || i.includes("tofu"))
    )
      return true;
    if (
      restriction.id === "lactose" &&
      item.ingredients?.some(
        (i) =>
          i.includes("milk") ||
          i.includes("cheese") ||
          i.includes("cream") ||
          i.includes("yogurt"),
      )
    )
      return true;
  }

  return false;
};

const getRestrictionWarning = (item, diagnosis) => {
  if (!diagnosis || !diagnosis.hasDiagnosis) return null;

  const allRestrictions = [
    ...(diagnosis.conditions || []),
    ...(diagnosis.allergies || []),
  ];
  const relevantRestrictions = [];

  for (const restriction of allRestrictions) {
    if (restriction.restriction === "sugar" && item.highSugar) {
      relevantRestrictions.push(
        `${restriction.name}: ${restriction.message || "Contains high sugar"}`,
      );
    }
    if (restriction.restriction === "sodium" && item.highSodium) {
      relevantRestrictions.push(
        `${restriction.name}: ${restriction.message || "Contains high sodium"}`,
      );
    }
    if (restriction.restriction === "gluten" && item.containsGluten) {
      relevantRestrictions.push(
        `${restriction.name}: ${restriction.message || "Contains gluten"}`,
      );
    }
    if (
      restriction.id === "peanut" &&
      item.ingredients?.some((i) => i.includes("peanut"))
    ) {
      relevantRestrictions.push(
        `Peanut Allergy: This item contains peanuts which may cause severe reaction`,
      );
    }
    if (
      restriction.id === "shellfish" &&
      item.ingredients?.some(
        (i) => i.includes("shrimp") || i.includes("lobster"),
      )
    ) {
      relevantRestrictions.push(
        `Shellfish Allergy: This item contains shellfish`,
      );
    }
  }

  if (relevantRestrictions.length > 0) {
    return {
      title: "⚠️ Health Safety Warning",
      message: `Based on your medical profile, this item may affect your health:\n\n${relevantRestrictions.join("\n")}\n\nWe recommend choosing an alternative item for your safety.`,
      restrictions: relevantRestrictions,
    };
  }
  return null;
};

// EXPANDED MENU DATA - More than 12 items per category
const menuData = {
  foods: [
    {
      id: 1,
      name: "Grilled Chicken Breast",
      description:
        "Juicy grilled chicken breast with herb butter and roasted vegetables",
      ingredients: [
        "chicken",
        "butter",
        "rosemary",
        "garlic",
        "salt",
        "pepper",
      ],
      basePrice: 8500,
      baseTime: 15,
      category: "Main Course",
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 2,
      name: "Beef Burger Deluxe",
      description:
        "200g beef patty with cheddar, lettuce, tomato, onion, and special sauce",
      ingredients: [
        "beef",
        "cheese",
        "lettuce",
        "tomato",
        "onion",
        "bun",
        "pickles",
      ],
      basePrice: 7500,
      baseTime: 12,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: true,
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description:
        "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil",
      ingredients: ["dough", "mozzarella", "tomato", "basil", "olive oil"],
      basePrice: 12000,
      baseTime: 18,
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: true,
    },
    {
      id: 4,
      name: "Spaghetti Carbonara",
      description:
        "Creamy pasta with pancetta, egg, parmesan, and black pepper",
      ingredients: ["pasta", "pancetta", "eggs", "parmesan", "black pepper"],
      basePrice: 9500,
      baseTime: 14,
      category: "Pasta",
      image:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: true,
    },
    {
      id: 5,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with lemon dill sauce and asparagus",
      ingredients: ["salmon", "lemon", "dill", "butter", "garlic"],
      basePrice: 14500,
      baseTime: 16,
      category: "Seafood",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 6,
      name: "Vegetable Stir Fry",
      description: "Mixed vegetables in ginger soy sauce with tofu",
      ingredients: [
        "broccoli",
        "carrots",
        "bell peppers",
        "ginger",
        "soy sauce",
        "tofu",
      ],
      basePrice: 6800,
      baseTime: 10,
      category: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
      isVegetarian: true,
      isSpicy: true,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 7,
      name: "Chicken Tikka Masala",
      description: "Grilled chicken in creamy tomato curry with basmati rice",
      ingredients: ["chicken", "tomato", "cream", "spices", "onion", "garlic"],
      basePrice: 10500,
      baseTime: 20,
      category: "Indian",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a555?w=400",
      isVegetarian: false,
      isSpicy: true,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 8,
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan, and Caesar dressing",
      ingredients: ["lettuce", "croutons", "parmesan", "anchovies", "egg"],
      basePrice: 5500,
      baseTime: 8,
      category: "Salads",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8df?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: true,
    },
    {
      id: 9,
      name: "BBQ Ribs",
      description: "Slow-cooked pork ribs with homemade BBQ sauce",
      ingredients: ["pork ribs", "bbq sauce", "spices", "brown sugar"],
      basePrice: 16500,
      baseTime: 25,
      category: "Main Course",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: true,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 10,
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with wild mushrooms and truffle oil",
      ingredients: [
        "rice",
        "mushrooms",
        "parmesan",
        "white wine",
        "onion",
        "truffle oil",
      ],
      basePrice: 9800,
      baseTime: 22,
      category: "Italian",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 11,
      name: "Lamb chops",
      description: "Grilled lamb chops with rosemary and garlic",
      ingredients: ["lamb", "rosemary", "garlic", "olive oil", "salt"],
      basePrice: 18500,
      baseTime: 20,
      category: "Main Course",
      image:
        "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 12,
      name: "Falafel Wrap",
      description: "Crispy falafel with tahini sauce and fresh vegetables",
      ingredients: ["chickpeas", "tahini", "lettuce", "tomato", "wrap"],
      basePrice: 5500,
      baseTime: 10,
      category: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1593005475602-c9e7e2f8b6b9?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: true,
    },
    {
      id: 13,
      name: "Peanut Butter Smoothie Bowl",
      description: "Creamy smoothie bowl topped with granola and fresh berries",
      ingredients: ["peanut butter", "banana", "berries", "granola", "honey"],
      basePrice: 8900,
      baseTime: 8,
      category: "Breakfast",
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: true,
    },
    {
      id: 14,
      name: "Shrimp Scampi Pasta",
      description: "Garlic shrimp in lemon butter sauce over angel hair pasta",
      ingredients: ["shrimp", "pasta", "garlic", "butter", "lemon", "parmesan"],
      basePrice: 15500,
      baseTime: 18,
      category: "Seafood",
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: true,
    },
    {
      id: 15,
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with molten center, served with vanilla ice cream",
      ingredients: ["chocolate", "flour", "eggs", "butter", "sugar"],
      basePrice: 6500,
      baseTime: 12,
      category: "Desserts",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: true,
    },
    {
      id: 16,
      name: "Sushi Platter",
      description: "Assorted fresh sushi rolls with wasabi and ginger",
      ingredients: ["rice", "seaweed", "salmon", "tuna", "avocado", "cucumber"],
      basePrice: 22000,
      baseTime: 20,
      category: "Japanese",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
      isVegetarian: false,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 17,
      name: "Pad Thai",
      description:
        "Stir-fried rice noodles with shrimp, tofu, bean sprouts, and peanuts",
      ingredients: [
        "rice noodles",
        "shrimp",
        "tofu",
        "peanuts",
        "egg",
        "bean sprouts",
      ],
      basePrice: 11500,
      baseTime: 15,
      category: "Thai",
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
      isVegetarian: false,
      isSpicy: true,
      highSugar: true,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 18,
      name: "Greek Salad",
      description: "Cucumber, tomato, feta cheese, olives, and oregano",
      ingredients: [
        "cucumber",
        "tomato",
        "feta",
        "olives",
        "oregano",
        "olive oil",
      ],
      basePrice: 6000,
      baseTime: 6,
      category: "Salads",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 19,
      name: "Tandoori Chicken",
      description: "Yogurt-marinated chicken cooked in clay oven",
      ingredients: ["chicken", "yogurt", "spices", "ginger", "garlic"],
      basePrice: 12500,
      baseTime: 25,
      category: "Indian",
      image:
        "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400",
      isVegetarian: false,
      isSpicy: true,
      highSugar: false,
      highSodium: true,
      containsGluten: false,
    },
    {
      id: 20,
      name: "Waffle Breakfast",
      description:
        "Belgian waffle with maple syrup, fresh berries, and whipped cream",
      ingredients: [
        "flour",
        "eggs",
        "milk",
        "butter",
        "maple syrup",
        "berries",
      ],
      basePrice: 7800,
      baseTime: 12,
      category: "Breakfast",
      image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: true,
    },
  ],
  drinks: [
    {
      id: 101,
      name: "Fresh Orange Juice",
      description: "Squeezed to order, no added sugar",
      ingredients: ["oranges"],
      basePrice: 2500,
      baseTime: 3,
      category: "Juices",
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 102,
      name: "Mango Smoothie",
      description: "Creamy mango blended with Greek yogurt",
      ingredients: ["mango", "yogurt", "honey"],
      basePrice: 3500,
      baseTime: 5,
      category: "Smoothies",
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 103,
      name: "Cappuccino",
      description: "Espresso with steamed milk foam",
      ingredients: ["coffee", "milk"],
      basePrice: 3000,
      baseTime: 4,
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 104,
      name: "Mojito Mocktail",
      description: "Fresh mint, lime, soda water, and cane sugar",
      ingredients: ["mint", "lime", "soda", "sugar"],
      basePrice: 4000,
      baseTime: 5,
      category: "Mocktails",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 105,
      name: "Coca Cola",
      description: "Chilled soft drink",
      ingredients: ["carbonated water", "sugar", "caffeine"],
      basePrice: 1500,
      baseTime: 1,
      category: "Soft Drinks",
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 106,
      name: "Sparkling Water",
      description: "Carbonated mineral water with lime",
      ingredients: ["water", "carbonation", "lime"],
      basePrice: 2000,
      baseTime: 1,
      category: "Water",
      image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 107,
      name: "Strawberry Lemonade",
      description: "Fresh strawberries with homemade lemonade",
      ingredients: ["strawberries", "lemon", "sugar", "water"],
      basePrice: 3200,
      baseTime: 4,
      category: "Lemonades",
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 108,
      name: "Iced Latte",
      description: "Chilled espresso with oat milk",
      ingredients: ["coffee", "oat milk", "ice"],
      basePrice: 3500,
      baseTime: 3,
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 109,
      name: "Pineapple Punch",
      description: "Tropical pineapple, coconut, and lime",
      ingredients: ["pineapple", "coconut milk", "lime", "agave"],
      basePrice: 3800,
      baseTime: 5,
      category: "Mocktails",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 110,
      name: "Green Tea",
      description: "Premium Japanese sencha green tea",
      ingredients: ["green tea leaves"],
      basePrice: 2000,
      baseTime: 3,
      category: "Tea",
      image:
        "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 111,
      name: "Chocolate Milkshake",
      description: "Rich chocolate ice cream milkshake",
      ingredients: ["chocolate", "milk", "ice cream"],
      basePrice: 4000,
      baseTime: 5,
      category: "Smoothies",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 112,
      name: "Virgin Pina Colada",
      description: "Creamy coconut and pineapple blend",
      ingredients: ["coconut cream", "pineapple", "lime"],
      basePrice: 4500,
      baseTime: 5,
      category: "Mocktails",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 113,
      name: "Matcha Latte",
      description: "Premium matcha green tea with steamed almond milk",
      ingredients: ["matcha", "almond milk", "honey"],
      basePrice: 4200,
      baseTime: 4,
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1534777367038-9404f45b869b?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: false,
      highSodium: false,
      containsGluten: false,
    },
    {
      id: 114,
      name: "Watermelon Cooler",
      description: "Fresh watermelon juice with mint and lime",
      ingredients: ["watermelon", "mint", "lime", "agave"],
      basePrice: 3600,
      baseTime: 4,
      category: "Juices",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
      isVegetarian: true,
      isSpicy: false,
      highSugar: true,
      highSodium: false,
      containsGluten: false,
    },
  ],
};

const allItems = [...menuData.foods, ...menuData.drinks];

// Pagination settings
const ITEMS_PER_PAGE = 12;

// Result Modal Component
const ResultModal = ({ isOpen, onClose, title, message, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              <div
                className={`p-6 text-center ${type === "success" ? "bg-green-50" : type === "error" ? "bg-red-50" : "bg-yellow-50"}`}
              >
                {type === "success" && (
                  <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
                )}
                {type === "error" && (
                  <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
                )}
                {type === "warning" && (
                  <WarningAmberIcon className="text-yellow-500 text-6xl mx-auto mb-4" />
                )}
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-6 whitespace-pre-line">
                  {message}
                </p>
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Health Profile Banner Component
const HealthProfileBanner = ({ diagnosis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-xl p-4 mb-6 flex items-center justify-center space-x-2">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
        <span className="text-gray-500">Loading health profile...</span>
      </div>
    );
  }

  if (!diagnosis || !diagnosis.hasDiagnosis) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-3">
          <CheckCircleIcon className="text-green-500" />
          <div>
            <p className="font-semibold text-green-800">
              ✓ Full Menu Available
            </p>
            <p className="text-sm text-green-600">
              No dietary restrictions detected in your medical history
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-600 text-sm">
          <FavoriteIcon fontSize="small" />
          <span>Enjoy our complete selection!</span>
        </div>
      </div>
    );
  }

  const totalRestrictions =
    (diagnosis.conditions?.length || 0) + (diagnosis.allergies?.length || 0);
  const restrictedCount = allItems.filter((item) =>
    isItemRestricted(item, diagnosis),
  ).length;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex items-start space-x-3">
          <WarningAmberIcon className="text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">
              Personalized Menu Based on Your Health Profile
            </p>
            <p className="text-sm text-yellow-700">
              {totalRestrictions} condition{totalRestrictions !== 1 ? "s" : ""}{" "}
              detected • {restrictedCount} item
              {restrictedCount !== 1 ? "s" : ""} restricted for your safety
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {diagnosis.conditions?.map((c) => (
                <span
                  key={c.id}
                  className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
                >
                  ⚠️ {c.name}
                </span>
              ))}
              {diagnosis.allergies?.map((a) => (
                <span
                  key={a.id}
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
                >
                  🚫 {a.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          🛡️ Restricted items hidden for safety
        </div>
      </div>
    </div>
  );
};

// Warning Modal for Restricted Item Selection
const WarningModal = ({ isOpen, onClose, onConfirm, item, warning }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              <div className="bg-red-50 p-6 text-center">
                <WarningAmberIcon className="text-red-500 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700 mb-2">
                  {warning?.title || "Health Safety Warning"}
                </h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">
                  {warning?.message}
                </p>
                <div className="bg-white rounded-lg p-3 mb-4 text-left">
                  <p className="font-semibold text-sm mb-1">
                    Item: {item?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ingredients: {item?.ingredients?.join(", ")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                  >
                    I Understand the Risk
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cart Modal Component - Centered
const CartModal = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  getCartTotal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-2">
                  <CartIcon className="text-white" />
                  <h2 className="text-xl font-bold text-white">Your Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition"
                >
                  <CloseIcon className="text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400">
                      Add some delicious items from the menu!
                    </p>
                  </div>
                ) : (
                  <>
                    {cart.some((item) => item.hasWarning) && (
                      <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-700 flex items-center gap-1">
                          <WarningAmberIcon fontSize="small" />
                          Some items may conflict with your health profile
                        </p>
                      </div>
                    )}
                    {cart.map((item) => (
                      <div
                        key={item.cartId}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-sm text-orange-600 font-bold">
                            RWF {item.finalPrice.toLocaleString()}
                          </p>
                          {item.hasWarning && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                              <WarningAmberIcon fontSize="inherit" /> Contains
                              restricted ingredients
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartId, item.quantity - 1)
                            }
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartId, item.quantity + 1)
                            }
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                          >
                            <AddIcon fontSize="small" />
                          </button>
                          <button
                            onClick={() => onRemove(item.cartId)}
                            className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition ml-1"
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 space-y-3 bg-gray-50 shrink-0">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal:</span>
                    <span className="text-orange-600">
                      RWF {getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={onCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition shadow-md"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Cart Item Component for sidebar (keep for compatibility)
const CartItemComponent = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{item.name}</h4>
        <p className="text-sm text-orange-600 font-bold">
          RWF {item.finalPrice.toLocaleString()}
        </p>
        {item.hasWarning && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <WarningAmberIcon fontSize="inherit" /> Contains restricted
            ingredients
          </p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <RemoveIcon fontSize="small" />
        </button>
        <span className="w-6 text-center font-semibold text-sm">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <AddIcon fontSize="small" />
        </button>
        <button
          onClick={() => onRemove(item.cartId)}
          className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 ml-1"
        >
          <DeleteIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition flex items-center gap-1 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
        }`}
      >
        <PrevIcon fontSize="small" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg transition font-medium ${
            currentPage === page
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition flex items-center gap-1 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <NextIcon fontSize="small" />
      </button>
    </div>
  );
};

// Main Menu Component
export const Menu = ({ tableNumber = 1, userId = "user-123" }) => {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartIdCounter, setCartIdCounter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Health diagnosis states
  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(true);
  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    item: null,
    warning: null,
  });

  // Fetch diagnosis from private API on component mount
  useEffect(() => {
    const loadDiagnosis = async () => {
      setIsLoadingDiagnosis(true);
      try {
        const userDiagnosis = await fetchUserDiagnosis(userId);
        setDiagnosis(userDiagnosis);
      } catch (error) {
        console.error("Failed to load health profile");
        setDiagnosis({ hasDiagnosis: false, conditions: [], allergies: [] });
      } finally {
        setIsLoadingDiagnosis(false);
      }
    };

    loadDiagnosis();
  }, [userId]);

  // Get filtered and restricted items based on diagnosis
  const getAvailableItems = () => {
    if (!diagnosis) return [];

    if (
      !diagnosis.hasDiagnosis ||
      (diagnosis.conditions?.length === 0 && diagnosis.allergies?.length === 0)
    ) {
      return allItems;
    }

    return allItems.filter((item) => !isItemRestricted(item, diagnosis));
  };

  const availableItems = getAvailableItems();

  const categories = [
    "all",
    ...new Set(availableItems.map((item) => item.category)),
  ];

  const filteredItems = availableItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (item) => {
    const warning = getRestrictionWarning(item, diagnosis);

    if (warning) {
      setWarningModal({
        isOpen: true,
        item: item,
        warning: warning,
      });
    } else {
      addItemToCart(item, false);
    }
  };

  const addItemToCart = (item, hasWarning = false) => {
    const newCartItem = {
      cartId: cartIdCounter,
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      basePrice: item.basePrice,
      finalPrice: item.basePrice,
      quantity: 1,
      hasWarning: hasWarning,
      baseTime: item.baseTime,
    };

    setCart([...cart, newCartItem]);
    setCartIdCounter(cartIdCounter + 1);

    if (hasWarning) {
      toast.warning(
        `${item.name} added with health restrictions - please consume with caution`,
        {
          position: "bottom-right",
          autoClose: 4000,
        },
      );
    } else {
      toast.success(`${item.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const handleConfirmRestrictedItem = () => {
    if (warningModal.item) {
      addItemToCart(warningModal.item, true);
    }
    setWarningModal({ isOpen: false, item: null, warning: null });
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
    toast.info("Item removed from cart");
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setShowResultModal({
        isOpen: true,
        type: "error",
        title: "Cart is Empty",
        message: "Please add items to your cart before checking out.",
      });
      return;
    }
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  const processOrder = () => {
    setShowCheckoutModal(false);

    setTimeout(() => {
      setShowResultModal({
        isOpen: true,
        type: "success",
        title: "✅ Order Confirmed!",
        message: `Your order has been placed successfully!\n\nTotal: RWF ${getCartTotal().toLocaleString()}\n\nA waiter will bring your food shortly.\nThank you for dining with us!`,
      });
      setCart([]);
    }, 1500);
  };

  const cancelOrder = () => {
    setShowCheckoutModal(false);
    setShowResultModal({
      isOpen: true,
      type: "error",
      title: "❌ Order Cancelled",
      message:
        "Your order has been cancelled.\nYou can continue browsing the menu.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <ToastContainer />

      {/* Warning Modal for Restricted Items */}
      <WarningModal
        isOpen={warningModal.isOpen}
        onClose={() =>
          setWarningModal({ isOpen: false, item: null, warning: null })
        }
        onConfirm={handleConfirmRestrictedItem}
        item={warningModal.item}
        warning={warningModal.warning}
      />

      {/* Centered Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        getCartTotal={getCartTotal}
      />

      {/* Checkout Confirmation Modal */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <h2 className="text-xl font-bold text-white text-center">
                  Confirm Order
                </h2>
              </div>
              <div className="p-6 text-center">
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Total Amount:</p>
                  <p className="text-3xl font-bold text-orange-600">
                    RWF {getCartTotal().toLocaleString()}
                  </p>
                </div>
                {cart.some((item) => item.hasWarning) && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-xs text-yellow-700 flex items-center justify-center gap-1">
                      <WarningAmberIcon fontSize="small" />
                      Some items in your cart may conflict with your health
                      profile
                    </p>
                  </div>
                )}
                <p className="text-gray-500 mb-6">
                  Would you like to place this order?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={cancelOrder}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processOrder}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <ResultModal
        isOpen={showResultModal.isOpen}
        onClose={() =>
          setShowResultModal({ ...showResultModal, isOpen: false })
        }
        title={showResultModal.title}
        message={showResultModal.message}
        type={showResultModal.type}
      />

      {/* Main Menu UI */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <QRIcon className="text-white text-xl sm:text-2xl" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                QR Restaurant
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Table {tableNumber} • Scan to order
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCartModal(true)}
            className="relative bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <CartIcon className="text-orange-500 text-xl sm:text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Health Profile Banner - Responsive */}
        <HealthProfileBanner
          diagnosis={diagnosis}
          isLoading={isLoadingDiagnosis}
        />

        {/* Search Bar - Responsive */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white shadow-sm text-sm sm:text-base"
          />
        </div>

        {/* Categories - Horizontal Scroll on mobile, wrap on larger screens */}
        <div className="flex overflow-x-auto lg:overflow-visible lg:flex-wrap gap-2 mb-6 pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition font-medium text-sm sm:text-base ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          ))}
        </div>

        {/* Menu Grid - Responsive: 1 col (xs), 2 col (sm), 3 col (lg), 4 col (xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedItems.map((item) => {
            const isRestrictedForUser =
              diagnosis?.hasDiagnosis && isItemRestricted(item, diagnosis);
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  isRestrictedForUser
                    ? "opacity-70 grayscale-[0.2]"
                    : "hover:shadow-xl"
                }`}
                onClick={() => handleAddToCart(item)}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-bold shadow-md">
                    RWF {item.basePrice.toLocaleString()}
                  </div>
                  {item.isVegetarian && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold">
                      Veg
                    </div>
                  )}
                  {isRestrictedForUser && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">
                        <WarningAmberIcon
                          fontSize="small"
                          className="text-sm sm:text-base"
                        />{" "}
                        Restricted
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-lg mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs sm:text-sm text-gray-400">
                      <TimeIcon
                        fontSize="small"
                        className="mr-1 text-sm sm:text-base"
                      />
                      <span>{item.baseTime} min</span>
                    </div>
                    {item.isSpicy && (
                      <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                        🌶️ Spicy
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500">
              No items match your search or dietary restrictions.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Try a different search or browse other categories.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Items counter - responsive */}
        {filteredItems.length > 0 && (
          <div className="text-center text-xs sm:text-sm text-gray-400 mt-4 pb-4">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{" "}
            {filteredItems.length} items
          </div>
        )}
      </div>
    </div>
  );
};
