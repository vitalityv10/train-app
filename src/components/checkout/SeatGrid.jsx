import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const statusColor = {
  available: "#d4edda",
  booked: "#f8d7da",
  selected: "#cce5ff",
};

export default function SeatGrid({ train, seats, onSelect, maxQuantity }) {
  const [activeCarriage, setActiveCarriage] = useState(1);
  const [globalOccupied, setGlobalOccupied] = useState([]);

  const carriages = [...new Set(seats.map((s) => s.carriage))];
  const visible = seats.filter((s) => s.carriage === activeCarriage);

  const currentSelectedCount = seats.filter(
    (s) => s.status === "selected",
  ).length;

  useEffect(() => {
    if (!train || !train.route) return;

    const timeString = train.route?.from?.departureTime;
    const dateOnly = timeString
      ? new Date(timeString).toISOString().split("T")[0]
      : "unknown-date";

    const trainIdentifier = train.id || train.number;
    const occupancyId = `${trainIdentifier}_${dateOnly}`;

    const unsubscribe = onSnapshot(
      doc(db, "trains_occupancy", occupancyId),
      (docSnap) => {
        if (docSnap.exists()) {
          setGlobalOccupied(docSnap.data().occupiedSeats || []);
        } else {
          setGlobalOccupied([]);
        }
      },
    );

    return () => unsubscribe();
  }, [train]);

  const handleSeatClick = (seat, finalStatus) => {
    if (finalStatus === "booked") return;

    if (finalStatus !== "selected" && currentSelectedCount >= maxQuantity) {
      alert(
        `Для цього поїзда ви можете обрати лише ${maxQuantity} місць (відповідно до кошика)`,
      );
      return;
    }

    onSelect(train.id, seat.carriage, seat.number);
  };

  return (
    <div className="mb-3">
      <div className="d-flex gap-2 mb-2 flex-wrap">
        {carriages.map((c) => (
          <Button
            key={c}
            size="sm"
            variant={activeCarriage === c ? "primary" : "outline-secondary"}
            onClick={() => setActiveCarriage(c)}
          >
            Вагон {c}
          </Button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          gap: 5,
        }}
      >
        {visible.map((seat) => {
          const seatId = `${seat.carriage}_${seat.number}`;
          const isGloballyOccupied = globalOccupied.includes(seatId);
          const finalStatus = isGloballyOccupied ? "booked" : seat.status;

          return (
            <div
              key={seatId}
              onClick={() => handleSeatClick(seat, finalStatus)}
              style={{
                background: statusColor[finalStatus],
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "5px 3px",
                textAlign: "center",
                cursor: finalStatus === "booked" ? "not-allowed" : "pointer",
                fontSize: 11,
                fontWeight: 500,
                opacity: isGloballyOccupied ? 0.7 : 1,
              }}
            >
              {seat.number}
            </div>
          );
        })}
      </div>
      <div className="d-flex gap-3 mt-2 small">
        <span>
          <span
            style={{
              background: "#d4edda",
              padding: "1px 7px",
              borderRadius: 3,
            }}
          >
            ■
          </span>{" "}
          Вільне
        </span>
        <span>
          <span
            style={{
              background: "#cce5ff",
              padding: "1px 7px",
              borderRadius: 3,
            }}
          >
            ■
          </span>{" "}
          Вибране
        </span>
        <span>
          <span
            style={{
              background: "#f8d7da",
              padding: "1px 7px",
              borderRadius: 3,
            }}
          >
            ■
          </span>{" "}
          Зайняте
        </span>
      </div>
    </div>
  );
}
