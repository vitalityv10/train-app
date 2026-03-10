import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrain } from 'react-icons/fa';
import { Alert } from 'react-bootstrap';

const StyledHeader = styled.header`
  color: #281d8d;
  padding: 1em;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #281d8d;
  font-weight: bold;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  color: #281d8d;
  font-weight: bold;
`;

export default function Navbar() {
  return (
    <StyledHeader>
      <NavLink to="/">
        <FaTrain /> Home
      </NavLink>
      <Separator>|</Separator>
      <NavLink to="/about">About us</NavLink>
    </StyledHeader>
  );
}