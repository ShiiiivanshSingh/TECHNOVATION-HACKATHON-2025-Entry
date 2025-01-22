import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaChartLine, FaUndo } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const GameSection = ({ darkMode, onClose }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [reward, setReward] = useState('');
  const [candies, setCandies] = useState(() => {
    const saved = localStorage.getItem('candies');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem('totalScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const games = [
    {
      id: 1,
      title: "Know Your Rights Quiz",
      description: "Test your knowledge about children's rights in India through this interactive quiz.",
      type: "quiz",
      image: "https://images.unsplash.com/photo-1581726707445-75cbe4efc586?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      questions: [
        {
          question: "What is the legal age for voting in India?",
          options: ["16 years", "18 years", "21 years", "25 years"],
          correct: 1,
          explanation: "In India, citizens who are 18 years or older have the right to vote. This was established by the 61st Amendment of the Constitution in 1988 to encourage younger citizens to participate in the electoral process."
        },
        {
          question: "What is the minimum age for employment in any factory or mine?",
          options: ["12 years", "14 years", "16 years", "18 years"],
          correct: 2,
          explanation: "According to the Child Labour (Prohibition and Regulation) Act, the minimum age for employment in factories or mines is 16 years. This law protects children from hazardous work environments and ensures their safety and well-being."
        },
        {
          question: "Under the Right to Education Act, up to what age is education free and compulsory?",
          options: ["12 years", "14 years", "16 years", "18 years"],
          correct: 1,
          explanation: "The Right to Education Act (RTE) makes education free and compulsory for all children between 6-14 years. This ensures that every child has access to basic education regardless of their economic background."
        },
        {
          question: "What is POCSO Act primarily concerned with?",
          options: ["Child Education", "Child Labor", "Child Protection from Sexual Offenses", "Child Nutrition"],
          correct: 2,
          explanation: "The Protection of Children from Sexual Offences (POCSO) Act, 2012 was enacted to protect children from sexual assault, harassment, and pornography. It provides for child-friendly procedures for reporting, recording of evidence, investigation, and speedy trial through special courts."
        },
        {
          question: "What is the emergency helpline number for children in India?",
          options: ["100", "101", "1098", "112"],
          correct: 2,
          explanation: "CHILDLINE (1098) is India's first 24-hour, toll-free, emergency phone outreach service for children in need of care and protection. Any child or concerned adult can call 1098 for immediate assistance."
        },
        {
          question: "Which of these is a fundamental right of children?",
          options: ["Right to Play", "Right to Protection from Exploitation", "Right to Watch TV", "Right to Choose School"],
          correct: 1,
          explanation: "The Right to Protection from Exploitation is a fundamental right under Article 24 of the Indian Constitution. It prohibits the employment of children in factories, mines, and other hazardous employment."
        },
        {
          question: "What is the legal age of marriage for girls in India?",
          options: ["16 years", "18 years", "21 years", "No minimum age"],
          correct: 1,
          explanation: "The legal age of marriage for girls in India is 18 years under the Prohibition of Child Marriage Act, 2006. Child marriage is a punishable offense and can result in imprisonment and fines."
        },
        {
          question: "Under RTE Act, what percentage of seats are reserved for disadvantaged groups in private schools?",
          options: ["15%", "20%", "25%", "30%"],
          correct: 2,
          explanation: "Under the Right to Education Act, 25% of seats in private schools must be reserved for economically disadvantaged students. This ensures inclusive education and equal opportunities for all children."
        },
        {
          question: "What action can a child take if they face cyberbullying?",
          options: ["Ignore it", "Report to Cyber Crime Portal", "Delete social media", "Fight back online"],
          correct: 1,
          explanation: "Children should report cyberbullying to the National Cyber Crime Reporting Portal (cybercrime.gov.in) or call 1930. They should also inform trusted adults, save evidence, and avoid responding to the bully."
        },
        {
          question: "Which of these is NOT a right under the UN Convention on Rights of the Child?",
          options: ["Right to Education", "Right to Protection", "Right to Play", "Right to Drive"],
          correct: 3,
          explanation: "The UN Convention on Rights of the Child includes rights like education, protection, play, and participation. Driving is not a child's right but a privilege that comes with age and proper licensing."
        }
      ]
    },
    {
      id: 2,
      title: "Safety Scenarios",
      description: "Learn how to handle real-life situations through interactive scenarios.",
      type: "interactive",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      scenarios: [
        {
          situation: "If a stranger offers you candy and asks you to go with them, what should you do?",
          options: [
            "Accept the candy and go with them",
            "Say no firmly and tell a trusted adult immediately",
            "Take the candy but don't go with them",
            "Talk to them to be polite"
          ],
          correct: 1,
          explanation: "Never accept anything from strangers or go anywhere with them. Always say 'NO' firmly and immediately tell a trusted adult (parent, teacher, or guardian) about such incidents. Your safety comes first!"
        },
        {
          situation: "If someone touches you inappropriately, what should you do?",
          options: [
            "Keep it a secret",
            "Feel ashamed",
            "Tell a trusted adult immediately",
            "Ignore it"
          ],
          correct: 2,
          explanation: "If anyone touches you inappropriately, it's NOT your fault. Tell a trusted adult immediately. Remember the 'Safe Touch, Unsafe Touch' rule. You have the right to say NO to any touch that makes you uncomfortable."
        },
        {
          situation: "If you see your friend being bullied at school, what should you do?",
          options: [
            "Join the bullies to avoid being bullied",
            "Ignore it as it's not your problem",
            "Film it on your phone",
            "Report it to a teacher or school authority"
          ],
          correct: 3,
          explanation: "Bullying is wrong and should never be ignored. Report it to teachers or school authorities immediately. Supporting your friends and speaking up against bullying helps create a safer school environment for everyone."
        }
      ]
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
    const savedProgress = JSON.parse(localStorage.getItem('gameProgress')) || {};
    setTotalScore(savedProgress.totalScore || 0);
    setAchievements(savedProgress.achievements || []);
    setGameStats(savedProgress.gameStats || {
      gamesPlayed: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  }, []);

  useEffect(() => {
    let timer;
    if (selectedGame && !isQuizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedGame, isQuizFinished, timeLeft]);

  const handleGameStart = (game) => {
    console.log("Starting game:", game); // Debug log
    setSelectedGame(game);
    
    // Initialize game state
    if (game.type === 'quiz') {
      const shuffled = [...game.questions].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    } else if (game.type === 'interactive') {
      const shuffled = [...game.scenarios].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
    }
    
    // Reset all game states
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
    setQuizAnswers({});
    setPoints(0);
    setStreak(0);
    setTimeLeft(30);
    setReward('');
  };

  const handleQuizComplete = () => {
    const finalPoints = points + (isCorrectAnswer ? 10 : 0);
    const newTotalScore = totalScore + finalPoints;
    
    // Update total score in state and localStorage
    setTotalScore(newTotalScore);
    localStorage.setItem('totalScore', newTotalScore.toString());
    
    setIsQuizFinished(true);
    checkReward(finalPoints);
    
    // Update game stats
    setGameStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = currentQuestion && currentQuestion.correct === answerIndex;
    setIsCorrectAnswer(isCorrect);
    setShowFeedback(true);
    
    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 2);
      const newPoints = 10 + timeBonus + (streak * 2);
      setPoints(prevPoints => prevPoints + newPoints);
      // Add candies for correct answer
      const candyReward = 3 + Math.floor(streak / 2); // Base 3 candies + bonus for streak
      setCandies(prev => {
        const newTotal = prev + candyReward;
        localStorage.setItem('candies', newTotal.toString());
        return newTotal;
      });
      setStreak(prev => prev + 1);
      setGameStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
      }));
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
      setGameStats(prev => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(30);
    } else {
      handleQuizComplete();
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

  const checkAchievements = (newPoints) => {
    const newAchievements = [];
    
    if (newPoints >= 100) newAchievements.push('Score Master');
    if (streak >= 5) newAchievements.push('Streak Champion');
    if (gameStats.gamesPlayed >= 10) newAchievements.push('Dedicated Player');
    
    setAchievements(prev => [...new Set([...prev, ...newAchievements])]);
  };

  const handlePlayMore = () => {
    setSelectedGame(null);
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setPoints(0);
    setStreak(0);
    setTimeLeft(30);
    setReward('');
    setGameStats(prev => ({
      ...prev,
      correctAnswers: 0,
      wrongAnswers: 0
    }));
  };

  return (
    <div className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} overflow-y-auto`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} hover:opacity-90`}
          >
            ← Back
          </button>
          <div className="flex gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <span role="img" aria-label="candy" className="text-2xl">🍬</span>
              <span className="font-bold">× {candies}</span>
              {isCorrectAnswer && showFeedback && (
                <span className="text-green-500 ml-2 animate-bounce">+{3 + Math.floor(streak / 2)}</span>
              )}
            </div>
          </div>
        </div>

        {!selectedGame ? (
          // Game Selection Screen
          <div className="space-y-6">
            {games.map((game) => (
              <div
                key={game.id}
                className={`flex rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-[1.02] ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="w-1/3 h-[250px]">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {game.title}
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {game.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleGameStart(game)}
                    className={`w-fit px-6 py-3 rounded-lg font-semibold text-white ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Start Playing Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Game Playing Screen
          <div className="max-w-4xl mx-auto">
            {isQuizFinished ? (
              // Results Screen
              <div className={`p-8 rounded-xl shadow-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quiz Complete!
                </h2>
                <div className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Round Score: {points}
                </div>
                <div className={`text-2xl mb-6 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center justify-center gap-2`}>
                  <span role="img" aria-label="candy" className="text-3xl">🍬</span>
                  <span>Total Candies: {candies}</span>
                </div>
                {reward && (
                  <div className="text-lg text-yellow-500 font-bold mb-6">
                    🏆 Achievement Unlocked: {reward}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Correct Answers</div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {gameStats.correctAnswers}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Best Streak</div>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {streak}
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-x-4">
                  <button
                    onClick={handlePlayMore}
                    className={`px-6 py-3 rounded-lg font-semibold text-white ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Play More Games
                  </button>
                </div>
              </div>
            ) : (
              // Question Screen
              <div>
                {/* Stats Bar */}
                <div className={`mb-6 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Question</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {currentQuestionIndex + 1}/{shuffledQuestions.length}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {timeLeft}s
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Streak</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {streak} 🔥
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Score</div>
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {points}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Card */}
                <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {selectedGame.type === 'interactive'
                      ? shuffledQuestions[currentQuestionIndex]?.situation
                      : shuffledQuestions[currentQuestionIndex]?.question}
                  </h2>
                  
                  {!showFeedback ? (
                    // Answer Options
                    <div className="space-y-4 max-w-2xl mx-auto">
                      {shuffledQuestions[currentQuestionIndex]?.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 text-left rounded-lg transition-colors ${
                            darkMode
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Feedback Section
                    <div className="space-y-6 max-w-2xl mx-auto">
                      <div className={`p-6 rounded-lg ${
                        isCorrectAnswer 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : 'bg-red-100 border-2 border-red-500'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {isCorrectAnswer ? (
                            <div className="text-green-600 text-xl">✓ Correct!</div>
                          ) : (
                            <div className="text-red-600 text-xl">✗ Incorrect</div>
                          )}
                        </div>
                        
                        <div className={`mb-4 ${darkMode ? 'text-gray-800' : 'text-gray-700'}`}>
                          <strong>Correct Answer:</strong> {
                            shuffledQuestions[currentQuestionIndex]?.options[
                              shuffledQuestions[currentQuestionIndex]?.correct
                            ]
                          }
                        </div>
                        
                        <div className={`${darkMode ? 'text-gray-800' : 'text-gray-700'}`}>
                          <strong>Explanation:</strong> {
                            shuffledQuestions[currentQuestionIndex]?.explanation
                          }
                        </div>
                      </div>

                      <button
                        onClick={handleNextQuestion}
                        className={`w-full p-4 text-center rounded-lg font-semibold text-white ${
                          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {currentQuestionIndex < shuffledQuestions.length - 1 
                          ? 'Next Question' 
                          : 'Complete Quiz'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = `
.quiz-card-horizontal {
  @apply flex items-stretch rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300;
}

.quiz-image-container {
  @apply w-1/3 relative overflow-hidden;
}

.quiz-image {
  @apply w-full h-full object-cover;
}

.quiz-content {
  @apply w-2/3 p-8 flex flex-col justify-between;
}

.quiz-title {
  @apply text-2xl font-bold mb-4;
}

.quiz-description {
  @apply text-lg mb-6;
}

.start-quiz-btn {
  @apply text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 w-fit;
}

.stats-bar {
  @apply mb-6 rounded-xl shadow-lg;
}

.stat-item {
  @apply flex flex-col items-center;
}

.stat-label {
  @apply text-sm opacity-75;
}

.stat-value {
  @apply text-lg font-bold;
}

.question-card {
  @apply p-8 rounded-xl shadow-lg;
}

.question-content {
  @apply flex flex-col items-center text-center;
}

.question-text {
  @apply text-2xl font-bold mb-8;
}

.options-grid {
  @apply grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto;
}

.option-button {
  @apply w-full p-4 rounded-lg text-left transition-colors duration-300;
}
`;

export default GameSection;