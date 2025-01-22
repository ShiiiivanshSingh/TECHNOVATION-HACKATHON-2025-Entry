import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 30;
const PIPE_WIDTH = 60;
const PIPE_GAP = 160;
const GRAVITY = 0.6;
const JUMP_FORCE = -10;

const MiniGame = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gameState, setGameState] = useState({
    isPlaying: false,
    score: 0,
    birdY: GAME_HEIGHT / 2,
    velocity: 0,
    pipes: [],
    gameOver: false
  });
  
  const gameLoopRef = useRef();
  const lastTimeRef = useRef(0);
  const gameContainerRef = useRef();

  const resetGame = () => {
    setGameState({
      isPlaying: false,
      score: 0,
      birdY: GAME_HEIGHT / 2,
      velocity: 0,
      pipes: [],
      gameOver: false
    });
  };

  const handleJump = (e) => {
    e.preventDefault();
    if (gameState.isPlaying && !gameState.gameOver) {
      setGameState(prev => ({ ...prev, velocity: JUMP_FORCE }));
    }
  };

  const startGame = () => {
    resetGame();
    setGameState(prev => ({ ...prev, isPlaying: true }));
  };

  const addPipe = () => {
    const gapStart = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
    return {
      x: GAME_WIDTH,
      gapStart,
      passed: false
    };
  };

  const gameLoop = (timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    setGameState(prev => {
      if (!prev.isPlaying || prev.gameOver) return prev;

      // Update bird
      const newVelocity = prev.velocity + GRAVITY;
      const newBirdY = prev.birdY + newVelocity;

      // Check boundaries
      if (newBirdY < 0 || newBirdY > GAME_HEIGHT - BIRD_SIZE) {
        return { ...prev, gameOver: true };
      }

      // Update pipes
      let newPipes = prev.pipes.map(pipe => ({
        ...pipe,
        x: pipe.x - 3
      })).filter(pipe => pipe.x > -PIPE_WIDTH);

      // Add new pipe
      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 300) {
        newPipes.push(addPipe());
      }

      // Check collisions and update score
      let gameOver = false;
      let score = prev.score;

      newPipes = newPipes.map(pipe => {
        // Score update
        if (!pipe.passed && pipe.x < GAME_WIDTH / 2 - PIPE_WIDTH) {
          score += 1;
          return { ...pipe, passed: true };
        }

        // Collision detection
        if (Math.abs(pipe.x - GAME_WIDTH / 2) < BIRD_SIZE &&
            (newBirdY < pipe.gapStart || newBirdY > pipe.gapStart + PIPE_GAP)) {
          gameOver = true;
        }

        return pipe;
      });

      return {
        ...prev,
        birdY: newBirdY,
        velocity: newVelocity,
        pipes: newPipes,
        score,
        gameOver
      };
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState.isPlaying, gameState.gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyJump = (e) => {
      if ((e.code === 'Space' || e.key === 'w') && gameState.isPlaying && !gameState.gameOver) {
        e.preventDefault();
        setGameState(prev => ({ ...prev, velocity: JUMP_FORCE }));
      }
    };

    window.addEventListener('keydown', handleKeyJump);
    return () => window.removeEventListener('keydown', handleKeyJump);
  }, [gameState.isPlaying, gameState.gameOver]);

  // Mouse/Touch controls
  useEffect(() => {
    const handlePointerJump = (e) => {
      if (gameState.isPlaying && !gameState.gameOver) {
        e.preventDefault();
        setGameState(prev => ({ ...prev, velocity: JUMP_FORCE }));
      }
    };

    const container = gameContainerRef.current;
    if (container) {
      container.addEventListener('mousedown', handlePointerJump);
      container.addEventListener('touchstart', handlePointerJump);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', handlePointerJump);
        container.removeEventListener('touchstart', handlePointerJump);
      }
    };
  }, [gameState.isPlaying, gameState.gameOver]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-8 bottom-8 w-16 h-16 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center z-40 text-2xl"
      >
        🐦
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              ref={gameContainerRef}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className={`relative rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="p-4 bg-blue-500 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-white">Score: {gameState.score}</span>
                  <span className="text-white bg-blue-600 px-3 py-1 rounded-full text-sm">
                    Space / Mouse Click to Jump
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-blue-600/50 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="relative bg-gradient-to-b from-blue-300 to-blue-500" 
                   style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
                {/* Bird */}
                <motion.div
                  className="absolute w-[30px] h-[30px] bg-yellow-400 rounded-full"
                  style={{
                    left: GAME_WIDTH / 2 - BIRD_SIZE / 2,
                    top: gameState.birdY,
                    rotate: gameState.velocity * 2,
                  }}
                >
                  <div className="absolute right-1 top-2 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute right-0 top-1 w-4 h-2 bg-orange-500 rounded-full" />
                </motion.div>

                {/* Pipes */}
                {gameState.pipes.map((pipe, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="absolute bg-green-500 border-4 border-green-600"
                      style={{
                        left: pipe.x,
                        top: 0,
                        width: PIPE_WIDTH,
                        height: pipe.gapStart,
                      }}
                    />
                    <div
                      className="absolute bg-green-500 border-4 border-green-600"
                      style={{
                        left: pipe.x,
                        top: pipe.gapStart + PIPE_GAP,
                        width: PIPE_WIDTH,
                        height: GAME_HEIGHT - (pipe.gapStart + PIPE_GAP),
                      }}
                    />
                  </React.Fragment>
                ))}

                {/* Game overlay */}
                {(!gameState.isPlaying || gameState.gameOver) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        {gameState.gameOver ? 'Game Over!' : 'Flappy Bird'}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startGame}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-semibold"
                      >
                        {gameState.gameOver ? 'Try Again' : 'Start Game'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniGame;