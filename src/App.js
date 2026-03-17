import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; 

import { AuthProvider } from './components/auth/AuthContext';

import AppNavbar from './components/menu/AppNavbar';
import Menu from './components/menu/Menu';     

import Home from './components/Home'; 
import About from './components/menu/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/user/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';  

const Header = styled.header`
  border: 2px solid #281d8d;
  color: #281d8d;
  border-radius: 5px;
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
`;

export default function App() {
  const [isUK, setIsUK] = useState(true);

  return (
    <AuthProvider>
      <Container fluid as={Header} className="p-3 mb-4">
        <Row className="align-items-center justify-content-between">
          <Col xs="auto" lg={8} className="d-flex justify-content-start">
            <AppNavbar />
          </Col>          
          <Col xs="auto" lg={4} className="d-flex justify-content-end">
            <Menu />
          </Col>
          
        </Row>
      </Container>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About isUK={isUK} />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        <Route path='/profile' element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}