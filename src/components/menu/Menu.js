import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default function Menu() {
    return (
       <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Toggle aria-controls="menu-auth-nav" />
              
              <Navbar.Collapse id="menu-auth-nav">
                <Nav className="ms-auto align-items-center">
                    
                    <NavLink to="/login">Login</NavLink>
                    <Separator>|</Separator>
                    <NavLink to="/register">Register</NavLink>
                    <Separator>|</Separator>
                    <NavLink to="/profile">My Profile</NavLink>
                    
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    );
}