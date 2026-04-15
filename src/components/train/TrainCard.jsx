import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { FaHeart, FaWifi, FaSnowflake } from 'react-icons/fa';
import { useTrainCard } from '../../hooks/useTrainCard';
import TrainCardModal from './TrainCardModal';
const HoverContainer = styled.div`
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

export default function TrainCard({ train }) {
  const {
    isWishlisted, toggleWishlist,
    showModal, setShowModal,
    handleAddToCart,
    departureTime, arrivalTime, departureDate,
  } = useTrainCard(train);

  const { route, seat, payment } = train;

  return (
    <>
      <StyledCard className="h-100 shadow-sm" style={{ position: 'relative' }}>
        <Badge
          bg={isWishlisted ? 'danger' : 'secondary'}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, fontSize: '1rem', cursor: 'pointer' }}
          onClick={toggleWishlist}
        >
          <FaHeart />
        </Badge>

        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}${train.imageUrl}`}
          alt={`${route.from.city} → ${route.to.city}`}
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

          <Card.Text className="mt-auto fw-bold">{payment.basePrice} UAH</Card.Text>

          <Button variant="primary" className="w-100" onClick={() => setShowModal(true)}>
            Details
          </Button>

          <HoverContainer>
            <Button variant="success" className="w-100 shadow" onClick={handleAddToCart}>
              🛒 Add to Cart
            </Button>
          </HoverContainer>
        </Card.Body>
      </StyledCard>

      <TrainCardModal
        train={train}
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}