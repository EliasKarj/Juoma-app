import React from "react";
import styles from "../styles/styles";
import { motion, AnimatePresence } from "framer-motion";

export default function Ranking({ drinkers }) {
  const ranked = [...drinkers].sort((a, b) => {
    const totalA = Object.values(a.drinks).reduce((sum, val) => sum + val, 0);
    const totalB = Object.values(b.drinks).reduce((sum, val) => sum + val, 0);
    return totalB - totalA;
  });

  return (
    <div style={styles.rankingBox}>
      <h3>🥇 Top Juojat</h3>
      <motion.ol
        style={styles.rankingList}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        <AnimatePresence>
          {ranked.map((drinker, index) => {
            const total = Object.values(drinker.drinks).reduce((a, b) => a + b, 0);
            return (
              <motion.li
                key={drinker.name}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                style={styles.rankingItem}
              >
                {drinker.name} — {total}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ol>
    </div>
  );
}
