import React, { useRef, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import loginPicture from '../assets/loginPicture.jpg';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const FormContainer = ({ children }) => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={loginPicture} width="200" height="200" className="rounded-circle" alt="Войти" />
            </div>
            {children}
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const inputEl = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(4, t('login_page.validation_errors.username.min'))
        .required(t('login_page.validation_errors.username.required')),
      password: yup
        .string()
        .matches(/[^а-яА-ЯёЁ,;:&()*%#-]+/, t('login_page.validation_errors.password.matches'))
        .min(4, t('login_page.validation_errors.password.min'))
        .required(t('login_page.validation_errors.password.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const result = await axios.post(routes.loginPath(), values);
        auth.logIn(result.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputEl.current.select();
          return;
        }
        throw new Error(t('login_page.network_error'));
      }
    },
  });

  return (
    <FormContainer>
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
        <Form.Group>
          <Form.Label htmlFor="username">{t('login_page.username')}</Form.Label>
          <Form.Control
            id="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            required
            ref={inputEl}
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={authFailed}
          />
          {formik.errors.username && formik.touched.username && <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">{t('login_page.password')}</Form.Label>
          <Form.Control
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={authFailed}
          />
          {formik.errors.password && formik.touched.password && <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>}
        </Form.Group>
        {authFailed && <div>{t('login_page.auth_error')}</div>}
        <Button type="submit" variant="outline-primary">{t('login_page.submit')}</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
