/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
// components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SendIcon from "@mui/icons-material/Send";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const API_BASE_URL = "https://your-api.com/api"; // Replace with your actual API URL

// Password strength checker
const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, gradientColor }) => {
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden mx-4">
              <div
                className={`${gradientColor} p-4 flex justify-between items-center`}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition text-white"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="flex flex-col lg:flex-row max-h-[85vh] overflow-y-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Left Form / Right Image Layout Component
const FormWithImage = ({ formContent, imageSrc, imageAlt }) => (
  <>
    <div className="lg:w-1/2 p-4 sm:p-6 bg-white">{formContent}</div>
    <div className="lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-xl shadow-lg object-cover max-h-80 lg:max-h-96 hover:scale-105 transition-transform duration-300"
      />
    </div>
  </>
);

// Enhanced Input Field Component with validation
const InputField = ({
  icon: IconComponent,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  onBlur,
  touched,
}) => (
  <div className="mb-4">
    <div className="relative group">
      <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors text-xl" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full pl-12 pr-4 py-3 border-2 ${
          error && touched
            ? "border-red-500 bg-red-50"
            : touched && value
            ? "border-green-500 bg-green-50"
            : "border-gray-200"
        } rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200`}
        placeholder={placeholder}
        required={required}
      />
      {touched && value && !error && (
        <CheckCircleIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
      )}
      {touched && error && (
        <CancelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
      )}
    </div>
    {error && touched && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xs mt-1 ml-2"
      >
        {error}
      </motion.p>
    )}
  </div>
);

// Password Field with visibility toggle and strength indicator
const PasswordField = ({
  icon: IconComponent,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  onBlur,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = checkPasswordStrength(value);

  const getStrengthColor = () => {
    if (strength === 0) return "bg-gray-200";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength === 0) return "";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  };

  return (
    <div className="mb-4">
      <div className="relative group">
        <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors text-xl" />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-12 pr-12 py-3 border-2 ${
            error && touched
              ? "border-red-500 bg-red-50"
              : touched && value && strength === 3
              ? "border-green-500 bg-green-50"
              : "border-gray-200"
          } rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200`}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
      {value && touched && (
        <div className="mt-2">
          <div className="flex gap-1 h-1.5">
            <div
              className={`flex-1 rounded-full transition-all ${
                strength >= 1 ? getStrengthColor() : "bg-gray-200"
              }`}
            />
            <div
              className={`flex-1 rounded-full transition-all ${
                strength >= 2 ? getStrengthColor() : "bg-gray-200"
              }`}
            />
            <div
              className={`flex-1 rounded-full transition-all ${
                strength >= 3 ? getStrengthColor() : "bg-gray-200"
              }`}
            />
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Password strength: {getStrengthText()}
            {strength < 3 && (
              <span className="block text-gray-400">
                Must contain: 6+ chars, numbers, symbols
              </span>
            )}
          </p>
        </div>
      )}
      {error && touched && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 ml-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Text Area Field Component
const TextAreaField = ({
  icon: IconComponent,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  touched,
}) => (
  <div className="mb-4">
    <div className="relative">
      <IconComponent className="absolute left-3 top-3 text-gray-400 text-xl" />
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full pl-12 pr-4 py-3 border-2 ${
          error && touched ? "border-red-500 bg-red-50" : "border-gray-200"
        } rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200`}
        placeholder={placeholder}
      />
    </div>
    {error && touched && (
      <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>
    )}
  </div>
);

// Navbar Component
export const Navbar = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  // Touched states for validation
  const [contactTouched, setContactTouched] = useState({});
  const [bookTouched, setBookTouched] = useState({});
  const [loginTouched, setLoginTouched] = useState({});
  const [registerTouched, setRegisterTouched] = useState({});

  // Form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [bookForm, setBookForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    table: "",
    specialRequests: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 6;
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasMinLength) return "Password must be at least 6 characters";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSymbol) return "Password must contain at least one symbol";
    return null;
  };

  // Contact validation
  const validateContactField = (name, value) => {
    if (name === "name") return !value ? "Name is required" : null;
    if (name === "email") {
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email address";
      return null;
    }
    if (name === "message") return !value ? "Message is required" : null;
    return null;
  };

  const getContactErrors = () => {
    return {
      name: validateContactField("name", contactForm.name),
      email: validateContactField("email", contactForm.email),
      message: validateContactField("message", contactForm.message),
    };
  };

  // Book table validation
  const validateBookField = (name, value) => {
    if (name === "name") return !value ? "Name is required" : null;
    if (name === "email") {
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email address";
      return null;
    }
    if (name === "phone") {
      if (!value) return "Phone number is required";
      if (!validatePhone(value)) return "Please enter a valid phone number";
      return null;
    }
    if (name === "date") return !value ? "Date is required" : null;
    if (name === "time") return !value ? "Time is required" : null;
    return null;
  };

  const getBookErrors = () => {
    return {
      name: validateBookField("name", bookForm.name),
      email: validateBookField("email", bookForm.email),
      phone: validateBookField("phone", bookForm.phone),
      date: validateBookField("date", bookForm.date),
      time: validateBookField("time", bookForm.time),
    };
  };

  // Login validation
  const validateLoginField = (name, value) => {
    if (name === "email") {
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email address";
      return null;
    }
    if (name === "password") return !value ? "Password is required" : null;
    return null;
  };

  const getLoginErrors = () => {
    return {
      email: validateLoginField("email", loginForm.email),
      password: validateLoginField("password", loginForm.password),
    };
  };

  // Register validation
  const validateRegisterField = (name, value, formData = registerForm) => {
    if (name === "name") return !value ? "Name is required" : null;
    if (name === "email") {
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email address";
      return null;
    }
    if (name === "phone") {
      if (!value) return "Phone number is required";
      if (!validatePhone(value)) return "Please enter a valid phone number";
      return null;
    }
    if (name === "password") {
      if (!value) return "Password is required";
      return validatePassword(value);
    }
    if (name === "confirmPassword") {
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return null;
    }
    return null;
  };

  const getRegisterErrors = () => {
    return {
      name: validateRegisterField("name", registerForm.name),
      email: validateRegisterField("email", registerForm.email),
      phone: validateRegisterField("phone", registerForm.phone),
      password: validateRegisterField("password", registerForm.password),
      confirmPassword: validateRegisterField(
        "confirmPassword",
        registerForm.confirmPassword
      ),
    };
  };

  const handleInputChange = (e, setForm, formData) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitToAPI = async (
    endpoint,
    data,
    successMessage,
    resetForm,
    closeModal
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (
        response.data.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success(successMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
        closeModal();
        return true;
      } else {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("Request failed. Please try again.");
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Form Handlers
  const resetContactForm = () =>
    setContactForm({ name: "", email: "", message: "" });
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = getContactErrors();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fix all errors before submitting");
      return;
    }
    await submitToAPI(
      "/contact",
      contactForm,
      "📧 Message sent successfully! We will get back to you soon.",
      resetContactForm,
      () => setIsContactOpen(false)
    );
  };

  // Book Table Form Handlers
  const resetBookForm = () =>
    setBookForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      table: "",
      specialRequests: "",
    });
  const handleBookSubmit = async (e) => {
    e.preventDefault();
    const errors = getBookErrors();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    await submitToAPI(
      "/book-table",
      bookForm,
      "🍽️ Table booked successfully! A confirmation will be sent to your email.",
      resetBookForm,
      () => setIsBookOpen(false)
    );
  };

  // Login Form Handlers
  const resetLoginForm = () => setLoginForm({ email: "", password: "" });
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = getLoginErrors();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please enter valid credentials");
      return;
    }
    const success = await submitToAPI(
      "/auth/login",
      loginForm,
      "🔐 Login successful! Welcome back.",
      resetLoginForm,
      () => setIsLoginOpen(false)
    );
    if (success) {
      localStorage.setItem("isAuthenticated", "true");
    }
  };

  // Register Form Handlers
  const resetRegisterForm = () =>
    setRegisterForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = getRegisterErrors();
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.error("Please fix all errors before registering");
      return;
    }
    const { confirmPassword, ...registerData } = registerForm;
    await submitToAPI(
      "/auth/register",
      registerData,
      "🎉 Registration successful! Please login to continue.",
      resetRegisterForm,
      () => setIsRegisterOpen(false)
    );
  };

  // Navbar items
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon />,
      gradient: "from-gray-600 to-gray-500",
    },
    {
      id: "menu",
      label: "Menu",
      icon: <MenuBookIcon />,
      gradient: "from-orange-600 to-orange-500",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: <DashboardIcon />,
      gradient: "from-purple-600 to-purple-500",
    },
    {
      id: "about",
      label: "About",
      icon: <InfoIcon />,
      gradient: "from-teal-600 to-teal-500",
    },
  ];

  return (
    <>
      <ToastContainer />
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <QrCodeScannerIcon className="text-2xl" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                QR Restaurant
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                    activeNav === item.id
                      ? `bg-gradient-to-t ${item.gradient} text-white shadow-lg`
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  <span className="font-semibold text-sm lg:text-base">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-xl bg-gradient-to-t from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-lg transition-all text-sm sm:text-base"
              >
                <EmailIcon className="text-base sm:text-xl" />
                <span className="font-semibold hidden sm:inline">Contact</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookOpen(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-xl bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg transition-all text-sm sm:text-base"
              >
                <TableRestaurantIcon className="text-base sm:text-xl" />
                <span className="font-semibold hidden sm:inline">Book Table</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-xl bg-gradient-to-t from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg transition-all text-sm sm:text-base"
              >
                <LoginIcon className="text-base sm:text-xl" />
                <span className="font-semibold hidden sm:inline">Login</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegisterOpen(true)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-2 rounded-xl bg-gradient-to-t from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg transition-all text-gray-900 text-sm sm:text-base"
              >
                <AppRegistrationIcon className="text-base sm:text-xl" />
                <span className="font-semibold hidden sm:inline">Register</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-700">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveNav(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-lg transition-all ${
                  activeNav === item.id
                    ? `bg-gradient-to-t ${item.gradient} text-white`
                    : "text-gray-400"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contact Modal - Red Theme */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Contact Us"
        gradientColor="bg-gradient-to-r from-red-600 to-red-500"
      >
        <FormWithImage
          imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
          imageAlt="Restaurant contact"
          formContent={
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <InputField
                icon={PersonIcon}
                type="text"
                name="name"
                placeholder="Full Name *"
                value={contactForm.name}
                onChange={(e) => handleInputChange(e, setContactForm)}
                onBlur={(e) =>
                  setContactTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={contactTouched.name}
                error={getContactErrors().name}
                required
              />
              <InputField
                icon={EmailIcon}
                type="email"
                name="email"
                placeholder="Email Address *"
                value={contactForm.email}
                onChange={(e) => handleInputChange(e, setContactForm)}
                onBlur={(e) =>
                  setContactTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={contactTouched.email}
                error={getContactErrors().email}
                required
              />
              <TextAreaField
                icon={MessageIcon}
                name="message"
                placeholder="Your Message *"
                value={contactForm.message}
                onChange={(e) => handleInputChange(e, setContactForm)}
                touched={contactTouched.message}
                error={getContactErrors().message}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-t from-red-600 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <SendIcon />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </motion.button>
            </form>
          }
        />
      </Modal>

      {/* Book Table Modal - Blue Theme */}
      <Modal
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
        title="Book a Table"
        gradientColor="bg-gradient-to-r from-blue-600 to-blue-500"
      >
        <FormWithImage
          imageSrc="https://images.unsplash.com/photo-1515669097368-22e68427d265?w=600"
          imageAlt="Restaurant table booking"
          formContent={
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <InputField
                icon={PersonIcon}
                type="text"
                name="name"
                placeholder="Full Name *"
                value={bookForm.name}
                onChange={(e) => handleInputChange(e, setBookForm)}
                onBlur={(e) =>
                  setBookTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={bookTouched.name}
                error={getBookErrors().name}
                required
              />
              <InputField
                icon={EmailIcon}
                type="email"
                name="email"
                placeholder="Email Address *"
                value={bookForm.email}
                onChange={(e) => handleInputChange(e, setBookForm)}
                onBlur={(e) =>
                  setBookTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={bookTouched.email}
                error={getBookErrors().email}
                required
              />
              <InputField
                icon={PhoneIcon}
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={bookForm.phone}
                onChange={(e) => handleInputChange(e, setBookForm)}
                onBlur={(e) =>
                  setBookTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={bookTouched.phone}
                error={getBookErrors().phone}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  icon={CalendarTodayIcon}
                  type="date"
                  name="date"
                  placeholder="Date *"
                  value={bookForm.date}
                  onChange={(e) => handleInputChange(e, setBookForm)}
                  onBlur={(e) =>
                    setBookTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                  touched={bookTouched.date}
                  error={getBookErrors().date}
                  required
                />
                <InputField
                  icon={AccessTimeIcon}
                  type="time"
                  name="time"
                  placeholder="Time *"
                  value={bookForm.time}
                  onChange={(e) => handleInputChange(e, setBookForm)}
                  onBlur={(e) =>
                    setBookTouched((prev) => ({ ...prev, [e.target.name]: true }))
                  }
                  touched={bookTouched.time}
                  error={getBookErrors().time}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  icon={PeopleIcon}
                  type="number"
                  name="guests"
                  placeholder="Number of Guests"
                  value={bookForm.guests}
                  onChange={(e) => handleInputChange(e, setBookForm)}
                />
                <InputField
                  icon={TableRestaurantIcon}
                  type="text"
                  name="table"
                  placeholder="Preferred Table (optional)"
                  value={bookForm.table}
                  onChange={(e) => handleInputChange(e, setBookForm)}
                />
              </div>
              <textarea
                name="specialRequests"
                value={bookForm.specialRequests}
                onChange={(e) => handleInputChange(e, setBookForm)}
                rows="2"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Special requests (allergies, preferences, etc.)"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-t from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <BookOnlineIcon />
                <span>{isSubmitting ? "Booking..." : "Book Now"}</span>
              </motion.button>
            </form>
          }
        />
      </Modal>

      {/* Login Modal - Green Theme */}
      <Modal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Welcome Back"
        gradientColor="bg-gradient-to-r from-green-600 to-green-500"
      >
        <FormWithImage
          imageSrc="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600"
          imageAlt="Login illustration"
          formContent={
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <InputField
                icon={EmailIcon}
                type="email"
                name="email"
                placeholder="Email Address *"
                value={loginForm.email}
                onChange={(e) => handleInputChange(e, setLoginForm)}
                onBlur={(e) =>
                  setLoginTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={loginTouched.email}
                error={getLoginErrors().email}
                required
              />
              <InputField
                icon={LockIcon}
                type="password"
                name="password"
                placeholder="Password *"
                value={loginForm.password}
                onChange={(e) => handleInputChange(e, setLoginForm)}
                onBlur={(e) =>
                  setLoginTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={loginTouched.password}
                error={getLoginErrors().password}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-t from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <LoginIcon />
                <span>{isSubmitting ? "Logging in..." : "Login"}</span>
              </motion.button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                  className="text-green-600 font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            </form>
          }
        />
      </Modal>

      {/* Register Modal - Yellow/Amber Theme */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="Create Account"
        gradientColor="bg-gradient-to-r from-amber-500 to-yellow-500"
      >
        <FormWithImage
          imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
          imageAlt="Registration illustration"
          formContent={
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <InputField
                icon={PersonIcon}
                type="text"
                name="name"
                placeholder="Full Name *"
                value={registerForm.name}
                onChange={(e) => handleInputChange(e, setRegisterForm)}
                onBlur={(e) =>
                  setRegisterTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={registerTouched.name}
                error={getRegisterErrors().name}
                required
              />
              <InputField
                icon={EmailIcon}
                type="email"
                name="email"
                placeholder="Email Address *"
                value={registerForm.email}
                onChange={(e) => handleInputChange(e, setRegisterForm)}
                onBlur={(e) =>
                  setRegisterTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={registerTouched.email}
                error={getRegisterErrors().email}
                required
              />
              <InputField
                icon={PhoneIcon}
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={registerForm.phone}
                onChange={(e) => handleInputChange(e, setRegisterForm)}
                onBlur={(e) =>
                  setRegisterTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={registerTouched.phone}
                error={getRegisterErrors().phone}
                required
              />
              <PasswordField
                icon={LockIcon}
                name="password"
                placeholder="Password (min. 6 chars, numbers & symbols) *"
                value={registerForm.password}
                onChange={(e) => handleInputChange(e, setRegisterForm)}
                onBlur={(e) =>
                  setRegisterTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={registerTouched.password}
                error={getRegisterErrors().password}
                required
              />
              <InputField
                icon={LockIcon}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                value={registerForm.confirmPassword}
                onChange={(e) => handleInputChange(e, setRegisterForm)}
                onBlur={(e) =>
                  setRegisterTouched((prev) => ({ ...prev, [e.target.name]: true }))
                }
                touched={registerTouched.confirmPassword}
                error={getRegisterErrors().confirmPassword}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-t from-amber-500 to-yellow-500 text-gray-900 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <HowToRegIcon />
                <span>{isSubmitting ? "Creating Account..." : "Register"}</span>
              </motion.button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="text-amber-600 font-semibold hover:underline"
                >
                  Login here
                </button>
              </p>
            </form>
          }
        />
      </Modal>
    </>
  );
};