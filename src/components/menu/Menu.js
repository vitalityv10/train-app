import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/auth/AuthContext';

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

const StyledButton = styled(Button)`
  background-color: transparent; 
  border: none;               
  text-decoration: none; 
  color: #281d8d !important;
  display: flex;
  align-items: center;
  gap: 8px;

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
    const { user, logout } = useAuth();

    return (
       <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
              <Navbar.Toggle aria-controls="menu-auth-nav" />
              
              <Navbar.Collapse id="menu-auth-nav">
                <Nav className="ms-auto align-items-center">

                    {user && (
                        <>
                        <NavLink to="/wish-list">Wish List</NavLink>
                          <Separator>|</Separator>
                        <NavLink to="/cart">Cart</NavLink>
                        <Separator>|</Separator>
                        <NavLink to="/profile">My Profile</NavLink>    
                        <Separator>|</Separator>
                        <StyledButton  onClick={logout}>Logout</StyledButton>
                        </>
                    )}

                    {!user && (
                        <NavLink to="/login">Login</NavLink>
                    )}  
                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
    );
}