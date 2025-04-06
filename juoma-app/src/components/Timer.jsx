import React, { useEffect, useRef } from "react";
import styles from "../styles/styles";

export default function Timer({ timerState, onTimerChange }) {
  const { time, isRunning } = timerState;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        onTimerChange({ time: time + 10, isRunning: true });
      }, 10); // 10 ms välein kuten alkuperäinen
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${centis}`;
  };

  return (
    <div style={styles.timer}>
      <div style={styles.timerTime}>⏱️ {formatTime(time)}</div>
      <div style={styles.timerControls}>
        <button
          onClick={() => onTimerChange({ time, isRunning: true })}
          style={styles.button}
        >
          Start
        </button>
        <button
          onClick={() => onTimerChange({ time, isRunning: false })}
          style={styles.button}
        >
          Stop
        </button>
        <button
          onClick={() => onTimerChange({ time: 0, isRunning: false })}
          style={styles.deleteButton}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
