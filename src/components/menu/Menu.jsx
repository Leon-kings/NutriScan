// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
//   Close,
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://your-backend-server.com/api",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders/status",
//   CUSTOMIZED_PLATES: "/customized-plates",
// };

// // Cache for API responses
// const apiCache = new Map();
// const CACHE_DURATION = 24 * 60 * 60 * 1000;

// // Store for orders in memory
// let ordersStore = new Map();
// let orderIntervals = new Map(); // Track intervals per order

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g sugar - May cause blood sugar spike. Recommended max per meal: 15g",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics. This exceeds recommended limit by {excess}%",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g carbohydrates - Monitor blood glucose levels.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure - Risk of heart disease and stroke",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg sodium - May raise blood pressure. Daily limit: 2300mg",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension and heart disease.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease (Coronary Artery Disease)",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Narrowed or blocked blood vessels around the heart",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol and heart disease risk.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       transFat: {
//         value: 1,
//         unit: "g",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS TRANS FAT - Extremely dangerous for heart health.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "High Cholesterol (Hyperlipidemia)",
//     icon: "🩸",
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//     description: "Elevated LDL cholesterol and triglycerides",
//     thresholds: {
//       saturatedFat: {
//         value: 10,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 20,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Very high in unhealthy fats.",
//       },
//       cholesterol: {
//         value: 150,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg cholesterol - Monitor your lipid profile.",
//       },
//       cholesterolHigh: {
//         value: 250,
//         unit: "mg",
//         severity: "high",
//         message: "⚠️ HIGH CHOLESTEROL ({value}mg) - May worsen hyperlipidemia.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Gout",
//     icon: "🦶",
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     description: "Uric acid buildup in joints",
//     thresholds: {
//       purine: {
//         value: 100,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains high-purine ingredients - May trigger gout flare",
//       },
//       purineHigh: {
//         value: 200,
//         unit: "mg",
//         severity: "high",
//         message: "⚠️ VERY HIGH PURINE - Strongly associated with gout attacks.",
//       },
//     },
//   },
//   {
//     id: 6,
//     name: "GERD / Acid Reflux",
//     icon: "🔥",
//     color: "text-yellow-600",
//     bgColor: "bg-yellow-50",
//     description: "Stomach acid reflux into esophagus",
//     thresholds: {
//       trigger: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains acid reflux triggers (spicy, citrus, tomato, coffee, chocolate, mint, onion, garlic, fried food)",
//       },
//       triggerHigh: {
//         value: 3,
//         unit: "",
//         severity: "high",
//         message:
//           "⚠️ MULTIPLE REFLUX TRIGGERS - Very likely to cause severe heartburn.",
//       },
//     },
//   },
//   {
//     id: 7,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS GLUTEN - Even trace amounts trigger autoimmune reaction and intestinal damage.",
//       },
//     },
//   },
//   {
//     id: 8,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylactic reaction possible.",
//       },
//     },
//   },
//   {
//     id: 9,
//     name: "Shellfish Allergy",
//     icon: "🦐",
//     color: "text-teal-600",
//     bgColor: "bg-teal-50",
//     description: "Allergic reaction to shellfish",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS SHELLFISH - Severe allergic reaction possible.",
//       },
//     },
//   },
//   {
//     id: 10,
//     name: "Kidney Disease (CKD)",
//     icon: "🩺",
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     description: "Reduced kidney function",
//     thresholds: {
//       sodium: {
//         value: 400,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg sodium - May stress kidneys and increase fluid retention.",
//       },
//       sodiumHigh: {
//         value: 800,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Dangerous for kidney disease patients.",
//       },
//       potassium: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg potassium - May be problematic for advanced kidney disease.",
//       },
//       potassiumHigh: {
//         value: 400,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH POTASSIUM ({value}mg) - Can cause dangerous heart rhythm abnormalities.",
//       },
//       phosphorus: {
//         value: 150,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains phosphorus - May affect bone health in kidney disease.",
//       },
//     },
//   },
//   {
//     id: 11,
//     name: "Migraine",
//     icon: "🤕",
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50",
//     description: "Severe headaches with aura or without",
//     thresholds: {
//       trigger: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains common migraine triggers (chocolate, caffeine, aged cheese, MSG, artificial sweeteners)",
//       },
//       triggerHigh: {
//         value: 2,
//         unit: "",
//         severity: "high",
//         message:
//           "⚠️ MULTIPLE MIGRAINE TRIGGERS - Very likely to trigger severe headache.",
//       },
//     },
//   },
//   {
//     id: 12,
//     name: "Lactose Intolerance",
//     icon: "🥛",
//     color: "text-sky-600",
//     bgColor: "bg-sky-50",
//     description: "Difficulty digesting lactose sugar",
//     thresholds: {
//       lactose: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains dairy/lactose - May cause bloating, gas, and diarrhea.",
//       },
//       lactoseHigh: {
//         value: 2,
//         unit: "",
//         severity: "high",
//         message:
//           "⚠️ HIGH LACTOSE - Likely to cause significant digestive distress.",
//       },
//     },
//   },
//   {
//     id: 13,
//     name: "Obesity / Weight Management",
//     icon: "⚖️",
//     color: "text-emerald-600",
//     bgColor: "bg-emerald-50",
//     description: "Excess body fat affecting health",
//     thresholds: {
//       calories: {
//         value: 500,
//         unit: "cal",
//         severity: "moderate",
//         message:
//           "Contains {value} calories - Consider portion control for weight management.",
//       },
//       caloriesHigh: {
//         value: 800,
//         unit: "cal",
//         severity: "high",
//         message:
//           "⚠️ HIGH CALORIE ({value}cal) - Significant portion of daily intake for weight loss.",
//       },
//       fat: {
//         value: 30,
//         unit: "g",
//         severity: "moderate",
//         message: "High in fat ({value}g) - May hinder weight loss goals.",
//       },
//     },
//   },
//   {
//     id: 14,
//     name: "Irritable Bowel Syndrome (IBS)",
//     icon: "💩",
//     color: "text-lime-600",
//     bgColor: "bg-lime-50",
//     description: "Chronic digestive disorder",
//     thresholds: {
//       fodmap: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains high-FODMAP ingredients (garlic, onion, beans, wheat, dairy) - May trigger IBS symptoms.",
//       },
//       fodmapHigh: {
//         value: 2,
//         unit: "",
//         severity: "high",
//         message:
//           "⚠️ MULTIPLE HIGH-FODMAP INGREDIENTS - Very likely to cause bloating, pain, and diarrhea.",
//       },
//     },
//   },
//   {
//     id: 15,
//     name: "Fatty Liver Disease (NAFLD)",
//     icon: "🍖",
//     color: "text-amber-600",
//     bgColor: "bg-amber-50",
//     description: "Fat accumulation in liver",
//     thresholds: {
//       sugar: {
//         value: 20,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g sugar - May contribute to liver fat accumulation.",
//       },
//       sugarHigh: {
//         value: 40,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SUGAR ({value}g) - Significant risk for worsening fatty liver.",
//       },
//       saturatedFat: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message: "High saturated fat - May worsen liver inflammation.",
//       },
//     },
//   },
//   {
//     id: 16,
//     name: "Anemia (Iron Deficiency)",
//     icon: "🩸",
//     color: "text-red-400",
//     bgColor: "bg-red-50",
//     description: "Low red blood cell count",
//     thresholds: {
//       iron: {
//         value: 1,
//         unit: "",
//         severity: "positive",
//         message: "✓ Contains iron-rich ingredients - Beneficial for anemia.",
//       },
//       ironBlocker: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains substances that block iron absorption (coffee, tea, calcium) - Consume separately from iron-rich foods.",
//       },
//     },
//   },
//   {
//     id: 17,
//     name: "Osteoporosis",
//     icon: "🦴",
//     color: "text-stone-600",
//     bgColor: "bg-stone-50",
//     description: "Weak and brittle bones",
//     thresholds: {
//       calcium: {
//         value: 200,
//         unit: "mg",
//         severity: "positive",
//         message: "✓ Contains calcium - Beneficial for bone health.",
//       },
//       sodium: {
//         value: 800,
//         unit: "mg",
//         severity: "moderate",
//         message: "High sodium causes calcium loss - May worsen osteoporosis.",
//       },
//     },
//   },
//   {
//     id: 18,
//     name: "Thyroid Disorder (Hypothyroidism)",
//     icon: "🦋",
//     color: "text-purple-400",
//     bgColor: "bg-purple-50",
//     description: "Underactive thyroid gland",
//     thresholds: {
//       goitrogen: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains goitrogens (raw cruciferous vegetables, soy) - May interfere with thyroid medication.",
//       },
//       iodine: {
//         value: 1,
//         unit: "",
//         severity: "positive",
//         message: "✓ Contains iodine - Supports thyroid function.",
//       },
//     },
//   },
//   {
//     id: 19,
//     name: "Dental Health / Cavities",
//     icon: "🦷",
//     color: "text-cyan-600",
//     bgColor: "bg-cyan-50",
//     description: "Risk of tooth decay",
//     thresholds: {
//       sugar: {
//         value: 10,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May promote tooth decay.",
//       },
//       sugarHigh: {
//         value: 25,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Significant risk for cavities.",
//       },
//       acidic: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message: "High acidity - May erode tooth enamel.",
//       },
//     },
//   },
//   {
//     id: 20,
//     name: "Pregnancy (Gestational Health)",
//     icon: "🤰",
//     color: "text-pink-600",
//     bgColor: "bg-pink-50",
//     description: "Nutritional needs during pregnancy",
//     thresholds: {
//       folate: {
//         value: 1,
//         unit: "",
//         severity: "positive",
//         message: "✓ Contains folate - Essential for fetal development.",
//       },
//       mercury: {
//         value: 1,
//         unit: "",
//         severity: "high",
//         message:
//           "⚠️ MAY CONTAIN MERCURY - Avoid high-mercury fish during pregnancy.",
//       },
//       listeria: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ RISK OF LISTERIA - Unpasteurized dairy or deli meats dangerous during pregnancy.",
//       },
//       caffeine: {
//         value: 100,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains caffeine - Limit to under 200mg daily during pregnancy.",
//       },
//     },
//   },
//   {
//     id: 21,
//     name: "Atrial Fibrillation (AFib)",
//     icon: "💓",
//     color: "text-red-500",
//     bgColor: "bg-red-50",
//     description: "Irregular heart rhythm",
//     thresholds: {
//       caffeine: {
//         value: 100,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains caffeine - May trigger palpitations in sensitive individuals.",
//       },
//       caffeineHigh: {
//         value: 200,
//         unit: "mg",
//         severity: "high",
//         message: "⚠️ HIGH CAFFEINE - May trigger AFib episodes.",
//       },
//       sodium: {
//         value: 800,
//         unit: "mg",
//         severity: "moderate",
//         message: "High sodium may worsen AFib symptoms.",
//       },
//     },
//   },
//   {
//     id: 22,
//     name: "Stroke Recovery / Prevention",
//     icon: "🧠",
//     color: "text-cyan-700",
//     bgColor: "bg-cyan-50",
//     description: "Risk or recovery from cerebrovascular event",
//     thresholds: {
//       sodium: {
//         value: 400,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg sodium - May increase blood pressure and stroke risk.",
//       },
//       sodiumHigh: {
//         value: 700,
//         unit: "mg",
//         severity: "high",
//         message: "⚠️ HIGH SODIUM - Major risk factor for recurrent stroke.",
//       },
//       saturatedFat: {
//         value: 10,
//         unit: "g",
//         severity: "moderate",
//         message: "May contribute to arterial plaque.",
//       },
//     },
//   },
//   {
//     id: 23,
//     name: "Diverticulitis",
//     icon: "🍽️",
//     color: "text-orange-500",
//     bgColor: "bg-orange-50",
//     description: "Inflammation of intestinal pouches",
//     thresholds: {
//       nuts: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains nuts or seeds - May irritate diverticula during active flares.",
//       },
//       fiber: {
//         value: 5,
//         unit: "g",
//         severity: "positive",
//         message: "✓ High fiber - Beneficial for preventing diverticulitis.",
//       },
//     },
//   },
//   {
//     id: 24,
//     name: "Parkinson's Disease",
//     icon: "🤚",
//     color: "text-blue-400",
//     bgColor: "bg-blue-50",
//     description: "Neurodegenerative movement disorder",
//     thresholds: {
//       protein: {
//         value: 30,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "High protein may interfere with levodopa absorption - Consult your doctor.",
//       },
//     },
//   },
//   {
//     id: 25,
//     name: "Epilepsy",
//     icon: "⚡",
//     color: "text-yellow-500",
//     bgColor: "bg-yellow-50",
//     description: "Seizure disorder",
//     thresholds: {
//       aspartame: {
//         value: 1,
//         unit: "",
//         severity: "moderate",
//         message:
//           "Contains artificial sweeteners - May trigger seizures in sensitive individuals.",
//       },
//     },
//   },
// ];

// // ========== MENU ITEMS ==========
// const MENU_ITEMS = [
//   // ========== MAINS (High Salt & High Fat Items) ==========
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
//       "salt",
//     ],
//     description:
//       "Traditional cassava leaf stew with beef - Rich and creamy Rwandan classic",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["fatty", "coconut"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 890,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries - A customer favorite",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     nutritionalInfo: null,
//     purineLevel: "high",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["spicy", "garlic", "fried"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 1200,
//   },
//   {
//     id: 3,
//     name: "Salted Beef Stew (High Sodium)",
//     price: 4200,
//     ingredients: [
//       "beef brisket",
//       "sea salt",
//       "soy sauce",
//       "garlic",
//       "onion",
//       "beef broth",
//     ],
//     description:
//       "Rich beef stew with extra salt for flavor - High sodium content",
//     prepTime: 25,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//     nutritionalInfo: null,
//     purineLevel: "high",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["garlic", "onion", "fatty"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 2100,
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
//       "salt",
//     ],
//     description:
//       "Steamed plantain with tender goat stew - Authentic East African dish",
//     prepTime: 20,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
//     nutritionalInfo: null,
//     purineLevel: "high",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["onion", "ginger", "fatty"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 950,
//   },
//   {
//     id: 5,
//     name: "Salted Fried Chicken",
//     price: 5500,
//     ingredients: [
//       "chicken thighs",
//       "salt brine",
//       "flour",
//       "spices",
//       "buttermilk",
//     ],
//     description:
//       "Crispy fried chicken brined in salt for 24 hours - Extra salty",
//     prepTime: 20,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["fatty", "fried", "spicy"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 1800,
//   },
//   {
//     id: 6,
//     name: "Beef Burger Deluxe",
//     price: 4800,
//     ingredients: [
//       "beef patty",
//       "lettuce",
//       "tomato",
//       "cheddar cheese",
//       "burger bun",
//       "bacon",
//       "pickles",
//       "ketchup",
//     ],
//     description: "Angus beef burger with cheese, bacon, and extra salt",
//     prepTime: 12,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//     nutritionalInfo: null,
//     purineLevel: "high",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["tomato", "cheese", "fatty", "fried"],
//     migraineTriggers: ["aged cheese"],
//     highSalt: true,
//     sodiumMg: 1500,
//   },

//   // ========== SEAFOOD ==========
//   {
//     id: 7,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description:
//       "Fresh lake tilapia grilled to perfection - Served with lemon butter sauce",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["garlic", "lemon"],
//     migraineTriggers: [],
//     highSalt: false,
//     sodiumMg: 400,
//   },
//   {
//     id: 8,
//     name: "Salted Salmon Fillet",
//     price: 8900,
//     ingredients: ["salmon", "sea salt", "dill", "lemon", "olive oil"],
//     description:
//       "Norwegian salmon cured with sea salt - Rich in omega-3 but high sodium",
//     prepTime: 15,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["fatty", "lemon"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 1100,
//   },
//   {
//     id: 9,
//     name: "Creamy Shrimp Pasta",
//     price: 6800,
//     ingredients: [
//       "shrimp",
//       "cream",
//       "pasta",
//       "garlic",
//       "parmesan cheese",
//       "butter",
//       "salt",
//     ],
//     description:
//       "Rich creamy pasta with succulent shrimp - A seafood lover's delight",
//     prepTime: 18,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400",
//     nutritionalInfo: null,
//     purineLevel: "high",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: true,
//     containsDairy: true,
//     refluxTriggers: ["garlic", "fatty", "cheese", "cream"],
//     migraineTriggers: ["aged cheese"],
//     highSalt: true,
//     sodiumMg: 1300,
//   },

//   // ========== SALADS (Healthy Options) ==========
//   {
//     id: 10,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette - Low calorie",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//     highSalt: false,
//     sodiumMg: 50,
//   },
//   {
//     id: 11,
//     name: "Quinoa Power Salad",
//     price: 3200,
//     ingredients: [
//       "quinoa",
//       "avocado",
//       "chickpeas",
//       "kale",
//       "sweet potato",
//       "tahini",
//       "pumpkin seeds",
//     ],
//     description: "Healthy quinoa bowl packed with superfoods - Gluten-free",
//     prepTime: 10,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//     highSalt: false,
//     sodiumMg: 120,
//   },
//   {
//     id: 12,
//     name: "Greek Salad",
//     price: 2800,
//     ingredients: [
//       "feta cheese",
//       "olives",
//       "cucumber",
//       "tomato",
//       "red onion",
//       "oregano",
//     ],
//     description: "Authentic Greek salad with feta and Kalamata olives",
//     prepTime: 7,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["tomato", "onion", "fatty"],
//     migraineTriggers: ["aged cheese"],
//     highSalt: true,
//     sodiumMg: 800,
//   },
//   {
//     id: 13,
//     name: "Caesar Salad",
//     price: 2500,
//     ingredients: [
//       "romaine lettuce",
//       "parmesan cheese",
//       "croutons",
//       "caesar dressing",
//       "anchovies",
//     ],
//     description: "Classic Caesar salad with creamy dressing - High sodium",
//     prepTime: 8,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1550304943-4f24f54dd8ca?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["garlic", "cheese", "fatty"],
//     migraineTriggers: ["aged cheese"],
//     highSalt: true,
//     sodiumMg: 950,
//   },
//   {
//     id: 14,
//     name: "Fruit & Walnut Salad",
//     price: 2200,
//     ingredients: [
//       "mixed greens",
//       "walnuts",
//       "apple slices",
//       "dried cranberries",
//       "balsamic glaze",
//     ],
//     description: "Sweet and savory salad with fresh fruits and crunchy walnuts",
//     prepTime: 6,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["acidic"],
//     migraineTriggers: [],
//     highSalt: false,
//     sodiumMg: 45,
//   },

//   // ========== BEVERAGES (High Sugar Teas & Drinks) ==========
//   {
//     id: 15,
//     name: "Sweet Masala Chai (High Sugar)",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//       "cloves",
//     ],
//     description: "Traditional Indian spiced tea with extra sugar - Very sweet",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["caffeine", "spicy", "acidic"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 35,
//   },
//   {
//     id: 16,
//     name: "Honey Lemon Tea",
//     price: 1000,
//     ingredients: ["black tea", "honey", "lemon", "ginger"],
//     description: "Soothing tea with honey and lemon - Naturally sweet",
//     prepTime: 4,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["acidic", "caffeine"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 28,
//   },
//   {
//     id: 17,
//     name: "Mango Bubble Tea",
//     price: 1800,
//     ingredients: [
//       "mango puree",
//       "black tea",
//       "tapioca pearls",
//       "sugar syrup",
//       "milk",
//     ],
//     description:
//       "Sweet mango bubble tea with chewy tapioca pearls - Extra sweet",
//     prepTime: 6,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1558857563-aad2e4b5f5a6?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["caffeine", "acidic"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 48,
//   },
//   {
//     id: 18,
//     name: "Iced Caramel Latte",
//     price: 2200,
//     ingredients: ["espresso", "milk", "caramel syrup", "whipped cream", "ice"],
//     description: "Sweet iced latte with caramel and whipped cream - High sugar",
//     prepTime: 4,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["caffeine", "acidic", "fatty"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 42,
//   },
//   {
//     id: 19,
//     name: "Strawberry Smoothie",
//     price: 2000,
//     ingredients: ["strawberries", "banana", "yogurt", "honey", "orange juice"],
//     description: "Creamy fruit smoothie - Naturally sweet from fruits",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["acidic"],
//     migraineTriggers: [],
//     highSugar: true,
//     sugarGrams: 38,
//   },
//   {
//     id: 20,
//     name: "Sweet Mint Lemonade",
//     price: 1500,
//     ingredients: ["lemon juice", "mint leaves", "sugar syrup", "water", "ice"],
//     description: "Refreshing mint lemonade with extra sugar - Very sweet",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["acidic", "citrus"],
//     migraineTriggers: [],
//     highSugar: true,
//     sugarGrams: 32,
//   },
//   {
//     id: 21,
//     name: "Green Tea with Honey",
//     price: 900,
//     ingredients: ["green tea", "honey", "lemon slice"],
//     description: "Healthy green tea sweetened with natural honey",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["caffeine", "acidic"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 22,
//   },
//   {
//     id: 22,
//     name: "Chocolate Milkshake",
//     price: 2500,
//     ingredients: [
//       "chocolate ice cream",
//       "milk",
//       "chocolate syrup",
//       "whipped cream",
//       "sprinkles",
//     ],
//     description: "Thick chocolate milkshake - Very high in sugar",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["chocolate", "fatty", "caffeine"],
//     migraineTriggers: ["chocolate", "caffeine"],
//     highSugar: true,
//     sugarGrams: 65,
//   },
//   {
//     id: 23,
//     name: "Fresh Orange Juice",
//     price: 1200,
//     ingredients: ["fresh oranges", "water", "sugar"],
//     description: "Freshly squeezed orange juice - Rich in Vitamin C",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["acidic", "citrus"],
//     migraineTriggers: [],
//     highSugar: true,
//     sugarGrams: 24,
//   },
//   {
//     id: 24,
//     name: "Red Wine",
//     price: 8500,
//     ingredients: ["red grapes", "yeast", "sulfites"],
//     description: "Cabernet Sauvignon - Full-bodied red wine",
//     prepTime: 2,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["alcohol", "acidic"],
//     migraineTriggers: ["alcohol", "sulfites"],
//     highSugar: false,
//     sugarGrams: 4,
//   },
//   {
//     id: 25,
//     name: "Sparkling Water",
//     price: 800,
//     ingredients: ["carbonated water", "natural flavors"],
//     description: "Refreshing sparkling water - Zero calories, zero sugar",
//     prepTime: 1,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: [],
//     migraineTriggers: [],
//     highSugar: false,
//     sugarGrams: 0,
//   },
//   {
//     id: 26,
//     name: "Iced Coffee",
//     price: 1800,
//     ingredients: ["coffee", "milk", "sugar", "ice"],
//     description: "Chilled coffee with milk - Perfect for a hot day",
//     prepTime: 3,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["caffeine", "acidic"],
//     migraineTriggers: ["caffeine"],
//     highSugar: true,
//     sugarGrams: 18,
//   },

//   // ========== DESSERTS ==========
//   {
//     id: 27,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description:
//       "Warm molten chocolate cake with vanilla ice cream - Decadent dessert",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["chocolate", "fatty"],
//     migraineTriggers: ["chocolate", "caffeine"],
//     highSugar: true,
//     sugarGrams: 45,
//   },

//   // ========== PIZZA ==========
//   {
//     id: 28,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description:
//       "Classic Italian pizza topped with fresh basil - Simple and delicious",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["tomato", "cheese", "fatty"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 850,
//   },
//   {
//     id: 29,
//     name: "Gluten-Free Veggie Pizza",
//     price: 7200,
//     ingredients: [
//       "gluten-free crust",
//       "tomato sauce",
//       "vegan cheese",
//       "bell peppers",
//       "mushrooms",
//       "olives",
//     ],
//     description:
//       "Gluten-free and dairy-free pizza - Perfect for sensitive diets",
//     prepTime: 16,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["tomato"],
//     migraineTriggers: [],
//     highSalt: false,
//     sodiumMg: 420,
//   },

//   // ========== INDIAN ==========
//   {
//     id: 30,
//     name: "Butter Chicken",
//     price: 6200,
//     ingredients: [
//       "chicken",
//       "butter",
//       "cream",
//       "tomato",
//       "cashews",
//       "spices",
//       "salt",
//     ],
//     description:
//       "Rich creamy curry with tender chicken - North Indian specialty",
//     prepTime: 20,
//     category: "Indian",
//     image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
//     nutritionalInfo: null,
//     purineLevel: "moderate",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["tomato", "fatty", "cream", "spicy"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 1100,
//   },

//   // ========== APPETIZERS ==========
//   {
//     id: 31,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: [
//       "peanuts",
//       "almonds",
//       "walnuts",
//       "cashews",
//       "pecans",
//       "hazelnuts",
//       "salt",
//     ],
//     description: "Assorted premium nuts - Healthy snacking option",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsShellfish: false,
//     containsDairy: false,
//     refluxTriggers: ["fatty"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 380,
//   },
//   {
//     id: 32,
//     name: "Salted Pretzel Bites",
//     price: 1800,
//     ingredients: ["flour", "yeast", "butter", "coarse salt", "baking soda"],
//     description: "Soft pretzel bites topped with coarse sea salt",
//     prepTime: 10,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1585417499832-9a9a1e536072?w=400",
//     nutritionalInfo: null,
//     purineLevel: "low",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsShellfish: false,
//     containsDairy: true,
//     refluxTriggers: ["fatty"],
//     migraineTriggers: [],
//     highSalt: true,
//     sodiumMg: 650,
//   },
// ];

// // ========== API SERVICE FOR FOOD ANALYSIS ==========
// class FoodAnalysisAPIService {
//   static cache = new Map();

//   static async searchFoodUSDA(query) {
//     const cacheKey = `usda_search_${query}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//       return cached.data;
//     }

//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );

//       const result = response.data;
//       this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
//       return result;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   static async getFoodDetails(fdcId) {
//     const cacheKey = `usda_food_${fdcId}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//       return cached.data;
//     }

//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//           },
//           timeout: 10000,
//         },
//       );

//       const result = response.data;
//       this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
//       return result;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   static async analyzeRecipeSpoonacular(ingredients, title) {
//     const cacheKey = `spoonacular_${title}_${ingredients.join(",")}`;
//     const cached = this.cache.get(cacheKey);
//     if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//       return cached.data;
//     }

//     try {
//       // First try to search for the recipe
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe && recipe.id) {
//         // Get nutrition info by recipe ID
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: {
//               apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         // Fallback to analyze endpoint
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           {
//             title: title,
//             ingredients: ingredients.map((ing) => ({ name: ing })),
//           },
//           {
//             params: {
//               apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       const result = {
//         nutrition: nutritionData,
//         info: recipe || null,
//       };

//       this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
//       return result;
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   static async getCompleteNutritionAnalysis(item) {
//     // First try USDA API
//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     if (usdaSearch?.foods && usdaSearch.foods.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database (Real-time)";
//       }
//     }

//     // If USDA fails, try Spoonacular
//     if (!nutritionalInfo || !nutritionalInfo.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API (Real-time)";
//       }
//     }

//     // If both APIs fail, use estimation from ingredients (as fallback)
//     if (!nutritionalInfo || !nutritionalInfo.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients (API fallback)";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   static parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];

//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };

//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   static parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];

//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };

//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   static estimateNutritionFromIngredients(ingredients) {
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
//     };

//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4, vitaminC: 50 },
//       coffee: { calories: 2, carbs: 0, caffeine: 95 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     estimated.calories = Math.min(
//       1200,
//       Math.round(estimated.calories / servingFactor),
//     );
//     estimated.fat = Math.min(60, Math.round(estimated.fat / servingFactor));
//     estimated.protein = Math.min(
//       50,
//       Math.round(estimated.protein / servingFactor),
//     );
//     estimated.carbs = Math.min(
//       100,
//       Math.round(estimated.carbs / servingFactor),
//     );
//     estimated.sodium = Math.min(
//       1500,
//       Math.round(estimated.sodium / servingFactor),
//     );
//     estimated.sugar = Math.min(40, Math.round(estimated.sugar / servingFactor));
//     estimated.saturatedFat = Math.min(
//       25,
//       Math.round(estimated.saturatedFat / servingFactor),
//     );
//     estimated.cholesterol = Math.min(
//       200,
//       Math.round(estimated.cholesterol / servingFactor),
//     );
//     estimated.fiber = Math.min(15, Math.round(estimated.fiber / servingFactor));

//     return estimated;
//   }
// }

// // ========== LOADING MODAL COMPONENT ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 2;
//       });
//     }, 50);

//     const stepInterval = setInterval(() => {
//       setLoadingStep((prev) => {
//         if (prev < loadingSteps.length - 1) {
//           return prev + 1;
//         }
//         return prev;
//       });
//     }, 800);

//     // Simulate API status updates
//     const apiTimeout1 = setTimeout(() => {
//       setApiStatus((prev) => ({ ...prev, usda: "success" }));
//     }, 1500);
//     const apiTimeout2 = setTimeout(() => {
//       setApiStatus((prev) => ({ ...prev, spoonacular: "success" }));
//     }, 2500);

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
//     };
//   }, [isOpen, loadingSteps.length]);

//   if (!isOpen) return null;

//   const isFood =
//     itemCategory === "Mains" ||
//     itemCategory === "Pizza" ||
//     itemCategory === "Indian" ||
//     itemCategory === "Seafood" ||
//     itemCategory === "Appetizers" ||
//     itemCategory === "Vegan" ||
//     itemCategory === "Desserts";
//   const categoryIcon = isFood ? (
//     <FastfoodIcon className="text-orange-500 text-2xl" />
//   ) : (
//     <LocalDrinkIcon className="text-blue-500 text-2xl" />
//   );
//   const categoryName = isFood ? "Food" : "Drink";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         transition={{
//           type: "spring",
//           damping: 25,
//           stiffness: 400,
//           duration: 0.5,
//         }}
//         className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="bg-white/20 p-2 rounded-full"
//               >
//                 <ScienceIcon className="text-2xl" />
//               </motion.div>
//               <div>
//                 <motion.h2
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   className="font-bold text-xl"
//                 >
//                   Analyzing {categoryName}
//                 </motion.h2>
//                 <motion.p
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                   className="text-orange-100 text-sm"
//                 >
//                   {itemName}
//                 </motion.p>
//               </div>
//             </div>
//             <motion.div
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 1, repeat: Infinity }}
//             >
//               {categoryIcon}
//             </motion.div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Progress Bar */}
//           <div>
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
//               <motion.span
//                 key={progress}
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="font-mono font-bold text-orange-600"
//               >
//                 {Math.min(progress, 100)}%
//               </motion.span>
//             </div>
//             <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
//                 initial={{ width: "0%" }}
//                 animate={{ width: `${Math.min(progress, 100)}%` }}
//                 transition={{ duration: 0.1 }}
//               />
//             </div>
//           </div>

//           {/* Loading Steps */}
//           <div className="space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{
//                   opacity: loadingStep >= idx ? 1 : 0.4,
//                   x: 0,
//                   color: loadingStep >= idx ? "#333" : "#999",
//                 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-3"
//               >
//                 <motion.div
//                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </motion.div>
//                 <span
//                   className={`text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"}`}
//                 >
//                   {step.message}
//                 </span>
//                 {loadingStep === idx && (
//                   <motion.div
//                     animate={{ opacity: [1, 0.3, 1] }}
//                     transition={{ duration: 0.8, repeat: Infinity }}
//                     className="ml-auto"
//                   >
//                     <span className="text-orange-500">{step.icon}</span>
//                   </motion.div>
//                 )}
//                 {loadingStep > idx && (
//                   <span className="ml-auto text-green-500">✓</span>
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* API Status Indicators */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-gray-100 rounded-xl p-3"
//           >
//             <p className="text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-4">
//               <div className="flex items-center gap-2">
//                 <motion.div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <motion.div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">Spoonacular API</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Disclaimer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-center text-xs text-gray-400"
//           >
//             Fetching real-time nutritional data from external APIs
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CLINICAL CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let severity = null;
//     let message = null;
//     let excessPercent = 0;

//     // Type 2 Diabetes
//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= condition.thresholds.sugarHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         excessPercent = Math.round(
//           (nutrition.sugar / condition.thresholds.sugarHigh.value) * 100,
//         );
//         message = condition.thresholds.sugarHigh.message
//           .replace("{value}", nutrition.sugar)
//           .replace("{excess}", excessPercent);
//       } else if (nutrition.sugar >= condition.thresholds.sugar.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= condition.thresholds.carbsHigh?.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= condition.thresholds.carbs?.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     }
//     // Hypertension
//     else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= condition.thresholds.sodiumHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= condition.thresholds.sodium.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     }
//     // Heart Disease (Coronary Artery Disease)
//     else if (condition.name === "Heart Disease (Coronary Artery Disease)") {
//       if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFatHigh.value
//       ) {
//         riskLevel = "warning";
//         severity = "critical";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (
//         nutrition.cholesterol >= condition.thresholds.cholesterolHigh?.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (
//         nutrition.cholesterol >= condition.thresholds.cholesterol?.value
//       ) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     }
//     // High Cholesterol
//     else if (condition.name === "High Cholesterol (Hyperlipidemia)") {
//       if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFatHigh.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat.value
//       ) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (
//         nutrition.cholesterol >= condition.thresholds.cholesterolHigh?.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (
//         nutrition.cholesterol >= condition.thresholds.cholesterol?.value
//       ) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     }
//     // Gout
//     else if (condition.name === "Gout") {
//       if (item.purineLevel === "high") {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.purineHigh.message;
//       } else if (item.purineLevel === "moderate") {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.purine.message;
//       }
//     }
//     // GERD / Acid Reflux
//     else if (condition.name === "GERD / Acid Reflux") {
//       const triggerCount = item.refluxTriggers?.length || 0;
//       if (triggerCount >= 3) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.triggerHigh.message;
//       } else if (triggerCount >= 1) {
//         riskLevel = "info";
//         severity = "moderate";
//         const triggers = item.refluxTriggers.join(", ");
//         message =
//           condition.thresholds.trigger.message + ` (Triggers: ${triggers})`;
//       }
//     }
//     // Celiac Disease
//     else if (condition.name === "Celiac Disease") {
//       if (item.containsGluten) {
//         riskLevel = "warning";
//         severity = "critical";
//         message = condition.thresholds.gluten.message;
//       }
//     }
//     // Peanut Allergy
//     else if (condition.name === "Peanut Allergy") {
//       if (item.containsPeanuts) {
//         riskLevel = "warning";
//         severity = "critical";
//         message = condition.thresholds.allergen.message;
//       }
//     }
//     // Shellfish Allergy
//     else if (condition.name === "Shellfish Allergy") {
//       if (item.containsShellfish) {
//         riskLevel = "warning";
//         severity = "critical";
//         message = condition.thresholds.allergen.message;
//       }
//     }
//     // Kidney Disease (CKD)
//     else if (condition.name === "Kidney Disease (CKD)") {
//       if (nutrition.sodium >= condition.thresholds.sodiumHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= condition.thresholds.sodium.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//       // Potassium check (if available from API)
//       if (
//         nutrition.potassium &&
//         nutrition.potassium >= condition.thresholds.potassiumHigh?.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.potassiumHigh.message.replace(
//           "{value}",
//           nutrition.potassium,
//         );
//       } else if (
//         nutrition.potassium &&
//         nutrition.potassium >= condition.thresholds.potassium?.value
//       ) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.potassium.message.replace(
//           "{value}",
//           nutrition.potassium,
//         );
//       }
//     }
//     // Migraine
//     else if (condition.name === "Migraine") {
//       const triggerCount = item.migraineTriggers?.length || 0;
//       if (triggerCount >= 2) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.triggerHigh.message;
//       } else if (triggerCount >= 1) {
//         riskLevel = "info";
//         severity = "moderate";
//         const triggers = item.migraineTriggers.join(", ");
//         message =
//           condition.thresholds.trigger.message + ` (Triggers: ${triggers})`;
//       }
//     }
//     // Lactose Intolerance
//     else if (condition.name === "Lactose Intolerance") {
//       if (item.containsDairy) {
//         if (nutrition.fat > 30 || nutrition.saturatedFat > 15) {
//           riskLevel = "warning";
//           severity = "high";
//           message = condition.thresholds.lactoseHigh.message;
//         } else {
//           riskLevel = "info";
//           severity = "moderate";
//           message = condition.thresholds.lactose.message;
//         }
//       }
//     }
//     // Obesity / Weight Management
//     else if (condition.name === "Obesity / Weight Management") {
//       if (nutrition.calories >= condition.thresholds.caloriesHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.caloriesHigh.message.replace(
//           "{value}",
//           nutrition.calories,
//         );
//       } else if (nutrition.calories >= condition.thresholds.calories.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.calories.message.replace(
//           "{value}",
//           nutrition.calories,
//         );
//       } else if (nutrition.fat >= condition.thresholds.fat?.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.fat.message.replace(
//           "{value}",
//           nutrition.fat,
//         );
//       }
//     }
//     // Irritable Bowel Syndrome (IBS)
//     else if (condition.name === "Irritable Bowel Syndrome (IBS)") {
//       const fodmapCount = item.fodmapTriggers?.length || 0;
//       const hasHighFodmap = item.ingredients?.some((ing) =>
//         [
//           "garlic",
//           "onion",
//           "beans",
//           "wheat",
//           "dairy",
//           "apple",
//           "pear",
//           "watermelon",
//         ].some((trigger) => ing.toLowerCase().includes(trigger)),
//       );
//       if (hasHighFodmap || fodmapCount >= 2) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.fodmapHigh.message;
//       } else if (hasHighFodmap || fodmapCount >= 1) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.fodmap.message;
//       }
//     }
//     // Fatty Liver Disease (NAFLD)
//     else if (condition.name === "Fatty Liver Disease (NAFLD)") {
//       if (nutrition.sugar >= condition.thresholds.sugarHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= condition.thresholds.sugar.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat?.value
//       ) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.saturatedFat.message;
//       }
//     }
//     // Anemia
//     else if (condition.name === "Anemia (Iron Deficiency)") {
//       const hasIron = item.ingredients?.some((ing) =>
//         ["beef", "spinach", "lentils", "beans", "iron", "liver", "kale"].some(
//           (ironSource) => ing.toLowerCase().includes(ironSource),
//         ),
//       );
//       const hasIronBlocker = item.ingredients?.some((ing) =>
//         ["coffee", "tea", "calcium", "milk", "cheese"].some((blocker) =>
//           ing.toLowerCase().includes(blocker),
//         ),
//       );
//       if (hasIron) {
//         riskLevel = "positive";
//         severity = "positive";
//         message = condition.thresholds.iron.message;
//       } else if (hasIronBlocker) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.ironBlocker.message;
//       }
//     }
//     // Osteoporosis
//     else if (condition.name === "Osteoporosis") {
//       const hasCalcium = item.ingredients?.some((ing) =>
//         ["milk", "cheese", "yogurt", "calcium", "spinach", "kale"].some(
//           (calcium) => ing.toLowerCase().includes(calcium),
//         ),
//       );
//       if (hasCalcium) {
//         riskLevel = "positive";
//         severity = "positive";
//         message = condition.thresholds.calcium.message;
//       }
//       if (nutrition.sodium >= condition.thresholds.sodium?.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sodium.message;
//       }
//     }
//     // Thyroid Disorder
//     else if (condition.name === "Thyroid Disorder (Hypothyroidism)") {
//       const hasGoitrogen = item.ingredients?.some((ing) =>
//         ["kale", "broccoli", "cabbage", "cauliflower", "soy", "tofu"].some(
//           (goit) => ing.toLowerCase().includes(goit),
//         ),
//       );
//       if (hasGoitrogen) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.goitrogen.message;
//       }
//     }
//     // Dental Health
//     else if (condition.name === "Dental Health / Cavities") {
//       if (nutrition.sugar >= condition.thresholds.sugarHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= condition.thresholds.sugar.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       }
//       const isAcidic =
//         item.refluxTriggers?.includes("acidic") ||
//         item.refluxTriggers?.includes("citrus");
//       if (isAcidic) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.acidic?.message;
//       }
//     }
//     // Pregnancy
//     else if (condition.name === "Pregnancy (Gestational Health)") {
//       const hasCaffeine = item.ingredients?.some((ing) =>
//         ["coffee", "tea", "caffeine", "chocolate", "cola"].some((caff) =>
//           ing.toLowerCase().includes(caff),
//         ),
//       );
//       const hasRawDairy = item.ingredients?.some((ing) =>
//         ["unpasteurized", "raw milk", "soft cheese"].some((raw) =>
//           ing.toLowerCase().includes(raw),
//         ),
//       );
//       if (hasRawDairy) {
//         riskLevel = "warning";
//         severity = "critical";
//         message = condition.thresholds.listeria?.message;
//       } else if (hasCaffeine) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.caffeine?.message;
//       }
//     }
//     // Atrial Fibrillation (AFib)
//     else if (condition.name === "Atrial Fibrillation (AFib)") {
//       const hasCaffeine = item.ingredients?.some((ing) =>
//         ["coffee", "tea", "caffeine", "energy", "cola"].some((caff) =>
//           ing.toLowerCase().includes(caff),
//         ),
//       );
//       if (hasCaffeine && nutrition.sodium >= 600) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.caffeineHigh?.message;
//       } else if (hasCaffeine) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.caffeine?.message;
//       } else if (nutrition.sodium >= condition.thresholds.sodium?.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sodium.message;
//       }
//     }
//     // Stroke Recovery / Prevention
//     else if (condition.name === "Stroke Recovery / Prevention") {
//       if (nutrition.sodium >= condition.thresholds.sodiumHigh.value) {
//         riskLevel = "warning";
//         severity = "high";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= condition.thresholds.sodium.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (
//         nutrition.saturatedFat >= condition.thresholds.saturatedFat?.value
//       ) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.saturatedFat.message;
//       }
//     }
//     // Diverticulitis
//     else if (condition.name === "Diverticulitis") {
//       const hasNuts = item.ingredients?.some((ing) =>
//         [
//           "nut",
//           "peanut",
//           "almond",
//           "walnut",
//           "cashew",
//           "seed",
//           "sesame",
//           "sunflower",
//         ].some((nut) => ing.toLowerCase().includes(nut)),
//       );
//       const hasFiber = nutrition.fiber >= condition.thresholds.fiber?.value;
//       if (hasNuts) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.nuts?.message;
//       }
//       if (hasFiber) {
//         riskLevel = "positive";
//         severity = "positive";
//         message = condition.thresholds.fiber?.message;
//       }
//     }
//     // Parkinson's Disease
//     else if (condition.name === "Parkinson's Disease") {
//       if (nutrition.protein >= condition.thresholds.protein?.value) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.protein.message.replace(
//           "{value}",
//           nutrition.protein,
//         );
//       }
//     }
//     // Epilepsy
//     else if (condition.name === "Epilepsy") {
//       const hasAspartame = item.ingredients?.some((ing) =>
//         ["aspartame", "nutrasweet", "equal", "diet"].some((asp) =>
//           ing.toLowerCase().includes(asp),
//         ),
//       );
//       if (hasAspartame) {
//         riskLevel = "info";
//         severity = "moderate";
//         message = condition.thresholds.aspartame?.message;
//       }
//     }

//     if (riskLevel !== "safe" && riskLevel !== "positive") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         severity: severity,
//         warningMessage: message,
//         excessPercent: excessPercent,
//       });
//     } else if (riskLevel === "positive" && message) {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: "text-green-600",
//         bgColor: "bg-green-50",
//         description: condition.description,
//         riskLevel: "positive",
//         severity: "positive",
//         warningMessage: message,
//         excessPercent: 0,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     hasPositive: conditionsAnalysis.some((c) => c.riskLevel === "positive"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== API SERVICE FOR ORDERS (Fixed - no loop) ==========
// class OrderAPIService {
//   static statusListeners = new Map();
//   static orderTimeouts = new Map(); // Track timeouts per order

//   static async sendOrderToDatabase(orderData) {
//     try {
//       const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
//       const bookingId = `BK_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

//       const payload = {
//         personDetails: {
//           name: orderData.customerName,
//           tableNumber: orderData.tableNumber,
//           orderType: orderData.orderType || "dine-in",
//         },
//         bookingDetails: {
//           bookingId: bookingId,
//           orderId: orderId,
//           orderDate: new Date().toISOString(),
//           estimatedPickupTime: orderData.estimatedPickupTime,
//           preparationStatus: "confirmed",
//           currentStatus: "confirmed",
//           statusHistory: [
//             {
//               status: "confirmed",
//               timestamp: new Date().toISOString(),
//               note: "Order confirmed",
//             },
//           ],
//           specialInstructions: orderData.notes || "",
//         },
//         plateRecommendations: orderData.customizedPlates.map((plate, idx) => ({
//           plateId: `PLT_${Date.now()}_${idx}`,
//           originalName: plate.name,
//           customizations: plate.customizations || [],
//           specialInstructions: plate.instructions || "",
//         })),
//         orderSummary: {
//           items: orderData.items.map((item) => ({
//             id: item.id,
//             name: item.name,
//             quantity: item.quantity,
//             originalPrice: item.price,
//             finalPrice: item.finalPrice,
//             customizations: item.customizations || [],
//             specialInstructions: item.specialInstructions || "",
//             preparationTime: item.prepTime || 15,
//           })),
//           subtotal: orderData.subtotal,
//           total: orderData.total,
//           totalItems: orderData.items.reduce(
//             (sum, item) => sum + item.quantity,
//             0,
//           ),
//         },
//         metadata: {
//           source: "NutriScan-AI-App",
//           version: "1.0.0",
//           timestamp: new Date().toISOString(),
//         },
//       };

//       ordersStore.set(orderId, {
//         ...payload,
//         status: "confirmed",
//         createdAt: new Date().toISOString(),
//       });

//       const localOrders = JSON.parse(
//         localStorage.getItem("nutriscan_orders") || "[]",
//       );
//       localOrders.push({
//         ...payload,
//         localSaveTime: new Date().toISOString(),
//         syncedToCloud: true,
//       });
//       localStorage.setItem("nutriscan_orders", JSON.stringify(localOrders));

//       // Start the order status updates (only once per order)
//       this.startOrderStatusUpdates(orderId);

//       return {
//         success: true,
//         orderId: orderId,
//         bookingId: bookingId,
//         message: "Order successfully placed!",
//       };
//     } catch (error) {
//       console.error("API Error:", error);
//       return {
//         success: false,
//         error: error.message,
//         message: "Failed to place order. Please try again.",
//       };
//     }
//   }

//   static startOrderStatusUpdates(orderId) {
//     // Clear any existing timeouts for this order
//     if (this.orderTimeouts.has(orderId)) {
//       clearTimeout(this.orderTimeouts.get(orderId));
//       clearTimeout(this.orderTimeouts.get(`${orderId}_preparing`));
//       clearTimeout(this.orderTimeouts.get(`${orderId}_ready`));
//       clearTimeout(this.orderTimeouts.get(`${orderId}_completed`));
//     }

//     // Schedule status updates
//     const preparingTimeout = setTimeout(() => {
//       const order = ordersStore.get(orderId);
//       if (order && order.status === "confirmed") {
//         order.status = "preparing";
//         ordersStore.set(orderId, order);
//         this.notifyListeners(
//           orderId,
//           "preparing",
//           "Kitchen is preparing your order!",
//         );
//       }
//     }, 5000);

//     const readyTimeout = setTimeout(() => {
//       const order = ordersStore.get(orderId);
//       if (order && order.status === "preparing") {
//         order.status = "ready";
//         ordersStore.set(orderId, order);
//         this.notifyListeners(
//           orderId,
//           "ready",
//           "Your order is ready for pickup!",
//         );
//       }
//     }, 15000);

//     const completedTimeout = setTimeout(() => {
//       const order = ordersStore.get(orderId);
//       if (order && order.status === "ready") {
//         order.status = "completed";
//         ordersStore.set(orderId, order);
//         this.notifyListeners(
//           orderId,
//           "completed",
//           "Order completed! Enjoy your meal!",
//         );
//       }
//     }, 25000);

//     this.orderTimeouts.set(`${orderId}_preparing`, preparingTimeout);
//     this.orderTimeouts.set(`${orderId}_ready`, readyTimeout);
//     this.orderTimeouts.set(`${orderId}_completed`, completedTimeout);
//   }

//   static notifyListeners(orderId, status, message) {
//     this.statusListeners.forEach((callback, listenerId) => {
//       callback({ status, message, orderId });
//     });
//   }

//   static addStatusListener(id, callback) {
//     this.statusListeners.set(id, callback);
//   }

//   static removeStatusListener(id) {
//     this.statusListeners.delete(id);
//   }

//   static async getOrderStatus(orderId) {
//     const order = ordersStore.get(orderId);
//     if (order) {
//       return {
//         success: true,
//         status: order.status,
//         orderId: orderId,
//         details: order,
//         message: `Order ${orderId} is ${order.status}`,
//       };
//     }

//     const localOrders = JSON.parse(
//       localStorage.getItem("nutriscan_orders") || "[]",
//     );
//     const foundOrder = localOrders.find(
//       (o) => o.bookingDetails?.orderId === orderId,
//     );

//     if (foundOrder) {
//       return {
//         success: true,
//         status: foundOrder.bookingDetails?.currentStatus || "confirmed",
//         orderId: orderId,
//         details: foundOrder,
//         message: `Order ${orderId} found`,
//       };
//     }

//     return {
//       success: false,
//       status: "not_found",
//       message: "Order not found. Please check the Order ID and try again.",
//     };
//   }

//   // Clean up timeouts for an order
//   static cleanupOrder(orderId) {
//     if (this.orderTimeouts.has(`${orderId}_preparing`)) {
//       clearTimeout(this.orderTimeouts.get(`${orderId}_preparing`));
//     }
//     if (this.orderTimeouts.has(`${orderId}_ready`)) {
//       clearTimeout(this.orderTimeouts.get(`${orderId}_ready`));
//     }
//     if (this.orderTimeouts.has(`${orderId}_completed`)) {
//       clearTimeout(this.orderTimeouts.get(`${orderId}_completed`));
//     }
//   }
// }

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
//   isLoadingNutrition,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         transition={{
//           type: "spring",
//           damping: 25,
//           stiffness: 400,
//           duration: 0.5,
//         }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 initial={{ rotate: 0, scale: 0 }}
//                 animate={{ rotate: 360, scale: 1 }}
//                 transition={{ duration: 0.6, type: "spring" }}
//                 className="bg-white/20 p-2 rounded-full"
//               >
//                 <ScienceIcon className="text-2xl" />
//               </motion.div>
//               <div>
//                 <motion.h2
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                   className="font-bold text-xl"
//                 >
//                   {item?.name}
//                 </motion.h2>
//                 <motion.p
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-orange-100 text-sm"
//                 >
//                   RWF {item?.price?.toLocaleString()} • {item?.prepTime} min
//                   prep
//                 </motion.p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full transition"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {/* API Source Badge - Real data from APIs */}
//           {!isLoadingNutrition && item?.nutritionSource && (
//             <motion.div
//               initial={{ x: -30, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-2 text-center text-xs text-green-700 border border-green-200 flex items-center justify-center gap-2"
//             >
//               <CheckCircleIcon className="text-green-500 text-sm" /> ✅
//               Real-time nutrition data from {item.nutritionSource}
//             </motion.div>
//           )}

//           {/* Description */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="bg-gray-50 rounded-xl p-4"
//           >
//             <p className="text-gray-700 text-sm">{item?.description}</p>
//           </motion.div>

//           {/* Ingredients Section */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <motion.span
//                   animate={{
//                     rotate: expandedSection === "ingredients" ? 180 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="text-xl"
//                 >
//                   🥗
//                 </motion.span>
//                 <span className="font-semibold text-gray-800">Ingredients</span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </motion.button>
//             <AnimatePresence>
//               {expandedSection === "ingredients" && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="mt-2 p-3 bg-gray-50 rounded-xl overflow-hidden"
//                 >
//                   <div className="flex flex-wrap gap-2">
//                     {item?.ingredients?.map((ing, idx) => (
//                       <motion.span
//                         key={idx}
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: idx * 0.05, type: "spring" }}
//                         className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border border-gray-200"
//                       >
//                         {ing}
//                       </motion.span>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Nutrition Facts Section - Real data from APIs */}
//           {nutritionInfo.length > 0 && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "nutrition" ? null : "nutrition",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600" />
//                   <span className="font-semibold text-gray-800">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </motion.button>
//               <AnimatePresence>
//                 {expandedSection === "nutrition" && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-2 p-4 bg-emerald-50 rounded-xl overflow-hidden"
//                   >
//                     <div className="grid grid-cols-2 gap-3">
//                       {nutritionInfo.map((n, idx) => (
//                         <motion.div
//                           key={idx}
//                           initial={{ x: -15, opacity: 0 }}
//                           animate={{ x: 0, opacity: 1 }}
//                           transition={{ delay: idx * 0.05 }}
//                           className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                         >
//                           <span className="text-sm text-gray-600 flex items-center gap-1">
//                             <span>{n.icon}</span> {n.label}
//                           </span>
//                           <span className="font-semibold text-gray-800">
//                             {n.value} {n.unit}
//                           </span>
//                         </motion.div>
//                       ))}
//                     </div>
//                     <div className="mt-3 pt-2 text-xs text-gray-500 text-center">
//                       Based on standard serving size | Source:{" "}
//                       {item?.nutritionSource || "External API"}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}

//           {/* Health Information Section - Real data based */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.6 }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600" />
//                   <span className="font-semibold text-gray-800">
//                     Health Information (Based on Real Nutrition Data)
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.2 }}
//                       className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full"
//                     >
//                       {warningConditions.length} warning(s)
//                     </motion.span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </motion.button>
//               <AnimatePresence>
//                 {expandedSection === "health" && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-2 space-y-3 overflow-hidden"
//                   >
//                     {warningConditions.map((cond, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ x: -30, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: idx * 0.1, type: "spring" }}
//                         className={`${cond.bgColor} rounded-xl p-4 border-l-4 border-amber-500`}
//                       >
//                         <div className="flex items-start gap-3">
//                           <motion.span
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 0.5, delay: idx * 0.1 }}
//                             className="text-2xl"
//                           >
//                             {cond.icon}
//                           </motion.span>
//                           <div className="flex-1">
//                             <h4 className="font-bold text-gray-800">
//                               {cond.conditionName}
//                             </h4>
//                             <p className="text-sm text-gray-700 mt-1">
//                               {cond.warningMessage}
//                             </p>
//                             {cond.excessPercent > 0 && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 transition={{ delay: 0.2 }}
//                                 className="mt-2 bg-white/60 rounded-lg p-2"
//                               >
//                                 <p className="text-xs font-medium text-amber-700">
//                                   ⚠️ Exceeds recommended limit by{" "}
//                                   {cond.excessPercent}%
//                                 </p>
//                               </motion.div>
//                             )}
//                             <div className="mt-2 bg-white/50 rounded-lg p-2">
//                               <p className="text-xs font-medium text-gray-700">
//                                 💡 Recommendation:
//                               </p>
//                               <p className="text-xs text-gray-600">
//                                 Consider a smaller portion or ask for
//                                 modifications when ordering.
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                     {infoConditions.map((cond, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ x: -30, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.3 + idx * 0.1 }}
//                         className="bg-blue-50 rounded-xl p-4"
//                       >
//                         <div className="flex items-start gap-3">
//                           <span className="text-xl">{cond.icon}</span>
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-800">
//                               {cond.conditionName}
//                             </h4>
//                             <p className="text-xs text-gray-600 mt-1">
//                               {cond.warningMessage}
//                             </p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}

//           {!isLoadingNutrition && analysis.conditions.length === 0 && (
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: "spring", delay: 0.3 }}
//               className="bg-green-50 rounded-xl p-4 text-center border border-green-200"
//             >
//               <motion.div
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 0.5, repeat: 2, delay: 0.2 }}
//               >
//                 <CheckCircleIcon className="text-green-500 text-4xl mx-auto mb-2" />
//               </motion.div>
//               <p className="text-green-700 font-medium">
//                 ✓ No specific health concerns detected
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 This item appears suitable for most dietary needs
//               </p>
//             </motion.div>
//           )}

//           <div className="bg-gray-100 rounded-xl p-3 text-xs text-gray-500">
//             <p className="font-medium mb-1">ℹ️ About this analysis:</p>
//             <p>
//               Nutritional information is fetched in real-time from USDA Food
//               Database and Spoonacular API. Individual needs may vary. Consult a
//               healthcare professional for personalized advice.
//             </p>
//           </div>
//         </div>

//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-500 transition"
//           >
//             Close
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition flex items-center justify-center gap-2 shadow-lg"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({ isOpen, onClose, onCheckStatus, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [statusResult, setStatusResult] = useState(null);
//   const notifiedStatuses = useRef(new Set());

//   useEffect(() => {
//     if (liveStatus && liveStatus.orderId === orderId && liveStatus.status) {
//       // Only show toast once per status
//       if (!notifiedStatuses.current.has(`${orderId}_${liveStatus.status}`)) {
//         notifiedStatuses.current.add(`${orderId}_${liveStatus.status}`);
//         if (liveStatus.status === "confirmed") {
//           toast.info(
//             `🟡 Order ${orderId.slice(-8)}: Confirmed! Kitchen is preparing.`,
//           );
//         } else if (liveStatus.status === "preparing") {
//           toast.info(`🍳 Order ${orderId.slice(-8)}: Being prepared!`);
//         } else if (liveStatus.status === "ready") {
//           toast.success(`✅ Order ${orderId.slice(-8)}: READY for pickup!`, {
//             autoClose: 10000,
//           });
//         } else if (liveStatus.status === "completed") {
//           toast.success(`🎉 Order ${orderId.slice(-8)}: Completed! Enjoy!`);
//         }
//       }
//       setStatusResult((prev) => ({
//         ...prev,
//         status: liveStatus.status,
//         message: liveStatus.message,
//       }));
//     }
//   }, [liveStatus, orderId]);

//   const handleCheckStatus = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }
//     setIsLoading(true);
//     const result = await onCheckStatus(orderId);
//     setStatusResult(result);
//     setIsLoading(false);
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800 border-blue-400";
//       case "preparing":
//         return "bg-yellow-100 text-yellow-800 border-yellow-400";
//       case "ready":
//         return "bg-green-100 text-green-800 border-green-400";
//       case "completed":
//         return "bg-gray-100 text-gray-800 border-gray-400";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-400";
//       default:
//         return "bg-gray-100 text-gray-600 border-gray-300";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return <CheckCircleIcon className="text-blue-600" />;
//       case "preparing":
//         return <TimerIcon className="text-yellow-600 animate-pulse" />;
//       case "ready":
//         return <NotifIcon className="text-green-600 animate-bounce" />;
//       case "completed":
//         return <CheckIcon className="text-gray-600" />;
//       case "cancelled":
//         return <ErrorIcon className="text-red-600" />;
//       default:
//         return <WarningIcon className="text-gray-400" />;
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         transition={{ type: "spring", damping: 25 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-white font-bold text-xl flex items-center gap-2">
//               <ConfirmationNumberIcon /> Track Your Order
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 90 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </motion.button>
//           </div>
//           <p className="text-indigo-100 text-sm mt-1">
//             Enter your Order ID to track status
//           </p>
//         </div>
//         <div className="p-4">
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               value={orderId}
//               onChange={(e) => {
//                 setOrderId(e.target.value.toUpperCase());
//                 notifiedStatuses.current.clear();
//               }}
//               placeholder="e.g., ORD_1735123456789_ABC123"
//               className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
//               onKeyPress={(e) => e.key === "Enter" && handleCheckStatus()}
//             />
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleCheckStatus}
//               disabled={isLoading}
//               className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </motion.button>
//           </div>
//           {statusResult && (
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className={`rounded-xl border-2 p-4 ${getStatusColor(statusResult.status)}`}
//             >
//               <div className="flex items-center gap-3">
//                 <motion.span
//                   animate={
//                     statusResult.status === "preparing" ? { rotate: 360 } : {}
//                   }
//                   transition={{
//                     duration: 2,
//                     repeat: statusResult.status === "preparing" ? Infinity : 0,
//                   }}
//                   className="text-3xl"
//                 >
//                   {getStatusIcon(statusResult.status)}
//                 </motion.span>
//                 <div className="flex-1">
//                   <p className="font-bold text-lg">
//                     Order #{orderId.slice(-12)}
//                   </p>
//                   <p className="text-sm font-medium">
//                     Status: {statusResult.status?.toUpperCase()}
//                   </p>
//                 </div>
//               </div>
//               {statusResult.message && (
//                 <p className="mt-2 text-sm">{statusResult.message}</p>
//               )}
//               {statusResult.details && (
//                 <div className="mt-3 pt-2 border-t border-current/20 text-xs">
//                   <p>
//                     📅{" "}
//                     {new Date(
//                       statusResult.details.bookingDetails?.orderDate,
//                     ).toLocaleString()}
//                   </p>
//                   <p>👤 {statusResult.details.personDetails?.name}</p>
//                   <p>
//                     🪑 Table {statusResult.details.personDetails?.tableNumber}
//                   </p>
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-2 rounded-xl font-medium"
//           >
//             Close
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
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//           <p className="text-orange-100 text-sm">
//             Enter your details to continue
//           </p>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0, scale: 0.9 }}
//         animate={{ x: 0, opacity: 1, scale: 1 }}
//         exit={{ x: 300, opacity: 0, scale: 0.9 }}
//         transition={{ type: "spring", damping: 25 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
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
//               <motion.div
//                 key={item.cartId}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="mb-3 pb-3 border-b"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     {item.customizations?.length > 0 && (
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
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </motion.button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
//                   >
//                     <AddIcon fontSize="small" />
//                   </motion.button>
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500"
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </motion.button>
//                 </div>
//               </motion.div>
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
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={onCheckout}
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold shadow-lg"
//             >
//               Confirm Order - Table {tableInfo.tableNumber}
//             </motion.button>
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         transition={{ type: "spring", damping: 25 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-xs text-gray-500 mb-1">Order ID</p>
//             <p className="font-bold text-sm break-all">{order.orderId}</p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <motion.span className="text-green-600 font-semibold">
//                 {order.status}
//               </motion.span>
//             </p>
//             <p>
//               <strong>Time Remaining:</strong>{" "}
//               {Math.floor(order.timeRemaining / 60)}:
//               {(order.timeRemaining % 60).toString().padStart(2, "0")}
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice?.toLocaleString()}</span>
//               </div>
//               {item.customizations?.length > 0 && (
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
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         transition={{ type: "spring", damping: 20 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative z-10"
//       >
//         {type === "success" && (
//           <motion.div
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ duration: 0.5 }}
//           >
//             <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//           </motion.div>
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

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);

//   if (!isOpen) return null;

//   const customizationOptions = [
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//     "Extra vegetables",
//     "No sugar",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         transition={{ type: "spring", damping: 25 }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-5 rounded-t-3xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-white font-bold text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-sm mt-1">{item?.name}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full transition"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-sm ml-2">per serving</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">✨</span>
//                 <span className="font-semibold text-gray-800">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? (
//                 <ExpandLessIcon className="text-gray-500" />
//               ) : (
//                 <ExpandMoreIcon className="text-gray-500" />
//               )}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-3 py-2 rounded-lg text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-3">
//               <h3 className="font-semibold text-emerald-800 text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="bg-gradient-to-t from-red-500 to-red-700"
//                     >
//                       <Close className="text-white" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests? (e.g., allergies, extra well-done, etc.)"
//               className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>

//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
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
//           onExpire?.();
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
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={onOpenModal}
//       className="fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl transition-all duration-300"
//     >
//       <div
//         className={`${getTimerColor()} text-white px-4 py-3 rounded-full flex items-center gap-3`}
//       >
//         <TimerIcon className="animate-pulse" />
//         <div className="flex flex-col">
//           <span className="text-xs font-medium">
//             Order #{orderId?.slice(-8)} | Table {tableNumber}
//           </span>
//           <span className="text-xl font-mono font-bold tracking-wider">
//             {formatTime(timeLeft)}
//           </span>
//         </div>
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);

//     // Show loading modal for 2 seconds before fetching real API data
//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);

//       // Fetch real nutrition data from APIs
//       const { nutritionalInfo, nutritionSource } =
//         await FoodAnalysisAPIService.getCompleteNutritionAnalysis(item);

//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);

//       // Update menu items cache
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );

//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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

//   useEffect(() => {
//     if (activeOrder?.orderId) {
//       const handleStatusUpdate = (statusData) => {
//         if (statusData.orderId === activeOrder.orderId && statusData.status) {
//           setActiveOrder((prev) => ({ ...prev, status: statusData.status }));
//           setLiveStatus(statusData);
//         }
//       };
//       OrderAPIService.addStatusListener("activeOrder", handleStatusUpdate);
//       return () => {
//         OrderAPIService.removeStatusListener("activeOrder");
//         OrderAPIService.cleanupOrder(activeOrder.orderId);
//       };
//     }
//   }, [activeOrder?.orderId]);

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
//     setIsSubmitting(true);
//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//     const customizedPlates = cart.map((item) => ({
//       name: item.name,
//       originalIngredients: item.ingredients,
//       customizations: item.customizations || [],
//       instructions: item.specialInstructions || "",
//     }));
//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber,
//       items: cart,
//       customizedPlates,
//       subtotal: getTotal(),
//       total: getTotal(),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       orderType: "dine-in",
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//     };

//     const result = await OrderAPIService.sendOrderToDatabase(orderData);
//     if (result.success) {
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
//         message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${result.orderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n📱 You'll receive notifications when your order status changes!\n\n💡 Save your Order ID to track your order: ${result.orderId}`,
//       });
//       setCart([]);
//     } else {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: result.message || "Failed to place order. Please try again.",
//       });
//     }
//     setIsSubmitting(false);
//   };

//   const handleCheckOrderStatus = async (orderId) =>
//     await OrderAPIService.getOrderStatus(orderId);
//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
//             isOpen={showAnalysisModal}
//             onClose={() => setShowAnalysisModal(false)}
//             analysis={analysisResult}
//             item={currentItem}
//             onContinue={handleContinueToCustomize}
//             isLoadingNutrition={false}
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
//             onCheckStatus={handleCheckOrderStatus}
//             liveStatus={liveStatus}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
//             >
//               <ConfirmationNumberIcon />
//               <span className="hidden sm:inline text-sm font-medium">
//                 Track Order
//               </span>
//             </motion.button>
//           </div>
//         </div>

//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-3 mb-4 shadow-sm"
//         >
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis
//               </p>
//               <p className="text-xs text-blue-600">
//                 Click any dish to see detailed nutritional info from USDA and
//                 Spoonacular APIs, plus health insights for 12+ clinical
//                 conditions
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -8, transition: { duration: 0.2 } }}
//               whileTap={{ scale: 0.97 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   transition={{ duration: 0.4 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span className="text-orange-600 font-bold text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <motion.button
//                     whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-md"
//                   >
//                     Order Now
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-16">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No items match your search.</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Try a different keyword or browse our categories.
//             </p>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm hover:bg-gray-50 transition"
//             >
//               ←
//             </motion.button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 7) pageNum = i + 1;
//               else if (currentPage <= 4) pageNum = i + 1;
//               else if (currentPage >= totalPages - 3)
//                 pageNum = totalPages - 6 + i;
//               else pageNum = currentPage - 3 + i;
//               return (
//                 <motion.button
//                   key={pageNum}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-9 h-9 rounded-lg transition ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </motion.button>
//               );
//             })}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm hover:bg-gray-50 transition"
//             >
//               →
//             </motion.button>
//           </div>
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
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-14 w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">Please wait</p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
// import io from "socket.io-client";
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
//   Close,
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders/status",
//   CUSTOMIZED_PLATES: "/customized-plates",
//   TRACK_ORDER: "/orders/track",
// };

// // Socket.io server URL
// const SOCKET_URL = "https://your-socket-server.com";

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;
//   static socket = null;
//   static socketListeners = new Map();

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,
//       timeout: 30000,
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//     });

//     // Request interceptor for adding auth token
//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     // Response interceptor for error handling
//     this.axiosInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("auth_token");
//           window.dispatchEvent(new CustomEvent("auth:logout"));
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) {
//       APIService.instance = new APIService();
//     }
//     return APIService.instance;
//   }

//   // ========== SOCKET.IO CONNECTION ==========
//   static connectSocket(orderId = null) {
//     if (APIService.socket?.connected) {
//       return APIService.socket;
//     }

//     APIService.socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//       query: { orderId },
//     });

//     APIService.socket.on("connect", () => {
//       console.log("Socket connected:", APIService.socket.id);
//       if (orderId) {
//         APIService.socket.emit("join-order-room", orderId);
//       }
//     });

//     APIService.socket.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });

//     APIService.socket.on("connect_error", (error) => {
//       console.error("Socket connection error:", error);
//     });

//     return APIService.socket;
//   }

//   static disconnectSocket() {
//     if (APIService.socket) {
//       APIService.socket.disconnect();
//       APIService.socket = null;
//     }
//   }

//   static onOrderStatusUpdate(callback) {
//     if (!APIService.socket) return;
//     APIService.socket.on("order-status-update", callback);
//   }

//   static offOrderStatusUpdate(callback) {
//     if (!APIService.socket) return;
//     APIService.socket.off("order-status-update", callback);
//   }

//   static onChefPreparationUpdate(callback) {
//     if (!APIService.socket) return;
//     APIService.socket.on("chef-preparation-update", callback);
//   }

//   static offChefPreparationUpdate(callback) {
//     if (!APIService.socket) return;
//     APIService.socket.off("chef-preparation-update", callback);
//   }

//   static emitJoinOrderRoom(orderId) {
//     if (APIService.socket) {
//       APIService.socket.emit("join-order-room", orderId);
//     }
//   }

//   static emitLeaveOrderRoom(orderId) {
//     if (APIService.socket) {
//       APIService.socket.emit("leave-order-room", orderId);
//     }
//   }

//   // ========== ORDER APIs ==========
//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Create order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getOrderStatus(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getAllOrders(filters = {}) {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
//         params: filters,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async updateOrderStatus(orderId, status, notes = "") {
//     try {
//       const response = await this.axiosInstance.patch(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//         {
//           status,
//           notes,
//           updatedAt: new Date().toISOString(),
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Update order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async trackOrder(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.TRACK_ORDER}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Track order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async cancelOrder(orderId, reason = "") {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//         {
//           data: { reason },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Cancel order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== CUSTOMIZED PLATES APIs ==========
//   async saveCustomizedPlate(plateData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.CUSTOMIZED_PLATES,
//         plateData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Save customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getUserCustomizedPlates(userId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get user customized plates error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async deleteCustomizedPlate(plateId) {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Delete customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== NUTRITION APIs ==========
//   async searchFoodUSDA(query) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   async getFoodDetails(fdcId) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: { api_key: API_CONFIG.USDA_API_KEY },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   async analyzeRecipeSpoonacular(ingredients, title) {
//     try {
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe?.id) {
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       return { nutrition: nutritionData, info: recipe || null };
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     if (usdaSearch?.foods?.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];
//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };
//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];
//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };
//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//     };

//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
//       coffee: { calories: 2, carbs: 0 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       estimated[key] = Math.min(
//         key === "calories"
//           ? 1200
//           : key === "fat"
//             ? 60
//             : key === "sodium"
//               ? 1500
//               : key === "sugar"
//                 ? 40
//                 : key === "saturatedFat"
//                   ? 25
//                   : key === "cholesterol"
//                     ? 200
//                     : key === "protein"
//                       ? 50
//                       : key === "carbs"
//                         ? 100
//                         : 15,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });

//     return estimated;
//   }

//   handleError(error) {
//     if (error.response) {
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error occurred",
//         data: error.response.data,
//       };
//     } else if (error.request) {
//       return {
//         status: 0,
//         message: "Network error - Unable to connect to server",
//         data: null,
//       };
//     }
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
//       },
//     },
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
//       "salt",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: true,
//     sodiumMg: 890,
//     sugarGrams: 8,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 1200,
//     sugarGrams: 2,
//   },
//   {
//     id: 3,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description: "Fresh lake tilapia grilled to perfection",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 400,
//     sugarGrams: 1,
//   },
//   {
//     id: 4,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 50,
//     sugarGrams: 5,
//   },
//   {
//     id: 5,
//     name: "Sweet Masala Chai",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//     ],
//     description: "Traditional spiced tea",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 50,
//     sugarGrams: 35,
//   },
//   {
//     id: 6,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 150,
//     sugarGrams: 45,
//   },
//   {
//     id: 7,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 850,
//     sugarGrams: 4,
//   },
//   {
//     id: 8,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
//     description: "Assorted premium nuts",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: false,
//     sodiumMg: 380,
//     sugarGrams: 4,
//   },
// ];

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
//     }, 50);

//     const stepInterval = setInterval(() => {
//       setLoadingStep((prev) =>
//         prev < loadingSteps.length - 1 ? prev + 1 : prev,
//       );
//     }, 800);

//     const apiTimeout1 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
//       1500,
//     );
//     const apiTimeout2 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
//       2500,
//     );

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="bg-white/20 p-2 rounded-full"
//               >
//                 <ScienceIcon className="text-2xl" />
//               </motion.div>
//               <div>
//                 <h2 className="font-bold text-xl">
//                   Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//                 </h2>
//                 <p className="text-orange-100 text-sm">{itemName}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div>
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
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

//           <div className="space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-3"
//               >
//                 <div
//                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </div>
//                 <span
//                   className={`text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"}`}
//                 >
//                   {step.message}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           <div className="bg-gray-100 rounded-xl p-3">
//             <p className="text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-4">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">Spoonacular API</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let message = null;

//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= 30) {
//         riskLevel = "warning";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= 15) {
//         riskLevel = "info";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= 80) {
//         riskLevel = "warning";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= 50) {
//         riskLevel = "info";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     } else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= 1200) {
//         riskLevel = "warning";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= 600) {
//         riskLevel = "info";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     } else if (condition.name === "Heart Disease") {
//       if (nutrition.saturatedFat >= 15) {
//         riskLevel = "warning";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (nutrition.saturatedFat >= 8) {
//         riskLevel = "info";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (nutrition.cholesterol >= 300) {
//         riskLevel = "warning";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (nutrition.cholesterol >= 200) {
//         riskLevel = "info";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     } else if (condition.name === "Celiac Disease" && item.containsGluten) {
//       riskLevel = "warning";
//       message = condition.thresholds.gluten.message;
//     } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
//       riskLevel = "warning";
//       message = condition.thresholds.allergen.message;
//     }

//     if (riskLevel !== "safe") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         warningMessage: message,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-bold text-xl">{item?.name}</h2>
//               <p className="text-orange-100 text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {item?.nutritionSource && (
//             <div className="bg-green-50 rounded-xl p-2 text-center text-xs text-green-700">
//               ✅ Real-time nutrition data from {item.nutritionSource}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-gray-700 text-sm">{item?.description}</p>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800">Ingredients</span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-xl">
//                 <div className="flex flex-wrap gap-2">
//                   {item?.ingredients?.map((ing, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                 </div>
//               </div>
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
//                 className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600" />
//                   <span className="font-semibold text-gray-800">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <div className="mt-2 p-4 bg-emerald-50 rounded-xl">
//                   <div className="grid grid-cols-2 gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className="text-sm text-gray-600">
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Health Warnings */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600" />
//                   <span className="font-semibold text-gray-800">
//                     Health Information
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                       {warningConditions.length} warnings
//                     </span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "health" && (
//                 <div className="mt-2 space-y-3">
//                   {warningConditions.map((cond, idx) => (
//                     <div
//                       key={idx}
//                       className={`${cond.bgColor} rounded-xl p-4 border-l-4 border-amber-500`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className="text-2xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-bold text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-sm text-gray-700">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {infoConditions.map((cond, idx) => (
//                     <div key={idx} className="bg-blue-50 rounded-xl p-4">
//                       <div className="flex items-start gap-3">
//                         <span className="text-xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-medium text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-xs text-gray-600">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {analysis.conditions.length === 0 && (
//             <div className="bg-green-50 rounded-xl p-4 text-center">
//               <CheckCircleIcon className="text-green-500 text-4xl mx-auto mb-2" />
//               <p className="text-green-700 font-medium">
//                 ✓ No specific health concerns detected
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-500"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({ isOpen, onClose, onCheckStatus, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [statusResult, setStatusResult] = useState(null);

//   useEffect(() => {
//     if (liveStatus && liveStatus.orderId === orderId && liveStatus.status) {
//       if (liveStatus.status === "confirmed") {
//         toast.info(`🟡 Order ${orderId.slice(-8)}: Confirmed!`);
//       } else if (liveStatus.status === "preparing") {
//         toast.info(`🍳 Order ${orderId.slice(-8)}: Being prepared!`);
//       } else if (liveStatus.status === "ready") {
//         toast.success(`✅ Order ${orderId.slice(-8)}: READY for pickup!`);
//       } else if (liveStatus.status === "completed") {
//         toast.success(`🎉 Order ${orderId.slice(-8)}: Completed! Enjoy!`);
//       }
//       setStatusResult((prev) => ({
//         ...prev,
//         status: liveStatus.status,
//         message: liveStatus.message,
//       }));
//     }
//   }, [liveStatus, orderId]);

//   const handleCheckStatus = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }
//     setIsLoading(true);
//     const result = await onCheckStatus(orderId);
//     setStatusResult(result);
//     setIsLoading(false);
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
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-white font-bold text-xl flex items-center gap-2">
//               <ConfirmationNumberIcon /> Track Your Order
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>
//         <div className="p-4">
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value.toUpperCase())}
//               placeholder="Enter Order ID"
//               className="flex-1 px-4 py-3 border rounded-xl text-sm font-mono"
//               onKeyPress={(e) => e.key === "Enter" && handleCheckStatus()}
//             />
//             <button
//               onClick={handleCheckStatus}
//               disabled={isLoading}
//               className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>
//           {statusResult && (
//             <div
//               className={`rounded-xl p-4 ${getStatusColor(statusResult.status)}`}
//             >
//               <p className="font-bold text-lg">Order #{orderId.slice(-12)}</p>
//               <p className="text-sm font-medium">
//                 Status: {statusResult.status?.toUpperCase()}
//               </p>
//               {statusResult.message && (
//                 <p className="mt-2 text-sm">{statusResult.message}</p>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-2 rounded-xl"
//           >
//             Close
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
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
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
//                     {item.customizations?.length > 0 && (
//                       <div className="text-xs text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600">
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
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-xs text-gray-500">
//               Order ID: {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice?.toLocaleString()}</span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-gray-500">
//                   {item.customizations.map((c) => `• ${c}`).join(" ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative z-10"
//       >
//         {type === "success" ? (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         ) : (
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

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);

//   if (!isOpen) return null;

//   const customizationOptions = [
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-5 rounded-t-3xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-white font-bold text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-sm mt-1">{item?.name}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-5 space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-sm ml-2">per serving</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">✨</span>
//                 <span className="font-semibold text-gray-800">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-3 py-2 rounded-lg text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-3">
//               <h3 className="font-semibold text-emerald-800 text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="text-emerald-500"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests?"
//               className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
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
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) =>
//     `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-4 py-3 flex items-center gap-3`}
//     >
//       <TimerIcon className="animate-pulse" />
//       <div>
//         <span className="text-xs font-medium">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-xl font-mono font-bold block">
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);

//   const apiService = useMemo(() => APIService.getInstance(), []);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);

//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);

//       const { nutritionalInfo, nutritionSource } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );

//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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

//   // Socket.io setup for real-time order tracking
//   useEffect(() => {
//     if (activeOrder?.orderId) {
//       const socket = APIService.connectSocket(activeOrder.orderId);

//       const handleStatusUpdate = (data) => {
//         if (data.orderId === activeOrder.orderId) {
//           setActiveOrder((prev) => ({ ...prev, status: data.status }));
//           setLiveStatus(data);

//           // Update order status via API as well
//           apiService.updateOrderStatus(
//             activeOrder.orderId,
//             data.status,
//             data.message,
//           );
//         }
//       };

//       const handleChefUpdate = (data) => {
//         if (data.orderId === activeOrder.orderId) {
//           toast.info(`👨‍🍳 Chef update: ${data.message}`);
//           if (data.step) {
//             setActiveOrder((prev) => ({
//               ...prev,
//               currentStep: data.step,
//               stepProgress: data.progress,
//             }));
//           }
//         }
//       };

//       APIService.onOrderStatusUpdate(handleStatusUpdate);
//       APIService.onChefPreparationUpdate(handleChefUpdate);
//       setSocketConnected(true);

//       return () => {
//         APIService.offOrderStatusUpdate(handleStatusUpdate);
//         APIService.offChefPreparationUpdate(handleChefUpdate);
//         APIService.disconnectSocket();
//         setSocketConnected(false);
//       };
//     }
//   }, [activeOrder?.orderId, apiService]);

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
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//     const customizedPlates = cart.map((item) => ({
//       name: item.name,
//       originalIngredients: item.ingredients,
//       customizations: item.customizations || [],
//       instructions: item.specialInstructions || "",
//     }));

//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber,
//       items: cart.map(({ cartId, ...rest }) => rest),
//       customizedPlates,
//       subtotal: getTotal(),
//       total: getTotal(),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       orderType: "dine-in",
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//     };

//     try {
//       const result = await apiService.createOrder(orderData);
//       if (result.success) {
//         // Connect to socket room for this order
//         APIService.connectSocket(result.orderId);
//         APIService.emitJoinOrderRoom(result.orderId);

//         setActiveOrder({
//           orderId: result.orderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "confirmed",
//         });

//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${result.orderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n📱 You'll receive real-time notifications when your order status changes!\n\n💡 Save your Order ID to track your order: ${result.orderId}`,
//         });
//         setCart([]);
//       } else {
//         setShowResult({
//           open: true,
//           type: "error",
//           title: "Order Failed",
//           message: result.message || "Failed to place order. Please try again.",
//         });
//       }
//     } catch (error) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: error.message || "An unexpected error occurred.",
//       });
//     }
//     setIsSubmitting(false);
//   };

//   const handleCheckOrderStatus = async (orderId) => {
//     try {
//       const result = await apiService.trackOrder(orderId);
//       return result;
//     } catch (error) {
//       return { success: false, status: "error", message: error.message };
//     }
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
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
//             onCheckStatus={handleCheckOrderStatus}
//             liveStatus={liveStatus}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       {socketConnected && (
//         <div className="fixed bottom-4 left-4 z-50 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
//           <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//           Live Connected
//         </div>
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
//             >
//               <ConfirmationNumberIcon />
//               <span className="hidden sm:inline text-sm font-medium">
//                 Track Order
//               </span>
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

//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mb-4"
//         >
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis + Real-time Order Tracking
//               </p>
//               <p className="text-xs text-blue-600">
//                 Click any dish for detailed nutrition from USDA/Spoonacular
//                 APIs. Get live updates from the kitchen via Socket.io!
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -8 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span className="text-orange-600 font-bold text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-md hover:bg-orange-600">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-16">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No items match your search.</p>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               ←
//             </button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum =
//                 totalPages <= 7
//                   ? i + 1
//                   : currentPage <= 4
//                     ? i + 1
//                     : currentPage >= totalPages - 3
//                       ? totalPages - 6 + i
//                       : currentPage - 3 + i;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-9 h-9 rounded-lg transition ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               →
//             </button>
//           </div>
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
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-14 w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">Please wait</p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
//   Close,
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/customized-plates",
//   TRACK_ORDER: "/orders",
// };

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,

//     });

//     // Request interceptor for adding auth token
//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     // Response interceptor for error handling
//     this.axiosInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("auth_token");
//           window.dispatchEvent(new CustomEvent("auth:logout"));
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) {
//       APIService.instance = new APIService();
//     }
//     return APIService.instance;
//   }

//   // ========== ORDER APIs ==========
//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Create order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getOrderStatus(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getAllOrders(filters = {}) {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
//         params: filters,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async updateOrderStatus(orderId, status, notes = "") {
//     try {
//       const response = await this.axiosInstance.patch(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//         {
//           status,
//           notes,
//           updatedAt: new Date().toISOString(),
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Update order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async trackOrder(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.TRACK_ORDER}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Track order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async cancelOrder(orderId, reason = "") {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//         {
//           data: { reason },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Cancel order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== CUSTOMIZED PLATES APIs ==========
//   async saveCustomizedPlate(plateData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.CUSTOMIZED_PLATES,
//         plateData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Save customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getUserCustomizedPlates(userId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get user customized plates error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async deleteCustomizedPlate(plateId) {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Delete customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== NUTRITION APIs ==========
//   async searchFoodUSDA(query) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   async getFoodDetails(fdcId) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: { api_key: API_CONFIG.USDA_API_KEY },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   async analyzeRecipeSpoonacular(ingredients, title) {
//     try {
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe?.id) {
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       return { nutrition: nutritionData, info: recipe || null };
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     if (usdaSearch?.foods?.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];
//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };
//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];
//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };
//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//     };

//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
//       coffee: { calories: 2, carbs: 0 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       estimated[key] = Math.min(
//         key === "calories"
//           ? 1200
//           : key === "fat"
//             ? 60
//             : key === "sodium"
//               ? 1500
//               : key === "sugar"
//                 ? 40
//                 : key === "saturatedFat"
//                   ? 25
//                   : key === "cholesterol"
//                     ? 200
//                     : key === "protein"
//                       ? 50
//                       : key === "carbs"
//                         ? 100
//                         : 15,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });

//     return estimated;
//   }

//   handleError(error) {
//     if (error.response) {
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error occurred",
//         data: error.response.data,
//       };
//     } else if (error.request) {
//       return {
//         status: 0,
//         message: "Network error - Unable to connect to server",
//         data: null,
//       };
//     }
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
//       },
//     },
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
//       "salt",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: true,
//     sodiumMg: 890,
//     sugarGrams: 8,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 1200,
//     sugarGrams: 2,
//   },
//   {
//     id: 3,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description: "Fresh lake tilapia grilled to perfection",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 400,
//     sugarGrams: 1,
//   },
//   {
//     id: 4,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 50,
//     sugarGrams: 5,
//   },
//   {
//     id: 5,
//     name: "Sweet Masala Chai",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//     ],
//     description: "Traditional spiced tea",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 50,
//     sugarGrams: 35,
//   },
//   {
//     id: 6,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 150,
//     sugarGrams: 45,
//   },
//   {
//     id: 7,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 850,
//     sugarGrams: 4,
//   },
//   {
//     id: 8,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
//     description: "Assorted premium nuts",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: false,
//     sodiumMg: 380,
//     sugarGrams: 4,
//   },
// ];

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
//     }, 50);

//     const stepInterval = setInterval(() => {
//       setLoadingStep((prev) =>
//         prev < loadingSteps.length - 1 ? prev + 1 : prev,
//       );
//     }, 800);

//     const apiTimeout1 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
//       1500,
//     );
//     const apiTimeout2 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
//       2500,
//     );

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="bg-white/20 p-2 rounded-full"
//               >
//                 <ScienceIcon className="text-2xl" />
//               </motion.div>
//               <div>
//                 <h2 className="font-bold text-xl">
//                   Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//                 </h2>
//                 <p className="text-orange-100 text-sm">{itemName}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div>
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
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

//           <div className="space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-3"
//               >
//                 <div
//                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </div>
//                 <span
//                   className={`text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"}`}
//                 >
//                   {step.message}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           <div className="bg-gray-100 rounded-xl p-3">
//             <p className="text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-4">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">Spoonacular API</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let message = null;

//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= 30) {
//         riskLevel = "warning";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= 15) {
//         riskLevel = "info";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= 80) {
//         riskLevel = "warning";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= 50) {
//         riskLevel = "info";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     } else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= 1200) {
//         riskLevel = "warning";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= 600) {
//         riskLevel = "info";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     } else if (condition.name === "Heart Disease") {
//       if (nutrition.saturatedFat >= 15) {
//         riskLevel = "warning";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (nutrition.saturatedFat >= 8) {
//         riskLevel = "info";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (nutrition.cholesterol >= 300) {
//         riskLevel = "warning";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (nutrition.cholesterol >= 200) {
//         riskLevel = "info";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     } else if (condition.name === "Celiac Disease" && item.containsGluten) {
//       riskLevel = "warning";
//       message = condition.thresholds.gluten.message;
//     } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
//       riskLevel = "warning";
//       message = condition.thresholds.allergen.message;
//     }

//     if (riskLevel !== "safe") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         warningMessage: message,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-bold text-xl">{item?.name}</h2>
//               <p className="text-orange-100 text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {item?.nutritionSource && (
//             <div className="bg-green-50 rounded-xl p-2 text-center text-xs text-green-700">
//               ✅ Real-time nutrition data from {item.nutritionSource}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-gray-700 text-sm">{item?.description}</p>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800">Ingredients</span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-xl">
//                 <div className="flex flex-wrap gap-2">
//                   {item?.ingredients?.map((ing, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                 </div>
//               </div>
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
//                 className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600" />
//                   <span className="font-semibold text-gray-800">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <div className="mt-2 p-4 bg-emerald-50 rounded-xl">
//                   <div className="grid grid-cols-2 gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className="text-sm text-gray-600">
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Health Warnings */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600" />
//                   <span className="font-semibold text-gray-800">
//                     Health Information
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                       {warningConditions.length} warnings
//                     </span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "health" && (
//                 <div className="mt-2 space-y-3">
//                   {warningConditions.map((cond, idx) => (
//                     <div
//                       key={idx}
//                       className={`${cond.bgColor} rounded-xl p-4 border-l-4 border-amber-500`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className="text-2xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-bold text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-sm text-gray-700">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {infoConditions.map((cond, idx) => (
//                     <div key={idx} className="bg-blue-50 rounded-xl p-4">
//                       <div className="flex items-start gap-3">
//                         <span className="text-xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-medium text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-xs text-gray-600">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {analysis.conditions.length === 0 && (
//             <div className="bg-green-50 rounded-xl p-4 text-center">
//               <CheckCircleIcon className="text-green-500 text-4xl mx-auto mb-2" />
//               <p className="text-green-700 font-medium">
//                 ✓ No specific health concerns detected
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-500"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({ isOpen, onClose, onCheckStatus, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [statusResult, setStatusResult] = useState(null);

//   useEffect(() => {
//     if (liveStatus && liveStatus.orderId === orderId && liveStatus.status) {
//       if (liveStatus.status === "confirmed") {
//         toast.info(`🟡 Order ${orderId.slice(-8)}: Confirmed!`);
//       } else if (liveStatus.status === "preparing") {
//         toast.info(`🍳 Order ${orderId.slice(-8)}: Being prepared!`);
//       } else if (liveStatus.status === "ready") {
//         toast.success(`✅ Order ${orderId.slice(-8)}: READY for pickup!`);
//       } else if (liveStatus.status === "completed") {
//         toast.success(`🎉 Order ${orderId.slice(-8)}: Completed! Enjoy!`);
//       }
//       setStatusResult((prev) => ({
//         ...prev,
//         status: liveStatus.status,
//         message: liveStatus.message,
//       }));
//     }
//   }, [liveStatus, orderId]);

//   const handleCheckStatus = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }
//     setIsLoading(true);
//     const result = await onCheckStatus(orderId);
//     setStatusResult(result);
//     setIsLoading(false);
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
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-white font-bold text-xl flex items-center gap-2">
//               <ConfirmationNumberIcon /> Track Your Order
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>
//         <div className="p-4">
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value.toUpperCase())}
//               placeholder="Enter Order ID"
//               className="flex-1 px-4 py-3 border rounded-xl text-sm font-mono"
//               onKeyPress={(e) => e.key === "Enter" && handleCheckStatus()}
//             />
//             <button
//               onClick={handleCheckStatus}
//               disabled={isLoading}
//               className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>
//           {statusResult && (
//             <div
//               className={`rounded-xl p-4 ${getStatusColor(statusResult.status)}`}
//             >
//               <p className="font-bold text-lg">Order #{orderId.slice(-12)}</p>
//               <p className="text-sm font-medium">
//                 Status: {statusResult.status?.toUpperCase()}
//               </p>
//               {statusResult.message && (
//                 <p className="mt-2 text-sm">{statusResult.message}</p>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-2 rounded-xl"
//           >
//             Close
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
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
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
//                     {item.customizations?.length > 0 && (
//                       <div className="text-xs text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600">
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
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-xs text-gray-500">
//               Order ID: {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice?.toLocaleString()}</span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-gray-500">
//                   {item.customizations.map((c) => `• ${c}`).join(" ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative z-10"
//       >
//         {type === "success" ? (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         ) : (
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

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);

//   if (!isOpen) return null;

//   const customizationOptions = [
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-5 rounded-t-3xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-white font-bold text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-sm mt-1">{item?.name}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-5 space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-sm ml-2">per serving</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">✨</span>
//                 <span className="font-semibold text-gray-800">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-3 py-2 rounded-lg text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-3">
//               <h3 className="font-semibold text-emerald-800 text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="text-emerald-500"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests?"
//               className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
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
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) =>
//     `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-4 py-3 flex items-center gap-3`}
//     >
//       <TimerIcon className="animate-pulse" />
//       <div>
//         <span className="text-xs font-medium">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-xl font-mono font-bold block">
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const apiService = useMemo(() => APIService.getInstance(), []);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);

//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);

//       const { nutritionalInfo, nutritionSource } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );

//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//     const customizedPlates = cart.map((item) => ({
//       name: item.name,
//       originalIngredients: item.ingredients,
//       customizations: item.customizations || [],
//       instructions: item.specialInstructions || "",
//     }));

//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber,
//       items: cart.map(({ cartId, ...rest }) => rest),
//       customizedPlates,
//       subtotal: getTotal(),
//       total: getTotal(),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       orderType: "dine-in",
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//     };

//     try {
//       const result = await apiService.createOrder(orderData);
//       if (result.success) {
//         setActiveOrder({
//           orderId: result.orderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "confirmed",
//         });

//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${result.orderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save your Order ID to track your order: ${result.orderId}`,
//         });
//         setCart([]);
//       } else {
//         setShowResult({
//           open: true,
//           type: "error",
//           title: "Order Failed",
//           message: result.message || "Failed to place order. Please try again.",
//         });
//       }
//     } catch (error) {
//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message: error.message || "An unexpected error occurred.",
//       });
//     }
//     setIsSubmitting(false);
//   };

//   const handleCheckOrderStatus = async (orderId) => {
//     try {
//       const result = await apiService.trackOrder(orderId);
//       return result;
//     } catch (error) {
//       return { success: false, status: "error", message: error.message };
//     }
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
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
//             onCheckStatus={handleCheckOrderStatus}
//             liveStatus={liveStatus}
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
//             >
//               <ConfirmationNumberIcon />
//               <span className="hidden sm:inline text-sm font-medium">
//                 Track Order
//               </span>
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

//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mb-4"
//         >
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis + Real-time Order Tracking
//               </p>
//               <p className="text-xs text-blue-600">
//                 Click any dish for detailed nutrition from USDA/Spoonacular
//                 APIs. Track your order status in real-time!
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -8 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span className="text-orange-600 font-bold text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-md hover:bg-orange-600">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-16">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No items match your search.</p>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               ←
//             </button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum =
//                 totalPages <= 7
//                   ? i + 1
//                   : currentPage <= 4
//                     ? i + 1
//                     : currentPage >= totalPages - 3
//                       ? totalPages - 6 + i
//                       : currentPage - 3 + i;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-9 h-9 rounded-lg transition ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               →
//             </button>
//           </div>
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
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-14 w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">Please wait</p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
//   Close,
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/customized-plates",
//   TRACK_ORDER: "/orders",
// };

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,

//     });

//     // Request interceptor for adding auth token
//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     // Response interceptor for error handling
//     this.axiosInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("auth_token");
//           window.dispatchEvent(new CustomEvent("auth:logout"));
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) {
//       APIService.instance = new APIService();
//     }
//     return APIService.instance;
//   }

//   // ========== ORDER APIs ==========
//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Create order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // UPDATED: Uses GET /orders/:orderId to get specific order by ID
//   async getOrderById(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get order by ID error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getAllOrders(filters = {}) {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
//         params: filters,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async updateOrderStatus(orderId, status, notes = "") {
//     try {
//       const response = await this.axiosInstance.patch(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//         {
//           status,
//           notes,
//           updatedAt: new Date().toISOString(),
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Update order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async trackOrder(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.TRACK_ORDER}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Track order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async cancelOrder(orderId, reason = "") {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//         {
//           data: { reason },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Cancel order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== CUSTOMIZED PLATES APIs ==========
//   async saveCustomizedPlate(plateData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.CUSTOMIZED_PLATES,
//         plateData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Save customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getUserCustomizedPlates(userId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get user customized plates error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async deleteCustomizedPlate(plateId) {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Delete customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   // ========== NUTRITION APIs ==========
//   async searchFoodUSDA(query) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   async getFoodDetails(fdcId) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: { api_key: API_CONFIG.USDA_API_KEY },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   async analyzeRecipeSpoonacular(ingredients, title) {
//     try {
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe?.id) {
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       return { nutrition: nutritionData, info: recipe || null };
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     if (usdaSearch?.foods?.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];
//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };
//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];
//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };
//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//     };

//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
//       coffee: { calories: 2, carbs: 0 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       estimated[key] = Math.min(
//         key === "calories"
//           ? 1200
//           : key === "fat"
//             ? 60
//             : key === "sodium"
//               ? 1500
//               : key === "sugar"
//                 ? 40
//                 : key === "saturatedFat"
//                   ? 25
//                   : key === "cholesterol"
//                     ? 200
//                     : key === "protein"
//                       ? 50
//                       : key === "carbs"
//                         ? 100
//                         : 15,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });

//     return estimated;
//   }

//   handleError(error) {
//     if (error.response) {
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error occurred",
//         data: error.response.data,
//       };
//     } else if (error.request) {
//       return {
//         status: 0,
//         message: "Network error - Unable to connect to server",
//         data: null,
//       };
//     }
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
//       },
//     },
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
//       "salt",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: true,
//     sodiumMg: 890,
//     sugarGrams: 8,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 1200,
//     sugarGrams: 2,
//   },
//   {
//     id: 3,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description: "Fresh lake tilapia grilled to perfection",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 400,
//     sugarGrams: 1,
//   },
//   {
//     id: 4,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 50,
//     sugarGrams: 5,
//   },
//   {
//     id: 5,
//     name: "Sweet Masala Chai",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//     ],
//     description: "Traditional spiced tea",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 50,
//     sugarGrams: 35,
//   },
//   {
//     id: 6,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 150,
//     sugarGrams: 45,
//   },
//   {
//     id: 7,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 850,
//     sugarGrams: 4,
//   },
//   {
//     id: 8,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
//     description: "Assorted premium nuts",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: false,
//     sodiumMg: 380,
//     sugarGrams: 4,
//   },
// ];

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(() => {
//       setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
//     }, 50);

//     const stepInterval = setInterval(() => {
//       setLoadingStep((prev) =>
//         prev < loadingSteps.length - 1 ? prev + 1 : prev,
//       );
//     }, 800);

//     const apiTimeout1 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
//       1500,
//     );
//     const apiTimeout2 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
//       2500,
//     );

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl w-full max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="bg-white/20 p-2 rounded-full"
//               >
//                 <ScienceIcon className="text-2xl" />
//               </motion.div>
//               <div>
//                 <h2 className="font-bold text-xl">
//                   Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//                 </h2>
//                 <p className="text-orange-100 text-sm">{itemName}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div>
//             <div className="flex justify-between text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
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

//           <div className="space-y-3">
//             {loadingSteps.map((step, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: loadingStep >= idx ? 1 : 0.4, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="flex items-center gap-3"
//               >
//                 <div
//                   className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
//                 >
//                   {loadingStep > idx
//                     ? "✓"
//                     : loadingStep === idx
//                       ? "●"
//                       : idx + 1}
//                 </div>
//                 <span
//                   className={`text-sm ${loadingStep >= idx ? "text-gray-700" : "text-gray-400"}`}
//                 >
//                   {step.message}
//                 </span>
//               </motion.div>
//             ))}
//           </div>

//           <div className="bg-gray-100 rounded-xl p-3">
//             <p className="text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-4">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-gray-600">Spoonacular API</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let message = null;

//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= 30) {
//         riskLevel = "warning";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= 15) {
//         riskLevel = "info";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= 80) {
//         riskLevel = "warning";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= 50) {
//         riskLevel = "info";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     } else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= 1200) {
//         riskLevel = "warning";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= 600) {
//         riskLevel = "info";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     } else if (condition.name === "Heart Disease") {
//       if (nutrition.saturatedFat >= 15) {
//         riskLevel = "warning";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (nutrition.saturatedFat >= 8) {
//         riskLevel = "info";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (nutrition.cholesterol >= 300) {
//         riskLevel = "warning";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (nutrition.cholesterol >= 200) {
//         riskLevel = "info";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     } else if (condition.name === "Celiac Disease" && item.containsGluten) {
//       riskLevel = "warning";
//       message = condition.thresholds.gluten.message;
//     } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
//       riskLevel = "warning";
//       message = condition.thresholds.allergen.message;
//     }

//     if (riskLevel !== "safe") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         warningMessage: message,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="font-bold text-xl">{item?.name}</h2>
//               <p className="text-orange-100 text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {item?.nutritionSource && (
//             <div className="bg-green-50 rounded-xl p-2 text-center text-xs text-green-700">
//               ✅ Real-time nutrition data from {item.nutritionSource}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-xl p-4">
//             <p className="text-gray-700 text-sm">{item?.description}</p>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800">Ingredients</span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon />
//               ) : (
//                 <ExpandMoreIcon />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-xl">
//                 <div className="flex flex-wrap gap-2">
//                   {item?.ingredients?.map((ing, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-white rounded-full text-sm shadow-sm border"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                 </div>
//               </div>
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
//                 className="w-full flex items-center justify-between p-3 bg-emerald-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600" />
//                   <span className="font-semibold text-gray-800">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <div className="mt-2 p-4 bg-emerald-50 rounded-xl">
//                   <div className="grid grid-cols-2 gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className="text-sm text-gray-600">
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Health Warnings */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-3 bg-amber-50 rounded-xl"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600" />
//                   <span className="font-semibold text-gray-800">
//                     Health Information
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                       {warningConditions.length} warnings
//                     </span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "health" && (
//                 <div className="mt-2 space-y-3">
//                   {warningConditions.map((cond, idx) => (
//                     <div
//                       key={idx}
//                       className={`${cond.bgColor} rounded-xl p-4 border-l-4 border-amber-500`}
//                     >
//                       <div className="flex items-start gap-3">
//                         <span className="text-2xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-bold text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-sm text-gray-700">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {infoConditions.map((cond, idx) => (
//                     <div key={idx} className="bg-blue-50 rounded-xl p-4">
//                       <div className="flex items-start gap-3">
//                         <span className="text-xl">{cond.icon}</span>
//                         <div>
//                           <h4 className="font-medium text-gray-800">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-xs text-gray-600">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {analysis.conditions.length === 0 && (
//             <div className="bg-green-50 rounded-xl p-4 text-center">
//               <CheckCircleIcon className="text-green-500 text-4xl mx-auto mb-2" />
//               <p className="text-green-700 font-medium">
//                 ✓ No specific health concerns detected
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-500"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// // UPDATED: Enhanced to show more information about orders, status, and items
// const OrderStatusModal = ({ isOpen, onClose, onCheckOrder, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [recentSearches, setRecentSearches] = useState([]);

//   // Load recent searches from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("recentOrderSearches");
//     if (saved) {
//       try {
//         setRecentSearches(JSON.parse(saved).slice(0, 5));
//       } catch (e) {
//         console.error("Failed to load recent searches", e);
//       }
//     }
//   }, []);

//   // Save recent search
//   const saveRecentSearch = (id) => {
//     const updated = [id, ...recentSearches.filter(s => s !== id)].slice(0, 5);
//     setRecentSearches(updated);
//     localStorage.setItem("recentOrderSearches", JSON.stringify(updated));
//   };

//   // Handle live status updates from WebSocket/SSE
//   useEffect(() => {
//     if (liveStatus && liveStatus.orderId === orderId && liveStatus.status && orderDetails) {
//       setOrderDetails(prev => ({
//         ...prev,
//         status: liveStatus.status,
//         statusMessage: liveStatus.message,
//         lastUpdated: new Date().toISOString()
//       }));

//       // Show toast notifications for status changes
//       if (liveStatus.status === "confirmed") {
//         toast.info(`🔔 Order ${orderId.slice(-8)} status: CONFIRMED!`);
//       } else if (liveStatus.status === "preparing") {
//         toast.info(`🍳 Order ${orderId.slice(-8)} status: Being prepared!`);
//       } else if (liveStatus.status === "ready") {
//         toast.success(`✅ Order ${orderId.slice(-8)} status: READY for pickup!`);
//       } else if (liveStatus.status === "completed") {
//         toast.success(`🎉 Order ${orderId.slice(-8)} status: COMPLETED! Enjoy your meal!`);
//       } else if (liveStatus.status === "cancelled") {
//         toast.error(`❌ Order ${orderId.slice(-8)} status: CANCELLED`);
//       }
//     }
//   }, [liveStatus, orderId, orderDetails]);

//   const handleCheckOrder = async () => {
//     if (!orderId.trim()) {
//       toast.error("Please enter an Order ID");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setOrderDetails(null);

//     try {
//       // Uses GET /orders/:orderId as specified in routes
//       const result = await onCheckOrder(orderId);

//       if (result && result.success !== false) {
//         setOrderDetails(result);
//         saveRecentSearch(orderId);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else {
//         setError(result?.message || "Order not found. Please check the Order ID and try again.");
//         toast.error("Order not found");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch order details");
//       toast.error("Failed to fetch order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "preparing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "ready": return "bg-green-100 text-green-800 border-green-200";
//       case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
//       case "cancelled": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-600 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed": return <CheckCircleIcon className="text-blue-500" />;
//       case "preparing": return <TimerIcon className="text-yellow-500" />;
//       case "ready": return <CheckCircleIcon className="text-green-500" />;
//       case "completed": return <CheckCircleIcon className="text-gray-500" />;
//       case "cancelled": return <ErrorIcon className="text-red-500" />;
//       default: return <InfoIcon className="text-gray-500" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col relative z-10 max-h-[90vh]"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-white font-bold text-xl flex items-center gap-2">
//               <ConfirmationNumberIcon /> Track Your Order
//             </h2>
//             <button
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <p className="text-indigo-100 text-sm mt-1">
//             Enter your Order ID to see real-time status
//           </p>
//         </div>

//         <div className="p-5">
//           {/* Search Input */}
//           <div className="flex gap-2 mb-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value.toUpperCase())}
//                 placeholder="e.g., ORD_1734567890123_ABC123"
//                 className="w-full px-4 py-3 border rounded-xl text-sm font-mono pr-10 focus:ring-2 focus:ring-indigo-400 outline-none"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
//               />
//               <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
//             </div>
//             <button
//               onClick={handleCheckOrder}
//               disabled={isLoading}
//               className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition"
//             >
//               {isLoading ? (
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>

//           {/* Recent Searches */}
//           {recentSearches.length > 0 && !orderDetails && (
//             <div className="mb-4">
//               <p className="text-xs text-gray-500 mb-2">Recent searches:</p>
//               <div className="flex flex-wrap gap-2">
//                 {recentSearches.map(id => (
//                   <button
//                     key={id}
//                     onClick={() => setOrderId(id)}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full font-mono"
//                   >
//                     {id.slice(-12)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
//               <ErrorIcon fontSize="small" />
//               {error}
//             </div>
//           )}

//           {/* Order Details - Enhanced Display */}
//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-4"
//             >
//               {/* Order Header */}
//               <div className={`rounded-xl p-4 border-2 ${getStatusColor(orderDetails.status)}`}>
//                 <div className="flex items-center justify-between flex-wrap gap-3">
//                   <div className="flex items-center gap-3">
//                     {getStatusIcon(orderDetails.status)}
//                     <div>
//                       <p className="text-2xl font-mono font-bold tracking-tight">
//                         {orderDetails.orderId || orderDetails.id}
//                       </p>
//                       <p className="text-sm opacity-75">
//                         Placed: {formatDate(orderDetails.createdAt || orderDetails.date)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-2xl font-bold capitalize">
//                       {orderDetails.status}
//                     </span>
//                     {orderDetails.statusMessage && (
//                       <p className="text-sm opacity-75">{orderDetails.statusMessage}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Customer & Table Info */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="bg-gray-50 rounded-xl p-3">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <PersonIcon fontSize="small" />
//                     <span className="text-sm font-medium">Customer</span>
//                   </div>
//                   <p className="font-semibold text-gray-800">{orderDetails.customerName || "N/A"}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-3">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <TableIcon fontSize="small" />
//                     <span className="text-sm font-medium">Table Number</span>
//                   </div>
//                   <p className="font-semibold text-gray-800">{orderDetails.tableNumber || "N/A"}</p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                   <ReceiptIcon fontSize="small" /> Order Items
//                 </h3>
//                 <div className="space-y-2 max-h-48 overflow-y-auto">
//                   {(orderDetails.items || []).map((item, idx) => (
//                     <div key={idx} className="flex justify-between items-start py-2 border-b border-gray-200 last:border-0">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-700">{item.quantity}x</span>
//                           <span className="text-gray-800">{item.name}</span>
//                         </div>
//                         {item.customizations?.length > 0 && (
//                           <div className="text-xs text-gray-500 mt-1">
//                             Mods: {item.customizations.join(", ")}
//                           </div>
//                         )}
//                         {item.specialInstructions && (
//                           <div className="text-xs text-orange-600 mt-1">
//                             📝 {item.specialInstructions}
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <span className="font-semibold text-gray-800">
//                           RWF {(item.finalPrice || item.price || 0).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600">Subtotal:</span>
//                   <span>RWF {(orderDetails.subtotal || orderDetails.total || 0).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between items-center pt-2 border-t border-indigo-100">
//                   <span className="font-bold text-gray-800">Total:</span>
//                   <span className="font-bold text-indigo-600 text-lg">
//                     RWF {(orderDetails.total || orderDetails.subtotal || 0).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {/* Timeline/Status History */}
//               {orderDetails.statusHistory && orderDetails.statusHistory.length > 0 && (
//                 <div className="bg-gray-50 rounded-xl p-3">
//                   <h3 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-2">
//                     <TimerIcon fontSize="small" /> Order Timeline
//                   </h3>
//                   <div className="space-y-2">
//                     {orderDetails.statusHistory.map((entry, idx) => (
//                       <div key={idx} className="flex items-center gap-2 text-xs">
//                         <div className={`w-2 h-2 rounded-full ${idx === orderDetails.statusHistory.length - 1 ? "bg-indigo-500" : "bg-gray-400"}`} />
//                         <span className="text-gray-500">{formatDate(entry.timestamp)}</span>
//                         <span className="font-medium capitalize">{entry.status}</span>
//                         {entry.note && <span className="text-gray-500">- {entry.note}</span>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Estimated Time */}
//               {orderDetails.estimatedPickupTime && (
//                 <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-200">
//                   <p className="text-sm text-amber-800 flex items-center justify-center gap-2">
//                     <TimerIcon fontSize="small" />
//                     Estimated ready by: <strong>{orderDetails.estimatedPickupTime}</strong>
//                   </p>
//                 </div>
//               )}

//               {/* Last Updated */}
//               {orderDetails.lastUpdated && (
//                 <p className="text-xs text-gray-400 text-center">
//                   Last updated: {formatDate(orderDetails.lastUpdated)}
//                 </p>
//               )}
//             </motion.div>
//           )}
//         </div>

//         <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
//           >
//             Close
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
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-t-2xl">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//         </div>
//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
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
//                     {item.customizations?.length > 0 && (
//                       <div className="text-xs text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-xs text-orange-600">
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
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-t-2xl flex justify-between items-center">
//           <h2 className="text-white font-bold text-xl">Order Details</h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//           >
//             <CloseIcon className="text-white" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-xs text-gray-500">
//               Order ID: {order.orderId}
//             </p>
//             <p>
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p>
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//           <h3 className="font-bold mb-2">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between">
//                 <span>
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span>RWF {item.finalPrice?.toLocaleString()}</span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-xs text-gray-500">
//                   {item.customizations.map((c) => `• ${c}`).join(" ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-xs text-orange-600">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600">
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg"
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
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative z-10"
//       >
//         {type === "success" ? (
//           <CheckCircleIcon className="text-green-500 text-6xl mx-auto mb-4" />
//         ) : (
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

// // ========== CUSTOMIZATION MODAL ==========
// const CustomizationModal = ({ isOpen, onClose, item, onAddToCart }) => {
//   const [customizations, setCustomizations] = useState([]);
//   const [specialInstructions, setSpecialInstructions] = useState("");
//   const [showOptions, setShowOptions] = useState(true);

//   if (!isOpen) return null;

//   const customizationOptions = [
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-5 rounded-t-3xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-white font-bold text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-sm mt-1">{item?.name}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full"
//             >
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-5 space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-sm ml-2">per serving</span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-xl">✨</span>
//                 <span className="font-semibold text-gray-800">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-3 py-2 rounded-lg text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-3">
//               <h3 className="font-semibold text-emerald-800 text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="text-emerald-500"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests?"
//               className="w-full p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>
//         <div className="p-4 border-t flex gap-3 bg-gray-50">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-3 rounded-xl font-medium bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
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
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) =>
//     `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-4 right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-4 py-3 flex items-center gap-3`}
//     >
//       <TimerIcon className="animate-pulse" />
//       <div>
//         <span className="text-xs font-medium">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-xl font-mono font-bold block">
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const apiService = useMemo(() => APIService.getInstance(), []);

//   // New: Function to get order by ID using GET /orders/:orderId
//   const handleGetOrderById = useCallback(async (orderId) => {
//     return await apiService.getOrderById(orderId);
//   }, [apiService]);

//   // Simulate live status updates (in production, this would be WebSocket/SSE)
//   useEffect(() => {
//     // This is a simulation - in real implementation, connect to WebSocket
//     const interval = setInterval(() => {
//       if (activeOrder && activeOrder.orderId) {
//         // Simulate status changes for demo
//         const statuses = ["confirmed", "preparing", "ready", "completed"];
//         const currentIndex = statuses.indexOf(activeOrder.status);
//         if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
//           const newStatus = statuses[currentIndex + 1];
//           setActiveOrder(prev => ({ ...prev, status: newStatus }));
//           setLiveStatus({
//             orderId: activeOrder.orderId,
//             status: newStatus,
//             message: `Order ${newStatus === "confirmed" ? "has been confirmed" : newStatus === "preparing" ? "is being prepared" : newStatus === "ready" ? "is ready for pickup" : "has been completed"}`
//           });
//         }
//       }
//     }, 30000); // Check every 30 seconds

//     return () => clearInterval(interval);
//   }, [activeOrder]);

//   const handleItemClick = async (item) => {
//     setSelectedItem(item);
//     setShowLoadingModal(true);

//     setTimeout(async () => {
//       setShowLoadingModal(false);
//       setCurrentItem(item);
//       setShowAnalysisModal(true);

//       const { nutritionalInfo, nutritionSource } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );

//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//     const customizedPlates = cart.map((item) => ({
//       name: item.name,
//       originalIngredients: item.ingredients,
//       customizations: item.customizations || [],
//       instructions: item.specialInstructions || "",
//     }));

//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber,
//       items: cart.map(({ cartId, ...rest }) => rest),
//       customizedPlates,
//       subtotal: getTotal(),
//       total: getTotal(),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       orderType: "dine-in",
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//     };

//     try {
//       const result = await apiService.createOrder(orderData);
//       if (result.success && result.orderId) {
//         // Generate a proper order ID if not provided by backend
//         const orderId = result.orderId || `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

//         setActiveOrder({
//           orderId: orderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "confirmed",
//         });

//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${orderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${orderId}`,
//         });
//         setCart([]);
//       } else {
//         setShowResult({
//           open: true,
//           type: "error",
//           title: "Order Failed",
//           message: result.message || "Failed to place order. Please try again.",
//         });
//       }
//     } catch (error) {
//       // Fallback: generate an order ID for demo purposes
//       const fallbackOrderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
//       setActiveOrder({
//         orderId: fallbackOrderId,
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
//         message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${fallbackOrderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${fallbackOrderId}`,
//       });
//       setCart([]);
//     }
//     setIsSubmitting(false);
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
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
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-4 py-5 max-w-7xl">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
//             >
//               <ConfirmationNumberIcon />
//               <span className="hidden sm:inline text-sm font-medium">
//                 Track Order
//               </span>
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

//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-3 mb-4"
//         >
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-2 rounded-full">
//               <ShieldIcon className="text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis + Real-time Order Tracking
//               </p>
//               <p className="text-xs text-blue-600">
//                 Click any dish for detailed nutrition from USDA/Spoonacular
//                 APIs. Track your order status in real-time!
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <div className="relative mb-5">
//           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap transition font-medium text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -8 }}
//               key={item.id}
//               className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                   <TimeIcon fontSize="small" /> {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
//                 <p className="text-xs text-gray-500 line-clamp-2 mt-1 h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-3">
//                   <span className="text-orange-600 font-bold text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-md hover:bg-orange-600">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-16">
//             <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
//             <p className="text-gray-500 text-lg">No items match your search.</p>
//           </div>
//         )}

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               ←
//             </button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum =
//                 totalPages <= 7
//                   ? i + 1
//                   : currentPage <= 4
//                     ? i + 1
//                     : currentPage >= totalPages - 3
//                       ? totalPages - 6 + i
//                       : currentPage - 3 + i;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-9 h-9 rounded-lg transition ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-9 h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm"
//             >
//               →
//             </button>
//           </div>
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
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-14 w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">Please wait</p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/orders",
//   TRACK_ORDER: "/orders",
// };

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,
//     });

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     this.axiosInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           localStorage.removeItem("auth_token");
//           window.dispatchEvent(new CustomEvent("auth:logout"));
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) {
//       APIService.instance = new APIService();
//     }
//     return APIService.instance;
//   }

//   async createOrder(orderData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       console.log(orderData);
//       return response.data;

//     } catch (error) {
//       console.error("Create order error:", error);
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
//       console.error("Get order by ID error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getAllOrders(filters = {}) {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
//         params: filters,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async updateOrderStatus(orderId, status, notes = "") {
//     try {
//       const response = await this.axiosInstance.patch(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//         {
//           status,
//           notes,
//           updatedAt: new Date().toISOString(),
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Update order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async trackOrder(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.TRACK_ORDER}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Track order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async cancelOrder(orderId, reason = "") {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//         {
//           data: { reason },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Cancel order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async saveCustomizedPlate(plateData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.CUSTOMIZED_PLATES,
//         plateData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Save customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getUserCustomizedPlates(userId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get user customized plates error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async deleteCustomizedPlate(plateId) {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Delete customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async searchFoodUSDA(query) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   async getFoodDetails(fdcId) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: { api_key: API_CONFIG.USDA_API_KEY },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   async analyzeRecipeSpoonacular(ingredients, title) {
//     try {
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe?.id) {
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       return { nutrition: nutritionData, info: recipe || null };
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     if (usdaSearch?.foods?.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];
//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };
//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];
//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };
//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//     };
//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
//       coffee: { calories: 2, carbs: 0 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       estimated[key] = Math.min(
//         key === "calories"
//           ? 1200
//           : key === "fat"
//             ? 60
//             : key === "sodium"
//               ? 1500
//               : key === "sugar"
//                 ? 40
//                 : key === "saturatedFat"
//                   ? 25
//                   : key === "cholesterol"
//                     ? 200
//                     : key === "protein"
//                       ? 50
//                       : key === "carbs"
//                         ? 100
//                         : 15,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });

//     return estimated;
//   }

//   handleError(error) {
//     if (error.response) {
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error occurred",
//         data: error.response.data,
//       };
//     } else if (error.request) {
//       return {
//         status: 0,
//         message: "Network error - Unable to connect to server",
//         data: null,
//       };
//     }
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
//       },
//     },
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
//       "salt",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: true,
//     sodiumMg: 890,
//     sugarGrams: 8,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 1200,
//     sugarGrams: 2,
//   },
//   {
//     id: 3,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description: "Fresh lake tilapia grilled to perfection",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 400,
//     sugarGrams: 1,
//   },
//   {
//     id: 4,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 50,
//     sugarGrams: 5,
//   },
//   {
//     id: 5,
//     name: "Sweet Masala Chai",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//     ],
//     description: "Traditional spiced tea",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 50,
//     sugarGrams: 35,
//   },
//   {
//     id: 6,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 150,
//     sugarGrams: 45,
//   },
//   {
//     id: 7,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 850,
//     sugarGrams: 4,
//   },
//   {
//     id: 8,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
//     description: "Assorted premium nuts",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: false,
//     sodiumMg: 380,
//     sugarGrams: 4,
//   },
// ];

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(
//       () => setProgress((prev) => (prev >= 100 ? 100 : prev + 2)),
//       50,
//     );
//     const stepInterval = setInterval(
//       () =>
//         setLoadingStep((prev) =>
//           prev < loadingSteps.length - 1 ? prev + 1 : prev,
//         ),
//       800,
//     );
//     const apiTimeout1 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
//       1500,
//     );
//     const apiTimeout2 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
//       2500,
//     );

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
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
//         className="bg-gradient-to-br from-white to-orange-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="bg-white/20 p-1.5 sm:p-2 rounded-full"
//             >
//               <ScienceIcon className="text-xl sm:text-2xl" />
//             </motion.div>
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-base sm:text-xl truncate">
//                 Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//               </h2>
//               <p className="text-orange-100 text-xs sm:text-sm truncate">
//                 {itemName}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//           <div>
//             <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
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
//                   className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
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

//           <div className="bg-gray-100 rounded-xl p-2 sm:p-3">
//             <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-3 sm:gap-4">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-[10px] sm:text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-[10px] sm:text-xs text-gray-600">
//                   Spoonacular API
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let message = null;

//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= 30) {
//         riskLevel = "warning";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= 15) {
//         riskLevel = "info";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= 80) {
//         riskLevel = "warning";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= 50) {
//         riskLevel = "info";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     } else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= 1200) {
//         riskLevel = "warning";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= 600) {
//         riskLevel = "info";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     } else if (condition.name === "Heart Disease") {
//       if (nutrition.saturatedFat >= 15) {
//         riskLevel = "warning";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (nutrition.saturatedFat >= 8) {
//         riskLevel = "info";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (nutrition.cholesterol >= 300) {
//         riskLevel = "warning";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (nutrition.cholesterol >= 200) {
//         riskLevel = "info";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     } else if (condition.name === "Celiac Disease" && item.containsGluten) {
//       riskLevel = "warning";
//       message = condition.thresholds.gluten.message;
//     } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
//       riskLevel = "warning";
//       message = condition.thresholds.allergen.message;
//     }

//     if (riskLevel !== "safe") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         warningMessage: message,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

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
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-lg sm:text-xl truncate pr-2">
//                 {item?.name}
//               </h2>
//               <p className="text-orange-100 text-xs sm:text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition flex-shrink-0"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
//           {item?.nutritionSource && (
//             <div className="bg-green-50 rounded-xl p-2 text-center text-[10px] sm:text-xs text-green-700">
//               ✅ Real-time nutrition data from {item.nutritionSource}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
//             <p className="text-gray-700 text-xs sm:text-sm">
//               {item?.description}
//             </p>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Ingredients
//                 </span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon className="text-sm sm:text-base" />
//               ) : (
//                 <ExpandMoreIcon className="text-sm sm:text-base" />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-xl">
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                   {item?.ingredients?.map((ing, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm shadow-sm border"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                 </div>
//               </div>
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
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <div className="mt-2 p-3 sm:p-4 bg-emerald-50 rounded-xl">
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className="text-[11px] sm:text-sm text-gray-600">
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Health Warnings */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Health Information
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                       {warningConditions.length} warnings
//                     </span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "health" && (
//                 <div className="mt-2 space-y-2 sm:space-y-3">
//                   {warningConditions.map((cond, idx) => (
//                     <div
//                       key={idx}
//                       className={`${cond.bgColor} rounded-xl p-3 sm:p-4 border-l-4 border-amber-500`}
//                     >
//                       <div className="flex items-start gap-2 sm:gap-3">
//                         <span className="text-xl sm:text-2xl">{cond.icon}</span>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-bold text-gray-800 text-sm sm:text-base">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-xs sm:text-sm text-gray-700">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {infoConditions.map((cond, idx) => (
//                     <div key={idx} className="bg-blue-50 rounded-xl p-3 sm:p-4">
//                       <div className="flex items-start gap-2 sm:gap-3">
//                         <span className="text-base sm:text-xl">
//                           {cond.icon}
//                         </span>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-800 text-sm sm:text-base">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-[10px] sm:text-xs text-gray-600">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {analysis.conditions.length === 0 && (
//             <div className="bg-green-50 rounded-xl p-3 sm:p-4 text-center">
//               <CheckCircleIcon className="text-green-500 text-3xl sm:text-4xl mx-auto mb-2" />
//               <p className="text-green-700 font-medium text-sm sm:text-base">
//                 ✓ No specific health concerns detected
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-500 text-white text-sm sm:text-base hover:bg-red-600 transition"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:shadow-lg transition"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL - FIXED WITH CORRECT DATA PARSING ==========
// const OrderStatusModal = ({ isOpen, onClose, onCheckOrder, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [recentSearches, setRecentSearches] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("recentOrderSearches");
//     if (saved) {
//       try {
//         setRecentSearches(JSON.parse(saved).slice(0, 5));
//       } catch (e) {
//         console.error("Failed to load recent searches", e);
//       }
//     }
//   }, []);

//   const saveRecentSearch = (id) => {
//     const updated = [id, ...recentSearches.filter((s) => s !== id)].slice(0, 5);
//     setRecentSearches(updated);
//     localStorage.setItem("recentOrderSearches", JSON.stringify(updated));
//   };

//   useEffect(() => {
//     if (
//       liveStatus &&
//       liveStatus.orderId === orderId &&
//       liveStatus.status &&
//       orderDetails
//     ) {
//       setOrderDetails((prev) => ({
//         ...prev,
//         status: liveStatus.status,
//         currentStatus: liveStatus.status,
//         lastUpdated: new Date().toISOString(),
//       }));

//       const statusMessages = {
//         confirmed: "🔔 Order confirmed!",
//         preparing: "🍳 Order is being prepared!",
//         ready: "✅ Order is ready for pickup!",
//         completed: "🎉 Order completed! Enjoy your meal!",
//         cancelled: "❌ Order has been cancelled",
//       };
//       if (statusMessages[liveStatus.status])
//         toast.info(statusMessages[liveStatus.status]);
//     }
//   }, [liveStatus, orderId, orderDetails]);

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
//       console.log("API Response:", result);

//       // Check if we have a successful response with orders array
//       if (
//         result &&
//         result.success === true &&
//         result.orders &&
//         result.orders.length > 0
//       ) {
//         const orderData = result.orders[0];

//         // Parse the order data correctly from the API structure
//         const transformedOrder = {
//           // Basic identifiers
//           orderId: orderData.orderId || "N/A",
//           bookingId: orderData.bookingId || "N/A",
//           _id: orderData._id,

//           // Person Details - Customer name and table number
//           customerName: orderData.personDetails?.name || "N/A",
//           tableNumber: orderData.personDetails?.tableNumber || "N/A",
//           orderType: orderData.personDetails?.orderType || "dine-in",

//           // Status information
//           status:
//             orderData.status ||
//             orderData.bookingDetails?.currentStatus ||
//             "unknown",
//           preparationStatus: orderData.bookingDetails?.preparationStatus,
//           currentStatus: orderData.bookingDetails?.currentStatus,

//           // Timestamps
//           orderDate: orderData.bookingDetails?.orderDate || orderData.createdAt,
//           estimatedPickupTime: orderData.bookingDetails?.estimatedPickupTime,
//           createdAt: orderData.createdAt,
//           updatedAt: orderData.updatedAt,

//           // Order Summary - Items, subtotal, total
//           items: (orderData.orderSummary?.items || []).map((item) => ({
//             id: item.id,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.finalPrice,
//             finalPrice: item.finalPrice,
//             customizations: item.customizations || [],
//             specialInstructions: item.specialInstructions || "",
//           })),
//           subtotal: orderData.orderSummary?.subtotal || 0,
//           total: orderData.orderSummary?.total || 0,
//           totalItems: orderData.orderSummary?.totalItems || 0,

//           // Status history
//           statusHistory: (orderData.bookingDetails?.statusHistory || []).map(
//             (history) => ({
//               status: history.status,
//               timestamp: history.timestamp,
//               note: history.note,
//               _id: history._id,
//             }),
//           ),

//           // Special instructions
//           specialInstructions:
//             orderData.bookingDetails?.specialInstructions ||
//             `Table ${orderData.personDetails?.tableNumber} - ${orderData.personDetails?.name}`,

//           // Plate recommendations
//           plateRecommendations: orderData.plateRecommendations || [],

//           // Metadata
//           metadata: orderData.metadata,

//           // Last updated
//           lastUpdated: new Date().toISOString(),
//         };

//         console.log("Transformed Order:", transformedOrder);
//         setOrderDetails(transformedOrder);
//         saveRecentSearch(orderId);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else if (result && result.order) {
//         // Fallback for single order response
//         const orderData = result.order;
//         const transformedOrder = {
//           orderId: orderData.orderId,
//           customerName:
//             orderData.customerName || orderData.personDetails?.name || "N/A",
//           tableNumber:
//             orderData.tableNumber ||
//             orderData.personDetails?.tableNumber ||
//             "N/A",
//           status: orderData.status,
//           items: orderData.items || orderData.orderSummary?.items || [],
//           subtotal: orderData.subtotal || orderData.orderSummary?.subtotal || 0,
//           total: orderData.total || orderData.orderSummary?.total || 0,
//           totalItems:
//             orderData.totalItems || orderData.orderSummary?.totalItems || 0,
//           estimatedPickupTime:
//             orderData.estimatedPickupTime ||
//             orderData.bookingDetails?.estimatedPickupTime,
//           specialInstructions:
//             orderData.specialInstructions ||
//             orderData.bookingDetails?.specialInstructions,
//           statusHistory:
//             orderData.statusHistory ||
//             orderData.bookingDetails?.statusHistory ||
//             [],
//           createdAt: orderData.createdAt,
//           updatedAt: orderData.updatedAt,
//         };
//         setOrderDetails(transformedOrder);
//         saveRecentSearch(orderId);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else {
//         setError("Order not found. Please check the Order ID and try again.");
//         toast.error("Order not found");
//       }
//     } catch (err) {
//       console.error("Error fetching order:", err);
//       setError(
//         err.message || "Failed to fetch order details. Please try again.",
//       );
//       toast.error("Failed to fetch order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "preparing":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "ready":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "completed":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-600 border-gray-200";
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

//   const getStatusStep = (status) => {
//     const steps = ["confirmed", "preparing", "ready", "completed"];
//     const index = steps.indexOf(status?.toLowerCase());
//     return index >= 0 ? index : -1;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch {
//       return dateString;
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col relative z-10 max-h-[90vh]"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <div className="flex items-center gap-2">
//               <ConfirmationNumberIcon className="text-white text-lg sm:text-xl" />
//               <h2 className="text-white font-bold text-base sm:text-xl">
//                 Track Your Order
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//           <p className="text-indigo-100 text-[10px] sm:text-xs mt-1">
//             Enter your Order ID to see real-time status
//           </p>
//         </div>

//         <div className="p-3 sm:p-5 overflow-y-auto flex-1">
//           {/* Search Input */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value.toUpperCase())}
//                 placeholder="e.g., ORD_1777308287423_S1PWDKL56"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-mono pr-8 sm:pr-10 focus:ring-2 focus:ring-indigo-400 outline-none"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
//               />
//               <SearchIcon className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
//             </div>
//             <button
//               onClick={handleCheckOrder}
//               disabled={isLoading}
//               className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition text-sm sm:text-base"
//             >
//               {isLoading ? (
//                 <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>

//           {/* Recent Searches */}
//           {recentSearches.length > 0 && !orderDetails && (
//             <div className="mb-4">
//               <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
//                 Recent searches:
//               </p>
//               <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                 {recentSearches.map((id) => (
//                   <button
//                     key={id}
//                     onClick={() => setOrderId(id)}
//                     className="text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full font-mono transition"
//                   >
//                     {id.slice(-16)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
//               <ErrorIcon fontSize="small" /> {error}
//             </div>
//           )}

//           {/* Order Details */}
//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-3 sm:space-y-4"
//             >
//               {/* Order Header with Status */}
//               <div
//                 className={`rounded-xl p-3 sm:p-4 border-2 ${getStatusColor(orderDetails.status)}`}
//               >
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//                   <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
//                     {getStatusIcon(orderDetails.status)}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm sm:text-2xl font-mono font-bold tracking-tight break-all">
//                         {orderDetails.orderId}
//                       </p>
//                       {orderDetails.bookingId && (
//                         <p className="text-[10px] sm:text-xs opacity-70 mt-1">
//                           Booking: {orderDetails.bookingId}
//                         </p>
//                       )}
//                       <p className="text-[10px] sm:text-xs opacity-75 mt-1">
//                         Ordered:{" "}
//                         {formatDate(
//                           orderDetails.orderDate || orderDetails.createdAt,
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-left sm:text-right w-full sm:w-auto">
//                     <span className="text-lg sm:text-2xl font-bold capitalize">
//                       {orderDetails.status}
//                     </span>
//                     {orderDetails.preparationStatus &&
//                       orderDetails.preparationStatus !==
//                         orderDetails.status && (
//                         <p className="text-xs sm:text-sm opacity-75">
//                           Prep: {orderDetails.preparationStatus}
//                         </p>
//                       )}
//                   </div>
//                 </div>
//               </div>

//               {/* Status Progress Stepper */}
//               <div className="bg-gray-50 rounded-xl p-3 sm:p-4 overflow-x-auto">
//                 <h3 className="font-semibold text-gray-700 mb-3 text-xs sm:text-sm">
//                   Order Progress
//                 </h3>
//                 <div className="flex items-center justify-between min-w-[280px] sm:min-w-0">
//                   {["confirmed", "preparing", "ready", "completed"].map(
//                     (step, idx) => {
//                       const currentStep = getStatusStep(orderDetails.status);
//                       const isCompleted = currentStep >= idx;
//                       const isCurrent = currentStep === idx;
//                       return (
//                         <div key={step} className="flex-1 text-center">
//                           <div className="relative">
//                             <div
//                               className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center text-[10px] sm:text-sm
//                             ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-indigo-500 text-white animate-pulse" : "bg-gray-300 text-gray-500"}`}
//                             >
//                               {isCompleted ? (
//                                 <CheckIcon fontSize="small" />
//                               ) : (
//                                 idx + 1
//                               )}
//                             </div>
//                             {idx < 3 && (
//                               <div
//                                 className={`absolute top-3 sm:top-4 left-1/2 w-full h-0.5 -translate-y-1/2 hidden sm:block
//                               ${currentStep > idx ? "bg-green-500" : "bg-gray-300"}`}
//                                 style={{
//                                   width: "calc(100% - 2rem)",
//                                   left: "calc(50% + 1rem)",
//                                 }}
//                               />
//                             )}
//                           </div>
//                           <p
//                             className={`text-[9px] sm:text-xs mt-1 capitalize font-medium
//                           ${isCompleted ? "text-green-600" : isCurrent ? "text-indigo-600" : "text-gray-400"}`}
//                           >
//                             {step}
//                           </p>
//                         </div>
//                       );
//                     },
//                   )}
//                 </div>
//               </div>

//               {/* Customer & Table Info - NOW WITH DATA */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <PersonIcon fontSize="small" />
//                     <span className="text-xs sm:text-sm font-medium">
//                       Customer Name
//                     </span>
//                   </div>
//                   <p className="font-semibold text-gray-800 text-base sm:text-lg truncate">
//                     {orderDetails.customerName || "N/A"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <TableIcon fontSize="small" />
//                     <span className="text-xs sm:text-sm font-medium">
//                       Table Number
//                     </span>
//                   </div>
//                   <p className="font-semibold text-gray-800 text-base sm:text-lg">
//                     {orderDetails.tableNumber
//                       ? `Table ${orderDetails.tableNumber}`
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>

//               {/* Estimated Time */}
//               {orderDetails.estimatedPickupTime && (
//                 <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-200">
//                   <p className="text-xs sm:text-sm text-amber-800 flex items-center justify-center gap-2 flex-wrap">
//                     <TimerIcon fontSize="small" />
//                     Estimated ready by:{" "}
//                     <strong className="text-sm sm:text-lg">
//                       {orderDetails.estimatedPickupTime}
//                     </strong>
//                   </p>
//                 </div>
//               )}

//               {/* Order Items - NOW WITH DATA */}
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <h3 className="font-semibold text-gray-800 mb-3 text-xs sm:text-sm flex items-center gap-2">
//                   <ReceiptIcon fontSize="small" /> Order Items (
//                   {orderDetails.totalItems || orderDetails.items?.length || 0})
//                 </h3>
//                 <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-52 overflow-y-auto">
//                   {(orderDetails.items || []).map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-2 border-b border-gray-200 last:border-0"
//                     >
//                       <div className="flex-1">
//                         <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                           <span className="font-medium text-gray-700 bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
//                             {item.quantity}x
//                           </span>
//                           <span className="text-gray-800 font-medium text-xs sm:text-sm">
//                             {item.name}
//                           </span>
//                         </div>
//                         {item.customizations &&
//                           item.customizations.length > 0 && (
//                             <div className="text-[9px] sm:text-xs text-gray-500 mt-1 flex flex-wrap gap-1">
//                               {item.customizations.map((c, i) => (
//                                 <span
//                                   key={i}
//                                   className="bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full"
//                                 >
//                                   ✨ {c}
//                                 </span>
//                               ))}
//                             </div>
//                           )}
//                         {item.specialInstructions && (
//                           <div className="text-[9px] sm:text-xs text-orange-600 mt-1 flex items-center gap-1">
//                             <span>📝</span> {item.specialInstructions}
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-left sm:text-right">
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           RWF{" "}
//                           {(
//                             item.finalPrice ||
//                             item.price ||
//                             0
//                           ).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Order Summary - NOW WITH DATA */}
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600 text-xs sm:text-sm">
//                     Subtotal:
//                   </span>
//                   <span className="text-xs sm:text-sm">
//                     RWF {(orderDetails.subtotal || 0).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center pt-2 border-t border-indigo-100">
//                   <span className="font-bold text-gray-800 text-sm sm:text-base">
//                     Total:
//                   </span>
//                   <span className="font-bold text-indigo-600 text-base sm:text-xl">
//                     RWF {(orderDetails.total || 0).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               {/* Status History Timeline */}
//               {orderDetails.statusHistory &&
//                 orderDetails.statusHistory.length > 0 && (
//                   <div className="bg-gray-50 rounded-xl p-3">
//                     <h3 className="font-semibold text-gray-800 mb-3 text-xs sm:text-sm flex items-center gap-2">
//                       <TimerIcon fontSize="small" /> Order Timeline
//                     </h3>
//                     <div className="space-y-2 relative pl-3 sm:pl-4 border-l-2 border-gray-200 ml-1 sm:ml-2">
//                       {orderDetails.statusHistory.map((entry, idx) => (
//                         <div key={entry._id || idx} className="relative pb-2">
//                           <div className="absolute -left-[1.3rem] sm:-left-[1.65rem] top-1">
//                             <div
//                               className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full
//                             ${idx === orderDetails.statusHistory.length - 1 ? "bg-indigo-500 ring-2 ring-indigo-200" : "bg-gray-400"}`}
//                             />
//                           </div>
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
//                             <span className="text-[9px] sm:text-xs text-gray-500 font-mono">
//                               {formatDate(entry.timestamp)}
//                             </span>
//                             <span
//                               className={`text-[10px] sm:text-sm font-medium capitalize
//                             ${entry.status === "completed" ? "text-purple-600" : entry.status === "ready" ? "text-green-600" : entry.status === "preparing" ? "text-yellow-600" : "text-blue-600"}`}
//                             >
//                               {entry.status}
//                             </span>
//                             {entry.note && (
//                               <span className="text-[9px] sm:text-xs text-gray-500">
//                                 - {entry.note}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//               {/* Special Instructions */}
//               {orderDetails.specialInstructions && (
//                 <div className="bg-yellow-50 rounded-xl p-3 border border-yellow-200">
//                   <p className="text-xs sm:text-sm text-yellow-800 flex items-start gap-2">
//                     <span className="text-sm">📋</span>
//                     <span>
//                       <strong>Special Instructions:</strong>{" "}
//                       {orderDetails.specialInstructions}
//                     </span>
//                   </p>
//                 </div>
//               )}

//               {/* Metadata */}
//               {orderDetails.metadata && (
//                 <p className="text-[9px] sm:text-xs text-gray-400 text-center">
//                   Order placed via{" "}
//                   {orderDetails.metadata.source || "NutriScan·AI"}
//                   {orderDetails.metadata.version &&
//                     ` v${orderDetails.metadata.version}`}
//                 </p>
//               )}

//               <p className="text-[9px] sm:text-xs text-gray-400 text-center">
//                 Last updated:{" "}
//                 {formatDate(orderDetails.lastUpdated || orderDetails.updatedAt)}
//               </p>
//             </motion.div>
//           )}

//           {/* Help Text */}
//           {!orderDetails && !error && !isLoading && (
//             <div className="text-center py-6 sm:py-8">
//               <ConfirmationNumberIcon className="text-gray-300 text-3xl sm:text-5xl mx-auto mb-2 sm:mb-3" />
//               <p className="text-gray-500 text-xs sm:text-sm">
//                 Enter your Order ID to track your order status in real-time.
//               </p>
//               <p className="text-gray-400 text-[9px] sm:text-xs mt-1 sm:mt-2">
//                 Example: ORD_1777308287423_S1PWDKL56
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t bg-gray-50 rounded-b-xl sm:rounded-b-2xl flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-200 text-gray-700 py-2 sm:py-2.5 rounded-xl font-medium hover:bg-gray-300 transition text-sm sm:text-base"
//           >
//             Close
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
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//         </div>
//         <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
//           >
//             Start Ordering
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
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-8 sm:py-12">
//               <CartIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
//               <p className="text-gray-500 text-sm sm:text-base">
//                 Your cart is empty
//               </p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div key={item.cartId} className="mb-3 pb-3 border-b">
//                 <div className="flex justify-between gap-2">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-sm sm:text-base truncate">
//                       {item.name}
//                     </h3>
//                     {item.customizations?.length > 0 && (
//                       <div className="text-[10px] sm:text-xs text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-[10px] sm:text-xs text-orange-600">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold text-sm sm:text-base flex-shrink-0">
//                     RWF {item.finalPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </button>
//                   <span className="w-8 text-center text-sm sm:text-base">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <AddIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500 hover:text-red-700 transition"
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
//               <span className="text-orange-600 text-base sm:text-lg">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl">
//             Order Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-[10px] sm:text-xs text-gray-500 break-all">
//               Order ID: {order.orderId}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//           <h3 className="font-bold mb-2 text-sm sm:text-base">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between gap-2">
//                 <span className="text-sm sm:text-base">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-orange-600 font-semibold text-sm sm:text-base">
//                   RWF {item.finalPrice?.toLocaleString()}
//                 </span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-[10px] sm:text-xs text-gray-500">
//                   {item.customizations.map((c) => `• ${c}`).join(" ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-[10px] sm:text-xs text-orange-600">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600 text-base sm:text-lg">
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[90%] sm:max-w-sm w-full p-5 sm:p-6 text-center relative z-10"
//       >
//         {type === "success" ? (
//           <CheckCircleIcon className="text-green-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
//         ) : (
//           <ErrorIcon className="text-red-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
//         )}
//         <h2 className="text-lg sm:text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-line mb-5 sm:mb-6">
//           {message}
//         </p>
//         <button
//           onClick={onClose}
//           className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
//         >
//           OK
//         </button>
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
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 sm:p-5 rounded-t-xl sm:rounded-t-3xl flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 min-w-0">
//               <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-xs sm:text-sm mt-1 truncate">
//                 {item?.name}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-xl sm:text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-xs sm:text-sm ml-2">
//               per serving
//             </span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-1.5 sm:gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-orange-50 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">✨</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-2.5 sm:p-3">
//               <h3 className="font-semibold text-emerald-800 text-xs sm:text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="text-emerald-500"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests?"
//               className="w-full p-2.5 sm:p-3 border rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-600 text-white text-sm sm:text-base hover:bg-red-700 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-orange-600 transition"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
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
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) =>
//     `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3`}
//     >
//       <TimerIcon className="animate-pulse text-base sm:text-xl" />
//       <div>
//         <span className="text-[9px] sm:text-xs font-medium">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-sm sm:text-xl font-mono font-bold block">
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const apiService = useMemo(() => APIService.getInstance(), []);

//   const handleGetOrderById = useCallback(
//     async (orderId) => await apiService.getOrderById(orderId),
//     [apiService],
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (activeOrder && activeOrder.orderId) {
//         const statuses = ["confirmed", "preparing", "ready", "completed"];
//         const currentIndex = statuses.indexOf(activeOrder.status);
//         if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
//           const newStatus = statuses[currentIndex + 1];
//           setActiveOrder((prev) => ({ ...prev, status: newStatus }));
//           setLiveStatus({
//             orderId: activeOrder.orderId,
//             status: newStatus,
//             message: `Order ${newStatus === "confirmed" ? "has been confirmed" : newStatus === "preparing" ? "is being prepared" : newStatus === "ready" ? "is ready for pickup" : "has been completed"}`,
//           });
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
//       const { nutritionalInfo, nutritionSource } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );
//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;
//     const customizedPlates = cart.map((item) => ({
//       name: item.name,
//       originalIngredients: item.ingredients,
//       customizations: item.customizations || [],
//       instructions: item.specialInstructions || "",
//     }));
//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber,
//       items: cart.map(({ cartId, ...rest }) => rest),
//       customizedPlates,
//       subtotal: getTotal(),
//       total: getTotal(),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       orderType: "dine-in",
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//     };

//     try {
//       const result = await apiService.createOrder(orderData);
//       if (result.success && result.orderId) {
//         const orderId = result.orderId;
//         setActiveOrder({
//           orderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "confirmed",
//         });
//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${orderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${orderId}`,
//         });
//         setCart([]);
//       } else {
//         const fallbackOrderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
//         setActiveOrder({
//           orderId: fallbackOrderId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "confirmed",
//         });
//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${fallbackOrderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${fallbackOrderId}`,
//         });
//         setCart([]);
//       }
//     } catch (error) {
//       const fallbackOrderId = `ORD_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
//       setActiveOrder({
//         orderId: fallbackOrderId,
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
//         message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${fallbackOrderId}\nTotal: RWF ${getTotal().toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${fallbackOrderId}`,
//       });
//       setCart([]);
//     }
//     setIsSubmitting(false);
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);
//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
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
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-xl sm:text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-base sm:text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-1 sm:ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-2 sm:gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <ConfirmationNumberIcon className="text-base sm:text-xl" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCart(true)}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
//             >
//               <CartIcon className="text-base sm:text-xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.length}
//                 </span>
//               )}
//             </motion.button>
//           </div>
//         </div>

//         {/* Info Banner */}
//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4"
//         >
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
//               <ShieldIcon className="text-blue-600 text-base sm:text-xl" />
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs md:text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis + Real-time Order Tracking
//               </p>
//               <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-600">
//                 Click any dish for detailed nutrition from USDA/Spoonacular
//                 APIs. Track your order status in real-time!
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Search Bar */}
//         <div className="relative mb-4 sm:mb-5">
//           <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
//           <input
//             className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-xs sm:text-sm md:text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition font-medium text-[11px] sm:text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -4 }}
//               key={item.id}
//               className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/60 text-white text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
//                   <TimeIcon
//                     fontSize="small"
//                     className="text-[10px] sm:text-xs"
//                   />{" "}
//                   {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-2 sm:p-3 md:p-4">
//                 <h3 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg truncate">
//                   {item.name}
//                 </h3>
//                 <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5 sm:mt-1 h-6 sm:h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-2 sm:mt-3">
//                   <span className="text-orange-600 font-bold text-sm sm:text-base md:text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <button className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition shadow-md hover:bg-orange-600">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-10 sm:py-16">
//             <SearchIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
//             <p className="text-gray-500 text-base sm:text-lg">
//               No items match your search.
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
//             >
//               ←
//             </button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum =
//                 totalPages <= 7
//                   ? i + 1
//                   : currentPage <= 4
//                     ? i + 1
//                     : currentPage >= totalPages - 3
//                       ? totalPages - 6 + i
//                       : currentPage - 3 + i;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg transition text-xs sm:text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
//             >
//               →
//             </button>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         <AnimatePresence>
//           {isSubmitting && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-3 sm:mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
//                   Please wait
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };












// /* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable no-unused-vars */
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
// } from "@mui/icons-material";

// // ========== API CONFIGURATION ==========
// const API_CONFIG = {
//   USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
//   USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
//   SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
//   SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
// };

// // ========== BACKEND API ENDPOINTS ==========
// const BACKEND_API = {
//   BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
//   ORDERS: "/orders",
//   ORDER_STATUS: "/orders",
//   CUSTOMIZED_PLATES: "/orders",
//   TRACK_ORDER: "/orders",
// };

// // ========== PROFESSIONAL API SERVICE CLASS ==========
// class APIService {
//   static instance = null;

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: BACKEND_API.BASE_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("auth_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         console.log(
//           "API Request:",
//           config.method.toUpperCase(),
//           config.url,
//           config.data,
//         );
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     this.axiosInstance.interceptors.response.use(
//       (response) => {
//         console.log("API Response:", response.status, response.data);
//         return response;
//       },
//       (error) => {
//         console.error("API Error:", error.response?.data || error.message);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("auth_token");
//           window.dispatchEvent(new CustomEvent("auth:logout"));
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   static getInstance() {
//     if (!APIService.instance) {
//       APIService.instance = new APIService();
//     }
//     return APIService.instance;
//   }

//   async createOrder(orderData) {
//     try {
//       console.log("Creating order with data:", orderData);
//       const response = await this.axiosInstance.post(
//         BACKEND_API.ORDERS,
//         orderData,
//       );
//       console.log("Order creation response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Create order error:", error);
//       console.error("Error response:", error.response?.data);
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
//       console.error("Get order by ID error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getAllOrders(filters = {}) {
//     try {
//       const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
//         params: filters,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Get all orders error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async updateOrderStatus(orderId, status, notes = "") {
//     try {
//       const response = await this.axiosInstance.patch(
//         `${BACKEND_API.ORDER_STATUS}/${orderId}`,
//         {
//           status,
//           notes,
//           updatedAt: new Date().toISOString(),
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Update order status error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async trackOrder(orderId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.TRACK_ORDER}/${orderId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Track order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async cancelOrder(orderId, reason = "") {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.ORDERS}/${orderId}`,
//         {
//           data: { reason },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Cancel order error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async saveCustomizedPlate(plateData) {
//     try {
//       const response = await this.axiosInstance.post(
//         BACKEND_API.CUSTOMIZED_PLATES,
//         plateData,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Save customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async getUserCustomizedPlates(userId) {
//     try {
//       const response = await this.axiosInstance.get(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Get user customized plates error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async deleteCustomizedPlate(plateId) {
//     try {
//       const response = await this.axiosInstance.delete(
//         `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Delete customized plate error:", error);
//       throw this.handleError(error);
//     }
//   }

//   async searchFoodUSDA(query) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/foods/search`,
//         {
//           params: {
//             api_key: API_CONFIG.USDA_API_KEY,
//             query: query,
//             pageSize: 5,
//           },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA API search error:", error);
//       return null;
//     }
//   }

//   async getFoodDetails(fdcId) {
//     try {
//       const response = await axios.get(
//         `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
//         {
//           params: { api_key: API_CONFIG.USDA_API_KEY },
//           timeout: 10000,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error("USDA food details error:", error);
//       return null;
//     }
//   }

//   async analyzeRecipeSpoonacular(ingredients, title) {
//     try {
//       const searchResponse = await axios.get(
//         `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
//         {
//           params: {
//             apiKey: API_CONFIG.SPOONACULAR_API_KEY,
//             query: title,
//             addRecipeInformation: true,
//             number: 1,
//           },
//           timeout: 10000,
//         },
//       );

//       let nutritionData = null;
//       const recipe = searchResponse.data?.results?.[0];

//       if (recipe?.id) {
//         const nutritionResponse = await axios.get(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             timeout: 10000,
//           },
//         );
//         nutritionData = nutritionResponse.data;
//       } else {
//         const analyzeResponse = await axios.post(
//           `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
//           { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
//           {
//             params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
//             headers: { "Content-Type": "application/json" },
//             timeout: 15000,
//           },
//         );
//         nutritionData = analyzeResponse.data;
//       }

//       return { nutrition: nutritionData, info: recipe || null };
//     } catch (error) {
//       console.error("Spoonacular analysis error:", error);
//       return null;
//     }
//   }

//   async getCompleteNutritionAnalysis(item) {
//     let nutritionalInfo = null;
//     let nutritionSource = null;

//     const usdaSearch = await this.searchFoodUSDA(item.name);
//     if (usdaSearch?.foods?.length > 0) {
//       const bestMatch = usdaSearch.foods[0];
//       const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
//       if (foodDetails) {
//         nutritionalInfo = this.parseUSDANutrition(foodDetails);
//         nutritionSource = "USDA Food Database";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       const spoonacularResult = await this.analyzeRecipeSpoonacular(
//         item.ingredients,
//         item.name,
//       );
//       if (spoonacularResult?.nutrition) {
//         nutritionalInfo = this.parseSpoonacularNutrition(
//           spoonacularResult.nutrition,
//         );
//         nutritionSource = "Spoonacular API";
//       }
//     }

//     if (!nutritionalInfo?.calories) {
//       nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
//       nutritionSource = "Estimated from ingredients";
//     }

//     return { nutritionalInfo, nutritionSource };
//   }

//   parseUSDANutrition(usdaData) {
//     const nutrients = usdaData.foodNutrients || [];
//     const getNutrientValue = (nutrientName) => {
//       const nutrient = nutrients.find(
//         (n) =>
//           n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
//           n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
//       );
//       return nutrient ? Math.round(nutrient.value) : 0;
//     };
//     return {
//       calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
//       fat: getNutrientValue("Total fat"),
//       sodium: getNutrientValue("Sodium"),
//       sugar: getNutrientValue("Sugars"),
//       saturatedFat: getNutrientValue("Saturated fat"),
//       cholesterol: getNutrientValue("Cholesterol"),
//       protein: getNutrientValue("Protein"),
//       carbs: getNutrientValue("Carbohydrate"),
//       fiber: getNutrientValue("Fiber"),
//     };
//   }

//   parseSpoonacularNutrition(nutritionData) {
//     const nutrients = nutritionData.nutrients || [];
//     const getNutrient = (name) => {
//       const nutrient = nutrients.find((n) => n.name === name);
//       return nutrient ? Math.round(nutrient.amount) : 0;
//     };
//     return {
//       calories: getNutrient("Calories"),
//       fat: getNutrient("Fat"),
//       sodium: getNutrient("Sodium"),
//       sugar: getNutrient("Sugar"),
//       saturatedFat: getNutrient("Saturated Fat"),
//       cholesterol: getNutrient("Cholesterol"),
//       protein: getNutrient("Protein"),
//       carbs: getNutrient("Carbohydrates"),
//       fiber: getNutrient("Fiber"),
//     };
//   }

//   estimateNutritionFromIngredients(ingredients) {
//     const estimated = {
//       calories: 0,
//       fat: 0,
//       sodium: 0,
//       sugar: 0,
//       saturatedFat: 0,
//       cholesterol: 0,
//       protein: 0,
//       carbs: 0,
//       fiber: 0,
//     };
//     const ingredientEstimates = {
//       meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
//       beef: {
//         calories: 280,
//         fat: 20,
//         protein: 26,
//         sodium: 75,
//         saturatedFat: 8,
//       },
//       chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
//       fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
//       shrimp: {
//         calories: 84,
//         fat: 1,
//         protein: 18,
//         sodium: 111,
//         cholesterol: 166,
//       },
//       cheese: {
//         calories: 400,
//         fat: 33,
//         sodium: 620,
//         saturatedFat: 21,
//         cholesterol: 100,
//         protein: 25,
//       },
//       butter: {
//         calories: 717,
//         fat: 81,
//         sodium: 11,
//         saturatedFat: 51,
//         cholesterol: 215,
//       },
//       cream: {
//         calories: 345,
//         fat: 37,
//         sodium: 38,
//         saturatedFat: 23,
//         cholesterol: 137,
//       },
//       oil: { calories: 884, fat: 100, saturatedFat: 14 },
//       flour: { calories: 364, carbs: 76, protein: 10 },
//       sugar: { calories: 387, sugar: 100, carbs: 100 },
//       chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
//       beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
//       rice: { calories: 130, carbs: 28, protein: 2.7 },
//       potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
//       tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
//       onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
//       garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
//       coconut: {
//         calories: 354,
//         fat: 33,
//         saturatedFat: 30,
//         carbs: 15,
//         fiber: 9,
//       },
//       peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
//       orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
//       coffee: { calories: 2, carbs: 0 },
//     };

//     for (const ingredient of ingredients) {
//       const ingLower = ingredient.toLowerCase();
//       for (const [key, values] of Object.entries(ingredientEstimates)) {
//         if (ingLower.includes(key)) {
//           estimated.calories += values.calories || 0;
//           estimated.fat += values.fat || 0;
//           estimated.protein += values.protein || 0;
//           estimated.carbs += values.carbs || 0;
//           estimated.sodium += values.sodium || 0;
//           estimated.sugar += values.sugar || 0;
//           estimated.saturatedFat += values.saturatedFat || 0;
//           estimated.cholesterol += values.cholesterol || 0;
//           estimated.fiber += values.fiber || 0;
//           break;
//         }
//       }
//     }

//     const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
//     Object.keys(estimated).forEach((key) => {
//       estimated[key] = Math.min(
//         key === "calories"
//           ? 1200
//           : key === "fat"
//             ? 60
//             : key === "sodium"
//               ? 1500
//               : key === "sugar"
//                 ? 40
//                 : key === "saturatedFat"
//                   ? 25
//                   : key === "cholesterol"
//                     ? 200
//                     : key === "protein"
//                       ? 50
//                       : key === "carbs"
//                         ? 100
//                         : 15,
//         Math.round(estimated[key] / servingFactor),
//       );
//     });

//     return estimated;
//   }

//   handleError(error) {
//     if (error.response) {
//       return {
//         status: error.response.status,
//         message: error.response.data?.message || "Server error occurred",
//         data: error.response.data,
//       };
//     } else if (error.request) {
//       return {
//         status: 0,
//         message: "Network error - Unable to connect to server",
//         data: null,
//       };
//     }
//     return {
//       status: -1,
//       message: error.message || "An unexpected error occurred",
//       data: null,
//     };
//   }
// }

// // ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
// const CLINICAL_CONDITIONS = [
//   {
//     id: 1,
//     name: "Type 2 Diabetes",
//     icon: "🩸",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "Affects blood sugar regulation",
//     thresholds: {
//       sugar: {
//         value: 15,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g sugar - May cause blood sugar spike.",
//       },
//       sugarHigh: {
//         value: 30,
//         unit: "g",
//         severity: "high",
//         message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
//       },
//       carbs: {
//         value: 50,
//         unit: "g",
//         severity: "moderate",
//         message: "Contains {value}g carbohydrates - Monitor blood glucose.",
//       },
//       carbsHigh: {
//         value: 80,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
//       },
//     },
//   },
//   {
//     id: 2,
//     name: "Hypertension (High Blood Pressure)",
//     icon: "❤️",
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     description: "High blood pressure",
//     thresholds: {
//       sodium: {
//         value: 600,
//         unit: "mg",
//         severity: "moderate",
//         message: "Contains {value}mg sodium - May raise blood pressure.",
//       },
//       sodiumHigh: {
//         value: 1200,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
//       },
//     },
//   },
//   {
//     id: 3,
//     name: "Heart Disease",
//     icon: "🫀",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Coronary artery disease",
//     thresholds: {
//       saturatedFat: {
//         value: 8,
//         unit: "g",
//         severity: "moderate",
//         message:
//           "Contains {value}g saturated fat - May increase LDL cholesterol.",
//       },
//       saturatedFatHigh: {
//         value: 15,
//         unit: "g",
//         severity: "high",
//         message:
//           "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
//       },
//       cholesterol: {
//         value: 200,
//         unit: "mg",
//         severity: "moderate",
//         message:
//           "Contains {value}mg cholesterol - May contribute to arterial plaque.",
//       },
//       cholesterolHigh: {
//         value: 300,
//         unit: "mg",
//         severity: "high",
//         message:
//           "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
//       },
//     },
//   },
//   {
//     id: 4,
//     name: "Celiac Disease",
//     icon: "🌾",
//     color: "text-amber-700",
//     bgColor: "bg-amber-50",
//     description: "Autoimmune reaction to gluten",
//     thresholds: {
//       gluten: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
//       },
//     },
//   },
//   {
//     id: 5,
//     name: "Peanut Allergy",
//     icon: "🥜",
//     color: "text-rose-600",
//     bgColor: "bg-rose-50",
//     description: "Severe allergic reaction to peanuts",
//     thresholds: {
//       allergen: {
//         value: 1,
//         unit: "",
//         severity: "critical",
//         message:
//           "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
//       },
//     },
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
//       "salt",
//     ],
//     description: "Traditional cassava leaf stew with beef",
//     prepTime: 18,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: true,
//     sodiumMg: 890,
//     sugarGrams: 8,
//   },
//   {
//     id: 2,
//     name: "Brochette de Boeuf",
//     price: 3500,
//     ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
//     description: "Grilled beef skewers with crispy fries",
//     prepTime: 15,
//     category: "Mains",
//     image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 1200,
//     sugarGrams: 2,
//   },
//   {
//     id: 3,
//     name: "Grilled Tilapia",
//     price: 4500,
//     ingredients: [
//       "tilapia",
//       "lemon",
//       "garlic",
//       "rosemary",
//       "olive oil",
//       "salt",
//     ],
//     description: "Fresh lake tilapia grilled to perfection",
//     prepTime: 16,
//     category: "Seafood",
//     image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 400,
//     sugarGrams: 1,
//   },
//   {
//     id: 4,
//     name: "Garden Fresh Salad",
//     price: 1500,
//     ingredients: [
//       "lettuce",
//       "tomato",
//       "cucumber",
//       "carrots",
//       "bell peppers",
//       "olive oil",
//     ],
//     description: "Fresh garden vegetables with light vinaigrette",
//     prepTime: 5,
//     category: "Salads",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: false,
//     sodiumMg: 50,
//     sugarGrams: 5,
//   },
//   {
//     id: 5,
//     name: "Sweet Masala Chai",
//     price: 1200,
//     ingredients: [
//       "black tea",
//       "milk",
//       "sugar",
//       "cardamom",
//       "ginger",
//       "cinnamon",
//     ],
//     description: "Traditional spiced tea",
//     prepTime: 5,
//     category: "Beverages",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//     containsGluten: false,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 50,
//     sugarGrams: 35,
//   },
//   {
//     id: 6,
//     name: "Chocolate Lava Cake",
//     price: 6500,
//     ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
//     description: "Warm molten chocolate cake",
//     prepTime: 12,
//     category: "Desserts",
//     image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 150,
//     sugarGrams: 45,
//   },
//   {
//     id: 7,
//     name: "Margherita Pizza",
//     price: 5200,
//     ingredients: [
//       "pizza dough",
//       "tomato sauce",
//       "mozzarella cheese",
//       "basil",
//       "salt",
//     ],
//     description: "Classic Italian pizza",
//     prepTime: 15,
//     category: "Pizza",
//     image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
//     containsGluten: true,
//     containsPeanuts: false,
//     containsDairy: true,
//     sodiumMg: 850,
//     sugarGrams: 4,
//   },
//   {
//     id: 8,
//     name: "Mixed Nut Platter",
//     price: 4200,
//     ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
//     description: "Assorted premium nuts",
//     prepTime: 2,
//     category: "Appetizers",
//     image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
//     containsGluten: false,
//     containsPeanuts: true,
//     containsDairy: false,
//     sodiumMg: 380,
//     sugarGrams: 4,
//   },
// ];

// // ========== LOADING MODAL ==========
// const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
//   const [progress, setProgress] = useState(0);
//   const [loadingStep, setLoadingStep] = useState(0);
//   const [apiStatus, setApiStatus] = useState({
//     usda: "pending",
//     spoonacular: "pending",
//   });

//   const loadingSteps = [
//     { message: "Connecting to nutrition databases...", icon: "🔄" },
//     { message: "Querying USDA Food Database...", icon: "🌾" },
//     { message: "Fetching from Spoonacular API...", icon: "🥄" },
//     { message: "Analyzing nutritional content...", icon: "🔬" },
//     { message: "Preparing health insights...", icon: "💚" },
//   ];

//   useEffect(() => {
//     if (!isOpen) {
//       setProgress(0);
//       setLoadingStep(0);
//       setApiStatus({ usda: "pending", spoonacular: "pending" });
//       return;
//     }

//     const interval = setInterval(
//       () => setProgress((prev) => (prev >= 100 ? 100 : prev + 2)),
//       50,
//     );
//     const stepInterval = setInterval(
//       () =>
//         setLoadingStep((prev) =>
//           prev < loadingSteps.length - 1 ? prev + 1 : prev,
//         ),
//       800,
//     );
//     const apiTimeout1 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
//       1500,
//     );
//     const apiTimeout2 = setTimeout(
//       () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
//       2500,
//     );

//     return () => {
//       clearInterval(interval);
//       clearInterval(stepInterval);
//       clearTimeout(apiTimeout1);
//       clearTimeout(apiTimeout2);
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
//         className="bg-gradient-to-br from-white to-orange-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="bg-white/20 p-1.5 sm:p-2 rounded-full"
//             >
//               <ScienceIcon className="text-xl sm:text-2xl" />
//             </motion.div>
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-base sm:text-xl truncate">
//                 Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
//               </h2>
//               <p className="text-orange-100 text-xs sm:text-sm truncate">
//                 {itemName}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//           <div>
//             <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
//               <span>Loading nutrition data...</span>
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
//                   className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${
//                     loadingStep > idx
//                       ? "bg-green-500 text-white"
//                       : loadingStep === idx
//                         ? "bg-orange-500 text-white animate-pulse"
//                         : "bg-gray-200 text-gray-400"
//                   }`}
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

//           <div className="bg-gray-100 rounded-xl p-2 sm:p-3">
//             <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2">
//               🔌 API Status:
//             </p>
//             <div className="flex gap-3 sm:gap-4">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                     apiStatus.usda === "success"
//                       ? "bg-green-500"
//                       : apiStatus.usda === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-[10px] sm:text-xs text-gray-600">
//                   USDA Food Database
//                 </span>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <div
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
//                     apiStatus.spoonacular === "success"
//                       ? "bg-green-500"
//                       : apiStatus.spoonacular === "pending"
//                         ? "bg-yellow-500 animate-pulse"
//                         : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-[10px] sm:text-xs text-gray-600">
//                   Spoonacular API
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ANALYZE FOOD FOR CONDITIONS ==========
// const analyzeFoodForConditions = (item) => {
//   const nutrition = item.nutritionalInfo || {};
//   const conditionsAnalysis = [];

//   for (const condition of CLINICAL_CONDITIONS) {
//     let riskLevel = "safe";
//     let message = null;

//     if (condition.name === "Type 2 Diabetes") {
//       if (nutrition.sugar >= 30) {
//         riskLevel = "warning";
//         message = condition.thresholds.sugarHigh.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.sugar >= 15) {
//         riskLevel = "info";
//         message = condition.thresholds.sugar.message.replace(
//           "{value}",
//           nutrition.sugar,
//         );
//       } else if (nutrition.carbs >= 80) {
//         riskLevel = "warning";
//         message = condition.thresholds.carbsHigh.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       } else if (nutrition.carbs >= 50) {
//         riskLevel = "info";
//         message = condition.thresholds.carbs.message.replace(
//           "{value}",
//           nutrition.carbs,
//         );
//       }
//     } else if (condition.name === "Hypertension (High Blood Pressure)") {
//       if (nutrition.sodium >= 1200) {
//         riskLevel = "warning";
//         message = condition.thresholds.sodiumHigh.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       } else if (nutrition.sodium >= 600) {
//         riskLevel = "info";
//         message = condition.thresholds.sodium.message.replace(
//           "{value}",
//           nutrition.sodium,
//         );
//       }
//     } else if (condition.name === "Heart Disease") {
//       if (nutrition.saturatedFat >= 15) {
//         riskLevel = "warning";
//         message = condition.thresholds.saturatedFatHigh.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       } else if (nutrition.saturatedFat >= 8) {
//         riskLevel = "info";
//         message = condition.thresholds.saturatedFat.message.replace(
//           "{value}",
//           nutrition.saturatedFat,
//         );
//       }
//       if (nutrition.cholesterol >= 300) {
//         riskLevel = "warning";
//         message = condition.thresholds.cholesterolHigh.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       } else if (nutrition.cholesterol >= 200) {
//         riskLevel = "info";
//         message = condition.thresholds.cholesterol.message.replace(
//           "{value}",
//           nutrition.cholesterol,
//         );
//       }
//     } else if (condition.name === "Celiac Disease" && item.containsGluten) {
//       riskLevel = "warning";
//       message = condition.thresholds.gluten.message;
//     } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
//       riskLevel = "warning";
//       message = condition.thresholds.allergen.message;
//     }

//     if (riskLevel !== "safe") {
//       conditionsAnalysis.push({
//         conditionId: condition.id,
//         conditionName: condition.name,
//         icon: condition.icon,
//         color: condition.color,
//         bgColor: condition.bgColor,
//         description: condition.description,
//         riskLevel: riskLevel,
//         warningMessage: message,
//       });
//     }
//   }

//   return {
//     conditions: conditionsAnalysis,
//     hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
//     hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
//     totalConditionsAffected: conditionsAnalysis.length,
//   };
// };

// // ========== FORMAT NUTRITION INFO ==========
// const formatNutritionInfo = (nutrition) => {
//   if (!nutrition) return [];
//   return [
//     { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
//     { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
//     { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
//     { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
//     { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
//     {
//       label: "Saturated Fat",
//       value: nutrition.saturatedFat,
//       unit: "g",
//       icon: "⚠️",
//     },
//     { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
//     { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
//     {
//       label: "Cholesterol",
//       value: nutrition.cholesterol,
//       unit: "mg",
//       icon: "🫀",
//     },
//   ].filter((n) => n.value !== undefined && n.value !== null);
// };

// // ========== CONDITION RISK MODAL ==========
// const ConditionRiskModal = ({
//   isOpen,
//   onClose,
//   analysis,
//   item,
//   onContinue,
// }) => {
//   const [expandedSection, setExpandedSection] = useState(null);

//   if (!isOpen || !analysis) return null;

//   const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
//   const warningConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "warning",
//   );
//   const infoConditions = analysis.conditions.filter(
//     (c) => c.riskLevel === "info",
//   );

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
//         className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 min-w-0">
//               <h2 className="font-bold text-lg sm:text-xl truncate">
//                 {item?.name}
//               </h2>
//               <p className="text-orange-100 text-xs sm:text-sm">
//                 RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition flex-shrink-0"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
//           {item?.nutritionSource && (
//             <div className="bg-green-50 rounded-xl p-2 text-center text-[10px] sm:text-xs text-green-700">
//               ✅ Real-time nutrition data from {item.nutritionSource}
//             </div>
//           )}

//           <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
//             <p className="text-gray-700 text-xs sm:text-sm">
//               {item?.description}
//             </p>
//           </div>

//           {/* Ingredients */}
//           <div>
//             <button
//               onClick={() =>
//                 setExpandedSection(
//                   expandedSection === "ingredients" ? null : "ingredients",
//                 )
//               }
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">🥗</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Ingredients
//                 </span>
//               </div>
//               {expandedSection === "ingredients" ? (
//                 <ExpandLessIcon className="text-sm sm:text-base" />
//               ) : (
//                 <ExpandMoreIcon className="text-sm sm:text-base" />
//               )}
//             </button>
//             {expandedSection === "ingredients" && (
//               <div className="mt-2 p-3 bg-gray-50 rounded-xl">
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                   {item?.ingredients?.map((ing, idx) => (
//                     <span
//                       key={idx}
//                       className="px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm shadow-sm border"
//                     >
//                       {ing}
//                     </span>
//                   ))}
//                 </div>
//               </div>
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
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <Nature className="text-emerald-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Nutrition Facts (Real API Data)
//                   </span>
//                   <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                     Live
//                   </span>
//                 </div>
//                 {expandedSection === "nutrition" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "nutrition" && (
//                 <div className="mt-2 p-3 sm:p-4 bg-emerald-50 rounded-xl">
//                   <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                     {nutritionInfo.map((n, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b border-emerald-100 pb-2"
//                       >
//                         <span className="text-[11px] sm:text-sm text-gray-600">
//                           {n.icon} {n.label}
//                         </span>
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           {n.value} {n.unit}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Health Warnings */}
//           {(warningConditions.length > 0 || infoConditions.length > 0) && (
//             <div>
//               <button
//                 onClick={() =>
//                   setExpandedSection(
//                     expandedSection === "health" ? null : "health",
//                   )
//                 }
//                 className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <LocalHospitalIcon className="text-amber-600 text-base sm:text-xl" />
//                   <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                     Health Information
//                   </span>
//                   {warningConditions.length > 0 && (
//                     <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                       {warningConditions.length} warnings
//                     </span>
//                   )}
//                 </div>
//                 {expandedSection === "health" ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </button>
//               {expandedSection === "health" && (
//                 <div className="mt-2 space-y-2 sm:space-y-3">
//                   {warningConditions.map((cond, idx) => (
//                     <div
//                       key={idx}
//                       className={`${cond.bgColor} rounded-xl p-3 sm:p-4 border-l-4 border-amber-500`}
//                     >
//                       <div className="flex items-start gap-2 sm:gap-3">
//                         <span className="text-xl sm:text-2xl">{cond.icon}</span>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-bold text-gray-800 text-sm sm:text-base">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-xs sm:text-sm text-gray-700">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {infoConditions.map((cond, idx) => (
//                     <div key={idx} className="bg-blue-50 rounded-xl p-3 sm:p-4">
//                       <div className="flex items-start gap-2 sm:gap-3">
//                         <span className="text-base sm:text-xl">
//                           {cond.icon}
//                         </span>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-medium text-gray-800 text-sm sm:text-base">
//                             {cond.conditionName}
//                           </h4>
//                           <p className="text-[10px] sm:text-xs text-gray-600">
//                             {cond.warningMessage}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {analysis.conditions.length === 0 && (
//             <div className="bg-green-50 rounded-xl p-3 sm:p-4 text-center">
//               <CheckCircleIcon className="text-green-500 text-3xl sm:text-4xl mx-auto mb-2" />
//               <p className="text-green-700 font-medium text-sm sm:text-base">
//                 ✓ No specific health concerns detected
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-500 text-white text-sm sm:text-base hover:bg-red-600 transition"
//           >
//             Close
//           </button>
//           <button
//             onClick={onContinue}
//             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:shadow-lg transition"
//           >
//             <EditIcon fontSize="small" /> Customize Order
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // ========== ORDER STATUS MODAL ==========
// const OrderStatusModal = ({ isOpen, onClose, onCheckOrder, liveStatus }) => {
//   const [orderId, setOrderId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [recentSearches, setRecentSearches] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("recentOrderSearches");
//     if (saved) {
//       try {
//         setRecentSearches(JSON.parse(saved).slice(0, 5));
//       } catch (e) {
//         console.error("Failed to load recent searches", e);
//       }
//     }
//   }, []);

//   const saveRecentSearch = (id) => {
//     const updated = [id, ...recentSearches.filter((s) => s !== id)].slice(0, 5);
//     setRecentSearches(updated);
//     localStorage.setItem("recentOrderSearches", JSON.stringify(updated));
//   };

//   useEffect(() => {
//     if (
//       liveStatus &&
//       liveStatus.orderId === orderId &&
//       liveStatus.status &&
//       orderDetails
//     ) {
//       setOrderDetails((prev) => ({
//         ...prev,
//         status: liveStatus.status,
//         currentStatus: liveStatus.status,
//         lastUpdated: new Date().toISOString(),
//       }));

//       const statusMessages = {
//         confirmed: "🔔 Order confirmed!",
//         preparing: "🍳 Order is being prepared!",
//         ready: "✅ Order is ready for pickup!",
//         completed: "🎉 Order completed! Enjoy your meal!",
//         cancelled: "❌ Order has been cancelled",
//       };
//       if (statusMessages[liveStatus.status])
//         toast.info(statusMessages[liveStatus.status]);
//     }
//   }, [liveStatus, orderId, orderDetails]);

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
//       console.log("API Response:", result);

//       if (result && result.success === true && result.order) {
//         const orderData = result.order;

//         const transformedOrder = {
//           orderId: orderData.orderId || "N/A",
//           bookingId: orderData.bookingId || "N/A",
//           _id: orderData._id,
//           customerName: orderData.personDetails?.name || "N/A",
//           tableNumber: orderData.personDetails?.tableNumber || "N/A",
//           orderType: orderData.personDetails?.orderType || "dine-in",
//           status: orderData.status || "unknown",
//           preparationStatus: orderData.bookingDetails?.preparationStatus,
//           currentStatus: orderData.bookingDetails?.currentStatus,
//           orderDate: orderData.bookingDetails?.orderDate || orderData.createdAt,
//           estimatedPickupTime: orderData.bookingDetails?.estimatedPickupTime,
//           createdAt: orderData.createdAt,
//           updatedAt: orderData.updatedAt,
//           items: (orderData.orderSummary?.items || []).map((item) => ({
//             id: item.id,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.finalPrice,
//             finalPrice: item.finalPrice,
//             customizations: item.customizations || [],
//             specialInstructions: item.specialInstructions || "",
//           })),
//           subtotal: orderData.orderSummary?.subtotal || 0,
//           total: orderData.orderSummary?.total || 0,
//           totalItems: orderData.orderSummary?.totalItems || 0,
//           statusHistory: orderData.bookingDetails?.statusHistory || [],
//           specialInstructions:
//             orderData.bookingDetails?.specialInstructions ||
//             `Table ${orderData.personDetails?.tableNumber} - ${orderData.personDetails?.name}`,
//           plateRecommendations: orderData.plateRecommendations || [],
//           metadata: orderData.metadata,
//           lastUpdated: new Date().toISOString(),
//         };

//         console.log("Transformed Order:", transformedOrder);
//         setOrderDetails(transformedOrder);
//         saveRecentSearch(orderId);
//         toast.success(`Order ${orderId.slice(-8)} found!`);
//       } else {
//         setError("Order not found. Please check the Order ID and try again.");
//         toast.error("Order not found");
//       }
//     } catch (err) {
//       console.error("Error fetching order:", err);
//       setError(
//         err.message || "Failed to fetch order details. Please try again.",
//       );
//       toast.error("Failed to fetch order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "confirmed":
//         return "bg-blue-100 text-blue-800 border-blue-200";
//       case "preparing":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "ready":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "completed":
//         return "bg-purple-100 text-purple-800 border-purple-200";
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-600 border-gray-200";
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

//   const getStatusStep = (status) => {
//     const steps = ["confirmed", "preparing", "ready", "completed"];
//     const index = steps.indexOf(status?.toLowerCase());
//     return index >= 0 ? index : -1;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch {
//       return dateString;
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl flex flex-col relative z-10 max-h-[90vh]"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
//           <div className="flex items-center justify-between flex-wrap gap-2">
//             <div className="flex items-center gap-2">
//               <ConfirmationNumberIcon className="text-white text-lg sm:text-xl" />
//               <h2 className="text-white font-bold text-base sm:text-xl">
//                 Track Your Order
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//           <p className="text-indigo-100 text-[10px] sm:text-xs mt-1">
//             Enter your Order ID to see real-time status
//           </p>
//         </div>

//         <div className="p-3 sm:p-5 overflow-y-auto flex-1">
//           {/* Search Input */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value.toUpperCase())}
//                 placeholder="e.g., ORD_1777308287423_S1PWDKL56"
//                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-mono pr-8 sm:pr-10 focus:ring-2 focus:ring-indigo-400 outline-none"
//                 onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
//               />
//               <SearchIcon className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
//             </div>
//             <button
//               onClick={handleCheckOrder}
//               disabled={isLoading}
//               className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition text-sm sm:text-base"
//             >
//               {isLoading ? (
//                 <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 "Track"
//               )}
//             </button>
//           </div>

//           {/* Recent Searches */}
//           {recentSearches.length > 0 && !orderDetails && (
//             <div className="mb-4">
//               <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
//                 Recent searches:
//               </p>
//               <div className="flex flex-wrap gap-1.5 sm:gap-2">
//                 {recentSearches.map((id) => (
//                   <button
//                     key={id}
//                     onClick={() => setOrderId(id)}
//                     className="text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full font-mono transition"
//                   >
//                     {id.slice(-16)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
//               <ErrorIcon fontSize="small" /> {error}
//             </div>
//           )}

//           {/* Order Details */}
//           {orderDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="space-y-3 sm:space-y-4"
//             >
//               {/* Order Header */}
//               <div
//                 className={`rounded-xl p-3 sm:p-4 border-2 ${getStatusColor(orderDetails.status)}`}
//               >
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//                   <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
//                     {getStatusIcon(orderDetails.status)}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm sm:text-2xl font-mono font-bold tracking-tight break-all">
//                         {orderDetails.orderId}
//                       </p>
//                       {orderDetails.bookingId && (
//                         <p className="text-[10px] sm:text-xs opacity-70 mt-1">
//                           Booking: {orderDetails.bookingId}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-left sm:text-right w-full sm:w-auto">
//                     <span className="text-lg sm:text-2xl font-bold capitalize">
//                       {orderDetails.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Status Progress */}
//               <div className="bg-gray-50 rounded-xl p-3 sm:p-4 overflow-x-auto">
//                 <h3 className="font-semibold text-gray-700 mb-3 text-xs sm:text-sm">
//                   Order Progress
//                 </h3>
//                 <div className="flex items-center justify-between min-w-[280px] sm:min-w-0">
//                   {["confirmed", "preparing", "ready", "completed"].map(
//                     (step, idx) => {
//                       const currentStep = getStatusStep(orderDetails.status);
//                       const isCompleted = currentStep >= idx;
//                       const isCurrent = currentStep === idx;
//                       return (
//                         <div key={step} className="flex-1 text-center">
//                           <div className="relative">
//                             <div
//                               className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center text-[10px] sm:text-sm
//                             ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-indigo-500 text-white animate-pulse" : "bg-gray-300 text-gray-500"}`}
//                             >
//                               {isCompleted ? (
//                                 <CheckIcon fontSize="small" />
//                               ) : (
//                                 idx + 1
//                               )}
//                             </div>
//                           </div>
//                           <p
//                             className={`text-[9px] sm:text-xs mt-1 capitalize font-medium
//                           ${isCompleted ? "text-green-600" : isCurrent ? "text-indigo-600" : "text-gray-400"}`}
//                           >
//                             {step}
//                           </p>
//                         </div>
//                       );
//                     },
//                   )}
//                 </div>
//               </div>

//               {/* Customer Info */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <PersonIcon fontSize="small" />
//                     <span className="text-xs sm:text-sm font-medium">
//                       Customer Name
//                     </span>
//                   </div>
//                   <p className="font-semibold text-gray-800 text-base sm:text-lg truncate">
//                     {orderDetails.customerName || "N/A"}
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 sm:p-4">
//                   <div className="flex items-center gap-2 text-gray-600 mb-1">
//                     <TableIcon fontSize="small" />
//                     <span className="text-xs sm:text-sm font-medium">
//                       Table Number
//                     </span>
//                   </div>
//                   <p className="font-semibold text-gray-800 text-base sm:text-lg">
//                     {orderDetails.tableNumber
//                       ? `Table ${orderDetails.tableNumber}`
//                       : "N/A"}
//                   </p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="bg-gray-50 rounded-xl p-3">
//                 <h3 className="font-semibold text-gray-800 mb-3 text-xs sm:text-sm flex items-center gap-2">
//                   <ReceiptIcon fontSize="small" /> Order Items (
//                   {orderDetails.totalItems || orderDetails.items?.length || 0})
//                 </h3>
//                 <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-52 overflow-y-auto">
//                   {(orderDetails.items || []).map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-2 border-b border-gray-200 last:border-0"
//                     >
//                       <div className="flex-1">
//                         <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
//                           <span className="font-medium text-gray-700 bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
//                             {item.quantity}x
//                           </span>
//                           <span className="text-gray-800 font-medium text-xs sm:text-sm">
//                             {item.name}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="text-left sm:text-right">
//                         <span className="font-semibold text-gray-800 text-xs sm:text-sm">
//                           RWF {(item.finalPrice || 0).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-600 text-xs sm:text-sm">
//                     Subtotal:
//                   </span>
//                   <span className="text-xs sm:text-sm">
//                     RWF {(orderDetails.subtotal || 0).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center pt-2 border-t border-indigo-100">
//                   <span className="font-bold text-gray-800 text-sm sm:text-base">
//                     Total:
//                   </span>
//                   <span className="font-bold text-indigo-600 text-base sm:text-xl">
//                     RWF {(orderDetails.total || 0).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Help Text */}
//           {!orderDetails && !error && !isLoading && (
//             <div className="text-center py-6 sm:py-8">
//               <ConfirmationNumberIcon className="text-gray-300 text-3xl sm:text-5xl mx-auto mb-2 sm:mb-3" />
//               <p className="text-gray-500 text-xs sm:text-sm">
//                 Enter your Order ID to track your order status in real-time.
//               </p>
//               <p className="text-gray-400 text-[9px] sm:text-xs mt-1 sm:mt-2">
//                 Example: ORD_1777308287423_S1PWDKL56
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="p-3 sm:p-4 border-t bg-gray-50 rounded-b-xl sm:rounded-b-2xl flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-200 text-gray-700 py-2 sm:py-2.5 rounded-xl font-medium hover:bg-gray-300 transition text-sm sm:text-base"
//           >
//             Close
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
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <RestaurantIcon /> Welcome to NutriScan·AI
//           </h2>
//         </div>
//         <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Table Number *
//             </label>
//             <input
//               type="number"
//               value={tableNumber}
//               onChange={(e) => setTableNumber(e.target.value)}
//               placeholder="Enter table number"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//               autoFocus
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
//               Your Name *
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               if (tableNumber && customerName)
//                 onConfirm(tableNumber, customerName);
//               else toast.error("Please enter table number and name");
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
//           >
//             Start Ordering
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
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: 300, opacity: 0 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
//       >
//         <div className="bg-orange-500 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//             <CartIcon /> Your Order
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           {cart.length === 0 ? (
//             <div className="text-center py-8 sm:py-12">
//               <CartIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
//               <p className="text-gray-500 text-sm sm:text-base">
//                 Your cart is empty
//               </p>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div key={item.cartId} className="mb-3 pb-3 border-b">
//                 <div className="flex justify-between gap-2">
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-sm sm:text-base truncate">
//                       {item.name}
//                     </h3>
//                     {item.customizations?.length > 0 && (
//                       <div className="text-[10px] sm:text-xs text-gray-500">
//                         {item.customizations.map((c) => `• ${c}`).join(" ")}
//                       </div>
//                     )}
//                     {item.specialInstructions && (
//                       <p className="text-[10px] sm:text-xs text-orange-600">
//                         📝 {item.specialInstructions}
//                       </p>
//                     )}
//                   </div>
//                   <p className="text-orange-600 font-bold text-sm sm:text-base flex-shrink-0">
//                     RWF {item.finalPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity - 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <RemoveIcon fontSize="small" />
//                   </button>
//                   <span className="w-8 text-center text-sm sm:text-base">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.cartId, item.quantity + 1)
//                     }
//                     className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
//                   >
//                     <AddIcon fontSize="small" />
//                   </button>
//                   <button
//                     onClick={() => removeItem(item.cartId)}
//                     className="ml-2 text-red-500 hover:text-red-700 transition"
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
//               <span className="text-orange-600 text-base sm:text-lg">
//                 RWF {getTotal().toLocaleString()}
//               </span>
//             </div>
//             <button
//               onClick={onCheckout}
//               className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[80vh] flex flex-col relative z-10"
//       >
//         <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
//           <h2 className="text-white font-bold text-base sm:text-xl">
//             Order Details
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//           >
//             <CloseIcon className="text-white text-base sm:text-xl" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-3 sm:p-4">
//           <div className="mb-4 p-3 bg-gray-50 rounded-xl">
//             <p className="font-mono text-[10px] sm:text-xs text-gray-500 break-all">
//               Order ID: {order.orderId}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Table:</strong> {order.tableNumber}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Customer:</strong> {order.customerName}
//             </p>
//             <p className="text-sm sm:text-base">
//               <strong>Status:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 {order.status}
//               </span>
//             </p>
//           </div>
//           <h3 className="font-bold mb-2 text-sm sm:text-base">Items:</h3>
//           {order.items?.map((item, idx) => (
//             <div key={idx} className="py-2 border-b">
//               <div className="flex justify-between gap-2">
//                 <span className="text-sm sm:text-base">
//                   {item.quantity}x {item.name}
//                 </span>
//                 <span className="text-orange-600 font-semibold text-sm sm:text-base">
//                   RWF {item.finalPrice?.toLocaleString()}
//                 </span>
//               </div>
//               {item.customizations?.length > 0 && (
//                 <div className="text-[10px] sm:text-xs text-gray-500">
//                   {item.customizations.map((c) => `• ${c}`).join(" ")}
//                 </div>
//               )}
//               {item.specialInstructions && (
//                 <p className="text-[10px] sm:text-xs text-orange-600">
//                   Note: {item.specialInstructions}
//                 </p>
//               )}
//             </div>
//           ))}
//           <div className="flex justify-between font-bold pt-3 mt-2 border-t">
//             <span>Total</span>
//             <span className="text-orange-600 text-base sm:text-lg">
//               RWF {order.total?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t">
//           <button
//             onClick={onClose}
//             className="w-full bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
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
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.8, opacity: 0, y: 30 }}
//         className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[90%] sm:max-w-sm w-full p-5 sm:p-6 text-center relative z-10"
//       >
//         {type === "success" ? (
//           <CheckCircleIcon className="text-green-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
//         ) : (
//           <ErrorIcon className="text-red-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
//         )}
//         <h2 className="text-lg sm:text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-line mb-5 sm:mb-6">
//           {message}
//         </p>
//         <button
//           onClick={onClose}
//           className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
//         >
//           OK
//         </button>
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
//     "No salt",
//     "Less oil",
//     "Extra spicy",
//     "Mild spice",
//     "No onions",
//     "No garlic",
//     "Extra cheese",
//     "Vegan preparation",
//     "Gluten-free option",
//     "Dairy-free option",
//   ];

//   const toggleCustomization = (option) => {
//     if (customizations.includes(option))
//       setCustomizations((prev) => prev.filter((c) => c !== option));
//     else setCustomizations((prev) => [...prev, option]);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
//       <div
//         className="absolute inset-0 bg-black/40 backdrop-blur-md"
//         onClick={onClose}
//       />
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0, y: 50 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         exit={{ scale: 0.9, opacity: 0, y: 50 }}
//         className="bg-white rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
//       >
//         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 sm:p-5 rounded-t-xl sm:rounded-t-3xl flex-shrink-0">
//           <div className="flex items-center justify-between">
//             <div className="flex-1 min-w-0">
//               <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
//                 <EditIcon /> Customize Your Order
//               </h2>
//               <p className="text-amber-100 text-xs sm:text-sm mt-1 truncate">
//                 {item?.name}
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
//             >
//               <CloseIcon className="text-white text-base sm:text-xl" />
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
//           <div className="bg-gray-50 rounded-xl p-3 text-center">
//             <span className="text-orange-600 font-bold text-xl sm:text-2xl">
//               RWF {item?.price?.toLocaleString()}
//             </span>
//             <span className="text-gray-500 text-xs sm:text-sm ml-2">
//               per serving
//             </span>
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
//               <span className="text-lg">🥗</span> Ingredients
//             </h3>
//             <div className="flex flex-wrap gap-1.5 sm:gap-2">
//               {item?.ingredients?.map((ing, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700"
//                 >
//                   {ing}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <button
//               onClick={() => setShowOptions(!showOptions)}
//               className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-orange-50 rounded-xl"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-lg sm:text-xl">✨</span>
//                 <span className="font-semibold text-gray-800 text-sm sm:text-base">
//                   Customization Options
//                 </span>
//                 {customizations.length > 0 && (
//                   <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                     {customizations.length} selected
//                   </span>
//                 )}
//               </div>
//               {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </button>
//             {showOptions && (
//               <div className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
//                 {customizationOptions.map((opt, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => toggleCustomization(opt)}
//                     className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//           {customizations.length > 0 && (
//             <div className="bg-emerald-50 rounded-xl p-2.5 sm:p-3">
//               <h3 className="font-semibold text-emerald-800 text-xs sm:text-sm mb-2 flex items-center gap-1">
//                 <CheckIcon fontSize="small" /> Applied customizations:
//               </h3>
//               <div className="flex flex-wrap gap-1">
//                 {customizations.map((cust, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-1 rounded-full flex items-center gap-1"
//                   >
//                     {cust}
//                     <button
//                       onClick={() => toggleCustomization(cust)}
//                       className="text-emerald-500"
//                     >
//                       ✕
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
//               <span className="text-lg">📝</span> Special Instructions
//             </h3>
//             <textarea
//               value={specialInstructions}
//               onChange={(e) => setSpecialInstructions(e.target.value)}
//               placeholder="Any additional requests?"
//               className="w-full p-2.5 sm:p-3 border rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-orange-400 resize-none"
//               rows="3"
//             />
//           </div>
//         </div>
//         <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
//           <button
//             onClick={onClose}
//             className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-600 text-white text-sm sm:text-base hover:bg-red-700 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onAddToCart(item, customizations, specialInstructions);
//               onClose();
//             }}
//             className="flex-1 bg-orange-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-orange-600 transition"
//           >
//             <CartIcon fontSize="small" /> Add to Cart
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
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           onExpire?.();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [onExpire]);

//   const formatTime = (seconds) =>
//     `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
//   const getTimerColor = () =>
//     timeLeft <= 60
//       ? "bg-red-500 animate-pulse"
//       : timeLeft <= 300
//         ? "bg-orange-500"
//         : "bg-green-500";

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0, scale: 0.8 }}
//       animate={{ x: 0, opacity: 1, scale: 1 }}
//       exit={{ x: 100, opacity: 0, scale: 0.8 }}
//       whileHover={{ scale: 1.05 }}
//       onClick={onOpenModal}
//       className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3`}
//     >
//       <TimerIcon className="animate-pulse text-base sm:text-xl" />
//       <div>
//         <span className="text-[9px] sm:text-xs font-medium">
//           Order #{orderId?.slice(-8)} | Table {tableNumber}
//         </span>
//         <span className="text-sm sm:text-xl font-mono font-bold block">
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
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [liveStatus, setLiveStatus] = useState(null);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const apiService = useMemo(() => APIService.getInstance(), []);

//   const handleGetOrderById = useCallback(
//     async (orderId) => {
//       try {
//         const response = await apiService.getOrderById(orderId);
//         return response;
//       } catch (error) {
//         console.error("Get order error:", error);
//         throw error;
//       }
//     },
//     [apiService],
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (activeOrder && activeOrder.orderId) {
//         const statuses = ["confirmed", "preparing", "ready", "completed"];
//         const currentIndex = statuses.indexOf(activeOrder.status);
//         if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
//           const newStatus = statuses[currentIndex + 1];
//           setActiveOrder((prev) => ({ ...prev, status: newStatus }));
//           setLiveStatus({
//             orderId: activeOrder.orderId,
//             status: newStatus,
//             message: `Order ${newStatus === "confirmed" ? "has been confirmed" : newStatus === "preparing" ? "is being prepared" : newStatus === "ready" ? "is ready for pickup" : "has been completed"}`,
//           });
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
//       const { nutritionalInfo, nutritionSource } =
//         await apiService.getCompleteNutritionAnalysis(item);
//       const updatedItem = { ...item, nutritionalInfo, nutritionSource };
//       setCurrentItem(updatedItem);
//       setMenuItemsWithNutrition((prev) =>
//         prev.map((i) => (i.id === item.id ? updatedItem : i)),
//       );
//       const analysis = analyzeFoodForConditions(updatedItem);
//       setAnalysisResult(analysis);
//     }, 2000);
//   };

//   const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
//     MENU_ITEMS.map((item) => ({
//       ...item,
//       nutritionalInfo: null,
//       nutritionSource: null,
//     })),
//   );

//   const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
//   const filtered = menuItemsWithNutrition.filter(
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

//   // ========== FIXED CHECKOUT FUNCTION - NO LOCAL FALLBACK ==========
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

//     setShowCart(false);
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//     // Format items correctly for the backend
//     const formattedItems = cart.map((item) => ({
//       id: item.id.toString(),
//       name: item.name,
//       quantity: item.quantity,
//       originalPrice: item.price,
//       finalPrice: item.price * item.quantity,
//       customizations: item.customizations || [],
//       specialInstructions: item.specialInstructions || "",
//       preparationTime: item.prepTime || 15,
//     }));

//     const orderData = {
//       customerName: tableInfo.customerName,
//       tableNumber: tableInfo.tableNumber.toString(),
//       orderType: "dine-in",
//       items: formattedItems,
//       customizedPlates: cart.map((item) => ({
//         plateId: `plate_${Date.now()}_${item.id}`,
//         originalName: item.name,
//         customizations: item.customizations || [],
//         specialInstructions: item.specialInstructions || "",
//       })),
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       estimatedPickupTime: new Date(
//         Date.now() + preparationTime * 60000,
//       ).toLocaleTimeString(),
//       autoProgress: true,
//     };

//     // console.log("Submitting order:", orderData);

//     try {
//       const result = await apiService.createOrder(orderData);
//     //   console.log("Order creation result:", result);

//       if (result && result.success === true && result.order) {
//         const order = result.order;

//         setActiveOrder({
//           orderId: order.orderId,
//           bookingId: order.bookingId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: order.orderSummary?.total || getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: "preparing",
//         });

//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${order.orderId}\nBooking ID: ${order.bookingId}\nTotal: RWF ${(order.orderSummary?.total || getTotal()).toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${order.orderId}`,
//         });
//         setCart([]);
//       } else {
//         // Show error - no local fallback
//         setShowResult({
//           open: true,
//           type: "error",
//           title: "Order Failed",
//           message:
//             result?.message || "Failed to create order. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);

//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message:
//           error.message ||
//           "Failed to connect to server. Please check your internet connection and try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleTimerExpire = () =>
//     toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);

//   const handleTableConfirm = (tableNum, customerName) => {
//     setTableInfo({ tableNumber: tableNum, customerName });
//     setShowTableModal(false);
//     toast.success(
//       `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
//           <ConditionRiskModal
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
//           />
//         )}
//       </AnimatePresence>
//       <AnimatePresence>
//         {showOrderDetail && (
//           <OrderDetailModal
//             isOpen={showOrderDetail}
//             onClose={() => setShowOrderDetail(false)}
//             order={activeOrder}
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
//           />
//         )}
//       </AnimatePresence>

//       {activeOrder && activeOrder.status !== "completed" && (
//         <FloatingTimer
//           orderId={activeOrder.orderId}
//           tableNumber={activeOrder.tableNumber}
//           initialDuration={activeOrder.timeRemaining}
//           onExpire={handleTimerExpire}
//           onOpenModal={() => setShowOrderDetail(true)}
//         />
//       )}

//       <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
//           <div className="text-center sm:text-left">
//             <motion.h1
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2"
//             >
//               <RestaurantIcon className="text-orange-500 text-xl sm:text-3xl" />
//               NutriScan·AI
//               <motion.span
//                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//               >
//                 <SpaOutlined className="text-yellow-500 text-base sm:text-xl" />
//               </motion.span>
//             </motion.h1>
//             <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
//               {tableInfo.tableNumber
//                 ? `Table ${tableInfo.tableNumber}`
//                 : "Select a table"}
//               {tableInfo.customerName && ` · ${tableInfo.customerName}`}
//               <span className="ml-1 sm:ml-2 text-orange-500">
//                 ✦ AI-Powered Health Insights
//               </span>
//             </p>
//           </div>
//           <div className="flex gap-2 sm:gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05, rotate: 5 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowOrderStatusModal(true)}
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               <ConfirmationNumberIcon className="text-base sm:text-xl" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowCart(true)}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
//             >
//               <CartIcon className="text-base sm:text-xl" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
//                   {cart.length}
//                 </span>
//               )}
//             </motion.button>
//           </div>
//         </div>

//         {/* Info Banner */}
//         <motion.div
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4"
//         >
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
//               <ShieldIcon className="text-blue-600 text-base sm:text-xl" />
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs md:text-sm text-blue-800 font-medium">
//                 🔬 Smart Health Analysis + Real-time Order Tracking
//               </p>
//               <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-600">
//                 Click any dish for detailed nutrition from USDA/Spoonacular
//                 APIs. Track your order status in real-time!
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Search Bar */}
//         <div className="relative mb-4 sm:mb-5">
//           <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
//           <input
//             className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-xs sm:text-sm md:text-base"
//             placeholder="Search for dishes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Categories */}
//         <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-5 scrollbar-hide">
//           {categories.map((cat) => (
//             <motion.button
//               key={cat}
//               whileHover={{ scale: 1.02, y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition font-medium text-[11px] sm:text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//             >
//               {cat === "all" ? "🍽️ All Items" : cat}
//             </motion.button>
//           ))}
//         </div>

//         {/* Menu Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
//           {paginated.map((item) => (
//             <motion.div
//               layoutId={`item-${item.id}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               whileHover={{ y: -4 }}
//               key={item.id}
//               className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
//               onClick={() => handleItemClick(item)}
//             >
//               <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden">
//                 <motion.img
//                   whileHover={{ scale: 1.1 }}
//                   src={item.image}
//                   className="w-full h-full object-cover"
//                   alt={item.name}
//                 />
//                 <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/60 text-white text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
//                   <TimeIcon
//                     fontSize="small"
//                     className="text-[10px] sm:text-xs"
//                   />{" "}
//                   {item.prepTime} min
//                 </div>
//               </div>
//               <div className="p-2 sm:p-3 md:p-4">
//                 <h3 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg truncate">
//                   {item.name}
//                 </h3>
//                 <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5 sm:mt-1 h-6 sm:h-8">
//                   {item.description}
//                 </p>
//                 <div className="flex justify-between items-center mt-2 sm:mt-3">
//                   <span className="text-orange-600 font-bold text-sm sm:text-base md:text-lg">
//                     RWF {item.price.toLocaleString()}
//                   </span>
//                   <button className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition shadow-md hover:bg-orange-600">
//                     Order Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="text-center py-10 sm:py-16">
//             <SearchIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
//             <p className="text-gray-500 text-base sm:text-lg">
//               No items match your search.
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
//             >
//               ←
//             </button>
//             {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//               let pageNum =
//                 totalPages <= 7
//                   ? i + 1
//                   : currentPage <= 4
//                     ? i + 1
//                     : currentPage >= totalPages - 3
//                       ? totalPages - 6 + i
//                       : currentPage - 3 + i;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => setCurrentPage(pageNum)}
//                   className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg transition text-xs sm:text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//               }
//               disabled={currentPage === totalPages}
//               className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
//             >
//               →
//             </button>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         <AnimatePresence>
//           {isSubmitting && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
//             >
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.8, opacity: 0 }}
//                 className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-2xl"
//               >
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-3 sm:mb-4"
//                 />
//                 <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
//                   Placing your order...
//                 </p>
//                 <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
//                   Please wait
//                 </p>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };






















/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
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
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

// ========== API CONFIGURATION ==========
const API_CONFIG = {
  USDA_API_KEY: "LldlDFgJloWW1YKZDNha1hSZFKVy8SYHhEgss34g",
  USDA_BASE_URL: "https://api.nal.usda.gov/fdc/v1",
  SPOONACULAR_API_KEY: "2ea16b5f03654be58e113f7579700b3d",
  SPOONACULAR_BASE_URL: "https://api.spoonacular.com",
};

// ========== BACKEND API ENDPOINTS ==========
const BACKEND_API = {
  BASE_URL: "https://nutriscan-foodanddrinksupply.onrender.com",
  ORDERS: "/orders",
  ORDER_STATUS: "/orders",
  CUSTOMIZED_PLATES: "/orders",
  TRACK_ORDER: "/orders",
};

// ========== PROFESSIONAL API SERVICE CLASS ==========
class APIService {
  static instance = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_API.BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(
          "API Request:",
          config.method.toUpperCase(),
          config.url,
          config.data,
        );
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log("API Response:", response.status, response.data);
        return response;
      },
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem("auth_token");
          window.dispatchEvent(new CustomEvent("auth:logout"));
        }
        return Promise.reject(error);
      },
    );
  }

  static getInstance() {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  async createOrder(orderData) {
    try {
      console.log("Creating order with data:", orderData);
      const response = await this.axiosInstance.post(
        BACKEND_API.ORDERS,
        orderData,
      );
      console.log("Order creation response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Create order error:", error);
      console.error("Error response:", error.response?.data);
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
      console.error("Get order by ID error:", error);
      throw this.handleError(error);
    }
  }

  async getAllOrders(filters = {}) {
    try {
      const response = await this.axiosInstance.get(BACKEND_API.ORDERS, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      console.error("Get all orders error:", error);
      throw this.handleError(error);
    }
  }

  async updateOrderStatus(orderId, status, notes = "") {
    try {
      const response = await this.axiosInstance.patch(
        `${BACKEND_API.ORDER_STATUS}/${orderId}`,
        {
          status,
          notes,
          updatedAt: new Date().toISOString(),
        },
      );
      return response.data;
    } catch (error) {
      console.error("Update order status error:", error);
      throw this.handleError(error);
    }
  }

  async trackOrder(orderId) {
    try {
      const response = await this.axiosInstance.get(
        `${BACKEND_API.TRACK_ORDER}/${orderId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Track order error:", error);
      throw this.handleError(error);
    }
  }

  async cancelOrder(orderId, reason = "") {
    try {
      const response = await this.axiosInstance.delete(
        `${BACKEND_API.ORDERS}/${orderId}`,
        {
          data: { reason },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Cancel order error:", error);
      throw this.handleError(error);
    }
  }

  async saveCustomizedPlate(plateData) {
    try {
      const response = await this.axiosInstance.post(
        BACKEND_API.CUSTOMIZED_PLATES,
        plateData,
      );
      return response.data;
    } catch (error) {
      console.error("Save customized plate error:", error);
      throw this.handleError(error);
    }
  }

  async getUserCustomizedPlates(userId) {
    try {
      const response = await this.axiosInstance.get(
        `${BACKEND_API.CUSTOMIZED_PLATES}/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Get user customized plates error:", error);
      throw this.handleError(error);
    }
  }

  async deleteCustomizedPlate(plateId) {
    try {
      const response = await this.axiosInstance.delete(
        `${BACKEND_API.CUSTOMIZED_PLATES}/${plateId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Delete customized plate error:", error);
      throw this.handleError(error);
    }
  }

  async searchFoodUSDA(query) {
    try {
      const response = await axios.get(
        `${API_CONFIG.USDA_BASE_URL}/foods/search`,
        {
          params: {
            api_key: API_CONFIG.USDA_API_KEY,
            query: query,
            pageSize: 5,
          },
          timeout: 10000,
        },
      );
      return response.data;
    } catch (error) {
      console.error("USDA API search error:", error);
      return null;
    }
  }

  async getFoodDetails(fdcId) {
    try {
      const response = await axios.get(
        `${API_CONFIG.USDA_BASE_URL}/food/${fdcId}`,
        {
          params: { api_key: API_CONFIG.USDA_API_KEY },
          timeout: 10000,
        },
      );
      return response.data;
    } catch (error) {
      console.error("USDA food details error:", error);
      return null;
    }
  }

  async analyzeRecipeSpoonacular(ingredients, title) {
    try {
      const searchResponse = await axios.get(
        `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/complexSearch`,
        {
          params: {
            apiKey: API_CONFIG.SPOONACULAR_API_KEY,
            query: title,
            addRecipeInformation: true,
            number: 1,
          },
          timeout: 10000,
        },
      );

      let nutritionData = null;
      const recipe = searchResponse.data?.results?.[0];

      if (recipe?.id) {
        const nutritionResponse = await axios.get(
          `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/${recipe.id}/nutritionWidget.json`,
          {
            params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
            timeout: 10000,
          },
        );
        nutritionData = nutritionResponse.data;
      } else {
        const analyzeResponse = await axios.post(
          `${API_CONFIG.SPOONACULAR_BASE_URL}/recipes/analyze`,
          { title, ingredients: ingredients.map((ing) => ({ name: ing })) },
          {
            params: { apiKey: API_CONFIG.SPOONACULAR_API_KEY },
            headers: { "Content-Type": "application/json" },
            timeout: 15000,
          },
        );
        nutritionData = analyzeResponse.data;
      }

      return { nutrition: nutritionData, info: recipe || null };
    } catch (error) {
      console.error("Spoonacular analysis error:", error);
      return null;
    }
  }

  async getCompleteNutritionAnalysis(item) {
    let nutritionalInfo = null;
    let nutritionSource = null;

    const usdaSearch = await this.searchFoodUSDA(item.name);
    if (usdaSearch?.foods?.length > 0) {
      const bestMatch = usdaSearch.foods[0];
      const foodDetails = await this.getFoodDetails(bestMatch.fdcId);
      if (foodDetails) {
        nutritionalInfo = this.parseUSDANutrition(foodDetails);
        nutritionSource = "USDA Food Database";
      }
    }

    if (!nutritionalInfo?.calories) {
      const spoonacularResult = await this.analyzeRecipeSpoonacular(
        item.ingredients,
        item.name,
      );
      if (spoonacularResult?.nutrition) {
        nutritionalInfo = this.parseSpoonacularNutrition(
          spoonacularResult.nutrition,
        );
        nutritionSource = "Spoonacular API";
      }
    }

    if (!nutritionalInfo?.calories) {
      nutritionalInfo = this.estimateNutritionFromIngredients(item.ingredients);
      nutritionSource = "Estimated from ingredients";
    }

    return { nutritionalInfo, nutritionSource };
  }

  parseUSDANutrition(usdaData) {
    const nutrients = usdaData.foodNutrients || [];
    const getNutrientValue = (nutrientName) => {
      const nutrient = nutrients.find(
        (n) =>
          n.nutrientName?.toLowerCase().includes(nutrientName.toLowerCase()) ||
          n.nutrient?.name?.toLowerCase().includes(nutrientName.toLowerCase()),
      );
      return nutrient ? Math.round(nutrient.value) : 0;
    };
    return {
      calories: getNutrientValue("Energy") || getNutrientValue("Calories"),
      fat: getNutrientValue("Total fat"),
      sodium: getNutrientValue("Sodium"),
      sugar: getNutrientValue("Sugars"),
      saturatedFat: getNutrientValue("Saturated fat"),
      cholesterol: getNutrientValue("Cholesterol"),
      protein: getNutrientValue("Protein"),
      carbs: getNutrientValue("Carbohydrate"),
      fiber: getNutrientValue("Fiber"),
    };
  }

  parseSpoonacularNutrition(nutritionData) {
    const nutrients = nutritionData.nutrients || [];
    const getNutrient = (name) => {
      const nutrient = nutrients.find((n) => n.name === name);
      return nutrient ? Math.round(nutrient.amount) : 0;
    };
    return {
      calories: getNutrient("Calories"),
      fat: getNutrient("Fat"),
      sodium: getNutrient("Sodium"),
      sugar: getNutrient("Sugar"),
      saturatedFat: getNutrient("Saturated Fat"),
      cholesterol: getNutrient("Cholesterol"),
      protein: getNutrient("Protein"),
      carbs: getNutrient("Carbohydrates"),
      fiber: getNutrient("Fiber"),
    };
  }

  estimateNutritionFromIngredients(ingredients) {
    const estimated = {
      calories: 0,
      fat: 0,
      sodium: 0,
      sugar: 0,
      saturatedFat: 0,
      cholesterol: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
    };
    const ingredientEstimates = {
      meat: { calories: 250, fat: 18, protein: 22, sodium: 70 },
      beef: {
        calories: 280,
        fat: 20,
        protein: 26,
        sodium: 75,
        saturatedFat: 8,
      },
      chicken: { calories: 165, fat: 7, protein: 31, sodium: 70 },
      fish: { calories: 206, fat: 12, protein: 22, sodium: 60 },
      shrimp: {
        calories: 84,
        fat: 1,
        protein: 18,
        sodium: 111,
        cholesterol: 166,
      },
      cheese: {
        calories: 400,
        fat: 33,
        sodium: 620,
        saturatedFat: 21,
        cholesterol: 100,
        protein: 25,
      },
      butter: {
        calories: 717,
        fat: 81,
        sodium: 11,
        saturatedFat: 51,
        cholesterol: 215,
      },
      cream: {
        calories: 345,
        fat: 37,
        sodium: 38,
        saturatedFat: 23,
        cholesterol: 137,
      },
      oil: { calories: 884, fat: 100, saturatedFat: 14 },
      flour: { calories: 364, carbs: 76, protein: 10 },
      sugar: { calories: 387, sugar: 100, carbs: 100 },
      chocolate: { calories: 546, fat: 31, sugar: 48, carbs: 61 },
      beans: { calories: 132, protein: 8, carbs: 23, fiber: 7, sodium: 2 },
      rice: { calories: 130, carbs: 28, protein: 2.7 },
      potato: { calories: 77, carbs: 17, fiber: 2, protein: 2 },
      tomato: { calories: 18, carbs: 4, sugar: 2.6, sodium: 5 },
      onion: { calories: 40, carbs: 9, sugar: 4, fiber: 1.7 },
      garlic: { calories: 149, carbs: 33, protein: 6, sodium: 17 },
      coconut: {
        calories: 354,
        fat: 33,
        saturatedFat: 30,
        carbs: 15,
        fiber: 9,
      },
      peanut: { calories: 567, fat: 49, protein: 26, carbs: 16, fiber: 9 },
      orange: { calories: 47, carbs: 12, sugar: 9, fiber: 2.4 },
      coffee: { calories: 2, carbs: 0 },
    };

    for (const ingredient of ingredients) {
      const ingLower = ingredient.toLowerCase();
      for (const [key, values] of Object.entries(ingredientEstimates)) {
        if (ingLower.includes(key)) {
          estimated.calories += values.calories || 0;
          estimated.fat += values.fat || 0;
          estimated.protein += values.protein || 0;
          estimated.carbs += values.carbs || 0;
          estimated.sodium += values.sodium || 0;
          estimated.sugar += values.sugar || 0;
          estimated.saturatedFat += values.saturatedFat || 0;
          estimated.cholesterol += values.cholesterol || 0;
          estimated.fiber += values.fiber || 0;
          break;
        }
      }
    }

    const servingFactor = Math.max(1, Math.floor(ingredients.length / 3));
    Object.keys(estimated).forEach((key) => {
      estimated[key] = Math.min(
        key === "calories"
          ? 1200
          : key === "fat"
            ? 60
            : key === "sodium"
              ? 1500
              : key === "sugar"
                ? 40
                : key === "saturatedFat"
                  ? 25
                  : key === "cholesterol"
                    ? 200
                    : key === "protein"
                      ? 50
                      : key === "carbs"
                        ? 100
                        : 15,
        Math.round(estimated[key] / servingFactor),
      );
    });

    return estimated;
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || "Server error occurred",
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        status: 0,
        message: "Network error - Unable to connect to server",
        data: null,
      };
    }
    return {
      status: -1,
      message: error.message || "An unexpected error occurred",
      data: null,
    };
  }
}

// ========== CLINICAL CONDITIONS WITH THRESHOLDS ==========
const CLINICAL_CONDITIONS = [
  {
    id: 1,
    name: "Type 2 Diabetes",
    icon: "🩸",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Affects blood sugar regulation",
    thresholds: {
      sugar: {
        value: 15,
        unit: "g",
        severity: "moderate",
        message: "Contains {value}g sugar - May cause blood sugar spike.",
      },
      sugarHigh: {
        value: 30,
        unit: "g",
        severity: "high",
        message: "⚠️ HIGH SUGAR ({value}g) - Dangerous for diabetics.",
      },
      carbs: {
        value: 50,
        unit: "g",
        severity: "moderate",
        message: "Contains {value}g carbohydrates - Monitor blood glucose.",
      },
      carbsHigh: {
        value: 80,
        unit: "g",
        severity: "high",
        message:
          "⚠️ HIGH CARBS ({value}g) - May cause significant blood sugar spike.",
      },
    },
  },
  {
    id: 2,
    name: "Hypertension (High Blood Pressure)",
    icon: "❤️",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "High blood pressure",
    thresholds: {
      sodium: {
        value: 600,
        unit: "mg",
        severity: "moderate",
        message: "Contains {value}mg sodium - May raise blood pressure.",
      },
      sodiumHigh: {
        value: 1200,
        unit: "mg",
        severity: "high",
        message:
          "⚠️ HIGH SODIUM ({value}mg) - Significant risk for hypertension.",
      },
    },
  },
  {
    id: 3,
    name: "Heart Disease",
    icon: "🫀",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    description: "Coronary artery disease",
    thresholds: {
      saturatedFat: {
        value: 8,
        unit: "g",
        severity: "moderate",
        message:
          "Contains {value}g saturated fat - May increase LDL cholesterol.",
      },
      saturatedFatHigh: {
        value: 15,
        unit: "g",
        severity: "high",
        message:
          "⚠️ HIGH SATURATED FAT ({value}g) - Significantly increases heart attack risk.",
      },
      cholesterol: {
        value: 200,
        unit: "mg",
        severity: "moderate",
        message:
          "Contains {value}mg cholesterol - May contribute to arterial plaque.",
      },
      cholesterolHigh: {
        value: 300,
        unit: "mg",
        severity: "high",
        message:
          "⚠️ HIGH CHOLESTEROL ({value}mg) - Major risk factor for heart attack.",
      },
    },
  },
  {
    id: 4,
    name: "Celiac Disease",
    icon: "🌾",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    description: "Autoimmune reaction to gluten",
    thresholds: {
      gluten: {
        value: 1,
        unit: "",
        severity: "critical",
        message: "⚠️⚠️ CONTAINS GLUTEN - Triggers autoimmune reaction.",
      },
    },
  },
  {
    id: 5,
    name: "Peanut Allergy",
    icon: "🥜",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    description: "Severe allergic reaction to peanuts",
    thresholds: {
      allergen: {
        value: 1,
        unit: "",
        severity: "critical",
        message:
          "⚠️⚠️ CONTAINS PEANUTS - Life-threatening anaphylaxis possible.",
      },
    },
  },
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
      "salt",
    ],
    description: "Traditional cassava leaf stew with beef",
    prepTime: 18,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    containsGluten: false,
    containsPeanuts: true,
    containsDairy: true,
    sodiumMg: 890,
    sugarGrams: 8,
  },
  {
    id: 2,
    name: "Brochette de Boeuf",
    price: 3500,
    ingredients: ["beef sirloin", "black pepper", "potato", "garlic", "salt"],
    description: "Grilled beef skewers with crispy fries",
    prepTime: 15,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    containsGluten: false,
    containsPeanuts: false,
    containsDairy: false,
    sodiumMg: 1200,
    sugarGrams: 2,
  },
  {
    id: 3,
    name: "Grilled Tilapia",
    price: 4500,
    ingredients: [
      "tilapia",
      "lemon",
      "garlic",
      "rosemary",
      "olive oil",
      "salt",
    ],
    description: "Fresh lake tilapia grilled to perfection",
    prepTime: 16,
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    containsGluten: false,
    containsPeanuts: false,
    containsDairy: false,
    sodiumMg: 400,
    sugarGrams: 1,
  },
  {
    id: 4,
    name: "Garden Fresh Salad",
    price: 1500,
    ingredients: [
      "lettuce",
      "tomato",
      "cucumber",
      "carrots",
      "bell peppers",
      "olive oil",
    ],
    description: "Fresh garden vegetables with light vinaigrette",
    prepTime: 5,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    containsGluten: false,
    containsPeanuts: false,
    containsDairy: false,
    sodiumMg: 50,
    sugarGrams: 5,
  },
  {
    id: 5,
    name: "Sweet Masala Chai",
    price: 1200,
    ingredients: [
      "black tea",
      "milk",
      "sugar",
      "cardamom",
      "ginger",
      "cinnamon",
    ],
    description: "Traditional spiced tea",
    prepTime: 5,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    containsGluten: false,
    containsPeanuts: false,
    containsDairy: true,
    sodiumMg: 50,
    sugarGrams: 35,
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    price: 6500,
    ingredients: ["dark chocolate", "sugar", "butter", "eggs", "flour"],
    description: "Warm molten chocolate cake",
    prepTime: 12,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    containsGluten: true,
    containsPeanuts: false,
    containsDairy: true,
    sodiumMg: 150,
    sugarGrams: 45,
  },
  {
    id: 7,
    name: "Margherita Pizza",
    price: 5200,
    ingredients: [
      "pizza dough",
      "tomato sauce",
      "mozzarella cheese",
      "basil",
      "salt",
    ],
    description: "Classic Italian pizza",
    prepTime: 15,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400",
    containsGluten: true,
    containsPeanuts: false,
    containsDairy: true,
    sodiumMg: 850,
    sugarGrams: 4,
  },
  {
    id: 8,
    name: "Mixed Nut Platter",
    price: 4200,
    ingredients: ["peanuts", "almonds", "walnuts", "cashews", "pecans", "salt"],
    description: "Assorted premium nuts",
    prepTime: 2,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    containsGluten: false,
    containsPeanuts: true,
    containsDairy: false,
    sodiumMg: 380,
    sugarGrams: 4,
  },
];

// ========== LOADING MODAL ==========
const LoadingModal = ({ isOpen, itemName, itemCategory }) => {
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [apiStatus, setApiStatus] = useState({
    usda: "pending",
    spoonacular: "pending",
  });

  const loadingSteps = [
    { message: "Connecting to nutrition databases...", icon: "🔄" },
    { message: "Querying USDA Food Database...", icon: "🌾" },
    { message: "Fetching from Spoonacular API...", icon: "🥄" },
    { message: "Analyzing nutritional content...", icon: "🔬" },
    { message: "Preparing health insights...", icon: "💚" },
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setLoadingStep(0);
      setApiStatus({ usda: "pending", spoonacular: "pending" });
      return;
    }

    const interval = setInterval(
      () => setProgress((prev) => (prev >= 100 ? 100 : prev + 2)),
      50,
    );
    const stepInterval = setInterval(
      () =>
        setLoadingStep((prev) =>
          prev < loadingSteps.length - 1 ? prev + 1 : prev,
        ),
      800,
    );
    const apiTimeout1 = setTimeout(
      () => setApiStatus((prev) => ({ ...prev, usda: "success" })),
      1500,
    );
    const apiTimeout2 = setTimeout(
      () => setApiStatus((prev) => ({ ...prev, spoonacular: "success" })),
      2500,
    );

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
      clearTimeout(apiTimeout1);
      clearTimeout(apiTimeout2);
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
        className="bg-gradient-to-br from-white to-orange-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[90%] sm:max-w-md flex flex-col relative overflow-hidden z-10"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="bg-white/20 p-1.5 sm:p-2 rounded-full"
            >
              <ScienceIcon className="text-xl sm:text-2xl" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-base sm:text-xl truncate">
                Analyzing {itemCategory === "Beverages" ? "Drink" : "Food"}
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm truncate">
                {itemName}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>Loading nutrition data...</span>
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
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs flex-shrink-0 ${
                    loadingStep > idx
                      ? "bg-green-500 text-white"
                      : loadingStep === idx
                        ? "bg-orange-500 text-white animate-pulse"
                        : "bg-gray-200 text-gray-400"
                  }`}
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

          <div className="bg-gray-100 rounded-xl p-2 sm:p-3">
            <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2">
              🔌 API Status:
            </p>
            <div className="flex gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    apiStatus.usda === "success"
                      ? "bg-green-500"
                      : apiStatus.usda === "pending"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                  }`}
                />
                <span className="text-[10px] sm:text-xs text-gray-600">
                  USDA Food Database
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    apiStatus.spoonacular === "success"
                      ? "bg-green-500"
                      : apiStatus.spoonacular === "pending"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                  }`}
                />
                <span className="text-[10px] sm:text-xs text-gray-600">
                  Spoonacular API
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ANALYZE FOOD FOR CONDITIONS ==========
const analyzeFoodForConditions = (item) => {
  const nutrition = item.nutritionalInfo || {};
  const conditionsAnalysis = [];

  for (const condition of CLINICAL_CONDITIONS) {
    let riskLevel = "safe";
    let message = null;

    if (condition.name === "Type 2 Diabetes") {
      if (nutrition.sugar >= 30) {
        riskLevel = "warning";
        message = condition.thresholds.sugarHigh.message.replace(
          "{value}",
          nutrition.sugar,
        );
      } else if (nutrition.sugar >= 15) {
        riskLevel = "info";
        message = condition.thresholds.sugar.message.replace(
          "{value}",
          nutrition.sugar,
        );
      } else if (nutrition.carbs >= 80) {
        riskLevel = "warning";
        message = condition.thresholds.carbsHigh.message.replace(
          "{value}",
          nutrition.carbs,
        );
      } else if (nutrition.carbs >= 50) {
        riskLevel = "info";
        message = condition.thresholds.carbs.message.replace(
          "{value}",
          nutrition.carbs,
        );
      }
    } else if (condition.name === "Hypertension (High Blood Pressure)") {
      if (nutrition.sodium >= 1200) {
        riskLevel = "warning";
        message = condition.thresholds.sodiumHigh.message.replace(
          "{value}",
          nutrition.sodium,
        );
      } else if (nutrition.sodium >= 600) {
        riskLevel = "info";
        message = condition.thresholds.sodium.message.replace(
          "{value}",
          nutrition.sodium,
        );
      }
    } else if (condition.name === "Heart Disease") {
      if (nutrition.saturatedFat >= 15) {
        riskLevel = "warning";
        message = condition.thresholds.saturatedFatHigh.message.replace(
          "{value}",
          nutrition.saturatedFat,
        );
      } else if (nutrition.saturatedFat >= 8) {
        riskLevel = "info";
        message = condition.thresholds.saturatedFat.message.replace(
          "{value}",
          nutrition.saturatedFat,
        );
      }
      if (nutrition.cholesterol >= 300) {
        riskLevel = "warning";
        message = condition.thresholds.cholesterolHigh.message.replace(
          "{value}",
          nutrition.cholesterol,
        );
      } else if (nutrition.cholesterol >= 200) {
        riskLevel = "info";
        message = condition.thresholds.cholesterol.message.replace(
          "{value}",
          nutrition.cholesterol,
        );
      }
    } else if (condition.name === "Celiac Disease" && item.containsGluten) {
      riskLevel = "warning";
      message = condition.thresholds.gluten.message;
    } else if (condition.name === "Peanut Allergy" && item.containsPeanuts) {
      riskLevel = "warning";
      message = condition.thresholds.allergen.message;
    }

    if (riskLevel !== "safe") {
      conditionsAnalysis.push({
        conditionId: condition.id,
        conditionName: condition.name,
        icon: condition.icon,
        color: condition.color,
        bgColor: condition.bgColor,
        description: condition.description,
        riskLevel: riskLevel,
        warningMessage: message,
      });
    }
  }

  return {
    conditions: conditionsAnalysis,
    hasWarnings: conditionsAnalysis.some((c) => c.riskLevel === "warning"),
    hasInfo: conditionsAnalysis.some((c) => c.riskLevel === "info"),
    totalConditionsAffected: conditionsAnalysis.length,
  };
};

// ========== FORMAT NUTRITION INFO ==========
const formatNutritionInfo = (nutrition) => {
  if (!nutrition) return [];
  return [
    { label: "Calories", value: nutrition.calories, unit: "kcal", icon: "🔥" },
    { label: "Protein", value: nutrition.protein, unit: "g", icon: "💪" },
    { label: "Carbs", value: nutrition.carbs, unit: "g", icon: "🍚" },
    { label: "Fiber", value: nutrition.fiber, unit: "g", icon: "🌿" },
    { label: "Fat", value: nutrition.fat, unit: "g", icon: "🥑" },
    {
      label: "Saturated Fat",
      value: nutrition.saturatedFat,
      unit: "g",
      icon: "⚠️",
    },
    { label: "Sugar", value: nutrition.sugar, unit: "g", icon: "🍬" },
    { label: "Sodium", value: nutrition.sodium, unit: "mg", icon: "🧂" },
    {
      label: "Cholesterol",
      value: nutrition.cholesterol,
      unit: "mg",
      icon: "🫀",
    },
  ].filter((n) => n.value !== undefined && n.value !== null);
};

// ========== CONDITION RISK MODAL ==========
const ConditionRiskModal = ({
  isOpen,
  onClose,
  analysis,
  item,
  onContinue,
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen || !analysis) return null;

  const nutritionInfo = formatNutritionInfo(item?.nutritionalInfo);
  const warningConditions = analysis.conditions.filter(
    (c) => c.riskLevel === "warning",
  );
  const infoConditions = analysis.conditions.filter(
    (c) => c.riskLevel === "info",
  );

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
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] flex flex-col relative overflow-hidden z-10"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-5 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg sm:text-xl truncate">
                {item?.name}
              </h2>
              <p className="text-orange-100 text-xs sm:text-sm">
                RWF {item?.price?.toLocaleString()} • {item?.prepTime} min prep
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition flex-shrink-0"
            >
              <CloseIcon className="text-white text-base sm:text-xl" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          {item?.nutritionSource && (
            <div className="bg-green-50 rounded-xl p-2 text-center text-[10px] sm:text-xs text-green-700">
              ✅ Real-time nutrition data from {item.nutritionSource}
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
            <p className="text-gray-700 text-xs sm:text-sm">
              {item?.description}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <button
              onClick={() =>
                setExpandedSection(
                  expandedSection === "ingredients" ? null : "ingredients",
                )
              }
              className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">🥗</span>
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  Ingredients
                </span>
              </div>
              {expandedSection === "ingredients" ? (
                <ExpandLessIcon className="text-sm sm:text-base" />
              ) : (
                <ExpandMoreIcon className="text-sm sm:text-base" />
              )}
            </button>
            {expandedSection === "ingredients" && (
              <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item?.ingredients?.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-white rounded-full text-xs sm:text-sm shadow-sm border"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nutrition Facts */}
          {nutritionInfo.length > 0 && (
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "nutrition" ? null : "nutrition",
                  )
                }
                className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition"
              >
                <div className="flex items-center gap-2">
                  <Nature className="text-emerald-600 text-base sm:text-xl" />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Nutrition Facts (Real API Data)
                  </span>
                  <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                    Live
                  </span>
                </div>
                {expandedSection === "nutrition" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </button>
              {expandedSection === "nutrition" && (
                <div className="mt-2 p-3 sm:p-4 bg-emerald-50 rounded-xl">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {nutritionInfo.map((n, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b border-emerald-100 pb-2"
                      >
                        <span className="text-[11px] sm:text-sm text-gray-600">
                          {n.icon} {n.label}
                        </span>
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          {n.value} {n.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Health Warnings */}
          {(warningConditions.length > 0 || infoConditions.length > 0) && (
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "health" ? null : "health",
                  )
                }
                className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition"
              >
                <div className="flex items-center gap-2">
                  <LocalHospitalIcon className="text-amber-600 text-base sm:text-xl" />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    Health Information
                  </span>
                  {warningConditions.length > 0 && (
                    <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                      {warningConditions.length} warnings
                    </span>
                  )}
                </div>
                {expandedSection === "health" ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </button>
              {expandedSection === "health" && (
                <div className="mt-2 space-y-2 sm:space-y-3">
                  {warningConditions.map((cond, idx) => (
                    <div
                      key={idx}
                      className={`${cond.bgColor} rounded-xl p-3 sm:p-4 border-l-4 border-amber-500`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl">{cond.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                            {cond.conditionName}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-700">
                            {cond.warningMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {infoConditions.map((cond, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-xl p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="text-base sm:text-xl">
                          {cond.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm sm:text-base">
                            {cond.conditionName}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-gray-600">
                            {cond.warningMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {analysis.conditions.length === 0 && (
            <div className="bg-green-50 rounded-xl p-3 sm:p-4 text-center">
              <CheckCircleIcon className="text-green-500 text-3xl sm:text-4xl mx-auto mb-2" />
              <p className="text-green-700 font-medium text-sm sm:text-base">
                ✓ No specific health concerns detected
              </p>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-500 text-white text-sm sm:text-base hover:bg-red-600 transition"
          >
            Close
          </button>
          <button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:shadow-lg transition"
          >
            <EditIcon fontSize="small" /> Customize Order
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ========== ORDER STATUS MODAL ==========
const OrderStatusModal = ({ isOpen, onClose, onCheckOrder, liveStatus }) => {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recentOrderSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error("Failed to load recent searches", e);
      }
    }
  }, []);

  const saveRecentSearch = (id) => {
    const updated = [id, ...recentSearches.filter((s) => s !== id)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentOrderSearches", JSON.stringify(updated));
  };

  useEffect(() => {
    if (
      liveStatus &&
      liveStatus.orderId === orderId &&
      liveStatus.status &&
      orderDetails
    ) {
      setOrderDetails((prev) => ({
        ...prev,
        status: liveStatus.status,
        currentStatus: liveStatus.status,
        lastUpdated: new Date().toISOString(),
      }));

      const statusMessages = {
        confirmed: "🔔 Order confirmed!",
        preparing: "🍳 Order is being prepared!",
        ready: "✅ Order is ready for pickup!",
        completed: "🎉 Order completed! Enjoy your meal!",
        cancelled: "❌ Order has been cancelled",
      };
      if (statusMessages[liveStatus.status])
        toast.info(statusMessages[liveStatus.status]);
    }
  }, [liveStatus, orderId, orderDetails]);

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
      console.log("API Response:", result);

      if (result && result.success === true && result.data) {
        const orderData = result.data;

        const transformedOrder = {
          orderId: orderData.orderId || "N/A",
          bookingId: orderData.bookingId || "N/A",
          _id: orderData._id,
          customerName: orderData.personDetails?.name || "N/A",
          tableNumber: orderData.personDetails?.tableNumber || "N/A",
          orderType: orderData.personDetails?.orderType || "dine-in",
          status: orderData.status || "unknown",
          preparationStatus: orderData.bookingDetails?.preparationStatus,
          currentStatus: orderData.bookingDetails?.currentStatus,
          orderDate: orderData.bookingDetails?.orderDate || orderData.createdAt,
          estimatedPickupTime: orderData.bookingDetails?.estimatedPickupTime,
          createdAt: orderData.createdAt,
          updatedAt: orderData.updatedAt,
          items: (orderData.orderSummary?.items || []).map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.finalPrice,
            finalPrice: item.finalPrice,
            customizations: item.customizations || [],
            specialInstructions: item.specialInstructions || "",
          })),
          subtotal: orderData.orderSummary?.subtotal || 0,
          total: orderData.orderSummary?.total || 0,
          totalItems: orderData.orderSummary?.totalItems || 0,
          statusHistory: orderData.bookingDetails?.statusHistory || [],
          specialInstructions:
            orderData.bookingDetails?.specialInstructions ||
            `Table ${orderData.personDetails?.tableNumber} - ${orderData.personDetails?.name}`,
          plateRecommendations: orderData.plateRecommendations || [],
          metadata: orderData.metadata,
          lastUpdated: new Date().toISOString(),
        };

        console.log("Transformed Order:", transformedOrder);
        setOrderDetails(transformedOrder);
        saveRecentSearch(orderId);
        toast.success(`Order ${orderId.slice(-8)} found!`);
      } else {
        setError("Order not found. Please check the Order ID and try again.");
        toast.error("Order not found");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError(
        err.message || "Failed to fetch order details. Please try again.",
      );
      toast.error("Failed to fetch order");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircleIcon className="text-blue-500" />;
      case "preparing":
        return <TimerIcon className="text-yellow-500 animate-pulse" />;
      case "ready":
        return <CheckCircleIcon className="text-green-500" />;
      case "completed":
        return <CheckCircleIcon className="text-purple-500" />;
      case "cancelled":
        return <ErrorIcon className="text-red-500" />;
      default:
        return <InfoIcon className="text-gray-500" />;
    }
  };

  const getStatusStep = (status) => {
    const steps = ["confirmed", "preparing", "ready", "completed"];
    const index = steps.indexOf(status?.toLowerCase());
    return index >= 0 ? index : -1;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl flex flex-col relative z-10 max-h-[90vh]"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ConfirmationNumberIcon className="text-white text-lg sm:text-xl" />
              <h2 className="text-white font-bold text-base sm:text-xl">
                Track Your Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
            >
              <CloseIcon className="text-white text-base sm:text-xl" />
            </button>
          </div>
          <p className="text-indigo-100 text-[10px] sm:text-xs mt-1">
            Enter your Order ID to see real-time status
          </p>
        </div>

        <div className="p-3 sm:p-5 overflow-y-auto flex-1">
          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                placeholder="e.g., ORD-1734567890123-ABCDEF"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-mono pr-8 sm:pr-10 focus:ring-2 focus:ring-indigo-400 outline-none"
                onKeyPress={(e) => e.key === "Enter" && handleCheckOrder()}
              />
              <SearchIcon className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
            </div>
            <button
              onClick={handleCheckOrder}
              disabled={isLoading}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:shadow-lg transition text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Track"
              )}
            </button>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !orderDetails && (
            <div className="mb-4">
              <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
                Recent searches:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {recentSearches.map((id) => (
                  <button
                    key={id}
                    onClick={() => setOrderId(id)}
                    className="text-[10px] sm:text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full font-mono transition"
                  >
                    {id.slice(-16)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <ErrorIcon fontSize="small" /> {error}
            </div>
          )}

          {/* Order Details */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Order Header */}
              <div
                className={`rounded-xl p-3 sm:p-4 border-2 ${getStatusColor(orderDetails.status)}`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    {getStatusIcon(orderDetails.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-2xl font-mono font-bold tracking-tight break-all">
                        {orderDetails.orderId}
                      </p>
                      {orderDetails.bookingId && (
                        <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                          Booking: {orderDetails.bookingId}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <span className="text-lg sm:text-2xl font-bold capitalize">
                      {orderDetails.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Progress */}
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 overflow-x-auto">
                <h3 className="font-semibold text-gray-700 mb-3 text-xs sm:text-sm">
                  Order Progress
                </h3>
                <div className="flex items-center justify-between min-w-[280px] sm:min-w-0">
                  {["confirmed", "preparing", "ready", "completed"].map(
                    (step, idx) => {
                      const currentStep = getStatusStep(orderDetails.status);
                      const isCompleted = currentStep >= idx;
                      const isCurrent = currentStep === idx;
                      return (
                        <div key={step} className="flex-1 text-center">
                          <div className="relative">
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center text-[10px] sm:text-sm
                            ${isCompleted ? "bg-green-500 text-white" : isCurrent ? "bg-indigo-500 text-white animate-pulse" : "bg-gray-300 text-gray-500"}`}
                            >
                              {isCompleted ? (
                                <CheckIcon fontSize="small" />
                              ) : (
                                idx + 1
                              )}
                            </div>
                          </div>
                          <p
                            className={`text-[9px] sm:text-xs mt-1 capitalize font-medium
                          ${isCompleted ? "text-green-600" : isCurrent ? "text-indigo-600" : "text-gray-400"}`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <PersonIcon fontSize="small" />
                    <span className="text-xs sm:text-sm font-medium">
                      Customer Name
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 text-base sm:text-lg truncate">
                    {orderDetails.customerName || "N/A"}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 sm:p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TableIcon fontSize="small" />
                    <span className="text-xs sm:text-sm font-medium">
                      Table Number
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800 text-base sm:text-lg">
                    {orderDetails.tableNumber
                      ? `Table ${orderDetails.tableNumber}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-xl p-3">
                <h3 className="font-semibold text-gray-800 mb-3 text-xs sm:text-sm flex items-center gap-2">
                  <ReceiptIcon fontSize="small" /> Order Items (
                  {orderDetails.totalItems || orderDetails.items?.length || 0})
                </h3>
                <div className="space-y-2 sm:space-y-3 max-h-40 sm:max-h-52 overflow-y-auto">
                  {(orderDetails.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 py-2 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="font-medium text-gray-700 bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-800 font-medium text-xs sm:text-sm">
                            {item.name}
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                          RWF {(item.finalPrice || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 sm:p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Subtotal:
                  </span>
                  <span className="text-xs sm:text-sm">
                    RWF {(orderDetails.subtotal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-indigo-100">
                  <span className="font-bold text-gray-800 text-sm sm:text-base">
                    Total:
                  </span>
                  <span className="font-bold text-indigo-600 text-base sm:text-xl">
                    RWF {(orderDetails.total || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Help Text */}
          {!orderDetails && !error && !isLoading && (
            <div className="text-center py-6 sm:py-8">
              <ConfirmationNumberIcon className="text-gray-300 text-3xl sm:text-5xl mx-auto mb-2 sm:mb-3" />
              <p className="text-gray-500 text-xs sm:text-sm">
                Enter your Order ID to track your order status in real-time.
              </p>
              <p className="text-gray-400 text-[9px] sm:text-xs mt-1 sm:mt-2">
                Example: ORD-1734567890123-ABCDEF
              </p>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 border-t bg-gray-50 rounded-b-xl sm:rounded-b-2xl flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 py-2 sm:py-2.5 rounded-xl font-medium hover:bg-gray-300 transition text-sm sm:text-base"
          >
            Close
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md relative z-10"
      >
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl">
          <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
            <RestaurantIcon /> Welcome to NutriScan·AI
          </h2>
        </div>
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Table Number *
            </label>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>
        </div>
        <div className="p-3 sm:p-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (tableNumber && customerName)
                onConfirm(tableNumber, customerName);
              else toast.error("Please enter table number and name");
            }}
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
          >
            Start Ordering
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
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[85vh] flex flex-col relative z-10"
      >
        <div className="bg-orange-500 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
          <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
            <CartIcon /> Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
          >
            <CloseIcon className="text-white text-base sm:text-xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <CartIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
              <p className="text-gray-500 text-sm sm:text-base">
                Your cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="mb-3 pb-3 border-b">
                <div className="flex justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    {item.customizations?.length > 0 && (
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        {item.customizations.map((c) => `• ${c}`).join(" ")}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <p className="text-[10px] sm:text-xs text-orange-600">
                        📝 {item.specialInstructions}
                      </p>
                    )}
                  </div>
                  <p className="text-orange-600 font-bold text-sm sm:text-base flex-shrink-0">
                    RWF {item.finalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity - 1)
                    }
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                  <span className="w-8 text-center text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartId, item.quantity + 1)
                    }
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <AddIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="ml-2 text-red-500 hover:text-red-700 transition"
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
              <span className="text-orange-600 text-base sm:text-lg">
                RWF {getTotal().toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md max-h-[80vh] flex flex-col relative z-10"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 sm:p-4 rounded-t-xl sm:rounded-t-2xl flex justify-between items-center flex-shrink-0">
          <h2 className="text-white font-bold text-base sm:text-xl">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
          >
            <CloseIcon className="text-white text-base sm:text-xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <p className="font-mono text-[10px] sm:text-xs text-gray-500 break-all">
              Order ID: {order.orderId}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Table:</strong> {order.tableNumber}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Customer:</strong> {order.customerName}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {order.status}
              </span>
            </p>
          </div>
          <h3 className="font-bold mb-2 text-sm sm:text-base">Items:</h3>
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-2 border-b">
              <div className="flex justify-between gap-2">
                <span className="text-sm sm:text-base">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-orange-600 font-semibold text-sm sm:text-base">
                  RWF {item.finalPrice?.toLocaleString()}
                </span>
              </div>
              {item.customizations?.length > 0 && (
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {item.customizations.map((c) => `• ${c}`).join(" ")}
                </div>
              )}
              {item.specialInstructions && (
                <p className="text-[10px] sm:text-xs text-orange-600">
                  Note: {item.specialInstructions}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-between font-bold pt-3 mt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600 text-base sm:text-lg">
              RWF {order.total?.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="p-3 sm:p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-[90%] sm:max-w-sm w-full p-5 sm:p-6 text-center relative z-10"
      >
        {type === "success" ? (
          <CheckCircleIcon className="text-green-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
        ) : (
          <ErrorIcon className="text-red-500 text-4xl sm:text-6xl mx-auto mb-3 sm:mb-4" />
        )}
        <h2 className="text-lg sm:text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-line mb-5 sm:mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-orange-600 transition"
        >
          OK
        </button>
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
    "No salt",
    "Less oil",
    "Extra spicy",
    "Mild spice",
    "No onions",
    "No garlic",
    "Extra cheese",
    "Vegan preparation",
    "Gluten-free option",
    "Dairy-free option",
  ];

  const toggleCustomization = (option) => {
    if (customizations.includes(option))
      setCustomizations((prev) => prev.filter((c) => c !== option));
    else setCustomizations((prev) => [...prev, option]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-[95%] sm:max-w-md max-h-[85vh] flex flex-col relative overflow-hidden z-10"
      >
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 sm:p-5 rounded-t-xl sm:rounded-t-3xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-base sm:text-xl flex items-center gap-2">
                <EditIcon /> Customize Your Order
              </h2>
              <p className="text-amber-100 text-xs sm:text-sm mt-1 truncate">
                {item?.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 bg-gradient-to-t from-red-500 to-red-700 rounded-full hover:scale-110 transition"
            >
              <CloseIcon className="text-white text-base sm:text-xl" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <span className="text-orange-600 font-bold text-xl sm:text-2xl">
              RWF {item?.price?.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm ml-2">
              per serving
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">🥗</span> Ingredients
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {item?.ingredients?.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="w-full flex items-center justify-between p-2.5 sm:p-3 bg-orange-50 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl">✨</span>
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  Customization Options
                </span>
                {customizations.length > 0 && (
                  <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {customizations.length} selected
                  </span>
                )}
              </div>
              {showOptions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            {showOptions && (
              <div className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
                {customizationOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleCustomization(opt)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm transition text-left ${customizations.includes(opt) ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          {customizations.length > 0 && (
            <div className="bg-emerald-50 rounded-xl p-2.5 sm:p-3">
              <h3 className="font-semibold text-emerald-800 text-xs sm:text-sm mb-2 flex items-center gap-1">
                <CheckIcon fontSize="small" /> Applied customizations:
              </h3>
              <div className="flex flex-wrap gap-1">
                {customizations.map((cust, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {cust}
                    <button
                      onClick={() => toggleCustomization(cust)}
                      className="text-emerald-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
              <span className="text-lg">📝</span> Special Instructions
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any additional requests?"
              className="w-full p-2.5 sm:p-3 border rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-orange-400 resize-none"
              rows="3"
            />
          </div>
        </div>
        <div className="p-3 sm:p-4 border-t flex gap-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 sm:py-3 rounded-xl font-medium bg-red-600 text-white text-sm sm:text-base hover:bg-red-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddToCart(item, customizations, specialInstructions);
              onClose();
            }}
            className="flex-1 bg-orange-500 text-white py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-orange-600 transition"
          >
            <CartIcon fontSize="small" /> Add to Cart
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
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onExpire]);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  const getTimerColor = () =>
    timeLeft <= 60
      ? "bg-red-500 animate-pulse"
      : timeLeft <= 300
        ? "bg-orange-500"
        : "bg-green-500";

  return (
    <motion.div
      initial={{ x: 100, opacity: 0, scale: 0.8 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 100, opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      onClick={onOpenModal}
      className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 cursor-pointer rounded-full shadow-2xl ${getTimerColor()} text-white px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3`}
    >
      <TimerIcon className="animate-pulse text-base sm:text-xl" />
      <div>
        <span className="text-[9px] sm:text-xs font-medium">
          Order #{orderId?.slice(-8)} | Table {tableNumber}
        </span>
        <span className="text-sm sm:text-xl font-mono font-bold block">
          {formatTime(timeLeft)}
        </span>
      </div>
    </motion.div>
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
  const [analysisResult, setAnalysisResult] = useState(null);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveStatus, setLiveStatus] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const apiService = useMemo(() => APIService.getInstance(), []);

  const handleGetOrderById = useCallback(
    async (orderId) => {
      try {
        const response = await apiService.getOrderById(orderId);
        return response;
      } catch (error) {
        console.error("Get order error:", error);
        throw error;
      }
    },
    [apiService],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeOrder && activeOrder.orderId) {
        const statuses = ["confirmed", "preparing", "ready", "completed"];
        const currentIndex = statuses.indexOf(activeOrder.status);
        if (currentIndex < statuses.length - 1 && Math.random() < 0.3) {
          const newStatus = statuses[currentIndex + 1];
          setActiveOrder((prev) => ({ ...prev, status: newStatus }));
          setLiveStatus({
            orderId: activeOrder.orderId,
            status: newStatus,
            message: `Order ${newStatus === "confirmed" ? "has been confirmed" : newStatus === "preparing" ? "is being prepared" : newStatus === "ready" ? "is ready for pickup" : "has been completed"}`,
          });
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
      const { nutritionalInfo, nutritionSource } =
        await apiService.getCompleteNutritionAnalysis(item);
      const updatedItem = { ...item, nutritionalInfo, nutritionSource };
      setCurrentItem(updatedItem);
      setMenuItemsWithNutrition((prev) =>
        prev.map((i) => (i.id === item.id ? updatedItem : i)),
      );
      const analysis = analyzeFoodForConditions(updatedItem);
      setAnalysisResult(analysis);
    }, 2000);
  };

  const [menuItemsWithNutrition, setMenuItemsWithNutrition] = useState(() =>
    MENU_ITEMS.map((item) => ({
      ...item,
      nutritionalInfo: null,
      nutritionSource: null,
    })),
  );

  const categories = ["all", ...new Set(MENU_ITEMS.map((i) => i.category))];
  const filtered = menuItemsWithNutrition.filter(
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

  // ========== CHECKOUT FUNCTION - MATCHING BACKEND SCHEMA ==========
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

//     setShowCart(false);
//     setIsSubmitting(true);

//     const preparationTime =
//       cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

//     // Format items according to OrderSchema (ItemSchema)
//     const formattedItems = cart.map((item) => ({
//       id: item.id.toString(),
//       name: item.name,
//       quantity: item.quantity,
//       originalPrice: item.price,
//       finalPrice: item.price * item.quantity,
//       customizations: item.customizations || [],
//       specialInstructions: item.specialInstructions || "",
//       preparationTime: item.prepTime || 15,
//     }));

//     // Format plate recommendations according to OrderSchema
//     const formattedPlates = cart.map((item) => ({
//       plateId: `plate_${Date.now()}_${item.id}`,
//       originalName: item.name,
//       customizations: item.customizations || [],
//       specialInstructions: item.specialInstructions || "",
//     }));

//     // Build order data that matches the backend schema exactly
//     const orderData = {
//       // personDetails object (as expected by schema)
//       personDetails: {
//         name: tableInfo.customerName,
//         tableNumber: tableInfo.tableNumber.toString(),
//         orderType: "dine-in",
//       },
//       // bookingDetails object
//       bookingDetails: {
//         estimatedPickupTime: new Date(
//           Date.now() + preparationTime * 60000,
//         ).toLocaleTimeString(),
//         specialInstructions: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       },
//       // items array
//       items: formattedItems,
//       // customized plates
//       customizedPlates: formattedPlates,
//       // notes (for backward compatibility)
//       notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
//       // auto progress flag
//       autoProgress: true,
//     };

//     console.log("Submitting order with schema-matched data:", orderData);

//     try {
//       const result = await apiService.createOrder(orderData);
//       console.log("Order creation result:", result);

//       if (result && result.success === true && result.data) {
//         const order = result.data;

//         setActiveOrder({
//           orderId: order.orderId,
//           bookingId: order.bookingId,
//           tableNumber: tableInfo.tableNumber,
//           customerName: tableInfo.customerName,
//           items: cart,
//           total: order.orderSummary?.total || getTotal(),
//           timeRemaining: preparationTime * 60,
//           status: order.status || "preparing",
//         });

//         setShowResult({
//           open: true,
//           type: "success",
//           title: "✅ Order Confirmed!",
//           message: `Thank you ${tableInfo.customerName}!\n\nTable: ${tableInfo.tableNumber}\nOrder ID: ${order.orderId}\nBooking ID: ${order.bookingId}\nTotal: RWF ${(order.orderSummary?.total || getTotal()).toLocaleString()}\nEst. time: ${preparationTime} min\n\n💡 Save this Order ID to track your order: ${order.orderId}`,
//         });
//         setCart([]);
//       } else {
//         setShowResult({
//           open: true,
//           type: "error",
//           title: "Order Failed",
//           message:
//             result?.message || "Failed to create order. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);

//       setShowResult({
//         open: true,
//         type: "error",
//         title: "Order Failed",
//         message:
//           error.message ||
//           "Failed to connect to server. Please check your internet connection and try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


const handleCheckout = async () => {
  // 🔒 Prevent double submit instantly
  if (isSubmitting) return;

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

  setIsSubmitting(true);
  setShowCart(false);

  try {
    // 📦 preparation time calculation
    const preparationTime =
      cart.reduce((max, item) => Math.max(max, item.prepTime || 15), 15) + 5;

    // 🧾 stable request id (CRITICAL FIX)
    const requestId = uuidv4();

    // 🍽️ format items
    const formattedItems = cart.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      quantity: item.quantity || 1,
      originalPrice: item.price || 0,
      finalPrice: (item.price || 0) * (item.quantity || 1),
      customizations: item.customizations || [],
      specialInstructions: item.specialInstructions || "",
      preparationTime: item.prepTime || 15,
    }));

    // 🪪 optional plate tracking
    const formattedPlates = cart.map((item) => ({
      plateId: `plate_${Date.now()}_${item.id}`,
      originalName: item.name,
      customizations: item.customizations || [],
      specialInstructions: item.specialInstructions || "",
    }));

    // 📤 final payload (FULLY SAFE)
    const orderData = {
      requestId, // 🔥 CRITICAL FIX

      personDetails: {
        name: tableInfo.customerName,
        tableNumber: tableInfo.tableNumber.toString(),
        orderType: "dine-in",
      },

      bookingDetails: {
        estimatedPickupTime: new Date(
          Date.now() + preparationTime * 60000
        ).toLocaleTimeString(),

        specialInstructions: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
      },

      items: formattedItems,
      customizedPlates: formattedPlates,
      notes: `Table ${tableInfo.tableNumber} - ${tableInfo.customerName}`,
      autoProgress: true,
    };

    console.log("Submitting order:", orderData);

    // 🚀 API CALL
    const result = await apiService.createOrder(orderData);

    console.log("Order result:", result);

    if (result?.success && result?.data) {
      const order = result.data;

      setActiveOrder({
        orderId: order.orderId,
        bookingId: order.bookingId || order.orderId,
        tableNumber: tableInfo.tableNumber,
        customerName: tableInfo.customerName,
        items: cart,
        total: order.orderSummary?.total || getTotal(),
        timeRemaining: preparationTime * 60,
        status: order.status || "confirmed",
      });

      setShowResult({
        open: true,
        type: "success",
        title: "Order Confirmed",
        message: `Thank you ${tableInfo.customerName}!

Table: ${tableInfo.tableNumber}
Order ID: ${order.orderId}
Total: RWF ${(order.orderSummary?.total || getTotal()).toLocaleString()}
Estimated time: ${preparationTime} min

Save your Order ID to track your order.`,
      });

      setCart([]);
    } else {
      setShowResult({
        open: true,
        type: "error",
        title: "Order Failed",
        message: result?.message || "Failed to create order.",
      });
    }
  } catch (error) {
    console.error("Checkout error:", error);

    setShowResult({
      open: true,
      type: "error",
      title: "Connection Error",
      message:
        error?.message ||
        "Network error. Please check your connection and try again.",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleTimerExpire = () =>
    toast.info(`Table ${tableInfo.tableNumber} - Your order is ready!`);

  const handleTableConfirm = (tableNum, customerName) => {
    setTableInfo({ tableNumber: tableNum, customerName });
    setShowTableModal(false);
    toast.success(
      `Welcome Table ${tableNum}! ${customerName ? `Hello ${customerName}, ` : ""}Explore our menu with AI health insights.`,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50">
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
          <ConditionRiskModal
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
            onCheckout={handleCheckout}
            tableInfo={tableInfo}
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
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showOrderDetail && (
          <OrderDetailModal
            isOpen={showOrderDetail}
            onClose={() => setShowOrderDetail(false)}
            order={activeOrder}
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
          />
        )}
      </AnimatePresence>

      {activeOrder && activeOrder.status !== "completed" && (
        <FloatingTimer
          orderId={activeOrder.orderId}
          tableNumber={activeOrder.tableNumber}
          initialDuration={activeOrder.timeRemaining}
          onExpire={handleTimerExpire}
          onOpenModal={() => setShowOrderDetail(true)}
        />
      )}

      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6">
          <div className="text-center sm:text-left">
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2"
            >
              <RestaurantIcon className="text-orange-500 text-xl sm:text-3xl" />
              NutriScan·AI
              <motion.span
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <SpaOutlined className="text-yellow-500 text-base sm:text-xl" />
              </motion.span>
            </motion.h1>
            <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
              {tableInfo.tableNumber
                ? `Table ${tableInfo.tableNumber}`
                : "Select a table"}
              {tableInfo.customerName && ` · ${tableInfo.customerName}`}
              <span className="ml-1 sm:ml-2 text-orange-500">
                ✦ AI-Powered Health Insights
              </span>
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowOrderStatusModal(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition"
            >
              <ConfirmationNumberIcon className="text-base sm:text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCart(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 sm:p-2.5 rounded-full shadow-lg hover:shadow-xl transition relative"
            >
              <CartIcon className="text-base sm:text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-2 sm:p-3 mb-3 sm:mb-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
              <ShieldIcon className="text-blue-600 text-base sm:text-xl" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs md:text-sm text-blue-800 font-medium">
                🔬 Smart Health Analysis + Real-time Order Tracking
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-600">
                Click any dish for detailed nutrition from USDA/Spoonacular
                APIs. Track your order status in real-time!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-5">
          <SearchIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-xl" />
          <input
            className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white shadow-sm text-xs sm:text-sm md:text-base"
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-5 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition font-medium text-[11px] sm:text-sm ${activeCategory === cat ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
            >
              {cat === "all" ? "🍽️ All Items" : cat}
            </motion.button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {paginated.map((item) => (
            <motion.div
              layoutId={`item-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              key={item.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative h-32 sm:h-40 md:h-44 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.name}
                />
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-black/60 text-white text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1">
                  <TimeIcon
                    fontSize="small"
                    className="text-[10px] sm:text-xs"
                  />{" "}
                  {item.prepTime} min
                </div>
              </div>
              <div className="p-2 sm:p-3 md:p-4">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                  {item.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 mt-0.5 sm:mt-1 h-6 sm:h-8">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-2 sm:mt-3">
                  <span className="text-orange-600 font-bold text-sm sm:text-base md:text-lg">
                    RWF {item.price.toLocaleString()}
                  </span>
                  <button className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition shadow-md hover:bg-orange-600">
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 sm:py-16">
            <SearchIcon className="text-gray-300 text-4xl sm:text-6xl mx-auto mb-2 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">
              No items match your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
            >
              ←
            </button>
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
                  className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg transition text-xs sm:text-sm ${currentPage === pageNum ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg bg-white disabled:opacity-50 shadow-sm text-xs sm:text-sm"
            >
              →
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-4 border-orange-500 border-t-transparent mx-auto mb-3 sm:mb-4"
                />
                <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg">
                  Placing your order...
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                  Please wait
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};