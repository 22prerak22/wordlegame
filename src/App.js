import React, { useEffect, useState, useCallback } from "react";
import Grid from "./components/Grid";
import useWordleGame from "./hooks/useWordleGame";
import Modal from "./components/Modal";
import { motion, AnimatePresence } from "framer-motion";
import OnscreenKeyboard from "./components/OnscreenKeyboard"; // Import your onscreen keyboard component
import "./App.css";

function App() {
  const {
    guesses,
    currentGuess,
    gameOver,
    win,
    message,
    handleKeyPress,
    handleRestart,
  } = useWordleGame();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Conditionally attach or detach keypress handler based on modal state
  useEffect(() => {
    if (!showModal) {
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, showModal]);

  // Conditionally show modal when game over or win
  const openModal = useCallback((type) => {
    setModalType(type);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalType(""); // Reset modal type
  }, []);

  // Show the appropriate modal based on game state
  useEffect(() => {
    if (win) {
      setTimeout(() => {
        openModal("win-acknowledge");
      }, 1800);
    } else if (gameOver && !win) {
      openModal("game-over");
    }
  }, [gameOver, win, openModal]);

  const handleInstructions = useCallback(() => {
    openModal("instructions");
  }, [openModal]);

  // Restart game when modal is closed for game over or win
  const handleRestartGame = useCallback(() => {
    closeModal();
    if (modalType === "game-over" || modalType === "win-acknowledge") {
      handleRestart(); // Restart game after modal closes
    }
  }, [closeModal, handleRestart, modalType]);

  // Custom function to handle onscreen keyboard keypress
  const handleKeyPressFromOnScreenKeyboard = (key) => {
    handleKeyPress({ key }); // Forward keypress to handleKeyPress
  };

  return (
    <div className="app">
      <h1>Wordle Clone</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="instruction-button"
        onClick={handleInstructions}
      >
        How to Play
      </motion.button>
      <h3>Current Guess - {currentGuess}</h3>
      <h3>Try Left - {6 - guesses.length}</h3>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <p>{message}</p>

      {/* Render Modal conditionally based on `showModal` */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={handleRestartGame}
          type={modalType}
          onButtonClick={handleRestartGame}
        />
      )}

      {/* Show the onscreen keyboard when the modal is not active */}
      {!showModal && (
        <OnscreenKeyboard onKeyPress={handleKeyPressFromOnScreenKeyboard} />
      )}
    </div>
  );
}

export default App;
