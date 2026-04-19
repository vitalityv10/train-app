import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./auth/AuthContext";

const TicketsContext = createContext(null);

export const TicketsProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  const getUserRef = () => doc(db, "users", user.uid);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setPurchasedTickets([]);
      return;
    }
    const unsubscribe = onSnapshot(getUserRef(), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWishlist(data.wishlist || []);
        setPurchasedTickets(data.purchasedTickets || []);
      }
    });
    return unsubscribe;
  }, [user]);

  const purchaseTickets = async (tickets) => {
    if (!user) return;

    const updated = [...purchasedTickets, ...tickets];
    setPurchasedTickets(updated);
    await updateDoc(getUserRef(), { purchasedTickets: updated });

    for (const ticket of tickets) {
      const timeString = ticket.route?.from?.departureTime;
      const dateOnly = timeString
        ? new Date(timeString).toISOString().split("T")[0]
        : "unknown-date";

      const trainIdentifier = ticket.id || ticket.number;
      const occupancyDocId = `${trainIdentifier}_${dateOnly}`;
      const seatId = `${ticket.seat.carriage}_${ticket.seat.number}`;

      const occupancyRef = doc(db, "trains_occupancy", occupancyDocId);
      const occupancySnap = await getDoc(occupancyRef);

      if (occupancySnap.exists()) {
        await updateDoc(occupancyRef, {
          occupiedSeats: arrayUnion(seatId),
        });
      } else {
        await setDoc(occupancyRef, {
          occupiedSeats: [seatId],
        });
      }
    }
  };

  const addToWishlist = async (train) => {
    if (!user || wishlist.find((i) => i.id === train.id)) return;
    const newWishlist = [...wishlist, train];
    setWishlist(newWishlist);
    await updateDoc(getUserRef(), { wishlist: newWishlist });
  };

  const removeFromWishlist = async (id) => {
    if (!user) return;
    const newWishlist = wishlist.filter((i) => i.id !== id);
    setWishlist(newWishlist);
    await updateDoc(getUserRef(), { wishlist: newWishlist });
  };

  return (
    <TicketsContext.Provider
      value={{
        wishlist,
        purchasedTickets,
        purchaseTickets,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
