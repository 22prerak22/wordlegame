import { useState } from "react";
import { API_ENDPOINT } from "../constants";

const useWordleGame = (WORD_LENGTH = 5, MAX_GUESSES = 6) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [message, setMessage] = useState("");
  const [letterStatuses, setLetterStatuses] = useState({}); // Track letter statuses

  const submitGuess = async () => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage("Not enough letters");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guess: currentGuess }),
      });

      const data = await response.json();

      if (!data.is_valid_word) {
        setMessage("Not a valid word");
        return;
      }

      const formattedGuess = data.score.map((score, index) => ({
        letter: currentGuess[index],
        status: score,
      }));

      setGuesses((prev) => [...prev, formattedGuess]);
      setCurrentGuess("");
      setMessage("");

      updateLetterStatuses(formattedGuess); // Update the letter statuses

      if (data.score.every((s) => s === 2)) {
        setWin(true);
        setGameOver(true);
        setMessage("Congratulations! You guessed the word!");
      } else if (guesses.length + 1 >= MAX_GUESSES) {
        setGameOver(true);
        setMessage("Game Over! Better luck next time.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const updateLetterStatuses = (formattedGuess) => {
    const newLetterStatuses = { ...letterStatuses };

    formattedGuess.forEach(({ letter, status }) => {
      if (status === 2) {
        newLetterStatuses[letter] = "correct"; // Green
      } else if (status === 1) {
        // Only update to 'present' if it's not already marked as 'correct'
        if (newLetterStatuses[letter] !== "correct") {
          newLetterStatuses[letter] = "present"; // Yellow
        }
      } else {
        // Only update to 'absent' if it's not already marked as 'correct' or 'present'
        if (!newLetterStatuses[letter]) {
          newLetterStatuses[letter] = "absent"; // Grey
        }
      }
    });

    setLetterStatuses(newLetterStatuses); // Update state with new statuses
  };

  const handleKeyPress = ({ key }) => {
    if (gameOver) return;

    if (key === "Enter") {
      submitGuess();
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key.toUpperCase());
      }
    }
  };

  const handleRestart = () => {
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWin(false);
    setMessage("");
    setLetterStatuses({}); // Reset letter statuses on restart
  };

  return {
    guesses,
    currentGuess,
    gameOver,
    win,
    message,
    letterStatuses, // Expose letterStatuses
    handleKeyPress,
    handleRestart,
    submitGuess,
  };
};

export default useWordleGame;
