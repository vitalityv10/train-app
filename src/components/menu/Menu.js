import React from 'react';
import { Alert, Container, Navbar } from 'react-bootstrap'; 

export default function Menu() {
    return (
       <Navbar>
            <Container>
                <Navbar.Brand href="#home">Welcome to our site</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Bruce Benner</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
