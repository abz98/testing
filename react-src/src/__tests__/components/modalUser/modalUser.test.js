// ModalUser.test.js
import React, { useEffect } from 'react';
import { fireEvent, screen } from '@testing-library/react';
import ModalUser from '../../../components/ModalUser/ModalUser';
import { render } from '../../../testUtils/customRouterRender';
import userEvent from '@testing-library/user-event';

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
        fireEvent.click(triggerButton);
        //close icon
        const overlay = screen.getByTestId('app-body');


        const closeB = overlay.querySelector('i.close.icon');

        fireEvent.click(closeB);

        const formUser = screen.queryAllByTestId('form-user');

        expect(formUser).toHaveLength(0);
    });

    it('checks whether the given option is selected or not', async () => {
        render(<ModalUser {...defaultProps} />);
        const triggerButton = screen.getByTestId('modalButton');
        fireEvent.click(triggerButton);
        //close icon
        const selectBx = screen.getByRole('combobox')
        userEvent.selectOptions(
            selectBx,
            screen.getByRole('option', {
                name: "pineapple"
            })
        )
        expect(screen.getByText("pineapple").value).toBe("pineapple")
    });

    // it('checks whether the given option is selected or not using keyboard inreration', async () => {
    //     render(<div data-testid="outside"><ModalUser {...defaultProps} /></div>);
    //     const triggerButton = screen.getByTestId('modalButton');
    //     expect(triggerButton).toBeInTheDocument();
    //     fireEvent.click(triggerButton);
    //     //close icon
    //     const selectBx = screen.getByRole('combobox')
    //     expect(selectBx).toBeInTheDocument()
    //     userEvent.click(selectBx)
    //     // fireEvent.click(selectBx);
    //     fireEvent.keyDown(selectBx, { key: 'ArrowDown' });
    //     fireEvent.keyDown(selectBx, { key: 'ArrowDown' }); 
    //     fireEvent.keyPress(selectBx, { key: 'Enter', code: 'Enter', keyCode: 13 })
    //     const skect = screen.getByRole('combobox')
    //     // console.log("asdasd",skect.value)
    // });
});






















// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import ModalUser from '../../../components/ModalUser/ModalUser';



// describe('ModalUser Component', () => {
//     const defaultProps = {
//         buttonColor: 'blue',
//         buttonTriggerTitle: 'Add New',
//         headerTitle: 'Add User',
//         buttonSubmitTitle: 'Add',
//         userID: 1,
//         onUserAdded: jest.fn(),
//         onUserUpdated: jest.fn(),
//         // server: 'http://example.com',
//         socket: {},
//     };



//     it('renders the ModalUser component with FormUser and correct props', async () => {
//         render(<ModalUser {...defaultProps} />);
//         const triggerButton = screen.getByTestId('modalButton');
//         expect(triggerButton).toBeInTheDocument();
//         fireEvent.click(triggerButton);
//         const formUser = screen.getByTestId('form-user');
//         expect(formUser).toBeInTheDocument();
//     });



//     it('closes the modal on close icon click', async () => {
//         render(<div data-testid="outside"><ModalUser {...defaultProps} /></div>);
//         const triggerButton = screen.getByTestId('modalButton');
//         expect(triggerButton).toBeInTheDocument();
//         // fireEvent.click(triggerButton);
//         const overlay = screen.getByTestId('outside');
//         fireEvent.click(overlay);

//         const formUser = screen.queryAllByTestId('form-user');

//         expect(formUser).toHaveLength(0);
//     });

// });
