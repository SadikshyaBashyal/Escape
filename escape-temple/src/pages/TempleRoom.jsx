import React from "react";
import "./TempleRoom.css";
export default function TempleRoom({ artifacts = [], scripts = [], onArtifactClick, onScriptClick, showGod = true, children }) {
  return (
    <div className="temple-room">
      {showGod && <div className="god-statue">🗿</div>}
      {scripts.map((script, i) => (
        <div
          key={i}
          className="wall-script"
          style={{ top: script.top, left: script.left }}
          onClick={() => onScriptClick && onScriptClick(i)}
        >
          {script.text}
        </div>
      ))}
      {artifacts.map((artifact, i) => (
        <div
          key={i}
          className="artifact"
          style={{ top: artifact.top, left: artifact.left }}
          onClick={() => onArtifactClick && onArtifactClick(i)}
        >
          {artifact.icon}
        </div>
      ))}
      {children}
    </div>
  );
} 