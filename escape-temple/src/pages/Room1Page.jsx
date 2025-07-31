import React, { useState, useEffect } from "react";
import "./Room1Page.css";

const room1Artifacts = [
  { icon: "🏺", top: "60%", left: "27%", clue: "The god's name is inscribed on the vase." },
  { icon: "🗡️", top: "60%", left: "68%", clue: "A blade with ancient runes." },
];

const room1Scripts = [
  { text: "'Seek the name of the god.'", top: "20%", left: "10%", clue: "The answer is on the statue." },
  { text: "'Only the worthy may proceed.'", top: "10%", left: "60%", clue: "Look for the hidden sign." },
];

export default function Room1Page({ onComplete }) {
  const [foundClues, setFoundClues] = useState([]);
  const [questionExpanded, setQuestionExpanded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [crownPosition, setCrownPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isCrownPlaced, setIsCrownPlaced] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });


  const totalClues = room1Artifacts.length + room1Scripts.length;

  const handleArtifactClick = (i) => {
    alert(room1Artifacts[i].clue);
    if (!foundClues.includes("a" + i)) setFoundClues([...foundClues, "a" + i]);
  };

  const handleScriptClick = (i) => {
    alert(room1Scripts[i].clue);
    if (!foundClues.includes("s" + i)) setFoundClues([...foundClues, "s" + i]);
  };

  const handleExpandQuestion = () => {
    if (foundClues.length === totalClues) setQuestionExpanded(true);
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "amaterasu") {
      setQuestionAnswered(true);
      setTimeout(() => onComplete && onComplete(), 1500);
    } else {
      alert("Incorrect! Try again.");
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Drag events
  const handleMouseDown = (e) => {
    if (questionExpanded && !isCrownPlaced) {
      const crownElement = e.target.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - crownElement.left,
        y: e.clientY - crownElement.top,
      });
      setIsDragging(true);
    }
  };
  

  const handleMouseMove = (e) => {
    if (isDragging) {
      setCrownPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };
  

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Check if dropped on god head (hitbox)
      const godElement = document.querySelector(".god-photo");
      const rect = godElement.getBoundingClientRect();

      if (
        crownPosition.x > rect.left &&
        crownPosition.x < rect.right &&
        crownPosition.y > rect.top &&
        crownPosition.y < rect.bottom
      ) {
        setIsCrownPlaced(true); // lock crown
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="room-container">
      <div className="ambient-light" />

      {[...Array(20)].map((_, i) => (
        <div key={i} className="floating-particle" />
      ))}

      <div className="temple-structure" />
      <div className="roof-details" />
      <div className="main-door">
        <div className="door-panel" />
      </div>
      <div className="pillar left-pillar" />
      <div className="pillar right-pillar" />
      <div className="decorative-torii">⛩️</div>

      {/* God Statue */}
      <div className={`god-statue-container ${isCrownPlaced ? "crown-placed" : ""}`}>
        <div className="divine-radiance" />
        {/* Crown draggable */}
        <div
          className="god-statue crown-draggable"
          onMouseDown={handleMouseDown}
          style={
            isCrownPlaced
              ? { left: "50%", top: "0%", transform: "translateX(-50%)" }
              : { position: "absolute", left: crownPosition.x, top: crownPosition.y }
          }
        >
          👑
        </div>

        <div className="statue-base" />
        <img className="god-photo" src="image.png" alt="God" />

        {/* Show name only after crown placed */}
        <div className={`statue-inscription ${isCrownPlaced ? "visible" : ""}`}>
          AMATERASU
        </div>
      </div>

      {/* Artifacts */}
      {room1Artifacts.map((artifact, i) => (
        <div
          key={`artifact-${i}`}
          onClick={() => handleArtifactClick(i)}
          className="artifact"
          style={{ top: artifact.top, left: artifact.left }}
        >
          {artifact.icon}
        </div>
      ))}

      {/* Scripts */}
      {room1Scripts.map((script, i) => (
        <div
          key={`script-${i}`}
          onClick={() => handleScriptClick(i)}
          className="script"
          style={{ top: script.top, left: script.left }}
        >
          {script.text}
        </div>
      ))}

      {/* Progress */}
      <div className="progress-indicator">
        <div className="progress-text">Clues Found: {foundClues.length}/{totalClues}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(foundClues.length / totalClues) * 100}%` }} />
        </div>
      </div>

      {/* Hint Button */}
      <button onClick={toggleHint} className="hint-button">💡 Show Hint</button>
      {showHint && (
        <div className="hint-display">
          <div className="hint-title">🔍 Hint:</div>
          <div className="hint-text">
            Drag the crown onto the god's head to reveal the goddess's name.
          </div>
        </div>
      )}

      {/* Question Box */}
      <div
        className={`question-box ${questionExpanded ? "expanded" : ""}`}
        onClick={handleExpandQuestion}
      >
        {!questionExpanded ? (
          <div className="question-prompt">
            {foundClues.length === totalClues ? "✨ Reveal Question" : `Find clues... (${foundClues.length}/${totalClues})`}
          </div>
        ) : !questionAnswered ? (
          <form onSubmit={handleAnswer} className="answer-form">
            <div className="question-text">"What is the name of the sun goddess in this temple?"</div>
            <div className="answer-input-container">
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                className="answer-input"
                placeholder="Enter answer..."
                autoFocus
              />
            </div>
            <button type="submit" className="submit-button">Submit Answer</button>
          </form>
        ) : (
          <div className="correct-answer">✅ Correct! Proceeding...</div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="decorative-element bamboo">🎋</div>
      <div className="decorative-element cherry-blossom">🌸</div>
      <div className="decorative-element lantern">🏮</div>
    </div>
  );
}
