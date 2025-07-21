import React, { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import TempleRoom from "./pages/TempleRoom";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
// Placeholder components (to be implemented in separate files)
const Person = ({ entering }) => (
  <div className={`person ${entering ? "entering" : ""}`}>🧑</div>
);
const Door = ({ closed }) => (
  <div className={`door ${closed ? "closed" : "open"}`}></div>
);

const room1Artifacts = [
  { icon: "🏺", top: "60%", left: "20%", clue: "The god's name is inscribed on the vase." },
  { icon: "🗡️", top: "70%", left: "70%", clue: "A blade with ancient runes." },
];
const room1Scripts = [
  { text: "'Seek the name of the god.'", top: "20%", left: "10%", clue: "The answer is on the statue." },
  { text: "'Only the worthy may proceed.'", top: "10%", left: "60%", clue: "Look for the hidden sign." },
];

function App() {
  const [stage, setStage] = useState("intro"); // intro, room1, ...
  const [doorClosed, setDoorClosed] = useState(false);
  const [personIn, setPersonIn] = useState(false);
  const [foundClues, setFoundClues] = useState([]); // indices of found clues
  const [questionExpanded, setQuestionExpanded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [page, setPage] = useState("landing"); // landing, map, room1, ...
  const [completedRooms, setCompletedRooms] = useState(0);

  // Handle intro animation
  React.useEffect(() => {
    if (stage === "intro") {
      setTimeout(() => setPersonIn(true), 1000); // Person enters
      setTimeout(() => setDoorClosed(true), 2500); // Door closes
      setTimeout(() => setStage("room1"), 4000); // Enter first room
    }
  }, [stage]);

  // Total clues = artifacts + scripts
  const totalClues = room1Artifacts.length + room1Scripts.length;

  const handleArtifactClick = (i) => {
    if (!foundClues.includes("a" + i)) {
      setFoundClues([...foundClues, "a" + i]);
      alert(room1Artifacts[i].clue);
    }
  };
  const handleScriptClick = (i) => {
    if (!foundClues.includes("s" + i)) {
      setFoundClues([...foundClues, "s" + i]);
      alert(room1Scripts[i].clue);
    }
  };

  const handleExpandQuestion = () => {
    if (foundClues.length === totalClues) setQuestionExpanded(true);
  };

  const handleAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "osiris") {
      setQuestionAnswered(true);
      setTimeout(() => setStage("room2"), 1500); // Proceed to next room (to be implemented)
    } else {
      alert("Incorrect! Try again.");
    }
  };

  const handleShowInstructions = () => setShowInstructions(true);
  const handleCloseInstructions = () => setShowInstructions(false);
  const handleHome = () => setPage("landing");

  // When Play is clicked on LandingPage
  const handlePlay = () => setPage("map");
  // When a room is entered from MapPage
  const handleEnterRoom = (roomNum) => setPage(`room${roomNum}`);

  return (
    <div className="game-container">
      <Navbar onShowInstructions={handleShowInstructions} onHome={handleHome} />
      {/* Instructions Popup */}
      {showInstructions && (
        <div className="instructions-popup-overlay">
          <div className="instructions-popup">
            <button className="instructions-close" onClick={handleCloseInstructions} title="Close">&times;</button>
            <h2>How to Play</h2>
            <ol>
              <li>Enter the temple and watch the door close behind you.</li>
              <li>Explore the room: click on artifacts and wall scripts to find clues.</li>
              <li>Once all clues are found, click the question box to reveal the god's question.</li>
              <li>Type your answer and submit. If correct, you move to the next room.</li>
              <li>Each room has new clues and a new question. Solve all 5 to escape!</li>
              <li>When you find the key, the door will open and you can escape the temple.</li>
            </ol>
            <p>Good luck, adventurer!</p>
          </div>
        </div>
      )}
      {/* Main page routing */}
      {page === "landing" && <LandingPage onPlay={handlePlay} />}
      {page === "map" && <MapPage completedRooms={completedRooms} onEnterRoom={handleEnterRoom} />}
      {page === "room1" && (
        <TempleRoom
          showGod={true}
          artifacts={room1Artifacts}
          scripts={room1Scripts}
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
                  "What is the name of the god in this temple?"
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
      )}
    </div>
  );
}

export default App;