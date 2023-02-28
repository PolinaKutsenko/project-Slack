import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/index.js';

const Layout = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand>{t('layout.slack_chat')}</Navbar.Brand>
          {auth.user && <Button onClick={auth.logOut}>{t('layout.exit_button')}</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Layout;
