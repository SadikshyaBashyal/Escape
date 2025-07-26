import React, { useState } from "react";
import "./Room1Page.css"; // Import the CSS file

const room1Artifacts = [
  { icon: "🏺", top: "60%", left: "20%", clue: "The god's name is inscribed on the vase." },
  { icon: "🗡️", top: "70%", left: "70%", clue: "A blade with ancient runes." },
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

  return (
    <div className="room-container">
      {/* Ambient lighting effects */}
      <div className="ambient-light" />
      
      {/* Floating particles for atmosphere */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="floating-particle" />
      ))}
      
      {/* Temple Structure */}
      <div className="temple-structure" />
      
      {/* Roof Details */}
      <div className="roof-details" />
      
      {/* Main Door */}
      <div className="main-door">
        <div className="door-panel" />
      </div>
      
      {/* Pillars */}
      <div className="pillar left-pillar" />
      <div className="pillar right-pillar" />
      
      {/* Decorative Elements */}
      <div className="decorative-torii">⛩️</div>
      
      {/* Central God Statue */}
      <div className="god-statue-container">
        {/* Divine Radiance Effect */}
        <div className="divine-radiance" />
        
        {/* God Statue */}
        <div className="god-statue">
          👑
        </div>
        
        {/* Statue Base */}
        <div className="statue-base" />
        
        {/* Inscription on Base */}
        <div className="statue-inscription">
          AMATERASU
        </div>
      </div>
      
      {/* Artifacts */}
      {room1Artifacts.map((artifact, i) => (
        <div
          key={`artifact-${i}`}
          onClick={() => handleArtifactClick(i)}
          className="artifact"
          style={{
            top: artifact.top,
            left: artifact.left,
          }}
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
          style={{
            top: script.top,
            left: script.left,
          }}
        >
          {script.text}
        </div>
      ))}

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-text">
          Clues Found: {foundClues.length}/{totalClues}
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(foundClues.length / totalClues) * 100}%` }} />
        </div>
      </div>

      {/* Hint Button */}
      <button
        onClick={toggleHint}
        className="hint-button"
      >
        💡 Show Hint
      </button>

      {/* Hint Display */}
      {showHint && (
        <div className="hint-display">
          <div className="hint-title">
            🔍 Hint:
          </div>
          <div className="hint-text">
            The sun goddess is a central figure in Japanese mythology. 
            Look for clues that reference light, sun, or divine names.
            The answer is inscribed on the statue base.
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
            <div className="question-text">
              "What is the name of the sun goddess in this temple?"
            </div>
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
            <button type="submit" className="submit-button">
              Submit Answer
            </button>
          </form>
        ) : (
          <div className="correct-answer">
            ✅ Correct! Proceeding...
          </div>
        )}
      </div>

      {/* Decorative corne\r elements */}
      <div className="decorative-element bamboo">🎋</div>
      <div className="decorative-element cherry-blossom">🌸</div>
      <div className="decorative-element lantern">🏮</div>
    </div>
  );
}