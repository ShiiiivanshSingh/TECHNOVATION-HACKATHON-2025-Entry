import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameSection from './components/GameSection';
import Header from './components/Header';
import MiniGame from './components/MiniGame';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [scrolled, setScrolled] = useState(false);
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
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
            <span className="text-blue-600 text-xl font-semibold mb-4 block">Welcome to LegalChamps</span>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Making Legal Rights
              <br><span className="text-blue-600"> Fun & Easy</span>
            </h1>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of kids across India discovering their rights through exciting adventures, 
              games, and interactive stories. Start your journey to become a Legal Champion today!
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGames(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Playing Now
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Children learning together"
              className="rounded-2xl shadow-2xl"
            />
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-3xl font-bold text-blue-600">10k+</div>
                <div>Active Learners</div>
              </div>
              <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div>Interactive Games</div>
              </div>
              <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div>Happy Learners</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-center z-40"
      >
        <p className={`text-lg font-semibold mb-2 ${
          darkMode 
            ? 'text-white bg-gray-800/80 px-4 py-2 rounded-full' 
            : 'text-gray-800 bg-white/80 px-4 py-2 rounded-full'
        } backdrop-blur-sm`}>
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
                src="https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Adventure Mode"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Adventure Mode 🎮
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
                      Level 3: Community Leader 👥
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Help others learn their rights and become a community champion!
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

      {/* Call to Action */}
      <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Ready to Become a Legal Champion? 🚀
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of kids already learning about their rights through fun!
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg">
            Start Your Adventure Now!
          </button>
        </div>
      </section>

      {showGames && <GameSection darkMode={darkMode} onClose={() => setShowGames(false)} />}

      <footer className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>About Us</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Creating amazing web experiences with modern technologies.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:text-blue-600">Home</a></li>
                <li><a href="#" className="hover:text-blue-600">About</a></li>
                <li><a href="#" className="hover:text-blue-600">Services</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact</h3>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>Email: info@example.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Web Street</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Twitter</a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>LinkedIn</a>
                <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>GitHub</a>
              </div>
            </div>
          </div>
          <div className={`text-center mt-8 pt-8 border-t ${darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'}`}>
            © 2024 Your Company. All rights reserved.
          </div>
        </div>
      </footer>

      <MiniGame darkMode={darkMode} />
    </div>
  );
}

export default App;
