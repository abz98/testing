import React from 'react';
import { screen } from '@testing-library/react';
import ModalUser from '../../../components/ModalUser/ModalUser';
import { render } from '../../../testUtils/customRouterRender';

describe('Testing Custom render for Authenticate Component', () => {
    const defaultProps = {
        buttonColor: 'blue',
        buttonTriggerTitle: 'Add New',
        headerTitle: 'Add User',
        buttonSubmitTitle: 'Add',
        userID: 1,
        onUserAdded: jest.fn(),
        onUserUpdated: jest.fn(),
        socket: {},
    };


    it('does not render the ModalUser component when not authenticated', async () => {
        render(<ModalUser {...defaultProps} />, {}, false);

        const triggerButton = screen.queryByTestId('modalButton');
        expect(triggerButton).toBeNull();

    });

    it('render the ModalUser component when  authenticated', async () => {
        render(<ModalUser {...defaultProps} />, {}, true);

        const triggerButton = screen.queryByTestId('modalButton');
        expect(triggerButton).toBeInTheDocument();

    });

});




















