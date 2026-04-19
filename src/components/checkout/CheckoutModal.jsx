import React, { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { FaWifi, FaSnowflake } from "react-icons/fa";
import { useSeatSelection } from "../../hooks/useSeatSelection";

import SeatGrid from "./SeatGrid";
import PaymentForm from "./PaymentForm";

export default function CheckoutModal({ show, onHide, cartItems, onSuccess }) {
  const { getSeatsForTrain, selectSeat, resetSeats } = useSeatSelection();

  const [step, setStep] = useState("seats");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    resetSeats();
    setStep("seats");
    onHide();
  };

  const allSeatsSelected = cartItems.every((item) => {
    const requiredQty = item.quantity || 1;
    const selectedSeats = getSeatsForTrain(item.id).filter(
      (s) => s.status === "selected",
    );
    return selectedSeats.length === requiredQty;
  });

  const validateCard = () => {
    const e = {};
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, "")))
      e.number = "Неправильний номер картки";
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) e.expiry = "Формат: MM/YY";
    if (!/^\d{3}$/.test(cardData.cvv)) e.cvv = "3 цифри";
    if (!cardData.name.trim()) e.name = "Введіть ім'я";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePhone = () => {
    const e = {};
    if (!/^\+?[\d\s]{10,13}$/.test(phone))
      e.phone = "Неправильний номер телефону";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    const valid = paymentMethod === "card" ? validateCard() : validatePhone();
    if (!valid) return;

    const tickets = [];

    cartItems.forEach((item) => {
      const selectedSeats = getSeatsForTrain(item.id).filter(
        (s) => s.status === "selected",
      );

      selectedSeats.forEach((seat, index) => {
        tickets.push({
          ...item,
          quantity: 1,
          seat: { ...item.seat, carriage: seat.carriage, number: seat.number },
          payment: {
            ...item.payment,
            status: paymentMethod === "card" ? "Paid" : "Pending",
            method: paymentMethod,
            paidAt: new Date().toISOString(),
          },
          ticketId: `TKT-${Date.now()}-${item.id}-${index}`,
        });
      });
    });

    onSuccess(tickets);
    resetSeats();
    setStep("seats");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {step === "seats" ? "🪑 Вибір місць" : "💳 Оплата"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === "seats" ? (
          <>
            {cartItems.map((item) => {
              const requiredQty = item.quantity || 1;
              const seats = getSeatsForTrain(item.id);
              const chosenSeats = seats.filter((s) => s.status === "selected");

              return (
                <div key={item.id} className="mb-4 border rounded p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>
                        #{item.number} {item.title}
                      </strong>
                      <span className="text-muted ms-2">
                        {item.route.from.city} → {item.route.to.city}
                      </span>
                    </div>
                    <div>
                      {item.hasWifi && <FaWifi className="text-primary me-2" />}
                      {item.hasAirConditioning && (
                        <FaSnowflake className="text-info me-2" />
                      )}
                      <Badge bg="success">
                        {item.payment.basePrice * requiredQty} UAH
                      </Badge>
                    </div>
                  </div>

                  {/* Виклик винесеного компонента */}
                  <SeatGrid
                    train={item}
                    seats={seats}
                    onSelect={selectSeat}
                    maxQuantity={requiredQty}
                  />

                  <div className="mt-2">
                    {chosenSeats.length === requiredQty ? (
                      <p className="text-success small mb-0">
                        ✅ Вибрано всі місця:{" "}
                        {chosenSeats
                          .map((s) => `В${s.carriage} М${s.number}`)
                          .join(", ")}
                      </p>
                    ) : (
                      <p className="text-danger small mb-0">
                        ⚠️ Оберіть ще {requiredQty - chosenSeats.length} місць
                        (Вибрано: {chosenSeats.length} з {requiredQty})
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          /* Виклик винесеного компонента */
          <PaymentForm
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardData={cardData}
            setCardData={setCardData}
            phone={phone}
            setPhone={setPhone}
            errors={errors}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        {step === "seats" ? (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Скасувати
            </Button>
            <Button
              variant="primary"
              disabled={!allSeatsSelected}
              onClick={() => setStep("payment")}
            >
              Далі → Оплата
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-secondary"
              onClick={() => setStep("seats")}
            >
              ← Назад
            </Button>
            <Button variant="success" onClick={handleConfirm}>
              {paymentMethod === "card" ? "💳 Оплатити" : "📋 Забронювати"}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
