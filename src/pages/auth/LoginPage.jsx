import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Помилка входу:', error);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Вхід до TrainApp</h2>
      <p className="text-muted mb-4">Увійдіть через Google щоб бронювати квитки</p>
      <Button variant="outline-danger" size="lg" onClick={handleLogin}>
        <FaGoogle className="me-2" />
        Увійти через Google
      </Button>
    </Container>
  );
}