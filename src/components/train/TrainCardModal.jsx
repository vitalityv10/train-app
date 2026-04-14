import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaWifi, FaSnowflake } from 'react-icons/fa';

export default function TrainCardModal({ train, show, onHide, onAddToCart }) {
  const { route, seat } = train;
  const departureTime = new Date(route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  const arrivalTime = new Date(route.to.arrivalTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  const departureDate = new Date(route.from.departureTime).toLocaleDateString('uk-UA');

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Поїзд №{train.number} — {train.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{train.description}</p>
        <ul>
          <li><strong>Маршрут:</strong> {route.from.station} → {route.to.station}</li>
          <li><strong>Відправлення:</strong> {departureTime} ({departureDate})</li>
          <li><strong>Прибуття:</strong> {arrivalTime}</li>
          <li><strong>Тривалість:</strong> {route.duration}</li>
          <li><strong>Тип:</strong> {train.type}</li>
          <li><strong>Клас:</strong> {seat.class}</li>
          <li><strong>Вагон / місце:</strong> {seat.carriage} / {seat.number}</li>
          <li><strong>Wi-Fi:</strong> {train.hasWifi ? 'Так' : 'Ні'}</li>
          <li><strong>Кондиціонер:</strong> {train.hasAirConditioning ? 'Так' : 'Ні'}</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрити</Button>
        <Button variant="success" onClick={() => { onAddToCart(); onHide(); }}>
          🛒 Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}