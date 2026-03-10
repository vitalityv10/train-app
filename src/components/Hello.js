import { Alert} from "react-bootstrap";
import styled from "styled-components";

const StyledH1 = styled.h1`
color: #3c14d9;
 text-align: center;
 letter-spacing: 2px;

`;

export default function Hello(){
    return (
        <Alert variant="success">
                      Welcome to our train app!
            </Alert> 
    );
}