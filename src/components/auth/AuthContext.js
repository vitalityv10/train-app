import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db, googleProvider } from '../../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, arrayUnion
} from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState([]);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    setLoading(true); 

    if (firebaseUser) {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      let userData;

      if (!userSnap.exists()) {
        userData = {
          name: firebaseUser.displayName || 'Користувач',
          email: firebaseUser.email,
          photo: firebaseUser.photoURL || '',
          cart: { items: [] },
          wishlist: [],
          purchasedTickets: [],
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
      }
      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL,
      });
      
      setCart(userData.cart || { items: [] });
      setWishlist(userData.wishlist || []);
      setPurchasedTickets(userData.purchasedTickets || []);

    } else {
      setUser(null);
      setCart({ items: [] });
      setWishlist([]);
      setPurchasedTickets([]);
    }

    setLoading(false);
  });

  return unsubscribe;
}, []);
  const getUserRef = () => doc(db, 'users', user.uid);

  // --- Auth ---
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // --- Cart ---
  const addToCart = async (train) => {
    const exists = cart.items.find(i => i.id === train.id);
    const newItems = exists
      ? cart.items.map(i => i.id === train.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart.items, { ...train, quantity: 1 }];

    const newCart = { items: newItems };
    setCart(newCart);
    await updateDoc(getUserRef(), { cart: newCart });
  };

  const removeFromCart = async (id) => {
    const newCart = { items: cart.items.filter(i => i.id !== id) };
    setCart(newCart);
    await updateDoc(getUserRef(), { cart: newCart });
  };

  const clearCart = async () => {
    const newCart = { items: [] };
    setCart(newCart);
    await updateDoc(getUserRef(), { cart: newCart });
  };
const updateQuantity = async (itemId, newQuantity) => {
  if (!user) return;

  const updatedItems = cart.items.map(item => 
    item.id === itemId ? { ...item, quantity: newQuantity } : item
  );
  setCart({ ...cart, items: updatedItems });

  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, {
    'cart.items': updatedItems
  });
};

  // --- Wishlist ---
  const addToWishlist = async (train) => {
    if (wishlist.find(i => i.id === train.id)) return;
    const newWishlist = [...wishlist, train];
    setWishlist(newWishlist);
    await updateDoc(getUserRef(), { wishlist: newWishlist });
  };

  const removeFromWishlist = async (id) => {
    const newWishlist = wishlist.filter(i => i.id !== id);
    setWishlist(newWishlist);
    await updateDoc(getUserRef(), { wishlist: newWishlist });
  };

  // --- Tickets ---
 const purchaseTickets = async (tickets) => {
  const updated = [...purchasedTickets, ...tickets];
  setPurchasedTickets(updated);
  await updateDoc(getUserRef(), { purchasedTickets: updated });

for (const ticket of tickets) {
  const timeString = ticket.route?.from?.departureTime;
  const dateOnly = timeString ? new Date(timeString).toISOString().split('T')[0] : 'unknown-date';
  
  const trainIdentifier = ticket.id || ticket.number; 

  const occupancyDocId = `${trainIdentifier}_${dateOnly}`;
  const seatId = `${ticket.seat.carriage}_${ticket.seat.number}`;

  const occupancyRef = doc(db, 'trains_occupancy', occupancyDocId);
  const occupancySnap = await getDoc(occupancyRef);

  if (occupancySnap.exists()) {
    await updateDoc(occupancyRef, {
      occupiedSeats: arrayUnion(seatId)
    });
  } else {
    await setDoc(occupancyRef, {
      occupiedSeats: [seatId]
    });
  }
}
};
  if (loading) return <div className="text-center mt-5">Завантаження...</div>;

  return (
    <AuthContext.Provider value={{
      user, loginWithGoogle, logout,
      cart, addToCart, removeFromCart, clearCart, updateQuantity,
      wishlist, addToWishlist, removeFromWishlist,
      purchasedTickets, purchaseTickets,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);