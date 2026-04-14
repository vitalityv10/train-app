import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';

export function useTrainCard(train) {
  const { addToWishlist, removeFromWishlist, addToCart, user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleWishlist = () => {
    if (!user) return;
    if (isWishlisted) {
      removeFromWishlist(train.id);
    } else {
      addToWishlist(train);
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!user) return;
    addToCart(train);
  };

  const departureTime = new Date(train.route.from.departureTime).toLocaleTimeString('uk-UA', {
    hour: '2-digit', minute: '2-digit'
  });
  const arrivalTime = new Date(train.route.to.arrivalTime).toLocaleTimeString('uk-UA', {
    hour: '2-digit', minute: '2-digit'
  });
  const departureDate = new Date(train.route.from.departureTime).toLocaleDateString('uk-UA');

  return {
    isWishlisted, toggleWishlist,
    showModal, setShowModal,
    handleAddToCart,
    departureTime, arrivalTime, departureDate,
  };
}