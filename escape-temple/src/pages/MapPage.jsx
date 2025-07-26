import React, { useEffect, useRef, useState } from "react";
import "./MapPage.css";
export default function MapPage({ completedRooms = 0, onEnterRoom }) {
  const [personPos, setPersonPos] = useState(0); // 0: door, 1-5: rooms, 6: exit
  const [manLeft, setManLeft] = useState(null);
  const doorRef = useRef(null);
  const room1Ref = useRef(null);
  useEffect(() => {
    if (completedRooms < 3) {
      setTimeout(() => setPersonPos(completedRooms + 1), 800);
    } else {
      setTimeout(() => setPersonPos(6), 800);
    }
  }, [completedRooms]);
  useEffect(() => {
    if (personPos === 0 && doorRef.current) {
      const doorRect = doorRef.current.getBoundingClientRect();
      const parentRect = doorRef.current.parentNode.getBoundingClientRect();
      setManLeft(doorRect.left - parentRect.left + doorRect.width / 2);
    } else if (personPos === 1 && room1Ref.current) {
      const roomRect = room1Ref.current.getBoundingClientRect();
      const parentRect = room1Ref.current.parentNode.getBoundingClientRect();
      setManLeft(roomRect.left - parentRect.left + roomRect.width / 2);
    }
  }, [personPos]);
  const roomStates = Array(3)
    .fill(0)
    .map((_, i) =>
      i < completedRooms ? "done" : i === completedRooms ? "unlocked" : "locked"
    );
  return (
    <div className="map-bg">
      <div className="map-rooms" style={{ position: "relative" }}>
        <div className="map-door-container" style={{ position: 'relative' }}>
          <div className="map-door" ref={doorRef}>🚪</div>
        </div>
        {roomStates.map((state, i) => (
          <div
            key={i}
            className={`map-room map-room-${state}`}
            style={{ position: 'relative' }}
            ref={i === 0 ? room1Ref : null}
          >
            {state === "unlocked" && i === 0 ? (
              <button className="map-go-btn" onClick={() => onEnterRoom && onEnterRoom(1)}>
                Go
              </button>
            ) : state === "locked" ? (
              <span role="img" aria-label="locked">🔒</span>
            ) : (
              i + 1
            )}
          </div>
        ))}
        <div className="map-exit map-exit-large">EXIT</div>
        {/* Man absolutely positioned above door or room 1 */}

        {manLeft !== null && (personPos === 0 || personPos === 1) && (
          <div
            className="map-person-anim"
            style={{
              position: 'absolute',
              top: '-80px',
              left: manLeft,
              transform: 'translateX(-50%)',
              transition: 'left 1s cubic-bezier(.7,0,.3,1)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            🧑
          </div>
        )}
      </div>
    </div>
  );
} 