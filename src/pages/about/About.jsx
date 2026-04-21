/* eslint-disable no-unused-vars */
// components/About.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import axios from "axios";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentIcon from "@mui/icons-material/Payment";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import TimelineIcon from "@mui/icons-material/Timeline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { toast } from "react-toastify";

const API_BASE_URL = "https://your-api.com/api"; // Replace with your actual API URL

export const About = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoSlide, setAutoSlide] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const autoSlideRef = useRef(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/testimonials`, {
          headers: { "Content-Type": "application/json" },
        });

        // If API returns data, use it; otherwise use fallback data
        if (response.data && response.data.testimonials) {
          setTestimonials(response.data.testimonials);
        } else {
          // Fallback testimonials in case API fails
          setTestimonials([
            {
              id: 1,
              name: "James Wilson",
              role: "Restaurant Owner",
              image: "https://randomuser.me/api/portraits/men/41.jpg",
              content:
                "This system transformed our restaurant. AI allergy detection saved a customer last month! The safety features give our customers peace of mind.",
              rating: 5,
              date: "2024-03-15",
            },
            {
              id: 2,
              name: "Lisa Thompson",
              role: "Customer",
              image: "https://randomuser.me/api/portraits/women/29.jpg",
              content:
                "As someone with peanut allergy, I finally feel safe eating out. The AI modifications are life-saving! I can now dine without constant worry.",
              rating: 5,
              date: "2024-03-10",
            },
            {
              id: 3,
              name: "Chef Marco Rossi",
              role: "Head Chef",
              image: "https://randomuser.me/api/portraits/men/75.jpg",
              content:
                "Kitchen screen with medical alerts helps us prepare safe meals for every customer. The system is intuitive and saves us time.",
              rating: 5,
              date: "2024-03-05",
            },
            {
              id: 4,
              name: "Sarah Chen",
              role: "Restaurant Manager",
              image: "https://randomuser.me/api/portraits/women/56.jpg",
              content:
                'The weekly reports help us understand customer preferences. We added "no peanuts" as a permanent menu item based on data!',
              rating: 5,
              date: "2024-02-28",
            },
            {
              id: 5,
              name: "Dr. Marcus Brown",
              role: "Regular Customer",
              image: "https://randomuser.me/api/portraits/men/45.jpg",
              content:
                "Being diabetic, I love how the AI suggests sugar modifications. Finally, a restaurant that cares about my health!",
              rating: 5,
              date: "2024-02-20",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Failed to load testimonials. Using demo data.");
        // Fallback data
        setTestimonials([
          {
            id: 1,
            name: "James Wilson",
            role: "Restaurant Owner",
            image: "https://randomuser.me/api/portraits/men/41.jpg",
            content:
              "This system transformed our restaurant. AI allergy detection saved a customer last month!",
            rating: 5,
            date: "2024-03-15",
          },
          {
            id: 2,
            name: "Lisa Thompson",
            role: "Customer",
            image: "https://randomuser.me/api/portraits/women/29.jpg",
            content:
              "As someone with peanut allergy, I finally feel safe eating out. The AI modifications are life-saving!",
            rating: 5,
            date: "2024-03-10",
          },
          {
            id: 3,
            name: "Chef Marco Rossi",
            role: "Head Chef",
            image: "https://randomuser.me/api/portraits/men/75.jpg",
            content:
              "Kitchen screen with medical alerts helps us prepare safe meals for every customer.",
            rating: 5,
            date: "2024-03-05",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide && testimonials.length > 0) {
      autoSlideRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [autoSlide, testimonials.length]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setAutoSlide(false);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleMouseLeave = () => {
    setAutoSlide(true);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  const stats = [
    {
      icon: <StorefrontIcon />,
      value: "500+",
      label: "Restaurants",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <PeopleIcon />,
      value: "50K+",
      label: "Daily Orders",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <SmartToyIcon />,
      value: "99.9%",
      label: "AI Accuracy",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <TimelineIcon />,
      value: "< 2min",
      label: "Avg Response",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const features = [
    {
      icon: <QrCodeScannerIcon />,
      title: "QR Code Ordering",
      description:
        "Instant menu access by scanning QR code on each table. No app download required.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <SmartToyIcon />,
      title: "AI Health Analysis",
      description:
        "Gemini AI analyzes ingredients for allergies and chronic diseases instantly.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <SecurityIcon />,
      title: "Safety Intercept System",
      description:
        "Automatic safety checks prevent unsafe orders before they reach the kitchen.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <SpeedIcon />,
      title: "Real-Time Tracking",
      description: "Live timer shows exactly when your meal will be ready.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <RestaurantIcon />,
      title: "Kitchen Integration",
      description:
        "Orders appear instantly on kitchen screen with medical alerts.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <PaymentIcon />,
      title: "Multiple Payments",
      description: "MTN Mobile Money, Airtel Money, and credit card support.",
      color: "bg-indigo-100 text-indigo-600",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Former restaurant owner with 15+ years of experience",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "AI expert from Google, passionate about food tech",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Health Advisor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Board-certified allergist and nutritionist",
    },
    {
      name: "David Kim",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      bio: "Former restaurant chain operations director",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "Started with a vision to make dining safe for everyone",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated Gemini AI for health analysis",
    },
    {
      year: "2024",
      title: "50K Daily Orders",
      description: "Reached 50,000 daily orders across 500+ restaurants",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding to international markets",
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

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative  overflow-hidden">
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
              About QR Restaurant
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8">
              Revolutionizing the dining experience with AI-powered safety and
              seamless ordering
            </p>
          </motion.div>
        </div>

        {/* Wave SVG */}
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl text-white text-center shadow-xl`}
            >
              <div className="text-4xl mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Tabs */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay to make background image NOT clearly visible - adjust opacity as needed */}
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md inline-flex">
              <button
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  activeTab === "mission"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  activeTab === "vision"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Our Vision
              </button>
              <button
                onClick={() => setActiveTab("values")}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  activeTab === "values"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Our Values
              </button>
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            {activeTab === "mission" && (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To make dining safe, accessible, and delightful for everyone
                  by leveraging cutting-edge AI technology. We're committed to
                  eliminating food-related health risks and empowering customers
                  with real-time information about their meals.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </div>
              </>
            )}
            {activeTab === "vision" && (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A world where every restaurant meal is customized for
                  individual health needs, where allergies and dietary
                  restrictions never stand in the way of enjoying great food,
                  and where technology seamlessly connects customers, kitchens,
                  and health data.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </div>
              </>
            )}
            {activeTab === "values" && (
              <>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h3 className="font-bold text-orange-600 mb-2">
                      Safety First
                    </h3>
                    <p className="text-gray-600">
                      Customer health is our top priority
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-600 mb-2">
                      Innovation
                    </h3>
                    <p className="text-gray-600">
                      Constantly improving with AI
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-600 mb-2">
                      Transparency
                    </h3>
                    <p className="text-gray-600">
                      Clear ingredient and modification info
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className="relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000')", // different image - restaurant dining table with food
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // optional: creates parallax effect
        }}
      >
        {/* Overlay to make background image NOT clearly visible */}
        <div className="absolute inset-0 bg-gray-100/85"></div>

        <div className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the features that make us the future of dining
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition group"
                >
                  <div
                    className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Auto-Slide */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by restaurants and customers worldwide
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div
              className="relative max-w-4xl mx-auto"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10"
              >
                <NavigateBeforeIcon className="text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition z-10"
              >
                <NavigateNextIcon className="text-gray-600" />
              </button>

              {/* Testimonial Slider */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img
                          src={testimonials[currentTestimonial]?.image}
                          alt={testimonials[currentTestimonial]?.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-1">
                          <FormatQuoteIcon className="text-white text-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mb-4">
                      {renderStars(
                        testimonials[currentTestimonial]?.rating || 5,
                      )}
                    </div>

                    <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial]?.content}"
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {testimonials[currentTestimonial]?.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-2">
                      {testimonials[currentTestimonial]?.role}
                    </p>
                    <p className="text-sm text-gray-400">
                      {testimonials[currentTestimonial]?.date &&
                        new Date(
                          testimonials[currentTestimonial].date,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`transition-all duration-300 ${
                      currentTestimonial === index
                        ? "w-8 h-2 bg-orange-600 rounded-full"
                        : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Auto-slide indicator */}
              {autoSlide && (
                <div className="flex justify-center mt-4">
                  <div className="text-xs text-gray-400 animate-pulse">
                    Auto-sliding • Hover to pause
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
