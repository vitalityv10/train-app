import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../components/auth/AuthContext';
import UserCard from '../components/user/UserCard';
import PurchasedTickets from '../components/user/PurchasedTickets';

export default function UserProfile() {
  const { purchasedTickets } = useAuth();

  return (
    <div style={{ backgroundColor: '#f4f8fb', paddingBottom: '50px' }}>
      
      <Container className="pt-5 mt-3">
        <Row className="g-4">
          <Col md={4} lg={4}>
            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <UserCard />
            </div>
          </Col>

          <Col md={8} lg={8}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
                <h4 className="text-primary mb-3 fw-bold">
                  🎫 Куплені квитки
                </h4>
              </Card.Header>
              <Card.Body className="bg-white px-4 pb-4">
                <PurchasedTickets tickets={purchasedTickets} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}