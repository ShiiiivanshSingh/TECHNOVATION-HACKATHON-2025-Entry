import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReply, FaUser, FaLock } from 'react-icons/fa';
// import '../styles/CommunityForum.css';

// Separate MessageComponent into a memoized component
const MessageComponent = memo(({ message, isReply = false, onReply, darkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`mb-4 p-4 rounded-lg ${
      darkMode 
        ? isReply ? 'bg-gray-800' : 'bg-gray-900'
        : isReply ? 'bg-gray-100' : 'bg-gray-50'
    } shadow-sm ${isReply ? 'ml-12' : ''}`}
  >
    <div className="flex items-start gap-4">
      <img
        src={message.avatar}
        alt={message.username}
        className="w-12 h-12 rounded-full object-cover"
        onError={(e) => {
          e.target.src = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png';
        }}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            {message.username}
          </h3>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {message.timestamp}
          </span>
        </div>
        <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-black'}`}>
          {message.text}
        </p>
        {!isReply && (
          <button
            onClick={() => onReply(message)}
            className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-600"
          >
            <FaReply /> Reply
          </button>
        )}
        {message.replies && message.replies.map(reply => (
          <MessageComponent 
            key={reply.id} 
            message={reply} 
            isReply={true} 
            onReply={onReply}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  </motion.div>
));

// Memoize the input form
const MessageForm = memo(({ 
  newMessage, 
  onMessageChange, 
  onSubmit, 
  replyTo, 
  onCancelReply, 
  darkMode 
}) => (
  <form onSubmit={onSubmit} className="mt-auto">
    {replyTo && (
      <div className={`mb-2 p-2 rounded-lg flex justify-between items-center ${
        darkMode ? 'bg-blue-900' : 'bg-blue-50'
      }`}>
        <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
          Replying to {replyTo.username}
        </span>
        <button
          type="button"
          onClick={onCancelReply}
          className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ✕
        </button>
      </div>
    )}
    <div className="flex gap-4">
      <textarea
        id="messageInput"
        value={newMessage}
        onChange={onMessageChange}
        placeholder={replyTo ? `Reply to ${replyTo.username}...` : "Type your message here..."}
        className={`flex-1 p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 
                   focus:ring-blue-200 text-lg min-h-[120px] resize-y ${
                     darkMode 
                       ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                       : 'bg-white text-black placeholder-gray-500'
                   }`}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
                   shadow-lg self-end font-semibold"
      >
        {replyTo ? 'Reply' : 'Send'}
      </button>
    </div>
  </form>
));

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
    // Here you would typically make an API call to handle authentication
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

const CommunityForum = ({ darkMode, onClose }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('forumMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem('forumUsername');
    return savedUsername || '';
  });
  const [replyTo, setReplyTo] = useState(null);

  // Load messages from localStorage when component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('forumMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('forumMessages', JSON.stringify(messages));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('forumUsername', username);
    }
  }, [username]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      username: username.trim() || 'Anonymous',
      timestamp: new Date().toLocaleString(),
      avatar: `https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png`,
      replies: [],
    };

    setMessages(prev => {
      if (replyTo) {
        return prev.map(msg => {
          if (msg.id === replyTo.messageId) {
            return { ...msg, replies: [...(msg.replies || []), message] };
          }
          return msg;
        });
      }
      return [...prev, message];
    });

    setNewMessage('');
    setReplyTo(null);
  }, [newMessage, username, replyTo]);

  const handleMessageChange = useCallback((e) => {
    setNewMessage(e.target.value);
  }, []);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const handleReply = useCallback((message) => {
    setReplyTo({
      messageId: message.id,
      username: message.username
    });
    document.getElementById('messageInput')?.focus();
  }, []);

  const handleLogin = (userData) => {
    // Here you would typically validate credentials with a backend
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setUsername(userData.username);
    localStorage.setItem('forumUsername', userData.username);
  };

  return (
    <div className="flex flex-col h-[70vh]">
      {/* Username Input and Login Button in same line */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username (optional)"
            className={`w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-200 text-lg ${
                       darkMode 
                         ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                         : 'bg-white text-black placeholder-gray-500'
                     }`}
          />
        </div>
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginModal(true)}
            className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            <FaUser /> Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Welcome, {currentUser?.username}
            </span>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
              className="text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

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

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto mb-4 p-4 rounded-lg shadow-inner ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {messages.map((message) => (
          <MessageComponent 
            key={message.id} 
            message={message} 
            onReply={handleReply}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Input Area */}
      <MessageForm
        newMessage={newMessage}
        onMessageChange={handleMessageChange}
        onSubmit={handleSubmit}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default memo(CommunityForum); 