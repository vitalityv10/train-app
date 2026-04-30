import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { initialTrainsData } from "../data/trains";

export function useTrainsData() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const snapshot = await getDocs(collection(db, "trains"));
        if (snapshot.empty) {
          for (const train of initialTrainsData) {
            await setDoc(doc(db, "trains", String(train.id)), train);
          }
          setTrains(initialTrainsData);
        } else {
          setTrains(snapshot.docs.map((d) => d.data()));
        }
      } catch (error) {
        console.error("Error fetching trains:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, []);

  return { trains, loading };
}
