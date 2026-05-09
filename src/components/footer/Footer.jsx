import React from "react";
import { motion } from "framer-motion";
import {
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Copyright as CopyrightIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon,
  LocalShipping as DeliveryIcon,
  SupportAgent as SupportIcon,
  ArrowUpward as ArrowUpwardIcon,
  QrCodeScanner as QrIcon,
  RestaurantMenu as MenuIcon,
  SmartToy as AiIcon,
  Timeline as TimelineIcon,
  Diamond as DiamondIcon,
  Verified as VerifiedIcon,
  Stars as StarsIcon,
} from "@mui/icons-material";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FacebookIcon />,
      url: "#",
      label: "Facebook",
      bg: "from-blue-600 to-blue-700",
      color: "text-blue-400",
    },
    {
      icon: <InstagramIcon />,
      url: "#",
      label: "Instagram",
      bg: "from-pink-500 to-purple-600",
      color: "text-pink-400",
    },
    {
      icon: <TwitterIcon />,
      url: "#",
      label: "Twitter",
      bg: "from-sky-500 to-blue-600",
      color: "text-sky-400",
    },
    {
      icon: <WhatsAppIcon />,
      url: "#",
      label: "WhatsApp",
      bg: "from-green-500 to-green-600",
      color: "text-green-400",
    },
  ];

  const features = [
    {
      icon: <AiIcon />,
      title: "AI-Powered Health Insights",
      desc: "Smart nutrition analysis",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: <DeliveryIcon />,
      title: "Lightning Fast Delivery",
      desc: "30 mins or less",
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: <PaymentIcon />,
      title: "Secure Payments",
      desc: "100% encrypted",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <SupportIcon />,
      title: "24/7 Customer Support",
      desc: "Always here for you",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: <QrIcon />,
      title: "QR Scan & Order",
      desc: "Contactless dining",
      color: "from-indigo-500 to-purple-500",
      bg: "bg-indigo-500/10",
    },
    {
      icon: <DiamondIcon />,
      title: "Premium Quality",
      desc: "Fresh ingredients",
      color: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-500/10",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-32 opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="currentColor"
            className="text-orange-500"
          />
        </svg>
      </div>

      {/* Decorative Floating Food Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-5 text-5xl opacity-10"
        >
          🍕
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 text-6xl opacity-10"
        >
          🍔
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 text-4xl opacity-10"
        >
          🥗
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-1/3 left-10 text-5xl opacity-10"
        >
          🍝
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-1/2 left-1/4 text-4xl opacity-10"
        >
          🍣
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-32 right-1/3 text-5xl opacity-10"
        >
          🍰
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white shadow-2xl">
        {/* Animated Top Border with Glow */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-orange-500 via-red-500 via-purple-500 to-transparent"
        />

        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-orange-500/30 blur-xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Top Section with Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Brand Column - 4 columns */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-3 mb-4"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-2xl shadow-lg"
                >
                  <RestaurantIcon className="text-white text-2xl" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                    NutriScan·AI
                  </h3>
                  <p className="text-xs text-gray-400">
                    Smart Dining Experience
                  </p>
                </div>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs mx-auto lg:mx-0">
                AI-powered health insights and real-time order tracking for a
                smarter, healthier dining experience. Make informed food choices
                with our intelligent nutrition analysis.
              </p>
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
                >
                  <VerifiedIcon className="text-emerald-400 text-sm" />
                  <span className="text-xs text-gray-300">AI Verified</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10"
                >
                  <StarsIcon className="text-yellow-400 text-sm" />
                  <span className="text-xs text-gray-300">4.9 Rating</span>
                </motion.div>
              </div>
              {/* Social Icons with Enhanced Style */}
              <div className="flex justify-center lg:justify-start gap-3">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-2.5 rounded-full bg-gradient-to-br ${social.bg} shadow-lg transition-all duration-300 hover:shadow-xl ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links - 4 columns */}
            <div className="lg:col-span-4"></div>

            {/* Features Highlights - 4 columns */}
            <div className="lg:col-span-4">
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-bold text-lg mb-5 flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="text-orange-400">🏆</span>
                Premium Features
              </motion.h4>
              <div className="space-y-3">
                {features.slice(0, 4).map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`${feature.bg} rounded-xl p-3 transition-all duration-300 border border-white/5 hover:border-orange-500/30`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} bg-opacity-20`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <div
                  className={`${feature.bg} p-3 rounded-2xl mb-2 group-hover:shadow-lg transition-all duration-300 border border-white/5 group-hover:border-orange-500/30`}
                >
                  <div
                    className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}
                  >
                    {React.cloneElement(feature.icon, { sx: { fontSize: 28 } })}
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-300">
                  {feature.title}
                </p>
                <p className="text-[10px] text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10 rounded-2xl p-5 mb-8 border border-orange-500/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-orange-500/20 p-2.5 rounded-full">
                  <LocationIcon className="text-orange-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-400">Visit Us</p>
                  <p className="text-sm font-medium">
                    123 Food Street, Kigali, Rwanda
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-orange-500/20 p-2.5 rounded-full">
                  <PhoneIcon className="text-orange-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-400">Call Us</p>
                  <p className="text-sm font-medium">+250 788 123 456</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="bg-orange-500/20 p-2.5 rounded-full">
                  <EmailIcon className="text-orange-400" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-gray-400">Email Us</p>
                  <p className="text-sm font-medium">hello@nutriscan.ai</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider with Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"
          />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 text-center">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <CopyrightIcon sx={{ fontSize: 14 }} />
              <span>{currentYear} NutriScan·AI. All rights reserved.</span>
              <span className="hidden sm:inline text-gray-700">|</span>
              <span className="text-xs text-gray-600">v2.0.0</span>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-1.5"
              >
                <FavoriteIcon className="text-red-500 text-sm" />
              </motion.div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-500">Secure payments:</p>
              <div className="flex gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/98/Visa_Inc._logo_%282005%E2%80%932014%29.svg"
                  alt="Visa"
                  className="h-5 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/250px-MasterCard_Logo.svg.png"
                  alt="Mastercard"
                  className="h-5 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                />
                <img
                  src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
                  alt="PayPal"
                  className="h-5 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0b/M-PESA.png"
                  alt="M-Pesa"
                  className="h-5 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                />
                <img
                  src="https://uploads-eu-west-1.insided.com/mtngroup-en/attachment/8766d22f-ba58-4e9d-87c7-024691b61972_thumb.png"
                  alt="M-Pesa"
                  className="h-5 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group"
        >
          <ArrowUpwardIcon className="group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>

        {/* Bottom Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 opacity-5 text-9xl pointer-events-none">
          🍽️
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-5 text-9xl pointer-events-none">
          🍷
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </footer>
  );
};
