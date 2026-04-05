import styled from "styled-components";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTrain, FaShieldAlt, FaHeadset, FaGlobe } from "react-icons/fa";

const HeroSection = styled.div`
  background: linear-gradient(135deg, #1a1a2e, #0f3460);
  color: white;
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.h1`
  letter-spacing: 2px;
  color: #7b8cde;
`;

const FeatureBox = styled.div`
  text-align: center;
  padding: 30px 20px;

  svg {
    font-size: 2rem;
    color: #3c14d9;
    margin-bottom: 12px;
  }

  h5 {
    font-weight: 700;
  }

  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

export default function About() {
  return (
    <>
      <HeroSection>
        <Container>
          <Title>🚂 Про нас</Title>
          <p style={{ color: "#aaa", maxWidth: 500, margin: "0 auto" }}>
            TrainApp — зручний сервіс для пошуку та бронювання залізничних квитків по Україні та Європі.
          </p>
        </Container>
      </HeroSection>

      <Container className="my-5">
        <Row className="g-4">
          <Col md={3} sm={6}>
            <FeatureBox>
              <FaTrain />
              <h5>Швидко</h5>
              <p>Купуйте квитки онлайн за кілька хвилин.</p>
            </FeatureBox>
          </Col>
          <Col md={3} sm={6}>
            <FeatureBox>
              <FaShieldAlt />
              <h5>Безпечно</h5>
              <p>Платіжні дані захищені шифруванням.</p>
            </FeatureBox>
          </Col>
          <Col md={3} sm={6}>
            <FeatureBox>
              <FaHeadset />
              <h5>Підтримка</h5>
              <p>Допомагаємо з будь-яким питанням 24/7.</p>
            </FeatureBox>
          </Col>
          <Col md={3} sm={6}>
            <FeatureBox>
              <FaGlobe />
              <h5>Міжнародно</h5>
              <p>Рейси до Польщі, Австрії, Угорщини та інших країн.</p>
            </FeatureBox>
          </Col>
        </Row>
      </Container>
    </>
  );
}