import React from "react";
import styles from "../styles/styles";

export default function DrinkTable({
  drinkers,
  drinkTypes,
  onAddDrink,
  onRemoveDrink,
  onRemoveDrinker,
}) {
  return (
    <div>
      <h2>Juojien juomamäärät</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Juoja</th>
            {drinkTypes.map((type) => (
              <th key={type}>{type}</th>
            ))}
            <th>Yhteensä</th>
            <th>Toiminnot</th>
          </tr>
        </thead>
        <tbody>
          {drinkers.map((drinker) => {
            const drinks = drinker.drinks || {}; // 🛡️ Turva: varmistetaan että drinks on objekti
            const total = Object.values(drinks).reduce((a, b) => a + b, 0);

            return (
              <tr key={drinker.name}>
                <td>{drinker.name}</td>

                {drinkTypes.map((type) => (
                  <td key={type}>{drinks[type] ?? 0}</td> // 🛡️ varmistus
                ))}

                <td>{total}</td>

                <td style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {drinkTypes.map((type) => (
                      <div
                        key={type}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            minWidth: "70px",
                            textAlign: "right",
                          }}
                        >
                          {type}
                        </span>
                        <button
                          onClick={() => onAddDrink(drinker.name, type)}
                          style={styles.smallButton}
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveDrink(drinker.name, type)}
                          style={styles.smallButton}
                        >
                          −
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => onRemoveDrinker(drinker.name)}
                      style={styles.deleteButton}
                    >
                      Poista juoja
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
