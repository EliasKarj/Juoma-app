// App.js
import React, { useState } from "react";

function App() {
  const [drinkers, setDrinkers] = useState([]);
  const [drinkTasks, setDrinkTasks] = useState([]);

  const addDrinker = (name) => {
    if (name && !drinkers.includes(name)) {
      setDrinkers([...drinkers, name]);
    }
  };

  const addDrinkTask = (drinker, task) => {
    if (drinker && task) {
      setDrinkTasks([...drinkTasks, { drinker, task }]);
    }
  };

  return (
    <div>
      <h1>Juomatehtävä App</h1>
      <AddDrinkerForm onAdd={addDrinker} />
      <AddDrinkTaskForm drinkers={drinkers} onAdd={addDrinkTask} />
      <DrinkList drinkTasks={drinkTasks} />
      <DrinkSummary drinkTasks={drinkTasks} />
    </div>
  );
}

function AddDrinkerForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Juojan nimi"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Lisää juoja</button>
    </form>
  );
}

function AddDrinkTaskForm({ drinkers, onAdd }) {
  const [selectedDrinker, setSelectedDrinker] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(selectedDrinker, task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedDrinker}
        onChange={(e) => setSelectedDrinker(e.target.value)}
      >
        <option value="">Valitse juoja</option>
        {drinkers.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <input
        placeholder="Juomatehtävä"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Lisää tehtävä</button>
    </form>
  );
}

function DrinkList({ drinkTasks }) {
  return (
    <div>
      <h2>Juomatehtävät</h2>
      <ul>
        {drinkTasks.map((item, index) => (
          <li key={index}>
            {item.drinker} - {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DrinkSummary({ drinkTasks }) {
  const summary = drinkTasks.reduce((acc, { drinker }) => {
    acc[drinker] = (acc[drinker] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h2>Yhteenveto</h2>
      <ul>
        {Object.entries(summary).map(([drinker, count]) => (
          <li key={drinker}>
            {drinker}: {count} juomaa
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
