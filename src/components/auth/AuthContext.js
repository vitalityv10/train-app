import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registeredUsers, setRegisteredUsers] = useState([
    { id: 1, name: 'Admin', age: 20, city: 'Kyiv', cart: { userId: 1, items: [] } }
  ]);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('trainCart');
    return saved ? JSON.parse(saved) : { userId: null, items: [] };
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('trainWishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [purchasedTickets, setPurchasedTickets] = useState(() => {
    const saved = localStorage.getItem('purchasedTickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trainCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('trainWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('purchasedTickets', JSON.stringify(purchasedTickets));
  }, [purchasedTickets]);

  const login = (userData) => {
    setUser(userData);
    setCart(prev => ({ ...prev, userId: userData.id }));
  };

  const logout = () => {
    setUser(null);
    setCart({ userId: null, items: [] });
  };

  const addToCart = (train) => {
    setCart(prev => {
      const existing = prev.items.find(item => item.id === train.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(item =>
            item.id === train.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, items: [...prev.items, { ...train, quantity: 1 }] };
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const clearCart = () => {
    setCart({ userId: user?.id ?? null, items: [] });
  };

  const addToWishlist = (train) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === train.id)) return prev;
      return [...prev, train];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const purchaseTickets = (tickets) => {
    setPurchasedTickets(prev => [...prev, ...tickets]);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      cart, addToCart, updateQuantity, removeFromCart, clearCart,
      wishlist, addToWishlist, removeFromWishlist,
      purchasedTickets, purchaseTickets,
      registeredUsers, setRegisteredUsers,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);