import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

// Scenarios and solutions data
const GAME_DATA = [
    {
        scenario: "A child is being forced to work in a factory instead of going to school",
        solution: "Right to Education - Report to ChildLine (1098)",
        id: 1,
        explanation: "Every child has the right to free education until age 14 and child labor is strictly prohibited by law.",
        reference: "https://labour.gov.in/childlabour/child-labour-acts-and-rules",
        verifiedBy: "Ministry of Labour and Employment, Government of India"
    },
    {
        scenario: "A student is being bullied at school because of their background",
        solution: "Right to Equality - Report to school authorities",
        id: 2,
        explanation: "Every child has the right to study in a safe environment free from discrimination and bullying.",
        reference: "https://ncpcr.gov.in/index.php",
        verifiedBy: "National Commission for Protection of Child Rights"
    },
    {
        scenario: "A child is not allowed to practice their religious beliefs",
        solution: "Freedom of Religion - Seek legal protection",
        id: 3,
        explanation: "Every person has the fundamental right to practice their religion freely without discrimination.",
        reference: "https://legislative.gov.in/constitution-of-india",
        verifiedBy: "Constitution of India"
    },
    {
        scenario: "Children in a neighborhood don't have access to basic healthcare",
        solution: "Right to Health - Contact local health authorities",
        id: 4,
        explanation: "Every child has the fundamental right to access basic healthcare services.",
        reference: "https://nhm.gov.in/index1.php?lang=1&level=1&sublinkid=150&lid=226",
        verifiedBy: "Ministry of Health and Family Welfare"
    },
    {
        scenario: "A child's private information is being shared without consent",
        solution: "Right to Privacy - File complaint with cyber cell",
        id: 5,
        explanation: "Children have the right to privacy and their personal information must be protected.",
        reference: "https://cybercrime.gov.in/",
        verifiedBy: "Ministry of Home Affairs, Cyber Crime Division"
    },
    {
        scenario: "A child is denied admission to school due to their disability",
        solution: "Right to Equal Education - Contact Education Department",
        id: 6,
        explanation: "Every child has the right to education regardless of any disabilities. Schools cannot discriminate based on disabilities.",
        reference: "https://disabilityaffairs.gov.in/content/page/acts.php",
        verifiedBy: "Department of Empowerment of Persons with Disabilities"
    }
];

const RightsMatchingGame = ({ darkMode, onComplete, onClose }) => {
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [score, setScore] = useState(0);
    const [showWinModal, setShowWinModal] = useState(false);
    const [candies, setCandies] = useState(0);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);
    const [totalCandies, setTotalCandies] = useState(() => {
        const saved = localStorage.getItem('totalCandies');
        return saved ? parseInt(saved) : 0;
    });
    const [wrongSelection, setWrongSelection] = useState(null);

    // Initialize game
    useEffect(() => {
        const shuffledData = [...GAME_DATA].sort(() => Math.random() - 0.5);
        setScenarios(shuffledData);
        setSolutions([...shuffledData].sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Load initial toffee count from localStorage
        const savedCandies = localStorage.getItem('totalCandies');
        setTotalCandies(savedCandies ? parseInt(savedCandies) : 0);
    }, []);

    useEffect(() => {
        // Update toffee counter whenever it changes
        localStorage.setItem('totalCandies', totalCandies.toString());
    }, [totalCandies]);

    const handleSolutionClick = (solutionId) => {
        if (connections.some(conn => conn.id === solutionId)) return;
        
        if (selectedSolution === solutionId) {
            setSelectedSolution(null);
        } else {
            setSelectedSolution(solutionId);
        }
    };

    const handleScenarioClick = (scenarioId) => {
        if (!selectedSolution) return;
        
        if (scenarioId === selectedSolution) {
            setConnections(prev => [...prev, { id: selectedSolution }]);
            setScore(prev => prev + 1);
            setSelectedSolution(null);
            setWrongSelection(null);

            if (score + 1 === GAME_DATA.length) {
                setShowWinModal(true);
                const earnedCandies = 3; // Perfect score earns 3 candies
                setCandies(earnedCandies);
                setTotalCandies(prev => {
                    const newTotal = prev + earnedCandies;
                    localStorage.setItem('totalCandies', newTotal.toString());
                    return newTotal;
                });
                onComplete?.(earnedCandies);
            }
        } else {
            setWrongSelection(scenarioId);
            setTimeout(() => setWrongSelection(null), 1000);
            setSelectedSolution(null);
        }
    };

    const handleClose = () => {
        if (score > 0 || connections.length > 0) {
            setShowExitConfirmation(true);
        } else {
            if (onClose) {
                onClose();
            } else {
                navigate('/games');
            }
        }
    };

    const handleConfirmExit = () => {
        setShowExitConfirmation(false);
        if (onClose) {
            onClose();
        } else {
            navigate('/games');
        }
    };

    const handleNextGame = () => {
        setShowWinModal(false);
        setCandies(0);
        setScore(0);
        setConnections([]);
        const shuffledData = [...GAME_DATA].sort(() => Math.random() - 0.5);
        setScenarios(shuffledData);
        setSolutions([...shuffledData].sort(() => Math.random() - 0.5));
    };

    return (
        <div 
            className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-gray-100/95'} overflow-y-auto`}
        >
            {/* Confetti Effect */}
            {showWinModal && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.3}
                />
            )}

            <div className="container mx-auto px-4 py-16 max-w-6xl min-h-screen">
                {/* Close button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="fixed top-4 right-4 z-[60] bg-red-500 text-white p-2 rounded-full hover:bg-red-600 w-10 h-10 flex items-center justify-center font-bold text-xl cursor-pointer"
                >
                    ✕
                </motion.button>

                <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Match Scenarios with Solutions
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Score: {score}/{GAME_DATA.length}
                        </div>
                        <button
                            onClick={handleNextGame}
                            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg shadow-md transition-colors"
                        >
                            New Game
                        </button>
                    </div>
                </div>

                {/* Game Content - New Layout */}
                <div className="flex flex-col h-full gap-8">
                    {/* Scenarios Section - Top */}
                    <div className="flex-1">
                        <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                            Scenarios
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {scenarios.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className={`${
                                            darkMode ? 'bg-gray-800' : 'bg-white'
                                        } rounded-xl shadow-lg p-4 space-y-3`}
                                    >
                                        {/* Scenario Text */}
                                        <div className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {item.scenario}
                                        </div>

                                        {/* Submit Button or Matched Solution */}
                                        {connections.find(conn => conn.id === item.id) ? (
                                            <div className="text-green-600 font-medium p-3 bg-green-50 rounded-lg">
                                                {solutions.find(s => s.id === item.id)?.solution}
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleScenarioClick(item.id)}
                                                className={`w-full p-3 rounded-lg text-center transition-all relative ${
                                                    selectedSolution 
                                                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                                                        : darkMode
                                                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                disabled={!selectedSolution}
                                            >
                                                {wrongSelection === item.id ? (
                                                    <span className="text-red-500  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                         Try Again
                                                    </span>
                                                ) : (
                                                    selectedSolution ? 'Click Here To Match' : 'Select a solution first'
                                                )}
                                            </button>
                                        )}

                                        {/* Explanation */}
                                        {connections.find(conn => conn.id === item.id) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} bg-opacity-50 rounded p-2`}
                                            >
                                                <div>
                                                    <strong>Explanation:</strong>{' '}
                                                    {item.explanation}
                                                </div>
                                                <div className="mt-1 flex flex-col gap-1">
                                                    <a 
                                                        href={item.reference}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline text-sm"
                                                    >
                                                        📚 View Reference 
                                                    </a>
                                                    <div className="text-xs italic">
                                                        Verified by: {item.verifiedBy}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Solutions Section - Bottom */}
                    <div className="mt-8">
                        <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                            Solutions
                        </h3>
                        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {solutions.map((item) => {
                                    return (
                                        <motion.div
                                            key={item.id}
                                            onClick={() => handleSolutionClick(item.id)}
                                            className={`p-4 rounded-lg transition-all ${
                                                connections.some(conn => conn.id === item.id)
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : selectedSolution === item.id
                                                        ? 'bg-blue-500 text-white shadow-lg'
                                                        : 'cursor-pointer shadow-sm hover:shadow-md'
                                            } ${
                                                darkMode 
                                                    ? connections.some(conn => conn.id === item.id)
                                                        ? 'bg-gray-700 text-gray-400'
                                                        : 'bg-gray-700 text-white hover:bg-gray-600' 
                                                    : connections.some(conn => conn.id === item.id)
                                                        ? 'bg-gray-100 text-gray-400'
                                                        : 'bg-gray-50 text-gray-800 hover:bg-blue-50'
                                            }`}
                                        >
                                            {item.solution}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Win Modal */}
            <AnimatePresence>
                {showWinModal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="fixed inset-0 flex items-center justify-center z-[70] p-4"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                        <motion.div
                            className={`${
                                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                            } p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative`}
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
                                <p className="text-xl mb-6">You've completed the game!</p>
                                
                                <div className="flex justify-center items-center space-x-2 mb-6">
                                    {[...Array(candies)].map((_, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="text-4xl"
                                        >
                                            🍬
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="text-lg mb-4">
                                    <p>You earned {candies} {candies === 1 ? 'candy' : 'candies'}!</p>
                                    <p className="mt-2">Total Candies: {totalCandies}</p>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {candies === 3 && (
                                        <p className="text-green-500">Perfect match! Outstanding performance! 🌟</p>
                                    )}
                                    {candies === 2 && (
                                        <p className="text-blue-500">Great job! Well done! 🎯</p>
                                    )}
                                    {candies === 1 && (
                                        <p className="text-yellow-500">Good effort! Keep practicing! 💪</p>
                                    )}
                                </div>

                                <div className="mt-6 space-x-4">
                                    <button
                                        onClick={handleNextGame}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                                    >
                                        Play Again
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                                    >
                                        Exit
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Exit Confirmation Modal */}
            {showExitConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[70] p-4">
                    <div className={`${
                        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    } p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all`}>
                        <h3 className="text-2xl font-bold mb-4">Exit Game?</h3>
                        <p className="mb-6">Are you sure you want to exit? Your progress will be lost.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowExitConfirmation(false)}
                                className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmExit}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightsMatchingGame;