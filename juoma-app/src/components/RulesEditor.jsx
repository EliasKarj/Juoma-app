import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";

export default function RulesEditor() {
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("rules");
    if (saved) {
      setRules(JSON.parse(saved));
    } else {
      setRules([""]);
    }
  }, []);

  const updateRule = (index, value) => {
    const updated = [...rules];
    updated[index] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, ""]);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const saveRules = () => {
    localStorage.setItem("rules", JSON.stringify(rules));
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.rulesEditorBox}>
        <h2 style={styles.rulesEditorTitle}>✍️ Muokkaa Sääntöjä</h2>
  
        <div style={styles.rulesEditorList}>
          {rules.map((rule, index) => (
            <div key={index} style={styles.rulesEditorItem}>
              <input
                style={styles.input}
                value={rule}
                onChange={(e) => updateRule(index, e.target.value)}
              />
              <button
                style={styles.deleteButton}
                onClick={() => removeRule(index)}
                title="Poista sääntö"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
  
        <div style={styles.rulesEditorControls}>
          <button onClick={addRule} style={styles.button}>+ Lisää sääntö</button>
          <button onClick={saveRules} style={styles.button}>💾 Tallenna</button>
          <Link to="/" style={styles.button}>← Takaisin</Link>
        </div>
      </div>
    </div>
  );
  
}
