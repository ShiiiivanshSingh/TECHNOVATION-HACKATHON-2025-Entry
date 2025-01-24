import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameSection from './components/GameSection';
import Header from './components/Header';
import MiniGame from './components/MiniGame';
import { FaPhone, FaExclamationTriangle, FaHeadset, FaHandsHelping, FaShieldAlt, FaTwitter, FaLinkedin, FaGithub, FaExternalLinkAlt, FaTimes, FaGlobe } from 'react-icons/fa';
import { translations } from './translations';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [scrolled, setScrolled] = useState(false);
  const [showGames, setShowGames] = useState(() => {
    const saved = localStorage.getItem('showGames');
    return saved ? JSON.parse(saved) : false;
  });
  const [showEmergencyHelp, setShowEmergencyHelp] = useState(() => {
    const saved = localStorage.getItem('showEmergencyHelp');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500; // Adjust this value to control zoom sensitivity
      const minScale = 1;    // Minimum scale (original size)
      const maxScale = 1.3;  // Maximum scale (30% larger)

      // Calculate scale based on scroll position
      // const scale = Math.min(
      //   maxScale,
      //   minScale + (scrollPosition / maxScroll) * (maxScale - minScale)
      // );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500;
      // const position = Math.max(0, Math.min(50, (scrollPosition / maxScroll) * 50));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGameClose = () => {
    setShowGames(false);
    localStorage.setItem('showGames', 'false');
  };

  const handleEmergencyClose = () => {
    setShowEmergencyHelp(false);
    localStorage.setItem('showEmergencyHelp', 'false');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-600 text-xl font-semibold mb-4 block">Welcome to Legal Champs.</span>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'} flex flex-col gap-4`}>
              Making Legal Rights
              <span className="text-blue-600">Fun & Easy</span>
            </h1>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of kids across India discovering their rights through exciting adventures, 
              games, and interactive stories. Start your journey to become a Legal Champion today!
            </p>
            
            {/* Start Playing Button */}
            {!showGames && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGames(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Playing Now
              </motion.button>
            )}

            {/* Stats Section */}
            <motion.div 
              className="mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Children learning together"
                className="rounded-2xl shadow-2xl"
              /> */}
              <div className="grid grid-cols-3 gap-8 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <div className="text-3xl font-bold text-blue-600">
                    <AnimatedCounter value={10} duration={1} />k+
                  </div>
                  <div>Active Learners</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <div className="text-3xl font-bold text-blue-600">
                    <AnimatedCounter value={50} duration={1} />+
                  </div>
                  <div>Interactive Games</div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <div className="text-3xl font-bold text-blue-600">
                    <AnimatedCounter value={95} duration={1} />%
                  </div>
                  <div>Happy Learners</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ 
          delay: 3,
          duration: 1.2,        // Longer fade in duration
          opacity: { duration: 0.15 }  // Even shorter fade out duration
        }}
        className="fixed bottom-1 left-1/2 transform -translate-x-1/2 text-center z-40"
      >
        <p className={`text-lg font-semibold mb-2 ${
          darkMode 
            ? 'text-white bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm' 
            : 'text-gray-800 bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm'
        }`}>
          Scroll to Explore
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`text-4xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Animated Sections */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 50 }}
        transition={{ duration: 0.5 }}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Discover Your Rights Through Play! 🎮
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Game Modes */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <img 
                src="https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Adventure Mode"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Adventure Mode 
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Embark on exciting quests to learn about your rights while helping others!
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Quiz Challenges"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quiz Challenges 
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Test your knowledge and earn badges as you master different rights!
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl p-6 ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
            >
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Friend Zone"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Friend Zone 
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Connect with other champions and share your achievements!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* New Interactive Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Your Learning Journey 🗺️
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"></div>
            
            {/* Timeline items */}
            <div className="space-y-24">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between"
              >
                <div className="w-5/12">
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Level 1: Basic Rights Explorer 🌟
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Start your journey by learning fundamental rights through fun mini-games!
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-5/12"></div>
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between"
              >
                <div className="w-5/12"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-5/12">
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Level 2: Rights Champion 🏆
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Take on real-world scenarios and learn how to apply your rights!
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-between"
              >
                <div className="w-5/12">
                  <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Level 3: Super Pro! 👥
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Become a community champion!
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="w-5/12"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* New Achievement Showcase Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Earn Cool Badges! 🎖️
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Rights Master', 'Quiz Champion', 'Helper Hero', 'Knowledge Warrior'].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-6 rounded-full aspect-square flex flex-col items-center justify-center text-center ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-lg`}
              >
                <div className="text-4xl mb-2">🏅</div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {badge}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Learning Paths Section */}
      <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Learn Your Rights Through Stories 📚
              </h2>
              <div className="space-y-4">
                <div className={`flex items-center space-x-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-2xl">🎯</div>
                  <p>Real-life scenarios that help you understand your rights</p>
                </div>
                <div className={`flex items-center space-x-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-2xl">🌈</div>
                  <p>Fun animations and interactive challenges</p>
                </div>
                <div className={`flex items-center space-x-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="text-2xl">🏆</div>
                  <p>Earn badges and unlock new adventures</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1469013078550-305e63b7c8f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Children learning"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Original position */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowGames(true);
              localStorage.setItem('showGames', 'true');
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Your Adventure Now!
          </motion.button>
        </div>
      </section>

      {/* Emergency Help Button with Close Button */}
      <div className="fixed left-8 bottom-8 flex items-center gap-2 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowEmergencyHelp(true);
            localStorage.setItem('showEmergencyHelp', 'true');
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <FaExclamationTriangle />
          <span className="font-semibold">Emergency Help</span>
        </motion.button>
        {showEmergencyHelp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleEmergencyClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
          >
            <FaTimes className="text-xl" />
          </motion.button>
        )}
      </div>

      {/* Game Section Modal with Close Button */}
      {showGames && (
        <>
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleGameClose}
            className="fixed right-8 top-24 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-50"
          >
            <FaTimes className="text-xl" />
          </motion.button>
          <GameSection darkMode={darkMode} onClose={handleGameClose} />
        </>
      )}

      {/* Emergency Help Modal */}
      <AnimatePresence>
        {showEmergencyHelp && (
          <EmergencyHelp darkMode={darkMode} onClose={handleEmergencyClose} />
        )}
      </AnimatePresence>

      <footer className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform transition-transform duration-300 hover:scale-105">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>About Us</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300 hover:text-blue-500`}>
                Discover Your Rights Through Play! <br/> [TEAM ID:SAPP-1176]
              </p>
            </div>
            <div className="transform transition-transform duration-300 hover:scale-105">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact</h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="transition-colors duration-300 hover:text-blue-500">Email: dial1098@childlineindia.org.in</li>
                <li className="transition-colors duration-300 hover:text-blue-500">Phone: +91-22-68251098</li>
                <li className="transition-colors duration-300 hover:text-blue-500">Address: 27A, B- wing, G D Ambekar Road, Wadala East,
Mumbai, Maharashtra 400031</li>
              </ul>
            </div>
            <div className="transform transition-transform duration-300 hover:scale-105">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Follow Us</h3>
              <div className="flex space-x-6">
                <a 
                  href="https://x.com/de_mirage_fan" 
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-blue-500`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-xl transform transition-transform duration-300 group-hover:rotate-12" />
                  <span>Twitter</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1" 
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-blue-500`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-xl transform transition-transform duration-300 group-hover:rotate-12" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/ShiiiivanshSingh/TECHNOVATION-HACKATHON-2025-Entry" 
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:text-blue-500`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-xl transform transition-transform duration-300 group-hover:rotate-12" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300 hover:text-blue-500`}>
                 Legal Champs. Team ID: SAPP-1176
              </div>
              <div>
                <ul className={`flex space-x-6 flex-wrap ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>
                    <a 
                      href="https://ncpcr.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-600 flex items-center gap-1 transition-all duration-300 hover:scale-110"
                    >
                      NCPCR <FaExternalLinkAlt className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wcd.nic.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-600 flex items-center gap-1 transition-all duration-300 hover:scale-110"
                    >
                      WCD Ministry <FaExternalLinkAlt className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://cybercrime.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-600 flex items-center gap-1 transition-all duration-300 hover:scale-110"
                    >
                      Cyber Crime Portal <FaExternalLinkAlt className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.india.gov.in/topics/social-development/children" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-blue-600 flex items-center gap-1 transition-all duration-300 hover:scale-110"
                    >
                      Child Portal <FaExternalLinkAlt className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <MiniGame darkMode={darkMode} />
    </div>
  );
}

const EmergencyHelp = ({ darkMode, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-full max-w-4xl rounded-xl shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} p-6`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FaExclamationTriangle className="text-red-500" />
              Emergency Help & Resources
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg text-white ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Immediate Help Section */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaPhone className="text-red-500" />
                Immediate Help
              </h3>
              <div className="space-y-4">
                <EmergencyButton
                  number="1098"
                  name="CHILDLINE"
                  description="24/7 emergency helpline for children"
                  color="red"
                  darkMode={darkMode}
                />
                <EmergencyButton
                  number="100"
                  name="Police"
                  description="Emergency police assistance"
                  color="blue"
                  darkMode={darkMode}
                />
                <EmergencyButton
                  number="1091"
                  name="Women Helpline"
                  description="24/7 women's safety helpline"
                  color="purple"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Government Resources */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaShieldAlt className="text-blue-500" />
                Government Support
              </h3>
              <div className="space-y-4">
                <ResourceLink
                  title="National Commission for Protection of Child Rights"
                  description="File complaints and seek help"
                  link="https://ncpcr.gov.in"
                  darkMode={darkMode}
                />
                <ResourceLink
                  title="Child Welfare Committee"
                  description="Find your local CWC"
                  link="https://wcd.nic.in/child-welfare-committees"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Counseling Services */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaHeadset className="text-green-500" />
                Free Counseling
              </h3>
              <div className="space-y-4">
                <ResourceLink
                  title="iCall Helpline"
                  description="Professional counseling support"
                  link="https://icallhelpline.org"
                  darkMode={darkMode}
                />
                <ResourceLink
                  title="School Counselors Directory"
                  description="Find counselors in your school"
                  link="#"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Safety Tips */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-bold mb-4 text-white">
                Important Safety Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Save emergency numbers on your phone</li>
                <li>Tell a trusted adult if you feel unsafe</li>
                <li>Keep evidence of any harassment</li>
                <li>Don't share personal information online</li>
                <li>Trust your instincts - if something feels wrong, seek help</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EmergencyButton = ({ number, name, description, color, darkMode }) => (
  <button
    onClick={() => window.location.href = `tel:${number}`}
    className={`w-full p-4 rounded-lg ${darkMode ? `bg-${color}-900 hover:bg-${color}-800` : `bg-${color}-100 hover:bg-${color}-200`} transition-colors`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full bg-${color}-500 text-white flex items-center justify-center text-xl`}>
        <FaPhone />
      </div>
      <div className="text-left">
        <div className={`font-bold text-lg ${darkMode ? 'text-white' : `text-${color}-700`}`}>{number}</div>
        <div className={`font-medium ${darkMode ? 'text-gray-300' : `text-${color}-600`}`}>{name}</div>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : `text-${color}-500`}`}>{description}</div>
      </div>
    </div>
  </button>
);

const ResourceLink = ({ title, description, link, darkMode }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`block p-4 rounded-lg ${
      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
    } transition-colors`}
  >
    <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</div>
    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</div>
  </a>
);

const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      
      if (progress < 1) {
        setCount(Math.min(Math.floor(value * progress), value));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return <>{count}</>;
};

export default App;
