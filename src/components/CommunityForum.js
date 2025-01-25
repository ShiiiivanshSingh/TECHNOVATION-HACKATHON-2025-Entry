import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReply } from 'react-icons/fa';
// import '../styles/CommunityForum.css';

const CommunityForum = ({ darkMode, onClose }) => {
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

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('forumMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('forumUsername', username);
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        username: username.trim() || 'Anonymous',
        timestamp: new Date().toLocaleString(),
        avatar: `https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3BmLWljb240LWppcjIwNjItcG9yLWwtam9iNzg4LnBuZw.png`,
        replyTo: replyTo,
        replies: [],
      };

      if (replyTo) {
        setMessages(messages.map(msg => {
          if (msg.id === replyTo.messageId) {
            return {
              ...msg,
              replies: [...(msg.replies || []), message]
            };
          }
          return msg;
        }));
      } else {
        setMessages([...messages, message]);
      }
      
      setNewMessage('');
      setReplyTo(null);
    }
  };

  const handleReply = (message) => {
    setReplyTo({
      messageId: message.id,
      username: message.username
    });
    document.getElementById('messageInput').focus();
  };

  const MessageComponent = ({ message, isReply = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-4 p-4 rounded-lg ${isReply ? 'bg-gray-100' : 'bg-gray-50'} shadow-sm ${
        isReply ? 'ml-12' : ''
      }`}
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
            <h3 className="font-semibold text-black">
              {message.username}
            </h3>
            <span className="text-gray-500 text-sm">
              {message.timestamp}
            </span>
          </div>
          <p className="text-black text-lg">{message.text}</p>
          {!isReply && (
            <button
              onClick={() => handleReply(message)}
              className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <FaReply /> Reply
            </button>
          )}
          {message.replies && message.replies.map(reply => (
            <MessageComponent key={reply.id} message={reply} isReply={true} />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-[70vh]">
      {/* Username Input */}
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username (optional)"
          className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 
                   focus:ring-blue-200 text-black text-lg bg-white"
        />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto mb-4 p-4 rounded-lg bg-white shadow-inner">
        {messages.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mt-auto">
        {replyTo && (
          <div className="mb-2 p-2 bg-blue-50 rounded-lg flex justify-between items-center">
            <span className="text-sm text-blue-600">
              Replying to {replyTo.username}
            </span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}
        <div className="flex gap-4">
          <textarea
            id="messageInput"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={replyTo ? `Reply to ${replyTo.username}...` : "Type your message here..."}
            className="flex-1 p-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 
                     focus:ring-blue-200 text-black text-lg min-h-[120px] resize-y bg-white"
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
    </div>
  );
};

export default CommunityForum; 