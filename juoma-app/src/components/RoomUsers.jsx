import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import styles from "../styles/styles";

function RoomUsers({ roomId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, `rooms/${roomId}/users`);
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const userList = Object.values(data);
      setUsers(userList);
    });

    return () => unsubscribe();
  }, [roomId]);

  return (
    <div style={styles.roomUsersBox}>
      <h3 style={{ marginBottom: "10px" }}>👥 Huoneessa</h3>
      <ul style={styles.rankingList}>
        {users.map((user, i) => (
          <li key={i} style={styles.rankingItem}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomUsers;
