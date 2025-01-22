import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" }
  };

  return (
    <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            LegalChamps
            <span className="text-blue-600">.</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div className="flex space-x-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {['Home', 'Games', 'Learn', 'Community'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 transition-all ${darkMode ? 'bg-white' : 'bg-gray-800'} ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {['Home', 'Games', 'Learn', 'Community'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header; 