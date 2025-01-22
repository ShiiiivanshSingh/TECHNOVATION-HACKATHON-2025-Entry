import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GameSection = ({ darkMode, onClose }) => {
  const games = [
    {
      id: 1,
      title: "Right to Education Adventure",
      description: "Help Ravi navigate through challenges to access education!",
      type: "adventure",
      scenarios: [
        {
          situation: "Ravi's school is asking for extra fees that his family can't afford.",
          options: [
            "Speak to the school principal about RTE Act rights",
            "Give up and stop going to school",
            "Try to find work to pay fees"
          ],
          correct: 0
        }
      ]
    },
    {
      id: 2,
      title: "Child Labor Rights Quiz",
      type: "quiz",
      questions: [
        {
          question: "What is the minimum age for working in India?",
          options: ["14 years", "16 years", "18 years", "12 years"],
          correct: 0
        },
        {
          question: "What should you do if you see a child working in a factory?",
          options: [
            "Report to ChildLine (1098)",
            "Ignore it",
            "Take photos",
            "Talk to the child"
          ],
          correct: 0
        }
      ]
    }
  ];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    // setQuizAnswers({
    //   ...quizAnswers,
    //   [questionIndex]: answerIndex
    // });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={onClose}
          className={`mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          ← Back to Home
        </button>

        {!selectedGame ? (
          <div className="grid md:grid-cols-2 gap-8">
            {games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl cursor-pointer ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
                onClick={() => setSelectedGame(game)}
              >
                <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {game.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {game.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedGame.title}
            </h2>

            {selectedGame.type === 'quiz' ? (
              <div className="space-y-8">
                {selectedGame.questions.map((q, qIndex) => (
                  <div key={qIndex} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {q.question}
                    </p>
                    <div className="space-y-4">
                      {q.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            quizAnswers[qIndex] === oIndex
                              ? 'bg-blue-600 text-white'
                              : darkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-white text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {selectedGame.scenarios.map((scenario, index) => (
                  <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-xl mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {scenario.situation}
                    </p>
                    <div className="space-y-4">
                      {scenario.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            darkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-white text-gray-800 hover:bg-gray-100'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameSection; 