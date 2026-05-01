/* eslint-disable no-unused-vars */
// Slider.jsx
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Restaurant,
  Fastfood,
  LocalDrink,
  Cake,
 
  SetMeal,
  EmojiEmotions,
  LocalPizza,
} from "@mui/icons-material";

export const Slider = ({ items = [], autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Default featured items if none provided
  const defaultItems = [
    {
      id: 1,
      name: "Isombe ya Nyama",
      category: "Traditional Rwandan Dish",
      price: "2,800 RWF",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop",
      description: "Traditional cassava leaf stew with beef, coconut milk, and authentic African spices",
    },
    {
      id: 2,
      name: "Grilled Tilapia",
      category: "Fresh Seafood",
      price: "4,500 RWF",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&h=600&fit=crop",
      description: "Fresh lake tilapia grilled to perfection with lemon, garlic, and rosemary",
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      category: "Decadent Dessert",
      price: "6,500 RWF",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&h=600&fit=crop",
      description: "Warm molten chocolate cake with vanilla ice cream",
    },
    {
      id: 4,
      name: "Margherita Pizza",
      category: "Italian Classic",
      price: "5,200 RWF",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=1200&h=600&fit=crop",
      description: "Classic Italian pizza with fresh tomato sauce, mozzarella, and basil",
    },
    {
      id: 5,
      name: "Sweet Masala Chai",
      category: "Beverages",
      price: "1,200 RWF",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=600&fit=crop",
      description: "Traditional spiced tea with cardamom, ginger, and cinnamon",
    },
  ];

  const sliderItems = items.length > 0 ? items : defaultItems;
  const totalSlides = sliderItems.length;

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && totalSlides > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, isHovered, totalSlides, interval]);

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next slide
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right - previous slide
      goToPrevious();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("dish") || categoryLower.includes("rwandan"))
      return <SetMeal className="text-orange-500 text-base sm:text-lg" />;
    if (categoryLower.includes("seafood") || categoryLower.includes("fish"))
      return <Fastfood className="text-blue-500 text-base sm:text-lg" />;
    if (categoryLower.includes("dessert"))
      return <Cake className="text-pink-500 text-base sm:text-lg" />;
    if (categoryLower.includes("pizza"))
      return <LocalPizza className="text-red-500 text-base sm:text-lg" />;
    if (categoryLower.includes("beverage") || categoryLower.includes("tea"))
      return <LocalDrink className="text-green-500 text-base sm:text-lg" />;
    return <Restaurant className="text-orange-500 text-base sm:text-lg" />;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Container */}
      <div className="relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${sliderItems[currentIndex].image})`,
              }}
            >
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-2xl lg:max-w-3xl"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-md rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 mb-2 sm:mb-3 md:mb-4">
                  {getCategoryIcon(sliderItems[currentIndex].category)}
                  <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">
                    {sliderItems[currentIndex].category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 md:mb-3 leading-tight">
                  {sliderItems[currentIndex].name}
                </h2>

                {/* Description - hidden on smallest screens, visible from sm up */}
                <p className="hidden sm:block text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">
                  {sliderItems[currentIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop only (visible from md up) */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-base sm:text-xl md:text-2xl" />
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="text-base sm:text-xl md:text-2xl" />
          </button>
        </>
      )}

      {/* Mobile Navigation Buttons (sm only) */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 backdrop-blur-sm z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-sm" />
          </button>
          <button
            onClick={goToNext}
            className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 backdrop-blur-sm z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="text-sm" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
          {sliderItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? "bg-white w-4 sm:w-5 md:w-6 h-1.5 sm:h-2"
                  : "bg-white/50 hover:bg-white/80 w-1.5 sm:w-2 h-1.5 sm:h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter (optional - visible on lg and up) */}
      {totalSlides > 1 && (
        <div className="hidden lg:block absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 z-10">
          <span className="text-white text-[10px] sm:text-xs">
            {currentIndex + 1} / {totalSlides}
          </span>
        </div>
      )}
    </div>
  );
};

