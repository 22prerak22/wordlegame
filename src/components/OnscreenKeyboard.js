import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css"; // Import styles for the keyboard
import "./OnscreenKeyboard.css";

const OnscreenKeyboard = ({ onKeyPress }) => {
  const keyboardOptions = {
    onKeyPress: (key) => {
      onKeyPress(key); // Handle key press
    },
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "Enter z x c v b n m Backspace",
      ],
    },
    display: {
      Enter: "Enter",
      Backspace: "⌫",
    },
  };

  return (
    <div>
      <Keyboard theme={"hg-theme-default myTheme1"} {...keyboardOptions} />
    </div>
  );
};

export default OnscreenKeyboard;
