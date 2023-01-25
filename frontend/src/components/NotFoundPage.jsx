import React from 'react';
import { Link } from 'react-router-dom';
import notFoundPicture from '../assets/notFoundPicture.jpg';
import routes from '../routes.js';

const NotFoundPage = () => (
  <div className="text-center">
    <img src={notFoundPicture} alt="NotFoundPage" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <Link to={routes.chatPagePath()}>на главную страницу</Link>
    </p>
  </div>
);

export default NotFoundPage;
