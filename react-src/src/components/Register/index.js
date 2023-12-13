import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useAuth } from '../../provider/userContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const url = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  function validateForm() {
    const errors = [];

    if (!email) {
      errors.push({ email: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push({ email: 'Email is invalid' });
    }

    if (!password) {
      errors.push({ password: 'Password is required' });
    } else if (password.length < 6) {
      errors.push({ password: 'Password must be at least 6 characters long' });
    }

    if (!confirmPassword) {
      errors.push({ confirmPassword: 'Confirm Password is required' });
    } else if (confirmPassword !== password) {
      errors.push({ confirmPassword: 'Passwords do not match' });
    }
    return errors;
  }



  function registerController() {
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // setErrors(formErrors);
      const errorMessages = formErrors.map(error => {
        const key = Object.keys(error)[0];
        return error[key];
      });
      
      alert(errorMessages.join('\n'));
      return;
    }
    axios
      .post(`${url}/api/auth/register`, { email, password })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setToken(response.token);
          navigate('/dashboard');
        } else {
          alert('Something went wrong');
        }
      })
      .catch((error) => alert(error?.response?.data.message));
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image alt="Logo" src="/logo.png" /> Register your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              value={email}
              aria-label="email-label"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />

            <Button color="teal" fluid size="large" onClick={registerController}>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already Registered? <Button onClick={() => navigate('/login')}>Login</Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterForm;
