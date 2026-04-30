import React from "react";
import { Row, Col } from "react-bootstrap";
import TrainCard from "./TrainCard";

export default function TrainList({ trains, addToCart, addToWishlist }) {
  return (
    <Row md={4} className="g-4">
      {trains.map((train) => (
        <Col key={train.id} md={6} sm={6} xs={12} lg={4} className="mb-4">
          <TrainCard
            train={train}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />
        </Col>
      ))}
    </Row>
  );
}
