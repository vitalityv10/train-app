import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./auth/AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setCart(docSnap.data().cart || { items: [] });
      }
    });
    return unsubscribe;
  }, [user]);

  const updateCartInFirestore = async (newCart) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { cart: newCart });
  };

  const addToCart = async (train) => {
    if (!user) {
      alert("Будь ласка, увійдіть в акаунт, щоб додати квиток у кошик!");
      return;
    }

    const exists = cart.items.find((i) => i.id === train.id);
    const newItems = exists
      ? cart.items.map((i) =>
          i.id === train.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [...cart.items, { ...train, quantity: 1 }];

    await updateCartInFirestore({ items: newItems });
  };

  const removeFromCart = async (id) => {
    const newItems = cart.items.filter((i) => i.id !== id);
    await updateCartInFirestore({ items: newItems });
  };

  const updateQuantity = async (itemId, newQuantity) => {
    const newItems = cart.items.map((i) =>
      i.id === itemId ? { ...i, quantity: newQuantity } : i,
    );
    await updateCartInFirestore({ items: newItems });
  };

  const clearCart = () => updateCartInFirestore({ items: [] });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
