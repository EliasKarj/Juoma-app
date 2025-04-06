import { useEffect } from "react";
import { db } from "../firebase";
import { ref, set, remove } from "firebase/database";

export default function Room({ userName, roomId, userId }) {
  useEffect(() => {
    if (!userId || !roomId) return;

    const userRef = ref(db, `rooms/${roomId}/users/${userId}`);
    set(userRef, { name: userName });
    const handleUnload = () => {
      remove(userRef);
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [roomId, userName, userId]);

  return null;
}
