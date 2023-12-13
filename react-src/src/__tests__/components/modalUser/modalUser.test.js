// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import ModalUser from '../../../components/ModalUser/ModalUser';



// describe('ModalUser Component', () => {
//   const defaultProps = {
//     buttonColor: 'blue',
//     buttonTriggerTitle: 'Open Modal',
//     headerTitle: 'Modal Header',
//     buttonSubmitTitle: 'Submit',
//     userID: 1,
//     onUserAdded: jest.fn(),
//     onUserUpdated: jest.fn(),
//     server: 'http://example.com',
//     socket: {},
//   };

//   it('renders without crashing', () => {
//     render(<ModalUser {...defaultProps} />);
//     expect(screen.getByText(defaultProps.headerTitle)).toBeInTheDocument();
//   });

//   it('renders the FormUser component with correct props', () => {
//     render(<ModalUser {...defaultProps} />);
//     const formUserProps = screen.getByTestId('form-user').props; // Assuming you set data-testid in FormUser

//     expect(formUserProps.buttonSubmitTitle).toBe(defaultProps.buttonSubmitTitle);
//     expect(formUserProps.buttonColor).toBe(defaultProps.buttonColor);
//     // Add more prop checks as needed
//   });

//   it('triggers onUserAdded when the form is submitted', () => {
//     render(<ModalUser {...defaultProps} />);
//     fireEvent.submit(screen.getByTestId('form-user')); // Assuming you set data-testid in FormUser
//     expect(defaultProps.onUserAdded).toHaveBeenCalled();
//   });

//   it('triggers onUserUpdated when the form is submitted with a userID', () => {
//     render(<ModalUser {...defaultProps} userID={2} />);
//     fireEvent.submit(screen.getByTestId('form-user')); // Assuming you set data-testid in FormUser
//     expect(defaultProps.onUserUpdated).toHaveBeenCalled();
//   });

//   it('triggers the modal on button click', () => {
//     render(<ModalUser {...defaultProps} />);
//     fireEvent.click(screen.getByText(defaultProps.buttonTriggerTitle));
//     expect(screen.getByText(defaultProps.headerTitle)).toBeInTheDocument();
//   });

//   it('closes the modal on close icon click', () => {
//     render(<ModalUser {...defaultProps} />);
//     fireEvent.click(screen.getByLabelText('close'));
//     expect(screen.queryByText(defaultProps.headerTitle)).toBeNull();
//   });

//   // Add more test cases to cover different scenarios and branches
// });
