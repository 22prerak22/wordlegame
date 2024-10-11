import React from "react";
import Tile from "./Tile";
import "./Grid.css";

const Grid = ({ guesses, currentGuess }) => {
  const totalRows = 6; // Set total number of rows to 6
  const WORD_LENGTH = 5; // Length of each guess

  // Generate all rows (past guesses + current guess + empty rows)
  const rows = Array.from({ length: totalRows }, (_, i) => {
    if (i < guesses.length) {
      // Render past guesses
      const guess = guesses[i];
      const letters = guess.map((g) => g.letter);
      const statuses = guess.map((g) => g.status);

      return (
        <div key={i} className="row">
          {letters.map((letter, idx) => (
            <Tile key={idx} letter={letter} status={statuses[idx]} />
          ))}
        </div>
      );
    } else if (i === guesses.length) {
      // Render current guess
      const letters = currentGuess.split("");
      return (
        <div key={i} className="row">
          {Array.from({ length: WORD_LENGTH }).map((_, idx) => (
            <Tile key={idx} letter={letters[idx] || ""} />
          ))}
        </div>
      );
    } else {
      // Render empty rows
      return (
        <div key={i} className="row">
          {Array.from({ length: WORD_LENGTH }).map((_, idx) => (
            <Tile key={idx} />
          ))}
        </div>
      );
    }
  });

  return <div className="grid">{rows}</div>;
};

export default Grid;
