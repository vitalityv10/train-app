import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrain } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavLink = styled(Link)`
  text-decoration: none;
  color: #281d8d !important; 
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: #281d8d;
  font-weight: bold;
  @media (max-width: 991px) {
    display: none;
  }
`;

export default function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#281d8d', fontWeight: 'bold' }}>
          <FaTrain style={{ marginRight: '8px' }} /> TrainApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink to="/">Home</NavLink>
              <Separator>|</Separator>
            <NavLink to="/about">About Us</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}