import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import UserCard from './UserCard'; 

export default function UserProfile() {
  const { user, logout } = useAuth();

  const handleGreeting = (name) => {
    alert("Hello, " + name);
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Profile</h2>
        {/* <Button variant="outline-danger" onClick={logout}>Logout</Button> */}
      </div>
      <Row className="mb-5">
        <Col md={4}>
          <UserCard 
            name={user.name} 
            age={user.age} 
            city={user.city} 
            onGreet={handleGreeting} 
          />
        </Col>
      </Row>
    </Container>
  );
}