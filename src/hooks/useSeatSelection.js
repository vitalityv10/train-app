import { useState, useEffect } from 'react';

const generateSeats = (carriages, seatsPerCarriage) => {
  const seats = [];
  for (let c = 1; c <= carriages; c++) {
    for (let s = 1; s <= seatsPerCarriage; s++) {
      seats.push({ carriage: c, number: s, status: 'available' });
    }
  }
  return seats;
};

const classConfig = {
  'Lux':     { carriages: 2, seatsPerCarriage: 18 },
  'Coupe':   { carriages: 3, seatsPerCarriage: 36 },
  '1-Class': { carriages: 4, seatsPerCarriage: 54 },
  '2-Class': { carriages: 5, seatsPerCarriage: 54 },
};

const buildInitialStore = () => {
  const store = {};
  for (let id = 1; id <= 20; id++) {
    store[id] = generateSeats(3, 36); 
  }
  return store;
};

export function useSeatSelection() {
  const [seatsStore, setSeatsStore] = useState(() => {
    const saved = localStorage.getItem('seatsStore');
    return saved ? JSON.parse(saved) : buildInitialStore();
  });

  useEffect(() => {
    localStorage.setItem('seatsStore', JSON.stringify(seatsStore));
  }, [seatsStore]);

  const getSeatsForTrain = (trainId) => seatsStore[trainId] || [];

  const selectSeat = (trainId, carriage, seatNumber) => {
    setSeatsStore(prev => ({
      ...prev,
      [trainId]: prev[trainId].map(seat =>
        seat.carriage === carriage && seat.number === seatNumber
          ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
          : seat.status === 'selected' 
            ? { ...seat, status: 'available' }
            : seat
      ),
    }));
  };

  const bookSeat = (trainId, carriage, seatNumber) => {
    setSeatsStore(prev => ({
      ...prev,
      [trainId]: prev[trainId].map(seat =>
        seat.carriage === carriage && seat.number === seatNumber
          ? { ...seat, status: 'booked' }
          : seat
      ),
    }));
  };

  return { getSeatsForTrain, selectSeat, bookSeat };
}