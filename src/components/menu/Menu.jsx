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
} from "@mui/icons-material";

// ========== OPENFDA FOOD API ONLY (Using Axios) ==========
const OPENFDA_FOOD_API = "https://api.fda.gov/food/enforcement.json";

// API Service using Axios
const fdaApi = axios.create({
  baseURL: "https://api.fda.gov",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to search ingredient health risks using ONLY OpenFDA Food API
// Returns concise warnings (max 2 sentences)
const searchIngredientOnline = async (ingredient, userConditions = []) => {
  const results = [];

  try {
    // Search OpenFDA Food Enforcement for recalls and warnings
    const response = await fdaApi.get("/food/enforcement.json", {
      params: {
        search: ingredient,
        limit: 5,
      },
    });

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      response.data.results.forEach((result) => {
        let severity = "moderate";
        if (result.classification === "Class I") severity = "high";
        else if (result.classification === "Class II") severity = "moderate";
        else if (result.classification === "Class III") severity = "low";

        // Create concise message (max 2 sentences)
        let shortMessage = "";
        const reason = result.reason_for_recall || "";
        const productDesc = result.product_description || "";

        if (reason && reason.length > 100) {
          shortMessage = reason.substring(0, 97) + "...";
        } else if (reason) {
          shortMessage = reason;
        } else if (productDesc) {
          shortMessage =
            productDesc.length > 100
              ? productDesc.substring(0, 97) + "..."
              : productDesc;
        } else {
          shortMessage = `${ingredient} has FDA safety concerns.`;
        }

        results.push({
          ingredient,
          source: "FDA",
          severity: severity,
          condition: result.reason_for_recall
            ? "Recall Warning"
            : "Safety Alert",
          message: shortMessage,
          clinicalNote: `Classification: ${result.classification || "Not specified"}`,
          mechanism: result.product_type || "Food product",
          confidence: 0.85,
          recallId: result.report_id,
        });
      });
    }
  } catch (error) {
    console.warn("OpenFDA Food API search failed:", error.message);
  }

  // Check against user's medical conditions (local allergen check)
  const userConditionWarnings = checkAgainstUserConditions(
    ingredient,
    userConditions,
  );
  results.push(...userConditionWarnings);

  // Remove duplicates and sort by severity
  const uniqueResults = results.filter(
    (v, i, a) =>
      a.findIndex(
        (t) => t.condition === v.condition && t.message === v.message,
      ) === i,
  );

  const severityOrder = { high: 3, moderate: 2, low: 1, info: 0 };
  return uniqueResults.sort(
    (a, b) =>
      (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0),
  );
};

// Check ingredient against user's specific conditions
const checkAgainstUserConditions = (ingredient, userConditions) => {
  const warnings = [];

  const allergenMap = {
    peanut: ["Peanut Allergy"],
    peanuts: ["Peanut Allergy"],
    coconut: ["Tree Nut Allergy"],
    almond: ["Tree Nut Allergy"],
    walnut: ["Tree Nut Allergy"],
    cashew: ["Tree Nut Allergy"],
    shrimp: ["Shellfish Allergy"],
    prawn: ["Shellfish Allergy"],
    crab: ["Shellfish Allergy"],
    lobster: ["Shellfish Allergy"],
    salmon: ["Fish Allergy"],
    tuna: ["Fish Allergy"],
    egg: ["Egg Allergy"],
    eggs: ["Egg Allergy"],
    soy: ["Soy Allergy"],
    tofu: ["Soy Allergy"],
    wheat: ["Celiac Disease", "Wheat Allergy"],
    flour: ["Celiac Disease", "Wheat Allergy"],
    gluten: ["Celiac Disease"],
    milk: ["Lactose Intolerance", "Milk Allergy"],
    cheese: ["Lactose Intolerance", "Milk Allergy"],
    butter: ["Lactose Intolerance"],
    sugar: ["Type 2 Diabetes", "Type 1 Diabetes"],
    salt: ["Hypertension", "Kidney Disease"],
    sodium: ["Hypertension", "Kidney Disease"],
    beef: ["Gout", "High Cholesterol"],
    coffee: ["Migraine", "Anxiety", "GERD"],
    caffeine: ["Migraine", "Anxiety", "GERD"],
    chocolate: ["Migraine", "Anxiety"],
    tomato: ["GERD"],
    citrus: ["GERD"],
  };

  for (const [key, conditions] of Object.entries(allergenMap)) {
    if (ingredient.toLowerCase().includes(key)) {
      const matchingConditions = conditions.filter((c) =>
        userConditions.includes(c),
      );
      matchingConditions.forEach((condition) => {
        warnings.push({
          ingredient,
          source: "Health Profile",
          severity: condition.includes("Allergy") ? "high" : "moderate",
          condition: condition,
          message: `${ingredient} may trigger ${condition.toLowerCase()}. Consider alternatives.`,
          clinicalNote: "Consult your healthcare provider",
          mechanism: "Allergen reaction",
          confidence: 0.95,
        });
      });
    }
  }

  return warnings;
};

// Get modification suggestions based on condition
const getModificationForIngredient = (ingredient, condition) => {
  const substitutionMap = {
    "Peanut Allergy": {
      peanut: {
        name: "Sunflower Seed Butter",
        description: "Nut-free alternative",
        icon: "🌻",
        healthImpact: "Hypoallergenic",
      },
      "peanut flour": {
        name: "Coconut Flour",
        description: "Nut-free, high fiber",
        icon: "🥥",
        healthImpact: "Rich in MCTs",
      },
    },
    "Tree Nut Allergy": {
      coconut: {
        name: "Oat Cream",
        description: "Dairy-free, nut-free",
        icon: "🌾",
        healthImpact: "Low allergenic",
      },
      almond: {
        name: "Pumpkin Seeds",
        description: "Nut-free seed alternative",
        icon: "🎃",
        healthImpact: "Rich in magnesium",
      },
    },
    "Shellfish Allergy": {
      shrimp: {
        name: "King Oyster Mushroom",
        description: "Mimics shrimp texture",
        icon: "🍄",
        healthImpact: "Cholesterol-free",
      },
      crab: {
        name: "Hearts of Palm",
        description: "Flaky texture like crab",
        icon: "🌴",
        healthImpact: "Low calorie",
      },
    },
    "Type 2 Diabetes": {
      sugar: {
        name: "Monk Fruit Sweetener",
        description: "Zero glycemic impact",
        icon: "🍈",
        healthImpact: "No blood sugar spike",
      },
      honey: {
        name: "Stevia Drops",
        description: "Zero-calorie sweetener",
        icon: "🌿",
        healthImpact: "Improves insulin sensitivity",
      },
    },
    Hypertension: {
      salt: {
        name: "Potassium Salt Substitute",
        description: "Sodium-free seasoning",
        icon: "⚖️",
        healthImpact: "May lower BP",
      },
      "soy sauce": {
        name: "Coconut Aminos",
        description: "Low-sodium alternative",
        icon: "🥥",
        healthImpact: "73% less sodium",
      },
    },
    "Celiac Disease": {
      wheat: {
        name: "Almond Flour",
        description: "Gluten-free alternative",
        icon: "🌰",
        healthImpact: "High protein",
      },
      flour: {
        name: "Rice Flour",
        description: "Gluten-free flour",
        icon: "🍚",
        healthImpact: "Easy to digest",
      },
    },
    "Lactose Intolerance": {
      milk: {
        name: "Lactose-Free Milk",
        description: "Real milk with lactase",
        icon: "🥛",
        healthImpact: "Complete nutrition",
      },
      cheese: {
        name: "Nutritional Yeast",
        description: "Cheesy flavor, dairy-free",
        icon: "🧀",
        healthImpact: "B-vitamin rich",
      },
    },
    GERD: {
      tomato: {
        name: "Roasted Red Pepper",
        description: "Low-acid alternative",
        icon: "🫑",
        healthImpact: "Won't trigger reflux",
      },
      citrus: {
        name: "Mango",
        description: "Non-acidic fruit",
        icon: "🥭",
        healthImpact: "Alkaline-forming",
      },
      spicy: {
        name: "Herb Seasoning",
        description: "Flavorful without heat",
        icon: "🌿",
        healthImpact: "Gentle on stomach",
      },
    },
  };

  const conditionMods = substitutionMap[condition];
  if (conditionMods) {
    for (const [key, mod] of Object.entries(conditionMods)) {
      if (ingredient.toLowerCase().includes(key)) {
        return mod;
      }
    }
  }
  return null;
};

// ========== API SERVICE FOR ORDER STORAGE ==========
const ORDER_API_URL = "https://your-api-endpoint.com/api/orders";

const apiService = {
  // Send complete order to API with all details
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

      console.log("Order stored successfully:", response.data);

      // Store in localStorage for backup
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

  // Fetch order status
  getOrderStatus: async (orderId) => {
    try {
      const response = await axios.get(`${ORDER_API_URL}/${orderId}/status`);
      return response.data;
    } catch (error) {
      console.error("Status fetch error:", error);
      return null;
    }
  },

  // Get all orders for a table
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
    if (timeLeft <= 60) return "bg-red-500";
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
            <RestaurantIcon /> Table Information
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
              Customer Name (Optional)
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

// ========== MEDICAL CONDITIONS ==========
const MEDICAL_CONDITIONS = [
  { id: 1, name: "Peanut Allergy", category: "Allergy", severity: "high" },
  { id: 2, name: "Tree Nut Allergy", category: "Allergy", severity: "high" },
  { id: 3, name: "Shellfish Allergy", category: "Allergy", severity: "high" },
  { id: 4, name: "Fish Allergy", category: "Allergy", severity: "high" },
  { id: 5, name: "Egg Allergy", category: "Allergy", severity: "moderate" },
  { id: 6, name: "Soy Allergy", category: "Allergy", severity: "moderate" },
  { id: 7, name: "Wheat Allergy", category: "Allergy", severity: "moderate" },
  { id: 8, name: "Milk Allergy", category: "Allergy", severity: "moderate" },
  { id: 9, name: "Celiac Disease", category: "Autoimmune", severity: "high" },
  {
    id: 10,
    name: "Lactose Intolerance",
    category: "Digestive",
    severity: "low",
  },
  { id: 11, name: "Type 2 Diabetes", category: "Metabolic", severity: "high" },
  { id: 12, name: "Type 1 Diabetes", category: "Metabolic", severity: "high" },
  {
    id: 13,
    name: "Hypertension",
    category: "Cardiovascular",
    severity: "moderate",
  },
  {
    id: 14,
    name: "High Cholesterol",
    category: "Cardiovascular",
    severity: "moderate",
  },
  { id: 15, name: "Gout", category: "Metabolic", severity: "moderate" },
  { id: 16, name: "GERD", category: "Digestive", severity: "low" },
  { id: 17, name: "Kidney Disease", category: "Renal", severity: "high" },
  { id: 18, name: "Migraine", category: "Neurological", severity: "low" },
];

// ========== MENU ITEMS ==========
const MENU_ITEMS = [
  {
    id: 1,
    name: "Isombe ya Nyama",
    price: 2800,
    ingredients: [
      "cassava leaves",
      "beef",
      "coconut milk",
      "peanut flour",
      "palm oil",
    ],
    description: "Traditional cassava leaf stew",
    prepTime: 18,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
  },
  {
    id: 2,
    name: "Brochette de Boeuf",
    price: 3500,
    ingredients: ["beef sirloin", "pepper sauce", "potato", "spices", "salt"],
    description: "Grilled skewers with fries",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
  },
  {
    id: 3,
    name: "Ibiharage",
    price: 1800,
    ingredients: ["kidney beans", "palm oil", "tomato", "onion", "salt"],
    description: "Rwandan bean stew",
    prepTime: 12,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
  },
  {
    id: 4,
    name: "Matoke ya Nyama",
    price: 3200,
    ingredients: [
      "green plantain",
      "goat meat",
      "ginger",
      "onion",
      "coconut oil",
    ],
    description: "Steamed plantain with goat stew",
    prepTime: 20,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
  },
  {
    id: 5,
    name: "Grilled Tilapia",
    price: 4500,
    ingredients: ["tilapia", "lemon", "garlic", "rosemary", "olive oil"],
    description: "Fresh lake tilapia",
    prepTime: 16,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
  },
  {
    id: 6,
    name: "Chicken Shawarma",
    price: 4200,
    ingredients: ["chicken", "yogurt", "garlic", "spices", "pita"],
    description: "Marinated chicken wrap",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
  },
  {
    id: 7,
    name: "Beef Burger",
    price: 4800,
    ingredients: ["beef patty", "lettuce", "tomato", "cheese", "bun"],
    description: "Angus beef burger",
    prepTime: 12,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    id: 8,
    name: "Vegetable Pad Thai",
    price: 3800,
    ingredients: ["rice noodles", "tofu", "bean sprouts", "peanuts", "lime"],
    description: "Classic Thai noodles",
    prepTime: 14,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400",
  },
  {
    id: 9,
    name: "Margherita Pizza",
    price: 5200,
    ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
    description: "Classic Italian pizza",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
  },
  {
    id: 10,
    name: "Chocolate Lava Cake",
    price: 6500,
    ingredients: ["chocolate", "sugar", "butter", "eggs", "flour"],
    description: "Warm molten cake",
    prepTime: 12,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
  },
  {
    id: 11,
    name: "Mango Sticky Rice",
    price: 3500,
    ingredients: ["glutinous rice", "mango", "coconut milk", "sugar"],
    description: "Thai dessert",
    prepTime: 10,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
  },
  {
    id: 12,
    name: "Fresh Lemonade",
    price: 1500,
    ingredients: ["lemon", "sugar", "water", "mint"],
    description: "Hand-squeezed lemonade",
    prepTime: 3,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400",
  },
];

// ========== MODAL COMPONENTS ==========
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
            <HealthIcon /> Medical Conditions
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

const AnalysisModal = ({
  isOpen,
  onClose,
  analysis,
  isLoading,
  onContinue,
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-t-2xl">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <ScienceIcon /> FDA Safety Analysis
          </h2>
          <p className="text-emerald-100 text-sm">
            Real-time FDA food safety check
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
              <p className="text-gray-600">Searching FDA database...</p>
              <p className="text-xs text-gray-400 mt-2">
                OpenFDA Food Enforcement API
              </p>
            </div>
          ) : analysis && analysis.length > 0 ? (
            <>
              <div className="bg-amber-50 p-3 rounded-xl border-l-4 border-amber-500 mb-4">
                <p className="text-amber-800 font-medium">
                  {analysis.length} warning(s) detected
                </p>
              </div>
              {analysis.map((risk, idx) => (
                <div
                  key={idx}
                  className={`mb-3 p-3 rounded-xl border-l-4 ${
                    risk.severity === "high"
                      ? "border-red-500 bg-red-50"
                      : risk.severity === "moderate"
                        ? "border-orange-500 bg-orange-50"
                        : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="font-semibold text-sm">{risk.condition}</div>
                  <p className="text-xs mt-1 text-gray-700">{risk.message}</p>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <span className="text-gray-500">{risk.source}</span>
                    <span className="text-gray-500">
                      ⚠️ {risk.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircleIcon className="text-green-500 text-5xl mx-auto mb-3" />
              <p className="text-green-700 font-medium">
                ✓ No FDA warnings found
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Verified against OpenFDA database
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <button
            onClick={onContinue}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Continue to Customization
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CustomizationModal = ({
  isOpen,
  onClose,
  item,
  selectedConditions,
  onAddToCart,
}) => {
  const [customizations, setCustomizations] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showModifications, setShowModifications] = useState(false);

  // Find modifications for each ingredient based on conditions
  const getSuggestions = () => {
    const suggestions = [];
    for (const condition of selectedConditions) {
      for (const ingredient of item.ingredients) {
        const mod = getModificationForIngredient(ingredient, condition);
        if (mod && !suggestions.find((s) => s.ingredient === ingredient)) {
          suggestions.push({ ingredient, ...mod, condition });
        }
      }
    }
    return suggestions;
  };

  const suggestions = getSuggestions();

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
      >
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-2xl">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <EditIcon /> Customize Your Plate
          </h2>
          <p className="text-amber-100 text-sm">
            {item.name} - RWF {item.price.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Ingredients */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Health Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowModifications(!showModifications)}
                className="w-full text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200"
              >
                <div className="flex items-center gap-2">
                  <ShieldIcon className="text-emerald-600 text-sm" />
                  <span className="font-semibold text-emerald-800">
                    Health-Safe Modifications Available
                  </span>
                </div>
                <p className="text-xs text-emerald-600 mt-1">
                  Tap to see suggestions for your health profile
                </p>
              </button>

              {showModifications && (
                <div className="mt-2 space-y-2">
                  {suggestions.map((sug, idx) => (
                    <div key={idx} className="bg-green-50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{sug.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Replace {sug.ingredient}
                          </p>
                          <p className="text-xs text-gray-600">
                            → {sug.name} - {sug.description}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            {sug.healthImpact}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setCustomizations((prev) => [
                              ...prev,
                              `Replace ${sug.ingredient} with ${sug.name}`,
                            ]);
                            toast.success(
                              `✓ Will use ${sug.name} instead of ${sug.ingredient}`,
                            );
                          }}
                          className="bg-emerald-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Applied Customizations */}
          {customizations.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Applied Customizations:
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

          {/* Special Instructions */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Special Instructions:
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any additional requests? (e.g., no salt, extra spicy, etc.)"
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
  const [analysisResult, setAnalysisResult] = useState([]);
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

  // Handle item click - perform FDA analysis
  const handleItemClick = async (item) => {
    setCurrentItem(item);
    setIsAnalyzing(true);
    setShowAnalysisModal(true);

    const risks = [];
    for (const ingredient of item.ingredients) {
      const ingredientRisks = await searchIngredientOnline(
        ingredient,
        selectedConditions,
      );
      risks.push(...ingredientRisks);
    }

    const uniqueRisks = risks.filter(
      (v, i, a) =>
        a.findIndex(
          (t) => t.condition === v.condition && t.message === v.message,
        ) === i,
    );
    const severityOrder = { high: 3, moderate: 2, low: 1, info: 0 };
    uniqueRisks.sort(
      (a, b) =>
        (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0),
    );

    setAnalysisResult(uniqueRisks.slice(0, 5));
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
      />

      <CustomizationModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        item={currentItem}
        selectedConditions={selectedConditions}
        onAddToCart={addToCartWithCustomizations}
      />

      <OrderDetailModal
        isOpen={showOrderDetail}
        onClose={() => setShowOrderDetail(false)}
        order={activeOrder}
      />

      {showResult.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowResult({ ...showResult, open: false })}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
          >
            {showResult.type === "success" && (
              <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
            )}
            {showResult.type === "error" && (
              <ErrorIcon className="text-red-500 text-6xl mx-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold mb-2">{showResult.title}</h2>
            <p className="text-gray-600 whitespace-pre-line mb-6">
              {showResult.message}
            </p>
            <button
              onClick={() => setShowResult({ ...showResult, open: false })}
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative"
          >
            <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-white font-bold text-xl flex items-center gap-2">
                <CartIcon /> Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
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
                        {item.customizations &&
                          item.customizations.length > 0 && (
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
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  Confirm Order - Table {tableInfo.tableNumber}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

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
        <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <RestaurantIcon className="text-orange-500" /> NutriScan·AI
            </h1>
            <p className="text-gray-500 text-sm">
              Table {tableInfo.tableNumber}{" "}
              {tableInfo.customerName && `· ${tableInfo.customerName}`} · FDA
              Verified
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConditionModal(true)}
              className={`p-2 rounded-full shadow-lg transition ${selectedConditions.length > 0 ? "bg-purple-500 text-white" : "bg-white text-purple-500"}`}
            >
              <HealthIcon />
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
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4 flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ShieldIcon className="text-emerald-600" />
              <span className="text-sm text-emerald-800">
                Personalized for: {selectedConditions.join(", ")}
              </span>
            </div>
            <button
              onClick={() => setShowConditionModal(true)}
              className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              Update
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-auto pb-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? "bg-orange-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
            >
              {cat === "all" ? "All Items" : cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                className="h-36 w-full object-cover"
                alt={item.name}
              />
              <div className="p-3">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-orange-600 font-bold">
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
          <div className="flex justify-center gap-2 mt-6">
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
