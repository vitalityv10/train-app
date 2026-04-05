import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';

export default function Login() {
  const [name, setName] = useState('');
  const { login, registeredUsers } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      const existingUser = registeredUsers.find(u => u.name === name);

      if (existingUser) {
        login(existingUser); 
        navigate('/profile'); 
      } else {
        alert("User not found! Please register first.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center ">
      <Card style={{ width: '400px' }} className="shadow-sm p-4">
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control 
                placeholder="Enter your name (e.g., Admin)" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
          <div className="text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
}