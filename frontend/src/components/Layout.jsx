import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand>Slack chat</Navbar.Brand>
      </Container>
    </Navbar>
    <Outlet />
  </div>
);

export default Layout;
