import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TrainCard from '../train/TrainCard';

export default function TrainList({ trains, addToCart, addToWishlist }) {
  // if (trains.length === 0) {
  //   return <h5 className="text-center text-muted mt-5">Поїздів не знайдено</h5>;
  // }
  return (
    <Row md={4} className="g-4">
      {trains.map(train => (
        <Col key={train.id} md={6} sm={6} xs={12} lg={4} className="mb-4">
          <TrainCard train={train} addToCart={addToCart} addToWishlist={addToWishlist} />
        </Col>
      ))}
    </Row>
  );
}