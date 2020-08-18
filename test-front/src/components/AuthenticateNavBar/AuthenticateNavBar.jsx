
import React from 'react';
import {
  Navbar, Nav
} from 'react-bootstrap';

const AuthenticateNavBar = (props) => {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav className="mr-right">
          <Nav.Link href="/news/new">Nuevo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AuthenticateNavBar;
