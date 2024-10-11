import { useState } from "react";
import { API_ENDPOINT } from "../constants";

const useWordleGame = (WORD_LENGTH = 5, MAX_GUESSES = 6) => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleKeyPress = ({ key }) => {
    if (gameOver) return;
    console.log(key);

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
  };

  return {
    guesses,
    currentGuess,
    gameOver,
    win,
    message,
    handleKeyPress,
    handleRestart,
    submitGuess,
  };
};

export default useWordleGame;
