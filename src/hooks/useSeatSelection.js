import { useState } from "react";

const generateSeats = (carriages, seatsPerCarriage) => {
  const seats = [];
  for (let c = 1; c <= carriages; c++) {
    for (let s = 1; s <= seatsPerCarriage; s++) {
      seats.push({ carriage: c, number: s, status: "available" });
    }
  }
  return seats;
};

const buildInitialStore = () => {
  const store = {};
  for (let id = 1; id <= 20; id++) {
    store[id] = generateSeats(3, 36);
  }
  return store;
};

export function useSeatSelection() {
  const [seatsStore, setSeatsStore] = useState(buildInitialStore);

  const getSeatsForTrain = (trainId) => seatsStore[trainId] || [];

  const selectSeat = (trainId, carriage, seatNumber) => {
    setSeatsStore((prev) => ({
      ...prev,
      [trainId]: prev[trainId].map((seat) =>
        seat.carriage === carriage && seat.number === seatNumber
          ? {
              ...seat,
              status: seat.status === "selected" ? "available" : "selected",
            }
          : seat,
      ),
    }));
  };

  // Функція для скидання вибраних місць
  const resetSeats = () => {
    setSeatsStore(buildInitialStore());
  };

  return { getSeatsForTrain, selectSeat, resetSeats };
}
