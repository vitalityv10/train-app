import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { FaHeart, FaWifi, FaSnowflake } from 'react-icons/fa';
import { useAuth } from '../auth/AuthContext';

const HoverContainer = styled.div`
  position: relative;
  opacity: 0;
  margin-top: 10px;
  transition: opacity 0.3s ease;
`;

const StyledCard = styled(Card)`
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.12) !important;
  }

  &:hover ${HoverContainer} {
    opacity: 1;
    margin-bottom: 10px;
  }
`;

export default function TrainCard({ train, addToCart }) {
  const { addToWishlist, removeFromWishlist } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const { route, seat, payment } = train;
  const routeLabel = `${route.from.city} → ${route.to.city}`;

  const departureTime = new Date(route.from.departureTime).toLocaleTimeString('uk-UA', {
    hour: '2-digit', minute: '2-digit'
  });
  const arrivalTime = new Date(route.to.arrivalTime).toLocaleTimeString('uk-UA', {
    hour: '2-digit', minute: '2-digit'
  });
  const departureDate = new Date(route.from.departureTime).toLocaleDateString('uk-UA');

  return (
    <>
      <StyledCard
        className="h-100 shadow-sm"
        onClick={() => {
          setIsSelected(!isSelected);
          if (!isSelected) addToWishlist(train);
          else removeFromWishlist(train.id);
        }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {isSelected && (
          <Badge bg="danger" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, fontSize: '1rem' }}>
            <FaHeart />
          </Badge>
        )}

        <Card.Img
          variant="top"
          src={train.imageUrl}
          alt={routeLabel}
          style={{ height: '160px', objectFit: 'cover' }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6">{train.title}</Card.Title>

          <Card.Text className="mb-1">
            <strong>{route.from.city}</strong> → <strong>{route.to.city}</strong>
          </Card.Text>

          <Card.Text className="text-muted small mb-1">
            🕐 {departureTime} – {arrivalTime} &nbsp;|&nbsp; ⏱ {route.duration}
          </Card.Text>

          <Card.Text className="small mb-1">
            📅 {departureDate} &nbsp;|&nbsp; 🚃 Вагон {seat.carriage}, місце {seat.number}
          </Card.Text>

          <Card.Text className="small mb-2">
            🎫 {seat.class}
            {train.hasWifi && <span className="ms-2 text-primary"><FaWifi /> Wi-Fi</span>}
            {train.hasAirConditioning && <span className="ms-2 text-info"><FaSnowflake /> AC</span>}
          </Card.Text>

          <Card.Text className="mt-auto fw-bold">
            {payment.basePrice} UAH
          </Card.Text>

          <Button
            variant="primary"
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            className="w-100"
          >
            Details
          </Button>

          <HoverContainer>
            <Button
              variant="success"
              className="w-100 shadow"
              onClick={(e) => { e.stopPropagation(); addToCart(train); }}
            >
              🛒 Add to Cart
            </Button>
          </HoverContainer>
        </Card.Body>
      </StyledCard>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Закрити</Button>
          <Button
            variant="success"
            onClick={(e) => { e.stopPropagation(); addToCart(train); setShowModal(false); }}
          >
            🛒 Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}