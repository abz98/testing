// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import FormUser from '../../../components/FormUser/FormUser';
// jest.mock('axios');

// describe('FormUser Component', () => {
//   const defaultProps = {
//     server: 'http://example.com',
//     userID: 1,
//     onUserAdded: jest.fn(),
//     onUserUpdated: jest.fn(),
//     buttonColor: 'blue',
//     buttonSubmitTitle: 'Submit',
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('handles user submission successfully', async () => {
//     // Mock the Axios get and post methods to return successful responses
//     axios.get.mockResolvedValue({ data: { name: 'John', email: 'john@example.com', age: 25, gender: 'm' } });
//     axios.post.mockResolvedValue({ data: { success: true, result: {} } });

//     render(<FormUser {...defaultProps} />);

//     // Your assertions for rendering and user interactions
//     // ...

//     // Trigger form submission
//     fireEvent.submit(screen.getByTestId('form-user'));

//     // Assert that Axios.get and Axios.post were called with the correct parameters
//     expect(axios.get).toHaveBeenCalledWith(`${defaultProps.server}/api/users/${defaultProps.userID}`);
//     expect(axios.post).toHaveBeenCalledWith(
//       `${defaultProps.server}/api/users/${defaultProps.userID ? defaultProps.userID : ''}`,
//       expect.objectContaining({ name: '', email: '', age: '', gender: '' })
//     );

//     // Assert success message is displayed
//     await waitFor(() => expect(screen.getByText('Nice one!')).toBeInTheDocument());
//   });

//   it('handles user submission failure', async () => {
//     // Mock the Axios get and post methods to return a failure response
//     axios.get.mockResolvedValue({ data: { name: 'John', email: 'john@example.com', age: 25, gender: 'm' } });
//     axios.post.mockRejectedValue({ response: { data: { msg: 'Some error' } } });

//     render(<FormUser {...defaultProps} />);

//     // Your assertions for rendering and user interactions
//     // ...

//     // Trigger form submission
//     fireEvent.submit(screen.getByTestId('form-user'));

//     // Assert that Axios.get and Axios.post were called with the correct parameters
//     expect(axios.get).toHaveBeenCalledWith(`${defaultProps.server}/api/users/${defaultProps.userID}`);
//     expect(axios.post).toHaveBeenCalledWith(
//       `${defaultProps.server}/api/users/${defaultProps.userID ? defaultProps.userID : ''}`,
//       expect.objectContaining({ name: '', email: '', age: '', gender: '' })
//     );

//     // Assert warning message is displayed
//     await waitFor(() => expect(screen.getByText('Woah!')).toBeInTheDocument());
//   });

//   // Add more test cases as needed
// });
