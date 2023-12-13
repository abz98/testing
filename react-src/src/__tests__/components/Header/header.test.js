import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../../components/Header'

describe('Header Component', () => {

  test('get By title ', () => {
    render(<Header />);
    const logoutButton = screen.getByTitle('mern-crud');
    expect(logoutButton).toBeInTheDocument();
  });


 
});
