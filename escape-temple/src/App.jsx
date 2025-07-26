import React, { useState } from "react";
import './App.css'
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import Room1Page from "./pages/Room1Page";
import Room2Page from "./pages/Room2Page";
import Room3Page from "./pages/Room3Page";
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
      {page === "room1" && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}><Room1Page onComplete={() => setPage("map")}/></div>}
      {page === "room2" && <Room2Page onComplete={() => setPage("map")}/>} 
      {page === "room3" && <Room3Page onComplete={() => setPage("map")}/>} 
    </div>
  );
}

export default App;