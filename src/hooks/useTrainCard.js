import { useState, useEffect } from "react";
import { useAuth } from "../components/context/auth/AuthContext";
import { useCart } from "../components/context/CartContext";
import { useTickets } from "../components/context/TicketsContext";

export function useTrainCard(train) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useTickets();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && wishlist) {
      const exists = wishlist.some((item) => item.id === train.id);
      setIsWishlisted(exists);
    } else {
      setIsWishlisted(false);
    }
  }, [wishlist, train.id, user]);

  const toggleWishlist = () => {
    if (!user) {
      alert("Увійдіть в систему, щоб додавати квитки у вибране!");
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(train.id);
    } else {
      addToWishlist(train);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Увійдіть в систему, щоб додати квиток у кошик!");
      return;
    }
    addToCart(train);
  };

  const departureTime = new Date(
    train.route.from.departureTime,
  ).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const arrivalTime = new Date(train.route.to.arrivalTime).toLocaleTimeString(
    "uk-UA",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const departureDate = new Date(
    train.route.from.departureTime,
  ).toLocaleDateString("uk-UA");

  return {
    isWishlisted,
    toggleWishlist,
    showModal,
    setShowModal,
    handleAddToCart,
    departureTime,
    arrivalTime,
    departureDate,
  };
}
