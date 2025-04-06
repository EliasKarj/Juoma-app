import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import AddDrinkerForm from "./components/AddDrinkerForm.jsx";
import AddDrinkTypeForm from "./components/AddDrinkTypeForm.jsx";
import DrinkTypeManager from "./components/DrinkTypeManager.jsx";
import DrinkTable from "./components/DrinkTable.jsx";
import Timer from "./components/Timer.jsx";
import Ranking from "./components/Ranking.jsx";
import RulesPanel from "./components/RulesPanel.jsx";
import Room from "./components/Room.jsx";
import RoomUsers from "./components/RoomUsers.jsx";
import RulesEditor from "./components/RulesEditor.jsx";
import styles from "./styles/styles.js";

import { db } from "./firebase";
import { ref, set, onValue, remove } from "firebase/database";

function AppContent() {
  const [drinkTypes, setDrinkTypes] = useState([]);
  const [drinkers, setDrinkers] = useState([]);
  const [newDrinker, setNewDrinker] = useState("");

  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [joined, setJoined] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [timerState, setTimerState] = useState({ time: 0, isRunning: false });
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const savedRoomId = localStorage.getItem("currentRoomId");
    const savedUserName = localStorage.getItem("currentUserName");

    if (savedRoomId && savedUserName) {
      setRoomId(savedRoomId);
      setUserName(savedUserName);
      setJoined(true);
    }
  }, []);

  const handleLogin = () => {
    const generatedUserId = `${userName}-${Math.floor(Math.random() * 100000)}`;
    setUserId(generatedUserId);
    setJoined(true);

    localStorage.setItem("currentRoomId", roomId);
    localStorage.setItem("currentUserName", userName);
  };

  const logout = () => {
    if (roomId && userId) {
      const userRef = ref(db, `rooms/${roomId}/users/${userId}`);
      remove(userRef);
    }

    localStorage.removeItem("currentRoomId");
    localStorage.removeItem("currentUserName");

    setUserName("");
    setRoomId("");
    setUserId("");
    setJoined(false);
  };

  useEffect(() => {
    if (!joined || !roomId) return;

    const dataRef = ref(db, `rooms/${roomId}/data`);
    const unsub = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDrinkTypes(data.drinkTypes || []);
        setDrinkers(data.drinkers || []);
      }
      setDataLoaded(true);
    });

    return () => unsub();
  }, [joined, roomId]);

  useEffect(() => {
    if (!joined || !roomId || !dataLoaded) return;

    const dataRef = ref(db, `rooms/${roomId}/data`);
    set(dataRef, {
      drinkTypes,
      drinkers,
    });
  }, [drinkTypes, drinkers, joined, roomId, dataLoaded]);

  useEffect(() => {
    if (!joined || !roomId) return;

    const timerRef = ref(db, `rooms/${roomId}/timer`);
    const unsub = onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTimerState(data);
      }
    });

    return () => unsub();
  }, [joined, roomId]);

  const updateTimerInFirebase = (newState) => {
    if (!roomId) return;
    const timerRef = ref(db, `rooms/${roomId}/timer`);
    set(timerRef, newState);
  };

  useEffect(() => {
    if (!joined || !roomId) return;

    const rulesRef = ref(db, `rooms/${roomId}/rules`);
    const unsub = onValue(rulesRef, (snapshot) => {
      const data = snapshot.val();
      setRules(data || []);
    });

    return () => unsub();
  }, [joined, roomId]);

  const updateRulesInFirebase = (newRules) => {
    if (!roomId) return;
    const rulesRef = ref(db, `rooms/${roomId}/rules`);
    set(rulesRef, newRules);
  };

  const addDrinker = (name) => {
    if (name && !drinkers.find((d) => d.name === name)) {
      const newEntry = {
        name,
        drinks: drinkTypes.reduce((acc, type) => {
          acc[type] = 0;
          return acc;
        }, {}),
      };
      setDrinkers([...drinkers, newEntry]);
      setNewDrinker("");
    }
  };

  const removeDrinker = (name) => {
    setDrinkers(drinkers.filter((d) => d.name !== name));
  };

  const addDrink = (drinkerName, drinkType) => {
    setDrinkers((prev) =>
      prev.map((d) =>
        d.name === drinkerName
          ? {
              ...d,
              drinks: {
                ...d.drinks,
                [drinkType]: d.drinks[drinkType] + 1,
              },
            }
          : d
      )
    );
  };

  const removeDrink = (drinkerName, drinkType) => {
    setDrinkers((prev) =>
      prev.map((d) =>
        d.name === drinkerName
          ? {
              ...d,
              drinks: {
                ...d.drinks,
                [drinkType]: Math.max(d.drinks[drinkType] - 1, 0),
              },
            }
          : d
      )
    );
  };

  const addDrinkType = (newType) => {
    if (!drinkTypes.includes(newType)) {
      setDrinkTypes([...drinkTypes, newType]);
      setDrinkers((prev) =>
        prev.map((d) => ({
          ...d,
          drinks: { ...d.drinks, [newType]: 0 },
        }))
      );
    }
  };

  const removeDrinkType = (typeToRemove) => {
    setDrinkTypes(drinkTypes.filter((t) => t !== typeToRemove));
    setDrinkers((prev) =>
      prev.map((d) => {
        const updatedDrinks = { ...d.drinks };
        delete updatedDrinks[typeToRemove];
        return { ...d, drinks: updatedDrinks };
      })
    );
  };

  if (!joined) {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>🍻 Juoma-app</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (userName.trim() && roomId.trim()) {
              handleLogin();
            }
          }}
          style={styles.form}
        >
          <input
            type="text"
            placeholder="Nimesi"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Huonekoodi"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Liity huoneeseen
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#e53e3e",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          fontSize: "14px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        Kirjaudu ulos
      </button>

      <h1 style={styles.header}>
        Juomapeli – {roomId} ({userName})
      </h1>

      <div style={styles.topNav}>
        <Link to="/stats" style={styles.topLink}>
          Näytä tilastot
        </Link>
        <Link to="/rules" style={{ ...styles.topLink, marginLeft: "10px" }}>
          Muokkaa sääntöjä
        </Link>
      </div>

      <div style={styles.container}>
        <RulesPanel rules={rules} />
        <Timer timerState={timerState} onTimerChange={updateTimerInFirebase} />
        <Ranking drinkers={drinkers} />
        <RoomUsers roomId={roomId} />
        <Room userName={userName} roomId={roomId} userId={userId} />

        <div style={styles.layoutWrapper}>
          <div style={styles.leftColumn}>
            <AddDrinkerForm
              value={newDrinker}
              onChange={setNewDrinker}
              onAdd={addDrinker}
            />
            <AddDrinkTypeForm onAddType={addDrinkType} />
            <DrinkTypeManager
              drinkTypes={drinkTypes}
              onRemove={removeDrinkType}
            />
          </div>

          <div style={styles.rightColumn}>
            <DrinkTable
              drinkers={drinkers}
              drinkTypes={drinkTypes}
              onAddDrink={addDrink}
              onRemoveDrink={removeDrink}
              onRemoveDrinker={removeDrinker}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/rules" element={<RulesEditor />} />
    </Routes>
  );
}
