import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import routes from '../routes.js';
import Layout from './Layout.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './chatPage/ChatPage.jsx';
import useAuth from '../hooks/index.js';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chatPagePath()} element={<Layout />}>
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
