import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterForm from '../../../components/Register';
import axios from 'axios';
import { useAuth } from '../../../provider/userContext';

jest.mock('axios');

jest.spyOn(window, 'alert').mockImplementation(() => { });


jest.mock('../../../provider/userContext', () => ({
    useAuth: () => ({ setToken: jest.fn() }),
}));

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('RegisterForm', () => {
    it('renders without crashing', () => {
        render(<Router><RegisterForm /></Router>);
        const registerComponent = screen.getByText('Register your account');
        expect(registerComponent).toBeInTheDocument();
    });

    it('updates state when input changes', () => {
        render(<Router><RegisterForm /></Router>);
        const emailInput = screen.getByPlaceholderText('E-mail address');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    it('displays an image with alt text', () => {
        render(<Router><RegisterForm /></Router>);

        const logoImage = screen.getByAltText('Logo');

        expect(logoImage).toBeInTheDocument();
    });

    it('has a Register button', () => {
        render(<Router><RegisterForm /></Router>);

        const registerButton = screen.getByRole('button', { name: 'Register' });

        expect(registerButton).toBeInTheDocument();
    });

    it('validates form fields', async () => {
        render(<Router><RegisterForm /></Router>);
        const emailInput = screen.getByPlaceholderText('E-mail address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.change(passwordInput, { target: { value: 'pass' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'pass123' } });

        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);


        const expectedErrorMessage =
            'Email is invalid\nPassword must be at least 6 characters long\nPasswords do not match';

        expect(window.alert).toHaveBeenCalledWith(expectedErrorMessage);

    });

    it('registers user on successful form submission', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true, token: 'mockedToken123' } });

        const setToken = jest.fn();
        // useAuth.mockReturnValue({ setToken });
        setToken("mockedToken123")

        render(<Router><RegisterForm /></Router>);
        const emailInput = screen.getByPlaceholderText('E-mail address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

        const registerButton = screen.getByText('Register');
        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/api/auth/register'), {
                email: 'test@example.com',
                password: 'password123',
            });
        });
        expect(setToken).toHaveBeenCalledWith('mockedToken123');

    });
});
