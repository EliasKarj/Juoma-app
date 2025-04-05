import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDrinkerForm from "./components/AddDrinkerForm.jsx";
import AddDrinkTypeForm from "./components/AddDrinkTypeForm.jsx";
import DrinkTypeManager from "./components/DrinkTypeManager.jsx";
import DrinkTable from "./components/DrinkTable.jsx";
import Timer from "./components/Timer.jsx";
import Ranking from "./components/Ranking.jsx";
import styles from "./styles/styles.js";
import RulesPanel from "./components/RulesPanel.jsx";

const STORAGE_KEY = "drink_app_data";

function App() {
  const [drinkTypes, setDrinkTypes] = useState(["Shot", "Olut", "Viini"]);
  const [drinkers, setDrinkers] = useState([]);
  const [newDrinker, setNewDrinker] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDrinkTypes(parsed.drinkTypes || []);
      setDrinkers(parsed.drinkers || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ drinkTypes, drinkers })
    );
  }, [drinkTypes, drinkers]);

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

  return (
    <>
      <h1 style={styles.header}>Juomapeli</h1>
      <div style={styles.topNav}>
       <Link to="/stats" style={styles.topLink}>
        Näytä tilastot
        </Link>
    </div>
      <div style={styles.container}>
        <RulesPanel />
        <Timer />
        <Ranking drinkers={drinkers} />

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

export default App;
