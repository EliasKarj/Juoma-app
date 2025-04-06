function Ranking({ drinkers }) {
  const sorted = [...drinkers].sort((a, b) => {
    const totalA = Object.values(a.drinks || {}).reduce((sum, val) => sum + val, 0);
    const totalB = Object.values(b.drinks || {}).reduce((sum, val) => sum + val, 0);
    return totalB - totalA;
  });

  return (
    <div style={{ position: "fixed", top: "500px", right: "20px", color: "white" }}>
      <h3>🏆 Ranking</h3>
      <ul>
        {sorted.map((d, i) => {
          const total = Object.values(d.drinks || {}).reduce((a, b) => a + b, 0);
          return <li key={i}>{d.name}: {total} juomaa</li>;
        })}
      </ul>
    </div>
  );
}

export default Ranking;
