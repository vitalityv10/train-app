import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import Hello from './Hello'; 
import TrainCard from './train/TrainCard'; 

const CustomContainer = styled(Container)`
  background-color: #f8f9fa;
  padding: 20px;
`;

export default function Home() {
  const trainsData = [
    { id: 1, title: 'Train Ticket', price: 100, route: 'Kyiv to Warsaw', number: '43', hasWifi: true, description: 'Найшвидший рейс до Польщі.' },
    { id: 2, title: 'Train Ticket', price: 150, route: 'Lviv to Prague', number: '12', hasWifi: false, description: 'Комфортний нічний переїзд.' },
    { id: 3, title: 'Train Ticket', price: 80, route: 'Odesa to Kyiv', number: '105',  hasWifi: true, description: 'Фірмовий поїзд "Чорноморець".' },
    { id: 4, title: 'Train Ticket', price: 120, route: 'Ivano-Frankivsk to Berlin', number: '7', hasWifi: true, description: 'Міжнародний експрес.' },
  ];

  return (
    <>
      <Hello /> 
      <CustomContainer className="my-5">
        <h2 className="mb-3 text-center">Available Trains</h2>
        <Row md={4} className="g-4"> 
          {trainsData.map(train => (
            <Col key={train.id} md={6} sm={6} xs={12} lg={4} className="mb-4">
              <TrainCard train={train} />
            </Col>
          ))}
        </Row>
      </CustomContainer>
    </>
  );
}