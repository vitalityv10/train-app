import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap'; 
import TrainImage from './train-photo/train1.webp';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
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
    max-height: 100px; 
    opacity: 1;
    margin-bottom: 10px;
  }
`;

export default function TrainCard({ train, addToCart }) {
  const { addToWishlist, removeFromWishlist } = useAuth();
  const [showModal, setShowModal] = useState(false);
  
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => setShowModal(false);
  
  const handleShow = (e) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  return (
    <>
      <StyledCard
        className={`h-100 shadow-sm ${isSelected ? '' : ''}`}
        onClick={() => {
             setIsSelected(!isSelected);
             if (!isSelected) {
              addToWishlist(train); 
             } else {
              removeFromWishlist(train.id); 
             }
           }}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {isSelected && (
          <Badge bg="danger" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, fontSize: '1rem' }}>
            <FaHeart />
          </Badge>
        )}

        <Card.Img variant="top" src={TrainImage} alt={train.route.join(' → ')} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{train.title}</Card.Title>
          <Card.Text><strong>Route:</strong> {train.route.join(' → ')}</Card.Text>
          <Card.Text className="mt-auto">Price: {train.price} UAH</Card.Text>
          
          <Button variant="primary" onClick={handleShow} className="w-100">
            Details
          </Button>
          <HoverContainer>
            <Button
              variant="success"
              className="w-100 shadow"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(train);
              }}
            >
              🛒 Add to Cart
            </Button>
          </HoverContainer>
        </Card.Body>
      </StyledCard>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Information about train No. {train.number}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{train.description}</p>
          <ul>
            <li>Classes: Lux, Coupe, Platzkart</li>
            <li>Wi-Fi: {train.hasWifi ? "Yes" : "No"}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}