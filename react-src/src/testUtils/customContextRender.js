// custom-render.js
import { render as rtlRender } from '@testing-library/react';
import AuthProvider from '../provider/userContext';
const customRender = (ui, options = {}, authenticated = true) => {
  const Wrapper = ({ children }) => {
    return (
      <AuthProvider>
        {children}
        {authenticated ? (
          // Simulate authentication
          <button onClick={() => setToken('mocked-token')}>Authenticate</button>
        ) : (
          <button onClick={() => setToken(null)}>Log Out</button>
        )}
      </AuthProvider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
