import React from "react";
import styles from "../styles/styles";

export default function DrinkTypeManager({ drinkTypes, onRemove }) {
  return (
    <div>
      <h2>Juomatyypit</h2>
      <ul style={styles.list}>
        {drinkTypes.map((type) => (
          <li key={type} style={styles.listItem}>
            {type}{" "}
            <button onClick={() => onRemove(type)} style={styles.deleteButton}>
              Poista
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
