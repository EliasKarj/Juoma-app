import React, { useState } from "react";
import styles from "../styles/styles";

export default function AddDrinkTypeForm({ onAddType }) {
  const [newType, setNewType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = newType.trim();
    if (clean) {
      onAddType(clean);
      setNewType("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Uusi juomatyyppi"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Lisää juomatyyppi
      </button>
    </form>
  );
}
