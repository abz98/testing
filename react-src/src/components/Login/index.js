import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { reAuth, useAuth } from '../../provider/userContext';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const base = process.env.REACT_APP_API_URL
    try {
      const response = await axios.post(`${base}/api/auth/login`, { email, password })
      const { data } = response;
      if (data.success) {
        setToken(data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong while logging in.");
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color='teal'
              fluid
              size='large'
              onClick={handleLogin}
              type='button' // Ensures this doesn't trigger form submission
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Button onClick={() => navigate('/register')}>Sign Up</Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
