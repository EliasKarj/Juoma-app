import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,Bar,XAxis,YAxis,Tooltip,PieChart,Pie,Cell,Legend,} from "recharts";
import styles from "../styles/styles";

const loadData = () => {
  const saved = localStorage.getItem("drink_app_data");
  if (saved) {
    const { drinkers = [], drinkTypes = [] } = JSON.parse(saved);
    return { drinkers, drinkTypes };
  }
  return { drinkers: [], drinkTypes: [] };
};
const colors = ["#1f77b4", "#2ca02c", "#ff7f0e", "#d62728", "#9467bd", "#8c564b"];

export default function StatsPage() {
  const { drinkers, drinkTypes } = loadData();
  const juojaData = drinkers.map((drinker) => {
    const row = { name: drinker.name };
    for (const type of drinkTypes) {
      row[type] = drinker.drinks[type] ?? 0;
    }
    return row;
  });

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

  return (
    <div style={{ ...styles.container, paddingTop: "100px" }}>
      <h2>📊 Pelin Tilastot</h2>

      <div style={{ margin: "20px auto", maxWidth: "700px" }}>
        <h3>Juojien juomamäärät tyypeittäin</h3>
        <BarChart width={600} height={300} data={juojaData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {drinkTypes.map((type, i) => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              fill={colors[i % colors.length]}
            />
          ))}
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
