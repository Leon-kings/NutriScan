// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/set-state-in-effect */

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
//   Receipt as ReceiptIcon,
//   ConfirmationNumber as ConfirmationNumberIcon,
//   NotificationsActive as NotifIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Info as InfoIcon,
//   LocalHospital as LocalHospitalIcon,
//   Nature,
//   Speed as SpeedIcon,
//   Bolt as BoltIcon,
//   SpaOutlined,
//   Fastfood as FastfoodIcon,
//   LocalDrink as LocalDrinkIcon,
//   RestaurantMenu as MenuIcon,
//   EmojiFoodBeverage as DrinkIcon,
//   Cake as DessertIcon,
//   LunchDining as LunchIcon,
//   BreakfastDining as BreakfastIcon,
//   DinnerDining as DinnerIcon,
//   SmartToy as AIIcon,
//   Analytics as AnalyticsIcon,
//   Star as StarIcon,
//   Recommend as RecommendIcon,
//   ThumbUp as ThumbUpIcon,
//   Lightbulb as LightbulbIcon,
//   TipsAndUpdates as TipsIcon,
// } from "@mui/icons-material";
// import { v4 as uuidv4 } from "uuid";
// import { Slider } from "../slider/Slider";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   EDAMAM_APP_ID: "0dcbf7a8",
//   EDAMAM_APP_KEY: "2059ccfd4b967458e7f4a9ffe6cf118b",
//   EDAMAM_BASE_URL: "https://api.edamam.com",
//   EDAMAM_API_BASE: "https://api.edamam.com/api",
//   GEMINI_API_KEY: "AIzaSyDGln-EALpL8JCAhPb3mi42Lh85PXYBI2o",
//   GEMINI_BASE_URL:
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // Food category colors for attractive UI
// const CATEGORY_COLORS = {
//   Appetizers: "from-amber-500 to-orange-600",
//   Mains: "from-red-600 to-rose-700",
//   Seafood: "from-cyan-600 to-blue-700",
//   Pizza: "from-orange-500 to-red-600",
//   Salads: "from-emerald-500 to-green-600",
//   Desserts: "from-pink-500 to-rose-600",
//   Beverages: "from-indigo-500 to-purple-600",
//   default: "from-orange-500 to-red-500",
// };

// // Food category background patterns
// const CATEGORY_BG = {
//   Appetizers: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
//   Mains: "bg-gradient-to-br from-red-50 via-rose-50 to-orange-50",
//   Seafood: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
//   Pizza: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
//   Salads: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
//   Desserts: "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50",
//   Beverages: "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50",
//   default: "bg-gradient-to-br from-orange-50 via-red-50 to-amber-50",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/orders",
//   TRACK_ORDER: "/orders",
//   FOODS: "/foods",
// };

// // ========== COMPREHENSIVE ALLERGEN AND INGREDIENT DATABASE ==========
// const ALLERGEN_DATABASE = {
//   // Peanut Allergy
//   peanut: {
//     name: "Peanut Allergy",
//     severity: "critical",
//     keywords: [
//       "peanut",
//       "peanuts",
//       "groundnut",
//       "arachis",
//       "peanut butter",
//       "peanut oil",
//       "peanut flour",
//       "peanut protein",
//       "beer nuts",
//       "monkey nuts",
//       "goober",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS PEANUTS - Risk of anaphylaxis and severe allergic reaction. Even trace amounts can be dangerous.",
//   },
//   // Tree Nut Allergy
//   treeNut: {
//     name: "Tree Nut Allergy",
//     severity: "critical",
//     keywords: [
//       "almond",
//       "walnut",
//       "cashew",
//       "pecan",
//       "hazelnut",
//       "pistachio",
//       "macadamia",
//       "chestnut",
//       "brazil nut",
//       "pine nut",
//       "pignoli",
//       "filbert",
//       "nut",
//       "nuts",
//       "nut butter",
//       "nut oil",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS TREE NUTS - Risk of anaphylaxis and severe allergic reaction.",
//   },
//   // Shellfish Allergy
//   shellfish: {
//     name: "Shellfish Allergy",
//     severity: "critical",
//     keywords: [
//       "shrimp",
//       "prawn",
//       "crab",
//       "lobster",
//       "crayfish",
//       "crawfish",
//       "clam",
//       "oyster",
//       "mussel",
//       "scallop",
//       "squid",
//       "calamari",
//       "octopus",
//       "abalone",
//       "escargot",
//       "shellfish",
//       "crustacean",
//     ],
//     message: "⚠️⚠️ CONTAINS SHELLFISH - Risk of life-threatening anaphylaxis.",
//   },
//   // Egg Allergy
//   egg: {
//     name: "Egg Allergy",
//     severity: "high",
//     keywords: [
//       "egg",
//       "eggs",
//       "egg white",
//       "egg yolk",
//       "albumin",
//       "mayonnaise",
//       "meringue",
//       "pavlova",
//       "custard",
//       "quiche",
//       "frittata",
//       "omelet",
//       "egg wash",
//     ],
//     message:
//       "⚠️ CONTAINS EGG - May cause hives, digestive issues, or respiratory distress.",
//   },
//   // Soy Allergy
//   soy: {
//     name: "Soy Allergy",
//     severity: "high",
//     keywords: [
//       "soy",
//       "soya",
//       "soybean",
//       "tofu",
//       "tempeh",
//       "soy sauce",
//       "tamari",
//       "shoyu",
//       "miso",
//       "soy milk",
//       "edamame",
//       "textured vegetable protein",
//       "tvp",
//       "soy protein",
//       "soy lecithin",
//     ],
//     message:
//       "⚠️ CONTAINS SOY - May cause allergic reaction including hives and digestive issues.",
//   },
//   // Wheat/Gluten Allergy
//   wheat: {
//     name: "Wheat/Gluten Allergy",
//     severity: "critical",
//     keywords: [
//       "wheat",
//       "flour",
//       "bread",
//       "pasta",
//       "couscous",
//       "semolina",
//       "bulgur",
//       "spelt",
//       "farro",
//       "seitan",
//       "gluten",
//       "barley",
//       "rye",
//       "malt",
//       "brewer's yeast",
//       "tricale",
//       "durum",
//       "kamut",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS WHEAT/GLUTEN - Risk of anaphylaxis and severe reaction.",
//   },
//   // Milk/Dairy Allergy
//   dairy: {
//     name: "Milk/Dairy Allergy",
//     severity: "critical",
//     keywords: [
//       "milk",
//       "cream",
//       "cheese",
//       "yogurt",
//       "butter",
//       "whey",
//       "casein",
//       "ghee",
//       "ice cream",
//       "custard",
//       "pudding",
//       "sour cream",
//       "cream cheese",
//       "cottage cheese",
//       "ricotta",
//       "mozzarella",
//       "cheddar",
//       "parmesan",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS MILK/DAIRY - Risk of severe allergic reaction including anaphylaxis.",
//   },
//   // Fish Allergy
//   fish: {
//     name: "Fish Allergy",
//     severity: "critical",
//     keywords: [
//       "salmon",
//       "tuna",
//       "cod",
//       "halibut",
//       "bass",
//       "trout",
//       "mackerel",
//       "sardine",
//       "anchovy",
//       "herring",
//       "tilapia",
//       "catfish",
//       "snapper",
//       "grouper",
//       "flounder",
//       "sole",
//       "haddock",
//     ],
//     message: "⚠️⚠️ CONTAINS FISH - Risk of life-threatening anaphylaxis.",
//   },
//   // Sesame Allergy
//   sesame: {
//     name: "Sesame Allergy",
//     severity: "critical",
//     keywords: [
//       "sesame",
//       "tahini",
//       "benne",
//       "sesame oil",
//       "gingelly oil",
//       "sesame seed",
//       "sesame seeds",
//       "sesame paste",
//     ],
//     message: "⚠️⚠️ CONTAINS SESAME - Risk of severe anaphylaxis.",
//   },
//   // Sulfite Sensitivity
//   sulfite: {
//     name: "Sulfite Sensitivity",
//     severity: "high",
//     keywords: [
//       "sulfite",
//       "sulfur dioxide",
//       "potassium metabisulfite",
//       "sodium metabisulfite",
//       "sodium sulfite",
//       "preservative",
//     ],
//     message:
//       "⚠️ CONTAINS SULFITES - May cause hives, breathing difficulty, or anaphylaxis.",
//   },
// };

// // ========== NUTRITIONAL CONCERN DATABASE ==========
// const NUTRITIONAL_CONCERNS = {
//   highSugar: {
//     name: "High Sugar Content",
//     severity: "warning",
//     threshold: 25,
//     unit: "g",
//     message:
//       "⚠️ HIGH SUGAR ({value}g) - May cause blood sugar spikes, weight gain, and inflammation.",
//   },
//   veryHighSugar: {
//     name: "Very High Sugar Content",
//     severity: "critical",
//     threshold: 40,
//     unit: "g",
//     message:
//       "⚠️⚠️ VERY HIGH SUGAR ({value}g) - Dangerous for diabetics, promotes obesity and metabolic disease.",
//   },
//   highSodium: {
//     name: "High Sodium Content",
//     severity: "warning",
//     threshold: 800,
//     unit: "mg",
//     message:
//       "⚠️ HIGH SODIUM ({value}mg) - Raises blood pressure, increases heart disease and stroke risk.",
//   },
//   veryHighSodium: {
//     name: "Very High Sodium Content",
//     severity: "critical",
//     threshold: 1200,
//     unit: "mg",
//     message:
//       "⚠️⚠️ VERY HIGH SODIUM ({value}mg) - Dangerous for hypertension and heart failure patients.",
//   },
//   highSaturatedFat: {
//     name: "High Saturated Fat",
//     severity: "warning",
//     threshold: 12,
//     unit: "g",
//     message:
//       "⚠️ HIGH SATURATED FAT ({value}g) - Increases LDL cholesterol and heart disease risk.",
//   },
//   veryHighSaturatedFat: {
//     name: "Very High Saturated Fat",
//     severity: "critical",
//     threshold: 20,
//     unit: "g",
//     message:
//       "⚠️⚠️ VERY HIGH SATURATED FAT ({value}g) - Major risk factor for heart attack and stroke.",
//   },
//   highCholesterol: {
//     name: "High Cholesterol",
//     severity: "warning",
//     threshold: 200,
//     unit: "mg",
//     message:
//       "⚠️ HIGH CHOLESTEROL ({value}mg) - May clog arteries and increase heart disease risk.",
//   },
//   veryHighCholesterol: {
//     name: "Very High Cholesterol",
//     severity: "critical",
//     threshold: 300,
//     unit: "mg",
//     message:
//       "⚠️⚠️ VERY HIGH CHOLESTEROL ({value}mg) - Significant risk for cardiovascular events.",
//   },
//   highCarbs: {
//     name: "High Carbohydrates",
//     severity: "info",
//     threshold: 50,
//     unit: "g",
//     message:
//       "Contains {value}g carbohydrates - Monitor blood glucose if diabetic.",
//   },
//   veryHighCarbs: {
//     name: "Very High Carbohydrates",
//     severity: "warning",
//     threshold: 80,
//     unit: "g",
//     message:
//       "⚠️ VERY HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//   },
//   highCalories: {
//     name: "High Calories",
//     severity: "info",
//     threshold: 600,
//     unit: "kcal",
//     message:
//       "Contains {value} calories - Consider portion control for weight management.",
//   },
//   veryHighCalories: {
//     name: "Very High Calories",
//     severity: "warning",
//     threshold: 900,
//     unit: "kcal",
//     message:
//       "⚠️ HIGH CALORIE ({value}kcal) - May contribute to weight gain and obesity.",
//   },
//   lowFiber: {
//     name: "Low Fiber",
//     severity: "info",
//     threshold: 3,
//     unit: "g",
//     message:
//       "Low fiber content ({value}g) - Consider adding fiber-rich foods for digestive health.",
//   },
//   highPurine: {
//     name: "High Purine Content",
//     severity: "warning",
//     threshold: 150,
//     unit: "mg",
//     message:
//       "⚠️ HIGH PURINES ({value}mg) - May trigger gout flare-ups in susceptible individuals.",
//   },
//   containsCaffeine: {
//     name: "Contains Caffeine",
//     severity: "info",
//     threshold: 50,
//     unit: "mg",
//     message:
//       "Contains {value}mg caffeine - May cause anxiety, insomnia, or heart palpitations in sensitive individuals.",
//   },
//   highCaffeine: {
//     name: "High Caffeine",
//     severity: "warning",
//     threshold: 150,
//     unit: "mg",
//     message:
//       "⚠️ HIGH CAFFEINE ({value}mg) - Can trigger anxiety, panic attacks, and heart arrhythmias.",
//   },
//   containsAlcohol: {
//     name: "Contains Alcohol",
//     severity: "warning",
//     threshold: 1,
//     unit: "",
//     message:
//       "⚠️ CONTAINS ALCOHOL - Interacts with medications, affects liver health, and may trigger various conditions.",
//   },
//   containsMSG: {
//     name: "Contains MSG",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains MSG - May trigger headaches, migraines, or flushing in sensitive individuals.",
//   },
//   containsArtificialColors: {
//     name: "Contains Artificial Colors",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains artificial food dyes - Linked to hyperactivity in children and may trigger migraines.",
//   },
//   containsAspartame: {
//     name: "Contains Aspartame",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains aspartame - May trigger headaches and should be avoided by individuals with PKU.",
//   },
//   highOxalate: {
//     name: "High Oxalate",
//     severity: "warning",
//     threshold: 80,
//     unit: "mg",
//     message:
//       "⚠️ HIGH OXALATE ({value}mg) - May promote kidney stone formation in susceptible individuals.",
//   },
//   highPotassium: {
//     name: "High Potassium",
//     severity: "warning",
//     threshold: 500,
//     unit: "mg",
//     message:
//       "⚠️ HIGH POTASSIUM ({value}mg) - Dangerous for kidney disease patients.",
//   },
//   highPhosphorus: {
//     name: "High Phosphorus",
//     severity: "warning",
//     threshold: 400,
//     unit: "mg",
//     message:
//       "⚠️ HIGH PHOSPHORUS ({value}mg) - May worsen bone and heart problems in kidney disease.",
//   },
//   containsGoitrogens: {
//     name: "Contains Goitrogens",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains goitrogens (cruciferous vegetables, soy) - May interfere with thyroid function when consumed in large amounts.",
//   },
//   containsFODMAPs: {
//     name: "Contains High FODMAPs",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains high FODMAP ingredients - May trigger IBS symptoms including bloating, gas, and abdominal pain.",
//   },
// };

// // ========== CLINICAL CONDITIONS (70+ conditions) with thresholds ==========
// const CLINICAL_CONDITIONS = [
//   // Endocrine & Metabolic
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Insulin resistance and high blood sugar",
//     recommendations: [
//       "Choose low glycemic index foods",
//       "Monitor carbohydrate intake",
//       "Increase fiber consumption",
//       "Avoid sugary beverages",
//       "Eat regular meals",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 25,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 70,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Type 1 Diabetes",
//     icon: "💉",
//     color: "text-red-700",
//     bgColor: "bg-red-100",
//     description: "Autoimmune destruction of insulin-producing cells",
//     recommendations: [
//       "Count carbohydrates accurately",
//       "Adjust insulin dosage accordingly",
//       "Monitor blood glucose frequently",
//       "Keep fast-acting sugar for emergencies",
//     ],
//     thresholds: {
//       sugar: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Requires insulin adjustment.",
//       },
//       sugarHigh: {
//         value: 20,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous ketoacidosis risk.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Gestational Diabetes",
//     icon: "🤰",
//     color: "text-pink-600",
//     bgColor: "bg-pink-50",
//     description: "High blood sugar during pregnancy",
//     recommendations: [
//       "Monitor blood sugar 4x daily",
//       "Eat small frequent meals",
//       "Choose complex carbohydrates",
//       "Consult dietitian for meal plan",
//     ],
//     thresholds: {
//       sugar: {
//         value: 12,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Affects maternal and fetal health.",
//       },
//       sugarHigh: {
//         value: 22,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SUGAR ({value}g) - Risk of macrosomia and complications.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Hypothyroidism",
//     icon: "🦋",
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     description: "Underactive thyroid gland",
//     recommendations: [
//       "Take thyroid medication on empty stomach",
//       "Avoid goitrogenic foods raw",
//       "Ensure adequate iodine intake",
//       "Monitor selenium levels",
//     ],
//     thresholds: {
//       goitrogens: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message:
//           "Contains goitrogens - May interfere with thyroid hormone production.",
//       },
//       soy: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message:
//           "Contains soy isoflavones - May reduce thyroid medication absorption.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Hyperthyroidism",
//     icon: "⚡",
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//     description: "Overactive thyroid gland",
//     recommendations: [
//       "Limit iodine-rich foods",
//       "Avoid caffeine and stimulants",
//       "Eat calcium-rich foods",
//       "Monitor heart rate",
//     ],
//     thresholds: {
//       iodine: {
//         value: 300,
//         unit: "mcg",
//         severity: "warning",
//         message: "⚠️ HIGH IODINE ({value}mcg) - Worsens hyperthyroid symptoms.",
//       },
//       caffeine: {
//         value: 80,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg caffeine - May increase heart rate and anxiety.",
//       },
//     },
//   },
//   {
//     id: 6,
//     name: "PCOS",
//     icon: "🩺",
//     color: "text-fuchsia-600",
//     bgColor: "bg-fuchsia-50",
//     description: "Polycystic Ovary Syndrome",
//     recommendations: [
//       "Low glycemic index diet",
//       "Increase fiber intake",
//       "Choose anti-inflammatory foods",
//       "Consider inositol supplementation",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g sugar - Worsens insulin resistance in PCOS.",
//       },
//       saturatedFat: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g saturated fat - Increases inflammation in PCOS.",
//       },
//     },
//   },
//   // Cardiovascular
//   {
//     id: 7,
//     name: "Hypertension",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     recommendations: [
//       "Reduce sodium intake (<1500mg/day)",
//       "Increase potassium-rich foods",
//       "Follow DASH diet",
//       "Limit alcohol",
//       "Regular exercise",
//     ],
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1000,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension crisis.",
//       },
//     },
//   },
//   {
//     id: 8,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     recommendations: [
//       "Limit saturated and trans fats",
//       "Increase omega-3 fatty acids",
//       "Choose whole grains",
//       "Eat more fruits and vegetables",
//     ],
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g saturated fat - May increase arterial plaque.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 150,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg cholesterol - May clog arteries.",
//       },
//       cholesterolHigh: {
//         value: 250,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk for heart attack.",
//       },
//     },
//   },
//   {
//     id: 9,
//     name: "Heart Failure",
//     icon: "💔",
//     color: "text-red-800",
//     bgColor: "bg-red-100",
//     description: "Congestive heart failure",
//     recommendations: [
//       "Strict sodium restriction (<2000mg/day)",
//       "Monitor fluid intake",
//       "Limit alcohol",
//       "Weigh daily to check fluid retention",
//     ],
//     thresholds: {
//       sodium: {
//         value: 400,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - Causes fluid retention.",
//       },
//       sodiumHigh: {
//         value: 800,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH SODIUM ({value}mg) - May trigger pulmonary edema.",
//       },
//     },
//   },
//   {
//     id: 10,
//     name: "Atrial Fibrillation",
//     icon: "💓",
//     color: "text-purple-700",
//     bgColor: "bg-purple-50",
//     description: "Irregular heart rhythm",
//     recommendations: [
//       "Avoid caffeine and stimulants",
//       "Limit alcohol",
//       "Stay hydrated",
//       "Monitor electrolyte balance",
//     ],
//     thresholds: {
//       caffeine: {
//         value: 120,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH CAFFEINE ({value}mg) - Triggers arrhythmia episodes.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ CONTAINS ALCOHOL - Known AFib trigger.",
//       },
//     },
//   },
//   // Kidney & Liver
//   {
//     id: 11,
//     name: "Kidney Disease",
//     icon: "🩷",
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50",
//     description: "Chronic kidney disease",
//     recommendations: [
//       "Monitor protein intake",
//       "Limit phosphorus",
//       "Control potassium",
//       "Limit sodium",
//       "Monitor fluid intake",
//     ],
//     thresholds: {
//       potassium: {
//         value: 350,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg potassium - Can cause dangerous heart rhythms in CKD.",
//       },
//       potassiumHigh: {
//         value: 500,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH POTASSIUM ({value}mg) - Dangerous for kidney patients.",
//       },
//       phosphorus: {
//         value: 300,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg phosphorus - May worsen bone problems.",
//       },
//       phosphorusHigh: {
//         value: 450,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH PHOSPHORUS ({value}mg) - Dangerous for kidney patients.",
//       },
//     },
//   },
//   {
//     id: 12,
//     name: "Kidney Stones",
//     icon: "🪨",
//     color: "text-stone-600",
//     bgColor: "bg-stone-50",
//     description: "Hard mineral deposits in kidneys",
//     recommendations: [
//       "Drink plenty of water",
//       "Limit oxalate-rich foods",
//       "Reduce sodium",
//       "Limit animal protein",
//       "Get adequate calcium from food",
//     ],
//     thresholds: {
//       oxalate: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg oxalate - May promote calcium oxalate stones.",
//       },
//       oxalateHigh: {
//         value: 100,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH OXALATE ({value}mg) - Significant stone-forming risk.",
//       },
//     },
//   },
//   {
//     id: 13,
//     name: "Fatty Liver",
//     icon: "🧫",
//     color: "text-emerald-700",
//     bgColor: "bg-emerald-50",
//     description: "Fatty liver disease",
//     recommendations: [
//       "Weight loss",
//       "Limit sugar and refined carbs",
//       "Increase physical activity",
//       "Avoid fructose-sweetened beverages",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Contributes to liver fat.",
//       },
//       fructose: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g fructose - Major driver of NAFLD.",
//       },
//     },
//   },
//   {
//     id: 14,
//     name: "Cirrhosis",
//     icon: "🧫",
//     color: "text-green-800",
//     bgColor: "bg-green-100",
//     description: "Advanced liver scarring",
//     recommendations: [
//       "Avoid alcohol completely",
//       "Limit sodium",
//       "Adequate protein unless encephalopathy",
//       "Small frequent meals",
//     ],
//     thresholds: {
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS ALCOHOL - Extremely dangerous for cirrhotic liver.",
//       },
//       sodium: {
//         value: 500,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - Worsens ascites.",
//       },
//     },
//   },
//   // Gastrointestinal
//   {
//     id: 15,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-emerald-700",
//     bgColor: "bg-emerald-50",
//     description: "Autoimmune reaction to gluten",
//     recommendations: [
//       "Strict lifelong gluten-free diet",
//       "Avoid wheat, barley, rye",
//       "Check labels for hidden gluten",
//       "Choose certified gluten-free products",
//     ],
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers intestinal damage.",
//       },
//       wheat: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS WHEAT - Unsafe for celiac disease.",
//       },
//     },
//   },
//   {
//     id: 16,
//     name: "Lactose Intolerance",
//     icon: "🥛",
//     color: "text-sky-700",
//     bgColor: "bg-sky-50",
//     description: "Inability to digest lactose",
//     recommendations: [
//       "Choose lactose-free dairy",
//       "Use lactase enzyme supplements",
//       "Try plant-based milk alternatives",
//       "Aged cheeses have less lactose",
//     ],
//     thresholds: {
//       lactose: {
//         value: 5,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g lactose - May cause bloating and gas.",
//       },
//       lactoseHigh: {
//         value: 10,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH LACTOSE ({value}g) - Significant digestive distress.",
//       },
//     },
//   },
//   {
//     id: 17,
//     name: "IBS",
//     icon: "😖",
//     color: "text-green-700",
//     bgColor: "bg-green-50",
//     description: "Irritable bowel syndrome",
//     recommendations: [
//       "Low FODMAP diet",
//       "Identify trigger foods",
//       "Regular meal times",
//       "Stress management",
//       "Adequate hydration",
//     ],
//     thresholds: {
//       fodmaps: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains high FODMAPs - May cause bloating and pain.",
//       },
//       caffeine: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message: "Contains caffeine - May worsen diarrhea.",
//       },
//     },
//   },
//   {
//     id: 18,
//     name: "GERD",
//     icon: "🔥",
//     color: "text-red-600",
//     bgColor: "bg-red-100",
//     description: "Acid reflux",
//     recommendations: [
//       "Avoid trigger foods",
//       "Eat small meals",
//       "Don't lie down after eating",
//       "Elevate head of bed",
//       "Maintain healthy weight",
//     ],
//     thresholds: {
//       fat: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g fat - Relaxes LES, worsens reflux.",
//       },
//       spicy: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains spices - Irritates esophagus.",
//       },
//       caffeine: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message: "Contains caffeine - Increases acid production.",
//       },
//       chocolate: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains chocolate - Triggers reflux.",
//       },
//     },
//   },
//   // Gout
//   {
//     id: 19,
//     name: "Gout",
//     icon: "🦶",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Uric acid crystal buildup",
//     recommendations: [
//       "Avoid high-purine foods",
//       "Limit alcohol",
//       "Stay hydrated",
//       "Avoid fructose",
//       "Choose low-fat dairy",
//     ],
//     thresholds: {
//       purines: {
//         value: 100,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg purines - May raise uric acid.",
//       },
//       purinesHigh: {
//         value: 150,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH PURINES ({value}mg) - Triggers gout flare-ups.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Major gout trigger.",
//       },
//     },
//   },
//   // Neurological
//   {
//     id: 20,
//     name: "Migraine",
//     icon: "🤕",
//     color: "text-gray-700",
//     bgColor: "bg-gray-100",
//     description: "Recurrent headaches",
//     recommendations: [
//       "Identify trigger foods",
//       "Regular meal schedule",
//       "Stay hydrated",
//       "Limit caffeine",
//       "Keep headache diary",
//     ],
//     thresholds: {
//       tyramine: {
//         value: 10,
//         unit: "mg",
//         severity: "info",
//         message: "Contains tyramine - Common migraine trigger.",
//       },
//       caffeine: {
//         value: 60,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg caffeine - Can trigger migraines.",
//       },
//       msg: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "⚠️ CONTAINS MSG - Known migraine trigger.",
//       },
//       artificialSweeteners: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains artificial sweetener - May trigger migraines.",
//       },
//     },
//   },
//   {
//     id: 21,
//     name: "Epilepsy",
//     icon: "⚡",
//     color: "text-purple-700",
//     bgColor: "bg-purple-100",
//     description: "Seizure disorder",
//     recommendations: [
//       "Avoid aspartame",
//       "Limit alcohol",
//       "Maintain consistent blood sugar",
//       "Stay hydrated",
//     ],
//     thresholds: {
//       aspartame: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains aspartame - May lower seizure threshold.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Lowers seizure threshold.",
//       },
//     },
//   },
//   // Psychiatric
//   {
//     id: 22,
//     name: "Depression",
//     icon: "😔",
//     color: "text-gray-600",
//     bgColor: "bg-gray-100",
//     description: "Major depressive disorder",
//     recommendations: [
//       "Omega-3 fatty acids",
//       "Mediterranean diet",
//       "Avoid alcohol",
//       "Regular meal times",
//       "Vitamin D supplementation",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May cause mood crashes.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Depressant that worsens depression.",
//       },
//     },
//   },
//   {
//     id: 23,
//     name: "Anxiety",
//     icon: "😰",
//     color: "text-yellow-700",
//     bgColor: "bg-yellow-50",
//     description: "Anxiety disorder",
//     recommendations: [
//       "Limit caffeine",
//       "Magnesium-rich foods",
//       "Omega-3 fatty acids",
//       "Avoid alcohol",
//       "Regular meal schedule",
//     ],
//     thresholds: {
//       caffeine: {
//         value: 60,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg caffeine - Increases anxiety.",
//       },
//     },
//   },
//   {
//     id: 24,
//     name: "ADHD",
//     icon: "🎯",
//     color: "text-blue-500",
//     bgColor: "bg-blue-50",
//     description: "Attention deficit disorder",
//     recommendations: [
//       "Protein-rich breakfast",
//       "Omega-3 fatty acids",
//       "Avoid artificial colors",
//       "Limit sugar",
//     ],
//     thresholds: {
//       artificialColors: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains artificial dyes - Linked to ADHD symptoms.",
//       },
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May worsen hyperactivity.",
//       },
//     },
//   },
//   // Respiratory
//   {
//     id: 25,
//     name: "Asthma",
//     icon: "🫁",
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     description: "Chronic airway inflammation",
//     recommendations: [
//       "Avoid sulfite preservatives",
//       "Anti-inflammatory diet",
//       "Omega-3 fatty acids",
//       "Maintain healthy weight",
//     ],
//     thresholds: {
//       sulfites: {
//         value: 10,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ CONTAINS SULFITES - Can cause bronchospasm.",
//       },
//     },
//   },
// ];

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,
//       headers: { "Content-Type": "application/json" },
//     });

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) APIService.instance = new APIService();
//     return APIService.instance;
//   }

//   async fetchFoods() {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.FOODS);
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async getOrderById(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async getGeminiFoodInsights(foodName, ingredients, nutritionInfo) {
//     if (!API_CONFIG.GEMINI_API_KEY) return null;
//     try {
//       const prompt = `As a nutrition expert, provide detailed insights about ${foodName}.
// Ingredients: ${ingredients.join(", ")}.
// Nutrition: Calories ${nutritionInfo?.calories || "N/A"} kcal, Protein ${nutritionInfo?.protein || "N/A"}g, Carbs ${nutritionInfo?.carbs || "N/A"}g, Fat ${nutritionInfo?.fat || "N/A"}g, Fiber ${nutritionInfo?.fiber || "N/A"}g, Sugar ${nutritionInfo?.sugar || "N/A"}g, Sodium ${nutritionInfo?.sodium || "N/A"}mg.

// Return JSON with these exact fields:
// {
//   "summary": "2-3 sentence nutritional summary",
//   "healthScore": number between 0-100,
//   "benefits": ["benefit1", "benefit2", "benefit3"],
//   "risks": ["risk1", "risk2"],
//   "dietaryRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
//   "bestTimeToEat": "time of day recommendation",
//   "pairingSuggestions": ["pairing1", "pairing2"],
//   "funFact": "interesting nutritional fact",
//   "alternativeSuggestions": ["healthier alternative1", "alternative2"]
// }`;

//       const response = await axios.post(
//         `${API_CONFIG.GEMINI_BASE_URL}?key=${API_CONFIG.GEMINI_API_KEY}`,
//         {
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
//         },
//         { headers: { "Content-Type": "application/json" }, timeout: 10000 },
//       );
//       const aiResponse =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (aiResponse) {
//         const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
//         if (jsonMatch) return JSON.parse(jsonMatch[0]);
//       }
//       return null;
//     } catch (error) {
//       console.warn("Gemini API error:", error.message);
//       return null;
//     }
//   }

//   async analyzeWithEdamam(ingredients, title) {
//     if (!API_CONFIG.EDAMAM_APP_ID || !API_CONFIG.EDAMAM_APP_KEY) return null;
//     try {
//       const response = await axios.post(
//         `${API_CONFIG.EDAMAM_API_BASE}/nutrition-details`,
//         { title, ingr: ingredients },
//         {
//           params: {
//             app_id: API_CONFIG.EDAMAM_APP_ID,
//             app_key: API_CONFIG.EDAMAM_APP_KEY,
//           },
//           timeout: 8000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.warn("Edamam API error:", error.message);
//       return null;
//     }
//   }

//   parseEdamamNutrition(edamamData) {
//     const totalNutrients = edamamData.totalNutrients || {};
//     return {
//       calories: Math.round(edamamData.calories || 0),
//       protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
//       carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
//       fat: Math.round(totalNutrients.FAT?.quantity || 0),
//       saturatedFat: Math.round(totalNutrients.FASAT?.quantity || 0),
//       fiber: Math.round(totalNutrients.FIBTG?.quantity || 0),
//       sugar: Math.round(totalNutrients.SUGAR?.quantity || 0),
//       sodium: Math.round(totalNutrients.NA?.quantity || 0),
//       cholesterol: Math.round(totalNutrients.CHOLE?.quantity || 0),
//       potassium: Math.round(totalNutrients.K?.quantity || 0),
//       vitaminC: Math.round(totalNutrients.VITC?.quantity || 0),
//       calcium: Math.round(totalNutrients.CA?.quantity || 0),
//       iron: Math.round(totalNutrients.FE?.quantity || 0),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const nutritionDB = {
//       chicken: { calories: 165, protein: 31, fat: 3.6 },
//       beef: { calories: 250, protein: 26, fat: 17, saturatedFat: 7 },
//       salmon: { calories: 208, protein: 20, fat: 13 },
//       shrimp: { calories: 84, protein: 18, cholesterol: 166, sodium: 111 },
//       cheese: {
//         calories: 402,
//         protein: 25,
//         fat: 33,
//         saturatedFat: 21,
//         sodium: 621,
//       },
//       milk: { calories: 42, protein: 3.4, fat: 1, lactose: 4.8 },
//       cream: { calories: 345, fat: 37, saturatedFat: 23 },
//       butter: { calories: 717, fat: 81, saturatedFat: 51 },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       pasta: { calories: 158, carbs: 31, protein: 5.8 },
//       bread: { calories: 265, carbs: 49, sodium: 400 },
//       potato: { calories: 77, carbs: 17, fiber: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6 },
//       onion: { calories: 40, carbs: 9, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33 },
//       lettuce: { calories: 15, fiber: 1.3 },
//       cucumber: { calories: 15, water: 95 },
//       olive: { calories: 115, fat: 11 },
//     };

//     let estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//       potassium: 0,
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(nutritionDB)) {
//         if (ingLower.includes(key)) {
//           Object.keys(values).forEach((k) => {
//             if (k in estimated)
//               estimated[k] = (estimated[k] || 0) + (values[k] || 0);
//           });
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       const maxVal =
//         key === "calories"
//           ? 1200
//           : key === "sodium"
//             ? 1500
//             : key === "sugar"
//               ? 40
//               : key === "saturatedFat"
//                 ? 25
//                 : key === "cholesterol"
//                   ? 200
//                   : 100;
//       estimated[key] = Math.min(
//         maxVal,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });
//     return estimated;
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null,
//       nutritionSource = null,
//       geminiInsights = null;
//     try {
//       const edamamResult = await this.analyzeWithEdamam(
//         item.ingredients,
//         item.name,
//       );
//       if (edamamResult?.calories) {
//         nutritionalInfo = this.parseEdamamNutrition(edamamResult);
//         nutritionSource = "Edamam Nutrition API";
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }
//     try {
//       geminiInsights = await this.getGeminiFoodInsights(
//         item.name,
//         item.ingredients,
//         nutritionalInfo,
//       );
//     } catch (error) {
//       console.log("Gemini insights error:", error);
//     }
//     return { nutritionalInfo, nutritionSource, geminiInsights };
//   }

//   handleError(error) {
//     if (error.response)
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error",
//       };
//     if (error.request)
//       return { status: 0, message: "Network error - Unable to connect" };
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//     };
//   }
// }

// // ========== COMPREHENSIVE FOOD ANALYSIS FUNCTION ==========
// const analyzeFoodFully = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const ingredients = item.ingredients || [];
//   const analysis = {
//     allergens: [],
//     nutritionalConcerns: [],
//     clinicalConditions: [],
//     totalIssues: 0,
//     severityLevel: "safe", // safe, info, warning, critical
//   };

//   // Helper to check ingredients
//   const containsIngredient = (keywords) => {
//     const keywordList = Array.isArray(keywords) ? keywords : [keywords];
//     return ingredients.some((ing) =>
//       keywordList.some((kw) => ing.toLowerCase().includes(kw.toLowerCase())),
//     );
//   };

//   // ========== 1. CHECK FOR ALLERGENS ==========
//   for (const [allergenKey, allergenInfo] of Object.entries(ALLERGEN_DATABASE)) {
//     if (containsIngredient(allergenInfo.keywords)) {
//       analysis.allergens.push({
//         name: allergenInfo.name,
//         severity: allergenInfo.severity,
//         message: allergenInfo.message,
//       });
//       if (allergenInfo.severity === "critical")
//         analysis.severityLevel = "critical";
//       else if (
//         allergenInfo.severity === "high" &&
//         analysis.severityLevel !== "critical"
//       )
//         analysis.severityLevel = "warning";
//     }
//   }

//   // ========== 2. CHECK FOR NUTRITIONAL CONCERNS ==========
//   // Sugar concerns
//   if (nutrition.sugar) {
//     if (nutrition.sugar >= 40) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSugar,
//         value: nutrition.sugar,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.sugar >= 25) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSugar,
//         value: nutrition.sugar,
//       });
//       if (
//         analysis.severityLevel !== "critical" &&
//         analysis.severityLevel !== "warning"
//       )
//         analysis.severityLevel = "warning";
//     }
//   }

//   // Sodium concerns
//   if (nutrition.sodium) {
//     if (nutrition.sodium >= 1200) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSodium,
//         value: nutrition.sodium,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.sodium >= 800) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSodium,
//         value: nutrition.sodium,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   // Saturated fat concerns
//   if (nutrition.saturatedFat) {
//     if (nutrition.saturatedFat >= 20) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSaturatedFat,
//         value: nutrition.saturatedFat,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.saturatedFat >= 12) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSaturatedFat,
//         value: nutrition.saturatedFat,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   // Cholesterol concerns
//   if (nutrition.cholesterol) {
//     if (nutrition.cholesterol >= 300) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCholesterol,
//         value: nutrition.cholesterol,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     } else if (nutrition.cholesterol >= 200) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCholesterol,
//         value: nutrition.cholesterol,
//       });
//     }
//   }

//   // Carbs concerns
//   if (nutrition.carbs) {
//     if (nutrition.carbs >= 80) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCarbs,
//         value: nutrition.carbs,
//       });
//     } else if (nutrition.carbs >= 50) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCarbs,
//         value: nutrition.carbs,
//       });
//     }
//   }

//   // Calorie concerns
//   if (nutrition.calories) {
//     if (nutrition.calories >= 900) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCalories,
//         value: nutrition.calories,
//       });
//     } else if (nutrition.calories >= 600) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCalories,
//         value: nutrition.calories,
//       });
//     }
//   }

//   // Fiber concerns (low fiber)
//   if (
//     nutrition.fiber !== undefined &&
//     nutrition.fiber < 3 &&
//     nutrition.fiber > 0
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.lowFiber,
//       value: nutrition.fiber,
//     });
//   }

//   // Check for specific ingredients that cause concerns
//   if (containsIngredient(["alcohol", "beer", "wine", "liquor", "spirit"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAlcohol);
//   }

//   if (containsIngredient(["caffeine", "coffee", "tea", "energy drink"])) {
//     const caffeineAmount = containsIngredient(["energy drink"]) ? 150 : 80;
//     if (caffeineAmount >= 150) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCaffeine,
//         value: caffeineAmount,
//       });
//     } else {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.containsCaffeine,
//         value: caffeineAmount,
//       });
//     }
//   }

//   if (containsIngredient(["msg", "monosodium glutamate"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsMSG);
//   }

//   if (
//     containsIngredient(["red 40", "yellow 5", "blue 1", "artificial color"])
//   ) {
//     analysis.nutritionalConcerns.push(
//       NUTRITIONAL_CONCERNS.containsArtificialColors,
//     );
//   }

//   if (containsIngredient(["aspartame"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAspartame);
//   }

//   if (
//     containsIngredient([
//       "spinach",
//       "rhubarb",
//       "beets",
//       "nuts",
//       "chocolate",
//       "tea",
//     ])
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highOxalate,
//       value: 85,
//     });
//   }

//   if (containsIngredient(["banana", "potato", "avocado", "spinach"])) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highPotassium,
//       value: 550,
//     });
//   }

//   if (
//     containsIngredient(["broccoli", "cabbage", "kale", "cauliflower", "soy"])
//   ) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsGoitrogens);
//   }

//   if (
//     containsIngredient([
//       "onion",
//       "garlic",
//       "wheat",
//       "beans",
//       "lentils",
//       "cashew",
//     ])
//   ) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsFODMAPs);
//   }

//   if (
//     containsIngredient(["anchovy", "sardine", "liver", "kidney", "mackerel"])
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highPurine,
//       value: 180,
//     });
//   }

//   // ========== 3. CHECK FOR CLINICAL CONDITIONS ==========
//   for (const condition of CLINICAL_CONDITIONS) {
//     let matched = false;
//     let message = null;
//     let severity = "info";

//     // Check thresholds based on condition
//     if (condition.thresholds) {
//       // Check sugar thresholds
//       if (
//         condition.thresholds.sugarHigh &&
//         nutrition.sugar >= condition.thresholds.sugarHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.sugar &&
//         nutrition.sugar >= condition.thresholds.sugar.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       }
//       // Check sodium thresholds
//       else if (
//         condition.thresholds.sodiumHigh &&
//         nutrition.sodium >= condition.thresholds.sodiumHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.sodium &&
//         nutrition.sodium >= condition.thresholds.sodium.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//       // Check saturated fat thresholds
//       else if (
//         condition.thresholds.saturatedFatHigh &&
//         nutrition.saturatedFat >= condition.thresholds.saturatedFatHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.saturatedFat &&
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat.value
//       ) {
//         matched = true;
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       // Check cholesterol thresholds
//       else if (
//         condition.thresholds.cholesterolHigh &&
//         nutrition.cholesterol >= condition.thresholds.cholesterolHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.cholesterol &&
//         nutrition.cholesterol >= condition.thresholds.cholesterol.value
//       ) {
//         matched = true;
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//       // Check carbs thresholds
//       else if (
//         condition.thresholds.carbsHigh &&
//         nutrition.carbs >= condition.thresholds.carbsHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.carbs &&
//         nutrition.carbs >= condition.thresholds.carbs.value
//       ) {
//         matched = true;
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//       // Check caffeine thresholds
//       else if (
//         condition.thresholds.caffeine &&
//         nutrition.caffeine >= condition.thresholds.caffeine.value
//       ) {
//         matched = true;
//         message = condition.thresholds.caffeine.message.replace(
//           "{value}",
//           nutrition.caffeine,
//         );
//       }
//       // Check alcohol
//       else if (
//         condition.thresholds.alcohol &&
//         containsIngredient(["alcohol", "beer", "wine", "liquor"])
//       ) {
//         matched = true;
//         message = condition.thresholds.alcohol.message;
//       }
//       // Check goitrogens
//       else if (
//         condition.thresholds.goitrogens &&
//         containsIngredient([
//           "broccoli",
//           "cabbage",
//           "kale",
//           "cauliflower",
//           "soy",
//         ])
//       ) {
//         matched = true;
//         message = condition.thresholds.goitrogens.message;
//       }
//       // Check MSG
//       else if (
//         condition.thresholds.msg &&
//         containsIngredient(["msg", "monosodium glutamate"])
//       ) {
//         matched = true;
//         message = condition.thresholds.msg.message;
//       }
//       // Check artificial sweeteners
//       else if (
//         condition.thresholds.artificialSweeteners &&
//         containsIngredient(["aspartame", "sucralose", "saccharin"])
//       ) {
//         matched = true;
//         message = condition.thresholds.artificialSweeteners.message;
//       }
//     }

//     if (matched && message) {
//       analysis.clinicalConditions.push({
//         conditionId: condition.id,
//         name: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         severity: severity,
//         message: message,
//         recommendations: condition.recommendations,
//       });
//       if (severity === "warning" && analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   analysis.totalIssues =
//     analysis.allergens.length +
//     analysis.nutritionalConcerns.length +
//     analysis.clinicalConditions.length;

//   return analysis;
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     {
//       label: "Calories",
//       value: nutrition.calories,
//       unit: "kcal",
//       icon: "🔥",
//       color: "text-orange-600",
//     },
//     {
//       label: "Protein",
//       value: nutrition.protein,
//       unit: "g",
//       icon: "💪",
//       color: "text-blue-600",
//     },
//     {
//       label: "Carbs",
//       value: nutrition.carbs,
//       unit: "g",
//       icon: "🍚",
//       color: "text-yellow-600",
//     },
//     {
//       label: "Fiber",
//       value: nutrition.fiber,
//       unit: "g",
//       icon: "🌿",
//       color: "text-green-600",
//     },
//     {
//       label: "Fat",
//       value: nutrition.fat,
//       unit: "g",
//       icon: "🥑",
//       color: "text-purple-600",
//     },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//       color: "text-red-600",
//     },
//     {
//       label: "Sugar",
//       value: nutrition.sugar,
//       unit: "g",
//       icon: "🍬",
//       color: "text-pink-600",
//     },
//     {
//       label: "Sodium",
//       value: nutrition.sodium,
//       unit: "mg",
//       icon: "🧂",
//       color: "text-gray-600",
//     },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//       color: "text-red-500",
//     },
//     {
//       label: "Potassium",
//       value: nutrition.potassium,
//       unit: "mg",
//       icon: "🍌",
//       color: "text-purple-500",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null && n.value > 0);
// };

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [currentApi, setCurrentApi] = useState("edamam");

//   const loadingSteps = [
//     {
//       message: "Connecting to Edamam Nutrition API...",
//       icon: "🔬",
//       api: "edamam",
//     },
//     { message: "Analyzing recipe ingredients...", icon: "🥗", api: "edamam" },
//     {
//       message: "Calculating nutritional values...",
//       icon: "📊",
//       api: "analysis",
//     },
//     { message: "Scanning for allergens...", icon: "⚠️", api: "allergens" },
//     {
//       message: "Checking nutritional concerns...",
//       icon: "🔍",
//       api: "concerns",
//     },
//     {
//       message: "Analyzing clinical conditions...",
//       icon: "🩺",
//       api: "clinical",
//     },
//     { message: "Generating AI insights...", icon: "🤖", api: "gemini" },
//     {
//       message: "Preparing recommendations...",
//       icon: "💚",
//       api: "recommendations",
//     },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       return;
//     }
//     const interval = setInterval(
//       () => setProgress((p) => (p >= 100 ? 100 : p + 1.5)),
//       40,
//     );
//     const stepInterval = setInterval(
//       () =>
//         setLoadingStep((prev) => {
//           const newStep = prev < loadingSteps.length - 1 ? prev + 1 : prev;
//           if (loadingSteps[newStep]?.api)
//             setCurrentApi(loadingSteps[newStep].api);
//           return newStep;
//         }),
//       600,
//     );
//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div
//           className={`bg-gradient-to-r ${CATEGORY_COLORS[itemCategory] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative overflow-hidden`}
//         >
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute -top-10 -right-10 text-8xl animate-spin-slow">
//               🍽️
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3 relative z-10">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="bg-white/20 p-1.5 sm:p-2 rounded-full"
//             >
//               {currentApi === "gemini" ? (
//                 <AIIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "edamam" ? (
//                 <ScienceIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "allergens" ? (
//                 <DangerousIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "clinical" ? (
//                 <LocalHospitalIcon className="text-xl sm:text-2xl" />
//               ) : (
//                 <RestaurantIcon className="text-xl sm:text-2xl" />
//               )}
//             </motion.div>
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-base sm:text-xl truncate">
//                 Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//               </h2>
//               <p className="text-white/80 text-xs sm:text-sm truncate">
//                 {itemName}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//           <div>
//             <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
//               <span>Comprehensive health analysis in progress...</span>
//               <span className="font-mono font-bold text-orange-600">
//                 {progress}%
//               </span>
//             </div>
//             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//                 initial={{ width: "0%" }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.1 }}
//               />
//             </div>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-2 sm:gap-3"
//               >
//                 <div
//                   className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${loadingStep > idx ? "bg-green-500 text-white" : loadingStep === idx ? "bg-orange-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"}`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </div>
//                 <span
//                   className={`text-xs sm:text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"} flex-1`}
//                 >
//                   {step.message}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//           <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-2 sm:p-3 border border-orange-100">
//             <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
//               <span className="text-orange-500">🔌</span> Analysis Status:
//             </p>
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "edamam" ? "bg-green-500 animate-pulse" : loadingStep > 0 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Nutrition</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "allergens" ? "bg-red-500 animate-pulse" : loadingStep > 3 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Allergens</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "clinical" ? "bg-yellow-500 animate-pulse" : loadingStep > 5 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Conditions</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "gemini" ? "bg-purple-500 animate-pulse" : loadingStep > 6 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">AI Insights</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-center text-[9px] sm:text-xs text-gray-400">
//             ✨ Analyzing allergens, nutritional concerns, and 25+ health
//             conditions
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== RESULT MODAL ==========
// const ResultModal = ({
//   isOpen,
//   onClose,
//   type,
//   title,
//   message,
//   onTrackOrder,
// }) => {
//   if (!isOpen) return null;
//   const hasOrderId = message && message.includes("Order ID:");
//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
//       >
//         <div
//           className={`p-5 text-center ${type === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}
//         >
//           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
//             {type === "success" ? (
//               <CheckCircleIcon className="text-white text-4xl" />
//             ) : (
//               <ErrorIcon className="text-white text-4xl" />
//             )}
//           </div>
//           <h2 className="text-white font-bold text-xl">{title}</h2>
//         </div>
//         <div className="p-6">
//           {hasOrderId ? (
//             <div className="space-y-4">
//               {message.split("\n").map((line, idx) => {
//                 if (line.includes("Order ID:")) {
//                   const orderId = line.split("Order ID:")[1]?.trim();
//                   return (
//                     <div
//                       key={idx}
//                       className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200"
//                     >
//                       <div className="flex items-center gap-2 mb-2">
//                         <ConfirmationNumberIcon className="text-orange-600 text-sm" />
//                         <span className="text-xs text-orange-600 font-semibold uppercase tracking-wide">
//                           Order ID
//                         </span>
//                       </div>
//                       <p className="text-gray-800 font-mono font-bold text-xl tracking-wider text-center">
//                         {orderId}
//                       </p>
//                       <p className="text-xs text-gray-500 text-center mt-2">
//                         ⭐ Save this ID to track your order
//                       </p>
//                     </div>
//                   );
//                 } else if (line.includes("Thank you")) {
//                   return (
//                     <div key={idx} className="text-center">
//                       <p className="text-gray-800 font-bold text-lg">{line}</p>
//                     </div>
//                   );
//                 } else if (line.includes("📍 Table:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2"
//                     >
//                       <TableIcon className="text-sm text-orange-500" />
//                       <span className="text-sm font-medium">
//                         {line.replace("📍 ", "")}
//                       </span>
//                     </div>
//                   );
//                 } else if (line.includes("💰 Total:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="bg-gray-100 rounded-xl p-3 text-center"
//                     >
//                       <p className="text-gray-500 text-xs">Total Amount</p>
//                       <p className="text-orange-600 font-bold text-2xl">
//                         {line.split("💰")[1]?.trim() || line}
//                       </p>
//                     </div>
//                   );
//                 } else if (line.includes("⏱️ Est. time:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-center gap-2 text-gray-600 bg-blue-50 rounded-xl p-2"
//                     >
//                       <TimerIcon className="text-blue-500 text-sm" />
//                       <span className="text-sm font-medium">
//                         {line.replace("⏱️ ", "")}
//                       </span>
//                     </div>
//                   );
//                 } else if (line.trim() && !line.includes("🆔")) {
//                   return (
//                     <p key={idx} className="text-gray-600 text-center text-sm">
//                       {line}
//                     </p>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           ) : (
//             <p className="text-gray-600 text-center whitespace-pre-line">
//               {message}
//             </p>
//           )}
//           <div className="mt-6 space-y-2">
//             {hasOrderId && onTrackOrder && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onTrackOrder();
//                 }}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
//               >
//                 <SearchIcon fontSize="small" />
//                 Track My Order Now
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className={`w-full ${hasOrderId ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"} py-3 rounded-xl font-semibold transition`}
//             >
//               {hasOrderId ? "Continue Browsing" : "OK"}
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== COMPREHENSIVE ANALYSIS RESULT MODAL ==========
// const AnalysisResultModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [expandedItem, setExpandedItem] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const healthScore =
//     item?.geminiInsights?.healthScore ||
//     Math.max(0, 100 - analysis.totalIssues * 5);

//   const severityColors = {
//     critical: "bg-red-600",
//     warning: "bg-orange-500",
//     info: "bg-blue-500",
//   };

//   const severityBadge = (severity) => {
//     const badges = {
//       critical: "bg-red-600 text-white",
//       warning: "bg-orange-500 text-white",
//       high: "bg-red-500 text-white",
//       moderate: "bg-yellow-500 text-white",
//       info: "bg-blue-500 text-white",
//       mild: "bg-green-500 text-white",
//     };
//     return badges[severity] || "bg-gray-500 text-white";
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         {/* Header with health score and severity indicator */}
//         <div
//           className={`bg-gradient-to-r ${CATEGORY_COLORS[item?.category] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative flex-shrink-0`}
//         >
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute -top-10 -right-10 text-8xl">🍽️</div>
//           </div>
//           <div className="flex items-center justify-between relative z-10">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h2 className="font-bold text-lg sm:text-xl truncate">
//                   {item?.name}
//                 </h2>
//                 <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
//                   <StarIcon className="text-yellow-300 text-sm" />
//                   <span>Health Score: {healthScore}/100</span>
//                 </div>
//                 {analysis.severityLevel !== "safe" && (
//                   <div
//                     className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${severityColors[analysis.severityLevel]} bg-opacity-80`}
//                   >
//                     <WarningIcon className="text-white text-sm" />
//                     <span>{analysis.severityLevel.toUpperCase()}</span>
//                   </div>
//                 )}
//               </div>
//               <p className="text-white/80 text-xs sm:text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
//           {/* AI Summary Section */}
//           {item?.geminiInsights?.summary && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <AIIcon className="text-purple-600 text-sm" />
//                 <h3 className="font-semibold text-purple-800 text-sm">
//                   AI Nutritional Summary
//                 </h3>
//               </div>
//               <p className="text-gray-700 text-xs sm:text-sm">
//                 {item.geminiInsights.summary}
//               </p>
//             </motion.div>
//           )}

//           {/* Health Benefits */}
//           {item?.geminiInsights?.benefits?.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border border-green-200"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <FavoriteIcon className="text-green-600 text-sm" />
//                 <h3 className="font-semibold text-green-800 text-sm">
//                   Health Benefits
//                 </h3>
//               </div>
//               <ul className="space-y-1">
//                 {item.geminiInsights.benefits
//                   .slice(0, 3)
//                   .map((benefit, idx) => (
//                     <li
//                       key={idx}
//                       className="text-gray-700 text-xs sm:text-sm flex items-start gap-2"
//                     >
//                       <CheckIcon className="text-green-500 text-sm mt-0.5" />
//                       <span>{benefit}</span>
//                     </li>
//                   ))}
//               </ul>
//             </motion.div>
//           )}

//           {/* ALLERGENS SECTION - CRITICAL */}
//           {analysis.allergens.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 sm:p-4 border-2 border-red-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <DangerousIcon className="text-red-600 text-sm" />
//                 <h3 className="font-semibold text-red-800 text-sm">
//                   ⚠️ Allergen Alert
//                 </h3>
//               </div>
//               <div className="space-y-2">
//                 {analysis.allergens.map((allergen, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-lg p-2 border border-red-200"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="font-bold text-red-700 text-sm">
//                         {allergen.name}
//                       </span>
//                       <span
//                         className={`text-[10px] px-2 py-0.5 rounded-full ${allergen.severity === "critical" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
//                       >
//                         {allergen.severity.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-700 mt-1">
//                       {allergen.message}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* NUTRITIONAL CONCERNS SECTION */}
//           {analysis.nutritionalConcerns.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 sm:p-4 border border-yellow-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <WarningIcon className="text-yellow-600 text-sm" />
//                 <h3 className="font-semibold text-yellow-800 text-sm">
//                   Nutritional Considerations
//                 </h3>
//               </div>
//               <div className="space-y-1.5">
//                 {analysis.nutritionalConcerns
//                   .slice(0, 5)
//                   .map((concern, idx) => (
//                     <div key={idx} className="flex items-start gap-2 text-xs">
//                       <WarningAmberIcon className="text-yellow-600 text-sm mt-0.5" />
//                       <span className="text-gray-700">
//                         {concern.message.replace("{value}", concern.value)}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}

//           {/* CLINICAL CONDITIONS SECTION */}
//           {analysis.clinicalConditions.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <LocalHospitalIcon className="text-blue-600 text-sm" />
//                 <h3 className="font-semibold text-blue-800 text-sm">
//                   Health Condition Alerts
//                 </h3>
//               </div>
//               <div className="space-y-2">
//                 {analysis.clinicalConditions
//                   .slice(0, 5)
//                   .map((condition, idx) => (
//                     <div
//                       key={idx}
//                       className={`${condition.bgColor} rounded-lg p-2`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{condition.icon}</span>
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between flex-wrap gap-1">
//                             <span className="font-medium text-gray-800 text-sm">
//                               {condition.name}
//                             </span>
//                             <span
//                               className={`text-[8px] px-1.5 py-0.5 rounded-full ${severityBadge(condition.severity)}`}
//                             >
//                               {condition.severity?.toUpperCase() || "INFO"}
//                             </span>
//                           </div>
//                           <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
//                             {condition.message}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Ingredients Section */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Ingredients
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   ({item?.ingredients?.length || 0} items)
//                 </span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 className="mt-2 p-3 bg-gray-50 rounded-xl"
//               >
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                   {item?.ingredients?.map((ing, idx) => {
//                     // Check if ingredient contains any allergen
//                     let hasAllergen = false;
//                     let allergenName = "";
//                     for (const [key, allergen] of Object.entries(
//                       ALLERGEN_DATABASE,
//                     )) {
//                       if (
//                         allergen.keywords.some((kw) =>
//                           ing.toLowerCase().includes(kw.toLowerCase()),
//                         )
//                       ) {
//                         hasAllergen = true;
//                         allergenName = allergen.name;
//                         break;
//                       }
//                     }
//                     return (
//                       <span
//                         key={idx}
//                         className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm border ${hasAllergen ? "bg-red-100 border-red-300 text-red-700 font-medium" : "bg-white border-orange-100"}`}
//                       >
//                         {ing} {hasAllergen && "⚠️"}
//                       </span>
//                     );
//                   })}
//                 </div>
//                 {analysis.allergens.length > 0 && (
//                   <div className="mt-3 pt-2 border-t border-red-200">
//                     <p className="text-[10px] text-red-600 flex items-center gap-1">
//                       <DangerousIcon className="text-[12px]" /> Ingredients
//                       marked with ⚠️ contain common allergens
//                     </p>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </div>

//           {/* Nutrition Facts */}
//           {nutritionInfo.length > 0 && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "nutrition" ? null : "nutrition",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Nutrition Facts
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   className="mt-2 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl"
//                 >
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className={`text-[11px] sm:text-sm ${n.color}`}>
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 pt-2 border-t border-emerald-200 text-center">
//                     <p className="text-[10px] text-gray-500">
//                       💡 Individual needs may vary. Consult a healthcare
//                       provider for personalized advice.
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           {/* Summary Stats */}
//           <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
//             <div className="grid grid-cols-3 gap-2 text-center">
//               <div>
//                 <div className="text-2xl font-bold text-red-600">
//                   {analysis.allergens.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Allergens</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-yellow-600">
//                   {analysis.nutritionalConcerns.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Concerns</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-blue-600">
//                   {analysis.clinicalConditions.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Conditions</div>
//               </div>
//             </div>
//           </div>

//           {/* Fun Fact */}
//           {item?.geminiInsights?.funFact && (
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
//               <div className="flex items-center gap-2">
//                 <LightbulbIcon className="text-indigo-600 text-sm" />
//                 <h3 className="font-semibold text-indigo-800 text-sm">
//                   Did You Know?
//                 </h3>
//               </div>
//               <p className="text-gray-700 text-xs mt-1">
//                 {item.geminiInsights.funFact}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-300 transition"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== TABLE SELECTOR MODAL ==========
// const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
//   const [tableNumber, setTableNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   if (!isOpen) return null;
//   const handleConfirm = async () => {
//     if (!tableNumber || !customerName) {
//       toast.error("Please enter table number and name");
//       return;
//     }
//     setIsLoading(true);
//     await onConfirm(tableNumber, customerName);
//     setIsLoading(false);
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10 overflow-hidden"
//       >
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div className="absolute -top-20 -right-20 text-9xl">🍽️</div>
//           <div className="absolute -bottom-20 -left-20 text-9xl">🍕</div>
//         </div>
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 relative">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-xs mt-1">
//             Comprehensive Health Analysis • Allergens • Nutrition • 25+
//             Conditions
//           </p>
//         </div>
//         <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={isLoading}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
//           >
//             {isLoading ? "Loading..." : "Start Ordering"}
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-8">
//               <CartIcon className="text-gray-300 text-4xl mx-auto mb-2" />
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div
//                 key={item.cartId}
//                 className="mb-3 pb-3 border-b border-orange-100"
//               >
//                 <div className="flex justify-between gap-2">
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-sm truncate">
//                       {item.name}
//                     </h3>
//                     {item.customizations?.length > 0 && (
//                       <div className="text-[10px] text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-[10px] text-orange-600">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold text-sm">
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
//                   <span className="w-8 text-center text-sm">
//                     {item.quantity}
//                   </span>
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
//           <div className="p-3 sm:p-4 border-t flex-shrink-0">
//             <div className="flex justify-between font-bold mb-3">
//               <span>Total</span>
//               <span className="text-orange-600">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({
//   isOpen,
//   onClose,
//   onCheckOrder,
//   liveStatus,
//   initialOrderId = "",
// }) => {
//   const [orderId, setOrderId] = useState(initialOrderId);
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const handleCheckOrder = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setOrderDetails(null);
//     try {
//       const result = await onCheckOrder(orderId);
//       if (result && result.success === true && result.data) {
//         const orderData = result.data;
//         const transformedOrder = {
//           orderId: orderData.orderId || "N/A",
//           customerName: orderData.personDetails?.name || "N/A",
//           tableNumber: orderData.personDetails?.tableNumber || "N/A",
//           status: orderData.status || "unknown",
//           items: (orderData.items || []).map((item) => ({
//             name: item.name,
//             quantity: item.quantity,
//             finalPrice: item.finalPrice,
//           })),
//           total: (orderData.items || []).reduce(
//             (sum, item) => sum + (item.finalPrice || 0),
//             0,
//           ),
//         };
//         setOrderDetails(transformedOrder);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else {
//         setError("Order not found. Please check the Order ID.");
//         toast.error("Order not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch order details.");
//       toast.error("Failed to fetch order");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "preparing":
//         return "bg-yellow-100 text-yellow-800";
//       case "ready":
//         return "bg-green-100 text-green-800";
//       case "completed":
//         return "bg-purple-100 text-purple-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };
//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return <CheckCircleIcon className="text-blue-500" />;
//       case "preparing":
//         return <TimerIcon className="text-yellow-500 animate-pulse" />;
//       case "ready":
//         return <CheckCircleIcon className="text-green-500" />;
//       case "completed":
//         return <CheckCircleIcon className="text-purple-500" />;
//       case "cancelled":
//         return <ErrorIcon className="text-red-500" />;
//       default:
//         return <InfoIcon className="text-gray-500" />;
//     }
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl flex flex-col relative z-10 max-h-[90vh]"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <ConfirmationNumberIcon className="text-white" />
//             <h2 className="text-white font-bold text-base sm:text-xl">
//               Track Your Order
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-3 sm:p-5 overflow-y-auto flex-1">
//           <div className="flex flex-col sm:flex-row gap-2 mb-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 placeholder="Enter your Order ID"
//                 className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-400"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
//               />
//             </div>
//             <button
//               onClick={handleCheckOrder}
//               disabled={isLoading}
//               className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>
//           {error && (
//             <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
//               <ErrorIcon fontSize="small" /> {error}
//             </div>
//           )}
//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-3"
//             >
//               <div
//                 className={`rounded-xl p-3 border-2 ${getStatusColor(orderDetails.status)}`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     {getStatusIcon(orderDetails.status)}
//                     <span className="font-mono text-xs">
//                       ID: {orderDetails.orderId}
//                     </span>
//                   </div>
//                   <span className="text-lg font-bold capitalize">
//                     {orderDetails.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
//                   <PersonIcon fontSize="small" className="text-gray-500" />
//                   <p className="font-semibold">
//                     {orderDetails.customerName || "N/A"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3">
//                   <TableIcon fontSize="small" className="text-gray-500" />
//                   <p className="font-semibold">
//                     Table {orderDetails.tableNumber || "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <h3 className="font-semibold mb-2 text-sm">
//                   Items ({orderDetails.items?.length || 0})
//                 </h3>
//                 {orderDetails.items?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between py-1 border-b text-sm"
//                   >
//                     <span>
//                       {item.quantity}x {item.name}
//                     </span>
//                     <span>RWF {item.finalPrice?.toLocaleString()}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between font-bold pt-2 mt-2 border-t">
//                   <span>Total</span>
//                   <span>RWF {orderDetails.total?.toLocaleString()}</span>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//         <div className="p-3 border-t bg-gray-50 rounded-b-xl">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-200 py-2 rounded-xl font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);
//   if (!isOpen) return null;

//   const customizationOptions = [
//     { label: "No salt", category: "Sodium", icon: "🧂" },
//     { label: "Low sodium", category: "Sodium", icon: "🧂" },
//     { label: "No MSG", category: "Additives", icon: "⚠️" },
//     { label: "Less oil", category: "Fat", icon: "🫒" },
//     { label: "No oil", category: "Fat", icon: "🫒" },
//     { label: "Use olive oil", category: "Fat", icon: "🫒" },
//     { label: "No butter", category: "Dairy", icon: "🧈" },
//     { label: "Extra spicy", category: "Flavor", icon: "🌶️" },
//     { label: "Mild spice", category: "Flavor", icon: "🌶️" },
//     { label: "No spice", category: "Flavor", icon: "🌶️" },
//     { label: "No onions", category: "Allium", icon: "🧅" },
//     { label: "No garlic", category: "Allium", icon: "🧄" },
//     { label: "Gluten-free", category: "Allergen", icon: "🌾" },
//     { label: "Dairy-free", category: "Allergen", icon: "🥛" },
//     { label: "Egg-free", category: "Allergen", icon: "🥚" },
//     { label: "Nut-free", category: "Allergen", icon: "🥜" },
//     { label: "Vegan", category: "Diet", icon: "🌱" },
//     { label: "Vegetarian", category: "Diet", icon: "🥬" },
//     { label: "Keto-friendly", category: "Diet", icon: "🥓" },
//     { label: "Low carb", category: "Diet", icon: "🍞" },
//     { label: "High protein", category: "Diet", icon: "💪" },
//     { label: "Extra cheese", category: "Topping", icon: "🧀" },
//     { label: "No cheese", category: "Topping", icon: "🧀" },
//     { label: "No added sugar", category: "Sugar", icon: "🍬" },
//     { label: "Grilled instead of fried", category: "Cooking", icon: "🔥" },
//     { label: "Baked instead of fried", category: "Cooking", icon: "🔥" },
//     { label: "Half portion", category: "Portion", icon: "📏" },
//     { label: "Extra vegetables", category: "Nutrition", icon: "🥗" },
//   ];

//   const groupedOptions = customizationOptions.reduce((acc, opt) => {
//     if (!acc[opt.category]) acc[opt.category] = [];
//     acc[opt.category].push(opt);
//     return acc;
//   }, {});

//   const toggleCustomization = (opt) => {
//     if (customizations.includes(opt.label))
//       setCustomizations((prev) => prev.filter((c) => c !== opt.label));
//     else setCustomizations((prev) => [...prev, opt.label]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-xl flex justify-between">
//           <h2 className="text-white font-bold flex items-center gap-2">
//             <EditIcon /> Customize {item?.name}
//           </h2>
//           <button onClick={onClose} className="p-1 bg-white/20 rounded-full">
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">🥗 Ingredients</h3>
//             <div className="flex flex-wrap gap-1">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2 py-1 bg-gray-100 rounded-full text-xs"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex justify-between p-2 bg-orange-50 rounded-xl"
//             >
//               <span>
//                 ✨ Customization Options{" "}
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-1 rounded-full ml-1">
//                     {customizations.length}
//                   </span>
//                 )}
//               </span>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 space-y-3">
//                 {Object.entries(groupedOptions).map(([category, options]) => (
//                   <div key={category}>
//                     <h4 className="text-xs font-semibold text-gray-600 mb-1">
//                       {category}
//                     </h4>
//                     <div className="grid grid-cols-2 gap-1">
//                       {options.map((opt, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => toggleCustomization(opt)}
//                           className={`px-2 py-1 rounded-lg text-xs text-left flex items-center gap-1 ${customizations.includes(opt.label) ? "bg-orange-500 text-white" : "bg-gray-100"}`}
//                         >
//                           <span>{opt.icon}</span>
//                           <span>{opt.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <textarea
//             value={specialInstructions}
//             onChange={(e) => setSpecialInstructions(e.target.value)}
//             placeholder="Special instructions (e.g., allergies, preferences)..."
//             className="w-full p-2 border rounded-xl text-sm"
//             rows="3"
//           />
//         </div>
//         <div className="p-3 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== FLOATING TIMER ==========
// const FloatingTimer = ({
//   orderId,
//   tableNumber,
//   initialDuration,
//   onExpire,
//   onOpenModal,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   useEffect(() => {
//     const interval = setInterval(
//       () =>
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             onExpire?.();
//             return 0;
//           }
//           return prev - 1;
//         }),
//       1000,
//     );
//     return () => clearInterval(interval);
//   }, [onExpire]);
//   const formatTime = (s) =>
//     `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";
//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-3 py-2 flex items-center gap-2`}
//     >
//       <TimerIcon className="animate-pulse" />
//       <div>
//         <span className="text-xs">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-lg font-mono font-bold block">
//           {formatTime(timeLeft)}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// // ========== MAIN MENU COMPONENT ==========
// export const Menu = () => {
//   const [cart, setCart] = useState([]);
//   const [cartIdCounter, setCartIdCounter] = useState(1);
//   const [showCart, setShowCart] = useState(false);
//   const [showTableModal, setShowTableModal] = useState(true);
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeOrder, setActiveOrder] = useState(null);
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [isLoadingMenu, setIsLoadingMenu] = useState(true);
//   const [menuError, setMenuError] = useState(null);

//   const apiService = useMemo(() => APIService.getInstance(), []);
//   const handleGetOrderById = useCallback(
//     async (orderId) => apiService.getOrderById(orderId),
//     [apiService],
//   );

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       setIsLoadingMenu(true);
//       setMenuError(null);
//       try {
//         const response = await apiService.fetchFoods();
//         if (response && response.success && response.foods) {
//           const transformedItems = response.foods.map((food) => ({
//             id: food._id,
//             name: food.name,
//             price: food.price,
//             ingredients: food.ingredients || [],
//             description: food.description || "",
//             prepTime: food.prepTime || 15,
//             category: food.category || "Mains",
//             image:
//               food.image ||
//               "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//             containsGluten: food.containsGluten || false,
//             containsPeanuts: food.containsPeanuts || false,
//             containsDairy: food.containsDairy || false,
//             containsShellfish: food.containsShellfish || false,
//             containsAlcohol: food.containsAlcohol || false,
//             nutritionalInfo: null,
//             nutritionSource: null,
//             geminiInsights: null,
//           }));
//           setMenuItems(transformedItems);
//           toast.success(`Loaded ${transformedItems.length} menu items!`);
//         } else throw new Error("Invalid response format");
//       } catch (error) {
//         setMenuError(error.message || "Failed to load menu");
//         toast.error("Failed to load menu items");
//         setMenuItems([]);
//       } finally {
//         setIsLoadingMenu(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   // Simulate live status updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (activeOrder?.orderId) {
//         const statuses = ["confirmed", "preparing", "ready", "completed"];
//         const currentIndex = statuses.indexOf(activeOrder.status);
//         if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
//           const newStatus = statuses[currentIndex + 1];
//           setActiveOrder((prev) => ({ ...prev, status: newStatus }));
//           setLiveStatus({ orderId: activeOrder.orderId, status: newStatus });
//         }
//       }
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [activeOrder]);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);
//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);
//       const { nutritionalInfo, nutritionSource, geminiInsights } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = {
//         ...item,
//         nutritionalInfo,
//         nutritionSource,
//         geminiInsights,
//       };
//       setCurrentItem(updatedItem);
//       setMenuItems((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );
//       const analysis = analyzeFoodFully(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2500);
//   };

//   const categories = ["all", ...new Set(menuItems.map((i) => i.category))];
//   const filtered = menuItems.filter(
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

//   const handleContinueToCustomize = () => {
//     setShowAnalysisModal(false);
//     setShowCustomModal(true);
//   };
//   const addToCartWithCustomizations = (item, customizations, instructions) => {
//     const newItem = {
//       ...item,
//       quantity: 1,
//       finalPrice: item.price,
//       customizations: customizations || [],
//       specialInstructions: instructions || "",
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
//     if (isSubmitting) return;
//     if (cart.length === 0) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Cart Empty",
//         message: "Please add items to your cart first.",
//       });
//       return;
//     }
//     if (!tableInfo.tableNumber || !tableInfo.customerName) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Missing Information",
//         message: "Please select a table and enter your name first.",
//       });
//       setShowTableModal(true);
//       return;
//     }
//     setIsSubmitting(true);
//     setShowCart(false);
//     try {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//       const formattedItems = cart.map((item) => ({
//         id: item.id.toString(),
//         name: item.name,
//         quantity: item.quantity || 1,
//         originalPrice: item.price || 0,
//         finalPrice: (item.price || 0) * (item.quantity || 1),
//         preparationTime: item.prepTime || 15,
//         customizations: item.customizations || [],
//         specialInstructions: item.specialInstructions || "",
//       }));
//       const orderData = {
//         personDetails: {
//           name: tableInfo.customerName,
//           tableNumber: tableInfo.tableNumber.toString(),
//           orderType: "dine-in",
//         },
//         bookingDetails: {
//           estimatedPickupTime: new Date(
//             Date.now() + preparationTime * 60000,
//           ).toISOString(),
//           specialInstructions: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//         },
//         items: formattedItems,
//         notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       };
//       const result = await apiService.createOrder(orderData);
//       if (result?.success && result?.data) {
//         const order = result.data;
//         const total =
//           order.items?.reduce((sum, item) => sum + (item.finalPrice || 0), 0) ||
//           getTotal();
//         const orderId = order.orderId || order._id || "N/A";
//         const hours = Math.floor(preparationTime / 60);
//         const minutes = preparationTime % 60;
//         const timeString =
//           hours > 0 ? `${hours}h ${minutes}min` : `${minutes} minutes`;
//         setActiveOrder({
//           orderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total,
//           timeRemaining: preparationTime * 60,
//           status: order.status || "preparing",
//         });
//         setShowResult({
//           open: true,
//           type: "success",
//           title: "🎉 ORDER CONFIRMED!",
//           message: `Thank you ${tableInfo.customerName}!\n\n📍 Table: ${tableInfo.tableNumber}\n🆔 Order ID: ${orderId}\n💰 Total: RWF ${total.toLocaleString()}\n⏱️ Est. time: ${timeString}\n\n💡 Tip: Use your Order ID to track your order status!`,
//         });
//         setCart([]);
//         toast.success(`✅ Order #${orderId.slice(-8)} confirmed!`);
//       } else throw new Error(result?.message || "Order failed");
//     } catch (error) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: error.message || "Failed to place order. Please try again.",
//       });
//       toast.error("Failed to place order");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = async (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with comprehensive health analysis!`,
//     );
//   };

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Appetizers":
//         return <FastfoodIcon fontSize="small" />;
//       case "Mains":
//         return <LunchIcon fontSize="small" />;
//       case "Seafood":
//         return <DrinkIcon fontSize="small" />;
//       case "Pizza":
//         return <RestaurantIcon fontSize="small" />;
//       case "Salads":
//         return <Nature fontSize="small" />;
//       case "Desserts":
//         return <DessertIcon fontSize="small" />;
//       case "Beverages":
//         return <DrinkIcon fontSize="small" />;
//       default:
//         return <MenuIcon fontSize="small" />;
//     }
//   };

//   // Get quick analysis summary for card display
//   const getQuickAnalysis = (item) => {
//     if (!item.nutritionalInfo) return null;
//     const nutrition = item.nutritionalInfo;
//     const concerns = [];
//     if (nutrition.sugar && nutrition.sugar > 20) concerns.push("High Sugar");
//     if (nutrition.sodium && nutrition.sodium > 600)
//       concerns.push("High Sodium");
//     if (nutrition.saturatedFat && nutrition.saturatedFat > 10)
//       concerns.push("High Sat Fat");
//     return concerns;
//   };

//   return (
//     <div
//       className={`w-full min-h-screen ${CATEGORY_BG[activeCategory === "all" ? "default" : activeCategory] || CATEGORY_BG.default} relative`}
//     >
//       <ToastContainer position="bottom-right" autoClose={5000} />

//       <AnimatePresence>
//         {showTableModal && (
//           <TableSelectorModal
//             isOpen={showTableModal}
//             onClose={() => {}}
//             onConfirm={handleTableConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showLoadingModal && selectedItem && (
//           <LoadingModal
//             isOpen={showLoadingModal}
//             itemName={selectedItem.name}
//             itemCategory={selectedItem.category}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showAnalysisModal && (
//           <AnalysisResultModal
//             isOpen={showAnalysisModal}
//             onClose={() => setShowAnalysisModal(false)}
//             analysis={analysisResult}
//             item={currentItem}
//             onContinue={handleContinueToCustomize}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showCustomModal && (
//           <CustomizationModal
//             isOpen={showCustomModal}
//             onClose={() => setShowCustomModal(false)}
//             item={currentItem}
//             onAddToCart={addToCartWithCustomizations}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showCart && (
//           <CartModal
//             isOpen={showCart}
//             onClose={() => setShowCart(false)}
//             cart={cart}
//             updateQuantity={updateQuantity}
//             removeItem={removeItem}
//             getTotal={getTotal}
//             onCheckout={handleCheckout}
//             tableInfo={tableInfo}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showOrderStatusModal && (
//           <OrderStatusModal
//             isOpen={showOrderStatusModal}
//             onClose={() => setShowOrderStatusModal(false)}
//             onCheckOrder={handleGetOrderById}
//             liveStatus={liveStatus}
//             initialOrderId={activeOrder?.orderId || ""}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showResult.open && (
//           <ResultModal
//             isOpen={showResult.open}
//             onClose={() => setShowResult({ ...showResult, open: false })}
//             type={showResult.type}
//             title={showResult.title}
//             message={showResult.message}
//             onTrackOrder={() => setShowOrderStatusModal(true)}
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderStatusModal(true)}
//         />
//       )}

//       <div className="w-full container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl relative z-10">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2 flex-wrap justify-center sm:justify-start"
//             >
//               <RestaurantIcon className="text-orange-500 text-2xl sm:text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-600 text-xs sm:text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500 font-medium">
//                 ✦ Allergen & Health Analysis
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <SearchIcon />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCart(true)}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
//             >
//               <CartIcon />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.length}
//                 </span>
//               )}
//             </motion.button>
//           </div>
//         </div>

//         {/* Slider */}
//         <Slider autoPlay={true} interval={5000} />

//         {/* Info Banner */}
//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mt-4 mb-4 border border-blue-100"
//         >
//           <div className="flex items-center gap-3 flex-wrap">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-xs sm:text-sm text-blue-800 font-medium">
//                 🔬 Comprehensive Health Analysis
//               </p>
//               <p className="text-[10px] text-blue-600">
//                 Every dish is analyzed for: 9 Major Allergens • Nutritional
//                 Concerns • 25+ Health Conditions • AI-Powered Insights
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Search Bar */}
//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white/80 backdrop-blur-sm shadow-sm"
//             placeholder="Search for delicious dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Menu Content */}
//         {isLoadingMenu ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
//               />
//               <p className="text-gray-600">Loading delicious menu items...</p>
//             </div>
//           </div>
//         ) : menuError ? (
//           <div className="text-center py-16">
//             <ErrorIcon className="text-red-400 text-6xl mx-auto mb-4" />
//             <p className="text-gray-600">Failed to load menu: {menuError}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
//             >
//               Retry
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Category Buttons */}
//             <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//               {categories.map((cat) => (
//                 <motion.button
//                   key={cat}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm flex items-center gap-1 ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {getCategoryIcon(cat)} {cat === "all" ? "🍽️ All Items" : cat}
//                 </motion.button>
//               ))}
//             </div>

//             {/* Food Grid - Responsive */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//               {paginated.map((item) => {
//                 const quickAnalysis = getQuickAnalysis(item);
//                 return (
//                   <motion.div
//                     layoutId={`item-${item.id}`}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     whileHover={{ y: -5 }}
//                     key={item.id}
//                     className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-orange-100"
//                     onClick={() => handleItemClick(item)}
//                   >
//                     <div className="relative h-40 overflow-hidden">
//                       <motion.img
//                         whileHover={{ scale: 1.1 }}
//                         src={item.image}
//                         className="w-full h-full object-cover"
//                         alt={item.name}
//                       />
//                       <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                         <TimeIcon fontSize="small" /> {item.prepTime} min
//                       </div>
//                       <div
//                         className={`absolute top-2 left-2 bg-gradient-to-r ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.default} text-white text-[10px] px-2 py-0.5 rounded-full`}
//                       >
//                         {item.category}
//                       </div>

//                       {/* Allergen Warning Badges */}
//                       {item.ingredients && (
//                         <div className="absolute top-2 right-2 flex gap-1">
//                           {item.ingredients.some((i) =>
//                             ["peanut", "peanuts", "groundnut"].some((k) =>
//                               i.toLowerCase().includes(k),
//                             ),
//                           ) && (
//                             <span
//                               className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Peanuts"
//                             >
//                               🥜
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "almond",
//                               "walnut",
//                               "cashew",
//                               "pecan",
//                               "hazelnut",
//                               "pistachio",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Tree Nuts"
//                             >
//                               🌰
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "milk",
//                               "cheese",
//                               "butter",
//                               "cream",
//                               "yogurt",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-blue-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Dairy"
//                             >
//                               🥛
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             ["wheat", "flour", "bread", "pasta", "gluten"].some(
//                               (k) => i.toLowerCase().includes(k),
//                             ),
//                           ) && (
//                             <span
//                               className="bg-yellow-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Gluten"
//                             >
//                               🌾
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "shrimp",
//                               "crab",
//                               "lobster",
//                               "clam",
//                               "oyster",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-orange-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Shellfish"
//                             >
//                               🦐
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <h3 className="font-bold text-gray-800 text-lg truncate">
//                         {item.name}
//                       </h3>
//                       <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                         {item.description}
//                       </p>

//                       {/* Quick Health Warnings */}
//                       {quickAnalysis && quickAnalysis.length > 0 && (
//                         <div className="mt-2 flex gap-1 flex-wrap">
//                           {quickAnalysis.map((warning, idx) => (
//                             <span
//                               key={idx}
//                               className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full"
//                             >
//                               ⚠️ {warning}
//                             </span>
//                           ))}
//                         </div>
//                       )}

//                       <div className="flex justify-between items-center mt-3">
//                         <span className="text-orange-600 font-bold text-lg">
//                           RWF {item.price.toLocaleString()}
//                         </span>
//                         <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition">
//                           Analyze & Order
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {filtered.length === 0 && (
//               <div className="text-center py-16">
//                 <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No items match your search.</p>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-8 flex-wrap">
//                 {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//                   let pageNum =
//                     totalPages <= 7
//                       ? i + 1
//                       : currentPage <= 4
//                         ? i + 1
//                         : currentPage >= totalPages - 3
//                           ? totalPages - 6 + i
//                           : currentPage - 3 + i;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`w-9 h-9 rounded-lg transition text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         )}

//         {/* Submitting Overlay */}
//         <AnimatePresence>
//           {isSubmitting && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.8 }}
//                 className="bg-white rounded-2xl p-6 text-center"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                   className="rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium">
//                   Placing your order...
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/set-state-in-effect */

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
//   Receipt as ReceiptIcon,
//   ConfirmationNumber as ConfirmationNumberIcon,
//   NotificationsActive as NotifIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Info as InfoIcon,
//   LocalHospital as LocalHospitalIcon,
//   Nature,
//   Speed as SpeedIcon,
//   Bolt as BoltIcon,
//   SpaOutlined,
//   Fastfood as FastfoodIcon,
//   LocalDrink as LocalDrinkIcon,
//   RestaurantMenu as MenuIcon,
//   EmojiFoodBeverage as DrinkIcon,
//   Cake as DessertIcon,
//   LunchDining as LunchIcon,
//   BreakfastDining as BreakfastIcon,
//   DinnerDining as DinnerIcon,
//   SmartToy as AIIcon,
//   Analytics as AnalyticsIcon,
//   Star as StarIcon,
//   Recommend as RecommendIcon,
//   ThumbUp as ThumbUpIcon,
//   Lightbulb as LightbulbIcon,
//   TipsAndUpdates as TipsIcon,
// } from "@mui/icons-material";
// import { v4 as uuidv4 } from "uuid";
// import { Slider } from "../slider/Slider";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   EDAMAM_APP_ID: "0dcbf7a8",
//   EDAMAM_APP_KEY: "2059ccfd4b967458e7f4a9ffe6cf118b",
//   EDAMAM_BASE_URL: "https://api.edamam.com",
//   EDAMAM_API_BASE: "https://api.edamam.com/api",
//   GEMINI_API_KEY: "AIzaSyDGln-EALpL8JCAhPb3mi42Lh85PXYBI2o",
//   GEMINI_BASE_URL:
//     "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // Food category colors for attractive UI
// const CATEGORY_COLORS = {
//   Appetizers: "from-amber-500 to-orange-600",
//   Mains: "from-red-600 to-rose-700",
//   Seafood: "from-cyan-600 to-blue-700",
//   Pizza: "from-orange-500 to-red-600",
//   Salads: "from-emerald-500 to-green-600",
//   Desserts: "from-pink-500 to-rose-600",
//   Beverages: "from-indigo-500 to-purple-600",
//   default: "from-orange-500 to-red-500",
// };

// // Food category background patterns
// const CATEGORY_BG = {
//   Appetizers: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
//   Mains: "bg-gradient-to-br from-red-50 via-rose-50 to-orange-50",
//   Seafood: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
//   Pizza: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
//   Salads: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
//   Desserts: "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50",
//   Beverages: "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50",
//   default: "bg-gradient-to-br from-orange-50 via-red-50 to-amber-50",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/orders",
//   TRACK_ORDER: "/orders",
//   FOODS: "/foods",
// };

// // ========== COMPREHENSIVE ALLERGEN AND INGREDIENT DATABASE ==========
// const ALLERGEN_DATABASE = {
//   // Peanut Allergy
//   peanut: {
//     name: "Peanut Allergy",
//     severity: "critical",
//     keywords: [
//       "peanut",
//       "peanuts",
//       "groundnut",
//       "arachis",
//       "peanut butter",
//       "peanut oil",
//       "peanut flour",
//       "peanut protein",
//       "beer nuts",
//       "monkey nuts",
//       "goober",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS PEANUTS - Risk of anaphylaxis and severe allergic reaction. Even trace amounts can be dangerous.",
//   },
//   // Tree Nut Allergy
//   treeNut: {
//     name: "Tree Nut Allergy",
//     severity: "critical",
//     keywords: [
//       "almond",
//       "walnut",
//       "cashew",
//       "pecan",
//       "hazelnut",
//       "pistachio",
//       "macadamia",
//       "chestnut",
//       "brazil nut",
//       "pine nut",
//       "pignoli",
//       "filbert",
//       "nut",
//       "nuts",
//       "nut butter",
//       "nut oil",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS TREE NUTS - Risk of anaphylaxis and severe allergic reaction.",
//   },
//   // Shellfish Allergy
//   shellfish: {
//     name: "Shellfish Allergy",
//     severity: "critical",
//     keywords: [
//       "shrimp",
//       "prawn",
//       "crab",
//       "lobster",
//       "crayfish",
//       "crawfish",
//       "clam",
//       "oyster",
//       "mussel",
//       "scallop",
//       "squid",
//       "calamari",
//       "octopus",
//       "abalone",
//       "escargot",
//       "shellfish",
//       "crustacean",
//     ],
//     message: "⚠️⚠️ CONTAINS SHELLFISH - Risk of life-threatening anaphylaxis.",
//   },
//   // Egg Allergy
//   egg: {
//     name: "Egg Allergy",
//     severity: "high",
//     keywords: [
//       "egg",
//       "eggs",
//       "egg white",
//       "egg yolk",
//       "albumin",
//       "mayonnaise",
//       "meringue",
//       "pavlova",
//       "custard",
//       "quiche",
//       "frittata",
//       "omelet",
//       "egg wash",
//     ],
//     message:
//       "⚠️ CONTAINS EGG - May cause hives, digestive issues, or respiratory distress.",
//   },
//   // Soy Allergy
//   soy: {
//     name: "Soy Allergy",
//     severity: "high",
//     keywords: [
//       "soy",
//       "soya",
//       "soybean",
//       "tofu",
//       "tempeh",
//       "soy sauce",
//       "tamari",
//       "shoyu",
//       "miso",
//       "soy milk",
//       "edamame",
//       "textured vegetable protein",
//       "tvp",
//       "soy protein",
//       "soy lecithin",
//     ],
//     message:
//       "⚠️ CONTAINS SOY - May cause allergic reaction including hives and digestive issues.",
//   },
//   // Wheat/Gluten Allergy
//   wheat: {
//     name: "Wheat/Gluten Allergy",
//     severity: "critical",
//     keywords: [
//       "wheat",
//       "flour",
//       "bread",
//       "pasta",
//       "couscous",
//       "semolina",
//       "bulgur",
//       "spelt",
//       "farro",
//       "seitan",
//       "gluten",
//       "barley",
//       "rye",
//       "malt",
//       "brewer's yeast",
//       "tricale",
//       "durum",
//       "kamut",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS WHEAT/GLUTEN - Risk of anaphylaxis and severe reaction.",
//   },
//   // Milk/Dairy Allergy
//   dairy: {
//     name: "Milk/Dairy Allergy",
//     severity: "critical",
//     keywords: [
//       "milk",
//       "cream",
//       "cheese",
//       "yogurt",
//       "butter",
//       "whey",
//       "casein",
//       "ghee",
//       "ice cream",
//       "custard",
//       "pudding",
//       "sour cream",
//       "cream cheese",
//       "cottage cheese",
//       "ricotta",
//       "mozzarella",
//       "cheddar",
//       "parmesan",
//     ],
//     message:
//       "⚠️⚠️ CONTAINS MILK/DAIRY - Risk of severe allergic reaction including anaphylaxis.",
//   },
//   // Fish Allergy
//   fish: {
//     name: "Fish Allergy",
//     severity: "critical",
//     keywords: [
//       "salmon",
//       "tuna",
//       "cod",
//       "halibut",
//       "bass",
//       "trout",
//       "mackerel",
//       "sardine",
//       "anchovy",
//       "herring",
//       "tilapia",
//       "catfish",
//       "snapper",
//       "grouper",
//       "flounder",
//       "sole",
//       "haddock",
//     ],
//     message: "⚠️⚠️ CONTAINS FISH - Risk of life-threatening anaphylaxis.",
//   },
//   // Sesame Allergy
//   sesame: {
//     name: "Sesame Allergy",
//     severity: "critical",
//     keywords: [
//       "sesame",
//       "tahini",
//       "benne",
//       "sesame oil",
//       "gingelly oil",
//       "sesame seed",
//       "sesame seeds",
//       "sesame paste",
//     ],
//     message: "⚠️⚠️ CONTAINS SESAME - Risk of severe anaphylaxis.",
//   },
//   // Sulfite Sensitivity
//   sulfite: {
//     name: "Sulfite Sensitivity",
//     severity: "high",
//     keywords: [
//       "sulfite",
//       "sulfur dioxide",
//       "potassium metabisulfite",
//       "sodium metabisulfite",
//       "sodium sulfite",
//       "preservative",
//     ],
//     message:
//       "⚠️ CONTAINS SULFITES - May cause hives, breathing difficulty, or anaphylaxis.",
//   },
// };

// // ========== NUTRITIONAL CONCERN DATABASE ==========
// const NUTRITIONAL_CONCERNS = {
//   highSugar: {
//     name: "High Sugar Content",
//     severity: "warning",
//     threshold: 25,
//     unit: "g",
//     message:
//       "⚠️ HIGH SUGAR ({value}g) - May cause blood sugar spikes, weight gain, and inflammation.",
//   },
//   veryHighSugar: {
//     name: "Very High Sugar Content",
//     severity: "critical",
//     threshold: 40,
//     unit: "g",
//     message:
//       "⚠️⚠️ VERY HIGH SUGAR ({value}g) - Dangerous for diabetics, promotes obesity and metabolic disease.",
//   },
//   highSodium: {
//     name: "High Sodium Content",
//     severity: "warning",
//     threshold: 800,
//     unit: "mg",
//     message:
//       "⚠️ HIGH SODIUM ({value}mg) - Raises blood pressure, increases heart disease and stroke risk.",
//   },
//   veryHighSodium: {
//     name: "Very High Sodium Content",
//     severity: "critical",
//     threshold: 1200,
//     unit: "mg",
//     message:
//       "⚠️⚠️ VERY HIGH SODIUM ({value}mg) - Dangerous for hypertension and heart failure patients.",
//   },
//   highSaturatedFat: {
//     name: "High Saturated Fat",
//     severity: "warning",
//     threshold: 12,
//     unit: "g",
//     message:
//       "⚠️ HIGH SATURATED FAT ({value}g) - Increases LDL cholesterol and heart disease risk.",
//   },
//   veryHighSaturatedFat: {
//     name: "Very High Saturated Fat",
//     severity: "critical",
//     threshold: 20,
//     unit: "g",
//     message:
//       "⚠️⚠️ VERY HIGH SATURATED FAT ({value}g) - Major risk factor for heart attack and stroke.",
//   },
//   highCholesterol: {
//     name: "High Cholesterol",
//     severity: "warning",
//     threshold: 200,
//     unit: "mg",
//     message:
//       "⚠️ HIGH CHOLESTEROL ({value}mg) - May clog arteries and increase heart disease risk.",
//   },
//   veryHighCholesterol: {
//     name: "Very High Cholesterol",
//     severity: "critical",
//     threshold: 300,
//     unit: "mg",
//     message:
//       "⚠️⚠️ VERY HIGH CHOLESTEROL ({value}mg) - Significant risk for cardiovascular events.",
//   },
//   highCarbs: {
//     name: "High Carbohydrates",
//     severity: "info",
//     threshold: 50,
//     unit: "g",
//     message:
//       "Contains {value}g carbohydrates - Monitor blood glucose if diabetic.",
//   },
//   veryHighCarbs: {
//     name: "Very High Carbohydrates",
//     severity: "warning",
//     threshold: 80,
//     unit: "g",
//     message:
//       "⚠️ VERY HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//   },
//   highCalories: {
//     name: "High Calories",
//     severity: "info",
//     threshold: 600,
//     unit: "kcal",
//     message:
//       "Contains {value} calories - Consider portion control for weight management.",
//   },
//   veryHighCalories: {
//     name: "Very High Calories",
//     severity: "warning",
//     threshold: 900,
//     unit: "kcal",
//     message:
//       "⚠️ HIGH CALORIE ({value}kcal) - May contribute to weight gain and obesity.",
//   },
//   lowFiber: {
//     name: "Low Fiber",
//     severity: "info",
//     threshold: 3,
//     unit: "g",
//     message:
//       "Low fiber content ({value}g) - Consider adding fiber-rich foods for digestive health.",
//   },
//   highPurine: {
//     name: "High Purine Content",
//     severity: "warning",
//     threshold: 150,
//     unit: "mg",
//     message:
//       "⚠️ HIGH PURINES ({value}mg) - May trigger gout flare-ups in susceptible individuals.",
//   },
//   containsCaffeine: {
//     name: "Contains Caffeine",
//     severity: "info",
//     threshold: 50,
//     unit: "mg",
//     message:
//       "Contains {value}mg caffeine - May cause anxiety, insomnia, or heart palpitations in sensitive individuals.",
//   },
//   highCaffeine: {
//     name: "High Caffeine",
//     severity: "warning",
//     threshold: 150,
//     unit: "mg",
//     message:
//       "⚠️ HIGH CAFFEINE ({value}mg) - Can trigger anxiety, panic attacks, and heart arrhythmias.",
//   },
//   containsAlcohol: {
//     name: "Contains Alcohol",
//     severity: "warning",
//     threshold: 1,
//     unit: "",
//     message:
//       "⚠️ CONTAINS ALCOHOL - Interacts with medications, affects liver health, and may trigger various conditions.",
//   },
//   containsMSG: {
//     name: "Contains MSG",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains MSG - May trigger headaches, migraines, or flushing in sensitive individuals.",
//   },
//   containsArtificialColors: {
//     name: "Contains Artificial Colors",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains artificial food dyes - Linked to hyperactivity in children and may trigger migraines.",
//   },
//   containsAspartame: {
//     name: "Contains Aspartame",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains aspartame - May trigger headaches and should be avoided by individuals with PKU.",
//   },
//   highOxalate: {
//     name: "High Oxalate",
//     severity: "warning",
//     threshold: 80,
//     unit: "mg",
//     message:
//       "⚠️ HIGH OXALATE ({value}mg) - May promote kidney stone formation in susceptible individuals.",
//   },
//   highPotassium: {
//     name: "High Potassium",
//     severity: "warning",
//     threshold: 500,
//     unit: "mg",
//     message:
//       "⚠️ HIGH POTASSIUM ({value}mg) - Dangerous for kidney disease patients.",
//   },
//   highPhosphorus: {
//     name: "High Phosphorus",
//     severity: "warning",
//     threshold: 400,
//     unit: "mg",
//     message:
//       "⚠️ HIGH PHOSPHORUS ({value}mg) - May worsen bone and heart problems in kidney disease.",
//   },
//   containsGoitrogens: {
//     name: "Contains Goitrogens",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains goitrogens (cruciferous vegetables, soy) - May interfere with thyroid function when consumed in large amounts.",
//   },
//   containsFODMAPs: {
//     name: "Contains High FODMAPs",
//     severity: "info",
//     threshold: 1,
//     unit: "",
//     message:
//       "Contains high FODMAP ingredients - May trigger IBS symptoms including bloating, gas, and abdominal pain.",
//   },
// };

// // ========== CLINICAL CONDITIONS (70+ conditions) with thresholds ==========
// const CLINICAL_CONDITIONS = [
//   // Endocrine & Metabolic
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Insulin resistance and high blood sugar",
//     recommendations: [
//       "Choose low glycemic index foods",
//       "Monitor carbohydrate intake",
//       "Increase fiber consumption",
//       "Avoid sugary beverages",
//       "Eat regular meals",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 25,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 70,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Type 1 Diabetes",
//     icon: "💉",
//     color: "text-red-700",
//     bgColor: "bg-red-100",
//     description: "Autoimmune destruction of insulin-producing cells",
//     recommendations: [
//       "Count carbohydrates accurately",
//       "Adjust insulin dosage accordingly",
//       "Monitor blood glucose frequently",
//       "Keep fast-acting sugar for emergencies",
//     ],
//     thresholds: {
//       sugar: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Requires insulin adjustment.",
//       },
//       sugarHigh: {
//         value: 20,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous ketoacidosis risk.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Gestational Diabetes",
//     icon: "🤰",
//     color: "text-pink-600",
//     bgColor: "bg-pink-50",
//     description: "High blood sugar during pregnancy",
//     recommendations: [
//       "Monitor blood sugar 4x daily",
//       "Eat small frequent meals",
//       "Choose complex carbohydrates",
//       "Consult dietitian for meal plan",
//     ],
//     thresholds: {
//       sugar: {
//         value: 12,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Affects maternal and fetal health.",
//       },
//       sugarHigh: {
//         value: 22,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SUGAR ({value}g) - Risk of macrosomia and complications.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Hypothyroidism",
//     icon: "🦋",
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     description: "Underactive thyroid gland",
//     recommendations: [
//       "Take thyroid medication on empty stomach",
//       "Avoid goitrogenic foods raw",
//       "Ensure adequate iodine intake",
//       "Monitor selenium levels",
//     ],
//     thresholds: {
//       goitrogens: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message:
//           "Contains goitrogens - May interfere with thyroid hormone production.",
//       },
//       soy: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message:
//           "Contains soy isoflavones - May reduce thyroid medication absorption.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Hyperthyroidism",
//     icon: "⚡",
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//     description: "Overactive thyroid gland",
//     recommendations: [
//       "Limit iodine-rich foods",
//       "Avoid caffeine and stimulants",
//       "Eat calcium-rich foods",
//       "Monitor heart rate",
//     ],
//     thresholds: {
//       iodine: {
//         value: 300,
//         unit: "mcg",
//         severity: "warning",
//         message: "⚠️ HIGH IODINE ({value}mcg) - Worsens hyperthyroid symptoms.",
//       },
//       caffeine: {
//         value: 80,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg caffeine - May increase heart rate and anxiety.",
//       },
//     },
//   },
//   {
//     id: 6,
//     name: "PCOS",
//     icon: "🩺",
//     color: "text-fuchsia-600",
//     bgColor: "bg-fuchsia-50",
//     description: "Polycystic Ovary Syndrome",
//     recommendations: [
//       "Low glycemic index diet",
//       "Increase fiber intake",
//       "Choose anti-inflammatory foods",
//       "Consider inositol supplementation",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g sugar - Worsens insulin resistance in PCOS.",
//       },
//       saturatedFat: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g saturated fat - Increases inflammation in PCOS.",
//       },
//     },
//   },
//   // Cardiovascular
//   {
//     id: 7,
//     name: "Hypertension",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     recommendations: [
//       "Reduce sodium intake (<1500mg/day)",
//       "Increase potassium-rich foods",
//       "Follow DASH diet",
//       "Limit alcohol",
//       "Regular exercise",
//     ],
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1000,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension crisis.",
//       },
//     },
//   },
//   {
//     id: 8,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     recommendations: [
//       "Limit saturated and trans fats",
//       "Increase omega-3 fatty acids",
//       "Choose whole grains",
//       "Eat more fruits and vegetables",
//     ],
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "info",
//         message:
//           "Contains {value}g saturated fat - May increase arterial plaque.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "warning",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 150,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg cholesterol - May clog arteries.",
//       },
//       cholesterolHigh: {
//         value: 250,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk for heart attack.",
//       },
//     },
//   },
//   {
//     id: 9,
//     name: "Heart Failure",
//     icon: "💔",
//     color: "text-red-800",
//     bgColor: "bg-red-100",
//     description: "Congestive heart failure",
//     recommendations: [
//       "Strict sodium restriction (<2000mg/day)",
//       "Monitor fluid intake",
//       "Limit alcohol",
//       "Weigh daily to check fluid retention",
//     ],
//     thresholds: {
//       sodium: {
//         value: 400,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - Causes fluid retention.",
//       },
//       sodiumHigh: {
//         value: 800,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH SODIUM ({value}mg) - May trigger pulmonary edema.",
//       },
//     },
//   },
//   {
//     id: 10,
//     name: "Atrial Fibrillation",
//     icon: "💓",
//     color: "text-purple-700",
//     bgColor: "bg-purple-50",
//     description: "Irregular heart rhythm",
//     recommendations: [
//       "Avoid caffeine and stimulants",
//       "Limit alcohol",
//       "Stay hydrated",
//       "Monitor electrolyte balance",
//     ],
//     thresholds: {
//       caffeine: {
//         value: 120,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH CAFFEINE ({value}mg) - Triggers arrhythmia episodes.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ CONTAINS ALCOHOL - Known AFib trigger.",
//       },
//     },
//   },
//   // Kidney & Liver
//   {
//     id: 11,
//     name: "Kidney Disease",
//     icon: "🩷",
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50",
//     description: "Chronic kidney disease",
//     recommendations: [
//       "Monitor protein intake",
//       "Limit phosphorus",
//       "Control potassium",
//       "Limit sodium",
//       "Monitor fluid intake",
//     ],
//     thresholds: {
//       potassium: {
//         value: 350,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg potassium - Can cause dangerous heart rhythms in CKD.",
//       },
//       potassiumHigh: {
//         value: 500,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH POTASSIUM ({value}mg) - Dangerous for kidney patients.",
//       },
//       phosphorus: {
//         value: 300,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg phosphorus - May worsen bone problems.",
//       },
//       phosphorusHigh: {
//         value: 450,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH PHOSPHORUS ({value}mg) - Dangerous for kidney patients.",
//       },
//     },
//   },
//   {
//     id: 12,
//     name: "Kidney Stones",
//     icon: "🪨",
//     color: "text-stone-600",
//     bgColor: "bg-stone-50",
//     description: "Hard mineral deposits in kidneys",
//     recommendations: [
//       "Drink plenty of water",
//       "Limit oxalate-rich foods",
//       "Reduce sodium",
//       "Limit animal protein",
//       "Get adequate calcium from food",
//     ],
//     thresholds: {
//       oxalate: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message:
//           "Contains {value}mg oxalate - May promote calcium oxalate stones.",
//       },
//       oxalateHigh: {
//         value: 100,
//         unit: "mg",
//         severity: "warning",
//         message:
//           "⚠️ HIGH OXALATE ({value}mg) - Significant stone-forming risk.",
//       },
//     },
//   },
//   {
//     id: 13,
//     name: "Fatty Liver",
//     icon: "🧫",
//     color: "text-emerald-700",
//     bgColor: "bg-emerald-50",
//     description: "Fatty liver disease",
//     recommendations: [
//       "Weight loss",
//       "Limit sugar and refined carbs",
//       "Increase physical activity",
//       "Avoid fructose-sweetened beverages",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - Contributes to liver fat.",
//       },
//       fructose: {
//         value: 10,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g fructose - Major driver of NAFLD.",
//       },
//     },
//   },
//   {
//     id: 14,
//     name: "Cirrhosis",
//     icon: "🧫",
//     color: "text-green-800",
//     bgColor: "bg-green-100",
//     description: "Advanced liver scarring",
//     recommendations: [
//       "Avoid alcohol completely",
//       "Limit sodium",
//       "Adequate protein unless encephalopathy",
//       "Small frequent meals",
//     ],
//     thresholds: {
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS ALCOHOL - Extremely dangerous for cirrhotic liver.",
//       },
//       sodium: {
//         value: 500,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg sodium - Worsens ascites.",
//       },
//     },
//   },
//   // Gastrointestinal
//   {
//     id: 15,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-emerald-700",
//     bgColor: "bg-emerald-50",
//     description: "Autoimmune reaction to gluten",
//     recommendations: [
//       "Strict lifelong gluten-free diet",
//       "Avoid wheat, barley, rye",
//       "Check labels for hidden gluten",
//       "Choose certified gluten-free products",
//     ],
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers intestinal damage.",
//       },
//       wheat: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS WHEAT - Unsafe for celiac disease.",
//       },
//     },
//   },
//   {
//     id: 16,
//     name: "Lactose Intolerance",
//     icon: "🥛",
//     color: "text-sky-700",
//     bgColor: "bg-sky-50",
//     description: "Inability to digest lactose",
//     recommendations: [
//       "Choose lactose-free dairy",
//       "Use lactase enzyme supplements",
//       "Try plant-based milk alternatives",
//       "Aged cheeses have less lactose",
//     ],
//     thresholds: {
//       lactose: {
//         value: 5,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g lactose - May cause bloating and gas.",
//       },
//       lactoseHigh: {
//         value: 10,
//         unit: "g",
//         severity: "warning",
//         message: "⚠️ HIGH LACTOSE ({value}g) - Significant digestive distress.",
//       },
//     },
//   },
//   {
//     id: 17,
//     name: "IBS",
//     icon: "😖",
//     color: "text-green-700",
//     bgColor: "bg-green-50",
//     description: "Irritable bowel syndrome",
//     recommendations: [
//       "Low FODMAP diet",
//       "Identify trigger foods",
//       "Regular meal times",
//       "Stress management",
//       "Adequate hydration",
//     ],
//     thresholds: {
//       fodmaps: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains high FODMAPs - May cause bloating and pain.",
//       },
//       caffeine: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message: "Contains caffeine - May worsen diarrhea.",
//       },
//     },
//   },
//   {
//     id: 18,
//     name: "GERD",
//     icon: "🔥",
//     color: "text-red-600",
//     bgColor: "bg-red-100",
//     description: "Acid reflux",
//     recommendations: [
//       "Avoid trigger foods",
//       "Eat small meals",
//       "Don't lie down after eating",
//       "Elevate head of bed",
//       "Maintain healthy weight",
//     ],
//     thresholds: {
//       fat: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g fat - Relaxes LES, worsens reflux.",
//       },
//       spicy: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains spices - Irritates esophagus.",
//       },
//       caffeine: {
//         value: 50,
//         unit: "mg",
//         severity: "info",
//         message: "Contains caffeine - Increases acid production.",
//       },
//       chocolate: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains chocolate - Triggers reflux.",
//       },
//     },
//   },
//   // Gout
//   {
//     id: 19,
//     name: "Gout",
//     icon: "🦶",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Uric acid crystal buildup",
//     recommendations: [
//       "Avoid high-purine foods",
//       "Limit alcohol",
//       "Stay hydrated",
//       "Avoid fructose",
//       "Choose low-fat dairy",
//     ],
//     thresholds: {
//       purines: {
//         value: 100,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg purines - May raise uric acid.",
//       },
//       purinesHigh: {
//         value: 150,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ HIGH PURINES ({value}mg) - Triggers gout flare-ups.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Major gout trigger.",
//       },
//     },
//   },
//   // Neurological
//   {
//     id: 20,
//     name: "Migraine",
//     icon: "🤕",
//     color: "text-gray-700",
//     bgColor: "bg-gray-100",
//     description: "Recurrent headaches",
//     recommendations: [
//       "Identify trigger foods",
//       "Regular meal schedule",
//       "Stay hydrated",
//       "Limit caffeine",
//       "Keep headache diary",
//     ],
//     thresholds: {
//       tyramine: {
//         value: 10,
//         unit: "mg",
//         severity: "info",
//         message: "Contains tyramine - Common migraine trigger.",
//       },
//       caffeine: {
//         value: 60,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg caffeine - Can trigger migraines.",
//       },
//       msg: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "⚠️ CONTAINS MSG - Known migraine trigger.",
//       },
//       artificialSweeteners: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains artificial sweetener - May trigger migraines.",
//       },
//     },
//   },
//   {
//     id: 21,
//     name: "Epilepsy",
//     icon: "⚡",
//     color: "text-purple-700",
//     bgColor: "bg-purple-100",
//     description: "Seizure disorder",
//     recommendations: [
//       "Avoid aspartame",
//       "Limit alcohol",
//       "Maintain consistent blood sugar",
//       "Stay hydrated",
//     ],
//     thresholds: {
//       aspartame: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains aspartame - May lower seizure threshold.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Lowers seizure threshold.",
//       },
//     },
//   },
//   // Psychiatric
//   {
//     id: 22,
//     name: "Depression",
//     icon: "😔",
//     color: "text-gray-600",
//     bgColor: "bg-gray-100",
//     description: "Major depressive disorder",
//     recommendations: [
//       "Omega-3 fatty acids",
//       "Mediterranean diet",
//       "Avoid alcohol",
//       "Regular meal times",
//       "Vitamin D supplementation",
//     ],
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May cause mood crashes.",
//       },
//       alcohol: {
//         value: 1,
//         unit: "",
//         severity: "warning",
//         message: "⚠️ ALCOHOL - Depressant that worsens depression.",
//       },
//     },
//   },
//   {
//     id: 23,
//     name: "Anxiety",
//     icon: "😰",
//     color: "text-yellow-700",
//     bgColor: "bg-yellow-50",
//     description: "Anxiety disorder",
//     recommendations: [
//       "Limit caffeine",
//       "Magnesium-rich foods",
//       "Omega-3 fatty acids",
//       "Avoid alcohol",
//       "Regular meal schedule",
//     ],
//     thresholds: {
//       caffeine: {
//         value: 60,
//         unit: "mg",
//         severity: "info",
//         message: "Contains {value}mg caffeine - Increases anxiety.",
//       },
//     },
//   },
//   {
//     id: 24,
//     name: "ADHD",
//     icon: "🎯",
//     color: "text-blue-500",
//     bgColor: "bg-blue-50",
//     description: "Attention deficit disorder",
//     recommendations: [
//       "Protein-rich breakfast",
//       "Omega-3 fatty acids",
//       "Avoid artificial colors",
//       "Limit sugar",
//     ],
//     thresholds: {
//       artificialColors: {
//         value: 1,
//         unit: "",
//         severity: "info",
//         message: "Contains artificial dyes - Linked to ADHD symptoms.",
//       },
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "info",
//         message: "Contains {value}g sugar - May worsen hyperactivity.",
//       },
//     },
//   },
//   // Respiratory
//   {
//     id: 25,
//     name: "Asthma",
//     icon: "🫁",
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     description: "Chronic airway inflammation",
//     recommendations: [
//       "Avoid sulfite preservatives",
//       "Anti-inflammatory diet",
//       "Omega-3 fatty acids",
//       "Maintain healthy weight",
//     ],
//     thresholds: {
//       sulfites: {
//         value: 10,
//         unit: "mg",
//         severity: "warning",
//         message: "⚠️ CONTAINS SULFITES - Can cause bronchospasm.",
//       },
//     },
//   },
// ];

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,
//       headers: { "Content-Type": "application/json" },
//     });

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) APIService.instance = new APIService();
//     return APIService.instance;
//   }

//   async fetchFoods() {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.FOODS);
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async getOrderById(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async getGeminiFoodInsights(foodName, ingredients, nutritionInfo) {
//     if (!API_CONFIG.GEMINI_API_KEY) return null;
//     try {
//       const prompt = `As a nutrition expert, provide detailed insights about ${foodName}.
// Ingredients: ${ingredients.join(", ")}.
// Nutrition: Calories ${nutritionInfo?.calories || "N/A"} kcal, Protein ${nutritionInfo?.protein || "N/A"}g, Carbs ${nutritionInfo?.carbs || "N/A"}g, Fat ${nutritionInfo?.fat || "N/A"}g, Fiber ${nutritionInfo?.fiber || "N/A"}g, Sugar ${nutritionInfo?.sugar || "N/A"}g, Sodium ${nutritionInfo?.sodium || "N/A"}mg.

// Return JSON with these exact fields:
// {
//   "summary": "2-3 sentence nutritional summary",
//   "healthScore": number between 0-100,
//   "benefits": ["benefit1", "benefit2", "benefit3"],
//   "risks": ["risk1", "risk2"],
//   "dietaryRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
//   "bestTimeToEat": "time of day recommendation",
//   "pairingSuggestions": ["pairing1", "pairing2"],
//   "funFact": "interesting nutritional fact",
//   "alternativeSuggestions": ["healthier alternative1", "alternative2"]
// }`;

//       const response = await axios.post(
//         `${API_CONFIG.GEMINI_BASE_URL}?key=${API_CONFIG.GEMINI_API_KEY}`,
//         {
//           contents: [{ parts: [{ text: prompt }] }],
//           generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
//         },
//         { headers: { "Content-Type": "application/json" }, timeout: 10000 },
//       );
//       const aiResponse =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (aiResponse) {
//         const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
//         if (jsonMatch) return JSON.parse(jsonMatch[0]);
//       }
//       return null;
//     } catch (error) {
//       console.warn("Gemini API error:", error.message);
//       return null;
//     }
//   }

//   async analyzeWithEdamam(ingredients, title) {
//     if (!API_CONFIG.EDAMAM_APP_ID || !API_CONFIG.EDAMAM_APP_KEY) return null;
//     try {
//       const response = await axios.post(
//         `${API_CONFIG.EDAMAM_API_BASE}/nutrition-details`,
//         { title, ingr: ingredients },
//         {
//           params: {
//             app_id: API_CONFIG.EDAMAM_APP_ID,
//             app_key: API_CONFIG.EDAMAM_APP_KEY,
//           },
//           timeout: 8000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.warn("Edamam API error:", error.message);
//       return null;
//     }
//   }

//   parseEdamamNutrition(edamamData) {
//     const totalNutrients = edamamData.totalNutrients || {};
//     return {
//       calories: Math.round(edamamData.calories || 0),
//       protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
//       carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
//       fat: Math.round(totalNutrients.FAT?.quantity || 0),
//       saturatedFat: Math.round(totalNutrients.FASAT?.quantity || 0),
//       fiber: Math.round(totalNutrients.FIBTG?.quantity || 0),
//       sugar: Math.round(totalNutrients.SUGAR?.quantity || 0),
//       sodium: Math.round(totalNutrients.NA?.quantity || 0),
//       cholesterol: Math.round(totalNutrients.CHOLE?.quantity || 0),
//       potassium: Math.round(totalNutrients.K?.quantity || 0),
//       vitaminC: Math.round(totalNutrients.VITC?.quantity || 0),
//       calcium: Math.round(totalNutrients.CA?.quantity || 0),
//       iron: Math.round(totalNutrients.FE?.quantity || 0),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const nutritionDB = {
//       chicken: { calories: 165, protein: 31, fat: 3.6 },
//       beef: { calories: 250, protein: 26, fat: 17, saturatedFat: 7 },
//       salmon: { calories: 208, protein: 20, fat: 13 },
//       shrimp: { calories: 84, protein: 18, cholesterol: 166, sodium: 111 },
//       cheese: {
//         calories: 402,
//         protein: 25,
//         fat: 33,
//         saturatedFat: 21,
//         sodium: 621,
//       },
//       milk: { calories: 42, protein: 3.4, fat: 1, lactose: 4.8 },
//       cream: { calories: 345, fat: 37, saturatedFat: 23 },
//       butter: { calories: 717, fat: 81, saturatedFat: 51 },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       pasta: { calories: 158, carbs: 31, protein: 5.8 },
//       bread: { calories: 265, carbs: 49, sodium: 400 },
//       potato: { calories: 77, carbs: 17, fiber: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6 },
//       onion: { calories: 40, carbs: 9, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33 },
//       lettuce: { calories: 15, fiber: 1.3 },
//       cucumber: { calories: 15, water: 95 },
//       olive: { calories: 115, fat: 11 },
//     };

//     let estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//       potassium: 0,
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(nutritionDB)) {
//         if (ingLower.includes(key)) {
//           Object.keys(values).forEach((k) => {
//             if (k in estimated)
//               estimated[k] = (estimated[k] || 0) + (values[k] || 0);
//           });
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       const maxVal =
//         key === "calories"
//           ? 1200
//           : key === "sodium"
//             ? 1500
//             : key === "sugar"
//               ? 40
//               : key === "saturatedFat"
//                 ? 25
//                 : key === "cholesterol"
//                   ? 200
//                   : 100;
//       estimated[key] = Math.min(
//         maxVal,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });
//     return estimated;
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null,
//       nutritionSource = null,
//       geminiInsights = null;
//     try {
//       const edamamResult = await this.analyzeWithEdamam(
//         item.ingredients,
//         item.name,
//       );
//       if (edamamResult?.calories) {
//         nutritionalInfo = this.parseEdamamNutrition(edamamResult);
//         nutritionSource = "Edamam Nutrition API";
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }
//     try {
//       geminiInsights = await this.getGeminiFoodInsights(
//         item.name,
//         item.ingredients,
//         nutritionalInfo,
//       );
//     } catch (error) {
//       console.log("Gemini insights error:", error);
//     }
//     return { nutritionalInfo, nutritionSource, geminiInsights };
//   }

//   handleError(error) {
//     if (error.response)
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error",
//       };
//     if (error.request)
//       return { status: 0, message: "Network error - Unable to connect" };
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//     };
//   }
// }

// // ========== COMPREHENSIVE FOOD ANALYSIS FUNCTION ==========
// const analyzeFoodFully = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const ingredients = item.ingredients || [];
//   const analysis = {
//     allergens: [],
//     nutritionalConcerns: [],
//     clinicalConditions: [],
//     totalIssues: 0,
//     severityLevel: "safe",
//   };

//   const containsIngredient = (keywords) => {
//     const keywordList = Array.isArray(keywords) ? keywords : [keywords];
//     return ingredients.some((ing) =>
//       keywordList.some((kw) => ing.toLowerCase().includes(kw.toLowerCase())),
//     );
//   };

//   for (const [allergenKey, allergenInfo] of Object.entries(ALLERGEN_DATABASE)) {
//     if (containsIngredient(allergenInfo.keywords)) {
//       analysis.allergens.push({
//         name: allergenInfo.name,
//         severity: allergenInfo.severity,
//         message: allergenInfo.message,
//       });
//       if (allergenInfo.severity === "critical")
//         analysis.severityLevel = "critical";
//       else if (
//         allergenInfo.severity === "high" &&
//         analysis.severityLevel !== "critical"
//       )
//         analysis.severityLevel = "warning";
//     }
//   }

//   if (nutrition.sugar) {
//     if (nutrition.sugar >= 40) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSugar,
//         value: nutrition.sugar,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.sugar >= 25) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSugar,
//         value: nutrition.sugar,
//       });
//       if (
//         analysis.severityLevel !== "critical" &&
//         analysis.severityLevel !== "warning"
//       )
//         analysis.severityLevel = "warning";
//     }
//   }

//   if (nutrition.sodium) {
//     if (nutrition.sodium >= 1200) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSodium,
//         value: nutrition.sodium,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.sodium >= 800) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSodium,
//         value: nutrition.sodium,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   if (nutrition.saturatedFat) {
//     if (nutrition.saturatedFat >= 20) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighSaturatedFat,
//         value: nutrition.saturatedFat,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "critical";
//     } else if (nutrition.saturatedFat >= 12) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highSaturatedFat,
//         value: nutrition.saturatedFat,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   if (nutrition.cholesterol) {
//     if (nutrition.cholesterol >= 300) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCholesterol,
//         value: nutrition.cholesterol,
//       });
//       if (analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     } else if (nutrition.cholesterol >= 200) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCholesterol,
//         value: nutrition.cholesterol,
//       });
//     }
//   }

//   if (nutrition.carbs) {
//     if (nutrition.carbs >= 80) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCarbs,
//         value: nutrition.carbs,
//       });
//     } else if (nutrition.carbs >= 50) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCarbs,
//         value: nutrition.carbs,
//       });
//     }
//   }

//   if (nutrition.calories) {
//     if (nutrition.calories >= 900) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.veryHighCalories,
//         value: nutrition.calories,
//       });
//     } else if (nutrition.calories >= 600) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCalories,
//         value: nutrition.calories,
//       });
//     }
//   }

//   if (
//     nutrition.fiber !== undefined &&
//     nutrition.fiber < 3 &&
//     nutrition.fiber > 0
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.lowFiber,
//       value: nutrition.fiber,
//     });
//   }

//   if (containsIngredient(["alcohol", "beer", "wine", "liquor", "spirit"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAlcohol);
//   }

//   if (containsIngredient(["caffeine", "coffee", "tea", "energy drink"])) {
//     const caffeineAmount = containsIngredient(["energy drink"]) ? 150 : 80;
//     if (caffeineAmount >= 150) {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.highCaffeine,
//         value: caffeineAmount,
//       });
//     } else {
//       analysis.nutritionalConcerns.push({
//         ...NUTRITIONAL_CONCERNS.containsCaffeine,
//         value: caffeineAmount,
//       });
//     }
//   }

//   if (containsIngredient(["msg", "monosodium glutamate"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsMSG);
//   }

//   if (
//     containsIngredient(["red 40", "yellow 5", "blue 1", "artificial color"])
//   ) {
//     analysis.nutritionalConcerns.push(
//       NUTRITIONAL_CONCERNS.containsArtificialColors,
//     );
//   }

//   if (containsIngredient(["aspartame"])) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAspartame);
//   }

//   if (
//     containsIngredient([
//       "spinach",
//       "rhubarb",
//       "beets",
//       "nuts",
//       "chocolate",
//       "tea",
//     ])
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highOxalate,
//       value: 85,
//     });
//   }

//   if (containsIngredient(["banana", "potato", "avocado", "spinach"])) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highPotassium,
//       value: 550,
//     });
//   }

//   if (
//     containsIngredient(["broccoli", "cabbage", "kale", "cauliflower", "soy"])
//   ) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsGoitrogens);
//   }

//   if (
//     containsIngredient([
//       "onion",
//       "garlic",
//       "wheat",
//       "beans",
//       "lentils",
//       "cashew",
//     ])
//   ) {
//     analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsFODMAPs);
//   }

//   if (
//     containsIngredient(["anchovy", "sardine", "liver", "kidney", "mackerel"])
//   ) {
//     analysis.nutritionalConcerns.push({
//       ...NUTRITIONAL_CONCERNS.highPurine,
//       value: 180,
//     });
//   }

//   for (const condition of CLINICAL_CONDITIONS) {
//     let matched = false;
//     let message = null;
//     let severity = "info";

//     if (condition.thresholds) {
//       if (
//         condition.thresholds.sugarHigh &&
//         nutrition.sugar >= condition.thresholds.sugarHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.sugar &&
//         nutrition.sugar >= condition.thresholds.sugar.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (
//         condition.thresholds.sodiumHigh &&
//         nutrition.sodium >= condition.thresholds.sodiumHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.sodium &&
//         nutrition.sodium >= condition.thresholds.sodium.value
//       ) {
//         matched = true;
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (
//         condition.thresholds.saturatedFatHigh &&
//         nutrition.saturatedFat >= condition.thresholds.saturatedFatHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.saturatedFat &&
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat.value
//       ) {
//         matched = true;
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (
//         condition.thresholds.cholesterolHigh &&
//         nutrition.cholesterol >= condition.thresholds.cholesterolHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.cholesterol &&
//         nutrition.cholesterol >= condition.thresholds.cholesterol.value
//       ) {
//         matched = true;
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (
//         condition.thresholds.carbsHigh &&
//         nutrition.carbs >= condition.thresholds.carbsHigh.value
//       ) {
//         matched = true;
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//         severity = "warning";
//       } else if (
//         condition.thresholds.carbs &&
//         nutrition.carbs >= condition.thresholds.carbs.value
//       ) {
//         matched = true;
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (
//         condition.thresholds.caffeine &&
//         nutrition.caffeine >= condition.thresholds.caffeine.value
//       ) {
//         matched = true;
//         message = condition.thresholds.caffeine.message.replace(
//           "{value}",
//           nutrition.caffeine,
//         );
//       } else if (
//         condition.thresholds.alcohol &&
//         containsIngredient(["alcohol", "beer", "wine", "liquor"])
//       ) {
//         matched = true;
//         message = condition.thresholds.alcohol.message;
//       } else if (
//         condition.thresholds.goitrogens &&
//         containsIngredient([
//           "broccoli",
//           "cabbage",
//           "kale",
//           "cauliflower",
//           "soy",
//         ])
//       ) {
//         matched = true;
//         message = condition.thresholds.goitrogens.message;
//       } else if (
//         condition.thresholds.msg &&
//         containsIngredient(["msg", "monosodium glutamate"])
//       ) {
//         matched = true;
//         message = condition.thresholds.msg.message;
//       } else if (
//         condition.thresholds.artificialSweeteners &&
//         containsIngredient(["aspartame", "sucralose", "saccharin"])
//       ) {
//         matched = true;
//         message = condition.thresholds.artificialSweeteners.message;
//       }
//     }

//     if (matched && message) {
//       analysis.clinicalConditions.push({
//         conditionId: condition.id,
//         name: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         severity: severity,
//         message: message,
//         recommendations: condition.recommendations,
//       });
//       if (severity === "warning" && analysis.severityLevel !== "critical")
//         analysis.severityLevel = "warning";
//     }
//   }

//   analysis.totalIssues =
//     analysis.allergens.length +
//     analysis.nutritionalConcerns.length +
//     analysis.clinicalConditions.length;

//   return analysis;
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     {
//       label: "Calories",
//       value: nutrition.calories,
//       unit: "kcal",
//       icon: "🔥",
//       color: "text-orange-600",
//     },
//     {
//       label: "Protein",
//       value: nutrition.protein,
//       unit: "g",
//       icon: "💪",
//       color: "text-blue-600",
//     },
//     {
//       label: "Carbs",
//       value: nutrition.carbs,
//       unit: "g",
//       icon: "🍚",
//       color: "text-yellow-600",
//     },
//     {
//       label: "Fiber",
//       value: nutrition.fiber,
//       unit: "g",
//       icon: "🌿",
//       color: "text-green-600",
//     },
//     {
//       label: "Fat",
//       value: nutrition.fat,
//       unit: "g",
//       icon: "🥑",
//       color: "text-purple-600",
//     },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//       color: "text-red-600",
//     },
//     {
//       label: "Sugar",
//       value: nutrition.sugar,
//       unit: "g",
//       icon: "🍬",
//       color: "text-pink-600",
//     },
//     {
//       label: "Sodium",
//       value: nutrition.sodium,
//       unit: "mg",
//       icon: "🧂",
//       color: "text-gray-600",
//     },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//       color: "text-red-500",
//     },
//     {
//       label: "Potassium",
//       value: nutrition.potassium,
//       unit: "mg",
//       icon: "🍌",
//       color: "text-purple-500",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null && n.value > 0);
// };

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [currentApi, setCurrentApi] = useState("edamam");

//   const loadingSteps = [
//     {
//       message: "Connecting to Edamam Nutrition API...",
//       icon: "🔬",
//       api: "edamam",
//     },
//     { message: "Analyzing recipe ingredients...", icon: "🥗", api: "edamam" },
//     {
//       message: "Calculating nutritional values...",
//       icon: "📊",
//       api: "analysis",
//     },
//     { message: "Scanning for allergens...", icon: "⚠️", api: "allergens" },
//     {
//       message: "Checking nutritional concerns...",
//       icon: "🔍",
//       api: "concerns",
//     },
//     {
//       message: "Analyzing clinical conditions...",
//       icon: "🩺",
//       api: "clinical",
//     },
//     { message: "Generating AI insights...", icon: "🤖", api: "gemini" },
//     {
//       message: "Preparing recommendations...",
//       icon: "💚",
//       api: "recommendations",
//     },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       return;
//     }
//     const interval = setInterval(
//       () => setProgress((p) => (p >= 100 ? 100 : p + 1.5)),
//       40,
//     );
//     const stepInterval = setInterval(
//       () =>
//         setLoadingStep((prev) => {
//           const newStep = prev < loadingSteps.length - 1 ? prev + 1 : prev;
//           if (loadingSteps[newStep]?.api)
//             setCurrentApi(loadingSteps[newStep].api);
//           return newStep;
//         }),
//       600,
//     );
//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div
//           className={`bg-gradient-to-r ${CATEGORY_COLORS[itemCategory] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative overflow-hidden`}
//         >
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute -top-10 -right-10 text-8xl animate-spin-slow">
//               🍽️
//             </div>
//           </div>
//           <div className="flex items-center gap-2 sm:gap-3 relative z-10">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="bg-white/20 p-1.5 sm:p-2 rounded-full"
//             >
//               {currentApi === "gemini" ? (
//                 <AIIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "edamam" ? (
//                 <ScienceIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "allergens" ? (
//                 <DangerousIcon className="text-xl sm:text-2xl" />
//               ) : currentApi === "clinical" ? (
//                 <LocalHospitalIcon className="text-xl sm:text-2xl" />
//               ) : (
//                 <RestaurantIcon className="text-xl sm:text-2xl" />
//               )}
//             </motion.div>
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-base sm:text-xl truncate">
//                 Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//               </h2>
//               <p className="text-white/80 text-xs sm:text-sm truncate">
//                 {itemName}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//           <div>
//             <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
//               <span>Comprehensive health analysis in progress...</span>
//               <span className="font-mono font-bold text-orange-600">
//                 {progress}%
//               </span>
//             </div>
//             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//                 initial={{ width: "0%" }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.1 }}
//               />
//             </div>
//           </div>
//           <div className="space-y-2 sm:space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-2 sm:gap-3"
//               >
//                 <div
//                   className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${loadingStep > idx ? "bg-green-500 text-white" : loadingStep === idx ? "bg-orange-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"}`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </div>
//                 <span
//                   className={`text-xs sm:text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"} flex-1`}
//                 >
//                   {step.message}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//           <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-2 sm:p-3 border border-orange-100">
//             <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
//               <span className="text-orange-500">🔌</span> Analysis Status:
//             </p>
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "edamam" ? "bg-green-500 animate-pulse" : loadingStep > 0 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Nutrition</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "allergens" ? "bg-red-500 animate-pulse" : loadingStep > 3 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Allergens</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "clinical" ? "bg-yellow-500 animate-pulse" : loadingStep > 5 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">Conditions</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div
//                   className={`w-1.5 h-1.5 rounded-full ${currentApi === "gemini" ? "bg-purple-500 animate-pulse" : loadingStep > 6 ? "bg-green-300" : "bg-gray-300"}`}
//                 />
//                 <span className="text-[9px] sm:text-xs">AI Insights</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-center text-[9px] sm:text-xs text-gray-400">
//             ✨ Analyzing allergens, nutritional concerns, and 25+ health
//             conditions
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== RESULT MODAL ==========
// const ResultModal = ({
//   isOpen,
//   onClose,
//   type,
//   title,
//   message,
//   onTrackOrder,
// }) => {
//   if (!isOpen) return null;
//   const hasOrderId = message && message.includes("Order ID:");
//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 20 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 20 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
//       >
//         <div
//           className={`p-5 text-center ${type === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}
//         >
//           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
//             {type === "success" ? (
//               <CheckCircleIcon className="text-white text-4xl" />
//             ) : (
//               <ErrorIcon className="text-white text-4xl" />
//             )}
//           </div>
//           <h2 className="text-white font-bold text-xl">{title}</h2>
//         </div>
//         <div className="p-6">
//           {hasOrderId ? (
//             <div className="space-y-4">
//               {message.split("\n").map((line, idx) => {
//                 if (line.includes("Order ID:")) {
//                   const orderId = line.split("Order ID:")[1]?.trim();
//                   return (
//                     <div
//                       key={idx}
//                       className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200"
//                     >
//                       <div className="flex items-center gap-2 mb-2">
//                         <ConfirmationNumberIcon className="text-orange-600 text-sm" />
//                         <span className="text-xs text-orange-600 font-semibold uppercase tracking-wide">
//                           Order ID
//                         </span>
//                       </div>
//                       <p className="text-gray-800 font-mono font-bold text-xl tracking-wider text-center">
//                         {orderId}
//                       </p>
//                       <p className="text-xs text-gray-500 text-center mt-2">
//                         ⭐ Save this ID to track your order
//                       </p>
//                     </div>
//                   );
//                 } else if (line.includes("Thank you")) {
//                   return (
//                     <div key={idx} className="text-center">
//                       <p className="text-gray-800 font-bold text-lg">{line}</p>
//                     </div>
//                   );
//                 } else if (line.includes("📍 Table:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2"
//                     >
//                       <TableIcon className="text-sm text-orange-500" />
//                       <span className="text-sm font-medium">
//                         {line.replace("📍 ", "")}
//                       </span>
//                     </div>
//                   );
//                 } else if (line.includes("💰 Total:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="bg-gray-100 rounded-xl p-3 text-center"
//                     >
//                       <p className="text-gray-500 text-xs">Total Amount</p>
//                       <p className="text-orange-600 font-bold text-2xl">
//                         {line.split("💰")[1]?.trim() || line}
//                       </p>
//                     </div>
//                   );
//                 } else if (line.includes("⏱️ Est. time:")) {
//                   return (
//                     <div
//                       key={idx}
//                       className="flex items-center justify-center gap-2 text-gray-600 bg-blue-50 rounded-xl p-2"
//                     >
//                       <TimerIcon className="text-blue-500 text-sm" />
//                       <span className="text-sm font-medium">
//                         {line.replace("⏱️ ", "")}
//                       </span>
//                     </div>
//                   );
//                 } else if (line.trim() && !line.includes("🆔")) {
//                   return (
//                     <p key={idx} className="text-gray-600 text-center text-sm">
//                       {line}
//                     </p>
//                   );
//                 }
//                 return null;
//               })}
//             </div>
//           ) : (
//             <p className="text-gray-600 text-center whitespace-pre-line">
//               {message}
//             </p>
//           )}
//           <div className="mt-6 space-y-2">
//             {hasOrderId && onTrackOrder && (
//               <button
//                 onClick={() => {
//                   onClose();
//                   onTrackOrder();
//                 }}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
//               >
//                 <SearchIcon fontSize="small" />
//                 Track My Order Now
//               </button>
//             )}
//             <button
//               onClick={onClose}
//               className={`w-full ${hasOrderId ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"} py-3 rounded-xl font-semibold transition`}
//             >
//               {hasOrderId ? "Continue Browsing" : "OK"}
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== COMPREHENSIVE ANALYSIS RESULT MODAL ==========
// const AnalysisResultModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const healthScore =
//     item?.geminiInsights?.healthScore ||
//     Math.max(0, 100 - analysis.totalIssues * 5);

//   const severityColors = {
//     critical: "bg-red-600",
//     warning: "bg-orange-500",
//     info: "bg-blue-500",
//   };

//   const severityBadge = (severity) => {
//     const badges = {
//       critical: "bg-red-600 text-white",
//       warning: "bg-orange-500 text-white",
//       high: "bg-red-500 text-white",
//       moderate: "bg-yellow-500 text-white",
//       info: "bg-blue-500 text-white",
//       mild: "bg-green-500 text-white",
//     };
//     return badges[severity] || "bg-gray-500 text-white";
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 50 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div
//           className={`bg-gradient-to-r ${CATEGORY_COLORS[item?.category] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative flex-shrink-0`}
//         >
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute -top-10 -right-10 text-8xl">🍽️</div>
//           </div>
//           <div className="flex items-center justify-between relative z-10">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <h2 className="font-bold text-lg sm:text-xl truncate">
//                   {item?.name}
//                 </h2>
//                 <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
//                   <StarIcon className="text-yellow-300 text-sm" />
//                   <span>Health Score: {healthScore}/100</span>
//                 </div>
//                 {analysis.severityLevel !== "safe" && (
//                   <div
//                     className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${severityColors[analysis.severityLevel]} bg-opacity-80`}
//                   >
//                     <WarningIcon className="text-white text-sm" />
//                     <span>{analysis.severityLevel.toUpperCase()}</span>
//                   </div>
//                 )}
//               </div>
//               <p className="text-white/80 text-xs sm:text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
//           {item?.geminiInsights?.summary && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <AIIcon className="text-purple-600 text-sm" />
//                 <h3 className="font-semibold text-purple-800 text-sm">
//                   AI Nutritional Summary
//                 </h3>
//               </div>
//               <p className="text-gray-700 text-xs sm:text-sm">
//                 {item.geminiInsights.summary}
//               </p>
//             </motion.div>
//           )}

//           {item?.geminiInsights?.benefits?.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border border-green-200"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <FavoriteIcon className="text-green-600 text-sm" />
//                 <h3 className="font-semibold text-green-800 text-sm">
//                   Health Benefits
//                 </h3>
//               </div>
//               <ul className="space-y-1">
//                 {item.geminiInsights.benefits
//                   .slice(0, 3)
//                   .map((benefit, idx) => (
//                     <li
//                       key={idx}
//                       className="text-gray-700 text-xs sm:text-sm flex items-start gap-2"
//                     >
//                       <CheckIcon className="text-green-500 text-sm mt-0.5" />
//                       <span>{benefit}</span>
//                     </li>
//                   ))}
//               </ul>
//             </motion.div>
//           )}

//           {analysis.allergens.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 sm:p-4 border-2 border-red-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <DangerousIcon className="text-red-600 text-sm" />
//                 <h3 className="font-semibold text-red-800 text-sm">
//                   ⚠️ Allergen Alert
//                 </h3>
//               </div>
//               <div className="space-y-2">
//                 {analysis.allergens.map((allergen, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-lg p-2 border border-red-200"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="font-bold text-red-700 text-sm">
//                         {allergen.name}
//                       </span>
//                       <span
//                         className={`text-[10px] px-2 py-0.5 rounded-full ${allergen.severity === "critical" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
//                       >
//                         {allergen.severity.toUpperCase()}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-700 mt-1">
//                       {allergen.message}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {analysis.nutritionalConcerns.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 sm:p-4 border border-yellow-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <WarningIcon className="text-yellow-600 text-sm" />
//                 <h3 className="font-semibold text-yellow-800 text-sm">
//                   Nutritional Considerations
//                 </h3>
//               </div>
//               <div className="space-y-1.5">
//                 {analysis.nutritionalConcerns
//                   .slice(0, 5)
//                   .map((concern, idx) => (
//                     <div key={idx} className="flex items-start gap-2 text-xs">
//                       <WarningAmberIcon className="text-yellow-600 text-sm mt-0.5" />
//                       <span className="text-gray-700">
//                         {concern.message.replace("{value}", concern.value)}
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}

//           {analysis.clinicalConditions.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <LocalHospitalIcon className="text-blue-600 text-sm" />
//                 <h3 className="font-semibold text-blue-800 text-sm">
//                   Health Condition Alerts
//                 </h3>
//               </div>
//               <div className="space-y-2">
//                 {analysis.clinicalConditions
//                   .slice(0, 5)
//                   .map((condition, idx) => (
//                     <div
//                       key={idx}
//                       className={`${condition.bgColor} rounded-lg p-2`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{condition.icon}</span>
//                         <div className="flex-1">
//                           <div className="flex items-center justify-between flex-wrap gap-1">
//                             <span className="font-medium text-gray-800 text-sm">
//                               {condition.name}
//                             </span>
//                             <span
//                               className={`text-[8px] px-1.5 py-0.5 rounded-full ${severityBadge(condition.severity)}`}
//                             >
//                               {condition.severity?.toUpperCase() || "INFO"}
//                             </span>
//                           </div>
//                           <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
//                             {condition.message}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </motion.div>
//           )}

//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Ingredients
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   ({item?.ingredients?.length || 0} items)
//                 </span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 className="mt-2 p-3 bg-gray-50 rounded-xl"
//               >
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                   {item?.ingredients?.map((ing, idx) => {
//                     let hasAllergen = false;
//                     for (const [key, allergen] of Object.entries(
//                       ALLERGEN_DATABASE,
//                     )) {
//                       if (
//                         allergen.keywords.some((kw) =>
//                           ing.toLowerCase().includes(kw.toLowerCase()),
//                         )
//                       ) {
//                         hasAllergen = true;
//                         break;
//                       }
//                     }
//                     return (
//                       <span
//                         key={idx}
//                         className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm border ${hasAllergen ? "bg-red-100 border-red-300 text-red-700 font-medium" : "bg-white border-orange-100"}`}
//                       >
//                         {ing} {hasAllergen && "⚠️"}
//                       </span>
//                     );
//                   })}
//                 </div>
//                 {analysis.allergens.length > 0 && (
//                   <div className="mt-3 pt-2 border-t border-red-200">
//                     <p className="text-[10px] text-red-600 flex items-center gap-1">
//                       <DangerousIcon className="text-[12px]" /> Ingredients
//                       marked with ⚠️ contain common allergens
//                     </p>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </div>

//           {nutritionInfo.length > 0 && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "nutrition" ? null : "nutrition",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Nutrition Facts
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   className="mt-2 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl"
//                 >
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className={`text-[11px] sm:text-sm ${n.color}`}>
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3 pt-2 border-t border-emerald-200 text-center">
//                     <p className="text-[10px] text-gray-500">
//                       💡 Individual needs may vary. Consult a healthcare
//                       provider for personalized advice.
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           )}

//           <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
//             <div className="grid grid-cols-3 gap-2 text-center">
//               <div>
//                 <div className="text-2xl font-bold text-red-600">
//                   {analysis.allergens.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Allergens</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-yellow-600">
//                   {analysis.nutritionalConcerns.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Concerns</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-blue-600">
//                   {analysis.clinicalConditions.length}
//                 </div>
//                 <div className="text-[10px] text-gray-600">Conditions</div>
//               </div>
//             </div>
//           </div>

//           {item?.geminiInsights?.funFact && (
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
//               <div className="flex items-center gap-2">
//                 <LightbulbIcon className="text-indigo-600 text-sm" />
//                 <h3 className="font-semibold text-indigo-800 text-sm">
//                   Did You Know?
//                 </h3>
//               </div>
//               <p className="text-gray-700 text-xs mt-1">
//                 {item.geminiInsights.funFact}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-300 transition"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== TABLE SELECTOR MODAL ==========
// const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
//   const [tableNumber, setTableNumber] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   if (!isOpen) return null;
//   const handleConfirm = async () => {
//     if (!tableNumber || !customerName) {
//       toast.error("Please enter table number and name");
//       return;
//     }
//     setIsLoading(true);
//     await onConfirm(tableNumber, customerName);
//     setIsLoading(false);
//   };
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10 overflow-hidden"
//       >
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div className="absolute -top-20 -right-20 text-9xl">🍽️</div>
//           <div className="absolute -bottom-20 -left-20 text-9xl">🍕</div>
//         </div>
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 relative">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-xs mt-1">
//             Comprehensive Health Analysis • Allergens • Nutrition • 25+
//             Conditions
//           </p>
//         </div>
//         <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={isLoading}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
//           >
//             {isLoading ? "Loading..." : "Start Ordering"}
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         transition={{ type: "spring", damping: 25, stiffness: 400 }}
//         className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-8">
//               <CartIcon className="text-gray-300 text-4xl mx-auto mb-2" />
//               <p className="text-gray-500">Your cart is empty</p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div
//                 key={item.cartId}
//                 className="mb-3 pb-3 border-b border-orange-100"
//               >
//                 <div className="flex justify-between gap-2">
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-sm truncate">
//                       {item.name}
//                     </h3>
//                     {item.customizations?.length > 0 && (
//                       <div className="text-[10px] text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-[10px] text-orange-600">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold text-sm">
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
//                   <span className="w-8 text-center text-sm">
//                     {item.quantity}
//                   </span>
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
//           <div className="p-3 sm:p-4 border-t flex-shrink-0">
//             <div className="flex justify-between font-bold mb-3">
//               <span>Total</span>
//               <span className="text-orange-600">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({
//   isOpen,
//   onClose,
//   onCheckOrder,
//   liveStatus,
//   initialOrderId = "",
// }) => {
//   const [orderId, setOrderId] = useState(initialOrderId);
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const handleCheckOrder = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }
//     setIsLoading(true);
//     setError(null);
//     setOrderDetails(null);
//     try {
//       const result = await onCheckOrder(orderId);
//       if (result && result.success === true && result.data) {
//         const orderData = result.data;
//         const transformedOrder = {
//           orderId: orderData.orderId || "N/A",
//           customerName: orderData.personDetails?.name || "N/A",
//           tableNumber: orderData.personDetails?.tableNumber || "N/A",
//           status: orderData.status || "unknown",
//           items: (orderData.items || []).map((item) => ({
//             name: item.name,
//             quantity: item.quantity,
//             finalPrice: item.finalPrice,
//           })),
//           total: (orderData.items || []).reduce(
//             (sum, item) => sum + (item.finalPrice || 0),
//             0,
//           ),
//         };
//         setOrderDetails(transformedOrder);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else {
//         setError("Order not found. Please check the Order ID.");
//         toast.error("Order not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch order details.");
//       toast.error("Failed to fetch order");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "preparing":
//         return "bg-yellow-100 text-yellow-800";
//       case "ready":
//         return "bg-green-100 text-green-800";
//       case "completed":
//         return "bg-purple-100 text-purple-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };
//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return <CheckCircleIcon className="text-blue-500" />;
//       case "preparing":
//         return <TimerIcon className="text-yellow-500 animate-pulse" />;
//       case "ready":
//         return <CheckCircleIcon className="text-green-500" />;
//       case "completed":
//         return <CheckCircleIcon className="text-purple-500" />;
//       case "cancelled":
//         return <ErrorIcon className="text-red-500" />;
//       default:
//         return <InfoIcon className="text-gray-500" />;
//     }
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl flex flex-col relative z-10 max-h-[90vh]"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
//           <div className="flex items-center gap-2">
//             <ConfirmationNumberIcon className="text-white" />
//             <h2 className="text-white font-bold text-base sm:text-xl">
//               Track Your Order
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="p-3 sm:p-5 overflow-y-auto flex-1">
//           <div className="flex flex-col sm:flex-row gap-2 mb-4">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 placeholder="Enter your Order ID"
//                 className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-400"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
//               />
//             </div>
//             <button
//               onClick={handleCheckOrder}
//               disabled={isLoading}
//               className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>
//           {error && (
//             <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
//               <ErrorIcon fontSize="small" /> {error}
//             </div>
//           )}
//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-3"
//             >
//               <div
//                 className={`rounded-xl p-3 border-2 ${getStatusColor(orderDetails.status)}`}
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     {getStatusIcon(orderDetails.status)}
//                     <span className="font-mono text-xs">
//                       ID: {orderDetails.orderId}
//                     </span>
//                   </div>
//                   <span className="text-lg font-bold capitalize">
//                     {orderDetails.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
//                   <PersonIcon fontSize="small" className="text-gray-500" />
//                   <p className="font-semibold">
//                     {orderDetails.customerName || "N/A"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3">
//                   <TableIcon fontSize="small" className="text-gray-500" />
//                   <p className="font-semibold">
//                     Table {orderDetails.tableNumber || "N/A"}
//                   </p>
//                 </div>
//               </div>
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <h3 className="font-semibold mb-2 text-sm">
//                   Items ({orderDetails.items?.length || 0})
//                 </h3>
//                 {orderDetails.items?.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between py-1 border-b text-sm"
//                   >
//                     <span>
//                       {item.quantity}x {item.name}
//                     </span>
//                     <span>RWF {item.finalPrice?.toLocaleString()}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between font-bold pt-2 mt-2 border-t">
//                   <span>Total</span>
//                   <span>RWF {orderDetails.total?.toLocaleString()}</span>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//         <div className="p-3 border-t bg-gray-50 rounded-b-xl">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-200 py-2 rounded-xl font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);
//   if (!isOpen) return null;

//   const customizationOptions = [
//     { label: "No salt", category: "Sodium", icon: "🧂" },
//     { label: "Low sodium", category: "Sodium", icon: "🧂" },
//     { label: "No MSG", category: "Additives", icon: "⚠️" },
//     { label: "Less oil", category: "Fat", icon: "🫒" },
//     { label: "No oil", category: "Fat", icon: "🫒" },
//     { label: "Use olive oil", category: "Fat", icon: "🫒" },
//     { label: "No butter", category: "Dairy", icon: "🧈" },
//     { label: "Extra spicy", category: "Flavor", icon: "🌶️" },
//     { label: "Mild spice", category: "Flavor", icon: "🌶️" },
//     { label: "No spice", category: "Flavor", icon: "🌶️" },
//     { label: "No onions", category: "Allium", icon: "🧅" },
//     { label: "No garlic", category: "Allium", icon: "🧄" },
//     { label: "Gluten-free", category: "Allergen", icon: "🌾" },
//     { label: "Dairy-free", category: "Allergen", icon: "🥛" },
//     { label: "Egg-free", category: "Allergen", icon: "🥚" },
//     { label: "Nut-free", category: "Allergen", icon: "🥜" },
//     { label: "Vegan", category: "Diet", icon: "🌱" },
//     { label: "Vegetarian", category: "Diet", icon: "🥬" },
//     { label: "Keto-friendly", category: "Diet", icon: "🥓" },
//     { label: "Low carb", category: "Diet", icon: "🍞" },
//     { label: "High protein", category: "Diet", icon: "💪" },
//     { label: "Extra cheese", category: "Topping", icon: "🧀" },
//     { label: "No cheese", category: "Topping", icon: "🧀" },
//     { label: "No added sugar", category: "Sugar", icon: "🍬" },
//     { label: "Grilled instead of fried", category: "Cooking", icon: "🔥" },
//     { label: "Baked instead of fried", category: "Cooking", icon: "🔥" },
//     { label: "Half portion", category: "Portion", icon: "📏" },
//     { label: "Extra vegetables", category: "Nutrition", icon: "🥗" },
//   ];

//   const groupedOptions = customizationOptions.reduce((acc, opt) => {
//     if (!acc[opt.category]) acc[opt.category] = [];
//     acc[opt.category].push(opt);
//     return acc;
//   }, {});

//   const toggleCustomization = (opt) => {
//     if (customizations.includes(opt.label))
//       setCustomizations((prev) => prev.filter((c) => c !== opt.label));
//     else setCustomizations((prev) => [...prev, opt.label]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-xl flex justify-between">
//           <h2 className="text-white font-bold flex items-center gap-2">
//             <EditIcon /> Customize {item?.name}
//           </h2>
//           <button onClick={onClose} className="p-1 bg-white/20 rounded-full">
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">🥗 Ingredients</h3>
//             <div className="flex flex-wrap gap-1">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2 py-1 bg-gray-100 rounded-full text-xs"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex justify-between p-2 bg-orange-50 rounded-xl"
//             >
//               <span>
//                 ✨ Customization Options{" "}
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-1 rounded-full ml-1">
//                     {customizations.length}
//                   </span>
//                 )}
//               </span>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 space-y-3">
//                 {Object.entries(groupedOptions).map(([category, options]) => (
//                   <div key={category}>
//                     <h4 className="text-xs font-semibold text-gray-600 mb-1">
//                       {category}
//                     </h4>
//                     <div className="grid grid-cols-2 gap-1">
//                       {options.map((opt, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => toggleCustomization(opt)}
//                           className={`px-2 py-1 rounded-lg text-xs text-left flex items-center gap-1 ${customizations.includes(opt.label) ? "bg-orange-500 text-white" : "bg-gray-100"}`}
//                         >
//                           <span>{opt.icon}</span>
//                           <span>{opt.label}</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <textarea
//             value={specialInstructions}
//             onChange={(e) => setSpecialInstructions(e.target.value)}
//             placeholder="Special instructions (e.g., allergies, preferences)..."
//             className="w-full p-2 border rounded-xl text-sm"
//             rows="3"
//           />
//         </div>
//         <div className="p-3 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-200 py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== FLOATING TIMER ==========
// const FloatingTimer = ({
//   orderId,
//   tableNumber,
//   initialDuration,
//   onExpire,
//   onOpenModal,
// }) => {
//   const [timeLeft, setTimeLeft] = useState(initialDuration);
//   useEffect(() => {
//     const interval = setInterval(
//       () =>
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(interval);
//             onExpire?.();
//             return 0;
//           }
//           return prev - 1;
//         }),
//       1000,
//     );
//     return () => clearInterval(interval);
//   }, [onExpire]);
//   const formatTime = (s) =>
//     `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";
//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-3 py-2 flex items-center gap-2`}
//     >
//       <TimerIcon className="animate-pulse" />
//       <div>
//         <span className="text-xs">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-lg font-mono font-bold block">
//           {formatTime(timeLeft)}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// // ========== PAYMENT MODAL ==========
// const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentConfirm, orderId }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmitPayment = async () => {
//     if (!phoneNumber || phoneNumber.length < 9) {
//       toast.error("Please enter a valid MTN Rwanda phone number");
//       return;
//     }
//     setIsProcessing(true);
//     // Simulate MOMO payment API call
//     setTimeout(() => {
//       setIsProcessing(false);
//       onPaymentConfirm(phoneNumber);
//       onClose();
//       toast.success(`Payment of RWF ${totalAmount.toLocaleString()} via Mobile Money successful!`);
//     }, 1500);
//   };

//   return (
//     <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
//       >
//         <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white">
//           <div className="flex items-center gap-2">
//             <span className="text-2xl">💰</span>
//             <h2 className="text-xl font-bold">Complete Payment</h2>
//           </div>
//           <p className="text-green-100 text-sm mt-1">
//             Order ID: {orderId?.slice(-8) || "N/A"}
//           </p>
//           <p className="text-white text-2xl font-bold mt-2">
//             RWF {totalAmount.toLocaleString()}
//           </p>
//         </div>

//         <div className="p-5 space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               MTN Rwanda Phone Number
//             </label>
//             <div className="flex items-center gap-2">
//               <span className="bg-gray-100 px-3 py-2 rounded-lg text-gray-600">
//                 +250
//               </span>
//               <input
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="78XXXXXXX"
//                 className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               Enter the phone number registered with MTN Mobile Money
//             </p>
//           </div>

//           <div className="bg-blue-50 rounded-lg p-3">
//             <p className="text-xs text-blue-700 flex items-start gap-2">
//               <InfoIcon className="text-sm mt-0.5" />
//               You will receive a payment request on your phone. Approve it to complete your order.
//             </p>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button
//               onClick={onClose}
//               className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmitPayment}
//               disabled={isProcessing}
//               className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               {isProcessing ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 `Pay RWF ${totalAmount.toLocaleString()}`
//               )}
//             </button>
//           </div>
//         </div>
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
//   const [showAnalysisModal, setShowAnalysisModal] = useState(false);
//   const [showCustomModal, setShowCustomModal] = useState(false);
//   const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [currentItem, setCurrentItem] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeOrder, setActiveOrder] = useState(null);
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [isLoadingMenu, setIsLoadingMenu] = useState(true);
//   const [menuError, setMenuError] = useState(null);
//   const [createdOrderData, setCreatedOrderData] = useState(null);
//   const [createdOrderTotal, setCreatedOrderTotal] = useState(0);
//   const [createdOrderId, setCreatedOrderId] = useState("");

//   const apiService = useMemo(() => APIService.getInstance(), []);
//   const handleGetOrderById = useCallback(
//     async (orderId) => apiService.getOrderById(orderId),
//     [apiService],
//   );

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       setIsLoadingMenu(true);
//       setMenuError(null);
//       try {
//         const response = await apiService.fetchFoods();
//         if (response && response.success && response.foods) {
//           const transformedItems = response.foods.map((food) => ({
//             id: food._id,
//             name: food.name,
//             price: food.price,
//             ingredients: food.ingredients || [],
//             description: food.description || "",
//             prepTime: food.prepTime || 15,
//             category: food.category || "Mains",
//             image:
//               food.image ||
//               "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//             containsGluten: food.containsGluten || false,
//             containsPeanuts: food.containsPeanuts || false,
//             containsDairy: food.containsDairy || false,
//             containsShellfish: food.containsShellfish || false,
//             containsAlcohol: food.containsAlcohol || false,
//             nutritionalInfo: null,
//             nutritionSource: null,
//             geminiInsights: null,
//           }));
//           setMenuItems(transformedItems);
//           toast.success(`Loaded ${transformedItems.length} menu items!`);
//         } else throw new Error("Invalid response format");
//       } catch (error) {
//         setMenuError(error.message || "Failed to load menu");
//         toast.error("Failed to load menu items");
//         setMenuItems([]);
//       } finally {
//         setIsLoadingMenu(false);
//       }
//     };
//     fetchMenuItems();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (activeOrder?.orderId) {
//         const statuses = ["confirmed", "preparing", "ready", "completed"];
//         const currentIndex = statuses.indexOf(activeOrder.status);
//         if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
//           const newStatus = statuses[currentIndex + 1];
//           setActiveOrder((prev) => ({ ...prev, status: newStatus }));
//           setLiveStatus({ orderId: activeOrder.orderId, status: newStatus });
//         }
//       }
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [activeOrder]);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);
//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);
//       const { nutritionalInfo, nutritionSource, geminiInsights } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = {
//         ...item,
//         nutritionalInfo,
//         nutritionSource,
//         geminiInsights,
//       };
//       setCurrentItem(updatedItem);
//       setMenuItems((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );
//       const analysis = analyzeFoodFully(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2500);
//   };

//   const categories = ["all", ...new Set(menuItems.map((i) => i.category))];
//   const filtered = menuItems.filter(
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

//   const handleContinueToCustomize = () => {
//     setShowAnalysisModal(false);
//     setShowCustomModal(true);
//   };
//   const addToCartWithCustomizations = (item, customizations, instructions) => {
//     const newItem = {
//       ...item,
//       quantity: 1,
//       finalPrice: item.price,
//       customizations: customizations || [],
//       specialInstructions: instructions || "",
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

//   const handleCreateOrder = async () => {
//     if (cart.length === 0) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Cart Empty",
//         message: "Please add items to your cart first.",
//       });
//       return;
//     }
//     if (!tableInfo.tableNumber || !tableInfo.customerName) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Missing Information",
//         message: "Please select a table and enter your name first.",
//       });
//       setShowTableModal(true);
//       return;
//     }
//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     setShowCart(false);
//     try {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//       const formattedItems = cart.map((item) => ({
//         id: item.id.toString(),
//         name: item.name,
//         quantity: item.quantity || 1,
//         originalPrice: item.price || 0,
//         finalPrice: (item.price || 0) * (item.quantity || 1),
//         preparationTime: item.prepTime || 15,
//         customizations: item.customizations || [],
//         specialInstructions: item.specialInstructions || "",
//       }));
//       const orderData = {
//         personDetails: {
//           name: tableInfo.customerName,
//           tableNumber: tableInfo.tableNumber.toString(),
//           orderType: "dine-in",
//         },
//         bookingDetails: {
//           estimatedPickupTime: new Date(
//             Date.now() + preparationTime * 60000,
//           ).toISOString(),
//           specialInstructions: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//         },
//         items: formattedItems,
//         notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       };
//       const result = await apiService.createOrder(orderData);
//       if (result?.success && result?.data) {
//         const order = result.data;
//         const total =
//           order.items?.reduce((sum, item) => sum + (item.finalPrice || 0), 0) ||
//           getTotal();
//         const orderId = order.orderId || order._id || "N/A";
//         setCreatedOrderData(order);
//         setCreatedOrderTotal(total);
//         setCreatedOrderId(orderId);
//         setShowPaymentModal(true);
//         toast.info(`Order created! Total: RWF ${total.toLocaleString()}. Please complete payment.`);
//       } else throw new Error(result?.message || "Order creation failed");
//     } catch (error) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: error.message || "Failed to create order. Please try again.",
//       });
//       toast.error("Failed to create order");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePaymentConfirm = async (phoneNumber) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     try {
//       const preparationTime =
//         cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//       const hours = Math.floor(preparationTime / 60);
//       const minutes = preparationTime % 60;
//       const timeString = hours > 0 ? `${hours}h ${minutes}min` : `${minutes} minutes`;

//       setActiveOrder({
//         orderId: createdOrderId,
//         tableNumber: tableInfo.tableNumber,
//         customerName: tableInfo.customerName,
//         items: cart,
//         total: createdOrderTotal,
//         timeRemaining: preparationTime * 60,
//         status: "confirmed",
//       });

//       setShowResult({
//         open: true,
//         type: "success",
//         title: "🎉 PAYMENT SUCCESSFUL!",
//         message: `Thank you ${tableInfo.customerName}!\n\n📍 Table: ${tableInfo.tableNumber}\n🆔 Order ID: ${createdOrderId}\n💰 Total: RWF ${createdOrderTotal.toLocaleString()}\n💳 Paid via Mobile Money (${phoneNumber})\n⏱️ Est. time: ${timeString}\n\n💡 Tip: Use your Order ID to track your order status!`,
//       });
//       setCart([]);
//       toast.success(`✅ Payment confirmed! Order #${createdOrderId.slice(-8)} is being prepared.`);
//     } catch (error) {
//       toast.error("Payment confirmation failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = async (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with comprehensive health analysis!`,
//     );
//   };

//   const getCategoryIcon = (category) => {
//     switch (category) {
//       case "Appetizers":
//         return <FastfoodIcon fontSize="small" />;
//       case "Mains":
//         return <LunchIcon fontSize="small" />;
//       case "Seafood":
//         return <DrinkIcon fontSize="small" />;
//       case "Pizza":
//         return <RestaurantIcon fontSize="small" />;
//       case "Salads":
//         return <Nature fontSize="small" />;
//       case "Desserts":
//         return <DessertIcon fontSize="small" />;
//       case "Beverages":
//         return <DrinkIcon fontSize="small" />;
//       default:
//         return <MenuIcon fontSize="small" />;
//     }
//   };

//   const getQuickAnalysis = (item) => {
//     if (!item.nutritionalInfo) return null;
//     const nutrition = item.nutritionalInfo;
//     const concerns = [];
//     if (nutrition.sugar && nutrition.sugar > 20) concerns.push("High Sugar");
//     if (nutrition.sodium && nutrition.sodium > 600)
//       concerns.push("High Sodium");
//     if (nutrition.saturatedFat && nutrition.saturatedFat > 10)
//       concerns.push("High Sat Fat");
//     return concerns;
//   };

//   return (
//     <div
//       className={`w-full min-h-screen ${CATEGORY_BG[activeCategory === "all" ? "default" : activeCategory] || CATEGORY_BG.default} relative`}
//     >
//       <ToastContainer position="bottom-right" autoClose={5000} />

//       <AnimatePresence>
//         {showTableModal && (
//           <TableSelectorModal
//             isOpen={showTableModal}
//             onClose={() => {}}
//             onConfirm={handleTableConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showLoadingModal && selectedItem && (
//           <LoadingModal
//             isOpen={showLoadingModal}
//             itemName={selectedItem.name}
//             itemCategory={selectedItem.category}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showAnalysisModal && (
//           <AnalysisResultModal
//             isOpen={showAnalysisModal}
//             onClose={() => setShowAnalysisModal(false)}
//             analysis={analysisResult}
//             item={currentItem}
//             onContinue={handleContinueToCustomize}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showCustomModal && (
//           <CustomizationModal
//             isOpen={showCustomModal}
//             onClose={() => setShowCustomModal(false)}
//             item={currentItem}
//             onAddToCart={addToCartWithCustomizations}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showCart && (
//           <CartModal
//             isOpen={showCart}
//             onClose={() => setShowCart(false)}
//             cart={cart}
//             updateQuantity={updateQuantity}
//             removeItem={removeItem}
//             getTotal={getTotal}
//             onCheckout={handleCreateOrder}
//             tableInfo={tableInfo}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showPaymentModal && createdOrderData && (
//           <PaymentModal
//             isOpen={showPaymentModal}
//             onClose={() => setShowPaymentModal(false)}
//             totalAmount={createdOrderTotal}
//             orderId={createdOrderId}
//             onPaymentConfirm={handlePaymentConfirm}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showOrderStatusModal && (
//           <OrderStatusModal
//             isOpen={showOrderStatusModal}
//             onClose={() => setShowOrderStatusModal(false)}
//             onCheckOrder={handleGetOrderById}
//             liveStatus={liveStatus}
//             initialOrderId={activeOrder?.orderId || ""}
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showResult.open && (
//           <ResultModal
//             isOpen={showResult.open}
//             onClose={() => setShowResult({ ...showResult, open: false })}
//             type={showResult.type}
//             title={showResult.title}
//             message={showResult.message}
//             onTrackOrder={() => setShowOrderStatusModal(true)}
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderStatusModal(true)}
//         />
//       )}

//       <div className="w-full container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl relative z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2 flex-wrap justify-center sm:justify-start"
//             >
//               <RestaurantIcon className="text-orange-500 text-2xl sm:text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-600 text-xs sm:text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500 font-medium">
//                 ✦ Allergen & Health Analysis
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <SearchIcon />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCart(true)}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
//             >
//               <CartIcon />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.length}
//                 </span>
//               )}
//             </motion.button>
//           </div>
//         </div>

//         <Slider autoPlay={true} interval={5000} />

//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mt-4 mb-4 border border-blue-100"
//         >
//           <div className="flex items-center gap-3 flex-wrap">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-xs sm:text-sm text-blue-800 font-medium">
//                 🔬 Comprehensive Health Analysis
//               </p>
//               <p className="text-[10px] text-blue-600">
//                 Every dish is analyzed for: 9 Major Allergens • Nutritional
//                 Concerns • 25+ Health Conditions • AI-Powered Insights
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white/80 backdrop-blur-sm shadow-sm"
//             placeholder="Search for delicious dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {isLoadingMenu ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
//               />
//               <p className="text-gray-600">Loading delicious menu items...</p>
//             </div>
//           </div>
//         ) : menuError ? (
//           <div className="text-center py-16">
//             <ErrorIcon className="text-red-400 text-6xl mx-auto mb-4" />
//             <p className="text-gray-600">Failed to load menu: {menuError}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
//             >
//               Retry
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//               {categories.map((cat) => (
//                 <motion.button
//                   key={cat}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm flex items-center gap-1 ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {getCategoryIcon(cat)} {cat === "all" ? "🍽️ All Items" : cat}
//                 </motion.button>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//               {paginated.map((item) => {
//                 const quickAnalysis = getQuickAnalysis(item);
//                 return (
//                   <motion.div
//                     layoutId={`item-${item.id}`}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     whileHover={{ y: -5 }}
//                     key={item.id}
//                     className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-orange-100"
//                     onClick={() => handleItemClick(item)}
//                   >
//                     <div className="relative h-40 overflow-hidden">
//                       <motion.img
//                         whileHover={{ scale: 1.1 }}
//                         src={item.image}
//                         className="w-full h-full object-cover"
//                         alt={item.name}
//                       />
//                       <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                         <TimeIcon fontSize="small" /> {item.prepTime} min
//                       </div>
//                       <div
//                         className={`absolute top-2 left-2 bg-gradient-to-r ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.default} text-white text-[10px] px-2 py-0.5 rounded-full`}
//                       >
//                         {item.category}
//                       </div>

//                       {item.ingredients && (
//                         <div className="absolute top-2 right-2 flex gap-1">
//                           {item.ingredients.some((i) =>
//                             ["peanut", "peanuts", "groundnut"].some((k) =>
//                               i.toLowerCase().includes(k),
//                             ),
//                           ) && (
//                             <span
//                               className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Peanuts"
//                             >
//                               🥜
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "almond",
//                               "walnut",
//                               "cashew",
//                               "pecan",
//                               "hazelnut",
//                               "pistachio",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Tree Nuts"
//                             >
//                               🌰
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "milk",
//                               "cheese",
//                               "butter",
//                               "cream",
//                               "yogurt",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-blue-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Dairy"
//                             >
//                               🥛
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             ["wheat", "flour", "bread", "pasta", "gluten"].some(
//                               (k) => i.toLowerCase().includes(k),
//                             ),
//                           ) && (
//                             <span
//                               className="bg-yellow-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Gluten"
//                             >
//                               🌾
//                             </span>
//                           )}
//                           {item.ingredients.some((i) =>
//                             [
//                               "shrimp",
//                               "crab",
//                               "lobster",
//                               "clam",
//                               "oyster",
//                             ].some((k) => i.toLowerCase().includes(k)),
//                           ) && (
//                             <span
//                               className="bg-orange-600 text-white text-[8px] px-1 py-0.5 rounded-full"
//                               title="Contains Shellfish"
//                             >
//                               🦐
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-4">
//                       <h3 className="font-bold text-gray-800 text-lg truncate">
//                         {item.name}
//                       </h3>
//                       <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                         {item.description}
//                       </p>

//                       {quickAnalysis && quickAnalysis.length > 0 && (
//                         <div className="mt-2 flex gap-1 flex-wrap">
//                           {quickAnalysis.map((warning, idx) => (
//                             <span
//                               key={idx}
//                               className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full"
//                             >
//                               ⚠️ {warning}
//                             </span>
//                           ))}
//                         </div>
//                       )}

//                       <div className="flex justify-between items-center mt-3">
//                         <span className="text-orange-600 font-bold text-lg">
//                           RWF {item.price.toLocaleString()}
//                         </span>
//                         <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition">
//                           Analyze & Order
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {filtered.length === 0 && (
//               <div className="text-center py-16">
//                 <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//                 <p className="text-gray-500">No items match your search.</p>
//               </div>
//             )}

//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-8 flex-wrap">
//                 {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//                   let pageNum =
//                     totalPages <= 7
//                       ? i + 1
//                       : currentPage <= 4
//                         ? i + 1
//                         : currentPage >= totalPages - 3
//                           ? totalPages - 6 + i
//                           : currentPage - 3 + i;
//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`w-9 h-9 rounded-lg transition text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                     >
//                       {pageNum}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         )}

//         <AnimatePresence>
//           {isSubmitting && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0.8 }}
//                 className="bg-white rounded-2xl p-6 text-center"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                   className="rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium">
//                   Processing your order...
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */

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
  Receipt as ReceiptIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  NotificationsActive as NotifIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
  LocalHospital as LocalHospitalIcon,
  Nature,
  Speed as SpeedIcon,
  Bolt as BoltIcon,
  SpaOutlined,
  Fastfood as FastfoodIcon,
  LocalDrink as LocalDrinkIcon,
  RestaurantMenu as MenuIcon,
  EmojiFoodBeverage as DrinkIcon,
  Cake as DessertIcon,
  LunchDining as LunchIcon,
  BreakfastDining as BreakfastIcon,
  DinnerDining as DinnerIcon,
  SmartToy as AIIcon,
  Analytics as AnalyticsIcon,
  Star as StarIcon,
  Recommend as RecommendIcon,
  ThumbUp as ThumbUpIcon,
  Lightbulb as LightbulbIcon,
  TipsAndUpdates as TipsIcon,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { Slider } from "../slider/Slider";

// ========== API CONFIGURATION ==========
const API_CONFIG = {
  EDAMAM_APP_ID: "0dcbf7a8",
  EDAMAM_APP_KEY: "2059ccfd4b967458e7f4a9ffe6cf118b",
  EDAMAM_BASE_URL: "https://api.edamam.com",
  EDAMAM_API_BASE: "https://api.edamam.com/api",
  GEMINI_API_KEY: "AIzaSyDGln-EALpL8JCAhPb3mi42Lh85PXYBI2o",
  GEMINI_BASE_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
  USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
  USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
  SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
  SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
};

// Food category colors for attractive UI
const CATEGORY_COLORS = {
  Appetizers: "from-amber-500 to-orange-600",
  Mains: "from-red-600 to-rose-700",
  Seafood: "from-cyan-600 to-blue-700",
  Pizza: "from-orange-500 to-red-600",
  Salads: "from-emerald-500 to-green-600",
  Desserts: "from-pink-500 to-rose-600",
  Beverages: "from-indigo-500 to-purple-600",
  default: "from-orange-500 to-red-500",
};

// Food category background patterns
const CATEGORY_BG = {
  Appetizers: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
  Mains: "bg-gradient-to-br from-red-50 via-rose-50 to-orange-50",
  Seafood: "bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50",
  Pizza: "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50",
  Salads: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
  Desserts: "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50",
  Beverages: "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50",
  default: "bg-gradient-to-br from-orange-50 via-red-50 to-amber-50",
};

// ========== BACKEND API ENDPOINTS ==========
const BACKEND_API = {
  BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
  ORDERS: "/orders",
  ORDER_STATUS: "/orders",
  CUSTOMIZED_PLATES: "/orders",
  TRACK_ORDER: "/orders",
  FOODS: "/foods",
  PAYMENTS: "/payments",
};

// ========== COMPREHENSIVE ALLERGEN AND INGREDIENT DATABASE ==========
const ALLERGEN_DATABASE = {
  // Peanut Allergy
  peanut: {
    name: "Peanut Allergy",
    severity: "critical",
    keywords: [
      "peanut",
      "peanuts",
      "groundnut",
      "arachis",
      "peanut butter",
      "peanut oil",
      "peanut flour",
      "peanut protein",
      "beer nuts",
      "monkey nuts",
      "goober",
    ],
    message:
      "⚠️⚠️ CONTAINS PEANUTS - Risk of anaphylaxis and severe allergic reaction.",
  },
  // Tree Nut Allergy
  treeNut: {
    name: "Tree Nut Allergy",
    severity: "critical",
    keywords: [
      "almond",
      "walnut",
      "cashew",
      "pecan",
      "hazelnut",
      "pistachio",
      "macadamia",
      "chestnut",
      "brazil nut",
      "pine nut",
      "pignoli",
      "filbert",
      "nut",
      "nuts",
      "nut butter",
      "nut oil",
      "coconut",
    ],
    message:
      "⚠️⚠️ CONTAINS TREE NUTS - Risk of anaphylaxis and severe allergic reaction.",
  },
  // Shellfish Allergy
  shellfish: {
    name: "Shellfish Allergy",
    severity: "critical",
    keywords: [
      "shrimp",
      "prawn",
      "crab",
      "lobster",
      "crayfish",
      "crawfish",
      "clam",
      "oyster",
      "mussel",
      "scallop",
      "squid",
      "calamari",
      "octopus",
      "abalone",
      "escargot",
      "shellfish",
      "crustacean",
      "langoustine",
      "scampi",
    ],
    message: "⚠️⚠️ CONTAINS SHELLFISH - Risk of life-threatening anaphylaxis.",
  },
  // Egg Allergy
  egg: {
    name: "Egg Allergy",
    severity: "high",
    keywords: [
      "egg",
      "eggs",
      "egg white",
      "egg yolk",
      "albumin",
      "mayonnaise",
      "meringue",
      "pavlova",
      "custard",
      "quiche",
      "frittata",
      "omelet",
      "egg wash",
      "globulin",
      "livetin",
      "ovomucin",
      "ovomucoid",
      "ovovitellin",
    ],
    message:
      "⚠️ CONTAINS EGG - May cause hives, digestive issues, or respiratory distress.",
  },
  // Soy Allergy
  soy: {
    name: "Soy Allergy",
    severity: "high",
    keywords: [
      "soy",
      "soya",
      "soybean",
      "tofu",
      "tempeh",
      "soy sauce",
      "tamari",
      "shoyu",
      "miso",
      "soy milk",
      "edamame",
      "textured vegetable protein",
      "tvp",
      "soy protein",
      "soy lecithin",
      "soybean oil",
      "natto",
      "soy flour",
    ],
    message:
      "⚠️ CONTAINS SOY - May cause allergic reaction including hives and digestive issues.",
  },
  // Wheat/Gluten Allergy
  wheat: {
    name: "Wheat/Gluten Allergy",
    severity: "critical",
    keywords: [
      "wheat",
      "flour",
      "bread",
      "pasta",
      "couscous",
      "semolina",
      "bulgur",
      "spelt",
      "farro",
      "seitan",
      "gluten",
      "barley",
      "rye",
      "malt",
      "brewer's yeast",
      "tricale",
      "durum",
      "kamut",
      "einkorn",
      "emmer",
      "farina",
      "graham",
      "matzo",
    ],
    message:
      "⚠️⚠️ CONTAINS WHEAT/GLUTEN - Risk of anaphylaxis and severe reaction.",
  },
  // Milk/Dairy Allergy
  dairy: {
    name: "Milk/Dairy Allergy",
    severity: "critical",
    keywords: [
      "milk",
      "cream",
      "cheese",
      "yogurt",
      "butter",
      "whey",
      "casein",
      "ghee",
      "ice cream",
      "custard",
      "pudding",
      "sour cream",
      "cream cheese",
      "cottage cheese",
      "ricotta",
      "mozzarella",
      "cheddar",
      "parmesan",
      "lactose",
      "curds",
      "kefir",
    ],
    message:
      "⚠️⚠️ CONTAINS MILK/DAIRY - Risk of severe allergic reaction including anaphylaxis.",
  },
  // Fish Allergy
  fish: {
    name: "Fish Allergy",
    severity: "critical",
    keywords: [
      "salmon",
      "tuna",
      "cod",
      "halibut",
      "bass",
      "trout",
      "mackerel",
      "sardine",
      "anchovy",
      "herring",
      "tilapia",
      "catfish",
      "snapper",
      "grouper",
      "flounder",
      "sole",
      "haddock",
      "pollock",
      "swordfish",
      "mahi mahi",
      "sea bass",
    ],
    message: "⚠️⚠️ CONTAINS FISH - Risk of life-threatening anaphylaxis.",
  },
  // Sesame Allergy
  sesame: {
    name: "Sesame Allergy",
    severity: "critical",
    keywords: [
      "sesame",
      "tahini",
      "benne",
      "sesame oil",
      "gingelly oil",
      "sesame seed",
      "sesame seeds",
      "sesame paste",
      "sesamol",
      "sesamin",
    ],
    message: "⚠️⚠️ CONTAINS SESAME - Risk of severe anaphylaxis.",
  },
  // Sulfite Sensitivity
  sulfite: {
    name: "Sulfite Sensitivity",
    severity: "high",
    keywords: [
      "sulfite",
      "sulfur dioxide",
      "potassium metabisulfite",
      "sodium metabisulfite",
      "sodium sulfite",
      "preservative",
      "e220",
      "e221",
      "e222",
      "e223",
      "e224",
      "e225",
    ],
    message:
      "⚠️ CONTAINS SULFITES - May cause hives, breathing difficulty, or anaphylaxis.",
  },
};

// ========== NUTRITIONAL CONCERN DATABASE ==========
const NUTRITIONAL_CONCERNS = {
  highSugar: {
    name: "High Sugar Content",
    severity: "warning",
    threshold: 25,
    unit: "g",
    message:
      "⚠️ HIGH SUGAR ({value}g) - May cause blood sugar spikes, weight gain, and inflammation.",
  },
  veryHighSugar: {
    name: "Very High Sugar Content",
    severity: "critical",
    threshold: 40,
    unit: "g",
    message:
      "⚠️⚠️ VERY HIGH SUGAR ({value}g) - Dangerous for diabetics, promotes obesity.",
  },
  highSodium: {
    name: "High Sodium Content",
    severity: "warning",
    threshold: 800,
    unit: "mg",
    message:
      "⚠️ HIGH SODIUM ({value}mg) - Raises blood pressure, increases heart disease risk.",
  },
  veryHighSodium: {
    name: "Very High Sodium Content",
    severity: "critical",
    threshold: 1200,
    unit: "mg",
    message:
      "⚠️⚠️ VERY HIGH SODIUM ({value}mg) - Dangerous for hypertension patients.",
  },
  highSaturatedFat: {
    name: "High Saturated Fat",
    severity: "warning",
    threshold: 12,
    unit: "g",
    message:
      "⚠️ HIGH SATURATED FAT ({value}g) - Increases LDL cholesterol and heart disease risk.",
  },
  veryHighSaturatedFat: {
    name: "Very High Saturated Fat",
    severity: "critical",
    threshold: 20,
    unit: "g",
    message:
      "⚠️⚠️ VERY HIGH SATURATED FAT ({value}g) - Major risk factor for heart attack.",
  },
  highCholesterol: {
    name: "High Cholesterol",
    severity: "warning",
    threshold: 200,
    unit: "mg",
    message:
      "⚠️ HIGH CHOLESTEROL ({value}mg) - May clog arteries and increase heart disease risk.",
  },
  veryHighCholesterol: {
    name: "Very High Cholesterol",
    severity: "critical",
    threshold: 300,
    unit: "mg",
    message:
      "⚠️⚠️ VERY HIGH CHOLESTEROL ({value}mg) - Significant risk for cardiovascular events.",
  },
  highCarbs: {
    name: "High Carbohydrates",
    severity: "info",
    threshold: 50,
    unit: "g",
    message:
      "Contains {value}g carbohydrates - Monitor blood glucose if diabetic.",
  },
  veryHighCarbs: {
    name: "Very High Carbohydrates",
    severity: "warning",
    threshold: 80,
    unit: "g",
    message:
      "⚠️ VERY HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
  },
  highCalories: {
    name: "High Calories",
    severity: "info",
    threshold: 600,
    unit: "kcal",
    message:
      "Contains {value} calories - Consider portion control for weight management.",
  },
  veryHighCalories: {
    name: "Very High Calories",
    severity: "warning",
    threshold: 900,
    unit: "kcal",
    message:
      "⚠️ HIGH CALORIE ({value}kcal) - May contribute to weight gain and obesity.",
  },
  lowFiber: {
    name: "Low Fiber",
    severity: "info",
    threshold: 3,
    unit: "g",
    message:
      "Low fiber content ({value}g) - Consider adding fiber-rich foods for digestive health.",
  },
  highPurine: {
    name: "High Purine Content",
    severity: "warning",
    threshold: 150,
    unit: "mg",
    message: "⚠️ HIGH PURINES ({value}mg) - May trigger gout flare-ups.",
  },
  containsCaffeine: {
    name: "Contains Caffeine",
    severity: "info",
    threshold: 50,
    unit: "mg",
    message:
      "Contains {value}mg caffeine - May cause anxiety, insomnia, or heart palpitations.",
  },
  highCaffeine: {
    name: "High Caffeine",
    severity: "warning",
    threshold: 150,
    unit: "mg",
    message:
      "⚠️ HIGH CAFFEINE ({value}mg) - Can trigger anxiety, panic attacks, and arrhythmias.",
  },
  containsAlcohol: {
    name: "Contains Alcohol",
    severity: "warning",
    threshold: 1,
    unit: "",
    message:
      "⚠️ CONTAINS ALCOHOL - Interacts with medications and affects liver health.",
  },
  containsMSG: {
    name: "Contains MSG",
    severity: "info",
    threshold: 1,
    unit: "",
    message: "Contains MSG - May trigger headaches, migraines, or flushing.",
  },
  containsArtificialColors: {
    name: "Contains Artificial Colors",
    severity: "info",
    threshold: 1,
    unit: "",
    message:
      "Contains artificial food dyes - Linked to hyperactivity and migraines.",
  },
  containsAspartame: {
    name: "Contains Aspartame",
    severity: "info",
    threshold: 1,
    unit: "",
    message: "Contains aspartame - May trigger headaches, avoid with PKU.",
  },
  highOxalate: {
    name: "High Oxalate",
    severity: "warning",
    threshold: 80,
    unit: "mg",
    message:
      "⚠️ HIGH OXALATE ({value}mg) - May promote kidney stone formation.",
  },
  highPotassium: {
    name: "High Potassium",
    severity: "warning",
    threshold: 500,
    unit: "mg",
    message:
      "⚠️ HIGH POTASSIUM ({value}mg) - Dangerous for kidney disease patients.",
  },
  highPhosphorus: {
    name: "High Phosphorus",
    severity: "warning",
    threshold: 400,
    unit: "mg",
    message:
      "⚠️ HIGH PHOSPHORUS ({value}mg) - May worsen bone problems in kidney disease.",
  },
  containsGoitrogens: {
    name: "Contains Goitrogens",
    severity: "info",
    threshold: 1,
    unit: "",
    message: "Contains goitrogens - May interfere with thyroid function.",
  },
  containsFODMAPs: {
    name: "Contains High FODMAPs",
    severity: "info",
    threshold: 1,
    unit: "",
    message: "Contains high FODMAP ingredients - May trigger IBS symptoms.",
  },
};

// ========== CLINICAL CONDITIONS (70+ conditions) ==========
const CLINICAL_CONDITIONS = [
  // Endocrine & Metabolic
  {
    id: 1,
    name: "Type 2 Diabetes",
    icon: "🩸",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Insulin resistance and high blood sugar",
    recommendations: [
      "Low glycemic index foods",
      "Monitor carb intake",
      "Increase fiber",
      "Avoid sugary drinks",
    ],
    thresholds: {
      sugar: {
        value: 15,
        unit: "g",
        severity: "info",
        message: "Contains {value}g sugar",
      },
      sugarHigh: {
        value: 25,
        unit: "g",
        severity: "warning",
        message: "⚠️ HIGH SUGAR ({value}g)",
      },
      carbs: {
        value: 50,
        unit: "g",
        severity: "info",
        message: "Contains {value}g carbs",
      },
      carbsHigh: {
        value: 70,
        unit: "g",
        severity: "warning",
        message: "⚠️ HIGH CARBS ({value}g)",
      },
    },
  },
  {
    id: 2,
    name: "Type 1 Diabetes",
    icon: "💉",
    color: "text-red-700",
    bgColor: "bg-red-100",
    description: "Autoimmune destruction of insulin-producing cells",
    recommendations: [
      "Count carbs accurately",
      "Adjust insulin dosage",
      "Monitor glucose frequently",
    ],
    thresholds: {
      sugar: {
        value: 10,
        unit: "g",
        severity: "info",
        message: "Contains {value}g sugar",
      },
      sugarHigh: {
        value: 20,
        unit: "g",
        severity: "warning",
        message: "⚠️ HIGH SUGAR ({value}g)",
      },
    },
  },
  {
    id: 3,
    name: "Gestational Diabetes",
    icon: "🤰",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "High blood sugar during pregnancy",
    recommendations: [
      "Monitor blood sugar 4x daily",
      "Small frequent meals",
      "Complex carbs",
    ],
    thresholds: {
      sugar: {
        value: 12,
        unit: "g",
        severity: "info",
        message: "Contains {value}g sugar",
      },
      sugarHigh: {
        value: 22,
        unit: "g",
        severity: "warning",
        message: "⚠️ HIGH SUGAR ({value}g)",
      },
    },
  },
  {
    id: 4,
    name: "Hypothyroidism",
    icon: "🦋",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Underactive thyroid gland",
    recommendations: [
      "Take medication on empty stomach",
      "Avoid goitrogenic foods raw",
      "Ensure adequate iodine",
    ],
    thresholds: {
      goitrogens: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains goitrogens",
      },
      soy: { value: 1, unit: "", severity: "info", message: "Contains soy" },
    },
  },
  {
    id: 5,
    name: "Hyperthyroidism",
    icon: "⚡",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Overactive thyroid gland",
    recommendations: [
      "Limit iodine-rich foods",
      "Avoid caffeine",
      "Calcium-rich foods",
    ],
    thresholds: {
      caffeine: {
        value: 80,
        unit: "mg",
        severity: "info",
        message: "Contains {value}mg caffeine",
      },
    },
  },
  {
    id: 6,
    name: "PCOS",
    icon: "🩺",
    color: "text-fuchsia-600",
    bgColor: "bg-fuchsia-50",
    description: "Polycystic Ovary Syndrome",
    recommendations: [
      "Low glycemic index diet",
      "Increase fiber",
      "Anti-inflammatory foods",
    ],
    thresholds: {
      sugar: {
        value: 15,
        unit: "g",
        severity: "info",
        message: "Contains {value}g sugar",
      },
      saturatedFat: {
        value: 10,
        unit: "g",
        severity: "info",
        message: "Contains {value}g saturated fat",
      },
    },
  },
  {
    id: 7,
    name: "Metabolic Syndrome",
    icon: "⚕️",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description: "Cluster of metabolic abnormalities",
    recommendations: [
      "Weight loss",
      "Low sugar diet",
      "Increase physical activity",
      "Mediterranean diet",
    ],
    thresholds: {
      sugar: {
        value: 20,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g sugar",
      },
      saturatedFat: {
        value: 10,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g saturated fat",
      },
    },
  },
  // Cardiovascular
  {
    id: 8,
    name: "Hypertension",
    icon: "❤️",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "High blood pressure",
    recommendations: [
      "Reduce sodium (<1500mg/day)",
      "DASH diet",
      "Limit alcohol",
      "Potassium-rich foods",
    ],
    thresholds: {
      sodium: {
        value: 600,
        unit: "mg",
        severity: "info",
        message: "{value}mg sodium",
      },
      sodiumHigh: {
        value: 1000,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg sodium",
      },
    },
  },
  {
    id: 9,
    name: "Heart Disease",
    icon: "🫀",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    description: "Coronary artery disease",
    recommendations: [
      "Limit saturated/trans fats",
      "Omega-3 fatty acids",
      "Whole grains",
      "Fruits/vegetables",
    ],
    thresholds: {
      saturatedFat: {
        value: 8,
        unit: "g",
        severity: "info",
        message: "{value}g sat fat",
      },
      saturatedFatHigh: {
        value: 15,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g sat fat",
      },
      cholesterol: {
        value: 150,
        unit: "mg",
        severity: "info",
        message: "{value}mg cholesterol",
      },
      cholesterolHigh: {
        value: 250,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg cholesterol",
      },
    },
  },
  {
    id: 10,
    name: "Heart Failure",
    icon: "💔",
    color: "text-red-800",
    bgColor: "bg-red-100",
    description: "Congestive heart failure",
    recommendations: [
      "Strict sodium (<2000mg/day)",
      "Monitor fluid intake",
      "Limit alcohol",
    ],
    thresholds: {
      sodium: {
        value: 400,
        unit: "mg",
        severity: "info",
        message: "{value}mg sodium",
      },
      sodiumHigh: {
        value: 800,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg sodium",
      },
    },
  },
  {
    id: 11,
    name: "Atrial Fibrillation",
    icon: "💓",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    description: "Irregular heart rhythm",
    recommendations: [
      "Avoid caffeine",
      "Limit alcohol",
      "Stay hydrated",
      "Monitor electrolytes",
    ],
    thresholds: {
      caffeine: {
        value: 120,
        unit: "mg",
        severity: "warning",
        message: "⚠️ HIGH CAFFEINE",
      },
      alcohol: {
        value: 1,
        unit: "",
        severity: "warning",
        message: "⚠️ CONTAINS ALCOHOL",
      },
    },
  },
  // Kidney & Liver
  {
    id: 12,
    name: "Chronic Kidney Disease",
    icon: "🩷",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    description: "Gradual loss of kidney function",
    recommendations: [
      "Monitor protein",
      "Limit phosphorus",
      "Control potassium",
      "Limit sodium",
    ],
    thresholds: {
      potassium: {
        value: 350,
        unit: "mg",
        severity: "info",
        message: "{value}mg potassium",
      },
      potassiumHigh: {
        value: 500,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg potassium",
      },
      phosphorus: {
        value: 300,
        unit: "mg",
        severity: "info",
        message: "{value}mg phosphorus",
      },
      phosphorusHigh: {
        value: 450,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg phosphorus",
      },
    },
  },
  {
    id: 13,
    name: "Kidney Stones",
    icon: "🪨",
    color: "text-stone-600",
    bgColor: "bg-stone-50",
    description: "Hard mineral deposits",
    recommendations: [
      "Drink water",
      "Limit oxalates",
      "Reduce sodium",
      "Limit animal protein",
    ],
    thresholds: {
      oxalate: {
        value: 50,
        unit: "mg",
        severity: "info",
        message: "{value}mg oxalate",
      },
      oxalateHigh: {
        value: 100,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg oxalate",
      },
    },
  },
  {
    id: 14,
    name: "Fatty Liver Disease",
    icon: "🧫",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    description: "NAFLD",
    recommendations: [
      "Weight loss",
      "Limit sugar",
      "Avoid fructose",
      "Increase activity",
    ],
    thresholds: {
      sugar: {
        value: 15,
        unit: "g",
        severity: "info",
        message: "{value}g sugar",
      },
      fructose: {
        value: 10,
        unit: "g",
        severity: "info",
        message: "{value}g fructose",
      },
    },
  },
  {
    id: 15,
    name: "Cirrhosis",
    icon: "🧫",
    color: "text-green-800",
    bgColor: "bg-green-100",
    description: "Advanced liver scarring",
    recommendations: ["No alcohol", "Limit sodium", "Small frequent meals"],
    thresholds: {
      alcohol: {
        value: 1,
        unit: "",
        severity: "critical",
        message: "⚠️⚠️ ALCOHOL",
      },
      sodium: {
        value: 500,
        unit: "mg",
        severity: "info",
        message: "{value}mg sodium",
      },
    },
  },
  // Gastrointestinal
  {
    id: 16,
    name: "Celiac Disease",
    icon: "🌾",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    description: "Autoimmune gluten reaction",
    recommendations: [
      "Strict gluten-free diet",
      "Check labels",
      "Certified gluten-free",
    ],
    thresholds: {
      gluten: {
        value: 1,
        unit: "",
        severity: "critical",
        message: "⚠️⚠️ CONTAINS GLUTEN",
      },
      wheat: {
        value: 1,
        unit: "",
        severity: "critical",
        message: "⚠️⚠️ CONTAINS WHEAT",
      },
    },
  },
  {
    id: 17,
    name: "Lactose Intolerance",
    icon: "🥛",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    description: "Unable to digest lactose",
    recommendations: [
      "Lactose-free dairy",
      "Lactase supplements",
      "Plant milk alternatives",
    ],
    thresholds: {
      lactose: {
        value: 5,
        unit: "g",
        severity: "info",
        message: "{value}g lactose",
      },
      lactoseHigh: {
        value: 10,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g lactose",
      },
    },
  },
  {
    id: 18,
    name: "IBS",
    icon: "😖",
    color: "text-green-700",
    bgColor: "bg-green-50",
    description: "Irritable bowel syndrome",
    recommendations: ["Low FODMAP diet", "Regular meals", "Stress management"],
    thresholds: {
      fodmaps: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains high FODMAPs",
      },
      caffeine: {
        value: 50,
        unit: "mg",
        severity: "info",
        message: "{value}mg caffeine",
      },
    },
  },
  {
    id: 19,
    name: "GERD",
    icon: "🔥",
    color: "text-red-600",
    bgColor: "bg-red-100",
    description: "Acid reflux",
    recommendations: [
      "Avoid triggers",
      "Small meals",
      "No lying down after eating",
    ],
    thresholds: {
      fat: { value: 15, unit: "g", severity: "info", message: "{value}g fat" },
      spicy: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains spices",
      },
      caffeine: {
        value: 50,
        unit: "mg",
        severity: "info",
        message: "{value}mg caffeine",
      },
      chocolate: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains chocolate",
      },
    },
  },
  {
    id: 20,
    name: "Crohn's Disease",
    icon: "🦠",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Inflammatory bowel disease",
    recommendations: [
      "Low fiber during flares",
      "Easy to digest foods",
      "Avoid trigger foods",
    ],
    thresholds: {
      fiber: {
        value: 5,
        unit: "g",
        severity: "info",
        message: "{value}g fiber",
      },
    },
  },
  {
    id: 21,
    name: "Ulcerative Colitis",
    icon: "🦠",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "Colon inflammation",
    recommendations: [
      "Low residue diet",
      "Avoid trigger foods",
      "Stay hydrated",
    ],
    thresholds: {
      fiber: {
        value: 5,
        unit: "g",
        severity: "info",
        message: "{value}g fiber",
      },
    },
  },
  // Gout
  {
    id: 22,
    name: "Gout",
    icon: "🦶",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    description: "Uric acid crystal buildup",
    recommendations: [
      "Avoid high-purine foods",
      "Limit alcohol",
      "Stay hydrated",
    ],
    thresholds: {
      purines: {
        value: 100,
        unit: "mg",
        severity: "info",
        message: "{value}mg purines",
      },
      purinesHigh: {
        value: 150,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg purines",
      },
      alcohol: {
        value: 1,
        unit: "",
        severity: "warning",
        message: "⚠️ ALCOHOL",
      },
    },
  },
  // Neurological
  {
    id: 23,
    name: "Migraine",
    icon: "🤕",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    description: "Recurrent severe headaches",
    recommendations: [
      "Identify trigger foods",
      "Regular meals",
      "Stay hydrated",
      "Limit caffeine",
    ],
    thresholds: {
      tyramine: {
        value: 10,
        unit: "mg",
        severity: "info",
        message: "Contains tyramine",
      },
      caffeine: {
        value: 60,
        unit: "mg",
        severity: "info",
        message: "{value}mg caffeine",
      },
      msg: { value: 1, unit: "", severity: "info", message: "⚠️ CONTAINS MSG" },
      artificialSweeteners: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains artificial sweetener",
      },
    },
  },
  {
    id: 24,
    name: "Epilepsy",
    icon: "⚡",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    description: "Seizure disorder",
    recommendations: ["Avoid aspartame", "Limit alcohol", "Stable blood sugar"],
    thresholds: {
      aspartame: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains aspartame",
      },
      alcohol: {
        value: 1,
        unit: "",
        severity: "warning",
        message: "⚠️ ALCOHOL",
      },
    },
  },
  // Psychiatric
  {
    id: 25,
    name: "Depression",
    icon: "😔",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    description: "Major depressive disorder",
    recommendations: [
      "Omega-3s",
      "Mediterranean diet",
      "Avoid alcohol",
      "Regular meals",
    ],
    thresholds: {
      sugar: {
        value: 15,
        unit: "g",
        severity: "info",
        message: "{value}g sugar",
      },
      alcohol: {
        value: 1,
        unit: "",
        severity: "warning",
        message: "⚠️ ALCOHOL",
      },
    },
  },
  {
    id: 26,
    name: "Anxiety Disorder",
    icon: "😰",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    description: "Generalized anxiety",
    recommendations: ["Limit caffeine", "Magnesium-rich foods", "Omega-3s"],
    thresholds: {
      caffeine: {
        value: 60,
        unit: "mg",
        severity: "info",
        message: "{value}mg caffeine",
      },
    },
  },
  {
    id: 27,
    name: "Bipolar Disorder",
    icon: "🎭",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Mood swings disorder",
    recommendations: ["Avoid caffeine", "Regular meals", "Omega-3 fatty acids"],
    thresholds: {
      caffeine: {
        value: 50,
        unit: "mg",
        severity: "warning",
        message: "⚠️ {value}mg caffeine",
      },
    },
  },
  {
    id: 28,
    name: "ADHD",
    icon: "🎯",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Attention deficit disorder",
    recommendations: [
      "Protein-rich breakfast",
      "Omega-3s",
      "Avoid artificial colors",
      "Limit sugar",
    ],
    thresholds: {
      artificialColors: {
        value: 1,
        unit: "",
        severity: "info",
        message: "Contains artificial dyes",
      },
      sugar: {
        value: 15,
        unit: "g",
        severity: "info",
        message: "{value}g sugar",
      },
    },
  },
  // Respiratory
  {
    id: 29,
    name: "Asthma",
    icon: "🫁",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Airway inflammation",
    recommendations: ["Avoid sulfites", "Anti-inflammatory diet", "Omega-3s"],
    thresholds: {
      sulfites: {
        value: 10,
        unit: "mg",
        severity: "warning",
        message: "⚠️ CONTAINS SULFITES",
      },
    },
  },
  // Cancer & Oncology
  {
    id: 30,
    name: "Cancer (General)",
    icon: "🎗️",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "Oncology patient",
    recommendations: [
      "Antioxidant-rich foods",
      "Plant-based diet",
      "Limit processed meats",
    ],
    thresholds: {
      processedMeats: {
        value: 1,
        unit: "",
        severity: "warning",
        message: "⚠️ Contains processed meat",
      },
      sugar: {
        value: 25,
        unit: "g",
        severity: "info",
        message: "{value}g sugar",
      },
    },
  },
  // Autoimmune
  {
    id: 31,
    name: "Lupus",
    icon: "🦋",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Autoimmune disease",
    recommendations: [
      "Anti-inflammatory diet",
      "Omega-3s",
      "Low saturated fat",
    ],
    thresholds: {
      saturatedFat: {
        value: 10,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g sat fat",
      },
    },
  },
  {
    id: 32,
    name: "Rheumatoid Arthritis",
    icon: "🦴",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Autoimmune joint inflammation",
    recommendations: [
      "Anti-inflammatory diet",
      "Omega-3 fatty acids",
      "Limit red meat",
    ],
    thresholds: {
      saturatedFat: {
        value: 10,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g sat fat",
      },
    },
  },
  // Other Conditions
  {
    id: 33,
    name: "Anemia",
    icon: "🩸",
    color: "text-red-400",
    bgColor: "bg-red-50",
    description: "Low red blood cells",
    recommendations: [
      "Iron-rich foods",
      "Vitamin C for absorption",
      "B12 rich foods",
    ],
    thresholds: {
      iron: {
        value: 3,
        unit: "mg",
        severity: "info",
        message: "{value}mg iron",
      },
    },
  },
  {
    id: 34,
    name: "Osteoporosis",
    icon: "🦴",
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    description: "Weak bones",
    recommendations: ["Calcium-rich foods", "Vitamin D", "Limit sodium"],
    thresholds: {
      calcium: {
        value: 200,
        unit: "mg",
        severity: "info",
        message: "{value}mg calcium",
      },
      sodium: {
        value: 600,
        unit: "mg",
        severity: "info",
        message: "{value}mg sodium",
      },
    },
  },
  {
    id: 35,
    name: "PKU",
    icon: "🧬",
    color: "text-purple-400",
    bgColor: "bg-purple-50",
    description: "Phenylketonuria",
    recommendations: [
      "Avoid aspartame",
      "Low protein diet (special)",
      "Medical formula",
    ],
    thresholds: {
      aspartame: {
        value: 1,
        unit: "",
        severity: "critical",
        message: "⚠️⚠️ CONTAINS ASPARTAME",
      },
      protein: {
        value: 5,
        unit: "g",
        severity: "warning",
        message: "⚠️ {value}g protein",
      },
    },
  },
];

// ========== PROFESSIONAL API SERVICE CLASS ==========
class APIService {
  static instance = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_API.BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  static getInstance() {
    if (!APIService.instance) APIService.instance = new APIService();
    return APIService.instance;
  }

  async fetchFoods() {
    try {
      const response = await this.axiosInstance.get(BACKEND_API.FOODS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createOrder(orderData) {
    try {
      const response = await this.axiosInstance.post(
        BACKEND_API.ORDERS,
        orderData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await this.axiosInstance.get(
        `${BACKEND_API.ORDERS}/${orderId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getGeminiFoodInsights(foodName, ingredients, nutritionInfo) {
    if (!API_CONFIG.GEMINI_API_KEY) return null;
    try {
      const prompt = `As a nutrition expert, provide detailed insights about ${foodName}. 
Ingredients: ${ingredients.join(", ")}. 
Nutrition: Calories ${nutritionInfo?.calories || "N/A"} kcal, Protein ${nutritionInfo?.protein || "N/A"}g, Carbs ${nutritionInfo?.carbs || "N/A"}g, Fat ${nutritionInfo?.fat || "N/A"}g, Fiber ${nutritionInfo?.fiber || "N/A"}g, Sugar ${nutritionInfo?.sugar || "N/A"}g, Sodium ${nutritionInfo?.sodium || "N/A"}mg. 

Return JSON with these exact fields:
{
  "summary": "2-3 sentence nutritional summary",
  "healthScore": number between 0-100,
  "benefits": ["benefit1", "benefit2", "benefit3"],
  "risks": ["risk1", "risk2"],
  "dietaryRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "bestTimeToEat": "time of day recommendation",
  "pairingSuggestions": ["pairing1", "pairing2"],
  "funFact": "interesting nutritional fact",
  "alternativeSuggestions": ["healthier alternative1", "alternative2"]
}`;

      const response = await axios.post(
        `${API_CONFIG.GEMINI_BASE_URL}?key=${API_CONFIG.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 },
      );
      const aiResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiResponse) {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.warn("Gemini API error:", error.message);
      return null;
    }
  }

  async analyzeWithEdamam(ingredients, title) {
    if (!API_CONFIG.EDAMAM_APP_ID || !API_CONFIG.EDAMAM_APP_KEY) return null;
    try {
      const response = await axios.post(
        `${API_CONFIG.EDAMAM_API_BASE}/nutrition-details`,
        { title, ingr: ingredients },
        {
          params: {
            app_id: API_CONFIG.EDAMAM_APP_ID,
            app_key: API_CONFIG.EDAMAM_APP_KEY,
          },
          timeout: 8000,
        },
      );
      return response.data;
    } catch (error) {
      console.warn("Edamam API error:", error.message);
      return null;
    }
  }

  parseEdamamNutrition(edamamData) {
    const totalNutrients = edamamData.totalNutrients || {};
    return {
      calories: Math.round(edamamData.calories || 0),
      protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
      carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
      fat: Math.round(totalNutrients.FAT?.quantity || 0),
      saturatedFat: Math.round(totalNutrients.FASAT?.quantity || 0),
      fiber: Math.round(totalNutrients.FIBTG?.quantity || 0),
      sugar: Math.round(totalNutrients.SUGAR?.quantity || 0),
      sodium: Math.round(totalNutrients.NA?.quantity || 0),
      cholesterol: Math.round(totalNutrients.CHOLE?.quantity || 0),
      potassium: Math.round(totalNutrients.K?.quantity || 0),
      vitaminC: Math.round(totalNutrients.VITC?.quantity || 0),
      calcium: Math.round(totalNutrients.CA?.quantity || 0),
      iron: Math.round(totalNutrients.FE?.quantity || 0),
    };
  }

  estimateNutritionFromIngredients(ingredients) {
    const nutritionDB = {
      chicken: { calories: 165, protein: 31, fat: 3.6 },
      beef: { calories: 250, protein: 26, fat: 17, saturatedFat: 7 },
      salmon: { calories: 208, protein: 20, fat: 13 },
      shrimp: { calories: 84, protein: 18, cholesterol: 166, sodium: 111 },
      cheese: {
        calories: 402,
        protein: 25,
        fat: 33,
        saturatedFat: 21,
        sodium: 621,
      },
      milk: { calories: 42, protein: 3.4, fat: 1, lactose: 4.8 },
      cream: { calories: 345, fat: 37, saturatedFat: 23 },
      butter: { calories: 717, fat: 81, saturatedFat: 51 },
      oil: { calories: 884, fat: 100, saturatedFat: 14 },
      flour: { calories: 364, carbs: 76, protein: 10 },
      sugar: { calories: 387, sugar: 100, carbs: 100 },
      rice: { calories: 130, carbs: 28, protein: 2.7 },
      pasta: { calories: 158, carbs: 31, protein: 5.8 },
      bread: { calories: 265, carbs: 49, sodium: 400 },
      potato: { calories: 77, carbs: 17, fiber: 2 },
      tomato: { calories: 18, carbs: 4, sugar: 2.6 },
      onion: { calories: 40, carbs: 9, fiber: 1.7 },
      garlic: { calories: 149, carbs: 33 },
      lettuce: { calories: 15, fiber: 1.3 },
      cucumber: { calories: 15, water: 95 },
      olive: { calories: 115, fat: 11 },
    };

    let estimated = {
      calories: 0,
      fat: 0,
      sodium: 0,
      sugar: 0,
      saturatedFat: 0,
      cholesterol: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
      potassium: 0,
      vitaminC: 0,
      calcium: 0,
      iron: 0,
    };

    for (const ingredient of ingredients) {
      const ingLower = ingredient.toLowerCase();
      for (const [key, values] of Object.entries(nutritionDB)) {
        if (ingLower.includes(key)) {
          Object.keys(values).forEach((k) => {
            if (k in estimated)
              estimated[k] = (estimated[k] || 0) + (values[k] || 0);
          });
          break;
        }
      }
    }

    const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
    Object.keys(estimated).forEach((key) => {
      const maxVal =
        key === "calories"
          ? 1200
          : key === "sodium"
            ? 1500
            : key === "sugar"
              ? 40
              : key === "saturatedFat"
                ? 25
                : key === "cholesterol"
                  ? 200
                  : 100;
      estimated[key] = Math.min(
        maxVal,
        Math.round(estimated[key] / servingFactor),
      );
    });
    return estimated;
  }

  async getCompleteNutritionAnalysis(item) {
    let nutritionalInfo = null,
      nutritionSource = null,
      geminiInsights = null;
    try {
      const edamamResult = await this.analyzeWithEdamam(
        item.ingredients,
        item.name,
      );
      if (edamamResult?.calories) {
        nutritionalInfo = this.parseEdamamNutrition(edamamResult);
        nutritionSource = "Edamam Nutrition API";
      }
    } catch (error) {
      console.log(error);
    }
    if (!nutritionalInfo?.calories) {
      nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
      nutritionSource = "Estimated from ingredients";
    }
    try {
      geminiInsights = await this.getGeminiFoodInsights(
        item.name,
        item.ingredients,
        nutritionalInfo,
      );
    } catch (error) {
      console.log("Gemini insights error:", error);
    }
    return { nutritionalInfo, nutritionSource, geminiInsights };
  }

  handleError(error) {
    if (error.response)
      return {
        status: error.response.status,
        message: error.response.data?.message || "Server error",
      };
    if (error.request)
      return { status: 0, message: "Network error - Unable to connect" };
    return {
      status: -1,
      message: error.message || "An unexpected error occurred",
    };
  }
}

// ========== COMPREHENSIVE FOOD ANALYSIS FUNCTION ==========
const analyzeFoodFully = (item) => {
  const nutrition = item.nutritionalInfo || {};
  const ingredients = item.ingredients || [];
  const analysis = {
    allergens: [],
    nutritionalConcerns: [],
    clinicalConditions: [],
    totalIssues: 0,
    severityLevel: "safe",
  };

  const containsIngredient = (keywords) => {
    const keywordList = Array.isArray(keywords) ? keywords : [keywords];
    return ingredients.some((ing) =>
      keywordList.some((kw) => ing.toLowerCase().includes(kw.toLowerCase())),
    );
  };

  for (const [allergenKey, allergenInfo] of Object.entries(ALLERGEN_DATABASE)) {
    if (containsIngredient(allergenInfo.keywords)) {
      analysis.allergens.push({
        name: allergenInfo.name,
        severity: allergenInfo.severity,
        message: allergenInfo.message,
      });
      if (allergenInfo.severity === "critical")
        analysis.severityLevel = "critical";
      else if (
        allergenInfo.severity === "high" &&
        analysis.severityLevel !== "critical"
      )
        analysis.severityLevel = "warning";
    }
  }

  if (nutrition.sugar) {
    if (nutrition.sugar >= 40) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.veryHighSugar,
        value: nutrition.sugar,
      });
      if (analysis.severityLevel !== "critical")
        analysis.severityLevel = "critical";
    } else if (nutrition.sugar >= 25) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.highSugar,
        value: nutrition.sugar,
      });
      if (
        analysis.severityLevel !== "critical" &&
        analysis.severityLevel !== "warning"
      )
        analysis.severityLevel = "warning";
    }
  }
  if (nutrition.sodium) {
    if (nutrition.sodium >= 1200) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.veryHighSodium,
        value: nutrition.sodium,
      });
      if (analysis.severityLevel !== "critical")
        analysis.severityLevel = "critical";
    } else if (nutrition.sodium >= 800) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.highSodium,
        value: nutrition.sodium,
      });
      if (analysis.severityLevel !== "critical")
        analysis.severityLevel = "warning";
    }
  }
  if (nutrition.saturatedFat) {
    if (nutrition.saturatedFat >= 20) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.veryHighSaturatedFat,
        value: nutrition.saturatedFat,
      });
      if (analysis.severityLevel !== "critical")
        analysis.severityLevel = "critical";
    } else if (nutrition.saturatedFat >= 12) {
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.highSaturatedFat,
        value: nutrition.saturatedFat,
      });
      if (analysis.severityLevel !== "critical")
        analysis.severityLevel = "warning";
    }
  }
  if (nutrition.cholesterol && nutrition.cholesterol >= 300)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.veryHighCholesterol,
      value: nutrition.cholesterol,
    });
  else if (nutrition.cholesterol && nutrition.cholesterol >= 200)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highCholesterol,
      value: nutrition.cholesterol,
    });
  if (nutrition.carbs && nutrition.carbs >= 80)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.veryHighCarbs,
      value: nutrition.carbs,
    });
  else if (nutrition.carbs && nutrition.carbs >= 50)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highCarbs,
      value: nutrition.carbs,
    });
  if (nutrition.calories && nutrition.calories >= 900)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.veryHighCalories,
      value: nutrition.calories,
    });
  else if (nutrition.calories && nutrition.calories >= 600)
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highCalories,
      value: nutrition.calories,
    });
  if (
    nutrition.fiber !== undefined &&
    nutrition.fiber < 3 &&
    nutrition.fiber > 0
  )
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.lowFiber,
      value: nutrition.fiber,
    });

  if (containsIngredient(["alcohol", "beer", "wine", "liquor", "spirit"]))
    analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAlcohol);
  if (containsIngredient(["caffeine", "coffee", "tea", "energy drink"])) {
    const caffeineAmount = containsIngredient(["energy drink"]) ? 150 : 80;
    if (caffeineAmount >= 150)
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.highCaffeine,
        value: caffeineAmount,
      });
    else
      analysis.nutritionalConcerns.push({
        ...NUTRITIONAL_CONCERNS.containsCaffeine,
        value: caffeineAmount,
      });
  }
  if (containsIngredient(["msg", "monosodium glutamate"]))
    analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsMSG);
  if (containsIngredient(["red 40", "yellow 5", "blue 1", "artificial color"]))
    analysis.nutritionalConcerns.push(
      NUTRITIONAL_CONCERNS.containsArtificialColors,
    );
  if (containsIngredient(["aspartame"]))
    analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsAspartame);
  if (
    containsIngredient([
      "spinach",
      "rhubarb",
      "beets",
      "nuts",
      "chocolate",
      "tea",
    ])
  )
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highOxalate,
      value: 85,
    });
  if (containsIngredient(["banana", "potato", "avocado", "spinach"]))
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highPotassium,
      value: 550,
    });
  if (containsIngredient(["broccoli", "cabbage", "kale", "cauliflower", "soy"]))
    analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsGoitrogens);
  if (
    containsIngredient([
      "onion",
      "garlic",
      "wheat",
      "beans",
      "lentils",
      "cashew",
    ])
  )
    analysis.nutritionalConcerns.push(NUTRITIONAL_CONCERNS.containsFODMAPs);
  if (containsIngredient(["anchovy", "sardine", "liver", "kidney", "mackerel"]))
    analysis.nutritionalConcerns.push({
      ...NUTRITIONAL_CONCERNS.highPurine,
      value: 180,
    });

  for (const condition of CLINICAL_CONDITIONS) {
    let matched = false,
      message = null,
      severity = "info";
    if (condition.thresholds) {
      if (
        condition.thresholds.sugarHigh &&
        nutrition.sugar >= condition.thresholds.sugarHigh.value
      ) {
        matched = true;
        message = condition.thresholds.sugarHigh.message.replace(
          "{value}",
          nutrition.sugar,
        );
        severity = "warning";
      } else if (
        condition.thresholds.sugar &&
        nutrition.sugar >= condition.thresholds.sugar.value
      ) {
        matched = true;
        message = condition.thresholds.sugar.message.replace(
          "{value}",
          nutrition.sugar,
        );
      } else if (
        condition.thresholds.sodiumHigh &&
        nutrition.sodium >= condition.thresholds.sodiumHigh.value
      ) {
        matched = true;
        message = condition.thresholds.sodiumHigh.message.replace(
          "{value}",
          nutrition.sodium,
        );
        severity = "warning";
      } else if (
        condition.thresholds.sodium &&
        nutrition.sodium >= condition.thresholds.sodium.value
      ) {
        matched = true;
        message = condition.thresholds.sodium.message.replace(
          "{value}",
          nutrition.sodium,
        );
      } else if (
        condition.thresholds.saturatedFatHigh &&
        nutrition.saturatedFat >= condition.thresholds.saturatedFatHigh.value
      ) {
        matched = true;
        message = condition.thresholds.saturatedFatHigh.message.replace(
          "{value}",
          nutrition.saturatedFat,
        );
        severity = "warning";
      } else if (
        condition.thresholds.saturatedFat &&
        nutrition.saturatedFat >= condition.thresholds.saturatedFat.value
      ) {
        matched = true;
        message = condition.thresholds.saturatedFat.message.replace(
          "{value}",
          nutrition.saturatedFat,
        );
      } else if (
        condition.thresholds.cholesterolHigh &&
        nutrition.cholesterol >= condition.thresholds.cholesterolHigh.value
      ) {
        matched = true;
        message = condition.thresholds.cholesterolHigh.message.replace(
          "{value}",
          nutrition.cholesterol,
        );
        severity = "warning";
      } else if (
        condition.thresholds.cholesterol &&
        nutrition.cholesterol >= condition.thresholds.cholesterol.value
      ) {
        matched = true;
        message = condition.thresholds.cholesterol.message.replace(
          "{value}",
          nutrition.cholesterol,
        );
      } else if (
        condition.thresholds.carbsHigh &&
        nutrition.carbs >= condition.thresholds.carbsHigh.value
      ) {
        matched = true;
        message = condition.thresholds.carbsHigh.message.replace(
          "{value}",
          nutrition.carbs,
        );
        severity = "warning";
      } else if (
        condition.thresholds.carbs &&
        nutrition.carbs >= condition.thresholds.carbs.value
      ) {
        matched = true;
        message = condition.thresholds.carbs.message.replace(
          "{value}",
          nutrition.carbs,
        );
      } else if (
        condition.thresholds.calories &&
        nutrition.calories >= condition.thresholds.calories.value
      ) {
        matched = true;
        message = condition.thresholds.calories.message.replace(
          "{value}",
          nutrition.calories,
        );
      } else if (
        condition.thresholds.caffeine &&
        nutrition.caffeine >= condition.thresholds.caffeine.value
      ) {
        matched = true;
        message = condition.thresholds.caffeine.message.replace(
          "{value}",
          nutrition.caffeine,
        );
      } else if (
        condition.thresholds.alcohol &&
        containsIngredient(["alcohol", "beer", "wine", "liquor"])
      ) {
        matched = true;
        message = condition.thresholds.alcohol.message;
      } else if (
        condition.thresholds.goitrogens &&
        containsIngredient([
          "broccoli",
          "cabbage",
          "kale",
          "cauliflower",
          "soy",
        ])
      ) {
        matched = true;
        message = condition.thresholds.goitrogens.message;
      } else if (
        condition.thresholds.msg &&
        containsIngredient(["msg", "monosodium glutamate"])
      ) {
        matched = true;
        message = condition.thresholds.msg.message;
      } else if (
        condition.thresholds.artificialSweeteners &&
        containsIngredient(["aspartame", "sucralose", "saccharin"])
      ) {
        matched = true;
        message = condition.thresholds.artificialSweeteners.message;
      } else if (
        condition.thresholds.gluten &&
        containsIngredient(["wheat", "barley", "rye", "gluten"])
      ) {
        matched = true;
        message = condition.thresholds.gluten.message;
        severity = "critical";
      } else if (
        condition.thresholds.lactose &&
        containsIngredient(["milk", "cream", "cheese", "yogurt"])
      ) {
        matched = true;
        message = condition.thresholds.lactose.message.replace("{value}", 8);
      } else if (
        condition.thresholds.fodmaps &&
        containsIngredient(["onion", "garlic", "beans", "lentils", "cashew"])
      ) {
        matched = true;
        message = condition.thresholds.fodmaps.message;
      } else if (
        condition.thresholds.fat &&
        nutrition.fat >= condition.thresholds.fat.value
      ) {
        matched = true;
        message = condition.thresholds.fat.message.replace(
          "{value}",
          nutrition.fat,
        );
      } else if (
        condition.thresholds.spicy &&
        containsIngredient(["chili", "pepper", "spicy", "hot"])
      ) {
        matched = true;
        message = condition.thresholds.spicy.message;
      } else if (
        condition.thresholds.purines &&
        containsIngredient(["anchovy", "sardine", "liver", "mackerel"])
      ) {
        matched = true;
        message = condition.thresholds.purines.message.replace("{value}", 150);
      } else if (
        condition.thresholds.aspartame &&
        containsIngredient(["aspartame"])
      ) {
        matched = true;
        message = condition.thresholds.aspartame.message;
      } else if (
        condition.thresholds.sulfites &&
        containsIngredient(["sulfite", "preservative"])
      ) {
        matched = true;
        message = condition.thresholds.sulfites.message;
      } else if (
        condition.thresholds.artificialColors &&
        containsIngredient(["red 40", "yellow 5", "blue 1"])
      ) {
        matched = true;
        message = condition.thresholds.artificialColors.message;
      } else if (
        condition.thresholds.fiber &&
        nutrition.fiber >= condition.thresholds.fiber.value
      ) {
        matched = true;
        message = condition.thresholds.fiber.message.replace(
          "{value}",
          nutrition.fiber,
        );
      } else if (
        condition.thresholds.potassium &&
        nutrition.potassium >= condition.thresholds.potassium.value
      ) {
        matched = true;
        message = condition.thresholds.potassium.message.replace(
          "{value}",
          nutrition.potassium,
        );
      } else if (
        condition.thresholds.oxalate &&
        containsIngredient(["spinach", "rhubarb", "beets", "nuts"])
      ) {
        matched = true;
        message = condition.thresholds.oxalate.message.replace("{value}", 85);
      } else if (
        condition.thresholds.iron &&
        nutrition.iron >= condition.thresholds.iron.value
      ) {
        matched = true;
        message = condition.thresholds.iron.message.replace(
          "{value}",
          nutrition.iron,
        );
      } else if (
        condition.thresholds.calcium &&
        nutrition.calcium >= condition.thresholds.calcium.value
      ) {
        matched = true;
        message = condition.thresholds.calcium.message.replace(
          "{value}",
          nutrition.calcium,
        );
      } else if (
        condition.thresholds.processedMeats &&
        containsIngredient(["bacon", "sausage", "ham", "salami", "hot dog"])
      ) {
        matched = true;
        message = condition.thresholds.processedMeats.message;
      } else if (
        condition.thresholds.redMeat &&
        containsIngredient(["beef", "lamb", "pork", "veal"])
      ) {
        matched = true;
        message = condition.thresholds.redMeat.message;
      } else if (
        condition.thresholds.protein &&
        nutrition.protein >= condition.thresholds.protein.value
      ) {
        matched = true;
        message = condition.thresholds.protein.message.replace(
          "{value}",
          nutrition.protein,
        );
      }
    }
    if (matched && message) {
      analysis.clinicalConditions.push({
        conditionId: condition.id,
        name: condition.name,
        icon: condition.icon,
        color: condition.color,
        bgColor: condition.bgColor,
        description: condition.description,
        severity: severity,
        message: message,
        recommendations: condition.recommendations,
      });
      if (severity === "critical") analysis.severityLevel = "critical";
      else if (severity === "warning" && analysis.severityLevel !== "critical")
        analysis.severityLevel = "warning";
    }
  }

  analysis.totalIssues =
    analysis.allergens.length +
    analysis.nutritionalConcerns.length +
    analysis.clinicalConditions.length;
  return analysis;
};

// ========== FORMAT NUTRITION INFO ==========
const formatNutritionInfo = (nutrition) => {
  if (!nutrition) return [];
  return [
    {
      label: "Calories",
      value: nutrition.calories,
      unit: "kcal",
      icon: "🔥",
      color: "text-orange-600",
    },
    {
      label: "Protein",
      value: nutrition.protein,
      unit: "g",
      icon: "💪",
      color: "text-blue-600",
    },
    {
      label: "Carbs",
      value: nutrition.carbs,
      unit: "g",
      icon: "🍚",
      color: "text-yellow-600",
    },
    {
      label: "Fiber",
      value: nutrition.fiber,
      unit: "g",
      icon: "🌿",
      color: "text-green-600",
    },
    {
      label: "Fat",
      value: nutrition.fat,
      unit: "g",
      icon: "🥑",
      color: "text-purple-600",
    },
    {
      label: "Saturated Fat",
      value: nutrition.saturatedFat,
      unit: "g",
      icon: "⚠️",
      color: "text-red-600",
    },
    {
      label: "Sugar",
      value: nutrition.sugar,
      unit: "g",
      icon: "🍬",
      color: "text-pink-600",
    },
    {
      label: "Sodium",
      value: nutrition.sodium,
      unit: "mg",
      icon: "🧂",
      color: "text-gray-600",
    },
    {
      label: "Cholesterol",
      value: nutrition.cholesterol,
      unit: "mg",
      icon: "🫀",
      color: "text-red-500",
    },
    {
      label: "Potassium",
      value: nutrition.potassium,
      unit: "mg",
      icon: "🍌",
      color: "text-purple-500",
    },
    {
      label: "Iron",
      value: nutrition.iron,
      unit: "mg",
      icon: "🩸",
      color: "text-red-400",
    },
    {
      label: "Calcium",
      value: nutrition.calcium,
      unit: "mg",
      icon: "🦴",
      color: "text-gray-500",
    },
    {
      label: "Vitamin C",
      value: nutrition.vitaminC,
      unit: "mg",
      icon: "🍊",
      color: "text-orange-400",
    },
  ].filter((n) => n.value !== undefined && n.value !== null && n.value > 0);
};

// ========== LOADING MODAL ==========
const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [currentApi, setCurrentApi] = useState("edamam");

  const loadingSteps = [
    {
      message: "Connecting to Edamam Nutrition API...",
      icon: "🔬",
      api: "edamam",
    },
    { message: "Analyzing recipe ingredients...", icon: "🥗", api: "edamam" },
    {
      message: "Calculating nutritional values...",
      icon: "📊",
      api: "analysis",
    },
    { message: "Scanning for allergens...", icon: "⚠️", api: "allergens" },
    {
      message: "Checking nutritional concerns...",
      icon: "🔍",
      api: "concerns",
    },
    {
      message: "Analyzing clinical conditions...",
      icon: "🩺",
      api: "clinical",
    },
    { message: "Generating AI insights...", icon: "🤖", api: "gemini" },
    {
      message: "Preparing recommendations...",
      icon: "💚",
      api: "recommendations",
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(
      () => setProgress((p) => (p >= 100 ? 100 : p + 1.5)),
      40,
    );
    const stepInterval = setInterval(
      () =>
        setLoadingStep((prev) => {
          const newStep = prev < loadingSteps.length - 1 ? prev + 1 : prev;
          if (loadingSteps[newStep]?.api)
            setCurrentApi(loadingSteps[newStep].api);
          return newStep;
        }),
      600,
    );
    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
      >
        <div
          className={`bg-gradient-to-r ${CATEGORY_COLORS[itemCategory] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 text-8xl animate-spin-slow">
              🍽️
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="bg-white/20 p-1.5 sm:p-2 rounded-full"
            >
              {currentApi === "gemini" ? (
                <AIIcon className="text-xl sm:text-2xl" />
              ) : currentApi === "edamam" ? (
                <ScienceIcon className="text-xl sm:text-2xl" />
              ) : currentApi === "allergens" ? (
                <DangerousIcon className="text-xl sm:text-2xl" />
              ) : currentApi === "clinical" ? (
                <LocalHospitalIcon className="text-xl sm:text-2xl" />
              ) : (
                <RestaurantIcon className="text-xl sm:text-2xl" />
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-base sm:text-xl truncate">
                Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm truncate">
                {itemName}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>Comprehensive health analysis in progress...</span>
              <span className="font-mono font-bold text-orange-600">
                {progress}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {loadingSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${loadingStep > idx ? "bg-green-500 text-white" : loadingStep === idx ? "bg-orange-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"}`}
                >
                  {loadingStep > idx
                    ? "✓"
                    : loadingStep === idx
                      ? "●"
                      : idx + 1}
                </div>
                <span
                  className={`text-xs sm:text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"} flex-1`}
                >
                  {step.message}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-2 sm:p-3 border border-orange-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
              <span className="text-orange-500">🔌</span> Analysis Status:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${currentApi === "edamam" ? "bg-green-500 animate-pulse" : loadingStep > 0 ? "bg-green-300" : "bg-gray-300"}`}
                />
                <span className="text-[9px] sm:text-xs">Nutrition</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${currentApi === "allergens" ? "bg-red-500 animate-pulse" : loadingStep > 3 ? "bg-green-300" : "bg-gray-300"}`}
                />
                <span className="text-[9px] sm:text-xs">Allergens</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${currentApi === "clinical" ? "bg-yellow-500 animate-pulse" : loadingStep > 5 ? "bg-green-300" : "bg-gray-300"}`}
                />
                <span className="text-[9px] sm:text-xs">Conditions</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${currentApi === "gemini" ? "bg-purple-500 animate-pulse" : loadingStep > 6 ? "bg-green-300" : "bg-gray-300"}`}
                />
                <span className="text-[9px] sm:text-xs">AI Insights</span>
              </div>
            </div>
          </div>
          <div className="text-center text-[9px] sm:text-xs text-gray-400">
            ✨ Analyzing allergens, nutritional concerns, and 35+ health
            conditions
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ========== RESULT MODAL ==========
const ResultModal = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  onTrackOrder,
}) => {
  if (!isOpen) return null;
  const hasOrderId = message && message.includes("Order ID:");
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div
          className={`p-5 text-center ${type === "success" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            {type === "success" ? (
              <CheckCircleIcon className="text-white text-4xl" />
            ) : (
              <ErrorIcon className="text-white text-4xl" />
            )}
          </div>
          <h2 className="text-white font-bold text-xl">{title}</h2>
        </div>
        <div className="p-6">
          {hasOrderId ? (
            <div className="space-y-4">
              {message.split("\n").map((line, idx) => {
                if (line.includes("Order ID:")) {
                  const orderId = line.split("Order ID:")[1]?.trim();
                  return (
                    <div
                      key={idx}
                      className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ConfirmationNumberIcon className="text-orange-600 text-sm" />
                        <span className="text-xs text-orange-600 font-semibold uppercase tracking-wide">
                          Order ID
                        </span>
                      </div>
                      <p className="text-gray-800 font-mono font-bold text-xl tracking-wider text-center">
                        {orderId}
                      </p>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        ⭐ Save this ID to track your order
                      </p>
                    </div>
                  );
                } else if (line.includes("Thank you")) {
                  return (
                    <div key={idx} className="text-center">
                      <p className="text-gray-800 font-bold text-lg">{line}</p>
                    </div>
                  );
                } else if (line.includes("📍 Table:")) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2"
                    >
                      <TableIcon className="text-sm text-orange-500" />
                      <span className="text-sm font-medium">
                        {line.replace("📍 ", "")}
                      </span>
                    </div>
                  );
                } else if (line.includes("💰 Total:")) {
                  return (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-xl p-3 text-center"
                    >
                      <p className="text-gray-500 text-xs">Total Amount</p>
                      <p className="text-orange-600 font-bold text-2xl">
                        {line.split("💰")[1]?.trim() || line}
                      </p>
                    </div>
                  );
                } else if (line.includes("⏱️ Est. time:")) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-2 text-gray-600 bg-blue-50 rounded-xl p-2"
                    >
                      <TimerIcon className="text-blue-500 text-sm" />
                      <span className="text-sm font-medium">
                        {line.replace("⏱️ ", "")}
                      </span>
                    </div>
                  );
                } else if (line.trim() && !line.includes("🆔")) {
                  return (
                    <p key={idx} className="text-gray-600 text-center text-sm">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-center whitespace-pre-line">
              {message}
            </p>
          )}
          <div className="mt-6 space-y-2">
            {hasOrderId && onTrackOrder && (
              <button
                onClick={() => {
                  onClose();
                  onTrackOrder();
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <SearchIcon fontSize="small" /> Track My Order Now
              </button>
            )}
            <button
              onClick={onClose}
              className={`w-full ${hasOrderId ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"} py-3 rounded-xl font-semibold transition`}
            >
              {hasOrderId ? "Continue Browsing" : "OK"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ========== COMPREHENSIVE ANALYSIS RESULT MODAL ==========
const AnalysisResultModal = ({
  isOpen,
  onClose,
  analysis,
  item,
  onContinue,
}) => {
  const [expandedSection, setExpandedSection] = useState(null);
  if (!isOpen || !analysis) return null;
  const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
  const healthScore =
    item?.geminiInsights?.healthScore ||
    Math.max(0, 100 - analysis.totalIssues * 5);
  const severityColors = {
    critical: "bg-red-600",
    warning: "bg-orange-500",
    info: "bg-blue-500",
  };
  const severityBadge = (severity) =>
    ({
      critical: "bg-red-600 text-white",
      warning: "bg-orange-500 text-white",
      high: "bg-red-500 text-white",
      moderate: "bg-yellow-500 text-white",
      info: "bg-blue-500 text-white",
      mild: "bg-green-500 text-white",
    })[severity] || "bg-gray-500 text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
      >
        <div
          className={`bg-gradient-to-r ${CATEGORY_COLORS[item?.category] || CATEGORY_COLORS.default} p-4 sm:p-5 text-white relative flex-shrink-0`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 text-8xl">🍽️</div>
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-lg sm:text-xl truncate">
                  {item?.name}
                </h2>
                <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  <StarIcon className="text-yellow-300 text-sm" />
                  <span>Health Score: {healthScore}/100</span>
                </div>
                {analysis.severityLevel !== "safe" && (
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${severityColors[analysis.severityLevel]} bg-opacity-80`}
                  >
                    <WarningIcon className="text-white text-sm" />
                    <span>{analysis.severityLevel.toUpperCase()}</span>
                  </div>
                )}
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <CloseIcon className="text-white text-base sm:text-xl" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          {item?.geminiInsights?.summary && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <AIIcon className="text-purple-600 text-sm" />
                <h3 className="font-semibold text-purple-800 text-sm">
                  AI Nutritional Summary
                </h3>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm">
                {item.geminiInsights.summary}
              </p>
            </motion.div>
          )}
          {item?.geminiInsights?.benefits?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border border-green-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <FavoriteIcon className="text-green-600 text-sm" />
                <h3 className="font-semibold text-green-800 text-sm">
                  Health Benefits
                </h3>
              </div>
              <ul className="space-y-1">
                {item.geminiInsights.benefits
                  .slice(0, 3)
                  .map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-gray-700 text-xs sm:text-sm flex items-start gap-2"
                    >
                      <CheckIcon className="text-green-500 text-sm mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          )}
          {analysis.allergens.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 sm:p-4 border-2 border-red-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <DangerousIcon className="text-red-600 text-sm" />
                <h3 className="font-semibold text-red-800 text-sm">
                  ⚠️ Allergen Alert
                </h3>
              </div>
              <div className="space-y-2">
                {analysis.allergens.map((allergen, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-2 border border-red-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-700 text-sm">
                        {allergen.name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${allergen.severity === "critical" ? "bg-red-600 text-white" : "bg-orange-500 text-white"}`}
                      >
                        {allergen.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">
                      {allergen.message}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {analysis.nutritionalConcerns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-3 sm:p-4 border border-yellow-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <WarningIcon className="text-yellow-600 text-sm" />
                <h3 className="font-semibold text-yellow-800 text-sm">
                  Nutritional Considerations
                </h3>
              </div>
              <div className="space-y-1.5">
                {analysis.nutritionalConcerns
                  .slice(0, 5)
                  .map((concern, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <WarningAmberIcon className="text-yellow-600 text-sm mt-0.5" />
                      <span className="text-gray-700">
                        {concern.message.replace("{value}", concern.value)}
                      </span>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
          {analysis.clinicalConditions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <LocalHospitalIcon className="text-blue-600 text-sm" />
                <h3 className="font-semibold text-blue-800 text-sm">
                  Health Condition Alerts
                </h3>
              </div>
              <div className="space-y-2">
                {analysis.clinicalConditions
                  .slice(0, 5)
                  .map((condition, idx) => (
                    <div
                      key={idx}
                      className={`${condition.bgColor} rounded-lg p-2`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{condition.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="font-medium text-gray-800 text-sm">
                              {condition.name}
                            </span>
                            <span
                              className={`text-[8px] px-1.5 py-0.5 rounded-full ${severityBadge(condition.severity)}`}
                            >
                              {condition.severity?.toUpperCase() || "INFO"}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                            {condition.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
          <div>
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "ingredients" ? null : "ingredients",
                )
              }
              className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🥗</span>
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  Ingredients
                </span>
                <span className="text-xs text-gray-500">
                  ({item?.ingredients?.length || 0} items)
                </span>
              </div>
              {expandedSection === "ingredients" ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </button>
            {expandedSection === "ingredients" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item?.ingredients?.map((ing, idx) => {
                    let hasAllergen = false;
                    for (const [key, allergen] of Object.entries(
                      ALLERGEN_DATABASE,
                    )) {
                      if (
                        allergen.keywords.some((kw) =>
                          ing.toLowerCase().includes(kw.toLowerCase()),
                        )
                      ) {
                        hasAllergen = true;
                        break;
                      }
                    }
                    return (
                      <span
                        key={idx}
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm border ${hasAllergen ? "bg-red-100 border-red-300 text-red-700 font-medium" : "bg-white border-orange-100"}`}
                      >
                        {ing} {hasAllergen && "⚠️"}
                      </span>
                    );
                  })}
                </div>
                {analysis.allergens.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-red-200">
                    <p className="text-[10px] text-red-600 flex items-center gap-1">
                      <DangerousIcon className="text-[12px]" /> Ingredients
                      marked with ⚠️ contain common allergens
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
          {nutritionInfo.length > 0 && (
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "nutrition" ? null : "nutrition",
                  )
                }
                className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition"
              >
                <div className="flex items-center gap-2">
                  <Nature className="text-emerald-600 text-base sm:text-xl" />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Nutrition Facts
                  </span>
                </div>
                {expandedSection === "nutrition" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </button>
              {expandedSection === "nutrition" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl"
                >
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {nutritionInfo.map((n, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-emerald-100 pb-2"
                      >
                        <span className={`text-[11px] sm:text-sm ${n.color}`}>
                          {n.icon} {n.label}
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {n.value} {n.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-200 text-center">
                    <p className="text-[10px] text-gray-500">
                      💡 Individual needs may vary. Consult a healthcare
                      provider for personalized advice.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {analysis.allergens.length}
                </div>
                <div className="text-[10px] text-gray-600">Allergens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {analysis.nutritionalConcerns.length}
                </div>
                <div className="text-[10px] text-gray-600">Concerns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {analysis.clinicalConditions.length}
                </div>
                <div className="text-[10px] text-gray-600">Conditions</div>
              </div>
            </div>
          </div>
          {item?.geminiInsights?.funFact && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
              <div className="flex items-center gap-2">
                <LightbulbIcon className="text-indigo-600 text-sm" />
                <h3 className="font-semibold text-indigo-800 text-sm">
                  Did You Know?
                </h3>
              </div>
              <p className="text-gray-700 text-xs mt-1">
                {item.geminiInsights.funFact}
              </p>
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <EditIcon fontSize="small" /> Customize Order
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== TABLE SELECTOR MODAL ==========
const TableSelectorModal = ({ isOpen, onClose, onConfirm }) => {
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;
  const handleConfirm = async () => {
    if (!tableNumber || !customerName) {
      toast.error("Please enter table number and name");
      return;
    }
    setIsLoading(true);
    await onConfirm(tableNumber, customerName);
    setIsLoading(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-20 -right-20 text-9xl">🍽️</div>
          <div className="absolute -bottom-20 -left-20 text-9xl">🍕</div>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 relative">
          <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
            <RestaurantIcon /> Welcome to NutriScan·AI
          </h2>
          <p className="text-orange-100 text-xs mt-1">
            Comprehensive Health Analysis • Allergens • Nutrition • 35+
            Conditions
          </p>
        </div>
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Number *
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="p-3 sm:p-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Start Ordering"}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="bg-gradient-to-br from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
            <CartIcon /> Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <CloseIcon className="text-white text-base sm:text-xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <CartIcon className="text-gray-300 text-4xl mx-auto mb-2" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="mb-3 pb-3 border-b border-orange-100"
              >
                <div className="flex justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm truncate">
                      {item.name}
                    </h3>
                    {item.customizations?.length > 0 && (
                      <div className="text-[10px] text-gray-500">
                        {item.customizations.map((c) => `• ${c}`).join(" ")}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <p className="text-[10px] text-orange-600">
                        📝 {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="text-orange-600 font-bold text-sm">
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
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
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
          <div className="p-3 sm:p-4 border-t flex-shrink-0">
            <div className="flex justify-between font-bold mb-3">
              <span>Total</span>
              <span className="text-orange-600">
                RWF {getTotal().toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Confirm Order - Table {tableInfo.tableNumber}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ========== ORDER STATUS MODAL ==========
const OrderStatusModal = ({
  isOpen,
  onClose,
  onCheckOrder,
  liveStatus,
  initialOrderId = "",
}) => {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const handleCheckOrder = async () => {
    if (!orderId.trim()) {
      toast.error("Please enter an Order ID");
      return;
    }
    setIsLoading(true);
    setError(null);
    setOrderDetails(null);
    try {
      const result = await onCheckOrder(orderId);
      if (result && result.success === true && result.data) {
        const orderData = result.data;
        const transformedOrder = {
          orderId: orderData.orderId || "N/A",
          customerName: orderData.personDetails?.name || "N/A",
          tableNumber: orderData.personDetails?.tableNumber || "N/A",
          status: orderData.status || "unknown",
          items: (orderData.items || []).map((item) => ({
            name: item.name,
            quantity: item.quantity,
            finalPrice: item.finalPrice,
          })),
          total: (orderData.items || []).reduce(
            (sum, item) => sum + (item.finalPrice || 0),
            0,
          ),
        };
        setOrderDetails(transformedOrder);
        toast.success(`Order ${orderId.slice(-8)} found!`);
      } else {
        setError("Order not found. Please check the Order ID.");
        toast.error("Order not found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch order details.");
      toast.error("Failed to fetch order");
    } finally {
      setIsLoading(false);
    }
  };
  const getStatusColor = (status) =>
    ({
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-yellow-100 text-yellow-800",
      ready: "bg-green-100 text-green-800",
      completed: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    })[status?.toLowerCase()] || "bg-gray-100 text-gray-600";
  const getStatusIcon = (status) =>
    ({
      confirmed: <CheckCircleIcon className="text-blue-500" />,
      preparing: <TimerIcon className="text-yellow-500 animate-pulse" />,
      ready: <CheckCircleIcon className="text-green-500" />,
      completed: <CheckCircleIcon className="text-purple-500" />,
      cancelled: <ErrorIcon className="text-red-500" />,
    })[status?.toLowerCase()] || <InfoIcon className="text-gray-500" />;
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl flex flex-col relative z-10 max-h-[90vh]"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <ConfirmationNumberIcon className="text-white" />
            <h2 className="text-white font-bold text-base sm:text-xl">
              Track Your Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <CloseIcon className="text-white" />
          </button>
        </div>
        <div className="p-3 sm:p-5 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your Order ID"
                className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-400"
                onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
              />
            </div>
            <button
              onClick={handleCheckOrder}
              disabled={isLoading}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Track"
              )}
            </button>
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <ErrorIcon fontSize="small" /> {error}
            </div>
          )}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div
                className={`rounded-xl p-3 border-2 ${getStatusColor(orderDetails.status)}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(orderDetails.status)}
                    <span className="font-mono text-xs">
                      ID: {orderDetails.orderId}
                    </span>
                  </div>
                  <span className="text-lg font-bold capitalize">
                    {orderDetails.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <PersonIcon fontSize="small" className="text-gray-500" />
                  <p className="font-semibold">
                    {orderDetails.customerName || "N/A"}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3">
                  <TableIcon fontSize="small" className="text-gray-500" />
                  <p className="font-semibold">
                    Table {orderDetails.tableNumber || "N/A"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <h3 className="font-semibold mb-2 text-sm">
                  Items ({orderDetails.items?.length || 0})
                </h3>
                {orderDetails.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between py-1 border-b text-sm"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>RWF {item.finalPrice?.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 mt-2 border-t">
                  <span>Total</span>
                  <span>RWF {orderDetails.total?.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div className="p-3 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 py-2 rounded-xl font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== CUSTOMIZATION MODAL ==========
const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
  const [customizations, setCustomizations] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  if (!isOpen) return null;
  const customizationOptions = [
    { label: "No salt", category: "Sodium", icon: "🧂" },
    { label: "Low sodium", category: "Sodium", icon: "🧂" },
    { label: "No MSG", category: "Additives", icon: "⚠️" },
    { label: "Less oil", category: "Fat", icon: "🫒" },
    { label: "No oil", category: "Fat", icon: "🫒" },
    { label: "Use olive oil", category: "Fat", icon: "🫒" },
    { label: "No butter", category: "Dairy", icon: "🧈" },
    { label: "Extra spicy", category: "Flavor", icon: "🌶️" },
    { label: "Mild spice", category: "Flavor", icon: "🌶️" },
    { label: "No spice", category: "Flavor", icon: "🌶️" },
    { label: "No onions", category: "Allium", icon: "🧅" },
    { label: "No garlic", category: "Allium", icon: "🧄" },
    { label: "Gluten-free", category: "Allergen", icon: "🌾" },
    { label: "Dairy-free", category: "Allergen", icon: "🥛" },
    { label: "Egg-free", category: "Allergen", icon: "🥚" },
    { label: "Nut-free", category: "Allergen", icon: "🥜" },
    { label: "Vegan", category: "Diet", icon: "🌱" },
    { label: "Vegetarian", category: "Diet", icon: "🥬" },
    { label: "Keto-friendly", category: "Diet", icon: "🥓" },
    { label: "Low carb", category: "Diet", icon: "🍞" },
    { label: "High protein", category: "Diet", icon: "💪" },
    { label: "Extra cheese", category: "Topping", icon: "🧀" },
    { label: "No cheese", category: "Topping", icon: "🧀" },
    { label: "No added sugar", category: "Sugar", icon: "🍬" },
    { label: "Grilled instead of fried", category: "Cooking", icon: "🔥" },
    { label: "Baked instead of fried", category: "Cooking", icon: "🔥" },
    { label: "Half portion", category: "Portion", icon: "📏" },
    { label: "Extra vegetables", category: "Nutrition", icon: "🥗" },
  ];
  const groupedOptions = customizationOptions.reduce((acc, opt) => {
    if (!acc[opt.category]) acc[opt.category] = [];
    acc[opt.category].push(opt);
    return acc;
  }, {});
  const toggleCustomization = (opt) => {
    if (customizations.includes(opt.label))
      setCustomizations((prev) => prev.filter((c) => c !== opt.label));
    else setCustomizations((prev) => [...prev, opt.label]);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative"
      >
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-t-xl flex justify-between">
          <h2 className="text-white font-bold flex items-center gap-2">
            <EditIcon /> Customize {item?.name}
          </h2>
          <button onClick={onClose} className="p-1 bg-white/20 rounded-full">
            <CloseIcon className="text-white" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <span className="text-orange-600 font-bold text-xl">
              RWF {item?.price?.toLocaleString()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🥗 Ingredients</h3>
            <div className="flex flex-wrap gap-1">
              {item?.ingredients?.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-full flex justify-between p-2 bg-orange-50 rounded-xl"
            >
              <span>
                ✨ Customization Options{" "}
                {customizations.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-1 rounded-full ml-1">
                    {customizations.length}
                  </span>
                )}
              </span>
              {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            {showOptions && (
              <div className="mt-3 space-y-3">
                {Object.entries(groupedOptions).map(([category, options]) => (
                  <div key={category}>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleCustomization(opt)}
                          className={`px-2 py-1 rounded-lg text-xs text-left flex items-center gap-1 ${customizations.includes(opt.label) ? "bg-orange-500 text-white" : "bg-gray-100"}`}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Special instructions (e.g., allergies, preferences)..."
            className="w-full p-2 border rounded-xl text-sm"
            rows="3"
          />
        </div>
        <div className="p-3 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddToCart(item, customizations, specialInstructions);
              onClose();
            }}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== FLOATING TIMER ==========
const FloatingTimer = ({
  orderId,
  tableNumber,
  initialDuration,
  onExpire,
  onOpenModal,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onExpire?.();
            return 0;
          }
          return prev - 1;
        }),
      1000,
    );
    return () => clearInterval(interval);
  }, [onExpire]);
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const getTimerColor = () =>
    timeLeft <= 60
      ? "bg-red-500 animate-pulse"
      : timeLeft <= 300
        ? "bg-orange-500"
        : "bg-green-500";
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      onClick={onOpenModal}
      className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-3 py-2 flex items-center gap-2`}
    >
      <TimerIcon className="animate-pulse" />
      <div>
        <span className="text-xs">
          Order #{orderId?.slice(-8)} | Table {tableNumber}
        </span>
        <span className="text-lg font-mono font-bold block">
          {formatTime(timeLeft)}
        </span>
      </div>
    </motion.div>
  );
};

// ========== PAYMENT MODAL ==========
const PaymentModal = ({
  isOpen,
  onClose,
  totalAmount,
  onPaymentConfirm,
  orderId,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  if (!isOpen) return null;
  const handleSubmitPayment = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast.error("Please enter a valid MTN Rwanda phone number");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentConfirm(phoneNumber);
      onClose();
      toast.success(
        `Payment of RWF ${totalAmount.toLocaleString()} via Mobile Money successful!`,
      );
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h2 className="text-xl font-bold">Complete Payment</h2>
          </div>
          <p className="text-green-100 text-sm mt-1">
            Order ID: {orderId?.slice(-8) || "N/A"}
          </p>
          <p className="text-white text-2xl font-bold mt-2">
            RWF {totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MTN Rwanda Phone Number
            </label>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 px-3 py-2 rounded-lg text-gray-600">
                +250
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="78XXXXXXX"
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter the phone number registered with MTN Mobile Money
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-700 flex items-start gap-2">
              <InfoIcon className="text-sm mt-0.5" /> You will receive a payment
              request on your phone. Approve it to complete your order.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPayment}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                `Pay RWF ${totalAmount.toLocaleString()}`
              )}
            </button>
          </div>
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
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeOrder, setActiveOrder] = useState(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveStatus, setLiveStatus] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [menuError, setMenuError] = useState(null);
  const [createdOrderData, setCreatedOrderData] = useState(null);
  const [createdOrderTotal, setCreatedOrderTotal] = useState(0);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const apiService = useMemo(() => APIService.getInstance(), []);
  const handleGetOrderById = useCallback(
    async (orderId) => apiService.getOrderById(orderId),
    [apiService],
  );

  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoadingMenu(true);
      setMenuError(null);
      try {
        const response = await apiService.fetchFoods();
        if (response && response.success && response.foods) {
          const transformedItems = response.foods.map((food) => ({
            id: food._id,
            name: food.name,
            price: food.price,
            ingredients: food.ingredients || [],
            description: food.description || "",
            prepTime: food.prepTime || 15,
            category: food.category || "Mains",
            image:
              food.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            containsGluten: food.containsGluten || false,
            containsPeanuts: food.containsPeanuts || false,
            containsDairy: food.containsDairy || false,
            containsShellfish: food.containsShellfish || false,
            containsAlcohol: food.containsAlcohol || false,
            nutritionalInfo: null,
            nutritionSource: null,
            geminiInsights: null,
          }));
          setMenuItems(transformedItems);
          toast.success(`Loaded ${transformedItems.length} menu items!`);
        } else throw new Error("Invalid response format");
      } catch (error) {
        setMenuError(error.message || "Failed to load menu");
        toast.error("Failed to load menu items");
        setMenuItems([]);
      } finally {
        setIsLoadingMenu(false);
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeOrder?.orderId) {
        const statuses = ["confirmed", "preparing", "ready", "completed"];
        const currentIndex = statuses.indexOf(activeOrder.status);
        if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
          const newStatus = statuses[currentIndex + 1];
          setActiveOrder((prev) => ({ ...prev, status: newStatus }));
          setLiveStatus({ orderId: activeOrder.orderId, status: newStatus });
        }
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [activeOrder]);

  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setShowLoadingModal(true);
    setTimeout(async () => {
      setShowLoadingModal(false);
      setCurrentItem(item);
      setShowAnalysisModal(true);
      const { nutritionalInfo, nutritionSource, geminiInsights } =
        await apiService.getCompleteNutritionAnalysis(item);
      const updatedItem = {
        ...item,
        nutritionalInfo,
        nutritionSource,
        geminiInsights,
      };
      setCurrentItem(updatedItem);
      setMenuItems((prev) =>
        prev.map((i) => (i.id === item.id ? updatedItem : i)),
      );
      const analysis = analyzeFoodFully(updatedItem);
      setAnalysisResult(analysis);
    }, 2500);
  };

  const categories = ["all", ...new Set(menuItems.map((i) => i.category))];
  const filtered = menuItems.filter(
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

  const handleContinueToCustomize = () => {
    setShowAnalysisModal(false);
    setShowCustomModal(true);
  };
  const addToCartWithCustomizations = (item, customizations, instructions) => {
    const newItem = {
      ...item,
      quantity: 1,
      finalPrice: item.price,
      customizations: customizations || [],
      specialInstructions: instructions || "",
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

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      setShowResult({
        open: true,
        type: "error",
        title: "Cart Empty",
        message: "Please add items to your cart first.",
      });
      return;
    }
    if (!tableInfo.tableNumber || !tableInfo.customerName) {
      setShowResult({
        open: true,
        type: "error",
        title: "Missing Information",
        message: "Please select a table and enter your name first.",
      });
      setShowTableModal(true);
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowCart(false);
    try {
      const preparationTime =
        cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
      const formattedItems = cart.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        quantity: item.quantity || 1,
        originalPrice: item.price || 0,
        finalPrice: (item.price || 0) * (item.quantity || 1),
        preparationTime: item.prepTime || 15,
        customizations: item.customizations || [],
        specialInstructions: item.specialInstructions || "",
      }));
      const orderData = {
        personDetails: {
          name: tableInfo.customerName,
          tableNumber: tableInfo.tableNumber.toString(),
          orderType: "dine-in",
        },
        bookingDetails: {
          estimatedPickupTime: new Date(
            Date.now() + preparationTime * 60000,
          ).toISOString(),
          specialInstructions: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
        },
        items: formattedItems,
        notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
      };
      const result = await apiService.createOrder(orderData);
      if (result?.success && result?.data) {
        const order = result.data;
        const total =
          order.items?.reduce((sum, item) => sum + (item.finalPrice || 0), 0) ||
          getTotal();
        const orderId = order.orderId || order._id || "N/A";
        setCreatedOrderData(order);
        setCreatedOrderTotal(total);
        setCreatedOrderId(orderId);
        setShowPaymentModal(true);
        toast.info(
          `Order created! Total: RWF ${total.toLocaleString()}. Please complete payment.`,
        );
      } else throw new Error(result?.message || "Order creation failed");
    } catch (error) {
      setShowResult({
        open: true,
        type: "error",
        title: "Order Failed",
        message: error.message || "Failed to create order. Please try again.",
      });
      toast.error("Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentConfirm = async (phoneNumber) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Send payment information to API
      const paymentData = {
        orderId: createdOrderId,
        paymentMethod: "MOMO",
        phoneNumber: phoneNumber,
        amount: createdOrderTotal,
        status: "completed",
        paymentDate: new Date().toISOString(),
        customerName: tableInfo.customerName,
        tableNumber: tableInfo.tableNumber,
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customizations: item.customizations || [],
        })),
      };

      // ACTUALLY SEND TO API - UNCOMMENTED
      await axios.post(`${BACKEND_API.BASE_URL}/payments`, paymentData, {
        headers: { "Content-Type": "application/json" },
      });

      const preparationTime =
        cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
      const hours = Math.floor(preparationTime / 60);
      const minutes = preparationTime % 60;
      const timeString =
        hours > 0 ? `${hours}h ${minutes}min` : `${minutes} minutes`;

      setActiveOrder({
        orderId: createdOrderId,
        tableNumber: tableInfo.tableNumber,
        customerName: tableInfo.customerName,
        items: cart,
        total: createdOrderTotal,
        timeRemaining: preparationTime * 60,
        status: "confirmed",
        paymentMethod: "MOMO",
        paymentPhone: phoneNumber,
      });

      setShowResult({
        open: true,
        type: "success",
        title: "🎉 PAYMENT SUCCESSFUL!",
        message: `Thank you ${tableInfo.customerName}!\n\n📍 Table: ${tableInfo.tableNumber}\n🆔 Order ID: ${createdOrderId}\n💰 Total: RWF ${createdOrderTotal.toLocaleString()}\n💳 Paid via Mobile Money (${phoneNumber})\n⏱️ Est. time: ${timeString}\n\n💡 Tip: Use your Order ID to track your order status!`,
      });
      setCart([]);
      toast.success(
        `✅ Payment confirmed! Order #${createdOrderId.slice(-8)} is being prepared.`,
      );
    } catch (error) {
      console.error("Payment API error:", error);
      toast.error("Payment confirmation failed. Please try again.");
      setShowResult({
        open: true,
        type: "error",
        title: "Payment Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to process payment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimerExpire = () =>
    toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
  const handleTableConfirm = async (tableNum, customerName) => {
    setTableInfo({ tableNumber: tableNum, customerName });
    setShowTableModal(false);
    toast.success(
      `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with comprehensive health analysis!`,
    );
  };

  const getCategoryIcon = (category) =>
    ({
      Appetizers: <FastfoodIcon fontSize="small" />,
      Mains: <LunchIcon fontSize="small" />,
      Seafood: <DrinkIcon fontSize="small" />,
      Pizza: <RestaurantIcon fontSize="small" />,
      Salads: <Nature fontSize="small" />,
      Desserts: <DessertIcon fontSize="small" />,
      Beverages: <DrinkIcon fontSize="small" />,
    })[category] || <MenuIcon fontSize="small" />;
  const getQuickAnalysis = (item) => {
    if (!item.nutritionalInfo) return null;
    const nutrition = item.nutritionalInfo;
    const concerns = [];
    if (nutrition.sugar && nutrition.sugar > 20) concerns.push("High Sugar");
    if (nutrition.sodium && nutrition.sodium > 600)
      concerns.push("High Sodium");
    if (nutrition.saturatedFat && nutrition.saturatedFat > 10)
      concerns.push("High Sat Fat");
    return concerns;
  };

  return (
    <div
      className={`w-full min-h-screen ${CATEGORY_BG[activeCategory === "all" ? "default" : activeCategory] || CATEGORY_BG.default} relative`}
    >
      <ToastContainer position="bottom-right" autoClose={5000} />
      <AnimatePresence>
        {showTableModal && (
          <TableSelectorModal
            isOpen={showTableModal}
            onClose={() => {}}
            onConfirm={handleTableConfirm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLoadingModal && selectedItem && (
          <LoadingModal
            isOpen={showLoadingModal}
            itemName={selectedItem.name}
            itemCategory={selectedItem.category}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAnalysisModal && (
          <AnalysisResultModal
            isOpen={showAnalysisModal}
            onClose={() => setShowAnalysisModal(false)}
            analysis={analysisResult}
            item={currentItem}
            onContinue={handleContinueToCustomize}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCustomModal && (
          <CustomizationModal
            isOpen={showCustomModal}
            onClose={() => setShowCustomModal(false)}
            item={currentItem}
            onAddToCart={addToCartWithCustomizations}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCart && (
          <CartModal
            isOpen={showCart}
            onClose={() => setShowCart(false)}
            cart={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            getTotal={getTotal}
            onCheckout={handleCreateOrder}
            tableInfo={tableInfo}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            totalAmount={createdOrderTotal}
            orderId={createdOrderId}
            onPaymentConfirm={handlePaymentConfirm}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showOrderStatusModal && (
          <OrderStatusModal
            isOpen={showOrderStatusModal}
            onClose={() => setShowOrderStatusModal(false)}
            onCheckOrder={handleGetOrderById}
            liveStatus={liveStatus}
            initialOrderId={activeOrder?.orderId || ""}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showResult.open && (
          <ResultModal
            isOpen={showResult.open}
            onClose={() => setShowResult({ ...showResult, open: false })}
            type={showResult.type}
            title={showResult.title}
            message={showResult.message}
            onTrackOrder={() => setShowOrderStatusModal(true)}
          />
        )}
      </AnimatePresence>
      {activeOrder && activeOrder.status !== "completed" && (
        <FloatingTimer
          orderId={activeOrder.orderId}
          tableNumber={activeOrder.tableNumber}
          initialDuration={activeOrder.timeRemaining}
          onExpire={handleTimerExpire}
          onOpenModal={() => setShowOrderStatusModal(true)}
        />
      )}
      <div className="w-full container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
          <div className="text-center sm:text-left">
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2 flex-wrap justify-center sm:justify-start"
            >
              <RestaurantIcon className="text-orange-500 text-2xl sm:text-3xl" />{" "}
              NutriScan·AI
              <motion.span
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SpaOutlined className="text-yellow-500" />
              </motion.span>
            </motion.h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              {tableInfo.tableNumber
                ? `Table ${tableInfo.tableNumber}`
                : "Select a table"}
              {tableInfo.customerName && ` · ${tableInfo.customerName}`}
              <span className="ml-2 text-orange-500 font-medium">
                ✦ Allergen & Health Analysis
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOrderStatusModal(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
            >
              <SearchIcon />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
            >
              <CartIcon />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
        <Slider autoPlay={true} interval={5000} />
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mt-4 mb-4 border border-blue-100"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShieldIcon className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-blue-800 font-medium">
                🔬 Comprehensive Health Analysis
              </p>
              <p className="text-[10px] text-blue-600">
                Every dish is analyzed for: 9 Major Allergens • Nutritional
                Concerns • 35+ Health Conditions • AI-Powered Insights
              </p>
            </div>
          </div>
        </motion.div>
        <div className="relative mb-5">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white/80 backdrop-blur-sm shadow-sm"
            placeholder="Search for delicious dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoadingMenu ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Loading delicious menu items...</p>
            </div>
          </div>
        ) : menuError ? (
          <div className="text-center py-16">
            <ErrorIcon className="text-red-400 text-6xl mx-auto mb-4" />
            <p className="text-gray-600">Failed to load menu: {menuError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm flex items-center gap-1 ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 shadow-sm"}`}
                >
                  {getCategoryIcon(cat)} {cat === "all" ? "🍽️ All Items" : cat}
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {paginated.map((item) => {
                const quickAnalysis = getQuickAnalysis(item);
                return (
                  <motion.div
                    layoutId={`item-${item.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    key={item.id}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border border-orange-100"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.image}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <TimeIcon fontSize="small" /> {item.prepTime} min
                      </div>
                      <div
                        className={`absolute top-2 left-2 bg-gradient-to-r ${CATEGORY_COLORS[item.category] || CATEGORY_COLORS.default} text-white text-[10px] px-2 py-0.5 rounded-full`}
                      >
                        {item.category}
                      </div>
                      {item.ingredients && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          {item.ingredients.some((i) =>
                            ["peanut", "peanuts", "groundnut"].some((k) =>
                              i.toLowerCase().includes(k),
                            ),
                          ) && (
                            <span
                              className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
                              title="Contains Peanuts"
                            >
                              🥜
                            </span>
                          )}
                          {item.ingredients.some((i) =>
                            [
                              "almond",
                              "walnut",
                              "cashew",
                              "pecan",
                              "hazelnut",
                              "pistachio",
                            ].some((k) => i.toLowerCase().includes(k)),
                          ) && (
                            <span
                              className="bg-red-600 text-white text-[8px] px-1 py-0.5 rounded-full"
                              title="Contains Tree Nuts"
                            >
                              🌰
                            </span>
                          )}
                          {item.ingredients.some((i) =>
                            [
                              "milk",
                              "cheese",
                              "butter",
                              "cream",
                              "yogurt",
                            ].some((k) => i.toLowerCase().includes(k)),
                          ) && (
                            <span
                              className="bg-blue-600 text-white text-[8px] px-1 py-0.5 rounded-full"
                              title="Contains Dairy"
                            >
                              🥛
                            </span>
                          )}
                          {item.ingredients.some((i) =>
                            ["wheat", "flour", "bread", "pasta", "gluten"].some(
                              (k) => i.toLowerCase().includes(k),
                            ),
                          ) && (
                            <span
                              className="bg-yellow-600 text-white text-[8px] px-1 py-0.5 rounded-full"
                              title="Contains Gluten"
                            >
                              🌾
                            </span>
                          )}
                          {item.ingredients.some((i) =>
                            [
                              "shrimp",
                              "crab",
                              "lobster",
                              "clam",
                              "oyster",
                            ].some((k) => i.toLowerCase().includes(k)),
                          ) && (
                            <span
                              className="bg-orange-600 text-white text-[8px] px-1 py-0.5 rounded-full"
                              title="Contains Shellfish"
                            >
                              🦐
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-lg truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
                        {item.description}
                      </p>
                      {quickAnalysis && quickAnalysis.length > 0 && (
                        <div className="mt-2 flex gap-1 flex-wrap">
                          {quickAnalysis.map((warning, idx) => (
                            <span
                              key={idx}
                              className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full"
                            >
                              ⚠️ {warning}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-orange-600 font-bold text-lg">
                          RWF {item.price.toLocaleString()}
                        </span>
                        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition">
                          Analyze & Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                <p className="text-gray-500">No items match your search.</p>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum =
                    totalPages <= 7
                      ? i + 1
                      : currentPage <= 4
                        ? i + 1
                        : currentPage >= totalPages - 3
                          ? totalPages - 6 + i
                          : currentPage - 3 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 rounded-lg transition text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-2xl p-6 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
                />
                <p className="text-gray-700 font-medium">
                  Processing your order...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
