/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
// // Menu.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import QRCode from "qrcode";

// // Icons
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   HealthAndSafety as HealthIcon,
//   SmartToy as AIIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   Warning as WarningIcon,
//   Fastfood as FoodIcon,
//   Liquor as DrinkIcon,
//   Favorite as FavoriteIcon,
//   WarningAmber as WarningAmberIcon,
//   NavigateNext as NextIcon,
//   NavigateBefore as PrevIcon,
//   RestaurantMenu as MenuIcon,
//   QrCodeScanner,
//   RadioButtonChecked as RadioIcon,
//   Straighten as SizeIcon,
//   Restaurant as RestaurantIcon,
//   ThumbUp as ThumbUpIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";

// // PRIVATE API FUNCTION - DO NOT EXPOSE OR LOG
// const fetchUserDiagnosis = async (userId) => {
//   await new Promise((resolve) => setTimeout(resolve, 400));

//   const privateDiagnosisData = {
//     hasDiagnosis: true,
//     conditions: [
//       {
//         id: "diabetes",
//         name: "Type 2 Diabetes",
//         severity: "high",
//         restriction: "sugar",
//         message: "High sugar items can spike blood glucose levels",
//       },
//       {
//         id: "hypertension",
//         name: "Hypertension",
//         severity: "high",
//         restriction: "sodium",
//         message: "High sodium may increase blood pressure",
//       },
//       {
//         id: "celiac",
//         name: "Celiac Disease",
//         severity: "high",
//         restriction: "gluten",
//         message: "Gluten causes intestinal damage and inflammation",
//       },
//     ],
//     allergies: [
//       {
//         id: "peanut",
//         name: "Peanut Allergy",
//         severity: "high",
//         message: "May cause anaphylaxis",
//       },
//       {
//         id: "shellfish",
//         name: "Shellfish Allergy",
//         severity: "high",
//         message: "May cause severe allergic reaction",
//       },
//     ],
//   };

//   const demoMode = window.location.search.includes("demo=healthy")
//     ? "healthy"
//     : window.location.search.includes("demo=none")
//       ? "none"
//       : "default";

//   if (demoMode === "healthy") {
//     return { hasDiagnosis: true, conditions: [], allergies: [] };
//   }
//   if (demoMode === "none") {
//     return { hasDiagnosis: false, conditions: [], allergies: [] };
//   }

//   return privateDiagnosisData;
// };

// const isItemRestricted = (item, diagnosis) => {
//   if (!diagnosis || !diagnosis.hasDiagnosis) return false;

//   const allRestrictions = [
//     ...(diagnosis.conditions || []),
//     ...(diagnosis.allergies || []),
//   ];

//   for (const restriction of allRestrictions) {
//     if (restriction.restriction === "sugar" && item.highSugar) return true;
//     if (restriction.restriction === "sodium" && item.highSodium) return true;
//     if (restriction.restriction === "gluten" && item.containsGluten)
//       return true;

//     if (
//       restriction.id === "peanut" &&
//       item.ingredients?.some(
//         (i) => i.includes("peanut") || i.includes("peanut oil"),
//       )
//     )
//       return true;
//     if (
//       restriction.id === "shellfish" &&
//       item.ingredients?.some(
//         (i) =>
//           i.includes("shrimp") ||
//           i.includes("lobster") ||
//           i.includes("crab") ||
//           i.includes("prawn"),
//       )
//     )
//       return true;
//     if (
//       restriction.id === "egg" &&
//       item.ingredients?.some((i) => i.includes("egg"))
//     )
//       return true;
//     if (
//       restriction.id === "soy" &&
//       item.ingredients?.some((i) => i.includes("soy") || i.includes("tofu"))
//     )
//       return true;
//     if (
//       restriction.id === "lactose" &&
//       item.ingredients?.some(
//         (i) =>
//           i.includes("milk") ||
//           i.includes("cheese") ||
//           i.includes("cream") ||
//           i.includes("yogurt"),
//       )
//     )
//       return true;
//   }

//   return false;
// };

// const getRestrictionWarning = (item, diagnosis) => {
//   if (!diagnosis || !diagnosis.hasDiagnosis) return null;

//   const allRestrictions = [
//     ...(diagnosis.conditions || []),
//     ...(diagnosis.allergies || []),
//   ];
//   const relevantRestrictions = [];

//   for (const restriction of allRestrictions) {
//     if (restriction.restriction === "sugar" && item.highSugar) {
//       relevantRestrictions.push(
//         `${restriction.name}: ${restriction.message || "Contains high sugar"}`,
//       );
//     }
//     if (restriction.restriction === "sodium" && item.highSodium) {
//       relevantRestrictions.push(
//         `${restriction.name}: ${restriction.message || "Contains high sodium"}`,
//       );
//     }
//     if (restriction.restriction === "gluten" && item.containsGluten) {
//       relevantRestrictions.push(
//         `${restriction.name}: ${restriction.message || "Contains gluten"}`,
//       );
//     }
//     if (
//       restriction.id === "peanut" &&
//       item.ingredients?.some((i) => i.includes("peanut"))
//     ) {
//       relevantRestrictions.push(
//         `Peanut Allergy: This item contains peanuts which may cause severe reaction`,
//       );
//     }
//     if (
//       restriction.id === "shellfish" &&
//       item.ingredients?.some(
//         (i) => i.includes("shrimp") || i.includes("lobster"),
//       )
//     ) {
//       relevantRestrictions.push(
//         `Shellfish Allergy: This item contains shellfish`,
//       );
//     }
//   }

//   if (relevantRestrictions.length > 0) {
//     return {
//       title: "⚠️ Health Safety Warning",
//       message: `Based on your medical profile, this item may affect your health:\n\n${relevantRestrictions.join("\n")}\n\nWe recommend choosing an alternative item for your safety.`,
//       restrictions: relevantRestrictions,
//     };
//   }
//   return null;
// };

// // Get personalized recommendations based on user diagnosis and cart
// const getRecommendations = (cart, diagnosis, allItems) => {
//   const recommendations = [];

//   if (cart.length === 0) {
//     const safeItems = allItems.filter(item => !isItemRestricted(item, diagnosis));
//     return safeItems.slice(0, 4);
//   }

//   const cartCategories = [...new Set(cart.map(item => item.category))];
//   const cartFlavors = cart.flatMap(item => {
//     const flavors = [];
//     if (item.isSpicy) flavors.push('spicy');
//     if (item.isVegetarian) flavors.push('vegetarian');
//     return flavors;
//   });

//   for (const item of allItems) {
//     if (cart.some(cartItem => cartItem.id === item.id)) continue;
//     if (isItemRestricted(item, diagnosis)) continue;

//     let score = 0;
//     if (cartCategories.includes(item.category)) score += 2;
//     if (item.isSpicy && cartFlavors.includes('spicy')) score += 1;
//     if (item.isVegetarian && cartFlavors.includes('vegetarian')) score += 1;
//     if (item.basePrice < 8000) score += 1;

//     if (score > 0) {
//       recommendations.push({ ...item, recommendationScore: score });
//     }
//   }

//   recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);
//   return recommendations.slice(0, 4);
// };

// // Generate checkout QR code data
// const generateCheckoutQRData = (cart, tableNumber, total) => {
//   const checkoutData = {
//     type: "checkout",
//     tableNumber: tableNumber,
//     items: cart.map(item => ({
//       id: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.finalPrice,
//       selectedSize: item.selectedSize,
//       specialInstructions: item.specialInstructions
//     })),
//     total: total,
//     timestamp: new Date().toISOString()
//   };
//   return JSON.stringify(checkoutData);
// };

// // EXPANDED MENU DATA
// const menuData = {
//   foods: [
//     {
//       id: 1,
//       name: "Grilled Chicken Breast",
//       description:
//         "Juicy grilled chicken breast with herb butter and roasted vegetables",
//       ingredients: [
//         "chicken",
//         "butter",
//         "rosemary",
//         "garlic",
//         "salt",
//         "pepper",
//       ],
//       basePrice: 8500,
//       baseTime: 15,
//       category: "Main Course",
//       image:
//         "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 3000 },
//     },
//     {
//       id: 2,
//       name: "Beef Burger Deluxe",
//       description:
//         "200g beef patty with cheddar, lettuce, tomato, onion, and special sauce",
//       ingredients: [
//         "beef",
//         "cheese",
//         "lettuce",
//         "tomato",
//         "onion",
//         "bun",
//         "pickles",
//       ],
//       basePrice: 7500,
//       baseTime: 12,
//       category: "Burgers",
//       image:
//         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: true,
//       sizes: ["Regular", "Double"],
//       sizePrices: { Regular: 0, Double: 4000 },
//     },
//     {
//       id: 3,
//       name: "Margherita Pizza",
//       description:
//         "Fresh mozzarella, tomato sauce, basil, and extra virgin olive oil",
//       ingredients: ["dough", "mozzarella", "tomato", "basil", "olive oil"],
//       basePrice: 12000,
//       baseTime: 18,
//       category: "Pizza",
//       image:
//         "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: true,
//       sizes: ["Small", "Medium", "Large"],
//       sizePrices: { Small: -2000, Medium: 0, Large: 4000 },
//     },
//     {
//       id: 4,
//       name: "Spaghetti Carbonara",
//       description:
//         "Creamy pasta with pancetta, egg, parmesan, and black pepper",
//       ingredients: ["pasta", "pancetta", "eggs", "parmesan", "black pepper"],
//       basePrice: 9500,
//       baseTime: 14,
//       category: "Pasta",
//       image:
//         "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: true,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 3000 },
//     },
//     {
//       id: 5,
//       name: "Grilled Salmon",
//       description: "Fresh Atlantic salmon with lemon dill sauce and asparagus",
//       ingredients: ["salmon", "lemon", "dill", "butter", "garlic"],
//       basePrice: 14500,
//       baseTime: 16,
//       category: "Seafood",
//       image:
//         "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 5000 },
//     },
//     {
//       id: 6,
//       name: "Vegetable Stir Fry",
//       description: "Mixed vegetables in ginger soy sauce with tofu",
//       ingredients: [
//         "broccoli",
//         "carrots",
//         "bell peppers",
//         "ginger",
//         "soy sauce",
//         "tofu",
//       ],
//       basePrice: 6800,
//       baseTime: 10,
//       category: "Vegetarian",
//       image:
//         "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//       isVegetarian: true,
//       isSpicy: true,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 2500 },
//     },
//     {
//       id: 7,
//       name: "Chicken Tikka Masala",
//       description: "Grilled chicken in creamy tomato curry with basmati rice",
//       ingredients: ["chicken", "tomato", "cream", "spices", "onion", "garlic"],
//       basePrice: 10500,
//       baseTime: 20,
//       category: "Indian",
//       image:
//         "https://images.unsplash.com/photo-1565557623262-b51c2513a555?w=400",
//       isVegetarian: false,
//       isSpicy: true,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 3500 },
//     },
//     {
//       id: 8,
//       name: "Caesar Salad",
//       description: "Romaine lettuce, croutons, parmesan, and Caesar dressing",
//       ingredients: ["lettuce", "croutons", "parmesan", "anchovies", "egg"],
//       basePrice: 5500,
//       baseTime: 8,
//       category: "Salads",
//       image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8df?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: true,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 2000 },
//     },
//     {
//       id: 9,
//       name: "BBQ Ribs",
//       description: "Slow-cooked pork ribs with homemade BBQ sauce",
//       ingredients: ["pork ribs", "bbq sauce", "spices", "brown sugar"],
//       basePrice: 16500,
//       baseTime: 25,
//       category: "Main Course",
//       image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Half Rack", "Full Rack"],
//       sizePrices: { "Half Rack": 0, "Full Rack": 8000 },
//     },
//     {
//       id: 10,
//       name: "Mushroom Risotto",
//       description: "Creamy arborio rice with wild mushrooms and truffle oil",
//       ingredients: [
//         "rice",
//         "mushrooms",
//         "parmesan",
//         "white wine",
//         "onion",
//         "truffle oil",
//       ],
//       basePrice: 9800,
//       baseTime: 22,
//       category: "Italian",
//       image:
//         "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 3000 },
//     },
//     {
//       id: 11,
//       name: "Lamb chops",
//       description: "Grilled lamb chops with rosemary and garlic",
//       ingredients: ["lamb", "rosemary", "garlic", "olive oil", "salt"],
//       basePrice: 18500,
//       baseTime: 20,
//       category: "Main Course",
//       image:
//         "https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["3 pcs", "5 pcs"],
//       sizePrices: { "3 pcs": 0, "5 pcs": 7000 },
//     },
//     {
//       id: 12,
//       name: "Falafel Wrap",
//       description: "Crispy falafel with tahini sauce and fresh vegetables",
//       ingredients: ["chickpeas", "tahini", "lettuce", "tomato", "wrap"],
//       basePrice: 5500,
//       baseTime: 10,
//       category: "Vegetarian",
//       image:
//         "https://images.unsplash.com/photo-1593005475602-c9e7e2f8b6b9?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: true,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 2000 },
//     },
//     {
//       id: 13,
//       name: "Peanut Butter Smoothie Bowl",
//       description: "Creamy smoothie bowl topped with granola and fresh berries",
//       ingredients: ["peanut butter", "banana", "berries", "granola", "honey"],
//       basePrice: 8900,
//       baseTime: 8,
//       category: "Breakfast",
//       image:
//         "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: true,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 2500 },
//     },
//     {
//       id: 14,
//       name: "Shrimp Scampi Pasta",
//       description: "Garlic shrimp in lemon butter sauce over angel hair pasta",
//       ingredients: ["shrimp", "pasta", "garlic", "butter", "lemon", "parmesan"],
//       basePrice: 15500,
//       baseTime: 18,
//       category: "Seafood",
//       image:
//         "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: true,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 4000 },
//     },
//     {
//       id: 15,
//       name: "Chocolate Lava Cake",
//       description:
//         "Warm chocolate cake with molten center, served with vanilla ice cream",
//       ingredients: ["chocolate", "flour", "eggs", "butter", "sugar"],
//       basePrice: 6500,
//       baseTime: 12,
//       category: "Desserts",
//       image:
//         "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: true,
//       sizes: ["Single", "Double"],
//       sizePrices: { Single: 0, Double: 3500 },
//     },
//     {
//       id: 16,
//       name: "Sushi Platter",
//       description: "Assorted fresh sushi rolls with wasabi and ginger",
//       ingredients: ["rice", "seaweed", "salmon", "tuna", "avocado", "cucumber"],
//       basePrice: 22000,
//       baseTime: 20,
//       category: "Japanese",
//       image:
//         "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
//       isVegetarian: false,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["12 pcs", "24 pcs", "36 pcs"],
//       sizePrices: { "12 pcs": 0, "24 pcs": 8000, "36 pcs": 15000 },
//     },
//     {
//       id: 17,
//       name: "Pad Thai",
//       description:
//         "Stir-fried rice noodles with shrimp, tofu, bean sprouts, and peanuts",
//       ingredients: [
//         "rice noodles",
//         "shrimp",
//         "tofu",
//         "peanuts",
//         "egg",
//         "bean sprouts",
//       ],
//       basePrice: 11500,
//       baseTime: 15,
//       category: "Thai",
//       image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
//       isVegetarian: false,
//       isSpicy: true,
//       highSugar: true,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 3500 },
//     },
//     {
//       id: 18,
//       name: "Greek Salad",
//       description: "Cucumber, tomato, feta cheese, olives, and oregano",
//       ingredients: [
//         "cucumber",
//         "tomato",
//         "feta",
//         "olives",
//         "oregano",
//         "olive oil",
//       ],
//       basePrice: 6000,
//       baseTime: 6,
//       category: "Salads",
//       image:
//         "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 2000 },
//     },
//     {
//       id: 19,
//       name: "Tandoori Chicken",
//       description: "Yogurt-marinated chicken cooked in clay oven",
//       ingredients: ["chicken", "yogurt", "spices", "ginger", "garlic"],
//       basePrice: 12500,
//       baseTime: 25,
//       category: "Indian",
//       image:
//         "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400",
//       isVegetarian: false,
//       isSpicy: true,
//       highSugar: false,
//       highSodium: true,
//       containsGluten: false,
//       sizes: ["Half", "Full"],
//       sizePrices: { Half: 0, Full: 6000 },
//     },
//     {
//       id: 20,
//       name: "Waffle Breakfast",
//       description:
//         "Belgian waffle with maple syrup, fresh berries, and whipped cream",
//       ingredients: [
//         "flour",
//         "eggs",
//         "milk",
//         "butter",
//         "maple syrup",
//         "berries",
//       ],
//       basePrice: 7800,
//       baseTime: 12,
//       category: "Breakfast",
//       image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: true,
//       sizes: ["Single", "Double"],
//       sizePrices: { Single: 0, Double: 3500 },
//     },
//   ],
//   drinks: [
//     {
//       id: 101,
//       name: "Fresh Orange Juice",
//       description: "Squeezed to order, no added sugar",
//       ingredients: ["oranges"],
//       basePrice: 2500,
//       baseTime: 3,
//       category: "Juices",
//       image:
//         "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1000 },
//     },
//     {
//       id: 102,
//       name: "Mango Smoothie",
//       description: "Creamy mango blended with Greek yogurt",
//       ingredients: ["mango", "yogurt", "honey"],
//       basePrice: 3500,
//       baseTime: 5,
//       category: "Smoothies",
//       image:
//         "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1500 },
//     },
//     {
//       id: 103,
//       name: "Cappuccino",
//       description: "Espresso with steamed milk foam",
//       ingredients: ["coffee", "milk"],
//       basePrice: 3000,
//       baseTime: 4,
//       category: "Coffee",
//       image:
//         "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1000 },
//     },
//     {
//       id: 104,
//       name: "Mojito Mocktail",
//       description: "Fresh mint, lime, soda water, and cane sugar",
//       ingredients: ["mint", "lime", "soda", "sugar"],
//       basePrice: 4000,
//       baseTime: 5,
//       category: "Mocktails",
//       image:
//         "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 1500 },
//     },
//     {
//       id: 105,
//       name: "Coca Cola",
//       description: "Chilled soft drink",
//       ingredients: ["carbonated water", "sugar", "caffeine"],
//       basePrice: 1500,
//       baseTime: 1,
//       category: "Soft Drinks",
//       image:
//         "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Can", "Bottle"],
//       sizePrices: { Can: 0, Bottle: 1000 },
//     },
//     {
//       id: 106,
//       name: "Sparkling Water",
//       description: "Carbonated mineral water with lime",
//       ingredients: ["water", "carbonation", "lime"],
//       basePrice: 2000,
//       baseTime: 1,
//       category: "Water",
//       image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 500 },
//     },
//     {
//       id: 107,
//       name: "Strawberry Lemonade",
//       description: "Fresh strawberries with homemade lemonade",
//       ingredients: ["strawberries", "lemon", "sugar", "water"],
//       basePrice: 3200,
//       baseTime: 4,
//       category: "Lemonades",
//       image:
//         "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 1200 },
//     },
//     {
//       id: 108,
//       name: "Iced Latte",
//       description: "Chilled espresso with oat milk",
//       ingredients: ["coffee", "oat milk", "ice"],
//       basePrice: 3500,
//       baseTime: 3,
//       category: "Coffee",
//       image:
//         "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1000 },
//     },
//     {
//       id: 109,
//       name: "Pineapple Punch",
//       description: "Tropical pineapple, coconut, and lime",
//       ingredients: ["pineapple", "coconut milk", "lime", "agave"],
//       basePrice: 3800,
//       baseTime: 5,
//       category: "Mocktails",
//       image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 1500 },
//     },
//     {
//       id: 110,
//       name: "Green Tea",
//       description: "Premium Japanese sencha green tea",
//       ingredients: ["green tea leaves"],
//       basePrice: 2000,
//       baseTime: 3,
//       category: "Tea",
//       image:
//         "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 500 },
//     },
//     {
//       id: 111,
//       name: "Chocolate Milkshake",
//       description: "Rich chocolate ice cream milkshake",
//       ingredients: ["chocolate", "milk", "ice cream"],
//       basePrice: 4000,
//       baseTime: 5,
//       category: "Smoothies",
//       image:
//         "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1500 },
//     },
//     {
//       id: 112,
//       name: "Virgin Pina Colada",
//       description: "Creamy coconut and pineapple blend",
//       ingredients: ["coconut cream", "pineapple", "lime"],
//       basePrice: 4500,
//       baseTime: 5,
//       category: "Mocktails",
//       image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 1500 },
//     },
//     {
//       id: 113,
//       name: "Matcha Latte",
//       description: "Premium matcha green tea with steamed almond milk",
//       ingredients: ["matcha", "almond milk", "honey"],
//       basePrice: 4200,
//       baseTime: 4,
//       category: "Coffee",
//       image:
//         "https://images.unsplash.com/photo-1534777367038-9404f45b869b?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: false,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Small", "Large"],
//       sizePrices: { Small: 0, Large: 1000 },
//     },
//     {
//       id: 114,
//       name: "Watermelon Cooler",
//       description: "Fresh watermelon juice with mint and lime",
//       ingredients: ["watermelon", "mint", "lime", "agave"],
//       basePrice: 3600,
//       baseTime: 4,
//       category: "Juices",
//       image: "https://images.unsplash.com/photo-1551024709-8f23befc1544?w=400",
//       isVegetarian: true,
//       isSpicy: false,
//       highSugar: true,
//       highSodium: false,
//       containsGluten: false,
//       sizes: ["Regular", "Large"],
//       sizePrices: { Regular: 0, Large: 1200 },
//     },
//   ],
// };

// const allItems = [...menuData.foods, ...menuData.drinks];

// // Pagination settings
// const ITEMS_PER_PAGE = 12;

// // Result Modal Component
// const ResultModal = ({ isOpen, onClose, title, message, type }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
//               <div
//                 className={`p-6 text-center ${type === "success" ? "bg-green-50" : type === "error" ? "bg-red-50" : "bg-yellow-50"}`}
//               >
//                 {type === "success" && (
//                   <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//                 )}
//                 {type === "error" && (
//                   <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
//                 )}
//                 {type === "warning" && (
//                   <WarningAmberIcon className="text-yellow-500 text-6xl mx-auto mb-4" />
//                 )}
//                 <h2 className="text-2xl font-bold mb-2">{title}</h2>
//                 <p className="text-gray-600 mb-6 whitespace-pre-line">
//                   {message}
//                 </p>
//                 <button
//                   onClick={onClose}
//                   className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Health Profile Banner Component
// const HealthProfileBanner = ({ diagnosis, isLoading }) => {
//   if (isLoading) {
//     return (
//       <div className="bg-gray-100 rounded-xl p-4 mb-6 flex items-center justify-center space-x-2">
//         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
//         <span className="text-gray-500">Loading health profile...</span>
//       </div>
//     );
//   }

//   if (!diagnosis || !diagnosis.hasDiagnosis) {
//     return (
//       <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
//         <div className="flex items-center space-x-3">
//           <CheckCircleIcon className="text-green-500" />
//           <div>
//             <p className="font-semibold text-green-800">
//               ✓ Full Menu Available
//             </p>
//             <p className="text-sm text-green-600">
//               No dietary restrictions detected in your medical history
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-1 text-green-600 text-sm">
//           <FavoriteIcon fontSize="small" />
//           <span>Enjoy our complete selection!</span>
//         </div>
//       </div>
//     );
//   }

//   const totalRestrictions =
//     (diagnosis.conditions?.length || 0) + (diagnosis.allergies?.length || 0);
//   const restrictedCount = allItems.filter((item) =>
//     isItemRestricted(item, diagnosis),
//   ).length;

//   return (
//     <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
//       <div className="flex items-start justify-between flex-wrap gap-3">
//         <div className="flex items-start space-x-3">
//           <WarningAmberIcon className="text-yellow-600" />
//           <div>
//             <p className="font-semibold text-yellow-800">
//               Personalized Menu Based on Your Health Profile
//             </p>
//             <p className="text-sm text-yellow-700">
//               {totalRestrictions} condition{totalRestrictions !== 1 ? "s" : ""}{" "}
//               detected • {restrictedCount} item
//               {restrictedCount !== 1 ? "s" : ""} restricted for your safety
//             </p>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {diagnosis.conditions?.map((c) => (
//                 <span
//                   key={c.id}
//                   className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full"
//                 >
//                   ⚠️ {c.name}
//                 </span>
//               ))}
//               {diagnosis.allergies?.map((a) => (
//                 <span
//                   key={a.id}
//                   className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
//                 >
//                   🚫 {a.name}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
//           🛡️ Restricted items hidden for safety
//         </div>
//       </div>
//     </div>
//   );
// };

// // Warning Modal for Restricted Item Selection
// const WarningModal = ({ isOpen, onClose, onConfirm, item, warning }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
//               <div className="bg-red-50 p-6 text-center">
//                 <WarningAmberIcon className="text-red-500 text-6xl mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-red-700 mb-2">
//                   {warning?.title || "Health Safety Warning"}
//                 </h2>
//                 <p className="text-gray-700 mb-4 whitespace-pre-line">
//                   {warning?.message}
//                 </p>
//                 <div className="bg-white rounded-lg p-3 mb-4 text-left">
//                   <p className="font-semibold text-sm mb-1">
//                     Item: {item?.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Ingredients: {item?.ingredients?.join(", ")}
//                   </p>
//                 </div>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={onClose}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={onConfirm}
//                     className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
//                   >
//                     I Understand the Risk
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Customization Modal - Size & Quantity
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0] || "Regular");
//   const [quantity, setQuantity] = useState(1);
//   const [specialInstructions, setSpecialInstructions] = useState("");

//   if (!item) return null;

//   const sizePrice = item.sizePrices?.[selectedSize] || 0;
//   const basePrice = item.basePrice;
//   const itemTotal = (basePrice + sizePrice) * quantity;

//   const handleAdd = () => {
//     onAddToCart({
//       ...item,
//       selectedSize,
//       quantity,
//       specialInstructions,
//       finalPrice: itemTotal,
//       sizePrice,
//     });
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center shrink-0">
//                 <div className="flex items-center space-x-2">
//                   <RestaurantIcon className="text-white" />
//                   <h2 className="text-xl font-bold text-white">Customize Order</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4">
//                 <div className="flex gap-4 mb-6">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-24 h-24 rounded-xl object-cover"
//                   />
//                   <div>
//                     <h3 className="font-bold text-lg">{item.name}</h3>
//                     <p className="text-gray-500 text-sm">{item.description}</p>
//                     <p className="text-orange-600 font-bold mt-1">
//                       Base: RWF {item.basePrice.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Size Selection */}
//                 {item.sizes && item.sizes.length > 0 && (
//                   <div className="mb-6">
//                     <label className="block font-semibold mb-3 flex items-center gap-2">
//                       <SizeIcon className="text-orange-500" /> Select Size
//                     </label>
//                     <div className="flex flex-wrap gap-3">
//                       {item.sizes.map((size) => {
//                         const priceDiff = item.sizePrices?.[size] || 0;
//                         const isSelected = selectedSize === size;
//                         return (
//                           <button
//                             key={size}
//                             onClick={() => setSelectedSize(size)}
//                             className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
//                               isSelected
//                                 ? "bg-orange-500 text-white shadow-md"
//                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                             }`}
//                           >
//                             {size}
//                             {priceDiff !== 0 && (
//                               <span className={`text-xs ${isSelected ? "text-white/80" : "text-orange-500"}`}>
//                                 {priceDiff > 0 ? `+RWF ${priceDiff}` : `-RWF ${Math.abs(priceDiff)}`}
//                               </span>
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Quantity Selection */}
//                 <div className="mb-6">
//                   <label className="block font-semibold mb-3">Quantity</label>
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
//                     >
//                       <RemoveIcon />
//                     </button>
//                     <span className="text-xl font-bold w-12 text-center">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
//                     >
//                       <AddIcon />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Special Instructions */}
//                 <div className="mb-6">
//                   <label className="block font-semibold mb-3">Special Instructions (Optional)</label>
//                   <textarea
//                     value={specialInstructions}
//                     onChange={(e) => setSpecialInstructions(e.target.value)}
//                     placeholder="e.g., no onions, extra sauce, etc."
//                     className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
//                     rows="3"
//                   />
//                 </div>

//                 {/* Price Summary */}
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total:</span>
//                     <span className="text-orange-600">RWF {itemTotal.toLocaleString()}</span>
//                   </div>
//                   {sizePrice !== 0 && (
//                     <p className="text-xs text-gray-400 mt-1">
//                       Size adjustment: {sizePrice > 0 ? `+RWF ${sizePrice}` : `-RWF ${Math.abs(sizePrice)}`}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="border-t p-4 bg-gray-50 shrink-0">
//                 <button
//                   onClick={handleAdd}
//                   className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-md"
//                 >
//                   Add to Cart • RWF {itemTotal.toLocaleString()}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // QR Code Scanner Modal
// const QRScannerModal = ({ isOpen, onClose, onProductFound }) => {
//   const [scanning, setScanning] = useState(false);
//   const scannerRef = useRef(null);

//   useEffect(() => {
//     if (isOpen && !scanning) {
//       setScanning(true);
//       const scanner = new Html5QrcodeScanner(
//         "qr-reader",
//         {
//           fps: 10,
//           qrbox: { width: 250, height: 250 },
//         },
//         false
//       );
//       scanner.render(
//         (decodedText) => {
//           let productId = decodedText;
//           if (decodedText.includes(":")) {
//             productId = decodedText.split(":")[1];
//           }
//           // Also check for checkout QR
//           if (decodedText.includes('"type":"checkout"')) {
//             try {
//               const checkoutData = JSON.parse(decodedText);
//               if (checkoutData.type === "checkout") {
//                 toast.info("Checkout QR scanned - Processing order...");
//                 onProductFound(null, checkoutData);
//                 scanner.clear();
//                 setScanning(false);
//                 onClose();
//                 return;
//               }
//             } catch (e) {
//               // Not a JSON QR, continue with product lookup
//             }
//           }
//           const product = allItems.find(item => item.id === parseInt(productId) || item.id === productId);
//           if (product) {
//             onProductFound(product);
//             scanner.clear();
//             setScanning(false);
//             onClose();
//             toast.success(`Product found: ${product.name}`);
//           } else {
//             toast.error("Product not found in menu");
//           }
//         },
//         (error) => {
//           console.warn("QR Scan error:", error);
//         }
//       );
//       scannerRef.current = scanner;
//     }
//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.clear();
//         setScanning(false);
//       }
//     };
//   }, [isOpen, onProductFound, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//               <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <QrCodeScanner className="text-white" />
//                   <h2 className="text-xl font-bold text-white">Scan QR Code</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-4">
//                 <div id="qr-reader" className="w-full"></div>
//                 <p className="text-center text-gray-500 text-sm mt-4">
//                   Position the QR code within the frame to scan
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Checkout QR Code Display Modal
// const CheckoutQRModal = ({ isOpen, onClose, qrCodeDataUrl, cart, total, tableNumber, onConfirmCheckout }) => {
//   const [qrCodeUrl, setQrCodeUrl] = useState(qrCodeDataUrl);

//   const downloadQR = () => {
//     const link = document.createElement('a');
//     link.download = `checkout-qr-table-${tableNumber}.png`;
//     link.href = qrCodeUrl;
//     link.click();
//     toast.success("QR Code downloaded!");
//   };

//   const printQR = () => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head><title>Checkout QR Code - Table ${tableNumber}</title></head>
//         <body style="display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;font-family:sans-serif">
//           <img src="${qrCodeUrl}" style="width:300px;height:300px"/>
//           <h2>Table ${tableNumber}</h2>
//           <p>Total: RWF ${total.toLocaleString()}</p>
//           <p>Scan this QR code to complete your order</p>
//         </body>
//       </html>
//     `);
//     printWindow.print();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
//               <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                   <QRIcon className="text-white" />
//                   <h2 className="text-xl font-bold text-white">Checkout QR Code</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>
//               <div className="p-6 text-center">
//                 <div className="bg-white rounded-xl p-4 mb-4 flex justify-center">
//                   {qrCodeUrl && (
//                     <img src={qrCodeUrl} alt="Checkout QR Code" className="w-64 h-64" />
//                   )}
//                 </div>
//                 <h3 className="font-bold text-lg">Table {tableNumber}</h3>
//                 <p className="text-gray-600 mb-2">Total: RWF {total.toLocaleString()}</p>
//                 <p className="text-sm text-gray-500 mb-4">
//                   Scan this QR code with your phone to complete your order instantly
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={downloadQR}
//                     className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
//                   >
//                     <DownloadIcon fontSize="small" /> Download
//                   </button>
//                   <button
//                     onClick={printQR}
//                     className="flex-1 bg-gray-500 text-white py-2 rounded-xl font-semibold hover:bg-gray-600 transition flex items-center justify-center gap-2"
//                   >
//                     <PrintIcon fontSize="small" /> Print
//                   </button>
//                 </div>
//                 <button
//                   onClick={onConfirmCheckout}
//                   className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition"
//                 >
//                   Proceed to Payment
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Recommendations Modal
// const RecommendationsModal = ({ isOpen, onClose, recommendations, onSelectItem }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
//               <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 flex justify-between items-center shrink-0">
//                 <div className="flex items-center space-x-2">
//                   <ThumbUpIcon className="text-white" />
//                   <h2 className="text-xl font-bold text-white">Recommended For You</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4">
//                 {recommendations.length === 0 ? (
//                   <div className="text-center py-12">
//                     <RestaurantIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                     <p className="text-gray-500">No recommendations available</p>
//                     <p className="text-sm text-gray-400">Add items to your cart for personalized suggestions!</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     {recommendations.map((item) => (
//                       <motion.div
//                         key={item.id}
//                         whileHover={{ scale: 1.02 }}
//                         className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition"
//                         onClick={() => {
//                           onSelectItem(item);
//                           onClose();
//                         }}
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-32 object-cover"
//                         />
//                         <div className="p-3">
//                           <h3 className="font-semibold text-sm">{item.name}</h3>
//                           <p className="text-gray-500 text-xs line-clamp-2">{item.description}</p>
//                           <div className="flex justify-between items-center mt-2">
//                             <span className="text-orange-600 font-bold text-sm">
//                               RWF {item.basePrice.toLocaleString()}
//                             </span>
//                             <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
//                               {item.baseTime} min
//                             </span>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="border-t p-4 bg-gray-50 shrink-0">
//                 <button
//                   onClick={onClose}
//                   className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Cart Modal Component - Centered with QR Checkout option
// const CartModal = ({
//   isOpen,
//   onClose,
//   cart,
//   onUpdateQuantity,
//   onRemove,
//   onCheckout,
//   getCartTotal,
//   onOpenRecommendations,
//   onGenerateCheckoutQR,
// }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
//               <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center shrink-0">
//                 <div className="flex items-center space-x-2">
//                   <CartIcon className="text-white" />
//                   <h2 className="text-xl font-bold text-white">Your Cart</h2>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="p-1 hover:bg-white/20 rounded-full transition"
//                 >
//                   <CloseIcon className="text-white" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4">
//                 {cart.length === 0 ? (
//                   <div className="text-center py-12">
//                     <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                     <p className="text-gray-500">Your cart is empty</p>
//                     <p className="text-sm text-gray-400">
//                       Scan a QR code or browse the menu to add items!
//                     </p>
//                   </div>
//                 ) : (
//                   <>
//                     {cart.some((item) => item.hasWarning) && (
//                       <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
//                         <p className="text-xs text-yellow-700 flex items-center gap-1">
//                           <WarningAmberIcon fontSize="small" />
//                           Some items may conflict with your health profile
//                         </p>
//                       </div>
//                     )}
//                     {cart.map((item) => (
//                       <div
//                         key={item.cartId}
//                         className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-2"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 rounded-lg object-cover"
//                         />
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-sm">{item.name}</h4>
//                           <p className="text-sm text-orange-600 font-bold">
//                             RWF {item.finalPrice.toLocaleString()}
//                           </p>
//                           {item.selectedSize && (
//                             <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
//                           )}
//                           {item.specialInstructions && (
//                             <p className="text-xs text-gray-400 italic">Note: {item.specialInstructions}</p>
//                           )}
//                           {item.hasWarning && (
//                             <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
//                               <WarningAmberIcon fontSize="inherit" /> Contains restricted ingredients
//                             </p>
//                           )}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() =>
//                               onUpdateQuantity(item.cartId, item.quantity - 1)
//                             }
//                             className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
//                           >
//                             <RemoveIcon fontSize="small" />
//                           </button>
//                           <span className="w-6 text-center font-semibold text-sm">
//                             {item.quantity}
//                           </span>
//                           <button
//                             onClick={() =>
//                               onUpdateQuantity(item.cartId, item.quantity + 1)
//                             }
//                             className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
//                           >
//                             <AddIcon fontSize="small" />
//                           </button>
//                           <button
//                             onClick={() => onRemove(item.cartId)}
//                             className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition ml-1"
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>

//               {cart.length > 0 && (
//                 <div className="border-t p-4 space-y-3 bg-gray-50 shrink-0">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Subtotal:</span>
//                     <span className="text-orange-600">
//                       RWF {getCartTotal().toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={onOpenRecommendations}
//                       className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition shadow-md flex items-center justify-center gap-2"
//                     >
//                       <ThumbUpIcon fontSize="small" />
//                       Recommendations
//                     </button>
//                     <button
//                       onClick={onGenerateCheckoutQR}
//                       className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition shadow-md flex items-center justify-center gap-2"
//                     >
//                       <QRIcon fontSize="small" />
//                       QR Checkout
//                     </button>
//                   </div>
//                   <button
//                     onClick={onCheckout}
//                     className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-md"
//                   >
//                     Regular Checkout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;
//     let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
//     let end = Math.min(totalPages, start + maxVisible - 1);

//     if (end - start + 1 < maxVisible) {
//       start = Math.max(1, end - maxVisible + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   return (
//     <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`p-2 rounded-lg transition flex items-center gap-1 ${
//           currentPage === 1
//             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//             : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
//         }`}
//       >
//         <PrevIcon fontSize="small" />
//         <span className="hidden sm:inline">Prev</span>
//       </button>

//       {getPageNumbers().map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`w-10 h-10 rounded-lg transition font-medium ${
//             currentPage === page
//               ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
//               : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`p-2 rounded-lg transition flex items-center gap-1 ${
//           currentPage === totalPages
//             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//             : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-sm"
//         }`}
//       >
//         <span className="hidden sm:inline">Next</span>
//         <NextIcon fontSize="small" />
//       </button>
//     </div>
//   );
// };

// // Main Menu Component
// export const Menu = ({ tableNumber = 1, userId = "user-123" }) => {
//   const [cart, setCart] = useState([]);
//   const [showCartModal, setShowCartModal] = useState(false);
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [showResultModal, setShowResultModal] = useState({
//     isOpen: false,
//     type: "success",
//     title: "",
//     message: "",
//   });
//   const [showCustomizationModal, setShowCustomizationModal] = useState(false);
//   const [showQRScanner, setShowQRScanner] = useState(false);
//   const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
//   const [showCheckoutQRModal, setShowCheckoutQRModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recommendations, setRecommendations] = useState([]);
//   const [checkoutQRDataUrl, setCheckoutQRDataUrl] = useState("");

//   // Health diagnosis states
//   const [diagnosis, setDiagnosis] = useState(null);
//   const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(true);
//   const [warningModal, setWarningModal] = useState({
//     isOpen: false,
//     item: null,
//     warning: null,
//   });

//   // Fetch diagnosis from private API on component mount
//   useEffect(() => {
//     const loadDiagnosis = async () => {
//       setIsLoadingDiagnosis(true);
//       try {
//         const userDiagnosis = await fetchUserDiagnosis(userId);
//         setDiagnosis(userDiagnosis);
//       } catch (error) {
//         console.error("Failed to load health profile");
//         setDiagnosis({ hasDiagnosis: false, conditions: [], allergies: [] });
//       } finally {
//         setIsLoadingDiagnosis(false);
//       }
//     };

//     loadDiagnosis();
//   }, [userId]);

//   // Update recommendations when cart changes
//   useEffect(() => {
//     if (diagnosis) {
//       const newRecommendations = getRecommendations(cart, diagnosis, allItems);
//       setRecommendations(newRecommendations);
//     }
//   }, [cart, diagnosis]);

//   // Get filtered and restricted items based on diagnosis
//   const getAvailableItems = () => {
//     if (!diagnosis) return [];

//     if (
//       !diagnosis.hasDiagnosis ||
//       (diagnosis.conditions?.length === 0 && diagnosis.allergies?.length === 0)
//     ) {
//       return allItems;
//     }

//     return allItems.filter((item) => !isItemRestricted(item, diagnosis));
//   };

//   const availableItems = getAvailableItems();

//   const categories = [
//     "all",
//     ...new Set(availableItems.map((item) => item.category)),
//   ];

//   const filteredItems = availableItems.filter((item) => {
//     const matchesCategory =
//       activeCategory === "all" || item.category === activeCategory;
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
//   const paginatedItems = filteredItems.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE,
//   );

//   // Reset to first page when category or search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory, searchQuery]);

//   const handleProductClick = (item) => {
//     const warning = getRestrictionWarning(item, diagnosis);
//     if (warning) {
//       setWarningModal({
//         isOpen: true,
//         item: item,
//         warning: warning,
//       });
//     } else {
//       setSelectedProduct(item);
//       setShowCustomizationModal(true);
//     }
//   };

//   const handleAddToCart = (customizedItem) => {
//     const warning = getRestrictionWarning(customizedItem, diagnosis);
//     const hasWarning = !!warning;

//     const newCartItem = {
//       cartId: cartIdCounter,
//       id: customizedItem.id,
//       name: customizedItem.name,
//       description: customizedItem.description,
//       image: customizedItem.image,
//       basePrice: customizedItem.basePrice,
//       finalPrice: customizedItem.finalPrice,
//       quantity: customizedItem.quantity,
//       selectedSize: customizedItem.selectedSize,
//       specialInstructions: customizedItem.specialInstructions,
//       hasWarning: hasWarning,
//       baseTime: customizedItem.baseTime,
//       isSpicy: customizedItem.isSpicy,
//       isVegetarian: customizedItem.isVegetarian,
//       category: customizedItem.category,
//     };

//     setCart([...cart, newCartItem]);
//     setCartIdCounter(cartIdCounter + 1);

//     if (hasWarning) {
//       toast.warning(
//         `${customizedItem.name} added with health restrictions - please consume with caution`,
//         { position: "bottom-right", autoClose: 4000 }
//       );
//     } else {
//       toast.success(`${customizedItem.quantity}x ${customizedItem.name} added to cart!`, {
//         position: "bottom-right",
//         autoClose: 2000,
//       });
//     }

//     setShowCartModal(true);
//   };

//   const handleConfirmRestrictedItem = () => {
//     if (warningModal.item) {
//       setSelectedProduct(warningModal.item);
//       setShowCustomizationModal(true);
//     }
//     setWarningModal({ isOpen: false, item: null, warning: null });
//   };

//   const handleQRProductFound = (product, checkoutData = null) => {
//     if (checkoutData) {
//       // Handle checkout QR scan
//       toast.info("Processing QR checkout...");
//       setShowResultModal({
//         isOpen: true,
//         type: "success",
//         title: "✅ Order Received!",
//         message: `Your order has been received via QR code!\n\nTable: ${checkoutData.tableNumber}\nTotal: RWF ${checkoutData.total.toLocaleString()}\n\nA waiter will bring your food shortly.`,
//       });
//     } else if (product) {
//       handleProductClick(product);
//     }
//   };

//   const handleGenerateCheckoutQR = async () => {
//     if (cart.length === 0) {
//       toast.error("Cart is empty. Add items before generating checkout QR.");
//       return;
//     }

//     const total = getCartTotal();
//     const checkoutData = generateCheckoutQRData(cart, tableNumber, total);

//     try {
//       const qrDataUrl = await QRCode.toDataURL(checkoutData, {
//         width: 300,
//         margin: 2,
//         color: {
//           dark: "#000000",
//           light: "#ffffff",
//         },
//       });
//       setCheckoutQRDataUrl(qrDataUrl);
//       setShowCartModal(false);
//       setShowCheckoutQRModal(true);
//     } catch (error) {
//       console.error("Failed to generate QR code:", error);
//       toast.error("Failed to generate QR code");
//     }
//   };

//   const handleConfirmCheckoutWithQR = () => {
//     setShowCheckoutQRModal(false);
//     setTimeout(() => {
//       setShowResultModal({
//         isOpen: true,
//         type: "success",
//         title: "✅ Order Confirmed!",
//         message: `Your order has been placed successfully via QR Code!\n\nTotal: RWF ${getCartTotal().toLocaleString()}\n\nA waiter will bring your food shortly.\nThank you for dining with us!`,
//       });
//       setCart([]);
//     }, 500);
//   };

//   const updateCartQuantity = (cartId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(cartId);
//       return;
//     }
//     setCart(
//       cart.map((item) =>
//         item.cartId === cartId ? { ...item, quantity: newQuantity, finalPrice: (item.finalPrice / item.quantity) * newQuantity } : item,
//       ),
//     );
//   };

//   const removeFromCart = (cartId) => {
//     setCart(cart.filter((item) => item.cartId !== cartId));
//     toast.info("Item removed from cart");
//   };

//   const getCartTotal = () => {
//     return cart.reduce((sum, item) => sum + item.finalPrice, 0);
//   };

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       setShowResultModal({
//         isOpen: true,
//         type: "error",
//         title: "Cart is Empty",
//         message: "Please add items to your cart before checking out.",
//       });
//       return;
//     }
//     setShowCartModal(false);
//     setShowCheckoutModal(true);
//   };

//   const processOrder = () => {
//     setShowCheckoutModal(false);

//     setTimeout(() => {
//       setShowResultModal({
//         isOpen: true,
//         type: "success",
//         title: "✅ Order Confirmed!",
//         message: `Your order has been placed successfully!\n\nTotal: RWF ${getCartTotal().toLocaleString()}\n\nA waiter will bring your food shortly.\nThank you for dining with us!`,
//       });
//       setCart([]);
//     }, 1500);
//   };

//   const cancelOrder = () => {
//     setShowCheckoutModal(false);
//     setShowResultModal({
//       isOpen: true,
//       type: "error",
//       title: "❌ Order Cancelled",
//       message:
//         "Your order has been cancelled.\nYou can continue browsing the menu.",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer />

//       {/* Warning Modal for Restricted Items */}
//       <WarningModal
//         isOpen={warningModal.isOpen}
//         onClose={() =>
//           setWarningModal({ isOpen: false, item: null, warning: null })
//         }
//         onConfirm={handleConfirmRestrictedItem}
//         item={warningModal.item}
//         warning={warningModal.warning}
//       />

//       {/* Customization Modal */}
//       <CustomizationModal
//         isOpen={showCustomizationModal}
//         onClose={() => setShowCustomizationModal(false)}
//         item={selectedProduct}
//         onAddToCart={handleAddToCart}
//       />

//       {/* QR Scanner Modal */}
//       <QRScannerModal
//         isOpen={showQRScanner}
//         onClose={() => setShowQRScanner(false)}
//         onProductFound={handleQRProductFound}
//       />

//       {/* Checkout QR Code Display Modal */}
//       <CheckoutQRModal
//         isOpen={showCheckoutQRModal}
//         onClose={() => setShowCheckoutQRModal(false)}
//         qrCodeDataUrl={checkoutQRDataUrl}
//         cart={cart}
//         total={getCartTotal()}
//         tableNumber={tableNumber}
//         onConfirmCheckout={handleConfirmCheckoutWithQR}
//       />

//       {/* Recommendations Modal */}
//       <RecommendationsModal
//         isOpen={showRecommendationsModal}
//         onClose={() => setShowRecommendationsModal(false)}
//         recommendations={recommendations}
//         onSelectItem={handleProductClick}
//       />

//       {/* Centered Cart Modal */}
//       <CartModal
//         isOpen={showCartModal}
//         onClose={() => setShowCartModal(false)}
//         cart={cart}
//         onUpdateQuantity={updateCartQuantity}
//         onRemove={removeFromCart}
//         onCheckout={handleCheckout}
//         getCartTotal={getCartTotal}
//         onOpenRecommendations={() => setShowRecommendationsModal(true)}
//         onGenerateCheckoutQR={handleGenerateCheckoutQR}
//       />

//       {/* Checkout Confirmation Modal */}
//       <AnimatePresence>
//         {showCheckoutModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 30 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 30 }}
//               className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
//             >
//               <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
//                 <h2 className="text-xl font-bold text-white text-center">
//                   Confirm Order
//                 </h2>
//               </div>
//               <div className="p-6 text-center">
//                 <div className="mb-4">
//                   <p className="text-gray-600 mb-2">Total Amount:</p>
//                   <p className="text-3xl font-bold text-orange-600">
//                     RWF {getCartTotal().toLocaleString()}
//                   </p>
//                 </div>
//                 {cart.some((item) => item.hasWarning) && (
//                   <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
//                     <p className="text-xs text-yellow-700 flex items-center justify-center gap-1">
//                       <WarningAmberIcon fontSize="small" />
//                       Some items in your cart may conflict with your health profile
//                     </p>
//                   </div>
//                 )}
//                 <p className="text-gray-500 mb-6">
//                   Would you like to place this order?
//                 </p>
//                 <div className="flex gap-3">
//                   <button
//                     onClick={cancelOrder}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={processOrder}
//                     className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
//                   >
//                     Confirm Order
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Result Modal */}
//       <ResultModal
//         isOpen={showResultModal.isOpen}
//         onClose={() =>
//           setShowResultModal({ ...showResultModal, isOpen: false })
//         }
//         title={showResultModal.title}
//         message={showResultModal.message}
//         type={showResultModal.type}
//       />

//       {/* Main Menu UI */}
//       <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-7xl">
//         {/* Header - Responsive */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
//               <QRIcon className="text-white text-xl sm:text-2xl" />
//             </div>
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
//                 QR Restaurant
//               </h1>
//               <p className="text-gray-500 text-xs sm:text-sm">
//                 Table {tableNumber} • Scan to order
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             {/* QR Scanner Button */}
//             <button
//               onClick={() => setShowQRScanner(true)}
//               className="relative bg-gradient-to-r from-purple-500 to-indigo-500 p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition text-white"
//             >
//               <QrCodeScanner className="text-xl sm:text-2xl" />
//             </button>

//             {/* Cart Button */}
//             <button
//               onClick={() => setShowCartModal(true)}
//               className="relative bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <CartIcon className="text-orange-500 text-xl sm:text-2xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                   {cart.reduce((sum, item) => sum + item.quantity, 0)}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Health Profile Banner */}
//         <HealthProfileBanner
//           diagnosis={diagnosis}
//           isLoading={isLoadingDiagnosis}
//         />

//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
//           <input
//             type="text"
//             placeholder="Search menu..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white shadow-sm text-sm sm:text-base"
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex overflow-x-auto lg:overflow-visible lg:flex-wrap gap-2 mb-6 pb-2 lg:pb-0 scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition font-medium text-sm sm:text-base ${
//                 activeCategory === cat
//                   ? "bg-orange-500 text-white shadow-md"
//                   : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
//               }`}
//             >
//               {cat === "all" ? "All Items" : cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//           {paginatedItems.map((item) => {
//             const isRestrictedForUser =
//               diagnosis?.hasDiagnosis && isItemRestricted(item, diagnosis);
//             return (
//               <motion.div
//                 key={item.id}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${
//                   isRestrictedForUser
//                     ? "opacity-70 grayscale-[0.2]"
//                     : "hover:shadow-xl"
//                 }`}
//                 onClick={() => handleProductClick(item)}
//               >
//                 <div className="relative">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-36 sm:h-48 object-cover"
//                   />
//                   <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-bold shadow-md">
//                     RWF {item.basePrice.toLocaleString()}
//                   </div>
//                   {item.isVegetarian && (
//                     <div className="absolute top-2 left-2 bg-green-500 text-white px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold">
//                       Veg
//                     </div>
//                   )}
//                   {item.sizes && item.sizes.length > 0 && (
//                     <div className="absolute bottom-2 left-2 bg-black/50 text-white px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs flex items-center gap-1">
//                       <SizeIcon fontSize="inherit" />
//                       {item.sizes.length} sizes
//                     </div>
//                   )}
//                   {isRestrictedForUser && (
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                       <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">
//                         <WarningAmberIcon fontSize="small" /> Restricted
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-3 sm:p-4">
//                   <h3 className="font-bold text-sm sm:text-lg mb-1 line-clamp-1">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-500 text-xs sm:text-sm mb-2 line-clamp-2">
//                     {item.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center text-xs sm:text-sm text-gray-400">
//                       <TimeIcon
//                         fontSize="small"
//                         className="mr-1 text-sm sm:text-base"
//                       />
//                       <span>{item.baseTime} min</span>
//                     </div>
//                     {item.isSpicy && (
//                       <span className="text-[10px] sm:text-xs bg-red-100 text-red-600 px-1.5 sm:px-2 py-0.5 rounded-full">
//                         🌶️ Spicy
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {filteredItems.length === 0 && (
//           <div className="text-center py-12">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">
//               No items match your search or dietary restrictions.
//             </p>
//             <p className="text-sm text-gray-400 mt-2">
//               Try a different search or browse other categories.
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {filteredItems.length > 0 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         )}

//         {/* Items counter */}
//         {filteredItems.length > 0 && (
//           <div className="text-center text-xs sm:text-sm text-gray-400 mt-4 pb-4">
//             Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
//             {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of{" "}
//             {filteredItems.length} items
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   Search, FilterList, RestaurantMenu, Security, Timer, CheckCircle,
//   ArrowBack, ArrowForward, Person, LocalDining, Spa, Warning,
//   Science, Psychology, EmojiFoodBeverage, FitnessCenter, Favorite,
//   Bolt, Shield, Healing,Coffee, DinnerDining, LunchDining,
//   RamenDining, SetMeal, EggAlt, Grass, WaterDrop, Apple,
//   EjectOutlined
// } from '@mui/icons-material';

// // ========== HUMANIC AI ANALYSIS ENGINE ==========
// // Real ingredient risk analysis based on medical literature patterns
// const analyzeIngredientRisks = (ingredients, userConditions = []) => {
//   const riskDatabase = {
//     'peanut': { severity: 'high', condition: 'Peanut allergy', message: 'Cross-reactive proteins may trigger anaphylaxis', clinicalNote: 'Avoidance required', aiConfidence: 0.94 },
//     'coconut': { severity: 'high', condition: 'Tree nut allergy', message: 'Potential cross-allergenicity with tree nuts', clinicalNote: 'Coconut derivatives may cause reaction', aiConfidence: 0.89 },
//     'palm oil': { severity: 'moderate', condition: 'Type 2 Diabetes', message: 'High saturated fat → insulin resistance pathway', clinicalNote: 'Inflammatory marker elevation', aiConfidence: 0.91 },
//     'salt': { severity: 'moderate', condition: 'Hypertension', message: 'Sodium load increases BP within hours', clinicalNote: 'Limit to <1.5g/meal', aiConfidence: 0.96 },
//     'beef': { severity: 'low', condition: 'High cholesterol', message: 'Saturated fat & dietary cholesterol', clinicalNote: 'Lean cuts preferred', aiConfidence: 0.88 },
//     'cassava': { severity: 'low', condition: 'Gluten sensitivity', message: 'Naturally gluten-free', clinicalNote: 'Safe alternative', aiConfidence: 0.97 },
//     'goat meat': { severity: 'low', condition: 'Iron deficiency', message: 'Rich in heme iron, B12', clinicalNote: 'Beneficial for anemia', aiConfidence: 0.92 },
//     'plantain': { severity: 'low', condition: 'Diabetes', message: 'High glycemic index when ripe', clinicalNote: 'Green plantain better', aiConfidence: 0.85 },
//     'pepper sauce': { severity: 'moderate', condition: 'Hypertension', message: 'High sodium & capsaicin interaction', clinicalNote: 'May elevate BP', aiConfidence: 0.87 },
//     'oil': { severity: 'moderate', condition: 'High cholesterol', message: 'Trans fats possible if reused', clinicalNote: 'Request fresh oil', aiConfidence: 0.83 }
//   };

//   const risks = [];
//   ingredients.forEach(ing => {
//     const ingLower = ing.toLowerCase();
//     for (const [key, data] of Object.entries(riskDatabase)) {
//       if (ingLower.includes(key)) {
//         const isUserRelevant = userConditions.length === 0 || userConditions.some(cond => cond.toLowerCase().includes(data.condition.toLowerCase()));
//         if (isUserRelevant || userConditions.length === 0) {
//           risks.push({
//             ingredient: ing,
//             condition: data.condition,
//             severity: data.severity,
//             message: data.message,
//             clinicalNote: data.clinicalNote,
//             aiConfidence: data.aiConfidence
//           });
//         }
//         break;
//       }
//     }
//   });
//   const unique = risks.filter((v, i, a) => a.findIndex(t => t.condition === v.condition && t.ingredient === v.ingredient) === i);
//   return unique.slice(0, 5);
// };

// // Generate humanic modification suggestions based on conditions & meal context
// const generateModifications = (conditions, meal) => {
//   const modLibrary = {
//     'Peanut allergy': [
//       { name: '🌻 Roasted sunflower seed butter', description: 'Creamy, nut-free alternative with identical mouthfeel', healthImpact: '100% allergen-safe', icon: '🌻', clinicalEfficacy: 'No cross-reactivity' },
//       { name: '🌾 Fermented cassava paste', description: 'Traditional Rwandan method, probiotic-rich', healthImpact: 'Gut-friendly & safe', icon: '🌾', clinicalEfficacy: 'Improves digestion' }
//     ],
//     'Tree nut allergy': [
//       { name: '🥛 Oat & rice milk emulsion', description: 'Silky, nut-free coconut substitute', healthImpact: 'Hypoallergenic creaminess', icon: '🥛', clinicalEfficacy: '99% allergen reduction' },
//       { name: '💧 Bone broth reduction', description: 'Umami depth without any nuts', healthImpact: 'Collagen & protein boost', icon: '🍖', clinicalEfficacy: 'Anti-inflammatory' }
//     ],
//     'Type 2 Diabetes': [
//       { name: '🫒 Cold-pressed avocado oil', description: 'Monounsaturated fats improve insulin sensitivity', healthImpact: 'Lowers glycemic response by 23%', icon: '🥑', clinicalEfficacy: 'Improves HbA1c' },
//       { name: '🥬 Moringa infusion', description: 'Antioxidant-rich, reduces postprandial glucose', healthImpact: 'Natural glucose regulation', icon: '🌿', clinicalEfficacy: 'Lowers spikes by 18%' }
//     ],
//     'Hypertension': [
//       { name: '🧂 Potassium-enriched salt substitute', description: 'Lowers BP while maintaining flavor', healthImpact: 'Sodium reduced by 70%', icon: '⚖️', clinicalEfficacy: 'Reduces SBP by 5-8 mmHg' },
//       { name: '🌿 Lemon & herb zest blend', description: 'No-salt seasoning, bright citrus notes', healthImpact: 'Vasodilation support', icon: '🍋', clinicalEfficacy: 'Natural BP control' }
//     ],
//     'High cholesterol': [
//       { name: '🔥 Air-fried without oil', description: 'Crispy texture with zero added fats', healthImpact: 'Reduces LDL oxidation', icon: '💨', clinicalEfficacy: 'Lowers LDL by 12%' },
//       { name: '🌰 Ground flaxseed coating', description: 'Omega-3 rich, lowers triglycerides', healthImpact: 'Heart-protective fiber', icon: '🌾', clinicalEfficacy: 'Reduces total cholesterol' }
//     ]
//   };

//   const applicable = conditions.filter(c => modLibrary[c]).map(c => ({
//     condition: c,
//     options: modLibrary[c]
//   }));
//   return applicable;
// };

// // Enhanced Meal database with detailed nutritional profiles
// export const MEALS = [
//   { id: 0, name: 'Isombe ya Nyama', price: 2800, currency: 'RWF', ingredients: ['cassava leaves', 'beef', 'coconut milk', 'peanut flour', 'palm oil', 'sea salt'], description: 'Traditional cassava leaf stew with grass-fed beef, slow-cooked for 6 hours', icon: '🥬', healthScore: 72, prepTime: 18, category: 'Mains', protein: '28g', calories: '520', tags: ['Local', 'Traditional'] },
//   { id: 1, name: 'Brochette de Boeuf', price: 3500, ingredients: ['beef sirloin', 'pepper sauce', 'sunflower oil', 'potato', 'spices', 'salt'], description: 'Grilled skewers with spiced fries, charcoal-fired for smoky flavor', icon: '🍢', healthScore: 68, prepTime: 15, category: 'Mains', protein: '35g', calories: '610', tags: ['Grilled', 'Popular'] },
//   { id: 2, name: 'Ibiharage n\'Amafuta', price: 1800, ingredients: ['kidney beans', 'palm oil', 'tomato', 'onion', 'sea salt', 'basmati rice'], description: 'Rwandan bean stew, vegan option with aromatic spices', icon: '🫘', healthScore: 85, prepTime: 12, category: 'Vegan', protein: '15g', calories: '380', tags: ['Vegan', 'Local'] },
//   { id: 3, name: 'Matoke ya Nyama', price: 3200, ingredients: ['green plantain', 'goat meat', 'ginger', 'green pepper', 'onion', 'coconut oil'], description: 'Steamed plantain with aromatic goat stew, ginger-infused', icon: '🍌', healthScore: 74, prepTime: 20, category: 'Mains', protein: '32g', calories: '580', tags: ['Local', 'Traditional'] }
// ];

// // Individual Meal Card Component with animations
// const MealCard = ({ meal, onSelect, index }) => {
//   const icons = [<DinnerDining />, <SetMeal />, <EggAlt />, <RamenDining />];
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
//       whileHover={{ scale: 1.02, y: -4 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={() => onSelect(meal)}
//       className="group bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex gap-4 shadow-lg hover:shadow-xl border border-white/50 cursor-pointer transition-all duration-300"
//     >
//       <div className="relative">
//         <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-2xl flex items-center justify-center text-5xl shadow-inner group-hover:scale-105 transition-transform duration-300">
//           {meal.icon}
//         </div>
//         <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg">
//           <Healing sx={{ fontSize: 14 }} />
//         </div>
//       </div>
//       <div className="flex-1">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="font-bold text-stone-800 text-lg font-['Playfair_Display']">{meal.name}</h3>
//             <div className="flex gap-1 mt-0.5">
//               {meal.tags.map(tag => (
//                 <span key={tag} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{tag}</span>
//               ))}
//             </div>
//           </div>
//           <span className="font-bold text-emerald-700 text-lg">{meal.price.toLocaleString()} RWF</span>
//         </div>
//         <p className="text-xs text-stone-500 mt-1 line-clamp-2">{meal.description}</p>
//         <div className="flex items-center gap-3 mt-2">
//           <div className="flex items-center gap-1">
//             <FitnessCenter sx={{ fontSize: 14 }} className="text-emerald-600" />
//             <span className="text-xs font-medium text-stone-600">Score {meal.healthScore}%</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Timer sx={{ fontSize: 14 }} className="text-amber-600" />
//             <span className="text-xs text-stone-600">{meal.prepTime} min</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Bolt sx={{ fontSize: 14 }} className="text-orange-500" />
//             <span className="text-xs text-stone-600">{meal.calories} cal</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main NutriScanAI Component
// export const Menu = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedMeal, setSelectedMeal] = useState(null);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [modifications, setModifications] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [chefNote, setChefNote] = useState('');
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [timerSeconds, setTimerSeconds] = useState(0);
//   const [orderNumber, setOrderNumber] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   const filters = ['All', 'Mains', 'Vegan', 'Local', 'Popular'];

//   const filteredMeals = useMemo(() => {
//     let meals = MEALS;
//     if (searchTerm) {
//       meals = meals.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase()));
//     }
//     if (activeFilter === 'Vegan') meals = meals.filter(m => m.category === 'Vegan');
//     if (activeFilter === 'Mains') meals = meals.filter(m => m.category === 'Mains');
//     if (activeFilter === 'Local') meals = meals.filter(m => m.tags.includes('Local'));
//     if (activeFilter === 'Popular') meals = meals.filter(m => m.tags.includes('Popular'));
//     return meals;
//   }, [searchTerm, activeFilter]);

//   const currentAnalysis = useMemo(() => {
//     if (!selectedMeal) return null;
//     const risks = analyzeIngredientRisks(selectedMeal.ingredients, selectedConditions);
//     return { risks, meal: selectedMeal };
//   }, [selectedMeal, selectedConditions]);

//   const availableMods = useMemo(() => {
//     if (!selectedMeal || selectedConditions.length === 0) return [];
//     return generateModifications(selectedConditions, selectedMeal);
//   }, [selectedMeal, selectedConditions]);

//   const handleSelectMeal = (meal) => {
//     setSelectedMeal(meal);
//     setSelectedConditions([]);
//     setModifications({});
//     setChefNote('');
//     setIsAnalyzing(true);
//     toast.loading("🧠 AI analyzing ingredients against 50k+ medical profiles...", { toastId: 'analyze', autoClose: 2000 });
//     setTimeout(() => {
//       toast.dismiss('analyze');
//       toast.success(`✨ "${meal.name}" — ${meal.ingredients.length} ingredients analyzed, ${meal.healthScore}% safety score`, { position: "top-center", autoClose: 2500, icon: "🔬" });
//       setIsAnalyzing(false);
//       setCurrentStep(1);
//     }, 1500);
//   };

//   const toggleCondition = (condition) => {
//     setSelectedConditions(prev =>
//       prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
//     );
//   };

//   const selectModification = (condition, modIndex) => {
//     setModifications(prev => ({ ...prev, [condition]: modIndex }));
//     const modName = availableMods.find(m => m.condition === condition)?.options[modIndex]?.name;
//     toast.success(`✨ ${modName} applied — personalized for your health`, { autoClose: 1800, icon: "💚" });
//   };

//   const handlePlaceOrder = () => {
//     if (!selectedMeal) return;
//     const newOrderNum = Math.floor(100 + Math.random() * 900);
//     setOrderNumber(newOrderNum);
//     setTimerSeconds(selectedMeal.prepTime * 60);
//     setOrderPlaced(true);
//     toast.success(`🎉 Order #${newOrderNum} confirmed! Chef notified with your personalized modifications`, { position: "bottom-center", autoClose: 4000, icon: "✅" });
//     setCurrentStep(3);
//   };

//   useEffect(() => {
//     if (!orderPlaced || timerSeconds <= 0) return;
//     const interval = setInterval(() => {
//       setTimerSeconds(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           toast.success("🍲 Your meal is ready! Please collect at the counter.", { autoClose: 8000, icon: "🔔" });
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [orderPlaced, timerSeconds]);

//   const formatTime = (secs) => {
//     const mins = Math.floor(secs / 60);
//     const remainSecs = secs % 60;
//     return `${mins}:${remainSecs.toString().padStart(2, '0')}`;
//   };

//   const stepTitles = ['Select Meal', 'AI Health Scan', 'Personalize', 'Order Track'];
//   const stepIcons = [<RestaurantMenu />, <Psychology />, <Healing />, <CheckCircle />];

//   const pageVariants = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50/30 to-stone-100 font-['Inter']">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable theme="colored" />

//       {/* Animated Header */}
//       <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl shadow-sm border-b border-emerald-100/50">
//         <div className="max-w-2xl mx-auto px-4 py-3">
//           <div className="flex items-center justify-between mb-3">
//             <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-50 animate-pulse" />
//                 <Psychology className="relative text-emerald-700" sx={{ fontSize: 32 }} />
//               </div>
//               <h1 className="font-['Playfair_Display'] text-2xl font-bold bg-gradient-to-r from-emerald-800 via-amber-700 to-emerald-800 bg-clip-text text-transparent bg-300% animate-gradient">NutriScan·AI</h1>
//             </motion.div>
//             <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 rounded-full">
//               <Shield sx={{ fontSize: 16 }} className="text-emerald-700" />
//               <span className="text-xs font-semibold text-emerald-800">HIPAA · Secure</span>
//             </div>
//           </div>

//           {/* Step Progress */}
//           <div className="flex justify-between items-center relative">
//             {stepTitles.map((title, idx) => (
//               <div key={idx} className="flex-1 text-center relative">
//                 <motion.div
//                   whileHover={{ scale: idx <= currentStep ? 1.05 : 1 }}
//                   className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${currentStep >= idx ? 'opacity-100' : 'opacity-40'}`}
//                   onClick={() => idx <= currentStep && setCurrentStep(idx)}
//                 >
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep > idx ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : currentStep === idx ? 'bg-amber-600 text-white ring-4 ring-amber-200 shadow-lg' : 'bg-stone-200 text-stone-500'}`}>
//                     {currentStep > idx ? <CheckCircle sx={{ fontSize: 20 }} /> : stepIcons[idx]}
//                   </div>
//                   <span className="text-[11px] font-medium text-stone-700 hidden sm:block">{title}</span>
//                 </motion.div>
//                 {idx < 3 && (
//                   <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 transition-all duration-500 ${currentStep > idx ? 'bg-emerald-500' : 'bg-stone-200'}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       <div className="max-w-2xl mx-auto px-4 py-6 pb-28">
//         <AnimatePresence mode="wait">
//           {/* STEP 0: MENU */}
//           {currentStep === 0 && (
//             <motion.div key="step0" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
//               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-2xl p-6 text-white shadow-2xl">
//                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
//                 <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
//                 <div className="relative z-2">
//                   <div className="flex gap-2 text-xs font-medium text-emerald-200 mb-2"><Spa fontSize="small" /> Table 07 · Musanze Valley · Rwanda</div>
//                   <h2 className="text-3xl font-['Playfair_Display'] font-bold">Inzu ya Flaveur</h2>
//                   <p className="text-emerald-100/80 text-sm mt-2">AI-powered safety checks for every ingredient, personalized to your health profile</p>
//                   <div className="flex gap-3 mt-4">
//                     <div className="flex items-center gap-1"><Bolt sx={{ fontSize: 14 }} className="text-amber-400" /><span className="text-xs">Real-time analysis</span></div>
//                     <div className="flex items-center gap-1"><Healing sx={{ fontSize: 14 }} className="text-emerald-300" /><span className="text-xs">Medical-grade</span></div>
//                   </div>
//                 </div>
//               </motion.div>

//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fontSize="small" />
//                 <input
//                   type="text"
//                   placeholder="Search meals by name, ingredient, or cuisine..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-stone-200 bg-white/80 backdrop-blur focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none shadow-sm"
//                 />
//               </div>

//               <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
//                 {filters.map(f => (
//                   <motion.button
//                     key={f}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setActiveFilter(f)}
//                     className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeFilter === f ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200' : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300'}`}
//                   >
//                     {f}
//                   </motion.button>
//                 ))}
//               </div>

//               <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
//                 {filteredMeals.map((meal, idx) => (
//                   <MealCard key={meal.id} meal={meal} onSelect={handleSelectMeal} index={idx} />
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* STEP 1: AI ANALYSIS */}
//           {currentStep === 1 && selectedMeal && (
//             <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentStep(0)} className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors">
//                   <ArrowBack fontSize="small" />
//                 </motion.button>
//                 <div>
//                   <h2 className="text-2xl font-['Playfair_Display'] font-bold text-stone-800">Clinical Analysis</h2>
//                   <p className="text-xs text-stone-500">Powered by Gemini Health AI</p>
//                 </div>
//               </div>

//               <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
//                 <div className="flex items-center gap-3">
//                   <div className="relative">
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute" />
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full relative" />
//                   </div>
//                   <div>
//                     <span className="text-sm font-semibold text-emerald-800">AI Health Analysis Complete</span>
//                     <p className="text-xs text-emerald-700">{selectedMeal.ingredients.length} ingredients analyzed against 50k+ medical profiles</p>
//                   </div>
//                 </div>
//               </motion.div>

//               <div>
//                 <h3 className="font-semibold flex items-center gap-2 mb-3 text-stone-700"><Warning fontSize="small" className="text-amber-600" />Ingredient Risk Assessment</h3>
//                 <div className="space-y-2">
//                   {currentAnalysis?.risks.map((risk, idx) => (
//                     <motion.div key={idx} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className={`p-3 rounded-xl border-l-8 ${risk.severity === 'high' ? 'border-red-500 bg-red-50' : risk.severity === 'moderate' ? 'border-amber-500 bg-amber-50' : 'border-emerald-500 bg-emerald-50'}`}>
//                       <div className="flex justify-between items-center">
//                         <span className="font-semibold text-sm">{risk.condition}</span>
//                         <span className={`text-xs px-2 py-0.5 rounded-full ${risk.severity === 'high' ? 'bg-red-200 text-red-800' : risk.severity === 'moderate' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'}`}>
//                           {risk.severity.toUpperCase()} risk
//                         </span>
//                       </div>
//                       <p className="text-sm mt-1 text-stone-700">{risk.message}</p>
//                       <div className="flex items-center gap-1 mt-2">
//                         <Science fontSize="inherit" className="text-stone-500 text-[12px]" />
//                         <span className="text-[11px] text-stone-500">AI confidence: {Math.round(risk.aiConfidence * 100)}% · {risk.clinicalNote}</span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-semibold flex items-center gap-2 mb-3 text-stone-700"><Favorite fontSize="small" className="text-rose-500" />Select your health conditions</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {['Peanut allergy', 'Tree nut allergy', 'Type 2 Diabetes', 'Hypertension', 'High cholesterol'].map(cond => (
//                     <motion.button
//                       key={cond}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => toggleCondition(cond)}
//                       className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${selectedConditions.includes(cond) ? 'bg-emerald-700 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-300'}`}
//                     >
//                       {cond}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => {
//                   if (selectedConditions.length > 0) {
//                     toast.success("✨ Generating personalized modifications based on your health profile", { autoClose: 1500 });
//                     setCurrentStep(2);
//                   } else toast.warn("Please select at least one health condition for personalized safety", { icon: "⚠️" });
//                 }}
//                 className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
//               >
//                 Continue to Personalization <ArrowForward fontSize="small" />
//               </motion.button>
//             </motion.div>
//           )}

//           {/* STEP 2: CUSTOMIZE */}
//           {currentStep === 2 && selectedMeal && (
//             <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentStep(1)} className="p-2.5 rounded-full bg-stone-100"><ArrowBack fontSize="small" /></motion.button>
//                 <div>
//                   <h2 className="text-2xl font-['Playfair_Display'] font-bold text-stone-800">Safe Modifications</h2>
//                   <p className="text-xs text-stone-500">Tailored to your health profile</p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {selectedConditions.map(c => (
//                   <motion.span key={c} initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
//                     <Healing fontSize="inherit" className="text-[12px]" /> {c}
//                   </motion.span>
//                 ))}
//               </div>

//               {availableMods.length === 0 && (
//                 <div className="bg-emerald-50 p-8 rounded-2xl text-center text-emerald-700">
//                   <Shield sx={{ fontSize: 48 }} className="mx-auto mb-2" />
//                   <p className="font-medium">✨ Your meal is already optimized for your health profile!</p>
//                   <p className="text-sm mt-1">No modifications needed.</p>
//                 </div>
//               )}

//               {availableMods.map((group, gi) => (
//                 <motion.div key={gi} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: gi * 0.1 }} className="bg-white rounded-2xl p-4 shadow-lg border border-stone-100">
//                   <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><EjectOutlined fontSize="small" className="text-emerald-600" />{group.condition}</h3>
//                   <div className="space-y-2">
//                     {group.options.map((opt, oi) => (
//                       <motion.div
//                         key={oi}
//                         whileHover={{ scale: 1.01 }}
//                         onClick={() => selectModification(group.condition, oi)}
//                         className={`p-3 rounded-xl cursor-pointer transition-all border ${modifications[group.condition] === oi ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'}`}
//                       >
//                         <div className="flex items-start gap-3">
//                           <span className="text-3xl">{opt.icon}</span>
//                           <div className="flex-1">
//                             <div className="font-semibold text-stone-800">{opt.name}</div>
//                             <p className="text-xs text-stone-600 mt-0.5">{opt.description}</p>
//                             <div className="flex items-center gap-2 mt-2">
//                               <div className="flex items-center gap-1"><Science fontSize="inherit" className="text-emerald-600 text-[12px]" /><span className="text-[11px] text-emerald-700 font-medium">{opt.healthImpact}</span></div>
//                               <div className="flex items-center gap-1"><Shield fontSize="inherit" className="text-amber-600 text-[12px]" /><span className="text-[11px] text-stone-500">{opt.clinicalEfficacy}</span></div>
//                             </div>
//                           </div>
//                           <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${modifications[group.condition] === oi ? 'border-emerald-500 bg-emerald-500' : 'border-stone-300'}`}>
//                             {modifications[group.condition] === oi && <div className="w-2 h-2 bg-white rounded-full" />}
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}

//               <div>
//                 <label className="font-semibold text-stone-700 block mb-2 flex items-center gap-2"><Person fontSize="small" />Note to chef (add a personal touch)</label>
//                 <textarea
//                   value={chefNote}
//                   onChange={(e) => setChefNote(e.target.value)}
//                   placeholder="e.g., 'Please go easy on the spice, I have a sensitive stomach' or 'Extra ginger would be amazing!'"
//                   className="w-full p-3 border border-stone-200 rounded-xl bg-white/70 h-28 resize-none focus:ring-2 focus:ring-emerald-400 outline-none"
//                 />
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handlePlaceOrder}
//                 className="w-full bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
//               >
//                 Confirm & Place Order <LocalDining fontSize="small" />
//               </motion.button>
//             </motion.div>
//           )}

//           {/* STEP 3: CONFIRMATION */}
//           {currentStep === 3 && orderPlaced && selectedMeal && (
//             <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-5">
//               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-br from-stone-800 to-stone-900 text-white rounded-2xl p-6 text-center shadow-2xl">
//                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <CheckCircle sx={{ fontSize: 40 }} />
//                 </motion.div>
//                 <div className="text-sm opacity-70 uppercase tracking-wide">Order Confirmed</div>
//                 <div className="text-4xl font-['Playfair_Display'] font-bold mt-1">#{orderNumber}</div>
//                 <div className="text-xs opacity-60 mt-2">Table 07 · sent to kitchen with personalized safety notes</div>
//               </motion.div>

//               <div className="grid grid-cols-4 gap-1 text-center text-xs font-medium">
//                 {['Placed', 'AI Verified', 'Preparing', 'Ready'].map((stage, idx) => (
//                   <div key={stage} className={`py-2.5 rounded-xl transition-all ${idx === 0 ? 'bg-emerald-100 text-emerald-800' : idx === 1 ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-100 text-stone-500'}`}>
//                     {stage}
//                   </div>
//                 ))}
//               </div>

//               <div className="bg-white rounded-2xl p-5 shadow-lg">
//                 <h3 className="font-bold text-stone-800 mb-3 flex items-center gap-2"><RestaurantMenu fontSize="small" />Your Order</h3>
//                 <div className="flex justify-between text-stone-700 pb-2 border-b border-stone-100">
//                   <span>{selectedMeal.name}</span>
//                   <span className="font-semibold">{selectedMeal.price.toLocaleString()} RWF</span>
//                 </div>
//                 {Object.entries(modifications).map(([cond, idx]) => {
//                   const modOpt = availableMods.find(m => m.condition === cond)?.options[idx];
//                   return modOpt ? (
//                     <div key={cond} className="flex justify-between text-sm text-stone-500 mt-2">
//                       <span className="flex items-center gap-1"><Eco fontSize="inherit" className="text-emerald-500 text-[12px]" />{modOpt.name}</span>
//                       <span>included</span>
//                     </div>
//                   ) : null;
//                 })}
//                 {chefNote && (
//                   <div className="mt-3 p-2 bg-amber-50 rounded-lg text-xs text-stone-600 italic">📝 "{chefNote}"</div>
//                 )}
//                 <div className="border-t border-stone-200 mt-3 pt-2 flex justify-between font-bold text-stone-800">
//                   <span>Total</span>
//                   <span className="text-emerald-700">{selectedMeal.price.toLocaleString()} RWF</span>
//                 </div>
//               </div>

//               <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-3 border border-emerald-200">
//                 <Shield className="text-emerald-700" />
//                 <span className="text-sm text-emerald-800 font-medium">✅ Verified safe for {selectedConditions.join(', ')} · AI human-centric protocol active</span>
//               </div>

//               <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 text-center border border-amber-200">
//                 <Timer sx={{ fontSize: 48 }} className="text-amber-700 mx-auto mb-2" />
//                 <div className="text-5xl font-mono font-bold text-amber-800">{formatTime(timerSeconds)}</div>
//                 <div className="text-sm text-stone-600 mt-2">{timerSeconds === 0 ? '🎉 Your meal is ready! Enjoy! 🎉' : 'Estimated preparation time'}</div>
//                 <div className="w-full bg-stone-200 rounded-full h-2 mt-4 overflow-hidden">
//                   <motion.div
//                     className="bg-amber-600 h-full rounded-full"
//                     initial={{ width: 0 }}
//                     animate={{ width: `${(1 - timerSeconds / (selectedMeal.prepTime * 60)) * 100}%` }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 </div>
//                 <p className="text-xs text-stone-500 mt-3 flex items-center justify-center gap-1"><WaterDrop fontSize="inherit" /> We'll notify you when ready</p>
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => {
//                   toast.success("Thank you! Your feedback helps us improve AI health matching.");
//                   setCurrentStep(0);
//                   setSelectedMeal(null);
//                   setOrderPlaced(false);
//                   setSelectedConditions([]);
//                   setModifications({});
//                 }}
//                 className="w-full border-2 border-emerald-600 text-emerald-700 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all"
//               >
//                 ← Back to Menu
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <style jsx>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #cbd5e1;
//           border-radius: 10px;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import QRCode from 'qrcode';
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   WarningAmber as WarningAmberIcon,
//   NavigateNext as NextIcon,
//   NavigateBefore as PrevIcon,
//   Straighten as SizeIcon,
//   Restaurant as RestaurantIcon,
//   ThumbUp as ThumbUpIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
//   SwapHoriz as SwapIcon,
//   HealthAndSafety as HealthIcon,
//   Favorite as FavoriteIcon,
//   Psychology as PsychologyIcon,
//   Healing as HealingIcon,
//   Science as ScienceIcon,
//   Shield as ShieldIcon,
//   Spa as SpaIcon,
//   FitnessCenter as FitnessIcon,
//   LocalDining as LocalDiningIcon,
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon
// } from '@mui/icons-material';

// // ========== REAL-TIME AI ANALYSIS ENGINE WITH LIVE WEB DATA ==========

// // Function to search ingredient health risks using online sources
// const searchIngredientHealthRisks = async (ingredient, userConditions = []) => {
//   // This simulates a real API call to a health knowledge base
//   // In production, replace with actual API endpoints like:
//   // - OpenFDA API: https://api.fda.gov/
//   // - USDA FoodData Central: https://fdc.nal.usda.gov/
//   // - Nutritionix API: https://www.nutritionix.com/business/api

//   const mockApiDelay = () => new Promise(resolve => setTimeout(resolve, 300));
//   await mockApiDelay();

//   // Simulated online database lookup - would be replaced with real API calls
//   const onlineRiskDatabase = {
//     'peanut': { severity: 'high', condition: 'Peanut Allergy', message: 'Cross-reactive proteins may trigger anaphylaxis', clinicalNote: 'Avoidance required', aiConfidence: 0.94, mechanism: 'IgE-mediated response', sources: ['FDA.gov', 'AAAAI.org'] },
//     'coconut': { severity: 'high', condition: 'Tree Nut Allergy', message: 'Potential cross-allergenicity with tree nuts', clinicalNote: 'Coconut derivatives may cause reaction', aiConfidence: 0.89, mechanism: 'Protein cross-reactivity', sources: ['ACAAI.org'] },
//     'palm oil': { severity: 'moderate', condition: 'Type 2 Diabetes', message: 'High saturated fat → insulin resistance pathway', clinicalNote: 'Inflammatory marker elevation', aiConfidence: 0.91, mechanism: 'Adipose tissue inflammation', sources: ['WHO.int', 'PubMed'] },
//     'salt': { severity: 'moderate', condition: 'Hypertension', message: 'Sodium load increases BP within hours', clinicalNote: 'Limit to <1.5g/meal', aiConfidence: 0.96, mechanism: 'Fluid retention & vascular resistance', sources: ['AHA.org'] },
//     'sugar': { severity: 'high', condition: 'Type 2 Diabetes', message: 'Rapid glucose spike → insulin surge → metabolic stress', clinicalNote: 'HbA1c elevation risk', aiConfidence: 0.98, mechanism: 'Pancreatic beta-cell strain', sources: ['ADA.org', 'CDC.gov'] },
//     'butter': { severity: 'moderate', condition: 'High Cholesterol', message: 'Saturated fat elevates LDL cholesterol', clinicalNote: 'Limit to 1 tbsp/day', aiConfidence: 0.92, mechanism: 'HMG-CoA reductase upregulation', sources: ['AHA.org'] },
//     'beef': { severity: 'low', condition: 'High Cholesterol', message: 'Saturated fat & dietary cholesterol', clinicalNote: 'Lean cuts preferred', aiConfidence: 0.88, mechanism: 'LDL receptor downregulation', sources: ['USDA.gov'] },
//     'shrimp': { severity: 'high', condition: 'Shellfish Allergy', message: 'Tropomyosin protein triggers severe reactions', clinicalNote: 'Epinephrine ready', aiConfidence: 0.97, mechanism: 'Mast cell degranulation', sources: ['AAAAI.org'] },
//     'gluten': { severity: 'high', condition: 'Celiac Disease', message: 'Autoimmune reaction damaging intestinal villi', clinicalNote: 'Strict avoidance', aiConfidence: 0.99, mechanism: 'T-cell mediated enteropathy', sources: ['Celiac.org'] },
//     'dairy': { severity: 'moderate', condition: 'Lactose Intolerance', message: 'Lactase deficiency causes GI distress', clinicalNote: 'Lactase supplements help', aiConfidence: 0.95, mechanism: 'Osmotic diarrhea', sources: ['NIDDK.gov'] },
//     'caffeine': { severity: 'low', condition: 'Anxiety', message: 'Adenosine receptor antagonism increases cortisol', clinicalNote: 'Limit to 200mg/day', aiConfidence: 0.87, mechanism: 'Sympathetic activation', sources: ['PubMed'] },
//     'soy': { severity: 'moderate', condition: 'Soy Allergy', message: 'Soy protein can cause mild to severe reactions', clinicalNote: 'Check labels carefully', aiConfidence: 0.92, mechanism: 'Protein hypersensitivity', sources: ['FDA.gov'] },
//     'egg': { severity: 'high', condition: 'Egg Allergy', message: 'Ovomucoid protein triggers immune response', clinicalNote: 'Avoid raw eggs', aiConfidence: 0.96, mechanism: 'IgE-mediated', sources: ['AAAAI.org'] },
//     'fish': { severity: 'high', condition: 'Fish Allergy', message: 'Parvalbumin protein causes cross-reactivity', clinicalNote: 'Avoid all finned fish', aiConfidence: 0.98, mechanism: 'Protein allergy', sources: ['ACAAI.org'] }
//   };

//   for (const [key, data] of Object.entries(onlineRiskDatabase)) {
//     if (ingredient.toLowerCase().includes(key)) {
//       const isRelevant = userConditions.length === 0 || userConditions.some(c => c.toLowerCase().includes(data.condition.toLowerCase()));
//       if (isRelevant) return data;
//     }
//   }
//   return null;
// };

// // Function to fetch live nutritional data from online sources
// const fetchLiveNutritionalData = async (ingredient) => {
//   // This would call a real API like Nutritionix or USDA
//   await new Promise(resolve => setTimeout(resolve, 400));

//   const nutritionDB = {
//     'salt': { sodium_mg: 387, risk_level: 'high', daily_value: 16 },
//     'sugar': { sugar_g: 4, risk_level: 'high', glycemic_index: 65 },
//     'butter': { saturated_fat_g: 7, cholesterol_mg: 31, risk_level: 'moderate' },
//     'palm oil': { saturated_fat_g: 14, trans_fat_g: 0.5, risk_level: 'moderate' }
//   };

//   for (const [key, data] of Object.entries(nutritionDB)) {
//     if (ingredient.toLowerCase().includes(key)) return { ...data, source: 'USDA FoodData Central', last_updated: new Date().toISOString() };
//   }
//   return { source: 'No live data available', note: 'Using standard nutritional database' };
// };

// // Main online analysis function that uses live web search simulation
// const analyzeIngredientsOnline = async (ingredients, userConditions = []) => {
//   toast.info("🔍 AI is searching medical databases for ingredient risks...", { autoClose: 1500 });

//   const analysisResults = [];

//   for (const ingredient of ingredients) {
//     // Search online health databases for each ingredient
//     const riskData = await searchIngredientHealthRisks(ingredient, userConditions);
//     const nutritionData = await fetchLiveNutritionalData(ingredient);

//     if (riskData) {
//       analysisResults.push({
//         ingredient,
//         ...riskData,
//         nutritionData,
//         timestamp: new Date().toISOString(),
//         dataSource: riskData.sources || ['Live API Query']
//       });
//     }
//   }

//   // Remove duplicates and sort by severity
//   const uniqueResults = analysisResults.filter((v, i, a) => a.findIndex(t => t.condition === v.condition) === i);
//   const sortedResults = uniqueResults.sort((a, b) => {
//     const severityOrder = { high: 3, moderate: 2, low: 1 };
//     return severityOrder[b.severity] - severityOrder[a.severity];
//   });

//   return sortedResults.slice(0, 5);
// };

// // Generate personalized modifications using online recipe databases
// const generateModificationsOnline = async (conditions, meal) => {
//   toast.info("✨ Searching for personalized recipe modifications online...", { autoClose: 1500 });
//   await new Promise(resolve => setTimeout(resolve, 600));

//   const modLibrary = {
//     'Peanut Allergy': [
//       { name: '🌻 Roasted Sunflower Seed Butter', description: 'Creamy, nut-free alternative', healthImpact: '100% allergen-safe', icon: '🌻', clinicalEfficacy: 'No cross-reactivity', priceDelta: 0, onlineSource: 'SunButter.com' },
//       { name: '🌾 Tahini (Sesame Paste)', description: 'Rich, nutty flavor from roasted sesame', healthImpact: 'Calcium & iron rich', icon: '🌾', clinicalEfficacy: 'No peanut proteins', priceDelta: 200 }
//     ],
//     'Tree Nut Allergy': [
//       { name: '🥛 Oat & Rice Milk Emulsion', description: 'Silky, nut-free substitute', healthImpact: 'Hypoallergenic', icon: '🥛', clinicalEfficacy: '99% allergen reduction', priceDelta: 0 }
//     ],
//     'Type 2 Diabetes': [
//       { name: '🫒 Cold-pressed Avocado Oil', description: 'Monounsaturated fats improve insulin sensitivity', healthImpact: 'Lowers glycemic response by 23%', icon: '🥑', clinicalEfficacy: 'Improves HbA1c', priceDelta: 200 },
//       { name: '🥬 Moringa Powder Infusion', description: 'Antioxidant-rich, reduces postprandial glucose', healthImpact: 'Natural glucose regulation', icon: '🌿', clinicalEfficacy: 'Lowers spikes by 18%', priceDelta: 150 }
//     ],
//     'Hypertension': [
//       { name: '🧂 Potassium-enriched Salt Substitute', description: 'Lowers BP while maintaining flavor', healthImpact: 'Sodium reduced by 70%', icon: '⚖️', clinicalEfficacy: 'Reduces SBP by 5-8 mmHg', priceDelta: 100 },
//       { name: '🌿 Lemon & Herb No-Salt Blend', description: 'Bright citrus notes without sodium', healthImpact: 'Vasodilation support', icon: '🍋', clinicalEfficacy: 'Natural BP control', priceDelta: 0 }
//     ],
//     'High Cholesterol': [
//       { name: '🔥 Air-fried (No Oil)', description: 'Crispy texture with zero added fats', healthImpact: 'Reduces LDL oxidation', icon: '💨', clinicalEfficacy: 'Lowers LDL by 12%', priceDelta: 0 },
//       { name: '🌰 Ground Flaxseed Coating', description: 'Omega-3 rich, lowers triglycerides', healthImpact: 'Heart-protective fiber', icon: '🌾', clinicalEfficacy: 'Reduces total cholesterol', priceDelta: 250 }
//     ],
//     'Shellfish Allergy': [
//       { name: '🐟 Grilled Tilapia', description: 'Mild white fish, no shellfish proteins', healthImpact: 'Complete protein source', icon: '🐟', clinicalEfficacy: 'No cross-reactivity', priceDelta: 500 },
//       { name: '🍄 King Oyster Mushroom Scampi', description: 'Mimics shrimp texture perfectly', healthImpact: 'Cholesterol-free, umami-rich', icon: '🍄', clinicalEfficacy: 'Allergen-safe', priceDelta: 300 }
//     ],
//     'Celiac Disease': [
//       { name: '🍚 Rice Flour Alternative', description: 'Gluten-free grain replacement', healthImpact: 'No intestinal damage', icon: '🍚', clinicalEfficacy: '100% gluten-free', priceDelta: 400 },
//       { name: '🌽 Corn Tortilla Wrap', description: 'Traditional gluten-free option', healthImpact: 'High fiber', icon: '🌽', clinicalEfficacy: 'Safe for celiac', priceDelta: 200 }
//     ]
//   };

//   const applicable = conditions.filter(c => modLibrary[c]).map(c => ({
//     condition: c,
//     options: modLibrary[c]
//   }));
//   return applicable;
// };

// // ========== EXPANDED MENU DATA WITH ONLINE INTEGRATION ==========
// const MEALS = [
//   { id: 0, name: 'Isombe ya Nyama', price: 2800, currency: 'RWF', ingredients: ['cassava leaves', 'beef', 'coconut milk', 'peanut flour', 'palm oil', 'sea salt'], description: 'Traditional cassava leaf stew with grass-fed beef', icon: '🥬', healthScore: 72, prepTime: 18, category: 'Mains', protein: '28g', calories: '520', tags: ['Local', 'Traditional'], image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
//   { id: 1, name: 'Brochette de Boeuf', price: 3500, ingredients: ['beef sirloin', 'pepper sauce', 'sunflower oil', 'potato', 'spices', 'salt'], description: 'Grilled skewers with spiced fries', icon: '🍢', healthScore: 68, prepTime: 15, category: 'Mains', protein: '35g', calories: '610', tags: ['Grilled', 'Popular'], image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
//   { id: 2, name: 'Ibiharage n\'Amafuta', price: 1800, ingredients: ['kidney beans', 'palm oil', 'tomato', 'onion', 'sea salt', 'basmati rice'], description: 'Rwandan bean stew, vegan option', icon: '🫘', healthScore: 85, prepTime: 12, category: 'Vegan', protein: '15g', calories: '380', tags: ['Vegan', 'Local'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
//   { id: 3, name: 'Matoke ya Nyama', price: 3200, ingredients: ['green plantain', 'goat meat', 'ginger', 'green pepper', 'onion', 'coconut oil'], description: 'Steamed plantain with aromatic goat stew', icon: '🍌', healthScore: 74, prepTime: 20, category: 'Mains', protein: '32g', calories: '580', tags: ['Local', 'Traditional'], image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
//   { id: 4, name: 'Grilled Tilapia', price: 4500, ingredients: ['tilapia', 'lemon', 'garlic', 'rosemary', 'olive oil', 'black pepper'], description: 'Fresh lake tilapia, charcoal-grilled', icon: '🐟', healthScore: 90, prepTime: 16, category: 'Seafood', protein: '42g', calories: '480', tags: ['Healthy', 'Popular'], image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
//   { id: 5, name: 'Chocolate Lava Cake', price: 6500, ingredients: ['chocolate', 'sugar', 'butter', 'eggs', 'flour', 'cream'], description: 'Warm molten chocolate cake', icon: '🍰', healthScore: 45, prepTime: 12, category: 'Desserts', protein: '6g', calories: '520', tags: ['Dessert'], image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400' }
// ];

// const allItems = [...MEALS];

// // ========== MODAL COMPONENTS ==========
// const ResultModal = ({ isOpen, onClose, title, message, type }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <>
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//         <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
//             <div className={`p-6 text-center ${type === "success" ? "bg-green-50" : type === "error" ? "bg-red-50" : "bg-yellow-50"}`}>
//               {type === "success" && <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />}
//               {type === "error" && <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />}
//               {type === "warning" && <WarningAmberIcon className="text-yellow-500 text-6xl mx-auto mb-4" />}
//               <h2 className="text-2xl font-bold mb-2">{title}</h2>
//               <p className="text-gray-600 mb-6 whitespace-pre-line">{message}</p>
//               <button onClick={onClose} className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">OK</button>
//             </div>
//           </div>
//         </motion.div>
//       </>
//     )}
//   </AnimatePresence>
// );

// const AnalysisModal = ({ isOpen, onClose, analysis, onContinue, isLoading }) => {
//   if (!isOpen) return null;
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//           <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden">
//               <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex justify-between items-center shrink-0">
//                 <h2 className="text-xl font-bold text-white flex items-center gap-2"><PsychologyIcon /> AI Health Analysis</h2>
//                 <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//               </div>
//               <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {isLoading ? (
//                   <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
//                     <p className="text-gray-500">Analyzing ingredients against medical databases...</p>
//                     <p className="text-xs text-gray-400 mt-2">Searching FDA, USDA, and PubMed sources</p>
//                   </div>
//                 ) : analysis && analysis.length > 0 ? (
//                   <>
//                     <div className="bg-amber-50 p-3 rounded-xl border-l-4 border-amber-500">
//                       <p className="text-sm font-semibold text-amber-800 flex items-center gap-2"><WarningAmberIcon /> {analysis.length} potential risk(s) detected from online sources</p>
//                     </div>
//                     {analysis.map((risk, idx) => (
//                       <div key={idx} className={`p-3 rounded-xl border-l-8 ${risk.severity === 'high' ? 'border-red-500 bg-red-50' : risk.severity === 'moderate' ? 'border-amber-500 bg-amber-50' : 'border-emerald-500 bg-emerald-50'}`}>
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-sm">{risk.condition}</span>
//                           <span className={`text-xs px-2 py-0.5 rounded-full ${risk.severity === 'high' ? 'bg-red-200 text-red-800' : risk.severity === 'moderate' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'}`}>{risk.severity.toUpperCase()} risk</span>
//                         </div>
//                         <p className="text-sm mt-1 text-stone-700">{risk.message}</p>
//                         <div className="flex items-center gap-2 mt-2">
//                           <ScienceIcon fontSize="small" className="text-stone-500" />
//                           <span className="text-xs text-stone-500">Mechanism: {risk.mechanism}</span>
//                         </div>
//                         <div className="flex items-center gap-2 mt-1">
//                           <ShieldIcon fontSize="small" className="text-stone-400" />
//                           <span className="text-xs text-stone-400">Sources: {risk.sources?.join(', ') || 'Live Medical Databases'}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </>
//                 ) : (
//                   <div className="text-center py-8">
//                     <CheckCircleIcon className="text-green-500 text-5xl mx-auto mb-3" />
//                     <p className="text-green-700 font-medium">✅ No significant risks detected for your profile</p>
//                     <p className="text-xs text-gray-500 mt-2">Verified against medical databases</p>
//                   </div>
//                 )}
//                 <button onClick={onContinue} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition mt-2">Continue to Personalization</button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// const ConditionModal = ({ isOpen, onClose, onSelectConditions, selectedConditions }) => {
//   const conditions = ['Peanut Allergy', 'Tree Nut Allergy', 'Type 2 Diabetes', 'Hypertension', 'High Cholesterol', 'Shellfish Allergy', 'Celiac Disease', 'Lactose Intolerance'];
//   const [localSelected, setLocalSelected] = useState(selectedConditions);

//   useEffect(() => { setLocalSelected(selectedConditions); }, [selectedConditions, isOpen]);

//   const toggle = (cond) => setLocalSelected(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//           <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//               <div className="bg-purple-600 p-4 rounded-t-2xl">
//                 <h2 className="text-white font-bold text-xl flex items-center gap-2"><FavoriteIcon /> Select Your Medical Conditions</h2>
//                 <p className="text-purple-200 text-xs mt-1">This helps us personalize your meal recommendations</p>
//               </div>
//               <div className="p-4">
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {conditions.map(c => (
//                     <button key={c} onClick={() => toggle(c)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${localSelected.includes(c) ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{c}</button>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   <button onClick={() => { onSelectConditions(localSelected); onClose(); }} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg">Apply & Continue</button>
//                   <button onClick={onClose} className="flex-1 border py-2 rounded-lg">Skip for now</button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// const ModificationModal = ({ isOpen, onClose, modifications, onSelectMod, selectedMods, onConfirm, isLoading }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//           <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
//               <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
//                 <h2 className="text-white font-bold text-xl flex items-center gap-2"><HealingIcon /> Personalized Safe Modifications</h2>
//                 <p className="text-amber-100 text-xs mt-1">AI-suggested alternatives based on your health profile</p>
//               </div>
//               <div className="flex-1 overflow-y-auto p-4">
//                 {isLoading ? (
//                   <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto" />
//                     <p className="mt-3 text-gray-500">Searching online recipe databases...</p>
//                   </div>
//                 ) : modifications.length === 0 ? (
//                   <p className="text-center text-gray-500 py-8">No modifications needed for your selected conditions.</p>
//                 ) : (
//                   modifications.map((group, gi) => (
//                     <div key={gi} className="mb-4">
//                       <h3 className="font-bold text-stone-700 mb-2 flex items-center gap-2"><SpaIcon fontSize="small" className="text-emerald-600" /> {group.condition}</h3>
//                       {group.options.map((opt, oi) => (
//                         <div key={oi} onClick={() => onSelectMod(group.condition, oi, opt)} className={`p-3 rounded-xl mb-2 cursor-pointer transition-all border ${selectedMods[group.condition]?.index === oi ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/30'}`}>
//                           <div className="flex gap-3">
//                             <span className="text-2xl">{opt.icon}</span>
//                             <div className="flex-1">
//                               <div className="font-semibold text-sm">{opt.name}</div>
//                               <p className="text-xs text-gray-500">{opt.description}</p>
//                               <div className="flex items-center gap-2 mt-1">
//                                 <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{opt.healthImpact}</span>
//                                 <span className="text-[10px] text-amber-600">{opt.clinicalEfficacy}</span>
//                               </div>
//                             </div>
//                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMods[group.condition]?.index === oi ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
//                               {selectedMods[group.condition]?.index === oi && <div className="w-2 h-2 bg-white rounded-full" />}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))
//                 )}
//               </div>
//               <div className="p-4 border-t">
//                 <button onClick={onConfirm} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">Confirm Order with Modifications</button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// const CustomizationModal = ({ open, onClose, item, onAdd }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [instructions, setInstructions] = useState("");
//   if (!item) return null;
//   const total = item.price * quantity;

//   const handleAdd = () => {
//     onAdd({ ...item, quantity, specialInstructions: instructions, finalPrice: total });
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//           <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//               <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//                 <h2 className="text-white font-bold">Customize {item.name}</h2>
//                 <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//               </div>
//               <div className="p-4">
//                 <div className="flex gap-3">
//                   <img src={item.image} className="w-20 h-20 rounded object-cover" alt={item.name} />
//                   <div><p className="font-bold">{item.name}</p><p className="text-sm text-gray-500">Base RWF {item.price.toLocaleString()}</p></div>
//                 </div>
//                 <div className="mt-3">
//                   <label className="text-sm font-semibold">Quantity</label>
//                   <div className="flex items-center gap-2 mt-1">
//                     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><RemoveIcon fontSize="small" /></button>
//                     <span className="w-8 text-center font-bold">{quantity}</span>
//                     <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"><AddIcon fontSize="small" /></button>
//                   </div>
//                 </div>
//                 <div className="mt-3">
//                   <label className="text-sm font-semibold">Special Instructions</label>
//                   <textarea className="w-full border rounded-lg p-2 text-sm mt-1" rows="2" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="e.g., no salt, less oil, extra veggies" />
//                 </div>
//                 <div className="flex justify-between font-bold mt-3 pt-3 border-t">
//                   <span>Total</span>
//                   <span className="text-orange-600">RWF {total.toLocaleString()}</span>
//                 </div>
//                 <button onClick={handleAdd} className="w-full bg-orange-500 text-white py-2 rounded-lg mt-3 font-semibold hover:bg-orange-600 transition">Add to Cart</button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeItem, onCheckout, getTotal, onGenerateQR }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <>
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//         <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
//             <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center shrink-0">
//               <h2 className="text-white font-bold text-xl">🛒 Your Cart</h2>
//               <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-3">
//               {cart.length === 0 ? (
//                 <div className="text-center py-12"><CartIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">Your cart is empty</p></div>
//               ) : (
//                 cart.map(item => (
//                   <div key={item.cartId} className="flex gap-2 border-b pb-2 mb-2">
//                     <img src={item.image} className="w-12 h-12 rounded object-cover" alt={item.name} />
//                     <div className="flex-1">
//                       <p className="font-semibold text-sm">{item.name}</p>
//                       <p className="text-xs text-orange-600 font-bold">RWF {item.finalPrice.toLocaleString()}</p>
//                       {item.hasWarning && <p className="text-[10px] text-red-500 flex items-center gap-1"><WarningAmberIcon fontSize="inherit" /> Contains restricted</p>}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><RemoveIcon fontSize="small" /></button>
//                       <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><AddIcon fontSize="small" /></button>
//                       <button onClick={() => removeItem(item.cartId)} className="ml-1 text-red-500"><DeleteIcon fontSize="small" /></button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             {cart.length > 0 && (
//               <div className="p-3 border-t shrink-0">
//                 <div className="flex justify-between font-bold mb-3"><span>Total</span><span className="text-orange-600">RWF {getTotal().toLocaleString()}</span></div>
//                 <div className="flex gap-2">
//                   <button onClick={onGenerateQR} className="flex-1 bg-indigo-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition flex items-center justify-center gap-1"><QRIcon fontSize="small" /> QR Checkout</button>
//                 </div>
//                 <button onClick={onCheckout} className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">Regular Checkout</button>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </>
//     )}
//   </AnimatePresence>
// );

// const CheckoutQRModal = ({ open, onClose, qrUrl, total, table, onConfirm }) => (
//   <AnimatePresence>
//     {open && (
//       <>
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
//         <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
//             <h3 className="font-bold text-xl mb-2">Scan to Pay</h3>
//             {qrUrl && <img src={qrUrl} className="w-48 h-48 mx-auto my-3 border rounded-lg" alt="QR Code" />}
//             <p className="text-sm text-gray-600">Table {table} | Total: RWF {total.toLocaleString()}</p>
//             <div className="flex gap-3 mt-4">
//               <button onClick={onConfirm} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">Confirm Order</button>
//               <button onClick={onClose} className="flex-1 border py-2 rounded-lg hover:bg-gray-50 transition">Close</button>
//             </div>
//           </div>
//         </motion.div>
//       </>
//     )}
//   </AnimatePresence>
// );

// const QRScannerModal = ({ open, onClose, onScan }) => {
//   const scannerRef = useRef(null);
//   useEffect(() => {
//     if (open && !scannerRef.current) {
//       const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
//       scanner.render(
//         (decodedText) => {
//           let productId = decodedText;
//           if (decodedText.includes(":")) productId = decodedText.split(":")[1];
//           const product = allItems.find(i => i.id === parseInt(productId) || i.id === productId);
//           if (product) { onScan(product); scanner.clear(); onClose(); toast.success(`Product found: ${product.name}`); }
//           else toast.error("Product not found in menu");
//         },
//         (error) => console.warn(error)
//       );
//       scannerRef.current = scanner;
//     }
//     return () => { if (scannerRef.current) { scannerRef.current.clear(); scannerRef.current = null; } };
//   }, [open, onScan, onClose]);
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
//         <div className="bg-purple-600 p-4 flex justify-between items-center">
//           <h3 className="text-white font-bold text-lg">Scan QR Code</h3>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//         </div>
//         <div className="p-4">
//           <div id="qr-reader" className="w-full"></div>
//           <p className="text-center text-gray-500 text-sm mt-4">Position QR code within the frame</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = ({ tableNumber = 1, userId = "user-123" }) => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showAnalysis, setShowAnalysis] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showCustomize, setShowCustomize] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showQRScanner, setShowQRScanner] = useState(false);
//   const [showCheckoutQR, setShowCheckoutQR] = useState(false);
//   const [qrDataUrl, setQrDataUrl] = useState("");
//   const [showResult, setShowResult] = useState({ isOpen: false, type: "", title: "", message: "" });

//   // Health analysis states
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [showConditionModal, setShowConditionModal] = useState(false);
//   const [showModModal, setShowModModal] = useState(false);
//   const [availableMods, setAvailableMods] = useState([]);
//   const [selectedMods, setSelectedMods] = useState({});
//   const [isGeneratingMods, setIsGeneratingMods] = useState(false);
//   const [currentMealForAnalysis, setCurrentMealForAnalysis] = useState(null);

//   const categories = ["all", ...new Set(MEALS.map(i => i.category))];
//   const filtered = MEALS.filter(i => (activeCategory === "all" || i.category === activeCategory) && (i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase())));
//   const totalPages = Math.ceil(filtered.length / 12);
//   const paginated = filtered.slice((currentPage - 1) * 12, currentPage * 12);
//   useEffect(() => setCurrentPage(1), [activeCategory, search]);

//   const handleItemClick = async (item) => {
//     setCurrentMealForAnalysis(item);
//     setIsAnalyzing(true);
//     setShowAnalysis(true);

//     // Real-time online analysis
//     const risks = await analyzeIngredientsOnline(item.ingredients, selectedConditions);
//     setAnalysisResult(risks);
//     setIsAnalyzing(false);
//   };

//   const handleAnalysisContinue = async () => {
//     setShowAnalysis(false);
//     if (selectedConditions.length === 0) {
//       setShowConditionModal(true);
//     } else {
//       await generateAndShowMods();
//     }
//   };

//   const generateAndShowMods = async () => {
//     setIsGeneratingMods(true);
//     setShowModModal(true);
//     const mods = await generateModificationsOnline(selectedConditions, currentMealForAnalysis);
//     setAvailableMods(mods);
//     setIsGeneratingMods(false);
//   };

//   const handleSelectModification = (condition, modIndex, option) => {
//     setSelectedMods(prev => ({ ...prev, [condition]: { index: modIndex, option } }));
//     toast.success(`✨ ${option.name} applied to your order`);
//   };

//   const addToCart = (custom) => {
//     const hasWarning = analysisResult && analysisResult.length > 0;
//     const newItem = { ...custom, cartId: cartIdCounter, hasWarning, analysis: analysisResult };
//     setCart(prev => [...prev, newItem]);
//     setCartIdCounter(prev => prev + 1);
//     if (hasWarning) toast.warning(`${custom.name} added with health restrictions - please consume with caution`);
//     else toast.success(`${custom.quantity}x ${custom.name} added to cart!`);
//     setShowCart(true);
//   };

//   const handleConfirmOrderWithMods = () => {
//     setShowModModal(false);
//     // Add to cart with modifications
//     const modifiedMeal = { ...currentMealForAnalysis, modifications: selectedMods };
//     const hasWarning = analysisResult && analysisResult.length > 0;
//     const newItem = { ...modifiedMeal, cartId: cartIdCounter, hasWarning, analysis: analysisResult, quantity: 1, finalPrice: currentMealForAnalysis.price };
//     setCart(prev => [...prev, newItem]);
//     setCartIdCounter(prev => prev + 1);
//     toast.success(`Order confirmed with personalized modifications!`);
//     setShowCart(true);
//     setSelectedMods({});
//   };

//   const updateQuantity = (cid, qty) => {
//     if (qty < 1) { setCart(cart.filter(i => i.cartId !== cid)); return; }
//     setCart(cart.map(i => i.cartId === cid ? { ...i, quantity: qty, finalPrice: (i.finalPrice / i.quantity) * qty } : i));
//   };
//   const removeItem = (cid) => setCart(cart.filter(i => i.cartId !== cid));
//   const getTotal = () => cart.reduce((s, i) => s + i.finalPrice, 0);

//   const handleCheckout = () => {
//     if (cart.length === 0) { setShowResult({ isOpen: true, type: "error", title: "Cart is Empty", message: "Please add items to your cart before checking out." }); return; }
//     setShowCart(false);
//     setShowResult({ isOpen: true, type: "success", title: "✅ Order Confirmed!", message: `Your order has been placed successfully!\n\nTotal: RWF ${getTotal().toLocaleString()}\n\nA waiter will bring your food shortly.` });
//     setCart([]);
//   };

//   const generateCheckoutQR = async () => {
//     if (cart.length === 0) { toast.error("Cart is empty."); return; }
//     const checkoutData = JSON.stringify({ type: "checkout", tableNumber, items: cart.map(i => ({ id: i.id, quantity: i.quantity })), total: getTotal(), timestamp: Date.now() });
//     const qrDataUrl = await QRCode.toDataURL(checkoutData, { width: 300, margin: 2 });
//     setQrDataUrl(qrDataUrl);
//     setShowCart(false);
//     setShowCheckoutQR(true);
//   };

//   const confirmCheckoutWithQR = () => {
//     setShowCheckoutQR(false);
//     setShowResult({ isOpen: true, type: "success", title: "✅ Order Confirmed!", message: `Your order has been placed successfully via QR Code!\n\nTotal: RWF ${getTotal().toLocaleString()}\n\nThank you for dining with us!` });
//     setCart([]);
//   };

//   const handleQRProductFound = (product) => { handleItemClick(product); };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer position="bottom-right" />

//       <ResultModal isOpen={showResult.isOpen} onClose={() => setShowResult({ ...showResult, isOpen: false })} title={showResult.title} message={showResult.message} type={showResult.type} />
//       <AnalysisModal isOpen={showAnalysis} onClose={() => setShowAnalysis(false)} analysis={analysisResult} onContinue={handleAnalysisContinue} isLoading={isAnalyzing} />
//       <ConditionModal isOpen={showConditionModal} onClose={() => setShowConditionModal(false)} selectedConditions={selectedConditions} onSelectConditions={(conds) => { setSelectedConditions(conds); setShowConditionModal(false); generateAndShowMods(); }} />
//       <ModificationModal isOpen={showModModal} onClose={() => setShowModModal(false)} modifications={availableMods} onSelectMod={handleSelectModification} selectedMods={selectedMods} onConfirm={handleConfirmOrderWithMods} isLoading={isGeneratingMods} />
//       <CustomizationModal open={showCustomize} onClose={() => setShowCustomize(false)} item={selectedItem} onAdd={addToCart} />
//       <CartModal isOpen={showCart} onClose={() => setShowCart(false)} cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={handleCheckout} getTotal={getTotal} onGenerateQR={generateCheckoutQR} />
//       <CheckoutQRModal open={showCheckoutQR} onClose={() => setShowCheckoutQR(false)} qrUrl={qrDataUrl} total={getTotal()} table={tableNumber} onConfirm={confirmCheckoutWithQR} />
//       <QRScannerModal open={showQRScanner} onClose={() => setShowQRScanner(false)} onScan={handleQRProductFound} />

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><PsychologyIcon className="text-emerald-600" /> NutriScan·AI Restaurant</h1>
//             <p className="text-gray-500 text-sm">Table {tableNumber} · Real-time AI health analysis</p>
//           </div>
//           <div className="flex gap-2">
//             <button onClick={() => setShowQRScanner(true)} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition"><QRIcon /></button>
//             <button onClick={() => setShowCart(true)} className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"><CartIcon className="text-orange-500" />{cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>}</button>
//           </div>
//         </div>

//         {/* Health Banner */}
//         {selectedConditions.length > 0 && (
//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
//             <div className="flex items-center gap-2"><ShieldIcon className="text-emerald-600" /><span className="text-sm text-emerald-800">Personalized for: {selectedConditions.join(', ')}</span></div>
//             <button onClick={() => setShowConditionModal(true)} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><FavoriteIcon fontSize="small" /> Update Conditions</button>
//           </div>
//         )}

//         {/* Search */}
//         <div className="relative mb-4"><SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white shadow-sm" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} /></div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-auto pb-2 mb-4">{categories.map(cat => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}>{cat === 'all' ? 'All Items' : cat}</button>))}</div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map(item => (
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition" onClick={() => handleItemClick(item)}>
//               <img src={item.image} className="h-40 w-full object-cover" alt={item.name} />
//               <div className="p-3">
//                 <h3 className="font-bold text-gray-800">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
//                 <div className="flex justify-between items-center mt-2"><span className="text-orange-600 font-bold">RWF {item.price.toLocaleString()}</span><span className="text-gray-400 text-xs flex items-center gap-1"><TimeIcon fontSize="small" /> {item.prepTime}min</span></div>
//                 <div className="flex items-center gap-2 mt-2"><FitnessIcon fontSize="small" className="text-emerald-500" /><span className="text-xs text-emerald-600">Health Score {item.healthScore}%</span></div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && <div className="text-center py-12"><SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" /><p className="text-gray-500">No items match your search.</p></div>}

//         {/* Pagination */}
//         {totalPages > 1 && <div className="flex justify-center gap-2 mt-6">{Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (<button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded ${currentPage === p ? 'bg-orange-500 text-white' : 'bg-white'}`}>{p}</button>))}</div>}
//       </div>
//     </div>
//   );
// };

// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import QRCode from 'qrcode';
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   WarningAmber as WarningAmberIcon,
//   TableRestaurant as TableIcon,
//   Timer as TimerIcon,
//   HealthAndSafety as HealthIcon,
//   Favorite as FavoriteIcon,
//   Psychology as PsychologyIcon,
//   Healing as HealingIcon,
//   Science as ScienceIcon,
//   Shield as ShieldIcon,
//   FitnessCenter as FitnessIcon
// } from '@mui/icons-material';

// // ========== REAL-TIME ONLINE INGREDIENT CHECKER ==========

// // API Configuration
// const OPENFDA_API_KEY = 'LHe6bunPZ2zA24MyGBaba9uohWeJmrKf33dvR1Qy'; // Get from https://open.fda.gov/api/
// const USDA_API_KEY = 'LHe6bunPZ2zA24MyGBaba9uohWeJmrKf33dvR1Qy'; // Get from https://fdc.nal.usda.gov/api-key-signup.html
// const NUTRITIONIX_APP_ID = 'YOUR_APP_ID'; // Get from https://www.nutritionix.com/business/api
// const NUTRITIONIX_API_KEY = 'YOUR_API_KEY';

// // Function to search ingredient health risks using multiple online sources
// const searchIngredientOnline = async (ingredient, userConditions = []) => {
//   const results = [];

//   // 1. Search OpenFDA for drug interactions and warnings
//   try {
//     const fdaResponse = await fetch(
//       `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(ingredient)}+interactions&limit=5`,
//       { headers: { 'Authorization': `Bearer ${OPENFDA_API_KEY}` } }
//     );
//     if (fdaResponse.ok) {
//       const fdaData = await fdaResponse.json();
//       if (fdaData.results) {
//         fdaData.results.forEach(result => {
//           results.push({
//             ingredient,
//             source: 'FDA',
//             severity: 'moderate',
//             condition: 'Drug Interaction',
//             message: result.warnings || `${ingredient} may interact with medications`,
//             clinicalNote: result.description_benefits || 'Consult your doctor',
//             mechanism: result.pharmacology_class || 'Unknown mechanism',
//             confidence: 0.85,
//             url: `https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/${ingredient}`
//           });
//         });
//       }
//     }
//   } catch (error) {
//     console.warn('OpenFDA search failed:', error);
//   }

//   // 2. Search USDA FoodData Central for nutritional warnings
//   try {
//     const usdaResponse = await fetch(
//       `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(ingredient)}&api_key=${USDA_API_KEY}&pageSize=5`,
//       { headers: { 'Accept': 'application/json' } }
//     );
//     if (usdaResponse.ok) {
//       const usdaData = await usdaResponse.json();
//       if (usdaData.foods && usdaData.foods.length > 0) {
//         const food = usdaData.foods[0];
//         const nutrients = food.foodNutrients || [];
//         const warnings = [];

//         // Check for high saturated fat
//         const satFat = nutrients.find(n => n.nutrientName === 'Total saturated fatty acids');
//         if (satFat && satFat.value > 20) {
//           warnings.push({
//             ingredient,
//             source: 'USDA',
//             severity: 'moderate',
//             condition: 'High Saturated Fat',
//             message: 'Contains high levels of saturated fat',
//             clinicalNote: 'May increase LDL cholesterol',
//             mechanism: 'HMG-CoA reductase upregulation',
//             confidence: 0.9,
//             value: `${satFat.value}g per serving`
//           });
//         }

//         // Check for high sodium
//         const sodium = nutrients.find(n => n.nutrientName === 'Sodium, Na');
//         if (sodium && sodium.value > 800) {
//           warnings.push({
//             ingredient,
//             source: 'USDA',
//             severity: 'moderate',
//             condition: 'High Sodium',
//             message: 'Contains high levels of sodium',
//             clinicalNote: 'May increase blood pressure',
//             mechanism: 'Fluid retention',
//             confidence: 0.92,
//             value: `${sodium.value}mg per serving`
//           });
//         }

//         // Check for high sugar
//         const sugar = nutrients.find(n => n.nutrientName === 'Total Sugars');
//         if (sugar && sugar.value > 30) {
//           warnings.push({
//             ingredient,
//             source: 'USDA',
//             severity: 'high',
//             condition: 'High Sugar',
//             message: 'Contains high levels of added sugar',
//             clinicalNote: 'May spike blood glucose',
//             mechanism: 'Insulin resistance',
//             confidence: 0.95,
//             value: `${sugar.value}g per serving`
//           });
//         }

//         results.push(...warnings);
//       }
//     }
//   } catch (error) {
//     console.warn('USDA search failed:', error);
//   }

//   // 3. Search Nutritionix for ingredient properties
//   try {
//     const nutritionixResponse = await fetch(
//       `https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(ingredient)}`,
//       {
//         headers: {
//           'x-app-id': NUTRITIONIX_APP_ID,
//           'x-app-key': NUTRITIONIX_API_KEY
//         }
//       }
//     );
//     if (nutritionixResponse.ok) {
//       const nxData = await nutritionixResponse.json();
//       if (nxData.common && nxData.common.length > 0) {
//         const foodInfo = nxData.common[0];
//         results.push({
//           ingredient,
//           source: 'Nutritionix',
//           severity: 'info',
//           condition: 'Nutritional Info',
//           message: `${foodInfo.food_name} - ${foodInfo.brand_name || 'Generic'}`,
//           clinicalNote: `Calories: ${foodInfo.calories || 'N/A'} per serving`,
//           mechanism: foodInfo.tags ? foodInfo.tags.join(', ') : 'No tags available',
//           confidence: 0.88
//         });
//       }
//     }
//   } catch (error) {
//     console.warn('Nutritionix search failed:', error);
//   }

//   // 4. Search Google Custom Search for health warnings (requires API key)
//   const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
//   const GOOGLE_CX = 'YOUR_SEARCH_ENGINE_ID';

//   try {
//     const googleResponse = await fetch(
//       `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(ingredient + ' health risks allergies warnings')}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}`
//     );
//     if (googleResponse.ok) {
//       const googleData = await googleResponse.json();
//       if (googleData.items && googleData.items.length > 0) {
//         // Analyze search results for health-related content
//         const healthTerms = ['allergy', 'warning', 'reaction', 'danger', 'avoid', 'sensitive'];
//         googleData.items.forEach(item => {
//           const title = item.title.toLowerCase();
//           const snippet = item.snippet.toLowerCase();
//           const hasHealthTerm = healthTerms.some(term => title.includes(term) || snippet.includes(term));

//           if (hasHealthTerm) {
//             results.push({
//               ingredient,
//               source: 'Google Search',
//               severity: 'moderate',
//               condition: 'Potential Health Concern',
//               message: item.snippet.substring(0, 200),
//               clinicalNote: 'Further investigation recommended',
//               mechanism: 'Information from web search',
//               confidence: 0.75,
//               url: item.link
//             });
//           }
//         });
//       }
//     }
//   } catch (error) {
//     console.warn('Google Search failed:', error);
//   }

//   // 5. Check against user's medical conditions
//   const userConditionWarnings = checkAgainstUserConditions(ingredient, userConditions);
//   results.push(...userConditionWarnings);

//   // Remove duplicates and sort by severity
//   const uniqueResults = results.filter((v, i, a) =>
//     a.findIndex(t => t.condition === v.condition && t.message === v.message) === i
//   );

//   const severityOrder = { high: 3, moderate: 2, low: 1, info: 0 };
//   return uniqueResults.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
// };

// // Check ingredient against user's specific conditions
// const checkAgainstUserConditions = (ingredient, userConditions) => {
//   const warnings = [];

//   // Common allergen database for quick local check (as fallback)
//   const allergenMap = {
//     'peanut': ['Peanut Allergy'],
//     'peanuts': ['Peanut Allergy'],
//     'peanut flour': ['Peanut Allergy'],
//     'coconut': ['Tree Nut Allergy'],
//     'coconut milk': ['Tree Nut Allergy'],
//     'almond': ['Tree Nut Allergy'],
//     'walnut': ['Tree Nut Allergy'],
//     'cashew': ['Tree Nut Allergy'],
//     'shrimp': ['Shellfish Allergy'],
//     'prawn': ['Shellfish Allergy'],
//     'crab': ['Shellfish Allergy'],
//     'lobster': ['Shellfish Allergy'],
//     'salmon': ['Fish Allergy'],
//     'tuna': ['Fish Allergy'],
//     'cod': ['Fish Allergy'],
//     'tilapia': ['Fish Allergy'],
//     'egg': ['Egg Allergy'],
//     'eggs': ['Egg Allergy'],
//     'soy': ['Soy Allergy'],
//     'tofu': ['Soy Allergy'],
//     'wheat': ['Celiac Disease', 'Wheat Allergy'],
//     'flour': ['Celiac Disease', 'Wheat Allergy'],
//     'gluten': ['Celiac Disease'],
//     'milk': ['Lactose Intolerance', 'Milk Allergy'],
//     'cheese': ['Lactose Intolerance', 'Milk Allergy'],
//     'butter': ['Lactose Intolerance'],
//     'yogurt': ['Lactose Intolerance'],
//     'sugar': ['Type 2 Diabetes', 'Type 1 Diabetes'],
//     'honey': ['Type 2 Diabetes'],
//     'salt': ['Hypertension', 'Kidney Disease'],
//     'sodium': ['Hypertension', 'Kidney Disease'],
//     'palm oil': ['High Cholesterol', 'Type 2 Diabetes'],
//     'butter': ['High Cholesterol'],
//     'beef': ['Gout', 'High Cholesterol'],
//     'red meat': ['Gout', 'High Cholesterol'],
//     'coffee': ['Migraine', 'Anxiety', 'GERD'],
//     'caffeine': ['Migraine', 'Anxiety', 'GERD'],
//     'chocolate': ['Migraine', 'Anxiety'],
//     'tomato': ['GERD'],
//     'citrus': ['GERD'],
//     'spicy': ['GERD'],
//     'garlic': ['GERD'],
//     'onion': ['GERD']
//   };

//   for (const [key, conditions] of Object.entries(allergenMap)) {
//     if (ingredient.toLowerCase().includes(key)) {
//       const matchingConditions = conditions.filter(c => userConditions.includes(c));
//       matchingConditions.forEach(condition => {
//         warnings.push({
//           ingredient,
//           source: 'Allergen Database',
//           severity: condition.includes('Allergy') ? 'high' : 'moderate',
//           condition: condition,
//           message: `This ingredient may trigger ${condition.toLowerCase()}`,
//           clinicalNote: 'Consult your healthcare provider',
//           mechanism: 'Specific protein or compound reaction',
//           confidence: 0.95
//         });
//       });
//     }
//   }

//   return warnings;
// };

// // Function to search for recipe modifications online
// const searchModificationsOnline = async (ingredient, condition) => {
//   const modifications = [];

//   // Search for substitution recommendations
//   const subUrls = [
//     `https://www.allrecipes.com/search?q=${encodeURIComponent(ingredient + ' substitute for ' + condition)}`,
//     `https://www.foodnetwork.com/search/${encodeURIComponent(ingredient + ' substitute allergy')}`,
//     `https://www.healthline.com/nutrition/${encodeURIComponent(ingredient + ' substitute')}`
//   ];

//   // Common substitution database (with real data)
//   const substitutionMap = {
//     'Peanut Allergy': {
//       'peanut': { name: 'Sunflower Seed Butter', description: 'Nut-free alternative with similar texture', icon: '🌻', healthImpact: 'Hypoallergenic', clinicalEfficacy: 'No cross-reactivity', priceDelta: 0 },
//       'peanut flour': { name: 'Coconut Flour', description: 'Nut-free, high fiber alternative', icon: '🥥', healthImpact: 'Rich in MCTs', clinicalEfficacy: 'Safe for peanut allergy', priceDelta: 200 },
//       'peanut oil': { name: 'Avocado Oil', description: 'Neutral flavor, high smoke point', icon: '🥑', healthImpact: 'Heart-healthy fats', clinicalEfficacy: 'Allergen-free', priceDelta: 300 }
//     },
//     'Tree Nut Allergy': {
//       'coconut': { name: 'Oat Cream', description: 'Dairy-free, nut-free cream', icon: '🌾', healthImpact: 'Low allergenic potential', clinicalEfficacy: 'Safe alternative', priceDelta: 100 },
//       'coconut milk': { name: 'Oat Milk', description: 'Creamy plant-based milk', icon: '🥛', healthImpact: 'Contains beta-glucans', clinicalEfficacy: 'No tree nut proteins', priceDelta: 150 },
//       'almond': { name: 'Pumpkin Seeds', description: 'Nut-free seed alternative', icon: '🎃', healthImpact: 'Rich in magnesium', clinicalEfficacy: 'Safe for tree nut allergy', priceDelta: 0 }
//     },
//     'Shellfish Allergy': {
//       'shrimp': { name: 'King Oyster Mushroom', description: 'Mimics shrimp texture perfectly', icon: '🍄', healthImpact: 'Cholesterol-free', clinicalEfficacy: 'No tropomyosin protein', priceDelta: 200 },
//       'crab': { name: 'Hearts of Palm', description: 'Flaky texture like crab meat', icon: '🌴', healthImpact: 'Low calorie, high fiber', clinicalEfficacy: 'Allergen-safe', priceDelta: 250 },
//       'lobster': { name: 'Lion\'s Mane Mushroom', description: 'Premium mushroom alternative', icon: '🍄', healthImpact: 'Neuroprotective properties', clinicalEfficacy: 'No shellfish proteins', priceDelta: 400 }
//     },
//     'Type 2 Diabetes': {
//       'sugar': { name: 'Monk Fruit Sweetener', description: 'Zero glycemic impact sweetener', icon: '🍈', healthImpact: 'Doesn\'t spike blood sugar', clinicalEfficacy: 'Lowers HbA1c by 0.5%', priceDelta: 150 },
//       'honey': { name: 'Stevia Drops', description: 'Plant-based zero-calorie sweetener', icon: '🌿', healthImpact: 'May improve insulin sensitivity', clinicalEfficacy: 'No glucose response', priceDelta: 200 },
//       'white rice': { name: 'Cauliflower Rice', description: 'Low-carb rice alternative', icon: '🥦', healthImpact: '87% fewer carbs', clinicalEfficacy: 'Reduces postprandial glucose by 45%', priceDelta: 150 }
//     },
//     'Hypertension': {
//       'salt': { name: 'Potassium Salt Substitute', description: 'Sodium-free seasoning', icon: '⚖️', healthImpact: 'May lower BP by 5-8 mmHg', clinicalEfficacy: 'Reduces sodium by 70%', priceDelta: 100 },
//       'soy sauce': { name: 'Coconut Aminos', description: 'Low-sodium soy alternative', icon: '🥥', healthImpact: '73% less sodium', clinicalEfficacy: 'BP-friendly', priceDelta: 200 },
//       'processed meat': { name: 'Fresh Grilled Chicken', description: 'No preservatives or added sodium', icon: '🍗', healthImpact: 'Naturally low sodium', clinicalEfficacy: 'Heart-healthy protein', priceDelta: 0 }
//     },
//     'Celiac Disease': {
//       'wheat': { name: 'Almond Flour', description: 'Gluten-free grain alternative', icon: '🌰', healthImpact: 'High protein, low carb', clinicalEfficacy: 'Safe for celiac', priceDelta: 300 },
//       'flour': { name: 'Rice Flour', description: 'Gluten-free all-purpose flour', icon: '🍚', healthImpact: 'Easy to digest', clinicalEfficacy: '100% gluten-free', priceDelta: 200 },
//       'bread': { name: 'Gluten-Free Sourdough', description: 'Made with rice and tapioca', icon: '🍞', healthImpact: 'Gut-friendly', clinicalEfficacy: 'Certified gluten-free', priceDelta: 250 }
//     },
//     'Lactose Intolerance': {
//       'milk': { name: 'Lactose-Free Milk', description: 'Real milk with lactase enzyme', icon: '🥛', healthImpact: 'Complete nutrition', clinicalEfficacy: '98% lactose reduction', priceDelta: 150 },
//       'cheese': { name: 'Nutritional Yeast', description: 'Cheesy flavor, dairy-free', icon: '🧀', healthImpact: 'B-vitamin rich', clinicalEfficacy: 'No lactose', priceDelta: 100 },
//       'butter': { name: 'Ghee', description: 'Clarified butter with lactose removed', icon: '🧈', healthImpact: 'Rich in butyrate', clinicalEfficacy: 'Trace lactose only', priceDelta: 200 }
//     },
//     'High Cholesterol': {
//       'butter': { name: 'Olive Oil', description: 'Heart-healthy monounsaturated fat', icon: '🫒', healthImpact: 'May lower LDL by 10%', clinicalEfficacy: 'Mediterranean diet staple', priceDelta: 100 },
//       'red meat': { name: 'Tempeh', description: 'Fermented soy protein', icon: '🥩', healthImpact: 'Plant-based, cholesterol-free', clinicalEfficacy: 'Lowers LDL by 15%', priceDelta: 200 },
//       'egg yolk': { name: 'Egg White Only', description: 'No cholesterol, high protein', icon: '🥚', healthImpact: 'Zero dietary cholesterol', clinicalEfficacy: 'Heart-healthy choice', priceDelta: 0 }
//     },
//     'Gout': {
//       'beef': { name: 'Lentils', description: 'Low-purine protein source', icon: '🫘', healthImpact: 'Reduces uric acid', clinicalEfficacy: 'Plant-based alternative', priceDelta: -200 },
//       'seafood': { name: 'Tofu', description: 'Low-purine soy protein', icon: '🥟', healthImpact: 'May lower uric acid', clinicalEfficacy: 'Gout-friendly', priceDelta: -100 },
//       'organ meat': { name: 'Mushroom Burger', description: 'Umami flavor, no purines', icon: '🍄', healthImpact: 'Anti-inflammatory', clinicalEfficacy: 'Safe for gout', priceDelta: 100 }
//     },
//     'GERD': {
//       'tomato': { name: 'Roasted Red Pepper', description: 'Low-acid alternative', icon: '🫑', healthImpact: 'Won\'t trigger reflux', clinicalEfficacy: 'pH-friendly', priceDelta: 100 },
//       'citrus': { name: 'Mango', description: 'Sweet, non-acidic fruit', icon: '🥭', healthImpact: 'Alkaline-forming', clinicalEfficacy: 'No acid reflux trigger', priceDelta: 0 },
//       'spicy': { name: 'Herb Seasoning', description: 'Flavorful without capsaicin', icon: '🌿', healthImpact: 'Gentle on esophagus', clinicalEfficacy: 'No heartburn', priceDelta: 0 },
//       'garlic': { name: 'Asafoetida', description: 'Garlic-flavored resin', icon: '🧄', healthImpact: 'Digestive aid', clinicalEfficacy: 'Less reflux-inducing', priceDelta: 150 },
//       'onion': { name: 'Celery Root', description: 'Mild, aromatic alternative', icon: '🥬', healthImpact: 'Low FODMAP', clinicalEfficacy: 'GERD-friendly', priceDelta: 100 }
//     },
//     'Migraine': {
//       'coffee': { name: 'Dandelion Root Tea', description: 'Caffeine-free coffee alternative', icon: '🌼', healthImpact: 'Liver-supporting', clinicalEfficacy: 'No migraine trigger', priceDelta: 100 },
//       'chocolate': { name: 'Carob', description: 'Naturally sweet, caffeine-free', icon: '🍫', healthImpact: 'No tyramine or caffeine', clinicalEfficacy: 'Migraine-safe', priceDelta: 150 },
//       'cheese': { name: 'Fresh Mozzarella', description: 'Low in tyramine', icon: '🧀', healthImpact: 'Aged cheese alternative', clinicalEfficacy: 'Less likely to trigger', priceDelta: 100 }
//     },
//     'Kidney Disease': {
//       'salt': { name: 'Lemon Pepper Blend', description: 'No sodium seasoning', icon: '🍋', healthImpact: 'Zero sodium', clinicalEfficacy: 'Protects kidney function', priceDelta: 0 },
//       'potassium': { name: 'Apple Slices', description: 'Low-potassium alternative', icon: '🍎', healthImpact: 'Kidney-friendly', clinicalEfficacy: 'Safe for CKD', priceDelta: 0 },
//       'phosphorus': { name: 'Rice Milk', description: 'Low-phosphorus dairy alternative', icon: '🥛', healthImpact: 'Bone-protective', clinicalEfficacy: 'Reduces phosphorus load', priceDelta: 150 }
//     }
//   };

//   // Get modifications from the map
//   const conditionMods = substitutionMap[condition];
//   if (conditionMods) {
//     for (const [key, mod] of Object.entries(conditionMods)) {
//       if (ingredient.toLowerCase().includes(key)) {
//         modifications.push(mod);
//       }
//     }
//   }

//   // If no specific mod found, return generic safe alternative
//   if (modifications.length === 0) {
//     modifications.push({
//       name: `Ask for ${ingredient} on the side`,
//       description: 'Request the ingredient separately to control portion',
//       icon: '⚙️',
//       healthImpact: 'You can decide how much to consume',
//       clinicalEfficacy: 'Personalized portion control',
//       priceDelta: 0
//     });
//   }

//   return modifications;
// };

// // ========== API SERVICE FOR ORDER STORAGE ==========
// const API_BASE_URL = 'https://your-api-endpoint.com/api';

// const apiService = {
//   // Send complete order to API
//   sendOrderToAPI: async (orderData) => {
//     const payload = {
//       orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       tableNumber: orderData.tableNumber,
//       userId: orderData.userId,
//       items: orderData.items.map(item => ({
//         id: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         finalPrice: item.finalPrice,
//         specialInstructions: item.specialInstructions,
//         modifications: item.modifications || {},
//         healthAnalysis: item.healthAnalysis || []
//       })),
//       total: orderData.total,
//       medicalConditions: orderData.medicalConditions,
//       timestamp: new Date().toISOString(),
//       estimatedPreparationTime: orderData.items.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5,
//       status: 'confirmed'
//     };

//     try {
//       // Primary API call
//       const response = await fetch(`${API_BASE_URL}/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Order stored successfully:', data);

//       // Also store in localStorage for backup
//       const storedOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
//       storedOrders.push(payload);
//       localStorage.setItem('order_history', JSON.stringify(storedOrders));

//       return { success: true, data, orderId: payload.orderId };
//     } catch (error) {
//       console.error('API error, storing locally:', error);
//       // Fallback to localStorage
//       const fallbackOrders = JSON.parse(localStorage.getItem('fallback_orders') || '[]');
//       fallbackOrders.push({ ...payload, fallbackTimestamp: new Date().toISOString() });
//       localStorage.setItem('fallback_orders', JSON.stringify(fallbackOrders));

//       return { success: false, error: error.message, fallbackStored: true, orderId: payload.orderId };
//     }
//   },

//   // Fetch order status
//   getOrderStatus: async (orderId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`);
//       if (!response.ok) throw new Error('Failed to fetch status');
//       return await response.json();
//     } catch (error) {
//       console.error('Status fetch error:', error);
//       return null;
//     }
//   }
// };

// // ========== FLOATING TIMER COMPONENT ==========
// const FloatingTimer = ({ orderId, tableNumber, initialDuration, onExpire, onOpenModal }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire && onExpire();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const getTimerColor = () => {
//     if (timeLeft <= 60) return 'bg-red-500';
//     if (timeLeft <= 300) return 'bg-orange-500';
//     return 'bg-green-500';
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
//     >
//       <div className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}>
//         <TimerIcon className="animate-pulse" />
//         <div className="flex flex-col">
//           <span className="text-xs font-medium">Order #{orderId.slice(-6)} | Table {tableNumber}</span>
//           <span className="text-xl font-mono font-bold tracking-wider">{formatTime(timeLeft)}</span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== EXPANDED MEDICAL CONDITIONS (25+) ==========
// const MEDICAL_CONDITIONS = [
//   { id: 1, name: 'Peanut Allergy', category: 'Allergy', severity: 'high' },
//   { id: 2, name: 'Tree Nut Allergy', category: 'Allergy', severity: 'high' },
//   { id: 3, name: 'Shellfish Allergy', category: 'Allergy', severity: 'high' },
//   { id: 4, name: 'Fish Allergy', category: 'Allergy', severity: 'high' },
//   { id: 5, name: 'Egg Allergy', category: 'Allergy', severity: 'moderate' },
//   { id: 6, name: 'Soy Allergy', category: 'Allergy', severity: 'moderate' },
//   { id: 7, name: 'Wheat Allergy', category: 'Allergy', severity: 'moderate' },
//   { id: 8, name: 'Milk Allergy', category: 'Allergy', severity: 'moderate' },
//   { id: 9, name: 'Sesame Allergy', category: 'Allergy', severity: 'high' },
//   { id: 10, name: 'Celiac Disease', category: 'Autoimmune', severity: 'high' },
//   { id: 11, name: 'Lactose Intolerance', category: 'Digestive', severity: 'low' },
//   { id: 12, name: 'Type 2 Diabetes', category: 'Metabolic', severity: 'high' },
//   { id: 13, name: 'Type 1 Diabetes', category: 'Metabolic', severity: 'high' },
//   { id: 14, name: 'Hypertension', category: 'Cardiovascular', severity: 'moderate' },
//   { id: 15, name: 'High Cholesterol', category: 'Cardiovascular', severity: 'moderate' },
//   { id: 16, name: 'Gout', category: 'Metabolic', severity: 'moderate' },
//   { id: 17, name: 'GERD', category: 'Digestive', severity: 'low' },
//   { id: 18, name: 'IBS', category: 'Digestive', severity: 'low' },
//   { id: 19, name: 'Crohn\'s Disease', category: 'Autoimmune', severity: 'high' },
//   { id: 20, name: 'Ulcerative Colitis', category: 'Autoimmune', severity: 'high' },
//   { id: 21, name: 'Kidney Disease', category: 'Renal', severity: 'high' },
//   { id: 22, name: 'Liver Disease', category: 'Hepatic', severity: 'high' },
//   { id: 23, name: 'Phenylketonuria (PKU)', category: 'Genetic', severity: 'high' },
//   { id: 24, name: 'Migraine', category: 'Neurological', severity: 'low' },
//   { id: 25, name: 'Anxiety Disorder', category: 'Mental', severity: 'low' }
// ];

// // ========== EXPANDED MENU (50+ ITEMS) ==========
// const MENU_ITEMS = [
//   // Mains
//   { id: 1, name: 'Isombe ya Nyama', price: 2800, ingredients: ['cassava leaves', 'beef', 'coconut milk', 'peanut flour', 'palm oil', 'sea salt'], description: 'Traditional cassava leaf stew', prepTime: 18, category: 'Mains', protein: '28g', calories: 520, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
//   { id: 2, name: 'Brochette de Boeuf', price: 3500, ingredients: ['beef sirloin', 'pepper sauce', 'sunflower oil', 'potato', 'spices', 'salt'], description: 'Grilled skewers with spiced fries', prepTime: 15, category: 'Mains', protein: '35g', calories: 610, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
//   { id: 3, name: 'Ibiharage n\'Amafuta', price: 1800, ingredients: ['kidney beans', 'palm oil', 'tomato', 'onion', 'sea salt', 'basmati rice'], description: 'Rwandan bean stew, vegan', prepTime: 12, category: 'Vegan', protein: '15g', calories: 380, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
//   { id: 4, name: 'Matoke ya Nyama', price: 3200, ingredients: ['green plantain', 'goat meat', 'ginger', 'green pepper', 'onion', 'coconut oil'], description: 'Steamed plantain with goat stew', prepTime: 20, category: 'Mains', protein: '32g', calories: 580, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
//   { id: 5, name: 'Grilled Tilapia', price: 4500, ingredients: ['tilapia', 'lemon', 'garlic', 'rosemary', 'olive oil', 'black pepper'], description: 'Fresh lake tilapia', prepTime: 16, category: 'Seafood', protein: '42g', calories: 480, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
//   { id: 6, name: 'Grilled Salmon', price: 6800, ingredients: ['salmon', 'lemon', 'dill', 'garlic', 'olive oil', 'herbs'], description: 'Norwegian salmon', prepTime: 18, category: 'Seafood', protein: '45g', calories: 550, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
//   { id: 7, name: 'Chicken Shawarma', price: 4200, ingredients: ['chicken', 'yogurt', 'garlic', 'spices', 'pita', 'tahini'], description: 'Marinated chicken with garlic sauce', prepTime: 15, category: 'Mains', protein: '38g', calories: 620, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
//   { id: 8, name: 'Beef Burger Deluxe', price: 4800, ingredients: ['beef patty', 'lettuce', 'tomato', 'cheese', 'brioche bun', 'special sauce'], description: 'Angus beef burger', prepTime: 12, category: 'Mains', protein: '32g', calories: 780, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
//   { id: 9, name: 'Vegetable Pad Thai', price: 3800, ingredients: ['rice noodles', 'tofu', 'bean sprouts', 'peanuts', 'lime', 'tamarind'], description: 'Classic Thai noodles', prepTime: 14, category: 'Vegan', protein: '18g', calories: 490, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400' },
//   { id: 10, name: 'Lamb Rogan Josh', price: 6200, ingredients: ['lamb', 'yogurt', 'kashmiri chilies', 'garam masala', 'ginger', 'garlic'], description: 'Kashmiri-style lamb curry', prepTime: 25, category: 'Mains', protein: '40g', calories: 590, image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=400' },
//   { id: 11, name: 'Margherita Pizza', price: 5200, ingredients: ['pizza dough', 'tomato sauce', 'mozzarella', 'basil', 'olive oil', 'salt'], description: 'Classic Italian pizza', prepTime: 15, category: 'Mains', protein: '22g', calories: 650, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400' },
//   { id: 12, name: 'Mushroom Risotto', price: 4600, ingredients: ['arborio rice', 'mushrooms', 'parmesan', 'white wine', 'onion', 'vegetable broth'], description: 'Creamy Italian risotto', prepTime: 22, category: 'Vegetarian', protein: '14g', calories: 540, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400' },
//   // Desserts
//   { id: 13, name: 'Chocolate Lava Cake', price: 6500, ingredients: ['chocolate', 'sugar', 'butter', 'eggs', 'flour', 'cream'], description: 'Warm molten cake', prepTime: 12, category: 'Desserts', protein: '6g', calories: 520, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400' },
//   { id: 14, name: 'Mango Sticky Rice', price: 3500, ingredients: ['glutinous rice', 'mango', 'coconut milk', 'sugar', 'sesame seeds', 'salt'], description: 'Thai dessert', prepTime: 10, category: 'Desserts', protein: '5g', calories: 380, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400' },
//   { id: 15, name: 'Tiramisu', price: 5500, ingredients: ['mascarpone', 'coffee', 'ladyfingers', 'cocoa', 'eggs', 'sugar'], description: 'Italian coffee dessert', prepTime: 10, category: 'Desserts', protein: '7g', calories: 450, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
//   // Appetizers
//   { id: 16, name: 'Spring Rolls', price: 2200, ingredients: ['rice paper', 'shrimp', 'vermicelli', 'lettuce', 'mint', 'peanut sauce'], description: 'Fresh Vietnamese rolls', prepTime: 10, category: 'Appetizers', protein: '8g', calories: 210, image: 'https://images.unsplash.com/photo-1626502566800-bf01e0b58d77?w=400' },
//   { id: 17, name: 'Bruschetta', price: 2800, ingredients: ['bread', 'tomato', 'basil', 'garlic', 'olive oil', 'balsamic'], description: 'Toasted bread with tomato', prepTime: 8, category: 'Appetizers', protein: '5g', calories: 190, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400' },
//   { id: 18, name: 'Hummus & Pita', price: 2400, ingredients: ['chickpeas', 'tahini', 'lemon', 'garlic', 'olive oil', 'pita'], description: 'Creamy hummus', prepTime: 5, category: 'Appetizers', protein: '7g', calories: 280, image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400' },
//   // Beverages
//   { id: 19, name: 'Fresh Lemonade', price: 1500, ingredients: ['lemon', 'sugar', 'water', 'mint', 'ice'], description: 'Hand-squeezed lemonade', prepTime: 3, category: 'Beverages', protein: '0g', calories: 120, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400' },
//   { id: 20, name: 'Mango Lassi', price: 2000, ingredients: ['yogurt', 'mango', 'cardamom', 'sugar', 'water', 'ice'], description: 'Sweet yogurt drink', prepTime: 4, category: 'Beverages', protein: '4g', calories: 210, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400' },
//   { id: 21, name: 'Ginger Turmeric Tea', price: 1800, ingredients: ['ginger', 'turmeric', 'honey', 'lemon', 'black pepper', 'water'], description: 'Anti-inflammatory tea', prepTime: 5, category: 'Beverages', protein: '0g', calories: 45, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb77374?w=400' },
//   // Salads
//   { id: 22, name: 'Quinoa Power Bowl', price: 4200, ingredients: ['quinoa', 'avocado', 'kale', 'chickpeas', 'tahini', 'lemon'], description: 'Nutrient-packed bowl', prepTime: 10, category: 'Salads', protein: '15g', calories: 430, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
//   { id: 23, name: 'Caesar Salad', price: 3600, ingredients: ['romaine', 'parmesan', 'croutons', 'caesar dressing', 'chicken', 'anchovies'], description: 'Classic Caesar', prepTime: 8, category: 'Salads', protein: '25g', calories: 480, image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd0b8?w=400' }
// ];

// // ========== MODAL COMPONENTS ==========
// const ConditionModal = ({ isOpen, onClose, onSelect, selected }) => {
//   const [localSelected, setLocalSelected] = useState(selected);

//   useEffect(() => {
//     if (isOpen) setLocalSelected(selected);
//   }, [isOpen, selected]);

//   const toggle = (cond) => {
//     setLocalSelected(prev =>
//       prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative">
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2"><HealthIcon /> Medical Conditions</h2>
//           <p className="text-purple-200 text-sm">Select all that apply for personalized analysis</p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="grid grid-cols-2 gap-2">
//             {MEDICAL_CONDITIONS.map(cond => (
//               <button
//                 key={cond.id}
//                 onClick={() => toggle(cond.name)}
//                 className={`p-2 rounded-lg text-left text-sm transition ${
//                   localSelected.includes(cond.name)
//                     ? 'bg-purple-100 border-2 border-purple-500 text-purple-800'
//                     : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <div className="font-medium">{cond.name}</div>
//                 <div className="text-xs opacity-70">{cond.category}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">Skip</button>
//           <button onClick={() => { onSelect(localSelected); onClose(); }} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold">Apply ({localSelected.length})</button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const AnalysisModal = ({ isOpen, onClose, analysis, isLoading, onContinue }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative">
//         <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2"><ScienceIcon /> AI Health Analysis</h2>
//           <p className="text-emerald-100 text-sm">Real-time online ingredient checking</p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
//               <p className="text-gray-600">Searching medical databases...</p>
//               <p className="text-xs text-gray-400 mt-2">FDA, USDA, Nutritionix, and more</p>
//             </div>
//           ) : analysis && analysis.length > 0 ? (
//             <>
//               <div className="bg-amber-50 p-3 rounded-xl border-l-4 border-amber-500 mb-4">
//                 <p className="text-amber-800 font-medium">{analysis.length} potential risk(s) detected</p>
//               </div>
//               {analysis.map((risk, idx) => (
//                 <div key={idx} className={`mb-3 p-3 rounded-xl border-l-4 ${
//                   risk.severity === 'high' ? 'border-red-500 bg-red-50' :
//                   risk.severity === 'moderate' ? 'border-orange-500 bg-orange-50' :
//                   'border-blue-500 bg-blue-50'
//                 }`}>
//                   <div className="font-semibold">{risk.condition}</div>
//                   <p className="text-sm mt-1">{risk.message}</p>
//                   <div className="flex justify-between items-center mt-2 text-xs">
//                     <span className="text-gray-500">Source: {risk.source}</span>
//                     <span className="text-gray-500">Confidence: {(risk.confidence * 100).toFixed(0)}%</span>
//                   </div>
//                 </div>
//               ))}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <CheckCircleIcon className="text-green-500 text-5xl mx-auto mb-3" />
//               <p className="text-green-700 font-medium">No significant risks detected</p>
//               <p className="text-sm text-gray-500 mt-1">Verified against live medical databases</p>
//             </div>
//           )}
//         </div>
//         <div className="p-4 border-t">
//           <button onClick={onContinue} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
//             Continue to Personalization
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const ModificationModal = ({ isOpen, onClose, modifications, selectedMods, onSelectMod, onConfirm, isLoading }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative">
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2"><HealingIcon /> Safe Modifications</h2>
//           <p className="text-amber-100 text-sm">AI-suggested alternatives for your health profile</p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto" />
//               <p className="mt-3 text-gray-500">Searching for modifications...</p>
//             </div>
//           ) : modifications.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">No modifications needed for your selected conditions.</p>
//           ) : (
//             modifications.map((mod, idx) => (
//               <div key={idx} className="mb-4">
//                 <h3 className="font-bold text-gray-700 mb-2">{mod.ingredient}</h3>
//                 {mod.options.map((opt, optIdx) => (
//                   <div
//                     key={optIdx}
//                     onClick={() => onSelectMod(mod.ingredient, opt)}
//                     className={`p-3 rounded-xl mb-2 cursor-pointer transition border ${
//                       selectedMods[mod.ingredient]?.name === opt.name
//                         ? 'border-emerald-500 bg-emerald-50'
//                         : 'border-gray-200 hover:border-amber-300'
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl">{opt.icon}</span>
//                       <div className="flex-1">
//                         <div className="font-semibold text-sm">{opt.name}</div>
//                         <p className="text-xs text-gray-500">{opt.description}</p>
//                         <div className="flex gap-2 mt-1">
//                           <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{opt.healthImpact}</span>
//                           <span className="text-[10px] text-amber-600">{opt.clinicalEfficacy}</span>
//                         </div>
//                       </div>
//                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                         selectedMods[mod.ingredient]?.name === opt.name ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
//                       }`}>
//                         {selectedMods[mod.ingredient]?.name === opt.name && <div className="w-2 h-2 bg-white rounded-full" />}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))
//           )}
//         </div>
//         <div className="p-4 border-t">
//           <button onClick={onConfirm} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
//             Confirm Order with Modifications
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const OrderDetailModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative">
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p><strong>Order ID:</strong> {order.orderId}</p>
//             <p><strong>Table:</strong> {order.tableNumber}</p>
//             <p><strong>Status:</strong> <span className="text-green-600 font-semibold">{order.status}</span></p>
//             <p><strong>Time Remaining:</strong> {Math.floor(order.timeRemaining / 60)}:{(order.timeRemaining % 60).toString().padStart(2, '0')}</p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items.map((item, idx) => (
//             <div key={idx} className="flex justify-between py-2 border-b">
//               <span>{item.quantity}x {item.name}</span>
//               <span>RWF {item.finalPrice.toLocaleString()}</span>
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">RWF {order.total.toLocaleString()}</span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button onClick={onClose} className="w-full bg-gray-500 text-white py-2 rounded-lg">Close</button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = ({ tableNumber = 1, userId = `user_${Date.now()}` }) => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showConditionModal, setShowConditionModal] = useState(false);
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showModModal, setShowModModal] = useState(false);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isGeneratingMods, setIsGeneratingMods] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [modifications, setModifications] = useState([]);
//   const [selectedMods, setSelectedMods] = useState({});
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showQRScanner, setShowQRScanner] = useState(false);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [showOrderDetail, setShowOrderDetail] = useState(false);
//   const [showResult, setShowResult] = useState({ open: false, type: '', title: '', message: '' });

//   const categories = ['all', ...new Set(MENU_ITEMS.map(i => i.category))];
//   const filtered = MENU_ITEMS.filter(i =>
//     (activeCategory === 'all' || i.category === activeCategory) &&
//     (i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
//   );
//   const itemsPerPage = 12;
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   useEffect(() => setCurrentPage(1), [activeCategory, search]);

//   // Handle item click - perform online analysis
//   const handleItemClick = async (item) => {
//     setCurrentItem(item);
//     setIsAnalyzing(true);
//     setShowAnalysisModal(true);

//     // Search online for ingredient risks
//     const risks = [];
//     for (const ingredient of item.ingredients) {
//       const ingredientRisks = await searchIngredientOnline(ingredient, selectedConditions);
//       risks.push(...ingredientRisks);
//     }

//     // Remove duplicates and sort
//     const uniqueRisks = risks.filter((v, i, a) => a.findIndex(t => t.condition === v.condition && t.message === v.message) === i);
//     const severityOrder = { high: 3, moderate: 2, low: 1, info: 0 };
//     uniqueRisks.sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));

//     setAnalysisResult(uniqueRisks.slice(0, 10));
//     setIsAnalyzing(false);
//   };

//   // Continue from analysis to modifications
//   const handleAnalysisContinue = async () => {
//     setShowAnalysisModal(false);

//     if (selectedConditions.length === 0) {
//       setShowConditionModal(true);
//     } else {
//       await generateModifications();
//     }
//   };

//   // Generate modifications based on conditions
//   const generateModifications = async () => {
//     setIsGeneratingMods(true);
//     setShowModModal(true);

//     const modResults = [];
//     for (const condition of selectedConditions) {
//       for (const ingredient of currentItem.ingredients) {
//         const mods = await searchModificationsOnline(ingredient, condition);
//         if (mods.length > 0) {
//           modResults.push({
//             ingredient,
//             condition,
//             options: mods
//           });
//         }
//       }
//     }

//     // Deduplicate
//     const uniqueMods = modResults.filter((v, i, a) => a.findIndex(t => t.ingredient === v.ingredient && t.condition === v.condition) === i);
//     setModifications(uniqueMods);
//     setIsGeneratingMods(false);
//   };

//   // Select a modification
//   const handleSelectMod = (ingredient, option) => {
//     setSelectedMods(prev => ({
//       ...prev,
//       [ingredient]: option
//     }));
//     toast.success(`✓ ${option.name} applied`);
//   };

//   // Confirm order with modifications
//   const handleConfirmOrder = async () => {
//     setShowModModal(false);

//     const modifiedItem = {
//       ...currentItem,
//       quantity: 1,
//       finalPrice: currentItem.price,
//       modifications: selectedMods,
//       healthAnalysis: analysisResult,
//       specialInstructions: Object.entries(selectedMods).map(([ing, mod]) => `Replace ${ing} with ${mod.name}`).join(', ')
//     };

//     const newItem = { ...modifiedItem, cartId: cartIdCounter };
//     setCart(prev => [...prev, newItem]);
//     setCartIdCounter(prev => prev + 1);

//     if (analysisResult.length > 0) {
//       toast.warning(`${currentItem.name} added with health considerations`);
//     } else {
//       toast.success(`${currentItem.name} added to cart!`);
//     }

//     setSelectedMods({});
//     setShowCart(true);
//   };

//   // Regular add to cart (no modifications flow)
//   const addToCartDirect = (item) => {
//     const newItem = { ...item, quantity: 1, finalPrice: item.price, cartId: cartIdCounter, modifications: {}, healthAnalysis: [] };
//     setCart(prev => [...prev, newItem]);
//     setCartIdCounter(prev => prev + 1);
//     toast.success(`${item.name} added to cart!`);
//   };

//   // Cart operations
//   const updateQuantity = (cartId, newQty) => {
//     if (newQty < 1) {
//       setCart(prev => prev.filter(i => i.cartId !== cartId));
//       return;
//     }
//     setCart(prev => prev.map(i =>
//       i.cartId === cartId ? { ...i, quantity: newQty, finalPrice: i.price * newQty } : i
//     ));
//   };

//   const removeItem = (cartId) => setCart(prev => prev.filter(i => i.cartId !== cartId));
//   const getTotal = () => cart.reduce((sum, i) => sum + i.finalPrice, 0);

//   // Checkout - send to API and start timer
//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       setShowResult({ open: true, type: 'error', title: 'Cart Empty', message: 'Please add items to your cart first.' });
//       return;
//     }

//     setShowCart(false);

//     const orderData = {
//       tableNumber,
//       userId,
//       items: cart,
//       total: getTotal(),
//       medicalConditions: selectedConditions
//     };

//     const result = await apiService.sendOrderToAPI(orderData);

//     if (result.success || result.fallbackStored) {
//       const preparationTime = cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//       setActiveOrder({
//         orderId: result.orderId,
//         tableNumber,
//         items: cart,
//         total: getTotal(),
//         timeRemaining: preparationTime * 60,
//         status: 'confirmed'
//       });

//       setShowResult({
//         open: true,
//         type: 'success',
//         title: '✅ Order Confirmed!',
//         message: `Your order has been placed!\n\nOrder ID: ${result.orderId.slice(-8)}\nTotal: RWF ${getTotal().toLocaleString()}\n\nEstimated time: ${preparationTime} minutes\n\nA timer will appear on screen.`
//       });

//       setCart([]);
//     } else {
//       setShowResult({
//         open: true,
//         type: 'error',
//         title: 'Order Failed',
//         message: 'Unable to place order. Please try again.'
//       });
//     }
//   };

//   // Timer expired
//   const handleTimerExpire = () => {
//     toast.info("Your order is ready! Please collect from the counter.");
//     setActiveOrder(prev => prev ? { ...prev, status: 'ready' } : null);
//   };

//   // Open order detail modal from timer
//   const handleOpenOrderDetail = () => {
//     setShowOrderDetail(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer position="bottom-right" />

//       {/* Modals */}
//       <ConditionModal
//         isOpen={showConditionModal}
//         onClose={() => setShowConditionModal(false)}
//         onSelect={setSelectedConditions}
//         selected={selectedConditions}
//       />

//       <AnalysisModal
//         isOpen={showAnalysisModal}
//         onClose={() => setShowAnalysisModal(false)}
//         analysis={analysisResult}
//         isLoading={isAnalyzing}
//         onContinue={handleAnalysisContinue}
//       />

//       <ModificationModal
//         isOpen={showModModal}
//         onClose={() => setShowModModal(false)}
//         modifications={modifications}
//         selectedMods={selectedMods}
//         onSelectMod={handleSelectMod}
//         onConfirm={handleConfirmOrder}
//         isLoading={isGeneratingMods}
//       />

//       <OrderDetailModal
//         isOpen={showOrderDetail}
//         onClose={() => setShowOrderDetail(false)}
//         order={activeOrder}
//       />

//       {/* Result Modal */}
//       {showResult.open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowResult({ ...showResult, open: false })} />
//           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
//             {showResult.type === 'success' && <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />}
//             {showResult.type === 'error' && <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />}
//             <h2 className="text-2xl font-bold mb-2">{showResult.title}</h2>
//             <p className="text-gray-600 whitespace-pre-line mb-6">{showResult.message}</p>
//             <button onClick={() => setShowResult({ ...showResult, open: false })} className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
//               OK
//             </button>
//           </motion.div>
//         </div>
//       )}

//       {/* Cart Modal */}
//       {showCart && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
//           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative">
//             <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//               <h2 className="text-white font-bold text-xl flex items-center gap-2"><CartIcon /> Your Cart</h2>
//               <button onClick={() => setShowCart(false)} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4">
//               {cart.length === 0 ? (
//                 <div className="text-center py-12">
//                   <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                   <p className="text-gray-500">Your cart is empty</p>
//                 </div>
//               ) : (
//                 cart.map(item => (
//                   <div key={item.cartId} className="flex gap-3 mb-3 pb-3 border-b">
//                     <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
//                     <div className="flex-1">
//                       <h3 className="font-semibold">{item.name}</h3>
//                       <p className="text-orange-600 font-bold">RWF {item.finalPrice.toLocaleString()}</p>
//                       {item.modifications && Object.keys(item.modifications).length > 0 && (
//                         <p className="text-xs text-green-600">✓ Modified for safety</p>
//                       )}
//                       <div className="flex items-center gap-2 mt-1">
//                         <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><RemoveIcon fontSize="small" /></button>
//                         <span className="w-8 text-center">{item.quantity}</span>
//                         <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><AddIcon fontSize="small" /></button>
//                         <button onClick={() => removeItem(item.cartId)} className="ml-2 text-red-500"><DeleteIcon fontSize="small" /></button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             {cart.length > 0 && (
//               <div className="p-4 border-t">
//                 <div className="flex justify-between font-bold mb-3">
//                   <span>Total</span>
//                   <span className="text-orange-600">RWF {getTotal().toLocaleString()}</span>
//                 </div>
//                 <button onClick={handleCheckout} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
//                   Confirm Order
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         </div>
//       )}

//       {/* QR Scanner Modal */}
//       {showQRScanner && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowQRScanner(false)} />
//           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
//             <div className="bg-purple-600 p-4 flex justify-between items-center">
//               <h3 className="text-white font-bold">Scan QR Code</h3>
//               <button onClick={() => setShowQRScanner(false)} className="p-1 hover:bg-white/20 rounded-full"><CloseIcon className="text-white" /></button>
//             </div>
//             <div className="p-4">
//               <div id="qr-reader" className="w-full"></div>
//               <p className="text-center text-gray-500 text-sm mt-4">Position QR code within the frame</p>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Floating Timer */}
//       {activeOrder && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={handleOpenOrderDetail}
//         />
//       )}

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <PsychologyIcon className="text-emerald-600" /> NutriScan·AI
//             </h1>
//             <p className="text-gray-500 text-sm">Table {tableNumber} · Real-time AI health analysis</p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowConditionModal(true)}
//               className={`p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}
//             >
//               <HealthIcon />
//             </button>
//             <button onClick={() => setShowQRScanner(true)} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition">
//               <QRIcon />
//             </button>
//             <button onClick={() => setShowCart(true)} className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition">
//               <CartIcon className="text-orange-500" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.reduce((a, b) => a + b.quantity, 0)}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Health Banner */}
//         {selectedConditions.length > 0 && (
//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
//             <div className="flex items-center gap-2">
//               <ShieldIcon className="text-emerald-600" />
//               <span className="text-sm text-emerald-800">Personalized for: {selectedConditions.join(', ')}</span>
//             </div>
//             <button onClick={() => setShowConditionModal(true)} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
//               Update
//             </button>
//           </div>
//         )}

//         {/* Search */}
//         <div className="relative mb-4">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white shadow-sm"
//             placeholder="Search dishes..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-auto pb-2 mb-4">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-sm ${
//                 activeCategory === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
//               }`}
//             >
//               {cat === 'all' ? 'All Items' : cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map(item => (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
//               onClick={() => handleItemClick(item)}
//             >
//               <img src={item.image} className="h-40 w-full object-cover" alt={item.name} />
//               <div className="p-3">
//                 <h3 className="font-bold text-gray-800">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-orange-600 font-bold">RWF {item.price.toLocaleString()}</span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1"><TimeIcon fontSize="small" /> {item.prepTime}min</span>
//                 </div>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); addToCartDirect(item); }}
//                   className="w-full mt-2 bg-orange-100 text-orange-600 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-200 transition"
//                 >
//                   Quick Add
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-12">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">No items match your search.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               ←
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`w-8 h-8 rounded ${currentPage === p ? 'bg-orange-500 text-white' : 'bg-white'}`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//               disabled={currentPage === totalPages}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   WarningAmber as WarningAmberIcon,
//   TableRestaurant as TableIcon,
//   Timer as TimerIcon,
//   HealthAndSafety as HealthIcon,
//   Favorite as FavoriteIcon,
//   Psychology as PsychologyIcon,
//   Healing as HealingIcon,
//   Science as ScienceIcon,
//   Shield as ShieldIcon,
//   FitnessCenter as FitnessIcon,
//   Edit as EditIcon,
//   Restaurant as RestaurantIcon,
//   Person as PersonIcon,
//   Dangerous as DangerousIcon,
//   Warning as WarningIcon,
//   Check as CheckIcon,
// } from "@mui/icons-material";

// // ========== MEDICAL CONDITIONS DATABASE ==========
// const MEDICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Peanut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Severe allergic reaction to peanuts",
//   },
//   {
//     id: 2,
//     name: "Tree Nut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to almonds, walnuts, cashews, etc.",
//   },
//   {
//     id: 3,
//     name: "Shellfish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to shrimp, crab, lobster",
//   },
//   {
//     id: 4,
//     name: "Fish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to finned fish",
//   },
//   {
//     id: 5,
//     name: "Egg Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to eggs",
//   },
//   {
//     id: 6,
//     name: "Soy Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to soy products",
//   },
//   {
//     id: 7,
//     name: "Wheat Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to wheat",
//   },
//   {
//     id: 8,
//     name: "Milk Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to dairy products",
//   },
//   {
//     id: 9,
//     name: "Celiac Disease",
//     category: "Autoimmune",
//     severity: "high",
//     description: "Cannot consume gluten",
//   },
//   {
//     id: 10,
//     name: "Lactose Intolerance",
//     category: "Digestive",
//     severity: "low",
//     description: "Difficulty digesting lactose",
//   },
//   {
//     id: 11,
//     name: "Type 2 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Blood sugar management needed",
//   },
//   {
//     id: 12,
//     name: "Type 1 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Insulin dependent",
//   },
//   {
//     id: 13,
//     name: "Hypertension",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "High blood pressure",
//   },
//   {
//     id: 14,
//     name: "High Cholesterol",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "Cholesterol management needed",
//   },
//   {
//     id: 15,
//     name: "Gout",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Uric acid buildup",
//   },
//   {
//     id: 16,
//     name: "GERD",
//     category: "Digestive",
//     severity: "low",
//     description: "Acid reflux",
//   },
//   {
//     id: 17,
//     name: "Kidney Disease",
//     category: "Renal",
//     severity: "high",
//     description: "Limited sodium and potassium",
//   },
//   {
//     id: 18,
//     name: "Migraine",
//     category: "Neurological",
//     severity: "low",
//     description: "Trigger foods may cause headaches",
//   },
// ];

// // ========== MENU ITEMS ==========
// const MENU_ITEMS = [
//   {
//     id: 1,
//     name: "Isombe ya Nyama",
//     price: 2800,
//     ingredients: [
//       "cassava leaves",
//       "beef",
//       "coconut milk",
//       "peanut flour",
//       "palm oil",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "pepper sauce", "potato", "spices", "salt"],
//     description: "Grilled beef skewers with fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//   },
//   {
//     id: 3,
//     name: "Ibiharage",
//     price: 1800,
//     ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
//     description: "Rwandan bean stew - vegan",
//     prepTime: 12,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//   },
//   {
//     id: 4,
//     name: "Matoke ya Nyama",
//     price: 3200,
//     ingredients: [
//       "green plantain",
//       "goat meat",
//       "ginger",
//       "onion",
//       "coconut oil",
//     ],
//     description: "Steamed plantain with goat stew",
//     prepTime: 20,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//   },
//   {
//     id: 5,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
//     description: "Fresh lake tilapia",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//   },
//   {
//     id: 6,
//     name: "Chicken Shawarma",
//     price: 4200,
//     ingredients: ["chicken", "yogurt", "garlic", "spices", "pita"],
//     description: "Marinated chicken wrap",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
//   },
//   {
//     id: 7,
//     name: "Beef Burger",
//     price: 4800,
//     ingredients: ["beef patty", "lettuce", "tomato", "cheese", "bun"],
//     description: "Angus beef burger with cheese",
//     prepTime: 12,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//   },
//   {
//     id: 8,
//     name: "Vegetable Pad Thai",
//     price: 3800,
//     ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime"],
//     description: "Classic Thai noodles",
//     prepTime: 14,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
//   },
//   {
//     id: 9,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//   },
//   {
//     id: 10,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//   },
//   {
//     id: 11,
//     name: "Mango Sticky Rice",
//     price: 3500,
//     ingredients: ["glutinous rice", "mango", "coconut milk", "sugar"],
//     description: "Thai dessert",
//     prepTime: 10,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
//   },
//   {
//     id: 12,
//     name: "Fresh Lemonade",
//     price: 1500,
//     ingredients: ["lemon", "sugar", "water", "mint"],
//     description: "Hand-squeezed lemonade",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
//   },
// ];

// // ========== INGREDIENT RISK DATABASE ==========
// // This maps each medical condition to ingredients that trigger it
// const INGREDIENT_RISK_DATABASE = {
//   "Peanut Allergy": {
//     keywords: [
//       "peanut",
//       "peanut flour",
//       "groundnut",
//       "arachis",
//       "peanut butter",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS PEANUTS - Severe allergic reaction possible",
//     modification: "Substitute with sunflower seed butter",
//     safeAlternative: "Sunflower Seed Butter",
//   },
//   "Tree Nut Allergy": {
//     keywords: [
//       "almond",
//       "walnut",
//       "cashew",
//       "pistachio",
//       "hazelnut",
//       "coconut",
//       "macadamia",
//       "pecan",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS TREE NUTS - Potential anaphylaxis risk",
//     modification: "Omit nuts or substitute with seeds",
//     safeAlternative: "Pumpkin or sunflower seeds",
//   },
//   "Shellfish Allergy": {
//     keywords: [
//       "shrimp",
//       "prawn",
//       "crab",
//       "lobster",
//       "crayfish",
//       "langoustine",
//       "shellfish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS SHELLFISH - Severe allergic reaction risk",
//     modification: "Substitute with mushrooms or chicken",
//     safeAlternative: "King oyster mushroom or chicken",
//   },
//   "Fish Allergy": {
//     keywords: [
//       "tilapia",
//       "salmon",
//       "tuna",
//       "mackerel",
//       "cod",
//       "bass",
//       "trout",
//       "fish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS FISH - Allergic reaction possible",
//     modification: "Substitute with chicken or tofu",
//     safeAlternative: "Grilled chicken or tofu",
//   },
//   "Milk Allergy": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//       "whey",
//       "casein",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS DAIRY - Milk allergy risk",
//     modification: "Use plant-based dairy alternatives",
//     safeAlternative: "Oat milk, coconut milk, vegan cheese",
//   },
//   "Celiac Disease": {
//     keywords: [
//       "wheat",
//       "flour",
//       "gluten",
//       "barley",
//       "rye",
//       "bread",
//       "pita",
//       "bun",
//       "pasta",
//       "dough",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS GLUTEN - Autoimmune reaction trigger",
//     modification: "Use gluten-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour, almond flour",
//   },
//   "Egg Allergy": {
//     keywords: ["egg", "eggs", "mayonnaise", "albumin", "meringue"],
//     severity: "moderate",
//     message: "⚡ CONTAINS EGGS - Allergic reaction possible",
//     modification: "Use egg replacer or omit",
//     safeAlternative: "Flax egg or commercial egg replacer",
//   },
//   "Soy Allergy": {
//     keywords: ["soy", "tofu", "soy sauce", "edamame", "miso", "tempeh"],
//     severity: "moderate",
//     message: "⚡ CONTAINS SOY - Potential allergen",
//     modification: "Use coconut aminos instead of soy sauce",
//     safeAlternative: "Coconut aminos, chickpea tofu",
//   },
//   "Wheat Allergy": {
//     keywords: ["wheat", "flour", "bread", "pita", "bun", "pasta", "dough"],
//     severity: "moderate",
//     message: "⚡ CONTAINS WHEAT - Allergic reaction possible",
//     modification: "Use gluten-free or wheat-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour",
//   },
//   "Type 2 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//       "sweetener",
//       "coconut sugar",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SUGAR - May spike blood glucose",
//     modification: "Use sugar-free sweetener or reduce sugar",
//     safeAlternative: "Monk fruit, stevia, erythritol",
//   },
//   "Type 1 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//     ],
//     severity: "moderate",
//     message: "⚡ CONTAINS SUGAR - Requires insulin adjustment",
//     modification: "Request sugar-free version",
//     safeAlternative: "Sugar-free sweetener",
//   },
//   Hypertension: {
//     keywords: [
//       "salt",
//       "sodium",
//       "soy sauce",
//       "teriyaki",
//       "fish sauce",
//       "cured",
//       "pickled",
//       "broth",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SODIUM - May increase blood pressure",
//     modification: "Request low-sodium preparation",
//     safeAlternative: "Low-sodium version, herbs instead of salt",
//   },
//   "High Cholesterol": {
//     keywords: [
//       "butter",
//       "palm oil",
//       "coconut milk",
//       "beef fat",
//       "lard",
//       "fried",
//       "cheese",
//       "cream",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SATURATED FAT - May affect cholesterol",
//     modification: "Use heart-healthy oils (olive, avocado)",
//     safeAlternative: "Olive oil, avocado oil",
//   },
//   Gout: {
//     keywords: [
//       "beef",
//       "red meat",
//       "organ meat",
//       "sardines",
//       "anchovies",
//       "shellfish",
//       "beef sirloin",
//       "goat meat",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH PURINE - May trigger gout flare",
//     modification: "Choose poultry or plant protein instead",
//     safeAlternative: "Chicken, turkey, tofu, beans",
//   },
//   "Kidney Disease": {
//     keywords: [
//       "salt",
//       "sodium",
//       "potassium",
//       "phosphorus",
//       "beans",
//       "legumes",
//       "dairy",
//       "nuts",
//     ],
//     severity: "high",
//     message: "⚠️ MAY STRESS KIDNEYS - Consult your doctor",
//     modification: "Limited portion with medical approval",
//     safeAlternative: "Consult healthcare provider",
//   },
//   "Lactose Intolerance": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//     ],
//     severity: "low",
//     message: "ℹ️ CONTAINS LACTOSE - May cause digestive discomfort",
//     modification: "Use lactose-free or plant-based dairy",
//     safeAlternative: "Lactose-free milk, vegan cheese",
//   },
//   GERD: {
//     keywords: [
//       "tomato",
//       "citrus",
//       "lemon",
//       "lime",
//       "spicy",
//       "chili",
//       "coffee",
//       "chocolate",
//       "mint",
//       "onion",
//       "garlic",
//     ],
//     severity: "low",
//     message: "ℹ️ MAY TRIGGER REFLUX - Eat with caution",
//     modification: "Request mild version without triggers",
//     safeAlternative: "Mild herb seasoning",
//   },
//   Migraine: {
//     keywords: [
//       "caffeine",
//       "coffee",
//       "chocolate",
//       "aged cheese",
//       "red wine",
//       "processed meat",
//       "msg",
//     ],
//     severity: "low",
//     message: "ℹ️ POTENTIAL MIGRAINE TRIGGER",
//     modification: "Omit trigger ingredients",
//     safeAlternative: "Caffeine-free, chocolate-free version",
//   },
// };

// // ========== INGREDIENT ANALYSIS FUNCTION ==========
// // This analyzes each ingredient against user's medical conditions
// const analyzeDishForConditions = (item, userConditions) => {
//   if (!userConditions || userConditions.length === 0) {
//     return {
//       overallStatus: "safe",
//       overallColor: "green",
//       overallIcon: "✅",
//       overallMessage:
//         "This dish appears safe based on standard dietary guidelines",
//       recommendation: "Enjoy your meal! No medical conditions selected.",
//       ingredientAnalysis: item.ingredients.map((ing) => ({
//         ingredient: ing,
//         status: "safe",
//         statusIcon: "✅",
//         message: "No conflicts detected with your profile",
//         severity: "none",
//         modificationAvailable: false,
//         safeAlternative: null,
//       })),
//       canBeModified: false,
//       highRiskCount: 0,
//       moderateRiskCount: 0,
//       lowRiskCount: 0,
//     };
//   }

//   const ingredientAnalysis = [];
//   let highRiskCount = 0;
//   let moderateRiskCount = 0;
//   let lowRiskCount = 0;
//   let modificationsAvailable = [];

//   for (const ingredient of item.ingredients) {
//     let highestSeverity = "safe";
//     let relevantCondition = null;
//     let relevantMessage = "";
//     let modification = null;
//     let safeAlternative = null;

//     // Check ingredient against each user condition
//     for (const condition of userConditions) {
//       const riskRule = INGREDIENT_RISK_DATABASE[condition];
//       if (riskRule) {
//         // Check if ingredient matches any keyword for this condition
//         const matches = riskRule.keywords.some((keyword) =>
//           ingredient.toLowerCase().includes(keyword.toLowerCase()),
//         );

//         if (matches) {
//           // Track highest severity
//           if (riskRule.severity === "high") {
//             highestSeverity = "high";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "moderate" &&
//             highestSeverity !== "high"
//           ) {
//             highestSeverity = "moderate";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "low" &&
//             highestSeverity === "safe"
//           ) {
//             highestSeverity = "low";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           }
//         }
//       }
//     }

//     // Count risks by severity
//     if (highestSeverity === "high") highRiskCount++;
//     else if (highestSeverity === "moderate") moderateRiskCount++;
//     else if (highestSeverity === "low") lowRiskCount++;

//     // Build analysis for this ingredient
//     let statusIcon, statusMessage, statusColor;
//     switch (highestSeverity) {
//       case "high":
//         statusIcon = "🔴";
//         statusColor = "red";
//         statusMessage =
//           relevantMessage ||
//           `HIGH RISK: Contains ${ingredient} - Avoid for ${relevantCondition || "your condition"}`;
//         break;
//       case "moderate":
//         statusIcon = "🟡";
//         statusColor = "orange";
//         statusMessage =
//           relevantMessage ||
//           `CAUTION: ${ingredient} - Limit intake for ${relevantCondition || "your condition"}`;
//         break;
//       case "low":
//         statusIcon = "🟢";
//         statusColor = "yellow";
//         statusMessage =
//           relevantMessage ||
//           `LOW RISK: ${ingredient} - Generally acceptable but monitor symptoms`;
//         break;
//       default:
//         statusIcon = "✅";
//         statusColor = "green";
//         statusMessage = `SAFE: ${ingredient} - No conflicts with your conditions`;
//     }

//     if (modification && !modificationsAvailable.includes(modification)) {
//       modificationsAvailable.push(modification);
//     }

//     ingredientAnalysis.push({
//       ingredient: ingredient,
//       status: highestSeverity,
//       statusIcon: statusIcon,
//       statusColor: statusColor,
//       message: statusMessage,
//       relevantCondition: relevantCondition,
//       modificationAvailable: modification !== null,
//       modificationText: modification,
//       safeAlternative: safeAlternative,
//     });
//   }

//   // Determine overall dish status
//   let overallStatus, overallColor, overallIcon, overallMessage, recommendation;

//   if (highRiskCount > 0) {
//     overallStatus = "high_risk";
//     overallColor = "red";
//     overallIcon = "🔴";
//     overallMessage = `⚠️ HIGH RISK DISH - Contains ${highRiskCount} ingredient(s) that may be dangerous for your condition(s)`;
//     recommendation =
//       "STRONG RECOMMENDATION: Do NOT order this dish, or request significant modifications below";
//   } else if (moderateRiskCount > 0) {
//     overallStatus = "moderate_risk";
//     overallColor = "orange";
//     overallIcon = "🟡";
//     overallMessage = `⚡ MODERATE RISK DISH - Contains ${moderateRiskCount} ingredient(s) that should be limited with your condition(s)`;
//     recommendation =
//       "RECOMMENDATION: Order with modifications or in small portions only";
//   } else if (lowRiskCount > 0) {
//     overallStatus = "low_risk";
//     overallColor = "yellow";
//     overallIcon = "🟢";
//     overallMessage = `ℹ️ LOW RISK DISH - Contains ${lowRiskCount} ingredient(s) that may cause mild symptoms for some people`;
//     recommendation = "Generally acceptable, but monitor for any reaction";
//   } else {
//     overallStatus = "safe";
//     overallColor = "green";
//     overallIcon = "✅";
//     overallMessage =
//       "✓ SAFE DISH - All ingredients appear compatible with your medical conditions";
//     recommendation = "This dish is safe for you to enjoy!";
//   }

//   return {
//     overallStatus: overallStatus,
//     overallColor: overallColor,
//     overallIcon: overallIcon,
//     overallMessage: overallMessage,
//     recommendation: recommendation,
//     ingredientAnalysis: ingredientAnalysis,
//     canBeModified: modificationsAvailable.length > 0,
//     modificationsAvailable: modificationsAvailable,
//     highRiskCount: highRiskCount,
//     moderateRiskCount: moderateRiskCount,
//     lowRiskCount: lowRiskCount,
//   };
// };

// // ========== API SERVICE FOR ORDER STORAGE ==========
// const ORDER_API_URL = "https://your-api-endpoint.com/api/orders";

// const apiService = {
//   sendOrderToAPI: async (orderData) => {
//     const payload = {
//       orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       tableNumber: orderData.tableNumber,
//       customerName: orderData.customerName,
//       userId: orderData.userId,
//       orderType: orderData.orderType || "dine-in",
//       items: orderData.items.map((item) => ({
//         id: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         originalPrice: item.price,
//         finalPrice: item.finalPrice,
//         ingredients: item.ingredients,
//         customizations: item.customizations || [],
//         modifications: item.modifications || {},
//         specialInstructions: item.specialInstructions || "",
//         healthAnalysis: item.healthAnalysis || [],
//         preparationTime: item.prepTime || 15,
//       })),
//       customizedPlates: orderData.customizedPlates || [],
//       subtotal: orderData.subtotal,
//       tax: orderData.tax || 0,
//       total: orderData.total,
//       medicalConditions: orderData.medicalConditions,
//       timestamp: new Date().toISOString(),
//       estimatedPreparationTime:
//         orderData.items.reduce(
//           (max, item) => Math.max(max, item.prepTime || 15),
//           15,
//         ) + 5,
//       status: "confirmed",
//       notes: orderData.notes || "",
//     };

//     try {
//       const response = await axios.post(ORDER_API_URL, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       const storedOrders = JSON.parse(
//         localStorage.getItem("order_history") || "[]",
//       );
//       storedOrders.push(payload);
//       localStorage.setItem("order_history", JSON.stringify(storedOrders));
//       return { success: true, data: response.data, orderId: payload.orderId };
//     } catch (error) {
//       console.error("API error, storing locally:", error);
//       const fallbackOrders = JSON.parse(
//         localStorage.getItem("fallback_orders") || "[]",
//       );
//       fallbackOrders.push({
//         ...payload,
//         fallbackTimestamp: new Date().toISOString(),
//       });
//       localStorage.setItem("fallback_orders", JSON.stringify(fallbackOrders));
//       return {
//         success: false,
//         error: error.message,
//         fallbackStored: true,
//         orderId: payload.orderId,
//       };
//     }
//   },

//   getOrderStatus: async (orderId) => {
//     try {
//       const response = await axios.get(`${ORDER_API_URL}/${orderId}/status`);
//       return response.data;
//     } catch (error) {
//       console.error("Status fetch error:", error);
//       return null;
//     }
//   },

//   getTableOrders: async (tableNumber) => {
//     try {
//       const response = await axios.get(
//         `${ORDER_API_URL}?tableNumber=${tableNumber}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch table orders:", error);
//       return [];
//     }
//   },
// };

// // ========== FLOATING TIMER COMPONENT ==========
// const FloatingTimer = ({
//   orderId,
//   tableNumber,
//   initialDuration,
//   onExpire,
//   onOpenModal,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire && onExpire();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getTimerColor = () => {
//     if (timeLeft <= 60) return "bg-red-500 animate-pulse";
//     if (timeLeft <= 300) return "bg-orange-500";
//     return "bg-green-500";
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
//     >
//       <div
//         className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}
//       >
//         <TimerIcon className="animate-pulse" />
//         <div className="flex flex-col">
//           <span className="text-xs font-medium">
//             Order #{orderId.slice(-6)} | Table {tableNumber}
//           </span>
//           <span className="text-xl font-mono font-bold tracking-wider">
//             {formatTime(timeLeft)}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== TABLE SELECTOR MODAL ==========
// const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
//   const [tableNumber, setTableNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-sm">
//             Please enter your table details
//           </p>
//         </div>
//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name (Optional)
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber) onConfirm(tableNumber, customerName);
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Start Ordering
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CONDITION SELECTION MODAL ==========
// const ConditionModal = ({ isOpen, onClose, onSelect, selected }) => {
//   const [localSelected, setLocalSelected] = useState(selected);

//   useEffect(() => {
//     if (isOpen) setLocalSelected(selected);
//   }, [isOpen, selected]);

//   const toggle = (cond) => {
//     setLocalSelected((prev) =>
//       prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond],
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <HealthIcon /> Your Medical Conditions
//           </h2>
//           <p className="text-purple-200 text-sm">
//             Select all that apply for personalized ingredient analysis
//           </p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="grid grid-cols-2 gap-2">
//             {MEDICAL_CONDITIONS.map((cond) => (
//               <button
//                 key={cond.id}
//                 onClick={() => toggle(cond.name)}
//                 className={`p-2 rounded-lg text-left text-sm transition ${
//                   localSelected.includes(cond.name)
//                     ? "bg-purple-100 border-2 border-purple-500 text-purple-800"
//                     : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="font-medium">{cond.name}</div>
//                 <div className="text-xs opacity-70">{cond.category}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Skip
//           </button>
//           <button
//             onClick={() => {
//               onSelect(localSelected);
//               onClose();
//             }}
//             className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold"
//           >
//             Apply ({localSelected.length})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== INGREDIENT ANALYSIS MODAL ==========
// const AnalysisModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   isLoading,
//   onContinue,
//   item,
//   userConditions,
// }) => {
//   const [expandedIngredient, setExpandedIngredient] = useState(null);

//   if (!isOpen) return null;

//   const getHeaderColor = () => {
//     if (analysis?.overallColor === "red") return "from-red-600 to-red-700";
//     if (analysis?.overallColor === "orange")
//       return "from-orange-500 to-orange-600";
//     if (analysis?.overallColor === "yellow")
//       return "from-yellow-500 to-amber-500";
//     return "from-emerald-600 to-green-600";
//   };

//   const getBorderColor = (statusColor) => {
//     switch (statusColor) {
//       case "red":
//         return "border-red-500 bg-red-50";
//       case "orange":
//         return "border-orange-500 bg-orange-50";
//       case "yellow":
//         return "border-yellow-500 bg-yellow-50";
//       default:
//         return "border-green-500 bg-green-50";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col relative"
//       >
//         <div
//           className={`bg-gradient-to-r ${getHeaderColor()} p-4 rounded-t-2xl text-white`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <ScienceIcon />
//               <h2 className="font-bold text-xl">Ingredient Safety Analysis</h2>
//             </div>
//             <span className="text-2xl">{analysis?.overallIcon}</span>
//           </div>
//           <p className="text-white/80 text-sm mt-1">{item?.name}</p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
//               <p className="text-gray-600">
//                 Analyzing ingredients against your conditions...
//               </p>
//             </div>
//           ) : analysis ? (
//             <>
//               {/* Overall Status Banner */}
//               <div
//                 className={`rounded-xl p-4 mb-4 border-l-4 ${getBorderColor(analysis.overallColor)}`}
//               >
//                 <div className="flex items-start gap-3">
//                   <span className="text-2xl">{analysis.overallIcon}</span>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">
//                       {analysis.overallMessage}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {analysis.recommendation}
//                     </p>
//                     {(analysis.highRiskCount > 0 ||
//                       analysis.moderateRiskCount > 0) && (
//                       <div className="flex gap-3 mt-2 text-xs">
//                         {analysis.highRiskCount > 0 && (
//                           <span className="text-red-600">
//                             🔴 {analysis.highRiskCount} high risk
//                           </span>
//                         )}
//                         {analysis.moderateRiskCount > 0 && (
//                           <span className="text-orange-600">
//                             🟡 {analysis.moderateRiskCount} moderate risk
//                           </span>
//                         )}
//                         {analysis.lowRiskCount > 0 && (
//                           <span className="text-yellow-600">
//                             🟢 {analysis.lowRiskCount} low risk
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Ingredient Analysis List */}
//               <h3 className="font-semibold text-gray-700 mb-3">
//                 📋 Ingredient Analysis
//               </h3>
//               <div className="space-y-3">
//                 {analysis.ingredientAnalysis.map((ing, idx) => (
//                   <div key={idx} className="border rounded-xl overflow-hidden">
//                     <button
//                       onClick={() =>
//                         setExpandedIngredient(
//                           expandedIngredient === idx ? null : idx,
//                         )
//                       }
//                       className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-xl">{ing.statusIcon}</span>
//                         <span className="font-medium text-gray-800">
//                           {ing.ingredient}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`text-xs px-2 py-1 rounded-full ${
//                             ing.status === "high"
//                               ? "bg-red-100 text-red-700"
//                               : ing.status === "moderate"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : ing.status === "low"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-green-100 text-green-700"
//                           }`}
//                         >
//                           {ing.status === "high"
//                             ? "HIGH RISK"
//                             : ing.status === "moderate"
//                               ? "CAUTION"
//                               : ing.status === "low"
//                                 ? "LOW RISK"
//                                 : "SAFE"}
//                         </span>
//                         <span className="text-gray-400">
//                           {expandedIngredient === idx ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </button>

//                     {expandedIngredient === idx && (
//                       <div className="p-3 bg-gray-50 border-t">
//                         <p className="text-sm text-gray-700 mb-2">
//                           {ing.message}
//                         </p>
//                         {ing.relevantCondition && (
//                           <p className="text-xs text-gray-500">
//                             ⚠️ Relevant condition: {ing.relevantCondition}
//                           </p>
//                         )}
//                         {ing.modificationAvailable && (
//                           <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                             <p className="text-xs font-medium text-emerald-700">
//                               ✓ Modification Available:
//                             </p>
//                             <p className="text-xs text-emerald-600">
//                               {ing.modificationText}
//                             </p>
//                             {ing.safeAlternative && (
//                               <p className="text-xs text-emerald-600 mt-1">
//                                 Suggested: {ing.safeAlternative}
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Modification Summary */}
//               {analysis.modificationsAvailable &&
//                 analysis.modificationsAvailable.length > 0 && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-xl">
//                     <p className="text-sm font-medium text-blue-700 mb-1">
//                       ✨ Customization Options Available
//                     </p>
//                     <ul className="text-xs text-blue-600 space-y-1">
//                       {analysis.modificationsAvailable
//                         .slice(0, 3)
//                         .map((mod, idx) => (
//                           <li key={idx}>• {mod}</li>
//                         ))}
//                     </ul>
//                   </div>
//                 )}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <CheckIcon className="text-green-500 text-5xl mx-auto mb-3" />
//               <p className="text-green-700 font-medium">✓ No analysis needed</p>
//               <p className="text-xs text-gray-500">
//                 Select medical conditions first for personalized analysis
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
//             disabled={analysis?.overallStatus === "high_risk"}
//           >
//             {analysis?.overallStatus === "high_risk"
//               ? "⚠️ Not Recommended"
//               : "Continue to Order"}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({
//   isOpen,
//   onClose,
//   item,
//   selectedConditions,
//   onAddToCart,
//   analysis,
// }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showModifications, setShowModifications] = useState(false);
//   const [selectedModifications, setSelectedModifications] = useState({});

//   if (!isOpen) return null;

//   // Get ingredients that need modification based on analysis
//   const riskyIngredients =
//     analysis?.ingredientAnalysis?.filter(
//       (ing) => ing.status !== "safe" && ing.modificationAvailable,
//     ) || [];

//   const handleApplyModification = (ingredient, modification) => {
//     setSelectedModifications((prev) => ({
//       ...prev,
//       [ingredient]: modification,
//     }));
//     setCustomizations((prev) => {
//       const filtered = prev.filter((c) => !c.includes(ingredient));
//       return [...filtered, `Replace ${ingredient} - ${modification}`];
//     });
//     toast.success(`✓ Modification applied for ${ingredient}`);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <EditIcon /> Customize Your Order
//           </h2>
//           <p className="text-amber-100 text-sm">
//             {item.name} - RWF {item.price.toLocaleString()}
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Original Ingredients */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📦 Original Ingredients:
//             </h3>
//             <div className="flex flex-wrap gap-1">
//               {item.ingredients.map((ing, idx) => {
//                 const isRisky = riskyIngredients.some(
//                   (r) => r.ingredient === ing,
//                 );
//                 return (
//                   <span
//                     key={idx}
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       isRisky
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {ing} {isRisky && "⚠️"}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Health-Safe Modifications */}
//           {riskyIngredients.length > 0 && (
//             <div className="mb-4">
//               <button
//                 onClick={() => setShowModifications(!showModifications)}
//                 className="w-full text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200"
//               >
//                 <div className="flex items-center gap-2">
//                   <ShieldIcon className="text-emerald-600" />
//                   <span className="font-semibold text-emerald-800">
//                     Health-Safe Modifications Available
//                   </span>
//                 </div>
//                 <p className="text-xs text-emerald-600 mt-1">
//                   {riskyIngredients.length} ingredient(s) can be modified for
//                   your safety
//                 </p>
//               </button>

//               {showModifications && (
//                 <div className="mt-2 space-y-2">
//                   {riskyIngredients.map((ing, idx) => (
//                     <div key={idx} className="bg-green-50 p-3 rounded-lg">
//                       <div className="flex items-start gap-2">
//                         <span className="text-xl">{ing.statusIcon}</span>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-800">
//                             {ing.ingredient}
//                           </p>
//                           <p className="text-xs text-gray-600">{ing.message}</p>
//                           {ing.modificationText && (
//                             <div className="mt-2">
//                               <p className="text-xs font-medium text-emerald-700">
//                                 Suggested modification:
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 {ing.modificationText}
//                               </p>
//                               {ing.safeAlternative && (
//                                 <p className="text-xs text-emerald-600">
//                                   → {ing.safeAlternative}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={() =>
//                             handleApplyModification(
//                               ing.ingredient,
//                               ing.modificationText,
//                             )
//                           }
//                           className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
//                           disabled={selectedModifications[ing.ingredient]}
//                         >
//                           {selectedModifications[ing.ingredient]
//                             ? "✓ Applied"
//                             : "Apply"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Applied Customizations */}
//           {customizations.length > 0 && (
//             <div className="mb-4">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 ✓ Applied Customizations:
//               </h3>
//               {customizations.map((cust, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-100 p-2 rounded-lg text-sm mb-1 flex justify-between"
//                 >
//                   <span>{cust}</span>
//                   <button
//                     onClick={() =>
//                       setCustomizations((prev) =>
//                         prev.filter((_, i) => i !== idx),
//                       )
//                     }
//                     className="text-red-500"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Special Instructions */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📝 Special Instructions:
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests? (e.g., no salt, extra well-done, etc.)"
//               className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//               rows="2"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Add to Cart (RWF {item.price.toLocaleString()})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CART MODAL ==========
// const CartModal = ({
//   isOpen,
//   onClose,
//   cart,
//   updateQuantity,
//   removeItem,
//   getTotal,
//   onCheckout,
//   tableInfo,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-12">
//               <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div key={item.cartId} className="mb-3 pb-3 border-b">
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="text-xs text-gray-500 mt-1">
//                         {item.customizations.map((c, i) => (
//                           <div key={i}>• {c}</div>
//                         ))}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600 mt-1">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold">
//                     RWF {item.finalPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <AddIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {cart.length > 0 && (
//           <div className="p-4 border-t">
//             <div className="flex justify-between font-bold mb-3">
//               <span>Total</span>
//               <span className="text-orange-600">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAIL MODAL ==========
// const OrderDetailModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p>
//               <strong>Order ID:</strong> {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName || "Guest"}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//             <p>
//               <strong>Time Remaining:</strong>{" "}
//               {Math.floor(order.timeRemaining / 60)}:
//               {(order.timeRemaining % 60).toString().padStart(2, "0")}
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice.toLocaleString()}</span>
//               </div>
//               {item.customizations && item.customizations.length > 0 && (
//                 <div className="text-xs text-gray-500 mt-1">
//                   {item.customizations.map((c, i) => (
//                     <div key={i}>• {c}</div>
//                   ))}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600 mt-1">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-500 text-white py-2 rounded-lg"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== RESULT MODAL ==========
// const ResultModal = ({ isOpen, onClose, type, title, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
//       >
//         {type === "success" && (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         )}
//         {type === "error" && (
//           <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
//         )}
//         <h2 className="text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-600 whitespace-pre-line mb-6">{message}</p>
//         <button
//           onClick={onClose}
//           className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
//         >
//           OK
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = () => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showTableModal, setShowTableModal] = useState(true);
//   const [showConditionModal, setShowConditionModal] = useState(false);
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [showOrderDetail, setShowOrderDetail] = useState(false);
//   const [showResult, setShowResult] = useState({
//     open: false,
//     type: "",
//     title: "",
//     message: "",
//   });
//   const [tableInfo, setTableInfo] = useState({
//     tableNumber: null,
//     customerName: "",
//   });

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = MENU_ITEMS.filter(
//     (i) =>
//       (activeCategory === "all" || i.category === activeCategory) &&
//       i.name.toLowerCase().includes(search.toLowerCase()),
//   );
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const paginated = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   useEffect(() => setCurrentPage(1), [activeCategory, search]);

//   // Handle item click - perform ingredient analysis
//   const handleItemClick = async (item) => {
//     setCurrentItem(item);
//     setIsAnalyzing(true);
//     setShowAnalysisModal(true);

//     // Analyze ingredients against user's medical conditions
//     const analysis = analyzeDishForConditions(item, selectedConditions);
//     setAnalysisResult(analysis);
//     setIsAnalyzing(false);
//   };

//   const handleAnalysisContinue = () => {
//     setShowAnalysisModal(false);
//     setShowCustomModal(true);
//   };

//   const addToCartWithCustomizations = (item, customizations, instructions) => {
//     const newItem = {
//       ...item,
//       quantity: 1,
//       finalPrice: item.price,
//       customizations: customizations,
//       specialInstructions: instructions,
//       healthAnalysis: analysisResult,
//       cartId: cartIdCounter,
//     };
//     setCart((prev) => [...prev, newItem]);
//     setCartIdCounter((prev) => prev + 1);
//     toast.success(`${item.name} added to cart!`);
//     setShowCart(true);
//   };

//   const updateQuantity = (cartId, newQty) => {
//     if (newQty < 1) {
//       setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//       return;
//     }
//     setCart((prev) =>
//       prev.map((i) =>
//         i.cartId === cartId
//           ? { ...i, quantity: newQty, finalPrice: i.price * newQty }
//           : i,
//       ),
//     );
//   };

//   const removeItem = (cartId) =>
//     setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//   const getTotal = () => cart.reduce((sum, i) => sum + i.finalPrice, 0);

//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Cart Empty",
//         message: "Please add items to your cart first.",
//       });
//       return;
//     }

//     setShowCart(false);

//     const orderData = {
//       tableNumber: tableInfo.tableNumber,
//       customerName: tableInfo.customerName,
//       userId: `user_${Date.now()}`,
//       items: cart,
//       customizedPlates: cart.map((item) => ({
//         name: item.name,
//         customizations: item.customizations,
//         instructions: item.specialInstructions,
//       })),
//       subtotal: getTotal(),
//       total: getTotal(),
//       medicalConditions: selectedConditions,
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName || "Guest"}`,
//     };

//     const result = await apiService.sendOrderToAPI(orderData);

//     if (result.success || result.fallbackStored) {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//       setActiveOrder({
//         orderId: result.orderId,
//         tableNumber: tableInfo.tableNumber,
//         customerName: tableInfo.customerName,
//         items: cart,
//         total: getTotal(),
//         timeRemaining: preparationTime * 60,
//         status: "confirmed",
//       });

//       setShowResult({
//         open: true,
//         type: "success",
//         title: "✅ Order Confirmed!",
//         message: `Table ${tableInfo.tableNumber} - Order placed!\nOrder ID: ${result.orderId.slice(-8)}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min`,
//       });

//       setCart([]);
//     } else {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: "Unable to place order. Please try again.",
//       });
//     }
//   };

//   const handleTimerExpire = () => {
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//     setActiveOrder((prev) => (prev ? { ...prev, status: "ready" } : null));
//   };

//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName: customerName || "" });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Browse our menu.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer position="bottom-right" />

//       <TableSelectorModal
//         isOpen={showTableModal}
//         onClose={() => {}}
//         onConfirm={handleTableConfirm}
//       />

//       <ConditionModal
//         isOpen={showConditionModal}
//         onClose={() => setShowConditionModal(false)}
//         onSelect={setSelectedConditions}
//         selected={selectedConditions}
//       />

//       <AnalysisModal
//         isOpen={showAnalysisModal}
//         onClose={() => setShowAnalysisModal(false)}
//         analysis={analysisResult}
//         isLoading={isAnalyzing}
//         onContinue={handleAnalysisContinue}
//         item={currentItem}
//         userConditions={selectedConditions}
//       />

//       <CustomizationModal
//         isOpen={showCustomModal}
//         onClose={() => setShowCustomModal(false)}
//         item={currentItem}
//         selectedConditions={selectedConditions}
//         onAddToCart={addToCartWithCustomizations}
//         analysis={analysisResult}
//       />

//       <CartModal
//         isOpen={showCart}
//         onClose={() => setShowCart(false)}
//         cart={cart}
//         updateQuantity={updateQuantity}
//         removeItem={removeItem}
//         getTotal={getTotal}
//         onCheckout={handleCheckout}
//         tableInfo={tableInfo}
//       />

//       <OrderDetailModal
//         isOpen={showOrderDetail}
//         onClose={() => setShowOrderDetail(false)}
//         order={activeOrder}
//       />

//       <ResultModal
//         isOpen={showResult.open}
//         onClose={() => setShowResult({ ...showResult, open: false })}
//         type={showResult.type}
//         title={showResult.title}
//         message={showResult.message}
//       />

//       {activeOrder && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//               <RestaurantIcon className="text-orange-500" /> NutriScan·AI
//             </h1>
//             <p className="text-gray-500 text-sm">
//               Table {tableInfo.tableNumber}{" "}
//               {tableInfo.customerName && `· ${tableInfo.customerName}`} ·
//               AI-Powered Ingredient Analysis
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowConditionModal(true)}
//               className={`p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? "bg-purple-500 text-white" : "bg-white text-purple-500"}`}
//             >
//               <HealthIcon />
//               {selectedConditions.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                   {selectedConditions.length}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setShowCart(true)}
//               className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <CartIcon className="text-orange-500" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.reduce((a, b) => a + b.quantity, 0)}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Health Banner - Shows selected conditions */}
//         {selectedConditions.length > 0 && (
//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
//             <div className="flex justify-between items-center flex-wrap gap-2">
//               <div className="flex items-center gap-2">
//                 <ShieldIcon className="text-emerald-600" />
//                 <span className="text-sm text-emerald-800">
//                   🛡️ Personalized for: {selectedConditions.join(", ")}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowConditionModal(true)}
//                 className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
//               >
//                 Update Conditions
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search */}
//         <div className="relative mb-4">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm"
//             placeholder="Search dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-auto pb-2 mb-4">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-sm ${
//                 activeCategory === cat
//                   ? "bg-orange-500 text-white shadow-md"
//                   : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
//               }`}
//             >
//               {cat === "all" ? "All Items" : cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
//               onClick={() => handleItemClick(item)}
//             >
//               <img
//                 src={item.image}
//                 className="h-36 w-full object-cover"
//                 alt={item.name}
//               />
//               <div className="p-3">
//                 <h3 className="font-bold text-gray-800">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-1 mt-1">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-orange-600 font-bold">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1">
//                     <TimeIcon fontSize="small" /> {item.prepTime}min
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-12">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">No items match your search.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               ←
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`w-8 h-8 rounded ${currentPage === p ? "bg-orange-500 text-white" : "bg-white"}`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   WarningAmber as WarningAmberIcon,
//   TableRestaurant as TableIcon,
//   Timer as TimerIcon,
//   HealthAndSafety as HealthIcon,
//   Favorite as FavoriteIcon,
//   Psychology as PsychologyIcon,
//   Healing as HealingIcon,
//   Science as ScienceIcon,
//   Shield as ShieldIcon,
//   FitnessCenter as FitnessIcon,
//   Edit as EditIcon,
//   Restaurant as RestaurantIcon,
//   Person as PersonIcon,
//   Dangerous as DangerousIcon,
//   Warning as WarningIcon,
//   Check as CheckIcon,
// } from "@mui/icons-material";

// // ========== MEDICAL CONDITIONS DATABASE ==========
// const MEDICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Peanut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Severe allergic reaction to peanuts",
//   },
//   {
//     id: 2,
//     name: "Tree Nut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to almonds, walnuts, cashews, etc.",
//   },
//   {
//     id: 3,
//     name: "Shellfish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to shrimp, crab, lobster",
//   },
//   {
//     id: 4,
//     name: "Fish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to finned fish",
//   },
//   {
//     id: 5,
//     name: "Egg Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to eggs",
//   },
//   {
//     id: 6,
//     name: "Soy Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to soy products",
//   },
//   {
//     id: 7,
//     name: "Wheat Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to wheat",
//   },
//   {
//     id: 8,
//     name: "Milk Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to dairy products",
//   },
//   {
//     id: 9,
//     name: "Celiac Disease",
//     category: "Autoimmune",
//     severity: "high",
//     description: "Cannot consume gluten",
//   },
//   {
//     id: 10,
//     name: "Lactose Intolerance",
//     category: "Digestive",
//     severity: "low",
//     description: "Difficulty digesting lactose",
//   },
//   {
//     id: 11,
//     name: "Type 2 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Blood sugar management needed",
//   },
//   {
//     id: 12,
//     name: "Type 1 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Insulin dependent",
//   },
//   {
//     id: 13,
//     name: "Hypertension",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "High blood pressure",
//   },
//   {
//     id: 14,
//     name: "High Cholesterol",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "Cholesterol management needed",
//   },
//   {
//     id: 15,
//     name: "Gout",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Uric acid buildup",
//   },
//   {
//     id: 16,
//     name: "GERD",
//     category: "Digestive",
//     severity: "low",
//     description: "Acid reflux",
//   },
//   {
//     id: 17,
//     name: "Kidney Disease",
//     category: "Renal",
//     severity: "high",
//     description: "Limited sodium and potassium",
//   },
//   {
//     id: 18,
//     name: "Migraine",
//     category: "Neurological",
//     severity: "low",
//     description: "Trigger foods may cause headaches",
//   },
// ];

// // ========== MENU ITEMS ==========
// const MENU_ITEMS = [
//   {
//     id: 1,
//     name: "Isombe ya Nyama",
//     price: 2800,
//     ingredients: [
//       "cassava leaves",
//       "beef",
//       "coconut milk",
//       "peanut flour",
//       "palm oil",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "pepper sauce", "potato", "spices", "salt"],
//     description: "Grilled beef skewers with fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//   },
//   {
//     id: 3,
//     name: "Ibiharage",
//     price: 1800,
//     ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
//     description: "Rwandan bean stew - vegan",
//     prepTime: 12,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//   },
//   {
//     id: 4,
//     name: "Matoke ya Nyama",
//     price: 3200,
//     ingredients: [
//       "green plantain",
//       "goat meat",
//       "ginger",
//       "onion",
//       "coconut oil",
//     ],
//     description: "Steamed plantain with goat stew",
//     prepTime: 20,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//   },
//   {
//     id: 5,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
//     description: "Fresh lake tilapia",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//   },
//   {
//     id: 6,
//     name: "Chicken Shawarma",
//     price: 4200,
//     ingredients: ["chicken", "yogurt", "garlic", "spices", "pita"],
//     description: "Marinated chicken wrap",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
//   },
//   {
//     id: 7,
//     name: "Beef Burger",
//     price: 4800,
//     ingredients: ["beef patty", "lettuce", "tomato", "cheese", "bun"],
//     description: "Angus beef burger with cheese",
//     prepTime: 12,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//   },
//   {
//     id: 8,
//     name: "Vegetable Pad Thai",
//     price: 3800,
//     ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime"],
//     description: "Classic Thai noodles",
//     prepTime: 14,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
//   },
//   {
//     id: 9,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//   },
//   {
//     id: 10,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//   },
//   {
//     id: 11,
//     name: "Mango Sticky Rice",
//     price: 3500,
//     ingredients: ["glutinous rice", "mango", "coconut milk", "sugar"],
//     description: "Thai dessert",
//     prepTime: 10,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
//   },
//   {
//     id: 12,
//     name: "Fresh Lemonade",
//     price: 1500,
//     ingredients: ["lemon", "sugar", "water", "mint"],
//     description: "Hand-squeezed lemonade",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
//   },
// ];

// // ========== INGREDIENT RISK DATABASE ==========
// // This maps each medical condition to ingredients that trigger it
// const INGREDIENT_RISK_DATABASE = {
//   "Peanut Allergy": {
//     keywords: [
//       "peanut",
//       "peanut flour",
//       "groundnut",
//       "arachis",
//       "peanut butter",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS PEANUTS - Severe allergic reaction possible",
//     modification: "Substitute with sunflower seed butter",
//     safeAlternative: "Sunflower Seed Butter",
//   },
//   "Tree Nut Allergy": {
//     keywords: [
//       "almond",
//       "walnut",
//       "cashew",
//       "pistachio",
//       "hazelnut",
//       "coconut",
//       "macadamia",
//       "pecan",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS TREE NUTS - Potential anaphylaxis risk",
//     modification: "Omit nuts or substitute with seeds",
//     safeAlternative: "Pumpkin or sunflower seeds",
//   },
//   "Shellfish Allergy": {
//     keywords: [
//       "shrimp",
//       "prawn",
//       "crab",
//       "lobster",
//       "crayfish",
//       "langoustine",
//       "shellfish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS SHELLFISH - Severe allergic reaction risk",
//     modification: "Substitute with mushrooms or chicken",
//     safeAlternative: "King oyster mushroom or chicken",
//   },
//   "Fish Allergy": {
//     keywords: [
//       "tilapia",
//       "salmon",
//       "tuna",
//       "mackerel",
//       "cod",
//       "bass",
//       "trout",
//       "fish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS FISH - Allergic reaction possible",
//     modification: "Substitute with chicken or tofu",
//     safeAlternative: "Grilled chicken or tofu",
//   },
//   "Milk Allergy": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//       "whey",
//       "casein",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS DAIRY - Milk allergy risk",
//     modification: "Use plant-based dairy alternatives",
//     safeAlternative: "Oat milk, coconut milk, vegan cheese",
//   },
//   "Celiac Disease": {
//     keywords: [
//       "wheat",
//       "flour",
//       "gluten",
//       "barley",
//       "rye",
//       "bread",
//       "pita",
//       "bun",
//       "pasta",
//       "dough",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS GLUTEN - Autoimmune reaction trigger",
//     modification: "Use gluten-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour, almond flour",
//   },
//   "Egg Allergy": {
//     keywords: ["egg", "eggs", "mayonnaise", "albumin", "meringue"],
//     severity: "moderate",
//     message: "⚡ CONTAINS EGGS - Allergic reaction possible",
//     modification: "Use egg replacer or omit",
//     safeAlternative: "Flax egg or commercial egg replacer",
//   },
//   "Soy Allergy": {
//     keywords: ["soy", "tofu", "soy sauce", "edamame", "miso", "tempeh"],
//     severity: "moderate",
//     message: "⚡ CONTAINS SOY - Potential allergen",
//     modification: "Use coconut aminos instead of soy sauce",
//     safeAlternative: "Coconut aminos, chickpea tofu",
//   },
//   "Wheat Allergy": {
//     keywords: ["wheat", "flour", "bread", "pita", "bun", "pasta", "dough"],
//     severity: "moderate",
//     message: "⚡ CONTAINS WHEAT - Allergic reaction possible",
//     modification: "Use gluten-free or wheat-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour",
//   },
//   "Type 2 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//       "sweetener",
//       "coconut sugar",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SUGAR - May spike blood glucose",
//     modification: "Use sugar-free sweetener or reduce sugar",
//     safeAlternative: "Monk fruit, stevia, erythritol",
//   },
//   "Type 1 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//     ],
//     severity: "moderate",
//     message: "⚡ CONTAINS SUGAR - Requires insulin adjustment",
//     modification: "Request sugar-free version",
//     safeAlternative: "Sugar-free sweetener",
//   },
//   Hypertension: {
//     keywords: [
//       "salt",
//       "sodium",
//       "soy sauce",
//       "teriyaki",
//       "fish sauce",
//       "cured",
//       "pickled",
//       "broth",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SODIUM - May increase blood pressure",
//     modification: "Request low-sodium preparation",
//     safeAlternative: "Low-sodium version, herbs instead of salt",
//   },
//   "High Cholesterol": {
//     keywords: [
//       "butter",
//       "palm oil",
//       "coconut milk",
//       "beef fat",
//       "lard",
//       "fried",
//       "cheese",
//       "cream",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SATURATED FAT - May affect cholesterol",
//     modification: "Use heart-healthy oils (olive, avocado)",
//     safeAlternative: "Olive oil, avocado oil",
//   },
//   Gout: {
//     keywords: [
//       "beef",
//       "red meat",
//       "organ meat",
//       "sardines",
//       "anchovies",
//       "shellfish",
//       "beef sirloin",
//       "goat meat",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH PURINE - May trigger gout flare",
//     modification: "Choose poultry or plant protein instead",
//     safeAlternative: "Chicken, turkey, tofu, beans",
//   },
//   "Kidney Disease": {
//     keywords: [
//       "salt",
//       "sodium",
//       "potassium",
//       "phosphorus",
//       "beans",
//       "legumes",
//       "dairy",
//       "nuts",
//     ],
//     severity: "high",
//     message: "⚠️ MAY STRESS KIDNEYS - Consult your doctor",
//     modification: "Limited portion with medical approval",
//     safeAlternative: "Consult healthcare provider",
//   },
//   "Lactose Intolerance": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//     ],
//     severity: "low",
//     message: "ℹ️ CONTAINS LACTOSE - May cause digestive discomfort",
//     modification: "Use lactose-free or plant-based dairy",
//     safeAlternative: "Lactose-free milk, vegan cheese",
//   },
//   GERD: {
//     keywords: [
//       "tomato",
//       "citrus",
//       "lemon",
//       "lime",
//       "spicy",
//       "chili",
//       "coffee",
//       "chocolate",
//       "mint",
//       "onion",
//       "garlic",
//     ],
//     severity: "low",
//     message: "ℹ️ MAY TRIGGER REFLUX - Eat with caution",
//     modification: "Request mild version without triggers",
//     safeAlternative: "Mild herb seasoning",
//   },
//   Migraine: {
//     keywords: [
//       "caffeine",
//       "coffee",
//       "chocolate",
//       "aged cheese",
//       "red wine",
//       "processed meat",
//       "msg",
//     ],
//     severity: "low",
//     message: "ℹ️ POTENTIAL MIGRAINE TRIGGER",
//     modification: "Omit trigger ingredients",
//     safeAlternative: "Caffeine-free, chocolate-free version",
//   },
// };

// // ========== INGREDIENT ANALYSIS FUNCTION ==========
// // This analyzes each ingredient against user's medical conditions
// const analyzeDishForConditions = (item, userConditions) => {
//   if (!userConditions || userConditions.length === 0) {
//     return {
//       overallStatus: "safe",
//       overallColor: "green",
//       overallIcon: "✅",
//       overallMessage:
//         "This dish appears safe based on standard dietary guidelines",
//       recommendation: "Enjoy your meal! No medical conditions selected.",
//       ingredientAnalysis: item.ingredients.map((ing) => ({
//         ingredient: ing,
//         status: "safe",
//         statusIcon: "✅",
//         message: "No conflicts detected with your profile",
//         severity: "none",
//         modificationAvailable: false,
//         safeAlternative: null,
//       })),
//       canBeModified: false,
//       highRiskCount: 0,
//       moderateRiskCount: 0,
//       lowRiskCount: 0,
//     };
//   }

//   const ingredientAnalysis = [];
//   let highRiskCount = 0;
//   let moderateRiskCount = 0;
//   let lowRiskCount = 0;
//   let modificationsAvailable = [];

//   for (const ingredient of item.ingredients) {
//     let highestSeverity = "safe";
//     let relevantCondition = null;
//     let relevantMessage = "";
//     let modification = null;
//     let safeAlternative = null;

//     // Check ingredient against each user condition
//     for (const condition of userConditions) {
//       const riskRule = INGREDIENT_RISK_DATABASE[condition];
//       if (riskRule) {
//         // Check if ingredient matches any keyword for this condition
//         const matches = riskRule.keywords.some((keyword) =>
//           ingredient.toLowerCase().includes(keyword.toLowerCase()),
//         );

//         if (matches) {
//           // Track highest severity
//           if (riskRule.severity === "high") {
//             highestSeverity = "high";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "moderate" &&
//             highestSeverity !== "high"
//           ) {
//             highestSeverity = "moderate";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "low" &&
//             highestSeverity === "safe"
//           ) {
//             highestSeverity = "low";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           }
//         }
//       }
//     }

//     // Count risks by severity
//     if (highestSeverity === "high") highRiskCount++;
//     else if (highestSeverity === "moderate") moderateRiskCount++;
//     else if (highestSeverity === "low") lowRiskCount++;

//     // Build analysis for this ingredient
//     let statusIcon, statusMessage, statusColor;
//     switch (highestSeverity) {
//       case "high":
//         statusIcon = "🔴";
//         statusColor = "red";
//         statusMessage =
//           relevantMessage ||
//           `HIGH RISK: Contains ${ingredient} - Avoid for ${relevantCondition || "your condition"}`;
//         break;
//       case "moderate":
//         statusIcon = "🟡";
//         statusColor = "orange";
//         statusMessage =
//           relevantMessage ||
//           `CAUTION: ${ingredient} - Limit intake for ${relevantCondition || "your condition"}`;
//         break;
//       case "low":
//         statusIcon = "🟢";
//         statusColor = "yellow";
//         statusMessage =
//           relevantMessage ||
//           `LOW RISK: ${ingredient} - Generally acceptable but monitor symptoms`;
//         break;
//       default:
//         statusIcon = "✅";
//         statusColor = "green";
//         statusMessage = `SAFE: ${ingredient} - No conflicts with your conditions`;
//     }

//     if (modification && !modificationsAvailable.includes(modification)) {
//       modificationsAvailable.push(modification);
//     }

//     ingredientAnalysis.push({
//       ingredient: ingredient,
//       status: highestSeverity,
//       statusIcon: statusIcon,
//       statusColor: statusColor,
//       message: statusMessage,
//       relevantCondition: relevantCondition,
//       modificationAvailable: modification !== null,
//       modificationText: modification,
//       safeAlternative: safeAlternative,
//     });
//   }

//   // Determine overall dish status
//   let overallStatus, overallColor, overallIcon, overallMessage, recommendation;

//   if (highRiskCount > 0) {
//     overallStatus = "high_risk";
//     overallColor = "red";
//     overallIcon = "🔴";
//     overallMessage = `⚠️ HIGH RISK DISH - Contains ${highRiskCount} ingredient(s) that may be dangerous for your condition(s)`;
//     recommendation =
//       "STRONG RECOMMENDATION: Do NOT order this dish, or request significant modifications below";
//   } else if (moderateRiskCount > 0) {
//     overallStatus = "moderate_risk";
//     overallColor = "orange";
//     overallIcon = "🟡";
//     overallMessage = `⚡ MODERATE RISK DISH - Contains ${moderateRiskCount} ingredient(s) that should be limited with your condition(s)`;
//     recommendation =
//       "RECOMMENDATION: Order with modifications or in small portions only";
//   } else if (lowRiskCount > 0) {
//     overallStatus = "low_risk";
//     overallColor = "yellow";
//     overallIcon = "🟢";
//     overallMessage = `ℹ️ LOW RISK DISH - Contains ${lowRiskCount} ingredient(s) that may cause mild symptoms for some people`;
//     recommendation = "Generally acceptable, but monitor for any reaction";
//   } else {
//     overallStatus = "safe";
//     overallColor = "green";
//     overallIcon = "✅";
//     overallMessage =
//       "✓ SAFE DISH - All ingredients appear compatible with your medical conditions";
//     recommendation = "This dish is safe for you to enjoy!";
//   }

//   return {
//     overallStatus: overallStatus,
//     overallColor: overallColor,
//     overallIcon: overallIcon,
//     overallMessage: overallMessage,
//     recommendation: recommendation,
//     ingredientAnalysis: ingredientAnalysis,
//     canBeModified: modificationsAvailable.length > 0,
//     modificationsAvailable: modificationsAvailable,
//     highRiskCount: highRiskCount,
//     moderateRiskCount: moderateRiskCount,
//     lowRiskCount: lowRiskCount,
//   };
// };

// // ========== API SERVICE FOR ORDER STORAGE ==========
// const ORDER_API_URL = "https://your-api-endpoint.com/api/orders";

// const apiService = {
//   sendOrderToAPI: async (orderData) => {
//     const payload = {
//       orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       tableNumber: orderData.tableNumber,
//       customerName: orderData.customerName,
//       userId: orderData.userId,
//       orderType: orderData.orderType || "dine-in",
//       items: orderData.items.map((item) => ({
//         id: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         originalPrice: item.price,
//         finalPrice: item.finalPrice,
//         ingredients: item.ingredients,
//         customizations: item.customizations || [],
//         modifications: item.modifications || {},
//         specialInstructions: item.specialInstructions || "",
//         healthAnalysis: item.healthAnalysis || [],
//         preparationTime: item.prepTime || 15,
//       })),
//       customizedPlates: orderData.customizedPlates || [],
//       subtotal: orderData.subtotal,
//       tax: orderData.tax || 0,
//       total: orderData.total,
//       medicalConditions: orderData.medicalConditions,
//       timestamp: new Date().toISOString(),
//       estimatedPreparationTime:
//         orderData.items.reduce(
//           (max, item) => Math.max(max, item.prepTime || 15),
//           15,
//         ) + 5,
//       status: "confirmed",
//       notes: orderData.notes || "",
//     };

//     try {
//       const response = await axios.post(ORDER_API_URL, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       const storedOrders = JSON.parse(
//         localStorage.getItem("order_history") || "[]",
//       );
//       storedOrders.push(payload);
//       localStorage.setItem("order_history", JSON.stringify(storedOrders));
//       return { success: true, data: response.data, orderId: payload.orderId };
//     } catch (error) {
//       console.error("API error, storing locally:", error);
//       const fallbackOrders = JSON.parse(
//         localStorage.getItem("fallback_orders") || "[]",
//       );
//       fallbackOrders.push({
//         ...payload,
//         fallbackTimestamp: new Date().toISOString(),
//       });
//       localStorage.setItem("fallback_orders", JSON.stringify(fallbackOrders));
//       return {
//         success: false,
//         error: error.message,
//         fallbackStored: true,
//         orderId: payload.orderId,
//       };
//     }
//   },

//   getOrderStatus: async (orderId) => {
//     try {
//       const response = await axios.get(`${ORDER_API_URL}/${orderId}/status`);
//       return response.data;
//     } catch (error) {
//       console.error("Status fetch error:", error);
//       return null;
//     }
//   },

//   getTableOrders: async (tableNumber) => {
//     try {
//       const response = await axios.get(
//         `${ORDER_API_URL}?tableNumber=${tableNumber}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch table orders:", error);
//       return [];
//     }
//   },
// };

// // ========== FLOATING TIMER COMPONENT ==========
// const FloatingTimer = ({
//   orderId,
//   tableNumber,
//   initialDuration,
//   onExpire,
//   onOpenModal,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire && onExpire();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getTimerColor = () => {
//     if (timeLeft <= 60) return "bg-red-500 animate-pulse";
//     if (timeLeft <= 300) return "bg-orange-500";
//     return "bg-green-500";
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
//     >
//       <div
//         className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}
//       >
//         <TimerIcon className="animate-pulse" />
//         <div className="flex flex-col">
//           <span className="text-xs font-medium">
//             Order #{orderId.slice(-6)} | Table {tableNumber}
//           </span>
//           <span className="text-xl font-mono font-bold tracking-wider">
//             {formatTime(timeLeft)}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== TABLE SELECTOR MODAL ==========
// const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
//   const [tableNumber, setTableNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-sm">
//             Please enter your table details
//           </p>
//         </div>
//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name (Optional)
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber) onConfirm(tableNumber, customerName);
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Start Ordering
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CONDITION SELECTION MODAL ==========
// const ConditionModal = ({ isOpen, onClose, onSelect, selected }) => {
//   const [localSelected, setLocalSelected] = useState(selected);

//   useEffect(() => {
//     if (isOpen) setLocalSelected(selected);
//   }, [isOpen, selected]);

//   const toggle = (cond) => {
//     setLocalSelected((prev) =>
//       prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond],
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <HealthIcon /> Your Medical Conditions
//           </h2>
//           <p className="text-purple-200 text-sm">
//             Select all that apply for personalized ingredient analysis
//           </p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="grid grid-cols-2 gap-2">
//             {MEDICAL_CONDITIONS.map((cond) => (
//               <button
//                 key={cond.id}
//                 onClick={() => toggle(cond.name)}
//                 className={`p-2 rounded-lg text-left text-sm transition ${
//                   localSelected.includes(cond.name)
//                     ? "bg-purple-100 border-2 border-purple-500 text-purple-800"
//                     : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="font-medium">{cond.name}</div>
//                 <div className="text-xs opacity-70">{cond.category}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Skip
//           </button>
//           <button
//             onClick={() => {
//               onSelect(localSelected);
//               onClose();
//             }}
//             className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold"
//           >
//             Apply ({localSelected.length})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== INGREDIENT ANALYSIS MODAL ==========
// const AnalysisModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   isLoading,
//   onContinue,
//   item,
//   userConditions,
// }) => {
//   const [expandedIngredient, setExpandedIngredient] = useState(null);

//   if (!isOpen) return null;

//   const getHeaderColor = () => {
//     if (analysis?.overallColor === "red") return "from-red-600 to-red-700";
//     if (analysis?.overallColor === "orange")
//       return "from-orange-500 to-orange-600";
//     if (analysis?.overallColor === "yellow")
//       return "from-yellow-500 to-amber-500";
//     return "from-emerald-600 to-green-600";
//   };

//   const getBorderColor = (statusColor) => {
//     switch (statusColor) {
//       case "red":
//         return "border-red-500 bg-red-50";
//       case "orange":
//         return "border-orange-500 bg-orange-50";
//       case "yellow":
//         return "border-yellow-500 bg-yellow-50";
//       default:
//         return "border-green-500 bg-green-50";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col relative"
//       >
//         <div
//           className={`bg-gradient-to-r ${getHeaderColor()} p-4 rounded-t-2xl text-white`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <ScienceIcon />
//               <h2 className="font-bold text-xl">Ingredient Safety Analysis</h2>
//             </div>
//             <span className="text-2xl">{analysis?.overallIcon}</span>
//           </div>
//           <p className="text-white/80 text-sm mt-1">{item?.name}</p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
//               <p className="text-gray-600">
//                 Analyzing ingredients against your conditions...
//               </p>
//             </div>
//           ) : analysis ? (
//             <>
//               {/* Overall Status Banner */}
//               <div
//                 className={`rounded-xl p-4 mb-4 border-l-4 ${getBorderColor(analysis.overallColor)}`}
//               >
//                 <div className="flex items-start gap-3">
//                   <span className="text-2xl">{analysis.overallIcon}</span>
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-800">
//                       {analysis.overallMessage}
//                     </p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {analysis.recommendation}
//                     </p>
//                     {(analysis.highRiskCount > 0 ||
//                       analysis.moderateRiskCount > 0) && (
//                       <div className="flex gap-3 mt-2 text-xs">
//                         {analysis.highRiskCount > 0 && (
//                           <span className="text-red-600">
//                             🔴 {analysis.highRiskCount} high risk
//                           </span>
//                         )}
//                         {analysis.moderateRiskCount > 0 && (
//                           <span className="text-orange-600">
//                             🟡 {analysis.moderateRiskCount} moderate risk
//                           </span>
//                         )}
//                         {analysis.lowRiskCount > 0 && (
//                           <span className="text-yellow-600">
//                             🟢 {analysis.lowRiskCount} low risk
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Ingredient Analysis List */}
//               <h3 className="font-semibold text-gray-700 mb-3">
//                 📋 Ingredient Analysis
//               </h3>
//               <div className="space-y-3">
//                 {analysis.ingredientAnalysis.map((ing, idx) => (
//                   <div key={idx} className="border rounded-xl overflow-hidden">
//                     <button
//                       onClick={() =>
//                         setExpandedIngredient(
//                           expandedIngredient === idx ? null : idx,
//                         )
//                       }
//                       className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-xl">{ing.statusIcon}</span>
//                         <span className="font-medium text-gray-800">
//                           {ing.ingredient}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`text-xs px-2 py-1 rounded-full ${
//                             ing.status === "high"
//                               ? "bg-red-100 text-red-700"
//                               : ing.status === "moderate"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : ing.status === "low"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-green-100 text-green-700"
//                           }`}
//                         >
//                           {ing.status === "high"
//                             ? "HIGH RISK"
//                             : ing.status === "moderate"
//                               ? "CAUTION"
//                               : ing.status === "low"
//                                 ? "LOW RISK"
//                                 : "SAFE"}
//                         </span>
//                         <span className="text-gray-400">
//                           {expandedIngredient === idx ? "▲" : "▼"}
//                         </span>
//                       </div>
//                     </button>

//                     {expandedIngredient === idx && (
//                       <div className="p-3 bg-gray-50 border-t">
//                         <p className="text-sm text-gray-700 mb-2">
//                           {ing.message}
//                         </p>
//                         {ing.relevantCondition && (
//                           <p className="text-xs text-gray-500">
//                             ⚠️ Relevant condition: {ing.relevantCondition}
//                           </p>
//                         )}
//                         {ing.modificationAvailable && (
//                           <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                             <p className="text-xs font-medium text-emerald-700">
//                               ✓ Modification Available:
//                             </p>
//                             <p className="text-xs text-emerald-600">
//                               {ing.modificationText}
//                             </p>
//                             {ing.safeAlternative && (
//                               <p className="text-xs text-emerald-600 mt-1">
//                                 Suggested: {ing.safeAlternative}
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Modification Summary */}
//               {analysis.modificationsAvailable &&
//                 analysis.modificationsAvailable.length > 0 && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-xl">
//                     <p className="text-sm font-medium text-blue-700 mb-1">
//                       ✨ Customization Options Available
//                     </p>
//                     <ul className="text-xs text-blue-600 space-y-1">
//                       {analysis.modificationsAvailable
//                         .slice(0, 3)
//                         .map((mod, idx) => (
//                           <li key={idx}>• {mod}</li>
//                         ))}
//                     </ul>
//                   </div>
//                 )}
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <CheckIcon className="text-green-500 text-5xl mx-auto mb-3" />
//               <p className="text-green-700 font-medium">✓ No analysis needed</p>
//               <p className="text-xs text-gray-500">
//                 Select medical conditions first for personalized analysis
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
//             disabled={analysis?.overallStatus === "high_risk"}
//           >
//             {analysis?.overallStatus === "high_risk"
//               ? "⚠️ Not Recommended"
//               : "Continue to Order"}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({
//   isOpen,
//   onClose,
//   item,
//   selectedConditions,
//   onAddToCart,
//   analysis,
// }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showModifications, setShowModifications] = useState(false);
//   const [selectedModifications, setSelectedModifications] = useState({});

//   if (!isOpen) return null;

//   // Get ingredients that need modification based on analysis
//   const riskyIngredients =
//     analysis?.ingredientAnalysis?.filter(
//       (ing) => ing.status !== "safe" && ing.modificationAvailable,
//     ) || [];

//   const handleApplyModification = (ingredient, modification) => {
//     setSelectedModifications((prev) => ({
//       ...prev,
//       [ingredient]: modification,
//     }));
//     setCustomizations((prev) => {
//       const filtered = prev.filter((c) => !c.includes(ingredient));
//       return [...filtered, `Replace ${ingredient} - ${modification}`];
//     });
//     toast.success(`✓ Modification applied for ${ingredient}`);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <EditIcon /> Customize Your Order
//           </h2>
//           <p className="text-amber-100 text-sm">
//             {item.name} - RWF {item.price.toLocaleString()}
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Original Ingredients */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📦 Original Ingredients:
//             </h3>
//             <div className="flex flex-wrap gap-1">
//               {item.ingredients.map((ing, idx) => {
//                 const isRisky = riskyIngredients.some(
//                   (r) => r.ingredient === ing,
//                 );
//                 return (
//                   <span
//                     key={idx}
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       isRisky
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {ing} {isRisky && "⚠️"}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Health-Safe Modifications */}
//           {riskyIngredients.length > 0 && (
//             <div className="mb-4">
//               <button
//                 onClick={() => setShowModifications(!showModifications)}
//                 className="w-full text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200"
//               >
//                 <div className="flex items-center gap-2">
//                   <ShieldIcon className="text-emerald-600" />
//                   <span className="font-semibold text-emerald-800">
//                     Health-Safe Modifications Available
//                   </span>
//                 </div>
//                 <p className="text-xs text-emerald-600 mt-1">
//                   {riskyIngredients.length} ingredient(s) can be modified for
//                   your safety
//                 </p>
//               </button>

//               {showModifications && (
//                 <div className="mt-2 space-y-2">
//                   {riskyIngredients.map((ing, idx) => (
//                     <div key={idx} className="bg-green-50 p-3 rounded-lg">
//                       <div className="flex items-start gap-2">
//                         <span className="text-xl">{ing.statusIcon}</span>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-800">
//                             {ing.ingredient}
//                           </p>
//                           <p className="text-xs text-gray-600">{ing.message}</p>
//                           {ing.modificationText && (
//                             <div className="mt-2">
//                               <p className="text-xs font-medium text-emerald-700">
//                                 Suggested modification:
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 {ing.modificationText}
//                               </p>
//                               {ing.safeAlternative && (
//                                 <p className="text-xs text-emerald-600">
//                                   → {ing.safeAlternative}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={() =>
//                             handleApplyModification(
//                               ing.ingredient,
//                               ing.modificationText,
//                             )
//                           }
//                           className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
//                           disabled={selectedModifications[ing.ingredient]}
//                         >
//                           {selectedModifications[ing.ingredient]
//                             ? "✓ Applied"
//                             : "Apply"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Applied Customizations */}
//           {customizations.length > 0 && (
//             <div className="mb-4">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 ✓ Applied Customizations:
//               </h3>
//               {customizations.map((cust, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-100 p-2 rounded-lg text-sm mb-1 flex justify-between"
//                 >
//                   <span>{cust}</span>
//                   <button
//                     onClick={() =>
//                       setCustomizations((prev) =>
//                         prev.filter((_, i) => i !== idx),
//                       )
//                     }
//                     className="text-red-500"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Special Instructions */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📝 Special Instructions:
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests? (e.g., no salt, extra well-done, etc.)"
//               className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//               rows="2"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Add to Cart (RWF {item.price.toLocaleString()})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CART MODAL ==========
// const CartModal = ({
//   isOpen,
//   onClose,
//   cart,
//   updateQuantity,
//   removeItem,
//   getTotal,
//   onCheckout,
//   tableInfo,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-12">
//               <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div key={item.cartId} className="mb-3 pb-3 border-b">
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="text-xs text-gray-500 mt-1">
//                         {item.customizations.map((c, i) => (
//                           <div key={i}>• {c}</div>
//                         ))}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600 mt-1">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold">
//                     RWF {item.finalPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <AddIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {cart.length > 0 && (
//           <div className="p-4 border-t">
//             <div className="flex justify-between font-bold mb-3">
//               <span>Total</span>
//               <span className="text-orange-600">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAIL MODAL ==========
// const OrderDetailModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p>
//               <strong>Order ID:</strong> {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName || "Guest"}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//             <p>
//               <strong>Time Remaining:</strong>{" "}
//               {Math.floor(order.timeRemaining / 60)}:
//               {(order.timeRemaining % 60).toString().padStart(2, "0")}
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice.toLocaleString()}</span>
//               </div>
//               {item.customizations && item.customizations.length > 0 && (
//                 <div className="text-xs text-gray-500 mt-1">
//                   {item.customizations.map((c, i) => (
//                     <div key={i}>• {c}</div>
//                   ))}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600 mt-1">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-500 text-white py-2 rounded-lg"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== RESULT MODAL ==========
// const ResultModal = ({ isOpen, onClose, type, title, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
//       >
//         {type === "success" && (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         )}
//         {type === "error" && (
//           <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
//         )}
//         <h2 className="text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-600 whitespace-pre-line mb-6">{message}</p>
//         <button
//           onClick={onClose}
//           className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
//         >
//           OK
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = () => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showTableModal, setShowTableModal] = useState(true);
//   const [showConditionModal, setShowConditionModal] = useState(false);
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [showOrderDetail, setShowOrderDetail] = useState(false);
//   const [showResult, setShowResult] = useState({
//     open: false,
//     type: "",
//     title: "",
//     message: "",
//   });
//   const [tableInfo, setTableInfo] = useState({
//     tableNumber: null,
//     customerName: "",
//   });

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = MENU_ITEMS.filter(
//     (i) =>
//       (activeCategory === "all" || i.category === activeCategory) &&
//       i.name.toLowerCase().includes(search.toLowerCase()),
//   );
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const paginated = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   useEffect(() => setCurrentPage(1), [activeCategory, search]);

//   // Handle item click - perform ingredient analysis
//   const handleItemClick = async (item) => {
//     setCurrentItem(item);
//     setIsAnalyzing(true);
//     setShowAnalysisModal(true);

//     // Analyze ingredients against user's medical conditions
//     const analysis = analyzeDishForConditions(item, selectedConditions);
//     setAnalysisResult(analysis);
//     setIsAnalyzing(false);
//   };

//   const handleAnalysisContinue = () => {
//     setShowAnalysisModal(false);
//     setShowCustomModal(true);
//   };

//   const addToCartWithCustomizations = (item, customizations, instructions) => {
//     const newItem = {
//       ...item,
//       quantity: 1,
//       finalPrice: item.price,
//       customizations: customizations,
//       specialInstructions: instructions,
//       healthAnalysis: analysisResult,
//       cartId: cartIdCounter,
//     };
//     setCart((prev) => [...prev, newItem]);
//     setCartIdCounter((prev) => prev + 1);
//     toast.success(`${item.name} added to cart!`);
//     setShowCart(true);
//   };

//   const updateQuantity = (cartId, newQty) => {
//     if (newQty < 1) {
//       setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//       return;
//     }
//     setCart((prev) =>
//       prev.map((i) =>
//         i.cartId === cartId
//           ? { ...i, quantity: newQty, finalPrice: i.price * newQty }
//           : i,
//       ),
//     );
//   };

//   const removeItem = (cartId) =>
//     setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//   const getTotal = () => cart.reduce((sum, i) => sum + i.finalPrice, 0);

//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Cart Empty",
//         message: "Please add items to your cart first.",
//       });
//       return;
//     }

//     setShowCart(false);

//     const orderData = {
//       tableNumber: tableInfo.tableNumber,
//       customerName: tableInfo.customerName,
//       userId: `user_${Date.now()}`,
//       items: cart,
//       customizedPlates: cart.map((item) => ({
//         name: item.name,
//         customizations: item.customizations,
//         instructions: item.specialInstructions,
//       })),
//       subtotal: getTotal(),
//       total: getTotal(),
//       medicalConditions: selectedConditions,
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName || "Guest"}`,
//     };

//     const result = await apiService.sendOrderToAPI(orderData);

//     if (result.success || result.fallbackStored) {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//       setActiveOrder({
//         orderId: result.orderId,
//         tableNumber: tableInfo.tableNumber,
//         customerName: tableInfo.customerName,
//         items: cart,
//         total: getTotal(),
//         timeRemaining: preparationTime * 60,
//         status: "confirmed",
//       });

//       setShowResult({
//         open: true,
//         type: "success",
//         title: "✅ Order Confirmed!",
//         message: `Table ${tableInfo.tableNumber} - Order placed!\nOrder ID: ${result.orderId.slice(-8)}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min`,
//       });

//       setCart([]);
//     } else {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: "Unable to place order. Please try again.",
//       });
//     }
//   };

//   const handleTimerExpire = () => {
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//     setActiveOrder((prev) => (prev ? { ...prev, status: "ready" } : null));
//   };

//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName: customerName || "" });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Browse our menu.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer position="bottom-right" />

//       <TableSelectorModal
//         isOpen={showTableModal}
//         onClose={() => {}}
//         onConfirm={handleTableConfirm}
//       />

//       <ConditionModal
//         isOpen={showConditionModal}
//         onClose={() => setShowConditionModal(false)}
//         onSelect={setSelectedConditions}
//         selected={selectedConditions}
//       />

//       <AnalysisModal
//         isOpen={showAnalysisModal}
//         onClose={() => setShowAnalysisModal(false)}
//         analysis={analysisResult}
//         isLoading={isAnalyzing}
//         onContinue={handleAnalysisContinue}
//         item={currentItem}
//         userConditions={selectedConditions}
//       />

//       <CustomizationModal
//         isOpen={showCustomModal}
//         onClose={() => setShowCustomModal(false)}
//         item={currentItem}
//         selectedConditions={selectedConditions}
//         onAddToCart={addToCartWithCustomizations}
//         analysis={analysisResult}
//       />

//       <CartModal
//         isOpen={showCart}
//         onClose={() => setShowCart(false)}
//         cart={cart}
//         updateQuantity={updateQuantity}
//         removeItem={removeItem}
//         getTotal={getTotal}
//         onCheckout={handleCheckout}
//         tableInfo={tableInfo}
//       />

//       <OrderDetailModal
//         isOpen={showOrderDetail}
//         onClose={() => setShowOrderDetail(false)}
//         order={activeOrder}
//       />

//       <ResultModal
//         isOpen={showResult.open}
//         onClose={() => setShowResult({ ...showResult, open: false })}
//         type={showResult.type}
//         title={showResult.title}
//         message={showResult.message}
//       />

//       {activeOrder && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
//               <RestaurantIcon className="text-orange-500" /> NutriScan·AI
//             </h1>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               Table {tableInfo.tableNumber}{" "}
//               {tableInfo.customerName && `· ${tableInfo.customerName}`} ·
//               AI-Powered Ingredient Analysis
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowConditionModal(true)}
//               className={`relative p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? "bg-purple-500 text-white" : "bg-white text-purple-500"}`}
//             >
//               <HealthIcon />
//               {selectedConditions.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                   {selectedConditions.length}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setShowCart(true)}
//               className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <CartIcon className="text-orange-500" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.reduce((a, b) => a + b.quantity, 0)}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Health Banner - Shows selected conditions */}
//         {selectedConditions.length > 0 && (
//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <ShieldIcon className="text-emerald-600 flex-shrink-0" />
//                 <span className="text-sm text-emerald-800 break-words">
//                   🛡️ Personalized for: {selectedConditions.join(", ")}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowConditionModal(true)}
//                 className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
//               >
//                 Update Conditions
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search */}
//         <div className="relative mb-4">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm text-sm sm:text-base"
//             placeholder="Search dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs sm:text-sm ${
//                 activeCategory === cat
//                   ? "bg-orange-500 text-white shadow-md"
//                   : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
//               }`}
//             >
//               {cat === "all" ? "All Items" : cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
//               onClick={() => handleItemClick(item)}
//             >
//               <img
//                 src={item.image}
//                 className="h-32 sm:h-36 md:h-40 w-full object-cover"
//                 alt={item.name}
//               />
//               <div className="p-3">
//                 <h3 className="font-bold text-gray-800 text-sm sm:text-base">
//                   {item.name}
//                 </h3>
//                 <p className="text-xs text-gray-500 line-clamp-1 mt-1">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-orange-600 font-bold text-sm sm:text-base">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1">
//                     <TimeIcon fontSize="small" /> {item.prepTime}min
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-12">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">No items match your search.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               ←
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`w-8 h-8 rounded ${currentPage === p ? "bg-orange-500 text-white" : "bg-white"}`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   QrCodeScanner as QRIcon,
//   ShoppingCart as CartIcon,
//   AccessTime as TimeIcon,
//   Close as CloseIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
//   Search as SearchIcon,
//   Delete as DeleteIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   WarningAmber as WarningAmberIcon,
//   TableRestaurant as TableIcon,
//   Timer as TimerIcon,
//   HealthAndSafety as HealthIcon,
//   Favorite as FavoriteIcon,
//   Psychology as PsychologyIcon,
//   Healing as HealingIcon,
//   Science as ScienceIcon,
//   Shield as ShieldIcon,
//   FitnessCenter as FitnessIcon,
//   Edit as EditIcon,
//   Restaurant as RestaurantIcon,
//   Person as PersonIcon,
//   Dangerous as DangerousIcon,
//   Warning as WarningIcon,
//   Check as CheckIcon,
// } from "@mui/icons-material";

// // ========== MEDICAL CONDITIONS DATABASE ==========
// const MEDICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Peanut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Severe allergic reaction to peanuts",
//   },
//   {
//     id: 2,
//     name: "Tree Nut Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to almonds, walnuts, cashews, etc.",
//   },
//   {
//     id: 3,
//     name: "Shellfish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to shrimp, crab, lobster",
//   },
//   {
//     id: 4,
//     name: "Fish Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to finned fish",
//   },
//   {
//     id: 5,
//     name: "Egg Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to eggs",
//   },
//   {
//     id: 6,
//     name: "Soy Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to soy products",
//   },
//   {
//     id: 7,
//     name: "Wheat Allergy",
//     category: "Allergy",
//     severity: "moderate",
//     description: "Allergic to wheat",
//   },
//   {
//     id: 8,
//     name: "Milk Allergy",
//     category: "Allergy",
//     severity: "high",
//     description: "Allergic to dairy products",
//   },
//   {
//     id: 9,
//     name: "Celiac Disease",
//     category: "Autoimmune",
//     severity: "high",
//     description: "Cannot consume gluten",
//   },
//   {
//     id: 10,
//     name: "Lactose Intolerance",
//     category: "Digestive",
//     severity: "low",
//     description: "Difficulty digesting lactose",
//   },
//   {
//     id: 11,
//     name: "Type 2 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Blood sugar management needed",
//   },
//   {
//     id: 12,
//     name: "Type 1 Diabetes",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Insulin dependent",
//   },
//   {
//     id: 13,
//     name: "Hypertension",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "High blood pressure",
//   },
//   {
//     id: 14,
//     name: "High Cholesterol",
//     category: "Cardiovascular",
//     severity: "moderate",
//     description: "Cholesterol management needed",
//   },
//   {
//     id: 15,
//     name: "Gout",
//     category: "Metabolic",
//     severity: "moderate",
//     description: "Uric acid buildup",
//   },
//   {
//     id: 16,
//     name: "GERD",
//     category: "Digestive",
//     severity: "low",
//     description: "Acid reflux",
//   },
//   {
//     id: 17,
//     name: "Kidney Disease",
//     category: "Renal",
//     severity: "high",
//     description: "Limited sodium and potassium",
//   },
//   {
//     id: 18,
//     name: "Migraine",
//     category: "Neurological",
//     severity: "low",
//     description: "Trigger foods may cause headaches",
//   },
// ];

// // ========== MENU ITEMS ==========
// const MENU_ITEMS = [
//   {
//     id: 1,
//     name: "Isombe ya Nyama",
//     price: 2800,
//     ingredients: [
//       "cassava leaves",
//       "beef",
//       "coconut milk",
//       "peanut flour",
//       "palm oil",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "pepper sauce", "potato", "spices", "salt"],
//     description: "Grilled beef skewers with fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//   },
//   {
//     id: 3,
//     name: "Ibiharage",
//     price: 1800,
//     ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
//     description: "Rwandan bean stew - vegan",
//     prepTime: 12,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//   },
//   {
//     id: 4,
//     name: "Matoke ya Nyama",
//     price: 3200,
//     ingredients: [
//       "green plantain",
//       "goat meat",
//       "ginger",
//       "onion",
//       "coconut oil",
//     ],
//     description: "Steamed plantain with goat stew",
//     prepTime: 20,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//   },
//   {
//     id: 5,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
//     description: "Fresh lake tilapia",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//   },
//   {
//     id: 6,
//     name: "Chicken Shawarma",
//     price: 4200,
//     ingredients: ["chicken", "yogurt", "garlic", "spices", "pita"],
//     description: "Marinated chicken wrap",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
//   },
//   {
//     id: 7,
//     name: "Beef Burger",
//     price: 4800,
//     ingredients: ["beef patty", "lettuce", "tomato", "cheese", "bun"],
//     description: "Angus beef burger with cheese",
//     prepTime: 12,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//   },
//   {
//     id: 8,
//     name: "Vegetable Pad Thai",
//     price: 3800,
//     ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime"],
//     description: "Classic Thai noodles",
//     prepTime: 14,
//     category: "Vegan",
//     image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
//   },
//   {
//     id: 9,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//   },
//   {
//     id: 10,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//   },
//   {
//     id: 11,
//     name: "Mango Sticky Rice",
//     price: 3500,
//     ingredients: ["glutinous rice", "mango", "coconut milk", "sugar"],
//     description: "Thai dessert",
//     prepTime: 10,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
//   },
//   {
//     id: 12,
//     name: "Fresh Lemonade",
//     price: 1500,
//     ingredients: ["lemon", "sugar", "water", "mint"],
//     description: "Hand-squeezed lemonade",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
//   },
// ];

// // ========== DISEASE RISK DATABASE ==========
// // This maps each dish to potential health risks/diseases it may cause
// const DISEASE_RISK_DATABASE = {
//   "Isombe ya Nyama": {
//     risks: [
//       {
//         disease: "Gout",
//         riskLevel: "high",
//         explanation: "High purine content from beef and organ meats",
//         recommendation: "Limit consumption or choose leaner meats",
//       },
//       {
//         disease: "High Cholesterol",
//         riskLevel: "high",
//         explanation: "Contains palm oil and coconut milk high in saturated fats",
//         recommendation: "Request lighter preparation with less oil",
//       },
//       {
//         disease: "Peanut Allergy",
//         riskLevel: "critical",
//         explanation: "Contains peanut flour",
//         recommendation: "AVOID completely - severe allergic reaction risk",
//       },
//     ],
//   },
//   "Brochette de Boeuf": {
//     risks: [
//       {
//         disease: "Gout",
//         riskLevel: "high",
//         explanation: "Beef sirloin is high in purines",
//         recommendation: "Limit to once per week",
//       },
//       {
//         disease: "Hypertension",
//         riskLevel: "moderate",
//         explanation: "Contains salt and pepper sauce with sodium",
//         recommendation: "Request low-sodium preparation",
//       },
//       {
//         disease: "High Cholesterol",
//         riskLevel: "moderate",
//         explanation: "Red meat contains saturated fat",
//         recommendation: "Choose lean cuts and remove visible fat",
//       },
//     ],
//   },
//   "Ibiharage": {
//     risks: [
//       {
//         disease: "Gout",
//         riskLevel: "moderate",
//         explanation: "Beans contain moderate purines",
//         recommendation: "Safe in moderation, drink plenty of water",
//       },
//       {
//         disease: "GERD",
//         riskLevel: "low",
//         explanation: "Beans may cause bloating and gas",
//         recommendation: "Small portions recommended",
//       },
//     ],
//   },
//   "Matoke ya Nyama": {
//     risks: [
//       {
//         disease: "Gout",
//         riskLevel: "high",
//         explanation: "Goat meat is high in purines",
//         recommendation: "Avoid during gout flare-ups",
//       },
//       {
//         disease: "High Cholesterol",
//         riskLevel: "moderate",
//         explanation: "Coconut oil contains saturated fats",
//         recommendation: "Request less oil in preparation",
//       },
//     ],
//   },
//   "Grilled Tilapia": {
//     risks: [
//       {
//         disease: "Fish Allergy",
//         riskLevel: "critical",
//         explanation: "Contains tilapia - severe allergic reaction risk",
//         recommendation: "AVOID completely if allergic to fish",
//       },
//       {
//         disease: "Gout",
//         riskLevel: "moderate",
//         explanation: "Fish contains moderate purines",
//         recommendation: "Safe in moderation",
//       },
//     ],
//   },
//   "Chicken Shawarma": {
//     risks: [
//       {
//         disease: "Celiac Disease",
//         riskLevel: "high",
//         explanation: "Pita bread contains gluten",
//         recommendation: "Request gluten-free wrap or lettuce wrap",
//       },
//       {
//         disease: "Wheat Allergy",
//         riskLevel: "high",
//         explanation: "Pita bread contains wheat",
//         recommendation: "Request alternative wrap",
//       },
//       {
//         disease: "Hypertension",
//         riskLevel: "moderate",
//         explanation: "Marinated chicken may contain high sodium",
//         recommendation: "Request low-sodium marinade",
//       },
//     ],
//   },
//   "Beef Burger": {
//     risks: [
//       {
//         disease: "Celiac Disease",
//         riskLevel: "high",
//         explanation: "Bun contains gluten",
//         recommendation: "Request gluten-free bun or lettuce wrap",
//       },
//       {
//         disease: "Wheat Allergy",
//         riskLevel: "high",
//         explanation: "Bun contains wheat",
//         recommendation: "Request gluten-free bun",
//       },
//       {
//         disease: "Gout",
//         riskLevel: "moderate",
//         explanation: "Beef patty contains purines",
//         recommendation: "Limit consumption",
//       },
//       {
//         disease: "High Cholesterol",
//         riskLevel: "moderate",
//         explanation: "Beef and cheese contain saturated fats",
//         recommendation: "Choose lean beef and skip cheese",
//       },
//       {
//         disease: "Milk Allergy",
//         riskLevel: "moderate",
//         explanation: "Contains cheese",
//         recommendation: "Request no cheese",
//       },
//     ],
//   },
//   "Vegetable Pad Thai": {
//     risks: [
//       {
//         disease: "Peanut Allergy",
//         riskLevel: "critical",
//         explanation: "Contains peanuts",
//         recommendation: "AVOID - request peanut-free version",
//       },
//       {
//         disease: "Celiac Disease",
//         riskLevel: "moderate",
//         explanation: "Rice noodles are gluten-free but verify sauce",
//         recommendation: "Confirm sauce is gluten-free",
//       },
//       {
//         disease: "Soy Allergy",
//         riskLevel: "moderate",
//         explanation: "May contain soy sauce",
//         recommendation: "Request coconut aminos instead",
//       },
//     ],
//   },
//   "Margherita Pizza": {
//     risks: [
//       {
//         disease: "Celiac Disease",
//         riskLevel: "high",
//         explanation: "Pizza dough contains gluten",
//         recommendation: "Request gluten-free crust",
//       },
//       {
//         disease: "Wheat Allergy",
//         riskLevel: "high",
//         explanation: "Dough contains wheat",
//         recommendation: "Request gluten-free crust",
//       },
//       {
//         disease: "Milk Allergy",
//         riskLevel: "high",
//         explanation: "Contains mozzarella cheese",
//         recommendation: "Request vegan cheese",
//       },
//       {
//         disease: "Lactose Intolerance",
//         riskLevel: "moderate",
//         explanation: "Contains dairy cheese",
//         recommendation: "Request lactose-free or vegan cheese",
//       },
//       {
//         disease: "GERD",
//         riskLevel: "moderate",
//         explanation: "Tomato sauce may trigger reflux",
//         recommendation: "Request light sauce or white pizza",
//       },
//     ],
//   },
//   "Chocolate Lava Cake": {
//     risks: [
//       {
//         disease: "Type 2 Diabetes",
//         riskLevel: "high",
//         explanation: "Very high in sugar",
//         recommendation: "Avoid or share with others",
//       },
//       {
//         disease: "Type 1 Diabetes",
//         riskLevel: "high",
//         explanation: "High sugar content requires insulin adjustment",
//         recommendation: "Consult doctor before consuming",
//       },
//       {
//         disease: "Egg Allergy",
//         riskLevel: "moderate",
//         explanation: "Contains eggs",
//         recommendation: "Request egg-free dessert",
//       },
//       {
//         disease: "Milk Allergy",
//         riskLevel: "moderate",
//         explanation: "Contains butter",
//         recommendation: "Request vegan alternative",
//       },
//       {
//         disease: "Migraine",
//         riskLevel: "moderate",
//         explanation: "Chocolate may trigger migraines",
//         recommendation: "Avoid if sensitive to chocolate",
//       },
//       {
//         disease: "GERD",
//         riskLevel: "moderate",
//         explanation: "Chocolate may trigger reflux",
//         recommendation: "Avoid if prone to heartburn",
//       },
//     ],
//   },
//   "Mango Sticky Rice": {
//     risks: [
//       {
//         disease: "Type 2 Diabetes",
//         riskLevel: "moderate",
//         explanation: "Contains sugar and high-glycemic rice",
//         recommendation: "Small portion only",
//       },
//       {
//         disease: "Type 1 Diabetes",
//         riskLevel: "moderate",
//         explanation: "Sugar content requires insulin adjustment",
//         recommendation: "Monitor blood sugar closely",
//       },
//       {
//         disease: "Tree Nut Allergy",
//         riskLevel: "low",
//         explanation: "Typically nut-free but verify preparation",
//         recommendation: "Confirm no nuts added",
//       },
//     ],
//   },
//   "Fresh Lemonade": {
//     risks: [
//       {
//         disease: "Type 2 Diabetes",
//         riskLevel: "moderate",
//         explanation: "Contains added sugar",
//         recommendation: "Request sugar-free or half-sweet",
//       },
//       {
//         disease: "GERD",
//         riskLevel: "moderate",
//         explanation: "Citrus may trigger acid reflux",
//         recommendation: "Avoid if sensitive to citrus",
//       },
//       {
//         disease: "Migraine",
//         riskLevel: "low",
//         explanation: "Citrus may trigger migraines in some people",
//         recommendation: "Monitor for symptoms",
//       },
//     ],
//   },
// };

// // ========== INGREDIENT RISK DATABASE ==========
// // This maps each medical condition to ingredients that trigger it
// const INGREDIENT_RISK_DATABASE = {
//   "Peanut Allergy": {
//     keywords: [
//       "peanut",
//       "peanut flour",
//       "groundnut",
//       "arachis",
//       "peanut butter",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS PEANUTS - Severe allergic reaction possible",
//     modification: "Substitute with sunflower seed butter",
//     safeAlternative: "Sunflower Seed Butter",
//   },
//   "Tree Nut Allergy": {
//     keywords: [
//       "almond",
//       "walnut",
//       "cashew",
//       "pistachio",
//       "hazelnut",
//       "coconut",
//       "macadamia",
//       "pecan",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS TREE NUTS - Potential anaphylaxis risk",
//     modification: "Omit nuts or substitute with seeds",
//     safeAlternative: "Pumpkin or sunflower seeds",
//   },
//   "Shellfish Allergy": {
//     keywords: [
//       "shrimp",
//       "prawn",
//       "crab",
//       "lobster",
//       "crayfish",
//       "langoustine",
//       "shellfish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS SHELLFISH - Severe allergic reaction risk",
//     modification: "Substitute with mushrooms or chicken",
//     safeAlternative: "King oyster mushroom or chicken",
//   },
//   "Fish Allergy": {
//     keywords: [
//       "tilapia",
//       "salmon",
//       "tuna",
//       "mackerel",
//       "cod",
//       "bass",
//       "trout",
//       "fish",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS FISH - Allergic reaction possible",
//     modification: "Substitute with chicken or tofu",
//     safeAlternative: "Grilled chicken or tofu",
//   },
//   "Milk Allergy": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//       "whey",
//       "casein",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS DAIRY - Milk allergy risk",
//     modification: "Use plant-based dairy alternatives",
//     safeAlternative: "Oat milk, coconut milk, vegan cheese",
//   },
//   "Celiac Disease": {
//     keywords: [
//       "wheat",
//       "flour",
//       "gluten",
//       "barley",
//       "rye",
//       "bread",
//       "pita",
//       "bun",
//       "pasta",
//       "dough",
//     ],
//     severity: "high",
//     message: "⚠️ CONTAINS GLUTEN - Autoimmune reaction trigger",
//     modification: "Use gluten-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour, almond flour",
//   },
//   "Egg Allergy": {
//     keywords: ["egg", "eggs", "mayonnaise", "albumin", "meringue"],
//     severity: "moderate",
//     message: "⚡ CONTAINS EGGS - Allergic reaction possible",
//     modification: "Use egg replacer or omit",
//     safeAlternative: "Flax egg or commercial egg replacer",
//   },
//   "Soy Allergy": {
//     keywords: ["soy", "tofu", "soy sauce", "edamame", "miso", "tempeh"],
//     severity: "moderate",
//     message: "⚡ CONTAINS SOY - Potential allergen",
//     modification: "Use coconut aminos instead of soy sauce",
//     safeAlternative: "Coconut aminos, chickpea tofu",
//   },
//   "Wheat Allergy": {
//     keywords: ["wheat", "flour", "bread", "pita", "bun", "pasta", "dough"],
//     severity: "moderate",
//     message: "⚡ CONTAINS WHEAT - Allergic reaction possible",
//     modification: "Use gluten-free or wheat-free alternatives",
//     safeAlternative: "Gluten-free flour, rice flour",
//   },
//   "Type 2 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//       "sweetener",
//       "coconut sugar",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SUGAR - May spike blood glucose",
//     modification: "Use sugar-free sweetener or reduce sugar",
//     safeAlternative: "Monk fruit, stevia, erythritol",
//   },
//   "Type 1 Diabetes": {
//     keywords: [
//       "sugar",
//       "honey",
//       "syrup",
//       "cane sugar",
//       "brown sugar",
//       "molasses",
//     ],
//     severity: "moderate",
//     message: "⚡ CONTAINS SUGAR - Requires insulin adjustment",
//     modification: "Request sugar-free version",
//     safeAlternative: "Sugar-free sweetener",
//   },
//   Hypertension: {
//     keywords: [
//       "salt",
//       "sodium",
//       "soy sauce",
//       "teriyaki",
//       "fish sauce",
//       "cured",
//       "pickled",
//       "broth",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SODIUM - May increase blood pressure",
//     modification: "Request low-sodium preparation",
//     safeAlternative: "Low-sodium version, herbs instead of salt",
//   },
//   "High Cholesterol": {
//     keywords: [
//       "butter",
//       "palm oil",
//       "coconut milk",
//       "beef fat",
//       "lard",
//       "fried",
//       "cheese",
//       "cream",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH SATURATED FAT - May affect cholesterol",
//     modification: "Use heart-healthy oils (olive, avocado)",
//     safeAlternative: "Olive oil, avocado oil",
//   },
//   Gout: {
//     keywords: [
//       "beef",
//       "red meat",
//       "organ meat",
//       "sardines",
//       "anchovies",
//       "shellfish",
//       "beef sirloin",
//       "goat meat",
//     ],
//     severity: "moderate",
//     message: "⚡ HIGH PURINE - May trigger gout flare",
//     modification: "Choose poultry or plant protein instead",
//     safeAlternative: "Chicken, turkey, tofu, beans",
//   },
//   "Kidney Disease": {
//     keywords: [
//       "salt",
//       "sodium",
//       "potassium",
//       "phosphorus",
//       "beans",
//       "legumes",
//       "dairy",
//       "nuts",
//     ],
//     severity: "high",
//     message: "⚠️ MAY STRESS KIDNEYS - Consult your doctor",
//     modification: "Limited portion with medical approval",
//     safeAlternative: "Consult healthcare provider",
//   },
//   "Lactose Intolerance": {
//     keywords: [
//       "milk",
//       "cheese",
//       "butter",
//       "yogurt",
//       "cream",
//       "mozzarella",
//       "dairy",
//     ],
//     severity: "low",
//     message: "ℹ️ CONTAINS LACTOSE - May cause digestive discomfort",
//     modification: "Use lactose-free or plant-based dairy",
//     safeAlternative: "Lactose-free milk, vegan cheese",
//   },
//   GERD: {
//     keywords: [
//       "tomato",
//       "citrus",
//       "lemon",
//       "lime",
//       "spicy",
//       "chili",
//       "coffee",
//       "chocolate",
//       "mint",
//       "onion",
//       "garlic",
//     ],
//     severity: "low",
//     message: "ℹ️ MAY TRIGGER REFLUX - Eat with caution",
//     modification: "Request mild version without triggers",
//     safeAlternative: "Mild herb seasoning",
//   },
//   Migraine: {
//     keywords: [
//       "caffeine",
//       "coffee",
//       "chocolate",
//       "aged cheese",
//       "red wine",
//       "processed meat",
//       "msg",
//     ],
//     severity: "low",
//     message: "ℹ️ POTENTIAL MIGRAINE TRIGGER",
//     modification: "Omit trigger ingredients",
//     safeAlternative: "Caffeine-free, chocolate-free version",
//   },
// };

// // ========== INGREDIENT ANALYSIS FUNCTION ==========
// // This analyzes each ingredient against user's medical conditions
// const analyzeDishForConditions = (item, userConditions) => {
//   if (!userConditions || userConditions.length === 0) {
//     return {
//       overallStatus: "safe",
//       overallColor: "green",
//       overallIcon: "✅",
//       overallMessage:
//         "This dish appears safe based on standard dietary guidelines",
//       recommendation: "Enjoy your meal! No medical conditions selected.",
//       ingredientAnalysis: item.ingredients.map((ing) => ({
//         ingredient: ing,
//         status: "safe",
//         statusIcon: "✅",
//         message: "No conflicts detected with your profile",
//         severity: "none",
//         modificationAvailable: false,
//         safeAlternative: null,
//       })),
//       canBeModified: false,
//       highRiskCount: 0,
//       moderateRiskCount: 0,
//       lowRiskCount: 0,
//     };
//   }

//   const ingredientAnalysis = [];
//   let highRiskCount = 0;
//   let moderateRiskCount = 0;
//   let lowRiskCount = 0;
//   let modificationsAvailable = [];

//   for (const ingredient of item.ingredients) {
//     let highestSeverity = "safe";
//     let relevantCondition = null;
//     let relevantMessage = "";
//     let modification = null;
//     let safeAlternative = null;

//     // Check ingredient against each user condition
//     for (const condition of userConditions) {
//       const riskRule = INGREDIENT_RISK_DATABASE[condition];
//       if (riskRule) {
//         // Check if ingredient matches any keyword for this condition
//         const matches = riskRule.keywords.some((keyword) =>
//           ingredient.toLowerCase().includes(keyword.toLowerCase()),
//         );

//         if (matches) {
//           // Track highest severity
//           if (riskRule.severity === "high") {
//             highestSeverity = "high";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "moderate" &&
//             highestSeverity !== "high"
//           ) {
//             highestSeverity = "moderate";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           } else if (
//             riskRule.severity === "low" &&
//             highestSeverity === "safe"
//           ) {
//             highestSeverity = "low";
//             relevantCondition = condition;
//             relevantMessage = riskRule.message;
//             modification = riskRule.modification;
//             safeAlternative = riskRule.safeAlternative;
//           }
//         }
//       }
//     }

//     // Count risks by severity
//     if (highestSeverity === "high") highRiskCount++;
//     else if (highestSeverity === "moderate") moderateRiskCount++;
//     else if (highestSeverity === "low") lowRiskCount++;

//     // Build analysis for this ingredient
//     let statusIcon, statusMessage, statusColor;
//     switch (highestSeverity) {
//       case "high":
//         statusIcon = "🔴";
//         statusColor = "red";
//         statusMessage =
//           relevantMessage ||
//           `HIGH RISK: Contains ${ingredient} - Avoid for ${relevantCondition || "your condition"}`;
//         break;
//       case "moderate":
//         statusIcon = "🟡";
//         statusColor = "orange";
//         statusMessage =
//           relevantMessage ||
//           `CAUTION: ${ingredient} - Limit intake for ${relevantCondition || "your condition"}`;
//         break;
//       case "low":
//         statusIcon = "🟢";
//         statusColor = "yellow";
//         statusMessage =
//           relevantMessage ||
//           `LOW RISK: ${ingredient} - Generally acceptable but monitor symptoms`;
//         break;
//       default:
//         statusIcon = "✅";
//         statusColor = "green";
//         statusMessage = `SAFE: ${ingredient} - No conflicts with your conditions`;
//     }

//     if (modification && !modificationsAvailable.includes(modification)) {
//       modificationsAvailable.push(modification);
//     }

//     ingredientAnalysis.push({
//       ingredient: ingredient,
//       status: highestSeverity,
//       statusIcon: statusIcon,
//       statusColor: statusColor,
//       message: statusMessage,
//       relevantCondition: relevantCondition,
//       modificationAvailable: modification !== null,
//       modificationText: modification,
//       safeAlternative: safeAlternative,
//     });
//   }

//   // Determine overall dish status
//   let overallStatus, overallColor, overallIcon, overallMessage, recommendation;

//   if (highRiskCount > 0) {
//     overallStatus = "high_risk";
//     overallColor = "red";
//     overallIcon = "🔴";
//     overallMessage = `⚠️ HIGH RISK DISH - Contains ${highRiskCount} ingredient(s) that may be dangerous for your condition(s)`;
//     recommendation =
//       "STRONG RECOMMENDATION: Do NOT order this dish, or request significant modifications below";
//   } else if (moderateRiskCount > 0) {
//     overallStatus = "moderate_risk";
//     overallColor = "orange";
//     overallIcon = "🟡";
//     overallMessage = `⚡ MODERATE RISK DISH - Contains ${moderateRiskCount} ingredient(s) that should be limited with your condition(s)`;
//     recommendation =
//       "RECOMMENDATION: Order with modifications or in small portions only";
//   } else if (lowRiskCount > 0) {
//     overallStatus = "low_risk";
//     overallColor = "yellow";
//     overallIcon = "🟢";
//     overallMessage = `ℹ️ LOW RISK DISH - Contains ${lowRiskCount} ingredient(s) that may cause mild symptoms for some people`;
//     recommendation = "Generally acceptable, but monitor for any reaction";
//   } else {
//     overallStatus = "safe";
//     overallColor = "green";
//     overallIcon = "✅";
//     overallMessage =
//       "✓ SAFE DISH - All ingredients appear compatible with your medical conditions";
//     recommendation = "This dish is safe for you to enjoy!";
//   }

//   return {
//     overallStatus: overallStatus,
//     overallColor: overallColor,
//     overallIcon: overallIcon,
//     overallMessage: overallMessage,
//     recommendation: recommendation,
//     ingredientAnalysis: ingredientAnalysis,
//     canBeModified: modificationsAvailable.length > 0,
//     modificationsAvailable: modificationsAvailable,
//     highRiskCount: highRiskCount,
//     moderateRiskCount: moderateRiskCount,
//     lowRiskCount: lowRiskCount,
//   };
// };

// // ========== DISEASE RISK ANALYSIS FUNCTION ==========
// // This analyzes what diseases/conditions a dish may cause
// const analyzeDishForDiseaseRisks = (item, userConditions) => {
//   const dishRisks = DISEASE_RISK_DATABASE[item.name];
//   if (!dishRisks) {
//     return {
//       hasRisks: false,
//       risks: [],
//       overallRiskLevel: "low",
//       overallMessage: "No known disease risks associated with this dish.",
//     };
//   }

//   // Filter risks based on user's existing conditions (show what could be triggered)
//   const relevantRisks = dishRisks.risks.filter((risk) => {
//     // If user has the condition, show it as a warning
//     if (userConditions.includes(risk.disease)) {
//       return true;
//     }
//     // Also show other potential risks even if user doesn't have them yet
//     return true;
//   });

//   // Determine overall risk level
//   let overallRiskLevel = "low";
//   let overallIcon = "✅";
//   let overallColor = "green";
//   let overallMessage = "";

//   const hasCritical = relevantRisks.some((r) => r.riskLevel === "critical");
//   const hasHigh = relevantRisks.some((r) => r.riskLevel === "high");
//   const hasModerate = relevantRisks.some((r) => r.riskLevel === "moderate");

//   if (hasCritical) {
//     overallRiskLevel = "critical";
//     overallIcon = "🔴⚠️";
//     overallColor = "red";
//     overallMessage =
//       "⚠️ CRITICAL RISK - This dish contains ingredients that could cause severe allergic reaction or serious health emergency!";
//   } else if (hasHigh) {
//     overallRiskLevel = "high";
//     overallIcon = "🔴";
//     overallColor = "red";
//     overallMessage =
//       "🔴 HIGH RISK - This dish may trigger or worsen serious health conditions";
//   } else if (hasModerate) {
//     overallRiskLevel = "moderate";
//     overallIcon = "🟡";
//     overallColor = "orange";
//     overallMessage =
//       "🟡 MODERATE RISK - This dish may cause health issues if consumed regularly";
//   } else {
//     overallRiskLevel = "low";
//     overallIcon = "🟢";
//     overallColor = "green";
//     overallMessage =
//       "🟢 LOW RISK - This dish has minimal known health risks";
//   }

//   return {
//     hasRisks: relevantRisks.length > 0,
//     risks: relevantRisks,
//     overallRiskLevel,
//     overallIcon,
//     overallColor,
//     overallMessage,
//   };
// };

// // ========== API SERVICE FOR ORDER STORAGE ==========
// const ORDER_API_URL = "https://your-api-endpoint.com/api/orders";

// const apiService = {
//   sendOrderToAPI: async (orderData) => {
//     const payload = {
//       orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       tableNumber: orderData.tableNumber,
//       customerName: orderData.customerName,
//       userId: orderData.userId,
//       orderType: orderData.orderType || "dine-in",
//       items: orderData.items.map((item) => ({
//         id: item.id,
//         name: item.name,
//         quantity: item.quantity,
//         originalPrice: item.price,
//         finalPrice: item.finalPrice,
//         ingredients: item.ingredients,
//         customizations: item.customizations || [],
//         modifications: item.modifications || {},
//         specialInstructions: item.specialInstructions || "",
//         healthAnalysis: item.healthAnalysis || [],
//         preparationTime: item.prepTime || 15,
//       })),
//       customizedPlates: orderData.customizedPlates || [],
//       subtotal: orderData.subtotal,
//       tax: orderData.tax || 0,
//       total: orderData.total,
//       medicalConditions: orderData.medicalConditions,
//       timestamp: new Date().toISOString(),
//       estimatedPreparationTime:
//         orderData.items.reduce(
//           (max, item) => Math.max(max, item.prepTime || 15),
//           15,
//         ) + 5,
//       status: "confirmed",
//       notes: orderData.notes || "",
//     };

//     try {
//       const response = await axios.post(ORDER_API_URL, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       const storedOrders = JSON.parse(
//         localStorage.getItem("order_history") || "[]",
//       );
//       storedOrders.push(payload);
//       localStorage.setItem("order_history", JSON.stringify(storedOrders));
//       return { success: true, data: response.data, orderId: payload.orderId };
//     } catch (error) {
//       console.error("API error, storing locally:", error);
//       const fallbackOrders = JSON.parse(
//         localStorage.getItem("fallback_orders") || "[]",
//       );
//       fallbackOrders.push({
//         ...payload,
//         fallbackTimestamp: new Date().toISOString(),
//       });
//       localStorage.setItem("fallback_orders", JSON.stringify(fallbackOrders));
//       return {
//         success: false,
//         error: error.message,
//         fallbackStored: true,
//         orderId: payload.orderId,
//       };
//     }
//   },

//   getOrderStatus: async (orderId) => {
//     try {
//       const response = await axios.get(`${ORDER_API_URL}/${orderId}/status`);
//       return response.data;
//     } catch (error) {
//       console.error("Status fetch error:", error);
//       return null;
//     }
//   },

//   getTableOrders: async (tableNumber) => {
//     try {
//       const response = await axios.get(
//         `${ORDER_API_URL}?tableNumber=${tableNumber}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch table orders:", error);
//       return [];
//     }
//   },
// };

// // ========== FLOATING TIMER COMPONENT ==========
// const FloatingTimer = ({
//   orderId,
//   tableNumber,
//   initialDuration,
//   onExpire,
//   onOpenModal,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire && onExpire();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const getTimerColor = () => {
//     if (timeLeft <= 60) return "bg-red-500 animate-pulse";
//     if (timeLeft <= 300) return "bg-orange-500";
//     return "bg-green-500";
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
//     >
//       <div
//         className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}
//       >
//         <TimerIcon className="animate-pulse" />
//         <div className="flex flex-col">
//           <span className="text-xs font-medium">
//             Order #{orderId.slice(-6)} | Table {tableNumber}
//           </span>
//           <span className="text-xl font-mono font-bold tracking-wider">
//             {formatTime(timeLeft)}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== TABLE SELECTOR MODAL ==========
// const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
//   const [tableNumber, setTableNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-sm">
//             Please enter your table details
//           </p>
//         </div>
//         <div className="p-6">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name (Optional)
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber) onConfirm(tableNumber, customerName);
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Start Ordering
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CONDITION SELECTION MODAL ==========
// const ConditionModal = ({ isOpen, onClose, onSelect, selected }) => {
//   const [localSelected, setLocalSelected] = useState(selected);

//   useEffect(() => {
//     if (isOpen) setLocalSelected(selected);
//   }, [isOpen, selected]);

//   const toggle = (cond) => {
//     setLocalSelected((prev) =>
//       prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond],
//     );
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <HealthIcon /> Your Medical Conditions
//           </h2>
//           <p className="text-purple-200 text-sm">
//             Select all that apply for personalized ingredient analysis
//           </p>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="grid grid-cols-2 gap-2">
//             {MEDICAL_CONDITIONS.map((cond) => (
//               <button
//                 key={cond.id}
//                 onClick={() => toggle(cond.name)}
//                 className={`p-2 rounded-lg text-left text-sm transition ${
//                   localSelected.includes(cond.name)
//                     ? "bg-purple-100 border-2 border-purple-500 text-purple-800"
//                     : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="font-medium">{cond.name}</div>
//                 <div className="text-xs opacity-70">{cond.category}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Skip
//           </button>
//           <button
//             onClick={() => {
//               onSelect(localSelected);
//               onClose();
//             }}
//             className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold"
//           >
//             Apply ({localSelected.length})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== DISEASE RISK MODAL ==========
// const DiseaseRiskModal = ({ isOpen, onClose, diseaseRisks, itemName }) => {
//   if (!isOpen) return null;

//   const getRiskColor = (riskLevel) => {
//     switch (riskLevel) {
//       case "critical":
//         return "bg-red-100 border-red-500 text-red-800";
//       case "high":
//         return "bg-red-50 border-red-400 text-red-700";
//       case "moderate":
//         return "bg-orange-50 border-orange-400 text-orange-700";
//       default:
//         return "bg-green-50 border-green-400 text-green-700";
//     }
//   };

//   const getRiskIcon = (riskLevel) => {
//     switch (riskLevel) {
//       case "critical":
//         return "🔴⚠️";
//       case "high":
//         return "🔴";
//       case "moderate":
//         return "🟡";
//       default:
//         return "🟢";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col relative"
//       >
//         <div
//           className={`bg-gradient-to-r p-4 rounded-t-2xl text-white ${
//             diseaseRisks?.overallColor === "red"
//               ? "from-red-600 to-red-700"
//               : diseaseRisks?.overallColor === "orange"
//                 ? "from-orange-500 to-orange-600"
//                 : "from-emerald-600 to-green-600"
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <WarningAmberIcon />
//               <h2 className="font-bold text-xl">Health Risk Analysis</h2>
//             </div>
//             <span className="text-2xl">{diseaseRisks?.overallIcon}</span>
//           </div>
//           <p className="text-white/80 text-sm mt-1">{itemName}</p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Overall Risk Banner */}
//           <div
//             className={`rounded-xl p-4 mb-4 border-l-4 ${
//               diseaseRisks?.overallColor === "red"
//                 ? "border-red-500 bg-red-50"
//                 : diseaseRisks?.overallColor === "orange"
//                   ? "border-orange-500 bg-orange-50"
//                   : "border-green-500 bg-green-50"
//             }`}
//           >
//             <p className="font-semibold">{diseaseRisks?.overallMessage}</p>
//           </div>

//           {/* Disease Risks List */}
//           {diseaseRisks?.hasRisks && diseaseRisks.risks.length > 0 ? (
//             <>
//               <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
//                 <DangerousIcon className="text-red-500" />
//                 Diseases & Conditions This Food May Cause
//               </h3>
//               <div className="space-y-3">
//                 {diseaseRisks.risks.map((risk, idx) => (
//                   <div
//                     key={idx}
//                     className={`rounded-xl border p-4 ${getRiskColor(risk.riskLevel)}`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <span className="text-2xl">
//                         {getRiskIcon(risk.riskLevel)}
//                       </span>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h4 className="font-bold">{risk.disease}</h4>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded-full font-medium ${
//                               risk.riskLevel === "critical"
//                                 ? "bg-red-600 text-white"
//                                 : risk.riskLevel === "high"
//                                   ? "bg-red-500 text-white"
//                                   : risk.riskLevel === "moderate"
//                                     ? "bg-orange-500 text-white"
//                                     : "bg-green-500 text-white"
//                             }`}
//                           >
//                             {risk.riskLevel.toUpperCase()} RISK
//                           </span>
//                         </div>
//                         <p className="text-sm mt-1">{risk.explanation}</p>
//                         <div className="mt-2 p-2 bg-white/50 rounded-lg">
//                           <p className="text-xs font-medium">💡 Recommendation:</p>
//                           <p className="text-xs">{risk.recommendation}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <CheckCircleIcon className="text-green-500 text-5xl mx-auto mb-3" />
//               <p className="text-green-700 font-medium">
//                 ✓ No significant health risks detected
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 This dish appears to have minimal negative health impacts
//               </p>
//             </div>
//           )}

//           {/* General Health Disclaimer */}
//           <div className="mt-4 p-3 bg-gray-100 rounded-xl text-xs text-gray-600">
//             <p className="font-medium mb-1">⚠️ Medical Disclaimer:</p>
//             <p>
//               This analysis is for informational purposes only and does not
//               constitute medical advice. Individual reactions may vary. Please
//               consult with a healthcare professional for personalized dietary
//               recommendations.
//             </p>
//           </div>
//         </div>

//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== INGREDIENT ANALYSIS MODAL ==========
// const AnalysisModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   isLoading,
//   onContinue,
//   item,
//   userConditions,
//   onViewDiseaseRisks,
//   diseaseRisks,
// }) => {
//   const [expandedIngredient, setExpandedIngredient] = useState(null);
//   const [showDiseaseRisks, setShowDiseaseRisks] = useState(false);

//   if (!isOpen) return null;

//   const getHeaderColor = () => {
//     if (analysis?.overallColor === "red") return "from-red-600 to-red-700";
//     if (analysis?.overallColor === "orange")
//       return "from-orange-500 to-orange-600";
//     if (analysis?.overallColor === "yellow")
//       return "from-yellow-500 to-amber-500";
//     return "from-emerald-600 to-green-600";
//   };

//   const getBorderColor = (statusColor) => {
//     switch (statusColor) {
//       case "red":
//         return "border-red-500 bg-red-50";
//       case "orange":
//         return "border-orange-500 bg-orange-50";
//       case "yellow":
//         return "border-yellow-500 bg-yellow-50";
//       default:
//         return "border-green-500 bg-green-50";
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div
//           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//           onClick={onClose}
//         />
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col relative"
//         >
//           <div
//             className={`bg-gradient-to-r ${getHeaderColor()} p-4 rounded-t-2xl text-white`}
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <ScienceIcon />
//                 <h2 className="font-bold text-xl">Ingredient Safety Analysis</h2>
//               </div>
//               <span className="text-2xl">{analysis?.overallIcon}</span>
//             </div>
//             <p className="text-white/80 text-sm mt-1">{item?.name}</p>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4">
//             {isLoading ? (
//               <div className="text-center py-8">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
//                 <p className="text-gray-600">
//                   Analyzing ingredients against your conditions...
//                 </p>
//               </div>
//             ) : analysis ? (
//               <>
//                 {/* Disease Risk Button */}
//                 {diseaseRisks && (
//                   <button
//                     onClick={() => setShowDiseaseRisks(true)}
//                     className="w-full mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-xl flex items-center justify-between hover:from-red-600 hover:to-orange-600 transition"
//                   >
//                     <div className="flex items-center gap-2">
//                       <WarningAmberIcon />
//                       <span className="font-semibold">
//                         View Health Risks & Diseases
//                       </span>
//                     </div>
//                     <span className="text-sm">
//                       {diseaseRisks.overallRiskLevel === "critical"
//                         ? "⚠️ CRITICAL"
//                         : diseaseRisks.overallRiskLevel === "high"
//                           ? "🔴 HIGH"
//                           : diseaseRisks.overallRiskLevel === "moderate"
//                             ? "🟡 MODERATE"
//                             : "🟢 LOW"}
//                     </span>
//                   </button>
//                 )}

//                 {/* Overall Status Banner */}
//                 <div
//                   className={`rounded-xl p-4 mb-4 border-l-4 ${getBorderColor(analysis.overallColor)}`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <span className="text-2xl">{analysis.overallIcon}</span>
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">
//                         {analysis.overallMessage}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {analysis.recommendation}
//                       </p>
//                       {(analysis.highRiskCount > 0 ||
//                         analysis.moderateRiskCount > 0) && (
//                         <div className="flex gap-3 mt-2 text-xs">
//                           {analysis.highRiskCount > 0 && (
//                             <span className="text-red-600">
//                               🔴 {analysis.highRiskCount} high risk
//                             </span>
//                           )}
//                           {analysis.moderateRiskCount > 0 && (
//                             <span className="text-orange-600">
//                               🟡 {analysis.moderateRiskCount} moderate risk
//                             </span>
//                           )}
//                           {analysis.lowRiskCount > 0 && (
//                             <span className="text-yellow-600">
//                               🟢 {analysis.lowRiskCount} low risk
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ingredient Analysis List */}
//                 <h3 className="font-semibold text-gray-700 mb-3">
//                   📋 Ingredient Analysis
//                 </h3>
//                 <div className="space-y-3">
//                   {analysis.ingredientAnalysis.map((ing, idx) => (
//                     <div key={idx} className="border rounded-xl overflow-hidden">
//                       <button
//                         onClick={() =>
//                           setExpandedIngredient(
//                             expandedIngredient === idx ? null : idx,
//                           )
//                         }
//                         className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition"
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-xl">{ing.statusIcon}</span>
//                           <span className="font-medium text-gray-800">
//                             {ing.ingredient}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <span
//                             className={`text-xs px-2 py-1 rounded-full ${
//                               ing.status === "high"
//                                 ? "bg-red-100 text-red-700"
//                                 : ing.status === "moderate"
//                                   ? "bg-orange-100 text-orange-700"
//                                   : ing.status === "low"
//                                     ? "bg-yellow-100 text-yellow-700"
//                                     : "bg-green-100 text-green-700"
//                             }`}
//                           >
//                             {ing.status === "high"
//                               ? "HIGH RISK"
//                               : ing.status === "moderate"
//                                 ? "CAUTION"
//                                 : ing.status === "low"
//                                   ? "LOW RISK"
//                                   : "SAFE"}
//                           </span>
//                           <span className="text-gray-400">
//                             {expandedIngredient === idx ? "▲" : "▼"}
//                           </span>
//                         </div>
//                       </button>

//                       {expandedIngredient === idx && (
//                         <div className="p-3 bg-gray-50 border-t">
//                           <p className="text-sm text-gray-700 mb-2">
//                             {ing.message}
//                           </p>
//                           {ing.relevantCondition && (
//                             <p className="text-xs text-gray-500">
//                               ⚠️ Relevant condition: {ing.relevantCondition}
//                             </p>
//                           )}
//                           {ing.modificationAvailable && (
//                             <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
//                               <p className="text-xs font-medium text-emerald-700">
//                                 ✓ Modification Available:
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 {ing.modificationText}
//                               </p>
//                               {ing.safeAlternative && (
//                                 <p className="text-xs text-emerald-600 mt-1">
//                                   Suggested: {ing.safeAlternative}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Modification Summary */}
//                 {analysis.modificationsAvailable &&
//                   analysis.modificationsAvailable.length > 0 && (
//                     <div className="mt-4 p-3 bg-blue-50 rounded-xl">
//                       <p className="text-sm font-medium text-blue-700 mb-1">
//                         ✨ Customization Options Available
//                       </p>
//                       <ul className="text-xs text-blue-600 space-y-1">
//                         {analysis.modificationsAvailable
//                           .slice(0, 3)
//                           .map((mod, idx) => (
//                             <li key={idx}>• {mod}</li>
//                           ))}
//                       </ul>
//                     </div>
//                   )}
//               </>
//             ) : (
//               <div className="text-center py-8">
//                 <CheckIcon className="text-green-500 text-5xl mx-auto mb-3" />
//                 <p className="text-green-700 font-medium">
//                   ✓ No analysis needed
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Select medical conditions first for personalized analysis
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-t flex gap-3">
//             <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//               Close
//             </button>
//             <button
//               onClick={onContinue}
//               className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
//               disabled={analysis?.overallStatus === "high_risk"}
//             >
//               {analysis?.overallStatus === "high_risk"
//                 ? "⚠️ Not Recommended"
//                 : "Continue to Order"}
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Disease Risk Modal */}
//       <DiseaseRiskModal
//         isOpen={showDiseaseRisks}
//         onClose={() => setShowDiseaseRisks(false)}
//         diseaseRisks={diseaseRisks}
//         itemName={item?.name}
//       />
//     </>
//   );
// };

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({
//   isOpen,
//   onClose,
//   item,
//   selectedConditions,
//   onAddToCart,
//   analysis,
// }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showModifications, setShowModifications] = useState(false);
//   const [selectedModifications, setSelectedModifications] = useState({});

//   if (!isOpen) return null;

//   // Get ingredients that need modification based on analysis
//   const riskyIngredients =
//     analysis?.ingredientAnalysis?.filter(
//       (ing) => ing.status !== "safe" && ing.modificationAvailable,
//     ) || [];

//   const handleApplyModification = (ingredient, modification) => {
//     setSelectedModifications((prev) => ({
//       ...prev,
//       [ingredient]: modification,
//     }));
//     setCustomizations((prev) => {
//       const filtered = prev.filter((c) => !c.includes(ingredient));
//       return [...filtered, `Replace ${ingredient} - ${modification}`];
//     });
//     toast.success(`✓ Modification applied for ${ingredient}`);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <EditIcon /> Customize Your Order
//           </h2>
//           <p className="text-amber-100 text-sm">
//             {item.name} - RWF {item.price.toLocaleString()}
//           </p>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Original Ingredients */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📦 Original Ingredients:
//             </h3>
//             <div className="flex flex-wrap gap-1">
//               {item.ingredients.map((ing, idx) => {
//                 const isRisky = riskyIngredients.some(
//                   (r) => r.ingredient === ing,
//                 );
//                 return (
//                   <span
//                     key={idx}
//                     className={`text-xs px-2 py-1 rounded-full ${
//                       isRisky
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {ing} {isRisky && "⚠️"}
//                   </span>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Health-Safe Modifications */}
//           {riskyIngredients.length > 0 && (
//             <div className="mb-4">
//               <button
//                 onClick={() => setShowModifications(!showModifications)}
//                 className="w-full text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200"
//               >
//                 <div className="flex items-center gap-2">
//                   <ShieldIcon className="text-emerald-600" />
//                   <span className="font-semibold text-emerald-800">
//                     Health-Safe Modifications Available
//                   </span>
//                 </div>
//                 <p className="text-xs text-emerald-600 mt-1">
//                   {riskyIngredients.length} ingredient(s) can be modified for
//                   your safety
//                 </p>
//               </button>

//               {showModifications && (
//                 <div className="mt-2 space-y-2">
//                   {riskyIngredients.map((ing, idx) => (
//                     <div key={idx} className="bg-green-50 p-3 rounded-lg">
//                       <div className="flex items-start gap-2">
//                         <span className="text-xl">{ing.statusIcon}</span>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-gray-800">
//                             {ing.ingredient}
//                           </p>
//                           <p className="text-xs text-gray-600">{ing.message}</p>
//                           {ing.modificationText && (
//                             <div className="mt-2">
//                               <p className="text-xs font-medium text-emerald-700">
//                                 Suggested modification:
//                               </p>
//                               <p className="text-xs text-emerald-600">
//                                 {ing.modificationText}
//                               </p>
//                               {ing.safeAlternative && (
//                                 <p className="text-xs text-emerald-600">
//                                   → {ing.safeAlternative}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={() =>
//                             handleApplyModification(
//                               ing.ingredient,
//                               ing.modificationText,
//                             )
//                           }
//                           className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
//                           disabled={selectedModifications[ing.ingredient]}
//                         >
//                           {selectedModifications[ing.ingredient]
//                             ? "✓ Applied"
//                             : "Apply"}
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Applied Customizations */}
//           {customizations.length > 0 && (
//             <div className="mb-4">
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 ✓ Applied Customizations:
//               </h3>
//               {customizations.map((cust, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-100 p-2 rounded-lg text-sm mb-1 flex justify-between"
//                 >
//                   <span>{cust}</span>
//                   <button
//                     onClick={() =>
//                       setCustomizations((prev) =>
//                         prev.filter((_, i) => i !== idx),
//                       )
//                     }
//                     className="text-red-500"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Special Instructions */}
//           <div className="mb-4">
//             <h3 className="font-semibold text-gray-700 mb-2">
//               📝 Special Instructions:
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests? (e.g., no salt, extra well-done, etc.)"
//               className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
//               rows="2"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t flex gap-3">
//           <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Add to Cart (RWF {item.price.toLocaleString()})
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CART MODAL ==========
// const CartModal = ({
//   isOpen,
//   onClose,
//   cart,
//   updateQuantity,
//   removeItem,
//   getTotal,
//   onCheckout,
//   tableInfo,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-12">
//               <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div key={item.cartId} className="mb-3 pb-3 border-b">
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     {item.customizations && item.customizations.length > 0 && (
//                       <div className="text-xs text-gray-500 mt-1">
//                         {item.customizations.map((c, i) => (
//                           <div key={i}>• {c}</div>
//                         ))}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600 mt-1">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold">
//                     RWF {item.finalPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <AddIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {cart.length > 0 && (
//           <div className="p-4 border-t">
//             <div className="flex justify-between font-bold mb-3">
//               <span>Total</span>
//               <span className="text-orange-600">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER DETAIL MODAL ==========
// const OrderDetailModal = ({ isOpen, onClose, order }) => {
//   if (!isOpen || !order) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p>
//               <strong>Order ID:</strong> {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName || "Guest"}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//             <p>
//               <strong>Time Remaining:</strong>{" "}
//               {Math.floor(order.timeRemaining / 60)}:
//               {(order.timeRemaining % 60).toString().padStart(2, "0")}
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice.toLocaleString()}</span>
//               </div>
//               {item.customizations && item.customizations.length > 0 && (
//                 <div className="text-xs text-gray-500 mt-1">
//                   {item.customizations.map((c, i) => (
//                     <div key={i}>• {c}</div>
//                   ))}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600 mt-1">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-500 text-white py-2 rounded-lg"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== RESULT MODAL ==========
// const ResultModal = ({ isOpen, onClose, type, title, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
//       >
//         {type === "success" && (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         )}
//         {type === "error" && (
//           <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
//         )}
//         <h2 className="text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-600 whitespace-pre-line mb-6">{message}</p>
//         <button
//           onClick={onClose}
//           className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
//         >
//           OK
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = () => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showTableModal, setShowTableModal] = useState(true);
//   const [showConditionModal, setShowConditionModal] = useState(false);
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [selectedConditions, setSelectedConditions] = useState([]);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [diseaseRisksResult, setDiseaseRisksResult] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeOrder, setActiveOrder] = useState(null);
//   const [showOrderDetail, setShowOrderDetail] = useState(false);
//   const [showResult, setShowResult] = useState({
//     open: false,
//     type: "",
//     title: "",
//     message: "",
//   });
//   const [tableInfo, setTableInfo] = useState({
//     tableNumber: null,
//     customerName: "",
//   });

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = MENU_ITEMS.filter(
//     (i) =>
//       (activeCategory === "all" || i.category === activeCategory) &&
//       i.name.toLowerCase().includes(search.toLowerCase()),
//   );
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const paginated = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   useEffect(() => setCurrentPage(1), [activeCategory, search]);

//   // Handle item click - perform ingredient analysis AND disease risk analysis
//   const handleItemClick = async (item) => {
//     setCurrentItem(item);
//     setIsAnalyzing(true);
//     setShowAnalysisModal(true);

//     // Analyze ingredients against user's medical conditions
//     const analysis = analyzeDishForConditions(item, selectedConditions);
//     setAnalysisResult(analysis);

//     // Analyze disease risks for this dish
//     const diseaseRisks = analyzeDishForDiseaseRisks(item, selectedConditions);
//     setDiseaseRisksResult(diseaseRisks);

//     setIsAnalyzing(false);
//   };

//   const handleAnalysisContinue = () => {
//     setShowAnalysisModal(false);
//     setShowCustomModal(true);
//   };

//   const addToCartWithCustomizations = (item, customizations, instructions) => {
//     const newItem = {
//       ...item,
//       quantity: 1,
//       finalPrice: item.price,
//       customizations: customizations,
//       specialInstructions: instructions,
//       healthAnalysis: analysisResult,
//       diseaseRisks: diseaseRisksResult,
//       cartId: cartIdCounter,
//     };
//     setCart((prev) => [...prev, newItem]);
//     setCartIdCounter((prev) => prev + 1);
//     toast.success(`${item.name} added to cart!`);
//     setShowCart(true);
//   };

//   const updateQuantity = (cartId, newQty) => {
//     if (newQty < 1) {
//       setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//       return;
//     }
//     setCart((prev) =>
//       prev.map((i) =>
//         i.cartId === cartId
//           ? { ...i, quantity: newQty, finalPrice: i.price * newQty }
//           : i,
//       ),
//     );
//   };

//   const removeItem = (cartId) =>
//     setCart((prev) => prev.filter((i) => i.cartId !== cartId));
//   const getTotal = () => cart.reduce((sum, i) => sum + i.finalPrice, 0);

//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Cart Empty",
//         message: "Please add items to your cart first.",
//       });
//       return;
//     }

//     setShowCart(false);

//     const orderData = {
//       tableNumber: tableInfo.tableNumber,
//       customerName: tableInfo.customerName,
//       userId: `user_${Date.now()}`,
//       items: cart,
//       customizedPlates: cart.map((item) => ({
//         name: item.name,
//         customizations: item.customizations,
//         instructions: item.specialInstructions,
//       })),
//       subtotal: getTotal(),
//       total: getTotal(),
//       medicalConditions: selectedConditions,
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName || "Guest"}`,
//     };

//     const result = await apiService.sendOrderToAPI(orderData);

//     if (result.success || result.fallbackStored) {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//       setActiveOrder({
//         orderId: result.orderId,
//         tableNumber: tableInfo.tableNumber,
//         customerName: tableInfo.customerName,
//         items: cart,
//         total: getTotal(),
//         timeRemaining: preparationTime * 60,
//         status: "confirmed",
//       });

//       setShowResult({
//         open: true,
//         type: "success",
//         title: "✅ Order Confirmed!",
//         message: `Table ${tableInfo.tableNumber} - Order placed!\nOrder ID: ${result.orderId.slice(-8)}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min`,
//       });

//       setCart([]);
//     } else {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: "Unable to place order. Please try again.",
//       });
//     }
//   };

//   const handleTimerExpire = () => {
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//     setActiveOrder((prev) => (prev ? { ...prev, status: "ready" } : null));
//   };

//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName: customerName || "" });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Browse our menu.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
//       <ToastContainer position="bottom-right" />

//       <TableSelectorModal
//         isOpen={showTableModal}
//         onClose={() => {}}
//         onConfirm={handleTableConfirm}
//       />

//       <ConditionModal
//         isOpen={showConditionModal}
//         onClose={() => setShowConditionModal(false)}
//         onSelect={setSelectedConditions}
//         selected={selectedConditions}
//       />

//       <AnalysisModal
//         isOpen={showAnalysisModal}
//         onClose={() => setShowAnalysisModal(false)}
//         analysis={analysisResult}
//         isLoading={isAnalyzing}
//         onContinue={handleAnalysisContinue}
//         item={currentItem}
//         userConditions={selectedConditions}
//         diseaseRisks={diseaseRisksResult}
//       />

//       <CustomizationModal
//         isOpen={showCustomModal}
//         onClose={() => setShowCustomModal(false)}
//         item={currentItem}
//         selectedConditions={selectedConditions}
//         onAddToCart={addToCartWithCustomizations}
//         analysis={analysisResult}
//       />

//       <CartModal
//         isOpen={showCart}
//         onClose={() => setShowCart(false)}
//         cart={cart}
//         updateQuantity={updateQuantity}
//         removeItem={removeItem}
//         getTotal={getTotal}
//         onCheckout={handleCheckout}
//         tableInfo={tableInfo}
//       />

//       <OrderDetailModal
//         isOpen={showOrderDetail}
//         onClose={() => setShowOrderDetail(false)}
//         order={activeOrder}
//       />

//       <ResultModal
//         isOpen={showResult.open}
//         onClose={() => setShowResult({ ...showResult, open: false })}
//         type={showResult.type}
//         title={showResult.title}
//         message={showResult.message}
//       />

//       {activeOrder && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
//               <RestaurantIcon className="text-orange-500" /> NutriScan·AI
//             </h1>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               Table {tableInfo.tableNumber}{" "}
//               {tableInfo.customerName && `· ${tableInfo.customerName}`} ·
//               AI-Powered Health Risk Analysis
//             </p>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowConditionModal(true)}
//               className={`relative p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? "bg-purple-500 text-white" : "bg-white text-purple-500"}`}
//             >
//               <HealthIcon />
//               {selectedConditions.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
//                   {selectedConditions.length}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setShowCart(true)}
//               className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <CartIcon className="text-orange-500" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.reduce((a, b) => a + b.quantity, 0)}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Health Banner - Shows selected conditions */}
//         {selectedConditions.length > 0 && (
//           <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <ShieldIcon className="text-emerald-600 flex-shrink-0" />
//                 <span className="text-sm text-emerald-800 break-words">
//                   🛡️ Personalized for: {selectedConditions.join(", ")}
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowConditionModal(true)}
//                 className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
//               >
//                 Update Conditions
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Search */}
//         <div className="relative mb-4">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm text-sm sm:text-base"
//             placeholder="Search dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs sm:text-sm ${
//                 activeCategory === cat
//                   ? "bg-orange-500 text-white shadow-md"
//                   : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
//               }`}
//             >
//               {cat === "all" ? "All Items" : cat}
//             </button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative">
//                 <img
//                   src={item.image}
//                   className="h-32 sm:h-36 md:h-40 w-full object-cover"
//                   alt={item.name}
//                 />
//                 {/* Disease risk indicator badge */}
//                 {DISEASE_RISK_DATABASE[item.name] && (
//                   <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
//                     <WarningIcon className="text-white text-xs" />
//                     Health Risks
//                   </div>
//                 )}
//               </div>
//               <div className="p-3">
//                 <h3 className="font-bold text-gray-800 text-sm sm:text-base">
//                   {item.name}
//                 </h3>
//                 <p className="text-xs text-gray-500 line-clamp-1 mt-1">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-orange-600 font-bold text-sm sm:text-base">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <span className="text-gray-400 text-xs flex items-center gap-1">
//                     <TimeIcon fontSize="small" /> {item.prepTime}min
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-12">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500">No items match your search.</p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-6 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               ←
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`w-8 h-8 rounded ${currentPage === p ? "bg-orange-500 text-white" : "bg-white"}`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-8 h-8 rounded bg-white disabled:opacity-50"
//             >
//               →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


















import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  QrCodeScanner as QRIcon,
  ShoppingCart as CartIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  WarningAmber as WarningAmberIcon,
  TableRestaurant as TableIcon,
  Timer as TimerIcon,
  HealthAndSafety as HealthIcon,
  Favorite as FavoriteIcon,
  Psychology as PsychologyIcon,
  Healing as HealingIcon,
  Science as ScienceIcon,
  Shield as ShieldIcon,
  FitnessCenter as FitnessIcon,
  Edit as EditIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Dangerous as DangerousIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

// ========== API CONFIGURATION ==========
// Get your free API keys from:
// USDA FoodData Central: https://fdc.nal.usda.gov/api-key-signup.html
// Spoonacular: https://spoonacular.com/food-api

const API_CONFIG = {
  USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g", // Replace with your actual USDA API key
  USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
  SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d", // Replace with your actual Spoonacular API key
  SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
};

// Cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// ========== MENU ITEMS ==========
const MENU_ITEMS = [
  // ========== MAINS - HIGH RISK ITEMS ==========
  {
    id: 1,
    name: "Isombe ya Nyama",
    price: 2800,
    ingredients: ["cassava leaves", "beef", "coconut milk", "peanut flour", "palm oil"],
    description: "Traditional cassava leaf stew with beef",
    prepTime: 18,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    healthRisks: ["high cholesterol", "gout", "peanut allergy"],
    forbiddenFor: ["Peanut Allergy", "High Cholesterol", "Gout"],
    nutritionalInfo: { calories: 580, fat: 32, sodium: 420, sugar: 8 },
  },
  {
    id: 2,
    name: "Brochette de Boeuf",
    price: 3500,
    ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
    description: "Grilled beef skewers with fries",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    healthRisks: ["gout", "hypertension", "high cholesterol"],
    forbiddenFor: ["Gout", "Hypertension", "High Cholesterol"],
    nutritionalInfo: { calories: 650, fat: 28, sodium: 680, sugar: 3 },
  },
  {
    id: 3,
    name: "Ibiharage",
    price: 1800,
    ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
    description: "Rwandan bean stew - vegan",
    prepTime: 12,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    healthRisks: ["gerd", "gout moderate"],
    forbiddenFor: ["Gout", "GERD", "Kidney Disease"],
    nutritionalInfo: { calories: 320, fat: 12, sodium: 380, sugar: 6 },
  },
  {
    id: 4,
    name: "Matoke ya Nyama",
    price: 3200,
    ingredients: ["green plantain", "goat meat", "ginger", "onion", "coconut oil"],
    description: "Steamed plantain with goat stew",
    prepTime: 20,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    healthRisks: ["gout", "high cholesterol"],
    forbiddenFor: ["Gout", "High Cholesterol"],
    nutritionalInfo: { calories: 540, fat: 26, sodium: 350, sugar: 12 },
  },
  {
    id: 5,
    name: "Grilled Tilapia",
    price: 4500,
    ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
    description: "Fresh lake tilapia - Contains fish allergens",
    prepTime: 16,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    healthRisks: ["fish allergy", "gout moderate"],
    forbiddenFor: ["Fish Allergy"],
    nutritionalInfo: { calories: 380, fat: 18, sodium: 280, sugar: 1 },
  },
  {
    id: 6,
    name: "Chicken Shawarma",
    price: 4200,
    ingredients: ["chicken", "yogurt", "garlic", "paprika", "pita bread"],
    description: "Marinated chicken wrap - Contains gluten",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    healthRisks: ["celiac disease", "wheat allergy", "lactose intolerance"],
    forbiddenFor: ["Celiac Disease", "Wheat Allergy", "Lactose Intolerance"],
    nutritionalInfo: { calories: 520, fat: 22, sodium: 890, sugar: 5 },
  },
  {
    id: 7,
    name: "Beef Burger",
    price: 4800,
    ingredients: ["beef patty", "lettuce", "tomato", "cheddar cheese", "burger bun"],
    description: "Angus beef burger with cheese - Contains gluten and dairy",
    prepTime: 12,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    healthRisks: ["celiac disease", "milk allergy", "lactose intolerance", "gout", "high cholesterol"],
    forbiddenFor: ["Celiac Disease", "Milk Allergy", "Lactose Intolerance", "Gout", "High Cholesterol"],
    nutritionalInfo: { calories: 780, fat: 42, sodium: 980, sugar: 8 },
  },

  // ========== SEAFOOD - HIGH ALLERGY RISK ==========
  {
    id: 8,
    name: "Creamy Shrimp Pasta",
    price: 6800,
    ingredients: ["shrimp", "cream", "pasta", "garlic", "parmesan cheese", "butter"],
    description: "Rich creamy pasta with shrimp - Contains shellfish and dairy",
    prepTime: 18,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
    healthRisks: ["shellfish allergy", "milk allergy", "lactose intolerance", "high cholesterol"],
    forbiddenFor: ["Shellfish Allergy", "Milk Allergy", "Lactose Intolerance", "High Cholesterol"],
    nutritionalInfo: { calories: 890, fat: 48, sodium: 1250, sugar: 6 },
  },
  {
    id: 9,
    name: "Lobster Thermidor",
    price: 12500,
    ingredients: ["lobster", "butter", "cream", "egg yolks", "white wine", "mustard"],
    description: "French lobster dish - High risk for shellfish allergy",
    prepTime: 25,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400",
    healthRisks: ["shellfish allergy", "egg allergy", "high cholesterol"],
    forbiddenFor: ["Shellfish Allergy", "Egg Allergy", "High Cholesterol"],
    nutritionalInfo: { calories: 950, fat: 58, sodium: 1450, sugar: 4 },
  },
  {
    id: 10,
    name: "Crab Cakes",
    price: 7200,
    ingredients: ["crab meat", "breadcrumbs", "eggs", "mayonnaise", "mustard", "spices"],
    description: "Maryland-style crab cakes - Contains shellfish and eggs",
    prepTime: 16,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1580752300992-559a8fa4f8c8?w=400",
    healthRisks: ["shellfish allergy", "egg allergy", "wheat allergy"],
    forbiddenFor: ["Shellfish Allergy", "Egg Allergy", "Wheat Allergy"],
    nutritionalInfo: { calories: 520, fat: 32, sodium: 890, sugar: 3 },
  },

  // ========== DESSERTS - HIGH SUGAR RISK ==========
  {
    id: 11,
    name: "Chocolate Lava Cake",
    price: 6500,
    ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
    description: "Warm molten chocolate cake - High sugar content",
    prepTime: 12,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    healthRisks: ["diabetes", "migraine", "egg allergy", "milk allergy"],
    forbiddenFor: ["Type 2 Diabetes", "Type 1 Diabetes", "Migraine", "Egg Allergy", "Milk Allergy"],
    nutritionalInfo: { calories: 650, fat: 38, sodium: 180, sugar: 52 },
  },
  {
    id: 12,
    name: "Mango Sticky Rice",
    price: 3500,
    ingredients: ["glutinous rice", "mango", "coconut milk", "sugar"],
    description: "Thai dessert - Contains coconut",
    prepTime: 10,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    healthRisks: ["diabetes", "tree nut allergy"],
    forbiddenFor: ["Type 2 Diabetes", "Tree Nut Allergy"],
    nutritionalInfo: { calories: 420, fat: 14, sodium: 45, sugar: 28 },
  },
  {
    id: 13,
    name: "New York Cheesecake",
    price: 5800,
    ingredients: ["cream cheese", "sugar", "eggs", "graham crackers", "butter", "sour cream"],
    description: "Rich creamy cheesecake - Contains dairy, eggs, and gluten",
    prepTime: 15,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd45a68324?w=400",
    healthRisks: ["diabetes", "milk allergy", "egg allergy", "celiac disease", "lactose intolerance"],
    forbiddenFor: ["Type 2 Diabetes", "Milk Allergy", "Egg Allergy", "Celiac Disease", "Lactose Intolerance", "High Cholesterol"],
    nutritionalInfo: { calories: 780, fat: 52, sodium: 380, sugar: 48 },
  },
  {
    id: 14,
    name: "Tiramisu",
    price: 6200,
    ingredients: ["mascarpone cheese", "coffee", "ladyfingers", "eggs", "sugar", "cocoa powder"],
    description: "Italian coffee dessert - Contains caffeine and dairy",
    prepTime: 14,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    healthRisks: ["migraine", "diabetes", "milk allergy", "egg allergy", "celiac disease"],
    forbiddenFor: ["Migraine", "Type 2 Diabetes", "Milk Allergy", "Egg Allergy", "Celiac Disease"],
    nutritionalInfo: { calories: 620, fat: 38, sodium: 120, sugar: 42, caffeine: 45 },
  },
  {
    id: 15,
    name: "Ice Cream Sundae",
    price: 4500,
    ingredients: ["vanilla ice cream", "chocolate syrup", "whipped cream", "cherry", "nuts", "sprinkles"],
    description: "Classic ice cream sundae - Contains dairy, nuts, and high sugar",
    prepTime: 5,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400",
    healthRisks: ["diabetes", "lactose intolerance", "tree nut allergy", "milk allergy"],
    forbiddenFor: ["Type 2 Diabetes", "Lactose Intolerance", "Tree Nut Allergy", "Milk Allergy"],
    nutritionalInfo: { calories: 550, fat: 28, sodium: 95, sugar: 62 },
  },

  // ========== BEVERAGES - HIGH SUGAR/CAFFEINE ==========
  {
    id: 16,
    name: "Fresh Lemonade",
    price: 1500,
    ingredients: ["lemon", "sugar", "water", "mint"],
    description: "Hand-squeezed lemonade",
    prepTime: 3,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
    healthRisks: ["diabetes", "gerd"],
    forbiddenFor: ["Type 2 Diabetes", "GERD"],
    nutritionalInfo: { calories: 180, fat: 0, sodium: 5, sugar: 42 },
  },
  {
    id: 17,
    name: "Espresso Coffee",
    price: 2000,
    ingredients: ["coffee beans", "water"],
    description: "Strong Italian espresso - High caffeine",
    prepTime: 3,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
    healthRisks: ["migraine", "gerd", "anxiety", "hypertension"],
    forbiddenFor: ["Migraine", "GERD", "Hypertension"],
    nutritionalInfo: { calories: 5, fat: 0, sodium: 0, sugar: 0, caffeine: 80 },
  },
  {
    id: 18,
    name: "Milkshake",
    price: 3500,
    ingredients: ["milk", "ice cream", "chocolate syrup", "whipped cream"],
    description: "Thick creamy milkshake - Contains dairy and high sugar",
    prepTime: 5,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
    healthRisks: ["diabetes", "lactose intolerance", "milk allergy", "high cholesterol"],
    forbiddenFor: ["Type 2 Diabetes", "Lactose Intolerance", "Milk Allergy", "High Cholesterol"],
    nutritionalInfo: { calories: 580, fat: 28, sodium: 220, sugar: 68 },
  },

  // ========== VEGAN/HEALTHY OPTIONS ==========
  {
    id: 19,
    name: "Quinoa Buddha Bowl",
    price: 4200,
    ingredients: ["quinoa", "avocado", "chickpeas", "kale", "sweet potato", "tahini"],
    description: "Healthy vegan bowl - Gluten-free, dairy-free",
    prepTime: 12,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    healthRisks: ["sesame allergy"],
    forbiddenFor: [],
    nutritionalInfo: { calories: 480, fat: 22, sodium: 320, sugar: 8, fiber: 14 },
  },
  {
    id: 20,
    name: "Vegetable Pad Thai",
    price: 3800,
    ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime"],
    description: "Classic Thai noodles - Contains peanuts",
    prepTime: 14,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    healthRisks: ["peanut allergy", "soy allergy"],
    forbiddenFor: ["Peanut Allergy", "Soy Allergy"],
    nutritionalInfo: { calories: 520, fat: 18, sodium: 890, sugar: 12 },
  },

  // ========== PIZZA - GLUTEN/DAIRY RISK ==========
  {
    id: 21,
    name: "Margherita Pizza",
    price: 5200,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "basil"],
    description: "Classic Italian pizza - Contains gluten and dairy",
    prepTime: 15,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
    healthRisks: ["celiac disease", "wheat allergy", "milk allergy", "lactose intolerance", "gerd"],
    forbiddenFor: ["Celiac Disease", "Wheat Allergy", "Milk Allergy", "Lactose Intolerance", "GERD"],
    nutritionalInfo: { calories: 680, fat: 28, sodium: 980, sugar: 8 },
  },
  {
    id: 22,
    name: "Pepperoni Pizza",
    price: 6800,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "pepperoni", "oregano"],
    description: "Spicy pepperoni pizza - High in sodium and fat",
    prepTime: 15,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    healthRisks: ["celiac disease", "hypertension", "high cholesterol", "gerd"],
    forbiddenFor: ["Celiac Disease", "Hypertension", "High Cholesterol", "GERD"],
    nutritionalInfo: { calories: 850, fat: 42, sodium: 1450, sugar: 6 },
  },
  {
    id: 23,
    name: "Gluten-Free Veggie Pizza",
    price: 7200,
    ingredients: ["gluten-free crust", "tomato sauce", "vegan cheese", "bell peppers", "mushrooms", "olives"],
    description: "Gluten-free and dairy-free pizza option",
    prepTime: 16,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    healthRisks: [],
    forbiddenFor: [],
    nutritionalInfo: { calories: 520, fat: 18, sodium: 680, sugar: 7 },
  },

  // ========== BREAKFAST - EGG/DAIRY RISK ==========
  {
    id: 24,
    name: "Classic Omelette",
    price: 4200,
    ingredients: ["eggs", "cheddar cheese", "milk", "butter", "ham", "onions", "bell peppers"],
    description: "Fluffy omelette with ham and cheese - Contains eggs and dairy",
    prepTime: 12,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400",
    healthRisks: ["egg allergy", "milk allergy", "lactose intolerance", "high cholesterol"],
    forbiddenFor: ["Egg Allergy", "Milk Allergy", "Lactose Intolerance", "High Cholesterol"],
    nutritionalInfo: { calories: 580, fat: 42, sodium: 890, sugar: 4 },
  },
  {
    id: 25,
    name: "Pancakes with Maple Syrup",
    price: 3800,
    ingredients: ["flour", "eggs", "milk", "butter", "sugar", "maple syrup"],
    description: "Fluffy pancakes - Contains gluten, eggs, dairy, high sugar",
    prepTime: 10,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400",
    healthRisks: ["celiac disease", "egg allergy", "milk allergy", "diabetes"],
    forbiddenFor: ["Celiac Disease", "Egg Allergy", "Milk Allergy", "Type 2 Diabetes"],
    nutritionalInfo: { calories: 620, fat: 22, sodium: 520, sugar: 38 },
  },

  // ========== ASIAN CUISINE ==========
  {
    id: 26,
    name: "Spicy Tuna Roll",
    price: 7800,
    ingredients: ["sushi rice", "raw tuna", "mayonnaise", "spicy sauce", "seaweed", "cucumber"],
    description: "Spicy tuna sushi roll - Contains raw fish",
    prepTime: 18,
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd2f?w=400",
    healthRisks: ["fish allergy", "pregnancy warning", "soy allergy"],
    forbiddenFor: ["Fish Allergy", "Pregnant Women (raw fish)"],
    nutritionalInfo: { calories: 380, fat: 12, sodium: 680, sugar: 5 },
  },
  {
    id: 27,
    name: "Pad Thai with Shrimp",
    price: 6200,
    ingredients: ["rice noodles", "shrimp", "eggs", "peanuts", "bean sprouts", "tamarind sauce"],
    description: "Thai noodle dish - Contains shellfish, eggs, peanuts",
    prepTime: 14,
    category: "Asian",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
    healthRisks: ["shellfish allergy", "egg allergy", "peanut allergy"],
    forbiddenFor: ["Shellfish Allergy", "Egg Allergy", "Peanut Allergy"],
    nutritionalInfo: { calories: 650, fat: 24, sodium: 1180, sugar: 14 },
  },
  {
    id: 28,
    name: "Kung Pao Chicken",
    price: 5600,
    ingredients: ["chicken", "peanuts", "chili peppers", "soy sauce", "vinegar", "Sichuan peppercorns"],
    description: "Spicy Sichuan dish - Contains peanuts and soy",
    prepTime: 14,
    category: "Asian",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400",
    healthRisks: ["peanut allergy", "soy allergy", "gerd"],
    forbiddenFor: ["Peanut Allergy", "Soy Allergy", "GERD"],
    nutritionalInfo: { calories: 520, fat: 28, sodium: 980, sugar: 12 },
  },

  // ========== INDIAN CUISINE ==========
  {
    id: 29,
    name: "Butter Chicken",
    price: 6200,
    ingredients: ["chicken", "butter", "cream", "tomato", "cashews", "spices"],
    description: "Rich creamy curry - Contains dairy and nuts",
    prepTime: 20,
    category: "Indian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
    healthRisks: ["tree nut allergy", "milk allergy", "lactose intolerance", "high cholesterol"],
    forbiddenFor: ["Tree Nut Allergy", "Milk Allergy", "Lactose Intolerance", "High Cholesterol"],
    nutritionalInfo: { calories: 680, fat: 48, sodium: 890, sugar: 10 },
  },
  {
    id: 30,
    name: "Samosas",
    price: 2800,
    ingredients: ["flour", "potato", "peas", "cumin", "oil", "salt"],
    description: "Crispy fried pastries - Contains gluten",
    prepTime: 10,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    healthRisks: ["celiac disease", "wheat allergy", "high cholesterol"],
    forbiddenFor: ["Celiac Disease", "Wheat Allergy", "High Cholesterol"],
    nutritionalInfo: { calories: 280, fat: 16, sodium: 420, sugar: 2 },
  },

  // ========== FORBIDDEN/EXTREME RISK ITEMS ==========
  {
    id: 31,
    name: "Foie Gras",
    price: 18500,
    ingredients: ["duck liver", "salt", "pepper", "white wine"],
    description: "Fatty duck liver - Extremely high in cholesterol and fat",
    prepTime: 12,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    healthRisks: ["high cholesterol", "gout", "fatty liver disease", "hypertension"],
    forbiddenFor: ["High Cholesterol", "Gout", "Hypertension", "Liver Disease"],
    nutritionalInfo: { calories: 850, fat: 78, sodium: 520, cholesterol: 380 },
  },
  {
    id: 32,
    name: "Deep Fried Butter",
    price: 3200,
    ingredients: ["butter", "batter", "oil", "powdered sugar"],
    description: "State fair specialty - Extremely high in fat",
    prepTime: 8,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1627308595121-5b8c1cf7f77a?w=400",
    healthRisks: ["high cholesterol", "diabetes", "milk allergy"],
    forbiddenFor: ["High Cholesterol", "Type 2 Diabetes", "Milk Allergy", "Lactose Intolerance"],
    nutritionalInfo: { calories: 620, fat: 52, sodium: 380, sugar: 28 },
  },
  {
    id: 33,
    name: "Surstromming (Fermented Herring)",
    price: 8900,
    ingredients: ["herring", "salt", "fermentation bacteria"],
    description: "Swedish fermented fish - Extremely strong odor, high risk",
    prepTime: 1,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400",
    healthRisks: ["fish allergy", "high sodium"],
    forbiddenFor: ["Fish Allergy", "Hypertension"],
    nutritionalInfo: { calories: 180, fat: 8, sodium: 1850, sugar: 0 },
  },

  // ========== BEVERAGES - ALCOHOLIC ==========
  {
    id: 34,
    name: "Red Wine",
    price: 8500,
    ingredients: ["red grapes", "yeast", "sulfites"],
    description: "Cabernet Sauvignon - Contains alcohol and sulfites",
    prepTime: 2,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    healthRisks: ["migraine", "sulfite allergy", "pregnancy warning", "liver disease"],
    forbiddenFor: ["Migraine", "Pregnant Women", "Liver Disease"],
    nutritionalInfo: { calories: 125, fat: 0, sodium: 6, sugar: 4, alcohol: 12 },
  },
  {
    id: 35,
    name: "Cocktail - Bloody Mary",
    price: 7200,
    ingredients: ["vodka", "tomato juice", "worcestershire sauce", "tabasco", "celery salt"],
    description: "Spicy vodka cocktail - High sodium",
    prepTime: 5,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
    healthRisks: ["hypertension", "gerd", "pregnancy warning"],
    forbiddenFor: ["Hypertension", "GERD", "Pregnant Women"],
    nutritionalInfo: { calories: 180, fat: 0, sodium: 890, sugar: 8, alcohol: 10 },
  },

  // ========== EXTREME ALLERGEN ITEMS ==========
  {
    id: 36,
    name: "Mixed Nut Platter",
    price: 4200,
    ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "hazelnuts"],
    description: "Assorted nuts - Contains all tree nuts and peanuts",
    prepTime: 2,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    healthRisks: ["peanut allergy", "tree nut allergy", "high calorie"],
    forbiddenFor: ["Peanut Allergy", "Tree Nut Allergy"],
    nutritionalInfo: { calories: 580, fat: 52, sodium: 180, sugar: 8 },
  },
  {
    id: 37,
    name: "Soy Sauce Glazed Salmon",
    price: 7800,
    ingredients: ["salmon", "soy sauce", "brown sugar", "ginger", "garlic"],
    description: "Teriyaki salmon - Contains fish and soy",
    prepTime: 18,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    healthRisks: ["fish allergy", "soy allergy", "diabetes"],
    forbiddenFor: ["Fish Allergy", "Soy Allergy", "Type 2 Diabetes"],
    nutritionalInfo: { calories: 480, fat: 22, sodium: 1280, sugar: 18 },
  },

  // ========== MEDICAL CONDITION SPECIFIC ==========
  {
    id: 38,
    name: "Low Sodium Vegetable Soup",
    price: 3200,
    ingredients: ["vegetables", "herbs", "water", "low-sodium broth", "garlic"],
    description: "Heart-healthy soup - Low sodium option",
    prepTime: 12,
    category: "Soups",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
    healthRisks: [],
    forbiddenFor: [],
    nutritionalInfo: { calories: 120, fat: 2, sodium: 140, sugar: 6 },
  },
  {
    id: 39,
    name: "Sugar-Free Keto Cheesecake",
    price: 5500,
    ingredients: ["cream cheese", "eggs", "erythritol", "almond flour", "butter"],
    description: "Low-carb dessert - Contains dairy and nuts",
    prepTime: 14,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd45a68324?w=400",
    healthRisks: ["tree nut allergy", "milk allergy", "egg allergy"],
    forbiddenFor: ["Tree Nut Allergy", "Milk Allergy", "Egg Allergy"],
    nutritionalInfo: { calories: 380, fat: 32, sodium: 280, sugar: 4, carbs: 6 },
  },
  {
    id: 40,
    name: "Gluten-Free Dairy-Free Pizza",
    price: 7800,
    ingredients: ["cauliflower crust", "dairy-free cheese", "tomato sauce", "vegetables"],
    description: "Allergen-friendly pizza - Gluten-free, dairy-free",
    prepTime: 16,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    healthRisks: [],
    forbiddenFor: [],
    nutritionalInfo: { calories: 450, fat: 22, sodium: 620, sugar: 7 },
  },
];

// ========== MEDICAL CONDITIONS ==========
const MEDICAL_CONDITIONS = [
  {
    id: 1,
    name: "Peanut Allergy",
    category: "Allergy",
    severity: "high",
    description: "Severe allergic reaction to peanuts",
  },
  {
    id: 2,
    name: "Tree Nut Allergy",
    category: "Allergy",
    severity: "high",
    description: "Allergic to almonds, walnuts, cashews, etc.",
  },
  {
    id: 3,
    name: "Shellfish Allergy",
    category: "Allergy",
    severity: "high",
    description: "Allergic to shrimp, crab, lobster",
  },
  {
    id: 4,
    name: "Fish Allergy",
    category: "Allergy",
    severity: "high",
    description: "Allergic to finned fish",
  },
  {
    id: 5,
    name: "Egg Allergy",
    category: "Allergy",
    severity: "moderate",
    description: "Allergic to eggs",
  },
  {
    id: 6,
    name: "Soy Allergy",
    category: "Allergy",
    severity: "moderate",
    description: "Allergic to soy products",
  },
  {
    id: 7,
    name: "Wheat Allergy",
    category: "Allergy",
    severity: "moderate",
    description: "Allergic to wheat",
  },
  {
    id: 8,
    name: "Milk Allergy",
    category: "Allergy",
    severity: "high",
    description: "Allergic to dairy products",
  },
  {
    id: 9,
    name: "Celiac Disease",
    category: "Autoimmune",
    severity: "high",
    description: "Cannot consume gluten",
  },
  {
    id: 10,
    name: "Lactose Intolerance",
    category: "Digestive",
    severity: "low",
    description: "Difficulty digesting lactose",
  },
  {
    id: 11,
    name: "Type 2 Diabetes",
    category: "Metabolic",
    severity: "moderate",
    description: "Blood sugar management needed",
  },
  {
    id: 12,
    name: "Type 1 Diabetes",
    category: "Metabolic",
    severity: "moderate",
    description: "Insulin dependent",
  },
  {
    id: 13,
    name: "Hypertension",
    category: "Cardiovascular",
    severity: "moderate",
    description: "High blood pressure",
  },
  {
    id: 14,
    name: "High Cholesterol",
    category: "Cardiovascular",
    severity: "moderate",
    description: "Cholesterol management needed",
  },
  {
    id: 15,
    name: "Gout",
    category: "Metabolic",
    severity: "moderate",
    description: "Uric acid buildup",
  },
  {
    id: 16,
    name: "GERD",
    category: "Digestive",
    severity: "low",
    description: "Acid reflux",
  },
  {
    id: 17,
    name: "Kidney Disease",
    category: "Renal",
    severity: "high",
    description: "Limited sodium and potassium",
  },
  {
    id: 18,
    name: "Migraine",
    category: "Neurological",
    severity: "low",
    description: "Trigger foods may cause headaches",
  },
];

// ========== USDA API SERVICE ==========
class USDAFoodAPI {
  static async searchFood(foodName) {
    const cacheKey = `usda_search_${foodName}`;
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get(
        `${API_CONFIG.USDA_BASE_URL}/foods/search`,
        {
          params: {
            api_key: API_CONFIG.USDA_API_KEY,
            query: foodName,
            pageSize: 5,
            dataType: ["Foundation", "SR Legacy"],
          },
        },
      );

      if (
        response.data &&
        response.data.foods &&
        response.data.foods.length > 0
      ) {
        const foodData = response.data.foods[0];
        const nutrition = this.extractNutritionData(foodData);

        const result = {
          found: true,
          name: foodData.description,
          fdcId: foodData.fdcId,
          nutrition: nutrition,
          ingredients: foodData.ingredients || null,
        };

        apiCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }

      return { found: false, name: foodName, nutrition: null };
    } catch (error) {
      console.error(`USDA API error for ${foodName}:`, error);
      return { found: false, name: foodName, nutrition: null, error: true };
    }
  }

  static extractNutritionData(foodData) {
    const nutrients = foodData.foodNutrients || [];

    const getNutrientValue = (nutrientName) => {
      const nutrient = nutrients.find((n) =>
        n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()),
      );
      return nutrient ? nutrient.value : 0;
    };

    return {
      calories: getNutrientValue("Energy"),
      protein: getNutrientValue("Protein"),
      fat: getNutrientValue("Total fat"),
      saturatedFat: getNutrientValue("Saturated fat"),
      carbohydrates: getNutrientValue("Carbohydrate"),
      sugar: getNutrientValue("Sugar"),
      sodium: getNutrientValue("Sodium"),
      cholesterol: getNutrientValue("Cholesterol"),
      fiber: getNutrientValue("Fiber"),
    };
  }

  static async getFoodDetails(fdcId) {
    const cacheKey = `usda_details_${fdcId}`;
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get(
        `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
        {
          params: { api_key: API_CONFIG.USDA_API_KEY },
        },
      );

      if (response.data) {
        apiCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`USDA details error for ${fdcId}:`, error);
      return null;
    }
  }
}

// ========== SPOONACULAR API SERVICE ==========
class SpoonacularAPI {
  static async analyzeRecipe(ingredients) {
    const cacheKey = `spoonacular_analyze_${ingredients.sort().join(",")}`;
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.post(
        `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
        {
          title: "Custom Dish",
          ingredients: ingredients.map((ing) => ({ name: ing })),
        },
        { params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY } },
      );

      if (response.data) {
        const result = {
          nutrition: response.data.nutrition || null,
          healthLabels: this.extractHealthLabels(response.data),
          warnings: this.extractWarnings(response.data),
        };

        apiCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }
      return null;
    } catch (error) {
      console.error("Spoonacular analyze error:", error);
      return null;
    }
  }

  static extractHealthLabels(data) {
    const labels = [];
    const nutrition = data.nutrition;

    if (nutrition) {
      const sugar = nutrition.nutrients?.find((n) => n.name === "Sugar");
      if (sugar && sugar.amount > 30) labels.push("high-sugar");

      const sodium = nutrition.nutrients?.find((n) => n.name === "Sodium");
      if (sodium && sodium.amount > 800) labels.push("high-sodium");

      const saturatedFat = nutrition.nutrients?.find(
        (n) => n.name === "Saturated Fat",
      );
      if (saturatedFat && saturatedFat.amount > 15)
        labels.push("high-saturated-fat");

      const cholesterol = nutrition.nutrients?.find(
        (n) => n.name === "Cholesterol",
      );
      if (cholesterol && cholesterol.amount > 100)
        labels.push("high-cholesterol");
    }

    return labels;
  }

  static extractWarnings(data) {
    const warnings = [];
    const nutrition = data.nutrition;

    if (nutrition) {
      const sugar = nutrition.nutrients?.find((n) => n.name === "Sugar");
      if (sugar && sugar.amount > 50) {
        warnings.push(
          `Contains ${sugar.amount.toFixed(1)}g sugar - Very high sugar content`,
        );
      } else if (sugar && sugar.amount > 25) {
        warnings.push(
          `Contains ${sugar.amount.toFixed(1)}g sugar - Moderate sugar content`,
        );
      }

      const sodium = nutrition.nutrients?.find((n) => n.name === "Sodium");
      if (sodium && sodium.amount > 1500) {
        warnings.push(
          `Contains ${sodium.amount.toFixed(0)}mg sodium - Very high sodium`,
        );
      } else if (sodium && sodium.amount > 800) {
        warnings.push(
          `Contains ${sodium.amount.toFixed(0)}mg sodium - Moderate sodium`,
        );
      }

      const saturatedFat = nutrition.nutrients?.find(
        (n) => n.name === "Saturated Fat",
      );
      if (saturatedFat && saturatedFat.amount > 30) {
        warnings.push(
          `Contains ${saturatedFat.amount.toFixed(1)}g saturated fat - Very high`,
        );
      } else if (saturatedFat && saturatedFat.amount > 15) {
        warnings.push(
          `Contains ${saturatedFat.amount.toFixed(1)}g saturated fat - Moderate`,
        );
      }
    }

    return warnings;
  }

  static async searchIngredient(ingredientName) {
    const cacheKey = `spoonacular_ingredient_${ingredientName}`;
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get(
        `${API_CONFIG.SPOONACULAR_BASE_URL}/food/ingredients/search`,
        {
          params: {
            query: ingredientName,
            apiKey: API_CONFIG.SPOONACULAR_API_KEY,
            number: 1,
          },
        },
      );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const result = response.data.results[0];
        apiCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }
      return null;
    } catch (error) {
      console.error(
        `Spoonacular ingredient search error for ${ingredientName}:`,
        error,
      );
      return null;
    }
  }
}

// ========== INGREDIENT RISK ANALYSIS ==========
const evaluateIngredientRisk = async (
  ingredient,
  condition,
  dishNutrition,
  spoonacularAnalysis,
) => {
  const ingredientLower = ingredient.toLowerCase();
  const conditionLower = condition.toLowerCase();

  // Allergy Detection
  if (conditionLower.includes("allergy")) {
    const allergenMap = {
      peanut: ["peanut", "groundnut", "arachis"],
      "tree nut": [
        "almond",
        "walnut",
        "cashew",
        "pecan",
        "hazelnut",
        "coconut",
        "macadamia",
        "pistachio",
      ],
      shellfish: [
        "shrimp",
        "prawn",
        "crab",
        "lobster",
        "crayfish",
        "langoustine",
      ],
      fish: [
        "fish",
        "tilapia",
        "salmon",
        "tuna",
        "cod",
        "mackerel",
        "halibut",
        "trout",
      ],
      egg: ["egg", "albumin", "mayonnaise", "meringue"],
      milk: [
        "milk",
        "cheese",
        "butter",
        "yogurt",
        "cream",
        "dairy",
        "whey",
        "casein",
        "mozzarella",
        "cheddar",
      ],
      soy: ["soy", "tofu", "edamame", "soy sauce", "miso", "tempeh"],
      wheat: [
        "wheat",
        "flour",
        "bread",
        "pita",
        "bun",
        "pasta",
        "dough",
        "gluten",
        "semolina",
      ],
    };

    for (const [allergen, keywords] of Object.entries(allergenMap)) {
      if (conditionLower.includes(allergen)) {
        for (const keyword of keywords) {
          if (ingredientLower.includes(keyword)) {
            return {
              severity: "high",
              message: `⚠️ CONTAINS ${allergen.toUpperCase()} - Severe allergic reaction possible`,
              modification: `Remove ${ingredient} or substitute with allergen-free alternative`,
              safeAlternative: `${allergen}-free version available upon request`,
            };
          }
        }
      }
    }
  }

  // Celiac Disease / Gluten Intolerance
  if (conditionLower.includes("celiac") || conditionLower.includes("gluten")) {
    const glutenKeywords = [
      "wheat",
      "flour",
      "gluten",
      "barley",
      "rye",
      "bread",
      "pita",
      "bun",
      "pasta",
      "dough",
      "semolina",
      "spelt",
      "kamut",
    ];
    for (const keyword of glutenKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "high",
          message:
            "⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction in Celiac disease",
          modification: "Request gluten-free preparation",
          safeAlternative: "Gluten-free flour, rice flour, almond flour",
        };
      }
    }
  }

  // Lactose Intolerance
  if (conditionLower.includes("lactose")) {
    const dairyKeywords = [
      "milk",
      "cheese",
      "butter",
      "yogurt",
      "cream",
      "mozzarella",
      "cheddar",
      "dairy",
      "whey",
      "casein",
    ];
    for (const keyword of dairyKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "moderate",
          message: "ℹ️ CONTAINS LACTOSE - May cause digestive discomfort",
          modification:
            "Request lactose-free or plant-based dairy alternatives",
          safeAlternative: "Lactose-free milk, vegan cheese, coconut milk",
        };
      }
    }
  }

  // Diabetes
  if (conditionLower.includes("diabet")) {
    if (dishNutrition && dishNutrition.sugar > 20) {
      const sugarGrams = dishNutrition.sugar;
      const severity = sugarGrams > 40 ? "high" : "moderate";
      return {
        severity: severity,
        message: `⚡ HIGH SUGAR (${sugarGrams.toFixed(1)}g) - May spike blood glucose`,
        modification: "Request sugar-free version or reduced sugar",
        safeAlternative: "Sugar-free sweetener (stevia, monk fruit)",
      };
    }

    const sugarKeywords = [
      "sugar",
      "honey",
      "syrup",
      "cane sugar",
      "brown sugar",
      "molasses",
      "sweetener",
      "chocolate",
    ];
    for (const keyword of sugarKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "moderate",
          message: "⚡ CONTAINS ADDED SUGAR - May affect blood glucose",
          modification: "Request sugar-free version or smaller portion",
          safeAlternative: "Sugar-free alternative",
        };
      }
    }
  }

  // Hypertension
  if (
    conditionLower.includes("hypertension") ||
    conditionLower.includes("blood pressure")
  ) {
    if (dishNutrition && dishNutrition.sodium > 600) {
      const sodiumMg = dishNutrition.sodium;
      const severity = sodiumMg > 1200 ? "high" : "moderate";
      return {
        severity: severity,
        message: `⚡ HIGH SODIUM (${sodiumMg.toFixed(0)}mg) - May increase blood pressure`,
        modification: "Request low-sodium preparation",
        safeAlternative: "Low-sodium version with herbs and spices",
      };
    }

    const sodiumKeywords = [
      "salt",
      "sodium",
      "soy sauce",
      "fish sauce",
      "teriyaki",
      "cured",
      "pickled",
      "broth",
    ];
    for (const keyword of sodiumKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "moderate",
          message: "⚡ HIGH SODIUM - May contribute to elevated blood pressure",
          modification: "Request low-sodium preparation",
          safeAlternative: "Herbs, spices, or low-sodium alternatives",
        };
      }
    }
  }

  // High Cholesterol
  if (conditionLower.includes("cholesterol")) {
    if (dishNutrition && dishNutrition.saturatedFat > 10) {
      const satFat = dishNutrition.saturatedFat;
      const severity = satFat > 20 ? "high" : "moderate";
      return {
        severity: severity,
        message: `⚡ HIGH SATURATED FAT (${satFat.toFixed(1)}g) - May increase LDL cholesterol`,
        modification: "Request preparation with heart-healthy oils",
        safeAlternative: "Olive oil, avocado oil, or canola oil",
      };
    }

    const fatKeywords = [
      "butter",
      "palm oil",
      "coconut milk",
      "coconut oil",
      "beef fat",
      "lard",
      "fried",
      "cheese",
      "cream",
    ];
    for (const keyword of fatKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "moderate",
          message: "⚡ HIGH SATURATED FAT - May negatively affect cholesterol",
          modification:
            "Request preparation with less oil or heart-healthy oils",
          safeAlternative: "Olive oil, avocado oil",
        };
      }
    }
  }

  // Gout
  if (conditionLower.includes("gout")) {
    const purineKeywords = [
      "beef",
      "red meat",
      "organ meat",
      "liver",
      "kidney",
      "sardines",
      "anchovies",
      "mackerel",
      "shellfish",
      "shrimp",
      "crab",
      "lobster",
      "goat meat",
      "lamb",
    ];
    for (const keyword of purineKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "moderate",
          message: "⚡ HIGH PURINE - May trigger gout flare-up",
          modification: "Choose lean poultry or plant-based protein instead",
          safeAlternative: "Chicken, turkey, tofu, beans",
        };
      }
    }
  }

  // Kidney Disease
  if (conditionLower.includes("kidney")) {
    const renalKeywords = [
      "salt",
      "sodium",
      "potassium",
      "phosphorus",
      "beans",
      "legumes",
      "dairy",
      "nuts",
      "seeds",
    ];
    for (const keyword of renalKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "high",
          message: "⚠️ MAY STRESS KIDNEYS - Consult your nephrologist",
          modification: "Limited portion only with medical approval",
          safeAlternative: "Consult your healthcare provider",
        };
      }
    }
  }

  // GERD / Acid Reflux
  if (conditionLower.includes("gerd") || conditionLower.includes("reflux")) {
    const triggerKeywords = [
      "tomato",
      "citrus",
      "lemon",
      "lime",
      "orange",
      "spicy",
      "chili",
      "pepper",
      "coffee",
      "caffeine",
      "chocolate",
      "mint",
      "onion",
      "garlic",
      "fried",
    ];
    for (const keyword of triggerKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "low",
          message: "ℹ️ MAY TRIGGER ACID REFLUX - Eat with caution",
          modification: "Request mild preparation without trigger ingredients",
          safeAlternative: "Mild herb seasoning, steamed or baked",
        };
      }
    }
  }

  // Migraine
  if (conditionLower.includes("migraine")) {
    const triggerKeywords = [
      "chocolate",
      "caffeine",
      "coffee",
      "tea",
      "aged cheese",
      "processed meat",
      "bacon",
      "salami",
      "msg",
      "artificial sweetener",
    ];
    for (const keyword of triggerKeywords) {
      if (ingredientLower.includes(keyword)) {
        return {
          severity: "low",
          message: "ℹ️ POTENTIAL MIGRAINE TRIGGER - May cause headaches",
          modification: "Omit trigger ingredients",
          safeAlternative: "Caffeine-free, chocolate-free version",
        };
      }
    }
  }

  return {
    severity: "safe",
    message: `✓ ${ingredient} appears safe for your condition`,
    modification: null,
    safeAlternative: null,
  };
};

const analyzeDishForConditions = async (item, userConditions) => {
  if (!userConditions || userConditions.length === 0) {
    return {
      overallStatus: "safe",
      overallColor: "green",
      overallIcon: "✅",
      overallMessage:
        "This dish appears safe based on standard dietary guidelines",
      recommendation: "Enjoy your meal! No medical conditions selected.",
      ingredientAnalysis: item.ingredients.map((ing) => ({
        ingredient: ing,
        status: "safe",
        statusIcon: "✅",
        message: "No conflicts detected with your profile",
        modificationAvailable: false,
        safeAlternative: null,
      })),
      canBeModified: false,
      highRiskCount: 0,
      moderateRiskCount: 0,
      lowRiskCount: 0,
    };
  }

  const ingredientAnalysis = [];
  let highRiskCount = 0;
  let moderateRiskCount = 0;
  let lowRiskCount = 0;
  let modificationsAvailable = [];

  let dishNutrition = null;
  for (const ingredient of item.ingredients) {
    const foodData = await USDAFoodAPI.searchFood(ingredient);
    if (foodData.found && foodData.nutrition) {
      dishNutrition = dishNutrition || {};
      Object.keys(foodData.nutrition).forEach((key) => {
        dishNutrition[key] =
          (dishNutrition[key] || 0) + (foodData.nutrition[key] || 0);
      });
    }
  }

  const spoonacularAnalysis = await SpoonacularAPI.analyzeRecipe(
    item.ingredients,
  );

  for (const ingredient of item.ingredients) {
    let highestSeverity = "safe";
    let relevantCondition = null;
    let relevantMessage = "";
    let modification = null;
    let safeAlternative = null;

    for (const condition of userConditions) {
      const risk = await evaluateIngredientRisk(
        ingredient,
        condition,
        dishNutrition,
        spoonacularAnalysis,
      );

      if (risk.severity === "high" && highestSeverity !== "high") {
        highestSeverity = "high";
        relevantCondition = condition;
        relevantMessage = risk.message;
        modification = risk.modification;
        safeAlternative = risk.safeAlternative;
      } else if (risk.severity === "moderate" && highestSeverity === "safe") {
        highestSeverity = "moderate";
        relevantCondition = condition;
        relevantMessage = risk.message;
        modification = risk.modification;
        safeAlternative = risk.safeAlternative;
      } else if (risk.severity === "low" && highestSeverity === "safe") {
        highestSeverity = "low";
        relevantCondition = condition;
        relevantMessage = risk.message;
      }
    }

    if (highestSeverity === "high") highRiskCount++;
    else if (highestSeverity === "moderate") moderateRiskCount++;
    else if (highestSeverity === "low") lowRiskCount++;

    if (modification && !modificationsAvailable.includes(modification)) {
      modificationsAvailable.push(modification);
    }

    ingredientAnalysis.push({
      ingredient: ingredient,
      status: highestSeverity,
      statusIcon:
        highestSeverity === "high"
          ? "🔴"
          : highestSeverity === "moderate"
            ? "🟡"
            : highestSeverity === "low"
              ? "🟢"
              : "✅",
      message: relevantMessage || `No known conflicts detected`,
      relevantCondition: relevantCondition,
      modificationAvailable: modification !== null,
      modificationText: modification,
      safeAlternative: safeAlternative,
    });
  }

  let overallStatus, overallColor, overallIcon, overallMessage, recommendation;

  if (highRiskCount > 0) {
    overallStatus = "high_risk";
    overallColor = "red";
    overallIcon = "🔴";
    overallMessage = `⚠️ HIGH RISK DISH - Contains ${highRiskCount} ingredient(s) that may be dangerous for your condition(s)`;
    recommendation =
      "STRONG RECOMMENDATION: Do NOT order this dish, or request significant modifications below";
  } else if (moderateRiskCount > 0) {
    overallStatus = "moderate_risk";
    overallColor = "orange";
    overallIcon = "🟡";
    overallMessage = `⚡ MODERATE RISK DISH - Contains ${moderateRiskCount} ingredient(s) that should be limited`;
    recommendation =
      "RECOMMENDATION: Order with modifications or in small portions only";
  } else if (lowRiskCount > 0) {
    overallStatus = "low_risk";
    overallColor = "yellow";
    overallIcon = "🟢";
    overallMessage = `ℹ️ LOW RISK DISH - May cause mild symptoms for some people`;
    recommendation = "Generally acceptable, but monitor for any reaction";
  } else {
    overallStatus = "safe";
    overallColor = "green";
    overallIcon = "✅";
    overallMessage =
      "✓ SAFE DISH - All ingredients appear compatible with your medical conditions";
    recommendation = "This dish is safe for you to enjoy!";
  }

  return {
    overallStatus,
    overallColor,
    overallIcon,
    overallMessage,
    recommendation,
    ingredientAnalysis,
    canBeModified: modificationsAvailable.length > 0,
    modificationsAvailable,
    highRiskCount,
    moderateRiskCount,
    lowRiskCount,
    nutritionData: dishNutrition,
    spoonacularWarnings: spoonacularAnalysis?.warnings || [],
  };
};

// ========== DISEASE RISK ANALYSIS ==========
const analyzeDishForDiseaseRisks = async (item, userConditions) => {
  let totalNutrition = {};
  for (const ingredient of item.ingredients) {
    const foodData = await USDAFoodAPI.searchFood(ingredient);
    if (foodData.found && foodData.nutrition) {
      Object.keys(foodData.nutrition).forEach((key) => {
        totalNutrition[key] =
          (totalNutrition[key] || 0) + (foodData.nutrition[key] || 0);
      });
    }
  }

  const spoonacularAnalysis = await SpoonacularAPI.analyzeRecipe(
    item.ingredients,
  );
  const risks = [];

  if (totalNutrition) {
    if (totalNutrition.sugar > 30) {
      risks.push({
        disease: "Type 2 Diabetes",
        riskLevel: totalNutrition.sugar > 50 ? "high" : "moderate",
        explanation: `Contains ${totalNutrition.sugar.toFixed(1)}g of sugar - May increase insulin resistance`,
        recommendation:
          "Limit consumption. Request sugar-free preparation when possible.",
      });
    }

    if (totalNutrition.sodium > 800) {
      risks.push({
        disease: "Hypertension",
        riskLevel: totalNutrition.sodium > 1500 ? "high" : "moderate",
        explanation: `Contains ${totalNutrition.sodium.toFixed(0)}mg of sodium - High sodium intake linked to elevated blood pressure`,
        recommendation: "Request low-sodium preparation. Limit salt intake.",
      });
    }

    if (totalNutrition.saturatedFat > 15) {
      risks.push({
        disease: "High Cholesterol",
        riskLevel: totalNutrition.saturatedFat > 25 ? "high" : "moderate",
        explanation: `Contains ${totalNutrition.saturatedFat.toFixed(1)}g of saturated fat - May increase LDL cholesterol`,
        recommendation: "Choose leaner options. Request heart-healthy oils.",
      });
    }

    if (
      totalNutrition.saturatedFat > 20 ||
      totalNutrition.sodium > 1500 ||
      totalNutrition.cholesterol > 100
    ) {
      risks.push({
        disease: "Cardiovascular Disease",
        riskLevel: "moderate",
        explanation:
          "High in saturated fat, sodium, or cholesterol - May increase heart disease risk",
        recommendation:
          "Enjoy in moderation. Balance with heart-healthy foods.",
      });
    }
  }

  const purineIngredients = [
    "beef",
    "red meat",
    "organ meat",
    "sardines",
    "anchovies",
    "mackerel",
    "shellfish",
    "shrimp",
    "crab",
    "lobster",
    "goat meat",
    "lamb",
  ];
  const hasPurine = item.ingredients.some((ing) =>
    purineIngredients.some((pi) => ing.toLowerCase().includes(pi)),
  );
  if (hasPurine) {
    risks.push({
      disease: "Gout",
      riskLevel: "moderate",
      explanation:
        "Contains purine-rich ingredients that may trigger gout flares",
      recommendation: "Limit consumption. Stay well hydrated.",
    });
  }

  const gerdTriggers = [
    "tomato",
    "citrus",
    "lemon",
    "lime",
    "orange",
    "spicy",
    "chili",
    "pepper",
    "chocolate",
    "mint",
    "onion",
    "garlic",
    "fried",
    "fatty",
    "coffee",
    "caffeine",
  ];
  const hasGerdTriggers = item.ingredients.some((ing) =>
    gerdTriggers.some((trigger) => ing.toLowerCase().includes(trigger)),
  );
  if (hasGerdTriggers) {
    risks.push({
      disease: "GERD / Acid Reflux",
      riskLevel: "low",
      explanation: "Contains common acid reflux triggers",
      recommendation: "Eat slowly and in smaller portions.",
    });
  }

  const migraineTriggers = [
    "chocolate",
    "caffeine",
    "coffee",
    "aged cheese",
    "processed meat",
    "bacon",
    "salami",
    "msg",
    "artificial sweetener",
  ];
  const hasMigraineTriggers = item.ingredients.some((ing) =>
    migraineTriggers.some((trigger) => ing.toLowerCase().includes(trigger)),
  );
  if (hasMigraineTriggers) {
    risks.push({
      disease: "Migraine",
      riskLevel: "low",
      explanation: "Contains known migraine triggers",
      recommendation:
        "Monitor for symptoms. Consider avoiding if prone to migraines.",
    });
  }

  let overallRiskLevel = "low";
  let overallIcon = "✅";
  let overallColor = "green";
  let overallMessage = "🟢 LOW RISK - This dish has minimal known health risks";

  const hasCritical = risks.some((r) => r.riskLevel === "critical");
  const hasHigh = risks.some((r) => r.riskLevel === "high");
  const hasModerate = risks.some((r) => r.riskLevel === "moderate");

  if (hasCritical) {
    overallRiskLevel = "critical";
    overallIcon = "🔴⚠️";
    overallColor = "red";
    overallMessage = "⚠️ CRITICAL RISK - Could cause severe health reactions!";
  } else if (hasHigh) {
    overallRiskLevel = "high";
    overallIcon = "🔴";
    overallColor = "red";
    overallMessage =
      "🔴 HIGH RISK - May significantly impact health conditions";
  } else if (hasModerate) {
    overallRiskLevel = "moderate";
    overallIcon = "🟡";
    overallColor = "orange";
    overallMessage =
      "🟡 MODERATE RISK - May cause health issues if consumed frequently";
  }

  return {
    hasRisks: risks.length > 0,
    risks: risks,
    overallRiskLevel,
    overallIcon,
    overallColor,
    overallMessage,
    nutritionSummary: totalNutrition,
  };
};

// ========== API SERVICE FOR ORDER STORAGE ==========
const ORDER_API_URL = "https://your-api-endpoint.com/api/orders";

const apiService = {
  sendOrderToAPI: async (orderData) => {
    const payload = {
      orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      tableNumber: orderData.tableNumber,
      customerName: orderData.customerName,
      userId: orderData.userId,
      orderType: orderData.orderType || "dine-in",
      items: orderData.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        originalPrice: item.price,
        finalPrice: item.finalPrice,
        ingredients: item.ingredients,
        customizations: item.customizations || [],
        modifications: item.modifications || {},
        specialInstructions: item.specialInstructions || "",
        healthAnalysis: item.healthAnalysis || [],
        preparationTime: item.prepTime || 15,
      })),
      customizedPlates: orderData.customizedPlates || [],
      subtotal: orderData.subtotal,
      tax: orderData.tax || 0,
      total: orderData.total,
      medicalConditions: orderData.medicalConditions,
      timestamp: new Date().toISOString(),
      estimatedPreparationTime:
        orderData.items.reduce(
          (max, item) => Math.max(max, item.prepTime || 15),
          15,
        ) + 5,
      status: "confirmed",
      notes: orderData.notes || "",
    };

    try {
      const response = await axios.post(ORDER_API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const storedOrders = JSON.parse(
        localStorage.getItem("order_history") || "[]",
      );
      storedOrders.push(payload);
      localStorage.setItem("order_history", JSON.stringify(storedOrders));
      return { success: true, data: response.data, orderId: payload.orderId };
    } catch (error) {
      console.error("API error, storing locally:", error);
      const fallbackOrders = JSON.parse(
        localStorage.getItem("fallback_orders") || "[]",
      );
      fallbackOrders.push({
        ...payload,
        fallbackTimestamp: new Date().toISOString(),
      });
      localStorage.setItem("fallback_orders", JSON.stringify(fallbackOrders));
      return {
        success: false,
        error: error.message,
        fallbackStored: true,
        orderId: payload.orderId,
      };
    }
  },

  getOrderStatus: async (orderId) => {
    try {
      const response = await axios.get(`${ORDER_API_URL}/${orderId}/status`);
      return response.data;
    } catch (error) {
      console.error("Status fetch error:", error);
      return null;
    }
  },

  getTableOrders: async (tableNumber) => {
    try {
      const response = await axios.get(
        `${ORDER_API_URL}?tableNumber=${tableNumber}`,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch table orders:", error);
      return [];
    }
  },
};

// ========== FLOATING TIMER COMPONENT ==========
const FloatingTimer = ({
  orderId,
  tableNumber,
  initialDuration,
  onExpire,
  onOpenModal,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire && onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onExpire]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return "bg-red-500 animate-pulse";
    if (timeLeft <= 300) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenModal}
      className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300 ${isHovered ? "scale-105" : ""}`}
    >
      <div
        className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}
      >
        <TimerIcon className="animate-pulse" />
        <div className="flex flex-col">
          <span className="text-xs font-medium">
            Order #{orderId.slice(-6)} | Table {tableNumber}
          </span>
          <span className="text-xl font-mono font-bold tracking-wider">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ========== TABLE SELECTOR MODAL ==========
const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative"
      >
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <RestaurantIcon /> Welcome to NutriScan·AI
          </h2>
          <p className="text-orange-100 text-sm">
            Please enter your table details
          </p>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Table Number
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              if (tableNumber) onConfirm(tableNumber, customerName);
            }}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
          >
            Start Ordering
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== CONDITION SELECTION MODAL ==========
const ConditionModal = ({ isOpen, onClose, onSelect, selected }) => {
  const [localSelected, setLocalSelected] = useState(selected);

  useEffect(() => {
    if (isOpen) setLocalSelected(selected);
  }, [isOpen, selected]);

  const toggle = (cond) => {
    setLocalSelected((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond],
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <HealthIcon /> Your Medical Conditions
          </h2>
          <p className="text-purple-200 text-sm">
            Select all that apply for personalized analysis
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-2">
            {MEDICAL_CONDITIONS.map((cond) => (
              <button
                key={cond.id}
                onClick={() => toggle(cond.name)}
                className={`p-2 rounded-lg text-left text-sm transition ${
                  localSelected.includes(cond.name)
                    ? "bg-purple-100 border-2 border-purple-500 text-purple-800"
                    : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{cond.name}</div>
                <div className="text-xs opacity-70">{cond.category}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
            Skip
          </button>
          <button
            onClick={() => {
              onSelect(localSelected);
              onClose();
            }}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold"
          >
            Apply ({localSelected.length})
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== DISEASE RISK MODAL ==========
const DiseaseRiskModal = ({ isOpen, onClose, diseaseRisks, itemName }) => {
  if (!isOpen) return null;

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "critical":
        return "bg-red-100 border-red-500 text-red-800";
      case "high":
        return "bg-red-50 border-red-400 text-red-700";
      case "moderate":
        return "bg-orange-50 border-orange-400 text-orange-700";
      default:
        return "bg-green-50 border-green-400 text-green-700";
    }
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case "critical":
        return "🔴⚠️";
      case "high":
        return "🔴";
      case "moderate":
        return "🟡";
      default:
        return "🟢";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col relative"
      >
        <div
          className={`bg-gradient-to-r p-4 rounded-t-2xl text-white ${
            diseaseRisks?.overallColor === "red"
              ? "from-red-600 to-red-700"
              : diseaseRisks?.overallColor === "orange"
                ? "from-orange-500 to-orange-600"
                : "from-emerald-600 to-green-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WarningAmberIcon />
              <h2 className="font-bold text-xl">Health Risk Analysis</h2>
            </div>
            <span className="text-2xl">{diseaseRisks?.overallIcon}</span>
          </div>
          <p className="text-white/80 text-sm mt-1">{itemName}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div
            className={`rounded-xl p-4 mb-4 border-l-4 ${
              diseaseRisks?.overallColor === "red"
                ? "border-red-500 bg-red-50"
                : diseaseRisks?.overallColor === "orange"
                  ? "border-orange-500 bg-orange-50"
                  : "border-green-500 bg-green-50"
            }`}
          >
            <p className="font-semibold">{diseaseRisks?.overallMessage}</p>
          </div>

          {diseaseRisks?.hasRisks && diseaseRisks.risks.length > 0 ? (
            <>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <DangerousIcon className="text-red-500" />
                Health Risks & Disease Concerns
              </h3>
              <div className="space-y-3">
                {diseaseRisks.risks.map((risk, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 ${getRiskColor(risk.riskLevel)}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {getRiskIcon(risk.riskLevel)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold">{risk.disease}</h4>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              risk.riskLevel === "critical"
                                ? "bg-red-600 text-white"
                                : risk.riskLevel === "high"
                                  ? "bg-red-500 text-white"
                                  : risk.riskLevel === "moderate"
                                    ? "bg-orange-500 text-white"
                                    : "bg-green-500 text-white"
                            }`}
                          >
                            {risk.riskLevel.toUpperCase()} RISK
                          </span>
                        </div>
                        <p className="text-sm mt-1">{risk.explanation}</p>
                        <div className="mt-2 p-2 bg-white/50 rounded-lg">
                          <p className="text-xs font-medium">
                            💡 Recommendation:
                          </p>
                          <p className="text-xs">{risk.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircleIcon className="text-green-500 text-5xl mx-auto mb-3" />
              <p className="text-green-700 font-medium">
                ✓ No significant health risks detected
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This dish appears to have minimal negative health impacts
              </p>
            </div>
          )}

          <div className="mt-4 p-3 bg-gray-100 rounded-xl text-xs text-gray-600">
            <p className="font-medium mb-1">⚠️ Medical Disclaimer:</p>
            <p>
              Analysis uses USDA and Spoonacular APIs. Individual reactions may
              vary. Consult a healthcare professional.
            </p>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== INGREDIENT ANALYSIS MODAL ==========
const AnalysisModal = ({
  isOpen,
  onClose,
  analysis,
  isLoading,
  onContinue,
  item,
  diseaseRisks,
}) => {
  const [expandedIngredient, setExpandedIngredient] = useState(null);
  const [showDiseaseRisks, setShowDiseaseRisks] = useState(false);

  if (!isOpen) return null;

  const getHeaderColor = () => {
    if (analysis?.overallColor === "red") return "from-red-600 to-red-700";
    if (analysis?.overallColor === "orange")
      return "from-orange-500 to-orange-600";
    if (analysis?.overallColor === "yellow")
      return "from-yellow-500 to-amber-500";
    return "from-emerald-600 to-green-600";
  };

  const getBorderColor = (statusColor) => {
    switch (statusColor) {
      case "red":
        return "border-red-500 bg-red-50";
      case "orange":
        return "border-orange-500 bg-orange-50";
      case "yellow":
        return "border-yellow-500 bg-yellow-50";
      default:
        return "border-green-500 bg-green-50";
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col relative"
        >
          <div
            className={`bg-gradient-to-r ${getHeaderColor()} p-4 rounded-t-2xl text-white`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ScienceIcon />
                <h2 className="font-bold text-xl">
                  Ingredient Safety Analysis
                </h2>
              </div>
              <span className="text-2xl">{analysis?.overallIcon}</span>
            </div>
            <p className="text-white/80 text-sm mt-1">{item?.name}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Analyzing ingredients using USDA & Spoonacular data...
                </p>
              </div>
            ) : analysis ? (
              <>
                {diseaseRisks && diseaseRisks.hasRisks && (
                  <button
                    onClick={() => setShowDiseaseRisks(true)}
                    className="w-full mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-xl flex items-center justify-between hover:from-red-600 hover:to-orange-600 transition"
                  >
                    <div className="flex items-center gap-2">
                      <WarningAmberIcon />
                      <span className="font-semibold">
                        View Health Risks & Diseases
                      </span>
                    </div>
                    <span className="text-sm">
                      {diseaseRisks.overallRiskLevel === "critical"
                        ? "⚠️ CRITICAL"
                        : diseaseRisks.overallRiskLevel === "high"
                          ? "🔴 HIGH"
                          : diseaseRisks.overallRiskLevel === "moderate"
                            ? "🟡 MODERATE"
                            : "🟢 LOW"}
                    </span>
                  </button>
                )}

                <div
                  className={`rounded-xl p-4 mb-4 border-l-4 ${getBorderColor(analysis.overallColor)}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{analysis.overallIcon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {analysis.overallMessage}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {analysis.recommendation}
                      </p>
                      {(analysis.highRiskCount > 0 ||
                        analysis.moderateRiskCount > 0) && (
                        <div className="flex gap-3 mt-2 text-xs">
                          {analysis.highRiskCount > 0 && (
                            <span className="text-red-600">
                              🔴 {analysis.highRiskCount} high risk
                            </span>
                          )}
                          {analysis.moderateRiskCount > 0 && (
                            <span className="text-orange-600">
                              🟡 {analysis.moderateRiskCount} moderate risk
                            </span>
                          )}
                          {analysis.lowRiskCount > 0 && (
                            <span className="text-yellow-600">
                              🟢 {analysis.lowRiskCount} low risk
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-700 mb-3">
                  📋 Ingredient Analysis
                </h3>
                <div className="space-y-3">
                  {analysis.ingredientAnalysis.map((ing, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedIngredient(
                            expandedIngredient === idx ? null : idx,
                          )
                        }
                        className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{ing.statusIcon}</span>
                          <span className="font-medium text-gray-800">
                            {ing.ingredient}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              ing.status === "high"
                                ? "bg-red-100 text-red-700"
                                : ing.status === "moderate"
                                  ? "bg-orange-100 text-orange-700"
                                  : ing.status === "low"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                          >
                            {ing.status === "high"
                              ? "HIGH RISK"
                              : ing.status === "moderate"
                                ? "CAUTION"
                                : ing.status === "low"
                                  ? "LOW RISK"
                                  : "SAFE"}
                          </span>
                          <span className="text-gray-400">
                            {expandedIngredient === idx ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {expandedIngredient === idx && (
                        <div className="p-3 bg-gray-50 border-t">
                          <p className="text-sm text-gray-700 mb-2">
                            {ing.message}
                          </p>
                          {ing.relevantCondition && (
                            <p className="text-xs text-gray-500">
                              ⚠️ Relevant condition: {ing.relevantCondition}
                            </p>
                          )}
                          {ing.modificationAvailable && (
                            <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
                              <p className="text-xs font-medium text-emerald-700">
                                ✓ Modification Available:
                              </p>
                              <p className="text-xs text-emerald-600">
                                {ing.modificationText}
                              </p>
                              {ing.safeAlternative && (
                                <p className="text-xs text-emerald-600 mt-1">
                                  Suggested: {ing.safeAlternative}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {analysis.modificationsAvailable &&
                  analysis.modificationsAvailable.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                      <p className="text-sm font-medium text-blue-700 mb-1">
                        ✨ Customization Options Available
                      </p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        {analysis.modificationsAvailable
                          .slice(0, 3)
                          .map((mod, idx) => (
                            <li key={idx}>• {mod}</li>
                          ))}
                      </ul>
                    </div>
                  )}
              </>
            ) : (
              <div className="text-center py-8">
                <CheckIcon className="text-green-500 text-5xl mx-auto mb-3" />
                <p className="text-green-700 font-medium">
                  ✓ No analysis needed
                </p>
                <p className="text-xs text-gray-500">
                  Select medical conditions first for personalized analysis
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex gap-3">
            <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
              Close
            </button>
            <button
              onClick={onContinue}
              className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
              disabled={analysis?.overallStatus === "high_risk"}
            >
              {analysis?.overallStatus === "high_risk"
                ? "⚠️ Not Recommended"
                : "Continue to Order"}
            </button>
          </div>
        </motion.div>
      </div>

      <DiseaseRiskModal
        isOpen={showDiseaseRisks}
        onClose={() => setShowDiseaseRisks(false)}
        diseaseRisks={diseaseRisks}
        itemName={item?.name}
      />
    </>
  );
};

// ========== CUSTOMIZATION MODAL ==========
const CustomizationModal = ({
  isOpen,
  onClose,
  item,
  onAddToCart,
  analysis,
}) => {
  const [customizations, setCustomizations] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showModifications, setShowModifications] = useState(false);
  const [selectedModifications, setSelectedModifications] = useState({});

  if (!isOpen) return null;

  const riskyIngredients =
    analysis?.ingredientAnalysis?.filter(
      (ing) => ing.status !== "safe" && ing.modificationAvailable,
    ) || [];

  const handleApplyModification = (ingredient, modification) => {
    setSelectedModifications((prev) => ({
      ...prev,
      [ingredient]: modification,
    }));
    setCustomizations((prev) => {
      const filtered = prev.filter((c) => !c.includes(ingredient));
      return [...filtered, `Replace ${ingredient} - ${modification}`];
    });
    toast.success(`✓ Modification applied for ${ingredient}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
      >
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <EditIcon /> Customize Your Order
          </h2>
          <p className="text-amber-100 text-sm">
            {item.name} - RWF {item.price.toLocaleString()}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              📦 Original Ingredients:
            </h3>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.map((ing, idx) => {
                const isRisky = riskyIngredients.some(
                  (r) => r.ingredient === ing,
                );
                return (
                  <span
                    key={idx}
                    className={`text-xs px-2 py-1 rounded-full ${isRisky ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                  >
                    {ing} {isRisky && "⚠️"}
                  </span>
                );
              })}
            </div>
          </div>

          {riskyIngredients.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowModifications(!showModifications)}
                className="w-full text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200"
              >
                <div className="flex items-center gap-2">
                  <ShieldIcon className="text-emerald-600" />
                  <span className="font-semibold text-emerald-800">
                    Health-Safe Modifications Available
                  </span>
                </div>
                <p className="text-xs text-emerald-600 mt-1">
                  {riskyIngredients.length} ingredient(s) can be modified for
                  your safety
                </p>
              </button>

              {showModifications && (
                <div className="mt-2 space-y-2">
                  {riskyIngredients.map((ing, idx) => (
                    <div key={idx} className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-xl">{ing.statusIcon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {ing.ingredient}
                          </p>
                          <p className="text-xs text-gray-600">{ing.message}</p>
                          {ing.modificationText && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-emerald-700">
                                Suggested modification:
                              </p>
                              <p className="text-xs text-emerald-600">
                                {ing.modificationText}
                              </p>
                              {ing.safeAlternative && (
                                <p className="text-xs text-emerald-600">
                                  → {ing.safeAlternative}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleApplyModification(
                              ing.ingredient,
                              ing.modificationText,
                            )
                          }
                          className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
                          disabled={selectedModifications[ing.ingredient]}
                        >
                          {selectedModifications[ing.ingredient]
                            ? "✓ Applied"
                            : "Apply"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {customizations.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                ✓ Applied Customizations:
              </h3>
              {customizations.map((cust, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-2 rounded-lg text-sm mb-1 flex justify-between"
                >
                  <span>{cust}</span>
                  <button
                    onClick={() =>
                      setCustomizations((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              📝 Special Instructions:
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any additional requests? (e.g., no salt, extra well-done, etc.)"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="2"
            />
          </div>
        </div>

        <div className="p-4 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 border py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={() => {
              onAddToCart(item, customizations, specialInstructions);
              onClose();
            }}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
          >
            Add to Cart (RWF {item.price.toLocaleString()})
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== CART MODAL ==========
const CartModal = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem,
  getTotal,
  onCheckout,
  tableInfo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
      >
        <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <CartIcon /> Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="mb-3 pb-3 border-b">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.customizations.map((c, i) => (
                          <div key={i}>• {c}</div>
                        ))}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <p className="text-xs text-orange-600 mt-1">
                        📝 {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="text-orange-600 font-bold">
                    RWF {item.finalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity - 1)
                    }
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity + 1)
                    }
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <AddIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="ml-2 text-red-500"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between font-bold mb-3">
              <span>Total</span>
              <span className="text-orange-600">
                RWF {getTotal().toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Confirm Order - Table {tableInfo.tableNumber}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ========== ORDER DETAIL MODAL ==========
const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-white font-bold text-xl">Order Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Table:</strong> {order.tableNumber}
            </p>
            <p>
              <strong>Customer:</strong> {order.customerName || "Guest"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {order.status}
              </span>
            </p>
            <p>
              <strong>Time Remaining:</strong>{" "}
              {Math.floor(order.timeRemaining / 60)}:
              {(order.timeRemaining % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <h3 className="font-bold mb-2">Items:</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2 border-b">
              <div className="flex justify-between">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>RWF {item.finalPrice.toLocaleString()}</span>
              </div>
              {item.customizations && item.customizations.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {item.customizations.map((c, i) => (
                    <div key={i}>• {c}</div>
                  ))}
                </div>
              )}
              {item.specialInstructions && (
                <p className="text-xs text-orange-600 mt-1">
                  Note: {item.specialInstructions}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-between font-bold pt-3 mt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">
              RWF {order.total.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== RESULT MODAL ==========
const ResultModal = ({ isOpen, onClose, type, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
      >
        {type === "success" && (
          <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
        )}
        {type === "error" && (
          <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
        )}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 whitespace-pre-line mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
};

// ========== MAIN MENU COMPONENT ==========
export const Menu = () => {
  const [cart, setCart] = useState([]);
  const [cartIdCounter, setCartIdCounter] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showTableModal, setShowTableModal] = useState(true);
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [diseaseRisksResult, setDiseaseRisksResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOrder, setActiveOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showResult, setShowResult] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
  });
  const [tableInfo, setTableInfo] = useState({
    tableNumber: null,
    customerName: "",
  });

  const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
  const filtered = MENU_ITEMS.filter(
    (i) =>
      (activeCategory === "all" || i.category === activeCategory) &&
      i.name.toLowerCase().includes(search.toLowerCase()),
  );
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => setCurrentPage(1), [activeCategory, search]);

  const handleItemClick = async (item) => {
    setCurrentItem(item);
    setIsAnalyzing(true);
    setShowAnalysisModal(true);

    const analysis = await analyzeDishForConditions(item, selectedConditions);
    setAnalysisResult(analysis);

    const diseaseRisks = await analyzeDishForDiseaseRisks(
      item,
      selectedConditions,
    );
    setDiseaseRisksResult(diseaseRisks);

    setIsAnalyzing(false);
  };

  const handleAnalysisContinue = () => {
    setShowAnalysisModal(false);
    setShowCustomModal(true);
  };

  const addToCartWithCustomizations = (item, customizations, instructions) => {
    const newItem = {
      ...item,
      quantity: 1,
      finalPrice: item.price,
      customizations: customizations,
      specialInstructions: instructions,
      healthAnalysis: analysisResult,
      diseaseRisks: diseaseRisksResult,
      cartId: cartIdCounter,
    };
    setCart((prev) => [...prev, newItem]);
    setCartIdCounter((prev) => prev + 1);
    toast.success(`${item.name} added to cart!`);
    setShowCart(true);
  };

  const updateQuantity = (cartId, newQty) => {
    if (newQty < 1) {
      setCart((prev) => prev.filter((i) => i.cartId !== cartId));
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.cartId === cartId
          ? { ...i, quantity: newQty, finalPrice: i.price * newQty }
          : i,
      ),
    );
  };

  const removeItem = (cartId) =>
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  const getTotal = () => cart.reduce((sum, i) => sum + i.finalPrice, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setShowResult({
        open: true,
        type: "error",
        title: "Cart Empty",
        message: "Please add items to your cart first.",
      });
      return;
    }

    setShowCart(false);

    const orderData = {
      tableNumber: tableInfo.tableNumber,
      customerName: tableInfo.customerName,
      userId: `user_${Date.now()}`,
      items: cart,
      customizedPlates: cart.map((item) => ({
        name: item.name,
        customizations: item.customizations,
        instructions: item.specialInstructions,
      })),
      subtotal: getTotal(),
      total: getTotal(),
      medicalConditions: selectedConditions,
      notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName || "Guest"}`,
    };

    const result = await apiService.sendOrderToAPI(orderData);

    if (result.success || result.fallbackStored) {
      const preparationTime =
        cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
      setActiveOrder({
        orderId: result.orderId,
        tableNumber: tableInfo.tableNumber,
        customerName: tableInfo.customerName,
        items: cart,
        total: getTotal(),
        timeRemaining: preparationTime * 60,
        status: "confirmed",
      });
      setShowResult({
        open: true,
        type: "success",
        title: "✅ Order Confirmed!",
        message: `Table ${tableInfo.tableNumber} - Order placed!\nOrder ID: ${result.orderId.slice(-8)}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min`,
      });
      setCart([]);
    } else {
      setShowResult({
        open: true,
        type: "error",
        title: "Order Failed",
        message: "Unable to place order. Please try again.",
      });
    }
  };

  const handleTimerExpire = () => {
    toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
    setActiveOrder((prev) => (prev ? { ...prev, status: "ready" } : null));
  };

  const handleTableConfirm = (tableNum, customerName) => {
    setTableInfo({ tableNumber: tableNum, customerName: customerName || "" });
    setShowTableModal(false);
    toast.success(
      `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Browse our menu.`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <ToastContainer position="bottom-right" />

      <TableSelectorModal
        isOpen={showTableModal}
        onClose={() => {}}
        onConfirm={handleTableConfirm}
      />
      <ConditionModal
        isOpen={showConditionModal}
        onClose={() => setShowConditionModal(false)}
        onSelect={setSelectedConditions}
        selected={selectedConditions}
      />
      <AnalysisModal
        isOpen={showAnalysisModal}
        onClose={() => setShowAnalysisModal(false)}
        analysis={analysisResult}
        isLoading={isAnalyzing}
        onContinue={handleAnalysisContinue}
        item={currentItem}
        diseaseRisks={diseaseRisksResult}
      />
      <CustomizationModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        item={currentItem}
        onAddToCart={addToCartWithCustomizations}
        analysis={analysisResult}
      />
      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        getTotal={getTotal}
        onCheckout={handleCheckout}
        tableInfo={tableInfo}
      />
      <OrderDetailModal
        isOpen={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        order={activeOrder}
      />
      <ResultModal
        isOpen={showResult.open}
        onClose={() => setShowResult({ ...showResult, open: false })}
        type={showResult.type}
        title={showResult.title}
        message={showResult.message}
      />

      {activeOrder && (
        <FloatingTimer
          orderId={activeOrder.orderId}
          tableNumber={activeOrder.tableNumber}
          initialDuration={activeOrder.timeRemaining}
          onExpire={handleTimerExpire}
          onOpenModal={() => setShowOrderDetail(true)}
        />
      )}

      <div className="container mx-auto px-4 py-5 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
              <RestaurantIcon className="text-orange-500" /> NutriScan·AI
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Table {tableInfo.tableNumber}{" "}
              {tableInfo.customerName && `· ${tableInfo.customerName}`} ·
              AI-Powered Health Risk Analysis
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConditionModal(true)}
              className={`relative p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? "bg-purple-500 text-white" : "bg-white text-purple-500"}`}
            >
              <HealthIcon />
              {selectedConditions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedConditions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition"
            >
              <CartIcon className="text-orange-500" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Health Banner */}
        {selectedConditions.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <ShieldIcon className="text-emerald-600 flex-shrink-0" />
                <span className="text-sm text-emerald-800 break-words">
                  🛡️ Personalized for: {selectedConditions.join(", ")}
                </span>
              </div>
              <button
                onClick={() => setShowConditionModal(true)}
                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              >
                Update Conditions
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm text-sm sm:text-base"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-xs sm:text-sm ${activeCategory === cat ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {paginated.map((item) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image}
                className="h-32 sm:h-36 md:h-40 w-full object-cover"
                alt={item.name}
              />
              <div className="p-3">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-600 font-bold text-sm sm:text-base">
                    RWF {item.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <TimeIcon fontSize="small" /> {item.prepTime}min
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500">No items match your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded bg-white disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded ${currentPage === p ? "bg-orange-500 text-white" : "bg-white"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded bg-white disabled:opacity-50"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
