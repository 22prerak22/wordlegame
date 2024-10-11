// src/components/Tile.js
import React from "react";
import "./Tile.css";

const Tile = ({ letter, status }) => {
  const getClassName = () => {
    if (status === 2) return "tile correct";
    if (status === 1) return "tile present";
    if (status === 0) return "tile absent";
    return "tile";
  };

  return <div className={getClassName()}>{letter}</div>;
};

export default Tile;
