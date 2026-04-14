import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Tab, Tabs, Badge } from 'react-bootstrap';
import { FaWifi, FaSnowflake, FaCreditCard, FaPhone } from 'react-icons/fa';
import { useSeatSelection } from '../../hooks/useSeatSelection';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; 

const statusColor = {
  available: '#d4edda',
  booked:    '#f8d7da',
  selected:  '#cce5ff',
};

function SeatGrid({ train, seats, onSelect }) {
  const [activeCarriage, setActiveCarriage] = useState(1);
  const [globalOccupied, setGlobalOccupied] = useState([]); 
  
  const carriages = [...new Set(seats.map(s => s.carriage))];
  const visible = seats.filter(s => s.carriage === activeCarriage);

  useEffect(() => {
  if (!train || !train.route) return;

  const timeString = train.route?.from?.departureTime;
  const dateOnly = timeString ? new Date(timeString).toISOString().split('T')[0] : 'unknown-date';
  
  const trainIdentifier = train.id || train.number;

  const occupancyId = `${trainIdentifier}_${dateOnly}`;
  
  console.log("Шукаємо зайняті місця в документі:", occupancyId); 

  const unsubscribe = onSnapshot(doc(db, 'trains_occupancy', occupancyId), (docSnap) => {
    if (docSnap.exists()) {
      setGlobalOccupied(docSnap.data().occupiedSeats || []);
    } else {
      setGlobalOccupied([]);
    }
  });

  return () => unsubscribe();
}, [train]);

  return (
    <div className="mb-3">
      <div className="d-flex gap-2 mb-2 flex-wrap">
        {carriages.map(c => (
          <Button key={c} size="sm"
            variant={activeCarriage === c ? 'primary' : 'outline-secondary'}
            onClick={() => setActiveCarriage(c)}
          >
            Вагон {c}
          </Button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 5 }}>
        {visible.map(seat => {
          const seatId = `${seat.carriage}_${seat.number}`;
          const isGloballyOccupied = globalOccupied.includes(seatId);
          
          const finalStatus = isGloballyOccupied ? 'booked' : seat.status;

          return (
            <div
              key={seatId}
              onClick={() => finalStatus !== 'booked' && onSelect(train.id, seat.carriage, seat.number)}
              style={{
                background: statusColor[finalStatus],
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '5px 3px',
                textAlign: 'center',
                cursor: finalStatus === 'booked' ? 'not-allowed' : 'pointer',
                fontSize: 11,
                fontWeight: 500,
                opacity: isGloballyOccupied ? 0.7 : 1 
              }}
            >
              {seat.number}
            </div>
          );
        })}
      </div>
      <div className="d-flex gap-3 mt-2 small">
        <span><span style={{ background: '#d4edda', padding: '1px 7px', borderRadius: 3 }}>■</span> Вільне</span>
        <span><span style={{ background: '#cce5ff', padding: '1px 7px', borderRadius: 3 }}>■</span> Вибране</span>
        <span><span style={{ background: '#f8d7da', padding: '1px 7px', borderRadius: 3 }}>■</span> Зайняте</span>
      </div>
    </div>
  );
}

export default function CheckoutModal({ show, onHide, cartItems, onSuccess }) {
  const { getSeatsForTrain, selectSeat } = useSeatSelection();
  const [step, setStep] = useState('seats'); 
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const selectedSeats = cartItems.map(item => ({
    item,
    seat: getSeatsForTrain(item.id).find(s => s.status === 'selected'),
  }));
  const allSeatsSelected = selectedSeats.every(s => s.seat);

  const validateCard = () => {
    const e = {};
    if (!/^\d{16}$/.test(cardData.number.replace(/\s/g, ''))) e.number = 'Неправильний номер картки';
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) e.expiry = 'Формат: MM/YY';
    if (!/^\d{3}$/.test(cardData.cvv)) e.cvv = '3 цифри';
    if (!cardData.name.trim()) e.name = "Введіть ім'я";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePhone = () => {
    const e = {};
    if (!/^\+?[\d\s]{10,13}$/.test(phone)) e.phone = 'Неправильний номер телефону';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    const valid = paymentMethod === 'card' ? validateCard() : validatePhone();
    if (!valid) return;

    const tickets = selectedSeats.map(({ item, seat }) => ({
      ...item,
      seat: { ...item.seat, carriage: seat.carriage, number: seat.number },
      payment: {
        ...item.payment,
        status: paymentMethod === 'card' ? 'Paid' : 'Pending',
        method: paymentMethod,
        paidAt: new Date().toISOString(),
      },
      ticketId: `TKT-${Date.now()}-${item.id}`,
    }));

    onSuccess(tickets);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 'seats' ? '🪑 Вибір місць' : '💳 Оплата'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 'seats' ? (
          <>
            {cartItems.map(item => {
              const seats = getSeatsForTrain(item.id);
              const chosen = seats.find(s => s.status === 'selected');
              return (
                <div key={item.id} className="mb-4 border rounded p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>#{item.number} {item.title}</strong>
                      <span className="text-muted ms-2">
                        {item.route.from.city} → {item.route.to.city}
                      </span>
                    </div>
                    <div>
                      {item.hasWifi && <FaWifi className="text-primary me-2" />}
                      {item.hasAirConditioning && <FaSnowflake className="text-info me-2" />}
                      <Badge bg="success">{item.payment.basePrice} UAH</Badge>
                    </div>
                  </div>
                  <SeatGrid
                    train={item}
                    seats={seats}
                    onSelect={selectSeat}
                  />
                  {chosen
                    ? <p className="text-success small mb-0">✅ Вагон {chosen.carriage}, місце {chosen.number}</p>
                    : <p className="text-danger small mb-0">⚠️ Оберіть місце</p>
                  }
                </div>
              );
            })}
          </>
        ) : (
          <Tabs activeKey={paymentMethod} onSelect={setPaymentMethod} className="mb-3">
            <Tab eventKey="card" title={<><FaCreditCard className="me-1" />Картка</>}>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Номер картки</Form.Label>
                  <Form.Control
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={e => setCardData({ ...cardData, number: e.target.value })}
                    isInvalid={!!errors.number}
                  />
                  <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Form.Group className="mb-2 flex-fill">
                    <Form.Label>Термін дії</Form.Label>
                    <Form.Control
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                      isInvalid={!!errors.expiry}
                    />
                    <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2" style={{ width: 90 }}>
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                      isInvalid={!!errors.cvv}
                    />
                    <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Form.Group className="mb-2">
                  <Form.Label>Ім'я на картці</Form.Label>
                  <Form.Control
                    placeholder="IVAN KOVALENKO"
                    value={cardData.name}
                    onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Tab>

            <Tab eventKey="cash" title={<><FaPhone className="me-1" />При посадці</>}>
              <Form.Group className="mb-2">
                <Form.Label>Номер телефону для бронювання</Form.Label>
                <Form.Control
                  placeholder="+380 XX XXX XX XX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
              <p className="text-muted small">Квиток буде заброньовано. Оплата готівкою при посадці.</p>
            </Tab>
          </Tabs>
        )}
      </Modal.Body>

      <Modal.Footer>
        {step === 'seats' ? (
          <>
            <Button variant="secondary" onClick={onHide}>Скасувати</Button>
            <Button variant="primary" disabled={!allSeatsSelected} onClick={() => setStep('payment')}>
              Далі → Оплата
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-secondary" onClick={() => setStep('seats')}>← Назад</Button>
            <Button variant="success" onClick={handleConfirm}>
              {paymentMethod === 'card' ? '💳 Оплатити' : '📋 Забронювати'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}