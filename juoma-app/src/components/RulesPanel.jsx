import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";

export default function RulesPanel() {
  const defaultRules = [
  ];

  const saved = localStorage.getItem("rules");
  const rules = saved ? JSON.parse(saved) : defaultRules;

  return (
    <div style={styles.rulesBox}>
      <h3>📜 Säännöt</h3>
      <ul style={styles.rulesList}>
        {rules.map((rule, index) => (
          <li key={index} style={styles.rulesItem}>{rule}</li>
        ))}
      </ul>
      <Link to="/rules" style={styles.button}>
        Muokkaa sääntöjä
      </Link>
    </div>
  );
}
