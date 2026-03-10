import React from 'react';
import {Routes, Route } from 'react-router-dom';
import About from './About';
import Hello from './components/Hello';
import Goodbye from './components/Goodbye';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import Menu from './components/menu/Menu';     
import { Alert } from 'react-bootstrap';
import './App.css'; 
import CardComponent from './components/CardComponent';

const StyledButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #3c14d9;
  background: white;
  color: #3c14d9;
  border-radius: 4px;
  &:hover {
    background: #f0f0f0;
  }
`;

const Header = styled.header`
  border: 2px solid #281d8d;
  color: #281d8d;
  border-radius: 5px;
  display: flex;
  flex-direction: row; 
  justify-content: space-between`;


export default function App() {
 const [isUK, setIsUK] = React.useState(true);
          const handleChange = () => {
          setIsUK(!isUK);
       };

  return (
    <>
    <Header >
      <Navbar />
      <StyledButton onClick={handleChange}>
        {isUK ? "Змінити на English" : "Switch to Ukrainian"}
      </StyledButton>
    </Header>
    
          <section className="app">
      <header className="app-header">
          <Menu/>
      </header>
    </section>


      <Routes>
        <Route path='/' element={
          <>
          <Hello /> 
            <CardComponent />
          </>
        } />
        <Route path='/about' element={<About isUK={isUK} />} />
      </Routes>
    </>
  );
}