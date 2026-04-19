import React from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { FaCreditCard, FaPhone } from "react-icons/fa";

export default function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  cardData,
  setCardData,
  phone,
  setPhone,
  errors,
}) {
  return (
    <Tabs
      activeKey={paymentMethod}
      onSelect={setPaymentMethod}
      className="mb-3"
    >
      <Tab
        eventKey="card"
        title={
          <>
            <FaCreditCard className="me-1" /> Картка
          </>
        }
      >
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Номер картки</Form.Label>
            <Form.Control
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) =>
                setCardData({ ...cardData, number: e.target.value })
              }
              isInvalid={!!errors.number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.number}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex gap-2">
            <Form.Group className="mb-2 flex-fill">
              <Form.Label>Термін дії</Form.Label>
              <Form.Control
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) =>
                  setCardData({ ...cardData, expiry: e.target.value })
                }
                isInvalid={!!errors.expiry}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiry}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" style={{ width: 90 }}>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({ ...cardData, cvv: e.target.value })
                }
                isInvalid={!!errors.cvv}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvv}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Group className="mb-2">
            <Form.Label>Ім'я на картці</Form.Label>
            <Form.Control
              placeholder="IVAN KOVALENKO"
              value={cardData.name}
              onChange={(e) =>
                setCardData({ ...cardData, name: e.target.value.toUpperCase() })
              }
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Tab>

      <Tab
        eventKey="cash"
        title={
          <>
            <FaPhone className="me-1" /> При посадці
          </>
        }
      >
        <Form.Group className="mb-2">
          <Form.Label>Номер телефону для бронювання</Form.Label>
          <Form.Control
            placeholder="+380 XX XXX XX XX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <p className="text-muted small">
          Квиток буде заброньовано. Оплата готівкою при посадці.
        </p>
      </Tab>
    </Tabs>
  );
}
