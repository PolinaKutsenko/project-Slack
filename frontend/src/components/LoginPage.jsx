import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import loginPicture from '../assets/loginPicture.jpg';

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
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(6).required('Please enter your username'),
      password: yup.string().min(6).required('Please enter your password'),
    }),
    onSubmit: (values) => {
      console.log('onsubmit', values);
    },
  });

  return (
    <FormContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            required
            ref={inputEl}
            value={formik.values.username}
            onChange={formik.handleChange}
          /* isInvalid={authFailed} */
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          /* isInvalid={authFailed} */
          />
          <Form.Control.Feedback type="invalid">The username or password is incorrect</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
