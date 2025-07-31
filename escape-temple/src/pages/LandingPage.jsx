import React, { useState } from "react";
import "./LandingPage.css";
export default function LandingPage({ onPlay }) {
  const [stage, setStage] = useState("idle"); // idle, showDoor, personApproach, doorOpen, personEnter
  const handlePlay = () => {
    setStage("showDoor");
    setTimeout(() => setStage("personApproach"), 700);
    setTimeout(() => setStage("doorOpen"), 2000);
    setTimeout(() => setStage("personEnter"), 3000);
    setTimeout(() => onPlay && onPlay(), 4200);
  };
  return (
    <div className="landing-bg">
      {stage === "idle" && (
        <button className="play-btn" onClick={handlePlay}>Play</button>
      )}
      {stage !== "idle" && (
        <div className="landing-door-scene">
          <div className={`landing-door-label`}>Escape Temple</div>
          <div className={`landing-door ${stage === "doorOpen" || stage === "personEnter" ? "open" : ""}`}></div>
          <div className={`landing-person ${stage === "personApproach" || stage === "doorOpen" || stage === "personEnter" ? "approach" : ""} ${stage === "personEnter" ? "enter" : ""}`}>🧑</div>
        </div>
      )}
    </div>
  );
}