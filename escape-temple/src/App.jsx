import React, { useState } from "react";
import './App.css'
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Room1Page from "./pages/Room1Page";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [page, setPage] = useState("landing"); // landing, map, room1, ...
  const handleShowInstructions = () => setShowInstructions(true);
  const handleCloseInstructions = () => setShowInstructions(false);
  const handleHome = () => setPage("landing");

  // When Play is clicked on LandingPage
  const handlePlay = () => setPage("map");

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
      <Room1Page />
    </div>
  );
}

export default App;