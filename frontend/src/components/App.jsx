import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import routes from '../routes.js';
import Layout from './Layout.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import ChatPage from './ChatPage.jsx';

///
const useAuth = () => false;
///

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.chatPagePath()} element={<Layout />}>
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route index element={<ChatPage />} />
        </Route>
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
