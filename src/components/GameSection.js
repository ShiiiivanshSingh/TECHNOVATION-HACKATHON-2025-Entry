import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GameSection = ({ darkMode, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [reward, setReward] = useState('');

  const games = [
    {
      id: 1,
      title: "Learn Your Rights",
      description: "Explore your rights through engaging scenarios!",
      type: "interactive",
      scenarios: [
        {
          situation: "You see a child working in a factory. What do you do?",
          options: [
            "Report to the authorities",
            "Ignore it",
            "Take a photo",
            "Talk to the child"
          ],
          correct: 0
        },
        {
          situation: "Your school is asking for extra fees. What should you do?",
          options: [
            "Pay the fees",
            "Speak to the principal about your rights",
            "Stop attending school",
            "Find a job to pay the fees"
          ],
          correct: 1
        },
        {
          situation: "You witness a child being bullied. What action should you take?",
          options: [
            "Join in the bullying",
            "Ignore it",
            "Report it to a teacher",
            "Confront the bully"
          ],
          correct: 2
        },
        // Add more scenarios as needed
      ],
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "Interactive Scenarios",
      description: "Navigate through real-life situations and learn how to respond.",
      type: "interactive",
      scenarios: [
        {
          situation: "You are asked to pay extra fees at school. What do you do?",
          options: [
            "Speak to the principal",
            "Stop attending school",
            "Find a job to pay the fees"
          ],
          correct: 0
        },
        {
          situation: "You see a friend being treated unfairly. What should you do?",
          options: [
            "Ignore it",
            "Support your friend",
            "Join in the unfair treatment",
            "Tell a teacher"
          ],
          correct: 1
        },
        {
          situation: "A child is being forced to work instead of going to school. What action should you take?",
          options: [
            "Report to the authorities",
            "Talk to the child",
            "Ignore it",
            "Join the child in working"
          ],
          correct: 0
        },
        {
          situation: "You find out that a classmate is being bullied online. What do you do?",
          options: [
            "Ignore it",
            "Report it to a teacher",
            "Join in the bullying",
            "Talk to the classmate"
          ],
          correct: 1
        },
        {
          situation: "You overhear someone making fun of a disabled person. What should you do?",
          options: [
            "Laugh along",
            "Confront the person making fun",
            "Ignore it",
            "Join in the fun"
          ],
          correct: 1
        },
        {
          situation: "You see a child being forced to work instead of going to school. What action should you take?",
          options: [
            "Report to the authorities",
            "Talk to the child",
            "Ignore it",
            "Join the child in working"
          ],
          correct: 0
        },
        {
          situation: "You notice a friend is struggling with their studies. What should you do?",
          options: [
            "Ignore them",
            "Offer to help them study",
            "Make fun of them",
            "Tell them to give up"
          ],
          correct: 1
        },
        {
          situation: "You see a child being bullied in the playground. What do you do?",
          options: [
            "Join in the bullying",
            "Ignore it",
            "Tell a teacher",
            "Confront the bully"
          ],
          correct: 2
        },
        // Add more scenarios as needed
      ],
      image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Quiz Challenges",
      description: "Test your knowledge with fun quizzes!",
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
        },
        // Add more questions here
      ],
      image: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('gameProgress'));
    if (savedProgress) {
      setPoints(savedProgress.points || 0);
    }
  }, []);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setReward(''); // Reset reward when a new game is selected
    if (game.type === 'quiz') {
      // Shuffle questions
      const shuffled = game.questions.sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled.slice(0, 10)); // Take only 10 questions
      setCurrentQuestionIndex(0);
      setIsQuizFinished(false);
      setQuizAnswers({});
      setPoints(0);
    } else if (game.type === 'interactive') {
      // Set scenarios for interactive games
      setShuffledQuestions(game.scenarios); // Use scenarios directly
      setCurrentQuestionIndex(0);
      setIsQuizFinished(false);
      setQuizAnswers({});
      setPoints(0);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (currentQuestion && currentQuestion.correct === answerIndex) {
      setPoints(prevPoints => prevPoints + 10); // Add points for correct answer
    }
    // Move to the next question
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
      checkReward(points + (currentQuestion && currentQuestion.correct === answerIndex ? 10 : 0)); // Check for reward at the end
    }
  };

  const checkReward = (newPoints) => {
    if (newPoints >= 40) {
      setReward('Knowledge Warrior');
    } else if (newPoints >= 30) {
      setReward('Quiz Champion');
    } else if (newPoints >= 20) {
      setReward('Helper Hero');
    } else if (newPoints >= 10) {
      setReward('Rights Master');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-8">
        <button
          onClick={onClose}
          className={`mb-8 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}
        >
          ← Back to Home
        </button>

        {!selectedGame ? (
          <div className="grid md:grid-cols-3 gap-8">
            {games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-xl cursor-pointer shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-transform duration-300`}
                onClick={() => handleGameSelect(game)}
              >
                <img src={game.image} alt={game.title} className="w-full h-48 object-cover rounded-lg mb-4" />
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
            {isQuizFinished ? (
              <div className="text-center">
                <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quiz Finished!
                </h2>
                <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your total score: {points}
                </p>
                {reward && (
                  <p className={`mt-2 text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`}>
                    Congratulations! You earned the title: {reward}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-gray-50 shadow-lg">
                <div className="flex justify-between mb-4">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
                  </h3>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Score: {points}
                  </h3>
                </div>
                {selectedGame.type === 'interactive' ? (
                  <p className={`text-xl font-bold mb-4 ${darkMode ? 'text-black' : 'text-black'}`}>
                    {shuffledQuestions[currentQuestionIndex]?.situation}
                  </p>
                ) : (
                  <p className={`text-xl font-bold mb-4 ${darkMode ? 'text-black' : 'text-black'}`}>
                    {shuffledQuestions[currentQuestionIndex]?.question}
                  </p>
                )}
                <div className="space-y-4">
                  {shuffledQuestions[currentQuestionIndex]?.options?.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(oIndex)}
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
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GameSection;