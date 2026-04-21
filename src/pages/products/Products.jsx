/* eslint-disable no-unused-vars */
// Product.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Icons
import {
  ShoppingCart as CartIcon,
  Payment as PaymentIcon,
  Timer as TimerIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  HealthAndSafety as HealthIcon,
  SmartToy as AIIcon,
  Delete as DeleteIcon,
  LocalDining as FoodIcon,
  LocalDrink as DrinkIcon,
  Salad as SaladIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon,
  TrendingUp as CaloriesIcon,
  Sugar as SugarIcon,
  Recommend as RecommendIcon,
  Block as BlockIcon,
  RemoveCircle as RemoveCircleIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

// API Configuration
const API_BASE_URL = 'https://your-api.com/api';

// Mock API Functions (Replace with actual API calls)
const fetchFoodsFromAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Grilled Chicken Salad Bowl', description: 'Grilled chicken breast with fresh mixed greens, cherry tomatoes, cucumber, and balsamic dressing', ingredients: ['chicken', 'lettuce', 'tomato', 'cucumber', 'balsamic'], basePrice: 8500, calories: 450, sugar: 8, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', hasSalad: true, isVegetarian: false, isSpicy: false },
    { id: 2, name: 'Beef Burger with Side Salad', description: '200g beef patty with cheddar, lettuce, tomato, onion, and fresh garden salad', ingredients: ['beef', 'cheese', 'lettuce', 'tomato', 'onion', 'bun'], basePrice: 7500, calories: 680, sugar: 12, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', hasSalad: true, isVegetarian: false, isSpicy: false },
    { id: 3, name: 'Margherita Pizza with Caesar Salad', description: 'Fresh mozzarella, tomato sauce, basil, served with Caesar salad', ingredients: ['dough', 'mozzarella', 'tomato', 'basil', 'olive oil'], basePrice: 12000, calories: 850, sugar: 10, category: 'Pizza', image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400', hasSalad: true, isVegetarian: true, isSpicy: false },
    { id: 4, name: 'Salmon Fillet with Quinoa Salad', description: 'Fresh Atlantic salmon with lemon dill sauce and quinoa salad', ingredients: ['salmon', 'lemon', 'dill', 'butter', 'quinoa'], basePrice: 14500, calories: 520, sugar: 6, category: 'Seafood', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400', hasSalad: true, isVegetarian: false, isSpicy: false },
    { id: 5, name: 'Greek Salad Bowl', description: 'Fresh cucumbers, tomatoes, olives, feta cheese, and Greek dressing', ingredients: ['cucumber', 'tomato', 'olives', 'feta', 'onion'], basePrice: 5500, calories: 320, sugar: 9, category: 'Salads', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', hasSalad: true, isVegetarian: true, isSpicy: false },
    { id: 6, name: 'Chicken Tikka with Salad', description: 'Grilled chicken in creamy tomato curry served with fresh salad', ingredients: ['chicken', 'tomato', 'cream', 'spices', 'onion'], basePrice: 10500, calories: 620, sugar: 14, category: 'Indian', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', hasSalad: true, isVegetarian: false, isSpicy: true },
    { id: 7, name: 'Vegan Buddha Bowl', description: 'Roasted vegetables, quinoa, avocado, and tahini dressing', ingredients: ['quinoa', 'avocado', 'sweet potato', 'broccoli', 'tahini'], basePrice: 9800, calories: 580, sugar: 11, category: 'Vegetarian', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', hasSalad: true, isVegetarian: true, isSpicy: false },
    { id: 8, name: 'BBQ Chicken Wrap with Coleslaw', description: 'Grilled chicken, BBQ sauce, lettuce, and creamy coleslaw', ingredients: ['chicken', 'bbq sauce', 'lettuce', 'cabbage', 'wrap'], basePrice: 6800, calories: 550, sugar: 18, category: 'Wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', hasSalad: true, isVegetarian: false, isSpicy: false },
  ];
};

const fetchDrinksFromAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 101, name: 'Fresh Orange Juice', description: 'Squeezed to order, no added sugar', ingredients: ['oranges'], basePrice: 2500, calories: 110, sugar: 22, category: 'Juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 102, name: 'Mango Smoothie', description: 'Creamy mango blended with Greek yogurt', ingredients: ['mango', 'yogurt', 'honey'], basePrice: 3500, calories: 250, sugar: 35, category: 'Smoothies', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 103, name: 'Cappuccino', description: 'Espresso with steamed milk foam', ingredients: ['coffee', 'milk'], basePrice: 3000, calories: 120, sugar: 8, category: 'Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 104, name: 'Mojito Mocktail', description: 'Fresh mint, lime, soda water, and cane sugar', ingredients: ['mint', 'lime', 'soda', 'sugar'], basePrice: 4000, calories: 150, sugar: 28, category: 'Mocktails', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 105, name: 'Coca Cola', description: 'Chilled soft drink', ingredients: ['carbonated water', 'sugar', 'caffeine'], basePrice: 1500, calories: 140, sugar: 35, category: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 106, name: 'Diet Coke', description: 'Zero sugar soft drink', ingredients: ['carbonated water', 'aspartame', 'caffeine'], basePrice: 1500, calories: 0, sugar: 0, category: 'Soft Drinks', image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 107, name: 'Green Detox Juice', description: 'Kale, spinach, apple, ginger, lemon', ingredients: ['kale', 'spinach', 'apple', 'ginger', 'lemon'], basePrice: 3500, calories: 90, sugar: 12, category: 'Juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 108, name: 'Iced Latte', description: 'Chilled espresso with oat milk', ingredients: ['coffee', 'oat milk', 'ice'], basePrice: 3500, calories: 100, sugar: 6, category: 'Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 109, name: 'Coconut Water', description: 'Fresh coconut water', ingredients: ['coconut water'], basePrice: 2500, calories: 45, sugar: 9, category: 'Water', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400', isVegetarian: true, isAlcoholic: false },
    { id: 110, name: 'Sparkling Water', description: 'Carbonated mineral water with lime', ingredients: ['water', 'carbonation', 'lime'], basePrice: 2000, calories: 0, sugar: 0, category: 'Water', image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=400', isVegetarian: true, isAlcoholic: false },
  ];
};

// AI Diagnosis API
const getAIDiagnosis = async (itemName, ingredients, itemType) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const diagnoses = {
    allergies: [
      { id: 'peanut', name: 'Peanut Allergy', severity: 'high', restriction: 'remove_peanuts', recommendation: 'Avoid any dishes containing peanuts or peanut oil' },
      { id: 'diabetes', name: 'Diabetes', severity: 'high', restriction: 'reduce_sugar', recommendation: 'Choose low-sugar options and monitor carbohydrate intake' },
      { id: 'hypertension', name: 'Hypertension', severity: 'high', restriction: 'low_sodium', recommendation: 'Avoid high-sodium foods and request low-salt preparation' },
      { id: 'celiac', name: 'Celiac Disease', severity: 'high', restriction: 'gluten_free', recommendation: 'Strictly avoid gluten-containing ingredients' },
      { id: 'lactose', name: 'Lactose Intolerance', severity: 'medium', restriction: 'lactose_free', recommendation: 'Choose lactose-free dairy or plant-based alternatives' },
      { id: 'high_cholesterol', name: 'High Cholesterol', severity: 'medium', restriction: 'low_fat', recommendation: 'Avoid fried foods and choose lean proteins' },
      { id: 'obesity', name: 'Weight Management', severity: 'medium', restriction: 'low_calorie', recommendation: 'Choose lower calorie options and control portion sizes' },
      { id: 'kidney_disease', name: 'Kidney Disease', severity: 'high', restriction: 'low_protein', recommendation: 'Limit protein and phosphorus-rich foods' },
    ],
    nutrition: [
      { condition: 'high_calories', threshold: 600, message: 'This meal is high in calories. Consider sharing or saving half for later.' },
      { condition: 'high_sugar', threshold: 20, message: 'This item contains high sugar. May cause blood sugar spike. Consider a sugar-free alternative.' },
      { condition: 'moderate_sugar', threshold: 10, message: 'Contains moderate sugar. OK for occasional consumption.' },
      { condition: 'low_sugar', threshold: 5, message: 'Low in sugar. Good choice for sugar-conscious individuals.' },
    ]
  };
  
  // Simulate diagnosis based on item properties
  const relevantDiagnoses = [];
  
  // Check for high calories
  const calories = itemType === 'food' ? 
    [450, 680, 850, 520, 320, 620, 580, 550][Math.floor(Math.random() * 8)] :
    [110, 250, 120, 150, 140, 0, 90, 100, 45, 0][Math.floor(Math.random() * 10)];
  
  if (calories > 600) {
    relevantDiagnoses.push({ type: 'nutrition', ...diagnoses.nutrition[0], calories });
  }
  
  // Check for sugar content
  const sugar = itemType === 'food' ?
    [8, 12, 10, 6, 9, 14, 11, 18][Math.floor(Math.random() * 8)] :
    [22, 35, 8, 28, 35, 0, 12, 6, 9, 0][Math.floor(Math.random() * 10)];
  
  if (sugar > 20) {
    relevantDiagnoses.push({ type: 'nutrition', ...diagnoses.nutrition[1], sugar });
  } else if (sugar > 10) {
    relevantDiagnoses.push({ type: 'nutrition', ...diagnoses.nutrition[2], sugar });
  } else if (sugar > 0 && sugar <= 5) {
    relevantDiagnoses.push({ type: 'nutrition', ...diagnoses.nutrition[3], sugar });
  }
  
  // Random allergies (simulate AI detection)
  const randomAllergies = diagnoses.allergies.filter(() => Math.random() > 0.7);
  
  return {
    itemName,
    calories,
    sugar,
    allergies: randomAllergies.slice(0, 2),
    nutritionAdvice: relevantDiagnoses,
    isRecommended: calories < 500 && sugar < 15,
  };
};

// Get post-meal recommendations based on consumed items
const getPostMealRecommendations = (cartItems) => {
  const totalCalories = cartItems.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalSugar = cartItems.reduce((sum, item) => sum + (item.sugar * item.quantity), 0);
  
  const recommendations = [];
  
  if (totalCalories > 800) {
    recommendations.push({
      type: 'exercise',
      message: `🏃‍♂️ This meal contains ${totalCalories} calories. A 30-minute walk would help burn these calories!`,
      action: 'Take a walk after your meal'
    });
  } else if (totalCalories > 500) {
    recommendations.push({
      type: 'moderate',
      message: `🍽️ Your meal has ${totalCalories} calories. Consider a light 15-minute walk.`,
      action: 'Light activity recommended'
    });
  } else {
    recommendations.push({
      type: 'good',
      message: `✅ Great choice! Your meal has only ${totalCalories} calories.`,
      action: 'Keep up the healthy choices!'
    });
  }
  
  if (totalSugar > 30) {
    recommendations.push({
      type: 'sugar_alert',
      message: `⚠️ High sugar content (${totalSugar}g). Drink plenty of water to help process the sugar.`,
      action: 'Stay hydrated'
    });
  } else if (totalSugar > 15) {
    recommendations.push({
      type: 'sugar_warning',
      message: `📊 Moderate sugar content (${totalSugar}g). Consider water instead of sugary drinks next time.`,
      action: 'Choose water next time'
    });
  } else {
    recommendations.push({
      type: 'sugar_good',
      message: `🎉 Low sugar content (${totalSugar}g)! Excellent for maintaining stable blood sugar.`,
      action: 'Excellent choice!'
    });
  }
  
  // Add digestion tip
  recommendations.push({
    type: 'digestion',
    message: `💧 Don't forget to drink water! Proper hydration aids digestion.`,
    action: 'Drink 2-3 glasses of water'
  });
  
  return recommendations;
};

// Main Product Component
export const Products = () => {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [aiDiagnosis, setAiDiagnosis] = useState(null);
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [postMealRecommendations, setPostMealRecommendations] = useState([]);
  const [restrictedItems, setRestrictedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('foods');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartIdCounter, setCartIdCounter] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const foodsData = await fetchFoodsFromAPI();
      const drinksData = await fetchDrinksFromAPI();
      setFoods(foodsData);
      setDrinks(drinksData);
      setLoading(false);
    };
    loadData();
  }, []);

  const allItems = [...foods, ...drinks];
  
  const filteredItems = (activeTab === 'foods' ? foods : drinks).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = async (item) => {
    setSelectedItem(item);
    setIsAnalyzing(true);
    setShowDiagnosisModal(true);
    
    const diagnosis = await getAIDiagnosis(item.name, item.ingredients, activeTab);
    setAiDiagnosis(diagnosis);
    setIsAnalyzing(false);
  };

  const handleAddToCart = () => {
    // Check if item is restricted based on allergies
    const isRestricted = aiDiagnosis?.allergies?.some(allergy => 
      allergy.restriction && selectedItem.ingredients?.some(ing => 
        ing.toLowerCase().includes(allergy.id)
      )
    );
    
    if (isRestricted) {
      toast.error(`⚠️ This item contains ingredients that may trigger your allergies! Please choose a different item.`, {
        position: "top-center",
        autoClose: 4000,
      });
      setShowDiagnosisModal(false);
      return;
    }
    
    const cartItem = {
      cartId: cartIdCounter,
      id: selectedItem.id,
      name: selectedItem.name,
      description: selectedItem.description,
      image: selectedItem.image,
      price: selectedItem.basePrice,
      calories: aiDiagnosis.calories,
      sugar: aiDiagnosis.sugar,
      quantity: 1,
      hasSalad: selectedItem.hasSalad || false,
    };
    
    setCart([...cart, cartItem]);
    setCartIdCounter(cartIdCounter + 1);
    setShowDiagnosisModal(false);
    
    toast.success(`${selectedItem.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const addToRestricted = () => {
    if (selectedItem && !restrictedItems.find(r => r.id === selectedItem.id)) {
      setRestrictedItems([...restrictedItems, { ...selectedItem, reason: aiDiagnosis?.allergies?.[0]?.name || 'Allergy Concern' }]);
      toast.warning(`${selectedItem.name} added to restricted list. You won't see it in the menu anymore.`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
    setShowDiagnosisModal(false);
  };

  const removeFromRestricted = (itemId) => {
    setRestrictedItems(restrictedItems.filter(item => item.id !== itemId));
    toast.info('Item removed from restricted list');
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
    toast.info('Item removed from cart');
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalCalories = () => {
    return cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  };

  const getTotalSugar = () => {
    return cart.reduce((sum, item) => sum + (item.sugar * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const processOrder = () => {
    const recommendations = getPostMealRecommendations(cart);
    setPostMealRecommendations(recommendations);
    setShowCheckout(false);
    setShowRecommendationModal(true);
    setCart([]);
  };

  // Filter out restricted items from display
  const visibleFoods = foods.filter(food => !restrictedItems.find(r => r.id === food.id));
  const visibleDrinks = drinks.filter(drink => !restrictedItems.find(r => r.id === drink.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <ToastContainer />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <RestaurantIcon className="text-2xl" />
              <div>
                <h1 className="text-xl font-bold">Healthy Bites Restaurant</h1>
                <p className="text-sm opacity-90">AI-Powered Smart Dining</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {restrictedItems.length > 0 && (
                <div className="relative">
                  <button className="p-2 hover:bg-white/20 rounded-full relative">
                    <BlockIcon />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {restrictedItems.length}
                    </span>
                  </button>
                </div>
              )}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-white/20 rounded-full"
              >
                <CartIcon />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('foods')}
            className={`flex items-center space-x-2 px-6 py-3 font-semibold transition-all ${
              activeTab === 'foods'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            <FoodIcon />
            <span>Foods {restrictedItems.filter(r => foods.find(f => f.id === r.id)).length > 0 && `(${visibleFoods.length})`}</span>
          </button>
          <button
            onClick={() => setActiveTab('drinks')}
            className={`flex items-center space-x-2 px-6 py-3 font-semibold transition-all ${
              activeTab === 'drinks'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            <DrinkIcon />
            <span>Drinks</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white shadow-sm"
          />
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(activeTab === 'foods' ? visibleFoods : visibleDrinks).map(item => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  RWF {item.basePrice.toLocaleString()}
                </div>
                {item.hasSalad && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1">
                    <SaladIcon fontSize="small" /> Includes Salad
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <CaloriesIcon fontSize="small" />
                    <span>{item.calories || 'N/A'} cal</span>
                  </div>
                  {item.isVegetarian && (
                    <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Veg</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <p className="text-gray-500">No items found</p>
          </div>
        )}
      </div>

      {/* AI Diagnosis Modal */}
      <AnimatePresence>
        {showDiagnosisModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDiagnosisModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 sticky top-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <AIIcon className="text-white" />
                    <h2 className="text-xl font-bold text-white">AI Health Analysis</h2>
                  </div>
                  <button onClick={() => setShowDiagnosisModal(false)} className="p-1 hover:bg-white/20 rounded-full">
                    <CloseIcon className="text-white" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">AI is analyzing ingredients...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                      <img src={selectedItem.image} alt={selectedItem.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-bold text-lg">{selectedItem.name}</h3>
                        <p className="text-sm text-gray-500">Price: RWF {selectedItem.basePrice.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {/* Nutrition Info */}
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <RecommendIcon className="text-blue-500" />
                        Nutritional Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Calories</p>
                          <p className="text-xl font-bold text-blue-600">{aiDiagnosis?.calories} cal</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Sugar</p>
                          <p className="text-xl font-bold text-blue-600">{aiDiagnosis?.sugar}g</p>
                        </div>
                      </div>
                      {aiDiagnosis?.isRecommended && (
                        <div className="mt-2 p-2 bg-green-100 rounded-lg text-green-700 text-sm flex items-center gap-2">
                          <FavoriteIcon fontSize="small" />
                          AI Recommended! Low calories and sugar.
                        </div>
                      )}
                    </div>
                    
                    {/* Allergies Alert */}
                    {aiDiagnosis?.allergies?.length > 0 && (
                      <div className="mb-4 p-4 bg-red-50 rounded-xl">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-700">
                          <WarningIcon className="text-red-500" />
                          Potential Allergens Detected
                        </h4>
                        <div className="space-y-2">
                          {aiDiagnosis.allergies.map(allergy => (
                            <div key={allergy.id} className="p-2 bg-white rounded-lg">
                              <p className="font-semibold text-red-600">{allergy.name}</p>
                              <p className="text-sm text-gray-600">{allergy.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Nutrition Advice */}
                    {aiDiagnosis?.nutritionAdvice?.length > 0 && (
                      <div className="mb-4 p-4 bg-yellow-50 rounded-xl">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-yellow-700">
                          <HealthIcon className="text-yellow-500" />
                          Nutrition Advice
                        </h4>
                        {aiDiagnosis.nutritionAdvice.map((advice, idx) => (
                          <p key={idx} className="text-sm text-gray-700 mb-1">• {advice.message}</p>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      {aiDiagnosis?.allergies?.length > 0 && (
                        <button
                          onClick={addToRestricted}
                          className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
                        >
                          <RemoveCircleIcon fontSize="small" />
                          Add to Restricted
                        </button>
                      )}
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition flex items-center justify-center gap-2"
                      >
                        <AddIcon fontSize="small" />
                        Add to Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Modal - Centered */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-t-2xl flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CartIcon className="text-white" />
                  <h2 className="text-xl font-bold text-white">Your Cart</h2>
                </div>
                <button onClick={() => setShowCart(false)} className="p-1 hover:bg-white/20 rounded-full">
                  <CloseIcon className="text-white" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <CartIcon className="text-gray-300 text-6xl mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.cartId} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{item.calories} cal</span>
                            <span>{item.sugar}g sugar</span>
                            <span className="text-orange-600 font-bold">RWF {item.price}</span>
                          </div>
                          {item.hasSalad && (
                            <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <SaladIcon fontSize="small" /> Includes salad
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                            <RemoveIcon fontSize="small" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300">
                            <AddIcon fontSize="small" />
                          </button>
                          <button onClick={() => removeFromCart(item.cartId)} className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200 ml-1">
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-6 space-y-3 bg-gray-50 rounded-b-2xl">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-600">RWF {getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Calories: {getTotalCalories()} cal</span>
                    <span>Total Sugar: {getTotalSugar()}g</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
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
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white text-center">Confirm Your Order</h2>
              </div>
              <div className="p-6">
                <div className="mb-4 text-center">
                  <p className="text-gray-600 mb-2">Order Summary</p>
                  <p className="text-3xl font-bold text-orange-600">RWF {getCartTotal().toLocaleString()}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{cart.reduce((sum, i) => sum + i.quantity, 0)} items</p>
                    <p>{getTotalCalories()} total calories</p>
                    <p>{getTotalSugar()}g total sugar</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowCheckout(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold">
                    Cancel
                  </button>
                  <button onClick={processOrder} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold">
                    Confirm Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post-Meal Recommendations Modal */}
      <AnimatePresence>
        {showRecommendationModal && (
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
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-2xl">
                <div className="flex items-center justify-center space-x-2">
                  <RecommendIcon className="text-white" />
                  <h2 className="text-xl font-bold text-white">Health Recommendations</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-center">Based on your meal, here are some recommendations:</p>
                <div className="space-y-3">
                  {postMealRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-800">{rec.message}</p>
                      <p className="text-sm text-blue-600 mt-1 font-semibold">{rec.action}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowRecommendationModal(false)}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition"
                >
                  Thank You! Enjoy Your Meal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

