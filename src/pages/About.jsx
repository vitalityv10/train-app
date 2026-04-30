import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FEATURES } from "../data/data";

export default function About() {
  return (
    <>
      <div className="bg-dark text-white py-5 text-center shadow-sm">
        <Container>
          <h1 className="display-4 fw-bold" style={{ color: "#7b8cde" }}>
            🚂 Про нас
          </h1>
          <p
            className="lead mx-auto"
            style={{ maxWidth: "600px", color: "#ccc" }}
          >
            TrainApp — сучасний сервіс для бронювання залізничних квитків.
          </p>
        </Container>
      </div>

      <Container className="my-5">
        <Row className="g-4 text-center">
          {FEATURES.map((feature, index) => (
            <Col key={index} md={3} sm={6}>
              <Card className="h-100 border-0 shadow-sm p-3">
                <Card.Body>
                  {feature.icon}
                  <Card.Title className="fw-bold">{feature.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {feature.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
