import React from "react";
import Keyboard from "react-simple-keyboard";
import { motion } from "framer-motion";
import "react-simple-keyboard/build/css/index.css";
import "./OnscreenKeyboard.css";

const OnscreenKeyboard = ({ onKeyPress, letterStatuses }) => {
  const keyboardOptions = {
    onKeyPress: (key) => onKeyPress(key),
    layout: {
      default: [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Enter Z X C V B N M Backspace",
      ],
    },
    display: {
      Enter: "Enter",
      Backspace: "⌫",
    },
  };

  const groupedByStatus = Object.entries(letterStatuses).reduce(
    (acc, [letter, status]) => {
      acc[status].push(letter);
      return acc;
    },
    { correct: [], present: [], absent: [] }
  );

  const buttonTheme = Object.entries(groupedByStatus)
    .filter(([status, keys]) => keys.length > 0)
    .map(([status, keys]) => ({
      class: `hg-button-${status}`,
      buttons: keys.join(" "),
    }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, transition: { duration: 1 } }} // Start smaller and increase size
      animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }} // Scale to normal size
    >
      <Keyboard
        theme={"hg-theme-default myTheme1"}
        buttonTheme={buttonTheme}
        {...keyboardOptions}
      />
    </motion.div>
  );
};

export default OnscreenKeyboard;
