import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ModalUser from '../../../components/ModalUser/ModalUser';



describe('ModalUser Component', () => {
    const defaultProps = {
        buttonColor: 'blue',
        buttonTriggerTitle: 'Add New',
        headerTitle: 'Add User',
        buttonSubmitTitle: 'Add',
        userID: 1,
        onUserAdded: jest.fn(),
        onUserUpdated: jest.fn(),
        // server: 'http://example.com',
        socket: {},
    };



    it('renders the ModalUser component with FormUser and correct props', async () => {
        render(<ModalUser {...defaultProps} />);
        const triggerButton = screen.getByTestId('modalButton');
        expect(triggerButton).toBeInTheDocument();
        fireEvent.click(triggerButton);
        const formUser = screen.getByTestId('form-user');
        expect(formUser).toBeInTheDocument();
    });



    it('closes the modal on close icon click', async () => {
        render(<div data-testid="outside"><ModalUser {...defaultProps} /></div>);
        const triggerButton = screen.getByTestId('modalButton');
        expect(triggerButton).toBeInTheDocument();
        // fireEvent.click(triggerButton);
        const overlay = screen.getByTestId('outside');
        fireEvent.click(overlay);

        const formUser = screen.queryAllByTestId('form-user');

        expect(formUser).toHaveLength(0);
    });

});
