import React from 'react';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import { useAuth } from '../components/auth/AuthContext';
import UserCard from '../components/user/UserCard';
import { FaWifi, FaSnowflake } from 'react-icons/fa';

export default function UserProfile() {
  const { user, purchasedTickets } = useAuth();

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Profile</h2>
      </div>
      <Row className="mb-5">
        <Col md={4}>
          <UserCard name={user.name} age={user.age} city={user.city} />
        </Col>
      </Row>

      <h4 className="mb-3">🎫 Куплені квитки</h4>
      {purchasedTickets.length === 0 ? (
        <p className="text-muted">Квитків поки немає.</p>
      ) : (
        <Row xs={1} md={2} className="g-3">
          {purchasedTickets.map(ticket => (
            <Col key={ticket.ticketId}>
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>#{ticket.number} — {ticket.title}</strong>
                      <div className="text-muted small">
                        {ticket.route.from.city} → {ticket.route.to.city}
                      </div>
                      <div className="small">
                        📅 {new Date(ticket.route.from.departureTime).toLocaleDateString('uk-UA')}
                        {' '}
                        🕐 {new Date(ticket.route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="small">
                        🎫 {ticket.seat.class} | Вагон {ticket.seat.carriage}, місце {ticket.seat.number}
                        {ticket.hasWifi && <FaWifi className="ms-2 text-primary" />}
                        {ticket.hasAirConditioning && <FaSnowflake className="ms-2 text-info" />}
                      </div>
                    </div>
                    <div className="text-end">
                      <Badge bg={ticket.payment.status === 'Paid' ? 'success' : 'warning'}>
                        {ticket.payment.status === 'Paid' ? '✅ Оплачено' : '⏳ При посадці'}
                      </Badge>
                      <div className="mt-2 fw-bold">{ticket.payment.basePrice} UAH</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}