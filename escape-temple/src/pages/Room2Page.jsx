import React, { useState } from "react";
import TempleRoom from "./TempleRoom";

const room2Artifacts = [
  { icon: "🔑", top: "55%", left: "30%", clue: "A key with a sun symbol." },
  { icon: "📜", top: "65%", left: "60%", clue: "Ancient scroll with a riddle." },
];
const room2Scripts = [
  { text: "'The sun rises in the east.'", top: "18%", left: "20%", clue: "The answer is a direction." },
  { text: "'Unlock the path with the right word.'", top: "12%", left: "70%", clue: "The key is not a thing, but a word." },
];

export default function Room2Page({ onComplete }) {
  const [foundClues, setFoundClues] = useState([]);
  const [questionExpanded, setQuestionExpanded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const totalClues = room2Artifacts.length + room2Scripts.length;

  const handleArtifactClick = (i) => {
    alert(room2Artifacts[i].clue);
    if (!foundClues.includes("a" + i)) setFoundClues([...foundClues, "a" + i]);
  };
  const handleScriptClick = (i) => {
    alert(room2Scripts[i].clue);
    if (!foundClues.includes("s" + i)) setFoundClues([...foundClues, "s" + i]);
  };
  const handleExpandQuestion = () => {
    if (foundClues.length === totalClues) setQuestionExpanded(true);
  };
  const handleAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "east") {
      setQuestionAnswered(true);
      setTimeout(() => onComplete && onComplete(), 1500);
    } else {
      alert("Incorrect! Try again.");
    }
  };
  return (
    <TempleRoom
      showGod={true}
      artifacts={room2Artifacts}
      scripts={room2Scripts}
      onArtifactClick={handleArtifactClick}
      onScriptClick={handleScriptClick}
    >
      <div
        className="question-box"
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: questionExpanded ? 320 : 120,
          height: questionExpanded ? 140 : 40,
          background: "#fffbe6",
          borderRadius: 12,
          boxShadow: "0 2px 8px #0005",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: foundClues.length === totalClues ? "pointer" : "not-allowed",
          transition: "all 0.4s cubic-bezier(.7,0,.3,1)",
          overflow: "hidden",
        }}
        onClick={handleExpandQuestion}
      >
        {!questionExpanded ? (
          <span style={{ color: "#a67c52", fontWeight: 600 }}>
            {foundClues.length === totalClues ? "Reveal Question" : "Find all clues..."}
          </span>
        ) : !questionAnswered ? (
          <form onSubmit={handleAnswer} style={{ width: "100%", textAlign: "center" }}>
            <div style={{ color: "#3a2c1a", fontWeight: 700, marginBottom: 8 }}>
              "What direction does the sun rise?"
            </div>
            <input
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              style={{ padding: 6, borderRadius: 6, border: "1px solid #a67c52", width: 180 }}
              placeholder="Type your answer..."
              autoFocus
            />
            <button type="submit" style={{ marginLeft: 8, padding: "6px 14px", borderRadius: 6, background: "#a67c52", color: "#fff", border: "none", fontWeight: 600 }}>
              Submit
            </button>
          </form>
        ) : (
          <div style={{ color: "green", fontWeight: 700 }}>
            Correct! Proceeding...
          </div>
        )}
      </div>
    </TempleRoom>
  );
} 