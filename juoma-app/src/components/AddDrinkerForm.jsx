import React from "react";
import styles from "../styles/styles";

export default function AddDrinkerForm({ value, onChange, onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        placeholder="Juojan nimi"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Lisää juoja
      </button>
    </form>
  );
}
