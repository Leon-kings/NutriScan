/* eslint-disable no-unused-vars */
// components/Services.jsx - FIXED VERSION
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentIcon from "@mui/icons-material/Payment";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BarChartIcon from "@mui/icons-material/BarChart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DiamondIcon from "@mui/icons-material/Diamond";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// FIXED: Use CheckCircleIcon instead of CheckCircleOutlineIcon
// FIXED: Use VerifiedIcon or keep CheckCircleIcon

const API_BASE_URL = "https://your-api.com/api"; // Replace with your actual API URL

export const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [pricingPlan, setPricingPlan] = useState("monthly");
  const [faqOpen, setFaqOpen] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  // Services Data
  const services = [
    {
      id: 1,
      icon: <QrCodeScannerIcon />,
      title: "QR Code Ordering System",
      shortDesc: "Contactless ordering with instant menu access",
      fullDesc:
        "Place QR codes on every table. Customers scan with their phone camera to access your full digital menu instantly. No app download, no registration required. Perfect for quick service and improved table turnover.",
      features: [
        "Instant menu loading",
        "No app installation needed",
        "Multi-language support",
        "Customizable QR designs",
        "Real-time menu updates",
        "Table management integration",
      ],
      pricing: { basic: 49, pro: 99, enterprise: 199 },
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      icon: <SmartToyIcon />,
      title: "AI Health Analysis",
      shortDesc: "Gemini AI-powered ingredient analysis",
      fullDesc:
        "Our advanced AI analyzes every meal ingredient to identify potential allergens and health risks. Get instant alerts for peanuts, gluten, dairy, diabetes concerns, hypertension risks, and more. Keep your customers safe and build trust.",
      features: [
        "Instant allergen detection",
        "Chronic disease risk assessment",
        "Ingredient breakdown",
        "Custom allergy profiles",
        "Medical alert system",
        "Safety recommendations",
      ],
      pricing: { basic: 79, pro: 149, enterprise: 299 },
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      icon: <SecurityIcon />,
      title: "Safety Intercept System",
      shortDesc: "Automatic order safety verification",
      fullDesc:
        "Before any order reaches the kitchen, our system performs a comprehensive safety check. If a customer has a condition but didn't select the corresponding modification, the order is blocked and the customer is prompted to review their choices.",
      features: [
        "Real-time safety checks",
        "Automatic order blocking",
        "Customer notification system",
        "Modification validation",
        "Emergency override option",
        "Compliance reporting",
      ],
      pricing: { basic: 59, pro: 129, enterprise: 249 },
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      icon: <KitchenIcon />,
      title: "Kitchen Display System",
      shortDesc: "Real-time kitchen order management",
      fullDesc:
        "Orders appear instantly on kitchen screens with all necessary details - table number, meal name, requested modifications, and medical alerts. Chefs can confirm or reject orders with reasons, improving kitchen efficiency.",
      features: [
        "Instant order display",
        "Medical alert highlighting",
        "Chef confirmation system",
        "Rejection reason tracking",
        "Preparation time tracking",
        "Multiple screen support",
      ],
      pricing: { basic: 69, pro: 139, enterprise: 269 },
      image:
        "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      icon: <TimerIcon />,
      title: "Real-Time Order Tracking",
      shortDesc: "Live timer for customer updates",
      fullDesc:
        "Customers receive a countdown timer showing exact preparation time. The timer updates in real-time based on meal complexity and modifications. When the meal is ready, customers get instant notifications.",
      features: [
        "Live countdown timer",
        "Push notifications",
        "SMS updates option",
        "Estimated vs actual time",
        "Delay notifications",
        "Ready alerts",
      ],
      pricing: { basic: 39, pro: 89, enterprise: 179 },
      image:
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 6,
      icon: <PaymentIcon />,
      title: "Multi-Payment Gateway",
      shortDesc: "Seamless payment integration",
      fullDesc:
        "Integrated with Flutterwave for multiple payment options including MTN Mobile Money, Airtel Money, credit cards, and bank transfers. Secure, fast, and reliable payment processing.",
      features: [
        "MTN Mobile Money",
        "Airtel Money integration",
        "Credit/Debit cards",
        "Bank transfers",
        "Digital wallets",
        "Automated receipts",
      ],
      pricing: { basic: 29, pro: 79, enterprise: 159 },
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: 7,
      icon: <AnalyticsIcon />,
      title: "Manager Analytics & Reports",
      shortDesc: "Weekly insights and performance data",
      fullDesc:
        "Automatic weekly reports showing most modified meals, popular modifications, customer preferences, and operational efficiency. Make data-driven decisions to improve your menu and service.",
      features: [
        "Weekly modification reports",
        "Popular meal analytics",
        "Customer preference tracking",
        "Revenue analytics",
        "Menu optimization insights",
        "Export to PDF/Excel",
      ],
      pricing: { basic: 89, pro: 169, enterprise: 329 },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 8,
      icon: <SupportAgentIcon />,
      title: "24/7 Customer Support",
      shortDesc: "Round-the-clock technical assistance",
      fullDesc:
        "Dedicated support team available 24/7 via chat, email, and phone. Get instant help for any technical issues, training for your staff, and regular system updates.",
      features: [
        "24/7 live chat support",
        "Email ticketing system",
        "Phone support (priority)",
        "Staff training included",
        "Regular system updates",
        "Onboarding assistance",
      ],
      pricing: { basic: 99, pro: 199, enterprise: 399 },
      image:
        "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600",
      color: "from-red-500 to-pink-500",
    },
  ];

  // Pricing Plans
  const pricingPlans = [
    {
      name: "Basic",
      price: { monthly: 49, yearly: 490 },
      features: [
        "Up to 5 restaurants",
        "Basic AI analysis",
        "Email support",
        "Monthly reports",
        "QR code generation",
        "Basic analytics",
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 99, yearly: 990 },
      features: [
        "Up to 20 restaurants",
        "Advanced AI analysis",
        "Priority support 24/7",
        "Weekly reports",
        "Custom QR designs",
        "Advanced analytics",
        "API access",
        "Staff training included",
      ],
      color: "from-purple-500 to-pink-500",
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 199, yearly: 1990 },
      features: [
        "Unlimited restaurants",
        "Full AI suite",
        "Dedicated account manager",
        "Daily reports",
        "White-label solution",
        "Custom integrations",
        "Full API access",
        "On-site training",
        "SLA guarantee",
      ],
      color: "from-orange-500 to-red-500",
      popular: false,
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "How does the AI allergy detection work?",
      answer:
        "Our AI (powered by Gemini) analyzes every ingredient in each meal and cross-references it with known allergens and chronic conditions. It identifies potential risks like peanut allergy, gluten sensitivity, diabetes concerns, and hypertension risks in real-time.",
    },
    {
      question: "Is there a contract or minimum commitment?",
      answer:
        "No long-term contracts! We offer monthly and yearly plans with no hidden fees. You can cancel anytime with 30 days notice.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Most restaurants are up and running within 24-48 hours. We provide full onboarding support and staff training included in all plans.",
    },
    {
      question: "Can I integrate with my existing POS system?",
      answer:
        "Yes! Our API allows seamless integration with most POS systems. Enterprise plans include custom integration support.",
    },
    {
      question: "Is customer data secure?",
      answer:
        "Absolutely. We use bank-level encryption (256-bit SSL) and comply with GDPR and local data protection regulations. Customer health data is never shared without consent.",
    },
    {
      question: "What payment methods do you support?",
      answer:
        "We support MTN Mobile Money, Airtel Money, all major credit cards (Visa, Mastercard, Amex), and bank transfers through Flutterwave.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleContactSales = async (planName) => {
    try {
      await axios.post(`${API_BASE_URL}/contact-sales`, {
        plan: planName,
        timestamp: new Date().toISOString(),
      });
      toast.success(
        `Thank you for your interest in the ${planName} plan! Our sales team will contact you shortly.`,
      );
    } catch (error) {
      toast.error(
        "Failed to submit request. Please try again or call our sales team.",
      );
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Comprehensive solutions for modern restaurant management
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
              >
                View All Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>

        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 32L48 42.7C96 53.3 192 74.7 288 74.7C384 74.7 480 53.3 576 42.7C672 32 768 32 864 42.7C960 53.3 1056 74.7 1152 74.7C1248 74.7 1344 53.3 1392 42.7L1440 32V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z"
            fill="#F9FAFB"
          />
        </svg>
      </div>

      {/* Services Grid Section */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000')", // professional kitchen/cooking image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // optional parallax effect
        }}
      >
        {/* Overlay to make background image NOT clearly visible */}
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to transform your restaurant
                operations
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => setActiveService(service.id)}
                >
                  <div
                    className={`bg-gradient-to-r ${service.color} p-6 text-white`}
                  >
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-sm opacity-90 mt-2">
                      {service.shortDesc}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">
                      {service.fullDesc.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <button className="text-orange-600 font-semibold flex items-center group-hover:translate-x-1 transition">
                        Learn More <ArrowForwardIcon className="ml-1 text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeService !== 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={() => setActiveService(0)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000')", // different image - delicious food spread
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Overlay to make background image NOT clearly visible */}
                <div className="absolute inset-0 bg-white/90 rounded-2xl"></div>

                <div className="relative z-10">
                  {services
                    .filter((s) => s.id === activeService)
                    .map((service) => (
                      <div key={service.id}>
                        <div
                          className={`bg-gradient-to-r ${service.color} p-6 text-white sticky top-0`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <div className="text-4xl">{service.icon}</div>
                              <h2 className="text-2xl font-bold">
                                {service.title}
                              </h2>
                            </div>
                            <button
                              onClick={() => setActiveService(0)}
                              className="p-2 bg-gradient-to-t from-red-500 to-red-700 text-white rounded-full transition hover:scale-110"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full md:w-1/2 rounded-xl object-cover shadow-md"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                              Key Features
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {service.features.map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg"
                                >
                                  <CheckCircleIcon className="text-green-500" />
                                  <span className="text-gray-700">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Why Choose Us Section */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000')", // modern restaurant interior with warm lighting
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // optional parallax effect
        }}
      >
        {/* Overlay to make background image NOT clearly visible */}
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-600">
                What makes us different from the competition
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <DiamondIcon />,
                  title: "Enterprise Grade",
                  desc: "Built for scale with 99.9% uptime",
                },
                {
                  icon: <SecurityOutlinedIcon />,
                  title: "Bank-Level Security",
                  desc: "256-bit SSL encryption",
                },
                {
                  icon: <SupportAgentIcon />,
                  title: "24/7 Support",
                  desc: "Round-the-clock assistance",
                },
                {
                  icon: <EmojiEventsIcon />,
                  title: "Award Winning",
                  desc: "Recognized industry leader",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl hover:shadow-lg transition bg-white/80 backdrop-blur-sm"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000')", // cozy coffee shop/cafe ambiance
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // optional parallax effect
        }}
      >
        {/* Overlay to make background image NOT clearly visible */}
        <div className="absolute inset-0 bg-gray-100/85"></div>

        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Got questions? We've got answers
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50/80 transition"
                  >
                    <span className="font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    <span className="text-2xl text-orange-600 font-bold">
                      {faqOpen === index ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
