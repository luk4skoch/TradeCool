
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


export default function NavElement(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Trade Cool</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    );
}