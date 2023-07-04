import React, { useEffect } from "react";
import "./Navigation.css";

export default function Navigation(props) {
  useEffect(() => {}, [props]);
  return (
    <div className="nav">
      <header className="header">
        <h1>Pokemon</h1>
      </header>
      <div className="score-display">
        <h3>Level : {props.level}</h3>
        <h3>Score : {props.score}</h3>
        <span>
          <h3>Best Score : {props.bestScore}</h3>
        </span>
      </div>
    </div>
  );
}
