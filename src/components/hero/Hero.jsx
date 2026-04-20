/* eslint-disable no-unused-vars */
// components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import PhoneIcon from "@mui/icons-material/Phone";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SecurityIcon from "@mui/icons-material/Security";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TimerIcon from "@mui/icons-material/Timer";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SendIcon from "@mui/icons-material/Send";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const API_BASE_URL = "https://your-api.com/api"; // Replace with your actual API URL

// Contact Modal Component (same as Navbar)
const ContactModal = ({ isOpen, onClose }) => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill all fields");
      return;
    }
    if (!validateEmail(contactForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/contact`,
        contactForm,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      if (response.data.success || response.status === 200) {
        toast.success("📧 Message sent successfully!");
        setContactForm({ name: "", email: "", message: "" });
        onClose();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition text-white"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="relative">
                      <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="relative">
                      <MessageIcon className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        placeholder="Your Message"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-2 rounded-lg hover:from-red-700 hover:to-red-600 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      <SendIcon />
                      <span>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </span>
                    </button>
                  </form>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                    alt="Contact"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Step Card Component
const StepCard = ({ number, title, description, icon: Icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-lg p-6 border-l-8 ${color} hover:shadow-xl transition-all group`}
    >
      <div className="flex items-start space-x-4">
        <div
          className={`${color.replace("border-", "bg-").replace("-500", "-100")} p-3 rounded-xl group-hover:scale-110 transition-transform`}
        >
          <Icon
            className={`${color.replace("border-", "text-").replace("-500", "-600")} text-3xl`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`${color.replace("border-", "bg-").replace("-500", "-600")} text-white text-sm font-bold px-2 py-1 rounded-full`}
            >
              Step {number}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Hero Component
export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [modifications, setModifications] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [timer, setTimer] = useState(null);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
      title: "Welcome to QR Restaurant",
      subtitle: "Scan. Order. Enjoy. Safe dining with AI assistance.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
      title: "AI-Powered Safety",
      subtitle:
        "Our AI analyzes every meal for allergies and health conditions.",
    },
    {
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200",
      title: "Real-Time Updates",
      subtitle: "Track your order from kitchen to table with live timer.",
    },
    {
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
      title: "Secure Payments",
      subtitle: "Pay with MTN Mobile Money, Airtel Money, or credit card.",
    },
  ];

  const meals = [
    {
      id: 1,
      name: "Grilled Chicken Supreme",
      ingredients:
        "chicken breast, olive oil, garlic, rosemary, sea salt, black pepper",
      price: "$18.99",
      prepTime: 20,
      image:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
    },
    {
      id: 2,
      name: "Peanut Butter Curry",
      ingredients:
        "peanuts, coconut milk, curry paste, bell peppers, tofu, bamboo shoots",
      price: "$15.99",
      prepTime: 25,
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      ingredients:
        "dark chocolate, sugar, eggs, butter, flour, vanilla extract",
      price: "$8.99",
      prepTime: 15,
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    },
    {
      id: 4,
      name: "Mediterranean Bowl",
      ingredients:
        "quinoa, chickpeas, cucumber, tomato, feta cheese, olives, lemon",
      price: "$14.99",
      prepTime: 18,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const analyzeMeal = async (meal) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/analyze`, {
        mealName: meal.name,
        ingredients: meal.ingredients,
      });
      setAiAnalysis(response.data);
      setSelectedMeal(meal);
      toast.info(
        "AI analysis complete! Please select any conditions that apply to you.",
      );
    } catch (error) {
      toast.error("AI analysis failed. Please try again.");
    }
  };

  const getModifications = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/modifications`, {
        mealName: selectedMeal.name,
        ingredients: selectedMeal.ingredients,
        conditions: selectedConditions,
      });
      setModifications(response.data.modifications);
      toast.success("AI suggests these modifications for your safety!");
    } catch (error) {
      toast.error("Failed to get modifications.");
    }
  };

  const placeOrder = async (selectedMods) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, {
        mealId: selectedMeal.id,
        modifications: selectedMods,
        conditions: selectedConditions,
      });

      if (response.data.safetyCheckPassed) {
        toast.success("Order passed safety check! Sent to kitchen.");
        setOrderStatus({ status: "pending", orderId: response.data.orderId });
        pollChefResponse(response.data.orderId);
      } else {
        toast.error("Safety check failed! Please review your modifications.");
      }
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  const pollChefResponse = async (orderId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/orders/${orderId}/status`,
        );
        if (response.data.status === "confirmed") {
          clearInterval(interval);
          setTimer(response.data.preparationTime);
          startTimer(response.data.preparationTime);
          toast.success("Chef confirmed your order! Timer started.");
        } else if (response.data.status === "rejected") {
          clearInterval(interval);
          toast.error(`Order rejected: ${response.data.reason}`);
        }
      } catch (error) {
        console.error("Status check failed");
      }
    }, 3000);
  };

  const startTimer = (seconds) => {
    let remaining = seconds;
    const timerInterval = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(timerInterval);
        toast.info("Your meal is ready! A waiter will bring it to you.");
        setOrderStatus((prev) => ({ ...prev, status: "ready" }));
      } else {
        setTimer(remaining);
        remaining--;
      }
    }, 1000);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/payment/initialize`, {
        orderId: orderStatus?.orderId,
        amount: selectedMeal?.price.replace("$", ""),
        currency: "USD",
      });
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      toast.error("Payment initialization failed");
    }
  };

  const steps = [
    {
      number: 1,
      title: "Scan QR Code",
      description:
        "Scan the QR code on your table. No account or personal info required. The digital menu loads instantly.",
      icon: QrCodeScannerIcon,
      color: "border-purple-500",
    },
    {
      number: 2,
      title: "Browse & Select Meal",
      description:
        "View full digital menu with meal names, descriptions, ingredient lists, and prices. Tap on any meal to select it.",
      icon: RestaurantMenuIcon,
      color: "border-blue-500",
    },
    {
      number: 3,
      title: "AI Health Analysis",
      description:
        "Gemini AI analyzes ingredients to identify potential allergies and chronic diseases like peanut allergy, diabetes, and hypertension.",
      icon: SmartToyIcon,
      color: "border-indigo-500",
    },
    {
      number: 4,
      title: "AI Modification Suggestions",
      description:
        "AI returns specific modifications to make the meal safe - removing peanuts, reducing sugar, or changing cooking oil.",
      icon: SecurityIcon,
      color: "border-green-500",
    },
    {
      number: 5,
      title: "Safety Intercept Check",
      description:
        'Final safety check ensures modifications match conditions. Order is saved as "chef pending" only if safe.',
      icon: CheckCircleIcon,
      color: "border-teal-500",
    },
    {
      number: 6,
      title: "Kitchen Screen Display",
      description:
        "Order appears on kitchen screen with table number, meal name, modifications, and medical alerts.",
      icon: KitchenIcon,
      color: "border-orange-500",
    },
    {
      number: 7,
      title: "Chef Confirmation",
      description:
        "Chef confirms or rejects order with reason. If confirmed, preparation time is calculated with modifications.",
      icon: LocalDiningIcon,
      color: "border-yellow-500",
    },
    {
      number: 8,
      title: "Real-time Timer",
      description:
        "Customer receives countdown timer showing exact minutes and seconds until meal is ready.",
      icon: TimerIcon,
      color: "border-red-500",
    },
    {
      number: 9,
      title: "Ready Notification",
      description:
        "Chef marks order ready. Customer gets notification and waiter delivers the meal.",
      icon: CheckCircleIcon,
      color: "border-emerald-500",
    },
    {
      number: 10,
      title: "Secure Payment",
      description:
        "Pay via Flutterwave with MTN Mobile Money, Airtel Money, or credit card. Order status completes.",
      icon: PaymentIcon,
      color: "border-cyan-500",
    },
  ];

  return (
    <>
      {/* Hero Slider Section */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsContactOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition shadow-lg"
            >
              Contact Us
            </motion.button>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition z-20"
        >
          <NavigateBeforeIcon className="text-white text-3xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition z-20"
        >
          <NavigateNextIcon className="text-white text-3xl" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of dining with our 10-step AI-powered
              ordering system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                color={step.color}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Try Our AI Ordering System
            </h2>
            <p className="text-xl text-gray-600">
              Experience steps 2-10 with our interactive demo
            </p>
          </motion.div>

          {/* Menu Selection */}
          {!selectedMeal && (
            <div className="grid md:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <motion.div
                  key={meal.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-orange-500 transition"
                  onClick={() => analyzeMeal(meal)}
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{meal.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {meal.ingredients.substring(0, 60)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-600">
                        {meal.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        ⏱️ {meal.prepTime} min
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* AI Analysis */}
          {aiAnalysis && selectedMeal && !modifications.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SmartToyIcon className="text-4xl text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  AI Health Analysis
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                This meal may affect the following conditions:
              </p>
              <div className="space-y-3 mb-6">
                {aiAnalysis.conditions?.map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      value={condition}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedConditions([
                            ...selectedConditions,
                            condition,
                          ]);
                        } else {
                          setSelectedConditions(
                            selectedConditions.filter((c) => c !== condition),
                          );
                        }
                      }}
                      className="w-5 h-5 text-purple-600 rounded"
                    />
                    <span className="text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={getModifications}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                Continue with Selected Conditions
              </button>
            </motion.div>
          )}

          {/* Modifications Selection */}
          {modifications.length > 0 && !orderStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center space-x-3 mb-6">
                <SecurityIcon className="text-4xl text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Suggested Modifications
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                {modifications.map((mod) => (
                  <label
                    key={mod.id}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="flex-1 text-gray-700">
                      {mod.description}
                    </span>
                    {mod.extraTime > 0 && (
                      <span className="text-sm text-orange-600">
                        +{mod.extraTime} min
                      </span>
                    )}
                  </label>
                ))}
              </div>
              <button
                onClick={() => placeOrder(modifications)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Confirm Order with Modifications
              </button>
            </motion.div>
          )}

          {/* Order Status & Timer */}
          {orderStatus && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-md mx-auto text-center"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Order Status
              </h3>
              <div className="bg-white p-4 rounded-xl mb-4">
                <p className="text-gray-600">
                  Order ID:{" "}
                  <span className="font-mono">{orderStatus.orderId}</span>
                </p>
                <p className="text-gray-600">
                  Status:
                  <span
                    className={`font-semibold ${
                      orderStatus.status === "pending"
                        ? "text-yellow-600"
                        : orderStatus.status === "ready"
                          ? "text-green-600"
                          : "text-blue-600"
                    }`}
                  >
                    {" "}
                    {orderStatus.status}
                  </span>
                </p>
              </div>
              {timer !== null && (
                <div className="mb-6">
                  <TimerIcon className="text-5xl text-orange-600 mx-auto mb-3 animate-pulse" />
                  <p className="text-5xl font-bold text-orange-600 font-mono">
                    {Math.floor(timer / 60)}:
                    {String(timer % 60).padStart(2, "0")}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Estimated time until ready
                  </p>
                </div>
              )}
              {orderStatus.status === "ready" && (
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <PaymentIcon />
                  <span>Pay Now - {selectedMeal?.price}</span>
                </button>
              )}
            </motion.div>
          )}

          {/* Reset Button */}
          {(selectedMeal || modifications.length > 0 || orderStatus) && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setSelectedMeal(null);
                  setAiAnalysis(null);
                  setSelectedConditions([]);
                  setModifications([]);
                  setOrderStatus(null);
                  setTimer(null);
                }}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Manager Weekly Report Section */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Manager Weekly Report</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Every week, the system automatically counts how many times each
              meal was modified and which modifications were most popular.
              Managers can select one modification to be added to the menu as a
              permanent official meal.
            </p>
            <div className="bg-white/10 rounded-2xl p-8 inline-block">
              <div className="flex items-center space-x-4">
                <div className="text-left">
                  <p className="text-sm text-gray-400">
                    Most Popular Modification This Week
                  </p>
                  <p className="text-2xl font-bold text-yellow-400">
                    "Remove Peanuts"
                  </p>
                  <p className="text-sm text-gray-400">
                    Applied to 47 orders | +12% customer satisfaction
                  </p>
                </div>
            
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
};


