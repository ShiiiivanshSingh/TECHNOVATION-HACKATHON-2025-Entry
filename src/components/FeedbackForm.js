import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaUser } from 'react-icons/fa';

// Add LoginModal component
const LoginModal = ({ darkMode, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onLogin(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-full max-w-md rounded-xl shadow-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>
          )}

          <div>
            <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full p-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full p-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className={`text-blue-500 hover:text-blue-600 ${darkMode ? 'text-blue-400' : ''}`}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeedbackForm = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0
  });
  const [hoveredRating, setHoveredRating] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback!');
    onClose();
    setFormData({ name: '', email: '', feedback: '', rating: 0 });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating: formData.rating === rating ? 0 : rating
    });
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowLoginModal(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`relative w-full max-w-md p-8 rounded-2xl shadow-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Share Your Feedback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(null)}
                      className="text-2xl focus:outline-none transition-colors"
                    >
                      <FaStar
                        className={`${
                          (hoveredRating !== null ? star <= hoveredRating : star <= formData.rating)
                            ? 'text-yellow-400'
                            : darkMode ? 'text-gray-600' : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                  <span className={`ml-2 text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  required
                ></textarea>
              </div>

              {/* Login Button - Updated colors to match submit button */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="w-full py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <FaUser />
                  <span>User Login </span>
                </button>
              ) : (
                <div className={`text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Logged in as {currentUser?.username}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
              >
                Submit Feedback
              </button>
            </form>

            {/* Login Modal */}
            <AnimatePresence>
              {showLoginModal && (
                <LoginModal
                  darkMode={darkMode}
                  onClose={() => setShowLoginModal(false)}
                  onLogin={handleLogin}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackForm; 