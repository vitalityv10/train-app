import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap'; 
import TrainImage from './train-photo/train1.webp';

export default function TrainCard({ train }) {
  const [showModal, setShowModal] = useState(false);
  
  const [isSelected, setIsSelected] = useState(false);

  const handleClose = () => setShowModal(false);
  
  const handleShow = (e) => {
    e.stopPropagation(); 
    setShowModal(true);
  };

  return (
    <>
      <Card 
        className={`h-100 shadow-sm ${isSelected ? 'border-success border-3' : ''}`}
        onClick={() => setIsSelected(!isSelected)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {isSelected && (
          <Badge bg="success" style={{ position: 'absolute', top: 10, right: 10, zIndex: 1, fontSize: '1rem' }}>
            Selected
          </Badge>
        )}

        <Card.Img variant="top" src={TrainImage} alt={train.route} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{train.title}</Card.Title>
          <Card.Text><strong>Route:</strong> {train.route}</Card.Text>
          <Card.Text className="mt-auto">Price: {train.price} UAH</Card.Text>
          <Button variant="primary" onClick={handleShow} className="w-100">
            Details
          </Button>
        </Card.Body>
      </Card>

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