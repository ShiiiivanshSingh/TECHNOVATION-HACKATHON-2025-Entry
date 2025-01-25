import { motion } from 'framer-motion';

const GameOver = ({ score, totalCases, onClose }) => {
  const toffeeEarned = Math.floor(score / 10) * 5; // Each correct case (10 points) = 5 toffee

  const handleReturnToMenu = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <h1 className="text-3xl font-bold mb-6">Session Complete!</h1>
        
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-lg">Final Score</p>
            <p className="text-2xl font-bold text-blue-600">{score}/{totalCases * 10}</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-xl">
            <p className="text-lg">Toffee Earned</p>
            <p className="text-2xl font-bold text-yellow-600">
              {toffeeEarned} 🍬
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReturnToMenu}
          className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600"
        >
          Return to Menu
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameOver; 