import React from 'react';
import { Container } from 'react-bootstrap';
import { FaTrain, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small">
        
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <FaTrain className="text-primary me-2 fs-5" />
          <span className="fw-bold text-dark me-1">TrainApp</span> 
          &copy; {currentYear}. Всі права захищено.
        </div>
        <div>
          Зроблено з <FaHeart className="text-danger mx-1" /> для зручних подорожей
        </div>

      </Container>
    </footer>
  );
}