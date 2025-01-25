import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaCheck, FaTimes } from 'react-icons/fa';
import GameOver from './GameOver';

const courtBg = '/assets/court/court-bg.jpg';
const judgeImg = '/assets/court/judge.png';
const lawyerImg = '/assets/court/lawyer.png';
const convict1 = '/assets/court/convict1.png';
const convict3 = '/assets/court/convict3.png';
const convict2 = '/assets/court/convict2.png';

const CourtroomSimulator = ({ onClose, onComplete, darkMode = false }) => {
  const [currentCase, setCurrentCase] = useState(0);
  const [dialogPhase, setDialogPhase] = useState('lawyer');
  const [showVerdict, setShowVerdict] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showReturnToMenu, setShowReturnToMenu] = useState(false);
  const [shuffledCases, setShuffledCases] = useState([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showDialog, setShowDialog] = useState(true);

  const originalCases = [
    {
      id: 1,
      title: "The Playground Incident",
      convictImage: convict1,
      lawyerDialog: "Your Honor, the defendant, a 13-year-old student, has been accused of bullying younger students and forcibly taking their lunch money. The defendant claims it was due to hunger, but multiple witnesses have reported feeling threatened.",
      judgeDialog: "Having heard the evidence presented, this court must determine if the accused's actions constitute bullying and theft. What is your verdict?",
      guilty: true,
      explanation: "While hunger is a serious issue, taking money by force is wrong. The correct approach would have been to seek help from teachers or counselors.",
      punishment: "Counseling and community service",
      referenceLinks: [
        {
          text: "Anti-Bullying Guidelines",
          url: "https://ncpcr.gov.in/showfile.php?lang=1&level=1&&sublinkid=1363&lid=1558"
        },
        {
          text: "Child Protection Laws",
          url: "https://wcd.nic.in/acts/juvenile-justice-care-and-protection-children-act-2015"
        }
      ]
    },
    {
      id: 2,
      title: "The Social Media Case",
      convictImage: convict2,
      lawyerDialog: "Your Honor, the defendant has been charged with cyberbullying after sharing embarrassing photos of a classmate without consent. The victim has reported experiencing significant emotional distress and anxiety as a result.",
      judgeDialog: "The court must consider the impact of sharing private photos without consent. What is your verdict?",
      guilty: true,
      explanation: "Sharing photos without consent is cyberbullying and can cause serious emotional harm.",
      punishment: "Digital citizenship training and written apology",
      referenceLinks: [
        {
          text: "Cyber Safety Portal",
          url: "https://cybercrime.gov.in/"
        },
        {
          text: "Online Safety Guidelines",
          url: "https://www.cybercrime.gov.in/Webform/Crime_OnlineSafety.aspx"
        }
      ]
    },
    {
      id: 3,
      title: "The Homework Sharing Dilemma",
      convictImage: convict3,
      lawyerDialog: "Your Honor, the defendant is accused of sharing test answers with classmates via a group chat. While they claim it was meant to help struggling students, this violates academic integrity policies.",
      judgeDialog: "The court must consider whether sharing answers, even with good intentions, constitutes academic dishonesty. What is your verdict?",
      guilty: true,
      explanation: "Sharing test answers is a form of cheating that undermines learning and fairness in education.",
      punishment: "Academic integrity workshop and grade penalty",
      referenceLinks: [
        {
          text: "Academic Integrity Guidelines",
          url: "https://www.cbse.gov.in/cbsenew/examination-circular.html"
        },
        {
          text: "School Code of Conduct",
          url: "https://www.cbse.gov.in/cbsenew/discipline-committee.html"
        }
      ]
    },
    {
      id: 4,
      title: "The False Accusation Case",
      convictImage: convict1,
      lawyerDialog: "Your Honor, the defendant started a rumor accusing another student of stealing from the school store without any evidence. The accused student faced social isolation as a result.",
      judgeDialog: "We must determine if spreading false accusations constitutes harmful behavior. What is your verdict?",
      guilty: true,
      explanation: "Spreading false rumors can severely impact someone's reputation and mental well-being.",
      punishment: "Public apology and anti-bullying workshop",
      referenceLinks: [
        {
          text: "Anti-Defamation Laws",
          url: "https://legislative.gov.in/sites/default/files/A1860-45.pdf"
        },
        {
          text: "School Safety Guidelines",
          url: "https://www.education.gov.in/sites/upload_files/mhrd/files/upload_document/20160208_Manual_0.pdf"
        }
      ]
    },
    {
      id: 5,
      title: "The Misunderstanding",
      convictImage: convict2,
      lawyerDialog: "Your Honor, the defendant is accused of pushing another student in the hallway. However, evidence shows it was accidental during a crowded passing period.",
      judgeDialog: "We must determine if this was truly an accident or intentional harmful behavior. What is your verdict?",
      guilty: false,
      explanation: "Accidents can happen in crowded spaces. The evidence shows no malicious intent.",
      punishment: "No punishment needed, but reminder about hallway safety",
      referenceLinks: [
        {
          text: "School Safety Manual",
          url: "https://www.cbse.gov.in/cbsenew/Compendium%20of%20CBSE%20Circulars_Vol-3.pdf"
        },
        {
          text: "Student Behavior Guidelines",
          url: "https://www.cbse.gov.in/cbsenew/discipline-committee.html"
        }
      ]
    }
  ];

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledCases(shuffleArray(originalCases));
  }, []);

  const handleVerdict = (isGuilty) => {
    const currentCaseData = shuffledCases[currentCase];
    const correct = isGuilty === currentCaseData.guilty;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setShowVerdict(true);
  };

  const handleNext = () => {
    if (dialogPhase === 'lawyer') {
      setDialogPhase('judge');
    } else {
      if (currentCase < shuffledCases.length - 1) {
        setCurrentCase(prev => prev + 1);
        setShowVerdict(false);
        setShowReturnToMenu(false);
        setDialogPhase('lawyer');
      } else {
        handleComplete();
      }
    }
  };

  const handleClose = () => {
    setShowDialog(false);
    if (onClose) onClose();
  };

  const handleReturnToMenu = () => {
    // Calculate toffee earned
    const toffeeEarned = Math.floor(score / 10) * 5;
    if (typeof onComplete === 'function') {
      onComplete(score, toffeeEarned);
    }
    // Navigate to home page
    window.location.href = '/';
  };

  const handleComplete = () => {
    setShowGameOver(true);
  };

  const handleGameOverClose = () => {
    // Calculate toffee earned
    const toffeeEarned = Math.floor(score / 10) * 5;
    if (typeof onComplete === 'function') {
      onComplete(score, toffeeEarned);
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-sm ${darkMode ? 'bg-gray-900/90' : 'bg-gray-100/90'}`}>
      <div className="h-screen w-screen p-4">
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
          className="absolute top-4 right-4 z-[60] bg-red-500 text-white p-2 rounded-full hover:bg-red-600 w-8 h-8 flex items-center justify-center font-bold"
        >
          ×
        </motion.button>

        {/* Return to Menu button */}
        {showReturnToMenu && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReturnToMenu}
            className="absolute top-4 right-4 z-[60] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <span>⬅</span> Menu
          </motion.button>
        )}

        {/* Game Over Screen */}
        {currentCase >= shuffledCases.length && !showGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-[55]"
          >
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">All cases complete</h2>
              <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReturnToMenu}
          className="absolute top-4 left-4 z-[60] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
           Return to Menu
        </motion.button>
            </div>
          </motion.div>
        )}

        {/* Game Over Component */}
        {showGameOver && (
          <GameOver 
            score={score}
            totalCases={shuffledCases.length}
            onClose={handleReturnToMenu}
          />
        )}

        {/* Courtroom Scene */}
        <div className="relative h-[90vh] rounded-xl overflow-hidden shadow-2xl"
             style={{
               backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5),rgba(255, 255, 255, 0.5)), url(${courtBg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          
          {/* Judge Character */}
          <div className="absolute top-[25vh]  left-1/2 transform -translate-x-1/2">
            <img 
              src={judgeImg}
              alt="judge"
              className="h-[400px] object-contain"
            />
          </div>

          {/* Lawyer Character - Moved more left and made larger */}
          {dialogPhase === 'lawyer' && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="absolute bottom-[5vh] left-[5%] transform -translate-x-1/2"
            >
              <img 
                src={lawyerImg}
                alt="lawyer"
                className="h-[65vh] object-contain"
              />
            </motion.div>
          )}

          {/* Convict Character - Moved more right and made larger */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="absolute bottom-[5vh] right-[5%] transform translate-x-1/2"
            >
              <img 
                src={shuffledCases[currentCase]?.convictImage}
                alt="convict"
                className="h-[65vh] object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dialog Box - Centered and Fancy */}
          {showReturnToMenu && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-8 left-20 transform -translate-x-1/2 w-[80%] max-w-4xl mx-auto bg-gradient-to-br from-white/55 to-white/45 p-8 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                All cases complete
              </h3>
              <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                Score: {score} / {shuffledCases.length}
              </p>
              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReturnToMenu}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Return to Menu
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Dialog Box - Centered and Fancy */}
          {showDialog && !showVerdict && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-8 left-20 transform -translate-x-1/2 w-[80%] max-w-4xl mx-auto bg-gradient-to-br from-white/55 to-white/45 p-8 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md"
            >
              {dialogPhase === 'lawyer' ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {shuffledCases[currentCase]?.title}
                  </h3>
                  <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                    <span className="font-bold text-blue-600">Lawyer:</span> {shuffledCases[currentCase]?.lawyerDialog}
                  </p>
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Hear Judge's Statement
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Judge's Statement
                  </h3>
                  <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                    <span className="font-bold text-purple-600">Judge:</span> {shuffledCases[currentCase]?.judgeDialog}
                  </p>
                  <div className="mt-6 flex justify-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleVerdict(true);
                        setShowReturnToMenu(false);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Guilty
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleVerdict(false);
                        setShowReturnToMenu(false);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Not Guilty
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Verdict Box - Centered */}
          {showVerdict && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-8 left-20 transform -translate-x-1/2 w-[80%] max-w-4xl mx-auto bg-gradient-to-br from-white/55 to-white/45 p-8 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className="text-gray-800 text-lg mb-4">
                {shuffledCases[currentCase]?.explanation}
              </p>
              
              {/* Reference Links */}
              <div className="mt-4 space-y-2">
                <p className="font-semibold text-gray-700">Learn more:</p>
                <div className="flex flex-wrap gap-3">
                  {shuffledCases[currentCase]?.referenceLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    >
                      {link.text}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  {currentCase < shuffledCases.length - 1 ? 'Next Case' : 'Complete'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtroomSimulator;