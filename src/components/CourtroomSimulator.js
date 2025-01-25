import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import GameOver from './GameOver';

const courtBg = '/assets/court/court-bg.png';
const judgeImg = '/assets/court/judge.png';
const lawyerImg = '/assets/court/lawyer.png';
const convict1 = '/assets/court/convict1.png';
const convict2 = '/assets/court/convict2.png';

const CourtroomSimulator = ({ onClose, onComplete, darkMode = false }) => {
  const [currentCase, setCurrentCase] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const [score, setScore] = useState(0);
  const [showDialog, setShowDialog] = useState(true);
  const [dialogPhase, setDialogPhase] = useState('lawyer'); // 'lawyer' or 'judge'
  const [showGameOver, setShowGameOver] = useState(false);

  const cases = [
    {
      id: 1,
      title: "The Playground Incident",
      convictImage: convict1,
      lawyerDialog: "Your Honor, the defendant, a 13-year-old student, has been accused of bullying younger students and forcibly taking their lunch money. The defendant claims it was due to hunger, but multiple witnesses have reported feeling threatened.",
      judgeDialog: "Having heard the evidence presented, this court must determine if the accused's actions constitute bullying and theft. What is your verdict?",
      guilty: true,
      explanation: "While hunger is a serious issue, taking money by force is wrong. The correct approach would have been to seek help from teachers or counselors.",
      punishment: "Counseling and community service"
    },
    {
      id: 2,
      title: "The Social Media Case",
      convictImage: convict2,
      lawyerDialog: "Your Honor, the defendant has been charged with cyberbullying after sharing embarrassing photos of a classmate without consent. The victim has reported experiencing significant emotional distress and anxiety as a result.",
      judgeDialog: "The court must consider the impact of sharing private photos without consent. What is your verdict?",
      guilty: true,
      explanation: "Sharing photos without consent is cyberbullying and can cause serious emotional harm.",
      punishment: "Digital citizenship training and written apology"
    },
    {
      id: 3,
      title: "The Homework Sharing Dilemma",
      convictImage: convict1,
      lawyerDialog: "Your Honor, the defendant is accused of sharing test answers with classmates via a group chat. While they claim it was meant to help struggling students, this violates academic integrity policies.",
      judgeDialog: "The court must consider whether sharing answers, even with good intentions, constitutes academic dishonesty. What is your verdict?",
      guilty: true,
      explanation: "Sharing test answers is a form of cheating that undermines learning and fairness in education.",
      punishment: "Academic integrity workshop and grade penalty"
    },
    {
      id: 4,
      title: "The False Accusation Case",
      convictImage: convict2,
      lawyerDialog: "Your Honor, the defendant started a rumor accusing another student of stealing from the school store without any evidence. The accused student faced social isolation as a result.",
      judgeDialog: "We must determine if spreading false accusations constitutes harmful behavior. What is your verdict?",
      guilty: true,
      explanation: "Spreading false rumors can severely impact someone's reputation and mental well-being.",
      punishment: "Public apology and anti-bullying workshop"
    },
    {
      id: 5,
      title: "The Misunderstanding",
      convictImage: convict1,
      lawyerDialog: "Your Honor, the defendant is accused of pushing another student in the hallway. However, evidence shows it was accidental during a crowded passing period.",
      judgeDialog: "We must determine if this was truly an accident or intentional harmful behavior. What is your verdict?",
      guilty: false,
      explanation: "Accidents can happen in crowded spaces. The evidence shows no malicious intent.",
      punishment: "No punishment needed, but reminder about hallway safety"
    }
  ];

  const handleVerdict = (isGuilty) => {
    const currentCaseData = cases[currentCase];
    const correct = isGuilty === currentCaseData.guilty;

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
      if (currentCase < cases.length - 1) {
        setCurrentCase(prev => prev + 1);
        setShowVerdict(false);
        setShowDialog(true);
        setDialogPhase('lawyer');
      } else {
        handleComplete();
      }
    }
  };

  const handleClose = () => {
    // Calculate toffee earned even when closing early
    const toffeeEarned = Math.floor(score / 10) * 5;
    if (typeof onComplete === 'function') {
      onComplete(score, toffeeEarned);
    }
  };

  const handleComplete = () => {
    setShowGameOver(true);
  };

  const handleGameOverClose = () => {
    // Calculate toffee earned
    const toffeeEarned = Math.floor(score / 10) * 5;
    // Navigate to landing page
    window.location.href = '/landing';
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
          ✕
        </motion.button>

        {/* Game Over Screen */}
        {currentCase >= cases.length && !showGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-[55]"
          >
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4">All Cases Complete!</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
              >
                View Results
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Game Over Component */}
        {showGameOver && (
          <GameOver 
            score={score}
            totalCases={cases.length}
            onClose={handleGameOverClose}
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
                src={cases[currentCase].convictImage}
                alt="convict"
                className="h-[65vh] object-contain"
              />
            </motion.div>
          </AnimatePresence>

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
                    {cases[currentCase].title}
                  </h3>
                  <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                    <span className="font-bold text-blue-600">Lawyer:</span> {cases[currentCase].lawyerDialog}
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
                    <span className="font-bold text-purple-600">Judge:</span> {cases[currentCase].judgeDialog}
                  </p>
                  <div className="mt-6 flex justify-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleVerdict(true);
                        setShowDialog(false);
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
                        setShowDialog(false);
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
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Verdict Explanation
              </h3>
              <p className="text-gray-700 mb-4">
                {cases[currentCase].explanation}
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-bold">Recommended Action:</span> {cases[currentCase].punishment}
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold"
                >
                  {currentCase < cases.length - 1 ? 'Next Case' : 'Complete Session'}
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