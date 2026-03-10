import styled from "styled-components";
import React from "react";

const StyledH1 = styled.h1`
 text-align: center;
 letter-spacing: 2px;
 color: ${props => (props.isUK ? "#3c14d9" : "#BF4F74")};

`;

const StyledH3 = styled.h3`
 color: ${props => (props.isUK ? "#3c14d9" : "#BF4F74")};
  font-style: italic;
`;
const Container = styled.div`
    color: #3c14d9;
    padding-top: 10px;
`;

export default function About({isUK, handleChange}) {

  return (
    <Container>
      <StyledH1 isUK={isUK}>
        {isUK ? "Про нас" : "About us"}
      </StyledH1>
      
      <StyledH3 isUK={isUK}>
        {isUK ? "Залізничний транспорт" : "Train-app smth"}
      </StyledH3>
    </Container>
  );
}
