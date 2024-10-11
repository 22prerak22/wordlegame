import React from "react";
import "./Modal.css";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ show, onClose, type, onButtonClick }) => {
  const modalClass = type ? `modal-${type}` : "";
  const isGameOver = type === "game-over";
  const isWinAcknowledge = type === "win-acknowledge";
  const isInstructions = type === "instructions";

  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === "Escape" || event.key === "Enter") {
      onClose(); // Close modal when Enter or Escape is pressed
    }
  };

  return (
    show && (
      <AnimatePresence>
        <motion.div
          className="modal"
          key="modal"
          initial={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <div
            className={`modal-content ${modalClass}`}
            onKeyDown={handleKeyDown} // Handle key presses directly
          >
            <h2>
              {isGameOver
                ? "Game Over!"
                : isWinAcknowledge
                ? "Congratulations!"
                : "How to Play"}
            </h2>
            <p>
              {isGameOver
                ? "Better luck next time!"
                : isWinAcknowledge
                ? "You guessed the word correctly!"
                : "Guess the Wordle in 6 tries. Each guess must be a valid 5-letter word. After submitting a guess, the color of the tiles will change to show how close your guess was to the word."}
            </p>

            {isInstructions && (
              <div className="instructions-list">
                <ul>
                  <li>
                    <strong className="small-tile correct">G</strong> The letter
                    is correct & in the correct position.
                  </li>
                  <li>
                    <strong className="small-tile present">Y</strong> The letter
                    is correct but in the wrong position.
                  </li>
                  <li>
                    <strong className="small-tile absent">G</strong> The letter
                    is not in the word at all.
                  </li>
                </ul>
                <p>Try to solve the puzzle within 6 attempts. Good luck!</p>
              </div>
            )}

            <div className="modal-buttons">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="modal-button"
                onClick={onButtonClick}
              >
                {isInstructions ? "Close" : "Play Again"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default Modal;
