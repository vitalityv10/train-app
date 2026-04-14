import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaTrain, FaHeart, FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../auth/AuthContext'; // Перевір правильність шляху до твого AuthContext

export default function AppNavbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Допоміжна функція для визначення активного лінка
  const getLinkClass = (path) => {
    return `fw-bold d-flex align-items-center gap-2 ${
      location.pathname === path ? 'text-primary' : 'text-secondary'
    }`;
  };

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        {/* Логотип (зліва) */}
        <Navbar.Brand as={Link} to="/" className="text-primary fw-bold fs-4 d-flex align-items-center">
          <FaTrain className="me-2" /> TrainApp
        </Navbar.Brand>

        {/* Гамбургер-меню для мобільних */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 focus-ring" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Основні посилання (посередині) */}
          <Nav className="mx-auto gap-2 gap-lg-4 align-items-center mt-3 mt-lg-0">
            <Nav.Link as={Link} to="/" className={getLinkClass('/')}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={getLinkClass('/about')}>
              About Us
            </Nav.Link>
          </Nav>

          {/* Користувацьке меню (справа) */}
          <Nav className="gap-2 gap-lg-3 align-items-center mt-3 mt-lg-0 border-top border-lg-0 pt-3 pt-lg-0">
            {user ? (
              <>
                <Nav.Link as={Link} to="/wish-list" className={getLinkClass('/wish-list')} title="Wish List">
                  <FaHeart className="d-lg-none" /> <span className="d-lg-none">Wish List</span>
                  <FaHeart className="d-none d-lg-block fs-5" />
                </Nav.Link>
                
                <Nav.Link as={Link} to="/cart" className={getLinkClass('/cart')} title="Cart">
                  <FaShoppingCart className="d-lg-none" /> <span className="d-lg-none">Cart</span>
                  <FaShoppingCart className="d-none d-lg-block fs-5" />
                </Nav.Link>

                <Nav.Link as={Link} to="/profile" className={getLinkClass('/profile')} title="My Profile">
                  <FaUser className="d-lg-none" /> <span className="d-lg-none">My Profile</span>
                  <FaUser className="d-none d-lg-block fs-5" />
                </Nav.Link>

                {/* Вертикальна лінія-розділювач тільки для ПК */}
                <div className="d-none d-lg-block border-start border-2 h-50 mx-2"></div>

                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={logout}
                  className="d-flex align-items-center gap-2 fw-bold rounded-pill px-3"
                >
                  <FaSignOutAlt /> <span className="d-lg-none">Logout</span>
                </Button>
              </>
            ) : (
              <Button 
                as={Link} 
                to="/login" 
                variant="primary" 
                className="d-flex align-items-center gap-2 fw-bold rounded-pill px-4"
              >
                <FaSignInAlt /> Login
              </Button>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}