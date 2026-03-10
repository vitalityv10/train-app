import React, { useState } from 'react'; // 1. Додано імпорт хука useState
import { Card, Button, Modal } from 'react-bootstrap'; // 2. Додано імпорт Modal
import TrainImage from '../train-photo/train1.webp';

export default function CardComponent() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <> 
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Train Ticket</Card.Title>
          <Card.Img variant="top" src={TrainImage} />
          <Card.Text>
            Price: 100 UAH
          </Card.Text>
          <Card.Text>Route: Kyiv to Warsaw</Card.Text>
          <Button variant="primary" onClick={handleShow}>Buy / Details</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>Information about train No. 43</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The train consists of cars of the following classes: <strong>Lux</strong>, <strong>Coupe</strong> and <strong>Platzkart</strong>.</p>
          <p>The dining car is located between the 5th and 6th cars. Free Wi-Fi is available throughout the journey.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}