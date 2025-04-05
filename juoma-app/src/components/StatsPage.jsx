import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import styles from "../styles/styles";
const loadData = () => {
  const saved = localStorage.getItem("drink_app_data");
  if (saved) {
    const { drinkers = [], drinkTypes = [] } = JSON.parse(saved);
    return { drinkers, drinkTypes };
  }
  return { drinkers: [], drinkTypes: [] };
};

export default function StatsPage() {
  const { drinkers, drinkTypes } = loadData();

  const juojaData = drinkers.map((d) => ({
    name: d.name,
    total: Object.values(d.drinks).reduce((a, b) => a + b, 0),
  }));

  const typeTotals = {};
  drinkers.forEach((d) => {
    for (const [type, count] of Object.entries(d.drinks)) {
      typeTotals[type] = (typeTotals[type] || 0) + count;
    }
  });
  const tyyppiData = Object.entries(typeTotals).map(([type, total]) => ({
    name: type,
    value: total,
  }));

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ff4444"];

  return (
    <div style={{ ...styles.container, paddingTop: "100px" }}>
      <h2>Pelin Tilastot</h2>

      <div style={{ margin: "20px auto", maxWidth: "600px" }}>
        <h3>Juojien kokonaismäärät</h3>
        <BarChart width={500} height={300} data={juojaData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#1f6feb" />
        </BarChart>
      </div>

      <div style={{ margin: "20px auto", maxWidth: "600px" }}>
        <h3>Juomatyypit yhteensä</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={tyyppiData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {tyyppiData.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>

      <Link to="/" style={{ ...styles.button, marginTop: "20px" }}>
        ← Takaisin peliin
      </Link>
    </div>
  );
}
