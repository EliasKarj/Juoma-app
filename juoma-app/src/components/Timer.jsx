import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/styles";

export default function Timer() {
  const [time, setTime] = useState(0); // millisekunnit
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10); // 10 ms välein
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, "0"); // 2 desimaalia
    return `${minutes}:${seconds}:${centis}`;
  };

  return (
    <div style={styles.timer}>
      <div style={styles.timerTime}>⏱️ {formatTime(time)}</div>
      <div style={styles.timerControls}>
        <button onClick={() => setRunning(true)} style={styles.button}>Start</button>
        <button onClick={() => setRunning(false)} style={styles.button}>Stop</button>
        <button
          onClick={() => {
            setRunning(false);
            setTime(0);
          }}
          style={styles.deleteButton}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
