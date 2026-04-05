import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function UserCard({ name, age, city, onGreet }) {
  return (
    <Card className="mb-3 shadow-sm" style={{ borderLeft: '4px solid #3c14d9' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <strong>Age:</strong> {age} <br />
          <strong>City:</strong> {city}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}