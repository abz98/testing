import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../../../components/Login';
import axios from 'axios';
import AuthProvider, { useAuth } from '../../../provider/userContext';


jest.mock('axios');

jest.spyOn(window, 'alert').mockImplementation(() => { });

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('../../../provider/userContext', () => ({
    useAuth: () => ({ setToken: jest.fn() }),
}));

// jest.mock('../../../provider/userContext', () => ({
//     ...jest.requireActual('../../../provider/userContext'), // Use the actual module
//     useAuth: jest.fn(), // Mock the useAuth hook
// }));

describe('LoginForm', () => {
    it('renders without crashing', () => {
        render(<Router><LoginForm /></Router>);
    });

    it('updates state when email input changes', () => {
     render(<Router><LoginForm /></Router>);
        const input = screen.getByPlaceholderText('E-mail address');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });

    it('updates state when password input changes', () => {
      render(<Router><LoginForm /></Router>);
        const input = screen.getByPlaceholderText('Password');
        fireEvent.change(input, { target: { value: 'password' } });
        expect(input.value).toBe('password');
    });
    //more
    it('calls setToken and navigates to dashboard on successful login', async () => {
        const mockedToken = 'mockedToken123';
        const mockedData = { success: true, token: mockedToken };
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockedData });

        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        const setToken = jest.fn();
        // useAuth.mockReturnValue({ setToken }); 
        setToken(mockedToken)

        render(<Router><LoginForm /></Router>);
        const emailInput = screen.getByPlaceholderText('E-mail address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/api/auth/login'), {
                email: 'test@example.com',
                password: 'password',
            });
        });
        expect(setToken).toHaveBeenCalledWith(mockedToken);

        expect(navigate).toHaveBeenCalledWith('/dashboard');

    });

    it('displays error message on login failure', async () => {
        const mockedData = { success: false };
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockedData });

        render(<Router><LoginForm /></Router>);
        const loginButton = screen.getByText('Login');

        fireEvent.change(screen.getByPlaceholderText('E-mail address'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith("Login failed. Please try again.");
        });
    });

    it('displays error message on login API failure', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));

        render(<Router><LoginForm /></Router>);
        const loginButton = screen.getByText('Login');

        fireEvent.change(screen.getByPlaceholderText('E-mail address'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(alert).toHaveBeenCalledWith("Something went wrong while logging in.");
        });
    });
    // "__tests__/components/FormUser","__tests__/components/modalUser"


});
