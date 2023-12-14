
import React from 'react';
import { render, act, screen, waitFor, } from '@testing-library/react';
import AuthProvider, { useAuth } from '../../../provider/userContext';
import userEvent from '@testing-library/user-event';


const TestComponent = () => {
  const auth = useAuth();
  return <button onClick={() => auth.setToken('test-token')} data-testid="token">{auth.token}</button>;
};


describe('testing custom hook useAuth', () => {
  it('provides authentication context to useAuth', async () => {


    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('token')).toHaveTextContent('');

    userEvent.click(screen.getByTestId('token'));

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('test-token');
    })
  });
});