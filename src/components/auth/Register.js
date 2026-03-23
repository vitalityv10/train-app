import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', age: '', city: '' });
  const { registerUser, registeredUsers } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.age && formData.city.trim()) {
      const userExists = registeredUsers.some(u => u.name === formData.name);
      if (userExists) {
        alert("User found! Please choose a different name.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        age: Number(formData.age),
        city: formData.city
      };

      registerUser(newUser);
      navigate('/profile'); 
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '400px' }} className="shadow-sm p-4">
        <h3 className="text-center mb-4">Реєстрація</h3>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" name="name" placeholder="Enter your name" 
              value={formData.name} onChange={handleChange} required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control 
              type="number" name="age" placeholder="Enter your age" 
              value={formData.age} onChange={handleChange} required min="1" 
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" name="city" placeholder="Enter your city" 
              value={formData.city} onChange={handleChange} required 
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100 mb-3">
              Register
          </Button>
          <div className="text-center">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
}